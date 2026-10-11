// =====================================================================
// Compass Crew episode engine — shared by every episode (ep02, ep16, …)
// An episode folder only holds content: index.html (stub), episode.js,
// audio/, illus/, downloads/, optional episode.css. See tools/handoff_单集制作流程.md
// =====================================================================
const V=new URL(import.meta.url).searchParams.get('v')||'0';
const EU=p=>new URL(p+'?v='+V,import.meta.url).href;                       // engine asset url
const EPV=document.documentElement.dataset.v||'0';                         // episode content version (index.html <html data-v>)
const {badge}=await import(EU('./badges.js'));
const {icon}=await import(EU('./icons.js'));
const {renderCompass,renderStarProgress,readStars,saveStar,isFinaleUnlocked,lightCompassSlot,COMPASS_ASSETS}=await import(EU('./compass.js'));
const cleanLabel=s=>String(s||'').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,'').trim();
const control=(name,label)=>`${icon(name)}<span class="button-label">${cleanLabel(label)}</span>`;
const returnSection=new URLSearchParams(location.search).get('hq');
const hqHref='../hq/#'+(['map','characters','journal','badges','downloads'].includes(returnSection)?returnSection:'map');
const EP=(await import(new URL('episode.js?v='+EPV,location.href).href)).default;
// ---- css + page shell ----
const css=h=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=h;l.onload=l.onerror=r;document.head.appendChild(l);});
await Promise.all([css(EU('./base.css')),css(EU('./layout.css')),css(EU('./compass/compass.css'))]);if(EP.css)await css('episode.css?v='+EPV);
const rs=document.documentElement.style;if(EP.theme){if(EP.theme.bg)rs.setProperty('--bg',EP.theme.bg);if(EP.theme.stage)rs.setProperty('--stagebg',EP.theme.stage);}
document.body.classList.add('at-home');
document.body.insertAdjacentHTML('afterbegin',`<div id="backdrop"></div><div id="stage"></div><div id="home"></div>
<div id="loading" role="status">罗盘正在苏醒…</div>
<div id="hud"><a class="btn hud-hq" href="${hqHref}" aria-label="返回冒险队总部" title="返回冒险队总部">${control('home','总部')}</a><div id="title">${icon('compass')}<span>${cleanLabel(EP.hud)}</span></div><div class="sp"></div><div id="stars" aria-live="polite"></div>
<button class="btn" id="rate" aria-label="语速 1 倍"></button><button class="btn" id="auto" aria-label="自动播放" aria-pressed="false"></button><button class="btn" id="review" aria-label="重看上一节">${control('book','重看上一节')}</button><button class="btn" id="backex" aria-label="回到练习">${control('left','回到练习')}</button><button class="btn" id="replay" aria-label="重播本句">${control('replay','重播本句')}</button><button class="btn" id="mute" aria-label="声音开"></button></div>
<div id="start" style="display:none"><div class="start-card"><div class="start-art"></div><div class="start-copy"><p class="chapter-overline">第 ${EP.no} 站 · 罗盘冒险队</p><h1>${EP.start.h1}</h1><div class="subt">${EP.start.subt}</div><div class="start-actions"><button class="btn big" id="go">${control('right',cleanLabel(EP.start.go)||'出发')}</button><a class="btn secondary" href="${hqHref}">${control('left','冒险队总部')}</a></div><p class="start-lock" id="entry-lock" hidden role="status"></p></div></div></div>
<div id="sub"><div id="who"></div><span id="lpos"></span><div id="line"></div><div id="zh"></div><div id="ghint" aria-live="polite"></div><div id="lnav"><button class="btn" id="lprev" aria-label="上一句">${control('left','上一句')}</button><span class="lhint">手机左右滑动 · 电脑 ← → 键</span><button class="btn" id="lnext" aria-label="下一句">${control('right','下一句')}</button></div></div>
<div id="panel"></div><div id="flash"></div><img id="flystar" src="${COMPASS_ASSETS.starLit}" alt="" width="256" height="256" aria-hidden="true">`);
// template tokens usable in any episode.js html string: {{b:TD:34}} badge · {download} Word link · {n} stars collected
let NSTARS=0;
const tpl=s=>String(s??'').replace(/\{\{b:([A-Z]+)(?::(\d+))?\}\}/g,(_,r,z)=>badge(r,{size:+(z||34)})).replace(/\{download\}/g,EP.download?`<a class="btn" href="${EP.download.href}" download="${EP.download.name}">${control('download',EP.download.label||'下载知识点（Word）')}</a>`:'').replace(/\{n\}/g,()=>NSTARS);
const Q=new URLSearchParams(location.search);const $=s=>document.querySelector(s);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches||Q.get("rm")==="1";if(RM)document.body.classList.add("rm");
// ---------- audio / subtitles ----------
let LINES={},muted=Q.get('mute')==='1',curLine=null,curAudio=null,skipFlag=null;
const WHO=Object.assign({narrator:['旁白','#8a6a48'],leo:['Leo','#e0322b'],mia:['Mia','#9b7fd6'],sam:['Sam','#f08a00'],lily:['Lily','#2e9e6b'],grandpa:['爷爷','#6d4c2f'],monster:['怪兽 Grumble','#7b4fd0']},EP.speakers||{});
let AC=null;const ac=()=>AC||(AC=new (window.AudioContext||window.webkitAudioContext)());
function sfx(type){if(muted)return;try{const a=ac(),t=a.currentTime;const g=a.createGain();g.connect(a.destination);
 const tone=(f,st,d,tp='sine',v=.18)=>{const o=a.createOscillator();o.type=tp;o.frequency.setValueAtTime(f,t+st);const gg=a.createGain();gg.gain.setValueAtTime(0,t+st);gg.gain.linearRampToValueAtTime(v,t+st+.01);gg.gain.exponentialRampToValueAtTime(.001,t+st+d);o.connect(gg);gg.connect(a.destination);o.start(t+st);o.stop(t+st+d+.05);return o;};
 if(type==='ok'){tone(784,0,.18);tone(1046,.09,.3);tone(1318,.18,.4);}
 else if(type==='bad'){const o=tone(300,0,.35,'triangle',.15);o.frequency.exponentialRampToValueAtTime(120,t+.3);}
 else if(type==='whoosh'){const o=tone(200,0,1.2,'sawtooth',.06);o.frequency.exponentialRampToValueAtTime(1600,t+1.1);}
 else if(type==='door'){const o=tone(70,0,1.6,'sawtooth',.08);o.frequency.linearRampToValueAtTime(45,t+1.5);}
 else if(type==='star'){[0,.08,.16,.24,.32].forEach((s,i)=>tone(880*Math.pow(1.26,i),s,.5,'sine',.12));}
 else if(type==='flip'){tone(500,0,.12,'square',.05);tone(700,.1,.12,'square',.05);}
}catch(e){}}
// ---------- voice player + story reader (manual paging / auto read / mute-safe) — shared by all episodes ----------
const RATES=[0.75,1,1.25];let RATE=+(localStorage.getItem('cc_rate')||1);if(!RATES.includes(RATE))RATE=1;
function voice(src){const a=new Audio(src+(EP.audioVersion?'?v='+EP.audioVersion:''));a.playbackRate=RATE;a.preservesPitch=true;a.mozPreservesPitch=true;a.webkitPreservesPitch=true;return a;}
function setRate(r){RATE=r;localStorage.setItem('cc_rate',r);if(curAudio)curAudio.playbackRate=r;const b=$('#rate');if(b){b.innerHTML=control('speed',r+'x');b.setAttribute('aria-label','语速 '+r+' 倍');b.title='语速 '+r+' 倍';}}
const HL=[];window.__hl=HL;   // debug log: [lineId, wordIndex, audioTime]
// playLine: show subtitle, play audio once, highlight strictly from audio clock. timed=true -> when muted / no audio, run a virtual clock at RATE.
// returns stop(); calls onEnd() when the line finishes (never when stopped).
let stopCur=null;
function playLine(id,zh,{timed=true,onEnd}={}){
 if(stopCur)stopCur();const L=LINES[id];if(!L){onEnd&&setTimeout(onEnd,0);return ()=>{};}
 curLine={id,zh};const sub=$('#sub');sub.style.display='block';
 const W=WHO[L.who]||[L.who,'#8a6a48'];$('#who').textContent=W[0];$('#who').style.background=W[1];
 $('#line').innerHTML=L.words.map(w=>`<span>${w[0]}</span>`).join(' ');$('#zh').textContent=zh||'';
 const spans=[...$('#line').children];renderHint(id,L,spans);let stopped=false,raf=0,au=null,last=-2,vt=null,prev=0;
 const paint=t=>{let k=-1;for(let i=0;i<L.words.length;i++)if(t>=L.words[i][1])k=i;   // last word whose start has passed; -1 before speech
  if(k!==last){last=k;spans.forEach((s,i)=>{s.classList.toggle('on',i===k);s.classList.toggle('done',i<k);});HL.push([id,k,+t.toFixed(3)]);if(HL.length>400)HL.shift();}};
 const finish=()=>{if(stopped)return;stopped=true;cancelAnimationFrame(raf);spans.forEach(s=>{s.classList.remove('on');s.classList.add('done');});document.body.classList.remove('playing');onEnd&&onEnd();};
 const tickAudio=()=>{if(stopped)return;paint(au.currentTime);raf=requestAnimationFrame(tickAudio);};
 const tickVirtual=()=>{if(stopped)return;const now=performance.now();vt+=(now-prev)/1000*RATE;prev=now;paint(vt);if(vt>=L.dur+0.15)return finish();raf=requestAnimationFrame(tickVirtual);};
 const startVirtual=()=>{if(stopped||vt!==null)return;if(!timed){spans.forEach(s=>s.classList.add('all'));return;}vt=0;prev=performance.now();document.body.classList.add('playing');raf=requestAnimationFrame(tickVirtual);};
 if(!muted){au=voice('audio/'+id+'.mp3');curAudio=au;document.body.classList.add('playing');
  au.addEventListener('playing',()=>{if(!stopped&&vt===null){cancelAnimationFrame(raf);raf=requestAnimationFrame(tickAudio);}},{once:true});
  au.addEventListener('ended',()=>{if(vt===null)finish();});
  au.addEventListener('error',()=>{au=null;startVirtual();});
  au.play().catch(()=>{if(!stopped){au=null;startVirtual();}});}
 else startVirtual();
 const stop=()=>{if(stopped)return;stopped=true;cancelAnimationFrame(raf);if(au){au.pause();}document.body.classList.remove('playing');if(stopCur===stop)stopCur=null;};
 stopCur=stop;return stop;}
