import * as THREE from 'three';
import {badge} from './badges.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const Q=new URLSearchParams(location.search);const $=s=>document.querySelector(s);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches||Q.get('rm')==='1';if(RM)document.body.classList.add('rm');
// ---------- audio / subtitles ----------
let LINES={},muted=Q.get('mute')==='1',curLine=null,curAudio=null,skipFlag=null;
const WHO={narrator:['旁白','#8a6a48'],leo:['Leo','#e0322b'],mia:['Mia','#9b7fd6'],sam:['Sam','#f08a00'],lily:['Lily','#2e9e6b'],grandpa:['爷爷','#6d4c2f'],monster:['怪兽 Grumble','#7b4fd0']};
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
function voice(src){const a=new Audio(src);a.playbackRate=RATE;a.preservesPitch=true;a.mozPreservesPitch=true;a.webkitPreservesPitch=true;return a;}
function setRate(r){RATE=r;localStorage.setItem('cc_rate',r);if(curAudio)curAudio.playbackRate=r;const b=$('#rate');if(b)b.textContent='🐢 '+r+'x';}
const HL=[];window.__hl=HL;   // debug log: [lineId, wordIndex, audioTime]
// playLine: show subtitle, play audio once, highlight strictly from audio clock. timed=true -> when muted / no audio, run a virtual clock at RATE.
// returns stop(); calls onEnd() when the line finishes (never when stopped).
let stopCur=null;
function playLine(id,zh,{timed=true,onEnd}={}){
 if(stopCur)stopCur();const L=LINES[id];if(!L){onEnd&&setTimeout(onEnd,0);return ()=>{};}
 curLine={id,zh};const sub=$('#sub');sub.style.display='block';
 $('#who').textContent=WHO[L.who][0];$('#who').style.background=WHO[L.who][1];
 $('#line').innerHTML=L.words.map(w=>`<span>${w[0]}</span>`).join(' ');$('#zh').textContent=zh||'';
 const spans=[...$('#line').children];let stopped=false,raf=0,au=null,last=-2,vt=null,prev=0;
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
// one-off line (ending / cards): always advances, even when muted
function say(id,zh=''){return new Promise(res=>{playLine(id,zh,{timed:true,onEnd:()=>setTimeout(res,300)});});}
// ---- story sections ----
// item: {id, zh, img?, overlay?, fx?}
let RD=null;           // active reader state
let lastSection=null;  // most recent story section (for 重看上一节)
let autoMode=false;   // default: manual paging
function setAuto(on){autoMode=on;const b=$('#auto');if(b){b.textContent=on?'⏸ 停止自动':'▶ 自动播放';b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);}
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
$('#mute').onclick=()=>{muted=!muted;$('#mute').textContent=muted?'🔇 已静音':'🔊 声音开';if(curAudio)curAudio.pause();if(RD)RD.go(RD.i);};
$('#replay').onclick=()=>{if(RD)RD.go(RD.i);else if(curLine&&!muted){const a=voice('audio/'+curLine.id+'.mp3');curAudio=a;a.play().catch(()=>{});}};
// ---- 重看上一节: leave the current activity untouched, re-read the last story section, then come back ----
async function reviewSection(){if(!lastSection||RD)return;const pn=$('#panel');const keep=document.createDocumentFragment();while(pn.firstChild)keep.appendChild(pn.firstChild);
 const disp=pn.style.display,img=curImg,ov=curOverlay;pn.style.display='none';if(curAudio)curAudio.pause();document.body.classList.add('inreview');
 await readSection(lastSection,{review:true});
 document.body.classList.remove('inreview');pn.appendChild(keep);pn.style.display=disp||'flex';curImg=null;if(img)showImg(img,ov);}
$('#review').onclick=reviewSection;$('#backex').onclick=()=>{if(RD)RD.end();};
window.__review=reviewSection;window.__rate=()=>RATE;


// ---------- particles ----------
function sparkle(el,n=14,chars=['✨','⭐','💛','✦']){if(RM)return;const r=el.getBoundingClientRect();for(let i=0;i<n;i++){const s=document.createElement('div');s.className='spark';s.textContent=chars[i%chars.length];
 s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';const a=Math.random()*Math.PI*2,d=60+Math.random()*90;s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),950);}}
// ---------- panel helpers ----------
const panel=$('#panel');const showPanel=h=>{panel.innerHTML=h;panel.style.display='flex';$('#sub').style.display='none';document.body.classList.add('inpanel');};const hidePanel=()=>{panel.style.display='none';panel.innerHTML='';document.body.classList.remove('inpanel');};

// Catch-the-grammar (tap tool then tap chunk)
// ---------- generic drag-into-slot game (boxes or inline blanks) ----------
// cfg: {title, desc, mode:'box'|'blank', slots:[{k,b,title,sub,pre,post,ctx}], chunks:[{t,k,h}] (k:null = distractor), tip, audio, prog}
function dragGame(cfg){return new Promise(res=>{
 const C=cfg.chunks;const order=C.map((c,i)=>i);for(let i=order.length-1;i>0;i--){const j=(i*7+3)%(i+1);[order[i],order[j]]=[order[j],order[i]];}
 if(order.length>1&&order.every((v,i)=>v===i))order.reverse();
 const slotHtml=s=>cfg.mode==='blank'
  ?`<div class="brow">${s.ctx?`<div class="ctx">${s.ctx}</div>`:''}<div class="bsent">${s.pre||''}<span class="slot bslot" data-k="${s.k}">${s.b?`<span class="bb">${badge(s.b,{size:26,variant:'flat'})}</span>`:''}<span class="drop"></span></span>${s.post||''}</div></div>`
  :`<div class="slot" data-k="${s.k}" ${s.b?`data-b="${s.b}"`:''}><div class="slab">${s.b?badge(s.b,{size:40}):''}<span class="lt">${s.title}<small>${s.sub||''}</small></span></div><div class="drop"></div></div>`;
 showPanel(`<div class="card dcard"><h2>${cfg.title}</h2><p class="desc">${cfg.desc}</p>
  <div class="bankwrap"><div class="bank">${order.map(i=>`<button class="dchunk" data-i="${i}">${C[i].t}</button>`).join('')}</div></div>
  <div class="slots ${cfg.mode==='blank'?'blanks':'boxes n'+cfg.slots.length}">${cfg.slots.map(slotHtml).join('')}</div>
  <p id="tip" class="tip" aria-live="polite"></p>${cfg.prog||''}<div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.dcard'),tip=card.querySelector('#tip');let sel=null,left=C.filter(c=>c.k).length;
 const multi=cfg.mode!=='blank';
 const clearSel=()=>{if(sel)sel.classList.remove('sel');sel=null;card.querySelectorAll('.slot').forEach(s=>s.classList.remove('armed'));};
 const back=el=>{el.style.transition=RM?'none':'transform .25s cubic-bezier(.3,1.6,.5,1)';el.style.transform='';if(!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}};
 function attempt(el,slot){if(!slot||(!multi&&slot.classList.contains('filled')))return back(el);const c=C[+el.dataset.i];const sd=cfg.slots.find(s=>s.k===slot.dataset.k);
  if(c.k===slot.dataset.k){el.style.transition='none';el.style.transform='';slot.querySelector('.drop').appendChild(el);slot.classList.add('filled');const cls=c.b||sd.b;if(cls){el.classList.add(cls);if(!multi)slot.classList.add(cls);}el.classList.add('placed');el.disabled=true;
   if(!RM){el.classList.remove('snap');void el.offsetWidth;el.classList.add('snap');}sfx('ok');sparkle(el,8);tip.innerHTML=c.ok?'✔ '+c.ok:'';left--;
   if(left===0){card.querySelectorAll('.bank .dchunk').forEach(d=>d.remove());tip.innerHTML='✅ '+cfg.tip;card.classList.add('done');
    if(cfg.audio){const a=voice('audio/'+cfg.audio+'.mp3');if(!muted)a.play();curLine={id:cfg.audio};}
    if(Q.get('fast'))setTimeout(res,300);else{const nb=document.createElement('button');nb.className='btn big';nb.textContent='继续 ➜';nb.onclick=res;card.querySelector('.nextwrap').appendChild(nb);nb.focus();}}}
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
async function rounds(list,mk){for(let i=0;i<list.length;i++)await dragGame(mk(list[i],i,list.length));hidePanel();}

// A1 认形式：to do / doing / done
async function gameForms(){await rounds([0],()=>({title:'🔍 认一认：非谓语三兄弟',
 desc:'刚才的故事里藏着这些词块。按<b>样子</b>把它们拖进对应的徽章盒：<b>to do</b>（不定式）、<b>doing</b>（动名词 / 现在分词）、<b>done</b>（过去分词）。',
 slots:[{k:'td',b:'TD',title:'to do',sub:'不定式'},{k:'ing',b:'ING',title:'doing',sub:'动名词 / 现在分词'},{k:'ed',b:'ED',title:'done',sub:'过去分词'}],
 chunks:[{t:'to guard',k:'td',h:'to + 动词原形 = 不定式。'},{t:'to find',k:'td',h:'to + 动词原形 = 不定式。'},{t:'to smile',k:'td',h:'to + 动词原形 = 不定式。'},
  {t:'holding',k:'ing',h:'动词 + ing 是 doing 形式。'},{t:'barking',k:'ing',h:'bark + ing，是 doing 形式。'},{t:'exciting',k:'ing',h:'excite → exciting，以 -ing 结尾。'},
  {t:'excited',k:'ed',h:'excite → excited，是过去分词 done 形式。'},{t:'lost',k:'ed',h:'lose 的过去分词是 lost（不规则）。'}],
 tip:'它们都<b>不当谓语</b>，所以叫“非谓语动词”。记住口诀：<b>to do 还没做，doing 正在做 / 当名词，done 被做或已完成</b>。'}));}

// A2 只接 to do / 只接 doing / 都可以；固定搭配
async function gameVerbs(){
 await dragGame({title:'📋 招聘规则板 1/2：动词分拣',
  desc:'有的动词后面只能跟 <b>to do</b>，有的只能跟 <b>doing</b>，有的两种都行。把动词拖进正确的盒子：',
  slots:[{k:'td',b:'TD',title:'+ to do',sub:'只接不定式'},{k:'ing',b:'ING',title:'+ doing',sub:'只接动名词'},{k:'both',title:'两种都行',sub:'⚠ 有的意思会变'}],
  chunks:[{t:'want',k:'td',h:'want 只接 to do：want to go。'},{t:'hope',k:'td',h:'hope 只接 to do：hope to win。'},{t:'decide',k:'td',h:'decide 只接 to do：decide to stay。'},{t:'refuse',k:'td',h:'refuse 只接 to do：refuse to help。'},
   {t:'enjoy',k:'ing',h:'enjoy 只接 doing：enjoy reading。'},{t:'finish',k:'ing',h:'finish 只接 doing：finish eating。'},{t:'mind',k:'ing',h:'mind 只接 doing：Do you mind opening the window?'},{t:'avoid',k:'ing',h:'avoid 只接 doing：avoid making mistakes。'},
   {t:'like',k:'both',h:'like to do / like doing 都可以。'},{t:'begin',k:'both',h:'begin to do / begin doing 意思差不多。'},{t:'stop',k:'both',h:'stop 两种都能接，但意思完全不同！'},{t:'remember',k:'both',h:'remember 两种都能接，但意思不同！'}],
  tip:'口诀：<b>想要、希望、决定、拒绝</b> → to do（还没做的事）；<b>喜欢享受 enjoy、完成 finish、介意 mind、避免 avoid</b> → doing。stop / remember / forget / try 两种都行但<b>意思会变</b>——下一关就考它们！',prog:prog(2,0)});
 await matchGame();hidePanel();}

// ================= new question types (2026-10-10 rework) =================
// audio is played ONLY after the child has answered correctly (reward / confirmation)
function reward(id){if(!id)return;curLine={id};if(curAudio){curAudio.pause();}if(muted)return;const a=voice('audio/'+id+'.mp3');curAudio=a;a.play().catch(()=>{});}
const normTxt=s=>(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
let AUTO=null;window.__solve=()=>AUTO&&AUTO();
// generic stepped card: steps[] each {html, mount(el, ok)} ; ok(tipHtml) marks the step solved
function stepCard({title,desc,steps,tip}){return new Promise(res=>{let i=0;
 showPanel(`<div class="card qcard"><h2>${title}</h2><p class="desc">${desc}</p><div class="qbody"></div><p class="tip" aria-live="polite"></p><div class="prog"></div><div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.qcard'),body=card.querySelector('.qbody'),tipEl=card.querySelector('.tip'),pg=card.querySelector('.prog'),nw=card.querySelector('.nextwrap');
 const draw=()=>{pg.innerHTML=steps.length>1?steps.map((_,j)=>`<i class="${j<i?'ok':''}"></i>`).join(''):'';};
 const go=()=>{draw();nw.innerHTML='';tipEl.innerHTML='';const s=steps[i];body.innerHTML=s.html;body.classList.remove('solved');
  const api={tip:h=>{tipEl.innerHTML=h;},bad:(h,el)=>{sfx('bad');tipEl.innerHTML='<span class="no">再想想：</span>'+h;if(el&&!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}},
   ok:(h,au)=>{sfx('ok');body.classList.add('solved');tipEl.innerHTML='✅ '+(h||'');reward(au);i++;draw();AUTO=null;
    const last=i>=steps.length;if(last&&tip)tipEl.innerHTML+=`<div class="sum">${tip}</div>`;
    if(Q.get('fast')){setTimeout(()=>last?(hidePanel(),res()):go(),250);return;}
    const nb=document.createElement('button');nb.className='btn big';nb.textContent=last?'继续 ➜':'下一题 ➜';nb.onclick=()=>last?(hidePanel(),res()):go();nw.appendChild(nb);nb.focus({preventScroll:true});}};
  s.mount(body,api);window.__auto=()=>AUTO&&AUTO();};
 go();});}

// ---- 1. matching: phrase -> to do / doing / do ----
async function matchGame(){
 const P=[{t:'look forward to …',k:'ing',ex:'We look forward to seeing Grumble again.',au:'ex_q2_lookforward',h:'look forward to 里的 to 是<b>介词</b>，介词后面接 doing。'},
  {t:'be worth …',k:'ing',ex:'The rules are worth reading.',au:'ex_q2_worth',h:'be worth doing：值得做，后面接 doing。'},
  {t:'had better …',k:'do',ex:'You had better keep my socks safe.',au:'ex_q2_hadbetter',h:'had better 后面直接跟动词原形，不带 to。'},
  {t:'let me …',k:'do',ex:'Let me read the rules first.',au:'ex_q2_letme',h:'let sb. do：使役动词后面不带 to。'},
  {t:'too small …',k:'td',ex:'Biscuit is too small to guard anything.',au:'ex_q2_tooto',h:'too … to do：太……而不能，要带 to。'}];
 const T=[{k:'td',b:'TD',t:'to do'},{k:'ing',b:'ING',t:'doing'},{k:'do',b:'DO',t:'do'}];
 await stepCard({title:'📋 招聘规则板 2/2：固定搭配连线',desc:'先点左边的短语，再点右边它后面该接的形式（也可以直接拖过去）。右边的形式可以重复用。',tip:'小心 <b>look forward to</b> 里的 to 是介词，后面要用 doing！',
  steps:[{html:`<div class="match"><svg class="mlines"></svg><div class="mleft">${P.map((p,i)=>`<button class="mitem" data-i="${i}">${p.t}<small class="mex"></small></button>`).join('')}</div><div class="mright">${T.map(x=>`<button class="mtarget ${x.b}" data-k="${x.k}">${badge(x.b,{size:34})}<span>${x.t}</span></button>`).join('')}</div></div>`,
   mount(el,api){let sel=null,left=P.length;const svg=el.querySelector('.mlines'),box=el.querySelector('.match');
    const line=(a,b,cls)=>{const r=box.getBoundingClientRect(),ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();const l=document.createElementNS('http://www.w3.org/2000/svg','line');
     l.setAttribute('x1',ra.right-r.left);l.setAttribute('y1',ra.top+ra.height/2-r.top);l.setAttribute('x2',rb.left-r.left);l.setAttribute('y2',rb.top+rb.height/2-r.top);l.setAttribute('class',cls);svg.appendChild(l);l._a=a;l._b=b;return l;};
    const redraw=()=>svg.querySelectorAll('line').forEach(l=>{const n=line(l._a,l._b,l.getAttribute('class'));l.replaceWith(n);});
    addEventListener('resize',redraw);
    const pick=it=>{if(it.disabled)return;el.querySelectorAll('.mitem').forEach(x=>x.classList.remove('sel'));sel=it;it.classList.add('sel');el.classList.add('armed');api.tip('已选中“'+it.firstChild.textContent+'”，再点右边一个形式。');};
    const tryT=(it,tg)=>{const p=P[+it.dataset.i];el.classList.remove('armed');it.classList.remove('sel');sel=null;
     if(tg.dataset.k===p.k){it.disabled=true;it.classList.add('done',T.find(x=>x.k===p.k).b);it.querySelector('.mex').textContent=p.ex;line(it,tg,'ok '+p.k);redraw();left--;
      if(left===0)api.ok('全部连对！',p.au);else{sfx('ok');api.tip('✔ '+p.ex);reward(p.au);}}
     else api.bad(p.h,it);};
    el.querySelectorAll('.mitem').forEach(it=>{it.addEventListener('pointerdown',e=>{if(it.disabled)return;const sx=e.clientX,sy=e.clientY;let moved=false;
      const ghost=line(it,it,'drag');const mv=ev=>{if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>8)moved=true;const r=box.getBoundingClientRect();ghost.setAttribute('x2',ev.clientX-r.left);ghost.setAttribute('y2',ev.clientY-r.top);};
      const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);ghost.remove();if(!moved){pick(it);return;}const tg=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.mtarget');if(tg){sel=it;tryT(it,tg);}};
      addEventListener('pointermove',mv);addEventListener('pointerup',up);});});
    el.querySelectorAll('.mtarget').forEach(tg=>tg.addEventListener('click',()=>{if(sel)tryT(sel,tg);else api.tip('先点左边的一个短语。');}));
    AUTO=()=>P.forEach((p,i)=>{const it=el.querySelector(`.mitem[data-i="${i}"]`);if(!it.disabled){sel=it;tryT(it,el.querySelector(`.mtarget[data-k="${p.k}"]`));}});}}]});}

// ---- 2. picture choice: stop / remember / forget / try ----
async function gameMeaning(){
 const V=[['stop',[['stop1','Biscuit stopped barking.','Biscuit stopped to bark.','ex_q3_stop1','他是<b>不再叫了</b>（停止正在做的事）→ stop doing。'],['stop2','Biscuit stopped to sniff the socks.','Biscuit stopped sniffing the socks.','ex_q3_stop2','他是<b>停下来去闻</b>（停下来做另一件事）→ stop to do。']],'stop doing = 停止<b>正在做</b>的事；stop to do = 停下来<b>去做另一件事</b>。'],
  ['remember',[['remember1','Remember to bring your badge.','Remember bringing your badge.','ex_q3_remember1','徽章还在桌上，<b>还没带</b> → remember to do（记得要去做）。'],['remember2','I remember meeting this monster before.','I remember to meet this monster before.','ex_q3_remember2','回忆泡泡里是<b>以前发生过</b>的事 → remember doing（记得做过）。']],'remember to do = 记得<b>要去做</b>（还没做）；remember doing = 记得<b>做过</b>。'],
  ['forget',[['forget1',"Don't forget to feed Biscuit.","Don't forget feeding Biscuit.",'ex_q3_forget1','狗碗还是空的，<b>还没喂</b> → forget to do。'],['forget2',"I'll never forget visiting the pyramid.","I'll never forget to visit the pyramid.",'ex_q3_forget2','金字塔是<b>已经去过</b>的回忆 → forget doing。']],'forget to do = 忘了<b>要去做</b>；forget doing = 忘了<b>做过</b>。'],
  ['try',[['try1','I tried to run faster.','I tried running faster.','ex_q3_try1','Sam 在<b>拼尽全力</b>跑 → try to do（努力去做）。'],['try2','I tried pulling the door.','I tried to pull the door.','ex_q3_try2','门推不开，<b>换个办法试试</b>拉 → try doing。']],'try to do = <b>努力</b>去做；try doing = <b>试一试</b>（换个办法）。']];
 await stepCard({title:'🕵️ 意思侦探：看图选句',desc:'同一个动词后面接 to do 还是 doing，意思不一样！看图，给每张图选出正确的句子。',tip:'口诀：<b>to do 还没做 / 要去做；doing 正在做 / 做过了</b>。',
  steps:V.map(([v,pics,rule])=>({html:`<h3 class="qv">${v}</h3><div class="pics">${pics.map((p,j)=>{const opts=j%2?[p[2],p[1]]:[p[1],p[2]];return `<div class="pic" data-j="${j}"><img src="illus/pick_${p[0]}.jpg" alt="" loading="lazy"><div class="popts">${opts.map(o=>`<button class="popt">${esc(o)}</button>`).join('')}</div></div>`;}).join('')}</div>`,
   mount(el,api){let left=2;el.querySelectorAll('.pic').forEach(pc=>{const p=pics[+pc.dataset.j];pc.querySelectorAll('.popt').forEach(b=>b.onclick=()=>{if(pc.classList.contains('done'))return;
     if(b.textContent===p[1]){b.classList.add('right');pc.classList.add('done');pc.querySelectorAll('.popt').forEach(x=>x.disabled=true);left--;if(left===0)api.ok(rule,p[3]);else{sfx('ok');api.tip('✔ '+p[4]);reward(p[3]);}}
     else{b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),700);api.bad(p[4],pc);}});});
    AUTO=()=>el.querySelectorAll('.pic').forEach(pc=>{const p=pics[+pc.dataset.j];[...pc.querySelectorAll('.popt')].find(b=>b.textContent===p[1]).click();});}}))});}

