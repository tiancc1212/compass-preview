const V = new URL(import.meta.url).searchParams.get('v') || '0';
const HQV = document.documentElement.dataset.v || '0';
const hqBase = new URL('../hq/', import.meta.url);
const versionedURL = (path, base, version) => {
  const url = new URL(path, base);
  url.searchParams.set('v', version);
  return url.href;
};
const EU = path => versionedURL(path, import.meta.url, V);
const HU = path => versionedURL(path, hqBase, HQV);
const [{default: HQ}, {default: MEDIA_ASSETS}, {icon: sharedIcon},
  {renderCompass, renderStarProgress, readStars, isFinaleUnlocked}, {badge}] = await Promise.all([
  import(HU('hq.js')), import(HU('media-assets.js')), import(EU('./icons.js')),
  import(EU('./compass.js')), import(EU('./badges.js')),
]);
const loadCSS = href => new Promise((resolve, reject) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = href;
  link.onload = resolve; link.onerror = reject;
  document.head.appendChild(link);
});
await Promise.all([loadCSS(EU('./compass/compass.css')), loadCSS(EU('./hq.css'))]);

const C = HQ.copy;
const $ = (selector, root = document) => root.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fmt = (value, vars = {}) => String(value ?? '').replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
const mediaBase = new URL(window.COMPASS_HQ_CONFIG?.mediaBase || './', hqBase);
const href = path => new URL(path, hqBase).href;
const SECTIONS = ['map', 'characters', 'journal', 'badges', 'downloads'];
const memory = {get(key, fallback = null) {try {return localStorage.getItem(key) ?? fallback;} catch {return fallback;}}, set(key, value) {try {localStorage.setItem(key, value);} catch {}}};
let stars = readStars();
let section = SECTIONS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'map';
let restore = null;
try {restore = JSON.parse(sessionStorage.getItem('cc:hq:return'));} catch {}
let audioLines = {};
let metaFailures = [];
let metadataAttempt = 0;
let audio = null;
let audioEpoch = 0;
let audioRequest = 0;
let wordFrame = 0;
let prologue = null;
let rate = Number(memory.get('cc_hq_rate', 1));
if (![0.8, 1, 1.2].includes(rate)) rate = 1;
let muted = memory.get('cc_hq_muted') === 'true';
const itemByEp = ep => HQ.map.items.find(item => item.ep === Number(ep));
const completed = ep => stars.includes(Number(ep));
const published = ep => itemByEp(ep)?.status === 'published-source' && !!itemByEp(ep)?.href;
const canEnter = ep => published(ep) && (Number(ep) !== 17 || isFinaleUnlocked(stars));
const allStars = () => Array.from({length: 17}, (_, index) => index + 1).every(completed);
const characterUnlocked = c => c.unlock.type === 'always' || (c.unlock.runtimeEligible !== false && published(c.unlock.ep) && completed(c.unlock.ep));
const journalUnlocked = e => e.unlock.runtimeEligible !== false && published(e.ep) && completed(e.ep);
const badgeUnlocked = b => b.unlock.anyCompletedEpisode.some(ep => published(ep) && completed(ep));
const recommended = () => HQ.map.items.find(item => canEnter(item.ep) && !completed(item.ep));

