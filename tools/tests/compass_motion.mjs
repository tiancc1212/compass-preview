// Focused v5 reward checks. Four isolated contexts, one page at a time; only real UI clicks/keys.
// Usage: node tools/tests/compass_motion.mjs [baseURL] [result.json]
// No fast/rm query flags and no __auto/__skipStar calls. Reduced motion uses the browser media preference.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || 'http://127.0.0.1:8756').replace(/\/$/, '') + '/';
const output = process.argv[3] || '/tmp/compass-motion-v5.json';
const seed = [1, 1, '2', 17, 'historic'];
const cases = ['natural', 'mouse-skip', 'escape-skip', 'reduced-motion'];
const report = {base, startedAt: new Date().toISOString(), viewport: [1024,768], cases: []};
const browser = await puppeteer.launch({
 executablePath: process.env.CHROME || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome'),
 args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
function assert(ok, text) {if (!ok) throw new Error(text);}
async function realClick(page, selector) {
 await page.waitForSelector(selector, {visible:true});
 const box = await page.$eval(selector, element => {
  const r=element.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2, hit=document.elementFromPoint(x,y);
  return {x,y,visible:r.left>=0&&r.top>=0&&r.right<=innerWidth+.5&&r.bottom<=innerHeight+.5,hit:hit===element||element.contains(hit),disabled:element.disabled};
 });
 assert(box.visible&&box.hit&&!box.disabled, `不可点击 ${selector}: ${JSON.stringify(box)}`);
 await page.mouse.click(box.x,box.y);
}
try {
 for (const kind of cases) {
  const context=await browser.createBrowserContext();
  const result={kind, errors:[], forbiddenRequests:[], failedResponses:[], failedRequests:[], audioRequests:[]};
  report.cases.push(result);
  try {
   const page=await context.newPage();
   await page.setViewport({width:1024,height:768});
   await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:kind==='reduced-motion'?'reduce':'no-preference'}]);
   page.on('pageerror',e=>result.errors.push(e.message));
   page.on('request',r=>{
    const url=r.url();
    if (/(?:three(?:\.module)?(?:\.min)?\.js|GLTFLoader|OrbitControls|\.gl(?:b|tf)(?:\?|$))/i.test(url)) result.forbiddenRequests.push(url);
    if (/\/audio\/.*\.mp3(?:\?|$)/.test(url)) result.audioRequests.push(url);
   });
   page.on('requestfailed',r=>result.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
   page.on('response',r=>{if(r.status()>=400)result.failedResponses.push({url:r.url(),status:r.status()});});
   await page.evaluateOnNewDocument(value=>localStorage.setItem('cc_stars',JSON.stringify(value)),seed);
   await page.goto(new URL('ep16/?jump=card&mute=1',base).href,{waitUntil:'networkidle0'});
   await page.waitForFunction(()=>window.__ready&&document.querySelector('#carve'));
   result.before=await page.evaluate(()=>JSON.parse(localStorage.getItem('cc_stars')));
   // Start from the requested quiet URL, then use the visible sound control so the card plays its actual audio.
   await realClick(page,'#mute');
   assert(await page.evaluate(()=>window.__state().muted===false),'打开声音失败');
   await page.evaluate(()=>{
    const probe=window.__motionProbe={flightStart:null,flightEnd:null,glowStart:null,glowEnd:null,flightPositions:[],glowDurations:[],rm:matchMedia('(prefers-reduced-motion: reduce)').matches};
    let flying=false,glowing=false;
    const sample=()=>{
     const now=performance.now(),fly=document.querySelector('#flystar'),slot=document.querySelector('#ending-compass [data-slot="16"]');
     const currentFlying=!!fly&&getComputedStyle(fly).display!=='none';
     const currentGlowing=!!slot&&slot.classList.contains('just-lit');
     if(currentFlying&&!flying)probe.flightStart=now;
     if(!currentFlying&&flying)probe.flightEnd=now;
     if(currentGlowing&&!glowing){probe.glowStart=now;probe.glowDurations.push(getComputedStyle(slot,'::before').animationDuration);}
     if(!currentGlowing&&glowing)probe.glowEnd=now;
     if(currentFlying){const pos=[fly.style.left,fly.style.top];if(JSON.stringify(pos)!==JSON.stringify(probe.flightPositions.at(-1)))probe.flightPositions.push(pos);}
     flying=currentFlying;glowing=currentGlowing;
    };
    const observer=new MutationObserver(sample);observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
    window.__stopMotionProbe=()=>{sample();observer.disconnect();};sample();
   });
   const cardStart=Date.now();
   await realClick(page,'#carve');
   await page.waitForFunction(()=>document.querySelector('#carve')?.textContent==='把星星送回罗盘'&&!document.querySelector('#carve').disabled,{timeout:15000});
   result.cardAudioElapsedMs=Date.now()-cardStart;
   assert(result.cardAudioElapsedMs>=1300,'收藏卡未等待原配音正常结束');
   await realClick(page,'#carve');
   if(kind==='mouse-skip'||kind==='escape-skip') {
    await page.waitForFunction(()=>window.__motionProbe.flightPositions.length>=3,{polling:'raf',timeout:5000});
    result.skipRequestedAt=await page.evaluate(()=>performance.now());
    if(kind==='mouse-skip')await realClick(page,'.star-skip');
    else await page.keyboard.press('Escape');
   }
   await page.waitForFunction(()=>window.__done&&document.querySelector('#again'),{timeout:15000});
   await page.waitForFunction(()=>!document.querySelector('#ending-compass .just-lit'),{timeout:5000});
   result.probe=await page.evaluate(()=>{window.__stopMotionProbe();return window.__motionProbe;});
   result.after=await page.evaluate(()=>JSON.parse(localStorage.getItem('cc_stars')));
   result.state=await page.evaluate(()=>window.__state());
   result.flightMs=result.probe.flightStart===null?0:result.probe.flightEnd-result.probe.flightStart;
   result.glowMs=result.probe.glowStart===null?0:result.probe.glowEnd-result.probe.glowStart;
   if(kind==='reduced-motion') {
    assert(result.probe.rm,'没有启用真实媒体偏好');
    assert(result.probe.flightStart===null&&result.probe.glowStart===null,'减少动态效果下仍有飞行或呼吸');
   } else {
    assert(result.probe.flightStart!==null&&result.probe.flightEnd!==null,'未观察到完整飞星');
    assert(result.probe.flightPositions.length>=3,'飞星坐标未发生实际变化');
    assert(result.flightMs<=1800,'飞星超过 1.8 秒');
    assert(result.probe.glowDurations.includes('0.6s'),'呼吸动画不是 600 毫秒');
    assert(result.glowMs>=550&&result.glowMs<=900,'呼吸实测时长偏离 600 毫秒');
    if(kind==='natural')assert(result.flightMs>=1100,'自然飞行意外提前结束');
    else assert(result.probe.flightEnd-result.skipRequestedAt<350,'真实跳过操作未及时结束飞行');
   }
   assert(JSON.stringify(result.before)===JSON.stringify(seed),'已有星记录在进入页面时被改写');
   assert(JSON.stringify(result.after)===JSON.stringify([...seed,16]),'重复项或字符串历史记录被改写，或新星未保存');
   assert(result.state.starsLit===1&&result.state.completed.includes(16),'显示状态没有点亮第 16 星');
   assert(result.audioRequests.some(url=>/card_football\.mp3/.test(url)),'没有请求原收藏卡配音');
   assert(result.audioRequests.some(url=>/star\.mp3/.test(url)),'没有请求原结尾配音');
   assert(!result.errors.length&&!result.forbiddenRequests.length&&!result.failedResponses.length&&!result.failedRequests.length,'存在脚本、3D 依赖或资源错误');
   result.pass=true;
  } catch(error) {result.pass=false;result.failure=error.stack||error.message;}
  finally {await context.close();}
  console.log(`${result.pass?'PASS':'FAIL'} ${kind}: flight=${result.flightMs??'?'}ms glow=${result.glowMs??'?'}ms${result.failure?' '+result.failure.split('\n')[0]:''}`);
 }
 // One further serial context refreshes the published v5 measurement under the original Fast 4G conditions.
 const context=await browser.createBrowserContext();
 const fast4g=report.fast4g={errors:[],failedResponses:[],failedRequests:[],forbiddenRequests:[],network:{latencyMs:170,downloadMbps:1.6,uploadKbps:750},viewport:[1440,900]};
 try {
  const page=await context.newPage();await page.setViewport({width:1440,height:900,deviceScaleFactor:1});
  page.on('pageerror',e=>fast4g.errors.push(e.message));
  page.on('requestfailed',r=>fast4g.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)fast4g.failedResponses.push({url:r.url(),status:r.status()});});
  page.on('request',r=>{if(/(?:three(?:\.module)?(?:\.min)?\.js|GLTFLoader|OrbitControls|\.gl(?:b|tf)(?:\?|$))/i.test(r.url()))fast4g.forbiddenRequests.push(r.url());});
  const cdp=await page.createCDPSession();await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:170,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8,connectionType:'cellular4g'});
  const started=Date.now();await page.goto(new URL('ep01/?mute=1',base).href);
  await page.waitForFunction(()=>window.__ready,{timeout:120000});fast4g.readyMs=Date.now()-started;
  fast4g.imageDecode=await page.evaluate(async()=>{await document.fonts.ready;return Promise.all([...document.images].map(async image=>{try{await image.decode();return {url:image.currentSrc||image.src,pass:true};}catch(error){return {url:image.currentSrc||image.src,pass:false,error:String(error)};}}));});
  fast4g.visualReadyMs=Date.now()-started;
  fast4g.resource=await page.evaluate(()=>performance.getEntriesByType('resource').map(entry=>({url:entry.name,bytes:entry.encodedBodySize,transfer:entry.transferSize,duration:entry.duration})));
  fast4g.encodedBodyBytes=fast4g.resource.reduce((total,resource)=>total+resource.bytes,0);
  fast4g.transferBytes=fast4g.resource.reduce((total,resource)=>total+resource.transfer,0);
  assert(fast4g.imageDecode.every(image=>image.pass),'Fast 4G 图片解码失败');
  assert(!fast4g.errors.length&&!fast4g.failedResponses.length&&!fast4g.failedRequests.length&&!fast4g.forbiddenRequests.length,'Fast 4G 存在脚本、资源或 3D 依赖错误');
  fast4g.pass=true;
 } catch(error) {fast4g.pass=false;fast4g.failure=error.stack||error.message;}
 finally {await context.close();}
 console.log(`${fast4g.pass?'PASS':'FAIL'} Fast 4G: ready=${fast4g.readyMs??'?'}ms visual=${fast4g.visualReadyMs??'?'}ms encoded=${fast4g.encodedBodyBytes??'?'}B transfer=${fast4g.transferBytes??'?'}B`);
} finally {
 await browser.close();
 report.finishedAt=new Date().toISOString();report.pass=report.cases.length===4&&report.cases.every(row=>row.pass)&&report.fast4g?.pass===true;
 fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
}
console.log(`Report: ${output}`);
process.exitCode=report.pass?0:1;