// ---- 3. typed fill-in (suffix / base-verb) ----
function typeStep({ctx,pre,post,ans,accept=[],au,hint,why,ph}){return {html:`${ctx?`<div class="ctx">${ctx}</div>`:''}<form class="tform" autocomplete="off"><div class="bsent">${pre}<input class="tin" type="text" inputmode="text" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${ph||''}" aria-label="填空" size="${Math.max(4,ans.length+1)}">${post}</div><button class="btn" type="submit">检查</button></form>`,
 mount(el,api){const f=el.querySelector('form'),inp=f.querySelector('input');let tries=0;setTimeout(()=>inp.focus({preventScroll:true}),50);
  f.onsubmit=e=>{e.preventDefault();const v=normTxt(inp.value).replace(/^-/,'').replace(/\s/g,'');if(!v){api.tip('先在空格里打字哦。');return;}
   if([ans,...accept].map(x=>x.toLowerCase()).includes(v)){inp.value=ans;inp.disabled=true;inp.classList.add('right');f.querySelector('button').remove();api.ok(why,au);}
   else{tries++;const m=hint(v);api.bad(m+(tries>=2?`<br>答案是 <b>${ans}</b>，把它打进去吧。`:''),inp);inp.select();}};
  AUTO=()=>{inp.value=ans;f.requestSubmit();};}};}