// ---- per-line grammar hints (audio/hints.json): [{b:'TD',hl:'too small to guard',zh:'…'}] ----
let HINTS={};
const nw=w=>w.toLowerCase().replace(/[^a-z']/g,'');
function renderHint(id,L,spans){const box=$('#ghint');if(!box)return;const H=HINTS[id]||[];box.classList.toggle('on',H.length>0);
 box.innerHTML=H.map(h=>`<div class="gi">${badge(h.b,{size:28,variant:'flat'})}<span>${h.zh}</span></div>`).join('');
 const ws=L.words.map(w=>nw(w[0]));H.forEach(h=>{const ph=h.hl.split(/\s+/).map(nw);for(let i=0;i+ph.length<=ws.length;i++){if(ph.every((p,k)=>ws[i+k]===p)){for(let k=0;k<ph.length;k++)spans[i+k].classList.add('gk','gk-'+h.b);break;}}});}
// one-off line (ending / cards): always advances, even when muted
// (restarts if the child toggles mute / replay mid-line; subtitles:false = voice only, e.g. answer rewards)
function say(id,zh='',{subtitles=true}={}){return new Promise(res=>{const controls=[$('#mute'),$('#replay')];const restart=()=>{if(curAudio)curAudio.pause();playLine(id,zh,{timed:true,onEnd:()=>{controls.forEach(b=>b.removeEventListener('click',restart));if(!subtitles)$('#sub').style.display='none';setTimeout(res,300);}});if(!subtitles)$('#sub').style.display='none';};controls.forEach(b=>b.addEventListener('click',restart));restart();});}
// ---- story sections ----
// item: {id, zh, img?, overlay?, fx?}
let RD=null;           // active reader state
let lastSection=null;  // most recent story section (for 重看上一节)
let autoMode=false;   // default: manual paging
function setAuto(on){autoMode=on;const b=$('#auto');if(b){b.innerHTML=control(on?'pause':'play',on?'停止自动':'自动播放');b.setAttribute('aria-label',on?'停止自动':'自动播放');b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);}
 if(RD&&on&&!document.body.classList.contains('playing'))RD.go(RD.i,true);}
function readSection(items,{start=0,review=false}={}){return new Promise(res=>{
 if(!review){hidePanel();lastSection=items;document.body.classList.add('hasreview');}document.body.classList.add('reading');document.body.classList.toggle('reviewing',review);
 const R={items,i:-1};RD=R;
 const end=()=>{if(stopCur)stopCur();RD=null;document.body.classList.remove('reading','reviewing','lastline');$('#sub').style.display='none';res();};
 R.go=(i,replay=false)=>{if(i<0)i=0;if(i>=items.length)return end();const it=items[i];const changed=i!==R.i;R.i=i;
  if(it.img&&(changed||replay))showImg(it.img,it.overlay||'');if(it.fx&&changed)sfx(it.fx);
  document.body.classList.toggle('lastline',i===items.length-1);$('#lpos').textContent=(i+1)+' / '+items.length;
  playLine(it.id,it.zh,{timed:autoMode,onEnd:()=>{if(autoMode&&RD===R)setTimeout(()=>{if(autoMode&&RD===R&&R.i===i)R.go(i+1);},350);}});};
 R.next=()=>R.go(R.i+1);R.prev=()=>R.go(R.i-1);R.end=end;
 R.go(start);});}
const userNav=f=>{if(!RD)return;if(autoMode)setAuto(false);f();};
window.__next=()=>RD&&RD.next();window.__prev=()=>RD&&RD.prev();window.__reading=()=>!!RD;
$('#lprev').onclick=()=>userNav(()=>RD.prev());$('#lnext').onclick=()=>userNav(()=>RD.next());
addEventListener('keydown',e=>{if(!RD||e.target.closest('input,textarea'))return;if(e.key==='ArrowRight'){e.preventDefault();userNav(()=>RD.next());}else if(e.key==='ArrowLeft'){e.preventDefault();userNav(()=>RD.prev());}});
{let sx=null,sy=0,st=0;   // swipe only while a story section is on screen (no panel/exercise visible)
 addEventListener('touchstart',e=>{if(!RD||e.touches.length!==1||e.target.closest('#hud,button'))return sx=null;sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=Date.now();},{passive:true});
 addEventListener('touchend',e=>{if(sx===null||!RD)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5&&Date.now()-st<800)userNav(()=>dx<0?RD.next():RD.prev());},{passive:true});}
