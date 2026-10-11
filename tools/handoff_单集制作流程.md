# 罗盘冒险队 · 单集制作交接文档（给 Codex）

> 写于 2026-10-11。照着这份文档，在 Change 的 Mac 上用和第 16 集完全相同的方法做出新的一集。
> 你（Codex）**看不到** Willo 的工作机（/workspace），下面列出的所有文件都已经放进 GitHub 仓库或 Mac 本地，路径以本文为准。

## 0. 当前硬规则（先读）

- **只改正在做的这一集。** 不要修改、不要重新部署第 1 集（仓库根目录）和第 16 集（`ep16/`）。要借用 ep16 的代码，就**复制**到新目录（如 `ep05/`）再改。
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
| 图标 | 语法角色和形式用**黄铜罗盘徽章**（`badges.js` 生成的 SVG），**不要用 emoji 当语法图标** |
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
- 线上地址：第 1 集 `https://tiancc1212.github.io/compass-preview/`；第 16 集 `https://tiancc1212.github.io/compass-preview/ep16/`。
- 部署方式就是 `git push`，Pages 一般 30 秒到 2 分钟后更新。
- Mac 上 `gh` 已登录 tiancc1212（https），`git push` 可直接用。仓库还没克隆到 Mac，第一次需要：
  ```bash
  mkdir -p ~/Study/compass && cd ~/Study/compass
  gh repo clone tiancc1212/compass-preview
  cd compass-preview && git pull
  ```
- 目录结构（2026-10-11 时的状态）：
  ```
  .nojekyll
  index.html app.js base.css badges.js   ← 第1集（别动）
  audio/ illus/ models/compass_q.glb fonts/ design/ lib/(three.js)
  ep16/                                   ← 第16集（别动，用作模板）
    index.html      页面骨架、HUD 按钮、字幕栏、importmap；用 ?v= 做缓存刷新
    app.js          全部逻辑（约 370 行，见 §6）
    base.css        样式（徽章配色变量、各题型样式、手机适配）
    badges.js       黄铜徽章 SVG：badge('S'|'V'|'L'|'O'|'C'|'TD'|'DO'|'ING'|'ED',{size})
    audio/*.mp3 + audio/lines.json   每句的文本、角色、时长、逐词时间
    illus/*.jpg     故事插图 16:9；pick_*.jpg 看图选句插图 800×800
    models/compass_q.glb  首页 3D 罗盘
    fonts/ lib/three.module.js lib/addons/
    design/badges.* forms.*   徽章设计图
    docs/           ← 设计文档（不影响网页运行）
      QUESTIONS_PLAN.md          题目计划（题型、题目、答案、干扰项、音频）
      COVERAGE.md                教辅覆盖表（格式范例）
      PROMPTS.md                 故事插图提示词与人物描述
      PICTURE_CHOICE_PROMPTS.md  看图选句四宫格的生图要求
      CREDITS.md
      ref_10-非谓语动词.md        当时用的教辅章节副本
  tools/
    align.py        逐词时间对齐（faster-whisper）
    make_lines.py   从 台词.md 生成 lines.json
    README.md       align.py 用法
    tests/          puppeteer 自动测试脚本（rework16.mjs 题型测试，reader_test.mjs 播放和回看测试）+ package.json
  ```
- **缓存刷新：** `index.html` 里写的是 `href="base.css?v=8"`、`src="./app.js?v=8"`。每次发布把这个数字加 1。发给 Change 的链接也带上 `?v=N`，例如 `.../ep05/?v=1`。`badges.js` 由 app.js import，没带版本号，改了它就要在 import 里加 `?v=`。

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
- 角色列只能用这些名字：旁白 / Leo / Mia / Sam / Lily / Grandpa（爷爷） / Grumble（怪兽）。新角色要同时改 `make_lines.py` 里的 W 和 app.js 里的 WHO。
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

### 第 6 步：搭建新集目录（以 ep16 为模板）
```bash
cd ~/Study/compass/compass-preview
cp -R ep16 epNN && rm -rf epNN/audio/* epNN/illus/* epNN/docs/*
cp "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第N集_xxx/audio/"*.mp3 epNN/audio/
python3 tools/make_lines.py "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/台词.md" "第 N 集" epNN/audio/lines.json
```
`index.html`：改 `<title>`、`#title`、`#stars`、开始页 `#start` 的标题和按钮文字；版本号从 `?v=1` 开始。

`app.js` 的结构（按出现顺序）：
1. `WHO`：角色 → [中文名, 颜色]。`sfx()` 是合成音效。
2. **播放器**（`playLine / say / readSection / reviewSection / setAuto / setRate`），各集共用，**不要改**。高亮只跟 `audio.currentTime` 和 lines.json 里的逐词开始时间走，等音频的 `playing` 事件之后才开始；静音或自动模式下用虚拟时钟。
3. `dragGame(cfg)`：分类拖拽，或把词拖进句子空格。
   ```js
   {title, desc, mode:'box'|'blank',
    slots:[{k:'td', b:'TD', title:'+ to do', sub:'不定式'}]            // box 模式
         或 [{k:'a', ctx:'中文情境', pre:'The job fair is ', post:'.'}],  // blank 模式
    chunks:[{t:'want', k:'td', h:'放错时的中文解释'}, {t:'陷阱', k:null, h:'...'}],
    tip:'全部完成后的总结', audio:'ex_qX_xxx'(可选，完成后播), prog:prog(n,i)}
   ```
   `rounds(list, mk)` 可以连续出好几轮。