async function gameFeel(){
 const H=(isThing)=>v=>{if(v==='ed'||/ed$/.test(v))return isThing?'这里说的是<b>事物本身</b>“令人…的”，要用 -ing。':'';if(v==='ing'||/ing$/.test(v))return isThing?'':'这里说的是<b>人自己的感受</b>“感到…的”，要用 -ed。';return '只要补词尾：<b>ing</b> 或 <b>ed</b>。';};
 const S=[['招聘会本身很好玩（事物）','The job fair is excit','.','ing',['exciting'],'ex_q4_1',true,'job fair 是<b>事物</b>，“令人激动的” → exciting。'],
  ['Mia 心里很激动（人的感受）','Mia is excit','.','ed',['excited'],'ex_q4_2',false,'Mia 是<b>人</b>，“感到激动” → excited。'],
  ['规则又长又无聊（事物）','The long rules are bor','.','ing',['boring'],'ex_q4_3',true,'rules 是<b>事物</b>，“令人无聊的” → boring。'],
  ['Sam 觉得没劲（人的感受）','Sam feels bor','.','ed',['bored'],'ex_q4_4',false,'Sam 是<b>人</b>，“感到无聊” → bored。']];
 await stepCard({title:'😆 -ing 还是 -ed？补上词尾',desc:'<b>-ing</b>：东西本身“令人…的”；<b>-ed</b>：人自己“感到…的”。在空格里打出 <b>ing</b> 或 <b>ed</b>。',tip:'exciting / boring 说<b>事物</b>的特点；excited / bored 说<b>人</b>的感受。',
  steps:S.map(([ctx,pre,post,ans,acc,au,thing,why])=>typeStep({ctx,pre,post,ans,accept:acc,au,why,ph:'ing / ed',hint:H(thing)}))});}
