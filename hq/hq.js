// HQ 审定文本与媒体已获批准；总部引擎已集成，发布状态以实际验收为准。
// 纯内容配置；第17集前16星门槛由总部与共享引擎共同校验。
export default {
  "schemaVersion": 1,
  "contentVersion": "v6-badges-20261011",
  "stage": "preview-v5",
  "previewReady": true,
  "productionReady": false,
  "locale": "zh-CN",
  "englishVariant": "en-GB",
  "review": {
    "recipient": "Cici",
    "willoReview": "approved-with-16-comments-applied",
    "audioGenerated": true,
    "illustrationsGenerated": true,
    "engineImplemented": true,
    "userDecisions": [
      "第7节及本轮Willo审定后由Cici转达的16条修改优先",
      "文本意见已落实，已获授权进入配音、出图；媒体完成状态分别记录",
      "序章在阁楼准备出发止；十七个槽保持空置；捡到罗盘往事留给第9集",
      "取消离线可用要求",
      "Cici已审阅通过素材，并确认本次30张审定衍生图可与其他素材一起进入compass-preview公开GitHub仓库和公开预览页；覆盖此前对此批成图的私有存放限制",
      "原始孩子照片、角色参考图、未入选版本与源制作目录不在本次发布范围",
      "罗盘采用方案B星图秘境，共享引擎升至v5；A与B先完成预览，C并入stemlearn须等Cici验收后再开始",
      "序章保持现有配音，不再要求约一分钟",
      "前16星全部点亮后才可进入第17集，其他已发布集自由选择"
    ],
    "ciciTextDecision": "approved",
    "reviewRecord": "docs/HQ_Willo审定修改验收_20261011.md",
    "mediaProductionAllowed": true,
    "illustrationCount": 30,
    "mediaDecision": "approved",
    "audioReady": true,
    "audioCount": 36,
    "newlyGeneratedAudioCount": 21,
    "reusedAudioCount": 15,
    "mediaScope": "prologue-and-character-cards",
    "mediaReport": "docs/HQ_音画制作交付_20261011.md"
  },
  "copy": {
    "brand": {
      "title": "罗盘冒险队",
      "en": "The Compass Crew",
      "homeTitle": "冒险队总部",
      "tagline": "带上罗盘，说出一句话，去看看世界。",
      "greeting": "欢迎回来，冒险家。",
      "greetingNamed": "欢迎回来，{name}。"
    },
    "navigation": {
      "map": "冒险地图",
      "characters": "人物档案",
      "journal": "冒险日志",
      "badges": "徽章图鉴",
      "downloads": "知识文档",
      "replayPrologue": "重看序章",
      "backHQ": "返回冒险队总部",
      "backMap": "返回冒险地图",
      "backEnglish": "返回英语学习"
    },
    "buttons": {
      "start": "出发",
      "continue": "继续冒险",
      "replay": "再去一次",
      "open": "打开",
      "close": "关闭",
      "back": "返回",
      "previous": "上一页",
      "next": "下一页",
      "skipPrologue": "跳过序章",
      "finishPrologue": "去看冒险地图",
      "autoPlay": "自动播放",
      "pause": "暂停",
      "resume": "继续播放",
      "replayLine": "重播本句",
      "manualMode": "手动翻页",
      "slower": "慢一点",
      "normalSpeed": "正常速度",
      "faster": "快一点",
      "mute": "静音",
      "unmute": "打开声音",
      "listen": "听一听",
      "listenAgain": "再听一遍",
      "goEpisode": "去第 {ep} 集",
      "goMap": "查看知识地图",
      "readStory": "看完整故事",
      "downloadWord": "下载知识点（Word）",
      "retry": "再试一次"
    },
    "map": {
      "title": "下一站，去哪儿？",
      "description": "每个地点都有一场冒险。完成一集，带回一颗星。",
      "freeRoute": "前 16 个地点可以自由选。点亮前 16 颗星后，开启最后一站。",
      "suggested": "推荐下一站",
      "firstSuggestion": "第 1 集 · 金字塔的回声墙",
      "alreadyLit": "已点亮",
      "unvisited": "还没出发",
      "inProgress": "上次来到这里",
      "comingSoon": "即将开放",
      "comingSoonBody": "这站还在准备中，先去看看其他地点吧。",
      "starCount": "已带回 {count} / 17 颗星",
      "allComplete": "十七颗星都回家了！想去哪一站再看看？",
      "availableComplete": "已开放的地点都去过了。可以重访，也可以等等新冒险。",
      "selectedLabel": "第 {ep} 集 · {title}",
      "grammarLabel": "这一站会用到",
      "enterAria": "进入第 {ep} 集：{title}",
      "unavailableAria": "第 {ep} 集：{title}，即将开放",
      "finaleLocked": "先点亮前 16 颗星，再来开启最后的冒险。",
      "finaleRemaining": "还差 {remaining} 颗星，罗盘之家就会开启。",
      "finaleUnlocked": "前 16 颗星都亮了，回罗盘之家吧！",
      "finaleBlockedButton": "回总部继续冒险",
      "finaleUnknownProgress": "正在确认已经带回的星星…",
      "finaleReadFailed": "暂时无法确认星星记录，请稍后再试。"
    },
    "characters": {
      "title": "认识冒险伙伴",
      "description": "先认识队员，再去路上结识新朋友。",
      "mainGroup": "冒险队员",
      "supportingGroup": "路上遇见的朋友",
      "cameoGroup": "故事与照片里的身影",
      "familyGroup": "家人与旧照片",
      "lockedName": "神秘朋友",
      "locked": "完成第 {ep} 集解锁",
      "notReleased": "这位朋友的冒险还在准备中。",
      "personalityLabel": "性格",
      "identityLabel": "身份",
      "quoteLabel": "口头禅 / 代表句",
      "grammarLabel": "和英语的小联系",
      "voiceUnavailable": "这句话的声音还在准备中。",
      "noSpeakingDog": "Biscuit 不说话，旁白来介绍它。"
    },
    "journal": {
      "title": "把冒险记下来",
      "description": "每完成一集，这里就多一页。有的是爷爷留下的线索，有的是一路上的小纪念。",
      "emptyTitle": "第一页，还等着你来写",
      "emptyBody": "完成任意一集，再回来看看带回了什么。",
      "emptyButton": "去冒险地图",
      "lockedTitle": "这一页还没打开",
      "lockedBody": "完成第 {ep} 集，看看这次发现了什么。",
      "draftLocked": "这一集即将开放，日志暂时收在信封里。",
      "clueLabel": "爷爷的线索",
      "memoryLabel": "冒险小纪念",
      "finaleLabel": "回家的这一页",
      "sourceLabel": "来自第 {ep} 集",
      "readEpisode": "重访这一集",
      "fullStoryLocked": "先点亮前 16 颗星，再完成第 17 集，打开完整故事。",
      "fullStoryReady": "故事拼起来了",
      "fullStoryButton": "读爷爷与罗盘的故事",
      "count": "已打开 {count} / 17 页"
    },
    "badges": {
      "title": "句子里的小徽章",
      "description": "有的徽章标出句子成分，有的标出词的形式。点开看看，再去知识地图找例子。",
      "emptyTitle": "先去收集第一枚徽章",
      "emptyBody": "完成一集后，这一集出现过的徽章就会收入图鉴。",
      "emptyButton": "去冒险地图",
      "locked": "还没收入图鉴",
      "unlocked": "已收入图鉴",
      "meaning": "它表示什么",
      "example": "看一句例子",
      "firstSeen": "首次出现",
      "learnMore": "再看知识地图",
      "count": "已收入 {count} / {total} 枚",
      "footnote": "遇见徽章，不等于已经会用。换一句话再试试，才知道自己会不会。"
    },
    "downloads": {
      "title": "把知识地图带走",
      "description": "完成过的冒险，都可以在这里下载对应的 Word 知识文档。",
      "emptyTitle": "行囊里还没有知识文档",
      "emptyBody": "先完成一集，它的知识文档就会出现在这里。",
      "emptyButton": "去冒险地图",
      "locked": "完成第 {ep} 集后可下载",
      "comingSoon": "这一集即将开放",
      "fileLabel": "第 {ep} 集 · {title}",
      "download": "下载 Word 文档",
      "errorTitle": "这次没能打开文档",
      "errorBody": "请检查网络后再试一次，或回到这一集的知识地图下载。",
      "fallback": "去本集知识地图"
    },
    "states": {
      "loading": "正在打开冒险队总部…",
      "loadingFailed": "总部暂时没打开，请再试一次。",
      "audioFailed": "声音暂时没播出来，可以继续看字幕。",
      "imageFailed": "画面暂时没打开，文字仍可以继续看。",
      "prologueProgress": "序章 {current} / {total}",
      "pageProgress": "{current} / {total}",
      "prologueSkipped": "已进入总部，随时可以重看序章。"
    },
    "accessibility": {
      "compass": "十七个星槽组成的冒险罗盘，已点亮 {count} 个",
      "litSlot": "第 {ep} 颗星，已点亮",
      "emptySlot": "第 {ep} 个星槽，尚未点亮",
      "lockedPortrait": "尚未解锁的伙伴剪影",
      "currentPage": "当前栏目：{title}",
      "openCharacter": "查看{name}的人物档案",
      "playQuote": "播放{name}的代表句",
      "closeDialog": "关闭当前卡片",
      "progressAnnouncement": "已带回 {count} 颗星",
      "rate": "语速：{rate} 倍"
    }
  },
  "prologue": {
    "id": "prologue",
    "title": "阁楼里的旧罗盘",
    "subtitle": "第一站，金字塔。",
    "intro": "雨夜，一只旧象棋盒、一枚黄铜罗盘，还有一只又在找袜子的小狗。我们的故事从这里开始。",
    "firstVisitAutoPlay": true,
    "skippable": true,
    "skipMarksSeen": true,
    "completionTarget": "hq-map",
    "sources": [
      "cici_latest",
      "brief",
      "compass_rules",
      "ep01.l01",
      "ep01.l02",
      "willo_approved_16"
    ],
    "panels": [
      {
        "id": "p-scene-1",
        "title": "雨夜的阁楼",
        "visual": "爷爷和四个孩子在阁楼整理旧物。Leo 从象棋盒下面发现黄铜罗盘；窗外下雨，Biscuit 在脚边。罗盘有十七个空星槽，没有星星、字母或数字。象棋盒全程闭合、不发光，不显露盒内物品；十七个星槽保持空置。",
        "image": {
          "status": "approved-preview-integrated",
          "id": "prologue_attic",
          "alt": "Leo 在阁楼发现旧罗盘",
          "reference": null,
          "privateAssetKey": "prologue_01",
          "nativeDimensions": {
            "width": 1672,
            "height": 941
          },
          "childDerivedRestricted": false,
          "includedInPreview": true
        },
        "lineIds": [
          "pro_l01",
          "pro_l02"
        ],
        "constraints": {
          "chessBoxClosed": true,
          "chessBoxGlowing": false,
          "starSlotsEmpty": true,
          "noTextInImage": true,
          "noPortal": true
        }
      },
      {
        "id": "p-scene-2",
        "title": "一枚安静的罗盘",
        "visual": "爷爷认出罗盘，Mia 凑近看指针。指针静止，星槽全部为空。没有回忆镜头，不显示爷爷年轻时的照片或来历。象棋盒全程闭合、不发光，不显露盒内物品；十七个星槽保持空置。",
        "image": {
          "status": "approved-preview-integrated",
          "id": "prologue_needle",
          "alt": "爷爷和 Mia 看着静止的罗盘",
          "reference": null,
          "privateAssetKey": "prologue_02",
          "nativeDimensions": {
            "width": 1672,
            "height": 941
          },
          "childDerivedRestricted": false,
          "includedInPreview": true
        },
        "lineIds": [
          "pro_l03",
          "pro_l04"
        ],
        "constraints": {
          "chessBoxClosed": true,
          "chessBoxGlowing": false,
          "starSlotsEmpty": true,
          "noTextInImage": true,
          "noPortal": true
        }
      },
      {
        "id": "p-scene-3",
        "title": "十七个空位",
        "visual": "Lily 用手指比画外圈的星槽，Sam 托着罗盘。只用人物表情表现温暖；星槽不亮，不出现飞星或地点地图。象棋盒全程闭合、不发光，不显露盒内物品；十七个星槽保持空置。",
        "image": {
          "status": "approved-preview-integrated",
          "id": "prologue_slots",
          "alt": "Lily 观察十七个空星槽，Sam 托着罗盘",
          "reference": null,
          "privateAssetKey": "prologue_03",
          "nativeDimensions": {
            "width": 1672,
            "height": 941
          },
          "childDerivedRestricted": false,
          "includedInPreview": true
        },
        "lineIds": [
          "pro_l05",
          "pro_l06",
          "pro_l07"
        ],
        "constraints": {
          "chessBoxClosed": true,
          "chessBoxGlowing": false,
          "starSlotsEmpty": true,
          "noTextInImage": true,
          "noPortal": true
        }
      },
      {
        "id": "p-scene-4",
        "title": "袜子先出发",
        "visual": "Biscuit 叼着一只袜子从大家面前跑过，伙伴回头看它。罗盘仍在阁楼，没有传送门。象棋盒全程闭合、不发光，不显露盒内物品；十七个星槽保持空置。",
        "image": {
          "status": "approved-preview-integrated",
          "id": "prologue_sock",
          "alt": "Biscuit 叼着袜子跑过阁楼",
          "reference": null,
          "privateAssetKey": "prologue_04",
          "nativeDimensions": {
            "width": 1672,
            "height": 941
          },
          "childDerivedRestricted": false,
          "includedInPreview": true
        },
        "lineIds": [
          "pro_l08"
        ],
        "constraints": {
          "chessBoxClosed": true,
          "chessBoxGlowing": false,
          "starSlotsEmpty": true,
          "noTextInImage": true,
          "noPortal": true
        }
      },
      {
        "id": "p-scene-5",
        "title": "准备好了吗",
        "visual": "Leo 拿着罗盘，Mia、Sam、Lily 和 Biscuit 围在身边，爷爷微笑看着他们。停在准备出发的时刻，不画穿越或金字塔内部。象棋盒全程闭合、不发光，不显露盒内物品；十七个星槽保持空置。",
        "image": {
          "status": "approved-preview-integrated",
          "id": "prologue_ready",
          "alt": "冒险队准备出发，尚未离开阁楼",
          "reference": null,
          "privateAssetKey": "prologue_05",
          "nativeDimensions": {
            "width": 1672,
            "height": 941
          },
          "childDerivedRestricted": false,
          "includedInPreview": true
        },
        "lineIds": [
          "pro_l09",
          "pro_l10"
        ],
        "constraints": {
          "chessBoxClosed": true,
          "chessBoxGlowing": false,
          "starSlotsEmpty": true,
          "noTextInImage": true,
          "noPortal": true
        }
      }
    ],
    "lines": [
      {
        "id": "pro_l01",
        "who": "narrator",
        "en": "Rain taps on the attic window.",
        "zh": "雨点轻敲阁楼的窗户。",
        "panel": "p-scene-1",
        "wordCount": 6,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l01",
          "audioFile": "pro_l01.mp3",
          "href": "audio/pro_l01.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.22,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l02",
        "who": "leo",
        "en": "Grandpa, your old compass is under the chess box!",
        "zh": "爷爷，你的旧罗盘在象棋盒下面！",
        "panel": "p-scene-1",
        "wordCount": 9,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l02",
          "audioFile": "pro_l02.mp3",
          "href": "audio/pro_l02.mp3",
          "voice": "Energetic Male(English)",
          "duration": 3.187,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l03",
        "who": "grandpa",
        "en": "That is my compass, Leo.",
        "zh": "Leo，那是我的罗盘。",
        "panel": "p-scene-2",
        "wordCount": 5,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l03",
          "audioFile": "pro_l03.mp3",
          "href": "audio/pro_l03.mp3",
          "voice": "Deep Tone（English）",
          "duration": 1.776,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l04",
        "who": "mia",
        "en": "Why does the needle not move?",
        "zh": "指针为什么不动呢？",
        "panel": "p-scene-2",
        "wordCount": 6,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l04",
          "audioFile": "pro_l04.mp3",
          "href": "audio/pro_l04.mp3",
          "voice": "Adorable Girl(English)",
          "duration": 2.456,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l05",
        "who": "lily",
        "en": "Seventeen empty star slots form a ring.",
        "zh": "十七个空星槽围成一圈。",
        "panel": "p-scene-3",
        "wordCount": 7,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l05",
          "audioFile": "pro_l05.mp3",
          "href": "audio/pro_l05.mp3",
          "voice": "Gentle Girl（English）",
          "duration": 2.429,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l06",
        "who": "lily",
        "en": "Each slot waits for a star.",
        "zh": "每个星槽都在等一颗星。",
        "panel": "p-scene-3",
        "wordCount": 6,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l06",
          "audioFile": "pro_l06.mp3",
          "href": "audio/pro_l06.mp3",
          "voice": "Gentle Girl（English）",
          "duration": 1.593,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l07",
        "who": "sam",
        "en": "The compass feels warm in my hand!",
        "zh": "罗盘在我手里暖暖的！",
        "panel": "p-scene-3",
        "wordCount": 7,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l07",
          "audioFile": "pro_l07.mp3",
          "href": "audio/pro_l07.mp3",
          "voice": "Gentle Guy（English）",
          "duration": 2.22,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l08",
        "who": "narrator",
        "en": "Biscuit runs past with a sock.",
        "zh": "Biscuit 叼着一只袜子跑过去。",
        "panel": "p-scene-4",
        "wordCount": 6,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l08",
          "audioFile": "pro_l08.mp3",
          "href": "audio/pro_l08.mp3",
          "voice": "英伦学姐（English）",
          "duration": 1.855,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l09",
        "who": "grandpa",
        "en": "Look after it, Leo.",
        "zh": "Leo，照看好它。",
        "panel": "p-scene-5",
        "wordCount": 4,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l09",
          "audioFile": "pro_l09.mp3",
          "href": "audio/pro_l09.mp3",
          "voice": "Deep Tone（English）",
          "duration": 1.384,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      },
      {
        "id": "pro_l10",
        "who": "leo",
        "en": "I am ready for our first adventure!",
        "zh": "我准备好开始第一次冒险啦！",
        "panel": "p-scene-5",
        "wordCount": 7,
        "audio": {
          "status": "ready-generated",
          "id": "pro_l10",
          "audioFile": "pro_l10.mp3",
          "href": "audio/pro_l10.mp3",
          "voice": "Energetic Male(English)",
          "duration": 2.403,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16",
          "brief",
          "cast"
        ]
      }
    ],
    "outro": {
      "title": "罗盘冒险队，集合！",
      "body": "去地图选第一站。真正的出发，就在第 1 集。",
      "primary": "去看冒险地图",
      "secondary": "再看一遍"
    },
    "lineCountPolicy": {
      "count": 10,
      "maxWordsPerLine": 14,
      "source": "willo_approved_16",
      "note": "本轮已审10句优先于任务书旧5–8句。"
    },
    "targetDurationSeconds": 60,
    "durationStatus": "natural-audio-duration-integrated-no-extension",
    "measuredSpeechSeconds": 21.525
  },
  "characters": [
    {
      "id": "leo",
      "name": "Leo",
      "englishName": "Leo Chen",
      "identity": "12 岁",
      "personality": "胆大爱冒险，有点马虎，偶尔丢东西",
      "grammarConnection": "先把一句话说完整，再带大家出发。",
      "kind": "main",
      "sourceEpisode": 17,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "I love adventures, and so does Grandpa.",
        "zh": "我喜欢冒险，爷爷也是。",
        "label": "口头禅",
        "speaker": "leo",
        "audio": {
          "status": "ready-reused",
          "id": "char_leo",
          "audioFile": "char_leo.mp3",
          "href": "audio/char_leo.mp3",
          "voice": "Energetic Male(English)",
          "duration": 2.638,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_leo",
        "alt": "Leo全身像",
        "reference": "../ep01/illus/01_attic_v2.jpg",
        "privateAssetKey": "leo",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "ep17.l02",
        "willo_approved_16"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "displayTitle": "Leo",
      "titleMode": "name-only"
    },
    {
      "id": "mia",
      "name": "Mia",
      "englishName": "Mia",
      "identity": "9 岁 · Leo 的妹妹",
      "personality": "爱提问，也爱画画",
      "grammarConnection": "她的问题带我们练习各种问句。",
      "kind": "main",
      "sourceEpisode": 4,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Can I ask one more question?",
        "zh": "我能再问一个问题吗？",
        "label": "口头禅",
        "speaker": "mia",
        "audio": {
          "status": "ready-generated",
          "id": "char_mia",
          "audioFile": "char_mia.mp3",
          "href": "audio/char_mia.mp3",
          "voice": "Adorable Girl(English)",
          "duration": 2.612,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16"
        ]
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_mia",
        "alt": "Mia全身像",
        "reference": null,
        "privateAssetKey": "mia",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "ep04.l03",
        "willo_approved_16"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "displayTitle": "Mia",
      "titleMode": "name-only"
    },
    {
      "id": "sam",
      "name": "Sam",
      "englishName": "Sam",
      "identity": "Leo 最好的朋友",
      "personality": "爱开玩笑，跑得快",
      "grammarConnection": "跑一跑、比一比，练习怎样说比较。",
      "kind": "main",
      "sourceEpisode": 11,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "I am the fastest runner in our crew!",
        "zh": "我是队里跑得最快的人！",
        "label": "口头禅",
        "speaker": "sam",
        "audio": {
          "status": "ready-reused",
          "id": "char_sam",
          "audioFile": "char_sam.mp3",
          "href": "audio/char_sam.mp3",
          "voice": "Gentle Guy（English）",
          "duration": 2.273,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_sam",
        "alt": "Sam全身像",
        "reference": null,
        "privateAssetKey": "sam",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "ep11.l02"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "displayTitle": "Sam",
      "titleMode": "name-only"
    },
    {
      "id": "lily",
      "name": "Lily",
      "englishName": "Lily",
      "identity": "Leo 的同班同学",
      "personality": "观察细，喜欢弄清规则",
      "grammarConnection": "她帮大家看清句子里的规律。",
      "kind": "main",
      "sourceEpisode": 16,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Wait. Let me read the rules first.",
        "zh": "等等，让我先看看规则。",
        "label": "口头禅",
        "speaker": "lily",
        "audio": {
          "status": "ready-reused",
          "id": "char_lily",
          "audioFile": "char_lily.mp3",
          "href": "audio/char_lily.mp3",
          "voice": "Gentle Girl（English）",
          "duration": 1.933,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_lily",
        "alt": "Lily全身像",
        "reference": null,
        "privateAssetKey": "lily",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "ep16.l07"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "displayTitle": "Lily",
      "titleMode": "name-only"
    },
    {
      "id": "biscuit",
      "name": "Biscuit",
      "englishName": "Biscuit",
      "identity": "小狗",
      "personality": "爱找袜子，也爱凑热闹",
      "grammarConnection": "找袜子、叼头盔，每个动作都能说成一句话。",
      "kind": "main",
      "sourceEpisode": 1,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Biscuit finds an old striped sock.",
        "zh": "Biscuit 找到一只旧条纹袜子。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_biscuit",
          "audioFile": "char_biscuit.mp3",
          "href": "audio/char_biscuit.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.325,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_biscuit",
        "alt": "Biscuit全身像",
        "reference": null,
        "privateAssetKey": "biscuit",
        "nativeDimensions": {
          "width": 1374,
          "height": 1145
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "ep01.l10"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "editorialNote": "不说人话；代表句由旁白朗读，不制作狗说英语的口头禅。",
      "displayTitle": "Biscuit",
      "titleMode": "name-only"
    },
    {
      "id": "grandpa",
      "name": "爷爷",
      "englishName": "Grandpa Chen · C. Chen",
      "identity": "Leo 和 Mia 的爷爷",
      "personality": "爱下象棋，也爱讲故事",
      "grammarConnection": "跟着他的故事，说说过去，也说说“我也是”。",
      "kind": "main",
      "sourceEpisode": 17,
      "unlock": {
        "type": "always",
        "ep": null,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "When I was your age, I loved chess.",
        "zh": "我像你这么大时，很喜欢下棋。",
        "label": "口头禅",
        "speaker": "grandpa",
        "audio": {
          "status": "ready-generated",
          "id": "char_grandpa",
          "audioFile": "char_grandpa.mp3",
          "href": "audio/char_grandpa.mp3",
          "voice": "Deep Tone（English）",
          "duration": 2.456,
          "align": "whisper"
        },
        "sources": [
          "willo_approved_16"
        ]
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_grandpa",
        "alt": "爷爷全身像",
        "reference": null,
        "privateAssetKey": "grandpa",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "spec_cast",
        "voice_grandpa",
        "ep17.l15",
        "willo_approved_16"
      ],
      "lockedText": null,
      "sourceStatus": "published",
      "periodArchive": {
        "title": "1975 年的爷爷",
        "identity": "12 岁",
        "body": "1975 年，12 岁的爷爷住在村庄里，喜欢下棋。他在回家路上的一场雨里发现了罗盘。",
        "unlock": {
          "ep": 9,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "sources": [
          "ep09.l02"
        ],
        "newPortraitRequired": false
      },
      "finaleQuote": {
        "en": "Here we go, together!",
        "zh": "我们出发啦，一起！",
        "label": "终章后的口头禅",
        "speaker": "grandpa",
        "unlock": {
          "requiresCompletedEp": 17,
          "requiresAllStars": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17
          ]
        },
        "audio": {
          "status": "ready-reused",
          "id": "char_grandpa_finale",
          "audioFile": "char_grandpa_finale.mp3",
          "href": "audio/char_grandpa_finale.mp3",
          "voice": "Deep Tone（English）",
          "duration": 2.273,
          "align": "whisper"
        },
        "sources": [
          "ep17.l15",
          "willo_approved_16"
        ]
      },
      "quoteSelection": {
        "default": "quote",
        "afterFinale": "finaleQuote",
        "condition": "前16星已亮且完成第17集；条件未满足时继续用基础句，不提前播放终章句。"
      },
      "displayTitle": "爷爷",
      "titleMode": "name-only"
    },
    {
      "id": "viking_captain",
      "name": "维京船长",
      "englishName": "The Viking Captain",
      "identity": "维京船上的船长",
      "personality": "清单说得清，也爱下棋",
      "grammarConnection": "从 a helmet 到 the captain’s helmet，找准是哪一个。",
      "kind": "supporting",
      "sourceEpisode": 2,
      "unlock": {
        "type": "completed-episode",
        "ep": 2,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Bring an axe, a shield and the captain's helmet!",
        "zh": "拿一把斧头、一面盾牌，还有船长的那顶头盔！",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_viking_captain",
          "audioFile": "char_viking_captain.mp3",
          "href": "audio/char_viking_captain.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.612,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_viking_captain",
        "alt": "维京船长全身像",
        "reference": "../ep02/illus/02_captains_list.jpg",
        "privateAssetKey": "viking_captain",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep02.l03"
      ],
      "lockedText": "完成第 2 集解锁",
      "sourceStatus": "published",
      "editorialNote": "代表句来自第2集，由旁白读；不新增船长音色。",
      "displayTitle": "维京船长",
      "titleMode": "name-only"
    },
    {
      "id": "owl",
      "name": "猫头鹰馆长",
      "englishName": "The Owl Librarian",
      "identity": "云上图书馆的馆长",
      "personality": "爱问物品是谁的",
      "grammarConnection": "用 whose、mine、yours 把失物还给主人。",
      "kind": "supporting",
      "sourceEpisode": 3,
      "unlock": {
        "type": "completed-episode",
        "ep": 3,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Whose bag is this?",
        "zh": "这是谁的包？",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_owl",
          "audioFile": "char_owl.mp3",
          "href": "audio/char_owl.mp3",
          "voice": "英伦学姐（English）",
          "duration": 1.384,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_owl",
        "alt": "猫头鹰馆长全身像",
        "reference": "../ep03/illus/01_cloud_library.jpg",
        "privateAssetKey": "owl",
        "nativeDimensions": {
          "width": 1145,
          "height": 1374
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep03.l02"
      ],
      "lockedText": "完成第 3 集解锁",
      "sourceStatus": "published",
      "displayTitle": "猫头鹰馆长",
      "titleMode": "name-only"
    },
    {
      "id": "dragon",
      "name": "绿龙",
      "englishName": "The Green Dragon",
      "identity": "谜语洞的守护者",
      "personality": "爱谜语，星期一爱读书",
      "grammarConnection": "从 Are you…? 到 Why…?，把问题问清楚。",
      "kind": "supporting",
      "sourceEpisode": 4,
      "unlock": {
        "type": "completed-episode",
        "ep": 4,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "He guards books, so he stays in and reads on Mondays.",
        "zh": "他守护书籍，所以星期一他待在洞里看书。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_dragon",
          "audioFile": "char_dragon.mp3",
          "href": "audio/char_dragon.mp3",
          "voice": "英伦学姐（English）",
          "duration": 3.631,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_dragon",
        "alt": "绿龙全身像",
        "reference": null,
        "privateAssetKey": "dragon",
        "nativeDimensions": {
          "width": 1296,
          "height": 1214
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep04.l11"
      ],
      "lockedText": "完成第 4 集解锁",
      "sourceStatus": "published",
      "displayTitle": "绿龙",
      "titleMode": "name-only"
    },
    {
      "id": "bob",
      "name": "Bob",
      "englishName": "Robot Bob",
      "identity": "机器人小镇的早餐厨师",
      "personality": "每天认真做早餐",
      "grammarConnection": "every morning 提醒我们说日常习惯。",
      "kind": "supporting",
      "sourceEpisode": 5,
      "unlock": {
        "type": "completed-episode",
        "ep": 5,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "Bob cooks breakfast every morning.",
        "zh": "Bob 每天早晨做早餐。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_bob",
          "audioFile": "char_bob.mp3",
          "href": "audio/char_bob.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.168,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_bob",
        "alt": "Bob全身像",
        "reference": null,
        "privateAssetKey": "bob",
        "nativeDimensions": {
          "width": 1243,
          "height": 1266
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep05.l03"
      ],
      "lockedText": "完成第 5 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "Bob",
      "titleMode": "name-only"
    },
    {
      "id": "tina",
      "name": "Tina",
      "englishName": "Robot Tina",
      "identity": "机器人小镇的清洁帮手",
      "personality": "早餐后总把杯子洗净",
      "grammarConnection": "always 常用来说明经常发生的事。",
      "kind": "supporting",
      "sourceEpisode": 5,
      "unlock": {
        "type": "completed-episode",
        "ep": 5,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "Tina always washes the cups after breakfast.",
        "zh": "Tina 早餐后总会洗杯子。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_tina",
          "audioFile": "char_tina.mp3",
          "href": "audio/char_tina.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.847,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_tina",
        "alt": "Tina全身像",
        "reference": null,
        "privateAssetKey": "tina",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep05.l04"
      ],
      "lockedText": "完成第 5 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "Tina",
      "titleMode": "name-only"
    },
    {
      "id": "zed",
      "name": "Zed",
      "englishName": "Robot Zed",
      "identity": "机器人小镇的画家",
      "personality": "爱唱歌，也爱画画",
      "grammarConnection": "sometimes 和 usually 说清不同的习惯。",
      "kind": "supporting",
      "sourceEpisode": 5,
      "unlock": {
        "type": "completed-episode",
        "ep": 5,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "Zed does not clean the streets, but he paints pictures for the town.",
        "zh": "Zed 不打扫街道，但他给小镇画画。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_zed",
          "audioFile": "char_zed.mp3",
          "href": "audio/char_zed.mp3",
          "voice": "英伦学姐（English）",
          "duration": 5.068,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_zed",
        "alt": "Zed全身像",
        "reference": null,
        "privateAssetKey": "zed",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep05.l09"
      ],
      "lockedText": "完成第 5 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "Zed",
      "titleMode": "name-only"
    },
    {
      "id": "olympia_officer",
      "name": "报名官",
      "englishName": "The Registration Officer",
      "identity": "古奥林匹亚的报名官",
      "personality": "报名时要把信息问清",
      "grammarConnection": "把第几位、几点钟、在哪里说准确。",
      "kind": "supporting",
      "sourceEpisode": 6,
      "unlock": {
        "type": "completed-episode",
        "ep": 6,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "The race starts at three o'clock on the fifth day.",
        "zh": "比赛在第五天下午三点开始。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_olympia_officer",
          "audioFile": "char_olympia_officer.mp3",
          "href": "audio/char_olympia_officer.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.795,
          "align": "whisper"
        },
        "sources": [
          "canon.ep06.officer",
          "willo_approved_16"
        ]
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_olympia_officer",
        "alt": "报名官全身像",
        "reference": null,
        "privateAssetKey": "olympia_officer",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "canon.ep06.officer",
        "willo_approved_16"
      ],
      "lockedText": "完成第 6 集解锁",
      "sourceStatus": "approved-draft",
      "editorialNote": "总纲S6明确由报名官说这句；已审ep06改为Lily转述。此卡采用获准的总纲本人台词，由旁白朗读代表句，不新增报名官音色，也不改ep06。",
      "displayTitle": "报名官",
      "titleMode": "name-only"
    },
    {
      "id": "dad",
      "name": "爸爸",
      "englishName": "Dad",
      "identity": "Leo 和 Mia 的爸爸",
      "personality": "爱做饭，也爱尝新味道",
      "grammarConnection": "tastes delicious：说说食物尝起来怎样。",
      "kind": "supporting",
      "sourceEpisode": 7,
      "unlock": {
        "type": "completed-episode",
        "ep": 7,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Dad tastes a tiny rock, and it tastes delicious.",
        "zh": "爸爸尝了一小块石头，味道真好。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_dad",
          "audioFile": "char_dad.mp3",
          "href": "audio/char_dad.mp3",
          "voice": "英伦学姐（English）",
          "duration": 3.396,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_dad",
        "alt": "爸爸全身像",
        "reference": "../ep07/illus/01_landing.jpg",
        "privateAssetKey": "dad",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "ep07.l03"
      ],
      "lockedText": "完成第 7 集解锁",
      "sourceStatus": "published",
      "displayTitle": "爸爸",
      "titleMode": "name-only"
    },
    {
      "id": "dinosaur_family",
      "name": "丛林恐龙们",
      "englishName": "The Dinosaurs",
      "identity": "恐龙丛林里的大小邻居",
      "personality": "大恐龙喝水，小恐龙追着蛋跑",
      "grammarConnection": "is drinking 和 are following：说清它们正在做什么。",
      "kind": "supporting",
      "sourceEpisode": 8,
      "unlock": {
        "type": "completed-episode",
        "ep": 8,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "The dinosaur is drinking water.",
        "zh": "恐龙正在喝水。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_dinosaur_family",
          "audioFile": "char_dinosaur_family.mp3",
          "href": "audio/char_dinosaur_family.mp3",
          "voice": "英伦学姐（English）",
          "duration": 1.985,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_dinosaur_family",
        "alt": "河边大恐龙与跟着Biscuit的小恐龙群像",
        "reference": null,
        "privateAssetKey": "dinosaur_family",
        "nativeDimensions": {
          "width": 1536,
          "height": 1024
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep08.l03",
        "ep08.l04",
        "ep08.l09"
      ],
      "lockedText": "完成第 8 集解锁",
      "sourceStatus": "published",
      "displayTitle": "丛林恐龙们",
      "titleMode": "name-only"
    },
    {
      "id": "mars_commander",
      "name": "火星指挥官",
      "englishName": "The Commander",
      "identity": "火星基地的指挥官",
      "personality": "先讲安全，再安排训练",
      "grammarConnection": "should、must、mustn’t，分清建议和规则。",
      "kind": "supporting",
      "sourceEpisode": 10,
      "unlock": {
        "type": "completed-episode",
        "ep": 10,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "The commander says Leo should practise in the simulator first.",
        "zh": "指挥官说 Leo 应该先在模拟器里练习。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_mars_commander",
          "audioFile": "char_mars_commander.mp3",
          "href": "audio/char_mars_commander.mp3",
          "voice": "英伦学姐（English）",
          "duration": 3.344,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_mars_commander",
        "alt": "火星指挥官全身像",
        "reference": null,
        "privateAssetKey": "mars_commander",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep10.l04"
      ],
      "lockedText": "完成第 10 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "火星指挥官",
      "titleMode": "name-only"
    },
    {
      "id": "cheetah",
      "name": "猎豹",
      "englishName": "The Cheetah",
      "identity": "草原运动会的跑步对手",
      "personality": "跑得比 Sam 更快",
      "grammarConnection": "more quickly than：比较怎样跑。",
      "kind": "supporting",
      "sourceEpisode": 11,
      "unlock": {
        "type": "completed-episode",
        "ep": 11,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "The cheetah runs more quickly than Sam.",
        "zh": "猎豹跑得比 Sam 更快。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_cheetah",
          "audioFile": "char_cheetah.mp3",
          "href": "audio/char_cheetah.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.482,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_cheetah",
        "alt": "猎豹全身像",
        "reference": null,
        "privateAssetKey": "cheetah",
        "nativeDimensions": {
          "width": 1145,
          "height": 1374
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep11.l05"
      ],
      "lockedText": "完成第 11 集解锁",
      "sourceStatus": "published",
      "displayTitle": "猎豹",
      "titleMode": "name-only"
    },
    {
      "id": "elephant",
      "name": "大象",
      "englishName": "The Elephant",
      "identity": "草原运动会的大力士",
      "personality": "力气大，还记得下棋的男孩",
      "grammarConnection": "strongest 和 quickest：在一组里作比较。",
      "kind": "supporting",
      "sourceEpisode": 11,
      "unlock": {
        "type": "completed-episode",
        "ep": 11,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "The elephant is the strongest of the three animals.",
        "zh": "大象是这三只动物里最强壮的。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_elephant",
          "audioFile": "char_elephant.mp3",
          "href": "audio/char_elephant.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.952,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_elephant",
        "alt": "大象全身像",
        "reference": null,
        "privateAssetKey": "elephant",
        "nativeDimensions": {
          "width": 1218,
          "height": 1291
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep11.l06"
      ],
      "lockedText": "完成第 11 集解锁",
      "sourceStatus": "published",
      "displayTitle": "大象",
      "titleMode": "name-only"
    },
    {
      "id": "mermaid_mayor",
      "name": "人鱼市长",
      "englishName": "The Mermaid Mayor",
      "identity": "海底城市的市长",
      "personality": "欢迎来客，也认真讲规则",
      "grammarConnection": "let 与 make：允许做什么，要求做什么。",
      "kind": "supporting",
      "sourceEpisode": 12,
      "unlock": {
        "type": "completed-episode",
        "ep": 12,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "The mermaid mayor lets everyone enter the city.",
        "zh": "人鱼市长让大家进入城市。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_mermaid_mayor",
          "audioFile": "char_mermaid_mayor.mp3",
          "href": "audio/char_mermaid_mayor.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.821,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_mermaid_mayor",
        "alt": "人鱼市长全身像",
        "reference": null,
        "privateAssetKey": "mermaid_mayor",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep12.l05"
      ],
      "lockedText": "完成第 12 集解锁",
      "sourceStatus": "published",
      "displayTitle": "人鱼市长",
      "titleMode": "name-only"
    },
    {
      "id": "redbeard",
      "name": "红胡子船长",
      "englishName": "Captain Redbeard",
      "identity": "海盗船长",
      "personality": "风暴里带大家去避风岛",
      "grammarConnection": "said that he would…：转述当时的计划。",
      "kind": "supporting",
      "sourceEpisode": 13,
      "unlock": {
        "type": "completed-episode",
        "ep": 13,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "Redbeard said that he would guide them to the island.",
        "zh": "红胡子船长说过，他会带他们去那座岛。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_redbeard",
          "audioFile": "char_redbeard.mp3",
          "href": "audio/char_redbeard.mp3",
          "voice": "英伦学姐（English）",
          "duration": 3.109,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_redbeard",
        "alt": "红胡子船长全身像",
        "reference": null,
        "privateAssetKey": "redbeard",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep13.l10"
      ],
      "lockedText": "完成第 13 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "红胡子船长",
      "titleMode": "name-only"
    },
    {
      "id": "moon_robot",
      "name": "月球老机器人",
      "englishName": "The Old Moon Robot",
      "identity": "月球基地的守候者",
      "personality": "守着留言，等待老朋友",
      "grammarConnection": "has lived 和 has been waiting，连接过去与现在。",
      "kind": "supporting",
      "sourceEpisode": 14,
      "unlock": {
        "type": "completed-episode",
        "ep": 14,
        "requiresPublished": true,
        "runtimeEligible": false
      },
      "quote": {
        "en": "The old robot has lived here for fifty years.",
        "zh": "老机器人已经在这里生活了五十年。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-generated",
          "id": "char_moon_robot",
          "audioFile": "char_moon_robot.mp3",
          "href": "audio/char_moon_robot.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.821,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_moon_robot",
        "alt": "月球老机器人全身像",
        "reference": null,
        "privateAssetKey": "moon_robot",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep14.l02"
      ],
      "lockedText": "完成第 14 集解锁",
      "sourceStatus": "approved-draft",
      "displayTitle": "月球老机器人",
      "titleMode": "name-only"
    },
    {
      "id": "museum_guard",
      "name": "博物馆守卫",
      "englishName": "The Museum Guard",
      "identity": "伦敦博物馆的守卫",
      "personality": "开门时发现皇冠不见了",
      "grammarConnection": "had disappeared：回头看更早发生的事。",
      "kind": "supporting",
      "sourceEpisode": 15,
      "unlock": {
        "type": "completed-episode",
        "ep": 15,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "By the time the guard opened the door, the crown had disappeared.",
        "zh": "等守卫打开门时，皇冠已经不见了。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_museum_guard",
          "audioFile": "char_museum_guard.mp3",
          "href": "audio/char_museum_guard.mp3",
          "voice": "英伦学姐（English）",
          "duration": 3.527,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_museum_guard",
        "alt": "博物馆守卫全身像",
        "reference": null,
        "privateAssetKey": "museum_guard",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep15.l02"
      ],
      "lockedText": "完成第 15 集解锁",
      "sourceStatus": "published",
      "displayTitle": "博物馆守卫",
      "titleMode": "name-only"
    },
    {
      "id": "clockwork_mouse",
      "name": "发条老鼠",
      "englishName": "The Clockwork Mouse",
      "identity": "博物馆里的小住客",
      "personality": "用袜子搭了一个暖窝",
      "grammarConnection": "was caught：把动作的承受者放在前面。",
      "kind": "supporting",
      "sourceEpisode": 15,
      "unlock": {
        "type": "completed-episode",
        "ep": 15,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "A clockwork mouse was caught beside the crown and its cosy sock nest.",
        "zh": "一只发条老鼠在皇冠和它舒适的袜子窝旁被抓住了。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_clockwork_mouse",
          "audioFile": "char_clockwork_mouse.mp3",
          "href": "audio/char_clockwork_mouse.mp3",
          "voice": "英伦学姐（English）",
          "duration": 4.206,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_clockwork_mouse",
        "alt": "发条老鼠全身像",
        "reference": null,
        "privateAssetKey": "clockwork_mouse",
        "nativeDimensions": {
          "width": 1309,
          "height": 1201
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep15.l11"
      ],
      "lockedText": "完成第 15 集解锁",
      "sourceStatus": "published",
      "displayTitle": "发条老鼠",
      "titleMode": "name-only"
    },
    {
      "id": "grumble",
      "name": "Grumble",
      "englishName": "Grumble",
      "identity": "怪兽招聘会的紫色怪兽",
      "personality": "爱袜子，也爱笑",
      "grammarConnection": "a helper to guard…：说清找帮手的目的。",
      "kind": "supporting",
      "sourceEpisode": 16,
      "unlock": {
        "type": "completed-episode",
        "ep": 16,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Welcome! I need a helper to guard my socks.",
        "zh": "欢迎！我需要一个帮手来看守我的袜子。",
        "label": "代表句",
        "speaker": "monster",
        "audio": {
          "status": "ready-reused",
          "id": "char_grumble",
          "audioFile": "char_grumble.mp3",
          "href": "audio/char_grumble.mp3",
          "voice": "英文男神",
          "duration": 3.135,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_grumble",
        "alt": "Grumble全身像",
        "reference": "../ep16/illus/01_fair_gate.jpg",
        "privateAssetKey": "grumble",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "ep16.l03"
      ],
      "lockedText": "完成第 16 集解锁",
      "sourceStatus": "published",
      "displayTitle": "Grumble",
      "titleMode": "name-only"
    },
    {
      "id": "mum",
      "name": "妈妈",
      "englishName": "Mum",
      "identity": "Leo 和 Mia 的妈妈",
      "personality": "准备好和家人一起出发",
      "grammarConnection": "Here are Mum and Dad：介绍出现的人。",
      "kind": "supporting",
      "sourceEpisode": 17,
      "unlock": {
        "type": "completed-episode",
        "ep": 17,
        "requiresPublished": true,
        "runtimeEligible": true
      },
      "quote": {
        "en": "Here are Mum and Dad, ready to join the adventure.",
        "zh": "妈妈和爸爸也来了，准备加入冒险。",
        "label": "代表句",
        "speaker": "narrator",
        "audio": {
          "status": "ready-reused",
          "id": "char_mum",
          "audioFile": "char_mum.mp3",
          "href": "audio/char_mum.mp3",
          "voice": "英伦学姐（English）",
          "duration": 2.9,
          "align": "whisper"
        }
      },
      "image": {
        "status": "approved-preview-integrated",
        "id": "character_mum",
        "alt": "妈妈全身像",
        "reference": "../ep17/illus/05_together_v3.jpg",
        "privateAssetKey": "mum",
        "nativeDimensions": {
          "width": 1024,
          "height": 1536
        },
        "childDerivedRestricted": false,
        "includedInPreview": true
      },
      "sources": [
        "cast",
        "ep17.l14"
      ],
      "lockedText": "完成第 17 集解锁",
      "sourceStatus": "published",
      "displayTitle": "妈妈",
      "titleMode": "name-only"
    }
  ],
  "map": {
    "items": [
      {
        "ep": 1,
        "id": "ep01",
        "title": "金字塔的回声墙",
        "place": "古埃及金字塔",
        "grammar": [
          "句子成分",
          "完整句骨架",
          "be 与系动词"
        ],
        "description": "说完整一句话，石门才会回应。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep01/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "pyramid",
          "alt": "古埃及金字塔地点图标",
          "reference": null
        },
        "sources": [
          "ep01.config"
        ]
      },
      {
        "ep": 2,
        "id": "ep02",
        "title": "维京船上的寻物单",
        "place": "维京船",
        "grammar": [
          "名词",
          "冠词",
          "数量与所有格"
        ],
        "description": "船长的头盔，和一顶普通头盔，可不是一回事。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep02/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "viking-ship",
          "alt": "维京船地点图标",
          "reference": null
        },
        "sources": [
          "ep02.config"
        ]
      },
      {
        "ep": 3,
        "id": "ep03",
        "title": "云上图书馆的失物招领",
        "place": "云上图书馆",
        "grammar": [
          "人称与物主代词",
          "反身代词",
          "不定代词"
        ],
        "description": "这么多失物，到底是谁的？",
        "status": "published-source",
        "clickable": true,
        "href": "../ep03/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "cloud-library",
          "alt": "云上图书馆地点图标",
          "reference": null
        },
        "sources": [
          "ep03.config"
        ]
      },
      {
        "ep": 4,
        "id": "ep04",
        "title": "龙的谜语洞",
        "place": "谜语洞",
        "grammar": [
          "疑问句",
          "否定句",
          "并列句"
        ],
        "description": "问清楚，才知道龙守着什么。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep04/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "dragon-cave",
          "alt": "谜语洞地点图标",
          "reference": null
        },
        "sources": [
          "ep04.config"
        ]
      },
      {
        "ep": 5,
        "id": "ep05",
        "title": "2200 年的机器人小镇",
        "place": "机器人小镇",
        "grammar": [
          "一般现在时",
          "频率副词",
          "主谓一致"
        ],
        "description": "Zed 总不按计划来，他到底在忙什么？",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "robot-town",
          "alt": "机器人小镇地点图标",
          "reference": null
        },
        "sources": [
          "ep05.config",
          "review_batch2"
        ]
      },
      {
        "ep": 6,
        "id": "ep06",
        "title": "古希腊奥运会报名处",
        "place": "古奥林匹亚",
        "grammar": [
          "数词与序数词",
          "时间表达",
          "时间与方位介词"
        ],
        "description": "说清第几位、几点钟，Sam 才赶得上比赛。",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "olympia",
          "alt": "古奥林匹亚地点图标",
          "reference": null
        },
        "sources": [
          "ep06.config",
          "review_batch2"
        ]
      },
      {
        "ep": 7,
        "id": "ep07",
        "title": "巧克力星球",
        "place": "巧克力星球",
        "grammar": [
          "形容词",
          "What 与 How 感叹句"
        ],
        "description": "粉红色的树、软软的小山，还有一只暖袜子。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep07/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "chocolate-planet",
          "alt": "巧克力星球地点图标",
          "reference": null
        },
        "sources": [
          "ep07.config"
        ]
      },
      {
        "ep": 8,
        "id": "ep08",
        "title": "恐龙丛林实况转播",
        "place": "恐龙丛林",
        "grammar": [
          "现在进行时",
          "动词形式",
          "祈使句"
        ],
        "description": "Sam 正在报道，Biscuit 却叼着一枚蛋跑来了！",
        "status": "published-source",
        "clickable": true,
        "href": "../ep08/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "dinosaur-jungle",
          "alt": "恐龙丛林地点图标",
          "reference": null
        },
        "sources": [
          "ep08.config"
        ]
      },
      {
        "ep": 9,
        "id": "ep09",
        "title": "爷爷 1975 年的村庄",
        "place": "1975 年的村庄",
        "grammar": [
          "一般过去时",
          "used to",
          "过去进行时"
        ],
        "description": "回到一九七五年，认识一个爱下棋的男孩。",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "village",
          "alt": "1975 年的村庄地点图标",
          "reference": null
        },
        "sources": [
          "ep09.config",
          "review_batch2"
        ]
      },
      {
        "ep": 10,
        "id": "ep10",
        "title": "2080 年火星基地",
        "place": "火星基地",
        "grammar": [
          "情态动词",
          "计划与将来表达",
          "want to 与 would like to"
        ],
        "description": "先戴好头盔，再商量下一步的训练。",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "mars-base",
          "alt": "火星基地地点图标",
          "reference": null
        },
        "sources": [
          "ep10.config",
          "review_batch2"
        ]
      },
      {
        "ep": 11,
        "id": "ep11",
        "title": "草原动物运动会",
        "place": "非洲草原",
        "grammar": [
          "形容词与副词比较",
          "最高级",
          "构词法"
        ],
        "description": "Sam 跑得很快，可这次对手是猎豹。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep11/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "savanna",
          "alt": "非洲草原地点图标",
          "reference": null
        },
        "sources": [
          "ep11.config"
        ]
      },
      {
        "ep": 12,
        "id": "ep12",
        "title": "海底城市的规则",
        "place": "海底城市",
        "grammar": [
          "介词与动词短语",
          "使役动词",
          "it 句式与反意疑问句"
        ],
        "description": "找回罗盘，也要遵守海底城市的规则。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep12/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "underwater-city",
          "alt": "海底城市地点图标",
          "reference": null
        },
        "sources": [
          "ep12.config"
        ]
      },
      {
        "ep": 13,
        "id": "ep13",
        "title": "海盗风暴船",
        "place": "海盗船与避风岛",
        "grammar": [
          "状语从句",
          "宾语从句",
          "过去将来时"
        ],
        "description": "风暴要来了，先找地图，再一起上船。",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "pirate-ship",
          "alt": "海盗船与避风岛地点图标",
          "reference": null
        },
        "sources": [
          "ep13.config",
          "review_batch2"
        ]
      },
      {
        "ep": 14,
        "id": "ep14",
        "title": "月球基地留言板",
        "place": "月球基地",
        "grammar": [
          "现在完成时",
          "现在完成进行时",
          "for 与 since"
        ],
        "description": "老机器人守着留言板，已经等了很久。",
        "status": "approved-draft-unpublished",
        "clickable": false,
        "href": null,
        "availabilityText": "即将开放",
        "icon": {
          "status": "planned",
          "id": "moon-base",
          "alt": "月球基地地点图标",
          "reference": null
        },
        "sources": [
          "ep14.config",
          "review_batch2"
        ]
      },
      {
        "ep": 15,
        "id": "ep15",
        "title": "伦敦博物馆失窃案",
        "place": "1890 年的伦敦博物馆",
        "grammar": [
          "过去完成时",
          "被动语态"
        ],
        "description": "皇冠不见了，展柜旁却留着一只袜子。",
        "status": "published-source",
        "clickable": true,
        "href": "../ep15/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "london-museum",
          "alt": "1890 年的伦敦博物馆地点图标",
          "reference": null
        },
        "sources": [
          "ep15.config"
        ]
      },
      {
        "ep": 16,
        "id": "ep16",
        "title": "怪兽招聘会",
        "place": "怪兽王国招聘会",
        "grammar": [
          "不定式",
          "动名词与分词",
          "非谓语搭配与辨义"
        ],
        "description": "Biscuit 的寻袜本领，能换来一份工作吗？",
        "status": "published-source",
        "clickable": true,
        "href": "../ep16/",
        "availabilityText": "可出发",
        "icon": {
          "status": "planned",
          "id": "monster-fair",
          "alt": "怪兽王国招聘会地点图标",
          "reference": null
        },
        "sources": [
          "ep16.config"
        ]
      },
      {
        "ep": 17,
        "id": "ep17",
        "title": "罗盘醒来",
        "place": "罗盘之家",
        "grammar": [
          "倒装句",
          "定语从句",
          "全景回顾"
        ],
        "description": "回到家里，看看一路带回了什么。",
        "status": "published-source",
        "clickable": false,
        "href": "../ep17/",
        "availabilityText": "收齐前 16 颗星后开启",
        "icon": {
          "status": "planned",
          "id": "compass-home",
          "alt": "罗盘之家地点图标",
          "reference": null
        },
        "sources": [
          "ep17.config",
          "willo_approved_16"
        ],
        "clickableMeaning": "默认空进度状态下不可点；后续引擎须按entryGate实时计算，不能固定为禁用。",
        "entryGate": {
          "type": "all-stars",
          "requiredStars": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ],
          "sourcePublished": true,
          "hrefWhenAllowed": "../ep17/",
          "defaultBlocked": true,
          "enforceAt": [
            "hq-map",
            "direct-episode-url",
            "resume-link",
            "badge-map-link",
            "journal-link",
            "download-map-link"
          ],
          "onBlocked": {
            "target": "../hq/",
            "section": "map",
            "message": "先点亮前 16 颗星，再来开启最后的冒险。"
          },
          "implementationStatus": "implemented",
          "sources": [
            "willo_approved_16"
          ]
        }
      }
    ],
    "forceOrder": false,
    "recommendationRule": "第1–16集中，推荐集号最小的已发布且未完成集；前16星全亮后推荐第17集。若有未发布集使终章条件不满足，则提示重访或等待新冒险，不推荐尚未解锁的终章。",
    "resumePosition": true,
    "freeChoiceEpisodes": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "finaleGate": {
      "type": "all-stars",
      "requiredStars": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "sourcePublished": true,
      "hrefWhenAllowed": "../ep17/",
      "defaultBlocked": true,
      "enforceAt": [
        "hq-map",
        "direct-episode-url",
        "resume-link",
        "badge-map-link",
        "journal-link",
        "download-map-link"
      ],
      "onBlocked": {
        "target": "../hq/",
        "section": "map",
        "message": "先点亮前 16 颗星，再来开启最后的冒险。"
      },
      "implementationStatus": "implemented",
      "sources": [
        "willo_approved_16"
      ]
    },
    "deepLinkPolicy": {
      "status": "implemented",
      "guardBefore": [
        "episode-story",
        "episode-audio",
        "episode-questions",
        "knowledge-map",
        "ending",
        "progress-mutation"
      ],
      "episode": 17,
      "requiredStars": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "directUrlExamples": [
        "../ep17/",
        "../ep17/?jump=map",
        "../ep17/?jump=card"
      ],
      "unknownProgress": "先读取已知来源的当前进度，未核验前不放行。",
      "legacyEpisode17Star": "保留历史第17星；若前16星缺失，不以历史第17星绕过入口规则，不删除旧记录。",
      "blockedBehaviour": "显示前16星门槛及返回总部按钮；不自动播放、不启动集内流程、不写新增星星或完成记录。",
      "testFixtures": "仅隔离测试可使用模拟星星；不提供用户侧跳过门槛入口。"
    }
  },
  "journal": {
    "entries": [
      {
        "id": "clue-ep01",
        "ep": 1,
        "title": "石门后的刻字",
        "en": "The old mark says, “C. C. was here – 1975”.",
        "zh": "旧印记上写着：C. C. 到此一游——1975。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 1,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep01/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep01/illus/05_door_open_v2.jpg",
          "alt": "石门后的刻字的故事画面"
        },
        "sources": [
          "ep01.l14",
          "ep01.overlay"
        ]
      },
      {
        "id": "clue-ep02",
        "ep": 2,
        "title": "棋盘与中国男孩",
        "en": "A Chinese boy taught the captain chess.",
        "zh": "从前，一个中国男孩教过船长下棋。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 2,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep02/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep02/illus/08_old_chessboard.jpg",
          "alt": "棋盘与中国男孩的故事画面"
        },
        "sources": [
          "ep02.l14"
        ]
      },
      {
        "id": "clue-ep03",
        "ep": 3,
        "title": "旧借书卡",
        "en": "The old library card says, “Borrowed by C. Chen”.",
        "zh": "旧借书卡上写着：C. Chen 借阅。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 3,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep03/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep03/illus/04_labels_v2.jpg",
          "alt": "旧借书卡的故事画面"
        },
        "sources": [
          "ep03.l13",
          "ep03.overlay"
        ]
      },
      {
        "id": "clue-ep04",
        "ep": 4,
        "title": "龙认出了它",
        "en": "The dragon recognises Grandpa’s compass.",
        "zh": "龙认出了爷爷的罗盘。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 4,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep04/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep04/illus/05_compass_memory.jpg",
          "alt": "龙认出了它的故事画面"
        },
        "sources": [
          "ep04.l14"
        ]
      },
      {
        "id": "clue-ep05",
        "ep": 5,
        "title": "画中的爷爷",
        "en": "One of the pictures shows Grandpa with a compass.",
        "zh": "其中一幅画上，爷爷拿着一枚罗盘。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 5,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep05_clue_thumbnail",
          "alt": "画中的爷爷的故事画面",
          "reference": null
        },
        "sources": [
          "ep05.l13"
        ]
      },
      {
        "id": "clue-ep06",
        "ep": 6,
        "title": "一九七五年的名字",
        "en": "Grandpa’s name is first on the old list, beside the year 1975.",
        "zh": "爷爷的名字排在旧名单第一位，旁边是年份 1975。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 6,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep06_clue_thumbnail",
          "alt": "一九七五年的名字的故事画面",
          "reference": null
        },
        "sources": [
          "ep06.l11",
          "ep06.l12"
        ]
      },
      {
        "id": "clue-ep07",
        "ep": 7,
        "title": "最喜欢的地方",
        "en": "The old sign says, “Chen’s favourite spot”.",
        "zh": "旧牌子上写着：Chen 最喜欢的地方。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 7,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep07/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep07/illus/04_sign.jpg",
          "alt": "最喜欢的地方的故事画面"
        },
        "sources": [
          "ep07.l12"
        ]
      },
      {
        "id": "clue-ep08",
        "ep": 8,
        "title": "化石下的车票",
        "en": "The crew finds a ticket from the 1970s under a fossil.",
        "zh": "冒险队在化石下找到了一张二十世纪七十年代的车票。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 8,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep08/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep08/illus/04_ticket.jpg",
          "alt": "化石下的车票的故事画面"
        },
        "sources": [
          "ep08.l14",
          "ep08.l15",
          "willo_approved_16"
        ]
      },
      {
        "id": "clue-ep09",
        "ep": 9,
        "title": "雨里的罗盘",
        "en": "Grandpa found the compass in the rain when he was a boy.",
        "zh": "爷爷小时候在雨里捡到了罗盘。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 9,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep09_clue_thumbnail",
          "alt": "雨里的罗盘的故事画面",
          "reference": null
        },
        "sources": [
          "ep09.l15",
          "ep09.l02"
        ]
      },
      {
        "id": "clue-ep10",
        "ep": 10,
        "title": "照片里的女孩",
        "en": "The girl in the old photo might be Ms Green.",
        "zh": "旧照片里的女孩可能是 Green 老师。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 10,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep10_clue_thumbnail",
          "alt": "照片里的女孩的故事画面",
          "reference": null
        },
        "sources": [
          "ep10.l14",
          "willo_approved_16"
        ]
      },
      {
        "id": "clue-ep11",
        "ep": 11,
        "title": "下棋飞快的男孩",
        "en": "The elephant remembers a Chinese boy, the quickest chess player of all.",
        "zh": "大象记得一个中国男孩，他是下棋最快的人。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 11,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep11/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep11/illus/05_scene.jpg",
          "alt": "下棋飞快的男孩的故事画面"
        },
        "sources": [
          "ep11.l13"
        ]
      },
      {
        "id": "clue-ep12",
        "ep": 12,
        "title": "献给我的家人",
        "en": "The compass says, “For my family”.",
        "zh": "罗盘上写着：献给我的家人。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 12,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep12/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep12/illus/05_scene.jpg",
          "alt": "献给我的家人的故事画面"
        },
        "sources": [
          "ep12.l14"
        ]
      },
      {
        "id": "clue-ep13",
        "ep": 13,
        "title": "树上的缩写",
        "en": "Grandpa’s initials are on a tree on the island.",
        "zh": "岛上的树上刻着爷爷名字的缩写。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 13,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep13_clue_thumbnail",
          "alt": "树上的缩写的故事画面",
          "reference": null
        },
        "sources": [
          "ep13.l14",
          "ep13.tree"
        ]
      },
      {
        "id": "clue-ep14",
        "ep": 14,
        "title": "一九七六年的承诺",
        "en": "Grandpa’s note promises that he will return with his family.",
        "zh": "爷爷的留言承诺：他会带着家人回来。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "approved-draft",
        "unlock": {
          "episode": 14,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": false
        },
        "href": null,
        "thumbnail": {
          "status": "planned",
          "id": "ep14_clue_thumbnail",
          "alt": "一九七六年的承诺的故事画面",
          "reference": null
        },
        "sources": [
          "ep14.l13",
          "ep14.l10"
        ]
      },
      {
        "id": "clue-ep15",
        "ep": 15,
        "title": "皇冠里的小零件",
        "en": "Mia finds a tiny compass part inside the crown.",
        "zh": "Mia 在皇冠里面发现了一个小小的罗盘零件。",
        "kind": "clue",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 15,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep15/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep15/illus/05_part_v2.jpg",
          "alt": "皇冠里的小零件的故事画面"
        },
        "sources": [
          "ep15.l13"
        ]
      },
      {
        "id": "clue-ep16",
        "ep": 16,
        "title": "Biscuit 的第一份工作",
        "en": "Biscuit gets his first job after finding a lost sock.",
        "zh": "Biscuit 找到一只丢失的袜子，得到了第一份工作。",
        "kind": "adventure-memory",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 16,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep16/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep16/illus/05_got_the_job.jpg",
          "alt": "Biscuit 的第一份工作的故事画面"
        },
        "sources": [
          "ep16.l11",
          "ep16.l13",
          "ep16.l14"
        ]
      },
      {
        "id": "clue-ep17",
        "ep": 17,
        "title": "一起出发",
        "en": "The last star is in the chess box, and the family is ready.",
        "zh": "最后一颗星在象棋盒里，一家人都准备好了。",
        "kind": "finale",
        "textStatus": "approved-text",
        "sourceStatus": "published",
        "unlock": {
          "episode": 17,
          "requiresCompleted": true,
          "requiresPublished": true,
          "runtimeEligible": true
        },
        "href": "../ep17/",
        "thumbnail": {
          "status": "existing-reference",
          "href": "../ep17/illus/05_together_v3.jpg",
          "alt": "一起出发的故事画面"
        },
        "sources": [
          "ep17.l10",
          "ep17.l13",
          "ep17.l14"
        ]
      }
    ],
    "fullStory": {
      "id": "full-story",
      "title": "爷爷的罗盘：下一站，一起",
      "subtitle": "十七颗星，一家人的新冒险。",
      "unlock": {
        "requiresCompletedEp": 17,
        "requiresPublished": true,
        "allSeventeenRequired": true,
        "requiredStars": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17
        ]
      },
      "spoilerNotice": "这里讲到第 17 集的结局。",
      "paragraphs": [
        {
          "id": "f01",
          "title": "一枚旧罗盘",
          "en": "Leo holds Grandpa’s compass in the attic. Its first stop is Egypt.",
          "zh": "在阁楼里，Leo 拿起爷爷的旧罗盘。伙伴们的第一站是埃及。罗盘带着四个孩子和 Biscuit 走进金字塔，一场寻找星星的冒险开始了。",
          "sources": [
            "ep01.l01",
            "ep01.l02",
            "ep01.l04"
          ]
        },
        {
          "id": "f02",
          "title": "一路上的旧痕迹",
          "en": "An old mark, a chessboard and a library card carry familiar letters.",
          "zh": "金字塔石门后有C. C. was here – 1975。维京船的旧棋盘上，也留着C. C. was here；船长记得从前教他下棋的中国男孩。云上图书馆的借书卡，又写着C. Chen。这些旧痕迹，像是在等他们发现。",
          "sources": [
            "ep01.overlay",
            "ep02.l13",
            "ep02.l14",
            "ep03.overlay"
          ]
        },
        {
          "id": "f03",
          "title": "罗盘走过的地方",
          "en": "The dragon recognises the compass, and the elephant remembers a young chess player.",
          "zh": "绿龙认出了这枚罗盘。巧克力星球的旧牌子，把那里叫作Chen 最喜欢的地方。恐龙丛林的化石下，藏着一张二十世纪七十年代的车票。到了草原，大象还记得一个下棋飞快的中国男孩。",
          "sources": [
            "ep04.l14",
            "ep07.l12",
            "ep08.l14",
            "ep08.l15",
            "ep11.l13"
          ]
        },
        {
          "id": "f04",
          "title": "背面的几句话",
          "en": "The compass says, “For my family”. Mia finds a tiny compass part in London.",
          "zh": "海底寻回罗盘后，大家看见上面的刻字：For my family——献给我的家人。到了伦敦，Biscuit 帮忙找到失窃的皇冠，Mia 又在皇冠里发现一个小小的罗盘零件。这个小零件，也跟着冒险队一起回家。",
          "sources": [
            "ep12.l12",
            "ep12.l14",
            "ep15.l08",
            "ep15.l11",
            "ep15.l13",
            "ep15.l14"
          ]
        },
        {
          "id": "f05",
          "title": "一只狗的本领",
          "en": "Biscuit finds socks everywhere. At the fair, he gets his first job.",
          "zh": "一路上，Biscuit 总和袜子分不开。有时它惹点小麻烦，有时它又帮大家找到东西。在怪兽招聘会上，寻袜子的本领终于派上大用场：紫色怪兽笑了，Biscuit 得到了第一份工作。",
          "sources": [
            "ep01.l10",
            "ep11.l12",
            "ep16.l11",
            "ep16.l13",
            "ep16.l14"
          ]
        },
        {
          "id": "f06",
          "title": "照片里的男孩",
          "en": "At home, Grandpa shows them the boy who found the compass.",
          "zh": "回到家里，爷爷指着照片里的男孩说：看，这就是当年找到罗盘的男孩。那些名字、棋盘和旧痕迹，终于连到了爷爷的故事上。爷爷留下的信，也在旧象棋盒里。",
          "sources": [
            "ep17.l05",
            "ep17.l07",
            "ep17.photo"
          ]
        },
        {
          "id": "f07",
          "title": "最后一个空位",
          "en": "The last star is inside the chess box. The compass shines brightly.",
          "zh": "最后一颗星，就在象棋盒里面。大家带回了伦敦找到的罗盘零件，罗盘亮得连爷爷都惊叹起来。十七颗星回到了罗盘，下一次出发，大家要在一起。",
          "sources": [
            "ep17.l10",
            "ep17.l11",
            "ep17.l12",
            "ep17.l13",
            "ep17.star"
          ]
        },
        {
          "id": "f08",
          "title": "下一站，一起",
          "en": "Mum and Dad are ready too. “Here we go, together!” says Grandpa.",
          "zh": "妈妈和爸爸也准备好了。爷爷、四个孩子和 Biscuit 聚在一起，这次不用把家人留在故事外面。爷爷说：我们出发啦，一起！罗盘的下一站，正等着全家人。",
          "sources": [
            "ep17.l14",
            "ep17.l15"
          ]
        }
      ],
      "closing": "旧故事讲完了，新的冒险才刚开始。",
      "primary": "回到冒险地图",
      "secondary": "重看第 17 集",
      "editorialNote": "本轮审定覆盖旧规则：前16星全亮才可进入第17集，完成终章、17星齐全后展示完整故事。正文仍只使用已发布事实；不补写三颗旧星如何散失、C. C. + ?身份或Green老师身份。",
      "sources": [
        "willo_approved_16"
      ]
    },
    "sort": "episode-number"
  },
  "badgeGroups": [
    {"id":"sentence","name":"句子骨架","badgeIds":["S","V","L","O","C"]},
    {"id":"noun","name":"名词与限定表达","badgeIds":["N","A","THE","ZERO","OWNER","COUNT"]},
    {"id":"nonfinite","name":"非谓语形式","badgeIds":["TD","DO","ING","ED"]},
    {"id":"structure","name":"修饰与结构","badgeIds":["ADJ","ADV","REL","INV"]}
  ],
  "badges": [
    {
      "id": "S",
      "name": "主语",
      "meaning": "句子在说谁，或在说什么。",
      "example": {
        "en": "Leo holds the compass.",
        "zh": "Leo 是主语。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l01[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.S.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "S",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1,
          3,
          4,
          12,
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1、3、4、12、16 集中的任意一集后收入图鉴。"
    },
    {
      "id": "V",
      "name": "谓语",
      "meaning": "说主语做什么，或说明它的状态。",
      "example": {
        "en": "The needle spins.",
        "zh": "spins 说明指针在转。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l03[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.V.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "V",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1,
          3,
          4,
          8,
          12,
          15,
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1、3、4、8、12、15、16 集中的任意一集后收入图鉴。"
    },
    {
      "id": "L",
      "name": "系动词",
      "meaning": "把主语和它的身份、状态或位置连起来。",
      "example": {
        "en": "Mia looks scared.",
        "zh": "looks 把 Mia 和 scared 连起来。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l02[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.L.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "L",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1 集后收入图鉴。"
    },
    {
      "id": "O",
      "name": "宾语",
      "meaning": "动作涉及的人或事物；不是每句话都有宾语。",
      "example": {
        "en": "Lily reads the wall.",
        "zh": "the wall 是 reads 的宾语。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l01[1].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.O.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "O",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1,
          3,
          4
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1、3、4 集中的任意一集后收入图鉴。"
    },
    {
      "id": "C",
      "name": "表语",
      "meaning": "放在系动词后，说明主语是什么、怎样或在哪。",
      "example": {
        "en": "The walls are cold.",
        "zh": "cold 说明墙的状态。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l02[1].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.C.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "C",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1,
          3,
          7,
          11
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1、3、7、11 集中的任意一集后收入图鉴。"
    },
    {
      "id": "N",
      "name": "名词",
      "meaning": "给人、地点、事物或概念起名字。",
      "example": {
        "en": "We need bread and water.",
        "zh": "bread 和 water 都是名词。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "episode.js:activities.map.html",
        "notation": "inline-badge",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.N.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "N",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2,
          8
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2、8 集中的任意一集后收入图鉴。"
    },
    {
      "id": "A",
      "name": "a/an",
      "meaning": "常用于一个未指定的可数事物；a/an 看紧接的读音。",
      "example": {
        "en": "Mia finds a helmet.",
        "zh": "这里是一顶尚未指定的头盔。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "audio/hints.json.l01[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.A.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "A",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2 集后收入图鉴。"
    },
    {
      "id": "THE",
      "name": "the",
      "meaning": "听的人能认出是哪一个时，常用 the。",
      "example": {
        "en": "The axe is too heavy!",
        "zh": "双方知道这里指哪把斧头。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "audio/hints.json.l03[1].b",
        "notation": "badge-field",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.THE.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "THE",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2 集后收入图鉴。"
    },
    {
      "id": "ZERO",
      "name": "不填冠词",
      "meaning": "有些说法不用冠词，要结合意思和搭配看。",
      "example": {
        "en": "The Vikings play chess.",
        "zh": "play chess 通常不加冠词。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "audio/hints.json.l10[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.ZERO.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "ZERO",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2 集后收入图鉴。"
    },
    {
      "id": "OWNER",
      "name": "谁的",
      "meaning": "用所有格等形式，说明人或物的归属。",
      "example": {
        "en": "This is the captain’s helmet.",
        "zh": "captain’s 说明是谁的头盔。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "audio/hints.json.l02[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.OWNER.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "OWNER",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2,
          3
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2、3 集中的任意一集后收入图鉴。"
    },
    {
      "id": "COUNT",
      "name": "数量",
      "meaning": "说多少、第几，也能数事物的单位。",
      "example": {
        "en": "Here are two pieces of bread.",
        "zh": "不可数的 bread 可以数 piece 这样的单位。"
      },
      "firstPublished": {
        "ep": 2,
        "path": "audio/hints.json.l09[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 2 集",
        "href": "../ep02/?jump=map"
      },
      "learnAt": {
        "ep": 2,
        "href": "../ep02/?jump=map",
        "label": "去第 2 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.COUNT.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "COUNT",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          2,
          3
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 2、3 集中的任意一集后收入图鉴。"
    },
    {
      "id": "TD",
      "name": "不定式",
      "meaning": "to do 可以表示目的，也可接在某些动词或句式后。",
      "example": {
        "en": "We came here to find a job for Biscuit!",
        "zh": "我们来这里是为了给 Biscuit 找份工作！"
      },
      "firstPublished": {
        "ep": 12,
        "path": "audio/hints.json.l08[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 12 集",
        "href": "../ep12/?jump=map"
      },
      "learnAt": {
        "ep": 16,
        "href": "../ep16/?jump=map",
        "label": "去第 16 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.TD.first",
        "ep16.l04",
        "willo_approved_16"
      ],
      "image": {
        "status": "existing-generator",
        "role": "TD",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          12,
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 12、16 集中的任意一集后收入图鉴。",
      "earlierApprovedDraft": {
        "ep": 10,
        "path": "hints.json.l05[0].b",
        "notation": "badge-field"
      },
      "editorialNote": "第 10 集已审稿更早使用此徽章，但尚未发布；当前可访问首现链接仍指向第 12 集。"
    },
    {
      "id": "DO",
      "name": "省略 to 的不定式",
      "meaning": "不带 to 的动词原形：用在 can、must 等情态动词后，也用在 let、make 等后。",
      "example": {
        "en": "Let me read the rules.",
        "zh": "let 后是 me + read，不加 to。"
      },
      "firstPublished": {
        "ep": 4,
        "path": "audio/hints.json.l07[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 4 集",
        "href": "../ep04/?jump=map"
      },
      "learnAt": {
        "ep": 16,
        "href": "../ep16/?jump=map",
        "label": "去第 16 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.DO.first",
        "willo_approved_16"
      ],
      "image": {
        "status": "existing-generator",
        "role": "DO",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          4,
          8,
          12,
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 4、8、12、16 集中的任意一集后收入图鉴。",
      "editorialNote": "含义采用本轮Willo指定文本；保留第4集首现和第16集系统学习链接。"
    },
    {
      "id": "ING",
      "name": "动名词 / 现在分词",
      "meaning": "doing 可作主语、宾语或修饰语；本徽章不标进行时谓语。",
      "example": {
        "en": "Finding socks is fun.",
        "zh": "Finding socks 整体作主语。"
      },
      "firstPublished": {
        "ep": 16,
        "path": "audio/hints.json.l02[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 16 集",
        "href": "../ep16/?jump=map"
      },
      "learnAt": {
        "ep": 16,
        "href": "../ep16/?jump=map",
        "label": "去第 16 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.ING.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "ING",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 16 集后收入图鉴。"
    },
    {
      "id": "ED",
      "name": "过去分词",
      "meaning": "done 形式可表达被动、完成或感受，要看所在结构。",
      "example": {
        "en": "Biscuit finds a lost sock.",
        "zh": "lost 说明袜子处在丢失的状态。"
      },
      "firstPublished": {
        "ep": 15,
        "path": "episode.js:activities.map.html",
        "notation": "inline-badge",
        "label": "首次出现：第 15 集",
        "href": "../ep15/?jump=map"
      },
      "learnAt": {
        "ep": 16,
        "href": "../ep16/?jump=map",
        "label": "去第 16 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.ED.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "ED",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          15,
          16
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 15、16 集中的任意一集后收入图鉴。",
      "earlierApprovedDraft": {
        "ep": 14,
        "path": "hints.json.l03[0].b",
        "notation": "badge-field"
      },
      "editorialNote": "第 14 集已审稿更早使用此徽章，但尚未发布；当前可访问首现链接仍指向第 15 集。"
    },
    {
      "id": "ADJ",
      "name": "形容词",
      "meaning": "修饰名词或代词，说它是什么样的。",
      "example": {
        "en": "The tall pink trees look strange.",
        "zh": "tall 和 pink 修饰 trees；strange 在这里作表语。"
      },
      "firstPublished": {
        "ep": 7,
        "path": "audio/hints.json.l01[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 7 集",
        "href": "../ep07/?jump=map"
      },
      "learnAt": {
        "ep": 7,
        "href": "../ep07/?jump=map",
        "label": "去第 7 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.ADJ.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "ADJ",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          7,
          11
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 7、11 集中的任意一集后收入图鉴。"
    },
    {
      "id": "ADV",
      "name": "副词",
      "meaning": "说明怎样、何时、何地或多大程度；这里也标状语短语。",
      "example": {
        "en": "The needle spins quickly.",
        "zh": "quickly 说明指针转得怎样。"
      },
      "firstPublished": {
        "ep": 1,
        "path": "audio/hints.json.l03[1].b",
        "notation": "badge-field",
        "label": "首次出现：第 1 集",
        "href": "../ep01/?jump=map"
      },
      "learnAt": {
        "ep": 1,
        "href": "../ep01/?jump=map",
        "label": "去第 1 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.ADV.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "ADV",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          1,
          7,
          8,
          11,
          12,
          15
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 1、7、8、11、12、15 集中的任意一集后收入图鉴。"
    },
    {
      "id": "REL",
      "name": "定语从句",
      "meaning": "跟在名词后面，用一个从句把它说明白。",
      "example": {
        "en": "This is the compass that brought us home.",
        "zh": "that brought us home 说明是哪枚罗盘。"
      },
      "firstPublished": {
        "ep": 17,
        "path": "audio/hints.json.l05[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 17 集",
        "href": "../ep17/?jump=map"
      },
      "learnAt": {
        "ep": 17,
        "href": "../ep17/?jump=map",
        "label": "去第 17 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.REL.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "REL",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          17
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 17 集后收入图鉴。"
    },
    {
      "id": "INV",
      "name": "倒装",
      "meaning": "有些表达把助动词或动词放到主语前。",
      "example": {
        "en": "I love adventures. So do I!",
        "zh": "So do I 表示另一个人也喜欢。"
      },
      "firstPublished": {
        "ep": 17,
        "path": "audio/hints.json.l01[0].b",
        "notation": "badge-field",
        "label": "首次出现：第 17 集",
        "href": "../ep17/?jump=map"
      },
      "learnAt": {
        "ep": 17,
        "href": "../ep17/?jump=map",
        "label": "去第 17 集知识地图"
      },
      "sources": [
        "roles",
        "spec_badges",
        "badge.INV.first"
      ],
      "image": {
        "status": "existing-generator",
        "role": "INV",
        "source": "engine/badges.js"
      },
      "unlock": {
        "anyCompletedEpisode": [
          17
        ],
        "requiresPublished": true
      },
      "lockedText": "完成第 17 集后收入图鉴。"
    }
  ],
  "downloads": [
    {
      "ep": 1,
      "title": "金字塔的回声墙",
      "label": "第 1 集 · 金字塔的回声墙 · 知识点（Word）",
      "href": "../ep01/downloads/ep01_sentence_structure.docx",
      "downloadName": "罗盘冒险队_第1集_句子成分_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep01/?jump=map",
      "sources": [
        "ep01.config"
      ]
    },
    {
      "ep": 2,
      "title": "维京船上的寻物单",
      "label": "第 2 集 · 维京船上的寻物单 · 知识点（Word）",
      "href": "../ep02/downloads/ep02_nouns_articles.docx",
      "downloadName": "罗盘冒险队_第2集_名词与冠词知识地图.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep02/?jump=map",
      "sources": [
        "ep02.config"
      ]
    },
    {
      "ep": 3,
      "title": "云上图书馆的失物招领",
      "label": "第 3 集 · 云上图书馆的失物招领 · 知识点（Word）",
      "href": "../ep03/downloads/ep03_pronouns.docx",
      "downloadName": "罗盘冒险队_第3集_代词_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep03/?jump=map",
      "sources": [
        "ep03.config"
      ]
    },
    {
      "ep": 4,
      "title": "龙的谜语洞",
      "label": "第 4 集 · 龙的谜语洞 · 知识点（Word）",
      "href": "../ep04/downloads/ep04_questions_conjunctions.docx",
      "downloadName": "罗盘冒险队_第4集_疑问句与并列句_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep04/?jump=map",
      "sources": [
        "ep04.config"
      ]
    },
    {
      "ep": 5,
      "title": "2200 年的机器人小镇",
      "label": "第 5 集 · 2200 年的机器人小镇 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep05.config"
      ]
    },
    {
      "ep": 6,
      "title": "古希腊奥运会报名处",
      "label": "第 6 集 · 古希腊奥运会报名处 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep06.config"
      ]
    },
    {
      "ep": 7,
      "title": "巧克力星球",
      "label": "第 7 集 · 巧克力星球 · 知识点（Word）",
      "href": "../ep07/downloads/ep07_adjectives_exclamations.docx",
      "downloadName": "罗盘冒险队_第7集_形容词与感叹句_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep07/?jump=map",
      "sources": [
        "ep07.config"
      ]
    },
    {
      "ep": 8,
      "title": "恐龙丛林实况转播",
      "label": "第 8 集 · 恐龙丛林实况转播 · 知识点（Word）",
      "href": "../ep08/downloads/ep08_present_continuous.docx",
      "downloadName": "罗盘冒险队_第8集_动词形式与现在进行时_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep08/?jump=map",
      "sources": [
        "ep08.config"
      ]
    },
    {
      "ep": 9,
      "title": "爷爷 1975 年的村庄",
      "label": "第 9 集 · 爷爷 1975 年的村庄 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep09.config"
      ]
    },
    {
      "ep": 10,
      "title": "2080 年火星基地",
      "label": "第 10 集 · 2080 年火星基地 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep10.config"
      ]
    },
    {
      "ep": 11,
      "title": "草原动物运动会",
      "label": "第 11 集 · 草原动物运动会 · 知识点（Word）",
      "href": "../ep11/downloads/ep11_comparisons_adverbs.docx",
      "downloadName": "罗盘冒险队_第11集_比较级最高级与副词_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep11/?jump=map",
      "sources": [
        "ep11.config"
      ]
    },
    {
      "ep": 12,
      "title": "海底城市的规则",
      "label": "第 12 集 · 海底城市的规则 · 知识点（Word）",
      "href": "../ep12/downloads/ep12_prepositions_it_tags.docx",
      "downloadName": "罗盘冒险队_第12集_介词搭配、it 与反意疑问句_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep12/?jump=map",
      "sources": [
        "ep12.config"
      ]
    },
    {
      "ep": 13,
      "title": "海盗风暴船",
      "label": "第 13 集 · 海盗风暴船 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep13.config"
      ]
    },
    {
      "ep": 14,
      "title": "月球基地留言板",
      "label": "第 14 集 · 月球基地留言板 · 知识点（Word）",
      "href": null,
      "downloadName": null,
      "status": "not-produced",
      "requiresCompleted": true,
      "enabled": false,
      "mapHref": null,
      "sources": [
        "ep14.config"
      ]
    },
    {
      "ep": 15,
      "title": "伦敦博物馆失窃案",
      "label": "第 15 集 · 伦敦博物馆失窃案 · 知识点（Word）",
      "href": "../ep15/downloads/ep15_past_perfect_passive.docx",
      "downloadName": "罗盘冒险队_第15集_过去完成时与被动语态_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep15/?jump=map",
      "sources": [
        "ep15.config"
      ]
    },
    {
      "ep": 16,
      "title": "怪兽招聘会",
      "label": "第 16 集 · 怪兽招聘会 · 知识点（Word）",
      "href": "../ep16/downloads/ep16_nonfinite_verbs.docx",
      "downloadName": "罗盘冒险队_第16集_非谓语动词_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep16/?jump=map",
      "sources": [
        "ep16.config"
      ]
    },
    {
      "ep": 17,
      "title": "罗盘醒来",
      "label": "第 17 集 · 罗盘醒来 · 知识点（Word）",
      "href": "../ep17/downloads/ep17_inversion_relative_clauses.docx",
      "downloadName": "罗盘冒险队_第17集_倒装与定语从句_知识点.docx",
      "status": "existing",
      "requiresCompleted": true,
      "enabled": true,
      "mapHref": "../ep17/?jump=map",
      "sources": [
        "ep17.config"
      ]
    }
  ],
  "sourceRegistry": "docs/HQ_内容来源.json",
  "assetPolicy": {
    "referenceUse": "角色参考图可用于生图",
    "neverPublish": "原始孩子照片、角色参考图、未入选版本及源制作目录不在本次发布范围",
    "originalFacesRequired": true,
    "sources": [
      "willo_approved_16",
      "cici_preview_20261011"
    ],
    "generatedImagesLocation": "hq/illus; approved WebP derivatives only",
    "publicationManifest": "docs/HQ_发布图片清单.json",
    "generatedImagesInGit": true,
    "publicationConsent": {"approved": true, "scope": "30 approved HQ images with other episode media", "date": "2026-10-11", "source": "explicit-user-instruction"}
  },
  "audioSpec": {
    "status": "audio-ready-aligned",
    "manifest": "audio/lines.json",
    "namingTable": "docs/HQ_配音文件命名表.md",
    "prologuePattern": "pro_lNN.mp3",
    "characterPattern": "char_<id>.mp3",
    "extraFinaleFile": "char_grandpa_finale.mp3",
    "loudnessTargetLUFS": -19,
    "timingPolicy": "36条音频已实测时长并逐词对齐，见audio/lines.json；序章保留现有10句配音，不凑一分钟。",
    "voicePolicy": "采用已有固定角色音色；旁白朗读没有独立音色的配角代表句。"
  }
};