$('#auto').onclick=()=>setAuto(!autoMode);setAuto(autoMode);
$('#rate').onclick=()=>setRate(RATES[(RATES.indexOf(RATE)+1)%RATES.length]);setRate(RATE);
function updateMuteButton(){const b=$('#mute'),label=muted?'已静音':'声音开';b.innerHTML=control(muted?'mute':'sound',label);b.setAttribute('aria-label',label);b.setAttribute('aria-pressed',String(muted));b.title=label;}
$('#mute').onclick=()=>{muted=!muted;updateMuteButton();if(curAudio)curAudio.pause();if(RD)RD.go(RD.i);};
$('#replay').onclick=()=>{if(RD)RD.go(RD.i);else if(curLine&&!muted){const a=voice('audio/'+curLine.id+'.mp3');curAudio=a;a.play().catch(()=>{});}};
// ---- 重看上一节: leave the current activity untouched, re-read the last story section, then come back ----
async function reviewSection(){if(!lastSection||RD)return;const pn=$('#panel');const keep=document.createDocumentFragment();while(pn.firstChild)keep.appendChild(pn.firstChild);
 const disp=pn.style.display,img=curImg,ov=curOverlay;pn.style.display='none';if(curAudio)curAudio.pause();document.body.classList.add('inreview');
 await readSection(lastSection,{review:true});
 document.body.classList.remove('inreview');pn.appendChild(keep);pn.style.display=disp||'flex';curImg=null;if(img)showImg(img,ov);}
$('#review').onclick=reviewSection;$('#backex').onclick=()=>{if(RD)RD.end();};
window.__review=reviewSection;window.__rate=()=>RATE;


// ---------- particles ----------
function sparkle(el,n=14,chars=['✨','⭐','💛','✦'],{sprite}={}){if(RM||!el)return;const r=el.getBoundingClientRect();for(let i=0;i<n;i++){const s=document.createElement(sprite?'img':'div');s.className=sprite?'spark spark-sprite':'spark';if(sprite){s.src=sprite;s.alt='';s.setAttribute('aria-hidden','true');}else s.textContent=chars[i%chars.length];
 s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';const a=Math.random()*Math.PI*2,d=60+Math.random()*90;s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),950);}}
// ---------- panel helpers ----------
function polishButtons(root){root.querySelectorAll('button').forEach(b=>{if(b.querySelector('.ui-icon'))return;const walker=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);while(walker.nextNode())walker.currentNode.textContent=walker.currentNode.textContent.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,'');});}

