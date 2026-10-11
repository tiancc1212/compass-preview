#!/usr/bin/env node
// 只读检查 HQ、已发布集、媒体和徽章来源；不生成未发布集，也不复制外部原图。
// 用法：node tools/validate_hq.mjs
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const HQ=path.join(ROOT,'hq');
const errors=[],warnings=[];
const err=m=>errors.push(m),warn=m=>warnings.push(m);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const nonempty=v=>typeof v==='string'&&v.trim().length>0;
const readModule=async f=>(await import(pathToFileURL(path.join(ROOT,f)).href)).default;
const exists=f=>fs.existsSync(f)&&fs.statSync(f).isFile();
function localFile(href,where){
  if(!nonempty(href)){err(`${where}: 缺少文件路径`);return;}
  if(/^(?:[a-z]+:|\/)/i.test(href)){err(`${where}: 必须使用仓库内相对路径`);return;}
  const resolved=path.resolve(HQ,href.split(/[?#]/)[0]);
  if(!resolved.startsWith(ROOT+path.sep)){err(`${where}: 路径超出仓库`);return;}
  if(!exists(resolved))err(`${where}: 文件不存在 ${href}`);
}
function walk(value,visit,at='hq'){
  if(!value||typeof value!=='object')return;
  visit(value,at);
  for(const [k,v]of Object.entries(value))if(v&&typeof v==='object')walk(v,visit,`${at}.${k}`);
}
function unique(values,where){if(new Set(values).size!==values.length)err(`${where}: 有重复值`);}

let H,ASSETS,ROLES;
try{H=await readModule('hq/hq.js');ASSETS=await readModule('hq/media-assets.js');({ROLES}=await import(pathToFileURL(path.join(ROOT,'engine/badges.js')).href));}
catch(e){console.error('✘ HQ 配置无法加载：'+e.message);process.exit(1);}

for(const k of ['schemaVersion','contentVersion','copy','prologue','characters','map','journal','badges','downloads','assetPolicy','audioSpec'])if(H[k]==null)err(`缺少顶层字段 ${k}`);
if(H.schemaVersion!==1)err('schemaVersion 必须是 1');
for(const k of ['brand','navigation','buttons','map','characters','journal','badges','downloads','states','accessibility'])if(!H.copy?.[k])err(`copy 缺少 ${k}`);
const shell=exists(path.join(HQ,'index.html'))?fs.readFileSync(path.join(HQ,'index.html'),'utf8'):'';
if(!/data-v=["']\d+["']/.test(shell)||!shell.includes('../engine/hq.js'))err('hq/index.html 必须有 data-v 并加载 ../engine/hq.js');
if(/three\.module|three\/addons|type=["']importmap["']/.test(shell))err('HQ 不得加载 three.js importmap');
if(!exists(path.join(ROOT,'engine/hq.js')))err('缺少 engine/hq.js');

const mapItems=Array.isArray(H.map?.items)?H.map.items:[];
const episodeNumbers=Array.from({length:17},(_,i)=>i+1);
if(!same(mapItems.map(x=>x.ep),episodeNumbers))err('map.items 必须按集号覆盖 1–17，不能重复或漏集');
const published=fs.readdirSync(ROOT).filter(d=>/^ep\d\d$/.test(d)&&exists(path.join(ROOT,d,'episode.js'))).sort();
const EP=new Map();
for(const name of published){try{const ep=await readModule(`${name}/episode.js`);EP.set(ep.no,ep);}catch(e){err(`${name} 无法加载：${e.message}`);}}
for(const item of mapItems){
  const id=`ep${String(item.ep).padStart(2,'0')}`,ep=EP.get(item.ep),released=item.status==='published-source';
  if(item.id!==id)err(`map 第 ${item.ep} 集 id 应为 ${id}`);
  for(const k of ['title','place'])if(!nonempty(item[k]))err(`${id} 地图缺少 ${k}`);
  if(!Array.isArray(item.grammar)||!item.grammar.length||item.grammar.some(x=>!nonempty(x)))err(`${id} 地图 grammar 必须为非空标签数组`);
  if(!nonempty(item.icon?.id))err(`${id} 缺少 icon.id`);
  if(released!==!!ep)err(`${id} 发布状态与真实 episode.js 不一致`);
  if(!released){if(item.clickable!==false||item.href!==null)err(`${id} 未发布集必须不可点且 href 为 null`);continue;}
  if(item.href!==`../${id}/`)err(`${id} 地图 href 不正确`);
  if(!exists(path.join(ROOT,id,'index.html')))err(`${id} 已发布但没有外壳`);
  if(item.ep!==17&&item.clickable!==true)err(`${id} 已发布集应允许自由进入`);
  const expected={title:item.title,place:item.place,grammar:item.grammar,icon:item.icon?.id};
  for(const [k,v]of Object.entries(expected))if(!same(ep.meta?.[k],v))err(`${id} meta.${k} 与审定地图不一致`);
}
if(H.map?.forceOrder!==false)err('前 16 集不得强制按顺序解锁');
const first16=episodeNumbers.slice(0,16),finale=mapItems.find(x=>x.ep===17);
for(const [name,gate]of [['map.finaleGate',H.map?.finaleGate],['ep17.entryGate',finale?.entryGate]]){
  if(gate?.type!=='all-stars'||!same(gate.requiredStars,first16)||gate.defaultBlocked!==true)err(`${name} 必须要求前 16 星且默认拦截`);
  if(gate?.hrefWhenAllowed!=='../ep17/')err(`${name} 解锁入口错误`);
}
if(!same(H.map?.deepLinkPolicy?.requiredStars,first16))err('第 17 集深链接门槛必须与地图一致');

const panels=H.prologue?.panels||[],lines=H.prologue?.lines||[],chars=H.characters||[];
if(panels.length<4||panels.length>6)err('序章必须有 4–6 个画面');
unique(panels.map(p=>p.id),'序章画面');unique(lines.map(l=>l.id),'序章台词');unique(chars.map(c=>c.id),'人物 id');
if(H.prologue?.skippable!==true||H.prologue?.skipMarksSeen!==true)err('序章必须可跳过且跳过记为已看');
for(const line of lines){
  if(!nonempty(line.en)||!nonempty(line.zh)||!panels.some(p=>p.id===line.panel))err(`序章 ${line.id}: 中英文或所属画面不完整`);
  if(!panels.find(p=>p.id===line.panel)?.lineIds?.includes(line.id))err(`序章 ${line.id}: 画面 lineIds 未引用这句`);
}
for(const panel of panels)for(const id of panel.lineIds||[])if(!lines.some(l=>l.id===id&&l.panel===panel.id))err(`画面 ${panel.id} 引用了错误台词 ${id}`);
for(const c of chars){
  for(const k of ['name','personality','grammarConnection'])if(!nonempty(c[k]))err(`人物 ${c.id} 缺少 ${k}`);
  if(!c.image?.privateAssetKey||!c.image?.alt)err(`人物 ${c.id} 缺少图片映射或 alt`);
  if(c.unlock?.type!=='always'&&!Number.isInteger(c.unlock?.ep))err(`人物 ${c.id} 缺少解锁集号`);
  if(c.unlock?.type!=='always'&&!EP.has(c.unlock.ep)&&c.unlock.runtimeEligible!==false)err(`人物 ${c.id} 不能由未发布集解锁`);
}

const imageKeys=[];
walk(H,(o,at)=>{
  if(o.privateAssetKey){
    imageKeys.push(o.privateAssetKey);
    const mapped=ASSETS[o.privateAssetKey];
    if(!nonempty(mapped))err(`${at}: 缺少素材映射 ${o.privateAssetKey}`);
    else{
      if(!/^illus\/[a-z0-9_]+\.webp$/.test(mapped))err(`${at}: 发布图须为 illus/ 下的 WebP`);
      localFile(mapped,`${at}.privateAssetKey`);
    }
    if(!nonempty(o.alt))err(`${at}: 图片缺少 alt`);
  }
});
unique(imageKeys,'序章及人物图像 key');
if(imageKeys.length!==30||Object.keys(ASSETS).length!==30)err('序章和人物映射应覆盖已审定的 30 张图');
for(const key of Object.keys(ASSETS))if(!imageKeys.includes(key))err(`素材映射 ${key} 未被配置引用`);
// privateAssetKey 保留历史来源标识；Cici 已授权这批审定成图与其它素材一并发布。
// 不要求源 PNG、人物参考图或外部制作目录进入仓库。

let audio={};try{audio=JSON.parse(fs.readFileSync(path.join(HQ,H.audioSpec.manifest),'utf8'));}catch(e){err('音频 manifest 无法读取：'+e.message);}
const audioRefs=[];
walk(H,(o,at)=>{if(o.audio?.audioFile)audioRefs.push({audio:o.audio,text:o.en,at});});
const ids=audioRefs.map(x=>x.audio.id),files=exists(path.join(HQ,'audio/lines.json'))?fs.readdirSync(path.join(HQ,'audio')).filter(f=>f.endsWith('.mp3')):[];
unique(ids,'音频引用 id');
if(ids.length!==36||Object.keys(audio).length!==36||files.length!==36)err(`HQ 音频需 36 条，当前引用 ${ids.length}、manifest ${Object.keys(audio).length}、mp3 ${files.length}`);
for(const {audio:a,text,at}of audioRefs){
  const line=audio[a.id];
  if(a.audioFile!==`${a.id}.mp3`||a.href!==`audio/${a.id}.mp3`)err(`${at}: 音频 id、文件名或 href 不一致`);
  localFile(a.href,`${at}.audio`);
  if(!line){err(`${at}: 音频 ${a.id} 不在 manifest`);continue;}
  if(line.text!==text)err(`${at}: 审定台词与 manifest 文本不一致`);
  if(line.audioFile!==a.audioFile)err(`${at}: manifest 文件名不一致`);
  if(!(line.dur>0)||!Array.isArray(line.words)||!line.words.length){err(`${at}: 缺少有效时长和逐词时间轴`);continue;}
  let prev=-1;for(const word of line.words){if(!nonempty(word[0])||!Number.isFinite(word[1])||word[1]<prev||word[1]>line.dur+0.05)err(`${a.id}: 逐词开始时间无效`);if(word[2]!=null&&(!Number.isFinite(word[2])||word[2]<word[1]||word[2]>line.dur+0.05))err(`${a.id}: 逐词结束时间无效`);prev=word[1];}
}
for(const id of Object.keys(audio))if(!ids.includes(id))err(`音频 ${id} 未被 HQ 引用`);

const roleEpisodes=new Map(Object.keys(ROLES).map(k=>[k,[]]));
for(const [no,ep]of EP){
  const found=new Set();
  function scan(o){if(typeof o==='string'){for(const m of o.matchAll(/\{\{b:([A-Z]+)(?::\d+)?\}\}/g))found.add(m[1]);return;}if(!o||typeof o!=='object')return;for(const[k,v]of Object.entries(o)){if(['b','badge'].includes(k)&&typeof v==='string'&&ROLES[v])found.add(v);scan(v);}}
  scan(ep);
  const hints=path.join(ROOT,`ep${String(no).padStart(2,'0')}/audio/hints.json`);
  if(exists(hints))try{scan(JSON.parse(fs.readFileSync(hints,'utf8')));}catch(e){err(`第 ${no} 集 hints.json 读不了`);}
  for(const role of found)if(roleEpisodes.has(role))roleEpisodes.get(role).push(no);else err(`第 ${no} 集引用未知徽章 ${role}`);
}
const badges=H.badges||[],roleIds=Object.keys(ROLES).sort();
if(!same(badges.map(b=>b.id).sort(),roleIds))err('徽章图鉴必须与 engine/badges.js 的全部 ROLES 一一对应');
const badgeGroups=H.badgeGroups||[];
if(!badgeGroups.length)err('徽章图鉴缺少分组');
unique(badgeGroups.map(g=>g.id),'徽章分组 ID');
for(const group of badgeGroups){
  if(!/^[a-z][a-z-]*$/.test(group.id)||!nonempty(group.name)||!Array.isArray(group.badgeIds)||!group.badgeIds.length)err('徽章分组需要有效 ID、名称和非空徽章列表');
}
if(!same(badgeGroups.flatMap(g=>g.badgeIds||[]).sort(),roleIds))err('徽章分组必须完整覆盖全部 ROLES，且每枚只出现一次');
const badgeCSSPath=path.join(ROOT,'engine/badges.css');
const badgeCSS=exists(badgeCSSPath)?fs.readFileSync(badgeCSSPath,'utf8'):'';
const badgeTokens=new Set([...badgeCSS.matchAll(/(--[\w-]+)\s*:/g)].map(m=>m[1]));
for(const token of new Set(['--brass','--brass-hi','--brass-dark','--brass-sym',...Object.values(ROLES).flatMap(r=>[`--role-${r.token}`,`--role-${r.token}-hi`])])){
  if(!badgeTokens.has(token))err(`共享徽章样式缺少配色 ${token}`);
}
for(const entry of ['engine/hq.js','engine/engine.js']){
  if(!fs.readFileSync(path.join(ROOT,entry),'utf8').includes("EU('./badges.css')"))err(`${entry} 未加载共享徽章样式`);
}
for(const b of badges){
  if(!nonempty(b.name)||!nonempty(b.meaning)||b.image?.role!==b.id)err(`徽章 ${b.id}: 名称、含义或图形来源不完整`);
  const appeared=(roleEpisodes.get(b.id)||[]).sort((a,b)=>a-b);
  if(b.firstPublished?.ep!==appeared[0])err(`徽章 ${b.id}: 首次发布集应为 ${appeared[0]}，现为 ${b.firstPublished?.ep}`);
  if(!same([...(b.unlock?.anyCompletedEpisode||[])].sort((a,b)=>a-b),appeared))err(`徽章 ${b.id}: 解锁集与真实内容出现集不一致`);
  const learn=b.learnAt;if(!EP.has(learn?.ep))err(`徽章 ${b.id}: 学习入口必须属于已发布集`);
  else{const match=learn.href?.match(/^\.\.\/ep(\d\d)\/\?jump=([^&#]+)$/);if(!match||Number(match[1])!==learn.ep||EP.get(learn.ep).activities?.[match[2]]?.type!=='map')err(`徽章 ${b.id}: 学习入口须指向该集知识地图`);}
}

const entries=H.journal?.entries||[];
if(!same(entries.map(e=>e.ep),episodeNumbers))err('冒险日志必须按集号覆盖 1–17');
for(const entry of entries){
  if(!nonempty(entry.en)||!nonempty(entry.zh)||entry.unlock?.requiresCompleted!==true)err(`日志 ${entry.id}: 文本或完成门槛缺失`);
  if(EP.has(entry.ep)){if(entry.href!==`../ep${String(entry.ep).padStart(2,'0')}/`)err(`日志 ${entry.id}: 集入口错误`);if(entry.thumbnail?.href)localFile(entry.thumbnail.href,`日志 ${entry.id} 缩略图`);}
  else if(entry.href!==null||entry.unlock?.runtimeEligible!==false)err(`日志 ${entry.id}: 未发布集不能开放`);
}
if(!same((H.downloads||[]).map(d=>d.ep),episodeNumbers))err('知识文档目录必须按集号覆盖 1–17');
for(const d of H.downloads||[]){
  if(EP.has(d.ep)){localFile(d.href,`第 ${d.ep} 集 Word`);if(d.requiresCompleted!==true)err(`第 ${d.ep} 集 Word 必须完成后解锁`);}
  else if(d.enabled!==false||d.href!==null||d.mapHref!==null)err(`第 ${d.ep} 集未发布，不得提供下载入口`);
}
if(H.review?.mediaDecision?.includes('awaiting'))warn('媒体审阅状态仍为待审；结构通过不代表观感/听感验收通过');
for(const m of warnings)console.log('⚠ '+m);
for(const m of errors)console.error('✘ '+m);
console.log(`${errors.length?'未通过':'通过'}：${mapItems.length} 站，${published.length} 个真实已发布集，${badges.length} 枚徽章，${files.length} 条音频，${imageKeys.length} 张图像映射；${errors.length} 个错误，${warnings.length} 个提醒。`);
process.exit(errors.length?1:0);