const icon = name => sharedIcon(({characters:'people',journal:'book',badges:'badge',downloads:'download',muted:'mute'})[name] || name, {className:'hq-icon'});
const PLACES = {
  'pyramid':'<path d="m2 21 10-18 10 18H2Zm10-18v18M8 21l4-8 4 8"/>',
  'viking-ship':'<path d="m2 15 4 6h12l4-6H2ZM12 2v13M12 3 4 12h8m2-8 5 8h-5"/>',
  'cloud-library':'<path d="M4 13a4 4 0 0 1 0-8 5 5 0 0 1 9-2 5 5 0 0 1 7 7M5 12h6l1 1 1-1h6v10h-6l-1 1-1-1H5V12Zm7 1v10"/>',
  'dragon-cave':'<path d="M2 22 5 9 12 2l7 7 3 13H2Zm6 0v-8l4-4 4 4v8m-6-6h4"/>',
  'robot-town':'<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M12 2v4m-7 6h2m10 0h2M8 16h8M1 10v7m22-7v7"/>',
  olympia:'<path d="M2 8 12 2l10 6H2Zm1 14h18M5 9v10M10 9v10M14 9v10M19 9v10"/>',
  'chocolate-planet':'<circle cx="12" cy="12" r="8"/><path d="M8 6v13M15 5v14M5 10h15M5 15h15M2 19l20-14"/>',
  'dinosaur-jungle':'<path d="M4 22V6m-3 6 3-6 4 6M8 20h10v-7l3-4V5h-4v5l-4 4H7l-3 3m6 3v3m6-3v3"/>',
  village:'<path d="m2 12 6-6 6 6M4 11v10h8V11m3 10V7l4-4 4 4v14m-6-10h4M7 17v4"/>',
  'mars-base':'<path d="M2 21h20M4 21v-7a8 8 0 0 1 16 0v7M12 6V2m0 0h6l-2 3h-4M8 21v-6h8v6"/>',
  savanna:'<path d="M2 21h20M12 21V10M4 10h16a4 4 0 0 0-4-4 5 5 0 0 0-8 0 4 4 0 0 0-4 4Zm4 0 4 5 4-5"/>',
  'underwater-city':'<path d="M2 3q3 4 6 0t6 0 6 0M4 22V11h5v11m2 0V7h5v15m2 0V14h4v8M2 22h20"/>',
  'pirate-ship':'<path d="m2 16 4 5h12l4-5H2ZM12 2v14M12 3h8v8h-8m2-6 4 4m0-4-4 4M9 7l-5 6h5"/>',
  'moon-base':'<path d="M14 2a8 8 0 1 0 8 8 7 7 0 0 1-8-8ZM2 23v-6l4-4 4 4v6H2Zm3-4h2"/>',
  'london-museum':'<path d="M2 9 12 3l10 6H2Zm2 12h16M6 10v9m6-9v9m6-9v9M1 23h22"/>',
  'monster-fair':'<path d="m2 10 10-8 10 8H2ZM4 10v12m16-12v12M4 22h16M8 22v-7h8v7M12 2v8"/>',
  'compass-home':'<path d="m2 11 10-9 10 9M4 10v12h16V10"/><circle cx="12" cy="14" r="5"/><path d="m14 12-1 3-3 1 1-3 3-1Z"/>'
};
const placeIcon = item => `<svg class="place-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PLACES[item.icon.id] || PLACES['compass-home']}</svg>`;

function imageMarkup(image, className = '', eager = false) {
  const path = image?.privateAssetKey ? MEDIA_ASSETS[image.privateAssetKey] : image?.href;
  const src = image?.privateAssetKey ? (path ? versionedURL(path, mediaBase, HQV) : '') : (path ? HU(path) : '');
  return `<span class="media ${className}">${src ? `<img src="${esc(src)}" alt="${esc(image.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">` : ''}<span class="media-fallback"${src ? ' hidden' : ''}>${icon('compass')}<span>${esc(C.states.imageFailed)}</span></span></span>`;
}
function installImageFallbacks(root = document) {
  root.querySelectorAll('.media img').forEach(img => {
    const fail = () => {img.hidden = true; img.parentElement.querySelector('.media-fallback').hidden = false;};
    img.addEventListener('error', fail, {once: true});
    if (img.complete && !img.naturalWidth) fail();
  });
}
function episodeLink(ep, source = section, extraHref = '') {
  if (!canEnter(ep)) return '';
  const url = new URL(extraHref || itemByEp(ep).href, hqBase);
  url.searchParams.set('hq', source);
  return url.href;
}
function episodeAnchor(ep, label, className = 'button primary', extraHref = '') {
  const target = episodeLink(ep, section, extraHref);
  return target ? `<a class="${className}" data-episode="${ep}" href="${esc(target)}">${esc(label)}${icon('arrow')}</a>` : `<span class="${className} disabled" aria-disabled="true">${icon('lock')}${esc(Number(ep) === 17 ? C.map.finaleLocked : C.map.comingSoon)}</span>`;
}
function savePosition() {
  try {sessionStorage.setItem('cc:hq:return', JSON.stringify({section, scrollY: window.scrollY, href: location.href}));} catch {}
}
function stopAudio() {
  audioEpoch++;
  audioRequest++;
  cancelAnimationFrame(wordFrame);
  if (audio) {audio.pause(); audio.removeAttribute('src'); audio.load(); audio = null;}
  document.querySelectorAll('.word.on').forEach(word => word.classList.remove('on'));
  document.querySelectorAll('[data-action="play-quote"]').forEach(button=>{button.dataset.playing='false';button.innerHTML=icon('play')+esc(C.buttons.listen);});
}
function audioStillCurrent(player, epoch, request) {
  return player === audio && epoch === audioEpoch && request === audioRequest;
}
function pauseAudio() {audioRequest++; audio?.pause();}
function announce(message) {$('#hq-status').textContent = message;}
function wordMarkup(line) {
  const words = audioLines[line.audio?.id || line.id]?.words;
  return (words?.length ? words.map(word => word[0]) : line.en.split(/\s+/)).map((word, index) => `<span class="word" data-word="${index}">${esc(word)}</span>`).join(' ');
}
async function playLine(line, target, onEnd = null) {
  stopAudio();
  announce('');
  const epoch = audioEpoch;
  const request = audioRequest;
  const entry = audioLines[line.audio?.id || line.id];
  const source = line.audio?.href || (entry?.audioFile && `audio/${entry.audioFile}`);
  if (!source) {announce(C.states.audioFailed); return false;}
  audio = new Audio(HU(source));
  const player = audio;
  player.playbackRate = rate;
  player.muted = muted;
  const words = target ? [...target.querySelectorAll('.word')] : [];
  function highlight() {
    if (epoch !== audioEpoch) return;
    const time = player.currentTime;
    (entry?.words || []).forEach((word, index) => {
      words[index]?.classList.toggle('on', time >= word[1] && time < word[2]);
      words[index]?.classList.toggle('spoken', time >= word[2]);
    });
    if (!player.ended) wordFrame = requestAnimationFrame(highlight);
  }
  const startHighlight = () => {
    if (epoch !== audioEpoch || player !== audio) return;
    cancelAnimationFrame(wordFrame);
    highlight();
  };
  player.addEventListener('playing', startHighlight);
  player.addEventListener('ended', () => {
    if (epoch !== audioEpoch) return;
    cancelAnimationFrame(wordFrame);
    words.forEach(word => word.classList.remove('on'));
    onEnd?.();
  }, {once:true});
  player.addEventListener('error', () => {
    if (epoch !== audioEpoch) return;
    announce(C.states.audioFailed);
    if (prologue) {prologue.playing = false; updatePrologueControls();}
  }, {once:true});
  try {await player.play(); if (!audioStillCurrent(player, epoch, request)) return false; startHighlight(); return true;}
  catch {if (audioStillCurrent(player, epoch, request)) announce(C.states.audioFailed); return false;}
}

