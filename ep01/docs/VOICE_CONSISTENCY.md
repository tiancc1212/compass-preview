# 第 1 集固定音色与逐句来源

2026-10-11。47/47 句均可串起「冻结角色/原文 → 剪映实际选音及同草稿制作 → 导出成功 → 原始文件哈希 → 真实切句与固定增益 → 正式文件哈希」。固定音色准则通过，无证据缺口。

| 角色 | 实际剪映音色 | 草稿 | 句数 |
|---|---|---|---:|
| 旁白 | 英伦学姐（English） | 10月11日 (22) | 38 |
| Leo | Energetic Male(English) | 10月11日 (23) | 6 |
| Sam | Gentle Guy（English） | 10月11日 (24) | 1 |
| Lily | Gentle Girl（English） | 10月11日 (25) | 2 |

四种音色与本轮已制作 8 集同角色映射一致；本集无 Mia、Grandpa 配音。旁白所有批次和 3 条单句补录在同一草稿内跟随文本更新，未换音色。各儿童角色新建独立草稿后选定对应音色，生成完成后再导出。音色名与英语标签来自实际界面，不把名字当作口音或年龄感的听觉证明；本轮不设听感门槛。

14 次同文复用仅发生于同一角色且原文完全相同时，原音均为本轮新录。下表“原始文件”统一位于本地 `shots/audio_raw/`；详细切句时段、哈希与 UI 流程在 `shots/voice_consistency/VOICE_SOURCE_MAP.json` 和 CSV。

| 正式 ID | 角色 | 原始文件 | 来源单句 / 同文复用 |
|---|---|---|---|
| l01 | narrator | ep01_narrator_01a.mp3 | l01 |
| l02 | leo | ep01_leo_04.mp3 | l02 |
| l03 | narrator | ep01_narrator_01a.mp3 | l03 |
| l04 | narrator | ep01_l04_rerecord.mp3 | l04 |
| l05 | narrator | ep01_narrator_01a.mp3 | l05 |
| l06 | narrator | ep01_narrator_01a.mp3 | l06 |
| l07 | narrator | ep01_narrator_01a.mp3 | l07 |
| l08 | lily | ep01_lily_06.mp3 | l08 |
| l09 | sam | ep01_sam_05.mp3 | l09 |
| l10 | narrator | ep01_narrator_01a.mp3 | l10 |
| l11 | leo | ep01_leo_04.mp3 | l11 |
| l12 | lily | ep01_lily_06.mp3 | l12 |
| l13 | narrator | ep01_narrator_01b.mp3 | l13 |
| l14 | narrator | ep01_narrator_01b.mp3 | l14 |
| ex_q1_1 | narrator | ep01_ex_q1_1_rerecord.mp3 | ex_q1_1 |
| ex_q2_1 | narrator | ep01_ex_q2_1_rerecord.mp3 | ex_q2_1 |
| ex_q2_2 | narrator | ep01_narrator_01b.mp3 | ex_q2_2 |
| ex_q2_3 | narrator | ep01_narrator_01b.mp3 | ex_q2_3 |
| ex_q3_1 | narrator | ep01_narrator_01b.mp3 | ex_q2_3（同文复制） |
| ex_q3_2 | narrator | ep01_narrator_02a.mp3 | ex_q3_2 |
| ex_q3_3 | narrator | ep01_narrator_02a.mp3 | ex_q3_3 |
| ex_q4_1 | narrator | ep01_ex_q1_1_rerecord.mp3 | ex_q1_1（同文复制） |
| ex_q4_2 | narrator | ep01_narrator_01b.mp3 | ex_q2_2（同文复制） |
| ex_q4_3 | narrator | ep01_narrator_02a.mp3 | ex_q4_3 |
| ex_q4_4 | narrator | ep01_narrator_02a.mp3 | ex_q4_4 |
| ex_q5_1 | narrator | ep01_narrator_02a.mp3 | ex_q5_1 |
| ex_q5_2 | narrator | ep01_narrator_02b.mp3 | ex_q5_2 |
| ex_q5_3 | narrator | ep01_narrator_02b.mp3 | ex_q5_3 |
| ex_q6_1 | narrator | ep01_narrator_01a.mp3 | l10（同文复制） |
| ex_q6_2 | narrator | ep01_narrator_02b.mp3 | ex_q6_2 |
| ex_q6_3 | narrator | ep01_narrator_01a.mp3 | l03（同文复制） |
| ex_q7_1 | narrator | ep01_narrator_02a.mp3 | ex_q3_3（同文复制） |
| ex_q7_2 | narrator | ep01_narrator_02a.mp3 | ex_q3_2（同文复制） |
| ex_q7_3 | narrator | ep01_ex_q1_1_rerecord.mp3 | ex_q1_1（同文复制） |
| ex_q8_1 | narrator | ep01_ex_q2_1_rerecord.mp3 | ex_q2_1（同文复制） |
| ex_q8_2 | narrator | ep01_narrator_01b.mp3 | ex_q2_3（同文复制） |
| ex_q8_3 | narrator | ep01_narrator_01b.mp3 | ex_q2_2（同文复制） |
| ex_q8_4 | narrator | ep01_narrator_02a.mp3 | ex_q3_2（同文复制） |
| ex_q8_5 | narrator | ep01_narrator_02b.mp3 | ex_q8_5 |
| ex_q8_6 | narrator | ep01_narrator_02b.mp3 | ex_q5_3（同文复制） |
| ex_q8_7 | narrator | ep01_narrator_02b.mp3 | ex_q8_7 |
| ex_q8_8 | narrator | ep01_ex_q1_1_rerecord.mp3 | ex_q1_1（同文复制） |
| card_brave | leo | ep01_leo_04.mp3 | card_brave |
| card_curious | leo | ep01_leo_04.mp3 | card_curious |
| card_kind | leo | ep01_leo_04.mp3 | card_kind |
| card_happy | leo | ep01_leo_04.mp3 | card_happy |
| star | narrator | ep01_narrator_02b.mp3 | star |

角色选音的原生界面截图保存在 `shots/voice_consistency/narrator_selected.jpg`、`leo_selected.jpg`、`sam_selected.jpg`、`lily_selected.jpg`，Leo 生成音轨还直接显示同名音色。工具调用回读摘录与原始会话行号保存在同目录 UI_FLOW.json / UI_TOOL_EXCERPTS.json；这些制作原始证据不公开提交。
