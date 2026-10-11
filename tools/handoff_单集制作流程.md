# 罗盘冒险队 · 单集制作交接文档（给 Codex）

> 写于 2026-10-11，同日改为**共享引擎**版本。照着这份文档，在 Change 的 Mac 上做出新的一集。
> 你（Codex）**看不到** Willo 的工作机（/workspace），下面列出的所有文件都已经放进 GitHub 仓库或 Mac 本地，路径以本文为准。

## 0. 当前硬规则（先读）

- **新的一集只写内容，不写代码。** 播放器、题型、布局、结尾动画都在共享引擎 `engine/` 里；一集的目录只放 `index.html`（标准外壳）、`episode.js`（内容配置）、`audio/`、`illus/`、`downloads/`、`docs/`，需要时加 `episode.css`（只能写本集插图上叠字的位置）。
- **不要改 `engine/`。** 需要新题型或引擎有 bug，先告诉 Change，由 Willo 改引擎（改一次，所有集一起受益）。引擎一改会影响 ep02 和 ep16，所以必须两集都回归测试。
- 不要修改第 1 集（仓库根目录 `index.html app.js …`，它还是旧的独立代码，没有迁移）。不要动别的集的目录。
- 不动 Change 的个人网站 stemlearn.cloud，只发布到预览仓库 `compass-preview`。
- 只用免费工具。
- 给 Change 的说明一律用**简体中文、通俗说法**。
## 1. 项目背景

- 给 Change 的孩子（初中，主角 Leo 以他为原型）做一套互动英语语法课。整体剧情和 17 节课的安排在
  `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/grammar_fasttrack_final.md`；背景、家长决定、否决过的方向在同目录 `handoff.md`（**不要覆盖它**）。
- 故事：冒险队（Leo、Mia、Sam、Lily、小狗 Biscuit）拿着爷爷的罗盘穿越各地，每集找回罗盘上的一颗星（共 17 颗）。爷爷线索 “C. C. was here” 贯穿全剧。
- 每集形式：插图 + 英式配音逐句讲故事（字词高亮）→ 穿插练习题 → 知识地图 → 收藏卡 → 星星回到罗盘。

## 2. 用户偏好（全部必须遵守）

| 方面 | 要求 |
|---|---|
| 语言 | 讲解、提示、答错解释全部用简体中文；英文句子用英式拼写（favourite, colour, practise） |
| 配音 | 英式口音。由 Change 或另一个助手 **CoCo** 用**剪映**生成，一句一个 mp3。每个角色全集固定一个音色（见 §5 音色表） |
| 插图 | AI 生成，Pixar 风格 3D 动画电影画面；用角色设定图保持人物一致；**图中不能有任何文字** |
| Leo | 白色 polo 衫（藏青领口和袖口）、蓝绿色运动裤、白色运动鞋、短寸头；**参考孩子的衣服和发型，但不能用孩子的脸**，脸要原创 |
| 角色 | Mia：淡紫色衣服、拿素描本，细腻略胆小；Sam：橙色运动风，大嗓门；Lily：绿白配色、戴眼镜、聪明；Biscuit：浅棕色卷毛小狗，爱找袜子；爷爷 Grandpa；各集可以有新角色（如 ep16 的紫色怪兽 Grumble） |
| 图标 | 语法角色和形式用**黄铜罗盘徽章**（`engine/badges.js` 生成的 SVG，在 episode.js 里写徽章名即可），**不要用 emoji 当语法图标** |
| 动画 | 极简。只在答题时给短暂反馈（答对弹一下、答错抖一下），不做长过场 |
| 音频 | 练习题音频**只在孩子答对或完成之后**播放，作为奖励，绝不提前播（不能泄露答案）。**不做听力题** |
| 题型 | 每道题按考点选最合适的题型：分类拖拽、连线、看图选句、打字填空（词尾或原形变形）、改错（点错词再改）、连词成句、句子改写、判断对错。一集里题型多一些没关系 |
| 故事播放 | 默认**手动**一句一句看：手机左右滑动，电脑 ← → 键，屏幕上也有“◀ 上一句 / 下一句 ▶”。翻到一句就读一遍。右上角“自动播放”可以连续读，滑动或按键就回到手动。语速 0.75 / 1 / 1.25x。静音时手动照样能翻页；自动模式下按每句时长前进 |
| 回看 | 做练习时有“📖 重看上一节”，看完“↩ 回到练习”，进度保留 |
| 弹窗 | 故事画面只放插图和字幕。练习卡片和提示在练习结束时必须自动关掉，绝不能盖在故事上 |
| 设备 | 手机（390×844 竖屏）和电脑都要好用：触摸和鼠标、手机键盘输入、大按钮 |
| 内容 | 必须覆盖权威教辅对应章节（见 §4 第 1 步），并做覆盖表；教辅本身有错要指出来，不照抄 |