const panel=$('#panel');const showPanel=h=>{panel.innerHTML=h;polishButtons(panel);panel.style.display='flex';$('#sub').style.display='none';document.body.classList.add('inpanel');};const hidePanel=()=>{panel.style.display='none';panel.innerHTML='';document.body.classList.remove('inpanel');};
const normTxt=s=>(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
let AUTO=null;window.__solve=()=>AUTO&&AUTO();window.__auto=()=>AUTO&&AUTO();
// rule list used by typed / rewrite hints: [{re:'ing$', zh:'…', not:true?}] first match wins
const ruleMsg=(rules,v)=>{for(const r of rules||[]){const m=new RegExp(r.re).test(v);if(r.not?!m:m)return r.zh;}return null;};

// ================= activity type: drag (chunks into badge boxes or inline blanks) =================
// {type:'drag', title, desc, mode:'box'|'blank', slots:[{k,b,title,sub,pre,post,ctx}], chunks:[{t,k,h,ok?}] (k:null = distractor), tip, audio, prog:[n,i]}
function dragGame(cfg){return new Promise(res=>{
 const C=cfg.chunks;const order=C.map((c,i)=>i);for(let i=order.length-1;i>0;i--){const j=(i*7+3)%(i+1);[order[i],order[j]]=[order[j],order[i]];}
 if(order.length>1&&order.every((v,i)=>v===i))order.reverse();
 const slotHtml=s=>cfg.mode==='blank'
  ?`<div class="brow">${s.ctx?`<div class="ctx">${s.ctx}</div>`:''}<div class="bsent">${s.pre||''}<span class="slot bslot" data-k="${s.k}">${s.b?`<span class="bb">${badge(s.b,{size:26,variant:'flat'})}</span>`:''}<span class="drop"></span></span>${s.post||''}</div></div>`
  :`<div class="slot" data-k="${s.k}" ${s.b?`data-b="${s.b}"`:''}><div class="slab">${s.b?badge(s.b,{size:40}):''}<span class="lt">${s.title}<small>${s.sub||''}</small></span></div><div class="drop"></div></div>`;
 showPanel(`<div class="card dcard" data-activity="${cfg.id||''}"><h2>${cfg.title}</h2><p class="desc">${cfg.desc}</p>
  <div class="bankwrap"><div class="bank">${order.map(i=>`<button class="dchunk" data-i="${i}">${C[i].t}</button>`).join('')}</div></div>
  <div class="slots ${cfg.mode==='blank'?'blanks':'boxes n'+cfg.slots.length}">${cfg.slots.map(slotHtml).join('')}</div>
  <p id="tip" class="tip" aria-live="polite"></p>${cfg.prog?prog(cfg.prog[0],cfg.prog[1]):''}<div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.dcard'),tip=card.querySelector('#tip');let sel=null,left=C.filter(c=>c.k).length;
 const multi=cfg.mode!=='blank';
 const clearSel=()=>{if(sel)sel.classList.remove('sel');sel=null;card.querySelectorAll('.slot').forEach(s=>s.classList.remove('armed'));};
 const back=el=>{el.style.transition=RM?'none':'transform .25s cubic-bezier(.3,1.6,.5,1)';el.style.transform='';if(!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}};
 function attempt(el,slot){if(!slot||(!multi&&slot.classList.contains('filled')))return back(el);const c=C[+el.dataset.i];const sd=cfg.slots.find(s=>s.k===slot.dataset.k);
  if(c.k===slot.dataset.k){el.style.transition='none';el.style.transform='';slot.querySelector('.drop').appendChild(el);slot.classList.add('filled');const cls=c.b||sd.b;if(cls){el.classList.add(cls);if(!multi)slot.classList.add(cls);}el.classList.add('placed');el.disabled=true;
   if(!RM){el.classList.remove('snap');void el.offsetWidth;el.classList.add('snap');}sfx('ok');sparkle(el,8);tip.innerHTML=c.ok?'✔ '+c.ok:'';left--;
   if(left===0){card.querySelectorAll('.bank .dchunk').forEach(d=>d.remove());tip.innerHTML='✅ '+cfg.tip;card.classList.add('done');
    if(cfg.audio){const a=voice('audio/'+cfg.audio+'.mp3');if(!muted)a.play();curLine={id:cfg.audio};}
    if(Q.get('fast'))setTimeout(res,300);else{const nb=document.createElement('button');nb.className='btn big';nb.textContent='继续 ➜';nb.onclick=res;window.__continue=res;card.querySelector('.nextwrap').appendChild(nb);nb.focus();}}}
  else{sfx('bad');back(el);tip.innerHTML='再想想：'+(c.h||`“${c.t}”不放在这里。`);}
  clearSel();}
 card.querySelectorAll('.dchunk').forEach(el=>{
  el.addEventListener('pointerdown',e=>{if(el.disabled)return;e.preventDefault();el.setPointerCapture(e.pointerId);const sx=e.clientX,sy=e.clientY;let moved=false;el.style.transition='none';el.classList.add('dragging');
   const hit=ev=>{el.style.visibility='hidden';const t=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.slot');el.style.visibility='';return t;};
   const mv=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(Math.hypot(dx,dy)>6)moved=true;if(moved)el.style.transform=`translate(${dx}px,${dy}px) scale(1.08)`;
    card.querySelectorAll('.slot').forEach(s=>s.classList.remove('hover'));if(moved){const t=hit(ev);if(t)t.classList.add('hover');}};
   const up=ev=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.classList.remove('dragging');card.querySelectorAll('.slot').forEach(s=>s.classList.remove('hover'));
    if(!moved){el.style.transform='';if(sel===el){clearSel();return;}clearSel();sel=el;el.classList.add('sel');card.querySelectorAll(multi?'.slot':'.slot:not(.filled)').forEach(s=>s.classList.add('armed'));tip.textContent='已选中“'+el.textContent+'”，再点一个格子放进去。';return;}
    attempt(el,hit(ev));};
   el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clearSel();sel=el;el.classList.add('sel');card.querySelectorAll('.slot').forEach(s=>s.classList.add('armed'));}});});
 card.querySelectorAll('.slot').forEach(s=>{s.tabIndex=0;const go=()=>{if(sel)attempt(sel,s);};s.addEventListener('click',go);s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
 window.__try=(i,k)=>attempt(card.querySelector(`.dchunk[data-i="${i}"]`),card.querySelector(`.slot[data-k="${k}"]`));
 window.__auto=()=>C.forEach((c,i)=>{if(c.k)window.__try(i,c.k);});
});}
const prog=(n,i)=>`<div class="prog">${Array.from({length:n},(_,j)=>`<i class="${j<i?'ok':''}"></i>`).join('')}</div>`;

// ================= activity type: steps (one card, several questions) =================
// audio is played ONLY after the child has answered correctly (reward / confirmation)
function reward(id){if(!id)return;curLine={id};if(curAudio){curAudio.pause();}if(muted)return;const a=voice('audio/'+id+'.mp3');curAudio=a;a.play().catch(()=>{});}
// {type:'steps', id, title, badge?, desc, tip, steps:[{kind,...}]}
// EP.rewardWait=true: the "next" button unlocks only after the reward voice ends, last step auto-continues.
function stepCard({id,title,badge:bd,desc,steps,tip,miss}){steps=steps.map(s=>typeof s.mount==='function'?s:STEP[s.kind](miss&&s.miss==null?{...s,miss}:s));return new Promise(res=>{let i=0;
 showPanel(`<div class="card qcard" data-activity="${id||''}"><h2${bd?' class="hb"':''}>${bd?badge(bd,{size:36})+' ':''}${title}</h2><p class="desc">${desc||''}</p><div class="qbody"></div><p class="tip" aria-live="polite"></p><div class="prog"></div><div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.qcard'),body=card.querySelector('.qbody'),tipEl=card.querySelector('.tip'),pg=card.querySelector('.prog'),nw=card.querySelector('.nextwrap');
 const stopReward=()=>{if(stopCur)stopCur();if(curAudio)curAudio.pause();};
 const draw=()=>{pg.innerHTML=steps.length>1?steps.map((_,j)=>`<i class="${j<i?'ok':''}"></i>`).join(''):'';};
 const go=()=>{card.dataset.step=i+1;draw();nw.innerHTML='';tipEl.innerHTML='';const s=steps[i];body.innerHTML=s.html;body.classList.remove('solved');let solved=false;
  const api={tip:h=>{tipEl.innerHTML=h;},bad:(h,el)=>{sfx('bad');tipEl.innerHTML='<span class="no">再想想：</span>'+h;if(el&&!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}},
   ok:async(h,au)=>{if(solved)return;solved=true;sfx('ok');body.classList.add('solved');tipEl.innerHTML='✅ '+(h||'');i++;draw();AUTO=null;
    const last=i>=steps.length;if(last&&tip)tipEl.innerHTML+=`<div class="sum">${tip}</div>`;
    let advanced=false;const advance=()=>{if(advanced)return;if(document.body.classList.contains('inreview')){setTimeout(advance,150);return;}advanced=true;if(EP.rewardWait)stopReward();last?(hidePanel(),res()):go();};
    window.__continue=advance;
    if(!EP.rewardWait){reward(au);
     if(Q.get('fast')){setTimeout(advance,250);return;}
     const nb=document.createElement('button');nb.className='btn big';nb.textContent=last?'继续 ➜':'下一题 ➜';nb.onclick=advance;nw.appendChild(nb);nb.focus({preventScroll:true});return;}
    let nb=null;if(!last){nb=document.createElement('button');nb.className='btn big';nb.textContent='下一题 ➜';nb.disabled=true;nb.onclick=advance;nw.appendChild(nb);}
    if(au&&!Q.get('fast'))await say(au,'',{subtitles:false});
    if(last||Q.get('fast'))advance();else{nb.disabled=false;nb.focus({preventScroll:true});}}};
  s.mount(body,api);window.__auto=()=>AUTO&&AUTO();};
 go();});}

// ---------------- step kinds ----------------
// Pointer dragging, tapping a chip then a target, and keyboard selection share one path (sort / blank kinds).
function bindPlacement(el,attempt){let sel=null;
 const select=b=>{el.querySelectorAll('.dchunk').forEach(x=>x.classList.remove('sel'));sel=b;b.classList.add('sel');};
 el.querySelectorAll('.dchunk').forEach(b=>{b.onclick=()=>{if(!b.disabled)select(b);};b.addEventListener('pointerdown',e=>{if(b.disabled)return;e.preventDefault();b.setPointerCapture(e.pointerId);const x=e.clientX,y=e.clientY;let moved=false;
 const mv=e=>{if(Math.hypot(e.clientX-x,e.clientY-y)>8)moved=true;if(moved){b.classList.add('dragging');b.style.transform=`translate(${e.clientX-x}px,${e.clientY-y}px)`;}};
 const up=e=>{b.removeEventListener('pointermove',mv);b.removeEventListener('pointerup',up);b.removeEventListener('pointercancel',up);b.classList.remove('dragging');b.style.transform='';if(e.type==='pointercancel')return;if(moved){b.style.visibility='hidden';const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-target]');b.style.visibility='';if(target)attempt(b,target);}else select(b);};
 b.addEventListener('pointermove',mv);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);});});
 el.querySelectorAll('[data-target]').forEach(t=>{const place=()=>{if(sel&&!sel.disabled){attempt(sel,t);sel.classList.remove('sel');sel=null;}};t.onclick=place;t.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();place();}};});}
