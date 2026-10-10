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
// ---------- voice player: speed + pause (shared by all episodes) ----------
const RATES=[0.75,1,1.25];let RATE=+(localStorage.getItem('cc_rate')||1);if(!RATES.includes(RATE))RATE=1;
let paused=false,resumeWaiters=[];
function voice(src){const a=new Audio(src);a.playbackRate=RATE;a.preservesPitch=true;a.mozPreservesPitch=true;a.webkitPreservesPitch=true;return a;}
const waitResume=()=>paused?new Promise(r=>resumeWaiters.push(r)):Promise.resolve();
function setPaused(p){paused=p;const b=$('#pause');if(b){b.textContent=p?'▶ 继续':'⏸ 暂停';b.classList.toggle('on',p);b.setAttribute('aria-pressed',p);}
 if(curAudio){if(p)curAudio.pause();else if(!curAudio.ended&&!muted)curAudio.play().catch(()=>{});}
 if(!p){const w=resumeWaiters;resumeWaiters=[];w.forEach(f=>f());}}
function setRate(r){RATE=r;localStorage.setItem('cc_rate',r);if(curAudio)curAudio.playbackRate=r;const b=$('#rate');if(b)b.textContent='🐢 '+r+'x';}
async function say(id,zh=''){
 const L=LINES[id];if(!L)return;
 await waitResume();
 curLine={id,zh};
 const sub=$('#sub');sub.style.display='block';document.body.classList.add('playing');
 $('#who').textContent=WHO[L.who][0];$('#who').style.background=WHO[L.who][1];
 $('#line').innerHTML=L.words.map(w=>`<span>${w[0]}</span>`).join(' ');$('#zh').textContent=zh;
 const spans=[...$('#line').children];
 if(curAudio){curAudio.pause();curAudio=null;}
 console.log('AUDIO',id,Date.now());
 return new Promise(res=>{
  let vt=0,last=performance.now(),au=null,finished=false;   // vt = virtual clock in audio seconds (used when muted / audio fails)
  if(!muted){au=voice('audio/'+id+'.mp3');curAudio=au;if(!paused)au.play().catch(()=>{});}
  const done=()=>{if(finished)return;finished=true;spans.forEach(s=>{s.classList.remove('on');s.classList.add('done');});
   setTimeout(async()=>{await waitResume();document.body.classList.remove('playing');res();},380);};
  skipFlag=()=>{if(au)au.pause();if(paused)setPaused(false);done();};
  const tick=()=>{if(finished)return;const now=performance.now();if(!paused)vt+=(now-last)/1000*RATE;last=now;
   const t=au&&au.currentTime>0?au.currentTime:vt;
   L.words.forEach((w,i)=>{spans[i].classList.toggle('on',t>=w[1]&&t<w[2]);spans[i].classList.toggle('done',t>=w[2]);});
   if((au&&au.ended)||(!(au&&au.currentTime>0)&&vt>=L.dur+0.05)||(au&&au.currentTime>=L.dur+0.3))done();else requestAnimationFrame(tick);};
  requestAnimationFrame(tick);
 });
}
$('#pause').onclick=()=>setPaused(!paused);
$('#rate').onclick=()=>setRate(RATES[(RATES.indexOf(RATE)+1)%RATES.length]);setRate(RATE);
$('#mute').onclick=()=>{muted=!muted;$('#mute').textContent=muted?'🔇 已静音':'🔊 声音开';if(muted&&curAudio)curAudio.pause();};
$('#replay').onclick=()=>{if(curLine){const a=voice('audio/'+curLine.id+'.mp3');if(!muted)a.play();}};
$('#next').onclick=()=>{if(skipFlag)skipFlag();};
window.__pause=setPaused;window.__rate=()=>RATE;

