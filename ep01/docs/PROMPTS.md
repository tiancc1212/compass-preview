# 第 1 集图片提示词

制作日期：2026-10-11。素材按本轮第 1 集重制计划生成；根目录旧插图仅作故事顺序参考，不直接复用。

## 共用约束

5 张故事图均使用下列前缀；每张单独调用内置 image_gen。先实际查看第 16 集角色设定及集内风格图，再生成。角色设定图仅在本机作服装、发型、配色参考，人物脸为原创风格化面孔。私密参考图不复制到本集或公开仓库。

参考：本机 `台词/第16集_插图/character_sheet_ref.jpg`；仓库 `ep16/illus/01_fair_gate.jpg`。

```text
Pixar-like 3D animated film still, 16:9 (1920x1080), warm cinematic lighting, soft depth of field, no text, no letters, no logos on signs (signs are blank – text is overlaid in HTML).
Use case: illustration-story. Input image 1 is only the character clothing/hair/colour reference; image 2 is only lighting/material/style reference, NOT this episode's setting. Use original stylized faces, never copy a real person's face. Cast exactly FOUR children: Leo, lead boy with buzz cut, white polo with navy collar/cuffs, teal track trousers and white trainers; Mia, ponytail, lavender zip hoodie, blue jeans and purple shoes, brown sketchbook; Sam, curly brown hair, orange sporty zip hoodie with white arm stripes, blue jeans; Lily, glasses, ponytail, green cardigan over white polo, dark trousers, brown book; Biscuit a small fluffy brown poodle-mix puppy. Keep faces, age, clothes and proportions consistent with references. Clothes plain except specified white stripes, no crest or tiny logos/letters anywhere. Every compass has simple unlabeled needle and ticks, no N/S/E/W.

```

## 阁楼发现罗盘 — 01_attic_v2.jpg

正式文件：[01_attic_v2.jpg](../illus/01_attic_v2.jpg)。

```text
Cozy timber attic at golden hour. An old carved chess box is open on the floor with a few chess pieces inside, no letters. Leo at centre lifts the newly discovered glowing brass compass with both hands; Mia, Sam and Lily lean in around him with curious excited faces. Biscuit stands beside the open box looking up, EMPTY mouth, no sock yet. Whole-body medium-wide composition with all four children clearly visible, soft dust in window sunbeams, trunks and beams in background. All book covers and trunks plain, no writing, no logos. This is the start of their adventure. Complete uncropped landscape scene.
```

## 传送进入金字塔 — 02_arrival.jpg

正式文件：[02_arrival.jpg](../illus/02_arrival.jpg)。

```text
The FOUR children and Biscuit have just materialized in an ancient Egyptian pyramid chamber, with a low golden magical swirl at their feet fading into the air. Leo in front holds the softly glowing brass compass at waist height. All four look amazed at the chamber; Biscuit has EMPTY mouth. Sandstone block walls and a large CLOSED stone doorway in the background. Cool blue ambient shadows balanced by warm compass glow. CRITICAL: walls are PLAIN sandstone, only stone joints and broad non-symbolic geometric borders; NO hieroglyphs, NO symbols resembling writing, NO inscriptions, NO tiny scratches arranged like letters, NO numbers. Door lintel is a smooth BLANK rectangular stone panel. Distinct full faces, readable silhouettes, all five characters fully in frame, original 16:9 cinematic composition.
```

## Mia 害怕，空白石门 — 03_mia_torches.jpg

正式文件：[03_mia_torches.jpg](../illus/03_mia_torches.jpg)。

```text
Inside the SAME Egyptian pyramid chamber as the arrival: FOUR children and Biscuit near a massive CLOSED sandstone double door lit by wall torches. Mia in lavender clutches her plain brown sketchbook to her chest, shoulders slightly drawn up and eyebrows raised in a mildly scared expression; brave Leo white/navy polo calmly stands beside her holding the small compass. Sam orange hoodie watches, Lily green cardigan and glasses points thoughtfully toward a large BLANK stone panel on the door. Biscuit at their feet, empty mouth. CRUCIAL COMPOSITION: keep all faces beneath 40% image height, arrange the four children across the lower foreground; large rectangular smooth ivory-sandstone panel centered around x50%, y22%, spanning 34% of image width and 17% of image height, entirely unobstructed for later web text. It is a plaque inset in the tall stone door, no writing or symbols. Egyptian atmosphere using warm torches, simple stone columns and geometric edges only; NO hieroglyphs, no inscriptions, no pseudocharacters anywhere. Full-body wide 16:9 shot, all characters readable, friendly child adventure mood.
```

## Biscuit 叼着旧条纹袜 — 04_biscuit_sock_v2.jpg

正式文件：[04_biscuit_sock_v2.jpg](../illus/04_biscuit_sock_v2.jpg)。