async function gameAttr(){
 const S=[['一只<b>被弄丢</b>的袜子','Biscuit found a ',' sock.','lost','lose','l','ex_q7_1','袜子是被弄丢的（被动）→ 过去分词 <b>lost</b>（不规则变化）。',v=>v==='losing'?'袜子不会自己“正在丢”，它是<b>被</b>弄丢的，用 done。':v==='losed'?'lose 是不规则动词，过去分词不是 losed。':''],
  ['<b>正在大笑</b>的怪兽','Everyone looked at the ',' monster.','laughing','laugh','l','ex_q7_2','怪兽自己在笑（主动、正在）→ <b>laughing</b>。',v=>v==='laughed'?'怪兽是自己<b>正在</b>笑，用 doing。':''],
  ['一把<b>被弄坏</b>的椅子','Grumble sat on a ',' chair.','broken','break','b','ex_q7_3','椅子是被弄坏的 → 过去分词 <b>broken</b>（break-broke-broken）。',v=>v==='breaking'?'椅子是<b>被</b>弄坏的，用 done。':v==='broke'||v==='breaked'?'break 的过去分词是 broken。':''],
  ['一只<b>正在跑</b>的狗','Sam saw a ',' dog.','running','run','r','ex_q7_4','狗自己正在跑 → <b>running</b>（双写 n 再加 ing）。',v=>v==='runing'?'run 要<b>双写 n</b>：running。':v==='run'||v==='ran'?'狗是<b>正在</b>跑，用 doing。':'']];
 await stepCard({title:'🏷️ 给东西贴标签：doing 还是 done？',desc:'根据括号里的动词原形，自己写出正确的形式。<b>doing</b> 表示“主动 / 正在”，<b>done</b> 表示“被… / 已经”。',tip:'单个分词放<b>名词前</b>：a lost sock；分词短语放<b>名词后</b>：a monster <b>holding a big sign</b>。',
  steps:S.map(([ctx,pre,post,ans,base,fl,au,why,h])=>typeStep({ctx,pre,post:` <span class="base">(${base})</span>`+post,ans,au,why,ph:fl+'…',hint:v=>h(v)||`想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？`}))});}

