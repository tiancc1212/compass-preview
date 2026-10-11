---
title: 第2集 看图选句实际生成提示词
created: 2026-10-11
status: 已生成并完成文件核验
---

# 第2集插图提示词

全部由 Codex 内置 `image_gen` 生成，每个正式资产单独调用；没有使用 API 付费路径、其他生成服务、程序绘制或占位图。原始 PNG、私有参考、船长设定和详细调用记录只保留本地；本目录只交付正式 JPG 与文档。

角色参考标识：R0 为原始四童与 Biscuit 主设定；R1 为场景辅助；R2 为近景辅助；C0 为本集先行制作并核对的船长设定。每次含固定角色的生成均通过 `referenced_image_paths` 真正附 R0。配角船长出镜时另外附 C0；不把 Grumble 或爷爷加入本集。

三张均为独立生成单图，没有四宫格切图。状态逐张核对：Q2.1 手空尚未选择；Q2.2 已经持有普通小头盔；Q2.3 所有人眼前唯一的一顶月牙船长头盔。

## pick_helmet_again.jpg

实际附件：R0 主角色设定；04_wrong_helmet。

```text
Use case: illustration-story. One single high-quality warm cinematic 3D animated family-adventure illustration. Input 1 is the exact original character identity reference: use these SAME four children and SAME little dog, never redesign their faces. Leo short dark buzzcut, white polo with navy collar and sleeve cuffs, teal track pants, white shoes; Mia dark brown side-part ponytail, lavender zipped hoodie, navy trousers, lavender shoes, brown sketchbook; Sam fluffy dark curly hair, orange zipped hoodie with light sleeve stripes, cream shirt, navy trousers, dark shoes; Lily dark brown low ponytail with green tie, round glasses, green jacket over white collared shirt, dark trousers, grey shoes. Biscuit small golden-brown fluffy curly dog, floppy ears, round dark eyes, black nose, brown collar and small round brass tag. No readable badges or logos on clothes, abstract colored motif only. Retain exact reference face shapes, hair, clothes colors and body proportions. Viking longship setting with wooden deck, rope, dragon prow, blue sea, warm late-afternoon light. Only characters specifically requested for the scene. No monsters, no grandfather, no horned helmets. No text, writing, letters, numbers, captions, logos or watermark anywhere. SQUARE 1:1 image, clean central composition for picture-choice activity. Mia alone in lavender jacket, same original face and side-part ponytail, already holds the SAME small plain gray helmet shown in Input 2 at chest height with BOTH hands. Tiny helmet is clearly too small for adult; same rivets, no crest, NO crescent, HORNLESS. No other helmet anywhere. Her brown sketchbook rests closed on table at side. Focus on puzzled smiling Mia and held helmet, full face and hands visible. No text.
```

## pick_helmet_any.jpg

实际附件：R0 主角色设定；04_wrong_helmet。

```text
Use case: illustration-story. One single high-quality warm cinematic 3D animated family-adventure illustration. Input 1 is the exact original character identity reference: use these SAME four children and SAME little dog, never redesign their faces. Leo short dark buzzcut, white polo with navy collar and sleeve cuffs, teal track pants, white shoes; Mia dark brown side-part ponytail, lavender zipped hoodie, navy trousers, lavender shoes, brown sketchbook; Sam fluffy dark curly hair, orange zipped hoodie with light sleeve stripes, cream shirt, navy trousers, dark shoes; Lily dark brown low ponytail with green tie, round glasses, green jacket over white collared shirt, dark trousers, grey shoes. Biscuit small golden-brown fluffy curly dog, floppy ears, round dark eyes, black nose, brown collar and small round brass tag. No readable badges or logos on clothes, abstract colored motif only. Retain exact reference face shapes, hair, clothes colors and body proportions. Viking longship setting with wooden deck, rope, dragon prow, blue sea, warm late-afternoon light. Only characters specifically requested for the scene. No monsters, no grandfather, no horned helmets. No text, writing, letters, numbers, captions, logos or watermark anywhere. SQUARE 1:1 image, clean central composition for picture-choice activity. On a simple ship-deck wooden table stand exactly THREE ordinary gray HORNLESS metal helmets, all without crescent or any symbol. Mia alone in lavender jacket stands behind them, wondering which to choose. Mia's TWO hands are clearly EMPTY and open near her waist, not touching or holding any helmet. Her brown sketchbook rests closed off to side. No other characters. Head and hands and all three helmets fully visible. Every helmet is on table, none selected. No captain helmet. No text.
```

## pick_helmet_known.jpg

实际附件：R0 主角色设定；05_biscuit_reveal。

```text
Use case: illustration-story. One single high-quality warm cinematic 3D animated family-adventure illustration. Input 1 is the exact original character identity reference: use these SAME four children and SAME little dog, never redesign their faces. Leo short dark buzzcut, white polo with navy collar and sleeve cuffs, teal track pants, white shoes; Mia dark brown side-part ponytail, lavender zipped hoodie, navy trousers, lavender shoes, brown sketchbook; Sam fluffy dark curly hair, orange zipped hoodie with light sleeve stripes, cream shirt, navy trousers, dark shoes; Lily dark brown low ponytail with green tie, round glasses, green jacket over white collared shirt, dark trousers, grey shoes. Biscuit small golden-brown fluffy curly dog, floppy ears, round dark eyes, black nose, brown collar and small round brass tag. No readable badges or logos on clothes, abstract colored motif only. Retain exact reference face shapes, hair, clothes colors and body proportions. Viking longship setting with wooden deck, rope, dragon prow, blue sea, warm late-afternoon light. Only characters specifically requested for the scene. No monsters, no grandfather, no horned helmets. No text, writing, letters, numbers, captions, logos or watermark anywhere. SQUARE 1:1 image, clean central composition for picture-choice activity. Sam in orange hoodie with exact curls and Lily in green jacket with exact low ponytail, green hair tie and ROUND GLASSES, crouch beside SAME Biscuit in foreground. BOTH look at ONE uniquely identifiable captain's gray HORNLESS helmet with brass crescent, hanging from brown leather strap gently held in Biscuit's mouth. Input 2 defines the exact helmet prop. No other helmets anywhere, no captain, no Leo or Mia. Dog mouth holds only leather strap, NO SOCK. Clear frontal crescent, same fluffy golden curls and collar brass tag. All three faces and whole single helmet visible.
```
