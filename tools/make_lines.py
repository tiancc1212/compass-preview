#!/usr/bin/env python3
"""从 台词.md 的某一集表格生成 <集>/audio/lines.json（who/text；dur 和 words 之后由 align.py 填）。
用法: python3 make_lines.py <台词.md> "<集标题关键字，如 第 16 集>" <输出 lines.json>
表格列: | # | 文件名 | 用途 | 角色 | 建议音色 | 英文台词 |
"""
import sys,re,json
src,key,out=sys.argv[1:4]
W={'旁白':'narrator','Leo':'leo','Mia':'mia','Sam':'sam','Lily':'lily','Grandpa（爷爷）':'grandpa','Grumble（怪兽）':'monster'}
t=open(src,encoding='utf-8').read();i=t.index('## '+key);j=t.find('\n## ',i+3);t=t[i:j if j>0 else None]
L={}
for l in t.splitlines():
    m=re.match(r"\| \d+ \| `audio/([\w]+)\.mp3` \| [^|]+ \| ([^|]+) \| [^|]+ \| (.+) \|$",l)
    if m:
        id,who,txt=m.groups();who=who.strip()
        if who not in W:sys.exit(f'未知角色 {who}（在 make_lines.py 的 W 里加映射，并在 app.js 的 WHO 里加名字和颜色）')
        L[id]={'who':W[who],'text':txt.strip(),'dur':0,'words':[]}
json.dump(L,open(out,'w',encoding='utf-8'),indent=1,ensure_ascii=False);print(len(L),'lines ->',out)
