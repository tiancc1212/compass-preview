# 第 1 集配音验收

日期：2026-10-11T15:01:12+08:00

状态：**47/47 正式 MP3 已完成，47/47 固定角色音色来源已核验，可发布。** 本文只验配音制作，整集交互与线上检查见对应交付记录。

按用户最新要求，听感、口音、清晰度、角色年龄感等主观听感不作为验收门槛；本轮没有声称人工听过或凭听觉确认。检查的是剪映实际选音、同角色连续制作、原文输入、真实音源、格式、音量与字幕。

## 文件与测量

- 47 个文件；33 个同角色独立文本音源，14 个同角色、全文完全相同的文件共用本轮相同音源并分别保存。所有文件保留各自约定名称，复制双方字节哈希相同。
- 冻结的 47 句 `who/text` 与主台词生成快照逐字一致，未改台词。旧根目录 28 个音频及其 lines.json 哈希未变。
- 全部 44.1 kHz、双声道、192 kbps MP3；逐文件完整解码成功。
- LUFS：**-19.04 至 -18.98**；集内跨度 **0.06 LU**；角色均值最大差 **0.025 LU**。
- 最大真峰 **-1.06 dBTP**；首静音最大 **0.120 秒**；尾静音最大 **0.179479 秒**。
- 逐句固定增益，不使用压缩器或限幅器。最终 MP3 回测，不以处理中间 WAV 代替成品。
- 47 句通过官方 `tools/align.py --model small.en`；全部实际 `whisper` 模式，**0 条 proportional**。时长、词数、时间递增与范围均通过，成品容器时长最大差 **0.000490 秒**。
- 官方检查器：**0 错误、0 提醒**，本次日志 `shots/audio_process/VALIDATOR_AUDIO_FINAL.log`。

## 逐字与识别边界

每个剪映批次输入均按冻结原文并从界面读回；原始整批做无台词提示的 small.en 转写，再用真实词时间和静音区切句。原批 3 处疑点已在相同旁白草稿、相同音色按原文单录解决，详见 AUDIO_REVIEW_HISTORY.md。

最终 47 个文件又按 33 个独立音源无提示转写：41 个文件直接一致；4 个文件由无原文提示的独立 small 模型确认原文；余下 2 个文件是同一个 `Sam hears an echo.` 音源的 hears / here's 机器拼写分歧。原批次无提示转写与输入原文都为 hears，没有输入错误、截断或缺词的客观证据；保留分歧记录，不认定为音频缺陷，不据此重录。

| 涉及文件 | 原文 | 独立短句识别 | 复核结论 |
|---|---|---|---|
| ex_q2_2、ex_q4_2、ex_q8_3 | Lily reads the wall. | small.en 为 ball；small 为 wall | 独立 small 无原文提示确认 wall；同文复制哈希一致 |
| ex_q5_2 | Mia looks at the wall. | small.en 为 mere；small 为 Mia | 独立 small 无原文提示确认 Mia |
| ex_q5_3、ex_q8_6 | Sam hears an echo. | small.en / base.en 为 here's；small 为 Hisan | 原文输入和原批识别为 hears；机器拼写仍有分歧，不判定错读 |

官方字幕有一项边界：`l08` 的 `The wall says, 'Speak a full sentence.'` 为 **match=71%（5/7）**。官方脚本保留单引号，两个带引号词与识别词未直接匹配，由官方在相邻词之间插值；整句仍是实际 whisper 模式。无提示整批及最终短句均识别到完整原文。未修改官方工具、原文、模式或手填词时间。原日志为 `shots/align_incremental_1791701637641942000.log`。

## 可追溯记录

- 固定音色及逐句来源：VOICE_CONSISTENCY.md、VOICE_SELECTION.md。
- 全量成品测量：`shots/audio_process/FINAL_AUDIO_AUDIT.json`。
- 每个原始批次、切句区间、固定增益、原音与成品 SHA-256：`shots/audio_process/*_PROCESS.json`。
- 最终裸转写和交叉识别：`shots/audio_process/final_bare_asr/`。
- 47 句来源与实际音色：`shots/voice_consistency/VOICE_SOURCE_MAP.json`、同名 CSV。
- 剪映真实工具操作及界面回读摘录：`shots/voice_consistency/UI_TOOL_EXCERPTS.json`；只包含本集 UI 工具证据，没有内部推理。

原始音频、截图、测量、临时脚本及工具过程保存在 shots 和本地台词备份，不进入公开 GitHub。
