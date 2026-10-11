#!/usr/bin/env node
// 检查一集的内容是否齐全、互相对得上（不改任何文件）。
// 用法（在仓库根目录）：node tools/validate_episode.mjs ep16 [ep02 …]
// 退出码：有 ✘ 错误 = 1；只有 ⚠ 提醒 = 0
import fs from 'fs';import path from 'path';import {execFileSync} from 'child_process';import {pathToFileURL} from 'url';
const ROOT=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const {ROLES}=await import(pathToFileURL(path.join(ROOT,'engine/badges.js')).href);
const KINDS={match:['pairs','targets'],pick:['verb','pics','rule'],choice:['ctx','good','others','hint'],typed:['pre','post','ans','why'],fix:['ctx','s','wi','fix','good','why'],order:['q','words','shuffled','why','hint'],rewrite:['q','src','answers','show','why'],tf:['s','ok'],sort:['boxes','items','why'],blank:['ctx','pre','post','ans','hint','why']};
let hasFfprobe=true;try{execFileSync('ffprobe',['-version'],{stdio:'ignore'});}catch(e){hasFfprobe=false;}
let bad=0;
for(const ep of process.argv.slice(2)){
 const D=path.join(ROOT,ep);const E=[],W=[];const err=m=>E.push(m),warn=m=>W.push(m);const ex=f=>fs.existsSync(path.join(D,f));
 console.log(`\n=== ${ep} ===`);
 // stub
 const html=ex('index.html')?fs.readFileSync(path.join(D,'index.html'),'utf8'):'';
 if(!html)err('缺少 index.html');else{if(!/data-v="\d+"/.test(html))err('index.html 的 <html> 缺少 data-v="数字"（内容版本号）');if(!html.includes('../engine/engine.js'))err('index.html 没有加载 ../engine/engine.js（请用标准外壳）');}
 for(const old of ['app.js','base.css','layout.css','badges.js','lib','models'])if(ex(old))warn(`集目录里还有旧引擎文件 ${old}，迁移后应删除（引擎统一在 engine/）`);
 let EP;try{EP=(await import(pathToFileURL(path.join(D,'episode.js')).href+'?t='+Date.now())).default;}catch(e){err('episode.js 无法加载：'+e.message);console.log(E.map(x=>'  ✘ '+x).join('\n'));bad++;continue;}
 for(const k of ['no','hud','start','img','sections','flow','activities','ending'])if(EP[k]==null)err(`episode.js 缺少字段 ${k}`);
 if(!(EP.no>=1&&EP.no<=17))err('no 必须是 1–17 的集数');
 if(EP.css&&!ex('episode.css'))err('css:true 但没有 episode.css');
 // lines
 let L={};try{L=JSON.parse(fs.readFileSync(path.join(D,'audio/lines.json'),'utf8'));}catch(e){err('audio/lines.json 读不了：'+e.message);}
 const dur=f=>{if(!hasFfprobe)return null;try{return +execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',f]).toString();}catch(e){return null;}};
 const mp3=id=>ex(`audio/${id}.mp3`);
 for(const [id,l] of Object.entries(L)){
  if(!mp3(id)){err(`lines.json 有 ${id}，但缺少 audio/${id}.mp3`);continue;}
  if(!Array.isArray(l.words)||!l.words.length){err(`${id}: lines.json 没有 words 时间轴（请运行 tools/align.py）`);continue;}
  let prev=-1;for(const w of l.words){if(typeof w[1]!=='number'||w[1]<prev){err(`${id}: 词的开始时间不是递增的（"${w[0]}"）`);break;}prev=w[1];}
  if(prev>l.dur+0.05)err(`${id}: 最后一个词的时间 ${prev}s 超过时长 ${l.dur}s`);
  const d=dur(path.join(D,`audio/${id}.mp3`));if(d!=null&&Math.abs(d-l.dur)>0.08)err(`${id}: mp3 实际 ${d.toFixed(2)}s，lines.json 记的是 ${l.dur}s —— 音频换过，请重跑 tools/align.py ${ep}`);}
 for(const f of fs.existsSync(path.join(D,'audio'))?fs.readdirSync(path.join(D,'audio')):[])if(f.endsWith('.mp3')&&!L[f.slice(0,-4)])warn(`audio/${f} 不在 lines.json 里（如果只当答对奖励音可以忽略；建议也对齐进 lines.json）`);
 // images
 const usedImg=new Set();const needImg=(k,where)=>{usedImg.add(k);if(!EP.img?.[k])err(`${where} 用了插图 "${k}"，但 img 里没有这个 key`);};
 for(const [k,[src,label]] of Object.entries(EP.img||{})){if(!ex(src))err(`img.${k}: 文件 ${src} 不存在`);if(!label)warn(`img.${k}: 缺少中文说明（无障碍 alt）`);}
 if(EP.firstImg)needImg(EP.firstImg,'firstImg');needImg(EP.ending?.img,'ending.img');
 // sections
 const lineIds=new Set();
 for(const [sk,items] of Object.entries(EP.sections||{}))items.forEach((it,i)=>{const w=`sections.${sk}[${i}]`;lineIds.add(it.id);if(!L[it.id])err(`${w}: 台词 ${it.id} 不在 lines.json`);if(!it.zh)warn(`${w}: 缺少中文 zh`);if(it.img)needImg(it.img,w);else if(i===0)err(`${w}: 每节第一句必须有 img`);});
 // flow
 const flow=EP.flow||[];for(const k of flow)if(!EP.sections?.[k]&&!EP.activities?.[k])err(`flow 里的 "${k}" 既不是 section 也不是 activity`);
 if(flow.length&&!EP.sections?.[flow[0]])err('flow 第一项必须是故事 section');
 for(const k of Object.keys(EP.activities||{}))if(!flow.includes(k))warn(`activity "${k}" 不在 flow 里，孩子看不到`);
 for(const k of Object.keys(EP.sections||{}))if(!flow.includes(k))warn(`section "${k}" 不在 flow 里`);
 if(EP.activities&&!Object.values(EP.activities).some(a=>a.type==='card'))warn('没有收藏卡（type:"card"），结尾星星会从屏幕中央飞出');
 // activities
 const needAu=(id,w,line=false)=>{if(!id)return;if(!mp3(id))err(`${w}: 缺少音频 audio/${id}.mp3`);else if(line&&!L[id])err(`${w}: ${id} 要显示字幕，必须在 lines.json 里`);};
 const tokens=(s,w)=>{for(const m of String(s||'').matchAll(/\{\{b:([A-Z]+)/g))if(!ROLES[m[1]])err(`${w}: 徽章 {{b:${m[1]}}} 不存在（可用：${Object.keys(ROLES).join(' ')}）`);};
 const role=(b,w)=>{if(b&&!ROLES[b])err(`${w}: 徽章 "${b}" 不存在`);};
 const step=(s,w)=>{const req=KINDS[s.kind];if(!req)return err(`${w}: 未知题型 kind="${s.kind}"（可用：${Object.keys(KINDS).join(' ')}）`);for(const f of req)if(s[f]==null)err(`${w} (${s.kind}): 缺少 ${f}`);
  needAu(s.au,w);if(!s.au&&!['match','pick'].includes(s.kind))warn(`${w}: 没有答对奖励音 au`);
  if(s.kind==='match'){s.pairs?.forEach((p,i)=>{needAu(p.au,`${w}.pairs[${i}]`);if(!s.targets?.some(t=>t.k===p.k))err(`${w}.pairs[${i}]: k="${p.k}" 没有对应 target`);});s.targets?.forEach(t=>role(t.b,w));}
  if(s.kind==='pick')s.pics?.forEach((p,i)=>{needAu(p.au,`${w}.pics[${i}]`);if(!ex(`illus/${p.img}.jpg`))err(`${w}.pics[${i}]: 缺少 illus/${p.img}.jpg`);});
  if(s.kind==='choice'&&s.img&&!ex(`illus/${s.img}.jpg`))err(`${w}: 缺少 illus/${s.img}.jpg`);
  if(s.kind==='sort')s.items?.forEach((it,i)=>{if(!s.boxes?.some(b=>b.k===it.box))err(`${w}.items[${i}]: box="${it.box}" 不存在`);if(it.img&&!ex(`illus/${it.img}.jpg`))err(`${w}.items[${i}]: 缺少 illus/${it.img}.jpg`);});
  if(s.kind==='fix'){const n=s.s?.split(' ').length;if(!(s.wi>=0&&s.wi<n))err(`${w}: wi=${s.wi} 超出句子词数 ${n}`);if(!s.fix?.some(f=>f[1]===1))err(`${w}: fix 里没有正确选项 [文字,1]`);}
  if(s.kind==='order'){if([...s.words].sort().join()!==[...s.shuffled].sort().join())err(`${w}: shuffled 和 words 的词不一致`);if(s.words.join()===s.shuffled.join())warn(`${w}: shuffled 没打乱`);}
  if(s.kind==='blank'&&!(s.opts||['a','an','the','不填']).includes(s.ans))err(`${w}: 答案 "${s.ans}" 不在选项里`);
  if(s.kind==='tf'&&!s.ok&&!s.fix)err(`${w}: 错句必须给出 fix（改正后的句子）`);
  for(const r of [...(s.wrong||[])])try{new RegExp(r.re);}catch(e){err(`${w}: wrong 正则写错了 ${r.re}`);}
  if(s.kind==='typed'&&(s.wrong||[]).some(r=>new RegExp(r.re).test(s.ans)&&!r.not))warn(`${w}: 有一条 wrong 规则会匹配正确答案 "${s.ans}"`);};
 const act=(a,w)=>{if(!a.type)return err(`${w}: 缺少 type`);
  if(a.type==='seq')return a.parts.forEach((p,i)=>act(p,`${w}.parts[${i}]`));
  if(a.img)needImg(a.img,w);
  if(a.type==='drag'){for(const f of ['title','desc','slots','chunks','tip'])if(a[f]==null)err(`${w} (drag): 缺少 ${f}`);a.slots?.forEach(s=>role(s.b,w));a.chunks?.forEach((c,i)=>{if(c.k&&!a.slots?.some(s=>s.k===c.k))err(`${w}.chunks[${i}] "${c.t}": k="${c.k}" 没有对应 slot`);});needAu(a.audio,w);}
  else if(a.type==='steps'){if(!a.title)err(`${w}: 缺少 title`);role(a.badge,w);(a.steps||[]).forEach((s,i)=>step(s,`${w}.steps[${i}]`));if(!a.steps?.length)err(`${w}: steps 为空`);}
  else if(a.type==='map'){if(!a.html)err(`${w}: 缺少 html`);tokens(a.html,w);for(const m of a.html.matchAll(/href="([^"]+)"/g))if(!/^https?:/.test(m[1])&&!ex(m[1]))err(`${w}: 链接 ${m[1]} 文件不存在`);}
  else if(a.type==='card'){(a.options||[]).forEach(o=>{needAu('card_'+o.k,`${w}.options[${o.k}]`,true);if(a.variant==='treasure'&&!ex(`illus/${o.img}.jpg`))err(`${w}: 缺少 illus/${o.img}.jpg`);});if(a.variant!=='treasure'){if(!a.template||!a.back)err(`${w}: phrase 卡需要 template 和 back`);a.back?.forEach(c=>role(c.b,w));}else role(a.badge,w);}
  else err(`${w}: 未知 type "${a.type}"（drag / steps / seq / map / card）`);};
 for(const [k,a] of Object.entries(EP.activities||{}))act(a,`activities.${k}`);
 // ending + download
 if(EP.ending?.say?.id)lineIds.add(EP.ending.say.id);for(const a of Object.values(EP.activities||{}))if(a.type==='card')(a.options||[]).forEach(o=>lineIds.add('card_'+o.k));
 needAu(EP.ending?.say?.id,'ending.say',true);tokens(EP.ending?.html,'ending.html');
 if(EP.download&&!ex(EP.download.href))err(`download: 文件 ${EP.download.href} 不存在`);
 if(!EP.download)warn('没有 download（知识点 Word）');
 // hints
 let H={};if(ex('audio/hints.json')){try{H=JSON.parse(fs.readFileSync(path.join(D,'audio/hints.json'),'utf8'));}catch(e){err('audio/hints.json 不是合法 JSON：'+e.message);}}else warn('没有 audio/hints.json（字幕下的语法提示）');
 const nw=w=>w.toLowerCase().replace(/[^a-z']/g,'');
 for(const [id,list] of Object.entries(H)){if(id.startsWith('_'))continue;if(!L[id]){err(`hints.json: ${id} 不在 lines.json`);continue;}if(!lineIds.has(id))warn(`hints.json: ${id} 不是故事台词，不会显示`);
  if(list.length>2)warn(`hints.json ${id}: ${list.length} 条提示，电脑上可能挤，建议 ≤2`);
  const ws=L[id].words.map(w=>nw(w[0]));list.forEach(h=>{role(h.b,`hints.json ${id}`);if(!h.zh)err(`hints.json ${id}: 缺少 zh`);const ph=String(h.hl||'').split(/\s+/).map(nw);let ok=false;for(let i=0;i+ph.length<=ws.length;i++)if(ph.every((p,k)=>ws[i+k]===p)){ok=true;break;}if(!ok)err(`hints.json ${id}: 句子里找不到 "${h.hl}"（要和台词原词一致）`);});}
 console.log(W.map(x=>'  ⚠ '+x).join('\n')||'');console.log(E.map(x=>'  ✘ '+x).join('\n')||'  ✔ 没有错误');
 console.log(`  ${E.length} 个错误，${W.length} 个提醒${hasFfprobe?'':'（未安装 ffprobe，跳过音频时长核对）'}`);if(E.length)bad++;}
process.exit(bad?1:0);