4. `stepCard({title, desc, tip, steps:[{html, mount(el, api)}]})`：通用的分步题卡。`api.ok(中文解释, 音频id)` 表示答对（这时才播音频），`api.bad(中文解释, 元素)` 表示答错，`api.tip()` 显示提示。最后一步完成后卡片会自动关闭。每个 mount 里给 `AUTO=()=>{…}` 赋一个自动作答函数，测试要用。
   基于它已经写好的题型（直接复制改数据）：
   - `matchGame`：连线。P=[{t, k, ex, au, h}]，T=右侧目标 [{k, b, t}]
   - `gameMeaning`：看图选句。V=[[动词, [[图名, 正确句, 干扰句, 音频, 解释], …], 规则]]，图片是 `illus/pick_<图名>.jpg`
   - `typeStep({ctx, pre, post, ans, accept, au, why, ph, hint:v=>中文})`：打字填空，输入不分大小写，忽略空格和前导 “-”。`gameFeel` 是填词尾，`gameAttr` 是按原形填词
   - `gameTo`：改错。[情境, 错句, 错词下标, [[改法, 1正确/0错误]…], 音频, 正确句, 解释]
   - `gameSubject`：第 1 步连词成句，第 2 步句子改写（`normTxt` 会把句子统一成小写、去标点、把 it's 换成 it is）
   - `gameTF`：判断对错。[句子, 1对/0错, 改正句, 音频, 解释]
   - 每种题型都有答错的中文解释，连错两次会给出答案。
5. `mapCard`（知识地图，底部有“📥 下载知识点（Word）”链接）、`spellCard`（收藏卡，用 `card_*` 音频）、`IMG`（插图表 key → [路径, 说明]）、`showImg`。
   - **Word 知识点：** 照着 `tools/make_docx_ep16.py` 复制一份 `tools/make_docx_epNN.py`，改成本集内容（中文讲解 + 英文例句 + 对比表 + 常见错误，内容要和知识地图、覆盖表一致）。然后运行 `pip install python-docx && python3 tools/make_docx_epNN.py epNN/downloads/epNN_<ascii名>.docx`。文件名只用 ASCII，中文名放在 `<a download="罗盘冒险队_第N集_….docx">` 里。生成后用 python-docx 打开检查一遍。知识地图和结尾卡片都要放这个链接（直接链到文件，iPhone 和安卓都能下载）。
6. **结尾星星回罗盘**（ep16 的 `ending()`，直接复用）：背景变暗、罗盘放大，星星从收藏卡飞进罗盘上第 `MYSTAR` 个槽（`MYSTAR = 集号 - 1`，ep16 是 15），点屏幕可以跳过；槽位点亮并有光圈，显示“⭐ N / 17”进度条。进度存在 `localStorage` 的 `cc_stars`（已完成集号的数组，同一网站下各集共用），之前完成过的集也会点亮。第 1 集目前还不会写这个记录，按规则不要去改它。完成卡片的文字要改成本集。
7. **`SEC`**：故事分段，每句是 `{id:'l01', zh:'中文字幕', img:'gate', overlay:'<div class="carve">…</div>'(可选), fx:'door'(可选音效)}`。每句都写上 img（读到这句时显示的图）。
8. `story()`：`await readSection(SEC.S1); await 练习A(); await readSection(SEC.S2); …; await mapCard(); await spellCard(); await ending();`
9. `JUMP`：调试入口 `?jump=<名字>`，直接进某个活动；跳进去时要设好 `lastSection`（ep16 的写法：`SEC[{forms:'S1',…}[j]||'S4']`）。调试参数：`?mute=1` 静音，`?fast=1` 答完自动进入下一题，`?rm=1` 关闭动画。

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
自动测试：参考 `tools/tests/rework16.mjs` 和 `reader_test.mjs`，把 URL 和题目选择器改成本集再运行（`node rework16.mjs http://localhost:8716/epNN/index.html`）。截图存 `epNN/shots/`（不要提交）。

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
git status                       # 确认只改了 epNN/（以及 tools/ 如有需要），没有 ep16/ 或根目录文件
git add epNN && git commit -m "epNN: <标题>" && git push origin main
# 等 Pages 更新后验证
curl -s "https://tiancc1212.github.io/compass-preview/epNN/index.html?t=$RANDOM" | grep -o 'app.js?v=[0-9]*'
curl -sI https://tiancc1212.github.io/compass-preview/epNN/audio/l01.mp3 | head -1   # 应为 200
```
然后用线上地址再跑一次自动测试。以后每次更新：版本号 `?v=` 加 1，再 commit 和 push，把带新版本号的链接发给 Change。

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

- **样式：** 都在 `ep16/layout.css`，文件头有注释，所有集共用同一套，不要各改各的。
- **用到新的一集**（包括给 ep02 补上），只改该集自己的文件：
  1. 把 `ep16/layout.css` 复制到 `epNN/layout.css`，在 `index.html` 里 base.css 后面加 `<link rel="stylesheet" href="layout.css?v=N">`。
  2. `index.html`：在 `#stage` 前面加 `<div id="backdrop"></div>`；在 `#sub` 里的 `#zh` 后面加 `<div id="ghint" aria-live="polite"></div>`。
  3. `app.js`：从 ep16 复制 `renderHint` / `HINTS` / `nw` 三段（放在 `say()` 前面）、`fitLayout()`（用 ResizeObserver 把 HUD 高度写进 `--hud`），并在 `playLine` 生成 spans 之后调用 `renderHint(id,L,spans)`；`showImg()` 里同步设置 `#backdrop` 的背景图；加载 lines.json 后接着加载 `audio/hints.json`。
  4. 去掉该集原来自己写的“图片区域 / 字幕位置”样式（ep02 的 base.css 第 219–251 行一带：`#stage{inset:75px 0 230px}`、`.layer{width:min(100vw,calc((100dvh - 305px)*16/9))}` 等），否则会和 layout.css 冲突。
  5. 按第 8 步测试：竖屏 390×844、小屏 360×740、横屏 844×390、电脑 1280×800。
