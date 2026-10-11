export default {
  "no": 4,
  "hud": "🧭 罗盘冒险队 · 第4集 龙的谜语洞",
  "start": {
    "h1": "龙的谜语洞",
    "subt": "问出龙的本领和守护的秘密。",
    "go": "🧭 出发：Are you awake?"
  },
  "theme": {
    "bg": "#182e28",
    "stage": "#274b3c"
  },
  "audioVersion": "20261011-willo-audio-final1",
  "rewardWait": false,
  "download": {
    "href": "downloads/ep04_questions_conjunctions.docx",
    "name": "罗盘冒险队_第4集_疑问句与并列句_知识点.docx",
    "label": "📥 下载知识点（Word）"
  },
  "img": {
    "cave_gate": [
      "illus/01_cave_gate.jpg",
      "龙的谜语洞 · 山洞口的绿龙"
    ],
    "riddle_chat": [
      "illus/02_riddle_chat.jpg",
      "龙的谜语洞 · 大家和龙聊谜语"
    ],
    "book_guard": [
      "illus/03_book_guard.jpg",
      "龙的谜语洞 · 守护书籍的龙"
    ],
    "egg_basket": [
      "illus/04_egg_basket.jpg",
      "龙的谜语洞 · Biscuit 叼着小蛋"
    ],
    "compass_memory": [
      "illus/05_compass_memory.jpg",
      "龙的谜语洞 · 归还小蛋后得到星星"
    ]
  },
  "firstImg": "cave_gate",
  "sections": {
    "S1": [
      {
        "id": "l01",
        "zh": "我们到了山洞，Biscuit 也和我们在一起。",
        "img": "cave_gate"
      },
      {
        "id": "l02",
        "zh": "绿龙没睡着，可是他的眼睛闭着。",
        "img": "cave_gate"
      },
      {
        "id": "l03",
        "zh": "你醒着吗？",
        "img": "cave_gate"
      },
      {
        "id": "l04",
        "zh": "龙醒着，他睁开一只眼睛。",
        "img": "cave_gate"
      }
    ],
    "S2": [
      {
        "id": "l05",
        "zh": "你喜欢谜语吗？",
        "img": "riddle_chat"
      },
      {
        "id": "l06",
        "zh": "我不会任何龙的谜语。",
        "img": "riddle_chat"
      },
      {
        "id": "l07",
        "zh": "你能飞过这座山丘吗？",
        "img": "riddle_chat"
      },
      {
        "id": "l08",
        "zh": "龙会飞，但他星期一不飞。",
        "img": "riddle_chat"
      }
    ],
    "S3": [
      {
        "id": "l09",
        "zh": "为什么他星期一待在洞里？",
        "img": "book_guard"
      },
      {
        "id": "l10",
        "zh": "他守护的是金子还是书？",
        "img": "book_guard"
      },
      {
        "id": "l11",
        "zh": "他守护书籍，所以星期一他待在洞里看书。",
        "img": "book_guard"
      }
    ],
    "S4": [
      {
        "id": "l12",
        "zh": "那个篮子里有什么？",
        "img": "egg_basket"
      },
      {
        "id": "l13",
        "zh": "现在谁拿着那枚小蛋？",
        "img": "egg_basket"
      },
      {
        "id": "l14",
        "zh": "龙认出了爷爷的罗盘，而 Biscuit 正叼着小蛋。",
        "img": "compass_memory"
      },
      {
        "id": "l15",
        "zh": "Biscuit 归还了小蛋，于是龙送给冒险队一颗星。",
        "img": "compass_memory"
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
          "title": "挑对帮手 · 分类",
          "desc": "卡片 I / the dragon / you / Mia and Sam；放入 be 的 am / is / are 三盒。",
          "slots": [
            {
              "k": "am",
              "title": "am",
              "b": "V"
            },
            {
              "k": "is",
              "title": "is",
              "b": "V"
            },
            {
              "k": "are",
              "title": "are",
              "b": "V"
            }
          ],
          "chunks": [
            {
              "t": "I",
              "k": "am",
              "h": "be 跟主语配对，you 即使只有一个人也用 are。"
            },
            {
              "t": "the dragon",
              "k": "is",
              "h": "be 跟主语配对，you 即使只有一个人也用 are。"
            },
            {
              "t": "you",
              "k": "are",
              "h": "be 跟主语配对，you 即使只有一个人也用 are。"
            },
            {
              "t": "Mia and Sam",
              "k": "are",
              "h": "be 跟主语配对，you 即使只有一个人也用 are。"
            }
          ],
          "tip": "be 跟主语配对，you 即使只有一个人也用 are。",
          "audio": "ex_q1_1",
          "sourceQuestion": "Q1.1"
        },
        {
          "type": "drag",
          "title": "挑对帮手 · 分类",
          "desc": "卡片 We like books. / She likes books. / He liked books yesterday.；问句帮手三盒 do / does / did。",
          "slots": [
            {
              "k": "do",
              "title": "do"
            },
            {
              "k": "does",
              "title": "does"
            },
            {
              "k": "did",
              "title": "did"
            }
          ],
          "chunks": [
            {
              "t": "We like books.",
              "k": "do",
              "h": "do 对现在的复数等主语，does 对现在三单，did 管过去；过去细讲在第9集。"
            },
            {
              "t": "She likes books.",
              "k": "does",
              "h": "do 对现在的复数等主语，does 对现在三单，did 管过去；过去细讲在第9集。"
            },
            {
              "t": "He liked books yesterday.",
              "k": "did",
              "h": "do 对现在的复数等主语，does 对现在三单，did 管过去；过去细讲在第9集。"
            }
          ],
          "tip": "do 对现在的复数等主语，does 对现在三单，did 管过去；过去细讲在第9集。",
          "audio": "ex_q1_2",
          "sourceQuestion": "Q1.2"
        },
        {
          "type": "drag",
          "title": "挑对帮手 · 分类",
          "desc": "按造问句时“直接提前”或“需要 do/does”分：is / can / likes / read（主语 they）。",
          "slots": [
            {
              "k": "direct",
              "title": "直接提前"
            },
            {
              "k": "helper",
              "title": "需要 do/does"
            }
          ],
          "chunks": [
            {
              "t": "is",
              "k": "direct",
              "h": "已有 be 或 can 就直接提前；普通实义动词请 do/does。"
            },
            {
              "t": "can",
              "k": "direct",
              "h": "已有 be 或 can 就直接提前；普通实义动词请 do/does。"
            },
            {
              "t": "likes",
              "k": "helper",
              "h": "已有 be 或 can 就直接提前；普通实义动词请 do/does。"
            },
            {
              "t": "read（主语 they）",
              "k": "helper",
              "h": "已有 be 或 can 就直接提前；普通实义动词请 do/does。"
            }
          ],
          "tip": "已有 be 或 can 就直接提前；普通实义动词请 do/does。",
          "audio": "ex_q1_3",
          "sourceQuestion": "Q1.3"
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "挑对帮手 · 分类",
          "desc": "左：do not / does not / is not / are not / cannot；右乱序：aren’t / can’t / doesn’t / don’t / isn’t。",
          "slots": [
            {
              "k": "p0",
              "pre": "do not → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "does not → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "is not → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "are not → ",
              "post": ""
            },
            {
              "k": "p4",
              "pre": "cannot → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "don’t",
              "k": "p0",
              "h": "缩写保留原来的帮手；cannot 通常写一个词。"
            },
            {
              "t": "doesn’t",
              "k": "p1",
              "h": "缩写保留原来的帮手；cannot 通常写一个词。"
            },
            {
              "t": "isn’t",
              "k": "p2",
              "h": "缩写保留原来的帮手；cannot 通常写一个词。"
            },
            {
              "t": "aren’t",
              "k": "p3",
              "h": "缩写保留原来的帮手；cannot 通常写一个词。"
            },
            {
              "t": "can’t",
              "k": "p4",
              "h": "缩写保留原来的帮手；cannot 通常写一个词。"
            }
          ],
          "tip": "缩写保留原来的帮手；cannot 通常写一个词。",
          "audio": "ex_q1_4",
          "sourceQuestion": "Q1.4"
        }
      ]
    },
    "q2": {
      "type": "seq",
      "parts": [
        {
          "type": "steps",
          "badge": "V",
          "title": "把消息变成问题 · 改写",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "rewrite",
              "q": "The dragon is awake. 变一般疑问句。",
              "src": "The dragon is awake.",
              "answers": [
                "is the dragon awake"
              ],
              "show": "Is the dragon awake?",
              "au": "ex_q2_1",
              "why": "句中已有 is，直接移到前面，不再加 does。",
              "hint": "句中已有 is，直接移到前面，不再加 does。",
              "wrong": [
                {
                  "re": "^does\\ the\\ dragon\\ is\\ awake$",
                  "zh": "句中已有 is，直接移到前面，不再加 does。"
                }
              ],
              "sourceQuestion": "Q2.1"
            },
            {
              "kind": "rewrite",
              "q": "The children like riddles. 变一般疑问句。",
              "src": "The children like riddles.",
              "answers": [
                "do the children like riddles"
              ],
              "show": "Do the children like riddles?",
              "au": "ex_q2_2",
              "why": "like 是实义动词，复数主语用 do。",
              "hint": "like 是实义动词，复数主语用 do。",
              "wrong": [
                {
                  "re": "^are\\ the\\ children\\ like\\ riddles$",
                  "zh": "like 是实义动词，复数主语用 do。"
                }
              ],
              "sourceQuestion": "Q2.2"
            },
            {
              "kind": "rewrite",
              "q": "The dragon likes books. 变一般疑问句。",
              "src": "The dragon likes books.",
              "answers": [
                "does the dragon like books"
              ],
              "show": "Does the dragon like books?",
              "au": "ex_q2_3",
              "why": "does 已体现三单，like 要还原。",
              "hint": "does 已体现三单，like 要还原。",
              "wrong": [
                {
                  "re": "^does\\ the\\ dragon\\ likes\\ books$",
                  "zh": "does 已体现三单，like 要还原。"
                }
              ],
              "sourceQuestion": "Q2.3"
            },
            {
              "kind": "rewrite",
              "q": "Biscuit can jump. 变一般疑问句。",
              "src": "Biscuit can jump.",
              "answers": [
                "can biscuit jump"
              ],
              "show": "Can Biscuit jump?",
              "au": "ex_q2_4",
              "why": "情态动词 can 自己提前，后面 jump 保持原形。",
              "hint": "情态动词 can 自己提前，后面 jump 保持原形。",
              "wrong": [
                {
                  "re": "^does\\ biscuit\\ can\\ jump$",
                  "zh": "情态动词 can 自己提前，后面 jump 保持原形。"
                }
              ],
              "sourceQuestion": "Q2.4"
            }
          ]
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "把消息变成问题 · 改写",
          "desc": "问答配对：Are you ready?（Mia答已准备好）/ Does Sam like books?（事实喜欢）/ Can Biscuit fly?（事实不会）；答案乱序：No, he can’t. / Yes, I am. / Yes, he does.",
          "slots": [
            {
              "k": "p0",
              "pre": "Are you ready?（Mia答已准备好） → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "Does Sam like books?（事实喜欢） → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "Can Biscuit fly?（事实不会） → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "Yes, I am.",
              "k": "p0",
              "h": "说话人从 you 换成 I；答句沿用问句帮手。"
            },
            {
              "t": "Yes, he does.",
              "k": "p1",
              "h": "说话人从 you 换成 I；答句沿用问句帮手。"
            },
            {
              "t": "No, he can’t.",
              "k": "p2",
              "h": "说话人从 you 换成 I；答句沿用问句帮手。"
            }
          ],
          "tip": "说话人从 you 换成 I；答句沿用问句帮手。",
          "audio": "ex_q2_5",
          "sourceQuestion": "Q2.5"
        }
      ]
    },
    "q3": {
      "type": "steps",
      "badge": "V",
      "title": "画面里的“是”和“不是” · 看图选句",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "choice",
          "ctx": "龙睁着眼睛。",
          "good": "The dragon is awake.",
          "others": [
            "The dragon is asleep."
          ],
          "au": "ex_q3_1",
          "why": "眼睛睁开、正看着孩子，画面表示 awake。",
          "hint": "眼睛睁开、正看着孩子，画面表示 awake。",
          "img": "pick_awake",
          "sourceQuestion": "Q3.1"
        },
        {
          "kind": "choice",
          "ctx": "Biscuit 全身在桌子下面。",
          "good": "Biscuit is not on the table.",
          "others": [
            "Biscuit is on the table."
          ],
          "au": "ex_q3_2",
          "why": "小狗在桌下，所以“在桌上”需要否定。",
          "hint": "小狗在桌下，所以“在桌上”需要否定。",
          "img": "pick_under",
          "sourceQuestion": "Q3.2"
        },
        {
          "kind": "choice",
          "ctx": "清楚画出两个孩子，其余人不入画；选能同时说到两人的句子。",
          "good": "The children are ready.",
          "others": [
            "The child is ready."
          ],
          "au": "ex_q3_3",
          "why": "图中两人都已站好，主语用复数 children，be 用 are。",
          "hint": "图中两人都已站好，主语用复数 children，be 用 are。",
          "img": "pick_two",
          "sourceQuestion": "Q3.3"
        },
        {
          "kind": "choice",
          "ctx": "敞开的篮子空无一物，蛋在外面桌上。",
          "good": "The egg is not in the basket.",
          "others": [
            "The egg is in the basket."
          ],
          "au": "ex_q3_4",
          "why": "空篮子里没有蛋，用 is not in。",
          "hint": "空篮子里没有蛋，用 is not in。",
          "img": "pick_empty",
          "sourceQuestion": "Q3.4"
        }
      ]
    },
    "q4": {
      "type": "steps",
      "badge": "V",
      "title": "说出“不” · 改错",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "rewrite",
          "q": "The dragon not is angry. 只调整 not 和 is。",
          "src": "The dragon not is angry.",
          "answers": [
            "the dragon is not angry"
          ],
          "show": "The dragon is not angry.",
          "au": "ex_q4_1",
          "why": "be 的否定是 be + not。",
          "hint": "be 的否定是 be + not。",
          "wrong": [
            {
              "re": "^把\\ not\\ 放句末。$",
              "zh": "be 的否定是 be + not。"
            }
          ],
          "sourceQuestion": "Q4.1"
        },
        {
          "kind": "fix",
          "ctx": "Sam doesn’t likes gold. 只改 likes。",
          "s": "Sam doesn’t likes gold.",
          "wi": 2,
          "fix": [
            [
              "like",
              1
            ],
            [
              "liking",
              0
            ]
          ],
          "good": "Sam doesn’t like gold.",
          "au": "ex_q4_2",
          "why": "doesn’t 后用动词原形。",
          "sourceQuestion": "Q4.2"
        },
        {
          "kind": "rewrite",
          "q": "We don’t are late. 改成 be 的否定句。",
          "src": "We don’t are late.",
          "answers": [
            "we aren't late",
            "we are not late"
          ],
          "show": "We are not late.",
          "au": "ex_q4_3",
          "why": "late 前需要 be；be 后直接加 not。",
          "hint": "late 前需要 be；be 后直接加 not。",
          "wrong": [
            {
              "re": "^we\\ don't\\ late$",
              "zh": "late 前需要 be；be 后直接加 not。"
            }
          ],
          "sourceQuestion": "Q4.3"
        },
        {
          "kind": "fix",
          "ctx": "Biscuit can’t flies. 只改 flies。",
          "s": "Biscuit can’t flies.",
          "wi": 2,
          "fix": [
            [
              "fly",
              1
            ],
            [
              "to fly",
              0
            ]
          ],
          "good": "Biscuit can’t fly.",
          "au": "ex_q4_4",
          "why": "can’t 后也用原形，不加 s、不带 to。",
          "sourceQuestion": "Q4.4"
        }
      ]
    },
    "q5": {
      "type": "seq",
      "parts": [
        {
          "type": "drag",
          "mode": "blank",
          "title": "问题地图 · 连线与填空",
          "desc": "问的信息：人 / 物品 / 地点 / 原因 / 时间 / 方法；词卡乱序 where / how / who / when / why / what。",
          "slots": [
            {
              "k": "p0",
              "pre": "人 → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "物品 → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "地点 → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "原因 → ",
              "post": ""
            },
            {
              "k": "p4",
              "pre": "时间 → ",
              "post": ""
            },
            {
              "k": "p5",
              "pre": "方法 → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "who",
              "k": "p0",
              "h": "先想缺什么信息，再选疑问词。"
            },
            {
              "t": "what",
              "k": "p1",
              "h": "先想缺什么信息，再选疑问词。"
            },
            {
              "t": "where",
              "k": "p2",
              "h": "先想缺什么信息，再选疑问词。"
            },
            {
              "t": "why",
              "k": "p3",
              "h": "先想缺什么信息，再选疑问词。"
            },
            {
              "t": "when",
              "k": "p4",
              "h": "先想缺什么信息，再选疑问词。"
            },
            {
              "t": "how",
              "k": "p5",
              "h": "先想缺什么信息，再选疑问词。"
            }
          ],
          "tip": "先想缺什么信息，再选疑问词。",
          "audio": "ex_q5_1",
          "sourceQuestion": "Q5.1"
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "问题地图 · 连线与填空",
          "desc": "问题目标：年龄 / 距离 / 频率 / 时长 / 还要多久 / 可数数量 / 不可数数量或价钱；词卡乱序 how long / how many / how far / how much / how old / how soon / how often。",
          "slots": [
            {
              "k": "p0",
              "pre": "年龄 → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "距离 → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "频率 → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "时长 → ",
              "post": ""
            },
            {
              "k": "p4",
              "pre": "还要多久 → ",
              "post": ""
            },
            {
              "k": "p5",
              "pre": "可数数量 → ",
              "post": ""
            },
            {
              "k": "p6",
              "pre": "不可数数量或价钱 → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "how old",
              "k": "p0",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how far",
              "k": "p1",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how often",
              "k": "p2",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how long",
              "k": "p3",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how soon",
              "k": "p4",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how many",
              "k": "p5",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            },
            {
              "t": "how much",
              "k": "p6",
              "h": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。"
            }
          ],
          "tip": "often 问频率，long 问长度或时长，soon 问从现在到未来还多久。",
          "audio": "ex_q5_2",
          "sourceQuestion": "Q5.2"
        },
        {
          "type": "steps",
          "badge": "S",
          "title": "问题地图 · 打字填空",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "用 do / does / is：",
              "pre": "Where ",
              "post": " the dragon live?",
              "ans": "does",
              "ph": "",
              "au": "ex_q5_3",
              "why": "live 是实义动词，dragon 是三单，用 does。",
              "hint": "live 是实义动词，dragon 是三单，用 does。",
              "wrong": [
                {
                  "re": "^do$",
                  "zh": "live 是实义动词，dragon 是三单，用 does。"
                },
                {
                  "re": "^is$",
                  "zh": "live 是实义动词，dragon 是三单，用 does。"
                }
              ],
              "sourceQuestion": "Q5.3"
            }
          ]
        },
        {
          "type": "steps",
          "badge": "S",
          "title": "问题地图 · 连词成句",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "rewrite",
              "q": "词块：riddles / Who / likes；问谁喜欢谜语。",
              "src": "riddles / Who / likes",
              "answers": [
                "who likes riddles"
              ],
              "show": "Who likes riddles?",
              "au": "ex_q5_4",
              "why": "who 本身作主语，直接接 likes。",
              "hint": "who 本身作主语，直接接 likes。",
              "wrong": [
                {
                  "re": "^who\\ does\\ likes\\ riddles$",
                  "zh": "who 本身作主语，直接接 likes。"
                }
              ],
              "sourceQuestion": "Q5.4"
            }
          ]
        },
        {
          "type": "drag",
          "mode": "blank",
          "title": "问题地图 · 连线与填空",
          "desc": "问句：What time is it? / What day is it? / What’s the date today? / What colour is the egg?；答句乱序：It is green. / It is Monday. / It is the fifth of May. / It is three o’clock.",
          "slots": [
            {
              "k": "p0",
              "pre": "What time is it? → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "What day is it? → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "What’s the date today? → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "What colour is the egg? → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "It is three o’clock.",
              "k": "p0",
              "h": "几点、星期几、几月几号是三种不同问题。"
            },
            {
              "t": "It is Monday.",
              "k": "p1",
              "h": "几点、星期几、几月几号是三种不同问题。"
            },
            {
              "t": "It is the fifth of May.",
              "k": "p2",
              "h": "几点、星期几、几月几号是三种不同问题。"
            },
            {
              "t": "It is green.",
              "k": "p3",
              "h": "几点、星期几、几月几号是三种不同问题。"
            }
          ],
          "tip": "几点、星期几、几月几号是三种不同问题。",
          "audio": "ex_q5_5",
          "sourceQuestion": "Q5.5"
        }
      ]
    },
    "q6": {
      "type": "seq",
      "parts": [
        {
          "type": "drag",
          "mode": "blank",
          "title": "两件事连起来 · 连线与填空",
          "desc": "关系卡：增加一件事 / 前后转折 / 提供选择 / 前因后果；词卡乱序 so / or / and / but。",
          "slots": [
            {
              "k": "p0",
              "pre": "增加一件事 → ",
              "post": ""
            },
            {
              "k": "p1",
              "pre": "前后转折 → ",
              "post": ""
            },
            {
              "k": "p2",
              "pre": "提供选择 → ",
              "post": ""
            },
            {
              "k": "p3",
              "pre": "前因后果 → ",
              "post": ""
            }
          ],
          "chunks": [
            {
              "t": "and",
              "k": "p0",
              "h": "连词要与两个分句的意义配套。"
            },
            {
              "t": "but",
              "k": "p1",
              "h": "连词要与两个分句的意义配套。"
            },
            {
              "t": "or",
              "k": "p2",
              "h": "连词要与两个分句的意义配套。"
            },
            {
              "t": "so",
              "k": "p3",
              "h": "连词要与两个分句的意义配套。"
            }
          ],
          "tip": "连词要与两个分句的意义配套。",
          "audio": "ex_q6_1",
          "sourceQuestion": "Q6.1"
        },
        {
          "type": "steps",
          "badge": "V",
          "title": "两件事连起来 · 连线与填空",
          "desc": "",
          "tip": "",
          "steps": [
            {
              "kind": "typed",
              "ctx": "只选 and / but / so：（突出外表吓人却友好）",
              "pre": "The dragon is huge, ",
              "post": " he is friendly.",
              "ans": "but",
              "ph": "",
              "au": "ex_q6_2",
              "why": "题干强调转折，所以用 but。",
              "hint": "题干强调转折，所以用 but。",
              "wrong": [
                {
                  "re": "^and$",
                  "zh": "题干强调转折，所以用 but。"
                },
                {
                  "re": "^so$",
                  "zh": "题干强调转折，所以用 but。"
                }
              ],
              "sourceQuestion": "Q6.2"
            },
            {
              "kind": "typed",
              "ctx": "只选 but / so / or：（前面说明原因）",
              "pre": "The cave is dark, ",
              "post": " Leo uses a torch.",
              "ans": "so",
              "ph": "",
              "au": "ex_q6_3",
              "why": "因为暗而用手电，是前因后果。",
              "hint": "因为暗而用手电，是前因后果。",
              "wrong": [
                {
                  "re": "^but$",
                  "zh": "因为暗而用手电，是前因后果。"
                },
                {
                  "re": "^or$",
                  "zh": "因为暗而用手电，是前因后果。"
                }
              ],
              "sourceQuestion": "Q6.3"
            },
            {
              "kind": "rewrite",
              "q": "把两句按“否则”连接：Ask clearly. The dragon cannot help. 使用 or。",
              "src": "Ask clearly. The dragon cannot help.",
              "answers": [
                "ask clearly or the dragon cannot help"
              ],
              "show": "Ask clearly, or the dragon cannot help.",
              "au": "ex_q6_4",
              "why": "or 也能表示否则，不只表示二选一。",
              "hint": "or 也能表示否则，不只表示二选一。",
              "wrong": [
                {
                  "re": "^ask\\ clearly\\ and\\ the\\ dragon\\ cannot\\ help$",
                  "zh": "or 也能表示否则，不只表示二选一。"
                }
              ],
              "sourceQuestion": "Q6.4"
            }
          ]
        }
      ]
    },
    "q7": {
      "type": "steps",
      "badge": "V",
      "title": "选哪个 · 问答与搭句子",
      "desc": "",
      "tip": "",
      "steps": [
        {
          "kind": "rewrite",
          "q": "词块：books / gold / Does / guard / he / or；问他守金子还是书。",
          "src": "books / gold / Does / guard / he / or",
          "answers": [
            "does he guard gold or books",
            "does he guard books or gold"
          ],
          "show": "Does he guard gold or books?",
          "au": "ex_q7_1",
          "why": "or 两侧并列；does 后 guard 用原形。",
          "hint": "or 两侧并列；does 后 guard 用原形。",
          "wrong": [
            {
              "re": "^does\\ he\\ guards\\ gold\\ or\\ books$",
              "zh": "or 两侧并列；does 后 guard 用原形。"
            }
          ],
          "sourceQuestion": "Q7.1"
        },
        {
          "kind": "choice",
          "ctx": "已知龙守书、不守金子。问句 Does he guard gold or books?",
          "good": "He guards books.",
          "others": [
            "Yes, he does.",
            "No, he doesn’t."
          ],
          "au": "ex_q7_2",
          "why": "这是在给出的选项里选，回答具体内容。",
          "hint": "这是在给出的选项里选，回答具体内容。",
          "sourceQuestion": "Q7.2"
        },
        {
          "kind": "rewrite",
          "q": "用 and 连成一句：Mia likes riddles. Sam likes football.（保留两个分句）",
          "src": "Mia likes riddles. Sam likes football.",
          "answers": [
            "mia likes riddles and sam likes football",
            "sam likes football and mia likes riddles"
          ],
          "show": "Mia likes riddles, and Sam likes football.",
          "au": "ex_q7_3",
          "why": "and 连接两个完整分句，各自保留主语和谓语，逗号放在 and 前。",
          "hint": "and 连接两个完整分句，各自保留主语和谓语，逗号放在 and 前。",
          "wrong": [
            {
              "re": "^mia\\ and\\ lily\\ likes\\ books$",
              "zh": "and 连接两个完整分句，各自保留主语和谓语，逗号放在 and 前。"
            }
          ],
          "sourceQuestion": "Q7.3"
        },
        {
          "kind": "typed",
          "ctx": "否定问句也按事实：Isn’t the dragon awake? 事实是龙醒着。填 Yes / No。",
          "pre": "",
          "post": ", he is.",
          "ans": "Yes",
          "ph": "",
          "au": "ex_q7_4",
          "why": "英语 yes/no 跟事实走；事实为醒着，回答 Yes, he is.。",
          "hint": "英语 yes/no 跟事实走；事实为醒着，回答 Yes, he is.。",
          "wrong": [
            {
              "re": "^no$",
              "zh": "英语 yes/no 跟事实走；事实为醒着，回答 Yes, he is.。"
            }
          ],
          "accept": [
            "Yes, he is."
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
          "s": "I am ready.",
          "ok": true,
          "au": "ex_q8_1",
          "why": "I 与 am 配对。",
          "hint": "I 与 am 配对。",
          "sourceQuestion": "Q8.1"
        },
        {
          "kind": "tf",
          "s": "Does the dragon likes books?",
          "ok": false,
          "au": "ex_q8_2",
          "why": "does 后动词还原。",
          "hint": "does 后动词还原。",
          "fix": "Does the dragon like books?",
          "sourceQuestion": "Q8.2"
        },
        {
          "kind": "tf",
          "s": "Biscuit is not asleep.",
          "ok": true,
          "au": "ex_q8_3",
          "why": "be 的否定直接加 not。",
          "hint": "be 的否定直接加 not。",
          "sourceQuestion": "Q8.3"
        },
        {
          "kind": "tf",
          "s": "Can Sam to run?",
          "ok": false,
          "au": "ex_q8_4",
          "why": "can 后用不带 to 的原形。",
          "hint": "can 后用不带 to 的原形。",
          "fix": "Can Sam run?",
          "sourceQuestion": "Q8.4"
        },
        {
          "kind": "tf",
          "s": "Where does the dragon live?",
          "ok": true,
          "au": "ex_q8_5",
          "why": "where 问地点，保留 does + 主语 + 原形。",
          "hint": "where 问地点，保留 does + 主语 + 原形。",
          "sourceQuestion": "Q8.5"
        },
        {
          "kind": "tf",
          "s": "Who does has the egg?",
          "ok": false,
          "au": "ex_q8_6",
          "why": "who 就是主语，这里不加 does。",
          "hint": "who 就是主语，这里不加 does。",
          "fix": "Who has the egg?",
          "sourceQuestion": "Q8.6"
        },
        {
          "kind": "tf",
          "s": "The cave is dark, so Lily uses a torch.",
          "ok": true,
          "au": "ex_q8_7",
          "why": "so 引出由前面原因产生的结果。",
          "hint": "so 引出由前面原因产生的结果。",
          "sourceQuestion": "Q8.7"
        },
        {
          "kind": "tf",
          "s": "— Does the dragon guard gold or books? — Yes, he does.",
          "ok": false,
          "au": "ex_q8_8",
          "why": "选择疑问句问“哪一种”，要说出具体内容 He guards books.，不能用 Yes/No 回答。",
          "hint": "选择疑问句问“哪一种”，要说出具体内容 He guards books.，不能用 Yes/No 回答。",
          "fix": "He guards books.",
          "sourceQuestion": "Q8.8"
        }
      ]
    },
    "map": {
      "type": "map",
      "button": "做我的收藏卡 ➜",
      "html": "<h2>🗺️ 疑问句与并列句知识地图</h2><div class=\"kgrid\"><div><h3>K01 be 的现在时</h3><p>I am；he/she/it/单数名词 is；you/we/they/复数名词 are。I am ready. / The dragon is friendly. / The children are here. be 后可接形容词、名词、介词短语或特定副词说明身份、状态、位置：The game is over.</p><details><summary>K02 否定句先找已有帮手</summary><p>be + not：The dragon is not asleep.；can + not：Biscuit cannot fly. can’t = cannot。am not 不缩为 amn’t，常写 I’m not。is not=isn’t；are not=aren’t。</p></details><details><summary>K03 do、does 与 did</summary><p>普通实义动词的现在时问否用 do/does：Do they read? / Does he read?；don’t/doesn’t + 原形。did 是过去时帮手：Did he read yesterday?；本集只认角色，第9集系统讲过去。have/has/had 作完成时助动词放第14/15集；will 放第10集。</p></details></div><div><h3>K04 一般疑问句：把帮手放前面</h3><p>be/can + 主语 + 后面内容：Are you ready? / Can you fly?。实义动词：Do/Does + 主语 + 原形：Does Sam like riddles?。不能把 does 与 likes 双重标三单。</p><details><summary>K05 简短回答与人称转换</summary><p>Are you ready? — Yes, I am. / No, I’m not.；Does she read? — Yes, she does. / No, she doesn’t.；Can he fly? — Yes, he can. / No, he can’t. 回答里的主语按说话者改变。肯定短答通常不能缩成 Yes, I’m.。</p></details><details><summary>K06 can 的第一层：能力</summary><p>The dragon can fly. 表有能力飞；Can the dragon fly? 提问；The dragon can’t swim. 否定。can 后原形不加 s，也不带 to。许可、请求、推测和 must 等放第10集。</p></details></div><div><h3>K07 特殊疑问：先找缺的信息</h3><p>who 人；what 物或内容；which 有范围的选择；whose 归属；where 地点；when 时间；why 原因；how 方式。What colour is it? / Which book do you want? / Whose bag is this?。</p><details><summary>K08 多数特殊疑问句保留一般疑问语序</summary><p>疑问词 + be/can/do/does + 主语 + 其余内容：Where is the cave? / Why does the dragon stay here?。不要写 Where the cave is? 作为本集独立问句；宾语从句以后另讲。</p></details><details><summary>K09 直接问主语时不添 do</summary><p>Who has the egg? / What makes that sound?。who/what 自己占主语位置。Whose bag is here? 的主语是整个 whose bag，也不另添 does。未知对象常按单数问；已明确多个对象时用复数，如 Who are those children?。</p></details></div><div><h3>K10 how 家族</h3><p>How old 年龄；How far 距离；How often 多久一次；How long 多久或多长；How soon 从现在起还多久；How many + 可数复数；How much + 不可数，或问价格。How often do you read? — Every day.；How soon can you come? — In ten minutes.。</p><details><summary>K11 几点、星期、日期、颜色</summary><p>What time is it? — It is three o’clock.；What day is it? — It is Monday.；What’s the date today? — It is the fifth of May.；What colour is it? — It is green. 日期与时刻的写法在第6集展开。</p></details><details><summary>K12 and、but、or、so</summary><p>Mia asks, and Lily listens. 增加或顺承；The dragon is huge, but he is kind. 转折；We can read, or we can play. 选择；It is dark, so we use a torch. 结果。可连接词或短语，也可连接两个完整分句。</p></details></div><div><h3>K13 选择疑问句</h3><p>Is it red or blue? / Does he guard gold or books?。按选项回答 It is blue. / He guards books.，不能仅靠 yes/no 表明选哪一个。or 两侧应可比较、结构平行；两个以上也可以。口语前面选项通常升调、最后一项降调，但不设听力题。</p><details><summary>K14 同词不同关系</summary><p>Ask clearly, or the dragon cannot help. 的 or 表否则；and 不保证后面一定好事，or 也不保证一定坏事，关系看语境。yet 也可表转折；while 可对比；for 可补原因。主线优先 and/but/or/so，不要求第一轮穷尽。</p></details><details><summary>K15 并列句与省略</summary><p>The dragon reads, and Mia listens. 有两套主谓；The dragon reads and smiles. 共用同一主语。紧密相关的两句还可用分号：The cave is quiet; the dragon is awake.。then/otherwise 通常是副词，不能仅靠逗号把两句无条件接成标准并列句。</p></details></div><div><h3>K16 否定问句仍按事实答</h3><p>Isn’t the dragon awake? 如果醒着，Yes, he is.；如果没醒，No, he isn’t.。中文可以说“不，他醒着”，但不要因此把英语 yes 写成 no。普通句不叠两个否定词：I don’t know any riddles. / I know no riddles.。</p><details><summary>K17 认一认其余连接法</summary><p>either…or… 要么…要么…；neither…nor… 既不…也不…；作主语时的配套在第5集主谓一致中补充，句首否定引发倒装在第17集。because/although/if 等从属连接词在第13集。</p></details><details><summary>K18 问题收藏卡</summary><p>先选想知道的内容，再挑帮手。Who has the book? / Where does the dragon live? / Can Biscuit jump? 三句分别是主语提问、实义动词提问、能力提问。</p></details></div></div><p class=\"kdl\">{download}</p>"
    },
    "card": {
      "type": "card",
      "variant": "treasure",
      "badge": "V",
      "title": "问题收藏卡 #4",
      "desc": "挑一句留作自己的标签",
      "front": "龙的谜语洞 · 收藏卡 #4",
      "backNote": "先选想知道的内容，再挑帮手。",
      "options": [
        {
          "k": "who",
          "s": "Who has the book?",
          "zh": "谁拿着书？",
          "img": "03_book_guard"
        },
        {
          "k": "where",
          "s": "Where does the dragon live?",
          "zh": "龙住在哪儿？",
          "img": "01_cave_gate"
        },
        {
          "k": "can",
          "s": "Can Biscuit jump?",
          "zh": "Biscuit 会跳吗？",
          "img": "02_riddle_chat"
        },
        {
          "k": "choice",
          "s": "Does he guard gold or books?",
          "zh": "他守护金子还是书？",
          "img": "03_book_guard"
        }
      ],
      "button": "🪄 收进日志",
      "done": "⭐ 把第 4 颗星送回罗盘"
    }
  },
  "ending": {
    "img": "compass_memory",
    "say": {
      "id": "star",
      "zh": "第 4 颗星回到了罗盘！"
    },
    "html": "<h2>🎉 第 4 集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 · 🗺️ 地图解锁：<b>龙的谜语洞</b></p><p>Biscuit 归还了小蛋，于是龙送给冒险队一颗星。</p><p>{download}</p>"
  }
};
