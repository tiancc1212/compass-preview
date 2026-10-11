// Real-click walkthrough: every navigation/primary button must be inside the viewport and hit-testable
// (elementFromPoint) and is pressed with a real mouse click. Only answering exercise steps uses window.__auto.
// usage: node realclick.mjs [baseURL] [ep...]   (default http://localhost:8741, all epNN with episode.js)
import puppeteer from 'puppeteer-core';import fs from 'node:fs';import path from 'node:path';
const ROOT=path.resolve(import.meta.dirname,'../..');
const args=process.argv.slice(2);const base=(args[0]&&/^https?:/.test(args[0]))?args.shift():'http://localhost:8741';
const eps=args.length?args:fs.readdirSync(ROOT).filter(d=>/^ep\d\d$/.test(d)&&fs.existsSync(path.join(ROOT,d,'episode.js'))).sort();
const VPS=process.env.VPS?process.env.VPS.split(',').map(v=>v.split('x').map(Number)):[[360,740],[390,844],[667,375],[844,390],[1024,768],[1280,800],[1440,900]];
const SEL=['#go','#panel .nextwrap button','#panel #ok','#panel #carve:not([disabled])','#panel #again'];
const w=ms=>new Promise(r=>setTimeout(r,ms));
const b=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
let bad=0;
async function run(ep,vp){try{await run1(ep,vp);}catch(e){bad++;console.log(`✘ ${ep} ${vp.join('x')} 测试异常: ${e.message.split('\n')[0]}`);}}
async function run1(ep,[W,H]){const p=await b.newPage();const touch=W<900;await p.setViewport({width:W,height:H,isMobile:touch,hasTouch:touch});
 const errs=[],fails=[],clicked={};p.on('pageerror',e=>errs.push(e.message));
 await p.goto(`${base}/${ep}/?mute=1`);await p.waitForFunction(()=>window.__ready,{timeout:180000});await p.evaluate(()=>localStorage.clear());
 const t0=Date.now();let done=false,lastTag='',same=0;
 while(Date.now()-t0<300000){
  const r=await p.evaluate((SEL)=>{const vis=e=>{if(!e)return false;const s=getComputedStyle(e);const rc=e.getBoundingClientRect();return s.visibility!=='hidden'&&s.display!=='none'&&rc.width>0&&rc.height>0&&e.offsetParent!==null;};
   const reading=window.__reading?.();let el=null,name='';
   if(reading){el=document.querySelector('#lnext');name='#lnext';}
   else for(const s of SEL){const e=[...document.querySelectorAll(s)].find(vis);if(e){el=e;name=s;break;}}
   if(!el&&!reading&&!document.querySelector('#panel #carve[disabled]')){const t=[...document.querySelectorAll('#panel .treasure:not([disabled]),#panel .adj button')].find(vis);if(t){el=t;name='选卡'}}
   if(!el||!vis(el))return {name:name||null,reading,sig:JSON.stringify(window.__state?.()),act:document.querySelector('#panel [data-activity]')?.dataset.activity};
   el.setAttribute('data-rc','1');const rc=el.getBoundingClientRect();const cx=rc.left+rc.width/2,cy=rc.top+rc.height/2;
   const inVp=rc.top>=0&&rc.left>=0&&rc.bottom<=innerHeight+0.5&&rc.right<=innerWidth+0.5;const hit=document.elementFromPoint(cx,cy);const ok=!!hit&&(hit===el||el.contains(hit));
   return {name,reading,cx,cy,inVp,ok,txt:el.textContent.trim().slice(0,12),act:document.querySelector('#panel [data-activity]')?.dataset.activity,rect:[rc.top|0,rc.bottom|0,innerHeight],sig:JSON.stringify(window.__state?.())+document.querySelector('#panel')?.innerText.length};},SEL);
  const tag=(r.act||'')+'|'+r.name+'|'+(r.txt||'')+r.sig;same=tag===lastTag?same+1:0;lastTag=tag;
  if(r.name==='#panel #again'){if(!(r.inVp&&r.ok))fails.push(`${r.name} “${r.txt}” 不可点 ${JSON.stringify(r.rect)}`);done=true;break;}
  if(r.cx!==undefined){
   if(!(r.inVp&&r.ok)){const k=(r.act||'')+r.name;if(!clicked[k])fails.push(`[${r.act||'story'}] ${r.name} “${r.txt}” ${r.inVp?'被遮挡':'在视口外'} ${JSON.stringify(r.rect)}`);clicked[k]=1;
    await p.evaluate(()=>{const e=document.querySelector('[data-rc]');e.removeAttribute('data-rc');e.scrollIntoView({block:'center'});e.click();});}
   else{await p.evaluate(()=>document.querySelector('[data-rc]')?.removeAttribute('data-rc'));await p.mouse.click(r.cx,r.cy);}
  }else if(!r.reading){await p.evaluate(()=>{window.__skipStar?.();if(window.__auto)window.__auto();});}
  if(same>120){fails.push('卡住：'+tag.slice(0,160));break;}
  await w(r.reading?250:450);}
 if(!done)fails.push('没走到结尾');
 await p.screenshot({path:`/tmp/rc_${ep}_${W}x${H}.png`});await p.close();
 const okk=!fails.length&&!errs.length;if(!okk)bad++;
 console.log(`${okk?'✔':'✘'} ${ep} ${W}x${H}  ${((Date.now()-t0)/1000)|0}s`+(fails.length?'\n   '+fails.join('\n   '):'')+(errs.length?'\n   JS错误: '+errs.slice(0,3).join(' | '):''));}
for(const ep of eps){const q=[...VPS];await Promise.all([0].map(async()=>{while(q.length)await run(ep,q.shift());}));}
await b.close();console.log(bad?`${bad} 个组合失败`:'全部通过');process.exit(bad?1:0);
