// HQ real-click regression. One browser, one isolated context/page at a time.
// Fixtures touch only the new incognito context; no installed/user Chrome profile is opened.
// Usage: node tools/tests/hq_realclick.mjs [baseURL] [result.json]
// Options: --output result.json; OUTPUT=result.json|directory; CHROME=/path/to/chrome;
// VPS=390x844,1440x900 (omit for the complete seven-viewport run); HEADLESS=0.
// Every activation uses mouse.click after elementFromPoint. The native speed
// select then uses the standard form select API (desktop macOS popup menus do not
// accept CDP arrow keys). No hidden product action/auto-completion is invoked.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import HQ from '../../hq/hq.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const args = process.argv.slice(2);
const base = (args[0]?.match(/^https?:/u) ? args.shift() : 'http://localhost:8741').replace(/\/*$/u, '/');
let output = process.env.OUTPUT;
while (args.length) {
  const arg = args.shift();
  if (arg === '--output') output = args.shift();
  else if (!arg.startsWith('--') && !output) output = arg;
  else throw new Error(`未知参数: ${arg}`);
}
const stamp = new Date().toISOString().replace(/[:.]/gu, '-');
const outputFile = path.resolve(output?.endsWith('.json') ? output : path.join(output || path.join(ROOT, 'tools/tests/results'), `hq-realclick-${stamp}.json`));
const outputDir = path.dirname(outputFile);
const imageDir = path.join(outputDir, `${path.basename(outputFile, '.json')}-screenshots`);
fs.mkdirSync(imageDir, {recursive: true});
const VPS = process.env.VPS ? process.env.VPS.split(',').map(value => value.split('x').map(Number)) : [[360,740],[390,844],[667,375],[844,390],[1024,768],[1280,800],[1440,900]];
if (VPS.some(vp => vp.length !== 2 || vp.some(n => !Number.isInteger(n) || n < 200))) throw new Error('VPS 应为 390x844,1440x900 形式');
const PUBLISHED = [1,2,3,4,7,8,11,12,15,16,17];
const UNPUBLISHED = [5,6,9,10,13,14];
const BASE_CHARACTERS = ['leo','mia','sam','lily','biscuit','grandpa'];
const CHARACTERS_16 = [...BASE_CHARACTERS,'viking_captain','owl','dragon','dad','dinosaur_family','cheetah','elephant','mermaid_mayor','museum_guard','clockwork_mouse','grumble'];
const BADGES_16 = ['S','V','L','O','C','N','A','THE','ZERO','OWNER','COUNT','TD','DO','ING','ED','ADJ','ADV'];
// Explicit acceptance fixtures, independent of the engine's unlock predicates.
const FIXTURES = [
  {name:'zero',stars:[],characters:BASE_CHARACTERS,journal:[],badges:[],finale:false,story:false},
  {name:'one',stars:[1],characters:BASE_CHARACTERS,journal:[1],badges:['S','V','L','O','C','ADV'],finale:false,story:false},
  {name:'sixteen',stars:Array.from({length:16},(_,i)=>i+1),characters:CHARACTERS_16,journal:PUBLISHED.slice(0,-1),badges:BADGES_16,finale:true,story:false},
  {name:'seventeen',stars:Array.from({length:17},(_,i)=>i+1),characters:[...CHARACTERS_16,'mum'],journal:PUBLISHED,badges:[...BADGES_16,'REL','INV'],finale:true,story:true},
];
const report = {base,startedAt:new Date().toISOString(),status:'running',viewports:VPS,storageIsolation:'new browser context per viewport; only isolated fixtures are written',scope:{allViewportFixtures:FIXTURES.map(f=>f.name),allViewportManualProloguePages:5,allViewportManualPrologueLines:10,allViewportBadgeDetails:19,allViewportBadgeFirstSourceClicks:19,fullPrologueAudioViewport:VPS.find(v=>v[0]===390)?.join('x')||VPS[0].join('x'),eventTests:'synthetic storage and pageshow(persisted=true) handler checks; not a native multi-tab or bfcache certification'},runs:[],supplemental:[],screenshots:[]};
const save = () => fs.writeFileSync(outputFile, JSON.stringify(report,null,2)+'\n');
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
const same = (a,b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const normalize = text => String(text||'').replace(/\s+/gu,' ').trim();
const url = relative => new URL(relative,base).href;
const fullAudioVP = report.scope.fullPrologueAudioViewport;
save();

class Walkthrough {
  constructor(page,run) { this.p=page; this.run=run; this.current='setup'; this.fixtureNo=0; }
  check(ok,label,details) {
    this.run.assertions++;
    if (!ok) this.run.failures.push({case:this.current,label,...(details===undefined?{}:{details})});
  }
  async state() { return this.p.evaluate(()=>window.__hqState?.()); }
  async test(name,fn) {
    this.current=name; const began=Date.now(); const before=this.run.failures.length;
    try { await fn(); }
    catch(error) {
      this.run.failures.push({case:name,label:error.message,stack:error.stack?.split('\n').slice(0,10).join('\n')});
      await this.screenshot(`failure-${name.replace(/[^a-z0-9_-]/giu,'-')}`,true).catch(()=>{});
    }
    this.run.cases.push({name,ok:this.run.failures.length===before,durationMs:Date.now()-began});
    save();
  }
  async readyHQ() {
    await this.p.waitForFunction(()=>!!window.__hqState && !!document.querySelector('#hq-main h1'),{timeout:90000});
    await this.p.evaluate(()=>document.fonts.ready);
    await wait(70);
    this.check((await this.state()).metadataFailures.length===0,'11 个已发布集元数据成功加载');
  }
  async loadFixture(fixture,section='map') {
    await this.p.evaluate(stars=>{
      localStorage.setItem('cc_stars',JSON.stringify(stars));
      localStorage.setItem('cc_prologue_seen','true');
      localStorage.setItem('cc_hq_rate','1');
      localStorage.setItem('cc_hq_muted','false');
      sessionStorage.removeItem('cc:hq:return');
      scrollTo(0,0);
    },fixture.stars);
    // A changed search parameter forces a new document; a hash-only goto would
    // leave audio preference variables and an interrupted dialog in memory.
    await this.p.goto(url(`hq/?hq-test=${++this.fixtureNo}#${section}`),{waitUntil:'domcontentloaded'});
    await this.readyHQ();
    const state=await this.state();
    this.check(same(state.stars,fixture.stars)&&state.rate===1&&!state.muted&&!state.prologue,'隔离 fixture 已重建页面状态',{stars:state.stars,rate:state.rate,muted:state.muted});
  }
  async target(selector,{scroll=true,allowDisabled=false}={}) {
    await this.p.waitForSelector(selector,{timeout:12000});
    if (scroll) await this.p.evaluate(sel=>{
      const el=[...document.querySelectorAll(sel)].find(e=>e.getClientRects().length);
      el?.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
      // Document scroll-padding can place a tall landscape list card below the
      // viewport even after centering. Ordinary lists may scroll; primary
      // prologue controls never enter this branch (scroll:false).
      if(el) {
        const rect=el.getBoundingClientRect();
        if(rect.height<=innerHeight&&rect.bottom>innerHeight) el.scrollIntoView({block:'end',inline:'nearest',behavior:'instant'});
        else if(rect.top<0) el.scrollIntoView({block:'start',inline:'nearest',behavior:'instant'});
      }
    },selector);
    await wait(35);
    const hit = await this.p.evaluate(sel=>{
      const el=[...document.querySelectorAll(sel)].find(e=>e.getClientRects().length);
      if(!el) return {error:'未显示'};
      const r=el.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;
      const top=document.elementFromPoint(x,y),style=getComputedStyle(el);
      return {x,y,inViewport:r.left>=-0.5&&r.top>=-0.5&&r.right<=innerWidth+0.5&&r.bottom<=innerHeight+0.5,hit:!!top&&(top===el||el.contains(top)),disabled:!!el.disabled,visible:style.visibility!=='hidden'&&style.display!=='none',rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},viewport:[innerWidth,innerHeight],text:el.textContent.trim().slice(0,45),blocker:top?.outerHTML.slice(0,170)};
    },selector);
    if(hit.error||!hit.inViewport||!hit.hit||!hit.visible||(!allowDisabled&&hit.disabled)) throw new Error(`按钮不可真实点击 ${selector}: ${JSON.stringify(hit)}`);
    return hit;
  }
  async click(selector,options) {
    const hit=await this.target(selector,options);
    await this.p.mouse.click(hit.x,hit.y);
    this.run.clicks++;
    await wait(45);
  }
  async navigate(selector,options) {
    const hit=await this.target(selector,options);
    await Promise.all([this.p.waitForNavigation({waitUntil:'domcontentloaded',timeout:90000}),this.p.mouse.click(hit.x,hit.y)]);
    this.run.clicks++;
  }
  async section(name) {
    if((await this.state())?.section!==name) {
      await this.click(`[data-section="${name}"]`);
      await this.p.waitForFunction(value=>window.__hqState?.().section===value,{},name);
    }
    await wait(70);
    await this.layout(name);
  }
  async close() {
    if(await this.p.$('#hq-dialog[open]')) {
      await this.click('[data-action="close-dialog"]');
      await this.p.waitForFunction(()=>!document.querySelector('#hq-dialog')?.open);
    }
  }
  async layout(label) {
    const dimensions=await this.p.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,dialog:document.querySelector('#hq-dialog[open]')?{width:document.querySelector('#hq-dialog').clientWidth,scroll:document.querySelector('#hq-dialog').scrollWidth}:null}));
    this.check(dimensions.document<=dimensions.width+1&&dimensions.body<=dimensions.width+1,`${label}: 无页面横向溢出`,dimensions);
    if(dimensions.dialog) this.check(dimensions.dialog.scroll<=dimensions.dialog.width+1,`${label}: 弹窗无横向溢出`,dimensions.dialog);
  }
  async screenshot(name,force=false) {
    if(!force&&![390,1440].includes(this.run.viewport[0])) return;
    const file=path.join(imageDir,`${this.run.viewport.join('x')}-${name}.png`);
    await this.p.screenshot({path:file});
    report.screenshots.push({viewport:this.run.viewport,name,path:file});
  }
  async expectImage(selector) {
    await this.p.waitForFunction(sel=>{const image=document.querySelector(sel);return image?.complete;},{timeout:20000},selector);
    this.check(await this.p.$eval(selector,image=>image.naturalWidth>0),`${selector}: 实际图片已解码`);
  }
  async prologueControls() {
    const controls=['[data-action="skip-prologue"]','[data-action="prologue-play"]','[data-action="replay-line"]','#prologue-rate','[data-action="mute"]','#prologue-auto','[data-action="previous-page"]','[data-action="next-page"], [data-action="finish-prologue"]'];
    for(const selector of controls) await this.target(selector,{scroll:false,allowDisabled:true});
    this.check(await this.p.$eval('#hq-dialog',el=>el.scrollTop===0),'序章主控不需要滚动整个弹窗');
    await this.layout('prologue');
  }
  async rate(value) {
    await this.click('#prologue-rate',{scroll:false});
    // Standard native form selection is explicitly recorded, not called a
    // native-popup click. It emits the real form change/input events and never
    // reaches into application actions or assigns internal state.
    await this.p.select('#prologue-rate',String(value));
    await this.p.waitForFunction(rate=>window.__hqState?.().rate===rate,{},value);
    (this.run.formSelections ||= []).push({selector:'#prologue-rate',value,method:'real mouse hit-test and click, then Puppeteer standard form select API'});
    this.check(await this.p.evaluate(rate=>localStorage.getItem('cc_hq_rate')===String(rate),value),`语速 ${value} 已持久化`);
  }
  async pausePrologue() {
    if((await this.state()).prologue?.playing) await this.click('[data-action="prologue-play"]',{scroll:false});
    await this.p.waitForFunction(()=>!window.__hqState().prologue?.playing);
  }
  async openPrologue() {
    await this.section('map');
    await this.click('.map-note [data-action="prologue"]');
    await this.p.waitForFunction(()=>window.__hqState()?.prologue?.page===0);
  }
  async returnHQ(section,scrollY) {
    // Episode home intentionally hides HUD controls and supplies its own HQ CTA.
    // Pick the currently visible product entry; both still require viewport hit tests.
    await this.navigate('#hud .hud-hq, #start .start-actions a[href*="/hq/"]',{scroll:false});
    await this.readyHQ();
    this.check((await this.state()).section===section,`跨集返回原栏目 ${section}`);
    await wait(160);
    const actualY=await this.p.evaluate(()=>scrollY);
    this.check(Math.abs(actualY-scrollY)<=10,`跨集返回原滚动位置 ${section}`,{expected:scrollY,actual:actualY});
  }
  async enterEpisode(selector,{ep,section,jump=false}) {
    await this.target(selector);
    const scrollY=await this.p.evaluate(()=>scrollY);
    await this.navigate(selector,{scroll:false});
    await this.p.waitForFunction(()=>window.__ready,{timeout:90000});
    this.check(new URL(this.p.url()).pathname.endsWith(`/ep${String(ep).padStart(2,'0')}/`),`进入第 ${ep} 集`,this.p.url());
    const state=await this.p.evaluate(()=>window.__state());
    this.check(!state.locked,`第 ${ep} 集允许进入`,state);
    if(jump) {
      await this.p.waitForSelector('#panel [data-activity="map"]',{visible:true,timeout:10000});
      this.check(new URL(this.p.url()).searchParams.get('jump')==='map'&&state.activity==='map',`首次来源直达第 ${ep} 集知识地图`,state);
    }
    await this.returnHQ(section,scrollY);
  }
}

async function initialPrologue(w) {
  const {p}=w;
  await p.goto(url('hq/'),{waitUntil:'domcontentloaded'});
  await w.readyHQ();
  await p.waitForFunction(()=>window.__hqState()?.prologue!==null,{timeout:15000});
  w.check(!(await w.state()).prologue.playing,'首次序章等待用户手势才发声');
  await w.prologueControls();
  await w.expectImage('.scene-image img');
  await w.screenshot('prologue-first');
  await w.click('[data-action="skip-prologue"]',{scroll:false});
  w.check((await w.state()).prologueSeen&&!(await w.state()).prologue,'首次序章立即跳过并标为已看');
  await p.reload({waitUntil:'domcontentloaded'}); await w.readyHQ(); await wait(350);
  w.check(!(await w.state()).prologue,'刷新后不重复弹出序章');
}

async function manualPrologue(w) {
  const {p}=w;
  await w.loadFixture(FIXTURES[0]);
  await w.openPrologue();
  if((await w.state()).prologue.auto) await w.click('#prologue-auto',{scroll:false});
  w.check(!(await w.state()).prologue.auto,'手动模式可关闭自动翻页');
  const lineIds=[];
  for(let page=0;page<5;page++) {
    w.check((await w.state()).prologue.page===page,`序章手动到达画面 ${page+1}`);
    await w.prologueControls();
    const panel=HQ.prologue.panels[page];
    const actual=await p.$$eval('[data-prologue-line]',els=>els.map(el=>({en:el.querySelector('.english').textContent,zh:el.querySelector('.translation').textContent})));
    const expected=panel.lineIds.map(id=>HQ.prologue.lines.find(line=>line.id===id));
    w.check(actual.length===expected.length&&actual.every((line,index)=>normalize(line.en)===normalize(expected[index].en)&&line.zh===expected[index].zh),`第 ${page+1} 画面中英文原句完整`,actual);
    await w.expectImage('.scene-image img');
    for(let index=0;index<expected.length;index++) {
      await w.click(`[data-prologue-line="${index}"]`);
      await p.waitForFunction(i=>window.__hqState().prologue?.line===i&&window.__hqState().prologue?.playing,{},index);
      lineIds.push(expected[index].id);
      await w.pausePrologue();
    }
    if(page===4) await w.screenshot('prologue-last');
    else await w.click('[data-action="next-page"]',{scroll:false});
  }
  w.check(new Set(lineIds).size===10,'五画面十句均通过真实点击逐句访问',lineIds);
  for(let page=3;page>=0;page--) {
    await w.click('[data-action="previous-page"]',{scroll:false});
    w.check((await w.state()).prologue.page===page,`上一页回到画面 ${page+1}`);
    await w.prologueControls();
  }
  await w.rate(0.8); await w.rate(1.2); await w.rate(1);
  await w.click('[data-action="mute"]',{scroll:false});
  w.check((await w.state()).muted&&await p.evaluate(()=>localStorage.getItem('cc_hq_muted')==='true'),'静音状态已持久化');
  await w.click('[data-action="mute"]',{scroll:false});
  w.check(!(await w.state()).muted,'再次点击恢复声音');
  await w.click('[data-action="prologue-play"]',{scroll:false});
  await p.waitForFunction(()=>window.__hqState()?.playingWord,{timeout:10000});
  await w.pausePrologue();
  const paused=await w.state(); await wait(300);
  w.check((await w.state()).prologue.line===paused.prologue.line&&!((await w.state()).prologue.playing),'暂停后保持当前句');
  await w.click('[data-action="prologue-play"]',{scroll:false});
  await p.waitForFunction(()=>window.__hqState().prologue.playing);
  await w.pausePrologue();
  await w.click('[data-action="replay-line"]',{scroll:false});
  await p.waitForFunction(()=>window.__hqState().prologue.playing);
  await w.pausePrologue();
  await w.click('[data-action="skip-prologue"]',{scroll:false});
  await p.reload({waitUntil:'domcontentloaded'}); await w.readyHQ();
  w.check((await w.state()).rate===1&&!(await w.state()).muted,'刷新保留语速与声音偏好');
}

async function fullPrologue(w) {
  await w.loadFixture(FIXTURES[0]);
  await w.openPrologue();
  if(!(await w.state()).prologue.auto) await w.click('#prologue-auto',{scroll:false});
  await w.rate(1);
  if((await w.state()).muted) await w.click('[data-action="mute"]',{scroll:false});
  const start=Date.now(),seen=new Set(),words=new Set();
  await w.click('[data-action="prologue-play"]',{scroll:false});
  let done=false;
  while(Date.now()-start<70000) {
    const state=await w.state(),p=state.prologue;
    if(!p) break;
    seen.add(`${p.page}:${p.line}`);
    if(state.playingWord) words.add(state.playingWord);
    if(p.done&&p.page===4&&!p.playing) { done=true; break; }
    await wait(120);
  }
  const elapsed=(Date.now()-start)/1000;
  w.run.prologueAudio={elapsedSeconds:elapsed,approvedSpeechSeconds:21.525,visitedLines:[...seen],highlightedWords:words.size,done};
  w.check(done&&seen.size===10&&words.size>10,'真实音频自动完成五画面十句并逐词高亮',{elapsedSeconds:elapsed,approvedSpeechSeconds:21.525,seen:[...seen],highlightedWords:words.size});
  w.check(elapsed>=20,'完整序章未使用快进或虚拟时钟',{elapsedSeconds:elapsed});
  await w.prologueControls();
  await w.click('[data-action="finish-prologue"]',{scroll:false});
  w.check(!(await w.state()).prologue&&(await w.state()).prologueSeen,'播放完毕按钮返回地图且保留已看');
}

async function mapFixture(w,f) {
  await w.loadFixture(f);
  const actual=await w.p.evaluate(()=>({stars:window.__hqState().stars,nodes:document.querySelectorAll('[data-map-node]').length,lit:[...document.querySelectorAll('[data-map-node].is-lit')].map(el=>Number(el.dataset.mapNode)),slots:[...document.querySelectorAll('#hq-compass .compass-slot.is-lit')].map(el=>Number(el.dataset.slot)),enabled:[...document.querySelectorAll('a[data-map-node]')].map(el=>Number(el.dataset.mapNode)),next:document.querySelector('.recommendation [data-episode]')?.dataset.episode||null,stationCount:document.querySelectorAll('.station').length,header:document.querySelector('#hq-stars').textContent}));
  w.check(actual.nodes===17&&actual.stationCount===17,'地图 17 个地点与列表 17 站完整',actual);
  w.check(same(actual.stars,f.stars)&&same(actual.lit,f.stars)&&same(actual.slots,f.stars),'页面地图、罗盘与存储星数一致',actual);
  w.check(same(actual.enabled,f.finale?PUBLISHED:PUBLISHED.slice(0,-1)),'已发布入口及第 17 集门槛正确',actual.enabled);
  const expectedNext={zero:'1',one:'2',sixteen:'17',seventeen:null}[f.name];
  w.check(actual.next===expectedNext,'下一站推荐符合已完成和可进入状态',{expected:expectedNext,actual:actual.next});
  for(const ep of UNPUBLISHED) {
    w.check(await w.p.$eval(`[data-unavailable="${ep}"]`,el=>!el.matches('a')&&!el.querySelector('a[href]')),`未发布第 ${ep} 集没有链接`);
  }
  if(!f.finale) {
    const before=w.p.url();
    await w.click('[data-map-node="17"]',{allowDisabled:true});
    w.check(w.p.url()===before,'未齐前 16 星，点击第 17 站留在总部');
  }
  await w.layout(`${f.name}-map`); await w.p.evaluate(()=>scrollTo(0,0)); await wait(50); await w.screenshot(`map-${f.name}`);
  if(f.name==='sixteen') await w.enterEpisode('.station[data-episode="17"]',{ep:17,section:'map'});
}

async function charactersFixture(w,f) {
  await w.section('characters');
  const actual=await w.p.$$eval('.character-card',els=>({count:els.length,enabled:els.filter(el=>!el.disabled).map(el=>el.dataset.character),locked:els.filter(el=>el.disabled).map(el=>({id:el.dataset.character,silhouette:!!el.querySelector('.silhouette'),image:!!el.querySelector('img'),hint:el.textContent}))}));
  w.check(actual.count===25&&same(actual.enabled,f.characters),'25 人物的解锁清单正确',actual);
  w.check(actual.locked.every(c=>c.silhouette&&!c.image&&/完成第\s*\d+\s*集解锁/u.test(c.hint)),'锁定人物为剪影且写明解锁集号');
  if(actual.locked.length) {
    await w.click(`[data-character="${actual.locked[0].id}"]`,{allowDisabled:true});
    w.check(!await w.p.$('#hq-dialog[open]'),'锁定人物点击不打开详情');
  }
  // All available characters are opened once per viewport; Grandpa is rechecked per state.
  const toOpen=f.name==='seventeen'?f.characters:['grandpa'];
  for(const id of toOpen) {
    const character=HQ.characters.find(c=>c.id===id);
    await w.click(`[data-character="${id}"]`);
    await w.p.waitForSelector('#hq-dialog[open] .character-detail');
    const text=await w.p.$eval('#hq-dialog',el=>el.textContent);
    const quote=id==='grandpa'&&f.story?character.finaleQuote:character.quote;
    w.check(normalize(text).includes(normalize(quote.en))&&text.includes(quote.zh)&&text.includes(character.identity)&&text.includes(character.personality),`${id} 详情、身份、性格及当前代表句正确`);
    await w.expectImage('.detail-portrait img'); await w.layout(`character-${id}`);
    if(id==='mia') {
      await w.click('[data-action="play-quote"]');
      await w.p.waitForFunction(()=>document.querySelector('[data-action="play-quote"]')?.dataset.playing==='true'&&!!document.querySelector('[data-quote-text] .word.on'),{timeout:10000});
      await w.screenshot('mia-playing');
      await w.click('[data-action="play-quote"]');
      w.check(await w.p.$eval('[data-action="play-quote"]',el=>el.dataset.playing==='paused'),'Mia 真实发声、逐词高亮后可暂停');
      await w.click('[data-action="play-quote"]');
      await w.p.waitForFunction(()=>document.querySelector('[data-action="play-quote"]')?.dataset.playing==='false',{timeout:10000});
      w.check((await w.p.$eval('#hq-status',el=>el.textContent))==='','Mia 继续播放至结尾，无音频失败提示');
    }
    await w.close();
  }
  await w.p.evaluate(()=>scrollTo(0,0)); await w.screenshot(`characters-${f.name}`);
}

async function journalFixture(w,f) {
  await w.section('journal');
  const entries=await w.p.$$eval('[data-journal]',els=>els.map(el=>({ep:Number(el.dataset.journal),locked:el.classList.contains('is-locked'),text:el.textContent,href:el.querySelector('a')?.href||null})));
  w.check(entries.length===17&&same(entries.filter(e=>!e.locked).map(e=>e.ep),f.journal),'17 页日志按完成及发布状态开启');
  for(const entry of entries) {
    const expected=HQ.journal.entries.find(e=>e.ep===entry.ep);
    if(entry.locked) w.check(!entry.href&&!normalize(entry.text).includes(normalize(expected.en)),`第 ${entry.ep} 页封存且未泄露正文`);
    else w.check(entry.text.includes(expected.title)&&normalize(entry.text).includes(normalize(expected.en))&&entry.text.includes(expected.zh)&&!!entry.href,`第 ${entry.ep} 页日志标题、中英文和重访入口完整`);
  }
  w.check(!!await w.p.$('[data-action="full-story"]')===f.story,'完整故事仅在 17 星齐全时出现');
  if(f.story) {
    await w.enterEpisode('[data-journal="16"] [data-episode="16"]',{ep:16,section:'journal'});
    await w.click('[data-action="full-story"]');
    const text=await w.p.$eval('.full-story',el=>el.textContent);
    w.check(HQ.journal.fullStory.paragraphs.every(par=>normalize(text).includes(normalize(par.en))&&text.includes(par.zh)),'完整故事全部段落可读');
    await w.layout('full-story'); await w.screenshot('full-story');
    await w.click('[data-action="story-map"]');
    await w.p.waitForFunction(()=>window.__hqState().section==='map'&&!document.querySelector('#hq-dialog').open);
    w.check(true,'完整故事主按钮返回冒险地图'); await w.section('journal');
  }
  await w.p.evaluate(()=>scrollTo(0,0)); await w.screenshot(`journal-${f.name}`);
}

async function badgesFixture(w,f) {
  await w.section('badges');
  const actual=await w.p.$$eval('[data-badge]',els=>({count:els.length,enabled:els.filter(el=>!el.disabled).map(el=>el.dataset.badge)}));
  w.check(actual.count===19&&same(actual.enabled,f.badges),'19 徽章的解锁清单正确',actual);
  if(!f.badges.length) {
    await w.click('[data-badge="S"]',{allowDisabled:true});
    w.check(!await w.p.$('#hq-dialog[open]'),'未解锁徽章点击不打开详情');
  }
  if(f.name!=='seventeen') return;
  for(const badge of HQ.badges) {
    await w.click(`[data-badge="${badge.id}"]`);
    const text=await w.p.$eval('#hq-dialog',el=>el.textContent);
    w.check(text.includes(badge.name)&&text.includes(badge.meaning)&&normalize(text).includes(normalize(badge.example.en))&&text.includes(badge.example.zh),`${badge.id} 徽章名称、含义、中英文例句正确`);
    const links=await w.p.$$eval('.badge-detail a[data-episode]',els=>els.map(el=>({ep:Number(el.dataset.episode),href:el.href})));
    w.check(links.length===2&&links[0].ep===badge.firstPublished.ep&&links[1].ep===badge.learnAt.ep&&links.every(link=>new URL(link.href).searchParams.get('jump')==='map'&&new URL(link.href).searchParams.get('hq')==='badges'),`${badge.id} 首次来源及学习集链接指向知识地图`,links);
    await w.layout(`badge-${badge.id}`);
    if(badge.id==='S') await w.screenshot('badge-S');
    await w.enterEpisode('.badge-detail .source-note a',{ep:badge.firstPublished.ep,section:'badges',jump:true});
  }
}

async function downloadsFixture(w,f) {
  await w.section('downloads');
  const downloads=await w.p.$$eval('[data-download]',els=>els.map(el=>({ep:Number(el.dataset.download),href:el.href,name:el.download})));
  w.check(same(downloads.map(d=>d.ep),f.journal),'Word 清单仅包含真实已发布且已完成集',downloads.map(d=>d.ep));
  if(f.name!=='seventeen') return;
  for(const download of downloads) {
    // Keep distinct human download gestures apart; Chromium throttles bursts of
    // downloads even when every anchor is activated by a mouse event.
    await wait(350);
    const source=HQ.downloads.find(d=>d.ep===download.ep);
    w.check(download.name===source.downloadName&&new URL(download.href).pathname.endsWith(new URL(source.href,url('hq/')).pathname),`第 ${download.ep} 集 Word 文件名和地址正确`);
    // Exercise the actual download anchor, then independently verify HTTP and ZIP signature.
    await w.click(`[data-download="${download.ep}"]`);
    const localFile=path.join(w.downloadDir,download.name);
    const downloadDeadline=Date.now()+30000;
    while(Date.now()<downloadDeadline&&(!fs.existsSync(localFile)||fs.existsSync(localFile+'.crdownload'))) await wait(100);
    const localData=fs.existsSync(localFile)?fs.readFileSync(localFile):null;
    w.check(!!localData&&localData.length>1000&&localData[0]===80&&localData[1]===75,`第 ${download.ep} 集浏览器下载已完整落盘`,{path:localFile,bytes:localData?.length||0});
    const response=await w.p.evaluate(async href=>{
      const result=await fetch(href); const data=new Uint8Array(await result.arrayBuffer());
      return {status:result.status,ok:result.ok,bytes:data.length,zip:data[0]===80&&data[1]===75,type:result.headers.get('content-type')};
    },download.href);
    (w.run.downloads ||= []).push({ep:download.ep,url:download.href,path:localFile,downloadedBytes:localData?.length||0,...response});
    w.check(response.ok&&response.bytes>1000&&response.zip,`第 ${download.ep} 集 Word 真实点击及 HTTP 下载成功`,response);
    w.check(localData?.length===response.bytes,`第 ${download.ep} 集实际下载大小与源响应相同`);
  }
  await w.enterEpisode('.download-item a[data-episode="16"]',{ep:16,section:'downloads',jump:true});
  await w.p.evaluate(()=>scrollTo(0,0)); await w.screenshot('downloads-all');
}

async function episodeGate(w) {
  for(const jump of ['', '&jump=map']) {
    await w.p.evaluate(()=>localStorage.setItem('cc_stars','[]'));
    await w.p.goto(url(`ep17/?mute=1${jump}`),{waitUntil:'domcontentloaded'});
    await w.p.waitForFunction(()=>window.__ready,{timeout:90000});
    const state=await w.p.evaluate(()=>({state:window.__state(),disabled:document.querySelector('#go').disabled,visible:!document.querySelector('#entry-lock').hidden,map:!!document.querySelector('#panel [data-activity="map"]')}));
    w.check(state.state.locked&&state.disabled&&state.visible&&!state.map,`第 17 集直达${jump?'知识地图':''}拒绝缺星入口`,state);
    await w.click('#go',{allowDisabled:true,scroll:false});
    w.check((await w.p.evaluate(()=>window.__state())).locked,'真实点击锁定出发按钮仍不能进入');
  }
}

async function supplemental(w) {
  const {p}=w;
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await w.loadFixture(FIXTURES[2]);
  const reduced=await p.evaluate(()=>({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,animation:getComputedStyle(document.querySelector('#hq-compass')).animationName,transition:getComputedStyle(document.querySelector('#hq-compass')).transitionDuration}));
  w.check(reduced.matches&&reduced.animation==='none'&&reduced.transition==='0s','真实媒体仿真: HQ 尊重 reduced-motion',reduced);
  await p.goto(url('ep17/?mute=1'),{waitUntil:'domcontentloaded'}); await p.waitForFunction(()=>window.__ready,{timeout:90000});
  w.check(await p.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches&&document.body.classList.contains('rm')),'共享引擎从真实媒体查询启用 reduced-motion（未传 rm/fast）');
  await w.click('#go',{scroll:false}); await p.waitForFunction(()=>window.__state().reading,{timeout:10000});
  for(const event of ['storage','pageshow']) {
    if(event==='pageshow') {
      await p.evaluate(()=>localStorage.setItem('cc_stars',JSON.stringify(Array.from({length:16},(_,i)=>i+1))));
      await p.reload({waitUntil:'domcontentloaded'}); await p.waitForFunction(()=>window.__ready,{timeout:90000});
      await w.click('#go',{scroll:false}); await p.waitForFunction(()=>window.__state().reading);
    }
    await p.evaluate(event=>{
      const oldValue=localStorage.getItem('cc_stars'),newValue=JSON.stringify(Array.from({length:15},(_,i)=>i+1));
      localStorage.setItem('cc_stars',newValue);
      if(event==='storage') dispatchEvent(new StorageEvent('storage',{key:'cc_stars',oldValue,newValue,storageArea:localStorage,url:location.href}));
      else dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));
    },event);
    await p.waitForFunction(()=>window.__state().locked);
    const gate=await p.evaluate(()=>({state:window.__state(),disabled:document.querySelector('#go').disabled,visible:!document.querySelector('#entry-lock').hidden,empty:document.querySelector('#panel').innerHTML==='',text:document.querySelector('#entry-lock').textContent}));
    w.check(gate.state.locked&&!gate.state.reading&&gate.disabled&&gate.visible&&gate.empty&&gate.text.includes('1 颗星'),`${event} 处理器在运行中丢失前 16 星后锁住第 17 集`,gate);
  }
  await Promise.all([
    p.waitForNavigation({waitUntil:'domcontentloaded',timeout:90000}),
    p.evaluate(()=>{
      const oldValue=localStorage.getItem('cc_stars'),newValue=JSON.stringify(Array.from({length:16},(_,i)=>i+1));
      localStorage.setItem('cc_stars',newValue);
      dispatchEvent(new StorageEvent('storage',{key:'cc_stars',oldValue,newValue,storageArea:localStorage,url:location.href}));
    }),
  ]);
  await p.waitForFunction(()=>window.__ready,{timeout:90000});
  w.check(!(await p.evaluate(()=>window.__state())).locked,'storage 处理器在补齐前 16 星后刷新并解锁');
  await w.loadFixture(FIXTURES[0]);
  await w.openPrologue();
  await p.evaluate(()=>{
    localStorage.setItem('cc_stars','[1]');
    dispatchEvent(new StorageEvent('storage',{key:'cc_stars',oldValue:'[]',newValue:'[1]',storageArea:localStorage,url:location.href}));
  });
  w.check(same((await w.state()).stars,[1])&&!await p.$('#hq-dialog[open]'),'HQ storage 处理器重读星数并关闭旧弹窗');
  await p.evaluate(()=>{
    localStorage.setItem('cc_stars','[1,2]');
    dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));
  });
  w.check(same((await w.state()).stars,[1,2]),'HQ pageshow persisted 处理器重读星数');
}

const browser=await puppeteer.launch({executablePath:process.env.CHROME||(process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':'/usr/bin/google-chrome'),headless:process.env.HEADLESS!=='0',args:['--no-sandbox']});
try {
  for(const page of await browser.pages()) await page.close();
  async function contextRun(viewport,isSupplemental=false) {
    const context=await browser.createBrowserContext();
    const run={viewport,assertions:0,clicks:0,failures:[],jsErrors:[],httpErrors:[],requestFailures:[],cases:[],startedAt:new Date().toISOString()};
    (isSupplemental?report.supplemental:report.runs).push(run); save();
    const page=await context.newPage();
    await page.setViewport({width:viewport[0],height:viewport[1],isMobile:viewport[0]<900,hasTouch:viewport[0]<900});
    page.setDefaultTimeout(15000);
    page.on('pageerror',error=>run.jsErrors.push({url:page.url(),message:error.message}));
    page.on('response',response=>{if(response.status()>=400)run.httpErrors.push({status:response.status(),url:response.url()});});
    page.on('requestfailed',request=>{const error=request.failure()?.errorText||'';if(!error.includes('ERR_ABORTED'))run.requestFailures.push({url:request.url(),error});});
    await page.evaluateOnNewDocument(()=>{
      if(!sessionStorage.getItem('hq-test-seeded')) {
        localStorage.clear(); sessionStorage.clear();
        localStorage.setItem('cc_stars','[]');
        sessionStorage.setItem('hq-test-seeded','true');
      }
    });
    const downloadDir=path.join(outputDir,`${path.basename(outputFile,'.json')}-downloads-${stamp}`,`${viewport.join('x')}${isSupplemental?'-events':''}`);
    fs.mkdirSync(downloadDir,{recursive:true});
    const cdp=await page.createCDPSession();
    await cdp.send('Browser.setDownloadBehavior',{behavior:'allow',browserContextId:context.id,downloadPath:downloadDir,eventsEnabled:true});
    const w=new Walkthrough(page,run);
    w.downloadDir=downloadDir;
    try {
      if(isSupplemental) {
        await page.goto(url('hq/'),{waitUntil:'domcontentloaded'}); await w.readyHQ();
        await w.test('reduced-motion-and-event-handlers',()=>supplemental(w));
      } else {
        await w.test('first-visit-skip-persists',()=>initialPrologue(w));
        await w.test('manual-prologue-5-scenes-10-lines-controls',()=>manualPrologue(w));
        if(viewport.join('x')===fullAudioVP) await w.test('full-prologue-real-audio',()=>fullPrologue(w));
        for(const fixture of FIXTURES) {
          await w.test(`${fixture.name}-map`,()=>mapFixture(w,fixture));
          // Each case recovers its own fixture, so one bad dialog/navigation
          // cannot create misleading follow-on failures in unrelated sections.
          await w.test(`${fixture.name}-characters`,async()=>{await w.loadFixture(fixture,'characters');await charactersFixture(w,fixture);});
          await w.test(`${fixture.name}-journal`,async()=>{await w.loadFixture(fixture,'journal');await journalFixture(w,fixture);});
          await w.test(`${fixture.name}-badges`,async()=>{await w.loadFixture(fixture,'badges');await badgesFixture(w,fixture);});
          await w.test(`${fixture.name}-downloads`,async()=>{await w.loadFixture(fixture,'downloads');await downloadsFixture(w,fixture);});
          w.check(await page.evaluate(expected=>localStorage.getItem('cc_stars')===JSON.stringify(expected),fixture.stars),'浏览总部及知识地图没有增删星星');
        }
        await w.test('ep17-direct-and-jump-gates',()=>episodeGate(w));
      }
    } catch(error) {run.failures.push({case:'runner',label:error.message});}
    finally {
      run.finishedAt=new Date().toISOString();
      run.ok=!run.failures.length&&!run.jsErrors.length&&!run.httpErrors.length&&!run.requestFailures.length;
      await context.close();save();
      console.log(`${run.ok?'✔':'✘'} ${isSupplemental?'补充媒体与事件 ':''}${viewport.join('x')} · ${run.assertions} 项断言 · ${run.clicks} 次真实点击 · ${run.failures.length} 个失败 · JS ${run.jsErrors.length} · HTTP ${run.httpErrors.length}`);
      if(!run.ok) for(const failure of run.failures)console.log(`  ${failure.case}: ${failure.label}`);
    }
  }
  // Deliberately sequential: do not Promise.all browser cases.
  for(const viewport of VPS) await contextRun(viewport);
  await contextRun([390,844],true);
} finally {
  await browser.close();
  report.finishedAt=new Date().toISOString();
  report.status=report.runs.length===VPS.length&&report.supplemental.length===1&&[...report.runs,...report.supplemental].every(run=>run.ok)?'passed':'failed';
  report.summary={runs:report.runs.length,supplementalRuns:report.supplemental.length,failedRuns:[...report.runs,...report.supplemental].filter(run=>!run.ok).length,assertions:[...report.runs,...report.supplemental].reduce((n,run)=>n+run.assertions,0),realClicks:[...report.runs,...report.supplemental].reduce((n,run)=>n+run.clicks,0)};
  save();console.log(`结果: ${outputFile}`);
}
process.exitCode=report.status==='passed'?0:1;