const STEP={
 // match: {pairs:[{t,k,ex,au,h}], targets:[{k,b,t}], done?}
 match({pairs:P,targets:T,done='全部连对！'}){return {html:`<div class="match"><svg class="mlines"></svg><div class="mleft">${P.map((p,i)=>`<button class="mitem" data-i="${i}">${p.t}<small class="mex"></small></button>`).join('')}</div><div class="mright">${T.map(x=>`<button class="mtarget ${x.b}" data-k="${x.k}">${badge(x.b,{size:34})}<span>${x.t}</span></button>`).join('')}</div></div>`,
  mount(el,api){let sel=null,left=P.length;const svg=el.querySelector('.mlines'),box=el.querySelector('.match');
   const line=(a,b,cls)=>{const r=box.getBoundingClientRect(),ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();const l=document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',ra.right-r.left);l.setAttribute('y1',ra.top+ra.height/2-r.top);l.setAttribute('x2',rb.left-r.left);l.setAttribute('y2',rb.top+rb.height/2-r.top);l.setAttribute('class',cls);svg.appendChild(l);l._a=a;l._b=b;return l;};
   const redraw=()=>svg.querySelectorAll('line').forEach(l=>{const n=line(l._a,l._b,l.getAttribute('class'));l.replaceWith(n);});
   addEventListener('resize',redraw);
   const pick=it=>{if(it.disabled)return;el.querySelectorAll('.mitem').forEach(x=>x.classList.remove('sel'));sel=it;it.classList.add('sel');el.classList.add('armed');api.tip('已选中“'+it.firstChild.textContent+'”，再点右边一个形式。');};
   const tryT=(it,tg)=>{const p=P[+it.dataset.i];el.classList.remove('armed');it.classList.remove('sel');sel=null;
    if(tg.dataset.k===p.k){it.disabled=true;it.classList.add('done',T.find(x=>x.k===p.k).b);it.querySelector('.mex').textContent=p.ex;line(it,tg,'ok '+p.k);redraw();left--;
     if(left===0)api.ok(done,p.au);else{sfx('ok');api.tip('✔ '+p.ex);reward(p.au);}}
    else api.bad(p.h,it);};
   el.querySelectorAll('.mitem').forEach(it=>{it.addEventListener('pointerdown',e=>{if(it.disabled)return;const sx=e.clientX,sy=e.clientY;let moved=false;
     const ghost=line(it,it,'drag');const mv=ev=>{if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>8)moved=true;const r=box.getBoundingClientRect();ghost.setAttribute('x2',ev.clientX-r.left);ghost.setAttribute('y2',ev.clientY-r.top);};
     const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);ghost.remove();if(!moved){pick(it);return;}const tg=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.mtarget');if(tg){sel=it;tryT(it,tg);}};
     addEventListener('pointermove',mv);addEventListener('pointerup',up);});});
   el.querySelectorAll('.mtarget').forEach(tg=>tg.addEventListener('click',()=>{if(sel)tryT(sel,tg);else api.tip('先点左边的一个短语。');}));
   AUTO=()=>P.forEach((p,i)=>{const it=el.querySelector(`.mitem[data-i="${i}"]`);if(!it.disabled){sel=it;tryT(it,el.querySelector(`.mtarget[data-k="${p.k}"]`));}});}};},
 // pick: two pictures, two sentences each. {verb, pics:[{img,good,bad,au,why}], rule}
 pick({verb,pics,rule}){return {html:`<h3 class="qv">${verb}</h3><div class="pics">${pics.map((p,j)=>{const opts=j%2?[p.bad,p.good]:[p.good,p.bad];return `<div class="pic" data-j="${j}"><img src="illus/${p.img}.jpg" alt="" loading="lazy"><div class="popts">${opts.map(o=>`<button class="popt">${esc(o)}</button>`).join('')}</div></div>`;}).join('')}</div>`,
  mount(el,api){let left=pics.length;el.querySelectorAll('.pic').forEach(pc=>{const p=pics[+pc.dataset.j];pc.querySelectorAll('.popt').forEach(b=>b.onclick=()=>{if(pc.classList.contains('done'))return;
    if(b.textContent===p.good){b.classList.add('right');pc.classList.add('done');pc.querySelectorAll('.popt').forEach(x=>x.disabled=true);left--;if(left===0)api.ok(rule,p.au);else{sfx('ok');api.tip('✔ '+p.why);reward(p.au);}}
    else{b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),700);api.bad(p.why,pc);}});});
   AUTO=()=>el.querySelectorAll('.pic').forEach(pc=>{const p=pics[+pc.dataset.j];[...pc.querySelectorAll('.popt')].find(b=>b.textContent===p.good).click();});}};},
 // choice: one situation (+ optional picture), pick the right sentence. {ctx,img?,good,others:[],au,hint,why?}
 choice({ctx,img,good,others,au,hint,why}){const opts=shuffle([good,...others]);return {html:`<div class="chq"><div class="ctx">${ctx}</div>${img?`<img class="qimage" src="illus/${img}.jpg" alt="${esc(ctx.replace(/<[^>]+>/g,''))}">`:''}<div class="popts">${opts.map(t=>`<button class="popt">${esc(t)}</button>`).join('')}</div></div>`,
  mount(el,api){let tries=0,done=false;el.querySelectorAll('.popt').forEach(b=>b.onclick=()=>{if(done)return;if(b.textContent===good){done=true;b.classList.add('right');el.querySelectorAll('button').forEach(x=>x.disabled=true);api.ok(why||good,au);}else{tries++;api.bad(hint+(tries>=2?`<br>选这句：<b>${esc(good)}</b>，请自己点选。`:''),b);}});
   AUTO=()=>[...el.querySelectorAll('.popt')].find(b=>b.textContent===good).click();}};},
 // typed: type the missing word / ending. {ctx?,pre,post,ans,accept?,ph?,au,why,wrong?:[{re,zh,not?}],hint?(fallback)}
 typed({ctx,pre,post,ans,accept=[],au,why,ph,wrong,hint}){return {html:`${ctx?`<div class="ctx">${ctx}</div>`:''}<form class="tform" autocomplete="off"><div class="bsent">${pre}<input class="tin" type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${ph||''}" aria-label="填空" size="${Math.max(4,ans.length+1)}">${post}</div><button class="btn" type="submit">检查</button></form>`,
  mount(el,api){const f=el.querySelector('form'),inp=f.querySelector('input');let tries=0;setTimeout(()=>inp.focus({preventScroll:true}),50);
   f.onsubmit=e=>{e.preventDefault();const v=normTxt(inp.value).replace(/^-/,'');if(!v){api.tip('先在空格里打字哦。');return;}
    if([ans,...accept].map(x=>normTxt(x).replace(/^-/,'')).includes(v)){inp.value=ans;inp.disabled=true;inp.classList.add('right');f.querySelector('button').remove();api.ok(why,au);}
    else{tries++;const m=ruleMsg(wrong,v)??hint??'';api.bad(m+(tries>=2?`<br>答案是 <b>${esc(ans)}</b>，把它打进去吧。`:''),inp);inp.select();}};
   AUTO=()=>{inp.value=ans;f.requestSubmit();};}};},
 // fix: tap the wrong word, then choose the fix. {ctx,s,wi,fix:[[label,1|0]],au,good,why,miss?} miss = hint after tapping a correct word (step > activity.miss > generic default)
 fix({ctx,s,wi,fix,au,good,why,miss='再读读这句，找出用错的那个词。'}){return {html:`<div class="ctx">${ctx}</div><div class="esent">${s.split(' ').map((w,i)=>`<button class="ew" data-i="${i}">${esc(w)}</button>`).join(' ')}</div><div class="efix"></div>`,
  mount(el,api){const fx=el.querySelector('.efix');let found=false;
   el.querySelectorAll('.ew').forEach(b=>b.onclick=()=>{if(found)return;if(+b.dataset.i===wi){found=true;b.classList.add('pickd');sfx('flip');api.tip('找到了！现在怎么改？');
     fx.innerHTML=fix.map(([t,ok])=>`<button class="btn efb" data-ok="${ok}">${t}</button>`).join('');
     fx.querySelectorAll('.efb').forEach(f=>f.onclick=()=>{if(f.dataset.ok==='1'){el.querySelector('.esent').innerHTML=`<span class="fixed">${esc(good)}</span>`;fx.innerHTML='';api.ok(why,au);}else api.bad(why,f);});}
    else api.bad('“'+esc(b.textContent)+'”没有错，'+miss,b);});
   AUTO=()=>{el.querySelector(`.ew[data-i="${wi}"]`).click();fx.querySelector('[data-ok="1"]').click();};}};},
 // order: tap word tiles into order. {q,words,shuffled,au,why,firstHint,hint}
 order({q,words,shuffled,au,why,firstHint,hint}){return {html:`<p class="qdesc">${q}</p><div class="wline"></div><div class="wbank">${shuffled.map(w=>`<button class="wt" data-w="${w}">${w}</button>`).join('')}</div>`,
  mount(el,api){const line=el.querySelector('.wline'),bank=el.querySelector('.wbank');
   const check=()=>{const got=[...line.children].map(b=>b.dataset.w);if(got.length<words.length)return;
    if(got.join(' ')===words.join(' ')){line.insertAdjacentHTML('beforeend','<span class="dot">.</span>');line.querySelectorAll('.wt').forEach(b=>b.disabled=true);api.ok(why,au);}
    else api.bad(got[0]!==words[0]&&firstHint?firstHint:hint,line);};
   el.addEventListener('click',e=>{const b=e.target.closest('.wt');if(!b||b.disabled)return;(b.parentNode===bank?line:bank).appendChild(b);check();});
   AUTO=()=>{words.forEach(w=>line.appendChild(bank.querySelector(`[data-w="${w}"]`)));check();};}};},
 // rewrite: type a whole sentence. {q,src,ph,answers:[normalised],show,au,why,normalize?:[[re,to]],wrong:[{re,zh,not?}],hint,auto}
 rewrite({q,src,ph,answers,show,au,why,normalize=[],wrong,hint}){return {html:`<p class="qdesc">${q}</p><div class="src">${src}</div><form class="tform" autocomplete="off"><input class="tin wide" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${ph||''}" aria-label="改写"><button class="btn" type="submit">检查</button></form>`,
  mount(el,api){const f=el.querySelector('form'),inp=f.querySelector('input');let tries=0;
   f.onsubmit=e=>{e.preventDefault();let v=normTxt(inp.value);normalize.forEach(([a,b])=>v=v.replace(new RegExp(a),b));if(!v)return api.tip('在框里打出整句话。');
    if(answers.includes(v)){inp.value=show;inp.disabled=true;inp.classList.add('right');f.querySelector('button').remove();api.ok(why,au);}
    else{tries++;const m=ruleMsg(wrong,v)??hint??'';api.bad(m+(tries>=2?`<br>提示：<b>${esc(show)}</b>`:''),inp);}};
   AUTO=()=>{inp.value=show;f.requestSubmit();};}};},
 // tf: right or wrong? {s,ok:true|false,fix,au,why,ctx?,labels?:[yes,no],hint?}
 // without hint: ep16 style (✔ 对 / ✘ 错). with hint: guided hint, answer revealed after 2 tries, labels shuffled.
 tf({s,ok,fix,au,why,ctx,labels,hint}){const L=labels||['✔ 对','✘ 错'];let opts=[[L[0],1],[L[1],0]];if(labels)opts=shuffle(opts);
  return {html:`${ctx?`<div class="ctx">${ctx}</div>`:''}<div class="tfs">${esc(s)}</div><div class="tfb">${opts.map(([t,v])=>`<button class="btn tf" data-v="${v}">${t}</button>`).join('')}</div>`,
  mount(el,api){let tries=0;el.querySelectorAll('.tf').forEach(b=>b.onclick=()=>{if(+b.dataset.v===(ok?1:0)){if(!ok)el.querySelector('.tfs').innerHTML=`<s>${esc(s)}</s><br><span class="fixed">${esc(fix)}</span>`;el.querySelectorAll('.tf').forEach(x=>x.disabled=true);b.classList.add('right');api.ok(why||fix||s,au);}
    else{tries++;if(hint)api.bad(hint+(tries>=2?`<br>请选择“${ok?L[0]:L[1]}”。${fix?`<br>正确句：${esc(fix)}`:''}`:''),b);else api.bad(ok?'这句其实是<b>对</b>的。'+why:'这句有错。'+why,b);}});
   AUTO=()=>el.querySelector(`.tf[data-v="${ok?1:0}"]`).click();}};},
 // sort: picture word cards into two boxes. {q?,boxes:[{k,t}],items:[{w,zh,img,box,why}],au,why}
 sort({q='先点词卡，再点盒子；也可以拖进去。',boxes,items,au,why}){const order=shuffle(items);const bt=k=>boxes.find(b=>b.k===k).t;return {html:`<p class="qdesc">${q}</p><div class="bank item-bank">${order.map(it=>`<button class="dchunk item" data-word="${it.w}">${it.img?`<img src="illus/${it.img}.jpg" alt="">`:''}<b>${it.w}</b><small>${it.zh||''}</small></button>`).join('')}</div><div class="sort-boxes">${boxes.map(b=>`<div class="slot" data-target="${b.k}" tabindex="0" role="button" aria-label="${b.t}"><h3>${b.t}</h3><div class="drop"></div></div>`).join('')}</div>`,
  mount(el,api){let left=items.length;const tries={};const attempt=(b,t)=>{if(!b||b.disabled)return;const it=items.find(i=>i.w===b.dataset.word);if(it.box===t.dataset.target){b.disabled=true;b.classList.add('placed');t.querySelector('.drop').appendChild(b);left--;if(!left)api.ok(why,au);else{api.tip('放好了，再选一个。');sfx('ok');}}else{tries[it.w]=(tries[it.w]||0)+1;api.bad(tries[it.w]>=2?it.why+`<br>请放进“${bt(it.box)}”。`:'先看看词卡的中文义，再想想它该进哪个盒子。',b);}};
   bindPlacement(el,attempt);window.__try=(w,t)=>attempt(el.querySelector(`[data-word="${w}"]`),el.querySelector(`[data-target="${t}"]`));AUTO=()=>items.forEach(it=>window.__try(it.w,it.box));}};},
 // blank: drag one of a few chips into a single blank. {ctx,pre,post,ans,opts:['a','an','the','不填'],au,hint,why}
 blank({ctx,pre,post,ans,opts=['a','an','the','不填'],au,hint,why}){const o=shuffle(opts);return {html:`<div class="ctx">${ctx}</div><div class="bsent sentence-drop">${pre}<span class="slot bslot" data-target="blank" tabindex="0" role="button" aria-label="句子的空格"><span class="drop">放在这里</span></span>${post}</div><div class="bank article-bank">${o.map(w=>`<button class="dchunk" data-value="${w}">${w}</button>`).join('')}</div><p class="qdesc">点词卡，再点空格；也可以拖进去。</p>`,
  mount(el,api){let tries=0,done=false;const attempt=(b,t)=>{if(done)return;if(b.dataset.value===ans){done=true;el.querySelectorAll('.dchunk').forEach(x=>x.disabled=true);t.querySelector('.drop').textContent=ans;t.classList.add('filled');api.ok(why,au);}else{tries++;api.bad(hint+(tries>=2?`<br>选择“<b>${ans}</b>”，请自己放进空格。<br>正确句：${esc(why)}`:''),b);}};
   bindPlacement(el,attempt);AUTO=()=>attempt(el.querySelector(`[data-value="${ans}"]`),el.querySelector('[data-target]'));}};}
};

