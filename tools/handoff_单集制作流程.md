# 罗盘冒险队 · 单集制作交接文档（给 Codex）

> 写于 2026-10-11，同日改为**共享引擎**版本。
> **分工：`tools/SPEC_单集规格书.md` 规定一集必须是什么样（字段、内容、画面、声音、验收标准）；本文只讲怎么一步步做出来（环境、命令、顺序）。** 两者冲突时以规格书为准。
> 你（Codex）**看不到** Willo 的工作机（/workspace），下面列出的所有文件都已经放进 GitHub 仓库或 Mac 本地，路径以本文为准。

## 0. 当前硬规则（先读）

- **新的一集只写内容，不写代码。** 播放器、题型、布局、结尾动画都在共享引擎 `engine/` 里；一集的目录只放 `index.html`（标准外壳）、`episode.js`（内容配置）、`audio/`、`illus/`、`downloads/`、`docs/`，需要时加 `episode.css`（只能写本集插图上叠字的位置）。
- **不要改 `engine/`。** 需要新题型或引擎有 bug，先告诉 Cici，由 Willo 改引擎（改一次，所有集一起受益）。引擎一改会影响 ep02 和 ep16，所以必须两集都回归测试。
- 不要修改第 1 集（仓库根目录 `index.html app.js …`，它还是旧的独立代码，没有迁移）。不要动别的集的目录。
- 不动 Cici 的个人网站 stemlearn.cloud，只发布到预览仓库 `compass-preview`。
- 只用免费工具。
- 给 Cici 的说明一律用**简体中文、通俗说法**。
## 1. 项目背景

- 给 Cici 的孩子（初中，主角 Leo 以他为原型）做一套互动英语语法课。整体剧情和 17 节课的安排在
  `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/grammar_fasttrack_final.md`；背景、家长决定、否决过的方向在同目录 `handoff.md`（**不要覆盖它**）。
- 故事：冒险队（Leo、Mia、Sam、Lily、小狗 Biscuit）拿着爷爷的罗盘穿越各地，每集找回罗盘上的一颗星（共 17 颗）。爷爷线索 “C. C. was here” 贯穿全剧。
- 每集形式：插图 + 英式配音逐句讲故事（字词高亮）→ 穿插练习题 → 知识地图 → 收藏卡 → 星星回到罗盘。

## 2. 用户偏好

