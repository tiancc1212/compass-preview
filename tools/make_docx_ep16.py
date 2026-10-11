#!/usr/bin/env python3
"""生成第16集知识点 Word：python3 make_docx_ep16.py <输出.docx>   (需要 pip install python-docx)"""
import sys
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
BRASS=RGBColor(0x8a,0x64,0x20);DARK=RGBColor(0x3a,0x24,0x10)
COL={'TD':'7B4FD0','DO':'7B4FD0','ING':'3F9A2C','ED':'56677E','WARN':'B5462A','BRASS':'C99A3C'}
d=Document()
for s in d.sections:s.left_margin=s.right_margin=Cm(2);s.top_margin=s.bottom_margin=Cm(1.8)
st=d.styles['Normal'];st.font.name='Calibri';st.font.size=Pt(11);st.element.rPr.rFonts.set(qn('w:eastAsia'),'微软雅黑');st.font.color.rgb=DARK
def shade(cell,hexc):
    tcPr=cell._tc.get_or_add_tcPr();sh=OxmlElement('w:shd');sh.set(qn('w:val'),'clear');sh.set(qn('w:color'),'auto');sh.set(qn('w:fill'),hexc);tcPr.append(sh)
def run(p,t,b=False,i=False,color=None,size=None,font=None):
    r=p.add_run(t);r.bold=b;r.italic=i
    if color:r.font.color.rgb=RGBColor.from_string(color) if isinstance(color,str) else color
    if size:r.font.size=Pt(size)
    if font:r.font.name=font
    return r
def band(title,key,sub=''):
    t=d.add_table(rows=1,cols=1);t.alignment=WD_TABLE_ALIGNMENT.CENTER;c=t.rows[0].cells[0];shade(c,COL[key])
    p=c.paragraphs[0];run(p,'◆ '+title,b=True,color='FFFFFF',size=14)
    if sub:run(p,'　'+sub,color='FFF1C4',size=10.5)
    d.add_paragraph().paragraph_format.space_after=Pt(0)
def item(zh,en=None):
    p=d.add_paragraph(style='List Bullet');run(p,zh)
    if en:run(p,'　'+en,i=True,color='5A3412',font='Georgia')
    p.paragraph_format.space_after=Pt(2)
def table(head,rows,key):
    t=d.add_table(rows=1,cols=len(head));t.style='Table Grid'
    for j,h in enumerate(head):c=t.rows[0].cells[j];shade(c,COL[key]);run(c.paragraphs[0],h,b=True,color='FFFFFF')
    for r in rows:
        cs=t.add_row().cells
        for j,v in enumerate(r):
            p=cs[j].paragraphs[0]
            if j>0 and any(ch.isascii() and ch.isalpha() for ch in v[:3]):run(p,v,font='Georgia',color='3A2410')
            else:run(p,v)
    d.add_paragraph()
