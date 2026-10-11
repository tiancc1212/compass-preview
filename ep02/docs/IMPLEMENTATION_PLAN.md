# 第 2 集制作执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. 本轮已获家长开工授权，按已确认内容执行，不再重复询问常规选择。

**Goal:** 完成第 2 集《维京船上的寻物单》的 19 张正式插图、37 句剪映配音、互动页面、同步对齐、手机/电脑测试与 GitHub Pages 预览发布。

**Architecture:** 仅在 `ep02/` 建新集，复用 ep16 的播放器与资源，替换本集故事、活动、地图和收藏卡。台词追加在本地原表；私有参考图和配音工作文件仅留本地。剪映生成与导出全部由 Codex 通过 Computer Use 完成，CoCo 不参与。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Three.js 罗盘、内置 imagegen、剪映 Computer Use、ffmpeg、faster-whisper、Puppeteer。

## 1. 台词与制作资料

- [x] 根据 STORY_PLAN.md、QUESTIONS_PLAN.md 生成 37 条正式台词，追加到本地 `台词/台词.md` 第 2 集，不改第 1/16 集段落。
- [x] 运行 `python3 tools/make_lines.py <台词绝对路径> '第 2 集' ep02/audio/lines.json`；验收 37 个 ID、角色、英文与批准稿一致。
- [x] 在本地 `台词/第2集_维京船上的寻物单/` 建工作目录，按角色整理剪映输入和文件映射。

## 2. 插图

- [x] 先生成并核对船长参考及全队登船图；原角色每张都实际附主设定图。
- [x] 按 VISUAL_PLAN.md 逐张完成 9 张故事、3 张选句和 7 张物品图；逐张核对角色、道具、数量、无文字。
- [x] 原图与提示词存本地 `台词/第2集_插图/`；正式 JPG 放 `ep02/illus/`。尺寸、压缩、手机裁切按实际成品核验。

## 3. 页面

- [x] 复制 ep16 的 index/app/css/badges/lib/fonts/model 到 ep02，保留本集 docs，不复制旧音频或旧插图。
- [x] 实现 Q1—Q6 共 18 步，中文答错反馈、两次错误后显示答案、随机选项/词卡、正确后音频、回看保留进度。
- [x] 15 句 SEC 分 4 段；逐句 img 对应 VISUAL_PLAN；地图 M1—M6、3 件收藏卡和第 2 颗星。徽章只在本集扩展 SVG；播放器原段不改。
- [x] 本集缓存版本从 1 开始，调试入口 q1/q2/q3/q4/q5/q6/map/card；保留自动测试作答接口。

## 4. 剪映配音（最新操作规则）

- [x] Codex 用 Computer Use 建独立第 2 集配音草稿，保留当前旧项目；不调用 CoCo，不交给家长制作。
- [x] 沿用旁白英伦学姐、Leo Energetic Male、Mia Adorable Girl、Sam Gentle Guy、Lily Gentle Girl；界面核对实际选中音色。
- [x] 用剪映生成并导出真实音频。允许按角色整段生成后，用 ffmpeg 按实际句子边界切分为 37 个 mp3；不使用其他 TTS 或静音占位。
- [x] 有会员或额度提示时不付费、不更换音色绕开；先检查免费/已有可用权益，不能完成时记录具体阻碍。

## 5. 对齐与音频验收

- [x] 核对 37 个文件完整解码、有效声音、句首句尾留白不超过约 0.3 秒；保留源音频和切分记录。
- [x] 安装工具在仓库 tools/venv，作为本地排除项，不提交环境或模型。
- [x] 运行 `tools/venv/bin/python tools/align.py ep02 --model small.en`；逐句检查 match、对齐方式及裸转写，关键语法词必须可辨。

## 6. 真实测试

- [x] 本地服务 8716；手机 390×844、电脑 1280×800，从头到尾通过并测试每类错答。
- [x] 检查音频答前不播、同步高亮、手动/自动/静音/速度、滑动不干扰练习、回看保留进度、故事无卡片覆盖。
- [x] 检查 19 张图和 37 段音频无缺失；原有第 1 集和第 16 集无变化。截图只留本地。

## 7. 发布与回读

- [x] 只提交 ep02（必要的工具修改另说明），不提交私有参考、工作音频、环境、截图；不改个人网站。
- [x] 推送 compass-preview main；等 Pages 完成，再核验 `ep02/?v=1` 的页面与资源，并线上复跑关键测试。
- [x] 向家长交付预览链接、玩法、配音验收和实际限制；未完成的环节不写成完成。
