---
title: 第2集真实配音与逐词时间核验
created: 2026-10-11
status: 文件与逐词时间核验通过，识别差异已记录
---

# 第2集 · 真实配音核验

37/37个正式MP3已实际生成并完整解码；ID集合与台词和lines.json完全一致，无缺文件、重复替代或额外文件。角色分配为旁白29、Lily4、Leo2、Sam1、Mia1。固定音色的剪映选择和输入全文由Computer Use回读，详见 [VOICE_PREPARATION.md](VOICE_PREPARATION.md)。音频识别用于检查内容，不作为口音评分。

## 裁剪与交付

原始导出保留不改。先无提示识别整批，再按句序映射，切点全部选在实测静音区，句首句尾保留约0.12秒安全余量；句中发音不作剪切。正式文件前静音最大0.120秒，后静音最大0.173秒，均不足0.3秒。第一句从原3.030秒裁为2.560秒。两次 `This is Leo's shield.` 分别存为 `ex_q6_owner.mp3` 和 `card_shield.mp3`。

37个正式文件与lines.json已同步复制到本地台词交付目录audio，逐文件SHA-256与仓库一致。原始MP3、源hash、裸转写逐词结果、切点与正式hash保留本地 `*_TRANSCRIPTION.json`、`*_CUTS.json` 和 `FINAL_AUDIO_CHECK.json`；私有工作文件不进入公开仓库。

## 无提示内容检查

对每个正式MP3另做small.en无initial_prompt裸转写。35/37句去大小写、空白、标点与撇号后英文字符序列完全一致（约94.6%的句子）；这不是逐词准确率，也不据此判定音频有5.4%错误。两项差异保留如下：

| 文件 | 无提示结果与复核证据 | 判断范围 |
|---|---|---|
| ex_q2_known | 正式单句small.en识别成 `Bring me the helmet and Biscuit's mouth.`；原整批base.en和small.en均识别 `in Biscuit's mouth`。剪切仅在首尾静音，不涉及句中in。 | 无提示模型/上下文分歧；没有独立证据证明音频把in读成and。保留原结果，不改写成一致。 |
| card_sock | 原整批与正式单句均识别成 `This is Biscuit Sock.`；原剪映输入逐字回读确认 `This is Biscuit's sock.`。 | 所有格s与sock起始s连续，ASR未独立识别所有格不等于漏读。按根代理明确验收口径保留此不确定项并交付，不强制重录。 |

早期base.en还把Mia's拆成me as、axe is连成axis；small.en无提示复核分别准确识别Mia's、axe is。两份真实结果均保留，没有修改原转写。sailors'与sailor's在口语中同音；撇号位置由原台词和输入文字核验，不能靠自动转写辨别。

关键语法文本 a/an、the、不加冠词、captain's/sailors'/children's、knives、pieces、play chess/football 在台词、lines.json和输入文件中逐字一致；除上述两项外正式文件无提示识别也对应原句。

## 原工具对齐与时间数据

执行未经修改的原工具 `tools/align.py ep02 --model small.en`，真实退出码0。日志中37句均为whisper模式且显示match=100%，没有proportional回退。这是工具带initial_prompt稿本的词匹配结果，不能替代上面的无提示内容核验，也不能宣传为100%语音准确率。

lines.json含37句、220个逐词时间项，总时长70.534秒。逐句检查角色/英文一致、词数量与 `text.split()` 一致、逐词文字一致，时间起止有效、按顺序推进且不超出真实时长，全部通过。a/an、the、所有格与复数变化等关键词保留完整词级项。原对齐日志保存本地 `ALIGN_SMALL_LOG.txt`，正式逐句无提示记录保存 `FINAL_BARE_TRANSCRIPTION.json`。

以上只验收配音文件、文本证据和词级时间；不把配音完成当作网页播放、移动端交互或整集发布验收。本轮未提交、推送或发布。
