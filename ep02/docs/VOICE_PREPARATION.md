---
title: 第2集配音准备与完成状态
created: 2026-10-11
status: 37个真实音频已完成，逐词对齐与文件核验通过
---

# 第2集 · 配音完成状态

37个真实MP3已由Codex通过Computer Use在剪映按固定音色、使用当前可用权益生成和导出，按真实静音边界裁剪后写入 `ep02/audio/`。故事15句、活动正确句18句、收藏卡3句、结尾1句；CoCo未参与。台词和音频文件映射见正式台词表与 `audio/lines.json`。

| 角色 | 句数 | 固定剪映音色 |
|---|---|---|
| 旁白 | 29 | 英伦学姐English |
| Lily | 4 | Gentle GirlEnglish |
| Leo | 2 | Energetic MaleEnglish |
| Sam | 1 | Gentle GuyEnglish |
| Mia | 1 | Adorable GirlEnglish |

正式台词六列表格、37个合法唯一ID、角色、英文及MP3映射已核验。原第1集、第16集及此前14,635字节完全保留，原内容SHA-256为 `520c22446c94365dc19d64c33ecc5cf50bb07f4f3838d550323a6df22b7aa80b`。

原 `tools/make_lines.py` 生成文本清单；音频齐全后使用未经修改的 `tools/align.py ep02 --model small.en` 计算真实时长和逐词时间。37条均为whisper模式，没有proportional回退；220个词的文本、数量与时间边界检查通过，总音频时长70.534秒。对齐日志带稿匹配与无提示裸转写分别核验，具体差异和范围见 [VOICE_VERIFICATION.md](VOICE_VERIFICATION.md)。

本地venv使用faster-whisper 1.2.1、numpy 2.5.4、PyAV 16.1.0；base.en和small.en模型已缓存，音频识别本地运行。SOCKS支持由socksio 1.0.0提供。puppeteer-core导入检查通过，ffmpeg/ffprobe可用。环境目录只在 `.git/info/exclude` 本地排除，原工具和package.json保持原样，无新增package-lock。

原导出、角色输入、清单、裸转写、切点、hash与完整对齐日志保留本地工作目录，不进入公开仓库。37个正式MP3及lines.json已另存本地交付目录audio，逐文件hash与仓库完全一致。本轮未提交或推送。