## 3. 已有资源（精确位置）

### 3.1 GitHub Pages 仓库

- 仓库：`https://github.com/tiancc1212/compass-preview`，分支 `main`，根目录直接发布（有 `.nojekyll`），没有构建步骤。
- 线上地址：第 1 集 `https://tiancc1212.github.io/compass-preview/`；第 2 集 `…/compass-preview/ep02/`；第 16 集 `https://tiancc1212.github.io/compass-preview/ep16/`。
- 部署方式就是 `git push`，Pages 一般 30 秒到 2 分钟后更新。
- Mac 上 `gh` 已登录 tiancc1212（https），`git push` 可直接用。仓库还没克隆到 Mac，第一次需要：
  ```bash
  mkdir -p ~/Study/compass && cd ~/Study/compass
  gh repo clone tiancc1212/compass-preview
  cd compass-preview && git pull
  ```
- 目录结构（2026-10-11 共享引擎之后）：
  ```
  .nojekyll
  index.html app.js base.css badges.js audio/ illus/ lib/ models/ fonts/   ← 第1集（旧的独立代码，别动）
  engine/                 ← 共享引擎（所有新集共用，别改）
    VERSION               引擎版本号，只有一个数字。改了引擎就 +1，所有集自动拿到新版
    engine.js             播放器 + 题型 + 布局逻辑 + 罗盘 + 结尾
    base.css layout.css   样式（统一布局 A 在 layout.css）
    badges.js             黄铜徽章 SVG：S V L O C TD DO ING ED N A THE ZERO OWNER COUNT
    lib/ models/ fonts/   three.js、3D 罗盘、字体
  ep16/  ep02/            ← 已迁移到引擎的两集，新集照着它们写
    index.html            标准外壳（10 行，不要自己加东西），<html data-v="N"> 是本集内容版本号
    episode.js            本集全部内容：标题、插图表、故事分段、练习、知识地图、收藏卡、结尾
    episode.css           （可选）只放本集插图上叠字的位置，ep02 用来把 “C. C. was here” 放在棋盘铜牌上
    audio/*.mp3  audio/lines.json  audio/hints.json
    illus/*.jpg  downloads/*.docx  docs/（设计文档，不影响网页）
  tools/
    validate_episode.mjs  内容检查器（见第 8 步），每次提交前必须跑
    align.py              逐词时间对齐（faster-whisper）
    make_lines.py         从 台词.md 生成 lines.json
    make_docx_ep16.py     Word 知识点生成脚本范例
    tests/                puppeteer 测试脚本 + package.json
  ```
- **缓存刷新（两个数字）：**
  - 改了本集内容（episode.js、lines.json、hints.json、episode.css）→ 把 `epNN/index.html` 里 `<html data-v="N">` 加 1。
  - 引擎的版本只在 `engine/VERSION` 一个地方（你不需要改）。外壳每次都会实时读这个文件，所以 Change 不用换链接。
  - 音频文件的缓存参数在 `episode.js` 的 `audioVersion`（例如 `'20261011-level1'`）；换了 mp3 就改成新的字符串。
  - 插图换了同名文件时，最好直接换个文件名。

### 3.2 Change 的 Mac 本地

- 台词文件夹：`/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/`
  - `台词.md`：所有集的配音台词表（第 1 集、第 16 集），新的一集追加进来。
  - `第16集_怪兽招聘会/audio/`：ep16 的 56 个 mp3；同目录 `README.md` 是 CoCo 的交付说明（格式可参考）。
  - `第16集_看图选句_生图要求.md`：生图要求范例。
  - `第16集_插图/character_sheet_ref.jpg`：**角色设定图**，生图时当参考图用。这张图出于隐私没有放进公开仓库，不要上传到 GitHub。
- 教辅：`/Users/tianchangchun/Study/03_英语/02-语法/PDF资料库/初中英语知识点（全）/`，按章节分成 `00-索引.md` 到 `20-构词法.md` 共 21 个 md 文件。