全部写在规格书里：内容和语言 §7，题型 §8，画面 §9，声音 §10，交互 §11。动手前先通读规格书。

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
    badges.js             黄铜徽章 SVG：S V L O C TD DO ING ED N A THE ZERO OWNER COUNT ADJ ADV REL INV
    lib/ models/ fonts/   three.js、3D 罗盘、字体
  ep16/  ep02/            ← 已迁移到引擎的两集，新集照着它们写
    index.html            标准外壳（10 行，不要自己加东西），<html data-v="N"> 是本集内容版本号
    episode.js            本集全部内容：标题、插图表、故事分段、练习、知识地图、收藏卡、结尾
    episode.css           （可选）只放本集插图上叠字的位置，ep02 用来把 “C. C. was here” 放在棋盘铜牌上
    audio/*.mp3  audio/lines.json  audio/hints.json
    illus/*.jpg  downloads/*.docx  docs/（设计文档，不影响网页）
  tools/
    SPEC_单集规格书.md     单集规格书：一集必须是什么样（先读）
    validate_episode.mjs  内容检查器（见第 8 步），每次提交前必须跑
    align.py              逐词时间对齐（faster-whisper）
    make_lines.py         从 台词.md 生成 lines.json
    make_docx_ep16.py     Word 知识点生成脚本范例
    tests/                puppeteer 测试脚本 + package.json
  ```
- **缓存刷新（两个数字）：**
  - 改了本集内容（episode.js、lines.json、hints.json、episode.css）→ 把 `epNN/index.html` 里 `<html data-v="N">` 加 1。
  - 引擎的版本只在 `engine/VERSION` 一个地方（你不需要改）。外壳每次都会实时读这个文件，所以 Cici 不用换链接。
  - 音频文件的缓存参数在 `episode.js` 的 `audioVersion`（例如 `'20261011-level1'`）；换了 mp3 就改成新的字符串。
  - 插图换了同名文件时，最好直接换个文件名。

### 3.2 Cici 的 Mac 本地

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
- 规模（段数、句数、活动数、题数、收尾小测 6–8 题）按规格书 §7.1，题型按 §8 选。尽量让本集语法自然出现在故事里，练习句也用故事里的人物和情节。
- 写 `epNN/docs/QUESTIONS_PLAN.md`，格式参考 ep16：每个活动写清题型、每道题、正确答案、干扰项、答错时的中文解释、对应音频文件名。
- 先把故事和题目计划用中文简要给 Cici 过目，同意后再往下做。

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
- 音色表见规格书 §10.1（每个角色全剧固定，不要换）。

### 第 4 步：插图
- 风格块、尺寸、压缩、四宫格和“图里不能有字”的要求见规格书 §9。故事插图提示词写进 `epNN/docs/PROMPTS.md`，方图写进 `epNN/docs/PICTURE_CHOICE_PROMPTS.md`。
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

### 第 5 步：配音（Cici / CoCo 来做）
- 告诉 Cici：台词已经写进 台词.md 的第 N 集，请 CoCo 用剪映导出，放到 `台词/第N集_<标题>/audio/`，文件名和表里完全一致，句首句尾留白不超过 0.3 秒。
- 拿到以后检查：数量一致，没有多余的文件，删掉 macOS 生成的 `._*` 文件。
- 拿到后按规格书 §10.3 统一响度到 -19 LUFS（固定增益，真峰值 < -1 dBTP，方法见 `tools/AUDIO_LEVELS_20261011.md`），再放进仓库。

### 第 6 步：搭建新集目录（只写内容）
```bash
cd ~/Study/compass/compass-preview
mkdir -p epNN/audio epNN/illus epNN/downloads epNN/docs
cp ep16/index.html epNN/index.html          # 外壳：只改 <title>，data-v 从 1 开始
cp ep16/episode.js epNN/episode.js          # 照着改内容
cp "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第N集_xxx/audio/"*.mp3 epNN/audio/
python3 tools/make_lines.py "/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/台词.md" "第 N 集" epNN/audio/lines.json
```

**`episode.js` 怎么写：** 全部字段、10 种题型和完整例子见规格书 §4（hints.json §5，lines.json §6）。照着 `ep16/episode.js` 或 `ep02/episode.js` 改最快。
- 改错题（`fix`）点到没错的词时的引导语用 `miss` 字段写（活动上或单题上），见规格书 §4.4 ⑤。
- 测试入口：`?jump=<活动名>` 直接进某个活动；`?mute=1` 静音、`?fast=1` 答完自动下一题、`?rm=1` 关动画。
- **Word 知识点：** 照着 `tools/make_docx_ep16.py` 复制成 `tools/make_docx_epNN.py`，运行 `pip install python-docx && python3 tools/make_docx_epNN.py epNN/downloads/epNN_<ascii名>.docx`。内容结构见规格书 §12。

### 第 7 步：逐词时间对齐
```bash
cd ~/Study/compass/compass-preview/tools
venv/bin/python align.py ../epNN            # 第一次会下载约 140MB 模型
venv/bin/python align.py ../epNN --model small.en   # 想更准就用这个，会慢一些
```
- 输出里每句都应该是 `whisper match=100%`。出现 `proportional` 或匹配率低，说明录音和台词不一致，要回去核对，必要时请 CoCo 重录。
- 抽查录音和台词是否一致：用 faster-whisper 不带提示词转写一遍，和台词逐词比较。识别把 favourite 写成 favorite、把 one 写成 1 都算正常；但关键语法词（比如 -ed 词尾）听不清的要报告给 Cici。

### 第 8 步：测试清单
本地起服务：`cd ~/Study/compass/compass-preview && python3 -m http.server 8716`，浏览器打开 `http://localhost:8716/epNN/`。
**先跑内容检查器**（必须 0 个错误）：`node tools/validate_episode.mjs epNN`。它会检查：flow 和活动对得上、每句台词有 mp3 和逐词时间、mp3 实际时长和 lines.json 一致（不一致就要重跑 align.py）、所有奖励音频和插图存在、题型字段齐全、hints.json 里的词在句子里找得到、徽章名正确、下载文件存在。
自动测试：参考 `tools/tests/` 里的脚本（全部活动可以用 `window.__auto()` 自动作答、`window.__next()` 翻句、`window.__state()` 看当前状态），截图存 `epNN/shots/`（不要提交）。


验收项（交互行为、尺寸、截图）见规格书 §11 和 §13，逐项通过。

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

### 第 10 步：向 Cici 汇报（中文、口语化）
按规格书 §13 第 9 条的模板写；不讲技术细节，不写 commit 号。

## 4.5 布局和语法提示

布局 A 由引擎自动套用，验收要求见规格书 §9.6；插图叠字位置见 §9.5；`hints.json` 的格式、写法和徽章目录见规格书 §5。

## 5. 常见坑
- 台词改了一个字，就要重新录那一句，再跑 align.py。检查器会发现 mp3 时长和 lines.json 不一致。
- 新增角色要同时改：`episode.js` 的 `speakers`、`make_lines.py` 的 W、台词表的角色列、音色表。
- 剪映导出的打包文件里可能夹带 `._xxx.mp3`（macOS 元数据），要删掉。
- 改了内容忘了把 `data-v` 加 1，Cici 手机上可能看到旧版（最多 10 分钟）。
- `episode.js` 是 JavaScript：字符串里有英文撇号（`Don't`）时用双引号或反引号包起来；多行 html 用反引号。
- 想要引擎没有的题型或效果：不要在集目录里写代码，告诉 Cici，由 Willo 加进引擎。
## 6. 交付前自查清单

见规格书 §13“完成标准”，全部满足才能交给 Cici；汇报模板也在那里。

## 7. 备注：第 1 集（根目录）以后怎么迁移
现在没有动它。以后 Cici 同意迁移时：把根目录的 SEC / IMG / 题目数据按第 6 步的格式写成 `ep01/episode.js`，补 `audio/hints.json`，音频和插图移进 `ep01/`；第 1 集的题型（主谓宾拖拽、句子成分）可以用 `drag` 的 box / blank 模式表达；最后把根目录 `index.html` 改成跳转到 `ep01/` 的小页面（或直接做成 17 集目录页）。迁移后旧的 `cc_stars` 记录照样有效。
