export default {
  "no": 15,
  "meta": {"title":"伦敦博物馆失窃案","place":"1890 年的伦敦博物馆","grammar":["过去完成时","被动语态"],"icon":"london-museum"},
  "hud": "罗盘冒险队 · 第15集 伦敦博物馆",
  "start": {
    "h1": "伦敦博物馆失窃案",
    "subt": "过去完成时与被动语态",
    "go": "出发：Had anyone seen the crown before the museum closed?"
  },
  "audioVersion": "20261011-willo-audio-final1",
  "rewardWait": false,
  "download": {
    "href": "downloads/ep15_past_perfect_passive.docx",
    "name": "罗盘冒险队_第15集_过去完成时与被动语态_知识点.docx",
    "label": "下载知识点（Word）"
  },
  "img": {
    "scene1": [
      "illus/01_museum_v3.jpg",
      "第 15 集 · 故事场景 1"
    ],
    "scene2": [
      "illus/02_case_v3.jpg",
      "第 15 集 · 故事场景 2"
    ],
    "scene3": [
      "illus/03_sock_trail_v3.jpg",
      "第 15 集 · 故事场景 3"
    ],
    "scene4": [
      "illus/04_mouse.jpg",
      "第 15 集 · 故事场景 4"
    ],
    "scene5": [
      "illus/05_part_v2.jpg",
      "第 15 集 · 故事场景 5"
    ]
  },
  "firstImg": "scene1",
  "sections": {
    "S1": [
      {
        "id": "l01",
        "zh": "1890年，Leo、Mia、Sam、Lily和Biscuit抵达伦敦时，博物馆已经关门了。",
        "img": "scene1"
      },
      {
        "id": "l02",
        "zh": "等守卫打开门时，皇冠已经不见了。",
        "img": "scene1"
      },
      {
        "id": "l03",
        "zh": "博物馆关门前有人见过皇冠吗？",
        "img": "scene1"
      },
      {
        "id": "l04",
        "zh": "空玻璃展柜旁发现了一只条纹袜子。",
        "img": "scene2"
      }
    ],
    "S2": [
      {
        "id": "l05",
        "zh": "玻璃是从里面打破的！",
        "img": "scene2"
      },
      {
        "id": "l06",
        "zh": "皇冠通常存放在这个展柜里。",
        "img": "scene2"
      },
      {
        "id": "l07",
        "zh": "一只好狗能把它找出来吗？",
        "img": "scene2"
      }
    ],
    "S3": [
      {
        "id": "l08",
        "zh": "Biscuit得到那只袜子，可以闻闻它的气味。",
        "img": "scene3"
      },
      {
        "id": "l09",
        "zh": "看！袜子正被拖到那把椅子下面！",
        "img": "scene3"
      },
      {
        "id": "l10",
        "zh": "我们来之前，皇冠就已经被藏在那里了。",
        "img": "scene4"
      },
      {
        "id": "l11",
        "zh": "一只发条老鼠在皇冠和它舒适的袜子窝旁被抓住了。",
        "img": "scene4"
      }
    ],
    "S4": [
      {
        "id": "l12",
        "zh": "皇冠将被放回展柜。",
        "img": "scene5"
      },
      {
        "id": "l13",
        "zh": "Mia在皇冠里面发现了一个小小的罗盘零件。",
        "img": "scene5"
      },
      {
        "id": "l14",
        "zh": "第十五颗星被放在零件旁，准备跟大家一起回家。",
        "img": "scene5"
      }
    ]
  },
  "flow": [
    "S1",
    "q1",
    "q2",
    "S2",
    "q3",
    "S3",
    "q4",
    "q5",
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
      "title": "🧭 案发先后—分类",
      "desc": "第1段后。每题把题干事件放进“更早”或“稍后”盒；依据文字给出的时间关系。",
      "tip": "",
      "steps": [
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "更早"
            },
            {
              "k": "1",
              "t": "稍后"
            }
          ],
          "items": [
            {
              "w": "When Lily arrived, the guard had opened the door. 给“打开门”归类。",
              "box": "0",
              "why": "had opened 说明开门早于 Lily 抵达。"
            }
          ],
          "au": "ex_q1_1",
          "why": "had opened 说明开门早于 Lily 抵达。"
        },
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "更早"
            },
            {
              "k": "1",
              "t": "稍后"
            }
          ],
          "items": [
            {
              "w": "When Lily arrived, the guard had opened the door. 给“Lily 抵达”归类。",
              "box": "1",
              "why": "抵达是回望更早事件的那个过去时点。"
            }
          ],
          "au": "ex_q1_2",
          "why": "抵达是回望更早事件的那个过去时点。"
        },
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "更早"
            },
            {
              "k": "1",
              "t": "稍后"
            }
          ],
          "items": [
            {
              "w": "By eight o’clock, the mouse had hidden the crown. 给“藏皇冠”归类。",
              "box": "0",
              "why": "到八点为止，藏皇冠已经完成。"
            }
          ],
          "au": "ex_q1_3",
          "why": "到八点为止，藏皇冠已经完成。"
        }
      ]
    },
    "q2": {
      "type": "steps",
      "title": "🧭 过去的过去—打字填空",
      "desc": "第1段后。按提示使用过去完成时；明确检验 had + 过去分词，不把所有更早事件都规定为必须用此时态。 多个空按先后顺序填在同一个框中，用空格分开。",
      "tip": "",
      "steps": [
        {
          "kind": "typed",
          "ctx": "When we arrived, the crown ___ already ___ (disappear).",
          "pre": "",
          "post": "",
          "ans": "had disappeared",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "过去的抵达之前，使用 had 加过去分词。",
          "hint": "过去的抵达之前，使用 had 加过去分词。",
          "wrong": [
            {
              "re": "^has ?disappeared$",
              "zh": "过去的抵达之前，使用 had 加过去分词。"
            },
            {
              "re": "^had ?disappear$",
              "zh": "过去的抵达之前，使用 had 加过去分词。"
            }
          ],
          "au": "ex_q2_1"
        },
        {
          "kind": "typed",
          "ctx": "用过去完成时否定：Mia ___ ___ (see) the mouse before that night.",
          "pre": "",
          "post": "",
          "ans": "had not seen",
          "accept": [
            "hadn't seen"
          ],
          "ph": "按空格顺序填写",
          "why": "had 后加 not，see 的过去分词是 seen。",
          "hint": "had 后加 not，see 的过去分词是 seen。",
          "wrong": [
            {
              "re": "^didn't ?seen$",
              "zh": "had 后加 not，see 的过去分词是 seen。"
            }
          ],
          "au": "ex_q2_2"
        },
        {
          "kind": "typed",
          "ctx": "___ the guard ___ (lock) the door before the theft?",
          "pre": "",
          "post": "",
          "ans": "Had locked",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "过去完成时问句把 had 提前，分词不变。",
          "hint": "过去完成时问句把 had 提前，分词不变。",
          "wrong": [
            {
              "re": "^did$",
              "zh": "过去完成时问句把 had 提前，分词不变。"
            },
            {
              "re": "^locked$",
              "zh": "过去完成时问句把 had 提前，分词不变。"
            }
          ],
          "au": "ex_q2_3"
        },
        {
          "kind": "typed",
          "ctx": "用过去完成时：What ___ the mouse ___ (take) before the guard arrived?",
          "pre": "",
          "post": "",
          "ans": "had taken",
          "accept": [],
          "ph": "按空格顺序填写",
          "why": "take 的过去分词是 taken，疑问词后接 had。",
          "hint": "take 的过去分词是 taken，疑问词后接 had。",
          "wrong": [
            {
              "re": "^had$",
              "zh": "take 的过去分词是 taken，疑问词后接 had。"
            },
            {
              "re": "^took$",
              "zh": "take 的过去分词是 taken，疑问词后接 had。"
            }
          ],
          "au": "ex_q2_4"
        }
      ]
    },
    "q3": {
      "type": "steps",
      "title": "🧭 谁做／谁被做—分类",
      "desc": "第2段后。把整句放进主动或被动盒。",
      "tip": "",
      "steps": [
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "主动"
            },
            {
              "k": "1",
              "t": "被动"
            }
          ],
          "items": [
            {
              "w": "Lily found the crown.",
              "box": "0",
              "why": "Lily是寻找动作的执行者。"
            }
          ],
          "au": "ex_q3_1",
          "why": "Lily是寻找动作的执行者。"
        },
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "主动"
            },
            {
              "k": "1",
              "t": "被动"
            }
          ],
          "items": [
            {
              "w": "The crown was found by Lily.",
              "box": "1",
              "why": "皇冠承受“被发现”的动作。"
            }
          ],
          "au": "ex_q3_2",
          "why": "皇冠承受“被发现”的动作。"
        },
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "主动"
            },
            {
              "k": "1",
              "t": "被动"
            }
          ],
          "items": [
            {
              "w": "The crown had disappeared.",
              "box": "0",
              "why": "had done是完成时，不是所有分词都表示被动。"
            }
          ],
          "au": "ex_q3_3",
          "why": "had done是完成时，不是所有分词都表示被动。"
        },
        {
          "kind": "sort",
          "q": "一次一张，把句卡放进对应的盒子。",
          "boxes": [
            {
              "k": "0",
              "t": "主动"
            },
            {
              "k": "1",
              "t": "被动"
            }
          ],
          "items": [
            {
              "w": "The crown had been hidden.",
              "box": "1",
              "why": "had been hidden 同时表示过去完成和被动。"
            }
          ],
          "au": "ex_q3_4",
          "why": "had been hidden 同时表示过去完成和被动。"
        }
      ]
    },
    "q4": {
      "type": "steps",
      "title": "🧭 现场照片—看图选句",
      "desc": "第3段后。图片见 PROMPTS 的四宫格A。每图只问谁拿着、谁被给予或什么被清理，不能用静态图推断时态。",
      "tip": "",
      "steps": [
        {
          "kind": "choice",
          "ctx": "图",
          "good": "The sock is given to Biscuit.",
          "others": [
            "The sock is given to Mia."
          ],
          "hint": "画面中Lily把袜子递给小狗，不是递给Mia。",
          "why": "画面中Lily把袜子递给小狗，不是递给Mia。",
          "au": "ex_q4_1",
          "img": "pick_a1"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "The crown is cleaned by the guard.",
          "others": [
            "The crown is cleaned by the mouse."
          ],
          "hint": "拿布擦皇冠的是守卫。",
          "why": "拿布擦皇冠的是守卫。",
          "au": "ex_q4_2",
          "img": "pick_a2"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "The mouse is carried by Lily.",
          "others": [
            "The mouse is carried by Sam."
          ],
          "hint": "看清捧着透明盒的人是绿白衣服、戴眼镜的Lily。",
          "why": "看清捧着透明盒的人是绿白衣服、戴眼镜的Lily。",
          "au": "ex_q4_3",
          "img": "pick_a3"
        },
        {
          "kind": "choice",
          "ctx": "图",
          "good": "The crown is carried by Mia.",
          "others": [
            "The crown is carried by Biscuit."
          ],
          "hint": "Mia正用双手捧着皇冠，小狗没有拿。",
          "why": "Mia正用双手捧着皇冠，小狗没有拿。",
          "au": "ex_q4_4",
          "img": "pick_a4"
        }
      ]
    },
    "q5": {
      "type": "steps",
      "title": "🧭 证据标签—连线",
      "desc": "第3段后。左边完整句分别连到“平时被做／过去被做／将被做／已被做／能被做”，右边标签各用一次。",
      "tip": "",
      "steps": [
        {
          "kind": "match",
          "pairs": [
            {
              "t": "The crown was stolen last night.",
              "k": "1",
              "ex": "The crown was stolen last night.",
              "au": "ex_q5_2",
              "h": "last night 是明确过去时间，was stolen。"
            },
            {
              "t": "The crown will be returned tomorrow.",
              "k": "2",
              "ex": "The crown will be returned tomorrow.",
              "au": "ex_q5_3",
              "h": "will be returned 描述将来。"
            },
            {
              "t": "The glass has been broken.",
              "k": "3",
              "ex": "The glass has been broken.",
              "au": "ex_q5_4",
              "h": "has been broken 表示已经发生并关联现在。"
            },
            {
              "t": "The clue can be found by Biscuit.",
              "k": "4",
              "ex": "The clue can be found by Biscuit.",
              "au": "ex_q5_5",
              "h": "can be found 表示能够被找到。"
            },
            {
              "t": "The case is cleaned every day.",
              "k": "0",
              "ex": "The case is cleaned every day.",
              "au": "ex_q5_1",
              "h": "every day 与 is cleaned 描述日常安排。"
            }
          ],
          "targets": [
            {
              "k": "0",
              "b": "V",
              "t": "平时被做"
            },
            {
              "k": "1",
              "b": "V",
              "t": "过去被做"
            },
            {
              "k": "2",
              "b": "V",
              "t": "将被做"
            },
            {
              "k": "3",
              "b": "V",
              "t": "已被做"
            },
            {
              "k": "4",
              "b": "V",
              "t": "能被做"
            }
          ]
        }
      ]
    },
    "q6": {
      "type": "steps",
      "title": "🧭 修复报告—改错",
      "desc": "先点出错词，再选择改法；每题只有一处语法错误。",
      "tip": "",
      "steps": [
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "The crown was stole last night.",
          "wi": 3,
          "fix": [
            [
              "The crown was stolen last night.",
              1
            ],
            [
              "was → is",
              0
            ]
          ],
          "au": "ex_q6_1",
          "good": "The crown was stolen last night.",
          "why": "被动需要过去分词 stolen，不是过去式 stole。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "The stars was found by Mia.",
          "wi": 2,
          "fix": [
            [
              "The stars were found by Mia.",
              1
            ],
            [
              "found → find",
              0
            ]
          ],
          "au": "ex_q6_2",
          "good": "The stars were found by Mia.",
          "why": "主语 stars 为复数，过去时用 were。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "The crown can found by Biscuit.",
          "wi": 3,
          "fix": [
            [
              "The crown can be found by Biscuit.",
              1
            ],
            [
              "can → cans",
              0
            ]
          ],
          "au": "ex_q6_3",
          "good": "The crown can be found by Biscuit.",
          "why": "情态动词被动是 can be done。"
        },
        {
          "kind": "fix",
          "ctx": "先点出需要改动的词，再选择改法。",
          "s": "Leo was made wait outside.",
          "wi": 3,
          "fix": [
            [
              "Leo was made to wait outside.",
              1
            ],
            [
              "made → make",
              0
            ]
          ],
          "au": "ex_q6_4",
          "good": "Leo was made to wait outside.",
          "why": "make sb do 转为被动时恢复 to。"
        }
      ]
    },
    "q7": {
      "type": "steps",
      "title": "🧭 结案报告—改写",
      "desc": "第4段后。保持原意，按指定主语或结构写出完整句；允许省略不必要的 by 短语。",
      "tip": "",
      "steps": [
        {
          "kind": "rewrite",
          "q": "The guard gave him a torch. 用 He 开头改为被动。",
          "src": "",
          "answers": [
            "he was given a torch by the guard",
            "he was given a torch"
          ],
          "show": "He was given a torch by the guard.",
          "au": "ex_q7_1",
          "why": "宾语him变主语he；give的分词为given。",
          "hint": "宾语him变主语he；give的分词为given。",
          "wrong": [
            {
              "re": "^him\\ was\\ gave\\ a\\ torch$",
              "zh": "宾语him变主语he；give的分词为given。"
            }
          ],
          "normalize": []
        },
        {
          "kind": "rewrite",
          "q": "Lily looked after the mouse. 用 The mouse 开头改为被动。",
          "src": "",
          "answers": [
            "the mouse was looked after by lily",
            "the mouse was looked after"
          ],
          "show": "The mouse was looked after by Lily.",
          "au": "ex_q7_2",
          "why": "look after 是完整词组，after不能丢。",
          "hint": "look after 是完整词组，after不能丢。",
          "wrong": [
            {
              "re": "^the\\ mouse\\ was\\ looked\\ by\\ lily$",
              "zh": "look after 是完整词组，after不能丢。"
            }
          ],
          "normalize": []
        },
        {
          "kind": "rewrite",
          "q": "The guard gave Sam a torch. 用 A torch 开头改为被动。",
          "src": "",
          "answers": [
            "a torch was given to sam by the guard",
            "a torch was given to sam"
          ],
          "show": "A torch was given to Sam by the guard.",
          "au": "ex_q7_3",
          "why": "以物作主语时，give后保留to Sam。",
          "hint": "以物作主语时，give后保留to Sam。",
          "wrong": [
            {
              "re": "^a\\ torch\\ was\\ given\\ sam$",
              "zh": "以物作主语时，give后保留to Sam。"
            }
          ],
          "normalize": []
        }
      ]
    },
    "q8": {
      "type": "steps",
      "title": "🧭 罗盘回顾—判断对错",
      "desc": "最后一组，8题。判句子语法及给定语境是否匹配；错句订正后才播放音频。覆盖过去完成时与本集被动核心结构。",
      "tip": "",
      "steps": [
        {
          "kind": "tf",
          "s": "When we arrived, the mouse had already escaped.",
          "ok": true,
          "au": "ex_q8_1",
          "why": "逃走先于过去的到达，had escaped成立。",
          "hint": "逃走先于过去的到达，had escaped成立。"
        },
        {
          "kind": "tf",
          "s": "Lily had not saw the crown before that night.",
          "ok": false,
          "au": "ex_q8_2",
          "why": "had后用seen，不用saw。",
          "hint": "had后用seen，不用saw。",
          "fix": "Lily had not seen the crown before that night."
        },
        {
          "kind": "tf",
          "s": "Had the guard locked the door? Yes, he had.",
          "ok": true,
          "au": "ex_q8_3",
          "why": "had提前提问，简答也用had。",
          "hint": "had提前提问，简答也用had。"
        },
        {
          "kind": "tf",
          "s": "The crown is keep in a glass case.",
          "ok": false,
          "au": "ex_q8_4",
          "why": "一般现在时被动是is kept。",
          "hint": "一般现在时被动是is kept。",
          "fix": "The crown is kept in a glass case."
        },
        {
          "kind": "tf",
          "s": "The crown was found by Biscuit, and it will be returned tomorrow.",
          "ok": true,
          "au": "ex_q8_5",
          "why": "过去被发现用was found；将被归还用will be returned。",
          "hint": "过去被发现用was found；将被归还用will be returned。"
        },
        {
          "kind": "tf",
          "s": "The glass has been broken, but it can repaired.",
          "ok": false,
          "au": "ex_q8_6",
          "why": "完成时被动正确；can后需要be repaired。",
          "hint": "完成时被动正确；can后需要be repaired。",
          "fix": "The glass has been broken, but it can be repaired."
        },
        {
          "kind": "tf",
          "s": "The crown had been hidden under a chair before the guard came.",
          "ok": true,
          "au": "ex_q8_7",
          "why": "“藏”发生在守卫来之前（过去的过去），且皇冠是被藏，用 had been hidden。",
          "hint": "“藏”发生在守卫来之前（过去的过去），且皇冠是被藏，用 had been hidden。"
        },
        {
          "kind": "tf",
          "s": "The accident was happened last night.",
          "ok": false,
          "au": "ex_q8_8",
          "why": "happen此处不带宾语，不能改为被动。",
          "hint": "happen此处不带宾语，不能改为被动。",
          "fix": "The accident happened last night."
        }
      ]
    },
    "map": {
      "type": "map",
      "button": "做我的收藏卡 ➜",
      "html": "<h2>🗺️ 第 15 集知识地图 · 伦敦博物馆失窃案</h2><div class=\"kgrid\"><div><h3>{{b:V:34}} K01 从过去回望更早</h3><p>过去完成时用 <b>had + 过去分词</b>。先有一个过去参照点，再说明此前已经发生或持续到该时点的事。When we arrived, the crown had disappeared.（我们到达时，皇冠已经不见了。）不是“年代很久远”就用它，也不是任何两个过去动作都必须配过去完成时；先后已清楚时，一般过去时也可能自然。</p><details><summary>K02 过去完成时的句式</summary><p>肯定：Lily had seen the crown. 否定：Lily had not seen the crown. / Lily hadn&#x27;t seen the crown. 一般疑问：Had Lily seen the crown? 回答：Yes, she had. / No, she hadn&#x27;t. 特殊疑问：What had Lily seen? 不管人称，助动词都是 had。</p></details></div><div><h3>{{b:V:34}} K03 过去参照点与转述</h3><p>By eight o&#x27;clock, the mouse had hidden the crown.（到八点时已经藏好。）The guard said he had locked the door.（转述时，锁门早于“说”。）时间先后由语境决定，不能只看一个关键词。过去完成时也能描述持续：The guard had worked there for ten years when we met him.</p><details><summary>K04 把承受者放在前面</summary><p>Lily found the crown. → The crown was found by Lily. 被动的核心是 <b>be + 过去分词</b>；be及前面的助动词体现时态和主语单复数。by说明执行者；不知道或不必强调时可省略。不是中文出现“被”才可以用被动。</p></details></div><div><h3>{{b:V:34}} K05 被动的否定与疑问</h3><p>The crown was not found. / The crown wasn&#x27;t found. Was the crown found? Yes, it was. / No, it wasn&#x27;t. Where was the crown found? 有多个助动词时，否定放在第一个后面，疑问把第一个提前：Has the crown been found? 主语本身为疑问词时不额外倒装：What was stolen?</p><details><summary>K06 常用被动形式</summary><table><thead><tr><th>所表达的时间或意思</th><th>形式</th><th>例句</th></tr></thead><tbody><tr><td>平时</td><td>am/is/are + done</td><td>The crown is kept in a case.</td></tr><tr><td>过去</td><td>was/were + done</td><td>The crown was stolen.</td></tr><tr><td>将来</td><td>will be + done</td><td>The crown will be returned.</td></tr><tr><td>已经，关联现在</td><td>have/has been + done</td><td>The glass has been broken.</td></tr><tr><td>能、应该、必须</td><td>can/should/must be + done</td><td>The glass can be repaired.</td></tr><tr><td>正在被做</td><td>am/is/are being + done</td><td>The crown is being cleaned.</td></tr><tr><td>过去正在被做（认识即可）</td><td>was/were being + done</td><td>The case was being cleaned when we arrived.</td></tr><tr><td>过去之前已被做</td><td>had been + done</td><td>The crown had been hidden before we arrived.</td></tr><tr><td>从过去看将来（认识即可）</td><td>would be + done</td><td>Lily said the crown would be returned.</td></tr><tr><td>已有安排（认识即可）</td><td>am/is/are going to be + done</td><td>The case is going to be repaired.</td></tr></tbody></table></details></div><div><h3>{{b:ED:34}} K07 转换时保留信息</h3><p>He gave us a torch. → We were given a torch by him. 宾格us变主格we，主格he在by后变him。双宾语还可变：A torch was given to us by him. buy则用for：A new torch was bought for us. 不把given写成gave。</p><details><summary>K08 不丢词，不乱补to</summary><p>Lily looked after the mouse. → The mouse was looked after by Lily. 词组里的after保留。The guard made Leo wait. → Leo was made to wait. see/hear sb do改被动常恢复to；see sb doing改被动仍保留doing：The mouse was seen running away. 不把这一规则机械套到let、have；let常换be allowed to，have sb do通常换说法。</p></details></div><div><h3>{{b:ED:34}} K09 不能见动词就改被动</h3><p>The crown disappeared. / The accident happened. 这里没有宾语，不能加be硬改被动。The crown belongs to the museum. 也不改成“is belonged to”。拥有have、常见反身/相互结构不做机械转换。但“所有状态动词都不能被动”不对：The crown is loved by everyone. 是正常句子。</p><details><summary>K10 动作与状态要看语境</summary><p>The case was broken by the mouse. 描述被弄坏的动作。The case was still broken. 描述仍然坏着的状态。不能只看was broken就给所有句子下同一种结论。系表结构也能用于其他时态：The case will be empty tomorrow.</p></details></div><div><h3>{{b:V:34}} K11 用主动形式表达</h3><p>The guidebook sells well.（这本导览册畅销，说明特点。）The case needs cleaning. = The case needs to be cleaned. The museum is worth visiting. 系动词look/smell等接形容词是在描述状态，不统称为“含被动意义”：The crown looks beautiful.</p><details><summary>K12 两条线分别看</summary><p>had disappeared = 过去完成、主动；was hidden = 一般过去、被动；had been hidden = 过去完成、被动。先看“什么时候”，再看“谁做／谁承受”。本集只建立形式和意思的对应，不要求一次背熟所有被动时态。</p></details></div></div><p class=\"kdl\">{download}</p>"
    },
    "card": {
      "type": "card",
      "variant": "treasure",
      "title": "伦敦博物馆卡 #15",
      "badge": "ED",
      "desc": "选择一张自己喜欢的句子卡，确认后播放；不设分数或通关正确率。",
      "front": "伦敦博物馆卡 #15",
      "backNote": "过去完成时与被动语态",
      "options": [
        {
          "k": "crown",
          "s": "The crown was found by Biscuit.",
          "zh": "The crown was found by Biscuit.",
          "img": "04_mouse"
        },
        {
          "k": "clue",
          "s": "The clue can be found under the chair.",
          "zh": "The clue can be found under the chair.",
          "img": "04_mouse"
        },
        {
          "k": "return",
          "s": "The crown will be returned to the museum.",
          "zh": "The crown will be returned to the museum.",
          "img": "05_part_v2"
        }
      ],
      "button": "收进日志",
      "done": "把第 15 颗星送回罗盘"
    }
  },
  "ending": {
    "img": "scene5",
    "say": {
      "id": "star",
      "zh": "第 15 颗星回到了罗盘！"
    },
    "html": "<h2>🎉 第 15 集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 · 🗺️ 地图解锁：<b>伦敦博物馆</b></p><p>第十五颗星被放在零件旁，准备跟大家一起回家。</p><p>{download}</p>"
  }
};
