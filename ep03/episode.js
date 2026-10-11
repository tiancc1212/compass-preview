export default {
  "no": 3,
  "meta": {"title":"云上图书馆的失物招领","place":"云上图书馆","grammar":["人称与物主代词","反身代词","不定代词"],"icon":"cloud-library"},
  "hud": "罗盘冒险队 · 第3集 云上图书馆的失物招领",
  "start": {
    "h1": "云上图书馆的失物招领",
    "subt": "把包、书和袜子送回真正的主人手里。",
    "go": "出发：Whose bag is this?"
  },
  "theme": {
    "bg": "#172934",
    "stage": "#294858"
  },
  "audioVersion": "20261011-willo-audio-final1",
  "rewardWait": false,
  "download": {
    "href": "downloads/ep03_pronouns.docx",
    "name": "罗盘冒险队_第3集_代词_知识点.docx",
    "label": "下载知识点（Word）"
  },
  "img": {
    "cloud_library": [
      "illus/01_cloud_library.jpg",
      "云上图书馆的失物招领 · 云上图书馆和失物桌"
    ],
    "red_blue_books": [
      "illus/02_red_blue_books.jpg",
      "云上图书馆的失物招领 · 红书、蓝书与各自的主人"
    ],
    "hidden_biscuit": [
      "illus/03_hidden_biscuit.jpg",
      "云上图书馆的失物招领 · Biscuit 叼来袜子"
    ],
    "labels": [
      "illus/04_labels_v2.jpg",
      "云上图书馆的失物招领 · 核对标签与旧借书卡"
    ],
    "library_star": [
      "illus/05_library_star_v2.jpg",
      "云上图书馆的失物招领 · 猫头鹰送回星星"
    ]
  },
  "firstImg": "cloud_library",
  "sections": {
    "S1": [
      {
        "id": "l01",
        "zh": "他们来到云上的图书馆，一只猫头鹰朝他们挥挥翅膀。",
        "img": "cloud_library"
      },
      {
        "id": "l02",
        "zh": "这是谁的包？",
        "img": "cloud_library"
      },
      {
        "id": "l03",
        "zh": "它不是我的，不过那几只手套是我的。",
        "img": "cloud_library"
      },
      {
        "id": "l04",
        "zh": "这是我的包，是我自己装好的。",
        "img": "cloud_library"
      }
    ],
    "S2": [
      {
        "id": "l05",
        "zh": "猫头鹰递给 Mia 一本红书，问她书的主人是谁。",
        "img": "red_blue_books"
      },
      {
        "id": "l06",
        "zh": "Lily，哪本书是你的，红色的还是蓝色的？",
        "img": "red_blue_books"
      },
      {
        "id": "l07",
        "zh": "蓝色那本是我的，红色那本是他的。",
        "img": "red_blue_books"
      },
      {
        "id": "l08",
        "zh": "谁在那个书架后面？",
        "img": "hidden_biscuit"
      }
    ],
    "S3": [
      {
        "id": "l09",
        "zh": "没有人回答，不过 Biscuit 给 Leo 叼来了一个软软的东西。",
        "img": "hidden_biscuit"
      },
      {
        "id": "l10",
        "zh": "这是一只袜子，他的篮子里还有另一只。",
        "img": "hidden_biscuit"
      },
      {
        "id": "l11",
        "zh": "两只袜子都是猫头鹰的，但两只手套都不是他的。",
        "img": "labels"
      }
    ],
    "S4": [
      {
        "id": "l12",
        "zh": "我们有一些标签，可是没有墨水。",
        "img": "labels"
      },
      {
        "id": "l13",
        "zh": "每个孩子都核对一张标签，Mia 在其中一本书里发现了一张旧借书卡。",
        "img": "labels",
        "overlay": "<div class=\"carve\">Borrowed by C. Chen</div>"
      },
      {
        "id": "l14",
        "zh": "现在每个人都拿对东西了，这颗星星属于我们！",
        "img": "library_star"
      }
    ]
  },
  "flow": [
    "S1",
    "q1",
    "q2",
    "S2",
    "q3",
    "q4",
    "S3",
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
      "type": "seq",
      "parts": [
        {
          "type": "drag",
          "title": "替身站位 · 分类与替换",
          "desc": "词卡乱序：them / I / her / we / him / they / me / she；分到“作主语”和“作动词或介词的宾语”。",
          "slots": [
            {
              "k": "s",
              "title": "作主语",
              "b": "S"
            },
            {
              "k": "o",
              "title": "作动词或介词的宾语",
              "b": "O"
            }
          ],
          "chunks": [
            {
              "t": "them",
              "k": "o",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "I",
              "k": "s",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "her",
              "k": "o",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "we",
              "k": "s",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "him",
              "k": "o",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "they",
              "k": "s",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "me",
              "k": "o",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            },
            {
              "t": "she",
              "k": "s",
              "h": "谁做动作看主语；动作落在谁或介词后面看宾语。"
            }
          ],
          "tip": "谁做动作看主语；动作落在谁或介词后面看宾语。",
          "audio": "ex_q1_1",
          "sourceQuestion": "Q1.1"
        },
        {
          "type": "steps",
          "badge": "S",
          "title": "替身站位 · 分类与替换",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "Lily helps Leo. 用代词替换 Leo：",
              "pre": "Lily helps ",
              "post": ".",
              "ans": "him",
              "ph": "",
              "au": "ex_q1_2",
              "why": "helps 后面是宾语，用 him。",
              "hint": "helps 后面是宾语，用 him。",
              "wrong": [
                {
                  "re": "^he$",
                  "zh": "helps 后面是宾语，用 him。"
                },
                {
                  "re": "^his$",
                  "zh": "helps 后面是宾语，用 him。"
                }
              ],
              "sourceQuestion": "Q1.2"
            },
            {
              "kind": "typed",
              "ctx": "Leo and Mia look at the owl. 用一个代词替换 Leo and Mia：",
              "pre": "",
              "post": " look at the owl.",
              "ans": "They",
              "ph": "",
              "au": "ex_q1_3",
              "why": "代替 Leo 和 Mia 的主语是 they；we 会把说话人也算进去。",
              "hint": "代替 Leo 和 Mia 的主语是 they；we 会把说话人也算进去。",
              "wrong": [
                {
                  "re": "^them$",
                  "zh": "代替 Leo 和 Mia 的主语是 they；we 会把说话人也算进去。"
                },
                {
                  "re": "^we$",
                  "zh": "代替 Leo 和 Mia 的主语是 they；we 会把说话人也算进去。"
                }
              ],
              "sourceQuestion": "Q1.3"
            }
          ]
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "替身站位 · 分类与替换",
          "desc": "左：I / you（一个人）/ she / we；右乱序：ourselves / herself / myself / yourself。",
          "slots": [
            {
              "k": "p0",
              "pre": "I → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "you（一个人） → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "she → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "we → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "myself",
              "k": "p0",
              "h": "反身代词要与做动作的人一致；复数用 selves。"
            },
            {
              "t": "yourself",
              "k": "p1",
              "h": "反身代词要与做动作的人一致；复数用 selves。"
            },
            {
              "t": "herself",
              "k": "p2",
              "h": "反身代词要与做动作的人一致；复数用 selves。"
            },
            {
              "t": "ourselves",
              "k": "p3",
              "h": "反身代词要与做动作的人一致；复数用 selves。"
            }
          ],
          "tip": "反身代词要与做动作的人一致；复数用 selves。",
          "audio": "ex_q1_4",
          "sourceQuestion": "Q1.4"
        }
      ]
    },
    "q2": {
      "type": "steps",
      "badge": "OWNER",
      "title": "认领标签 · 物主代词",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "match",
          "pairs": [
            {
              "t": "my bag",
              "k": "p0",
              "ex": "This bag is mine.",
              "au": "ex_q2_2",
              "h": "名词省去后，改用能单独站住的物主代词。"
            },
            {
              "t": "her book",
              "k": "p1",
              "ex": "This book is hers.",
              "au": "ex_q8_2",
              "h": "名词省去后，改用能单独站住的物主代词。"
            },
            {
              "t": "our drawings",
              "k": "p2",
              "ex": "The drawings are ours.",
              "au": "ex_q2_1",
              "h": "名词省去后，改用能单独站住的物主代词。"
            },
            {
              "t": "their gloves",
              "k": "p3",
              "ex": "",
              "au": "",
              "h": "名词省去后，改用能单独站住的物主代词。"
            }
          ],
          "targets": [
            {
              "k": "p3",
              "b": "OWNER",
              "t": "theirs"
            },
            {
              "k": "p0",
              "b": "OWNER",
              "t": "mine"
            },
            {
              "k": "p1",
              "b": "OWNER",
              "t": "hers"
            },
            {
              "k": "p2",
              "b": "OWNER",
              "t": "ours"
            }
          ],
          "done": "名词省去后，改用能单独站住的物主代词。",
          "sourceQuestion": "Q2.1"
        },
        {
          "kind": "typed",
          "ctx": "括号只给 my，填完整所需形式：",
          "pre": "This bag is ",
          "post": " <span class=\"base\">(my)</span>.",
          "ans": "mine",
          "ph": "",
          "au": "ex_q2_2",
          "why": "is 后表示归属，后面没有名词，用 mine。",
          "hint": "is 后表示归属，后面没有名词，用 mine。",
          "wrong": [
            {
              "re": "^my$",
              "zh": "is 后表示归属，后面没有名词，用 mine。"
            },
            {
              "re": "^me$",
              "zh": "is 后表示归属，后面没有名词，用 mine。"
            }
          ],
          "sourceQuestion": "Q2.2"
        },
        {
          "kind": "fix",
          "ctx": "This is hers book. 只改 hers。",
          "s": "This is hers book.",
          "wi": 2,
          "fix": [
            [
              "her",
              1
            ],
            [
              "she",
              0
            ]
          ],
          "good": "This is her book.",
          "au": "ex_q2_3",
          "why": "book 已经在后面，要用 her。",
          "sourceQuestion": "Q2.3"
        },
        {
          "kind": "typed",
          "ctx": "猫头鹰自己的翅膀：",
          "pre": "The owl opens ",
          "post": " <span class=\"base\">(it)</span> wings.",
          "ans": "its",
          "ph": "",
          "au": "ex_q2_4",
          "why": "its 表所属；it’s 是 it is 或 it has 的缩写。",
          "hint": "its 表所属；it’s 是 it is 或 it has 的缩写。",
          "wrong": [
            {
              "re": "^it's$",
              "zh": "its 表所属；it’s 是 it is 或 it has 的缩写。"
            },
            {
              "re": "^it$",
              "zh": "its 表所属；it’s 是 it is 或 it has 的缩写。"
            }
          ],
          "sourceQuestion": "Q2.4"
        }
      ]
    },
    "q3": {
      "type": "steps",
      "badge": "S",
      "title": "近处远处 · 看图选句",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "choice",
          "ctx": "Leo 指着贴近手掌的一本书。",
          "good": "This is a book.",
          "others": [
            "That is a book."
          ],
          "au": "ex_q3_1",
          "why": "图上物品贴近说话人，而且只有一本，用 this。",
          "hint": "图上物品贴近说话人，而且只有一本，用 this。",
          "img": "pick_near_one",
          "sourceQuestion": "Q3.1"
        },
        {
          "kind": "choice",
          "ctx": "Mia 指向远处高架上的一只包。",
          "good": "That is a bag.",
          "others": [
            "This is a bag."
          ],
          "au": "ex_q3_2",
          "why": "包在离 Mia 很远的书架上，用 that。",
          "hint": "包在离 Mia 很远的书架上，用 that。",
          "img": "pick_far_one",
          "sourceQuestion": "Q3.2"
        },
        {
          "kind": "choice",
          "ctx": "Sam 双手各拿一只手套。",
          "good": "These are gloves.",
          "others": [
            "Those are gloves."
          ],
          "au": "ex_q3_3",
          "why": "手套就在手里，且不止一只，用 these。",
          "hint": "手套就在手里，且不止一只，用 these。",
          "img": "pick_near_many",
          "sourceQuestion": "Q3.3"
        },
        {
          "kind": "choice",
          "ctx": "Lily 指向远处架顶两只袜子。",
          "good": "Those are socks.",
          "others": [
            "These are socks."
          ],
          "au": "ex_q3_4",
          "why": "袜子远离说话人，且是复数，用 those。",
          "hint": "袜子远离说话人，且是复数，用 those。",
          "img": "pick_far_many",
          "sourceQuestion": "Q3.4"
        }
      ]
    },
    "q4": {
      "type": "seq",
      "parts": [
        {
          "type": "drag",
          "mode": "blank",
          "title": "问清是谁 · 连线与填空",
          "desc": "左栏要问：身份 / 物品是什么 / 归属 / 红蓝两本中哪本；右乱序：which / whose / who / what。",
          "slots": [
            {
              "k": "p0",
              "pre": "身份 → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "物品是什么 → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "归属 → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "红蓝两本中哪本 → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "who",
              "k": "p0",
              "h": "who 问谁，whose 问谁的，what 问什么，which 在范围内选。"
            },
            {
              "t": "what",
              "k": "p1",
              "h": "who 问谁，whose 问谁的，what 问什么，which 在范围内选。"
            },
            {
              "t": "whose",
              "k": "p2",
              "h": "who 问谁，whose 问谁的，what 问什么，which 在范围内选。"
            },
            {
              "t": "which",
              "k": "p3",
              "h": "who 问谁，whose 问谁的，what 问什么，which 在范围内选。"
            }
          ],
          "tip": "who 问谁，whose 问谁的，what 问什么，which 在范围内选。",
          "audio": "ex_q4_1",
          "sourceQuestion": "Q4.1"
        },
        {
          "type": "steps",
          "badge": "S",
          "title": "问清是谁 · 打字填空",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "正式写法，介词放前：",
              "pre": "To ",
              "post": " does the owl give the book?",
              "ans": "whom",
              "ph": "",
              "au": "ex_q4_2",
              "why": "介词 to 紧接疑问代词的正式结构用 whom。口语可说 Who does the owl give the book to?",
              "hint": "介词 to 紧接疑问代词的正式结构用 whom。口语可说 Who does the owl give the book to?",
              "wrong": [
                {
                  "re": "^who$",
                  "zh": "介词 to 紧接疑问代词的正式结构用 whom。口语可说 Who does the owl give the book to?"
                },
                {
                  "re": "^whose$",
                  "zh": "介词 to 紧接疑问代词的正式结构用 whom。口语可说 Who does the owl give the book to?"
                }
              ],
              "sourceQuestion": "Q4.2"
            },
            {
              "kind": "typed",
              "ctx": "用 what 或 which：",
              "pre": "",
              "post": " is your name?",
              "ans": "What",
              "ph": "",
              "au": "ex_q4_3",
              "why": "问名字没有可供挑选的范围，用 what；which 要在给定的几个里挑。",
              "hint": "问名字没有可供挑选的范围，用 what；which 要在给定的几个里挑。",
              "wrong": [
                {
                  "re": "^which$",
                  "zh": "问名字没有可供挑选的范围，用 what；which 要在给定的几个里挑。"
                }
              ],
              "sourceQuestion": "Q4.3"
            }
          ]
        },
        {
          "type": "steps",
          "badge": "S",
          "title": "问清是谁 · 连词成句",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "rewrite",
              "q": "词块：shelf / behind / Who / the / is；问藏着的人是谁。",
              "src": "shelf / behind / Who / the / is",
              "answers": [
                "who is behind the shelf"
              ],
              "show": "Who is behind the shelf?",
              "au": "ex_q4_4",
              "why": "Who 本身作主语，后面直接接 is。",
              "hint": "Who 本身作主语，后面直接接 is。",
              "wrong": [
                {
                  "re": "^who\\ does\\ is\\ behind\\ the\\ shelf$",
                  "zh": "Who 本身作主语，后面直接接 is。"
                }
              ],
              "sourceQuestion": "Q4.4"
            }
          ]
        }
      ]
    },
    "q5": {
      "type": "seq",
      "parts": [
        {
          "type": "steps",
          "badge": "O",
          "title": "一些、任何、没有 · 选词与改错",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "只选 some / any：",
              "pre": "We do not have ",
              "post": " ink.",
              "ans": "any",
              "ph": "",
              "au": "ex_q5_1",
              "why": "本句想说一点墨水也没有，用 not any。",
              "hint": "本句想说一点墨水也没有，用 not any。",
              "wrong": [
                {
                  "re": "^some$",
                  "zh": "本句想说一点墨水也没有，用 not any。"
                }
              ],
              "sourceQuestion": "Q5.1"
            },
            {
              "kind": "typed",
              "ctx": "只选 some / any，礼貌提供标签：",
              "pre": "Would you like ",
              "post": " labels?",
              "ans": "some",
              "ph": "",
              "au": "ex_q5_2",
              "why": "提出邀请并期待对方接受，疑问句也用 some。",
              "hint": "提出邀请并期待对方接受，疑问句也用 some。",
              "wrong": [
                {
                  "re": "^any$",
                  "zh": "提出邀请并期待对方接受，疑问句也用 some。"
                }
              ],
              "sourceQuestion": "Q5.2"
            },
            {
              "kind": "rewrite",
              "q": "Biscuit finds soft something. 只调整末尾两词顺序。",
              "src": "Biscuit finds soft something.",
              "answers": [
                "biscuit finds something soft"
              ],
              "show": "Biscuit finds something soft.",
              "au": "ex_q5_3",
              "why": "形容词修饰 something，要放在它后面。",
              "hint": "形容词修饰 something，要放在它后面。",
              "wrong": [
                {
                  "re": "^soft\\ something\\ 保持不变。$",
                  "zh": "形容词修饰 something，要放在它后面。"
                }
              ],
              "sourceQuestion": "Q5.3"
            }
          ]
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "一些、任何、没有 · 选词与改错",
          "desc": "情境：问谁来过→没有人；问拿到什么→什么也没拿到；问三只包找到几只→一只也没有。选项乱序：none / nobody / nothing。",
          "slots": [
            {
              "k": "p0",
              "pre": "问谁来过→没有人 → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "问拿到什么→什么也没拿到 → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "问三只包找到几只→一只也没有 → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "nobody",
              "k": "p0",
              "h": "人、事物和数量要区分；none 可以接 of，nobody 不这样接。"
            },
            {
              "t": "nothing",
              "k": "p1",
              "h": "人、事物和数量要区分；none 可以接 of，nobody 不这样接。"
            },
            {
              "t": "none",
              "k": "p2",
              "h": "人、事物和数量要区分；none 可以接 of，nobody 不这样接。"
            }
          ],
          "tip": "人、事物和数量要区分；none 可以接 of，nobody 不这样接。",
          "audio": "ex_q5_4",
          "sourceQuestion": "Q5.4"
        },
        {
          "type": "steps",
          "badge": "O",
          "title": "一些、任何、没有 · 选词与改错",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "四选一 a few / few / a little / little：",
              "pre": "There is ",
              "post": " ink, so we can write one label.",
              "ans": "a little",
              "ph": "",
              "au": "ex_q5_5",
              "why": "ink 不可数；还能写，表示有一点，用 a little。",
              "hint": "ink 不可数；还能写，表示有一点，用 a little。",
              "wrong": [
                {
                  "re": "^few$",
                  "zh": "ink 不可数；还能写，表示有一点，用 a little。"
                },
                {
                  "re": "^a ?few$",
                  "zh": "ink 不可数；还能写，表示有一点，用 a little。"
                },
                {
                  "re": "^little$",
                  "zh": "ink 不可数；还能写，表示有一点，用 a little。"
                }
              ],
              "sourceQuestion": "Q5.5"
            }
          ]
        }
      ]
    },
    "q6": {
      "type": "steps",
      "badge": "COUNT",
      "title": "两件与多件 · 连线",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "match",
          "pairs": [
            {
              "t": "两只都",
              "k": "p0",
              "ex": "Both gloves are blue.",
              "au": "ex_q6_1",
              "h": "both 把两件一起算；either 任选一件；neither 一件也不。"
            },
            {
              "t": "任意一只",
              "k": "p1",
              "ex": "",
              "au": "",
              "h": "both 把两件一起算；either 任选一件；neither 一件也不。"
            },
            {
              "t": "两只都不",
              "k": "p2",
              "ex": "Neither glove is mine.",
              "au": "ex_q8_7",
              "h": "both 把两件一起算；either 任选一件；neither 一件也不。"
            }
          ],
          "targets": [
            {
              "k": "p1",
              "b": "COUNT",
              "t": "either"
            },
            {
              "k": "p0",
              "b": "COUNT",
              "t": "both"
            },
            {
              "k": "p2",
              "b": "COUNT",
              "t": "neither"
            }
          ],
          "done": "both 把两件一起算；either 任选一件；neither 一件也不。",
          "sourceQuestion": "Q6.1"
        },
        {
          "kind": "typed",
          "ctx": "两只包，一红一蓝：选 another / the other。",
          "pre": "One bag is red, and ",
          "post": " is blue.",
          "ans": "the other",
          "ph": "",
          "au": "ex_q6_2",
          "why": "总共两只，剩下的那只已经确定，用 the other。",
          "hint": "总共两只，剩下的那只已经确定，用 the other。",
          "wrong": [
            {
              "re": "^another$",
              "zh": "总共两只，剩下的那只已经确定，用 the other。"
            }
          ],
          "sourceQuestion": "Q6.2"
        },
        {
          "kind": "typed",
          "ctx": "这一架上有很多书，还想再借一本：选 another / other / others。",
          "pre": "May I have ",
          "post": " book?",
          "ans": "another",
          "ph": "",
          "au": "ex_q6_3",
          "why": "another + 单数表示再一个；other 后接复数时才直接表示其他的。",
          "hint": "another + 单数表示再一个；other 后接复数时才直接表示其他的。",
          "wrong": [
            {
              "re": "^other$",
              "zh": "another + 单数表示再一个；other 后接复数时才直接表示其他的。"
            },
            {
              "re": "^others$",
              "zh": "another + 单数表示再一个；other 后接复数时才直接表示其他的。"
            }
          ],
          "sourceQuestion": "Q6.3"
        },
        {
          "kind": "typed",
          "ctx": "猫头鹰有五本书，两本是红的，其余全是蓝的：选 others / the others。",
          "pre": "Two books are red, and ",
          "post": " are blue.",
          "ans": "the others",
          "ph": "",
          "au": "ex_q6_4",
          "why": "一共五本，剩下的三本是确定的“其余全部”，用 the others；others 只是“另一些”，不说是不是全部。",
          "hint": "一共五本，剩下的三本是确定的“其余全部”，用 the others；others 只是“另一些”，不说是不是全部。",
          "wrong": [
            {
              "re": "^others$",
              "zh": "一共五本，剩下的三本是确定的“其余全部”，用 the others；others 只是“另一些”，不说是不是全部。"
            }
          ],
          "sourceQuestion": "Q6.4"
        }
      ]
    },
    "q7": {
      "type": "steps",
      "badge": "S",
      "title": "自己来 · 搭句子",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "rewrite",
          "q": "词块：herself / Lily / the / checks / label；保持强调“亲自”。",
          "src": "herself / Lily / the / checks / label",
          "answers": [
            "lily checks the label herself",
            "lily herself checks the label"
          ],
          "show": "Lily checks the label herself.",
          "au": "ex_q7_1",
          "why": "herself 强调 Lily 亲自做，不能独自代替主语 Lily。",
          "hint": "herself 强调 Lily 亲自做，不能独自代替主语 Lily。",
          "wrong": [
            {
              "re": "^herself\\ checks\\ the\\ label$",
              "zh": "herself 强调 Lily 亲自做，不能独自代替主语 Lily。"
            }
          ],
          "sourceQuestion": "Q7.1"
        },
        {
          "kind": "rewrite",
          "q": "This is our map. 改成 The map 开头，保留原意。",
          "src": "This is our map.",
          "answers": [
            "the map is ours"
          ],
          "show": "The map is ours.",
          "au": "ex_q7_2",
          "why": "ours 单独表示我们的地图，后面不用重复名词。",
          "hint": "ours 单独表示我们的地图，后面不用重复名词。",
          "wrong": [
            {
              "re": "^the\\ map\\ is\\ our$",
              "zh": "ours 单独表示我们的地图，后面不用重复名词。"
            }
          ],
          "sourceQuestion": "Q7.2"
        },
        {
          "kind": "blank",
          "ctx": "Every one / Everyone 二选一：___ of the four children has a label.",
          "pre": "",
          "post": " of the four children has a label.",
          "ans": "Every one",
          "opts": [
            "Everyone",
            "Every one"
          ],
          "au": "ex_q7_3",
          "why": "of 前使用分写的 every one；everyone 单词本身表示每个人。",
          "hint": "of 前使用分写的 every one；everyone 单词本身表示每个人。",
          "sourceQuestion": "Q7.3"
        },
        {
          "kind": "typed",
          "ctx": "只填 have / has：",
          "pre": "They each ",
          "post": " a bag.",
          "ans": "have",
          "ph": "",
          "au": "ex_q7_4",
          "why": "主语是 they，each 在旁边补充“每人”，仍用 have。",
          "hint": "主语是 they，each 在旁边补充“每人”，仍用 have。",
          "wrong": [
            {
              "re": "^has$",
              "zh": "主语是 they，each 在旁边补充“每人”，仍用 have。"
            }
          ],
          "sourceQuestion": "Q7.4"
        }
      ]
    },
    "q8": {
      "type": "steps",
      "badge": "V",
      "title": "罗盘回看 · 判断对错",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "tf",
          "s": "Them help Lily.",
          "ok": false,
          "au": "ex_q8_1",
          "why": "主语用 they，them 是宾格。",
          "hint": "主语用 they，them 是宾格。",
          "fix": "They help Lily.",
          "sourceQuestion": "Q8.1"
        },
        {
          "kind": "tf",
          "s": "This book is hers.",
          "ok": true,
          "au": "ex_q8_2",
          "why": "这里不再跟名词，用 hers 表所属。",
          "hint": "这里不再跟名词，用 hers 表所属。",
          "sourceQuestion": "Q8.2"
        },
        {
          "kind": "tf",
          "s": "Sam checks the bag himself.",
          "ok": true,
          "au": "ex_q8_3",
          "why": "himself 指 Sam 亲自检查。",
          "hint": "himself 指 Sam 亲自检查。",
          "sourceQuestion": "Q8.3"
        },
        {
          "kind": "tf",
          "s": "Those is my gloves.",
          "ok": false,
          "au": "ex_q8_4",
          "why": "those 指多个，be 用 are。",
          "hint": "those 指多个，be 用 are。",
          "fix": "Those are my gloves.",
          "sourceQuestion": "Q8.4"
        },
        {
          "kind": "tf",
          "s": "Whose bag is this?",
          "ok": true,
          "au": "ex_q8_5",
          "why": "whose 问归属，放在 bag 前。",
          "hint": "whose 问归属，放在 bag 前。",
          "sourceQuestion": "Q8.5"
        },
        {
          "kind": "tf",
          "s": "There is important something in the bag.",
          "ok": false,
          "au": "ex_q8_6",
          "why": "修饰复合不定代词的形容词后置。",
          "hint": "修饰复合不定代词的形容词后置。",
          "fix": "There is something important in the bag.",
          "sourceQuestion": "Q8.6"
        },
        {
          "kind": "tf",
          "s": "Neither glove is mine.",
          "ok": true,
          "au": "ex_q8_7",
          "why": "neither + 单数名词，本句用 is。",
          "hint": "neither + 单数名词，本句用 is。",
          "sourceQuestion": "Q8.7"
        },
        {
          "kind": "tf",
          "s": "Every child have a label.",
          "ok": false,
          "au": "ex_q8_8",
          "why": "every + 单数名词，谓语也按单数。",
          "hint": "every + 单数名词，谓语也按单数。",
          "fix": "Every child has a label.",
          "sourceQuestion": "Q8.8"
        }
      ]
    },
    "map": {
      "type": "map",
      "button": "做我的收藏卡 ➜",
      "html": "<h2>🗺️ 代词知识地图</h2><div class=\"kgrid\"><div><h3>K01 代词是替身：主格、宾格</h3><p>主格 I/you/he/she/it/we/you/they；宾格 me/you/him/her/it/us/you/them。They help her.（他们帮助她。）介词后也用宾格：The owl looks at us. 简短回答常用 Me. / Not me.；若补全谓语，可以说 I do.，不能把主格绝对判错。并列人称习惯把自己放后面：Mia and I read.，不把“认错先说 I”当语法硬规则。</p><details><summary>K02 物主代词两种站位</summary><p>my→mine；your→yours；his→his；her→hers；our→ours；their→theirs。前一列要接名词，后一列可单独作主语、宾语或表语：Mine is blue. / I like hers. / This is yours. it 的所属通常用 its + 名词：its wings；入门不把独立 its 当成常规练习形式。its 没撇号，it’s = it is / it has。</p></details><details><summary>K03 反身代词：自己与亲自</summary><p>myself / yourself / himself / herself / itself / ourselves / yourselves / themselves。Lily sees herself in the mirror.（动作回到自己。）Lily checks it herself.（强调亲自。）by oneself 表独自：Sam reads by himself.。反身代词不能单独替代主语：Lily checks it.，不能写 Herself checks it.</p></details></div><div><h3>K04 常见反身搭配</h3><p>enjoy oneself 玩得开心；help oneself to 随便取用；hurt oneself 伤到自己；dress oneself 自己穿衣；teach oneself / learn by oneself 自学；look after oneself 照顾自己。We enjoy ourselves here. / Help yourself to some water. 其他低频搭配留给后续阅读，不要求一口气背完。</p><details><summary>K05 指示代词：近远与单复数</summary><p>this 近处一个→these 近处多个；that 远处一个→those 远处多个。This is a book. / Those are gloves. 也可指时间：these days；电话介绍自己：This is Leo speaking. 询问对方可说 Is that Mia?。that 还可指刚才整件事：That is good news.</p></details><details><summary>K06 疑问代词：问的是什么</summary><p>who 问人；whom 是宾语形式，正式介词前置结构用 To whom…；whose 问归属；what 问什么或无明确范围的选择；which 在限定范围中选。What does your father do? 问职业，比孤立的 What is your father? 更自然。Who is your father? 问哪位是父亲。Whose 可单独用：Whose is this?。</p></details></div><div><h3>K07 疑问代词也有句中位置</h3><p>Who has the book? 中 who 作主语；What is this? 中 what 作表语；What do you need? 中 what 作宾语；Whose bag is this? 中 whose 限定 bag。问未知身份通常用单数 Who is…，但明确复数说 Who are those children?，看所问对象，不能硬套一律单数。</p><details><summary>K08 some 与 any：看意思，不只看问号</summary><p>some 常说一些；any 常在否定/一般询问中使用。We have some books. / We do not have any ink. 邀请可用 Would you like some water?；any 的肯定用法是任意：You can choose any book. some + 单数可表示某个：Some child left a bag here.</p></details><details><summary>K09 复合不定代词</summary><p>somebody/someone、anybody/anyone、everybody/everyone、nobody/no one 指人；something/anything/everything/nothing 指事物。作主语一般用单数：Everyone has a bag. 形容词后置：something soft。表达没有时可用 nothing 或 not anything，不叠成 don’t…nothing。none 不属于 -one 复合形式。</p></details></div><div><h3>K10 数量少与多</h3><p>many + 可数复数：many books；much + 不可数：much ink。a few books 有几本，few books 几乎没书；a little ink 有一点，little ink 几乎没有。a bit of ink = a little ink；a bit / a little tired 都表示有点累。few of the books 指这些书中少数，不能写 few of books。</p><details><summary>K11 each、every 与 every one</summary><p>Each child has a label. / Every child has a label. each 可以单独用，也能接 of：Each of us has one.；every 通常要接单数名词。every one of 分写；everyone 不接 of。They each have a label. 的主语是 they。every two days / every other day 都是每隔一天，不用 every other ten days 表每十天。</p></details><details><summary>K12 one / ones 与 it</summary><p>I need a pen; do you have one? 中 one 是同类的一支，不一定同一支。This is my pen; I use it. 中 it 指同一支。the red one、the blue ones、a new one 均可。my own 表我自己的，不加 one。口语中 my one 等并非一概错误，本集默认用 mine。</p></details></div><div><h3>K13 other 家族</h3><p>other books = 其他书；others 可独立代替其他一些人或物；the others 指限定范围剩余全部。两者之一…另一个…：one…the other…。another book 表另一本；another two books 表再两本（two more books）。each other 与 one another 都可说互相，不按人数硬分。one after another 一个接一个；the other day 前几天。</p><details><summary>K14 all、both 与部分否定</summary><p>both 两者都；all 表全体或全部，也能用于不可数：all the ink。They both read. / They are both ready.；all/both 一般在实义动词前、be 后。Not all books are red. 是并非全红，不是全不红。避免用含混的 Both…not 作为唯一答案题。</p></details><details><summary>K15 either、neither 与 none</summary><p>either 两者任意一个：Either book is fine.（哪一本都可以。）neither 两者都不：Neither glove is mine.；none 表数量为零，可指人/物或不可数，不是只能三者以上。None of the ink is blue.；none of + 复数名词时单复数谓语均有使用，不做单一正误判据。</p></details></div><div><h3>K16 问谁、什么、多少</h3><p>Who is here? — Nobody.；What is in the box? — Nothing.；How many books are here? — None.。no one/nobody 不直接接 of；none of 可以。no 作限定词：no book / no books / no water，对应 not a / not any。</p><details><summary>K17 只作边界提醒的替代用法</summary><p>比较时 that 可代可数单数或不可数、those 代复数；详在第 11 集。I hope so. 的 so 替代前面所说情况，不按代词主宾格练习。it 表时间天气距离、形式主语/形式宾语/强调结构分到第 6、12、13、16、17 集，避免本集过载。</p></details><details><summary>K18 失物认领的完整说法</summary><p>This is my bag. = This bag is mine.；These are our drawings. = These drawings are ours. 用替身要让听者知道指谁；若同时出现 Mia 和 Lily，不能只凭 she/hers 猜归属。本集 l05 先点名 Mia，再用 her 指她；l06 Mia 点名问 Lily，l07 Lily 回答，his 指画面中被指着的 Leo。</p></details></div></div><p class=\"kdl\">{download}</p>"
    },
    "card": {
      "type": "card",
      "variant": "treasure",
      "badge": "OWNER",
      "title": "失物认领卡 #3",
      "desc": "挑一句留作自己的标签",
      "front": "云上图书馆的失物招领 · 收藏卡 #3",
      "backNote": "用替身要让听者知道指谁。",
      "options": [
        {
          "k": "bag",
          "s": "This bag is mine.",
          "zh": "这个包是我的。",
          "img": "01_cloud_library"
        },
        {
          "k": "book",
          "s": "That book is hers.",
          "zh": "那本书是她的。",
          "img": "02_red_blue_books"
        },
        {
          "k": "labels",
          "s": "We can check the labels ourselves.",
          "zh": "我们可以自己核对标签。",
          "img": "04_labels_v2"
        },
        {
          "k": "together",
          "s": "We help each other.",
          "zh": "我们互相帮助。",
          "img": "05_library_star_v2"
        }
      ],
      "button": "收进日志",
      "done": "把第 3 颗星送回罗盘"
    }
  },
  "ending": {
    "img": "library_star",
    "say": {
      "id": "star",
      "zh": "第 3 颗星回到了罗盘！"
    },
    "html": "<h2>🎉 第 3 集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 · 🗺️ 地图解锁：<b>云上图书馆的失物招领</b></p><p>现在每个人都拿对东西了，这颗星星属于我们！</p><p>{download}</p>"
  },
  "css": true
};
