---
title: 罗盘冒险队 第3集 云上图书馆的失物招领
episode: ep03
status: 文字审稿版
updated: 2026-10-11
---

# 第 3 集 · 插图文字提示词

仅准备文字，不调用生图；所有文件名是未来产物。本地参考图只用于保持服装、发型、配色和画风，绝不上传 GitHub。

统一要求：Pixar-like 3D animated film still, 16:9 (1920x1080), warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
Cast (keep on-model): Leo = lead boy, buzz cut, white polo with navy collar/cuffs, teal track trousers; Mia = lavender outfit with sketchbook; Sam = orange sporty; Lily = green/white smart; Biscuit = small cute dog. New: Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary).

本集限定：Grumble 不出场。Leo 保留白色 polo、藏青领袖口、蓝绿色运动裤、白鞋、短寸头，但使用原创面孔，禁止复刻孩子的脸；Leo 依总纲为 12 岁（旧参考块的 10 岁仅为原文记录）。Lily 必须戴眼镜。Biscuit 为浅棕色卷毛小狗，不说人话。本集地点：云上图书馆的失物招领。

参考图：`/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/character_sheet_ref.jpg`。不得使用旧文件中的云端路径。

## 看图选句 · 2×2 四宫格，2048×2048

下列通用块逐字来自第 16 集；使用时追加本集限定，覆盖其中的招聘会场景和 Grumble 出场设定，其余风格、角色服装配色保持一致。

```text
Pixar-like 3D animated film still, warm cinematic lighting, soft depth of field, bright friendly colours, cute and clear for children aged 9-12. Square 2048x2048 image arranged as a 2x2 grid of four equal panels separated by thin clean white gutters. Same characters, same style and same lighting in every panel. Absolutely no text, no letters, no numbers, no captions, no logos anywhere.
Cast (keep on-model): Leo = 10-year-old boy, short buzz cut, original face, white polo shirt with navy collar and cuffs, blue-green (teal) track trousers, white trainers. Mia = girl in a lavender outfit carrying a sketchbook. Sam = sporty boy in orange. Lily = smart girl in green and white. Biscuit = small cute light-brown dog. Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary). Setting: colourful outdoor monster job fair with striped tents and bunting.
```

本集四宫格限定：Setting is 云上图书馆的失物招领; Grumble does not appear; Leo has an original face and is twelve years old; Lily wears glasses; Biscuit has light-brown curly fur. No readable text, letters, digits, symbols acting as labels or logos. Four equal panels separated by clean white gutters about 16 px wide.

输出预留：`ep03_pick_A.png`。顺序固定：左上、右上、左下、右下。

| 格子 | 题号 / 切图名 | 正确句 | 明确画面与追加提示词 |
|---|---|---|---|
| 左上 | Q3.1 / `illus/pick_near_one.jpg` | This is a book. | Leo is the only foreground speaker, touching one book next to his hand; no distant competing book. |
| 右上 | Q3.2 / `illus/pick_far_one.jpg` | That is a bag. | Mia in foreground points across a wide room to a single bag high on a far shelf; clear distance and no nearer bag. |
| 左下 | Q3.3 / `illus/pick_near_many.jpg` | These are gloves. | Sam holds one glove in each hand close to his chest; both gloves fully visible. |
| 右下 | Q3.4 / `illus/pick_far_many.jpg` | Those are socks. | Lily in foreground points to two socks together on a distant high shelf; obvious gap between her and socks. |

验收：四格大小一致、约 16 px 白线；人物保持同一造型；图中没有任何文字/数字；每格能凭画面排除对应干扰句。若四格人物或画面不合格，审稿后再决定单张重做，当前不生成。
