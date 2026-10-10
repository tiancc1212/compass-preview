import puppeteer from 'puppeteer-core';
const U=process.argv[2]||'http://localhost:8716/index.html',out='/workspace/episode16/shots/rework';
const b=await puppeteer.launch({executablePath:process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
const w=ms=>new Promise(r=>setTimeout(r,ms));let errs=0;
async function run(name,vp){
 const p=await b.newPage();await p.setViewport(vp);
 p.on('pageerror',e=>{errs++;console.log('ERR',name,e.message)});p.on('console',m=>{const t=m.text();if(m.type()==='error'){errs++;console.log('CERR',name,t)}else if(/REWARD/.test(t))console.log('  ',t);});
 p.on('requestfailed',r=>console.log('REQFAIL',r.url()));
 const shot=async n=>p.screenshot({path:`${out}/${name}_${n}.png`});
 const open=async j=>{await p.goto(`${U}?jump=${j}&r=${Date.now()}`);await p.waitForFunction(()=>document.querySelector('#panel').style.display==='flex',{timeout:60000});await w(600);};
 const tap=async sel=>{const e=await p.$(sel);if(!e)throw new Error('no '+sel);await e.click();await w(300);};
 const tip=async()=>(await p.$eval('.qcard .tip',e=>e.textContent)).slice(0,70);
 const nextBtn=async()=>{await tap('.nextwrap .btn');};
 // matching
 await open('verbs');await p.evaluate(()=>window.__auto());await w(400);await nextBtn();await w(400);await shot('match_1');
 await tap('.mitem[data-i="0"]');await tap('.mtarget[data-k="td"]');console.log(name,'match wrong:',await tip());await shot('match_2_wrong');
 await tap('.mitem[data-i="0"]');await tap('.mtarget[data-k="ing"]');await tap('.mitem[data-i="2"]');await tap('.mtarget[data-k="do"]');await shot('match_3_partial');
 await p.evaluate(()=>window.__solve());await w(400);await shot('match_4_done');
 // picture choice
 await open('meaning');await shot('pick_1');
 const wrongTxt=await p.$$eval('.pic[data-j="0"] .popt',bs=>bs.map(b=>b.textContent));
 await p.evaluate(()=>{const b=[...document.querySelectorAll('.pic[data-j="0"] .popt')].find(b=>/to bark/.test(b.textContent));b.click();});await w(300);console.log(name,'pick wrong:',await tip());await shot('pick_2_wrong');
 await p.evaluate(()=>window.__solve());await w(400);await shot('pick_3_done');
 for(let k=0;k<3;k++){await nextBtn();await w(300);await p.evaluate(()=>window.__solve());await w(300);}await shot('pick_4_last');
 // typed suffix
 await open('feel');await shot('fill_1');await p.type('.tin','ed');await p.keyboard.press('Enter');await w(300);console.log(name,'fill wrong:',await tip());await shot('fill_2_wrong');
 await p.$eval('.tin',e=>e.value='');await p.type('.tin',' ING ');await p.keyboard.press('Enter');await w(300);await shot('fill_3_right');
 for(let k=0;k<3;k++){await nextBtn();await p.evaluate(()=>window.__solve());await w(300);}
 // error correction
 await open('to');await shot('fix_1');await tap('.ew[data-i="0"]');console.log(name,'fix wrongword:',await tip());await tap('.ew[data-i="2"]');await shot('fix_2_picked');
 await tap('.efb[data-ok="1"]');await shot('fix_3_done');for(let k=0;k<4;k++){await nextBtn();await p.evaluate(()=>window.__solve());await w(300);}
 // word order + rewrite
 await open('subject');await shot('order_1');
 for(const wd of ['Finding','socks','is','his','favourite','hobby'])await tap(`.wbank .wt[data-w="${wd}"]`);await shot('order_2_done');
 await nextBtn();await shot('rewrite_1');await p.type('.tin','It is finding socks fun');await p.keyboard.press('Enter');await w(300);console.log(name,'rewrite wrong:',await tip());
 await p.$eval('.tin',e=>e.value='');await p.type('.tin',"It's fun to find socks.");await p.keyboard.press('Enter');await w(300);await shot('rewrite_2_done');
 // base verb fill
 await open('attr');await p.type('.tin','runing');await w(100);await p.$eval('.tin',e=>e.value='');await p.type('.tin','losing');await p.keyboard.press('Enter');await w(300);console.log(name,'attr wrong:',await tip());await shot('attr_1_wrong');
 await p.$eval('.tin',e=>e.value='');await p.type('.tin','Lost');await p.keyboard.press('Enter');await w(300);await shot('attr_2_right');
 for(let k=0;k<3;k++){await nextBtn();await p.evaluate(()=>window.__solve());await w(300);}
 // tf
 await open('tf');await shot('tf_1');await tap('.tf[data-v="1"]');console.log(name,'tf wrong:',await tip());await tap('.tf[data-v="0"]');await shot('tf_2_done');
 for(let k=0;k<7;k++){await nextBtn();await p.evaluate(()=>window.__solve());await w(250);}await shot('tf_3_last');
 // full flow fast
 await p.goto(`${U}?mute=1&fast=1&r=${Date.now()}`);await p.waitForFunction(()=>window.__ready,{timeout:60000});await p.evaluate(()=>window.__go());
 let n=0;while(!(await p.evaluate(()=>window.__done))&&n<600){n++;await p.evaluate(()=>{document.querySelector('#next').click();if(window.__auto&&document.querySelector('#panel').style.display==='flex'){const a=window.__auto;window.__auto=null;a();}});await w(200);}
 console.log(name,'full flow done:',await p.evaluate(()=>!!window.__done),n);await shot('9_end');
 await p.close();}
await run('phone',{width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:2});
await run('desktop',{width:1280,height:800});
console.log('errors',errs);await b.close();