// ================= activity type: map (knowledge map card) =================
// {type:'map', html (tokens ok), button}
async function mapCard(a){await new Promise(res=>{showPanel(`<div class="card kmap" data-activity="${a.id}">${tpl(a.html)}<button class="btn big" id="ok">${a.button||'继续 ➜'}</button></div>`);const next=()=>res();panel.querySelector('#ok').onclick=next;window.__auto=next;AUTO=next;window.__continue=next;});hidePanel();}

// ================= activity type: card (collectible card at the end) =================
let cardWord=null;
const cardTitle=s=>String(s||'').replace(/⭐\uFE0F?/gu,`<img class="card-title-star" src="${COMPASS_ASSETS.starLit}" alt="" width="256" height="256" aria-hidden="true">`);
// variant 'phrase': {title, desc, front, template:[before,after], back:[{t,b}|{slot:true,b}], foot, options:[{k,w,zh}], sayZh:'我喜欢{zh}。', button, done}
// variant 'treasure': {title, badge, desc, front, backBadge, backNote, options:[{k,s,zh,img}], button, done}
async function spellCard(a){
 const O=a.options;
 if(a.variant==='treasure')return new Promise(res=>{let cur=null;
  showPanel(`<div class="card treasure-card" data-activity="${a.id}"><h2 class="hb">${badge(a.badge,{size:36})} ${cardTitle(a.title)}</h2><p>${a.desc}</p><div class="treasures">${shuffle(O).map(o=>`<button class="treasure" data-value="${o.k}"><img src="illus/${o.img}.jpg" alt="${o.zh}"><span>${o.zh}</span></button>`).join('')}</div><div class="flipwrap"><div class="flip" id="flip"><div class="face"><div class="border"></div><b>${a.front}</b><p id="card-sentence">先选一件宝物</p></div><div class="face back"><div class="border"></div>${badge(a.backBadge||a.badge,{size:56})}<p id="saved-sentence"></p><small>${a.backNote||''}</small></div></div></div><button class="btn big" id="carve" disabled>${a.button}</button></div>`);
  panel.querySelectorAll('.treasure').forEach(b=>b.onclick=()=>{cur=O.find(c=>c.k===b.dataset.value);cardWord=cur.k;panel.querySelectorAll('.treasure').forEach(x=>x.classList.toggle('selected',x===b));panel.querySelector('#card-sentence').textContent=cur.s;panel.querySelector('#saved-sentence').textContent=cur.s;panel.querySelector('#carve').disabled=false;});
  const done=()=>res();
  let carving=false;const carve=async()=>{if(!cur||carving)return;carving=true;AUTO=null;const btn=panel.querySelector('#carve');btn.disabled=true;panel.querySelectorAll('.treasure').forEach(x=>x.disabled=true);panel.querySelector('#flip').classList.add('on');sfx('flip');setTimeout(()=>sparkle(panel.querySelector('.flipwrap'),24,undefined,{sprite:COMPASS_ASSETS.starLit}),500);await say('card_'+cur.k,cur.zh);btn.textContent=a.done;btn.disabled=false;btn.onclick=done;window.__auto=done;window.__continue=done;};
  panel.querySelector('#carve').onclick=carve;window.__auto=AUTO=()=>{panel.querySelector('.treasure').click();carve();};});
 return new Promise(res=>{let cur=O[0];cardWord=cur.k;
  const back=a.back.map(c=>`<div class="chunk ${c.b}"${c.slot?' id="w2"':''}>${c.slot?cur.w:c.t}<span class="tag">${badge(c.b,{size:30})}</span></div>`).join('');
  showPanel(`<div class="card" data-activity="${a.id}"><h2>${cardTitle(a.title)}</h2><p>${a.desc}</p>
   <div class="adj">${O.map(o=>`<button class="btn" data-k="${o.k}">${o.w}<br><small>${o.zh}</small></button>`).join('')}</div>
   <div class="flipwrap"><div class="flip" id="flip">
    <div class="face"><div class="border"></div><div style="font-size:28px;font-weight:900">${a.front}</div><div style="margin-top:8px;font-size:24px;font-family:'Compass Reading',Georgia,serif">${a.template[0]}<u id="w">${cur.w}</u>${a.template[1]}</div></div>
    <div class="face back"><div class="border"></div><div class="sent" style="margin:0;font-size:26px">${back}</div><div style="font-size:15px;margin-top:4px">${a.foot}</div></div>
   </div></div><button class="btn big" id="carve">${a.button}</button></div>`);
  panel.querySelectorAll('.adj button').forEach(b=>b.onclick=()=>{cur=O.find(o=>o.k===b.dataset.k);cardWord=cur.k;panel.querySelector('#w').textContent=cur.w;const w2=panel.querySelector('#w2');if(w2)w2.firstChild.textContent=cur.w;const au=voice('audio/card_'+cur.k+'.mp3');if(!muted)au.play();});
  const done=()=>res();
  let carving=false;const carve=async()=>{if(carving)return;carving=true;const btn=panel.querySelector('#carve');btn.disabled=true;sfx('flip');panel.querySelector('#flip').classList.add('on');setTimeout(()=>sparkle(panel.querySelector('.flipwrap'),24,undefined,{sprite:COMPASS_ASSETS.starLit}),500);
   await say('card_'+cur.k,(a.sayZh||'{zh}').replace('{zh}',cur.zh));btn.textContent=a.done;btn.disabled=false;btn.onclick=done;window.__auto=done;window.__continue=done;};
  panel.querySelector('#carve').onclick=carve;window.__auto=carve;});
}
async function runAct(a){
 if(a.type==='seq'){for(const p of a.parts)await runAct({id:a.id,...p});hidePanel();return;}
 if(a.type==='drag'){await dragGame(a);hidePanel();return;}
 if(a.type==='steps')return stepCard(a);
 if(a.type==='map')return mapCard(a);
 if(a.type==='card')return spellCard(a);
 throw new Error('unknown activity type '+a.type);}