// ---- 4. error correction: tap the wrong word, then fix ----
async function gameTo(){
 const S=[['Lily 想先看规则','Let me to read the rules.',2,[['删掉 to',1],['改成 too',0]],'ex_q5_1','Let me read the rules.','<b>let sb. do</b>：let 后面不带 to。'],
  ['怪兽把大家都逗笑了','The monster made everyone to laugh.',4,[['删掉 to',1],['改成 laughing',0]],'ex_q5_2','The monster made everyone laugh.','<b>make sb. do</b>：make 后面不带 to。'],
  ['Lily 叫 Biscuit 坐下','Lily asked Biscuit sit down.',3,[['改成 to sit',1],['改成 sitting',0]],'ex_q5_3','Lily asked Biscuit to sit down.','<b>ask sb. to do</b>：要带 to。'],
  ['怪兽提醒：最好安静',"You'd better to be quiet.",2,[['删掉 to',1],['改成 being',0]],'ex_q5_4',"You'd better be quiet.",'<b>had better do</b>：不带 to。'],
  ['Leo 不知道下一步该做什么',"I don't know what do next.",4,[['改成 to do',1],['改成 doing',0]],'ex_q5_5',"I don't know what to do next.",'<b>疑问词 + to do</b>：what to do / how to do it。']];
 await stepCard({title:'🔧 找错改错：要不要 to？',desc:'每句话里有<b>一个地方</b>错了。先点出错的那个词，再选怎么改。',tip:'<b>let / make</b> sb. do、<b>had better</b> do 不带 to；<b>ask</b> sb. to do、<b>what to do</b> 要带 to。',
  steps:S.map(([ctx,s,wi,fix,au,good,why])=>({html:`<div class="ctx">${ctx}</div><div class="esent">${s.split(' ').map((w,i)=>`<button class="ew" data-i="${i}">${esc(w)}</button>`).join(' ')}</div><div class="efix"></div>`,
   mount(el,api){const fx=el.querySelector('.efix');let found=false;
    el.querySelectorAll('.ew').forEach(b=>b.onclick=()=>{if(found)return;if(+b.dataset.i===wi){found=true;b.classList.add('pickd');sfx('flip');api.tip('找到了！现在怎么改？');
      fx.innerHTML=fix.map(([t,ok])=>`<button class="btn efb" data-ok="${ok}">${t}</button>`).join('');
      fx.querySelectorAll('.efb').forEach(f=>f.onclick=()=>{if(f.dataset.ok==='1'){el.querySelector('.esent').innerHTML=`<span class="fixed">${esc(good)}</span>`;fx.innerHTML='';api.ok(why,au);}else api.bad(why,f);});}
     else api.bad('“'+esc(b.textContent)+'”没有错，再看看<b>动词前后的 to</b>。',b);});
    AUTO=()=>{el.querySelector(`.ew[data-i="${wi}"]`).click();fx.querySelector('[data-ok="1"]').click();};}}))});}

