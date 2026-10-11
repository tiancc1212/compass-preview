// 罗盘冒险队 · 第16集 怪兽招聘会（非谓语动词）— content only; the engine lives in ../engine/
// Field reference: tools/handoff_单集制作流程.md · check with: node tools/validate_episode.mjs ep16
export default {
 no:16,
 hud:'🧭 罗盘冒险队 · 第16集 怪兽招聘会',
 stars:'⭐ 第 16 颗星',
 start:{h1:'怪兽招聘会',subt:'Biscuit 想找一份工作——学会 to do、doing、done，帮它通过面试！',go:'🧭 出发：We want to find a job!'},
 theme:{bg:'#1b1020',stage:'#2a1830'},
 audioVersion:'20261011-level1',
 download:{href:'downloads/ep16_nonfinite_verbs.docx',name:'罗盘冒险队_第16集_非谓语动词_知识点.docx',label:'📥 下载知识点（Word）'},
 img:{gate:['illus/01_fair_gate.jpg','招聘会大门 · 紫色怪兽举着牌子'],crew:['illus/02_crew_excited.jpg','冒险队来到招聘会 · Sam 很激动'],rules:['illus/03_rules_board.jpg','Lily 读规则板'],sniff:['illus/04_biscuit_sniff.jpg','Biscuit 停下来闻，找到丢失的袜子'],job:['illus/05_got_the_job.jpg','怪兽大笑 · Biscuit 被录取']},
 firstImg:'gate',
 sections:{S1:[{id:"l01",zh:"罗盘把冒险队带到了热闹的怪兽招聘会。",img:"gate"},{id:"l02",zh:"一只高高的紫色怪兽站在门口，举着一块大牌子。",img:"gate"},{id:"l03",zh:"“欢迎！我需要一个帮手来看守我的袜子。”",img:"gate"},{id:"l04",zh:"“我们来这里是为了给 Biscuit 找份工作！”",img:"crew"},{id:"l05",zh:"“可是 Biscuit 太小了，什么也看守不了。”",img:"crew"},{id:"l06",zh:"“这个招聘会太让人激动了，我好激动！”",img:"crew"}],S2:[{id:"l07",zh:"“等等，让我先看看规则。”",img:"rules",overlay:"<div class=\"carve\">No barking! · Remember to smile.</div>"},{id:"l08",zh:"“规则一：禁止吠叫。规则二：记得微笑。”",img:"rules",overlay:"<div class=\"carve\">No barking! · Remember to smile.</div>"}],S3:[{id:"l09",zh:"Biscuit 不叫了，摇起了尾巴。",img:"sniff"},{id:"l10",zh:"“给我看看你怎么干这份活，小狗。”",img:"sniff"},{id:"l11",zh:"Biscuit 停下来闻了闻空气，然后在桌子下面找到了一只丢失的袜子。",img:"sniff"}],S4:[{id:"l12",zh:"“找袜子是它最爱的爱好！”",img:"job"},{id:"l13",zh:"“哈！你把我逗笑了。这份工作归你了！”",img:"job"},{id:"l14",zh:"Leo 永远忘不了看到 Biscuit 得到第一份工作的那一刻。",img:"job"}]},
 flow:['S1','forms','feel','S2','verbs','S3','meaning','S4','to','subject','attr','tf','map','card'],
 activities:{
  // A1 认形式：to do / doing / done
  forms:{type:'drag',title:'🔍 认一认：非谓语三兄弟',
   desc:'刚才的故事里藏着这些词块。按<b>样子</b>把它们拖进对应的徽章盒：<b>to do</b>（不定式）、<b>doing</b>（动名词 / 现在分词）、<b>done</b>（过去分词）。',
   slots:[{k:'td',b:'TD',title:'to do',sub:'不定式'},{k:'ing',b:'ING',title:'doing',sub:'动名词 / 现在分词'},{k:'ed',b:'ED',title:'done',sub:'过去分词'}],
   chunks:[{t:'to guard',k:'td',h:'to + 动词原形 = 不定式。'},{t:'to find',k:'td',h:'to + 动词原形 = 不定式。'},{t:'to smile',k:'td',h:'to + 动词原形 = 不定式。'},
    {t:'holding',k:'ing',h:'动词 + ing 是 doing 形式。'},{t:'barking',k:'ing',h:'bark + ing，是 doing 形式。'},{t:'exciting',k:'ing',h:'excite → exciting，以 -ing 结尾。'},
    {t:'excited',k:'ed',h:'excite → excited，是过去分词 done 形式。'},{t:'lost',k:'ed',h:'lose 的过去分词是 lost（不规则）。'}],
   tip:'它们都<b>不当谓语</b>，所以叫“非谓语动词”。记住口诀：<b>to do 还没做，doing 正在做 / 当名词，done 被做或已完成</b>。'},
  // -ing / -ed 词尾
  feel:{type:'steps',title:'😆 -ing 还是 -ed？补上词尾',desc:'<b>-ing</b>：东西本身“令人…的”；<b>-ed</b>：人自己“感到…的”。在空格里打出 <b>ing</b> 或 <b>ed</b>。',tip:'exciting / boring 说<b>事物</b>的特点；excited / bored 说<b>人</b>的感受。',
   steps:[
    {kind:'typed',ctx:'招聘会本身很好玩（事物）',pre:'The job fair is excit',post:'.',ans:'ing',accept:['exciting'],au:'ex_q4_1',ph:'ing / ed',why:'job fair 是<b>事物</b>，“令人激动的” → exciting。',wrong:[{re:'ed$',zh:'这里说的是<b>事物本身</b>“令人…的”，要用 -ing。'}],hint:'只要补词尾：<b>ing</b> 或 <b>ed</b>。'},
    {kind:'typed',ctx:'Mia 心里很激动（人的感受）',pre:'Mia is excit',post:'.',ans:'ed',accept:['excited'],au:'ex_q4_2',ph:'ing / ed',why:'Mia 是<b>人</b>，“感到激动” → excited。',wrong:[{re:'ing$',zh:'这里说的是<b>人自己的感受</b>“感到…的”，要用 -ed。'}],hint:'只要补词尾：<b>ing</b> 或 <b>ed</b>。'},
    {kind:'typed',ctx:'规则又长又无聊（事物）',pre:'The long rules are bor',post:'.',ans:'ing',accept:['boring'],au:'ex_q4_3',ph:'ing / ed',why:'rules 是<b>事物</b>，“令人无聊的” → boring。',wrong:[{re:'ed$',zh:'这里说的是<b>事物本身</b>“令人…的”，要用 -ing。'}],hint:'只要补词尾：<b>ing</b> 或 <b>ed</b>。'},
    {kind:'typed',ctx:'Sam 觉得没劲（人的感受）',pre:'Sam feels bor',post:'.',ans:'ed',accept:['bored'],au:'ex_q4_4',ph:'ing / ed',why:'Sam 是<b>人</b>，“感到无聊” → bored。',wrong:[{re:'ing$',zh:'这里说的是<b>人自己的感受</b>“感到…的”，要用 -ed。'}],hint:'只要补词尾：<b>ing</b> 或 <b>ed</b>。'}]},
  // A2 只接 to do / 只接 doing / 都可以；固定搭配
  verbs:{type:'seq',parts:[
   {type:'drag',title:'📋 招聘规则板 1/2：动词分拣',prog:[2,0],
    desc:'有的动词后面只能跟 <b>to do</b>，有的只能跟 <b>doing</b>，有的两种都行。把动词拖进正确的盒子：',
    slots:[{k:'td',b:'TD',title:'+ to do',sub:'只接不定式'},{k:'ing',b:'ING',title:'+ doing',sub:'只接动名词'},{k:'both',title:'两种都行',sub:'⚠ 有的意思会变'}],
    chunks:[{t:'want',k:'td',h:'want 只接 to do：want to go。'},{t:'hope',k:'td',h:'hope 只接 to do：hope to win。'},{t:'decide',k:'td',h:'decide 只接 to do：decide to stay。'},{t:'refuse',k:'td',h:'refuse 只接 to do：refuse to help。'},
     {t:'enjoy',k:'ing',h:'enjoy 只接 doing：enjoy reading。'},{t:'finish',k:'ing',h:'finish 只接 doing：finish eating。'},{t:'mind',k:'ing',h:'mind 只接 doing：Do you mind opening the window?'},{t:'avoid',k:'ing',h:'avoid 只接 doing：avoid making mistakes。'},
     {t:'like',k:'both',h:'like to do / like doing 都可以。'},{t:'begin',k:'both',h:'begin to do / begin doing 意思差不多。'},{t:'stop',k:'both',h:'stop 两种都能接，但意思完全不同！'},{t:'remember',k:'both',h:'remember 两种都能接，但意思不同！'}],
    tip:'口诀：<b>想要、希望、决定、拒绝</b> → to do（还没做的事）；<b>喜欢享受 enjoy、完成 finish、介意 mind、避免 avoid</b> → doing。stop / remember / forget / try 两种都行但<b>意思会变</b>——下一关就考它们！'},
   {type:'steps',title:'📋 招聘规则板 2/2：固定搭配连线',desc:'先点左边的短语，再点右边它后面该接的形式（也可以直接拖过去）。右边的形式可以重复用。',tip:'小心 <b>look forward to</b> 里的 to 是介词，后面要用 doing！',
    steps:[{kind:'match',
     pairs:[{t:'look forward to …',k:'ing',ex:'We look forward to seeing Grumble again.',au:'ex_q2_lookforward',h:'look forward to 里的 to 是<b>介词</b>，介词后面接 doing。'},
      {t:'be worth …',k:'ing',ex:'The rules are worth reading.',au:'ex_q2_worth',h:'be worth doing：值得做，后面接 doing。'},
      {t:'had better …',k:'do',ex:'You had better keep my socks safe.',au:'ex_q2_hadbetter',h:'had better 后面直接跟动词原形，不带 to。'},
      {t:'let me …',k:'do',ex:'Let me read the rules first.',au:'ex_q2_letme',h:'let sb. do：使役动词后面不带 to。'},
      {t:'too small …',k:'td',ex:'Biscuit is too small to guard anything.',au:'ex_q2_tooto',h:'too … to do：太……而不能，要带 to。'}],
     targets:[{k:'td',b:'TD',t:'to do'},{k:'ing',b:'ING',t:'doing'},{k:'do',b:'DO',t:'do'}]}]}]},
  // 看图选句：stop / remember / forget / try
  meaning:{type:'steps',title:'🕵️ 意思侦探：看图选句',desc:'同一个动词后面接 to do 还是 doing，意思不一样！看图，给每张图选出正确的句子。',tip:'口诀：<b>to do 还没做 / 要去做；doing 正在做 / 做过了</b>。',
   steps:[
    {kind:'pick',verb:'stop',rule:'stop doing = 停止<b>正在做</b>的事；stop to do = 停下来<b>去做另一件事</b>。',pics:[
     {img:'pick_stop1',good:'Biscuit stopped barking.',bad:'Biscuit stopped to bark.',au:'ex_q3_stop1',why:'他是<b>不再叫了</b>（停止正在做的事）→ stop doing。'},
     {img:'pick_stop2',good:'Biscuit stopped to sniff the socks.',bad:'Biscuit stopped sniffing the socks.',au:'ex_q3_stop2',why:'他是<b>停下来去闻</b>（停下来做另一件事）→ stop to do。'}]},
    {kind:'pick',verb:'remember',rule:'remember to do = 记得<b>要去做</b>（还没做）；remember doing = 记得<b>做过</b>。',pics:[
     {img:'pick_remember1',good:'Remember to bring your badge.',bad:'Remember bringing your badge.',au:'ex_q3_remember1',why:'徽章还在桌上，<b>还没带</b> → remember to do（记得要去做）。'},
     {img:'pick_remember2',good:'I remember meeting this monster before.',bad:'I remember to meet this monster before.',au:'ex_q3_remember2',why:'回忆泡泡里是<b>以前发生过</b>的事 → remember doing（记得做过）。'}]},
    {kind:'pick',verb:'forget',rule:'forget to do = 忘了<b>要去做</b>；forget doing = 忘了<b>做过</b>。',pics:[
     {img:'pick_forget1',good:"Don't forget to feed Biscuit.",bad:"Don't forget feeding Biscuit.",au:'ex_q3_forget1',why:'狗碗还是空的，<b>还没喂</b> → forget to do。'},
     {img:'pick_forget2',good:"I'll never forget visiting the pyramid.",bad:"I'll never forget to visit the pyramid.",au:'ex_q3_forget2',why:'金字塔是<b>已经去过</b>的回忆 → forget doing。'}]},
    {kind:'pick',verb:'try',rule:'try to do = <b>努力</b>去做；try doing = <b>试一试</b>（换个办法）。',pics:[
     {img:'pick_try1',good:'I tried to run faster.',bad:'I tried running faster.',au:'ex_q3_try1',why:'Sam 在<b>拼尽全力</b>跑 → try to do（努力去做）。'},
     {img:'pick_try2',good:'I tried pulling the door.',bad:'I tried to pull the door.',au:'ex_q3_try2',why:'门推不开，<b>换个办法试试</b>拉 → try doing。'}]}]},
  // 找错改错：要不要 to？
  to:{type:'steps',title:'🔧 找错改错：要不要 to？',desc:'每句话里有<b>一个地方</b>错了。先点出错的那个词，再选怎么改。',tip:'<b>let / make</b> sb. do、<b>had better</b> do 不带 to；<b>ask</b> sb. to do、<b>what to do</b> 要带 to。',
   steps:[
    {kind:'fix',ctx:'Lily 想先看规则',s:'Let me to read the rules.',wi:2,fix:[['删掉 to',1],['改成 too',0]],au:'ex_q5_1',good:'Let me read the rules.',why:'<b>let sb. do</b>：let 后面不带 to。'},
    {kind:'fix',ctx:'怪兽把大家都逗笑了',s:'The monster made everyone to laugh.',wi:4,fix:[['删掉 to',1],['改成 laughing',0]],au:'ex_q5_2',good:'The monster made everyone laugh.',why:'<b>make sb. do</b>：make 后面不带 to。'},
    {kind:'fix',ctx:'Lily 叫 Biscuit 坐下',s:'Lily asked Biscuit sit down.',wi:3,fix:[['改成 to sit',1],['改成 sitting',0]],au:'ex_q5_3',good:'Lily asked Biscuit to sit down.',why:'<b>ask sb. to do</b>：要带 to。'},
    {kind:'fix',ctx:'怪兽提醒：最好安静',s:"You'd better to be quiet.",wi:2,fix:[['删掉 to',1],['改成 being',0]],au:'ex_q5_4',good:"You'd better be quiet.",why:'<b>had better do</b>：不带 to。'},
    {kind:'fix',ctx:'Leo 不知道下一步该做什么',s:"I don't know what do next.",wi:4,fix:[['改成 to do',1],['改成 doing',0]],au:'ex_q5_5',good:"I don't know what to do next.",why:'<b>疑问词 + to do</b>：what to do / how to do it。'}]},
  // 搭句子 + 改写
  subject:{type:'steps',title:'🧱 搭句子：动作也能当主语',desc:'',tip:'动名词或不定式都能当主语；不定式作主语太长时，常用 <b>It</b> 占位：It is fun to find socks.',
   steps:[
    {kind:'order',q:'点词块，按顺序拼出 Sam 说的话：“找袜子是它最爱的爱好。”（点上面的词可以退回去）',words:['Finding','socks','is','his','favourite','hobby'],shuffled:['socks','is','hobby','Finding','favourite','his'],au:'ex_q6_order',
     why:'<b>Finding socks</b>（找袜子这件事）作主语，看作单数，谓语用 <b>is</b>。',firstHint:'谁当主语？“找袜子这件事”= <b>Finding socks</b>，放最前面。',hint:'his favourite hobby 的顺序是：<b>his → favourite → hobby</b>。'},
    {kind:'rewrite',q:'用 <b>It</b> 开头改写这句话，意思不变：',src:'To find socks is fun.',ph:'It is …',answers:['it is fun to find socks'],show:'It is fun to find socks.',normalize:[["\\bit's\\b",'it is']],au:'ex_q6_rewrite',
     why:'<b>It</b> 是形式主语，真正的主语 <b>to find socks</b> 放到后面。',
     wrong:[{re:'^it is',not:true,zh:'要用 <b>It is</b> 开头。'},{re:'finding',zh:'放到后面的真正主语要用 <b>to find</b> socks。'},{re:'to find socks$',not:true,zh:'句子结构是：It is + fun + <b>to find socks</b>。'}],hint:'检查一下单词和顺序：It is fun to find socks.'}]},
  // 给东西贴标签：doing 还是 done
  attr:{type:'steps',title:'🏷️ 给东西贴标签：doing 还是 done？',desc:'根据括号里的动词原形，自己写出正确的形式。<b>doing</b> 表示“主动 / 正在”，<b>done</b> 表示“被… / 已经”。',tip:'单个分词放<b>名词前</b>：a lost sock；分词短语放<b>名词后</b>：a monster <b>holding a big sign</b>。',
   steps:[
    {kind:'typed',ctx:'一只<b>被弄丢</b>的袜子',pre:'Biscuit found a ',post:' <span class="base">(lose)</span> sock.',ans:'lost',ph:'l…',au:'ex_q7_1',why:'袜子是被弄丢的（被动）→ 过去分词 <b>lost</b>（不规则变化）。',wrong:[{re:'^losing$',zh:'袜子不会自己“正在丢”，它是<b>被</b>弄丢的，用 done。'},{re:'^losed$',zh:'lose 是不规则动词，过去分词不是 losed。'}],hint:'想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？'},
    {kind:'typed',ctx:'<b>正在大笑</b>的怪兽',pre:'Everyone looked at the ',post:' <span class="base">(laugh)</span> monster.',ans:'laughing',ph:'l…',au:'ex_q7_2',why:'怪兽自己在笑（主动、正在）→ <b>laughing</b>。',wrong:[{re:'^laughed$',zh:'怪兽是自己<b>正在</b>笑，用 doing。'}],hint:'想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？'},
    {kind:'typed',ctx:'一把<b>被弄坏</b>的椅子',pre:'Grumble sat on a ',post:' <span class="base">(break)</span> chair.',ans:'broken',ph:'b…',au:'ex_q7_3',why:'椅子是被弄坏的 → 过去分词 <b>broken</b>（break-broke-broken）。',wrong:[{re:'^breaking$',zh:'椅子是<b>被</b>弄坏的，用 done。'},{re:'^(broke|breaked)$',zh:'break 的过去分词是 broken。'}],hint:'想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？'},
    {kind:'typed',ctx:'一只<b>正在跑</b>的狗',pre:'Sam saw a ',post:' <span class="base">(run)</span> dog.',ans:'running',ph:'r…',au:'ex_q7_4',why:'狗自己正在跑 → <b>running</b>（双写 n 再加 ing）。',wrong:[{re:'^runing$',zh:'run 要<b>双写 n</b>：running。'},{re:'^(run|ran)$',zh:'狗是<b>正在</b>跑，用 doing。'}],hint:'想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？'}]},
  // 闯关小测：对还是错
  tf:{type:'steps',title:'⚡ 闯关小测：对还是错？',desc:'快速判断每句话对不对。把整集学过的都过一遍！',tip:'🎉 小测全部通过！你已经是非谓语小专家了。',
   steps:[
    {kind:'tf',s:'I enjoy to swim.',ok:false,fix:'I enjoy swimming.',au:'ex_q8_1',why:'enjoy 后面只能接 <b>doing</b>。'},
    {kind:'tf',s:'Remember to bring your badge.',ok:true,au:'ex_q8_2',why:'还没带 → remember <b>to do</b>，正确。'},
    {kind:'tf',s:'I want finding a helper.',ok:false,fix:'I want to find a helper.',au:'ex_q8_3',why:'want 后面接 <b>to do</b>。'},
    {kind:'tf',s:'The monster made Sam laugh.',ok:true,au:'ex_q8_4',why:'make sb. <b>do</b>，不带 to，正确。'},
    {kind:'tf',s:"I'm interesting in the rules.",ok:false,fix:"I'm interested in the rules.",au:'ex_q8_5',why:'说<b>人</b>的感受用 -ed：interested。'},
    {kind:'tf',s:'Reading the rules is boring.',ok:true,au:'ex_q8_6',why:'动名词作主语、规则令人无聊用 boring，正确。'},
    {kind:'tf',s:'We look forward to have a new helper.',ok:false,fix:'We look forward to having a new helper.',au:'ex_q8_7',why:'look forward to 的 to 是介词，后面接 <b>doing</b>。'},
    {kind:'tf',s:'Look at the broken door!',ok:true,au:'ex_q8_8',why:'门是被弄坏的 → broken，正确。'}]},
  // 知识地图
  map:{type:'map',button:'做我的咒语卡 ➜',html:`<h2>🗺️ 非谓语知识地图</h2>
 <div class="kgrid">
 <div><h3>{{b:TD:34}} to do 不定式 <small>还没做 / 目的</small></h3><ul>
  <li>作宾语：want / hope / decide <b>to do</b></li><li>作宾补：ask / tell sb. <b>to do</b></li>
  <li>目的：We came here <b>to find</b> a job. · in order to do</li><li>too … to do · … enough to do</li>
  <li>疑问词 + to do：how <b>to do</b> the job</li><li>It is + adj. + of / for sb. + to do</li><li>作定语：a helper <b>to guard</b> my socks</li><li>It takes sb. some time <b>to do</b></li></ul></div>
 <div><h3>{{b:DO:34}} 不带 to 的 do</h3><ul>
  <li>三使：let / make / have sb. <b>do</b></li><li>感官：see / hear / watch / notice / feel sb. <b>do</b>（全过程）</li>
  <li>had better do · Why not do · would rather do</li></ul></div>
 <div><h3>{{b:ING:34}} doing 动名词 / 现在分词</h3><ul>
  <li>作主语：<b>Finding</b> socks is fun.（谓语用单数）</li><li>作宾语：enjoy / finish / mind / avoid / keep <b>doing</b></li>
  <li>介词后：look forward to · be good at · What about <b>doing</b></li><li>be busy / be worth doing · go shopping · No barking!</li>
  <li>see / hear sb. <b>doing</b> = 正在做</li><li>sb. spend time (in) <b>doing</b></li><li>伴随：stands at the gate, <b>holding</b> a sign</li></ul></div>
 <div><h3>{{b:ED:34}} done 过去分词</h3><ul>
  <li>被动 / 完成：a <b>lost</b> sock · <b>fallen</b> leaves</li><li>人的感受：<b>excited</b> / <b>bored</b>（对比 exciting / boring）</li>
  <li>have sth. <b>done</b>：让别人把某事做好</li></ul></div>
 </div>
 <p class="kdiff">⚠ 意思会变：stop / remember / forget / try + to do 或 doing</p>
 <p class="kdl"><a class="btn" id="kdoc" href="downloads/ep16_nonfinite_verbs.docx" download="罗盘冒险队_第16集_非谓语动词_知识点.docx">📥 下载知识点（Word）</a></p>
 `},
  // 收藏卡
  card:{type:'card',variant:'phrase',title:'⭐ 收藏卡 #16：我的招聘自我介绍',desc:'在怪兽招聘会上介绍自己！选一个你最喜欢做的事——<b>enjoy</b> 后面要用 <b>doing</b>：',
   front:'👾 怪兽招聘会 · 收藏卡 #16',template:['I enjoy ','.'],back:[{t:'I',b:'S'},{t:'enjoy',b:'V'},{slot:true,b:'ING'}],foot:'enjoy + doing · 怪兽说：You got the job!',
   options:[{k:'football',w:'playing football',zh:'踢足球'},{k:'drawing',w:'drawing',zh:'画画'},{k:'reading',w:'reading',zh:'看书'},{k:'swimming',w:'swimming',zh:'游泳'},{k:'games',w:'playing games',zh:'玩游戏'}],
   sayZh:'我喜欢{zh}。',button:'🪄 盖上录取章',done:'⭐ 把星星送回罗盘'}
 },
 ending:{img:'job',say:{id:'star',zh:'第 16 颗星回到了罗盘！'},
  html:`<h2>🎉 第 16 集完成！</h2><p style="font-size:22px">⭐ 已收集 {n} / 17 颗星　·　🗺️ 地图解锁：<b>怪兽招聘会</b></p><p>🐶 Biscuit 拿到了人生第一份工作：<b>袜子看守员</b></p><p>📒 把你的收藏卡 #16 贴进冒险日志吧！</p><p>{download}</p>`}
};