// ---------- illustrations ----------
const IMG=EP.img;
let curImg=null,curOverlay='';
// the layer is sized to the picture's own box (contain), so overlays use image percentages on every screen
function fitLayer(lay){const im=lay.querySelector('img');if(!im||!im.naturalWidth)return;const st=$('#stage').getBoundingClientRect();if(!st.width||!st.height)return;const ar=im.naturalWidth/im.naturalHeight;let w=st.width,h=w/ar;if(h>st.height){h=st.height;w=h*ar;}lay.style.width=w+'px';lay.style.height=h+'px';}
const fitLayers=()=>document.querySelectorAll('#stage .layer').forEach(fitLayer);addEventListener('resize',fitLayers);if(window.ResizeObserver)new ResizeObserver(fitLayers).observe($('#stage'));
function showImg(key,overlay=''){if(curImg===key&&overlay===curOverlay)return;curImg=key;curOverlay=overlay;const st=$('#stage');const [src,label]=IMG[key];const bd=$('#backdrop');if(bd)bd.style.backgroundImage=`url("${src}")`;
 const lay=document.createElement('div');lay.className='layer';
 lay.innerHTML=`<img alt="${label}"><div class="ph"><div>🖼️ 插图待生成</div><b>${label}</b><small>${src}</small></div>${overlay}`;
 const im=lay.querySelector('img');im.onload=()=>{fitLayer(lay);lay.classList.add('loaded');};im.onerror=()=>{lay.classList.add('missing');console.error('缺少本集插图：'+src);};im.src=src;
 st.appendChild(lay);requestAnimationFrame(()=>lay.classList.add('in'));const olds=[...st.children].slice(0,-1);setTimeout(()=>olds.forEach(o=>o.remove()),RM?0:450);}
