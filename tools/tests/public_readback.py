#!/usr/bin/env python3
"""Byte-exact public Compass v5 readback, using only the Python standard library.

Run after deployment. A query-only recovery is reported separately and exits 3;
only an ordinary-URL match for every artifact and a real 404 for every removed
path earns exit 0. No browser, credentials, or deployment operations are used.
"""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import gzip
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urlsplit, urlunsplit
from urllib.request import Request, urlopen
import zlib

DEFAULT_ROOT = Path(__file__).resolve().parents[2]
EPISODES = (1, 2, 3, 4, 7, 8, 11, 12, 15, 16, 17)
REMOVAL_LISTS = (
    'hq/docs/根目录旧ep01清理清单.json',
    'hq/docs/旧3D依赖清理清单.json',
)
RESPONSE_HEADERS = (
    'Content-Type', 'Content-Encoding', 'Content-Length', 'ETag',
    'Last-Modified', 'Cache-Control', 'Age', 'X-Cache', 'X-Served-By',
)


def utc_now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def safe_relative(value):
    p = PurePosixPath(value)
    if not value or p.is_absolute() or '..' in p.parts or '\\' in value:
        raise ValueError(f'Unsafe repository-relative path: {value!r}')
    return p.as_posix()


def normalize_base(value):
    p = urlsplit(value)
    if p.scheme not in ('http', 'https') or not p.netloc:
        raise ValueError('baseURL must be an absolute http:// or https:// URL')
    if p.query or p.fragment or p.username or p.password:
        raise ValueError('baseURL must not contain a query, fragment, or credentials')
    return urlunsplit((p.scheme, p.netloc, p.path.rstrip('/') + '/', '', ''))


def build_manifest(root):
    paths = {'index.html', 'hq/index.html', 'hq/hq.js', 'hq/media-assets.js',
             'hq/audio/lines.json'}
    engine = root / 'engine'
    if not engine.is_dir():
        raise ValueError(f'Missing engine directory: {engine}')
    for f in engine.rglob('*'):
        rel = f.relative_to(root)
        if f.is_file() and not any(part.startswith('.') for part in rel.parts):
            if not {'docs', 'qa', 'lib', 'models'}.intersection(rel.parts):
                paths.add(rel.as_posix())
    for number in EPISODES:
        prefix = f'ep{number:02}'
        paths.update((f'{prefix}/index.html', f'{prefix}/episode.js'))
        if (root / prefix / 'episode.css').is_file():
            paths.add(f'{prefix}/episode.css')
    paths.add('ep01/fonts/NotoSansEgyptianHieroglyphs-Regular.ttf')

    audio_manifest = json.loads((root / 'hq/audio/lines.json').read_text())
    audio = set()
    for line in audio_manifest.values():
        filename = safe_relative(line['audioFile'])
        if '/' in filename or not filename.endswith('.mp3'):
            raise ValueError(f'Unexpected HQ audio filename: {filename}')
        audio.add('hq/audio/' + filename)
    actual_audio = {f.relative_to(root).as_posix()
                    for f in (root / 'hq/audio').glob('*.mp3') if f.is_file()}
    if len(audio) != 36 or audio != actual_audio:
        raise ValueError(f'HQ audio scope is not exactly 36 aligned MP3s: '
                         f'manifest={len(audio)}, actual={len(actual_audio)}')
    paths.update(audio)

    image_manifest = json.loads((root / 'hq/docs/HQ_发布图片清单.json').read_text())
    images = {safe_relative(entry['file']) for entry in image_manifest['files']}
    if any(not p.startswith('hq/illus/') or not p.endswith('.webp') for p in images):
        raise ValueError('HQ image manifest contains an unexpected file type or directory')
    actual_images = {f.relative_to(root).as_posix()
                     for f in (root / 'hq/illus').glob('*.webp') if f.is_file()}
    if len(images) != 30 or images != actual_images:
        raise ValueError(f'HQ image scope is not exactly 30 approved WebPs: '
                         f'manifest={len(images)}, actual={len(actual_images)}')
    paths.update(images)

    root_html = (root / 'index.html').read_text(encoding='utf-8')
    root_redirect = bool(re.search(r'location\.replace\([\'"]\./hq/', root_html))
    root_redirect = root_redirect and bool(re.search(
        r'http-equiv=[\'"]refresh[\'"][^>]*content=[\'"]0;url=\./hq/',
        root_html, re.IGNORECASE))
    if not root_redirect:
        raise ValueError('Local root index is not the expected HQ redirect source')

    records = []
    for path in sorted(paths):
        safe_relative(path)
        f = root / path
        if not f.is_file() or f.is_symlink():
            raise ValueError(f'Missing file or unexpected symlink: {path}')
        data = f.read_bytes()
        records.append({'path': path, 'kind': 'artifact', 'bytes': len(data),
                        'sha256': sha256(data)})
    # The project directory URL is what a visitor actually opens. Check that it
    # serves the redirect source, as well as checking /index.html explicitly.
    root_record = next(r for r in records if r['path'] == 'index.html')
    records.append({**root_record, 'kind': 'root-route', 'requestPath': ''})

    deleted = []
    for list_path in REMOVAL_LISTS:
        source = json.loads((root / list_path).read_text())
        for entry in source['files']:
            path = safe_relative(entry['path'])
            if path == 'index.html' or path in paths:
                raise ValueError(f'Removal list intersects current artifacts: {path}')
            if (root / path).exists():
                raise ValueError(f'Removed path unexpectedly exists locally: {path}')
            deleted.append({'path': path, 'kind': 'removed', 'sourceList': list_path,
                            'oldBytes': entry.get('bytes'),
                            'oldSha256': entry.get('sha256')})
    if len(deleted) != 52 or len({r['path'] for r in deleted}) != 52:
        raise ValueError('Removal lists must contain exactly 52 unique old paths')
    return records, sorted(deleted, key=lambda r: r['path'])