### 3.3 Mac 环境检查结果（2026-10-11）

| 工具 | 状态 |
|---|---|
| python3 3.13.3（homebrew） | ✅ |
| git、gh（已登录） | ✅ |
| ffmpeg / ffprobe | ✅ `/opt/homebrew/bin/ffmpeg` |
| node | ✅ `/usr/local/bin/node` |
| faster-whisper | ❌ 未安装，按下面命令装在仓库 tools/venv（不要提交 venv） |
| Google Chrome（测试用） | 测试脚本默认路径是 `/Applications/Google Chrome.app/...`，可以用环境变量 `CHROME=` 改 |

```bash
cd ~/Study/compass/compass-preview/tools
python3 -m venv venv && venv/bin/pip install faster-whisper numpy
echo "tools/venv/" >> ../.gitignore
cd tests && npm install          # 安装 puppeteer-core
```

## 4. 制作流程（逐步）

### 第 1 步：读教辅，规划覆盖面
1. 在 `grammar_fasttrack_final.md` 里找到本集的课次、语法点、故事地点、剧情钩子。
2. 读教辅对应章节的 md（例如第 16 集用的是 `10-非谓语动词.md`），列出所有知识点。
3. 写 `epNN/docs/COVERAGE.md`，格式参考 `ep16/docs/COVERAGE.md`：
   - 知识点 → 出现在哪里（故事第几句、哪道练习、知识地图）→ 状态（✅ 覆盖 / ⏭ 故意不放，写原因）。
   - **教辅有错误或说法不严谨的地方，单独列一节“教辅勘误”**，写清原文、问题和正确说法。

### 第 2 步：故事脚本 + 题目计划
- 故事 12 到 15 句，短句为主，分成 3 到 4 段（每段之后接一组练习）。尽量让本集语法自然出现在故事里，练习句也用故事里的人物和情节。
- 写 `epNN/docs/QUESTIONS_PLAN.md`，格式参考 ep16：每个活动写清题型、每道题、正确答案、干扰项、答错时的中文解释、对应音频文件名。
- 先把故事和题目计划用中文简要给 Change 过目，同意后再往下做。

### 第 3 步：写台词表（追加到 台词.md）
在 `台词/台词.md` 末尾加 `## 第 N 集 <标题>`，表头和列必须一致（`make_lines.py` 靠它解析）：
```
| # | 文件名 | 用途 | 角色 | 建议音色 | 英文台词 |
|---|---|---|---|---|---|
| 1 | `audio/l01.mp3` | 故事 | 旁白 | 英式温柔女声，讲故事语气，语速适中 | ... |
```
- 命名规则：故事 `l01`…`lNN`；练习 `ex_q<活动号>_<描述>`，例如 `ex_q3_stop1`、`ex_q8_4`；收藏卡选项 `card_<词>`；结尾 `star`。全部用小写 ASCII，一句一个文件。
- 角色列只能用这些名字：旁白 / Leo / Mia / Sam / Lily / Grandpa（爷爷） / Grumble（怪兽）。新角色要同时改 `make_lines.py` 里的 W 和 episode.js 里的 `speakers`。
- 英文必须是最终版，一字不差（标点也算），否则高亮对不上。练习题只录**正确句子**。
- 音色表（沿用，不要换）：

| 角色 | 建议音色 | CoCo 在 ep16 实际用的剪映音色 |
|---|---|---|
| 旁白 | 英式温柔女声 | 英伦学姐（English） |
| Leo | 英式活泼男孩 | Energetic Male(English) |
| Mia | 英式女孩，细腻 | Adorable Girl(English) |
| Sam | 英式活泼男孩，大嗓门 | Gentle Guy（English） |
| Lily | 英式聪明女孩 | Gentle Girl（English） |
| Grumble | 低沉憨厚男声 | 英文男神 |
| Grandpa | 英式慈祥老爷爷 | （ep1 用过，ep16 没有） |

  注：除旁白外，其他音色是否英式没有人工核验过。ep16 的 `ex_q3_stop1`（stopped barking）里 -ed 读得很弱，建议 Change 听一下。

