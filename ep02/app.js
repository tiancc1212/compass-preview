import * as THREE from 'three';
import {badge} from './badges.js?v=2';
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
function voice(src){const a=new Audio(src+'?v=20261011-level1');a.playbackRate=RATE;a.preservesPitch=true;a.mozPreservesPitch=true;a.webkitPreservesPitch=true;return a;}
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

// ---------- episode 2 activities ----------
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const normal=s=>String(s).trim().toLowerCase().replace(/[’‘]/g,"'");
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
let AUTO=null;window.__solve=()=>AUTO&&AUTO();window.__auto=()=>AUTO&&AUTO();
// Keep the shared player intact; one-off card/ending speech may restart after a mute toggle.
function episodeSay(id,zh='',{subtitles=true}={}){return new Promise(res=>{const controls=[$('#mute'),$('#replay')];const restart=()=>{if(curAudio)curAudio.pause();playLine(id,zh,{timed:true,onEnd:()=>{controls.forEach(b=>b.removeEventListener('click',restart));$('#sub').style.display='none';setTimeout(res,300);}});if(!subtitles)$('#sub').style.display='none';};controls.forEach(b=>b.addEventListener('click',restart));restart();});}
function reward(id){return episodeSay(id,'',{subtitles:false});}
// Every activity ends by closing its card; only correct answers start a voice clip.
function stepCard({id,title,desc,steps,tip}){return new Promise(res=>{let i=0;
 showPanel(`<div class="card qcard" data-activity="${id}"><h2>${badge(({q1:'A',q2:'THE',q3:'OWNER',q4:'COUNT',q5:'ZERO',q6:'THE'})[id],{size:36})} ${title}</h2><p class="desc">${desc}</p><div class="qbody"></div><p class="tip" aria-live="polite"></p><div class="prog"></div><div class="nextwrap"></div></div>`);
 const card=panel.querySelector('.qcard'),body=card.querySelector('.qbody'),te=card.querySelector('.tip'),pg=card.querySelector('.prog'),nw=card.querySelector('.nextwrap');
 // The shared replay handler creates its own Audio after a reward has ended. Keep
 // at most one replay alive, then cancel it before another question can appear.
 const stopRewardPlayback=()=>{if(stopCur)stopCur();if(curAudio)curAudio.pause();};
 $('#replay').addEventListener('click',stopRewardPlayback,true);
 const draw=()=>{pg.innerHTML=steps.map((_,j)=>`<i class="${j<i?'ok':''}"></i>`).join('');};
 const go=()=>{card.dataset.step=i+1;draw();nw.innerHTML='';te.innerHTML='';body.innerHTML=steps[i].html;body.classList.remove('solved');let solved=false;
  const api={tip:h=>te.innerHTML=h,bad:(h,el)=>{sfx('bad');te.innerHTML='<span class="no">再想想：</span>'+h;if(el&&!RM){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}},
   ok:async(h,audio)=>{if(solved)return;solved=true;body.classList.add('solved');te.innerHTML='✔ '+h;i++;draw();AUTO=null;const last=i===steps.length;let ready=false,advanced=false;
    const advance=()=>{if(!ready||advanced)return;if(document.body.classList.contains('inreview')){setTimeout(advance,150);return;}advanced=true;stopRewardPlayback();if(last){$('#replay').removeEventListener('click',stopRewardPlayback,true);hidePanel();res();}else go();};
    window.__continue=advance;let nb=null;
    if(last)te.innerHTML+=`<div class="sum">${tip||''}</div>`;
    else {nb=document.createElement('button');nb.className='btn big';nb.textContent='下一步';nb.disabled=true;nb.onclick=advance;nw.appendChild(nb);}
    await reward(audio);ready=true;
    if(last||Q.get('fast'))advance();else{nb.disabled=false;nb.focus({preventScroll:true});}
   }};
  steps[i].mount(body,api);};go();});}
