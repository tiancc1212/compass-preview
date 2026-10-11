# 罗盘冒险队 · 单集规格书（SPEC）

> 版本 1.0，2026-10-11。适用于第 3–15 集、第 17 集，以及以后重做的任何一集。
> **规格书写的是“一集必须是什么样”**：结构、字段、内容标准、画面和声音标准、验收标准。
> **怎么一步步做出来**（装环境、生图、配音、对齐、部署的命令）看同目录的 `tools/handoff_单集制作流程.md`。两份文件说法不一致时，以本规格书为准，并告诉 Change。
> 样板集：`ep16/`（第 16 集 怪兽招聘会，非谓语动词）和 `ep02/`（第 2 集 维京船上的寻物单，名词与冠词）。本文所有例子都摘自这两集的真实文件，文件名和字段名可以直接在仓库里搜到。

---

## 1. 范围与分工

| 角色 | 负责 | 不能做 |
|---|---|---|
| **Codex**（主要制作者） | 只在 `epNN/` 目录里写内容：`index.html`（标准外壳）、`episode.js`、`episode.css`（可选）、`audio/`、`illus/`、`downloads/`、`docs/`；另外可以新增 `tools/make_docx_epNN.py` | 不能改 `engine/` 里的任何文件；不能改根目录第 1 集、`ep02/`、`ep16/` 或其他已完成的集；不能改 `tools/validate_episode.mjs` |
| **Willo** | 维护共享引擎 `engine/`、检查器 `tools/validate_episode.mjs`、本规格书 | — |
| **Change**（家长，最终决定人） | 批准故事和题目计划、插图、配音、引擎改动；做最后的听感和观感验收 | — |
| **CoCo** | 用剪映生成配音 | — |

- **引擎对 Codex 是冻结的。** 需要新题型、新效果或发现引擎 bug：写清楚“想要什么、为什么、哪一集要用”，交给 Change；Change 同意后由 Willo 改引擎。引擎每次改动都要让 ep02、ep16 和所有已完成的集重新通过验收。
- 集目录里**不允许写程序逻辑**（不能有 `app.js`、`<script>` 片段、行内事件）。`episode.js` 只是一个数据对象。
- 只发布到预览仓库 `https://github.com/tiancc1212/compass-preview`（GitHub Pages），不碰 Change 的个人网站 stemlearn.cloud。只用免费工具。

---

## 2. 一集的目录结构

```
epNN/                         NN 两位数：ep03、ep10、ep17
  index.html                  标准外壳，从 ep16/index.html 复制，只改 <title> 和 data-v
  episode.js                  本集全部内容（§4）
  episode.css                 可选。只能写本集插图上叠字（.carve）的位置，例：ep02/episode.css
  audio/
    l01.mp3 … lNN.mp3         故事台词，一句一个
    ex_q<活动号>_<描述>.mp3    练习答对后的奖励音，例：ex_q4_1.mp3、ex_q3_stop1.mp3、ex_q1_axe.mp3
    card_<选项key>.mp3         收藏卡每个选项一句，例：card_football.mp3、card_shield.mp3
    star.mp3                  结尾“第 N 颗星回到了罗盘！”
    lines.json                每个 mp3 的文本、角色、时长、逐词时间（§6）
    hints.json                故事台词的语法提示（§5）
  illus/
    01_<场景>.jpg …           故事插图，两位序号 + 英文小写下划线，例：ep16/illus/01_fair_gate.jpg、ep02/illus/08_old_chessboard.jpg
    pick_<名字>.jpg           看图选句 / 情境选择的方图，例：pick_stop1.jpg、pick_helmet_any.jpg
    item_<名字>.jpg           分拣词卡、宝物卡的物品图，例：ep02/illus/item_bread.jpg
  downloads/
    epNN_<英文名>.docx        知识点 Word，例：ep16/downloads/ep16_nonfinite_verbs.docx、ep02/downloads/ep02_nouns_articles.docx
  docs/                       设计文档（不影响网页，但必须有）
    COVERAGE.md               教辅覆盖表 + 教辅勘误（§7.6）
    QUESTIONS_PLAN.md         题目计划
    PROMPTS.md                故事插图提示词
    PICTURE_CHOICE_PROMPTS.md 方图提示词（有方图时）
    CREDITS.md                素材来源
```

**命名规则：** 所有文件名只用小写 ASCII、数字、下划线；不要空格和中文（中文名只出现在 Word 的下载名里）。音频 id 和文件名一一对应：`episode.js` 里写 `au:'ex_q4_1'`，就必须有 `audio/ex_q4_1.mp3`。

**标准外壳 `index.html`**（ep16、ep02 完全一样，只差标题和 data-v）：
```html
<!doctype html><html lang="zh-CN" data-v="13"><head>…
<title>罗盘冒险队 · 第16集 怪兽招聘会（非谓语动词）</title>
<script type="importmap">{"imports":{"three":"../engine/lib/three.module.js","three/addons/":"../engine/lib/addons/"}}</script>
<script type="module">const v=(await fetch('../engine/VERSION',{cache:'no-store'}) … await import('../engine/engine.js?v='+v);</script>
</head><body></body></html>
```

**三个版本号：**
| 版本号 | 在哪 | 什么时候改 |
|---|---|---|
| 内容版本 | `epNN/index.html` 的 `<html data-v="N">`，新集从 1 开始（ep16 现在是 13，ep02 是 4） | 改了 episode.js、lines.json、hints.json、episode.css 后 +1 |
| 音频版本 | `episode.js` 的 `audioVersion`，例：`'20261011-level1'` | 替换了任何 mp3 后改成新字符串（建议 `日期-说明`） |
| 引擎版本 | `engine/VERSION` | 只有 Willo 改 |

插图换了内容就换文件名（例如 `01_gate_v2.jpg`），不要覆盖同名文件。

---

## 3. 一集的流程（孩子看到的样子）

开始页（3D 罗盘 + 标题 + “出发”按钮）→ 故事第 1 段 → 练习 → 故事第 2 段 → 练习 → … → 知识地图（可下载 Word）→ 收藏卡 → 星星飞回罗盘 → 完成卡片（可下载 Word、再玩一次）。

顺序完全由 `episode.js` 的 `flow` 决定，例：
```js
// ep16/episode.js
flow:['S1','forms','feel','S2','verbs','S3','meaning','S4','to','subject','attr','tf','map','card'],
// ep02/episode.js
flow:['S1','q1','q2','S2','q3','S3','q4','S4','q5','q6','map','card'],
```
`flow` 的最后两项固定是知识地图和收藏卡；结尾由引擎自动接上。

