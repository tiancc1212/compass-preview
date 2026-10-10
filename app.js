import * as THREE from 'three';
import {badge} from './badges.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const Q=new URLSearchParams(location.search);const $=s=>document.querySelector(s);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches||Q.get('rm')==='1';if(RM)document.body.classList.add('rm');
try{await document.fonts.load('44px "Noto Sans Egyptian Hieroglyphs"','𓂀');}catch(e){}
// ---------- audio / subtitles ----------
let LINES={},muted=Q.get('mute')==='1',curLine=null,curAudio=null,skipFlag=null;
const WHO={narrator:['旁白','#8a6a48'],leo:['Leo','#e0322b'],mia:['Mia','#9b7fd6'],sam:['Sam','#f08a00'],lily:['Lily','#2e9e6b'],grandpa:['爷爷','#6d4c2f']};
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

// ---------- drag-into-slots ----------
const LBL={S:['S','谁','主语'],V:['V','做什么','谓语'],L:['L','是 / 看起来','系动词'],O:['O','什么','宾语'],C:['C','怎样 / 在哪','表语']};
function slotRound({title,desc,stone,prog,sent}){return new Promise(res=>{
 const order=sent.chunks.map((c,i)=>i);for(let i=order.length-1;i>0;i--){const j=(i*7+3)%(i+1);[order[i],order[j]]=[order[j],order[i]];}
 if(order.every((v,i)=>v===i))order.reverse();
 showPanel(`<div class="card dcard"><h2>${title}</h2><p class="desc">${desc}</p>
  <div class="${stone?'stone':''} bankwrap"><div class="bank">${order.map(i=>`<button class="dchunk" data-i="${i}">${sent.chunks[i][0]}</button>`).join('')}</div></div>
  <div class="slots">${sent.chunks.map((c,i)=>{const l=LBL[c[1]];return `<div class="slot" data-role="${c[1]}"><div class="slab">${badge(c[1],{size:40})}<span class="lt">${l[1]}<small>${l[2]}</small></span></div><div class="drop"></div></div>`;}).join('')}</div>
  <p id="tip" class="tip" aria-live="polite"></p>${prog||''}<div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.dcard'),tip=card.querySelector('#tip');let sel=null,left=sent.chunks.length;
 const roleOf=el=>sent.chunks[+el.dataset.i][1];
 const clearSel=()=>{if(sel)sel.classList.remove('sel');sel=null;card.querySelectorAll('.slot').forEach(s=>s.classList.remove('armed'));};
 const back=el=>{el.style.transition=RM?'none':'transform .25s cubic-bezier(.3,1.6,.5,1)';el.style.transform='';if(!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}};
 function attempt(el,slot){if(!slot||slot.classList.contains('filled'))return back(el);const want=roleOf(el),got=slot.dataset.role;
  if(want===got){el.style.transition='none';el.style.transform='';slot.querySelector('.drop').appendChild(el);slot.classList.add('filled',want);el.classList.add('placed',want);el.disabled=true;
   if(!RM){el.classList.remove('snap');void el.offsetWidth;el.classList.add('snap');}sfx('ok');sparkle(slot,8);tip.textContent='';left--;
   if(left===0){tip.innerHTML='✅ '+sent.tip;card.classList.add('done');const a=voice('audio/'+sent.id+'.mp3');if(!muted)a.play();
    if(Q.get('fast'))setTimeout(res,400);else{const nb=document.createElement('button');nb.className='btn big';nb.textContent='继续 ➜';nb.onclick=res;card.querySelector('.nextwrap').appendChild(nb);nb.focus();}}}
  else{sfx('bad');back(el);const l=LBL[want];tip.textContent=`再想想：“${el.textContent}”回答的是「${l[1]}」，它是${l[2]}哦。`;}
  clearSel();}
 card.querySelectorAll('.dchunk').forEach(el=>{
  el.addEventListener('pointerdown',e=>{if(el.disabled)return;e.preventDefault();el.setPointerCapture(e.pointerId);const sx=e.clientX,sy=e.clientY;let moved=false;el.style.transition='none';el.classList.add('dragging');
   const mv=ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;if(Math.hypot(dx,dy)>6)moved=true;if(moved)el.style.transform=`translate(${dx}px,${dy}px) scale(1.08)`;
    card.querySelectorAll('.slot').forEach(s=>s.classList.remove('hover'));if(moved){el.style.visibility='hidden';const t=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.slot');el.style.visibility='';if(t)t.classList.add('hover');}};
   const up=ev=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.classList.remove('dragging');card.querySelectorAll('.slot').forEach(s=>s.classList.remove('hover'));
    if(!moved){el.style.transform='';if(sel===el){clearSel();return;}clearSel();sel=el;el.classList.add('sel');card.querySelectorAll('.slot:not(.filled)').forEach(s=>s.classList.add('armed'));tip.textContent='已选中“'+el.textContent+'”，再点一个格子放进去。';return;}
    el.style.visibility='hidden';const t=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('.slot');el.style.visibility='';attempt(el,t);};
   el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clearSel();sel=el;el.classList.add('sel');card.querySelectorAll('.slot:not(.filled)').forEach(s=>s.classList.add('armed'));}});});
 card.querySelectorAll('.slot').forEach(s=>{s.tabIndex=0;const go=()=>{if(sel)attempt(sel,s);};s.addEventListener('click',go);s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
 window.__slotAttempt=(i,role)=>{const el=card.querySelector(`.dchunk[data-i="${i}"]`);attempt(el,card.querySelector(`.slot[data-role="${role}"]:not(.filled)`));};
 window.__autoCatch=window.__autoGlyph=()=>sent.chunks.forEach((c,i)=>window.__slotAttempt(i,c[1]));
});}
async function catchGame(){
 const S=[{id:'l04',chunks:[['They','S'],['are','L'],['inside a pyramid','C']],tip:'They（主语）+ are（系动词 be）+ inside a pyramid（表语：在哪儿）'},
          {id:'l10',chunks:[['Biscuit','S'],['finds','V'],['an old sock','O']],tip:'Biscuit（主语）+ finds（谓语：动作）+ an old sock（宾语：动作落在谁身上）'}];
 for(let i=0;i<S.length;i++)await slotRound({title:`🔍 捉语法 ${i+1}/2`,desc:'把词块<b>拖进</b>下面对应的格子（也可以先点词块，再点格子）。门要听到<b>完整的句子</b>才会开！',sent:S[i]});
 hidePanel();}
async function hookCard(){await new Promise(res=>{showPanel(`<div class="card"><h2>🎣 今天的魔法句</h2><div class="sent"><div class="chunk S">I<span class="tag">${badge("S",{size:30})}</span></div><div class="chunk V">have<span class="tag">${badge("V",{size:30})}</span></div><div class="chunk O">a dream<span class="tag">${badge("O",{size:30})}</span></div><span style="align-self:center">.</span></div>
 <p>只有 4 个词，<b>主语 + 谓语 + 宾语</b> 全都有！</p><p>英语句子先说 <b>“谁”</b>，再说 <b>“干什么 / 是什么”</b>，后面接 <b>宾语</b>（动作落在谁身上）或 <b>表语</b>（主语什么样）。</p><button class="btn big" id="ok">继续冒险 ➜</button></div>`);
 say('h01','爷爷的声音从罗盘里传来：“I have a dream.”');panel.querySelector('#ok').onclick=res;window.__auto=res;});hidePanel();}
// Hieroglyph splitting: drag glyphs onto chunks
async function glyphGame(){
 const T=[['g01',[['Biscuit','S'],['finds','V'],['an old sock','O']],'太棒了！石板发出金光！'],['g02',[['Mia','S'],['looks','L'],['scared','C']],'looks 是“看起来”，和 be 一样是<b>系动词</b>，scared 是<b>表语</b>'],['g03',[['They','S'],['are','L'],['inside a pyramid','C']],'are 是系动词 be，inside a pyramid 是表语'],['g04',[['Lily','S'],['reads','V'],['the wall','O']],'reads 是动作，the wall 是宾语'],['g05',[['I','S'],['have','V'],['a dream','O']],'I have a dream —— 主谓宾全齐！']];
 for(let ti=0;ti<T.length;ti++){const [id,ch,tip]=T[ti];
  await slotRound({title:`𓂀 象形文字拆句 · 石板 ${ti+1}/5`,desc:'石板裂成了几块！把它们拖回刻着象形符号的位置：',stone:true,prog:`<div class="prog">${T.map((_,i)=>`<i class="${i<ti?'ok':''}"></i>`).join('')}</div>`,sent:{id,chunks:ch,tip}});}
 hidePanel();}
let cardWord='brave';
async function spellCard(){
 await new Promise(res=>{const adjs=[['brave','勇敢'],['happy','开心'],['curious','好奇'],['kind','善良'],['strong','强壮'],['smart','聪明'],['funny','有趣']];
  showPanel(`<div class="card"><h2>⭐ 制作你的第一张“开门咒语卡”</h2><p>用 <b>主语 + 系动词 + 表语</b> 说说你自己：</p>
   <div class="adj">${adjs.map(([w,z])=>`<button class="btn" data-w="${w}">${w}<br><small>${z}</small></button>`).join('')}</div>
   <div class="flipwrap"><div class="flip" id="flip">
    <div class="face"><div class="border"></div><div class="glyrow" style="top:14px">𓂀 𓆣 𓋹 𓇳 𓆓</div><div style="font-size:30px;font-weight:900">开门咒语卡 #1</div><div style="margin-top:8px;font-size:22px;font-family:Georgia,serif">I am <u id="w">brave</u>.</div><div class="glyrow" style="bottom:14px">𓇳 𓋹 𓆣 𓂀 𓅓</div></div>
    <div class="face back"><div class="border"></div><div class="glyrow" style="top:14px">𓂀 𓆣 𓋹 𓇳 𓆓</div><div class="sent" style="margin:0;font-size:28px"><div class="chunk S">I<span class="tag">${badge("S",{size:30})}</span></div><div class="chunk L">am<span class="tag">${badge("L",{size:30})}</span></div><div class="chunk C" id="w2">brave<span class="tag">${badge("C",{size:30})}</span></div></div><div style="font-size:15px;margin-top:4px">主语 + 系动词 + 表语 · 门已认得你的声音！</div><div class="glyrow" style="bottom:14px">𓇳 𓋹 𓆣 𓂀 𓅓</div></div>
   </div></div><button class="btn big" id="carve">🪄 刻下咒语</button></div>`);
  panel.querySelectorAll('.adj button').forEach(b=>b.onclick=()=>{cardWord=b.dataset.w;panel.querySelector('#w').textContent=cardWord;panel.querySelector('#w2').firstChild.textContent=cardWord;const a=voice('audio/card_'+cardWord+'.mp3');if(!muted)a.play();});
  const carve=async()=>{const btn=panel.querySelector('#carve');btn.disabled=true;sfx('flip');panel.querySelector('#flip').classList.add('on');setTimeout(()=>sparkle(panel.querySelector('.flipwrap'),24),500);
   await say('card_'+cardWord,'你的咒语：I am '+cardWord+'.');btn.textContent='⭐ 把星星送回罗盘';btn.disabled=false;btn.onclick=res;window.__auto=res;};
  panel.querySelector('#carve').onclick=carve;window.__auto=carve;});
}
// ---------- illustrations ----------
const IMG={attic:['illus/01_attic.jpg','阁楼 · Leo 握着罗盘'],arrive:['illus/02_arrival.jpg','金字塔内部 · 刚刚到达'],torch:['illus/03_mia_torches.jpg','火把亮起 · Mia 害怕'],sock:['illus/04_biscuit_sock.jpg','Biscuit 找到旧袜子'],door:['illus/05_door_open.jpg','石门打开 · 门后的刻字']};
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
let starsLit=0,spin=0;const clock=new THREE.Clock();
function loop(){const t=clock.getElapsedTime();if(!RM){rig.rotation.y=Math.sin(t*0.5)*0.3+spin;rig.position.y=Math.sin(t*1.2)*0.04;}
 sockets.forEach((s,i)=>{if(i<starsLit){s.material.color.set('#ffd66b');s.material.emissive.set('#ffbb22');s.material.emissiveIntensity=RM?1.5:1.4+Math.sin(t*4)*.4;}});
 if($('#home').style.display!=='none')R.render(scene,cam);requestAnimationFrame(loop);}
// ---------- flow ----------
LINES=await (await fetch('audio/lines.json')).json();
$('#loading').style.display='none';showImg('attic');requestAnimationFrame(loop);window.__ready=true;
const homeOn=on=>{$('#home').style.display=on?'flex':'none';$('#c').style.display=on?'block':'none';};
async function story(){
 homeOn(false);$('#start').style.display='none';
 showImg('attic');await say('l01','Leo 握住了罗盘。');await say('l02','“我们去埃及！”');await say('l03','指针飞快地转了起来。');
 showImg('arrive');await say('l04','突然，他们来到了一座金字塔里面！');await say('l05','墙壁又冷又黑。');
 showImg('torch');await say('l06','Mia 看起来很害怕。');await say('l07','一扇石门上刻着字：');
 showImg('torch','<div class="carve door">Speak a full sentence.</div>');await say('l08','“说出一个完整的句子。”');await say('l09','Lily 读着墙上的字。');
 showImg('sock');await say('l10','Biscuit 找到了一只旧袜子。');await say('l11','“这只袜子好旧啊！”');await say('l12','Leo 说。');
 $('#sub').style.display='none';await catchGame();
 showImg('door','<div class="carve clue">C. C. was here – 1975</div>');sfx('door');await say('l13','门慢慢地打开了。');
 await say('c02','门后刻着一行字：“C. C. was here – 1975”……是爷爷名字的缩写吗？');
 await hookCard();await glyphGame();await spellCard();await ending();
}
async function ending(){
 const fr=panel.querySelector('.flipwrap')?.getBoundingClientRect()||{left:innerWidth/2,top:innerHeight/2,width:0,height:0};hidePanel();$('#sub').style.display='none';
 showImg('attic');homeOn(true);$('#start').style.display='none';await sleep(100);
 const p=sockets[0].getWorldPosition(new THREE.Vector3()).project(cam);const cr=canvas.getBoundingClientRect();const tx=cr.left+(p.x*.5+.5)*cr.width,ty=cr.top+(-p.y*.5+.5)*cr.height;
 sfx('star');
 if(!RM){const st=$('#flystar');st.style.display='block';const sx=fr.left+fr.width/2,sy=fr.top+fr.height/2;const t0=performance.now();
  await new Promise(r=>{const f=()=>{const k=Math.min(1,(performance.now()-t0)/1800),e=1-Math.pow(1-k,3);st.style.left=(sx+(tx-sx)*e-32)+'px';st.style.top=(sy+(ty-sy)*e-40-Math.sin(k*Math.PI)*160)+'px';st.style.transform=`scale(${1.4-k*.9}) rotate(${k*540}deg)`;k<1?requestAnimationFrame(f):r();};f();});st.style.display='none';}
 starsLit=1;$('#stars').textContent='⭐ 1 / 17';
 await say('star','第 1 颗星回到了罗盘！');$('#sub').style.display='none';
 showPanel(`<div class="card"><h2>🎉 第 1 集完成！</h2><p style="font-size:22px">⭐ 1 / 17　·　🗺️ 地图解锁：<b>金字塔</b></p><p>🧩 爷爷线索：门后刻着 <b>“C. C. was here – 1975”</b></p><p>📒 把你的“开门咒语卡”贴进冒险日志首页吧！</p><button class="btn big" id="again">🔁 再玩一次</button></div>`);
 panel.style.background='rgba(20,10,30,.15)';panel.style.alignItems='flex-end';panel.style.paddingBottom='4vh';
 panel.querySelector('#again').onclick=()=>location.reload();window.__done=true;}
if(Q.get('jump')){homeOn(false);$('#start').style.display='none';ac();const j=Q.get('jump');showImg(j==='glyph'?'door':'sock');(j==='glyph'?glyphGame():j==='card'?spellCard():j==='hook'?hookCard():catchGame());}else $('#start').style.display='flex';$('#go').onclick=()=>{ac();story();};window.__go=()=>$('#go').click();