function typed({ctx,pre,post,ans,audio,hint,why}){return {html:`<div class="ctx">${ctx}</div><form class="tform" autocomplete="off"><div class="bsent">${pre}<input class="tin" aria-label="填空" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" size="${Math.max(4,ans.length)}">${post}</div><button class="btn" type="submit">检查</button></form>`,mount(el,api){const f=el.querySelector('form'),inp=f.querySelector('input');let tries=0,done=false;
 f.onsubmit=e=>{e.preventDefault();if(done)return;const v=normal(inp.value);if(!v)return api.tip('先在空格里打字。');if(v===normal(ans)){done=true;inp.value=ans;inp.disabled=true;f.querySelector('button').disabled=true;inp.classList.add('right');api.ok(why,audio);}else{tries++;api.bad(hint+(tries>=2?`<br>答案是 <b>${esc(ans)}</b>，请自己填进去。`:''),inp);inp.select();}};
 AUTO=()=>{inp.value=ans;f.requestSubmit();};}};}
const DOWNLOAD='<a class="word-download" href="downloads/ep02_nouns_articles.docx" download="罗盘冒险队_第2集_名词与冠词知识地图.docx">下载知识点（Word）</a>';
const articleHint=v=>v==='the'?'这里还没指定哪一个。':v==='an'?'看看后面紧接着的读音。':'a/an 要看后面紧接着的读音。';
async function q1(){await stepCard({id:'q1',title:'清单小帽子',desc:'船长要一个普通物件。补 a 或 an，看后面紧接的读音。',tip:'a/an 常表示一个没指定的可数东西。看读音，不是看首字母。',steps:[
 typed({ctx:'清单要一把斧头',pre:'Bring ',post:' axe.',ans:'an',audio:'ex_q1_axe',hint:'先轻声读 axe，判断它开头的声音。不要只看第一个字母。',why:'Bring an axe. · axe 的开头是元音音素。'}),
 typed({ctx:'清单要一面盾牌',pre:'Bring ',post:' shield.',ans:'a',audio:'ex_q1_shield',hint:'先轻声读 shield，判断它开头的声音。',why:'Bring a shield. · shield 的开头是辅音音素。'}),
 typed({ctx:'Lily 夸手里的工具',pre:'This is ',post:' useful tool.',ans:'a',audio:'ex_q1_useful',hint:'空格后紧接的是 useful。先读这个词，听听它的开头，不要跳过它去看 tool。',why:'This is a useful tool. · useful 的开头是辅音音素。'})]});}
function choice({ctx,img,good,others,audio,hint,why}){const opts=shuffle([good,...others]);return {html:`<div class="ctx">${ctx}</div>${img?`<img class="qimage" src="illus/${img}.jpg" alt="${esc(ctx)}">`:''}<div class="popts">${opts.map(t=>`<button class="popt">${esc(t)}</button>`).join('')}</div>`,mount(el,api){let tries=0,done=false;el.querySelectorAll('.popt').forEach(b=>b.onclick=()=>{if(done)return;if(b.textContent===good){done=true;b.classList.add('right');el.querySelectorAll('button').forEach(x=>x.disabled=true);api.ok(why||good,audio);}else{tries++;api.bad(hint+(tries>=2?`<br>选这句：<b>${esc(good)}</b>，请自己点选。`:''),b);}});AUTO=()=>[...el.querySelectorAll('.popt')].find(b=>b.textContent===good).click();}};}
async function q2(){await stepCard({id:'q2',title:'船长要哪一顶',desc:'看清画面和情境，再选一句。',tip:'听的人能不能知道是哪一个？“第一次 a、第二次 the”只是常见线索。',steps:[
 choice({ctx:'Mia 还没选，想拿任意一顶普通头盔。',img:'pick_helmet_any',good:'Mia needs a helmet.',others:['Mia needs the helmet.','Mia needs helmet.'],audio:'ex_q2_any',hint:'Mia 还没有选好。她想拿的是特定的一顶，还是任意一顶？'}),
 choice({ctx:'上一句：Mia has a helmet. 现在继续说她手里的同一顶。',img:'pick_helmet_again',good:'The helmet is small.',others:['A helmet is small.','Helmet is small.'],audio:'ex_q2_again',hint:'前后两句说的是同一顶，还是重新介绍另一顶？'}),
 choice({ctx:'Sam 和 Lily 都看着 Biscuit 嘴里的唯一一顶头盔。Lily 第一次提起它，想让 Sam 拿回这一顶。',img:'pick_helmet_known',good:"Bring me the helmet in Biscuit's mouth.",others:["Bring me a helmet in Biscuit's mouth.","Bring me helmet in Biscuit's mouth."],audio:'ex_q2_known',hint:'看看 Sam 和 Lily 能不能从画面知道她要哪一顶。别只数这个词前面出现过几次。'})]});}