def fetch(url, timeout):
    began = time.monotonic()
    result = {'requestedUrl': url, 'startedAt': utc_now(), 'status': None,
              'finalUrl': None, 'bytes': None, 'sha256': None, 'error': None}
    response = None
    try:
        request = Request(url, headers={
            'User-Agent': 'CompassPreviewReadback/1.0',
            'Cache-Control': 'no-cache', 'Pragma': 'no-cache',
            'Accept-Encoding': 'identity',
        })
        try:
            response = urlopen(request, timeout=timeout)
        except HTTPError as exc:
            response = exc  # Read real 404 bodies too; do not reinterpret as 200.
        with response:
            result['status'] = response.code
            result['finalUrl'] = response.geturl()
            result['headers'] = {key: response.headers[key] for key in RESPONSE_HEADERS
                                 if response.headers.get(key) is not None}
            wire = response.read()
            encoding = response.headers.get('Content-Encoding', '').lower().strip()
        result['wireBytes'] = len(wire)
        if encoding in ('', 'identity'):
            body = wire
        elif encoding == 'gzip':
            body = gzip.decompress(wire)
        elif encoding == 'deflate':
            body = zlib.decompress(wire)
        else:
            raise ValueError(f'Unsupported Content-Encoding despite identity request: {encoding}')
        result['bytes'] = len(body)
        result['sha256'] = sha256(body)
    except (URLError, OSError, ValueError, zlib.error) as exc:
        result['error'] = f'{type(exc).__name__}: {exc}'
    except Exception as exc:
        result['error'] = f'{type(exc).__name__}: {exc}'
    result['elapsedMs'] = round((time.monotonic() - began) * 1000)
    return result