---

## 4. `episode.js` 字段参考

文件格式：`export default { … };`，是一个 JavaScript 对象。字符串里有英文撇号（Don't、captain's）时用双引号或反引号；多行 HTML 用反引号。可以写 `//` 注释。

### 4.1 顶层字段

| 字段 | 类型 | 必填 | 说明 / 取值 | 例子 |
|---|---|---|---|---|
| `no` | 整数 1–17 | ✔ | 集号 = 罗盘上的第几颗星。引擎里 `MYSTAR = no - 1`（星星飞进第 no 个槽），`localStorage.cc_stars` 记录集号 | ep16：`no:16` |
| `hud` | 字符串 | ✔ | 左上角标题，格式固定 `🧭 罗盘冒险队 · 第N集 <地点>` | `'🧭 罗盘冒险队 · 第16集 怪兽招聘会'` |
| `stars` | 字符串 | 可选 | 右上角星星文字，默认 `⭐ 第 N 颗星` | `'⭐ 第 2 颗星'` |
| `start` | `{h1, subt, go}` | ✔ | 开始页标题、一句话简介（中文，≤40 字）、出发按钮（`🧭 出发：` + 一句英文或中文） | ep16：`go:'🧭 出发：We want to find a job!'` |
| `theme` | `{bg, stage}` | 可选 | 页面底色和插图区底色（基本被模糊背景盖住）。默认 `#1b1020` / `#2a1830` | ep02：`{bg:'#132c36',stage:'#153441'}` |
| `audioVersion` | 字符串 | 建议 | 加在每个 mp3 后的 `?v=` | `'20261011-level1'` |
| `rewardWait` | 布尔 | 可选，默认 false | true：答对后“下一题”要等奖励音播完才能点，最后一题自动继续（ep02 用 true，ep16 用 false）。新集默认 false；题目短、奖励音是完整句子时可以用 true | ep02：`rewardWait:true` |
| `css` | 布尔 | 可选 | true 时加载 `episode.css` | ep02：`css:true` |
| `speakers` | 对象 | 可选 | 新角色：`{key:['中文名','#颜色']}`，key 要和 lines.json 的 `who` 一致。已有角色见 §8.3 | — |
| `download` | `{href, name, label}` | ✔ | 知识点 Word。`href` 是相对路径，`name` 是下载后的中文文件名，`label` 固定 `'📥 下载知识点（Word）'` | ep16：`{href:'downloads/ep16_nonfinite_verbs.docx',name:'罗盘冒险队_第16集_非谓语动词_知识点.docx',label:'📥 下载知识点（Word）'}` |
| `img` | 对象 | ✔ | 故事插图表 `key:[路径, 中文说明]`。说明用作无障碍 alt，也用于图片缺失时的占位 | ep16：`gate:['illus/01_fair_gate.jpg','招聘会大门 · 紫色怪兽举着牌子']` |
| `firstImg` | 字符串 | 建议 | 开始页背后显示的插图 key | `'gate'` |
| `sections` | 对象 | ✔ | 故事分段（§4.2） | — |
| `flow` | 字符串数组 | ✔ | 播放顺序，元素是 section 名或 activity 名，第一项必须是 section | 见 §3 |
| `activities` | 对象 | ✔ | 练习、知识地图、收藏卡（§4.3–4.6） | — |
| `ending` | 对象 | ✔ | 结尾（§4.7） | — |

**HTML 字符串里能用的替换标记：** `{{b:TD:34}}` = 34px 的 TD 黄铜徽章（不写尺寸默认 34）；`{download}` = Word 下载按钮；`{n}`（只在 `ending.html` 里）= 已收集星数。

### 4.2 故事 `sections`

```js
// ep16/episode.js
sections:{
 S1:[{id:"l01",zh:"罗盘把冒险队带到了热闹的怪兽招聘会。",img:"gate"}, …],
 S2:[{id:"l07",zh:"“等等，让我先看看规则。”",img:"rules",overlay:"<div class=\"carve\">No barking! · Remember to smile.</div>"}, …]}
```
| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✔ | 台词 id（`l01`…），必须在 lines.json 里 |
| `zh` | ✔ | 中文字幕。意译、口语化；人物说的话加中文引号“” |
| `img` | 每段第一句必填，建议每句都写 | 读到这句时显示的插图 key |
| `overlay` | 可选 | 叠在插图上的 HTML，只用 `<div class="carve">英文</div>`。插图里不能有字，牌子上的字都靠它（§9.5） |
| `fx` | 可选 | 音效：`whoosh`（传送）、`door`（开门）、`star`、`flip` |

段名用 `S1`…`S4`（最多 `S5`）。

### 4.3 活动类型 `type`

活动的 key（如 `forms`、`q1`）就是 `?jump=` 测试入口的名字，用英文小写。

#### (1) `drag` 分类拖拽 / 拖进空格
```js
// ep16/episode.js activities.forms
forms:{type:'drag',title:'🔍 认一认：非谓语三兄弟',
 desc:'刚才的故事里藏着这些词块。按<b>样子</b>把它们拖进对应的徽章盒：…',
 slots:[{k:'td',b:'TD',title:'to do',sub:'不定式'},{k:'ing',b:'ING',title:'doing',sub:'动名词 / 现在分词'},{k:'ed',b:'ED',title:'done',sub:'过去分词'}],
 chunks:[{t:'to guard',k:'td',h:'to + 动词原形 = 不定式。'}, … ,{t:'lost',k:'ed',h:'lose 的过去分词是 lost（不规则）。'}],
 tip:'它们都<b>不当谓语</b>，所以叫“非谓语动词”。记住口诀：…'},
```
| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✔ | 一个 emoji + 活动名，例 `🔍 认一认：…` |
| `desc` | ✔ | 做法说明，1–2 句 |
| `mode` | 可选 | `'box'`（默认，拖进 2–3 个盒子）或 `'blank'`（拖进句子里的空格） |
| `slots` | ✔ | box 模式：`{k, b?, title, sub?}`；blank 模式：`{k, b?, ctx?, pre, post}` |
| `chunks` | ✔ | `{t:词块, k:对应slot的k 或 null(干扰项), h:放错时的中文解释, ok?:放对时的补充}` |
| `tip` | ✔ | 全部放对后的总结（口诀） |
| `audio` | 可选 | 完成后播放的音频 id |
| `prog` | 可选 | `[共几轮, 第几轮(从0数)]`，配合 `seq` 显示进度点，例 `prog:[2,0]` |

