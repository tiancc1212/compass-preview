// Real-media acceptance: no request replacement, synthetic ended, or injected timing.
import puppeteer from '../../tools/tests/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import fs from 'node:fs';
import path from 'node:path';
const base = process.argv[2] || 'http://localhost:8716/ep02/';
const out = process.argv[3] || '/tmp/ep02_acceptance';
fs.mkdirSync(out, {recursive:true});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const checks=[];
const ok=(value,name)=>{if(!value)throw new Error(name);checks.push(name);console.log('PASS '+name);};
const b=await puppeteer.launch({executablePath:process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
async function open(vp,query='') {
 const p=await b.newPage();await p.setViewport(vp);
 const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>errors.push(r.url()+' '+r.failure()?.errorText));p.on('response',r=>{if(r.status()>=400&&!r.url().includes('favicon'))errors.push(r.status()+' '+r.url());});
 await p.evaluateOnNewDocument(()=>{
   localStorage.setItem('cc_rate','1');localStorage.setItem('cc_stars','[16]');
   window.audios=[];window.voiceCalls=[];window.voiceEvents=[];window.earlyHighlight=[];
   const play=Audio.prototype.play;
   Audio.prototype.play=function(){
    audios.push(this);voiceCalls.push(this.src);
    for(const ev of ['playing','ended','pause','error'])this.addEventListener(ev,()=>{voiceEvents.push({ev,src:this.src,t:this.currentTime,wall:performance.now()});if(ev==='playing'&&document.querySelector('#line .on'))earlyHighlight.push(this.src);});
    return play.call(this);
   };
 });
 await p.goto(base+(query?'?'+query:''),{waitUntil:'networkidle0'});await p.waitForFunction(()=>window.__ready,{timeout:15000});
 return {p,errors};
}
const phone={width:390,height:844,isMobile:true,hasTouch:true},desktop={width:1280,height:800};
const goods={q1:['an','a','a'],q2:['Mia needs a helmet.','The helmet is small.',"Bring me the helmet in Biscuit's mouth."],q3:["captain's","sailors'","children's"],q4:[null,'knives','pieces'],q5:['不填','不填','不填','the'],q6:['yes','no']};
async function wrong(p,s) {
 if(await p.$('.tin')){await p.$eval('.tin',e=>e.value='wrong');await p.click('.tform button');}
 else if(s.activity==='q2')await p.evaluate(good=>[...document.querySelectorAll('.popt')].find(e=>e.textContent!==good).click(),goods.q2[+s.step-1]);
 else if(s.activity==='q4')await p.evaluate(()=>window.__try('bread','count'));
 else if(s.activity==='q5'){await p.click('.dchunk[data-value="a"]');await p.click('[data-target]');}
 else if(s.activity==='q6')await p.click(`.tf[data-value="${goods.q6[+s.step-1]==='yes'?'no':'yes'}"]`);
}
async function full(name,vp){
 const {p,errors}=await open(vp,'fast=1&rm=1');await p.click('#go');
 const seen=new Set(),story=new Set();let loops=0;
 while(!await p.evaluate(()=>window.__done)&&loops++<70){
  const s=await p.evaluate(()=>window.__state());
  if(s.reading){
   story.add(s.line);ok(await p.$eval('#panel',e=>getComputedStyle(e).display==='none'),name+' '+s.line+' story no card');
   await p.waitForFunction(id=>voiceEvents.some(e=>e.ev==='ended'&&e.src.endsWith('/'+id+'.mp3')),{timeout:10000},s.line);
   const hl=await p.evaluate(id=>__hl.filter(v=>v[0]===id),s.line);
   ok(hl.length>0&&hl.every((v,i)=>i===0||v[1]>=hl[i-1][1]),name+' '+s.line+' clock highlight monotonic');
   if(['l01','l09','l13'].includes(s.line))await p.screenshot({path:path.join(out,name+'_'+s.line+'.png')});
   if(name==='phone'&&s.line==='l01'){
    const cd=await p.createCDPSession();
    for(const [type,x] of [['touchStart',310],['touchMove',210],['touchMove',100],['touchEnd',100]])await cd.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y:320,id:1}]});
   }else if(name==='desktop')await p.keyboard.press('ArrowRight');else await p.click('#lnext');
  }else if(s.activity){
   const key=s.activity+':'+s.step;seen.add(key);const before=await p.evaluate(()=>voiceCalls.length);
   await wrong(p,s);const first=await p.$eval('.tip',e=>e.textContent);
   ok(first.includes('再想想')&&!/答案是|选这句|正确句|请放进|请选择|选择“/.test(first),name+' '+key+' first wrong cue');
   await wrong(p,s);const second=await p.$eval('.tip',e=>e.textContent);
   ok(/答案是|选这句|请放进|请选择|选择“/.test(second),name+' '+key+' second wrong answer');
   ok(await p.evaluate(()=>voiceCalls.length)===before,name+' '+key+' no voice before correct');
   if(['q2','q4'].includes(s.activity)&&s.step==='1')await p.screenshot({path:path.join(out,name+'_'+s.activity+'.png')});
   await p.evaluate(()=>window.__solve());
   await p.waitForFunction(n=>voiceCalls.length===n+1,{timeout:10000},before);
   await p.waitForFunction(k=>{const s=__state();return s.activity+':'+s.step!==k},{timeout:10000},key);
  }else if(await p.$('.kmap')){
   ok(await p.$$eval('[data-map]',es=>es.length)===6,name+' map 6 nodes');
   ok(await p.$eval('.kmap a[download]',e=>e.href.endsWith('/downloads/ep02_nouns_articles.docx')),name+' map Word link');
   await p.screenshot({path:path.join(out,name+'_map.png')});await p.click('#ok');
  }else if(await p.$('.treasure-card')){
   const before=await p.evaluate(()=>voiceCalls.length);await p.click('[data-value="sock"]');await p.click('[data-value="helmet"]');
   ok(await p.evaluate(()=>voiceCalls.length)===before,name+' card choice silent');await p.screenshot({path:path.join(out,name+'_card.png')});await p.click('#carve');
   await p.waitForFunction(()=>!document.querySelector('#carve').disabled,{timeout:10000});await p.click('#carve');
   await p.waitForFunction(()=>window.__done,{timeout:10000});
  }else await wait(100);
 }
 ok(story.size===15&&seen.size===18&&await p.evaluate(()=>__done),name+' real full episode 15 lines 18 steps');
 ok(await p.evaluate(()=>JSON.parse(localStorage.getItem('cc_stars')).includes(2)&&JSON.parse(localStorage.getItem('cc_stars')).includes(16)),name+' completion stores star preserves old star');
 ok(await p.$eval('.ending a[download]',e=>e.href.endsWith('/downloads/ep02_nouns_articles.docx')),name+' ending Word link');
 ok(errors.length===0,name+' resource and console errors zero: '+errors.join(','));
 ok(await p.evaluate(()=>earlyHighlight.length)===0,name+' highlighting starts after native playing');
 await p.screenshot({path:path.join(out,name+'_ending.png')});await p.close();
 return {name,story:[...story],steps:[...seen],errors};
}
try {
 const flows=await Promise.all([full('phone',phone),full('desktop',desktop)]);
 const {p,errors}=await open(phone,'jump=q1&rm=1');
 ok(await p.evaluate(()=>voiceCalls.length)===0,'activity jump has no voice');
 const before=await p.$eval('#panel',e=>e.innerHTML);await p.click('#review');await p.waitForFunction(()=>__reading());
 await p.click('#backex');await p.waitForFunction(()=>!__reading());
 ok(await p.$eval('#panel',e=>e.innerHTML)===before,'review restores exact activity progress');
 const attrs=await p.$eval('.tin',e=>[e.getAttribute('autocapitalize'),e.getAttribute('autocorrect'),e.getAttribute('enterkeyhint')]);
 ok(attrs.join('|')==='none|off|done','phone text input keyboard hints');
 await p.type('.tin','an');await p.keyboard.press('Enter');await p.waitForFunction(()=>!document.querySelector('.nextwrap button').disabled);
 await p.click('#replay');await p.click('.nextwrap button');
 ok(await p.evaluate(()=>audios.every(a=>a.paused||a.ended)),'natural reward then replay-next stops speech');await p.close();
 const m=await open(phone,'mute=1&rm=1');await m.p.click('#go');await m.p.click('#lnext');
 ok(await m.p.evaluate(()=>__state().line)==='l02','muted manual paging');await m.p.click('#auto');
 await m.p.waitForFunction(()=>__state().line==='l03',{timeout:6000});ok(true,'muted auto uses real duration');
 await m.p.click('#lnext');ok(await m.p.$eval('#auto',e=>e.getAttribute('aria-pressed'))==='false','manual navigation disables auto');
 await m.p.click('#mute');await m.p.waitForFunction(()=>voiceEvents.some(e=>e.ev==='playing'),{timeout:5000});
 await m.p.click('#rate');ok(await m.p.evaluate(()=>__rate())===1.25,'speed changes to 1.25');
 await m.p.click('#rate');ok(await m.p.evaluate(()=>__rate())===.75,'speed changes to .75');
 ok(m.errors.length===0,'reader control errors zero');await m.p.close();
 const res=await open(desktop,'jump=map&rm=1');
 const resources=await res.p.evaluate(async()=>{const meta=await(await fetch('audio/lines.json')).json();const images=['01_arrival','02_captains_list','03_heavy_axe','04_wrong_helmet','05_biscuit_reveal','06_sailors_boots','07_lunch_supplies','08_old_chessboard','09_star_discovery','pick_helmet_any','pick_helmet_again','pick_helmet_known','item_shield','item_knife','item_sock','item_bread','item_water','item_wood','item_helmet'];const urls=[...Object.keys(meta).map(id=>'audio/'+id+'.mp3'),...images.map(n=>'illus/'+n+'.jpg'),'downloads/ep02_nouns_articles.docx'];return Promise.all(urls.map(async url=>{const r=await fetch(url);return {url,status:r.status,bytes:(await r.arrayBuffer()).byteLength};}));});
 ok(resources.length===57&&resources.every(x=>x.status===200&&x.bytes>1000),'all 37 MP3 19 JPG and Word HTTP 200');await res.p.close();
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,realMedia:true,flows,resources,checks},null,2));
 console.log('REAL MEDIA ACCEPTANCE COMPLETE '+checks.length+' checks');
}finally{await b.close();}
