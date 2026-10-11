export default {
  "no": 17,
  "meta": {"title":"罗盘醒来","place":"罗盘之家","grammar":["倒装句","定语从句","全景回顾"],"icon":"compass-home"},
  "hud": "罗盘冒险队 · 第17集 罗盘之家",
  "start": {
    "h1": "罗盘醒来",
    "subt": "倒装与定语从句",
    "go": "出发：Here we go, together!"
  },
  "audioVersion": "20261011-willo-audio-final1",
  "rewardWait": false,
  "download": {
    "href": "downloads/ep17_inversion_relative_clauses.docx",
    "name": "罗盘冒险队_第17集_倒装与定语从句_知识点.docx",
    "label": "下载知识点（Word）"
  },
  "img": {
    "scene1": [
      "illus/01_home_v2.jpg",
      "第 17 集 · 故事场景 1"
    ],
    "scene2": [
      "illus/02_photo_v2.jpg",
      "第 17 集 · 故事场景 2"
    ],
    "scene3": [
      "illus/03_last_star_v2.jpg",
      "第 17 集 · 故事场景 3"
    ],
    "scene4": [
      "illus/04_compass_v2.jpg",
      "第 17 集 · 故事场景 4"
    ],
    "scene5": [
      "illus/05_together_v3.jpg",
      "第 17 集 · 故事场景 5"
    ]
  },
  "firstImg": "scene1",
  "sections": {
    "S1": [
      {
        "id": "l01",
        "zh": "Leo、Mia、Sam和Lily回到了爷爷的客厅。",
        "img": "scene1"
      },
      {
        "id": "l02",
        "zh": "我喜欢冒险，爷爷也是。",
        "img": "scene1"
      },
      {
        "id": "l03",
        "zh": "我等不及了，Lily也等不及了。",
        "img": "scene1"
      },
      {
        "id": "l04",
        "zh": "Biscuit叼着一只袜子过来了。",
        "img": "scene1"
      }
    ],
    "S2": [
      {
        "id": "l05",
        "zh": "看，这就是当年找到罗盘的男孩。",
        "img": "scene2"
      },
      {
        "id": "l06",
        "zh": "这就是带我们回家的罗盘。",
        "img": "scene2"
      },
      {
        "id": "l07",
        "zh": "爷爷留下的那封信就在象棋盒里。",
        "img": "scene2"
      }
    ],
    "S3": [
      {
        "id": "l08",
        "zh": "在这儿呢！",
        "img": "scene3"
      },
      {
        "id": "l09",
        "zh": "我已经收拾好背包了，Leo也是。",
        "img": "scene3"
      },
      {
        "id": "l10",
        "zh": "象棋盒里面就是最后一颗星。",
        "img": "scene3"
      },
      {
        "id": "l11",
        "zh": "这是Mia在伦敦找到的零件。",
        "img": "scene3"
      }
    ],
    "S4": [
      {
        "id": "l12",
        "zh": "我从来没见过罗盘这么亮！",
        "img": "scene4"
      },
      {
        "id": "l13",
        "zh": "这一家人将一起去旅行。",
        "img": "scene4"
      },
      {
        "id": "l14",
        "zh": "妈妈和爸爸也来了，准备加入冒险。",
        "img": "scene5"
      },
      {
        "id": "l15",
        "zh": "我们出发啦，一起！",
        "img": "scene5"
      }
    ]
  },
  "flow": [
    "S1",
    "q1",
    "q2",
    "q3",
    "S2",
    "q4",
    "q5",
    "S3",
    "q6",
    "S4",
    "q7",
    "q8",
    "map",
    "card"
  ],
  "activities": {
    "q1": {
      "type": "steps",
      "title": "🧭 谁也一样—连线",
      "desc": "第1段后。每题给出前句及回应者，从固定回应卡中选一句；右侧卡片分别为 So do I. / So am I. / So did I. / So has Leo.。",
      "tip": "",
      "steps": [
        {
          "kind": "match",
          "pairs": [
            {
              "t": "Mia: I am ready. Lily说“我也是”。",
              "k": "1",
              "ex": "So am I.",
              "au": "ex_q1_2",
              "h": "前句是am ready，回应I也用am。"
            },
            {
              "t": "Sam: I visited the museum. Leo说“我也是”。",
              "k": "2",
              "ex": "So did I.",
              "au": "ex_q1_3",
              "h": "visited是过去式，回应借助did。"
            },
            {
              "t": "Sam: I have packed my bag. Lily说“Leo也收拾好了”。",
              "k": "3",
              "ex": "So has Leo.",
              "au": "ex_q1_4",
              "h": "现在完成时沿用have类助动词，Leo是第三人称单数用has。"
            },
            {
              "t": "Leo: I love adventures. Grandpa说“我也是”。",
              "k": "0",
              "ex": "So do I.",
              "au": "ex_q1_1",
              "h": "love是一般现在时实义动词，回应I要用do。"
            }
          ],
          "targets": [
            {
              "k": "0",
              "b": "INV",
              "t": "So do I."
            },
            {
              "k": "1",
              "b": "INV",
              "t": "So am I."
            },
            {
              "k": "2",
              "b": "INV",
              "t": "So did I."
            },
            {
              "k": "3",
              "b": "INV",
              "t": "So has Leo."
            }
          ]
        }
      ]
    },
    "q2": {
      "type": "steps",
      "title": "🧭 谁也不—打字填空",
      "desc": "第1段后。保留Neither，用匹配的be、助动词或情态动词填空。",
      "tip": "",
      "steps": [
        {
          "kind": "typed",
          "ctx": "Mia: I can't wait. Lily: Neither ___ I.",
          "pre": "",
          "post": "",
          "ans": "can",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "前句can’t，neither已表达否定，后面用肯定形式can。",
          "hint": "前句can’t，neither已表达否定，后面用肯定形式can。",
          "wrong": [
            {
              "re": "^do$",
              "zh": "前句can’t，neither已表达否定，后面用肯定形式can。"
            },
            {
              "re": "^am$",
              "zh": "前句can’t，neither已表达否定，后面用肯定形式can。"
            }
          ],
          "au": "ex_q2_1"
        },
        {
          "kind": "typed",
          "ctx": "Leo: I don't like cold soup. Sam: Neither ___ I.",
          "pre": "",
          "post": "",
          "ans": "do",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "neither里已有否定，不再加don’t。",
          "hint": "neither里已有否定，不再加don’t。",
          "wrong": [
            {
              "re": "^don't$",
              "zh": "neither里已有否定，不再加don’t。"
            },
            {
              "re": "^does$",
              "zh": "neither里已有否定，不再加don’t。"
            }
          ],
          "au": "ex_q2_2"
        },
        {
          "kind": "typed",
          "ctx": "Lily: I am not tired. Mia: Neither ___ I.",
          "pre": "",
          "post": "",
          "ans": "am",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "回应主语I，与be搭配用am。",
          "hint": "回应主语I，与be搭配用am。",
          "wrong": [
            {
              "re": "^are$",
              "zh": "回应主语I，与be搭配用am。"
            },
            {
              "re": "^do$",
              "zh": "回应主语I，与be搭配用am。"
            }
          ],
          "au": "ex_q2_3"
        },
        {
          "kind": "typed",
          "ctx": "Leo: I didn't lose my map. Sam: Neither ___ I.",
          "pre": "",
          "post": "",
          "ans": "did",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "回应过去的否定，neither后用did。",
          "hint": "回应过去的否定，neither后用did。",
          "wrong": [
            {
              "re": "^do$",
              "zh": "回应过去的否定，neither后用did。"
            },
            {
              "re": "^didn't$",
              "zh": "回应过去的否定，neither后用did。"
            }
          ],
          "au": "ex_q2_4"
        }
      ]
    },
    "q3": {
      "type": "steps",
      "title": "🧭 看谁来了—改错",
      "desc": "第1段后。每句只改指定问题；关注名词主语与人称代词主语的差别。",
      "tip": "",
      "steps": [
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "Here comes he.",
          "wi": 1,
          "fix": [
            [
              "Here he comes.",
              1
            ],
            [
              "Here does he come.",
              0
            ]
          ],
          "au": "ex_q3_1",
          "good": "Here he comes.",
          "why": "这里人称代词he在动词前，不按名词主语倒装。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "Here is Mum and Dad.",
          "wi": 1,
          "fix": [
            [
              "Here are Mum and Dad.",
              1
            ],
            [
              "Here am Mum and Dad.",
              0
            ]
          ],
          "au": "ex_q3_2",
          "good": "Here are Mum and Dad.",
          "why": "主语两个人，be用are。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "There go the bell.",
          "wi": 1,
          "fix": [
            [
              "There goes the bell.",
              1
            ],
            [
              "There does go the bell.",
              0
            ]
          ],
          "au": "ex_q3_3",
          "good": "There goes the bell.",
          "why": "the bell是单数，动词goes。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "Never I have seen it so bright.",
          "wi": 1,
          "fix": [
            [
              "Never have I seen it so bright.",
              1
            ],
            [
              "Never seen I have it so bright.",
              0
            ]
          ],
          "au": "ex_q3_4",
          "good": "Never have I seen it so bright.",
          "why": "Never置句首强调时只把助动词have提前。"
        }
      ]
    },
    "q4": {
      "type": "steps",
      "title": "🧭 给回忆挂说明牌—看图选句",
      "desc": "第2段后。本组是补齐内容，不能称为已在第16集学过。两句都可合乎语法，但只有一句符合图片。",
      "tip": "",
      "steps": [
        {
          "kind": "choice",
          "ctx": "图",
          "good": "This is the girl who is drawing.",
          "others": [
            "This is the girl who is cooking."
          ],
          "hint": "Mia正拿画笔画画，不能选做饭。",
          "why": "Mia正拿画笔画画，不能选做饭。",
          "au": "ex_q4_1",
          "img": "pick_a1"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "This is the boy who is running.",
          "others": [
            "This is the boy who is reading."
          ],
          "hint": "Sam在跑，图里没有读书动作。",
          "why": "Sam在跑，图里没有读书动作。",
          "au": "ex_q4_2",
          "img": "pick_a2"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "This is the box that holds the star.",
          "others": [
            "This is the box that holds the sock."
          ],
          "hint": "盒里清楚只有一颗星，袜子在盒外。",
          "why": "盒里清楚只有一颗星，袜子在盒外。",
          "au": "ex_q4_3",
          "img": "pick_a3"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "This is the dog that is carrying a sock.",
          "others": [
            "This is the dog that is sleeping."
          ],
          "hint": "Biscuit叼着袜子走过来，没有睡觉。",
          "why": "Biscuit叼着袜子走过来，没有睡觉。",
          "au": "ex_q4_4",
          "img": "pick_a4"
        }
      ]
    },
    "q5": {
      "type": "steps",
      "title": "🧭 谁／什么—分类与打字填空",
      "desc": "第2段后。先识别关系词代替的人或物，再填词；输入题接受所有列出的同义合法形式，不把who和that人为排成互斥答案。",
      "tip": "",
      "steps": [
        {
          "kind": "choice",
          "ctx": "把 The boy who found the compass 中who连到“男孩／罗盘”。",
          "good": "男孩",
          "others": [
            "罗盘"
          ],
          "hint": "who在从句中指前面的boy，不是离它更远的compass。",
          "why": "who在从句中指前面的boy，不是离它更远的compass。",
          "au": "ex_q5_1"
        },
        {
          "kind": "typed",
          "ctx": "Grandpa is the boy ___ found the compass.",
          "pre": "",
          "post": "",
          "ans": "who",
          "accept": [
            "that"
          ],
          "ph": "按空格顺序填写",
          "why": "修饰人且作从句主语，可以who或that，不能省略。",
          "hint": "修饰人且作从句主语，可以who或that，不能省略。",
          "wrong": [
            {
              "re": "^which$",
              "zh": "修饰人且作从句主语，可以who或that，不能省略。"
            },
            {
              "re": "^空白$",
              "zh": "修饰人且作从句主语，可以who或that，不能省略。"
            }
          ],
          "au": "ex_q5_2"
        },
        {
          "kind": "typed",
          "ctx": "This is the compass ___ brought us home.",
          "pre": "",
          "post": "",
          "ans": "which",
          "accept": [
            "that"
          ],
          "ph": "按空格顺序填写",
          "why": "修饰物且作从句主语，which和that都可以，不省略。",
          "hint": "修饰物且作从句主语，which和that都可以，不省略。",
          "wrong": [
            {
              "re": "^who$",
              "zh": "修饰物且作从句主语，which和that都可以，不省略。"
            },
            {
              "re": "^空白$",
              "zh": "修饰物且作从句主语，which和that都可以，不省略。"
            }
          ],
          "au": "ex_q5_3"
        },
        {
          "kind": "typed",
          "ctx": "The letter ___ Grandpa left is here. 填关系词；也可选择“省略”。",
          "pre": "",
          "post": "",
          "ans": "which",
          "accept": [
            "that",
            "省略"
          ],
          "ph": "按空格顺序填写",
          "why": "限定性从句中作宾语，which/that可省；Grandpa才是从句主语。",
          "hint": "限定性从句中作宾语，which/that可省；Grandpa才是从句主语。",
          "wrong": [
            {
              "re": "^who$",
              "zh": "限定性从句中作宾语，which/that可省；Grandpa才是从句主语。"
            },
            {
              "re": "^whose$",
              "zh": "限定性从句中作宾语，which/that可省；Grandpa才是从句主语。"
            }
          ],
          "au": "ex_q5_4"
        }
      ]
    },
    "q6": {
      "type": "steps",
      "title": "🧭 把句子搭好—连词成句",
      "desc": "第3段后。词块顺序已打乱；全部使用，不增加多余主语或宾语。",
      "tip": "",
      "steps": [
        {
          "kind": "order",
          "q": "I / do / So",
          "words": [
            "So",
            "do",
            "I"
          ],
          "shuffled": [
            "I",
            "do",
            "So"
          ],
          "why": "“我也是”要倒装；So I do是认可同一人的情况，意思不同。",
          "hint": "“我也是”要倒装；So I do是认可同一人的情况，意思不同。",
          "firstHint": "“我也是”要倒装；So I do是认可同一人的情况，意思不同。",
          "au": "ex_q6_1"
        },
        {
          "kind": "order",
          "q": "comes / Biscuit / Here",
          "words": [
            "Here",
            "comes",
            "Biscuit"
          ],
          "shuffled": [
            "comes",
            "Biscuit",
            "Here"
          ],
          "why": "Biscuit是名词主语，可以放comes后。",
          "hint": "Biscuit是名词主语，可以放comes后。",
          "firstHint": "Biscuit是名词主语，可以放comes后。",
          "au": "ex_q6_2"
        },
        {
          "kind": "order",
          "q": "the compass / who found / is / the boy / Grandpa",
          "words": [
            "Grandpa",
            "is",
            "the boy",
            "who found",
            "the compass"
          ],
          "shuffled": [
            "the compass",
            "who found",
            "is",
            "the boy",
            "Grandpa"
          ],
          "why": "who found…紧跟the boy作说明，不把从句拆开。",
          "hint": "who found…紧跟the boy作说明，不把从句拆开。",
          "firstHint": "who found…紧跟the boy作说明，不把从句拆开。",
          "au": "ex_q6_3"
        },
        {
          "kind": "order",
          "q": "Grandpa left / is here / The letter / which",
          "words": [
            "The letter",
            "which",
            "Grandpa left",
            "is here"
          ],
          "shuffled": [
            "Grandpa left",
            "is here",
            "The letter",
            "which"
          ],
          "why": "which已经代替letter作宾语，不能再补it。",
          "hint": "which已经代替letter作宾语，不能再补it。",
          "firstHint": "which已经代替letter作宾语，不能再补it。",
          "au": "ex_q6_4"
        }
      ]
    },
    "q7": {
      "type": "steps",
      "title": "🧭 罗盘环游—打字填空",
      "desc": "第4段后。8张回忆卡，每张回访两站，带明确动词原形或选择范围。这是本轮表达回访，不给掌握评级。 多个空按先后顺序填在同一个框中，用空格分开。",
      "tip": "",
      "steps": [
        {
          "kind": "typed",
          "ctx": "回访1+2：Biscuit ___ (find，平时习惯) things, and Leo carries ___ umbrella.（a/an）",
          "pre": "",
          "post": "",
          "ans": "finds an",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "Biscuit是三单；umbrella元音音素开头用an。",
          "hint": "Biscuit是三单；umbrella元音音素开头用an。",
          "wrong": [
            {
              "re": "^find$",
              "zh": "Biscuit是三单；umbrella元音音素开头用an。"
            },
            {
              "re": "^a$",
              "zh": "Biscuit是三单；umbrella元音音素开头用an。"
            }
          ],
          "au": "ex_q7_1"
        },
        {
          "kind": "typed",
          "ctx": "回访3+4：___ bag is this? It is ___.（谁的；我的，后无名词）",
          "pre": "",
          "post": "",
          "ans": "Whose mine",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "问归属用whose；独立代替my bag用mine。",
          "hint": "问归属用whose；独立代替my bag用mine。",
          "wrong": [
            {
              "re": "^who$",
              "zh": "问归属用whose；独立代替my bag用mine。"
            },
            {
              "re": "^my$",
              "zh": "问归属用whose；独立代替my bag用mine。"
            }
          ],
          "au": "ex_q7_2"
        },
        {
          "kind": "typed",
          "ctx": "回访5+6：The robot ___ (work) every day; the race starts ___ three.（at/on/in）",
          "pre": "",
          "post": "",
          "ans": "works at",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "习惯三单works；具体时刻用at。",
          "hint": "习惯三单works；具体时刻用at。",
          "wrong": [
            {
              "re": "^work$",
              "zh": "习惯三单works；具体时刻用at。"
            },
            {
              "re": "^on$",
              "zh": "习惯三单works；具体时刻用at。"
            }
          ],
          "au": "ex_q7_3"
        },
        {
          "kind": "typed",
          "ctx": "回访7+8：What ___ lovely planet! Mia ___ ___ (draw) it now.",
          "pre": "",
          "post": "",
          "ans": "a is drawing",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "单数可数名词planet前补a；正在画用is drawing。",
          "hint": "单数可数名词planet前补a；正在画用is drawing。",
          "wrong": [
            {
              "re": "^an$",
              "zh": "单数可数名词planet前补a；正在画用is drawing。"
            },
            {
              "re": "^draws$",
              "zh": "单数可数名词planet前补a；正在画用is drawing。"
            }
          ],
          "au": "ex_q7_4"
        },
        {
          "kind": "typed",
          "ctx": "回访9+10：We ___ (visit) the village yesterday, and we ___ ___ (leave，用will) tomorrow.",
          "pre": "",
          "post": "",
          "ans": "visited will leave",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "yesterday用过去式；will后用动词原形。",
          "hint": "yesterday用过去式；will后用动词原形。",
          "wrong": [
            {
              "re": "^visit$",
              "zh": "yesterday用过去式；will后用动词原形。"
            },
            {
              "re": "^will ?left$",
              "zh": "yesterday用过去式；will后用动词原形。"
            }
          ],
          "au": "ex_q7_5"
        },
        {
          "kind": "typed",
          "ctx": "回访11+12：Sam runs ___ (fast) than Leo, doesn't ___?",
          "pre": "",
          "post": "",
          "ans": "faster he",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "than前用比较级；反意疑问用Sam对应的he。",
          "hint": "than前用比较级；反意疑问用Sam对应的he。",
          "wrong": [
            {
              "re": "^fastest$",
              "zh": "than前用比较级；反意疑问用Sam对应的he。"
            },
            {
              "re": "^it$",
              "zh": "than前用比较级；反意疑问用Sam对应的he。"
            }
          ],
          "au": "ex_q7_6"
        },
        {
          "kind": "typed",
          "ctx": "回访13+14：按“我知道钥匙在哪里；我已经找到了它”填空：I know where the key ___. I have already ___ (find) it.",
          "pre": "",
          "post": "",
          "ans": "is found",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "宾语从句用陈述语序；have后用found。",
          "hint": "宾语从句用陈述语序；have后用found。",
          "wrong": [
            {
              "re": "^is ?it$",
              "zh": "宾语从句用陈述语序；have后用found。"
            },
            {
              "re": "^find$",
              "zh": "宾语从句用陈述语序；have后用found。"
            }
          ],
          "au": "ex_q7_7"
        },
        {
          "kind": "typed",
          "ctx": "回访15+16：The crown was ___ (find), and Biscuit enjoys ___ (sniff) socks.",
          "pre": "",
          "post": "",
          "ans": "found sniffing",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "被动用过去分词found；enjoy后接doing。",
          "hint": "被动用过去分词found；enjoy后接doing。",
          "wrong": [
            {
              "re": "^find$",
              "zh": "被动用过去分词found；enjoy后接doing。"
            },
            {
              "re": "^to ?sniff$",
              "zh": "被动用过去分词found；enjoy后接doing。"
            }
          ],
          "au": "ex_q7_8"
        }
      ]
    },
    "q8": {
      "type": "steps",
      "title": "🧭 罗盘回顾—判断对错",
      "desc": "最后一组8题，覆盖肯定与否定呼应、助动词匹配、名词/代词倒装、Never强调及定语从句基础。答错先订正，再播放正确句。",
      "tip": "",
      "steps": [
        {
          "kind": "tf",
          "s": "So do I.",
          "ok": true,
          "au": "ex_q8_1",
          "why": "前句一般现在时实义动词，回应I用do。",
          "hint": "前句一般现在时实义动词，回应I用do。",
          "ctx": "Leo: I like stories. Grandpa回应“我也是”："
        },
        {
          "kind": "tf",
          "s": "Neither can't I.",
          "ok": false,
          "au": "ex_q8_2",
          "why": "neither已含否定，应为Neither can I；这里意思是也等不及。",
          "hint": "neither已含否定，应为Neither can I；这里意思是也等不及。",
          "fix": "Neither can I.",
          "ctx": "Mia: I can't wait. Lily回应："
        },
        {
          "kind": "tf",
          "s": "So did I.",
          "ok": true,
          "au": "ex_q8_3",
          "why": "过去时呼应选did。",
          "hint": "过去时呼应选did。",
          "ctx": "Sam: I visited London. Leo回应："
        },
        {
          "kind": "tf",
          "s": "So have Leo.",
          "ok": false,
          "au": "ex_q8_4",
          "why": "Leo三单，应为has。",
          "hint": "Leo三单，应为has。",
          "fix": "So has Leo.",
          "ctx": "Sam: I have packed. Lily说Leo也一样："
        },
        {
          "kind": "tf",
          "s": "Here comes Biscuit. Here he comes.",
          "ok": true,
          "au": "ex_q8_5",
          "why": "名词Biscuit可倒装；人称代词he不这样倒装。",
          "hint": "名词Biscuit可倒装；人称代词he不这样倒装。"
        },
        {
          "kind": "tf",
          "s": "Never I have seen the compass so bright.",
          "ok": false,
          "au": "ex_q8_6",
          "why": "Never前置时，have在I前。",
          "hint": "Never前置时，have在I前。",
          "fix": "Never have I seen the compass so bright."
        },
        {
          "kind": "tf",
          "s": "This is the compass which brought us home.",
          "ok": true,
          "au": "ex_q8_7",
          "why": "which可指物并在从句中作主语；that也可。",
          "hint": "which可指物并在从句中作主语；that也可。"
        },
        {
          "kind": "tf",
          "s": "The letter which Grandpa left it is here.",
          "ok": false,
          "au": "ex_q8_8",
          "why": "which已是从句宾语，it重复，要删掉。",
          "hint": "which已是从句宾语，it重复，要删掉。",
          "fix": "The letter which Grandpa left is here."
        }
      ]
    },
    "map": {
      "type": "map",
      "button": "做我的收藏卡 ➜",
      "html": "<h2>🗺️ 第 17 集知识地图 · 罗盘醒来</h2><div class=\"kgrid\"><div><h3>{{b:INV:34}} K01 “我也是”</h3><p><b>So + be / 助动词 / 情态动词 + 主语</b>，沿用前句的时间和动词类型，再按新主语变化。I love adventures. — So do I. / I am ready. — So am I. / I visited London. — So did I. / I have packed. — So has Leo. 不能所有回应都套do。</p><details><summary>K02 “我也不”</summary><p><b>Neither / Nor + be / 助动词 / 情态动词 + 主语</b>。I can&#x27;t swim. — Neither can I. neither本身含否定，不再加not。I can&#x27;t wait. — Neither can I. 在故事里是“两个人都等不及了”。</p></details></div><div><h3>{{b:INV:34}} K03 “也是”与“的确”</h3><p>So do I. 意思是“我也一样”，换了一个人。So I do. 意思是“的确如此”，确认前面提到的自己的情况，主语不放到后面。例：You like adventures. — So I do!</p><details><summary>K04 Here comes…</summary><p>Here comes Biscuit. / Here are Mum and Dad. 介绍出现的人物，名词主语可放到动词后；动词仍跟主语的单复数配合。There goes the bell. / Inside the box is a star. 也是类似的呈现方式。不是任何地点词开头都必须倒装。</p></details></div><div><h3>{{b:INV:34}} K05 人称代词仍放动词前</h3><p>Here he comes. / Here it is. / Here we go. 不说Here comes he。there be存在句如There is a star in the box.可作对照，不把there理解为人。</p><details><summary>K06 Never前置，认识即可</summary><p>Never have I seen it so bright! = I have never seen it so bright. 正式或强调表达中，将否定副词放在句首，助动词置于主语前；不是把所有动词都搬到前面。only修饰主语时不因此倒装：Only Leo knows the answer.</p></details></div><div><h3>{{b:REL:34}} K07 给名词加一句说明</h3><p><b>先行词 + 关系词 + 从句</b>。The boy who found the compass is Grandpa. 从句who found the compass说明是哪个boy。who代替男孩，已在从句中作主语，不再加he。此处是本轮补齐的内容，不是默认第16集已经学过。</p><details><summary>K08 who / which / that</summary><table><thead><tr><th>被说明的对象</th><th>本集限定性从句常用词</th><th>例句</th></tr></thead><tbody><tr><td>人</td><td>who / that</td><td>Grandpa is the boy who found the compass.</td></tr><tr><td>物</td><td>which / that</td><td>This is the compass that brought us home.</td></tr><tr><td>动物</td><td>which / that；被当作熟悉伙伴时也可who</td><td>This is the dog that carries socks.</td></tr></tbody></table><p>本集不把who与that、which与that作为只有一个正确答案的干扰对。英式英语中which也能引导限定性从句。</p></details></div><div><h3>{{b:REL:34}} K09 主语不能漏，宾语不要重</h3><p>This is the compass that brought us home. that是从句主语，不能删。The letter which Grandpa left is here. which是从句宾语，在本集这种限定性从句中可以省略：The letter Grandpa left is here. 不能再写left it。关系词作主语时，谓语数看先行词：the boy who carries… / the boys who carry…。</p><details><summary>K10 认识边界，不一次扩成整章</summary><p>whom指人并作宾语，较正式；whose + 名词表示所属；when / where / why说明时间、地点、原因。The girl whose bag is purple is Mia. / This is the room where we keep the compass. 选词要看从句缺什么，不能只凭先行词是地点就填where：the museum which we visited。以上只作知识地图入口，不计作本集已练。</p></details></div><div><h3>{{b:REL:34}} K11 加逗号的补充说明</h3><p>Grandpa, who found the compass, smiles. 用逗号补充说明已明确的Grandpa；这种非限定性从句不能用that，关系词不能省略。本集题目只练不带这种逗号的限定性从句，不考高阶例外。更多“只能用that/who”的口诀有过度概括，不能用来否定自然的标准英文。</p><details><summary>K12 十六站回忆卡</summary><table><thead><tr><th>回访站</th><th>一眼认出的表达</th><th>正确例句</th></tr></thead><tbody><tr><td>1 金字塔</td><td>完整句骨架</td><td>Biscuit finds a sock.</td></tr><tr><td>2 维京船</td><td>冠词、所有格</td><td>This is the captain&#x27;s helmet.</td></tr><tr><td>3 云上图书馆</td><td>代词</td><td>This bag is mine.</td></tr><tr><td>4 谜语洞</td><td>问句、否定</td><td>Does the dragon fly?</td></tr><tr><td>5 机器人小镇</td><td>一般现在、三单</td><td>The robot works every day.</td></tr><tr><td>6 奥林匹亚</td><td>数词、介词</td><td>The race starts at three.</td></tr><tr><td>7 巧克力星球</td><td>形容词、感叹</td><td>What a lovely planet!</td></tr><tr><td>8 恐龙丛林</td><td>进行时、祈使</td><td>Mia is drawing. Don&#x27;t move!</td></tr><tr><td>9 1975村庄</td><td>过去、used to</td><td>Grandpa used to walk to school.</td></tr><tr><td>10 火星基地</td><td>情态、计划</td><td>We must wear helmets. We will leave tomorrow.</td></tr><tr><td>11 草原运动会</td><td>比较、副词</td><td>Sam runs faster than Leo.</td></tr><tr><td>12 海底城市</td><td>搭配、使役、反意问句</td><td>Let me look for it. It&#x27;s here, isn&#x27;t it?</td></tr><tr><td>13 海盗船</td><td>状语与宾语从句</td><td>If it rains, we will wait. I know where the map is.</td></tr><tr><td>14 月球基地</td><td>现在完成</td><td>I have already found it.</td></tr><tr><td>15 伦敦博物馆</td><td>过去完成、被动</td><td>When we arrived, the crown had disappeared. It was found later.</td></tr><tr><td>16 怪兽招聘会</td><td>非谓语</td><td>Biscuit enjoys finding socks.</td></tr></tbody></table><p>回访是唤起表达框架，不代表每站每个细项均已独立作答或达到掌握。缺少的定语从句在本集K07–K11明确补齐入门与边界。</p></details></div></div><p class=\"kdl\">{download}</p>"
    },
    "card": {
      "type": "card",
      "variant": "treasure",
      "title": "罗盘之家卡 #17",
      "badge": "REL",
      "desc": "选择一张自己喜欢的句子卡，确认后播放；不设分数或通关正确率。",
      "front": "罗盘之家卡 #17",
      "backNote": "倒装与定语从句",
      "options": [
        {
          "k": "together",
          "s": "I love travelling with my family.",
          "zh": "I love travelling with my family.",
          "img": "05_together_v3"
        },
        {
          "k": "again",
          "s": "I want to visit the library that floats above the clouds.",
          "zh": "I want to visit the library that floats above the clouds.",
          "img": "02_photo_v2"
        },
        {
          "k": "home",
          "s": "Here is the place that we call home.",
          "zh": "Here is the place that we call home.",
          "img": "01_home_v2"
        }
      ],
      "button": "收进日志",
      "done": "把第 17 颗星送回罗盘"
    }
  },
  "ending": {
    "img": "scene5",
    "say": {
      "id": "star",
      "zh": "十七颗星都回家了！"
    },
    "html": "<h2>🎉 第 17 集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 · 🗺️ 地图解锁：<b>罗盘之家</b></p><p>我们出发啦，一起！</p><p>{download}</p>"
  }
};
