# tools/align.py — 自动字词高亮对齐

换了新配音（例如剪映导出的 mp3）后，跑一次即可重新生成每个词的高亮时间，无需手调。

```bash
cd /workspace/tools
venv/bin/python align.py ../epNN               # 必须指定集目录
venv/bin/python align.py /workspace/episode16  # 只对齐某一集
venv/bin/python align.py --dry-run             # 只看结果不写文件
venv/bin/python align.py --model small.en      # 更准但更慢（默认 base.en）
```

- 输入：`<集>/audio/lines.json` 里每句的 `text`（文件名 = `audio/<id>.mp3`）。台词文本以 lines.json 为准，配音须一字不差。
- 做法：ffmpeg 解码 → faster-whisper（CPU, int8）带词级时间戳识别 → 与台词逐词匹配（difflib）→ 未匹配的词在前后已知词之间插值。
- 回退：识别出错或匹配率 < 50%（`--min-match`）时，按时长与词长比例分配。每句结果写在 `align` 字段（`whisper` / `proportional`）。
- 同时会更新 `dur`（实际音频时长）。缺音频的句子保持不变。
- 首次运行会下载 whisper 模型（约 140MB，缓存于 ~/.cache/huggingface）。
- 依赖：`python3 -m venv venv && venv/bin/pip install faster-whisper`，以及系统 ffmpeg。
- 改完后要重新发布（复制到 /workspace/pub 并更新 ?v=）。