### 第 4 步：插图
- 故事插图 4 到 6 张，16:9、1920×1080，放 `epNN/illus/01_xxx.jpg`。提示词写进 `epNN/docs/PROMPTS.md`，开头带统一风格块（参考 `ep16/docs/PROMPTS.md`）：`Pixar-like 3D animated film still, 16:9, warm cinematic lighting, soft depth of field, no text, no letters, no logos`，再加人物描述。牌子、石碑要留白，文字由网页叠加（`showImg(key, overlay)`）。
- 看图选句这类小图：用 **2×2 四宫格**，一张 2048×2048，每格约 1024，格子之间留约 16px 白线，四格顺序在文档里写死（参考 `ep16/docs/PICTURE_CHOICE_PROMPTS.md`）。四格里人物不一致时，改成单张 1024×1024 逐张生成。
- 生图要求文档放在 Mac 的 `台词/第N集_xxx_生图要求.md`，图片放进 `台词/第N集_插图/`，参考图用 `第16集_插图/character_sheet_ref.jpg`。
- 切图（Python + Pillow；没有就先 `pip install pillow`；按实际白线位置调整，可以先检查 1016–1031 像素那一段是不是白线）：
  ```python
  from PIL import Image
  boxes=[(6,6,1012,1012),(1036,6,2042,1012),(6,1036,1012,2042),(1036,1036,2042,2042)]  # 左上 右上 左下 右下
  im=Image.open('sheet_A.png')
  for name,b in zip(['a1','a2','a3','a4'],boxes):
      im.crop(b).resize((800,800),Image.LANCZOS).save(f'pick_{name}.jpg',quality=82,optimize=True,progressive=True)
  ```
  故事插图也压成 jpg，每张不超过 300KB 左右。

### 第 5 步：配音（Change / CoCo 来做）
- 告诉 Change：台词已经写进 台词.md 的第 N 集，请 CoCo 用剪映导出，放到 `台词/第N集_<标题>/audio/`，文件名和表里完全一致，句首句尾留白不超过 0.3 秒。
- 拿到以后检查：数量一致，没有多余的文件，删掉 macOS 生成的 `._*` 文件。

### 第 6 步：搭建新集目录（只写内容）
```bash
cd ~/Study/compass/compass-preview
mkdir -p epNN/audio epNN/illus epNN/downloads epNN/docs
cp ep16/index.html epNN/index.html          # 外壳：只改 <title>，data-v 从 1 开始
cp ep16/episode.js epNN/episode.js          # 照着改内容
cp "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第N集_xxx/audio/"*.mp3 epNN/audio/
python3 tools/make_lines.py "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/台词.md" "第 N 集" epNN/audio/lines.json
```

**`episode.js` 字段说明**（完整例子：`ep16/episode.js` 用了全部 ep16 题型，`ep02/episode.js` 用了图片选择、图片分拣、冠词空格、宝物卡）：

```js
export default {
 no:5,                                   // 集号 = 罗盘上的第几颗星（1–17）
 hud:'🧭 罗盘冒险队 · 第5集 ……', stars:'⭐ 第 5 颗星',
 start:{h1:'标题', subt:'一句话简介', go:'🧭 出发：……'},
 theme:{bg:'#1b1020', stage:'#2a1830'},  // 背景色（插图之外的底色，基本被模糊背景盖住）
 audioVersion:'20261011-level1',         // 音频缓存参数，换 mp3 就改
 rewardWait:false,                       // true：答对后等奖励音播完才能点“下一题”，最后一题自动继续（ep02 用）
 css:false,                              // true：加载本集 episode.css
 download:{href:'downloads/ep05_xxx.docx', name:'罗盘冒险队_第5集_….docx', label:'📥 下载知识点（Word）'},
 img:{gate:['illus/01_gate.jpg','中文说明'], …},  firstImg:'gate',
 sections:{S1:[{id:'l01', zh:'中文字幕', img:'gate', overlay:'<div class="carve">文字</div>'(可选), fx:'door'(可选音效)}, …], S2:[…]},
 flow:['S1','forms','feel','S2','verbs', …,'map','card'],   // 顺序：故事段和活动交替，最后是知识地图和收藏卡，之后引擎自动放结尾
 activities:{ forms:{…}, feel:{…}, … },
 ending:{img:'job', say:{id:'star', zh:'第 5 颗星回到了罗盘！'}, html:'<h2>🎉 第 5 集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 …</p><p>{download}</p>'}
};
```
- html 字符串里可以用：`{{b:TD:34}}` = 34px 的 TD 徽章；`{download}` = Word 下载按钮；`{n}`（只在结尾）= 已收集星数。
- 新角色：在 `speakers:{grumble2:['怪兽 Bob','#7b4fd0']}` 里加，同时改 `make_lines.py` 的 W。

