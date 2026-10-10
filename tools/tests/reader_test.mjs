import puppeteer from 'puppeteer-core';
const EPS=[['ep16',process.argv[2]||'http://localhost:8716/index.html']];
const out='/workspace/episode16/shots/reader';
const b=await puppeteer.launch({executablePath:process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
const w=ms=>new Promise(r=>setTimeout(r,ms));let errs=0;
for(const [ep,U] of EPS)for(const [dev,vp] of [['phone',{width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:2}],['desktop',{width:1280,height:800}]]){
 const p=await b.newPage();await p.setViewport(vp);const tag=ep+'_'+dev;
 p.on('pageerror',e=>{errs++;console.log('ERR',tag,e.message)});p.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.location()?.url||'')){errs++;console.log('CERR',tag,m.text(),m.location()?.url)}});
 await p.goto(U+'?r='+Date.now());await p.waitForFunction(()=>window.__ready,{timeout:60000});await p.evaluate(()=>window.__go());await w(500);
 // line 1 with audio: wait to end, inspect highlight log
 await w(4500);const hl=await p.evaluate(()=>window.__hl.slice());
 const l1=hl.filter(h=>h[0]==='l01');let back=false;for(let i=1;i<l1.length;i++)if(l1[i][1]<l1[i-1][1])back=true;
 console.log(tag,'l01 highlight seq (idx@t):',l1.map(h=>h[1]+'@'+h[2]).join(' '),'| snapback:',back,'| reading:',await p.evaluate(()=>window.__reading()));
 const pos=async()=>p.$eval('#lpos',e=>e.textContent);
 await p.screenshot({path:`${out}/${tag}_1_manual.png`});
 if(dev==='phone'){const cdp=await p.createCDPSession();const T=(type,x)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y:400,id:1}]});const sw=async dx=>{const x0=dx<0?300:100;await T('touchStart',x0);for(let k=1;k<=6;k++)await T('touchMove',x0+dx*k/6);await T('touchEnd');await w(400);};
  await sw(-150);console.log(tag,'after swipe left',await pos());await sw(-150);console.log(tag,'after swipe left',await pos());await sw(150);console.log(tag,'after swipe right',await pos());}
 else{await p.keyboard.press('ArrowRight');await w(300);console.log(tag,'after →',await pos());await p.keyboard.press('ArrowRight');await w(300);await p.keyboard.press('ArrowLeft');await w(300);console.log(tag,'after → ←',await pos());}
 // mute paging
 await p.click('#mute');await w(200);await p.click('#lnext');await w(300);console.log(tag,'muted next',await pos(),'all-class',await p.$$eval('#line span.all',x=>x.length));
 await p.screenshot({path:`${out}/${tag}_2_muted.png`});
 // auto + muted: time-based advance
 const before=await pos();await p.click('#auto');await w(6000);console.log(tag,'auto muted advanced',before,'->',await pos());await p.screenshot({path:`${out}/${tag}_3_auto.png`});
 // run until first exercise
 let n=0;while(await p.evaluate(()=>window.__reading())&&n<60){n++;await p.click('#auto').catch(()=>{});await p.evaluate(()=>window.__next());await w(150);}
 await w(500);await p.screenshot({path:`${out}/${tag}_4_exercise.png`});
 const revVis=await p.$eval('#review',e=>getComputedStyle(e).display);const dragEx=await p.$('.dchunk');console.log(tag,'review btn display in exercise:',revVis);
 const panelHtml=await p.$eval('#panel',e=>e.innerHTML.length);
 await p.click('#review');await w(600);console.log(tag,'in review reading:',await p.evaluate(()=>window.__reading()),await pos());await p.screenshot({path:`${out}/${tag}_5_review.png`});
 await p.click('#backex');await w(500);console.log(tag,'back: panel restored',(await p.$eval('#panel',e=>e.innerHTML.length))===panelHtml,await p.$eval('#panel',e=>e.style.display));
 if(dev==='phone'){const cdp=await p.createCDPSession();const T=(type,x)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y:600,id:1}]});await T('touchStart',300);for(let k=1;k<=6;k++)await T('touchMove',300-150*k/6);await T('touchEnd');await w(300);console.log(tag,'swipe on exercise -> reading?',await p.evaluate(()=>window.__reading()),'panel',await p.$eval('#panel',e=>e.style.display));}
 // full flow: whenever reading, panel must be hidden
 await p.goto(U+'?mute=1&fast=1&r='+Date.now());await p.waitForFunction(()=>window.__ready,{timeout:60000});await p.evaluate(()=>window.__go());
 let k=0,bad=0,secs=0,wasR=false;while(!(await p.evaluate(()=>window.__done))&&k<800){k++;const st=await p.evaluate(()=>({r:window.__reading(),pd:getComputedStyle(document.querySelector('#panel')).display}));
  if(st.r&&st.pd!=='none')bad++;if(st.r&&!wasR){secs++;await p.screenshot({path:`${out}/${tag}_sec${secs}.png`});}wasR=st.r;
  await p.evaluate(()=>{if(window.__reading())window.__next();else if(window.__auto&&document.querySelector('#panel').style.display==='flex'){const a=window.__auto;window.__auto=null;a();}});await w(150);}
 console.log(tag,'full flow done',await p.evaluate(()=>!!window.__done),'sections',secs,'panel-over-story samples',bad);
 await p.close();}
console.log('errors',errs);await b.close();