// ---- 5. word order + rewrite ----
async function gameSubject(){
 const words=['Finding','socks','is','his','favourite','hobby'],shuf=['socks','is','hobby','Finding','favourite','his'];
 await stepCard({title:'🧱 搭句子：动作也能当主语',desc:'',tip:'动名词或不定式都能当主语；不定式作主语太长时，常用 <b>It</b> 占位：It is fun to find socks.',
  steps:[{html:`<p class="qdesc">点词块，按顺序拼出 Sam 说的话：“找袜子是它最爱的爱好。”（点上面的词可以退回去）</p><div class="wline"></div><div class="wbank">${shuf.map((w,i)=>`<button class="wt" data-w="${w}">${w}</button>`).join('')}</div>`,
   mount(el,api){const line=el.querySelector('.wline'),bank=el.querySelector('.wbank');
    const check=()=>{const got=[...line.children].map(b=>b.dataset.w);if(got.length<words.length)return;
     if(got.join(' ')===words.join(' ')){line.insertAdjacentHTML('beforeend','<span class="dot">.</span>');line.querySelectorAll('.wt').forEach(b=>b.disabled=true);api.ok('<b>Finding socks</b>（找袜子这件事）作主语，看作单数，谓语用 <b>is</b>。','ex_q6_order');}
     else api.bad(got[0]!=='Finding'?'谁当主语？“找袜子这件事”= <b>Finding socks</b>，放最前面。':'his favourite hobby 的顺序是：<b>his → favourite → hobby</b>。',line);};
    el.addEventListener('click',e=>{const b=e.target.closest('.wt');if(!b||b.disabled)return;(b.parentNode===bank?line:bank).appendChild(b);check();});
    AUTO=()=>{words.forEach(w=>line.appendChild(bank.querySelector(`[data-w="${w}"]`)));check();};}},
  {html:`<p class="qdesc">用 <b>It</b> 开头改写这句话，意思不变：</p><div class="src">To find socks is fun.</div><form class="tform" autocomplete="off"><input class="tin wide" type="text" autocapitalize="sentences" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="It is …" aria-label="改写"><button class="btn" type="submit">检查</button></form>`,
   mount(el,api){const f=el.querySelector('form'),inp=f.querySelector('input');let tries=0;
    f.onsubmit=e=>{e.preventDefault();const v=normTxt(inp.value).replace(/\bit's\b/,'it is');if(!v)return api.tip('在框里打出整句话。');
     if(v==='it is fun to find socks'){inp.value='It is fun to find socks.';inp.disabled=true;inp.classList.add('right');f.querySelector('button').remove();api.ok('<b>It</b> 是形式主语，真正的主语 <b>to find socks</b> 放到后面。','ex_q6_rewrite');}
     else{tries++;let m=!/^it is/.test(v)?'要用 <b>It is</b> 开头。':/finding/.test(v)?'放到后面的真正主语要用 <b>to find</b> socks。':!/to find socks$/.test(v)?'句子结构是：It is + fun + <b>to find socks</b>。':'检查一下单词和顺序：It is fun to find socks.';
      api.bad(m+(tries>=2?'<br>提示：<b>It is fun to find socks.</b>':''),inp);}};
    AUTO=()=>{inp.value="it's fun to find socks";f.requestSubmit();};}}]});}

// ---- 6. true / false quiz ----
async function gameTF(){
 const S=[['I enjoy to swim.',0,'I enjoy swimming.','ex_q8_1','enjoy 后面只能接 <b>doing</b>。'],['Remember to bring your badge.',1,'','ex_q8_2','还没带 → remember <b>to do</b>，正确。'],
  ['I want finding a helper.',0,'I want to find a helper.','ex_q8_3','want 后面接 <b>to do</b>。'],['The monster made Sam laugh.',1,'','ex_q8_4','make sb. <b>do</b>，不带 to，正确。'],
  ["I'm interesting in the rules.",0,"I'm interested in the rules.",'ex_q8_5','说<b>人</b>的感受用 -ed：interested。'],['Reading the rules is boring.',1,'','ex_q8_6','动名词作主语、规则令人无聊用 boring，正确。'],
  ['We look forward to have a new helper.',0,'We look forward to having a new helper.','ex_q8_7','look forward to 的 to 是介词，后面接 <b>doing</b>。'],['Look at the broken door!',1,'','ex_q8_8','门是被弄坏的 → broken，正确。']];
 await stepCard({title:'⚡ 闯关小测：对还是错？',desc:'快速判断每句话对不对。把整集学过的都过一遍！',tip:'🎉 小测全部通过！你已经是非谓语小专家了。',
  steps:S.map(([s,ok,fix,au,why])=>({html:`<div class="tfs">${esc(s)}</div><div class="tfb"><button class="btn tf" data-v="1">✔ 对</button><button class="btn tf" data-v="0">✘ 错</button></div>`,
   mount(el,api){el.querySelectorAll('.tf').forEach(b=>b.onclick=()=>{if(+b.dataset.v===ok){if(!ok)el.querySelector('.tfs').innerHTML=`<s>${esc(s)}</s><br><span class="fixed">${esc(fix)}</span>`;el.querySelectorAll('.tf').forEach(x=>x.disabled=true);b.classList.add('right');api.ok(why,au);}
     else api.bad(ok?'这句其实是<b>对</b>的。'+why:'这句有错。'+why,b);});
    AUTO=()=>el.querySelector(`.tf[data-v="${ok}"]`).click();}}))});}
// 知识地图
async function mapCard(){await new Promise(res=>{showPanel(`<div class="card kmap"><h2>🗺️ 非谓语知识地图</h2>
 <div class="kgrid">
 <div><h3>${badge('TD',{size:34})} to do 不定式 <small>还没做 / 目的</small></h3><ul>
  <li>作宾语：want / hope / decide <b>to do</b></li><li>作宾补：ask / tell sb. <b>to do</b></li>
  <li>目的：We came here <b>to find</b> a job. · in order to do</li><li>too … to do · … enough to do</li>
  <li>疑问词 + to do：how <b>to do</b> the job</li><li>It is + adj. + of / for sb. + to do</li><li>作定语：a helper <b>to guard</b> my socks</li><li>It takes sb. some time <b>to do</b></li></ul></div>
 <div><h3>${badge('DO',{size:34})} 不带 to 的 do</h3><ul>
  <li>三使：let / make / have sb. <b>do</b></li><li>感官：see / hear / watch / notice / feel sb. <b>do</b>（全过程）</li>
  <li>had better do · Why not do · would rather do</li></ul></div>
 <div><h3>${badge('ING',{size:34})} doing 动名词 / 现在分词</h3><ul>
  <li>作主语：<b>Finding</b> socks is fun.（谓语用单数）</li><li>作宾语：enjoy / finish / mind / avoid / keep <b>doing</b></li>
  <li>介词后：look forward to · be good at · What about <b>doing</b></li><li>be busy / be worth doing · go shopping · No barking!</li>
  <li>see / hear sb. <b>doing</b> = 正在做</li><li>sb. spend time (in) <b>doing</b></li><li>伴随：stands at the gate, <b>holding</b> a sign</li></ul></div>
 <div><h3>${badge('ED',{size:34})} done 过去分词</h3><ul>
  <li>被动 / 完成：a <b>lost</b> sock · <b>fallen</b> leaves</li><li>人的感受：<b>excited</b> / <b>bored</b>（对比 exciting / boring）</li>
  <li>have sth. <b>done</b>：让别人把某事做好</li></ul></div>
 </div>
 <p class="kdiff">⚠ 意思会变：stop / remember / forget / try + to do 或 doing</p>
 <button class="btn big" id="ok">做我的咒语卡 ➜</button></div>`);panel.querySelector('#ok').onclick=res;window.__auto=res;});hidePanel();}

// 收藏卡
let cardWord='football';
async function spellCard(){
 const ACT=[['football','playing football','踢足球'],['drawing','drawing','画画'],['reading','reading','看书'],['swimming','swimming','游泳'],['games','playing games','玩游戏']];
 await new Promise(res=>{let cur=ACT[0];
  showPanel(`<div class="card"><h2>⭐ 收藏卡 #16：我的招聘自我介绍</h2><p>在怪兽招聘会上介绍自己！选一个你最喜欢做的事——<b>enjoy</b> 后面要用 <b>doing</b>：</p>
   <div class="adj">${ACT.map(([k,w,z])=>`<button class="btn" data-k="${k}">${w}<br><small>${z}</small></button>`).join('')}</div>
   <div class="flipwrap"><div class="flip" id="flip">
    <div class="face"><div class="border"></div><div style="font-size:28px;font-weight:900">👾 怪兽招聘会 · 收藏卡 #16</div><div style="margin-top:8px;font-size:24px;font-family:Georgia,serif">I enjoy <u id="w">playing football</u>.</div></div>
    <div class="face back"><div class="border"></div><div class="sent" style="margin:0;font-size:26px"><div class="chunk S">I<span class="tag">${badge('S',{size:30})}</span></div><div class="chunk V">enjoy<span class="tag">${badge('V',{size:30})}</span></div><div class="chunk ING" id="w2">playing football<span class="tag">${badge('ING',{size:30})}</span></div></div><div style="font-size:15px;margin-top:4px">enjoy + doing · 怪兽说：You got the job!</div></div>
   </div></div><button class="btn big" id="carve">🪄 盖上录取章</button></div>`);
  panel.querySelectorAll('.adj button').forEach(b=>b.onclick=()=>{cur=ACT.find(a=>a[0]===b.dataset.k);cardWord=cur[0];panel.querySelector('#w').textContent=cur[1];panel.querySelector('#w2').firstChild.textContent=cur[1];const a=voice('audio/card_'+cur[0]+'.mp3');if(!muted)a.play();});
  const carve=async()=>{const btn=panel.querySelector('#carve');btn.disabled=true;sfx('flip');panel.querySelector('#flip').classList.add('on');setTimeout(()=>sparkle(panel.querySelector('.flipwrap'),24),500);
   await say('card_'+cur[0],'我喜欢'+cur[2]+'。');btn.textContent='⭐ 把星星送回罗盘';btn.disabled=false;btn.onclick=res;window.__auto=res;};
  panel.querySelector('#carve').onclick=carve;window.__auto=carve;});
}
// ---------- illustrations ----------

const IMG={gate:['illus/01_fair_gate.jpg','招聘会大门 · 紫色怪兽举着牌子'],crew:['illus/02_crew_excited.jpg','冒险队来到招聘会 · Sam 很激动'],rules:['illus/03_rules_board.jpg','Lily 读规则板'],sniff:['illus/04_biscuit_sniff.jpg','Biscuit 停下来闻，找到丢失的袜子'],job:['illus/05_got_the_job.jpg','怪兽大笑 · Biscuit 被录取']};
let curImg=null,curOverlay='';
function showImg(key,overlay=''){if(curImg===key&&overlay===curOverlay)return;curImg=key;curOverlay=overlay;const st=$('#stage');const [src,label]=IMG[key];
 const lay=document.createElement('div');lay.className='layer';
 lay.innerHTML=`<img alt="${label}"><div class="ph"><div>🖼️ 插图待生成</div><b>${label}</b><small>${src}</small></div>${overlay}`;
 const im=lay.querySelector('img');im.onload=()=>lay.classList.add('loaded');im.onerror=()=>lay.classList.add('missing');im.src=src;
 st.appendChild(lay);requestAnimationFrame(()=>lay.classList.add('in'));const olds=[...st.children].slice(0,-1);setTimeout(()=>olds.forEach(o=>o.remove()),RM?0:450);}
// ---------- 3D compass (home only) ----------
const canvas=$('#c');const R=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();scene.environment=new THREE.PMREMGenerator(R).fromScene(new RoomEnvironment(),0.04).texture;
const cam=new THREE.PerspectiveCamera(35,1,0.1,50);cam.position.set(0,0,4.2);
scene.add(new THREE.HemisphereLight('#fff1d6','#5a3a20',1.2));const kl=new THREE.DirectionalLight('#ffe2b0',2.2);kl.position.set(2,3,4);scene.add(kl);
const rig=new THREE.Group();scene.add(rig);
const cm=(await new GLTFLoader().loadAsync('models/compass_q.glb')).scene;
cm.traverse(n=>{if(n.isMesh){const ms=Array.isArray(n.material)?n.material:[n.material];ms.forEach(m=>{if(/Yellow/.test(m.name)){m.metalness=1;m.roughness=.28;m.color.set(m.name==='Yellow'?'#f0b84a':'#a8762c');}});}});
{const b=new THREE.Box3().setFromObject(cm),s=b.getSize(new THREE.Vector3());cm.scale.setScalar(1.3/s.y);const c=new THREE.Box3().setFromObject(cm).getCenter(new THREE.Vector3());cm.position.sub(c);}rig.add(cm);
const sockets=[];for(let i=0;i<17;i++){const a=Math.PI/2-i/17*Math.PI*2;const s=new THREE.Mesh(new THREE.SphereGeometry(0.065,16,10),new THREE.MeshStandardMaterial({color:'#5a4020',metalness:.6,roughness:.4}));s.position.set(Math.cos(a)*1.0,Math.sin(a)*1.0,0);rig.add(s);sockets.push(s);}
const ring=new THREE.Mesh(new THREE.TorusGeometry(1.0,0.018,8,96),new THREE.MeshStandardMaterial({color:'#c8902f',metalness:.9,roughness:.3}));rig.add(ring);
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}addEventListener('resize',resize);resize();
const MYSTAR=15;let starsLit=0,spin=0;const clock=new THREE.Clock();
function loop(){const t=clock.getElapsedTime();if(!RM){rig.rotation.y=Math.sin(t*0.5)*0.3+spin;rig.position.y=Math.sin(t*1.2)*0.04;}
 sockets.forEach((s,i)=>{if(starsLit&&i===MYSTAR){s.material.color.set('#ffd66b');s.material.emissive.set('#ffbb22');s.material.emissiveIntensity=RM?1.5:1.4+Math.sin(t*4)*.4;}});
 if($('#home').style.display!=='none')R.render(scene,cam);requestAnimationFrame(loop);}// ---------- flow ----------
