---
status: 文字待审
episode: 07
created: 2026-10-11
---

# 第 7 集 巧克力星球 · 插图提示词（仅备稿）

本次不生成图片。以下两行原样复制第 16 集，作为风格与人物基准：

统一要求：Pixar-like 3D animated film still, 16:9 (1920x1080), warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
Cast (keep on-model): Leo = lead boy, buzz cut, white polo with navy collar/cuffs, teal track trousers; Mia = lavender outfit with sketchbook; Sam = orange sporty; Lily = green/white smart; Biscuit = small cute dog. New: Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary).

本集 Grumble 不出场；只保留上面原始人物基准行供核对。Leo 只参考服装、发型与配色，脸必须原创；年龄按总纲 12 岁。Lily 戴眼镜；Biscuit 为浅棕卷毛小狗。狗不说人话。图内禁止文字、字母、数字、标志、字幕和带字气泡，所有需阅读的内容由未来网页外置呈现。

本地人物参考（仅供后续生图使用，绝不上传 GitHub）：

- /Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/character_sheet_ref.jpg

## 看图选句四宫格

候选文件 ep07_pick_a.png；2048×2048，四格相等，16 px 干净白色分隔线，顺序固定。切分后文件名见下表。每次只显示对应单格；答案文字只在网页，不进图片。

第 16 集四宫格原始风格块（原样保留）：

```
Pixar-like 3D animated film still, warm cinematic lighting, soft depth of field, bright friendly colours, cute and clear for children aged 9-12. Square 2048x2048 image arranged as a 2x2 grid of four equal panels separated by thin clean white gutters. Same characters, same style and same lighting in every panel. Absolutely no text, no letters, no numbers, no captions, no logos anywhere.
Cast (keep on-model): Leo = 10-year-old boy, short buzz cut, original face, white polo shirt with navy collar and cuffs, blue-green (teal) track trousers, white trainers. Mia = girl in a lavender outfit carrying a sketchbook. Sam = sporty boy in orange. Lily = smart girl in green and white. Biscuit = small cute light-brown dog. Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary). Setting: colourful outdoor monster job fair with striped tents and bunting.
```

本集实际使用时以本集场景替换最后的招聘会 Setting，移除 Grumble 的出场要求；Leo 年龄按总纲 12 岁，补上 Lily 眼镜和 Biscuit 浅棕卷毛，其他服装和画风不变。

| 位置 | 题号 | 切图文件 | 正确句 | 必须可见的画面 |
|---|---|---|---|---|
| 左上 | Q3.1 | illus/pick_a1.jpg | What a huge cake! | 一座巨大蛋糕山，小人物作比例参照，不出现其他蛋糕。 |
| 右上 | Q3.2 | illus/pick_a2.jpg | What beautiful flowers! | 清楚的三朵漂亮糖果花，不要文字。 |
| 左下 | Q3.3 | illus/pick_a3.jpg | Biscuit is asleep. | Biscuit 闭眼蜷卧，袜子静放旁边，无气泡符号。 |
| 右下 | Q3.4 | illus/pick_a4.jpg | Mia has a small red box. | Mia 手里捧着红色小盒子，颜色明确，盒子小于她的手臂。 |

生成提示词：

```
Apply the copied square-grid style and the episode cast constraints. Setting: a friendly chocolate planet. Top-left: one gigantic cake hill with tiny children for scale. Top-right: exactly three colourful candy flowers, separated and clearly visible. Bottom-left: curly light-brown Biscuit asleep with both eyes closed, a sock nearby. Bottom-right: Mia in lavender holding a clearly small red box. No letters, numbers, words, bubbles, logos or signs anywhere.
```

## 后续验收

- 故事图 4 张均为 1920×1080；四宫格 1 张为 2048×2048，四格顺序正确。
- 衣服、发型、配色与参考一致，Leo 原创脸，Lily 有眼镜，Biscuit 浅棕卷毛。
- 所有图零文字、字母、数字；题意由可见动作或物体支持。
- 仅准备提示词，尚未生图，不能将本清单标为图片验收通过。
