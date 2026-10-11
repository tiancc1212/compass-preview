# 第 1 集图片验收

验收日期：2026-10-11。当前正式图片共 9 张：5 张故事图、1 组四宫格切出的 4 张题图。均已查看最终压缩 JPG，检查人物、题意、文字、构图及正式文件尺寸。故事和题图引用已由内容制作代理接入；本记录不替代浏览器端叠字和答题验收。

## 当前结论

9 张通过本轮图像验收。故事画风与第 16 集的温暖 3D 动画风格、角色发型和衣服配色一致；Leo 为原创风格化面孔。每幅故事均为四个孩子加 Biscuit，没有多出或缺少伙伴。

全部正式图片未见文字、字母、数字、伪字、水印或衣服徽标。初版 01、04、05 罗盘内的微小方向文字已用 image_gen 去除并改为 v2；未用手工擦图。新罗盘放大检查只见金色盘面和指针。02、03 的罗盘为无字放射刻线；Sam 袖条上的小矩形是条带扣装饰，阁楼书脊是几何与花纹装饰，放大检查未见字词。按本轮标准保留不影响教学判断的装饰差异。

四宫格原生 1254×1254 按用户最新标准接受。四道看图题均可依据人物、动作、物件或表情唯一选择正确句；数量、位置没有影响答题的歧义。完整选项与排除理由见 [PICTURE_CHOICE_PROMPTS.md](PICTURE_CHOICE_PROMPTS.md)。

## 正式文件逐图记录

| 图片 | 正式尺寸 | 字节 | 逐图检查 |
|---|---|---:|---|
| [01_attic_v2.jpg](../illus/01_attic_v2.jpg) | 1920×1080 | 293287 | 四孩和狗在阁楼；Leo 握罗盘；爷爷不出镜；罗盘无字；书、本子无文字 |
| [02_arrival.jpg](../illus/02_arrival.jpg) | 1920×1080 | 294864 | 四孩和狗传送进金字塔，脚边光圈；石墙与门牌无文字；嘴里无袜 |
| [03_mia_torches.jpg](../illus/03_mia_torches.jpg) | 1920×1080 | 289223 | Mia 稍害怕并抱本子；火把点亮；四孩和狗齐全；门上大牌空白 |
| [04_biscuit_sock_v2.jpg](../illus/04_biscuit_sock_v2.jpg) | 1920×1080 | 297642 | Biscuit 叼着一只灰白条纹旧袜；四孩围看；罗盘无字 |
| [05_door_open_v2.jpg](../illus/05_door_open_v2.jpg) | 1920×1080 | 299200 | 石门打开；四孩和狗；一颗明确五角金星；同一条纹袜；线索牌空白，罗盘无字 |
| [pick_leo_compass.jpg](../illus/pick_leo_compass.jpg) | 800×800 | 114805 | 只有 Leo，双手拿罗盘；没有 Mia 或手持火把，盘面无字 |
| [pick_lily_wall.jpg](../illus/pick_lily_wall.jpg) | 800×800 | 172192 | 只有 Lily，戴眼镜，眼睛和手指朝墙；书合上低放，无罗盘 |
| [pick_biscuit_sock.jpg](../illus/pick_biscuit_sock.jpg) | 800×800 | 145660 | 只有 Biscuit 和地上一只袜，鼻尖发现袜子；没有球或 Leo |
| [pick_mia_scared.jpg](../illus/pick_mia_scared.jpg) | 800×800 | 124959 | 只有 Mia，抱紧本子、缩肩、睁大眼，轻微害怕；无笑或怒容 |

正式图片共 2,031,832 字节。全部故事图小于 300,000 字节，全部方图小于 250,000 字节。illus 内无未引用旧版或原始四宫格；5 张故事使用完整相对路径，4 张题图使用由引擎补齐路径的 pick 短名。

## 生成、裁图与压缩

故事原生输出均为 1672×941，确定性缩放到 1920×1080，progressive JPEG。01、04、05 最终质量参数分别为 79、85、80；02 为 82、03 为 76。该缩放只满足发布尺寸，不声称增加原生细节。

四宫格原生 1254×1254；测量白线后等比例归一到 2048×2048，按实测避开白线取四个 992×992 方块，再缩为 800×800，质量 92。逐张查看无白线残边、跨格物件或关键主体截断。具体裁剪框见 [PICTURE_CHOICE_PROMPTS.md](PICTURE_CHOICE_PROMPTS.md)。

只对初版实际发现的罗盘文字重生成小区域；完整原图为编辑目标，放大截图仅辅助定位，保留完整横图构图。3 个旧 JPG 及原 PNG 全部保留在 shots，未删除原始证据。

## 本地证据

下列路径相对 ep01，shots 仅本地保存，不属于网页发布素材：

- 最终尺寸、字节与 SHA-256：`shots/image_generation/final_manifest.json`。
- 故事原生输出：`shots/image_generation/01_attic_original.png` 等 5 张；原始尺寸与初版输出记录 `story_measurements.json`。
- 三张修复输出与旧正式图：`shots/image_generation/compass_cleanup/`；最终测量 `repair_measurements.json`。
- 四宮格原生输出与归一图：`shots/image_generation/pick_sheet_a_original.png`、`pick_sheet_a_normalized.png`；白线与裁框记录 `pick_measurements.json`。
- 罗盘修复后浏览器只读放大截图：`shots/image_generation/zoom_review/ep01_01_compass_after_zoom.png`、`ep01_04_compass_after_zoom.png`、`ep01_05_compass_after_zoom.png`。
- 02/03 罗盘、袖条装饰和阁楼书脊检查：同目录的 `ep01_02_compass_zoom.png`、`ep01_03_compass_zoom.png`、`ep01_02_sleeve_zoom.png`、`ep01_03_sleeve_zoom.png`、`ep01_01_books_zoom.png`。

浏览器放大截图只用于观察已生成图片，没有用来修改正式图片的像素。私密角色参考图未复制到 ep01 或公开仓库。

## 网页叠字与边界

03 和 05 的牌子保持空白，`Speak a full sentence.` 与 `C. C. was here – 1975` 由网页叠加。牌框位置及文字安全带见 [PROMPTS.md](PROMPTS.md)。

本图像验收确认 PNG/JPG 的内容、人物、无文字和题意。手机、横屏、电脑实际加载、叠字、选项乱序及按钮操作，由最终浏览器验收单独记录。没有把缩略图检查或文件尺寸检查当作全流程完成证明。