LINES=await (await fetch('audio/lines.json')).json();
$('#loading').style.display='none';showImg('gate');requestAnimationFrame(loop);window.__ready=true;
const homeOn=on=>{$('#home').style.display=on?'flex':'none';$('#c').style.display=on?'block':'none';};
const SEC={S1:[{id:"l01",zh:"罗盘把冒险队带到了热闹的怪兽招聘会。",img:"gate"},{id:"l02",zh:"一只高高的紫色怪兽站在门口，举着一块大牌子。",img:"gate"},{id:"l03",zh:"“欢迎！我需要一个帮手来看守我的袜子。”",img:"gate"},{id:"l04",zh:"“我们来这里是为了给 Biscuit 找份工作！”",img:"crew"},{id:"l05",zh:"“可是 Biscuit 太小了，什么也看守不了。”",img:"crew"},{id:"l06",zh:"“这个招聘会太让人激动了，我好激动！”",img:"crew"}],S2:[{id:"l07",zh:"“等等，让我先看看规则。”",img:"rules",overlay:"<div class=\"carve\">No barking! · Remember to smile.</div>"},{id:"l08",zh:"“规则一：禁止吠叫。规则二：记得微笑。”",img:"rules",overlay:"<div class=\"carve\">No barking! · Remember to smile.</div>"}],S3:[{id:"l09",zh:"Biscuit 不叫了，摇起了尾巴。",img:"sniff"},{id:"l10",zh:"“给我看看你怎么干这份活，小狗。”",img:"sniff"},{id:"l11",zh:"Biscuit 停下来闻了闻空气，然后在桌子下面找到了一只丢失的袜子。",img:"sniff"}],S4:[{id:"l12",zh:"“找袜子是它最爱的爱好！”",img:"job"},{id:"l13",zh:"“哈！你把我逗笑了。这份工作归你了！”",img:"job"},{id:"l14",zh:"Leo 永远忘不了看到 Biscuit 得到第一份工作的那一刻。",img:"job"}]};
async function story(){
 homeOn(false);$('#start').style.display='none';
 await readSection(SEC.S1);await gameForms();await gameFeel();
 await readSection(SEC.S2);await gameVerbs();
 await readSection(SEC.S3);await gameMeaning();
 await readSection(SEC.S4);await gameTo();await gameSubject();await gameAttr();await gameTF();await mapCard();await spellCard();await ending();
}
async function ending(){
 const fr=panel.querySelector('.flipwrap')?.getBoundingClientRect()||{left:innerWidth/2,top:innerHeight/2,width:0,height:0};hidePanel();$('#sub').style.display='none';
 showImg('job');homeOn(true);$('#start').style.display='none';await sleep(100);
 const p=sockets[MYSTAR].getWorldPosition(new THREE.Vector3()).project(cam);const cr=canvas.getBoundingClientRect();const tx=cr.left+(p.x*.5+.5)*cr.width,ty=cr.top+(-p.y*.5+.5)*cr.height;
 sfx('star');
 if(!RM){const st=$('#flystar');st.style.display='block';const sx=fr.left+fr.width/2,sy=fr.top+fr.height/2;const t0=performance.now();
  await new Promise(r=>{const f=()=>{const k=Math.min(1,(performance.now()-t0)/1800),e=1-Math.pow(1-k,3);st.style.left=(sx+(tx-sx)*e-32)+'px';st.style.top=(sy+(ty-sy)*e-40-Math.sin(k*Math.PI)*160)+'px';st.style.transform=`scale(${1.4-k*.9}) rotate(${k*540}deg)`;k<1?requestAnimationFrame(f):r();};f();});st.style.display='none';}
 starsLit=1;$('#stars').textContent='⭐ 第 16 颗星';
 await say('star','第 16 颗星回到了罗盘！');$('#sub').style.display='none';
 showPanel(`<div class="card"><h2>🎉 第 16 集完成！</h2><p style="font-size:22px">⭐ 第 16 颗星　·　🗺️ 地图解锁：<b>怪兽招聘会</b></p><p>🐶 Biscuit 拿到了人生第一份工作：<b>袜子看守员</b></p><p>📒 把你的收藏卡 #16 贴进冒险日志吧！</p><button class="btn big" id="again">🔁 再玩一次</button></div>`);
 panel.style.background='rgba(20,10,30,.15)';panel.style.alignItems='flex-end';panel.style.paddingBottom='4vh';
 panel.querySelector('#again').onclick=()=>location.reload();window.__done=true;}
const JUMP={forms:[gameForms,'crew'],feel:[gameFeel,'crew'],verbs:[gameVerbs,'rules'],meaning:[gameMeaning,'sniff'],to:[gameTo,'job'],subject:[gameSubject,'job'],attr:[gameAttr,'job'],tf:[gameTF,'job'],map:[mapCard,'job'],card:[spellCard,'job']};
if(Q.get('jump')){homeOn(false);$('#start').style.display='none';ac();const [f,img]=JUMP[Q.get('jump')];lastSection=SEC[{forms:'S1',feel:'S1',verbs:'S2',meaning:'S3'}[Q.get('jump')]||'S4'];document.body.classList.add('hasreview');showImg(img);f().then(()=>{if(Q.get('jump')==='card')ending();});}else $('#start').style.display='flex';$('#go').onclick=()=>{ac();story();};window.__go=()=>$('#go').click();
