---
title: 第15集 伦敦博物馆失窃案
status: 文字待家长审稿
date: 2026-10-11
---

# 第 15 集 · 插图提示词

以下两行逐字沿用第16集范例。Grumble 的设定仅随原样风格块保留，本集不画 Grumble。

统一要求：Pixar-like 3D animated film still, 16:9 (1920x1080), warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
Cast (keep on-model): Leo = lead boy, buzz cut, white polo with navy collar/cuffs, teal track trousers; Mia = lavender outfit with sketchbook; Sam = orange sporty; Lily = green/white smart; Biscuit = small cute dog. New: Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary).

本集补充约束：Leo 的脸必须原创，仅参考服装、短寸发型、配色；Lily 戴眼镜；Biscuit 是浅棕色卷毛小狗。全队服装保持原设定，不因时代换装。

本地参考（只供后续生图，绝不上传 GitHub）：

- `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/character_sheet_ref.jpg`
- `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/ref_grumble_and_crew.jpg`（只参考主角团，不引入怪兽）
- `/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/ref_grumble_biscuit_closeup.jpg`（只参考 Biscuit）

故事每图 16:9、1920×1080。牌子、纸张、表盘全部留白；故事所需文字将来由网页另行呈现，不能生在图里。所有提示词均在上述风格、角色限制之后使用。本轮只交提示词，不生成图。

## 故事图（5张）

| 文件名 | 台词范围 | 画面提示词（接统一风格块） |
|---|---|---|
| illus/01_museum.jpg | l01–l03 | Foggy Victorian London at dusk, a museum guard opens a grand museum door for Leo, Mia, Sam, Lily and Biscuit. A visibly empty crown stand behind a cracked glass case inside. Keep everyone friendly and unhurt; no readable dates or signs. |
| illus/02_case.jpg | l04–l07 | Lily kneels by an empty glass case, holding a magnifier; a striped sock lies on the floor. Leo notices glass fragments outside the case suggesting the glass was pushed from inside; Mia and Sam look on, Biscuit sniffs. No injuries, no written clues. |
| illus/03_sock_trail.jpg | l08–l09 | Low angle: the museum guard has just handed a striped sock to Biscuit; a second end of the long sock is being tugged beneath a wooden chair by a small brass clockwork mouse. Leo points towards it; four children visible. |
| illus/04_mouse.jpg | l10–l11 | The crew discovers a tiny friendly brass clockwork mouse beside a golden crown under the chair. The mouse has built a cosy nest of colourful socks. Lily gently places a transparent ventilated display box around it without harm. |
| illus/05_part.jpg | l12–l14 | Mia holds a tiny brass compass part found inside the returned crown. Lily places a single glowing star beside it. The guard smiles; Leo, Sam and Biscuit gather. The clockwork mouse rests in a safe transparent box. Warm discovery moment, no text or numbers. |

## 看图选句四宫格 A

文件：`ep15_pick_A.png`。2048×2048，2×2等大四格，约16px干净白色分隔线；每格约1024×1024。生成时将通用风格的16:9尺寸句替换为下面四宫格块，其余画风与人物原样保持：

> Square 2048x2048 image arranged as a 2x2 grid of four equal panels separated by thin clean white gutters. Same characters, same style and same lighting in every panel. Absolutely no text, no letters, no numbers, no captions, no logos anywhere.

| 位置/后续切图名 | 对应题 | 正确句 | 明确可见的画面提示 |
|---|---|---|---|
| 左上 pick_a1.jpg | Q4.1 | The sock is given to Biscuit. | Lily手里的一只条纹袜子正递到Biscuit嘴边，Mia空手站远处；交接动作方向清楚。 |
| 右上 pick_a2.jpg | Q4.2 | The crown is cleaned by the guard. | 守卫用软布擦皇冠，发条老鼠在透明盒里，不能同时碰皇冠。 |
| 左下 pick_a3.jpg | Q4.3 | The mouse is carried by Lily. | 绿白衣、戴眼镜的Lily捧着装发条老鼠的透明盒；Sam双手垂下站旁边。 |
| 右下 pick_a4.jpg | Q4.4 | The crown is carried by Mia. | 淡紫衣Mia双手捧皇冠；Biscuit在地上、嘴空着，Leo站在旁边。 |

English prompt: Top-left: Lily gives a striped sock directly to Biscuit; Mia stands apart with empty hands. Top-right: the museum guard carefully polishes the crown with a cloth; the clockwork mouse stays in a transparent box. Bottom-left: Lily in green and white with glasses carries the transparent box containing the mouse; Sam in orange stands beside her with empty hands. Bottom-right: Mia in lavender carries the crown in both hands while Biscuit stands on the floor with an empty mouth.

后续图像验收：5张故事图尺寸正确；四宫格四格等大且顺序不变；无文字字母数字；角色服装发型一致、Leo原创脸；每题动作执行者唯一可辨。若四宫格人物或动作不一致，先报告并改提示词，不把含糊图交给孩子猜。本轮这些检查尚未发生。