```text
Floor-level medium-wide view in the SAME torch-lit ancient pyramid chamber. Biscuit the small brown fluffy poodle puppy is in the foreground looking pleased, holding ONE old dusty GREY AND CREAM HORIZONTALLY STRIPED SOCK in its mouth, the sock hangs clearly down. All FOUR children surround and watch: Leo crouches in white polo/navy trim holding the compass low; Mia with ponytail lavender hoodie and brown sketchbook smiles; Sam curly hair orange hoodie is amused; Lily in glasses and green cardigan kneels nearby. Show all four children's distinct faces, not cropped. Background PLAIN sandstone walls, a closed door and warm torches, no hieroglyphs or inscriptions or logos or pseudoletters anywhere. Focus on dog finding sock, with human reactions. Clothing chest and sleeves plain except straight white sports stripes, no badges or letterlike emblems.
```

## 石门打开，获得一颗星 — 05_door_open_v2.jpg

正式文件：[05_door_open_v2.jpg](../illus/05_door_open_v2.jpg)。

```text
The SAME Egyptian pyramid's tall stone double doors have opened to reveal a softly glowing golden chamber. FOUR children with familiar clothes and Biscuit form a delighted group across the lower half of the image; Leo at centre-front holds an open brass compass low in one hand, and ONE luminous golden five-pointed star floats just above it, first reward. Biscuit holds ONE old grey-and-cream striped sock. Faces visible in three-quarter view, not silhouettes. Behind them through the open doorway is a broad smooth BLANK rectangular ivory sandstone clue plaque centred around x50% y22%, at least 38% image width and 16% image height, unobscured with no intense overexposure, suitable for later web text. No text in the image. No hieroglyphs or letters/numerals/inscriptions anywhere. All walls plain sandstone blocks with large non-symbolic triangular borders only. Warm cinematic golden revelation, no additional stars or magical star-shaped specks, no extra people. Complete landscape composition.
```

## 罗盘小字修复

初版 01、04、05 的罗盘有微小字母状方向标记。逐张以完整原图为目标、浏览器放大截图为辅助参考调用 image_gen；保留完整构图，使用新的 v2 文件名。旧版及原生输出保留于 `shots/image_generation/compass_cleanup/`。修复后复看正式 JPG 全图及罗盘局部，盘面只保留针，不再有文字。

01 / 04 修复提示词：

```text
Use case: precise-object-edit. The FIRST image is the complete full-image edit target. SECOND image is only a zoomed inspection guide, not target framing. Preserve the exact original full 16:9 composition, every face, pose, clothing colour, all objects, light and setting. Change ONLY the COMPASS DIAL being held by the boy in the white/navy shirt: remove ALL tiny lettering, direction glyphs, numbers, pseudoletters, markers and rim labels. Make the entire dial a CLEAN PLAIN MATTE BRASS-GOLD DISC with just ONE red-and-dark compass needle pivoted in the center. NO star compass rose, no radial spikes, NO tick marks, no decorative markings on the dial. Keep outer metal housing, lid if present and boy's hands identical. Everything outside this small compass dial must remain unchanged. No writing anywhere. Return the original complete landscape scene, never a close-up.
```

05 修复提示词：

```text
Use case: precise-object-edit. The FIRST image is the complete full-image edit target. SECOND image is only a zoomed inspection guide, not target framing. Preserve the exact original full16:9 composition, every face, pose, clothing colour, all objects, light and setting. Keep the large blank rectangular clue plaque at the top exactly unchanged in size and location; keep ONE floating golden reward star. Change ONLY the small COMPASS DIAL in Leo's outstretched hand in front of his white/navy shirt: remove ALL tiny lettering, direction glyphs, numbers, pseudoletters and rim labels. Make its entire dial a CLEAN PLAIN MATTE BRASS-GOLD DISC with just ONE red-and-dark compass needle pivoted in the center. No compass rose, radial spikes, tick marks, decorative markings or letters. Keep housing, open lid and hand position exactly the same. Everything outside that small compass dial remains unchanged. Complete uncropped landscape scene, not a close-up. No writing anywhere.
```

## 网页叠字位置

图片自身没有文字。下列为完整画面的百分比；页面叠字由本集数据与样式实现。

| 图片 | 空白牌内框 | 建议文字中心 | 建议最大宽度 | 网页文字 |
|---|---|---|---|---|
| 03_mia_torches.jpg | 左 32.4%–67.1%，上 8.8%–31.7% | left 50%，top 20% | 32% | Speak a full sentence. |
| 05_door_open_v2.jpg | 左 29.3%–70%，上 12.5%–32.5% | left 49.6%，top 19.5% | 38% | C. C. was here – 1975 |

05 下沿被 Leo 头部部分遮住，文字放在纵向 15%–24% 的安全带内，不压人物。具体手机、横屏、电脑贴牌效果以浏览器验收为准。

## 看图题

一组四宫格，具体生成提示词、顺序、最新选项和裁剪记录见 [PICTURE_CHOICE_PROMPTS.md](PICTURE_CHOICE_PROMPTS.md)。四个正确句依次为 Leo holds the compass. / Lily reads the wall. / Biscuit finds a sock. / Mia looks scared.；干扰项均使用内容代理已锁定的合语法句，不能用早期草拟的荒谬句替代。