function pageHeading(key, count = '') {
  return `<div class="section-heading"><div><p class="eyebrow">${esc(C.navigation[key])}</p><h1 id="section-title" tabindex="-1">${esc(C[key].title)}</h1><p>${esc(C[key].description)}</p></div>${count ? `<p class="section-count">${esc(count)}</p>` : ''}</div>`;
}
function emptyState(key) {
  return `<div class="empty-state">${icon(key === 'badges' ? 'badges' : 'journal')}<h2>${esc(C[key].emptyTitle)}</h2><p>${esc(C[key].emptyBody)}</p><a class="button" href="#map">${esc(C[key].emptyButton)}${icon('arrow')}</a></div>`;
}
function mapView() {
  const next = recommended();
  const metadataNotice = metaFailures.length ? `<aside class="metadata-notice" role="alert"><p>${esc(C.states.loadingFailed)}</p><p>${metaFailures.map(ep=>esc(fmt(C.map.selectedLabel,itemByEp(ep)))).join(' · ')}</p><button class="button" data-action="retry-metadata">${esc(C.buttons.retry)}</button></aside>` : '';
  const nodes = HQ.map.items.map((item, index) => {
    const angle = (index / 17) * 2 * Math.PI - Math.PI / 2;
    const style = `--x:${50 + 43 * Math.cos(angle)}%;--y:${50 + 42 * Math.sin(angle)}%`;
    const lit = completed(item.ep), available = canEnter(item.ep);
    const label = fmt(available ? C.map.enterAria : C.map.unavailableAria, item);
    const body = `${placeIcon(item)}<b>${String(item.ep).padStart(2,'0')}</b><span class="orbit-place">${esc(item.place)}</span>${lit ? '<span class="node-lit" aria-hidden="true">✦</span>' : ''}`;
    const attrs = `class="orbit-node ${lit ? 'is-lit' : ''} ${next?.ep === item.ep ? 'is-next' : ''} ${!available ? 'is-locked' : ''}" style="${style}" data-map-node="${item.ep}" aria-label="${esc(item.ep === 17 && !available ? C.map.finaleLocked : label)}"`;
    return available ? `<a ${attrs} data-episode="${item.ep}" href="${esc(episodeLink(item.ep))}">${body}</a>` : `<span ${attrs} aria-disabled="true">${body}</span>`;
  }).join('');
  const list = HQ.map.items.map(item => {
    const lit = completed(item.ep), available = canEnter(item.ep);
    const status = !published(item.ep) ? C.map.comingSoon : item.ep === 17 && !available ? fmt(C.map.finaleRemaining, {remaining:16-stars.filter(ep=>ep<17).length}) : lit ? C.map.alreadyLit : next?.ep === item.ep ? C.map.suggested : C.map.unvisited;
    const content = `<span class="station-number">${String(item.ep).padStart(2,'0')}</span><span class="station-place">${placeIcon(item)}</span><span class="station-main"><strong>${esc(item.title)}</strong><span>${esc(item.grammar.join(' · '))}</span></span><span class="station-state">${esc(status)}${available ? icon('arrow') : icon('lock')}</span>`;
    return available ? `<a class="station ${lit ? 'is-lit' : ''} ${next?.ep === item.ep ? 'is-next' : ''}" data-episode="${item.ep}" href="${esc(episodeLink(item.ep))}">${content}</a>` : `<div class="station is-locked" data-unavailable="${item.ep}" aria-disabled="true">${content}</div>`;
  }).join('');
  return `${pageHeading('map',fmt(C.map.starCount,{count:stars.length}))}${metadataNotice}<div class="map-layout"><div class="star-map"><div class="orbit-ring" aria-hidden="true"></div><div class="map-compass">${renderCompass({stars, id:'hq-compass',label:fmt(C.accessibility.compass,{count:stars.length})})}<p>${esc(C.brand.homeTitle)}</p></div>${nodes}</div><div class="map-note"><div class="recommendation"><p class="eyebrow">${esc(next ? C.map.suggested : C.brand.greeting)}</p><h2>${esc(next ? fmt(C.map.selectedLabel,next) : stars.length === 17 ? C.map.allComplete : C.map.availableComplete)}</h2>${next ? `<p>${esc(next.description)}</p>${episodeAnchor(next.ep,completed(next.ep)?C.buttons.replay:C.buttons.start)}` : ''}</div><div class="route-note">${icon('compass')}<p>${esc(C.map.freeRoute)}</p></div><button class="button quiet" data-action="prologue">${icon('replay')}${esc(C.navigation.replayPrologue)}</button></div></div><div class="station-list">${list}</div>`;
}
function charactersView() {
  const card = c => {
    const unlocked = characterUnlocked(c);
    return `<button class="character-card ${unlocked ? '' : 'is-locked'}" data-character="${esc(c.id)}" ${unlocked ? `aria-label="${esc(fmt(C.accessibility.openCharacter,{name:c.name}))}"` : 'disabled'}>${unlocked ? imageMarkup(c.image,'portrait') : `<span class="portrait silhouette" role="img" aria-label="${esc(C.accessibility.lockedPortrait)}"><svg viewBox="0 0 160 200" aria-hidden="true"><circle cx="80" cy="53" r="30"/><path d="M30 180v-55a50 50 0 0 1 100 0v55Z"/></svg>${icon('lock')}</span>`}<span class="character-info"><strong>${esc(unlocked ? c.displayTitle || c.name : C.characters.lockedName)}</strong><span>${esc(unlocked ? c.identity : fmt(C.characters.locked,{ep:c.unlock.ep}))}</span></span></button>`;
  };
  const groups = [{title:C.characters.mainGroup,items:HQ.characters.filter(c=>c.kind==='main')},{title:C.characters.supportingGroup,items:HQ.characters.filter(c=>c.kind!=='main')}];
  return `${pageHeading('characters')}<div class="character-groups">${groups.map(group=>`<h2 class="group-title">${esc(group.title)}</h2><div class="character-grid">${group.items.map(card).join('')}</div>`).join('')}</div>`;
}
function journalView() {
  const unlocked = HQ.journal.entries.filter(journalUnlocked);
  const pages = HQ.journal.entries.map(e => {
    if (!journalUnlocked(e)) return `<article class="journal-entry is-locked" data-journal="${e.ep}"><span class="journal-number">${String(e.ep).padStart(2,'0')}</span><div>${icon('lock')}<h2>${esc(C.journal.lockedTitle)}</h2><p>${esc(published(e.ep) ? fmt(C.journal.lockedBody,{ep:e.ep}) : C.journal.draftLocked)}</p></div></article>`;
    return `<article class="journal-entry" data-journal="${e.ep}">${imageMarkup(e.thumbnail,'journal-thumb')}<div><p class="eyebrow">${esc(fmt(C.journal.sourceLabel,{ep:e.ep}))} · ${esc(e.kind === 'clue' ? C.journal.clueLabel : e.kind === 'finale' ? C.journal.finaleLabel : C.journal.memoryLabel)}</p><h2>${esc(e.title)}</h2><p class="english" lang="en">${esc(e.en)}</p><p>${esc(e.zh)}</p>${episodeAnchor(e.ep,C.journal.readEpisode,'text-link')}</div></article>`;
  }).join('');
  return `${pageHeading('journal',fmt(C.journal.count,{count:unlocked.length}))}${unlocked.length ? '' : emptyState('journal')}<div class="journal-list">${pages}</div><div class="story-gate">${allStars() ? `<h2>${esc(C.journal.fullStoryReady)}</h2><button class="button primary" data-action="full-story">${esc(C.journal.fullStoryButton)}${icon('arrow')}</button>` : `${icon('lock')}<p>${esc(C.journal.fullStoryLocked)}</p>`}</div>`;
}
function badgesView() {
  const count = HQ.badges.filter(badgeUnlocked).length;
  return `${pageHeading('badges',fmt(C.badges.count,{count}))}${count ? '' : emptyState('badges')}<div class="badge-grid">${HQ.badges.map(b=>`<button class="badge-card ${badgeUnlocked(b)?'':'is-locked'}" data-badge="${esc(b.id)}" ${badgeUnlocked(b)?'':'disabled'}><span class="badge-art">${badge(b.id,{size:100})}</span><strong>${esc(b.name)}</strong><span>${esc(badgeUnlocked(b)?C.badges.unlocked:C.badges.locked)}</span></button>`).join('')}</div><p class="badge-footnote">${esc(C.badges.footnote)}</p>`;
}
function downloadsView() {
  const downloads = HQ.downloads.filter(d=>d.enabled && published(d.ep) && completed(d.ep));
  return `${pageHeading('downloads')}${downloads.length ? `<div class="downloads-list">${downloads.map(d=>`<article class="download-item">${icon('downloads')}<div><h2>${esc(fmt(C.downloads.fileLabel,d))}</h2><a class="text-link" data-episode="${d.ep}" href="${esc(episodeLink(d.ep,section,d.mapHref))}"${canEnter(d.ep)?'':' aria-disabled="true" tabindex="-1"'}>${esc(C.downloads.fallback)}</a></div><a class="button" data-download="${d.ep}" href="${esc(href(d.href))}" download="${esc(d.downloadName)}">${esc(C.downloads.download)}${icon('downloads')}</a></article>`).join('')}</div>` : emptyState('downloads')}`;
}
function renderSection({restoreY = 0, focus = false} = {}) {
  stopAudio();
  stars = readStars();
  $('#hq-main').innerHTML = ({map:mapView,characters:charactersView,journal:journalView,badges:badgesView,downloads:downloadsView})[section]();
  document.querySelectorAll('[data-section]').forEach(link=>{link.setAttribute('aria-current',link.dataset.section===section?'page':'false');});
  $('#hq-stars').innerHTML = renderStarProgress(stars);
  document.title = `${C.navigation[section]} · ${C.brand.title}`;
  installImageFallbacks($('#hq-main'));
  if (focus) $('#section-title')?.focus({preventScroll:true});
  requestAnimationFrame(()=>window.scrollTo({top:restoreY,behavior:'instant'}));
}
function closeDialog() {
  const dialog = $('#hq-dialog');
  stopAudio();
  if (prologue) {
    if (HQ.prologue.skipMarksSeen) memory.set('cc_prologue_seen','true');
    prologue = null;
  }
  dialog.close();
  document.body.classList.remove('dialog-open');
}
function openDialog(content, className = '') {
  const dialog = $('#hq-dialog');
  stopAudio();
  dialog.className = `hq-dialog ${className}`;
  dialog.innerHTML = `<button class="dialog-close icon-button" data-action="close-dialog" aria-label="${esc(C.accessibility.closeDialog)}">${icon('close')}</button>${content}`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  installImageFallbacks(dialog);
}
function openCharacter(id) {
  const c = HQ.characters.find(item=>item.id===id);
  if (!c || !characterUnlocked(c)) return;
  const quote = c.finaleQuote && allStars() ? c.finaleQuote : c.quote;
  openDialog(`<div class="character-detail">${imageMarkup(c.image,'detail-portrait',true)}<div><p class="eyebrow">${esc(c.identity)}</p><h2 id="dialog-title">${esc(c.displayTitle || c.name)}</h2><p>${esc(c.personality)}</p><div class="quote-card"><p class="eyebrow">${esc(quote.label || C.characters.quoteLabel)}</p><p class="english" lang="en" data-quote-text>${wordMarkup(quote)}</p><p>${esc(quote.zh)}</p><button class="button" data-action="play-quote" data-id="${esc(c.id)}">${icon('play')}${esc(C.buttons.listen)}</button></div><p class="grammar-connection">${esc(c.grammarConnection)}</p>${c.periodArchive && completed(c.periodArchive.unlock.ep) && published(c.periodArchive.unlock.ep) ? `<h3>${esc(c.periodArchive.title)}</h3><p>${esc(c.periodArchive.body)}</p>` : ''}</div></div>`,'character-dialog');
}
function openBadge(id) {
  const b = HQ.badges.find(item=>item.id===id);
  if (!b || !badgeUnlocked(b)) return;
  openDialog(`<div class="badge-detail"><div class="badge-art">${badge(b.id,{size:132})}</div><p class="eyebrow">${esc(C.badges.unlocked)}</p><h2 id="dialog-title">${esc(b.name)}</h2><p>${esc(b.meaning)}</p><div class="quote-card"><p class="eyebrow">${esc(C.badges.example)}</p><p class="english" lang="en">${esc(b.example.en)}</p><p>${esc(b.example.zh)}</p></div><p class="source-note">${episodeAnchor(b.firstPublished.ep,b.firstPublished.label,'text-link',b.firstPublished.href)}</p>${episodeAnchor(b.learnAt.ep,b.learnAt.label,'button primary',b.learnAt.href)}</div>`,'badge-dialog');
}
function openFullStory() {
  if (!allStars()) return;
  const story = HQ.journal.fullStory;
  openDialog(`<article class="full-story"><p class="eyebrow">${esc(story.subtitle)}</p><h2 id="dialog-title">${esc(story.title)}</h2>${story.paragraphs.map(p=>`<section><h3>${esc(p.title)}</h3><p class="english" lang="en">${esc(p.en)}</p><p>${esc(p.zh)}</p></section>`).join('')}<p>${esc(story.closing)}</p><div class="story-actions"><button class="button primary" data-action="story-map">${esc(story.primary)}</button>${episodeAnchor(17,story.secondary,'button')}</div></article>`,'story-dialog');
}
function markPrologueSeen() {memory.set('cc_prologue_seen','true');}
function finishPrologue() {
  markPrologueSeen();
  closeDialog();
  if (section !== 'map') location.hash = 'map';
}
function openPrologue() {
  prologue = {page:0,line:0,auto:HQ.prologue.firstVisitAutoPlay,playing:false,done:false};
  renderProloguePage();
  // A tap starts sound reliably on browsers that block first-visit autoplay.
}
function renderProloguePage({focusAction = null} = {}) {
  const p = prologue;
  if (!p) return;
  const panel = HQ.prologue.panels[p.page];
  const lines = panel.lineIds.map(id=>HQ.prologue.lines.find(line=>line.id===id));
  const last = p.page === HQ.prologue.panels.length-1;
  const previousFocus = document.activeElement;
  let focusSelector = '[data-action="prologue-play"]';
  if (focusAction) focusSelector = `[data-action="${focusAction}"]`;
  else if ($('#hq-dialog').contains(previousFocus)) {
    if (['prologue-rate','prologue-auto'].includes(previousFocus.id)) focusSelector = `#${previousFocus.id}`;
    else if (previousFocus.dataset.action) focusSelector = `[data-action="${previousFocus.dataset.action}"]`;
    else if (previousFocus.hasAttribute('data-prologue-line')) focusSelector = `[data-prologue-line="${Math.min(Number(previousFocus.dataset.prologueLine), lines.length-1)}"]`;
  }
  if (last && focusSelector === '[data-action="next-page"]') focusSelector = '[data-action="finish-prologue"]';
  openDialog(`<div class="prologue-top"><span class="eyebrow">${esc(HQ.prologue.title)}</span><button class="text-button" data-action="skip-prologue">${esc(C.buttons.skipPrologue)}</button></div><div class="prologue-scene">${imageMarkup(panel.image,'scene-image',true)}<span class="page-number">${esc(fmt(C.states.pageProgress,{current:p.page+1,total:HQ.prologue.panels.length}))}</span></div><div class="prologue-body"><h2 id="dialog-title">${esc(panel.title)}</h2><div class="prologue-lines">${lines.map((line,index)=>`<button class="spoken-line ${index===p.line?'is-current':''}" data-prologue-line="${index}"><span class="english" lang="en">${wordMarkup(line)}</span><span class="translation">${esc(line.zh)}</span></button>`).join('')}</div></div><div class="prologue-controls"><div class="playback-tools"><button class="button" data-action="prologue-play">${icon('play')}${esc(C.buttons.resume)}</button><button class="icon-button" data-action="replay-line" aria-label="${esc(C.buttons.replayLine)}">${icon('replay')}</button><label class="rate-control"><span class="sr-only">${esc(fmt(C.accessibility.rate,{rate}))}</span><select id="prologue-rate" aria-label="${esc(fmt(C.accessibility.rate,{rate}))}"><option value="0.8" ${rate===.8?'selected':''}>${esc(C.buttons.slower)} · 0.8×</option><option value="1" ${rate===1?'selected':''}>${esc(C.buttons.normalSpeed)} · 1×</option><option value="1.2" ${rate===1.2?'selected':''}>${esc(C.buttons.faster)} · 1.2×</option></select></label><button class="icon-button" data-action="mute" aria-label="${esc(muted?C.buttons.unmute:C.buttons.mute)}">${icon(muted?'muted':'sound')}</button><label class="auto-toggle"><input id="prologue-auto" type="checkbox" ${p.auto?'checked':''}>${esc(C.buttons.autoPlay)}</label></div><div class="prologue-footer"><button class="button quiet" data-action="previous-page" ${p.page===0?'disabled':''}>${esc(C.buttons.previous)}</button><div class="page-dots" aria-hidden="true">${HQ.prologue.panels.map((_,i)=>`<i class="${i===p.page?'current':''}"></i>`).join('')}</div><button class="button primary" data-action="${last?'finish-prologue':'next-page'}">${esc(last?C.buttons.finishPrologue:C.buttons.next)}${icon('arrow')}</button></div></div>`,'prologue-dialog');
  updatePrologueControls();
  const focusTarget = $(focusSelector, $('#hq-dialog'));
  (focusTarget && !focusTarget.disabled ? focusTarget : $('[data-action="prologue-play"]')).focus({preventScroll:true});
}
function updatePrologueControls() {
  if (!prologue) return;
  const button = $('[data-action="prologue-play"]');
  if (button) button.innerHTML = icon(prologue.playing?'pause':'play') + esc(prologue.playing?C.buttons.pause:audio&&!audio.ended?C.buttons.resume:C.buttons.listen);
  document.querySelectorAll('[data-prologue-line]').forEach(el=>el.classList.toggle('is-current',Number(el.dataset.prologueLine)===prologue.line));
}
async function startPrologueLine() {
  if (!prologue) return;
  const current = prologue;
  const id = HQ.prologue.panels[current.page].lineIds[current.line];
  const line = HQ.prologue.lines.find(item=>item.id===id);
  current.playing = true;
  current.done = false;
  updatePrologueControls();
  const pending = playLine(line,$(`[data-prologue-line="${current.line}"]`),()=>{
    if (!prologue || prologue !== current) return;
    current.playing = false;
    const panel = HQ.prologue.panels[current.page];
    if (current.line < panel.lineIds.length-1) {
      current.line++;
      startPrologueLine();
    } else if (current.auto && current.page < HQ.prologue.panels.length-1) {
      current.page++; current.line=0;
      renderProloguePage(); startPrologueLine();
    } else {
      current.done = true;
      if (current.page === HQ.prologue.panels.length-1) markPrologueSeen();
      updatePrologueControls();
    }
  });
  const epoch = audioEpoch, request = audioRequest, player = audio;
  const ok = await pending;
  if (!ok && prologue === current && audioStillCurrent(player, epoch, request)) {current.playing=false;updatePrologueControls();}
}
function flipPrologue(delta) {
  if (!prologue) return;
  const page = prologue.page + delta;
  if (page < 0 || page >= HQ.prologue.panels.length) return;
  const wasPlaying = prologue.playing;
  prologue.page = page; prologue.line = 0; prologue.playing = false;
  renderProloguePage({focusAction:delta > 0 ? 'next-page' : 'previous-page'});
  if (wasPlaying) startPrologueLine();
}
async function loadEpisodeMetadata() {
  const targets = HQ.map.items.filter(item => published(item.ep));
  const attempt = metadataAttempt++;
  const results = await Promise.allSettled(targets.map(async item => {
    const module = await import(HU(`${item.href}episode.js`) + '&hq-meta=' + encodeURIComponent(V) + '-' + attempt);
    const meta = module.default?.meta;
    if (!meta || typeof meta.title !== 'string' || typeof meta.place !== 'string' || !Array.isArray(meta.grammar) || typeof meta.icon !== 'string') throw new Error('Invalid episode metadata');
    Object.assign(item,{title:meta.title,place:meta.place,grammar:[...meta.grammar],icon:{...item.icon,id:meta.icon}});
  }));
  metaFailures = results.flatMap((result,index)=>result.status==='rejected'?[targets[index].ep]:[]);
}
async function init() {
  document.body.innerHTML = `<a class="skip-link" href="#hq-main">${esc(C.buttons.open)} ${esc(C.brand.homeTitle)}</a><header class="hq-header"><a class="brand" href="#map">${icon('compass')}<span><strong>${esc(C.brand.title)}</strong><small lang="en">${esc(C.brand.en)}</small></span></a><div id="hq-stars" aria-label="${esc(fmt(C.map.starCount,{count:stars.length}))}"></div><button class="header-replay icon-button" data-action="prologue" aria-label="${esc(C.navigation.replayPrologue)}">${icon('replay')}</button></header><nav class="hq-nav" aria-label="${esc(C.brand.homeTitle)}">${SECTIONS.map(key=>`<a href="#${key}" data-section="${key}">${icon(key)}<span>${esc(C.navigation[key])}</span></a>`).join('')}</nav><main id="hq-main" tabindex="-1"></main><dialog id="hq-dialog" class="hq-dialog" aria-labelledby="dialog-title"></dialog><p id="hq-status" class="hq-status" role="status" aria-live="polite"></p>`;
  await loadEpisodeMetadata();
  renderSection({restoreY:restore?.section===section ? restore.scrollY : 0});
  fetch(HU(HQ.audioSpec.manifest)).then(response=>response.ok?response.json():{}).then(lines=>{
    audioLines=lines;
    if (!memory.get('cc_prologue_seen')) openPrologue();
  }).catch(()=>{if (!memory.get('cc_prologue_seen')) openPrologue();});
  $('#hq-dialog').addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
  $('#hq-dialog').addEventListener('click',event=>{if(event.target===$('#hq-dialog'))closeDialog();});
  window.addEventListener('hashchange',()=>{
    const next=location.hash.slice(1);
    if (!SECTIONS.includes(next)) return;
    closeDialog(); section=next; renderSection({focus:true});
  });
  window.addEventListener('storage',event=>{if(event.key==='cc_stars'){const y=scrollY;closeDialog();renderSection({restoreY:y});}});
  window.addEventListener('pagehide',()=>{savePosition();stopAudio();});
  window.addEventListener('pageshow',event=>{if(event.persisted)renderSection({restoreY:scrollY});});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden && audio && !audio.paused){pauseAudio();if(prologue){prologue.playing=false;updatePrologueControls();}}
  });
  document.addEventListener('click',async event=>{
    const el=event.target.closest('button,a');
    if(!el)return;
    if(el.dataset.episode){if(!canEnter(el.dataset.episode)){event.preventDefault();announce(C.map.finaleLocked);}else savePosition();return;}
    if(el.dataset.character){openCharacter(el.dataset.character);return;}
    if(el.dataset.badge){openBadge(el.dataset.badge);return;}
    if(el.hasAttribute('data-prologue-line')){prologue.line=Number(el.dataset.prologueLine);await startPrologueLine();return;}
    const action=el.dataset.action;
    if(action==='prologue')openPrologue();
    if(action==='close-dialog')closeDialog();
    if(action==='skip-prologue'||action==='finish-prologue')finishPrologue();
    if(action==='full-story')openFullStory();
    if(action==='story-map'){closeDialog();location.hash='map';}
    if(action==='retry-metadata'){el.disabled=true;await loadEpisodeMetadata();renderSection({restoreY:scrollY});}
    if(action==='previous-page')flipPrologue(-1);
    if(action==='next-page')flipPrologue(1);
    if(action==='replay-line')await startPrologueLine();
    if(action==='mute'){
      muted=!muted;memory.set('cc_hq_muted',String(muted));if(audio)audio.muted=muted;
      el.innerHTML=icon(muted?'muted':'sound');el.setAttribute('aria-label',muted?C.buttons.unmute:C.buttons.mute);
    }
    if(action==='prologue-play'&&prologue){
      if(prologue.playing){pauseAudio();prologue.playing=false;updatePrologueControls();}
      else if(audio&&!audio.ended&&audio.currentTime>0){
        const current=prologue, player=audio, epoch=audioEpoch, request=++audioRequest;
        current.playing=true;updatePrologueControls();
        try {
          await player.play();
          if(prologue!==current || !audioStillCurrent(player,epoch,request)) return;
          current.playing=!player.paused&&!player.ended;updatePrologueControls();
        } catch {
          if(prologue!==current || !audioStillCurrent(player,epoch,request)) return;
          current.playing=false;updatePrologueControls();announce(C.states.audioFailed);
        }
      }
      else await startPrologueLine();
    }
    if(action==='play-quote'){
      const c=HQ.characters.find(c=>c.id===el.dataset.id);
      const q=c.finaleQuote&&allStars()?c.finaleQuote:c.quote;
      if (el.dataset.playing==='true' && audio) {
        pauseAudio();el.dataset.playing='paused';el.innerHTML=icon('play')+esc(C.buttons.resume);
      } else if (el.dataset.playing==='paused' && audio && !audio.ended) {
        const player=audio, epoch=audioEpoch, request=++audioRequest;
        el.dataset.playing='true';el.innerHTML=icon('pause')+esc(C.buttons.pause);
        try {
          await player.play();
          if(!el.isConnected || !audioStillCurrent(player,epoch,request)) return;
          if(player.paused || player.ended){el.dataset.playing='false';el.innerHTML=icon('replay')+esc(C.buttons.listenAgain);}
        } catch {
          if(!el.isConnected || !audioStillCurrent(player,epoch,request)) return;
          el.dataset.playing='paused';el.innerHTML=icon('play')+esc(C.buttons.resume);announce(C.states.audioFailed);
        }
      } else {
        const pending=playLine(q,$('[data-quote-text]'),()=>{el.dataset.playing='false';el.innerHTML=icon('replay')+esc(C.buttons.listenAgain);});
        const player=audio, epoch=audioEpoch, request=audioRequest;
        el.dataset.playing='true';el.innerHTML=icon('pause')+esc(C.buttons.pause);
        const ok=await pending;
        if(!el.isConnected || !audioStillCurrent(player,epoch,request)) return;
        if(!ok){el.dataset.playing='false';el.innerHTML=icon('play')+esc(C.buttons.listen);}
      }
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='prologue-rate'){rate=Number(event.target.value);memory.set('cc_hq_rate',String(rate));if(audio)audio.playbackRate=rate;event.target.setAttribute('aria-label',fmt(C.accessibility.rate,{rate}));}
    if(event.target.id==='prologue-auto'&&prologue)prologue.auto=event.target.checked;
  });
  window.__hqState=()=>({section,stars:[...stars],metadataFailures:[...metaFailures],prologueSeen:!!memory.get('cc_prologue_seen'),prologue:prologue?{...prologue}:null,rate,muted,playingWord:document.querySelector('.word.on')?.textContent||null});
}
await init();