async function q3(){await stepCard({id:'q3',title:'东西是谁的',desc:'根据括号里的主人，写出“谁的”。留意是一位还是多位。',tip:"the captain's helmet 里的 the 跟 captain 在一起；Leo's helmet、my helmet 前不能再加 the。",steps:[
 typed({ctx:'一位船长的头盔不见了',pre:'The ',post:' helmet is missing. (captain)',ans:"captain's",audio:'ex_q3_captain',hint:"先确认主人是一位还是多位，再检查词尾有没有表达“谁的”。不要重复题干已有的词。",why:"一位主人加 's：captain's。"}),
 typed({ctx:'多位船员各自的靴子放在箱里',pre:'The ',post:' boots are in a box. (sailors)',ans:"sailors'",audio:'ex_q3_sailors',hint:"主人是多位船员。先保留完整的复数词，再检查表示所有关系的标记放在哪里。",why:"s 结尾的复数加撇号：sailors'。"}),
 typed({ctx:'孩子们的包放在甲板上',pre:'The ',post:' bags are on the deck. (children)',ans:"children's",audio:'ex_q3_children',hint:"children 已经表示多个孩子。再看看它的词尾，想想怎样表示“这些孩子的”。",why:"不以 s 结尾的复数加 's：children's。"})]});}