每个盒子 3–5 个词块，总数 8–12 个（ep16 forms 8 个，verbs 12 个）。

#### (2) `steps` 一张卡片里的连续几道题
```js
// ep02/episode.js activities.q1
q1:{type:'steps',badge:"A",title:"清单小帽子",desc:"船长要一个普通物件。补 a 或 an，看后面紧接的读音。",
 tip:"a/an 常表示一个没指定的可数东西。看读音，不是看首字母。",
 steps:[ {kind:"typed", …}, {kind:"typed", …}, {kind:"typed", …} ]},
```
`title` ✔、`miss` 可选（只对 `fix` 题有用，见 ⑤）、`desc` ✔（可以是空字符串，如 ep16 `subject`）、`tip` ✔（最后一题答对后显示的总结）、`steps` ✔、`badge` 可选（标题前的徽章；有 badge 时标题不加 emoji，ep02 的写法；没有 badge 时标题以 emoji 开头，ep16 的写法。**同一集里统一一种写法**）。

#### (3) `seq` 把几个活动连成一个
```js
// ep16/episode.js activities.verbs：先分拣动词，再连线固定搭配
verbs:{type:'seq',parts:[
 {type:'drag',title:'📋 招聘规则板 1/2：动词分拣',prog:[2,0], …},
 {type:'steps',title:'📋 招聘规则板 2/2：固定搭配连线', …, steps:[{kind:'match', …}]}]},
```

#### (4) `map` 知识地图（§4.5）　(5) `card` 收藏卡（§4.6）

### 4.4 `steps` 里的 10 种题型 `kind`

所有题型共有：`au`（答对后才播放的奖励音频 id，强烈建议每题都有）。答错时显示“再想想：”+ 中文解释，卡片轻轻抖一下；连错两次给出答案，但仍要孩子自己操作一次。

**① `match` 连线**（左边短语连右边形式，右边可重复用）
```js
// ep16/episode.js activities.verbs.parts[1]
{kind:'match',
 pairs:[{t:'look forward to …',k:'ing',ex:'We look forward to seeing Grumble again.',au:'ex_q2_lookforward',h:'look forward to 里的 to 是<b>介词</b>，介词后面接 doing。'}, …],
 targets:[{k:'td',b:'TD',t:'to do'},{k:'ing',b:'ING',t:'doing'},{k:'do',b:'DO',t:'do'}]}
```
`pairs` 4–6 个：`t` 短语、`k` 正确目标、`ex` 连对后显示的完整例句（也是 `au` 的内容）、`h` 连错解释。`targets` 2–4 个，必须带徽章 `b`。可选 `done`（全部连对的提示，默认“全部连对！”）。

**② `pick` 两张图各选一句**（同一动词的两种用法对比）
```js
// ep16/episode.js activities.meaning.steps[0]
{kind:'pick',verb:'stop',rule:'stop doing = 停止<b>正在做</b>的事；stop to do = 停下来<b>去做另一件事</b>。',pics:[
 {img:'pick_stop1',good:'Biscuit stopped barking.',bad:'Biscuit stopped to bark.',au:'ex_q3_stop1',why:'他是<b>不再叫了</b>（停止正在做的事）→ stop doing。'},
 {img:'pick_stop2',good:'Biscuit stopped to sniff the socks.',bad:'Biscuit stopped sniffing the socks.',au:'ex_q3_stop2',why:'…'}]}
```
`img` 对应 `illus/<img>.jpg`（方图）。两张图的正确句应互为对方的错误句。

**③ `choice` 一个情境（可带图）选一句**
```js
// ep02/episode.js activities.q2.steps[0]
{kind:"choice",ctx:"Mia 还没选，想拿任意一顶普通头盔。",img:"pick_helmet_any",good:"Mia needs a helmet.",
 others:["Mia needs the helmet.","Mia needs helmet."],hint:"Mia 还没有选好。她想拿的是特定的一顶，还是任意一顶？",au:"ex_q2_any"}
```
`ctx` 中文情境 ✔、`good` ✔、`others` 2 个干扰句 ✔（选项顺序随机）、`hint` 答错引导 ✔、`img` 可选、`why` 可选（答对后的解释，默认显示正确句）。

**④ `typed` 打字填空**（词尾、变形、单个词）
```js
// ep16/episode.js activities.feel.steps[0]：只填词尾
{kind:'typed',ctx:'招聘会本身很好玩（事物）',pre:'The job fair is excit',post:'.',ans:'ing',accept:['exciting'],au:'ex_q4_1',ph:'ing / ed',
 why:'job fair 是<b>事物</b>，“令人激动的” → exciting。',
 wrong:[{re:'ed$',zh:'这里说的是<b>事物本身</b>“令人…的”，要用 -ing。'}],hint:'只要补词尾：<b>ing</b> 或 <b>ed</b>。'}
// ep16/episode.js activities.attr.steps[0]：给原形写变形
{kind:'typed',ctx:'一只<b>被弄丢</b>的袜子',pre:'Biscuit found a ',post:' <span class="base">(lose)</span> sock.',ans:'lost',ph:'l…',au:'ex_q7_1', why:'…',
 wrong:[{re:'^losing$',zh:'袜子不会自己“正在丢”，它是<b>被</b>弄丢的，用 done。'},{re:'^losed$',zh:'lose 是不规则动词，过去分词不是 losed。'}],hint:'想一想：是<b>主动 / 正在</b>（doing）还是<b>被… / 已经</b>（done）？'}
```
`pre`/`post` 是空格前后的文字，原形提示写成 `<span class="base">(lose)</span>`；`ans` 标准答案；`accept` 其他可接受写法；`ph` 输入框灰字提示；判分忽略大小写、空格、开头的“-”、英文标点，撇号统一（`captain's` 可以）。`wrong` 是“常见错误 → 针对性提示”列表：`re` 正则（对小写去空格后的输入），`not:true` 表示“不匹配时”；都不匹配就用 `hint`。

**⑤ `fix` 改错**（先点错词，再选改法）
```js
// ep16/episode.js activities.to.steps[0]
{kind:'fix',ctx:'Lily 想先看规则',s:'Let me to read the rules.',wi:2,fix:[['删掉 to',1],['改成 too',0]],au:'ex_q5_1',good:'Let me read the rules.',why:'<b>let sb. do</b>：let 后面不带 to。'}
```
`wi` 是错词序号（按空格切分，从 0 数）；`fix` 2 个改法，`1` 是正确的；`good` 改好的句子（也是 `au` 的内容）。
`miss`（可选）：孩子点到**没错的词**时，提示“xx 没有错，”后面接的那句引导语。可以写在单题上，也可以写在整个活动上（单题优先）；都不写时用通用的“再读读这句，找出用错的那个词。”。引导语要针对本活动的考点，但不能直接说出错词。例：ep16 整个活动写在活动上：
```js
// ep16/episode.js activities.to
to:{type:'steps',title:'🔧 找错改错：要不要 to？',miss:'再看看<b>动词前后的 to</b>。', … steps:[{kind:'fix', …}, …]}
```