def inspect_target(base, target, timeout, retry_with_version, version_token):
    path = target.get('requestPath', target['path'])
    plain_url = base + quote(path, safe='/')

    def evaluate(response):
        if response['error']:
            return False
        # Redirects are recorded but must stay in this preview site. A redirect
        # to an unrelated host must never count as artifact/deletion success.
        final = response.get('finalUrl') or ''
        if not final.startswith(base):
            return False
        if target['kind'] == 'removed':
            return response['status'] == 404
        return (response['status'] == 200 and response['bytes'] == target['bytes']
                and response['sha256'] == target['sha256'])

    first = fetch(plain_url, timeout)
    first['usedVersionQuery'] = False
    first['consistent'] = evaluate(first)
    attempts = [first]
    if not first['consistent'] and retry_with_version:
        query_url = plain_url + '?' + urlencode({'v': version_token})
        second = fetch(query_url, timeout)
        second['usedVersionQuery'] = True
        second['consistent'] = evaluate(second)
        attempts.append(second)
    final = attempts[-1]
    return {**target, 'url': plain_url, 'ordinaryUrlConsistent': first['consistent'],
            'consistentWithOptionalQuery': final['consistent'],
            'usedVersionQuery': len(attempts) > 1, 'attempts': attempts}


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.tmp')
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temporary.replace(path)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('baseURL', help='Published project root, e.g. https://tiancc1212.github.io/compass-preview/')
    parser.add_argument('outputJSON', type=Path)
    parser.add_argument('--root', type=Path, default=DEFAULT_ROOT,
                        help='Local artifact root (default: current Compass worktree)')
    parser.add_argument('--workers', type=int, default=4, choices=range(1, 5))
    parser.add_argument('--timeout', type=float, default=30)
    parser.add_argument('--retry-with-version', action='store_true',
                        help='Retry each failed ordinary URL once with a unique version query; query-only recovery still exits 3')
    parser.add_argument('--manifest-only', action='store_true',
                        help='Write local manifest without any network requests')
    args = parser.parse_args(argv)
    report = {'schemaVersion': 1, 'baseURL': args.baseURL, 'startedAt': utc_now(),
              'root': str(args.root.resolve()), 'mode': 'manifest-only' if args.manifest_only else 'http-readback',
              'workers': args.workers, 'retryWithVersionQuery': args.retry_with_version,
              'rootIndexPurpose': 'HQ redirect source, verified at both / and /index.html',
              'scope': {'episodes': [f'ep{n:02}' for n in EPISODES],
                        'hqAudioMp3': 36, 'hqApprovedImages': 30, 'removedPaths': 52},
              'errors': [], 'artifacts': [], 'removed': []}
    try:
        base = normalize_base(args.baseURL)
        report['baseURL'] = base
        artifacts, deleted = build_manifest(args.root)
        report['scope']['uniqueArtifactFiles'] = len(artifacts) - 1
        report['scope']['artifactUrls'] = len(artifacts)
        manifest_key = '\n'.join(f"{r['path']}:{r['sha256']}" for r in artifacts).encode()
        report['localManifestSha256'] = sha256(manifest_key)
        version = (args.root / 'engine/VERSION').read_text().strip()
        token = f"{version}-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}-{sha256(manifest_key)[:12]}"
        report['versionQueryToken'] = token if args.retry_with_version else None
        if args.manifest_only:
            report['artifacts'], report['removed'] = artifacts, deleted
            report['summary'] = {'networkRequests': 0, 'localScopeValid': True,
                                 'ordinaryUrlsVerified': False, 'ok': False}
            exit_code = 0
        else:
            results = []
            with ThreadPoolExecutor(max_workers=args.workers) as executor:
                futures = [executor.submit(inspect_target, base, target, args.timeout,
                                           args.retry_with_version, token)
                           for target in artifacts + deleted]
                for future in as_completed(futures):
                    results.append(future.result())
            for result in sorted(results, key=lambda r: (r['kind'], r['path'])):
                report['removed' if result['kind'] == 'removed' else 'artifacts'].append(result)
            changed = []
            for artifact in artifacts:
                f = args.root / artifact['path']
                if not f.is_file() or sha256(f.read_bytes()) != artifact['sha256']:
                    changed.append(artifact['path'])
            changed = sorted(set(changed))
            if changed:
                report['errors'].append({'localArtifactsChangedDuringReadback': changed})
            ordinary_failures = [r['path'] for r in results if not r['ordinaryUrlConsistent']]
            unresolved = [r['path'] for r in results if not r['consistentWithOptionalQuery']]
            recovered = [r['path'] for r in results
                         if not r['ordinaryUrlConsistent'] and r['consistentWithOptionalQuery']]
            ok = not ordinary_failures and not changed
            query_ok = not unresolved and not changed
            report['summary'] = {
                'networkRequests': sum(len(r['attempts']) for r in results),
                'uniqueArtifactFiles': len(artifacts) - 1,
                'artifactUrls': len(artifacts), 'removedUrls': len(deleted),
                'ordinaryMatches': len(results) - len(ordinary_failures),
                'ordinaryFailures': ordinary_failures,
                'queryRecoveries': recovered, 'unresolvedFailures': unresolved,
                'localArtifactsStable': not changed,
                'ordinaryUrlsVerified': ok, 'okWithVersionQuery': query_ok, 'ok': ok,
            }
            exit_code = 0 if ok else (3 if query_ok else 1)
    except Exception as exc:
        report['errors'].append(f'{type(exc).__name__}: {exc}')
        report['summary'] = {'ok': False, 'ordinaryUrlsVerified': False}
        exit_code = 2
    report['finishedAt'] = utc_now()
    report['exitCode'] = exit_code
    write_json(args.outputJSON, report)
    print(json.dumps({'output': str(args.outputJSON), **report['summary']}, ensure_ascii=False))
    return exit_code


if __name__ == '__main__':
    sys.exit(main())