// ---------- 2D compass + shared local progress ----------
const EPNO=Number(EP.no),MYSTAR=EPNO-1;
const GOT=new Set(readStars());
let starsLit=0,entryLocked=false;
window.__skipStar=null;
function updateStars(){NSTARS=GOT.size;$('#stars').innerHTML=control('star',`${NSTARS} / 17`);}
function paintStart(){const host=$('#start .start-art');host.innerHTML=renderCompass({stars:GOT,id:'start-compass'})+renderStarProgress(GOT);updateStars();}
function fitLayout(){const h=$('#hud');if(h)document.documentElement.style.setProperty('--hud',(h.getBoundingClientRect().bottom+8)+'px');}addEventListener('resize',fitLayout);if(window.ResizeObserver)new ResizeObserver(fitLayout).observe($('#hud'));fitLayout();
const homeOn=on=>{$('#home').style.display=on?'flex':'none';document.body.classList.toggle('at-home',on&&!document.body.classList.contains('ending'));};
function entryAllowed(){return EPNO!==17||isFinaleUnlocked(readStars());}
function guardEntry(){
 if(entryAllowed()){entryLocked=false;return true;}
 entryLocked=true;if(stopCur)stopCur();if(curAudio)curAudio.pause();RD=null;AUTO=null;window.__auto=()=>{};window.__continue=()=>{};
 hidePanel();$('#sub').style.display='none';document.body.classList.remove('reading','ending','hasreview');homeOn(true);$('#start').style.display='flex';
 const missing=Array.from({length:16},(_,i)=>i+1).filter(no=>!readStars().includes(no));
 $('#entry-lock').hidden=false;$('#entry-lock').textContent=`最后一站还差 ${missing.length} 颗星。点亮前 16 站的星星，就能开启第 17 集。`;
 $('#go').disabled=true;$('#go').innerHTML=control('lock','集齐前 16 颗星后开启');paintStart();return false;
}
const SEC=EP.sections,ACT=EP.activities;Object.entries(ACT).forEach(([k,a])=>{a.id=a.id||k;});
window.__state=()=>({reading:!!RD,line:curLine?.id,section:Object.keys(SEC).find(k=>SEC[k]===lastSection),activity:panel.querySelector('[data-activity]')?.dataset.activity,step:panel.querySelector('[data-step]')?.dataset.step,card:cardWord,starsLit,completed:[...GOT].sort((a,b)=>a-b),muted,rate:RATE,locked:entryLocked});
paintStart();updateMuteButton();
try{LINES=await (await fetch('audio/lines.json?v='+EPV)).json();}catch(e){$('#loading').textContent='本集配音资料尚未就绪，请稍后再来。';throw e;}
try{HINTS=await (await fetch('audio/hints.json?v='+EPV)).json();}catch(e){HINTS={};}
$('#loading').style.display='none';window.__ready=true;
async function story(){
 if(!guardEntry())return;homeOn(false);$('#start').style.display='none';showImg(EP.firstImg||Object.keys(IMG)[0]);
 for(const k of EP.flow){if(!guardEntry())return;if(SEC[k])await readSection(SEC[k]);else await runAct(ACT[k]);}
 if(guardEntry())await ending();}
async function ending(){
 if(!guardEntry())return;const E=EP.ending;
 const fr=panel.querySelector('.flipwrap')?.getBoundingClientRect()||{left:innerWidth/2,top:innerHeight/2,width:0,height:0};hidePanel();$('#sub').style.display='none';
 document.body.classList.remove('hasreview','at-home');document.body.classList.add('ending');
 showImg(E.img);homeOn(true);$('#start').style.display='none';
 const before=new Set([...GOT].filter(no=>no!==EPNO));
 showPanel(`<div class="ending-layout"><div class="ending-art">${renderCompass({stars:before,id:'ending-compass'})}<div id="starprog">${renderStarProgress(before)}</div></div><div class="card ending-card"><p class="chapter-overline">第 ${EPNO} 站 · 冒险完成</p><div id="ending-copy"><h2>把星星带回罗盘</h2><p role="status">你的收藏卡，留下了这段冒险。</p></div></div></div>`);
 panel.classList.add('endpanel');
 if(!RM)await new Promise(resolve=>requestAnimationFrame(resolve));
 const slot=$(`#ending-compass [data-slot="${MYSTAR+1}"]`).getBoundingClientRect(),tx=slot.left+slot.width/2,ty=slot.top+slot.height/2;
 sfx('star');
 if(!RM&&!Q.get('fast')){
  const st=$('#flystar'),sx=fr.left+fr.width/2,sy=fr.top+fr.height/2;st.style.display='block';
  const hint=document.createElement('button');hint.type='button';hint.className='star-skip btn';hint.textContent='跳过星星归位';hint.setAttribute('aria-label','跳过星星归位动画');document.body.appendChild(hint);
  let finish;await new Promise(resolve=>{
   const t0=performance.now();let raf=0,done=false;
   const sk=()=>{if(done)return;done=true;cancelAnimationFrame(raf);removeEventListener('pointerdown',sk);removeEventListener('keydown',keySkip);window.__skipStar=null;hint.remove();st.style.display='none';resolve();};
   const keySkip=e=>{if(['Escape','Enter',' '].includes(e.key)){e.preventDefault();sk();}};
   finish=sk;window.__skipStar=sk;hint.onclick=sk;addEventListener('pointerdown',sk,{once:true});addEventListener('keydown',keySkip);hint.focus({preventScroll:true});
   const frame=()=>{if(done)return;const k=Math.min(1,(performance.now()-t0)/1200),e=1-Math.pow(1-k,3);st.style.left=(sx+(tx-sx)*e-32)+'px';st.style.top=(sy+(ty-sy)*e-32-Math.sin(k*Math.PI)*Math.min(150,innerHeight*.2))+'px';st.style.transform=`scale(${1.05-k*.65})`;if(k<1)raf=requestAnimationFrame(frame);else sk();};frame();
  });
 }
 if(!guardEntry())return;
 readStars().forEach(no=>GOT.add(no));GOT.add(EPNO);const saved=saveStar(EPNO);
 starsLit=1;updateStars();lightCompassSlot($('#ending-compass'),EPNO,{animate:!RM});$('#starprog').innerHTML=renderStarProgress(GOT);
 await say(E.say.id,E.say.zh);$('#sub').style.display='none';
 $('#ending-copy').innerHTML=`${tpl(E.html)}${!saved?'<p role="status">本次星星已点亮，浏览器暂时无法保存进度。请保持此页打开。</p>':''}<div class="ending-actions"><a class="btn big" href="${hqHref}">${control('home','冒险队总部')}</a><button class="btn secondary" id="again">${control('replay','再玩一次')}</button></div>`;polishButtons($('#ending-copy'));
 panel.querySelector('#again').onclick=()=>location.reload();window.__done=true;
}
// Every entry path (normal start, activity jump, restored bfcache page) shares the finale gate.
const jid=Q.get('jump');
if(guardEntry()){
 if(jid&&ACT[jid]){homeOn(false);$('#start').style.display='none';ac();const idx=EP.flow.indexOf(jid);const secKey=EP.flow.slice(0,Math.max(0,idx)).reverse().find(k=>SEC[k]);lastSection=SEC[secKey];if(lastSection)document.body.classList.add('hasreview');
  showImg(ACT[jid].img||lastSection?.at(-1)?.img||EP.firstImg||Object.keys(IMG)[0]);runAct(ACT[jid]).then(()=>{if(!guardEntry())return;if(ACT[jid].type==='card')ending();else window.__activityDone=true;});}
 else $('#start').style.display='flex';
}
$('#go').onclick=()=>{if(guardEntry()){ac();story();}};window.__go=()=>$('#go').click();
addEventListener('pageshow',event=>{if(event.persisted){const wasLocked=entryLocked;if(!guardEntry())return;if(wasLocked)location.reload();}});
addEventListener('storage',event=>{if(event.key==='cc_stars'){if(EPNO===17&&!entryAllowed())guardEntry();else if(entryLocked)location.reload();}});