**⑥ `order` 连词成句**
```js
// ep16/episode.js activities.subject.steps[0]
{kind:'order',q:'点词块，按顺序拼出 Sam 说的话：“找袜子是它最爱的爱好。”（点上面的词可以退回去）',
 words:['Finding','socks','is','his','favourite','hobby'],shuffled:['socks','is','hobby','Finding','favourite','his'],au:'ex_q6_order',
 why:'<b>Finding socks</b>（找袜子这件事）作主语，看作单数，谓语用 <b>is</b>。',firstHint:'谁当主语？“找袜子这件事”= <b>Finding socks</b>，放最前面。',hint:'his favourite hobby 的顺序是：<b>his → favourite → hobby</b>。'}
```
5–8 个词；`shuffled` 是固定的打乱顺序（不能和答案相同）；`firstHint` 第一个词放错时的提示，`hint` 其他情况。

**⑦ `rewrite` 整句改写**
```js
// ep16/episode.js activities.subject.steps[1]
{kind:'rewrite',q:'用 <b>It</b> 开头改写这句话，意思不变：',src:'To find socks is fun.',ph:'It is …',answers:['it is fun to find socks'],show:'It is fun to find socks.',
 normalize:[["\\bit's\\b",'it is']],au:'ex_q6_rewrite',why:'…',
 wrong:[{re:'^it is',not:true,zh:'要用 <b>It is</b> 开头。'},{re:'finding',zh:'放到后面的真正主语要用 <b>to find</b> socks。'},{re:'to find socks$',not:true,zh:'…'}],hint:'检查一下单词和顺序：It is fun to find socks.'}
```
`answers` 写成**小写、去掉标点、单空格**的形式；`normalize` 先把缩写展开再比较；`show` 答对后显示的标准写法。

**⑧ `tf` 判断对错**——两种写法：
```js
// ep16/episode.js activities.tf.steps[0]：闯关小测（按钮 ✔ 对 / ✘ 错）
{kind:'tf',s:'I enjoy to swim.',ok:false,fix:'I enjoy swimming.',au:'ex_q8_1',why:'enjoy 后面只能接 <b>doing</b>。'}
// ep02/episode.js activities.q6.steps[1]：引导式（给情境，按钮“这样说可以 / 需要改一下”，答错给引导）
{kind:"tf",ctx:"想说“Leo 踢足球这项运动”",s:"Leo plays the football.",ok:false,fix:"Leo plays football.",au:"ex_q6_football",
 hint:"这里说的是参加一项运动，还是摆弄某一个足球？这两种意思的表达一样吗？",labels:["这样说可以","需要改一下"]}
```
错句必须有 `fix`；`au` 录的是**正确句**（对句录原句，错句录 `fix`）。

**⑨ `sort` 带图词卡分进两个盒子**
```js
// ep02/episode.js activities.q4.steps[0]
{kind:"sort",boxes:[{k:"count",t:"这里可以直接数几个"},{k:"amount",t:"这里按份量说"}],
 items:[{w:"shields",zh:"盾牌",img:"item_shield",box:"count",why:"一面、两面盾牌，可以直接数。"}, …,{w:"bread",zh:"面包这种食物",img:"item_bread",box:"amount",why:"…"}],
 au:"ex_q4_sort",why:"先问这句话里在数什么。这里 bread、water、wood 按份量说。"}
```
4–6 个词卡，`img` 可选（`illus/item_*.jpg`）；`why` 第二次放错时给出。

**⑩ `blank` 把选项拖进一个空**
```js
// ep02/episode.js activities.q5.steps[3]
{kind:"blank",ctx:"只要 Lily 盘里那份面包，两人都看得见",pre:"Please pass ",post:" bread on Lily's plate.",ans:"the",
 hint:"再看看 on Lily's plate：它帮助两人认出哪一份了吗？",why:"Please pass the bread on Lily's plate.",au:"ex_q5_specific"}
```
`opts` 默认 `['a','an','the','不填']`，可以换成本集的选项（如 `['to do','doing']`），`ans` 必须在里面。

### 4.5 知识地图 `type:'map'`
```js
// ep16/episode.js activities.map（节选）
map:{type:'map',button:'做我的咒语卡 ➜',html:`<h2>🗺️ 非谓语知识地图</h2>
 <div class="kgrid">
 <div><h3>{{b:TD:34}} to do 不定式 <small>还没做 / 目的</small></h3><ul><li>作宾语：want / hope / decide <b>to do</b></li> …</ul></div>
 …</div>
 <p class="kdiff">⚠ 意思会变：stop / remember / forget / try + to do 或 doing</p>
 <p class="kdl"><a class="btn" id="kdoc" href="downloads/ep16_nonfinite_verbs.docx" download="…">📥 下载知识点（Word）</a></p>`},
```
- `html` 结构：`<h2>` 标题 → `<div class="kgrid">` 里 4–6 个格子（每格 `<h3>{{b:徽章:34}} 标题</h3>` + `<ul><li>` 或 `<p>`）→ 可选 `<p class="kdiff">⚠ 易混点</p>` → 下载链接（直接写 `<p class="kdl">{download}</p>`，ep02 就是这样写的）。
- 较长的补充用 `<details><summary>…</summary><p>…</p></details>` 折叠（ep02 M1、M4、M5、M6）。
- 每格 3–8 条，每条一个例子；内容必须和练习、hints、Word 一致。
- `button`：去收藏卡的按钮文字。

