// Audit typed/rewrite answers for entries that only matched under the old "strip all spaces" rule.
import path from 'node:path';import {pathToFileURL} from 'node:url';import fs from 'node:fs';
const norm=s=>(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,' ').replace(/\s+/g,' ').trim();
const eps=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync('.').filter(d=>/^ep\d\d$/.test(d)&&fs.existsSync(d+'/episode.js'));
let n=0;
for(const ep of eps){globalThis.window=globalThis;const m=await import(pathToFileURL(path.resolve(ep,'episode.js')).href);const E=m.default||m.EP||m;
 const walk=(o,where)=>{if(!o||typeof o!=='object')return;if(Array.isArray(o)){o.forEach((x,i)=>walk(x,where+'['+i+']'));return;}
  if(o.kind==='typed'||(o.ans!==undefined&&o.pre!==undefined)){const all=[o.ans,...(o.accept||[])].map(norm);
   for(const a of all){if(!a.includes(' ')&&all.some(b=>b.includes(' ')&&b.replace(/ /g,'')===a))console.log(`${ep} ${where}: “${a}” 只在旧规则下与带空格的答案等价`),n++;}
   if(/\s/.test(norm(o.ans))&&!(o.accept||[]).length)console.log(`${ep} ${where}: 答案“${o.ans}”含空格，旧规则下连写也算对，现在要求词间有空格（核对是否合意）`),n++;}
  if(o.kind==='rewrite'||o.answers){for(const a of (o.answers||[]))if(a!==norm(a))console.log(`${ep} ${where}: rewrite 答案“${a}”不是规范形（应小写、去句末标点、单空格）`),n++;}
  for(const k in o)if(typeof o[k]==='object')walk(o[k],where+'.'+k);};
 walk(E,ep);}
console.log('共',n,'条需核对');
