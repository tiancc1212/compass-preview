#!/usr/bin/env python3
"""Forced-ish word alignment for Compass Crew episodes.
For every line in <episode>/audio/lines.json, read audio/<id>.mp3, run faster-whisper
with word timestamps (CPU), match recognised words to the script words, and write
[word,start,end] timings + dur back to lines.json. Falls back to duration-proportional
timing when alignment fails or matches too few words.
Usage: venv/bin/python align.py [episode_dir ...]   (default: both episodes)
       options: --model base.en  --min-match 0.5  --dry-run
"""
import sys, json, re, subprocess, difflib, argparse, os
ap=argparse.ArgumentParser();ap.add_argument('eps',nargs='+')
ap.add_argument('--model',default='base.en');ap.add_argument('--min-match',type=float,default=0.5);ap.add_argument('--dry-run',action='store_true')
A=ap.parse_args()
norm=lambda w:re.sub(r"[^a-z0-9']","",w.lower().replace('’',"'"))
def duration(p):
    return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p],capture_output=True,text=True).stdout.strip())
def proportional(words,dur,lead=0.05):
    w=[len(x)+2 for x in words];tot=sum(w);t=lead;out=[];span=max(dur-lead-0.1,0.3)
    for x,k in zip(words,w):d=span*k/tot;out.append([x,round(t,3),round(t+d,3)]);t+=d
    return out
_model=None
def model():
    global _model
    if _model is None:
        from faster_whisper import WhisperModel
        _model=WhisperModel(A.model,device='cpu',compute_type='int8')
    return _model
def align(path,text,dur):
    words=text.split()
    import numpy as np
    raw=subprocess.run(['ffmpeg','-v','error','-i',path,'-f','f32le','-ac','1','-ar','16000','-'],capture_output=True,check=True).stdout
    segs,_=model().transcribe(np.frombuffer(raw,np.float32),language='en',word_timestamps=True,initial_prompt=text,beam_size=5,vad_filter=False)
    rec=[w for s in segs for w in (s.words or [])]
    a=[norm(w) for w in words];b=[norm(w.word) for w in rec]
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    T=[None]*len(words)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):T[blk.a+k]=(rec[blk.b+k].start,rec[blk.b+k].end)
    matched=sum(t is not None for t in T)/max(len(words),1)
    if matched<A.min_match:return None,matched
    # fill gaps by interpolating between known neighbours
    i=0
    while i<len(T):
        if T[i] is None:
            j=i
            while j<len(T) and T[j] is None:j+=1
            s=T[i-1][1] if i>0 else 0.05
            e=T[j][0] if j<len(T) else dur-0.1
            n=j-i;step=max(e-s,0.05*n)/n
            for k in range(n):T[i+k]=(s+k*step,s+(k+1)*step)
            i=j
        else:i+=1
    return [[w,round(s,3),round(max(e,s+0.05),3)] for w,(s,e) in zip(words,T)],matched
for ep in A.eps:
    jp=os.path.join(ep,'audio','lines.json');L=json.load(open(jp))
    print('==',ep)
    for id,v in L.items():
        p=os.path.join(ep,'audio',id+'.mp3')
        if not os.path.exists(p):print(f'  {id}: missing audio, kept');continue
        dur=duration(p)
        try:ws,m=align(p,v['text'],dur)
        except Exception as ex:ws,m=None,0;print('  ',id,'error',ex)
        mode='whisper'
        if ws is None:ws=proportional(v['text'].split(),dur);mode='proportional'
        print(f'  {id:14s} {dur:5.2f}s {mode:12s} match={m:.0%}')
        v['words']=ws;v['dur']=round(dur,3);v['align']=mode
    if not A.dry_run:json.dump(L,open(jp,'w'),indent=1,ensure_ascii=False)