### 4.6 收藏卡 `type:'card'`
两种样式，选一种：
```js
// ep16：phrase —— 选一个短语填进句子，翻面看到带徽章的词块
card:{type:'card',variant:'phrase',title:'⭐ 收藏卡 #16：我的招聘自我介绍',desc:'…<b>enjoy</b> 后面要用 <b>doing</b>：',
 front:'👾 怪兽招聘会 · 收藏卡 #16',template:['I enjoy ','.'],back:[{t:'I',b:'S'},{t:'enjoy',b:'V'},{slot:true,b:'ING'}],foot:'enjoy + doing · 怪兽说：You got the job!',
 options:[{k:'football',w:'playing football',zh:'踢足球'}, …],sayZh:'我喜欢{zh}。',button:'🪄 盖上录取章',done:'⭐ 把星星送回罗盘'}
// ep02：treasure —— 选一件带图的宝物，卡片上写一句话
card:{type:'card',variant:'treasure',title:'维京宝物卡 #2',badge:'OWNER',desc:'选一件宝物，再收进日志。',front:'维京宝物卡 #2',backNote:'哪个东西 · 谁的 · 有几个',
 options:[{k:'shield',s:"This is Leo's shield.",zh:'Leo 的盾牌',img:'item_shield'}, …],button:'🪄 收进日志',done:'⭐ 把第 2 颗星送回罗盘'}
```
- 3–5 个选项；每个选项必须有 `audio/card_<k>.mp3` 并在 lines.json 里（会显示字幕）。
- 卡上的句子必须用到本集核心语法；`back` 的徽章标出语法结构。
- 卡名统一 `<地点>卡 #N` 或 `收藏卡 #N`，和计划书 `grammar_fasttrack_final.md` 里本集的“⭐ 成果”对应。

### 4.7 结尾 `ending`
```js
// ep16/episode.js
ending:{img:'job',say:{id:'star',zh:'第 16 颗星回到了罗盘！'},
 html:`<h2>🎉 第 16 集完成！</h2><p style="font-size:22px">⭐ 已收集 {n} / 17 颗星　·　🗺️ 地图解锁：<b>怪兽招聘会</b></p><p>🐶 Biscuit 拿到了人生第一份工作：<b>袜子看守员</b></p><p>📒 把你的收藏卡 #16 贴进冒险日志吧！</p><p>{download}</p>`}
```
`img` 背景插图；`say.id` 固定 `star`（英文 “The Nth star returns to the compass!” 一类）；`html` 固定四行：完成标题 / 星数 + 地图解锁地点 / 一句剧情收尾 / 下载按钮。“再玩一次”按钮由引擎加。

引擎自动完成：背景变暗、罗盘放大 → 星星从收藏卡位置飞进第 `no` 个槽（约 1.8 秒，点屏幕可跳过）→ 槽位点亮并有光圈 → 显示“⭐ N / 17”进度条 → 写入 `localStorage.cc_stars`。

---

## 5. `hints.json`（故事台词下的语法提示）

```json
// ep02/audio/hints.json
"l03": [{"b":"A","hl":"an axe","zh":"<b>an</b> axe：axe 开头是元音<b>音</b> → an；shield 开头是辅音 → a"},
        {"b":"THE","hl":"the captain's helmet","zh":"<b>the</b> captain's helmet：船长只有一顶，大家知道是哪顶 → the"}],
```
- 键是台词 id，值是数组；`b` 徽章、`hl` 句中要加下划线的连续词（忽略大小写和标点，必须和台词原词一致）、`zh` 中文讲解。
- 文件开头可以有 `"_说明"` 键（引擎忽略）。
- **写法规则：** 只给含本集考点的句子写，没有就不写；一句最多 2 条；`zh` 18–30 个汉字（上限 30 字），格式“**形式** + 冒号 + 为什么”；和知识地图、练习的说法一致。收藏卡句子 `card_*` 可以写，`star` 不写。ep16 写了 14 句中的 13 句，ep02 写了全部 15 句。

**徽章目录**（`engine/badges.js` 的 `ROLES`，新集需要新徽章时向 Change 申请，由 Willo 加）：
| 徽章 | 名称 | 含义 | 什么时候用（样板） |
|---|---|---|---|
| `S` | 主语 | 谁 | 句子成分（第 1 集）；ep16 收藏卡背面 I |
| `V` | 谓语 | 做什么 | 句子成分；ep16 收藏卡 enjoy |
| `L` | 系动词 | 是 / 看起来 | be、look、feel 等系动词 |
| `O` | 宾语 | 什么 | 句子成分 |
| `C` | 表语 | 怎样 / 在哪 | 系动词后的成分 |
| `N` | 名词 | 人和东西的名字 | ep02 知识地图 M1 |
| `A` | a/an | 一个未指定的东西 | ep02 q1、hints l01/l03/l05 |
| `THE` | the | 能认出哪一个 | ep02 q2、q6 |
| `ZERO` | 不填冠词 | 这里不加冠词 | ep02 q5、hints l10/l12 |
| `OWNER` | 谁的 | 所有关系 | ep02 q3、宝物卡 |
| `COUNT` | 数量 | 物件或单位 | ep02 q4、hints l09/l11 |
| `TD` | 不定式 | to do · 还没做 / 目的 | ep16 |
| `DO` | 省略 to 的不定式 | do · 光杆动词 | ep16 let/make/had better |
| `ING` | 动名词 / 现在分词 | doing | ep16 |
| `ED` | 过去分词 | done · 被…的 / 已完成 | ep16 |
| `ADJ` | 形容词 | 什么样的 · 修饰名词 | 名词前（或 something 后）的形容词：ep07 `tall pink trees`、`something shiny`；系动词后的形容词仍用 `C` |
| `ADV` | 副词 | 怎样做 / 程度 | 修饰动词的副词及其比较级：ep11 `quietly`、`more quickly than`、`most carefully` |
| `REL` | 定语从句 | 挂在名词后的说明牌 | who/which/that 引导的从句：ep17 `who found the compass`、`which Grandpa left` |
| `INV` | 倒装 | 帮手或动词跑到主语前 | So do I / Neither can I / Here comes… / Never have I…：ep17；也可用来对比代词主语不倒装（Here it is） |

圆形边框 = 句子里的“角色”或修饰/结构（`ADJ ADV REL INV` 也是圆形），八角形边框（`TD DO ING ED`）= 动词的“形式”。**徽章用法细则（第二批审稿定）：** ① 时间/地点介词短语作状语（`at three o'clock`、`between Leo and Mia`、`from the gate to the finish line`）→ `ADV`，`zh` 写明“介词短语作状语”；② 频率副词（always/usually/often/sometimes/never）→ `ADV`；③ 数词、序数词、年份（`the twentieth runner`、`nineteen seventy-five`）→ `COUNT`；④ 进行时、完成进行时等动词组（`was playing`、`We're meeting`、`has been waiting`）整体标 `V`，`ING` 只用于非谓语的动名词/分词（同 ep16）；⑤ `zh` 不超过 30 个字。
**连词（and/but/so/or）没有专门徽章**：不要硬标成 `V`，可改标旁边的谓语并在 `zh` 里点出连词。**不要用 emoji 当语法图标**；emoji 只用在活动标题和按钮上。

---

## 6. `lines.json` 与逐词对齐

```json
// ep16/audio/lines.json
"l05": {"who":"mia","text":"But Biscuit is too small to guard anything.","dur":3.448,
        "words":[["But",0.0,0.18],["Biscuit",0.18,0.78], … ,["anything.",2.36,3.0]],"align":"whisper"}
