// 第1集重制 · 纯数据；引擎保持不变。
export default {
  "no": 1,
  "meta": {"title":"金字塔的回声墙","place":"古埃及金字塔","grammar":["句子成分","完整句骨架","be 与系动词"],"icon":"pyramid"},
  "hud": "罗盘冒险队 · 第1集 金字塔的回声墙",
  "stars": "⭐ 第 1 颗星",
  "start": {
    "h1": "金字塔的回声墙",
    "subt": "说出完整句子，打开石门，找到第一颗星！",
    "go": "出发：探索金字塔"
  },
  "theme": {
    "bg": "#1d1711",
    "stage": "#35291b"
  },
  "rewardWait": true,
  "css": true,
  "audioVersion": "20261011-new1",
  "download": {
    "href": "downloads/ep01_sentence_structure.docx",
    "name": "罗盘冒险队_第1集_句子成分_知识点.docx",
    "label": "下载知识点（Word）"
  },
  "img": {
    "attic": [
      "illus/01_attic_v2.jpg",
      "阁楼中，Leo 拿着爷爷的罗盘，伙伴和 Biscuit 围在身旁"
    ],
    "arrival": [
      "illus/02_arrival.jpg",
      "冒险队被罗盘带进金字塔"
    ],
    "torches": [
      "illus/03_mia_torches.jpg",
      "火炬映着石门，Mia 有些害怕"
    ],
    "sock": [
      "illus/04_biscuit_sock_v2.jpg",
      "Biscuit 找到一只旧条纹袜子"
    ],
    "door": [
      "illus/05_door_open_v2.jpg",
      "石门打开，星星和一块空白石牌出现在门后"
    ]
  },
  "firstImg": "attic",
  "sections": {
    "S1": [
      {
        "id": "l01",
        "zh": "Leo 在阁楼里拿着爷爷的罗盘。",
        "img": "attic"
      },
      {
        "id": "l02",
        "zh": "“埃及是我们的第一站！”",
        "img": "attic"
      },
      {
        "id": "l03",
        "zh": "旧指针转得飞快。",
        "img": "attic"
      },
      {
        "id": "l04",
        "zh": "突然，他们来到了一座黑暗的金字塔里。",
        "img": "arrival"
      }
    ],
    "S2": [
      {
        "id": "l05",
        "zh": "石墙冰冷又昏暗。",
        "img": "arrival"
      },
      {
        "id": "l06",
        "zh": "火光下，Mia 看起来有些害怕。",
        "img": "torches"
      },
      {
        "id": "l07",
        "zh": "一道石门上写着字。",
        "img": "torches",
        "overlay": "<div class=\"carve instruction\">Speak a full sentence.</div>"
      },
      {
        "id": "l08",
        "zh": "“墙上说：说一个完整句子。”",
        "img": "torches",
        "overlay": "<div class=\"carve instruction\">Speak a full sentence.</div>"
      },
      {
        "id": "l09",
        "zh": "“这里的回声听起来怪怪的。”",
        "img": "torches"
      }
    ],
    "S3": [
      {
        "id": "l10",
        "zh": "Biscuit 找到一只旧条纹袜子。",
        "img": "sock"
      },
      {
        "id": "l11",
        "zh": "“这只旧袜子摸起来真柔软！”",
        "img": "sock"
      },
      {
        "id": "l12",
        "zh": "“我有一个看看世界的梦想。”",
        "img": "sock"
      }
    ],
    "S4": [
      {
        "id": "l13",
        "zh": "石门缓缓打开了。",
        "img": "door"
      },
      {
        "id": "l14",
        "zh": "门后，一个旧印记在星星旁发光：“C. C. was here – 1975”。会是爷爷留下的吗？",
        "img": "door",
        "overlay": "<div class=\"carve clue\">C. C. was here – 1975</div>"
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
    "q7",
    "S4",
    "q8",
    "map",
    "card"
  ],
  "activities": {
    "q1": {
      "type": "drag",
      "title": "🔍 谁做什么：主谓宾分拣",
      "desc": "读三句，再按句中角色分词块：<br><b>Leo holds the compass.</b> Leo拿罗盘。<br><b>Lily reads the wall.</b> Lily读墙上的字。<br><b>Biscuit finds a sock.</b> Biscuit找到袜子。",
      "slots": [
        {
          "k": "s",
          "b": "S",
          "title": "主语",
          "sub": "谁做动作"
        },
        {
          "k": "v",
          "b": "V",
          "title": "谓语",
          "sub": "做什么"
        },
        {
          "k": "o",
          "b": "O",
          "title": "宾语",
          "sub": "动作涉及谁或什么"
        }
      ],
      "chunks": [
        {
          "t": "Leo",
          "k": "s",
          "h": "谁拿着罗盘？找做动作的人。"
        },
        {
          "t": "holds",
          "k": "v",
          "h": "这个词告诉我们 Leo 在做什么。"
        },
        {
          "t": "the compass",
          "k": "o",
          "h": "Leo 拿着的是什么？"
        },
        {
          "t": "Lily",
          "k": "s",
          "h": "谁在读墙上的字？"
        },
        {
          "t": "reads",
          "k": "v",
          "h": "这个词说的是动作，不是做动作的人。"
        },
        {
          "t": "the wall",
          "k": "o",
          "h": "Lily 读的是哪里的字？"
        },
        {
          "t": "Biscuit",
          "k": "s",
          "h": "谁找到了袜子？"
        },
        {
          "t": "finds",
          "k": "v",
          "h": "这个词告诉我们 Biscuit 做了什么。"
        },
        {
          "t": "a sock",
          "k": "o",
          "h": "Biscuit 找到的是什么？"
        }
      ],
      "audio": "ex_q1_1",
      "tip": "主语说“谁”，谓语说“做什么”，宾语说动作涉及“谁或什么”。三者组成主谓宾。"
    },
    "q2": {
      "type": "steps",
      "title": "🧱 哪句话完整",
      "desc": "每题只有一句既符合情境又完整的话。先找主语，再找能把意思说完整的谓语。",
      "steps": [
        {
          "kind": "choice",
          "ctx": "罗盘指针转动了。选一句完整的话。",
          "good": "The needle spins.",
          "others": [
            "The old needle.",
            "The needle spin."
          ],
          "hint": "先找指针做的动作，再检查单数主语和动词形式。",
          "why": "The needle 是主语，spins 是谓语。“转动”已经说完整，不需要宾语。",
          "au": "ex_q2_1"
        },
        {
          "kind": "choice",
          "ctx": "Lily 读墙上的字。选一句完整的话。",
          "good": "Lily reads the wall.",
          "others": [
            "Lily the wall.",
            "Reads the wall."
          ],
          "hint": "检查有没有说清“谁”以及“做什么”。",
          "why": "Lily 是主语，reads 是谓语，the wall 是宾语。",
          "au": "ex_q2_2"
        },
        {
          "kind": "choice",
          "ctx": "Mia 很害怕。选一句完整的话。",
          "good": "Mia is scared.",
          "others": [
            "Mia scared.",
            "Mia is."
          ],
          "hint": "英语陈述句不能只放人名和形容词；表示状态的部分也要完整。",
          "why": "Mia 是主语，is 是系动词，scared 是表语，说明 Mia 的状态。",
          "au": "ex_q2_3"
        }
      ],
      "tip": "完整不等于词多：The needle spins. 也完整。"
    },
    "q3": {
      "type": "steps",
      "title": "🪄 开门结构：主系表",
      "desc": "主系表说明“谁是什么／什么样”。分三轮，每轮三个词块；先选词块，再点盒子。",
      "steps": [
        {
          "kind": "sort",
          "q": "第 1 句：Mia is scared. 把三个词块按句中角色分类。",
          "boxes": [
            {
              "k": "s",
              "t": "S 主语：说谁"
            },
            {
              "k": "l",
              "t": "L 系动词：连接状态"
            },
            {
              "k": "c",
              "t": "C 表语：是什么样"
            }
          ],
          "items": [
            {
              "w": "Mia",
              "zh": "Mia",
              "box": "s",
              "why": "先找整句在说谁。"
            },
            {
              "w": "is",
              "zh": "是",
              "box": "l",
              "why": "be 的形式连接主语和后面的状态。"
            },
            {
              "w": "scared",
              "zh": "害怕的",
              "box": "c",
              "why": "这个词说明主语是什么样。"
            }
          ],
          "au": "ex_q3_1",
          "why": "Mia 是主语，is 是系动词，scared 是表语。"
        },
        {
          "kind": "sort",
          "q": "第 2 句：The walls are cold. 把三个词块按句中角色分类。",
          "boxes": [
            {
              "k": "s",
              "t": "S 主语：说谁"
            },
            {
              "k": "l",
              "t": "L 系动词：连接状态"
            },
            {
              "k": "c",
              "t": "C 表语：是什么样"
            }
          ],
          "items": [
            {
              "w": "The walls",
              "zh": "墙壁",
              "box": "s",
              "why": "先找整句在说谁。"
            },
            {
              "w": "are",
              "zh": "是",
              "box": "l",
              "why": "be 的形式连接主语和后面的状态。"
            },
            {
              "w": "cold",
              "zh": "冰冷的",
              "box": "c",
              "why": "这个词说明主语是什么样。"
            }
          ],
          "au": "ex_q3_2",
          "why": "The walls 是主语，are 是系动词，cold 是表语。"
        },
        {
          "kind": "sort",
          "q": "第 3 句：I am brave. 把三个词块按句中角色分类。",
          "boxes": [
            {
              "k": "s",
              "t": "S 主语：说谁"
            },
            {
              "k": "l",
              "t": "L 系动词：连接状态"
            },
            {
              "k": "c",
              "t": "C 表语：是什么样"
            }
          ],
          "items": [
            {
              "w": "I",
              "zh": "我",
              "box": "s",
              "why": "先找整句在说谁。"
            },
            {
              "w": "am",
              "zh": "是",
              "box": "l",
              "why": "be 的形式连接主语和后面的状态。"
            },
            {
              "w": "brave",
              "zh": "勇敢的",
              "box": "c",
              "why": "这个词说明主语是什么样。"
            }
          ],
          "au": "ex_q3_3",
          "why": "I 是主语，am 是系动词，brave 是表语。"
        }
      ],
      "tip": "I 用 am，单数第三人称用 is，复数用 are。表语说明主语，不是动作的对象。"
    },
    "q4": {
      "type": "steps",
      "title": "🖼️ 看图选句",
      "desc": "看清谁做动作、动作涉及什么；人物的状态也可以用完整句表达。",
      "steps": [
        {
          "kind": "choice",
          "ctx": "图中谁拿着罗盘？",
          "good": "Leo holds the compass.",
          "others": [
            "Mia holds the compass.",
            "Leo holds a torch."
          ],
          "hint": "看清人物的衣服，再看他手里拿的是什么。",
          "why": "Leo 做“拿”的动作，the compass 是拿着的东西。",
          "au": "ex_q4_1",
          "img": "pick_leo_compass"
        },
        {
          "kind": "choice",
          "ctx": "图中 Lily 在做什么？",
          "good": "Lily reads the wall.",
          "others": [
            "Lily holds the compass.",
            "Mia reads the wall."
          ],
          "hint": "看清谁正面对墙面，手指指向哪里。",
          "why": "Lily 是主语，reads 是谓语，the wall 是宾语。",
          "au": "ex_q4_2",
          "img": "pick_lily_wall"
        },
        {
          "kind": "choice",
          "ctx": "图中 Biscuit 找到了什么？",
          "good": "Biscuit finds a sock.",
          "others": [
            "Biscuit finds a ball.",
            "Leo finds a sock."
          ],
          "hint": "看清小狗旁边的东西是什么，再核对找到它的是谁。",
          "why": "Biscuit 做动作，finds 说动作，a sock 说找到的东西。",
          "au": "ex_q4_3",
          "img": "pick_biscuit_sock"
        },
        {
          "kind": "choice",
          "ctx": "Mia 的表情是什么样？",
          "good": "Mia looks scared.",
          "others": [
            "Mia looks happy.",
            "Mia looks angry."
          ],
          "hint": "观察 Mia 的眉毛、眼睛和身体动作，判断她的心情。",
          "why": "looks 在这里是“看起来”，scared 说明 Mia 的状态。",
          "au": "ex_q4_4",
          "img": "pick_mia_scared"
        }
      ],
      "tip": "说动作可用主谓宾；说状态可用主系表。"
    },
    "q5": {
      "type": "steps",
      "title": "👂 动作还是状态",
      "desc": "根据中文情境选句。look、sound 等词的角色要放回句子里判断。",
      "steps": [
        {
          "kind": "choice",
          "ctx": "回声听起来很奇怪。",
          "good": "The echo sounds strange.",
          "others": [
            "The echo hears strange.",
            "The echo sounds strangely."
          ],
          "hint": "这里说明回声的特点，系动词后用形容词。",
          "why": "sounds 意为“听起来”，strange 是表语；不是回声在听东西。",
          "au": "ex_q5_1"
        },
        {
          "kind": "choice",
          "ctx": "Mia 正把目光投向墙壁。这里要说“看墙”，不是“看起来”。",
          "good": "Mia looks at the wall.",
          "others": [
            "Mia looks the wall.",
            "Mia is the wall."
          ],
          "hint": "表示把目光投向某物时，要检查 look 后的搭配。",
          "why": "looks at 在这里表示“看”的动作；look at 后接看的对象，不是主系表。",
          "au": "ex_q5_2"
        },
        {
          "kind": "choice",
          "ctx": "Sam 听见一阵回声。",
          "good": "Sam hears an echo.",
          "others": [
            "Sam sounds an echo.",
            "Sam is an echo."
          ],
          "hint": "这里的 Sam 在听声音，不是在描述 Sam 听起来怎样。",
          "why": "hears 是动作谓语，an echo 是听到的声音；hear 不能当作“听起来”。",
          "au": "ex_q5_3"
        }
      ],
      "tip": "look / feel / sound 表示“看起来／摸起来／听起来”时可作系动词；see / hear 表示看到／听到。"
    },
    "q6": {
      "type": "seq",
      "parts": [
        {
          "type": "steps",
          "title": "🧩 词块组句 1/3",
          "desc": "依次点词块组成一句话。点已放入的词块可以退回。",
          "steps": [
            {
              "kind": "order",
              "q": "小狗找到了一只旧条纹袜子。",
              "words": [
                "Biscuit",
                "finds",
                "an",
                "old",
                "striped",
                "sock"
              ],
              "shuffled": [
                "sock",
                "old",
                "Biscuit",
                "striped",
                "finds",
                "an"
              ],
              "au": "ex_q6_1",
              "why": "主语 Biscuit → 谓语 finds → 宾语 an old striped sock。",
              "firstHint": "先找做动作的小狗。",
              "hint": "找到之后，接“一个什么样的东西”。"
            }
          ],
          "tip": ""
        },
        {
          "type": "steps",
          "title": "🧩 词块组句 2/3",
          "desc": "依次点词块组成一句话。点已放入的词块可以退回。",
          "steps": [
            {
              "kind": "order",
              "q": "石墙很冷。",
              "words": [
                "The",
                "stone",
                "walls",
                "are",
                "very",
                "cold"
              ],
              "shuffled": [
                "cold",
                "The",
                "very",
                "are",
                "walls",
                "stone"
              ],
              "au": "ex_q6_2",
              "why": "The stone walls 是主语，are 是系动词，very cold 是表语。",
              "firstHint": "先找句子正在说的东西。",
              "hint": "形容词前可以用 very 表示程度。"
            }
          ],
          "tip": ""
        },
        {
          "type": "steps",
          "title": "🧩 词块组句 3/3",
          "desc": "依次点词块组成一句话。点已放入的词块可以退回。",
          "steps": [
            {
              "kind": "order",
              "q": "旧指针转得很快。把表示快慢的词放在句末。",
              "words": [
                "The",
                "old",
                "needle",
                "spins",
                "very",
                "quickly"
              ],
              "shuffled": [
                "spins",
                "quickly",
                "old",
                "The",
                "very",
                "needle"
              ],
              "au": "ex_q6_3",
              "why": "The old needle 是主语，spins 是谓语；very quickly 修饰动作，不是宾语。",
              "firstHint": "先找谁在转动。",
              "hint": "表示“很快”的词块放在动作后。"
            }
          ],
          "tip": ""
        }
      ]
    },
    "q7": {
      "type": "steps",
      "title": "✍️ 补上关键动词",
      "desc": "在空格里打出一个词。先看句子的主语，再看它表达动作还是状态。",
      "steps": [
        {
          "kind": "typed",
          "ctx": "我很勇敢。补上 be 的正确形式。",
          "pre": "I ",
          "post": " brave.",
          "ans": "am",
          "ph": "一个词",
          "au": "ex_q7_1",
          "why": "I 作主语时，be 用 am；brave 是表语。",
          "wrong": [
            {
              "re": "^is$",
              "zh": "is 与单数第三人称搭配，先看看本句主语是谁。"
            },
            {
              "re": "^are$",
              "zh": "are 不与 I 搭配，回想 I 的 be 形式。"
            }
          ],
          "hint": "主语是 I，要用和 I 搭配的 be 形式。"
        },
        {
          "kind": "typed",
          "ctx": "这些墙很冷。补上 be 的正确形式。",
          "pre": "The walls ",
          "post": " cold.",
          "ans": "are",
          "ph": "一个词",
          "au": "ex_q7_2",
          "why": "walls 是复数，be 用 are；cold 是表语。",
          "wrong": [
            {
              "re": "^is$",
              "zh": "walls 不止一面，不能用单数的 be 形式。"
            },
            {
              "re": "^am$",
              "zh": "am 只与 I 搭配，先找这句的主语。"
            }
          ],
          "hint": "先判断 walls 是单数还是复数。"
        },
        {
          "kind": "typed",
          "ctx": "Leo 拿着罗盘。用 hold 的正确形式补全。",
          "pre": "Leo ",
          "post": " the compass.",
          "ans": "holds",
          "ph": "一个词",
          "au": "ex_q7_3",
          "why": "一般现在时中，Leo 是单数第三人称，hold 后加 s。",
          "wrong": [
            {
              "re": "^hold$",
              "zh": "Leo 是单数第三人称，一般现在时动词还要变化。"
            },
            {
              "re": "^(is|holding)$",
              "zh": "这里要填能直接表示“拿着”的动作谓语；不能只填 be 或分词。"
            }
          ],
          "hint": "把 hold 变成与 Leo 搭配的一般现在时形式。"
        }
      ],
      "tip": "不能漏掉谓语，也要让动词形式和主语相配。"
    },
    "q8": {
      "type": "steps",
      "title": "⚡ 最后一道门：对还是错",
      "desc": "判断句子是否正确、是否把意思说完整。第 6 句要表达“Sam 听见一阵回声”。",
      "steps": [
        {
          "kind": "tf",
          "s": "The needle spins.",
          "ok": true,
          "au": "ex_q8_1",
          "why": "spins 能把“指针转动”说完整，主谓句不用硬加宾语。",
          "hint": "先看“谁做什么”是否已经说完整。"
        },
        {
          "kind": "tf",
          "s": "Mia scared.",
          "ok": false,
          "au": "ex_q8_2",
          "why": "Mia 后不能直接接形容词；需要系动词 is。",
          "hint": "人名和形容词之间是否缺少连接状态的动词？",
          "fix": "Mia is scared."
        },
        {
          "kind": "tf",
          "s": "Lily reads the wall.",
          "ok": true,
          "au": "ex_q8_3",
          "why": "Lily 做读的动作，the wall 是宾语，主谓宾完整。",
          "hint": "按“谁—做什么—涉及什么”检查。"
        },
        {
          "kind": "tf",
          "s": "The walls is cold.",
          "ok": false,
          "au": "ex_q8_4",
          "why": "walls 是复数，be 应用 are。",
          "hint": "先看 walls 表示一面还是多面墙。",
          "fix": "The walls are cold."
        },
        {
          "kind": "tf",
          "s": "The sock feels soft.",
          "ok": true,
          "au": "ex_q8_5",
          "why": "feels 意为“摸起来”，soft 是表语，说明袜子的特点。",
          "hint": "这里说的是触感，检查后面是否是形容词。"
        },
        {
          "kind": "tf",
          "s": "Sam hears an.",
          "ok": false,
          "au": "ex_q8_6",
          "why": "an 只表示一个，后面还缺东西的名称；补出 an echo 才把宾语说完整。",
          "hint": "an 后面是不是还少了听到的东西的名称？",
          "fix": "Sam hears an echo."
        },
        {
          "kind": "tf",
          "s": "I have a dream.",
          "ok": true,
          "au": "ex_q8_7",
          "why": "I 是主语，have 是谓语，a dream 是宾语。",
          "hint": "按“我—有—什么”检查结构。"
        },
        {
          "kind": "tf",
          "s": "Leo hold the compass.",
          "ok": false,
          "au": "ex_q8_8",
          "why": "Leo 是单数第三人称，一般现在时用 holds。",
          "hint": "检查动作词和单数第三人称主语是否相配。",
          "fix": "Leo holds the compass."
        }
      ],
      "tip": "这次你练过主谓、主谓宾、主系表，也检查了动词形式。"
    },
    "map": {
      "type": "map",
      "button": "做我的开门咒语卡 ➜",
      "html": "<h2>🗺️ 第1集知识地图</h2><div class=\"kgrid\"><div><h3>{{b:S:34}} M1 谁在句子里</h3><p>主语是句子说的人或事物，常放在陈述句前面。</p><ul><li>Leo holds the compass. → Leo 是主语。</li><li>The old needle spins. → The old needle 整体是主语。</li><li>Mia is scared. → Mia 是主语。</li></ul></div><div><h3>{{b:V:34}} M2 动作句有两种</h3><p>先看动词能否把意思说完整，不要给每句话硬加宾语。</p><ul><li>主谓：The needle spins. 不需要宾语。</li><li>主谓宾：Lily reads the wall. 宾语是 the wall。</li><li>have 也可作实义动词：I have a dream.</li><li>一般现在时：Leo holds the compass. 单数第三人称用 holds。</li></ul></div><div><h3>{{b:L:34}} M3 be 把状态接起来</h3><p>主语＋系动词＋表语，说明主语是什么、什么样或在哪。</p><ul><li>I am brave. → I 用 am。</li><li>Mia is scared. → 单数第三人称用 is。</li><li>The walls are cold. → 复数用 are。</li><li>They are inside a pyramid. → inside a pyramid 说明位置，作表语。</li></ul></div><div><h3>{{b:C:34}} M4 看起来和看某物</h3><p>look、feel、sound 表示感受或状态时，后面可接形容词作表语。</p><ul><li>Mia looks scared. → 看起来害怕。</li><li>The sock feels soft. → 摸起来柔软。</li><li>The echo sounds strange. → 听起来奇怪。</li><li>Mia looks at the wall. 是“看墙”的动作；Sam hears an echo. 是“听见回声”。</li></ul></div><div><h3>{{b:ADV:34}} M5 加细节 不丢骨架</h3><p>修饰语让话更清楚，但不代替谓语；陈述句首字母大写、句末加标点。</p><ul><li>The old needle spins. → old 修饰 needle，作定语。</li><li>The needle spins quickly. → quickly 说明转得怎样，作状语。</li><li>The walls are cold. → cold 在系动词后作表语，不是宾语。</li></ul></div></div><p class=\"kdiff\">先找主语和动词：动作句看要不要宾语，状态句找系动词后的表语。不是每句话都有宾语。</p><p class=\"kdl\">{download}</p>"
    },
    "card": {
      "type": "card",
      "variant": "phrase",
      "title": "⭐ 收藏卡 #1：我的开门咒语",
      "desc": "选一个词介绍自己。<b>I + am + 形容词</b>，就是一句完整的主系表句。",
      "front": "金字塔 · 开门咒语卡 #1",
      "template": [
        "I am ",
        "."
      ],
      "back": [
        {
          "t": "I",
          "b": "S"
        },
        {
          "t": "am",
          "b": "L"
        },
        {
          "slot": true,
          "b": "C"
        }
      ],
      "foot": "主语 I ＋ 系动词 am ＋ 表语",
      "options": [
        {
          "k": "brave",
          "w": "brave",
          "zh": "勇敢的"
        },
        {
          "k": "curious",
          "w": "curious",
          "zh": "好奇的"
        },
        {
          "k": "kind",
          "w": "kind",
          "zh": "友善的"
        },
        {
          "k": "happy",
          "w": "happy",
          "zh": "快乐的"
        }
      ],
      "sayZh": "我是{zh}。",
      "button": "刻下我的咒语",
      "done": "把星星送回罗盘"
    }
  },
  "ending": {
    "img": "door",
    "say": {
      "id": "star",
      "zh": "第一颗星回到了罗盘！"
    },
    "html": "<h2>🎉 第1集完成！</h2><p>⭐ 已收集 {n} / 17 颗星 · 地图解锁：<b>金字塔</b></p><p>Biscuit 找到了旧袜子，你们发现了“C. C. was here – 1975”这条线索。</p><p>{download}</p>"
  }
};