**活动类型 `type`：**
| type | 用途 | 关键字段 |
|---|---|---|
| `drag` | 分类拖拽 / 拖进句子空格 | `title desc mode:'box'|'blank' slots:[{k,b,title,sub}|{k,ctx,pre,post}] chunks:[{t,k,h}] tip audio? prog:[共几轮,第几轮]`；`k:null` 是干扰项 |
| `steps` | 一张卡片里连续几道题 | `title badge?(标题前的徽章) desc tip steps:[…]` |
| `seq` | 把几个活动连成一个（如分拣 + 连线） | `parts:[{type:'drag',…},{type:'steps',…}]` |
| `map` | 知识地图 | `html button` |
| `card` | 收藏卡 | `variant:'phrase'`（选一个短语填进句子，背面是徽章词块，ep16）或 `'treasure'`（选一件带图的宝物，ep02），音频 `card_<k>` |

**`steps` 里的题型 `kind`：**（每题都可以有 `au`：答对后才播放的奖励音频）
| kind | 题型 | 字段 |
|---|---|---|
| `match` | 连线 | `pairs:[{t,k,ex,au,h}] targets:[{k,b,t}]` |
| `pick` | 两张图各选一句 | `verb rule pics:[{img,good,bad,au,why}]`（图 `illus/<img>.jpg`） |
| `choice` | 一个情境（可带图）选一句 | `ctx img? good others:[] hint why?` |
| `typed` | 打字填空（词尾或变形） | `ctx? pre post ans accept? ph? why hint wrong:[{re:'ed$',zh:'…',not?}]` |
| `fix` | 点错词再选改法 | `ctx s wi(错词序号,从0数) fix:[['删掉 to',1],['改成 too',0]] good why` |
| `order` | 连词成句 | `q words shuffled why firstHint hint` |
| `rewrite` | 整句改写 | `q src ph answers:['小写去标点的标准答案'] show normalize? wrong hint why` |
| `tf` | 判断对错 | `s ok:true/false fix(错句的改正) why`；加 `hint labels:['这样说可以','需要改一下'] ctx` 就是 ep02 的引导式判断 |
| `sort` | 带图词卡分进两个盒子 | `boxes:[{k,t}] items:[{w,zh,img,box,why}] why` |
| `blank` | 把 a/an/the/不填 拖进一个空 | `ctx pre post ans opts? hint why` |

- 答错：`typed / rewrite` 按 `wrong` 规则给针对性提示（`re` 是正则，`not:true` 表示“不匹配时”），都不匹配就用 `hint`；连错两次给出答案。
- 测试入口：`?jump=<活动名>` 直接进某个活动（图和“重看上一节”自动按 flow 推算）；`?mute=1` 静音、`?fast=1` 答完自动下一题、`?rm=1` 关动画。
- **Word 知识点：** 照着 `tools/make_docx_ep16.py` 复制一份 `tools/make_docx_epNN.py`，改成本集内容（中文讲解 + 英文例句 + 对比表 + 常见错误，和知识地图、覆盖表一致），运行 `pip install python-docx && python3 tools/make_docx_epNN.py epNN/downloads/epNN_<ascii名>.docx`。文件名只用 ASCII；中文名写在 `download.name`。
- **结尾星星回罗盘**是引擎自动做的：背景变暗、罗盘放大，星星从收藏卡飞进第 `no` 个槽，点屏幕可跳过；进度存在 `localStorage` 的 `cc_stars`（各集共用）。
### 第 7 步：逐词时间对齐
```bash
cd ~/Study/compass/compass-preview/tools
venv/bin/python align.py ../epNN            # 第一次会下载约 140MB 模型
venv/bin/python align.py ../epNN --model small.en   # 想更准就用这个，会慢一些
```
- 输出里每句都应该是 `whisper match=100%`。出现 `proportional` 或匹配率低，说明录音和台词不一致，要回去核对，必要时请 CoCo 重录。
- 抽查录音和台词是否一致：用 faster-whisper 不带提示词转写一遍，和台词逐词比较。识别把 favourite 写成 favorite、把 one 写成 1 都算正常；但关键语法词（比如 -ed 词尾）听不清的要报告给 Change。