# ---- title ----
p=d.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;run(p,'🧭 罗盘冒险队 · The Compass Crew',b=True,color=BRASS,size=13)
p=d.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;run(p,'第 16 集　怪兽招聘会',b=True,size=24)
p=d.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;run(p,'非谓语动词知识点：to do · do · doing · done',color=BRASS,size=14)
t=d.add_table(rows=1,cols=1);c=t.rows[0].cells[0];shade(c,'FFF1C4')
p=c.paragraphs[0];run(p,'一句话记住：',b=True);run(p,'非谓语动词不当句子的谓语。to do 多表示“还没做 / 目的”；doing 表示“正在做 / 做这件事”；done 表示“被…的 / 已完成”。')
d.add_paragraph()
# ---- to do ----
band('to do 不定式','TD','还没做 / 将要做 / 目的')
item('作宾语：want / hope / decide / plan / agree / refuse / would like + to do','We came here to find a job for Biscuit.')
item('作宾补：ask / tell / want / invite / encourage sb. + to do','Lily asked Biscuit to sit down.')
item('表目的：to do / in order to do','We came here to find a job.')
item('too … to do（太……而不能）；… enough to do（足够……可以）','Biscuit is too small to guard anything.')
item('疑问词 + to do：what / how / where / when to do','Show me how to do the job, little dog.')
item('It is + 形容词 + for sb. + to do（事情难易）；It is + 形容词 + of sb. + to do（人的品质）','It is easy for Biscuit to find socks. / It is kind of you to help me.')
item('It 作形式主语，真正的主语 to do 放后面','To find socks is fun. → It is fun to find socks.')
item('作定语，放在名词后面','I need a helper to guard my socks.')
item('It takes sb. some time to do sth.','It took Biscuit five minutes to find the sock.')
band('不带 to 的 do','DO','这些词后面 to 要“隐身”')
item('使役动词：let / make / have + sb. + do','Let me read the rules. / The monster made everyone laugh.')
item('感官动词：see / hear / watch / notice / feel + sb. + do（看到 / 听到全过程）','We heard Biscuit bark.')
item('had better do / would rather do / Why not do …?','You\'d better be quiet.')
item('注意：变成被动语态时 to 要还原','Everyone was made to laugh by the monster.')
# ---- doing ----
band('doing 动名词 / 现在分词','ING','做这件事 / 正在做 / 主动')
item('动名词作主语，谓语用单数','Finding socks is his favourite hobby.')
item('作宾语：enjoy / finish / mind / avoid / keep / practise / give up / can\'t help + doing','I enjoy swimming.')
item('介词后面用 doing（注意 to 是介词的短语）','We look forward to seeing Grumble again. / be good at drawing / What about going?')
item('be busy doing / be worth doing / spend time (in) doing / go + doing','The rules are worth reading. / go shopping')
item('禁止标语：No + doing','No barking!')
item('see / hear sb. doing = 看到 / 听到某人正在做','I saw Biscuit running across the fair.')
item('现在分词作伴随状语','A tall purple monster stands at the gate, holding a big sign.')
# ---- done ----
band('done 过去分词','ED','被…的 / 已完成')
item('作定语：被动或已完成','a lost sock / a broken chair / fallen leaves')
item('have sth. done：请别人把某事做好','Grandpa had his compass repaired.')
item('表示人的感受用 -ed','Mia is excited. / Sam feels bored.')
# ---- contrasts ----
band('接 to do 和 doing 意思不同','WARN','考试最爱考')
table(['动词','+ to do','+ doing'],[
 ['stop','停下来去做另一件事：Biscuit stopped to sniff the socks.','停止正在做的事：Biscuit stopped barking.'],
 ['remember','记得要去做（还没做）：Remember to bring your badge.','记得做过：I remember meeting this monster before.'],
 ['forget','忘了要去做（没做）：Don\'t forget to feed Biscuit.','忘了做过：I\'ll never forget visiting the pyramid.'],
 ['try','努力 / 设法去做：I tried to run faster.','试一试（换个办法）：I tried pulling the door.']],'WARN')
band('动词搭配速查','BRASS')
table(['只接 to do','只接 doing','两种都行，意思差不多'],[
 ['want, hope, decide, plan, agree, refuse, would like','enjoy, finish, mind, avoid, keep, practise, give up','like, love, begin, start'],
 ['look forward to 不在这里！它接 doing','look forward to, be worth, be busy, be good at','⚠ stop / remember / forget / try 意思会变（见上表）']],'BRASS')
band('-ing 还是 -ed？','ING')
table(['-ing：事物“令人…的”','-ed：人“感到…的”'],[
 ['The job fair is exciting.','Mia is excited.'],['The long rules are boring.','Sam feels bored.'],['interesting / surprising / tiring','interested / surprised / tired']],'ING')
band('分词作定语：doing 还是 done？','ED')
table(['doing：主动 / 正在','done：被动 / 已完成'],[
 ['the laughing monster（正在笑的怪兽）','a lost sock（被弄丢的袜子）'],['a running dog（正在跑的狗）','a broken chair（被弄坏的椅子）']],'ED')
item('单个分词放名词前：a lost sock；分词短语放名词后：a monster holding a big sign, a boy called Leo')
item('区分：a swimming girl（正在游泳的女孩，现在分词）≠ a swimming pool（游泳用的池子，动名词表用途）')
band('常见错误','WARN','对照自查')
table(['❌ 错误','✅ 正确','原因'],[
 ['I enjoy to swim.','I enjoy swimming.','enjoy 后接 doing'],
 ['I want finding a helper.','I want to find a helper.','want 后接 to do'],
 ['Let me to read the rules.','Let me read the rules.','let sb. do，不带 to'],
 ['The monster made everyone to laugh.','The monster made everyone laugh.','make sb. do，不带 to'],
 ['Lily asked Biscuit sit down.','Lily asked Biscuit to sit down.','ask sb. to do'],
 ["You'd better to be quiet.","You'd better be quiet.",'had better do'],
 ["I don't know what do next.","I don't know what to do next.",'疑问词 + to do'],
 ['We look forward to have a new helper.','We look forward to having a new helper.','to 是介词，接 doing'],
 ["I'm interesting in the rules.","I'm interested in the rules.",'人的感受用 -ed'],
 ['Finding socks are fun.','Finding socks is fun.','动名词作主语，谓语用单数']],'WARN')
p=d.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;run(p,'⭐ 第 16 颗星已回到罗盘 · The Compass Crew',color=BRASS,size=10)
d.save(sys.argv[1]);print('saved',sys.argv[1])
