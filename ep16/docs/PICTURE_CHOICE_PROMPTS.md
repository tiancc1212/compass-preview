# 第 16 集 · 看图选句插图生图要求

给 Codex 用自己的生图工具生成。共 **2 张图**，每张是 2×2 四宫格。网页先不动，图片生成后交给 Willo 切图接入。

## 输出
- 文件：`ep16_pick_A.png`（stop + remember）、`ep16_pick_B.png`（forget + try）
- 保存到：`/Users/tianchangchun/Study/03_英语/02-语法/语法初始化/台词/第16集_插图/`（没有就新建）
- 尺寸：2048×2048 正方形，每格约 1024×1024，格子之间留**细而干净的白色分隔线**（约 16px），四格大小一致
- **图里不能出现任何文字、字母、标注、对话框里的字**（思考气泡里只画图）

## 角色参考图
如果工具支持参考图，请用之前那张角色设定图：`第16集_插图/character_sheet_ref.jpg`（已放在同一文件夹）。只参考衣服、发型和配色，**Leo 的脸要原创，不要照搬照片里孩子的脸**。

## 通用风格块（每张提示词开头都加）
```
Pixar-like 3D animated film still, warm cinematic lighting, soft depth of field, bright friendly colours, cute and clear for children aged 9-12. Square 2048x2048 image arranged as a 2x2 grid of four equal panels separated by thin clean white gutters. Same characters, same style and same lighting in every panel. Absolutely no text, no letters, no numbers, no captions, no logos anywhere.
Cast (keep on-model): Leo = 10-year-old boy, short buzz cut, original face, white polo shirt with navy collar and cuffs, blue-green (teal) track trousers, white trainers. Mia = girl in a lavender outfit carrying a sketchbook. Sam = sporty boy in orange. Lily = smart girl in green and white. Biscuit = small cute light-brown dog. Grumble = tall, fluffy, friendly purple monster with big round eyes and small horns (cute, not scary). Setting: colourful outdoor monster job fair with striped tents and bunting.
```

## 图 A：`ep16_pick_A.png`
| 位置 | 对应句子 | 画面要点（必须一眼看出区别） |
|---|---|---|
| 左上 | Biscuit stopped barking. | Biscuit **嘴闭着**、安静坐好；旁边淡淡的"声波线"正在消失；Lily 竖起手指示意安静 |
| 右上 | Biscuit stopped to sniff the socks. | Biscuit **停下脚步、低头用鼻子闻**一堆彩色袜子，有小小的气味线；不叫 |
| 左下 | Remember to bring your badge. | **出门前**：Lily 在门口指着桌上**还没拿的徽章**，Leo 头上的思考气泡里画着徽章 |
| 右下 | I remember meeting this monster before. | **回忆闪回**：Leo 看着 Grumble 微笑，头顶一个柔和的、偏棕旧色调的大回忆泡泡，里面是更小的 Leo 以前和 Grumble 握手 |

提示词：
```
[通用风格块]
Top-left panel: Biscuit the small dog sits quietly with his mouth firmly closed, faint sound-wave lines fading away; Lily holds up one finger for quiet. 
Top-right panel: Biscuit pauses mid-walk and lowers his nose to sniff a pile of colourful socks, small scent swirls rising; mouth closed, curious.
Bottom-left panel: at a tent doorway before leaving, Lily points back at a shiny badge still lying on a table; Leo, about to walk out, has a thought bubble showing the badge.
Bottom-right panel: Leo smiles up at Grumble; above Leo's head a large soft sepia-toned memory bubble shows a younger Leo shaking hands with Grumble in the past.
```

## 图 B：`ep16_pick_B.png`
| 位置 | 对应句子 | 画面要点 |
|---|---|---|
| 左上 | Don't forget to feed Biscuit. | **还没做**：Mia 指着**空的狗碗**和旁边的狗粮袋，Biscuit 眼巴巴看着空碗 |
| 右上 | I'll never forget visiting the pyramid. | **已经做过的难忘回忆**：Mia 抱着素描本微笑，回忆泡泡（暖色旧照片感）里是全队在金字塔前 |
| 左下 | I tried to run faster. | **努力**：Sam 在跑道上全力冲刺、满头大汗、表情用力，速度线 |
| 右下 | I tried pulling the door. | **试一种办法**：Sam 双手拉一扇卡住的木门把手，身体后仰试试拉行不行；Leo 在旁边推过没用，耸肩 |

提示词：
```
[通用风格块]
Top-left panel: Mia points at an EMPTY dog bowl next to an unopened bag of dog food; Biscuit looks hopefully at the empty bowl.
Top-right panel: Mia hugs her sketchbook and smiles dreamily; a warm, sepia-toned memory bubble above her shows the whole crew standing happily in front of an Egyptian pyramid.
Bottom-left panel: Sam sprints on a running track with all his strength, sweating, determined face, strong speed lines behind him.
Bottom-right panel: Sam grips the handle of a stuck wooden door with both hands and pulls, leaning back, testing whether pulling works; Leo beside him shrugs after trying to push it.
```

## 备选方案（四宫格不一致时）
如果角色在四格里长得不一样、格子不等大或混进了文字，就改成**单张生成**：每格一张，1024×1024，共 8 张。提示词用"通用风格块"，但把 2x2 grid 那句换成 `Single square 1024x1024 image.`，再接对应格的那一句描述。文件名：
`ep16_pick_stop1.png`、`ep16_pick_stop2.png`、`ep16_pick_remember1.png`、`ep16_pick_remember2.png`、`ep16_pick_forget1.png`、`ep16_pick_forget2.png`、`ep16_pick_try1.png`、`ep16_pick_try2.png`（顺序同上表，1 = 左/上一格）。

## 检查清单
- [ ] 2 张 2048×2048，四格等大，细白分隔线
- [ ] 全图没有任何文字、字母、数字
- [ ] 角色衣服发型配色与设定一致；Leo 脸为原创
- [ ] 每对图意思区别一眼可见：stop 闭嘴 vs 停下来闻；remember/forget 未做（东西还在、碗是空的）vs 回忆泡泡；try 用力跑 vs 拉门试办法
- [ ] 回忆格用暖棕旧色调泡泡，和"现在"明显区分
- [ ] 格子顺序与上表一致
- [ ] 文件名正确，存进 `第16集_插图/`
