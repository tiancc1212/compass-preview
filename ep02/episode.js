// 罗盘冒险队 · 第2集 维京船上的寻物单（名词与冠词）— content only; the engine lives in ../engine/
// Field reference: tools/handoff_单集制作流程.md · check with: node tools/validate_episode.mjs ep02
export default {
 no:2,
 hud:'🧭 罗盘冒险队 · 第2集 维京船上的寻物单',
 stars:'⭐ 第 2 颗星',
 start:{h1:'维京船上的寻物单',subt:'哪个东西、谁的、有几个？跟着清单找回船长的头盔。',go:'🧭 出发：寻找维京宝物'},
 theme:{bg:'#132c36',stage:'#153441'},
 css:true,               // episode.css: position of the "C. C. was here" overlay on the chessboard
 audioVersion:'20261011-level1',
 rewardWait:true,        // after a correct answer the next button unlocks when the reward voice ends
 download:{href:'downloads/ep02_nouns_articles.docx',name:'罗盘冒险队_第2集_名词与冠词知识地图.docx',label:'📥 下载知识点（Word）'},
 img:{"arrival":["illus/01_arrival.jpg","全队登上维京船"],"list":["illus/02_captains_list.jpg","Lily 读船长的清单"],"axe":["illus/03_heavy_axe.jpg","Sam 搬不动斧头"],"wrong":["illus/04_wrong_helmet.jpg","Mia 找到普通头盔"],"biscuit":["illus/05_biscuit_reveal.jpg","Biscuit 叼着船长头盔的皮带"],"boots":["illus/06_sailors_boots.jpg","Lily 打开船员们的靴箱"],"lunch":["illus/07_lunch_supplies.jpg","两面盾牌、三把小刀、两块面包和一瓶水"],"chess":["illus/08_old_chessboard.jpg","Lily 发现旧棋盘上的线索"],"star":["illus/09_star_discovery.jpg","棋盘旁发现第 2 颗星"]},
 firstImg:'arrival',
 sections:{"S1":[{"id":"l01","zh":"罗盘把我们带到了一艘维京船上。","img":"arrival"},{"id":"l02","zh":"Lily 读起船长的清单。","img":"list"},{"id":"l03","zh":"拿一把斧头、一面盾牌，还有船长的那顶头盔！","img":"list"},{"id":"l04","zh":"这把斧头太重了！","img":"axe"}],"S2":[{"id":"l05","zh":"Mia 找到了一顶头盔。","img":"wrong"},{"id":"l06","zh":"这不是船长的头盔！","img":"wrong"},{"id":"l07","zh":"船长的头盔在 Biscuit 那儿！","img":"biscuit"},{"id":"l08","zh":"船员们的靴子在一个箱子里。","img":"boots"}],"S3":[{"id":"l09","zh":"桌上有两面盾牌和三把小刀。","img":"lunch"},{"id":"l10","zh":"我们午餐需要面包和水。","img":"lunch"},{"id":"l11","zh":"这里有两块面包和一瓶水。","img":"lunch"}],"S4":[{"id":"l12","zh":"维京人午饭后下起了棋。","img":"chess"},{"id":"l13","zh":"Lily 在旧棋盘上发现了“C. C. 到此一游”。","img":"chess","overlay":"<div class=\"carve\">C. C. was here</div>"},{"id":"l14","zh":"船长说：“以前有个中国男孩教过我下棋。”","img":"chess"},{"id":"l15","zh":"第 2 颗星在棋盘旁亮了起来。","img":"star"}]},
 flow:['S1','q1','q2','S2','q3','S3','q4','S4','q5','q6','map','card'],
 activities:{
  q1:{type:'steps',badge:"A",title:"清单小帽子",desc:"船长要一个普通物件。补 a 或 an，看后面紧接的读音。",tip:"a/an 常表示一个没指定的可数东西。看读音，不是看首字母。",
   steps:[
    {"kind":"typed","ctx":"清单要一把斧头","pre":"Bring ","post":" axe.","ans":"an","hint":"先轻声读 axe，判断它开头的声音。不要只看第一个字母。","why":"Bring an axe. · axe 的开头是元音音素。","au":"ex_q1_axe"},
    {"kind":"typed","ctx":"清单要一面盾牌","pre":"Bring ","post":" shield.","ans":"a","hint":"先轻声读 shield，判断它开头的声音。","why":"Bring a shield. · shield 的开头是辅音音素。","au":"ex_q1_shield"},
    {"kind":"typed","ctx":"Lily 夸手里的工具","pre":"This is ","post":" useful tool.","ans":"a","hint":"空格后紧接的是 useful。先读这个词，听听它的开头，不要跳过它去看 tool。","why":"This is a useful tool. · useful 的开头是辅音音素。","au":"ex_q1_useful"}]},
  q2:{type:'steps',badge:"THE",title:"船长要哪一顶",desc:"看清画面和情境，再选一句。",tip:"听的人能不能知道是哪一个？“第一次 a、第二次 the”只是常见线索。",
   steps:[
    {"kind":"choice","ctx":"Mia 还没选，想拿任意一顶普通头盔。","img":"pick_helmet_any","good":"Mia needs a helmet.","others":["Mia needs the helmet.","Mia needs helmet."],"hint":"Mia 还没有选好。她想拿的是特定的一顶，还是任意一顶？","au":"ex_q2_any"},
    {"kind":"choice","ctx":"上一句：Mia has a helmet. 现在继续说她手里的同一顶。","img":"pick_helmet_again","good":"The helmet is small.","others":["A helmet is small.","Helmet is small."],"hint":"前后两句说的是同一顶，还是重新介绍另一顶？","au":"ex_q2_again"},
    {"kind":"choice","ctx":"Sam 和 Lily 都看着 Biscuit 嘴里的唯一一顶头盔。Lily 第一次提起它，想让 Sam 拿回这一顶。","img":"pick_helmet_known","good":"Bring me the helmet in Biscuit's mouth.","others":["Bring me a helmet in Biscuit's mouth.","Bring me helmet in Biscuit's mouth."],"hint":"看看 Sam 和 Lily 能不能从画面知道她要哪一顶。别只数这个词前面出现过几次。","au":"ex_q2_known"}]},
  q3:{type:'steps',badge:"OWNER",title:"东西是谁的",desc:"根据括号里的主人，写出“谁的”。留意是一位还是多位。",tip:"the captain's helmet 里的 the 跟 captain 在一起；Leo's helmet、my helmet 前不能再加 the。",
   steps:[
    {"kind":"typed","ctx":"一位船长的头盔不见了","pre":"The ","post":" helmet is missing. (captain)","ans":"captain's","hint":"先确认主人是一位还是多位，再检查词尾有没有表达“谁的”。不要重复题干已有的词。","why":"一位主人加 's：captain's。","au":"ex_q3_captain"},
    {"kind":"typed","ctx":"多位船员各自的靴子放在箱里","pre":"The ","post":" boots are in a box. (sailors)","ans":"sailors'","hint":"主人是多位船员。先保留完整的复数词，再检查表示所有关系的标记放在哪里。","why":"s 结尾的复数加撇号：sailors'。","au":"ex_q3_sailors"},
    {"kind":"typed","ctx":"孩子们的包放在甲板上","pre":"The ","post":" bags are on the deck. (children)","ans":"children's","hint":"children 已经表示多个孩子。再看看它的词尾，想想怎样表示“这些孩子的”。","why":"不以 s 结尾的复数加 's：children's。","au":"ex_q3_children"}]},
  q4:{type:'steps',badge:"COUNT",title:"给午餐装船",desc:"按词卡给定的意思分拣，再写出数量。",tip:"先问这里在数什么：物件，或块、瓶、杯这样的单位。",
   steps:[
    {"kind":"sort","boxes":[{"k":"count","t":"这里可以直接数几个"},{"k":"amount","t":"这里按份量说"}],"items":[{"w":"shields","zh":"盾牌","img":"item_shield","box":"count","why":"一面、两面盾牌，可以直接数。"},{"w":"knives","zh":"小刀","img":"item_knife","box":"count","why":"一把、两把刀，可以直接数。"},{"w":"socks","zh":"袜子","img":"item_sock","box":"count","why":"一只、两只袜子，可以直接数。"},{"w":"bread","zh":"面包这种食物","img":"item_bread","box":"amount","why":"这里 bread 表示面包这种食物；要数两块，说 two pieces of bread。"},{"w":"water","zh":"饮用水","img":"item_water","box":"amount","why":"这里 water 是饮用水；想数两瓶，就数 bottles。"},{"w":"wood","zh":"造船木材","img":"item_wood","box":"amount","why":"这里 wood 是木材，要用 a piece of wood 之类的量词表达。"}],"au":"ex_q4_sort","why":"先问这句话里在数什么。这里 bread、water、wood 按份量说。"},
    {"kind":"typed","ctx":"桌上有三把小刀","pre":"There are three ","post":" on the table. (knife)","ans":"knives","hint":"three 提醒我们有几个？再回想 knife 的复数词尾怎么变化。","why":"knife → knives。","au":"ex_q4_knives"},
    {"kind":"typed","ctx":"要两块面包","pre":"We need two ","post":" of bread. (piece)","ans":"pieces","hint":"这句在数面包，还是数面包的“块”？空格里是哪一个词的数量变化？","why":"two pieces of bread：数的是 pieces。","au":"ex_q4_pieces"}]},
  q5:{type:'steps',badge:"ZERO",title:"午餐与棋局",desc:"把 a / an / the / 不填 放进句子。",tip:"泛指食物、通常的三餐、球类和棋类活动常不加冠词；指定“那一份”仍然可以用 the。",
   steps:[
    {"kind":"blank","ctx":"说平常吃哪种食物，不指桌上某一份","pre":"We eat ","post":" bread.","ans":"不填","hint":"这里说的是一种食物，还是指定桌上的某一份？先看清句子的意思。","why":"We eat bread.","au":"ex_q5_bread"},
    {"kind":"blank","ctx":"说通常的午餐","pre":"We eat bread for ","post":" lunch.","ans":"不填","hint":"这里说的是平常的午餐，还是某一顿特别的午餐？回想通常三餐的表达。","why":"We eat bread for lunch.","au":"ex_q5_lunch"},
    {"kind":"blank","ctx":"说在下棋这项活动","pre":"The Vikings play ","post":" chess.","ans":"不填","hint":"chess 在这里说的是棋类活动，还是某一件具体的物品？回想活动名称的表达。","why":"The Vikings play chess.","au":"ex_q5_chess"},
    {"kind":"blank","ctx":"只要 Lily 盘里那份面包，两人都看得见","pre":"Please pass ","post":" bread on Lily's plate.","ans":"the","hint":"再看看 on Lily's plate：它帮助两人认出哪一份了吗？","why":"Please pass the bread on Lily's plate.","au":"ex_q5_specific"}]},
  q6:{type:'steps',badge:"THE",title:"出发前看一眼",desc:"判断这句英文能不能表达给定的意思。",tip:"清单收好了！",
   steps:[
    {"kind":"tf","ctx":"想说“这是 Leo 的盾牌”","s":"This is Leo's shield.","ok":true,"fix":"This is Leo's shield.","au":"ex_q6_owner","hint":"先看看句子有没有清楚说明主人是谁。给定的意思和这句话一致吗？","labels":["这样说可以","需要改一下"]},
    {"kind":"tf","ctx":"想说“Leo 踢足球这项运动”","s":"Leo plays the football.","ok":false,"fix":"Leo plays football.","au":"ex_q6_football","hint":"这里说的是参加一项运动，还是摆弄某一个足球？这两种意思的表达一样吗？","labels":["这样说可以","需要改一下"]}]},
  map:{type:'map',button:'做我的维京宝物卡 ➜',html:`<h2 class="hb">{{b:A:36}} 维京船知识地图</h2><p>想查哪一条，就展开看。</p><div class="kgrid">
 <div data-map="M1"><h3>{{b:N:30}} M1 名词与数量</h3><p>名词给人和东西起名字。可数不可数要看这里的意思。</p><p>two shields · bread / water</p><details><summary>分类与不同意思</summary><p>专有/普通是另一种分类：Leo 是专有名词，helmet 是普通名词。room 表“空间”时不可数；a room 表“一间房间”。</p></details></div>
 <div data-map="M2"><h3>{{b:A:30}} M2 a/an</h3><p>一个没指定的可数东西常用 a/an；看后面紧接的读音。</p><p>a shield / an axe<br>a useful tool / an hour<br>a small helmet</p></div>
 <div data-map="M3"><h3>{{b:THE:30}} M3 the</h3><p>听的人能认出是谁、是哪一个，就常用 the；不要求必须先提过。</p><p>an axe → the axe<br>the helmet in Biscuit's mouth<br>the bread on Lily's plate · the sun</p></div>
 <div data-map="M4"><h3>{{b:ZERO:30}} M4 不填冠词</h3><p>泛指复数、不可数名词，以及通常的三餐、球类、棋类、学科，常不加冠词。</p><p>Dogs like socks. / We need water.<br>after lunch / play football / play chess<br>learn English · my helmet</p><details><summary>也有指定与修饰的情况</summary><p>a big lunch / the lunch on the table：不是绝对禁用冠词。</p></details></div>
 <div data-map="M5"><h3>{{b:OWNER:30}} M5 谁的</h3><p>一位主人加 's；s 结尾复数加 '；不以 s 结尾的复数加 's。</p><p>captain's / sailors' / children's<br>Leo's shield / my shield<br>the captain's helmet</p><details><summary>of 和无生命名词</summary><p>the deck of the ship / the ship's deck 都可以；不用“无生命只能用 of”的死规则。</p></details></div>
 <div data-map="M6"><h3>{{b:COUNT:30}} M6 名词的小变化</h3><p>多个可数东西变复数；不可数东西可以数单位。</p><p>two pieces of bread / a bottle of water</p><details><summary>更多复数样式：需要时再查</summary><p>shield → shields · box → boxes<br>city → cities · key → keys<br>knife → knives 但 roof → roofs<br>potato → potatoes 但 photo → photos<br>child → children · man → men<br>sheep → sheep</p></details></div>
 </div><p class="kdl">{download}</p>`},
  card:{type:'card',variant:'treasure',title:'维京宝物卡 #2',badge:'OWNER',desc:'选一件宝物，再收进日志。',front:'维京宝物卡 #2',backNote:'哪个东西 · 谁的 · 有几个',
   options:[{k:'shield',s:"This is Leo's shield.",zh:'Leo 的盾牌',img:'item_shield'},{k:'helmet',s:"This is Mia's helmet.",zh:'Mia 的普通头盔',img:'item_helmet'},{k:'sock',s:"This is Biscuit's sock.",zh:'Biscuit 的袜子',img:'item_sock'}],
   button:'🪄 收进日志',done:'⭐ 把第 2 颗星送回罗盘'}
 },
 ending:{img:'star',say:{id:'star',zh:'第 2 颗星回到了罗盘！'},
  html:`<h2>🎉 第 2 集完成！</h2><p style="font-size:22px">⭐ 已收集 {n} / 17 颗星　·　🗺️ 地图点亮：<b>维京船</b></p><p>🛡️ 维京宝物卡 #2 已收进冒险日志。</p><p>下次冒险时，再试着说说“哪个东西、谁的、有几个”。</p><p>{download}</p>`}
};