### 第 8 步：测试清单
本地起服务：`cd ~/Study/compass/compass-preview && python3 -m http.server 8716`，浏览器打开 `http://localhost:8716/epNN/`。
**先跑内容检查器**（必须 0 个错误）：`node tools/validate_episode.mjs epNN`。它会检查：flow 和活动对得上、每句台词有 mp3 和逐词时间、mp3 实际时长和 lines.json 一致（不一致就要重跑 align.py）、所有奖励音频和插图存在、题型字段齐全、hints.json 里的词在句子里找得到、徽章名正确、下载文件存在。
自动测试：参考 `tools/tests/` 里的脚本（全部活动可以用 `window.__auto()` 自动作答、`window.__next()` 翻句、`window.__state()` 看当前状态），截图存 `epNN/shots/`（不要提交）。

- [ ] 手机 390×844（触摸）和电脑 1280×800 都把全集从头玩到尾，控制台 0 报错（favicon 404 可以忽略）
- [ ] 每种题型都试过答错（有中文解释）和答对
- [ ] 练习音频只在答对或完成后播放，答题前没有任何音频（可以拦截 `Audio.play` 记录）
- [ ] 高亮不闪：记录 `window.__hl`（[句子id, 词序号, 音频时间]），每句开头词序号单调递增，不回跳；有声音之前不亮
- [ ] 手机左右滑动翻句，电脑 ← → 翻句；在拖拽或连线题上横向拖动**不会**翻故事
- [ ] 静音：手动模式能翻页；自动模式按时长前进，不会卡住；中途开关静音正常
- [ ] 语速切换后高亮仍然同步
- [ ] “重看上一节”能看完再回到练习，原来的作答进度还在
- [ ] 每段故事开始时 `#panel` 是 display:none（故事画面上没有卡片或提示）
- [ ] 手机键盘输入：不会自动大写、不会自动纠错，按“完成”或回车就能提交
- [ ] 图片和音频都没有 404；首屏加载时间可以接受（单集 7MB 左右）

### 第 9 步：部署
```bash
cd ~/Study/compass/compass-preview
node tools/validate_episode.mjs epNN     # 0 个错误才能提交
git status                               # 确认只改了 epNN/（以及 tools/make_docx_epNN.py），没有 engine/、别的集或根目录文件
git add epNN tools/make_docx_epNN.py && git commit -m "epNN: <标题>" && git push origin main
# 等 Pages 更新后验证
curl -s "https://tiancc1212.github.io/compass-preview/epNN/index.html?t=$RANDOM" | grep -o 'data-v="[0-9]*"'
curl -sI https://tiancc1212.github.io/compass-preview/epNN/audio/l01.mp3 | head -1   # 应为 200
```
然后用线上地址再跑一次自动测试。以后每次更新内容：`data-v` 加 1，再 commit 和 push。

### 第 10 步：向 Change 汇报（中文、口语化）
- 先给线上链接（带 `?v=`），再用一两句话说这一集讲什么。
- 列出每个活动用了什么题型、为什么这么选。
- 说明音频检查结果（哪句可能需要重录）和口音情况。
- 列出需要 Change 决定或检查的事（比如教辅勘误、某张插图）。
- 不讲技术细节，不要说“我部署了 commit xxx”这种话。

## 4.5 统一布局标准（布局 A，2026-10-11 起所有集都用）

Change 已确认：**插图永远完整显示，不裁切**；空白处不用纯色，而是用同一张图放大、模糊、变暗做背景；字幕卡不压在图上。

| 屏幕 | 布局 |
|---|---|
| 竖屏手机 | 图在上（宽度占满，16:9），下方是羊皮纸字幕卡，填满剩余空间 |
| 横屏手机 | 图在左边（约 60% 宽，占满高度），字幕卡在右边 |
| 电脑 | 图居中（下方留约 300px），字幕卡在图下方，宽 960px |

