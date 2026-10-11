# 第 1 集看图选句四宫格

制作日期：2026-10-11。四格顺序固定为左上、右上、左下、右下；题目和选项在页面由引擎乱序。本表列出制作对应关系，不代表答题显示顺序。

## 最新题图映射

| 格位 | 正式图 | 正确句 | 另外两句 | 唯一判断依据 |
|---|---|---|---|---|
| 左上 | [pick_leo_compass.jpg](../illus/pick_leo_compass.jpg) | Leo holds the compass. | Mia holds the compass. / Leo holds a torch. | 只有 Leo，双手拿一只罗盘；没有 Mia，也没有手持火把。 |
| 右上 | [pick_lily_wall.jpg](../illus/pick_lily_wall.jpg) | Lily reads the wall. | Lily holds the compass. / Mia reads the wall. | 只有戴眼镜的 Lily 面向墙、用手指跟看墙面；书合上低放，没有罗盘或 Mia。 |
| 左下 | [pick_biscuit_sock.jpg](../illus/pick_biscuit_sock.jpg) | Biscuit finds a sock. | Biscuit finds a ball. / Leo finds a sock. | 只有 Biscuit 在地面找到一只条纹袜；没有球或 Leo。 |
| 右下 | [pick_mia_scared.jpg](../illus/pick_mia_scared.jpg) | Mia looks scared. | Mia looks happy. / Mia looks angry. | 只有 Mia，抱紧本子、肩膀缩起、眼睛睁大；表情害怕，没有笑或愤怒。 |

本轮最终选项全部合语法，必须看人物、物件或表情作答。Lily 的石墙故意无文字，使用注视墙面和指读动作支持题意；相对于另两项，人物和手中物件足以唯一判断。

## 实际生成提示词

一张四宫格单独调用 image_gen，输入第 16 集角色设定图和风格图。参考人物只取服装、发型、配色，脸为原创。私密设定图不入仓库。

```text
Pixar-like 3D animated film still style, warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
Use case: illustration-story educational picture choice. Create ONE SQUARE 2048x2048 2 by 2 contact sheet, FOUR equal SQUARE panels with clear plain WHITE outer frame and a straight uniform WHITE central vertical and horizontal gutter about16px. This sheet is SQUARE, not16:9. Input1 character wardrobe/hair/colour reference; input2 style reference only. Exactly ordered panels, no panel labels, no letters, no numerals, no hieroglyphs, no logos, no wordlike scratches anywhere. Use original stylized child faces, not real faces. Same warm plain sandstone Egyptian pyramid environment throughout; all inscriptions and plaques are BLANK. Keep subjects centered with safety space, no cross-panel overlap.
TOP LEFT: Leo, buzz-cut boy, white polo navy collar/cuffs, teal trousers, holding ONE brass compass with BOTH HANDS in front of his body, eyes looking at it. Compass face is completely PLAIN gold except one needle, NO letters or numbers or tick labels. Clearly boy holding object, object does not hold boy. Only Leo in this panel.
TOP RIGHT: Lily, ponytail girl in glasses, green cardigan over white polo, dark trousers, stands side-on closely FACING a large smooth BLANK rectangular inset in the sandstone WALL. Eyes scan the wall with a thoughtful focused expression, one index finger points at its blank surface as if reading. Her book held low at side and CLOSED, so she is visibly attending to the WALL not a book. Only Lily in this panel.
BOTTOM LEFT: Biscuit, same small fluffy brown poodle puppy, has discovered ONE old grey-and-cream horizontally striped sock in a dusty corner. Nose touches the sock on the stone FLOOR, ears perked, alert happy eyes focused on sock. Sock is an inanimate fabric object without face or limbs. Whole puppy and whole sock visible, no person.
BOTTOM RIGHT: Mia, ponytail younger girl in a LAVENDER zip hoodie, blue jeans and purple shoes, looks MILDLY SCARED, eyebrows raised and drawn together, eyes widened, lips slightly parted, shoulders raised, tightly hugging her plain brown sketchbook to chest. One gentle dark arch behind her, safe children's adventure tone. Only Mia, NO companion or scary creature. Plain clothing without badges or letterlike symbols.
All four have matching 3D animated film materials, consistent identities, no text of any kind. No arrows or speech bubbles.
```

## 实际尺寸与裁剪

工具原生输出 1254×1254。按用户本轮标准接受原生分辨率；不因未达到提示词 2048×2048 而重做。测量原生白边/分隔线后，整图等比例归一到 2048×2048，再取不含白线的四块 992×992，缩为 800×800，导出 progressive JPEG，质量 92。

- 原生竖白线：x=0–10、621–630、1243–1253。
- 原生横白线：y=0–9、622–630、1243–1253。
- 下表 box 右、下坐标不包含在裁剪范围内；按实测避开白线。

| 正式图 | 2048 空间裁剪框 (left, top, right, bottom) | 成品像素 | 字节 |
|---|---|---|---:|
| pick_leo_compass.jpg | (20,20,1012,1012) | 800×800 | 114805 |
| pick_lily_wall.jpg | (1034,20,2026,1012) | 800×800 | 172192 |
| pick_biscuit_sock.jpg | (20,1034,1012,2026) | 800×800 | 145660 |
| pick_mia_scared.jpg | (1034,1034,2026,2026) | 800×800 | 124959 |

逐张查看最终 JPG：无白线残边、无跨格物件、关键主体完整；人物、物件与正确句相符，另外两句均不符合画面。无字母、数字、徽标、伪字、题号或答案文字。

本机原始证据（shots 不作为网页发布资源）：`shots/image_generation/pick_sheet_a_original.png`、`pick_sheet_a_normalized.png`、`pick_measurements.json`。