- **注意：** ep02 是 Codex 做的，要改 ep02 必须先经过 Change 同意，并且只动 ep02 目录。

### 逐句语法提示（hints.json）
- **位置：** `epNN/audio/hints.json`，键是台词 id，值是数组：
  ```json
  "l05": [{"b":"TD","hl":"too small to guard","zh":"<b>too … to do</b> = 太……而不能"}]
  ```
  - `b`：徽章，可选 TD / DO / ING / ED / S / V / O / C（和 badges.js 一致）。
  - `hl`：句子里要加下划线的连续词，忽略大小写和标点，要和台词原文的词一致。
  - `zh`：一句话中文讲解，最多 25 个字左右，可以用 `<b>` 加粗。
- **写法原则：**
  - 只给含**本集考点**的句子写，没有考点的句子不写，不要硬凑。
  - 一句最多两条。
  - 讲“形式 + 意思”，例如“stop doing：停止正在做的事”。
  - 和知识地图、练习的说法保持一致；写完逐条检查语法是否正确。
- 收藏卡句子（`card_*`）也可以写，结尾的 `star` 不写。

## 5. 常见坑
- 台词改了一个字，就要重新录那一句，再跑 align.py。
- 新增角色要同时改：`make_lines.py` 的 W、app.js 的 WHO、台词表的角色列、音色表。
- 剪映导出的打包文件里可能夹带 `._xxx.mp3`（macOS 元数据），要删掉。
- 改 base.css 或 app.js 后忘了加版本号，Change 手机上会一直看到旧版。
- 不要在故事播放时调用 `showPanel`；练习结束一定要走 `hidePanel()`（`stepCard` 和 `rounds` 已经自动处理）。

## 6. 交付前自查清单（每集交付前逐项打勾）

- [ ] **覆盖表核对：** 把 `epNN/docs/COVERAGE.md` 和教辅原章节逐条对照，每个知识点都标了 ✅ 或 ⏭（附原因）；“教辅勘误”一节已写好
- [ ] **英文语法复查：** 台词.md 里本集每一句英文（故事、练习、收藏卡、结尾）、app.js 里的题干、选项、干扰项和 Word 例句，都逐句检查语法和英式拼写；故意写错的句子只出现在改错题和判断题里
- [ ] **插图风格对比：** 把新插图和 `ep16/illus/` 并排看，画风、光线、人物服装发型都一致；Leo 没有用孩子的脸；图里没有文字
- [ ] **布局和提示：** 已套用统一布局 A（layout.css），四种屏幕截图都看过；hints.json 覆盖了所有含考点的句子，内容正确
- [ ] **结尾和下载：** 结尾星星飞回罗盘、槽位点亮、显示 N / 17；知识地图和结尾卡片上的“下载知识点（Word）”能下载并打开，内容和知识地图一致
- [ ] **第 8 步测试清单全部通过**（手机加电脑、答对才放音频、高亮不闪、滑动不和拖拽冲突、静音、重看上一节、卡片不盖故事）
- [ ] **需要 Change 决定的事项单独列出来**，写进最终汇报：教辅勘误怎么处理、口音或某句需不需要重录、哪张插图不满意、题目难度等
- [ ] 确认这次 git 提交只动了 `epNN/`（以及必要的 `tools/`），没有改第 1 集和第 16 集
