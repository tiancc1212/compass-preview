---
title: 罗盘冒险队 M1 视觉审稿说明
date: 2026-10-11
status: Cici 已选择 B 星图秘境，进入 M3/M4
scope: M1 本地静态审稿
---

# 罗盘冒险队 · M1 视觉审稿

本目录保留 M1 选方案时的静态审稿页。Cici 已选定 **B「星图秘境」（The Stargazer）**，正式集成与发布状态见 [M3/M4 实施与验收](../../hq/docs/M3_M4_实施与验收.md)。以下截图、规格说明和“尚未实现”边界均记录 M1 当时的状态。

## 查看方法

从仓库根目录启动静态服务，然后打开 `design/visual-v5/`。本轮本地服务使用：

- [三个罗盘并排对比](http://127.0.0.1:8756/design/visual-v5/)
- [A · 经典探险开始页](http://127.0.0.1:8756/design/visual-v5/?variant=classic&stars=0&view=start)
- [B · 星图秘境开始页](http://127.0.0.1:8756/design/visual-v5/?variant=starmap&stars=0&view=start)
- [C · 爷爷的传家宝开始页](http://127.0.0.1:8756/design/visual-v5/?variant=heirloom&stars=0&view=start)

`stars=0` 到 `stars=5` 可查看从没有星星到前五颗星点亮的状态。默认对比页可直接点击状态按钮。屏幕尺寸决定手机或桌面布局，不需要模拟设备外壳。

开始页标题、副标题来自当前 `ep01/episode.js` 的 `start`：

- 金字塔的回声墙
- 说出完整句子，打开石门，找到第一颗星！
- 主按钮依任务书简化为“出发”。

“出发”和“冒险队总部”目前仅显示审稿提示，不跳转，不写入记录。

## 文件

| 文件 | 用途 |
|---|---|
| `index.html` / `review.css` / `review.js` | 对比页、独立开始页、0–5 星状态 |
| `assets/compass_*_v1.png` | 三个高细节透明罗盘底图 |
| `assets/star_lit_v1.png` | 共用点亮星图片 |
| `icons/*.svg` | 12 个线性黄铜图标草案，24 × 24 网格、2 像素描边 |
| `fonts/SourceSerif4-Regular.full.woff2` | Adobe 官方完整英文正文字体，仅 Regular 字重 |
| `fonts/LICENSE.md` | 原始 SIL OFL 1.1 许可文本 |
| `compass-slots-v1.json` | 三个变体的 17 槽准确坐标，来自实际预览配置 |
| `shots/` | 12 张开始页截图、2 张对比图、[显示检查](shots/display-check.md) |

## 星槽与图层

三张底图与亮星的本轮原生尺寸均为 1254 × 1254，未冒称 2048 或发布用 256 星资源。生产分档待 M3。

AI 只生成黄铜罗盘底图；精确的 17 个星槽由前端独立排列。暗槽为 SVG，亮星为透明图片，不把 AI 生成的装饰数量当作进度数量。

每个罗盘在 `review.js` 的 `variants` 中分别配置圆心、环半径、星半径。以图片左上角为 `(0, 0)`，右下角为 `(1, 1)`。第 1 槽在圆心正上方，按顺时针每 `360 / 17` 度排一槽。没有覆盖原图的大面积遮罩环。

本阶段演示“前 1–5 颗连续点亮”，不读取 `localStorage.cc_stars`。正式实现要根据真实集号逐槽点亮，不能用累计数量代替已完成集号。

## 字体方案与来源

英文正文首选 Source Serif 4；中文使用苹方、Hiragino Sans GB、微软雅黑等系统字体。本页英文字体只使用已加载的 400 字重，没有合成粗体或斜体。

- [Adobe Source Serif 官方仓库](https://github.com/adobe-fonts/source-serif)
- [本轮下载的官方 WOFF2](https://github.com/adobe-fonts/source-serif/blob/release/WOFF2/TTF/SourceSerif4-Regular.ttf.woff2)
- [Adobe 原始许可](https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md)

2026-10-11 核验：SIL OFL 1.1，保留字体名 `Source`。当前文件保持官方原样，76,260 字节。**当前完整字体尚未达到任务书发布用字体 ≤60 KB 的目标**；选定方案后制作覆盖各集英文字符的拉丁子集，保留许可并按保留字体名规则为修改后的字体更名。本轮不将全量字体误标为生产优化产物。

## 阶段边界

本页可以审阅：三个罗盘的区别、羊皮纸与黄铜配色、手机/桌面开始页、17 个精确星槽、线性图标、英文字体。

本页不能证明：引擎已替换、全部教学流程通过、总部已完成、生产首屏体积/时间已达标、离线可用或网站已经上线。用户已明确取消离线可用要求。