```
- 由 `tools/make_lines.py` 从 `台词.md` 生成（`who`、`text`），再用 `tools/align.py` 写入 `dur`、`words`、`align`。不要手改时间。
- 每个 mp3 都要有一条，包括 `ex_*`（检查器对不在 lines.json 里的 mp3 会提醒）。`card_*` 和 `star` 必须有，因为会显示字幕。
- 合格标准：`align` 全部是 `"whisper"`（出现 `"proportional"` 说明录音和台词不一致）；词的开始时间递增；`dur` 和 mp3 实际时长相差 ≤0.08 秒（检查器会核对）。
- 高亮规则（引擎保证）：只按音频播放时间走，声音出来之前不亮，不回跳。

---

## 7. 内容标准

### 7.1 一集的规模（以 ep16 / ep02 为准）
| 项目 | 标准 | ep16 | ep02 |
|---|---|---|---|
| 故事段数 | 3–4 段 | 4 段 | 4 段 |
| 每段句数 | 2–6 句，全集 12–16 句 | 6/2/3/3 = 14 | 4/4/3/4 = 15 |
| 故事插图 | 4–9 张 | 5 张 | 9 张 |
| 练习活动 | 6–8 个（不含地图和收藏卡） | 8 个 | 6 个 |
| 每个活动的题数 | 2–5 题；拖拽 8–12 个词块；连线 4–6 对 | 1–8 | 2–4 |
| 收尾小测 | 最后一个练习是 `tf` 综合小测，6–8 题，覆盖全集考点，对错大约各半 | 8 题（4 对 4 错） | 2 题（ep02 偏少，新集按 6–8 题做） |
| 收藏卡选项 | 3–5 个 | 5 | 3 |
| 一集总时长 | 25–40 分钟 | | |
| 音频总数 | 35–60 个 | 56 | 37 |

### 7.2 故事
- 按 `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/grammar_fasttrack_final.md` 第七章本集的详案：地点、🎯 核心问题、📌 知识点、📖 故事片段、⭐ 成果、🗺️ 解锁和线索。可以改写，但地点、成果和线索要保留。
- 本集语法要**自然地**出现在故事里，每段至少 2 句含考点；练习句子用本集人物和情节（ep16 的练习都围绕招聘会和袜子）。
- 主线：爷爷年轻时的罗盘，“C. C. was here” 线索贯穿全剧（ep02 刻在棋盘铜牌上，`sections.S4` l13 的 overlay）；每集 Biscuit 都会偷或找一样东西；每集结尾得到一颗星。
- 句子短：每句 5–14 个词，初一能读懂；生词每集不超过 5–6 个，而且要有画面支持。
- 语气：温暖、幽默、有一点小冒险，不吓人；不说教。
- 英式拼写：favourite、colour、practise（动词）、centre、neighbour、grey；英式用词优先（biscuit、trousers、holiday）。

### 7.3 角色设定（必须一致）
| 角色 | 外观（生图描述） | 性格 | 配音（§10.1） |
|---|---|---|---|
| **Leo** | 12 岁男孩，短寸头，白色 polo 衫（藏青色领口和袖口），蓝绿色运动裤，白色运动鞋。**参考孩子的衣服和发型，不能用孩子的脸**，脸要原创 | 胆大、马虎、爱足球和游戏，常第一个冲出去 | 英式活泼男孩 |
| **Mia** | 淡紫色衣服，拿速写本 | 细腻，略胆小，爱问问题、爱画画 | 英式女孩，细腻 |
| **Sam** | 橙色运动风 | 话多、大嗓门、爱开玩笑、跑得快 | 英式活泼男孩，大嗓门 |
| **Lily** | 绿白配色，戴眼镜 | 学霸，会解释原理，常常是她破案 | 英式聪明女孩 |
| **Biscuit** | 浅棕色卷毛小狗 | 爱偷 / 找袜子，每集都在 | 不说话 |
| **Grandpa** | 慈祥老人 | 爱讲“我年轻时……”，会下象棋，罗盘原主人 | 英式慈祥老爷爷 |
| 本集新角色 | 可爱不吓人，例 ep16 Grumble：tall, fluffy, friendly purple monster with big round eyes and small horns | 一句话性格 | 选一个固定音色并记入台词表 |

### 7.4 中文讲解风格
- 全部简体中文，对初一孩子说话：短句、口语、具体，不用术语堆砌；第一次出现的术语要配“人话”（例：“不定式（to do）= 还没做的事”）。
- 长度：活动 `desc` 1–2 句（≤60 字）；答错解释 `h`/`hint`/`why` 一句（15–35 字）；`tip` 总结 1–2 句，最好是口诀（ep16 forms：“to do 还没做，doing 正在做 / 当名词，done 被做或已完成”）。
- 重点词用 `<b>` 加粗，每句最多 2 处。

### 7.5 答错反馈规则
- 每个干扰项、每种常见错误都要有**针对性**的中文解释：指出线索在哪，引导思考，不直接说答案（ep02 的 `hint` 都是问句：“她想拿的是特定的一顶，还是任意一顶？”）。
- 第二次错才给答案（引擎自动），给了答案也要孩子自己做一遍。
- 不说“错了”“不对”，引擎统一显示“再想想：”。
- `typed` 题至少为 2 种常见错误写 `wrong` 规则（如 ep16 attr：`losing`、`losed`）。

### 7.6 教辅覆盖表与勘误
- 教辅目录：`/Users/tianchangchun/Study/03_英语/02-语法/PDF资料库/初中英语知识点（全）/`（`00-索引.md` 到 `20-构词法.md`）。
- `docs/COVERAGE.md`：教辅每个知识点一行 → 出现在哪里（故事第几句 / 哪个活动第几题 / 知识地图 / Word）→ ✅ 覆盖 或 ⏭ 暂不放（写原因，如“超出初一”）。格式见 `ep16/docs/COVERAGE.md`、`ep02/docs/COVERAGE.md`。
- 教辅有错或不严谨（规则绝对化、例句不地道、美式和英式混用等）：在 COVERAGE.md 单独写“教辅勘误”一节：原文 → 问题 → 正确说法。网页按正确说法做，不照抄错误。例：ep02 知识地图 M5 “不用‘无生命只能用 of’的死规则”。

### 7.7 语法正确性
- 所有英文（故事、练习、选项、干扰项、收藏卡、结尾、Word）逐句检查语法和英式拼写；故意写错的句子**只能**出现在 `fix`、`tf` 的错句、`choice`/`pick` 的干扰项、`typed`/`rewrite` 的 `wrong` 规则里。
- 干扰项必须**确实错**或**在这个情境里不合适**，不能是另一种也说得通的说法（例：ep02 q2 用画面和情境锁定 a / the）。
- 讲解不说绝对化规则（“永远”“一定”），有例外的写“一般”“常常”。

---

## 8. 题型选择指南

**原则：** 每道题按考点选最合适的题型，一集里题型多没关系；**不做听力题**；**所有音频只在答对或完成后播放**，作为奖励，答题前不播任何会泄露答案的声音。

| 要考的能力 | 首选题型 | 样板 |
|---|---|---|
| 认形式、按类别分 | `drag`（box） | ep16 forms 三种形式；ep16 verbs 只接 to do / 只接 doing / 都行 |
| 带图的名词或物品分类 | `sort` | ep02 q4 可数 / 按份量 |
| 固定搭配 → 后接形式 | `match` | ep16 verbs 第 2 部分 |
| 同一词两种用法的意思区别 | `pick`（两图对比） | ep16 meaning stop/remember/forget/try |
| 根据情境选对的说法 | `choice` | ep02 q2 a / the |
| 写出词形变化（词尾、过去式、比较级、复数、所有格） | `typed` | ep16 feel、attr；ep02 q1、q3 |
| 几个功能词里选一个填空（冠词、介词、代词） | `blank` 或 `drag`（blank 模式） | ep02 q5 |
| 发现并改正典型错误 | `fix` | ep16 to |
| 语序（疑问句、副词位置、主语结构） | `order` | ep16 subject 第 1 题 |
| 句型转换（It 形式主语、主动变被动、肯定变否定） | `rewrite` | ep16 subject 第 2 题 |
| 全集复习 / 判断说法是否地道 | `tf` | ep16 tf（小测）；ep02 q6（引导式） |

一个活动里题型尽量一致（`steps` 里可以混，如 ep16 subject = `order` + `rewrite`，ep02 q4 = `sort` + `typed`）。同一个知识点至少在两种题型里出现（认 → 用）。

---

## 9. 画面标准

### 9.1 风格块（每个提示词开头原样使用）
```
Pixar-like 3D animated film still, 16:9 (1920x1080), warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
```
（摘自 `ep16/docs/PROMPTS.md` 第 2 行）后面接角色描述（§7.3 外观列，英文，见 `ep16/docs/PROMPTS.md` 的 “Cast (keep on-model)” 行）和画面内容。

### 9.2 角色设定图
生图时用 Mac 上的 `台词/第16集_插图/character_sheet_ref.jpg` 作参考图保持人物一致。**这张图涉及隐私，不能放进公开仓库**。

### 9.3 尺寸和压缩
| 类型 | 比例 / 尺寸 | 体积 | 样板 |
|---|---|---|---|
| 故事插图 `NN_*.jpg` | 16:9，1920×1080（最低 1280×720） | ≤300KB 左右（jpg 质量约 82，progressive） | ep02 1920×1080 约 280KB；ep16 1280×720 约 250–400KB |
| 方图 `pick_*.jpg` | 1:1，800×800 或 1024×1024 | ≤250KB | ep16 800×800 约 100KB；ep02 1024×1024 约 240KB |
| 物品图 `item_*.jpg` | 1:1，768×768，干净浅色背景 | ≤130KB | ep02 |
单集资源总量（图 + 音频）控制在 10MB 以内。

### 9.4 四宫格方图
- 一次生成 2×2 四宫格，2048×2048，每格约 1024，格间约 16px 白线；四格内容和顺序在 `docs/PICTURE_CHOICE_PROMPTS.md` 写死（参考 `ep16/docs/PICTURE_CHOICE_PROMPTS.md`）。
- 切图：按白线实际位置裁剪（handoff 第 4 步有 Pillow 代码），缩到 800×800。
- 四格人物不一致时，改成单张 1024×1024 逐张生成。
- 同一题的两张图要构图相似，只在关键差别处不同（ep16 stop1 不再叫 / stop2 停下来闻）。

### 9.5 图里不能有字
牌子、黑板、石碑、纸条一律画成空白，把要显示的英文写进 `sections` 的 `overlay`（`<div class="carve">…</div>`）。默认位置是图片中上方（`left:50%; top:36%`）的发光牌子；要贴到图中某个位置，在 `episode.css` 里按**图片百分比**改 `.carve` 的位置，参考 `ep02/episode.css`（棋盘铜牌：`left:58%; top:83.4%`，旋转 -6°）。

### 9.6 布局 A（引擎自动，验收时检查）
插图永远完整显示、不裁切，空白处是同图放大模糊变暗的背景，字幕卡不压图：竖屏手机图在上、字幕卡在下；横屏手机图在左（约 60% 宽）、字幕在右；电脑图居中、字幕卡在下（宽 960px）。叠字在三种屏幕上都贴在图的同一位置。

---

## 10. 声音标准

### 10.1 音色表（每个角色全剧固定）
| 角色 | lines.json `who` | 台词表角色名 | 建议音色 | 剪映音色（CoCo 在 ep16 实际使用） |
|---|---|---|---|---|
| 旁白 | `narrator` | 旁白 | 英式温柔女声，讲故事语气 | 英伦学姐（English） |
| Leo | `leo` | Leo | 英式活泼男孩 | Energetic Male(English) |
| Mia | `mia` | Mia | 英式女孩，细腻 | Adorable Girl(English) |
| Sam | `sam` | Sam | 英式活泼男孩，大嗓门 | Gentle Guy（English） |
| Lily | `lily` | Lily | 英式聪明女孩 | Gentle Girl（English） |
| Grumble / 本集怪兽 | `monster` | Grumble（怪兽） | 低沉憨厚男声 | 英文男神 |
| 爷爷 | `grandpa` | Grandpa（爷爷） | 英式慈祥老爷爷 | 第 1 集用过，未在 ep16 使用 |
新角色：在 `tools/make_lines.py` 的 `W` 里加映射（这是 tools 里唯一允许 Codex 改的地方，需要在汇报里说明），在 `episode.js` 的 `speakers` 里加中文名和颜色，在台词表写明音色。注：除旁白外，其他音色是否英式尚未人工核验。

### 10.2 文件格式
mp3，44.1kHz，立体声，192kbps；一句一个文件；句首句尾静音 ≤0.3 秒；删掉 macOS 的 `._*` 文件。台词必须和 `台词.md` 一字不差（标点也算）。练习只录**正确句子**。

### 10.3 响度统一（按 Codex 在 `tools/AUDIO_LEVELS_20261011.md` 的做法）
- 每条测量后统一到 **-19 LUFS**（FFmpeg loudnorm 口径），真峰值低于 **-1 dBTP**。
- 用**固定增益**完成，不压缩、不限幅，保留每句的轻重和语速；每次都从原始备份重新编码，用最终 mp3 回测并微调。
- 验收：每集条目范围和角色均值差都 <1 LU；时长、采样率、声道与原文件一致，所以 `lines.json` 不需要重对齐（检查器会核对时长）。
- 原始备份和测量记录放在 Mac 本地 `台词/` 目录，不上传公开仓库。处理后改 `audioVersion`。

---

## 11. 必须成立的交互行为（引擎提供，作为验收项）

| 行为 | 验收标准 |
|---|---|
| 手动翻句（默认） | 手机左右滑动、电脑 ← → 键、屏幕“◀ 上一句 / 下一句 ▶”；翻到一句就读一遍；最后一句的按钮显示“去闯关” |
| 自动播放 | 右上角“▶ 自动播放”连续读；一滑动或按键就回到手动 |
| 静音 | 手动照样能翻；自动模式按每句时长前进不会卡住；中途开关正常 |
| 语速 | 0.75 / 1 / 1.25x，切换后高亮仍同步 |
| 高亮 | 声音出来前不亮，逐词前进不回跳；语法提示的词有彩色下划线 |
| 重看上一节 | 练习中点“📖 重看上一节”，看完点“↩ 回到练习”，作答进度还在 |
| 故事画面没有弹窗 | 每段故事开始时练习卡片和提示都已关闭 |
| 音频只在答对后 | 答题前没有任何练习音频 |
| 拖拽不误翻 | 在拖拽、连线题上横向拖动不会翻故事 |
| 手机键盘 | 不自动大写、不自动纠错，按“完成”或回车即提交 |
| 星星回罗盘 | 星星飞进第 `no` 个槽，点亮，显示 N / 17；之前完成的集也亮 |
| Word 下载 | 知识地图和完成卡片上的“📥 下载知识点（Word）”在 iPhone 和安卓都能下载并打开 |

---

## 12. 知识点 Word

- 生成脚本：照 `tools/make_docx_ep16.py`（用法：`python3 tools/make_docx_ep16.py <输出.docx>`，需要 `pip install python-docx`）或 `ep02/tools/make_knowledge.py` 复制成 `tools/make_docx_epNN.py`。
- 输出：`epNN/downloads/epNN_<英文名>.docx`，文件名 ASCII；中文下载名写在 `download.name`，格式 `罗盘冒险队_第N集_<主题>_知识点.docx`。
- 内容结构（ep16 的样子）：标题（第 N 集 · 地点 · 语法主题）→ 每个知识点一节（徽章色标题 + 中文讲解 + 2–3 个英文例句，例句尽量用本集故事）→ 对比表（易混点，如 to do vs doing）→ 常见错误（错句 → 正句 → 为什么）→ 本集口诀。A4，1–3 页，配色用黄铜和徽章色。
- 内容和知识地图、覆盖表一致；生成后用 python-docx 打开检查一遍能读。

---

## 13. 完成标准（Definition of Done）

一集只有全部满足下面各项才能交给 Change：

1. **检查器**：`node tools/validate_episode.mjs epNN` 0 个错误；每条 ⚠ 提醒都看过并处理或说明。
2. **自动通关**：`?mute=1&fast=1` 下用 `window.__next()`（翻句）和 `window.__auto()`（自动作答）从头走到结尾，`window.__done` 为 true，控制台 0 报错（favicon 404 除外），无 404。
3. **测试尺寸**：竖屏 390×844（触摸）、小屏 360×740、横屏 844×390、电脑 1280×800。每种尺寸都看故事页和至少 2 个练习。
4. **截图**（存 `epNN/shots/`，不提交）：每种尺寸至少 故事第 1 句、有叠字的那句、每种题型各一张、知识地图、收藏卡、完成页。
5. **第 11 节交互验收**逐项通过；至少真开声音听 3 句故事和 3 个奖励音。
6. **内容自查**：覆盖表和勘误写好；英文逐句复查（§7.7）；插图和 `ep16/illus/` 并排看风格一致、Leo 不是孩子的脸、图里没字；hints 内容正确。
7. **Git 范围**：`git status` 只有 `epNN/`（和可选的 `tools/make_docx_epNN.py`、`tools/make_lines.py` 的 W）；没有 `engine/`、根目录、其他集。
8. **线上验证**：push 后 `curl` 确认 `epNN/index.html` 的 `data-v` 是新值、`audio/l01.mp3` 返回 200，再用线上地址跑一次第 2 条。
9. **汇报**（发给 Change，简体中文，口语化，不讲技术细节和 commit 号）：
   ```
   第 N 集《地点》做好了：https://tiancc1212.github.io/compass-preview/epNN/
   这一集讲：（一两句话，语法点 + 故事）
   练习：1. 活动名 —— 题型，为什么这样考 …（每个活动一行）
   声音：哪几句可能要重录、口音情况
   插图：哪几张请你看一下
   需要你决定：教辅勘误怎么处理 / 难度 / 其他
   ```

---

## 14. 变更流程和需要 Change 决定的事

**必须先经 Change 同意才能做：**
- 故事和题目计划（第 2 步结束时给 Change 看简要版）；
- 改动 `grammar_fasttrack_final.md` 里本集的地点、成果、线索；
- 新角色、新音色；
- 任何引擎相关需求：新题型、新徽章、改提示文字、改布局（由 Change 转给 Willo）；
- 教辅勘误的处理方式；
- 删除或重做已上线的内容；
- 修改别的集。

**需要 Change 验收的事：** 插图观感、配音听感（尤其关键语法词，如 -ed 词尾读得清不清楚）、题目难度。

**发现规格书和实际不符或规格不够用时：** 不要自己发明新做法，在汇报里写清楚，由 Change 和 Willo 更新本规格书。