// Pointer dragging, tapping a word then a target, and keyboard selection share one path.
function bindPlacement(el,attempt){let sel=null;
 const select=b=>{el.querySelectorAll('.dchunk').forEach(x=>x.classList.remove('sel'));sel=b;b.classList.add('sel');};
 el.querySelectorAll('.dchunk').forEach(b=>{b.onclick=()=>{if(!b.disabled)select(b);};b.addEventListener('pointerdown',e=>{if(b.disabled)return;e.preventDefault();b.setPointerCapture(e.pointerId);const x=e.clientX,y=e.clientY;let moved=false;
 const mv=e=>{if(Math.hypot(e.clientX-x,e.clientY-y)>8)moved=true;if(moved){b.classList.add('dragging');b.style.transform=`translate(${e.clientX-x}px,${e.clientY-y}px)`;}};
 const up=e=>{b.removeEventListener('pointermove',mv);b.removeEventListener('pointerup',up);b.removeEventListener('pointercancel',cancel);b.classList.remove('dragging');b.style.transform='';if(e.type==='pointercancel')return;if(moved){b.style.visibility='hidden';const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-target]');b.style.visibility='';if(target)attempt(b,target);}else select(b);};const cancel=e=>up(e);
 b.addEventListener('pointermove',mv);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',cancel);});});
 el.querySelectorAll('[data-target]').forEach(t=>{const place=()=>{if(sel&&!sel.disabled){attempt(sel,t);sel.classList.remove('sel');sel=null;}};t.onclick=place;t.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();place();}};});}
const ITEMS=[['shields','盾牌','shield','count','一面、两面盾牌，可以直接数。'],['knives','小刀','knife','count','一把、两把刀，可以直接数。'],['socks','袜子','sock','count','一只、两只袜子，可以直接数。'],['bread','面包这种食物','bread','amount','这里 bread 表示面包这种食物；要数两块，说 two pieces of bread。'],['water','饮用水','water','amount','这里 water 是饮用水；想数两瓶，就数 bottles。'],['wood','造船木材','wood','amount','这里 wood 是木材，要用 a piece of wood 之类的量词表达。']];
function sortStep(){const order=shuffle(ITEMS);return {html:`<p class="qdesc">先点词卡，再点盒子；也可以拖进去。</p><div class="bank item-bank">${order.map(([w,z,img])=>`<button class="dchunk item" data-word="${w}"><img src="illus/item_${img}.jpg" alt=""><b>${w}</b><small>${z}</small></button>`).join('')}</div><div class="sort-boxes">${[['count','这里可以直接数几个'],['amount','这里按份量说']].map(([k,t])=>`<div class="slot" data-target="${k}" tabindex="0" role="button" aria-label="${t}"><h3>${t}</h3><div class="drop"></div></div>`).join('')}</div>`,mount(el,api){let left=6;const tries={};const attempt=(b,t)=>{if(b.disabled)return;const it=ITEMS.find(i=>i[0]===b.dataset.word);if(it[3]===t.dataset.target){b.disabled=true;b.classList.add('placed');t.querySelector('.drop').appendChild(b);left--;if(!left)api.ok('先问这句话里在数什么。这里 bread、water、wood 按份量说。','ex_q4_sort');else{api.tip('放好了，再选一个。');sfx('ok');}}else{tries[it[0]]=(tries[it[0]]||0)+1;api.bad(tries[it[0]]>=2?it[4]+`<br>请放进“${it[3]==='count'?'这里可以直接数几个':'这里按份量说'}”。`:'先看看词卡的中文义：这句话想直接数物件，还是说材料或食物的份量？',b);}};bindPlacement(el,attempt);window.__try=(word,target)=>attempt(el.querySelector(`[data-word="${word}"]`),el.querySelector(`[data-target="${target}"]`));AUTO=()=>ITEMS.forEach(it=>window.__try(it[0],it[3]));}};}
async function q4(){await stepCard({id:'q4',title:'给午餐装船',desc:'按词卡给定的意思分拣，再写出数量。',tip:'先问这里在数什么：物件，或块、瓶、杯这样的单位。',steps:[sortStep(),
 typed({ctx:'桌上有三把小刀',pre:'There are three ',post:' on the table. (knife)',ans:'knives',audio:'ex_q4_knives',hint:'three 提醒我们有几个？再回想 knife 的复数词尾怎么变化。',why:'knife → knives。'}),
 typed({ctx:'要两块面包',pre:'We need two ',post:' of bread. (piece)',ans:'pieces',audio:'ex_q4_pieces',hint:'这句在数面包，还是数面包的“块”？空格里是哪一个词的数量变化？',why:'two pieces of bread：数的是 pieces。'})]});}
function articleStep({ctx,pre,post,ans,audio,hint,why}){const opts=shuffle(['a','an','the','不填']);return {html:`<div class="ctx">${ctx}</div><div class="bsent sentence-drop">${pre}<span class="slot bslot" data-target="blank" tabindex="0" role="button" aria-label="句子的空格"><span class="drop">放在这里</span></span>${post}</div><div class="bank article-bank">${opts.map(w=>`<button class="dchunk" data-value="${w}">${w}</button>`).join('')}</div><p class="qdesc">点词卡，再点空格；也可以拖进去。</p>`,mount(el,api){let tries=0,done=false;const attempt=(b,t)=>{if(done)return;if(b.dataset.value===ans){done=true;el.querySelectorAll('.dchunk').forEach(x=>x.disabled=true);t.querySelector('.drop').textContent=ans==='不填'?'不填':ans;t.classList.add('filled');api.ok(why,audio);}else{tries++;api.bad(hint+(tries>=2?`<br>选择“<b>${ans}</b>”，请自己放进空格。<br>正确句：${esc(why)}`:''),b);}};bindPlacement(el,attempt);AUTO=()=>attempt(el.querySelector(`[data-value="${ans}"]`),el.querySelector('[data-target]'));}};}
async function q5(){await stepCard({id:'q5',title:'午餐与棋局',desc:'把 a / an / the / 不填 放进句子。',tip:'泛指食物、通常的三餐、球类和棋类活动常不加冠词；指定“那一份”仍然可以用 the。',steps:[
 articleStep({ctx:'说平常吃哪种食物，不指桌上某一份',pre:'We eat ',post:' bread.',ans:'不填',audio:'ex_q5_bread',hint:'这里说的是一种食物，还是指定桌上的某一份？先看清句子的意思。',why:'We eat bread.'}),
 articleStep({ctx:'说通常的午餐',pre:'We eat bread for ',post:' lunch.',ans:'不填',audio:'ex_q5_lunch',hint:'这里说的是平常的午餐，还是某一顿特别的午餐？回想通常三餐的表达。',why:'We eat bread for lunch.'}),
 articleStep({ctx:'说在下棋这项活动',pre:'The Vikings play ',post:' chess.',ans:'不填',audio:'ex_q5_chess',hint:'chess 在这里说的是棋类活动，还是某一件具体的物品？回想活动名称的表达。',why:'The Vikings play chess.'}),
 articleStep({ctx:'只要 Lily 盘里那份面包，两人都看得见',pre:'Please pass ',post:" bread on Lily's plate.",ans:'the',audio:'ex_q5_specific',hint:'再看看 on Lily\'s plate：它帮助两人认出哪一份了吗？',why:"Please pass the bread on Lily's plate."})]});}
function tfStep({ctx,s,yes,good,audio,hint}){const opts=shuffle([['这样说可以','yes'],['需要改一下','no']]);return {html:`<div class="ctx">${ctx}</div><div class="tfs">${esc(s)}</div><div class="tfb">${opts.map(([t,k])=>`<button class="btn tf" data-value="${k}">${t}</button>`).join('')}</div>`,mount(el,api){let tries=0,done=false;el.querySelectorAll('.tf').forEach(b=>b.onclick=()=>{if(done)return;if((b.dataset.value==='yes')===yes){done=true;el.querySelectorAll('button').forEach(x=>x.disabled=true);if(!yes)el.querySelector('.tfs').innerHTML=`<s>${esc(s)}</s><br><span class="fixed">${esc(good)}</span>`;api.ok(good,audio);}else{tries++;api.bad(hint+(tries>=2?`<br>请选择“${yes?'这样说可以':'需要改一下'}”。<br>正确句：${esc(good)}`:''),b);}});AUTO=()=>el.querySelector(`[data-value="${yes?'yes':'no'}"]`).click();}};}
async function q6(){await stepCard({id:'q6',title:'出发前看一眼',desc:'判断这句英文能不能表达给定的意思。',tip:'清单收好了！',steps:[
 tfStep({ctx:'想说“这是 Leo 的盾牌”',s:"This is Leo's shield.",yes:true,good:"This is Leo's shield.",audio:'ex_q6_owner',hint:"先看看句子有没有清楚说明主人是谁。给定的意思和这句话一致吗？"}),
 tfStep({ctx:'想说“Leo 踢足球这项运动”',s:'Leo plays the football.',yes:false,good:'Leo plays football.',audio:'ex_q6_football',hint:'这里说的是参加一项运动，还是摆弄某一个足球？这两种意思的表达一样吗？'})]});}
async function mapCard(){await new Promise(res=>{showPanel(`<div class="card kmap"><h2>${badge('A',{size:36})} 维京船知识地图</h2><p>想查哪一条，就展开看。</p><div class="kgrid">
 <div data-map="M1"><h3>${badge('N',{size:30})} M1 名词与数量</h3><p>名词给人和东西起名字。可数不可数要看这里的意思。</p><p>two shields · bread / water</p><details><summary>分类与不同意思</summary><p>专有/普通是另一种分类：Leo 是专有名词，helmet 是普通名词。room 表“空间”时不可数；a room 表“一间房间”。</p></details></div>
 <div data-map="M2"><h3>${badge('A',{size:30})} M2 a/an</h3><p>一个没指定的可数东西常用 a/an；看后面紧接的读音。</p><p>a shield / an axe<br>a useful tool / an hour<br>a small helmet</p></div>
 <div data-map="M3"><h3>${badge('THE',{size:30})} M3 the</h3><p>听的人能认出是谁、是哪一个，就常用 the；不要求必须先提过。</p><p>an axe → the axe<br>the helmet in Biscuit's mouth<br>the bread on Lily's plate · the sun</p></div>
 <div data-map="M4"><h3>${badge('ZERO',{size:30})} M4 不填冠词</h3><p>泛指复数、不可数名词，以及通常的三餐、球类、棋类、学科，常不加冠词。</p><p>Dogs like socks. / We need water.<br>after lunch / play football / play chess<br>learn English · my helmet</p><details><summary>也有指定与修饰的情况</summary><p>a big lunch / the lunch on the table：不是绝对禁用冠词。</p></details></div>
 <div data-map="M5"><h3>${badge('OWNER',{size:30})} M5 谁的</h3><p>一位主人加 's；s 结尾复数加 '；不以 s 结尾的复数加 's。</p><p>captain's / sailors' / children's<br>Leo's shield / my shield<br>the captain's helmet</p><details><summary>of 和无生命名词</summary><p>the deck of the ship / the ship's deck 都可以；不用“无生命只能用 of”的死规则。</p></details></div>
 <div data-map="M6"><h3>${badge('COUNT',{size:30})} M6 名词的小变化</h3><p>多个可数东西变复数；不可数东西可以数单位。</p><p>two pieces of bread / a bottle of water</p><details><summary>更多复数样式：需要时再查</summary><p>shield → shields · box → boxes<br>city → cities · key → keys<br>knife → knives 但 roof → roofs<br>potato → potatoes 但 photo → photos<br>child → children · man → men<br>sheep → sheep</p></details></div>
 </div><p>${DOWNLOAD}</p><button class="btn big" id="ok">做我的维京宝物卡</button></div>`);const next=()=>{hidePanel();res();};panel.querySelector('#ok').onclick=next;AUTO=next;window.__continue=next;});}
let cardWord=null;
async function spellCard(){const cards=[['shield',"This is Leo's shield.",'Leo 的盾牌'],['helmet',"This is Mia's helmet.",'Mia 的普通头盔'],['sock',"This is Biscuit's sock.",'Biscuit 的袜子']];await new Promise(res=>{let cur=null;
 showPanel(`<div class="card treasure-card"><h2>${badge('OWNER',{size:36})} 维京宝物卡 #2</h2><p>选一件宝物，再收进日志。</p><div class="treasures">${shuffle(cards).map(([k,s,z])=>`<button class="treasure" data-value="${k}"><img src="illus/item_${k}.jpg" alt="${z}"><span>${z}</span></button>`).join('')}</div><div class="flipwrap"><div class="flip" id="flip"><div class="face"><div class="border"></div><b>维京宝物卡 #2</b><p id="card-sentence">先选一件宝物</p></div><div class="face back"><div class="border"></div>${badge('OWNER',{size:56})}<p id="saved-sentence"></p><small>哪个东西 · 谁的 · 有几个</small></div></div></div><button class="btn big" id="carve" disabled>收进日志</button></div>`);
 panel.querySelectorAll('.treasure').forEach(b=>b.onclick=()=>{cur=cards.find(c=>c[0]===b.dataset.value);cardWord=cur[0];panel.querySelectorAll('.treasure').forEach(x=>x.classList.toggle('selected',x===b));panel.querySelector('#card-sentence').textContent=cur[1];panel.querySelector('#saved-sentence').textContent=cur[1];panel.querySelector('#carve').disabled=false;});
 const carve=async()=>{if(!cur)return;AUTO=null;const btn=panel.querySelector('#carve');btn.disabled=true;panel.querySelectorAll('.treasure').forEach(x=>x.disabled=true);panel.querySelector('#flip').classList.add('on');sfx('flip');await episodeSay('card_'+cur[0],cur[2]);btn.textContent='把第 2 颗星送回罗盘';btn.disabled=false;btn.onclick=res;AUTO=res;window.__continue=res;};panel.querySelector('#carve').onclick=carve;AUTO=()=>{panel.querySelector('[data-value="shield"]').click();carve();};});}
// ---------- illustrations ----------
const IMG={arrival:['illus/01_arrival.jpg','全队登上维京船'],list:['illus/02_captains_list.jpg','Lily 读船长的清单'],axe:['illus/03_heavy_axe.jpg','Sam 搬不动斧头'],wrong:['illus/04_wrong_helmet.jpg','Mia 找到普通头盔'],biscuit:['illus/05_biscuit_reveal.jpg','Biscuit 叼着船长头盔的皮带'],boots:['illus/06_sailors_boots.jpg','Lily 打开船员们的靴箱'],lunch:['illus/07_lunch_supplies.jpg','两面盾牌、三把小刀、两块面包和一瓶水'],chess:['illus/08_old_chessboard.jpg','Lily 发现旧棋盘上的线索'],star:['illus/09_star_discovery.jpg','棋盘旁发现第 2 颗星']};
let curImg=null,curOverlay='';
function showImg(key,overlay=''){if(curImg===key&&overlay===curOverlay)return;curImg=key;curOverlay=overlay;const st=$('#stage');const [src,label]=IMG[key];const lay=document.createElement('div');lay.className='layer';lay.innerHTML=`<img alt="${label}">${overlay}`;const im=lay.querySelector('img');im.onload=()=>lay.classList.add('loaded');im.onerror=()=>{lay.classList.add('missing');console.error('缺少本集插图：'+src);};im.src=src;st.appendChild(lay);requestAnimationFrame(()=>lay.classList.add('in'));const olds=[...st.children].slice(0,-1);setTimeout(()=>olds.forEach(o=>o.remove()),RM?0:450);}
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
const MYSTAR=1;
const completedStars=new Set((()=>{try{const v=JSON.parse(localStorage.getItem('cc_stars')||'[]');return Array.isArray(v)?v.map(Number).filter(n=>Number.isInteger(n)&&n>=1&&n<=17):[];}catch(e){return [];}})());
let starsLit=completedStars.has(MYSTAR+1)?1:0,spin=0;const clock=new THREE.Clock();
function updateStars(){starsLit=completedStars.has(MYSTAR+1)?1:0;$('#stars').textContent=`⭐ ${completedStars.size} / 17 · 本集 2`;}
function collectStar(){
 // Other episodes may have saved new stars since this page was opened.
 try{const latest=JSON.parse(localStorage.getItem('cc_stars')||'[]');if(Array.isArray(latest))latest.forEach(n=>{if(Number.isInteger(n)&&n>=1&&n<=17)completedStars.add(n);});}catch(e){}
 completedStars.add(MYSTAR+1);localStorage.setItem('cc_stars',JSON.stringify([...completedStars].sort((a,b)=>a-b)));updateStars();
}
updateStars();
function loop(){const t=clock.getElapsedTime();if(!RM){rig.rotation.y=Math.sin(t*0.5)*0.3+spin;rig.position.y=Math.sin(t*1.2)*0.04;}
 sockets.forEach((s,i)=>{if(completedStars.has(i+1)){s.material.color.set('#ffd66b');s.material.emissive.set('#ffbb22');s.material.emissiveIntensity=RM?1.5:1.4+Math.sin(t*4)*.4;}});
 if($('#home').style.display!=='none')R.render(scene,cam);requestAnimationFrame(loop);}// ---------- flow ----------
try{LINES=await (await fetch('audio/lines.json')).json();}catch(e){$('#loading').textContent='本集配音资料尚未就绪，请稍后再来。';throw e;}
$('#loading').style.display='none';showImg('arrival');requestAnimationFrame(loop);window.__ready=true;
$('#mute').textContent=muted?'🔇 已静音':'🔊 声音开';
const homeOn=on=>{$('#home').style.display=on?'flex':'none';$('#c').style.display=on?'block':'none';};
const SEC={S1:[{id:'l01',zh:'罗盘把我们带到了一艘维京船上。',img:'arrival'},{id:'l02',zh:'Lily 读起船长的清单。',img:'list'},{id:'l03',zh:'拿一把斧头、一面盾牌，还有船长的那顶头盔！',img:'list'},{id:'l04',zh:'这把斧头太重了！',img:'axe'}],S2:[{id:'l05',zh:'Mia 找到了一顶头盔。',img:'wrong'},{id:'l06',zh:'这不是船长的头盔！',img:'wrong'},{id:'l07',zh:'船长的头盔在 Biscuit 那儿！',img:'biscuit'},{id:'l08',zh:'船员们的靴子在一个箱子里。',img:'boots'}],S3:[{id:'l09',zh:'桌上有两面盾牌和三把小刀。',img:'lunch'},{id:'l10',zh:'我们午餐需要面包和水。',img:'lunch'},{id:'l11',zh:'这里有两块面包和一瓶水。',img:'lunch'}],S4:[{id:'l12',zh:'维京人午饭后下起了棋。',img:'chess'},{id:'l13',zh:'Lily 在旧棋盘上发现了“C. C. 到此一游”。',img:'chess',overlay:'<div class="carve">C. C. was here</div>'},{id:'l14',zh:'船长说：“以前有个中国男孩教过我下棋。”',img:'chess'},{id:'l15',zh:'第 2 颗星在棋盘旁亮了起来。',img:'star'}]};
window.__state=()=>({reading:!!RD,line:curLine?.id,section:lastSection===SEC.S1?'S1':lastSection===SEC.S2?'S2':lastSection===SEC.S3?'S3':'S4',activity:panel.querySelector('[data-activity]')?.dataset.activity,step:panel.querySelector('[data-step]')?.dataset.step,card:cardWord,starsLit,completed:[...completedStars].sort((a,b)=>a-b),litSlots:sockets.map((s,i)=>s.material.emissive.getHex()>0?i+1:null).filter(Boolean),muted,rate:RATE});
async function story(){homeOn(false);$('#start').style.display='none';await readSection(SEC.S1);await q1();await q2();await readSection(SEC.S2);await q3();await readSection(SEC.S3);await q4();await readSection(SEC.S4);await q5();await q6();await mapCard();await spellCard();await ending();}
async function ending(){const fr=panel.querySelector('.flipwrap')?.getBoundingClientRect()||{left:innerWidth/2,top:innerHeight/2,width:0,height:0};hidePanel();$('#sub').style.display='none';showImg('star');homeOn(true);$('#start').style.display='none';await sleep(100);
 const p=sockets[MYSTAR].getWorldPosition(new THREE.Vector3()).project(cam),cr=canvas.getBoundingClientRect(),tx=cr.left+(p.x*.5+.5)*cr.width,ty=cr.top+(-p.y*.5+.5)*cr.height;sfx('star');
 if(!RM){const st=$('#flystar');st.style.display='block';document.body.classList.add('starflight');const hint=document.createElement('div');hint.className='star-skip';hint.textContent='点击屏幕跳过';document.body.appendChild(hint);const sx=fr.left+fr.width/2,sy=fr.top+fr.height/2,t0=performance.now();
  await new Promise(resolve=>{let done=false,raf=0;const finish=()=>{if(done)return;done=true;cancelAnimationFrame(raf);document.removeEventListener('pointerdown',finish,true);document.removeEventListener('keydown',key);window.__skipStar=null;hint.remove();st.style.display='none';document.body.classList.remove('starflight');resolve();};const key=e=>{if(['Enter',' ','Escape'].includes(e.key))finish();};window.__skipStar=finish;document.addEventListener('pointerdown',finish,true);document.addEventListener('keydown',key);const frame=()=>{if(done)return;const k=Math.min(1,(performance.now()-t0)/900),e=1-Math.pow(1-k,3);st.style.left=(sx+(tx-sx)*e-32)+'px';st.style.top=(sy+(ty-sy)*e-40-Math.sin(k*Math.PI)*100)+'px';st.style.transform=`scale(${1.4-k*.9}) rotate(${k*360}deg)`;if(k<1)raf=requestAnimationFrame(frame);else finish();};frame();});}
 collectStar();await episodeSay('star','第 2 颗星回到了罗盘！');$('#sub').style.display='none';showPanel(`<div class="card ending"><h2>第 2 集完成！</h2><p>第 2 颗星 · 地图点亮：<b>维京船</b></p><p>维京宝物卡 #2 已收进冒险日志。</p><p>下次冒险时，再试着说说“哪个东西、谁的、有几个”。</p><p>${DOWNLOAD}</p><button class="btn big" id="again">再玩一次</button></div>`);panel.querySelector('#again').onclick=()=>location.reload();window.__done=true;}
const JUMP={q1:[q1,'axe','S1'],q2:[q2,'axe','S1'],q3:[q3,'boots','S2'],q4:[q4,'lunch','S3'],q5:[q5,'star','S4'],q6:[q6,'star','S4'],map:[mapCard,'star','S4'],card:[spellCard,'star','S4']};
const jump=JUMP[Q.get('jump')];if(jump){homeOn(false);$('#start').style.display='none';const [f,img,sec]=jump;lastSection=SEC[sec];document.body.classList.add('hasreview');showImg(img);f().then(()=>{if(Q.get('jump')==='card')ending();else window.__activityDone=true;});}else $('#start').style.display='flex';$('#go').onclick=()=>{ac();story();};window.__go=()=>$('#go').click();