- **引擎自动做好**，新集什么都不用写。样式在 `engine/layout.css`。
- 插图上叠字（`overlay`）的位置按**插图本身的百分比**算（引擎把图层大小设成图片的实际显示框），所以在三种屏幕上都贴在图的同一个位置。默认样式是图中上方的一块发光牌子；要放到别处，在 `episode.css` 里改 `.carve` 的 `left / top`（参考 `ep02/episode.css`）。
- 测试：竖屏 390×844、小屏 360×740、横屏 844×390、电脑 1280×800 都截图看一遍。
### 逐句语法提示（hints.json）
- **位置：** `epNN/audio/hints.json`，键是台词 id，值是数组：
  ```json
  "l05": [{"b":"TD","hl":"too small to guard","zh":"<b>too … to do</b> = 太……而不能"}]
  ```
  - `b`：徽章，可选 TD / DO / ING / ED / S / V / O / C / N / A / THE / ZERO / OWNER / COUNT（和 engine/badges.js 一致，检查器会核对）。
  - `hl`：句子里要加下划线的连续词，忽略大小写和标点，要和台词原文的词一致。
  - `zh`：一句话中文讲解，最多 25 个字左右，可以用 `<b>` 加粗。
- **写法原则：**
  - 只给含**本集考点**的句子写，没有考点的句子不写，不要硬凑。
  - 一句最多两条。
  - 讲“形式 + 意思”，例如“stop doing：停止正在做的事”。
  - 和知识地图、练习的说法保持一致；写完逐条检查语法是否正确。
- 收藏卡句子（`card_*`）也可以写，结尾的 `star` 不写。

## 5. 常见坑
- 台词改了一个字，就要重新录那一句，再跑 align.py。检查器会发现 mp3 时长和 lines.json 不一致。
- 新增角色要同时改：`episode.js` 的 `speakers`、`make_lines.py` 的 W、台词表的角色列、音色表。
- 剪映导出的打包文件里可能夹带 `._xxx.mp3`（macOS 元数据），要删掉。
- 改了内容忘了把 `data-v` 加 1，Change 手机上可能看到旧版（最多 10 分钟）。
- `episode.js` 是 JavaScript：字符串里有英文撇号（`Don't`）时用双引号或反引号包起来；多行 html 用反引号。
- 想要引擎没有的题型或效果：不要在集目录里写代码，告诉 Change，由 Willo 加进引擎。
## 6. 交付前自查清单（每集交付前逐项打勾）

- [ ] **覆盖表核对：** 把 `epNN/docs/COVERAGE.md` 和教辅原章节逐条对照，每个知识点都标了 ✅ 或 ⏭（附原因）；“教辅勘误”一节已写好
- [ ] **英文语法复查：** 台词.md 里本集每一句英文（故事、练习、收藏卡、结尾）、episode.js 里的题干、选项、干扰项和 Word 例句，都逐句检查语法和英式拼写；故意写错的句子只出现在改错题和判断题里
- [ ] **插图风格对比：** 把新插图和 `ep16/illus/` 并排看，画风、光线、人物服装发型都一致；Leo 没有用孩子的脸；图里没有文字
- [ ] **内容检查器：** `node tools/validate_episode.mjs epNN` 0 个错误，提醒都看过
- [ ] **布局和提示：** 四种屏幕截图都看过（布局 A 由引擎自动套用）；hints.json 覆盖了所有含考点的句子，内容正确
- [ ] **结尾和下载：** 结尾星星飞回罗盘、槽位点亮、显示 N / 17；知识地图和结尾卡片上的“下载知识点（Word）”能下载并打开，内容和知识地图一致
- [ ] **第 8 步测试清单全部通过**（手机加电脑、答对才放音频、高亮不闪、滑动不和拖拽冲突、静音、重看上一节、卡片不盖故事）
- [ ] **需要 Change 决定的事项单独列出来**，写进最终汇报：教辅勘误怎么处理、口音或某句需不需要重录、哪张插图不满意、题目难度等
- [ ] 确认这次 git 提交只动了 `epNN/`（以及 `tools/make_docx_epNN.py`），没有改 `engine/`、第 1 集和其他集

## 7. 备注：第 1 集（根目录）以后怎么迁移
现在没有动它。以后 Change 同意迁移时：把根目录的 SEC / IMG / 题目数据按第 6 步的格式写成 `ep01/episode.js`，补 `audio/hints.json`，音频和插图移进 `ep01/`；第 1 集的题型（主谓宾拖拽、句子成分）可以用 `drag` 的 box / blank 模式表达；最后把根目录 `index.html` 改成跳转到 `ep01/` 的小页面（或直接做成 17 集目录页）。迁移后旧的 `cc_stars` 记录照样有效。