// ---------- particles ----------
function sparkle(el,n=14,chars=['✨','⭐','💛','✦']){if(RM)return;const r=el.getBoundingClientRect();for(let i=0;i<n;i++){const s=document.createElement('div');s.className='spark';s.textContent=chars[i%chars.length];
 s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';const a=Math.random()*Math.PI*2,d=60+Math.random()*90;s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),950);}}
// ---------- panel helpers ----------
const panel=$('#panel');const showPanel=h=>{panel.innerHTML=h;panel.style.display='flex';$('#sub').style.display='none';};const hidePanel=()=>{panel.style.display='none';panel.innerHTML='';};

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

// A4 -ing / -ed 形容词
async function gameFeel(){await rounds([0],()=>({title:'😆 -ing 还是 -ed？',mode:'blank',
 desc:'<b>-ing</b>：东西本身“令人…的”；<b>-ed</b>：人自己“感到…的”。把词块拖进空格：',
 slots:[{k:'a',ctx:'招聘会本身很好玩',pre:'The job fair is ',post:'.'},{k:'b',ctx:'Mia 心里很激动',pre:'Mia is ',post:'.'},{k:'c',ctx:'规则又长又无聊',pre:'The long rules are ',post:'.'},{k:'d',ctx:'Sam 觉得没劲',pre:'Sam feels ',post:'.'}],
 chunks:[{t:'exciting',k:'a',b:'ING',h:'说“人感到激动”要用 excited；exciting 用来形容让人激动的事物。'},{t:'excited',k:'b',b:'ED',h:'excited 是“人感到激动”，招聘会这种东西要用 exciting。'},{t:'boring',k:'c',b:'ING',h:'boring 形容“让人无聊的”事物，人自己“觉得无聊”用 bored。'},{t:'bored',k:'d',b:'ED',h:'bored 是人“感到无聊”，规则本身用 boring。'}],
 tip:'exciting / boring 说<b>事物</b>的特点；excited / bored 说<b>人</b>的感受。',audio:'a4_all'}));}

// A2 只接 to do / 只接 doing / 都可以；固定搭配
async function gameVerbs(){
 await dragGame({title:'📋 招聘规则板 1/2：动词分拣',
  desc:'有的动词后面只能跟 <b>to do</b>，有的只能跟 <b>doing</b>，有的两种都行。把动词拖进正确的盒子：',
  slots:[{k:'td',b:'TD',title:'+ to do',sub:'只接不定式'},{k:'ing',b:'ING',title:'+ doing',sub:'只接动名词'},{k:'both',title:'两种都行',sub:'⚠ 有的意思会变'}],
  chunks:[{t:'want',k:'td',h:'want 只接 to do：want to go。'},{t:'hope',k:'td',h:'hope 只接 to do：hope to win。'},{t:'decide',k:'td',h:'decide 只接 to do：decide to stay。'},{t:'refuse',k:'td',h:'refuse 只接 to do：refuse to help。'},
   {t:'enjoy',k:'ing',h:'enjoy 只接 doing：enjoy reading。'},{t:'finish',k:'ing',h:'finish 只接 doing：finish eating。'},{t:'mind',k:'ing',h:'mind 只接 doing：Do you mind opening the window?'},{t:'avoid',k:'ing',h:'avoid 只接 doing：avoid making mistakes。'},
   {t:'like',k:'both',h:'like to do / like doing 都可以。'},{t:'begin',k:'both',h:'begin to do / begin doing 意思差不多。'},{t:'stop',k:'both',h:'stop 两种都能接，但意思完全不同！'},{t:'remember',k:'both',h:'remember 两种都能接，但意思不同！'}],
  tip:'口诀：<b>想要、希望、决定、拒绝</b> → to do（还没做的事）；<b>喜欢享受 enjoy、完成 finish、介意 mind、避免 avoid</b> → doing。stop / remember / forget / try 两种都行但<b>意思会变</b>——下一关就考它们！',prog:prog(2,0)});
 await dragGame({title:'📋 招聘规则板 2/2：固定搭配',
  desc:'这些短语后面该接什么？<b>to do</b>、<b>doing</b>，还是<b>不带 to 的 do</b>？',
  slots:[{k:'td',b:'TD',title:'+ to do',sub:'不定式'},{k:'ing',b:'ING',title:'+ doing',sub:'动名词'},{k:'do',b:'DO',title:'+ do',sub:'不带 to'}],
  chunks:[{t:'too small …',k:'td',h:'too … to do：太……而不能。'},{t:'in order …',k:'td',h:'in order to do：为了做某事（目的）。'},{t:'would like …',k:'td',h:'would like to do：想要做。'},{t:'It\'s kind of you …',k:'td',h:'It\'s kind of you to help me. 形容人的品质用 of sb. to do。'},
   {t:'look forward to …',k:'ing',h:'这里的 to 是<b>介词</b>，后面接 doing：look forward to seeing you。'},{t:'be busy …',k:'ing',h:'be busy doing：忙于做。'},{t:'be worth …',k:'ing',h:'be worth doing：值得做。'},{t:'go …',k:'ing',h:'go shopping / go swimming：go + doing。'},
   {t:'had better …',k:'do',h:'had better do（不带 to）：最好做。'},{t:'Why not …',k:'do',h:'Why not do…?（不带 to）'},{t:'let me …',k:'do',h:'let sb. do：使役动词后不带 to。'},{t:'make sb. …',k:'do',h:'make sb. do：使役动词后不带 to。'}],
  tip:'小心 <b>look forward to</b> 里的 to 是介词，后面要用 doing！',prog:prog(2,1)});
 hidePanel();}

// A3 stop / remember / forget / try
async function gameMeaning(){
 const R=[['stop','a3_stop',[{ctx:'🐶 Biscuit 一直在叫，然后不叫了。',pre:'Biscuit stopped ',post:'.',a:'barking',d:'to bark'},{ctx:'🧦 Biscuit 跑着跑着，<b>停下来去</b>闻袜子。',pre:'Then he stopped ',post:' the socks.',a:'to sniff',d:'sniffing'}],
   'stop doing = 停止<b>正在做</b>的事；stop to do = 停下来<b>去做另一件事</b>。'],
  ['remember','a3_remember',[{ctx:'🎫 出发前：记得要带徽章（还没带）。',pre:'Remember ',post:' your badge.',a:'to bring',d:'bringing'},{ctx:'👾 Leo 记得以前见过这个怪兽（已经发生）。',pre:'Leo remembers ',post:' this monster before.',a:'meeting',d:'to meet'}],
   'remember to do = 记得<b>要去做</b>（还没做）；remember doing = 记得<b>做过</b>（已经做了）。'],
  ['forget','a3_forget',[{ctx:'🍖 别忘了要喂 Biscuit（还没喂）。',pre:'Don\'t forget ',post:' Biscuit.',a:'to feed',d:'feeding'},{ctx:'🏜️ 第 1 集去过金字塔，永远忘不了。',pre:'I\'ll never forget ',post:' the pyramid.',a:'visiting',d:'to visit'}],
   'forget to do = 忘了<b>要去做</b>（没做）；forget doing = 忘了<b>做过</b>（已做）。'],
  ['try','a3_try',[{ctx:'🏃 Sam <b>努力</b>想跑得更快。',pre:'I tried ',post:' faster.',a:'to run',d:'running'},{ctx:'🚪 门推不开，Sam <b>换个办法试试</b>：拉一拉。',pre:'Then I tried ',post:' the door.',a:'pulling',d:'to pull'}],
   'try to do = <b>努力 / 设法</b>去做；try doing = <b>试一试</b>（换个办法看行不行）。']];
 const ing=s=>/ing$/.test(s)?'ING':'TD';
 await rounds(R,([v,au,rows,tip],i,n)=>({title:`🕵️ 意思侦探 ${i+1}/${n}：${v}`,mode:'blank',
  desc:`<b>${v}</b> 后面接 to do 还是 doing，意思不一样！看情境，把词块拖进空格（多出来的那块是陷阱）：`,
  slots:rows.map((r,j)=>({k:'r'+j,ctx:r.ctx,pre:r.pre,post:r.post})),
  chunks:rows.flatMap((r,j)=>[{t:r.a,k:'r'+j,b:ing(r.a),h:''},{t:r.d,k:null,h:/ing$/.test(r.d)?`“${r.d}”表示已经在做 / 做过的事，再看看情境。`:`“${r.d}”表示还没做、要去做的事，再看看情境。`}]).map(c=>{if(c.k)c.h='放错格子了，看看每句话的情境。';return c;}),
  tip,audio:au,prog:prog(n,i)}));}

// A5 to 还是不要 to
async function gameTo(){
 const R=[['a5_1',[{ctx:'Lily 想先看规则',pre:'Let me ',post:' the rules.',a:'read',d:'to read',b:'DO'},{ctx:'怪兽把大家都逗笑了',pre:'The monster made everyone ',post:'.',a:'laugh',d:'to laugh',b:'DO'}],'<b>let / make / have</b>（三使）+ sb. + <b>do</b>，不带 to！'],
  ['a5_2',[{ctx:'Lily 叫 Biscuit 坐下',pre:'Lily asked Biscuit ',post:' down.',a:'to sit',d:'sit',b:'TD'},{ctx:'我们听见 Biscuit 叫了一声',pre:'We heard Biscuit ',post:'.',a:'bark',d:'to bark',b:'DO'}],'ask / tell / want sb. <b>to do</b> 要带 to；感官动词 <b>see / hear / watch / notice / feel</b> + sb. <b>do</b> 不带 to（看到 / 听到全过程）。<br>注意：<b>hear sb. doing</b> = 听到某人<b>正在</b>做。'],
  ['a5_3',[{ctx:'怪兽提醒：最好安静',pre:'You\'d better ',post:' quiet.',a:'be',d:'to be',b:'DO'},{ctx:'Leo 不知道下一步该做什么',pre:'I don\'t know what ',post:' next.',a:'to do',d:'do',b:'TD'}],'<b>had better do</b> 不带 to；<b>疑问词 + to do</b>：what to do / how to do it / where to go。']];
 await rounds(R,([au,rows,tip],i,n)=>({title:`🔧 修句子 ${i+1}/${n}：要不要 to？`,mode:'blank',desc:'有的动词后面的 to 会“隐身”。把对的词块拖进空格：',
  slots:rows.map((r,j)=>({k:'r'+j,ctx:r.ctx,pre:r.pre,post:r.post})),
  chunks:rows.flatMap((r,j)=>[{t:r.a,k:'r'+j,b:r.b,h:'放错格子了，看看每句话的情境。'},{t:r.d,k:null,h:r.b==='DO'?`这里的 to 要“隐身”——不需要 to。`:`这里需要 to！`}]),
  tip,audio:au,prog:prog(n,i)}));}

// A6 动名词作主语 / it 作形式主语
async function gameSubject(){
 const R=[{au:'a6_1',slots:[{k:'s',b:'ING',title:'主语',sub:'doing 当名词'},{k:'v',b:'L',title:'系动词',sub:''},{k:'c',b:'C',title:'表语',sub:''}],chunks:[{t:'Finding socks',k:'s'},{t:'is',k:'v'},{t:'his favourite hobby',k:'c'}],
   tip:'<b>动名词作主语</b>：Finding socks 是“找袜子这件事”，看作单数，所以谓语用 <b>is</b>。'},
  {au:'a6_2',slots:[{k:'s',b:'S',title:'形式主语',sub:'占位'},{k:'v',b:'L',title:'系动词',sub:''},{k:'c',b:'C',title:'表语',sub:''},{k:'td',b:'TD',title:'真正的主语',sub:'放到后面'}],chunks:[{t:'It',k:'s'},{t:'is',k:'v'},{t:'fun',k:'c'},{t:'to find socks',k:'td'}],
   tip:'不定式作主语太长时，用 <b>It</b> 占位，真正的主语 to do 放后面：It is fun to find socks. = To find socks is fun.<br>说人的品质用 <b>of</b>：It\'s kind <b>of</b> you to help me；说事情的难易用 <b>for</b>：It\'s easy <b>for</b> Biscuit to find socks.'}];
 await rounds(R,(r,i,n)=>({title:`🧱 搭句子 ${i+1}/${n}：动作也能当主语`,desc:'把词块拖进格子，搭出 Sam 说的句子：',slots:r.slots,
  chunks:r.chunks.map(c=>({...c,h:`“${c.t}”不在这个位置，看看格子上的提示。`})),tip:r.tip,audio:r.au,prog:prog(n,i)}));}

// A7 分词作定语
async function gameAttr(){await rounds([0],()=>({title:'🏷️ 给东西贴标签：doing 还是 done？',mode:'blank',
 desc:'<b>doing</b> 表示“主动 / 正在”；<b>done</b> 表示“被… / 已经”。把对的词块拖进空格（多出来的是陷阱）：',
 slots:[{k:'a',ctx:'一只被弄丢的袜子',pre:'a ',post:' sock'},{k:'b',ctx:'正在大笑的怪兽',pre:'the ',post:' monster'},{k:'c',ctx:'一把被弄坏的椅子',pre:'a ',post:' chair'},{k:'d',ctx:'一只正在跑的狗',pre:'a ',post:' dog'}],
 chunks:[{t:'lost',k:'a',b:'ED'},{t:'losing',k:null,h:'袜子是“被弄丢”的（被动），用 done。'},{t:'laughing',k:'b',b:'ING'},{t:'laughed',k:null,h:'怪兽自己在笑（主动、正在），用 doing。'},{t:'broken',k:'c',b:'ED'},{t:'breaking',k:null,h:'椅子是“被弄坏”的，用 done。'},{t:'running',k:'d',b:'ING'},{t:'run',k:null,h:'狗自己在跑（主动、正在），用 doing。'}].map(c=>c.k?{...c,h:'放错格子了，看看每个空格的情境。'}:c),
 tip:'单个分词放<b>名词前</b>：a lost sock；分词短语放<b>名词后</b>：a monster <b>holding a big sign</b>，a boy <b>called</b> Leo。<br>区分：a swimming girl（正在游泳的女孩，分词）≠ a swimming pool（游泳用的池子，动名词表用途）。',audio:'a7_all'}));}

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
let curImg=null;
function showImg(key,overlay=''){if(curImg===key&&!overlay)return;curImg=key;const st=$('#stage');const [src,label]=IMG[key];
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
async function story(){
 homeOn(false);$('#start').style.display='none';
 showImg('gate');await say('l01','罗盘把冒险队带到了热闹的怪兽招聘会。');await say('l02','一只高高的紫色怪兽站在门口，举着一块大牌子。');await say('l03','“欢迎！我需要一个帮手来看守我的袜子。”');
 showImg('crew');await say('l04','“我们来这里是为了给 Biscuit 找份工作！”');await say('l05','“可是 Biscuit 太小了，什么也看守不了。”');await say('l06','“这个招聘会太让人激动了，我好激动！”');
 $('#sub').style.display='none';await gameForms();await gameFeel();
 showImg('rules','<div class="carve">No barking! · Remember to smile.</div>');await say('l07','“等等，让我先看看规则。”');await say('l08','“规则一：禁止吠叫。规则二：记得微笑。”');
 $('#sub').style.display='none';await gameVerbs();
 showImg('sniff');await say('l09','Biscuit 不叫了，摇起了尾巴。');await say('l10','“给我看看你怎么干这份活，小狗。”');await say('l11','Biscuit 停下来闻了闻空气，然后在桌子下面找到了一只丢失的袜子。');
 $('#sub').style.display='none';await gameMeaning();
 showImg('job');await say('l12','“找袜子是它最爱的爱好！”');await say('l13','“哈！你把我逗笑了。这份工作归你了！”');await say('l14','Leo 永远忘不了看到 Biscuit 得到第一份工作的那一刻。');
 $('#sub').style.display='none';await gameTo();await gameSubject();await gameAttr();await mapCard();await spellCard();await ending();
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
const JUMP={forms:[gameForms,'crew'],feel:[gameFeel,'crew'],verbs:[gameVerbs,'rules'],meaning:[gameMeaning,'sniff'],to:[gameTo,'job'],subject:[gameSubject,'job'],attr:[gameAttr,'job'],map:[mapCard,'job'],card:[spellCard,'job']};
if(Q.get('jump')){homeOn(false);$('#start').style.display='none';ac();const [f,img]=JUMP[Q.get('jump')];showImg(img);f().then(()=>{if(Q.get('jump')==='card')ending();});}else $('#start').style.display='flex';$('#go').onclick=()=>{ac();story();};window.__go=()=>$('#go').click();
