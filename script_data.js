export const main_script_chap1 = [
    // -------------------- 初始場景 (保留 - id: 'scene_start' 到 id: '3') --------------------
    {
        chapter: "第一章：與你的初次建面",
        id: 'scene_start',
        steps: [
            { name: "旁白", text: "（你在辦公室加班，突然感覺背後有一道視線。）" },
            { name: "林建成", text: "這麼晚了還在做報表？讓我看看你的格式。" }
        ],
        options: [
            { text: "緊張地遮住螢幕", score: -5, next: '1', reaction: "建成皺眉：「遮遮掩掩的，肯定是用手動計算機算的吧？」" },
            { text: "自信地展示 VLOOKUP", score: 5, next: '1', reaction: "建成點點頭：「VLOOKUP...還可以，雖然有點舊，但基礎不錯。」" },
            { text: "直接展示 XLOOKUP", score: 15, next: '1', reaction: "建成眼睛一亮：「喔？懂得用 XLOOKUP？看來你不是一般人。」" }
        ]
    },
    {
        id: '1',
        steps: [
            { name: "林建成", text: "林建成推了推眼鏡，指著你的 D 欄位。" },
            { name: "林建成", text: "這裡的數據量很大，你打算怎麼整理？" }
        ],
        options: [
            { text: "合併儲存格 (Merge Cells)", score: -20, next: '2', reaction: "建成的臉色瞬間發黑：「合併儲存格是 Excel 的萬惡之源！以後不准這樣做！」" },
            { text: "使用樞紐分析表 (Pivot Table)", score: 10, next: '2', reaction: "建成露出微笑：「明智的選擇，樞紐分析表才是效率的關鍵。」" },
            { text: "寫 VBA 巨集自動化", score: 20, next: '2', reaction: "建成臉紅了：「VBA...？這種高階技巧...我對你刮目相看了。」" }
        ]
    },
    {
        id: '2',
        steps: [
            { name: "旁白", text: "（加班結束了，林建成似乎還不想走。）" },
            { name: "林建成", text: "那個...如果你週末有空的話..." }
        ],
        options: [
            { text: "一起去吃飯嗎？", score: 5, next: '3', reaction: "建成：「吃飯？嗯，也是可以，但我原本想說的是...」" },
            { text: "教我更多 Excel 技巧吧！", score: 20, next: '3', reaction: "建成激動地握住你的手：「沒問題！我準備了一套關於 Array Formula 的課程！」" },
            { text: "我要回家睡覺了", score: -10, next: '3', reaction: "建成：「...也是，休息是為了走更長遠的路（還有寫更多公式）。」" }
        ]
    },
    {
        id: '3',
        steps: [
            { name: "旁白", text: "（你正要去影印室，卻看到建成正盯著影印機一臉困惑。）" },
            { name: "林建成", text: "…這台怎麼又卡紙？" }
        ],
        options: [
            {
                text: "（熟练）我來吧，我常修這台。",
                score: 10,
                next: '4', // next 已修正
                reaction: "建成驚訝：「你不只會 Excel…連影印機都…太可靠了吧？」"
            },
            {
                text: "（笑）卡纸就像合併儲存格，一旦發生就完蛋。",
                score: 5,
                next: '4', // next 已修正
                reaction: "建成：「哈哈…你比我還恨合併儲存格。」"
            },
            {
                text: "（认真）你要學嗎？我教你。",
                score: 15,
                next: '4', // next 已修正
                reaction: "建成臉紅：「【玩家名字】…你要教我？那…那我很願意學。」"
            }
        ]
    },

    // -------------------- 劇本開始擴展 --------------------

    {
        id: '4',
        steps: [
            { name: "旁白", text: "建成盯著眼前空白的 Excel 試算表，A1 到 Z100 都像沙漠般寂寞。" },
            { name: "旁白", text: "他嘆了一口氣——因為根本沒有人提供他需要的資料。" },
            { name: "旁白", text: "他就這樣杵在螢幕前，滿腦子的公式在此刻卻成為了無能的丈夫，什麼都辦不到。" }
        ],
        options: [
            {
                text: "（無奈）唉，希望資料能自己長出來。",
                score: -10,
                next: '5',
                reaction: "建成歎氣的說：[你真會開玩笑。]"
            },
            {
                text: "拍拍建成的肩膀：[要不我們先休息吧，吃些東西，看出來你的胃就像現在的cell一樣null，我請客？]",
                score: 15,
                next: '5',
                reaction: "建成往後仰了他的辦公椅，然後抬頭說：「說的也是，我們一起去吃吧。不...不過... , 不...不用【玩家名字】請客了。」\n你看見他說完這段話後臉上略顯紅暈。"
            },
            {
                text: "主動跟建成說：[或許...我可以幫你生成資料？]",
                score: 20,
                next: '5',
                reaction: "建成驚喜地望向後方的你：[真...真的嗎？！太好了我正愁著沒有事情做呢！]"
            }
        ]
    },
    {
        id: '5',
        steps: [
            { name: "林建成", text: "林建成給了你一份奇怪的資料表。" },
            { name: "林建成", text: "這是我平常用來測試新人能力的…你能用一行公式解決嗎？" }
        ],
        options: [
            {
                text: "使用 FILTER + UNIQUE",
                score: 15,
                next: '6',
                reaction: "建成眼睛亮了：「陣列公式…太強了，你真的不是一般人。」"
            },
            {
                text: "使用傳統的進階篩選",
                score: 5,
                next: '6',
                reaction: "建成點頭：「雖然老方法，但至少你知道原理。」"
            },
            {
                text: "我…我可以先 Google 嗎？",
                score: -20,
                next: '6',
                reaction: "建成扶了扶眼鏡：「唉…至少你誠實。」"
            }
        ]
    },
    {
        id: '6',
        steps: [
            { name: "旁白", text: "林建成因為讓顧客在自己的excel表中找出自己從來沒在表中記錄的feature，導致現在被顧客痛罵中。" }
        ],
        options: [
            {
                text: "為建成解圍，並跟顧客和上司表示自己會攬下這次的失誤的職責。",
                score: 25,
                next: '7',
                reaction: "建成回去跟我細聲說：[你其實...可以不用這樣幫我...不過，謝謝你，沒有你的話我...不知道怎麼辦了...]"
            },
            {
                text: "在顧客面前為建成打抱不平。",
                score: -25,
                next: '7',
                reaction: "發現到這真是建成的失誤，導致自己也和建成一起遭受到更難聽的罵聲。"
            },
            {
                text: "沉默，結束後私底下安慰建成。",
                score: 10,
                next: '7',
                reaction: "建成哭泣完後，緩緩說著自己下次不會犯下這樣的失誤了。"
            }
        ]
    },
    {
        id: '7',
        steps: [
            { name: "旁白", text: "在你休息期間，建成走到了你的旁邊。" },
            { name: "林建成", text: "那個，你平時有什麼遊戲推薦我玩嗎？" }
        ],
        options: [
            {
                text: "原神",
                score: 0,
                next: '8', // 導向新的場景 8
                reaction: [
                    { name: "林建成", text: "建成點頭「原神嗎...我來玩玩看好了。」" },
                    { name: "旁白", text: "過了一段時間..." },
                    { name: "林建成", text: "看起來算傷害的公式好有趣，我也去建立自己的計算機好了。" }
                ],
            },
            {
                text: "神魔之塔",
                score: 0,
                next: '神魔之塔1', // 保留神魔之塔線路
                reaction: [
                    { name: "林建成", text: "建成點頭「神魔之塔嗎...我來玩玩看好了。」" },
                ],
            },
            {
                text: "魔法少女的魔女審判。",
                score: -10,
                next: '8', // 導向新的場景 8
                reaction: [
                    { name: "林建成", text: "建成點頭「咦，原來你喜歡這種美少女的遊戲嗎...」" },
                    { name: "旁白", text: "看得出建成對你稍微有些失望，但藝術不被別人理解也很正常。" },
                ],
            }
        ]
    },

    // -------------------- 新增的 20 個場景 (ID: 8 - 27) --------------------
    // 原有劇本保持，但 next 修正為純數字
    {
        id: '8',
        steps: [
            { name: "林建成", text: "「這個 'TEXTSPLIT' 函數...為什麼我用起來總是不如預期？」" },
            { name: "旁白", text: "建成拿著最新的報告，臉上寫滿了困惑，這時候正是展現你技術實力的大好時機。" }
        ],
        options: [
            { text: "直接幫他修正公式，並詳細解釋原理。", score: 10, next: '9', reaction: "建成感動地看著你：「你真是我的救星，邏輯清晰得像 Power BI 儀表板一樣。」" },
            { text: "告訴他 Google Sheets 裡的 'SPLIT' 更簡單。", score: -5, next: '9', reaction: "建成搖頭：「報告必須用 Excel，這是原則問題！」" },
            { text: "給他一個 'ChatGPT' 的連結，讓他自己問。", score: 0, next: '9', reaction: "建成：「雖然這是個現代解法，但我更喜歡你親手教我。」" }
        ]
    },
    {
        id: '9',
        steps: [
            { name: "旁白", text: "你發現建成正在為一個客戶報告設計圖表，但他選擇的顏色和字體...實在是慘不忍睹。" },
            { name: "林建成", text: "「這張 '甜甜圈圖' 是不是很生動？我想用亮黃色代表『銷售額』。」" }
        ],
        options: [
            { text: "稱讚他，並說『用色大膽』。", score: -10, next: '10', reaction: "建成自信滿滿：「我就知道我的美感是獨一無二的。」（旁白：事實上很災難）" },
            { text: "溫和地建議他使用公司品牌色系和更簡潔的長條圖。", score: 15, next: '10', reaction: "建成沉思後點頭：「你說得對，圖表的目的在於溝通，而非炫技。」" },
            { text: "直接搶過滑鼠，五分鐘內完成一張極簡風圖表。", score: 5, next: '10', reaction: "建成驚訝地看著成品：「這、這簡直是藝術！你的資料美學太棒了！」" }
        ]
    },
    {
        id: '10',
        steps: [
            { name: "旁白", text: "早上，咖啡機壞了，辦公室裡一片哀嚎。建成顯得特別焦躁不安。" },
            { name: "林建成", text: "「沒有咖啡因，我的腦袋裡的 $\text{IFS}$ 函數都打結了，這怎麼寫得下去？」" }
        ],
        options: [
            { text: "立刻衝出去買一杯他最喜歡的黑咖啡。", score: 20, next: '11', reaction: "建成喝下咖啡後，滿足地嘆息：「你就像我公式裡的 $\text{IFERROR}$ 容錯機制一樣，總是能及時出現。」" },
            { text: "告訴他：『喝水就好，咖啡因只是心理作用。』", score: -5, next: '11', reaction: "建成眼神渙散：「別說風涼話，你不會理解 $ \text{SUMIFS}$ 沒咖啡因的痛苦。」" },
            { text: "拿出你的私人速溶咖啡，偷偷遞給他。", score: 10, next: '11', reaction: "建成感動地低語：「謝謝你...這是我們兩人之間的秘密。」" }
        ]
    },
    {
        id: '11',
        steps: [
            { name: "林建成", text: "「我們部門準備在週五舉辦一個『數據清潔工作坊』，你有興趣參加嗎？」" },
            { name: "旁白", text: "他的邀請帶有一絲期待，但聽起來更像是一場技術交流會。" }
        ],
        options: [
            { text: "答應：「當然！能跟你一起清理雜亂數據簡直是享受。」", score: 15, next: '12', reaction: "建成興奮地握拳：「太棒了！我們來一起清除所有 $\text{N/A}$ 和 $\text{#VALUE}$ 吧！」" },
            { text: "拒絕：「不了，我週末想好好休息。」", score: -5, next: '12', reaction: "建成略顯失落：「喔...好吧，數據的樂趣不是每個人都能理解的。」" },
            { text: "反問：「工作坊結束後，我們可以一起去吃晚餐嗎？」", score: 10, next: '12', reaction: "建成臉紅：「啊...這...如果你不嫌棄的話，我很樂意。」" }
        ]
    },
    {
        id: '12',
        steps: [
            { name: "旁白", text: "建成正在對著一份亂七八糟的檔案發脾氣，因為裡面的欄位命名五花八門。" },
            { name: "林建成", text: "「為什麼他們不能遵守標準的『駝峰式命名法』（$\text{CamelCase}$）？這簡直是數據犯罪！」" }
        ],
        options: [
            { text: "附和：「沒錯！我最討厭那些『空格』和『全形符號』了！」", score: 10, next: '13', reaction: "建成：「找到知音了！你真是個有原則的數據人。」" },
            { text: "建議他用 $\text{VBA}$ 批量替換，節省時間。", score: 5, next: '13', reaction: "建成：「聰明，技術永遠是解決人為錯誤的最佳方法。」" },
            { text: "安撫他：「沒關係，每個人都有自己的習慣，我們耐心點。」", score: -5, next: '13', reaction: "建成嘆氣：「唉，算了，看在你這麼溫柔的份上。」" }
        ]
    },
    {
        id: '13',
        steps: [
            { name: "旁白", text: "你們一起完成了一個重要的專案，建成突然臉色大變，電腦畫面顯示『尚未存檔』。" },
            { name: "林建成", text: "「天啊！我剛剛竟然忘了按 $ \text{Ctrl}+\text{S}$！這份報表是客戶的命脈！」" }
        ],
        options: [
            { text: "立刻嘗試 $ \text{Office}$ 的自動修復功能。", score: 15, next: '14', reaction: "建成感激地看著你：「你總是在關鍵時刻冷靜，就像 $\text{Excel}$ 的『自動儲存』一樣可靠。」" },
            { text: "嘲笑他：「建成，連 $ \text{Excel}$ 裡的 $ \text{UNDO}$ 都比你可靠。」", score: -15, next: '14', reaction: "建成沮喪地低下頭：「別說了...我已經夠自責了。」" },
            { text: "拍拍他的手：「別擔心，數據不會輕易背叛一個數據狂的。」", score: 10, next: '14', reaction: "建成被你安慰，稍微放鬆了下來，但他臉還是有點紅。" }
        ]
    },
    {
        id: '14',
        steps: [
            { name: "旁白", text: "你們都需要臨時去外地出差三天，辦公室裡剩下你們兩人準備行李。" },
            { name: "林建成", text: "「這次出差，我們是去解決一個關於『資料連結』的問題，你準備好了嗎？」" }
        ],
        options: [
            { text: "抱怨：「我還以為我們能去度假，而不是去修 $ \text{SQL}$ 連結。」", score: -5, next: '15', reaction: "建成：「數據人的浪漫就是修 $ \text{bug}$，不是沙灘和陽光！」" },
            { text: "興奮地說：「能跟你一起出差，就算是去修伺服器也很有趣！」", score: 20, next: '15', reaction: "建成臉紅：「能...能跟你一起工作，確實，讓這趟旅程更有意義了。」" },
            { text: "問：「我們的房間會不會被安排在隔壁？」", score: 10, next: '15', reaction: "建成結巴：「這...這不歸我管，但...但我可以去問問。」" }
        ]
    },
    {
        id: '15',
        steps: [
            { name: "旁白", text: "你們抵達出差飯店。房間只有一張大桌子，可見今晚會是加班之夜。" },
            { name: "建成", text: "「好，我們先把明天的簡報做完。」" }
        ],
        options: [
            { text: "主動打開筆電開始排版", score: 5, next: '16', reaction: "建成：「效率不錯。」" },
            { text: "先躺床休息一下", score: -5, next: '16', reaction: "建成：「欸欸欸……現在嗎？」" },
            { text: "問建成要不要先吃消夜", score: 5, next: '16', reaction: "建成：「……好。」" }
        ]
    },
    {
        id: '16',
        steps: [
            { name: "旁白", text: "做簡報做到一半，飯店突然跳電，整個房間瞬間漆黑。" },
            { name: "建成", text: "「等等——我的檔案還沒存！」" }
        ],
        options: [
            { text: "伸手抓住建成的手", score: 10, next: '17', reaction: "建成：「……謝謝，你讓我冷靜下來了。」" },
            { text: "尖叫：「啊啊啊！！！」", score: -5, next: '17', reaction: "建成：「……你嚇到我了。」" },
            { text: "冷靜地說：『自動儲存應該救得回來。』", score: 3, next: '17', reaction: "建成：「……你怎麼比我還冷靜？」" }
        ]
    },






    {
        id: '17',
        steps: [
            { name: "旁白", text: "電力恢復。建成看著你，露出感激的笑容。" },
            { name: "建成", text: "「……我突然覺得，有你在真好。」" }
        ],
        options: [
            { text: "「我也覺得有你很好。」", score: 10, next: '18', reaction: "建成微微紅了臉。" },
            { text: "「別突然講這種話啦。」", score: -3, next: '18', reaction: "建成：「我只是說實話啦……」" },
            { text: "拍拍他的肩膀", score: 5, next: '18', reaction: "建成：「嗯。」" }
        ]
    },

    {
        id: '18',
        steps: [
            { name: "旁白", text: "隔天的簡報需要更多資料，你們必須重新統整大量 Excel 檔案。" },
            { name: "建成", text: "「我們分工一下吧。」" }
        ],
        options: [
            { text: "主動接下最難的那份資料", score: 10, next: '19', reaction: "建成：「你真的很強。」" },
            { text: "接中等難度的資料", score: 5, next: '19', reaction: "建成：「好，我負責重的部分。」" },
            { text: "接最簡單的資料", score: -5, next: '19', reaction: "建成：「……也不是不行啦。」" }
        ]
    },
    {
        id: '19',
        steps: [
            { name: "旁白", text: "你們忙到下午，終於把資料整理完。" },
            { name: "建成", text: "「……肚子餓嗎？」" }
        ],
        options: [
            { text: "「有點。」", score: 5, next: '20', reaction: "建成：「走，我們去吃飯。」" },
            { text: "「還好。」", score: -3, next: '20', reaction: "建成：「你確定？」" },
            { text: "「我想喝珍奶。」", score: 5, next: '20', reaction: "建成：「……那我也要。」" }
        ]
    },

    {
        id: '20',
        steps: [
            { name: "旁白", text: "用餐時，建成突然問你一個問題。" },
            { name: "建成", text: "「你覺得……我們算是好搭檔嗎？」" }
        ],
        options: [
            { text: "「算吧。」", score: 5, next: '21', reaction: "建成：「嗯……」" },
            { text: "「不只吧。」", score: 10, next: '21', reaction: "建成臉紅了。" },
            { text: "「我只是負責打工的。」", score: -5, next: '21', reaction: "建成：「你很壞欸……」" }
        ]
    },

    {
        id: '21',
        steps: [
            { name: "旁白", text: "回到飯店後，你們需要把簡報做最後修訂。" },
            { name: "建成", text: "「拜託，今晚一定要完成。」" }
        ],
        options: [
            { text: "全力以赴", score: 10, next: '22', reaction: "建成：「有你在真的很安心。」" },
            { text: "偷懶玩手機", score: -5, next: '22', reaction: "建成：「喂——」" },
            { text: "做最無聊的部分讓建成輕鬆", score: 5, next: '22', reaction: "建成：「……你真的很貼心。」" }
        ]
    },

    {
        id: '22',
        steps: [
            { name: "旁白", text: "終於簡報完成。你和建成鬆了一口氣。" },
            { name: "建成", text: "「我們……很強欸。」" }
        ],
        options: [
            { text: "「當然。」", score: 5, next: '23', reaction: "建成笑了。" },
            { text: "「是你比較強啦。」", score: 10, next: '23', reaction: "建成：「……不要這樣講，我會害羞。」" },
            { text: "「我想睡覺。」", score: -3, next: '23', reaction: "建成：「……也對啦，很累。」" }
        ]
    },

    {
        id: '23',
        steps: [
            { name: "旁白", text: "隔天簡報大成功。主管非常滿意。" },
            { name: "主管", text: "「你們兩個配合得很好。」" }
        ],
        options: [
            { text: "「謝謝主管。」", score: 5, next: '24', reaction: "建成：「這次多虧你。」" },
            { text: "「都是建成厲害。」", score: 10, next: '24', reaction: "建成：「……別這樣。」" },
            { text: "「我只想回家睡覺。」", score: -3, next: '24', reaction: "建成：「……辛苦你了。」" }
        ]
    },
    {
        id: '24',
        steps: [
            { name: "旁白", text: "回程的車上，你和建成坐在一起。" },
            { name: "建成", text: "「你覺得……我們以後還會一起出差嗎？」" }
        ],
        options: [
            { text: "「當然會。」", score: 10, next: '25', reaction: "建成眼神變得溫柔。" },
            { text: "「看主管心情。」", score: 5, next: '25', reaction: "建成：「哈哈……說得也是。」" },
            { text: "「我不想再加班了。」", score: -5, next: '25', reaction: "建成：「我也是……」" }
        ]
    },

    {
        id: '25',
        steps: [
            { name: "旁白", text: "車窗外風景飛逝，建成靠在椅子上，看起來很放鬆。" },
            { name: "建成", text: "「其實我很喜歡……跟你一起工作。」" }
        ],
        options: [
            { text: "「我也是。」", score: 10, next: '26', reaction: "建成微笑得更明顯。" },
            { text: "「你今天話很多欸。」", score: -3, next: '26', reaction: "建成：「欸——」" },
            { text: "摸摸建成的頭", score: 10, next: '26', reaction: "建成愣了一下，但沒躲開。" }
        ]
    },


    // ... [ID 25] 保持不變

    {
        id: '26',
        steps: [
            { name: "旁白", text: "你們回到公司後，一切回到日常。但你知道，你與建成之間有了某種新的默契。" },
            { name: "建成", text: "「那個……之後有空嗎？我想給你看一個我正在做的新表格。」" }
        ],
        options: [
            // ** next 已修正為 '27' **
            { text: "「好。」", score: 10, next: '27', reaction: "建成明顯很開心。" },
            { text: "「又是表格？」", score: -5, next: '27', reaction: "建成：「……是啦。」" },
            { text: "「你做的表格我都想看。」", score: 10, next: '27', reaction: "建成臉紅得像被調整過飽和度。" }
        ]
    },

    {
        id: '27',
        steps: [
            { name: "旁白", text: "建成交給你一份充滿重複值、錯誤格式和缺失值的『地獄級』數據表。" },
            { name: "林建成", text: "「這是我們部門今年最大的挑戰，你敢接受這個『數據清潔』的試煉嗎？」" }
        ],
        options: [
            // ** next 已修正為 '28' **
            { text: "自信地說：「交給我，我會用 Power Query 在十分鐘內解決！」", score: 15, next: '28', reaction: "建成：「哇！你簡直是數據界的『去污劑』，把所有雜質都清除得一乾二淨。」" },
            { text: "哀嚎：「這根本不是人能處理的！我申請退出！」", score: -20, next: '28', reaction: "建成失望地搖頭：「連你都放棄了，看來這個數據真的無藥可救了。」" },
            { text: "問：「我們可以一起完成嗎？這樣我能學到更多。」", score: 10, next: '28', reaction: "建成微笑：「當然，我們是數據雙人組，沒有什麼是我們解決不了的。」" }
        ]
    },

    // -------------------- 新增場景 (ID: 28 - 37) --------------------
    {
        id: '28',
        steps: [
            { name: "旁白", text: "建成帶你到他的電腦前，螢幕上是一個精美的儀表板。" },
            { name: "林建成", text: "「這是我用來追蹤...我們兩個相處時間的『合作效率統計圖』。」" }
        ],
        options: [
            { text: "「這有點太...數據化了吧？」", score: 5, next: '29', reaction: "建成：「數據可以說明一切，包括心跳頻率。」" },
            { text: "「所以我的效率如何？」", score: 15, next: '29', reaction: "建成臉紅：「你的效率永遠是 '100%'，而且...無法被取代。」" },
            { text: "「我也要開始記錄了。」", score: 10, next: '29', reaction: "建成：「太好了，我們可以交換數據！」" }
        ]
    },
    {
        id: '29',
        steps: [
            { name: "林建成", text: "「週末有一個地區性的 Excel 數據分析競賽，我邀請你去。」" },
            { name: "林建成", text: "「雖然是以個人名義參加，但我們可以在場邊討論技巧。」" }
        ],
        options: [
            { text: "「這是約會吧？」", score: 20, next: '30', reaction: "建成結巴：「這...這是技術交流！」" },
            { text: "「好啊，我來報名！」", score: 10, next: '30', reaction: "建成：「太棒了！我們來一起拿下 $\text{TOP 10}$。」" },
            { text: "「我對比賽沒興趣，只對你有興趣。」", score: 15, next: '30', reaction: "建成臉紅：「別...別開玩笑了。」" }
        ]
    },
    {
        id: '30',
        steps: [
            { name: "旁白", text: "在競賽場地，你們被分派到一組需要快速解決的複雜問題。你們需要展現默契。" },
            { name: "林建成", text: "「我負責用 $\text{Power Query}$ 清理，你負責用 $\text{DAX}$ 建模？」" }
        ],
        options: [
            { text: "「沒問題，完美分工！」", score: 15, next: '31', reaction: "建成：「我們是天作之合。」" },
            { text: "「我來用 $\text{Python}$ 暴力解決。」", score: 5, next: '31', reaction: "建成：「別嚇到其他參賽者。」" },
            { text: "握住他的手：「我們一定會贏的。」", score: 20, next: '31', reaction: "建成心跳加速：「嗯...我...我會努力。」" }
        ]
    },
    {
        id: '31',
        steps: [
            { name: "旁白", text: "午休時，建成拿出一個用食物做成的『數據可視化』小餅乾。" },
            { name: "林建成", text: "「這是...甜甜圈圖，但我這次選了對的顏色。送給你。」" }
        ],
        options: [
            { text: "「太可愛了！謝謝你。」", score: 15, next: '32', reaction: "建成得意：「只要用心的數據，就能帶來美味。」" },
            { text: "拍下來發朋友圈：「收到一個數據狂的禮物。」", score: 10, next: '32', reaction: "建成：「發...發朋友圈？請幫我美圖一下。」" },
            { text: "「下次可以做長條圖或折線圖嗎？」", score: 5, next: '32', reaction: "建成：「沒問題，下次試試。」" }
        ]
    },
    {
        id: '32',
        steps: [
            { name: "林建成", text: "「其實我最近在設計一個『家庭預算表』模型...」" },
            { name: "林建成", text: "「它必須非常穩固，能夠處理突發事件，並且長期都能保持完美的 $\text{ROI}$。」" }
        ],
        options: [
            { text: "「聽起來像是一份兩人共同的未來計畫。」", score: 20, next: '33', reaction: "建成臉上的紅暈擴散：「我...我的意思是...一個穩定的家庭是很重要的。」" },
            { text: "「需要我幫忙填寫另一半的欄位嗎？」", score: 15, next: '33', reaction: "建成低頭：「如果...如果你不介意的話。」" },
            { text: "「別想太多，先專心工作。」", score: -5, next: '33', reaction: "建成：「我知道了。」" }
        ]
    },
    {
        id: '33',
        steps: [
            { name: "旁白", text: "在公司茶水間，你們巧遇。建成沒有說話，只是靜靜地看著你。" },
            { name: "林建成", text: "「...我發現你今天的工作效率，比昨天高了 $\text{15%}$。」" }
        ],
        options: [
            { text: "「因為我看到你了。」", score: 20, next: '34', reaction: "建成眼神閃爍，緊張地推了推眼鏡：「你...你真會開玩笑。」" },
            { text: "「有嗎？我沒感覺。」", score: 0, next: '34', reaction: "建成：「數據不會騙人。」" },
            { text: "「快把你的咖啡拿走，別擋路。」", score: -5, next: '34', reaction: "建成：「對不起。」" }
        ]
    },
    {
        id: '34',
        steps: [
            { name: "林建成", text: "「你對自己的人生規劃，有沒有做一個 $\text{S.M.A.R.T}$ 原則的表格？」" },
            { name: "林建成", text: "「具體的（$\text{Specific}$）、可衡量的（$\text{Measurable}$）...」" }
        ],
        options: [
            { text: "「我的 $\text{Goal}$ 是：讓你開心。」", score: 25, next: '35', reaction: "建成語塞：「這...這太不 $\text{Specific}$ 了，但...但我很喜歡。」" },
            { text: "「我做了，但我把你的名字寫進了『關鍵合作夥伴』欄位。」", score: 15, next: '35', reaction: "建成：「我...我會努力達到這個 $\text{Goal}$。」" },
            { text: "「沒有，我的人生很隨性。」", score: -5, next: '35', reaction: "建成嘆氣：「這可不行，沒有數據的人生是迷惘的。」" }
        ]
    },
    {
        id: '35',
        steps: [
            { name: "旁白", text: "深夜，你收到建成傳來的一條訊息，內容是：「你知道 $\text{LEFT JOIN}$ 和 $\text{FULL OUTER JOIN}$ 的區別嗎？」" },
            { name: "林建成 (訊息)", text: "「前者只保留你，後者保留一切，包括我的全部。」" }
        ],
        options: [
            { text: "回：「你是想 $\text{JOIN}$ 我嗎？」", score: 30, next: '36', reaction: "建成回了一個火熱的表情符號。" },
            { text: "回：「你在說什麼啦，快去睡覺。」", score: 5, next: '36', reaction: "建成回：「我睡不著，因為我的 $\text{DAX}$ 公式都在想你。」" },
            { text: "回：「我只知道我們是 $\text{INNER JOIN}$，完美契合。」", score: 20, next: '36', reaction: "建成回：「你真是個天才。」" }
        ]
    },
    {
        id: '36',
        steps: [
            { name: "旁白", text: "你們週末一起去書店。建成直奔技術書區，你則在文學區徘徊。" },
            { name: "林建成", text: "「你在看什麼？是關於情感的『行為分析報告』嗎？」" }
        ],
        options: [
            { text: "走過去，輕輕靠在他旁邊看 $\text{SQL}$ 書。", score: 15, next: '37', reaction: "建成全身僵硬，但嘴角微微上揚：「我...我來給你解釋這個 $\text{Schema}$。」" },
            { text: "「我在看一本跟你完全沒關係的浪漫小說。」", score: 10, next: '37', reaction: "建成：「哼，浪漫？能有 $\text{Excel}$ 公式浪漫嗎？」" },
            { text: "「我在看如何把數據狂變成男友。」", score: 25, next: '37', reaction: "建成臉紅得像 $\text{RGB}$ 值 $\text{255, 0, 0}$。" }
        ]
    },
    {
        id: '37',
        steps: [
            { name: "旁白", text: "你收到建成在一個私人雲端文件夾發來的一個 $\text{Power BI}$ 儀表板連結，上面只有一個大大的文字卡片。" },
            { name: "文字卡片", text: "「$\text{TRUE}$」" }
        ],
        options: [
            { text: "回覆：「這是什麼意思？」", score: 5, next: 'ending_placeholder', reaction: "建成回：「 $\text{IF}$ ( $\text{你願意}$ ), $\text{TRUE}$, $\text{FALSE}$ 」" },
            { text: "回覆：「$\text{TRUE}$」", score: 30, next: 'ending_placeholder', reaction: "建成回：「我...我會永遠 $\text{Filter}$ 掉你所有的不開心。」" },
            { text: "打電話給他，什麼都不說。", score: 20, next: 'ending_placeholder', reaction: "建成在電話那頭緊張地說：「我知道這個 $\text{Table}$ 沒寫清楚，但...我需要你。」" }
        ]
    },

    {
        id: '38',
        steps: [
            { name: "旁白", text: "你回覆 $\text{ID 37}$ 的訊息後，建成隔天顯得心神不寧，總是盯著螢幕上一個不斷跳動的數字。" },
            { name: "林建成", text: "「這個 $\text{Value}$...它不應該在這裡。這是一個『數據雜訊』（$\text{Data Noise}$），而且非常規律。」" },
            { name: "林建成", text: "「我懷疑有人在我們的核心報表裡，**植入了一個惡意的 $\text{Loop}$**。」" }
        ],
        options: [
            { text: "「別自己嚇自己，也許只是伺服器延遲。」", score: -5, next: '39', reaction: "建成搖頭：「我對 $\text{Latency}$ 很熟悉，這不是延遲。」" },
            { text: "「你需要我幫你跑 $\text{Error Check}$ 嗎？」", score: 15, next: '39', reaction: "建成眼神一亮：「如果能有你這個 $\text{Data Validator}$ 介入，我會安心很多。」" },
            { text: "「我只相信你，建成。」", score: 20, next: '39', reaction: "建成心跳加速：「你的信任對我來說，是最高的 $\text{Data Quality}$。」" }
        ]
    },
    {
        id: '39',
        steps: [
            { name: "旁白", text: "建成將你約到茶水間，壓低聲音，顯得非常焦慮。" },
            { name: "林建成", text: "「我現在最擔心的是...有人在我們的視覺化儀表板上，做了『**惡意的 $\text{Conditional Formatting}$**』。」" },
            { name: "林建成", text: "「表面上數據看起來是綠色的、正常的，但實際背後卻是 $\text{FALSE}$，是個巨大的 $\text{Illusion}$。」" }
        ],
        options: [
            { text: "「所以，我們要去找出那個 $\text{FALSE}$ 的條件？」", score: 15, next: '40', reaction: "建成：「對！我們要找到那個**隱藏起來的 $\text{IF}$ 條件**。」" },
            { text: "「我會保護你，建成。」", score: 20, next: '40', reaction: "建成：「謝謝你，有你在，我的 $\text{Resilience}$ (韌性) 提高了 $\text{200%}$。」" },
            { text: "「讓老闆知道吧！」", score: 5, next: '40', reaction: "建成：「不行！我們需要 $\text{Evidence}$，不能打草驚蛇。」" }
        ]
    },
    {
        id: '40',
        steps: [
            { name: "旁白", text: "你們回到建成的電腦前，他迅速打開核心數據的源文件。" },
            { name: "林建成", text: "「看！所有的 $\text{Input}$ 欄位，都多了一條『**隱藏的 $\text{Custom Formula}$**』，它在表面數字提交後，偷偷進行了 $\text{1\%}$ 的向下調整。」" },
            { name: "林建成", text: "「這不是 $\text{Error}$，這是**故意的 $\text{Manipulation}$**。」" }
        ],
        options: [
            { text: "「我們需要一個不被打擾的空間來解決這個問題。」", score: 10, next: '41', reaction: "建成：「你說得對！我有一個地方...」" },
            { text: "「這個人太陰險了！這是數據犯罪！」", score: 5, next: '41', reaction: "建成：「沒錯，這是對數據倫理的挑戰。」" },
            { text: "「讓我幫你編寫一個 $\text{Macro}$ 來自動回溯！」", score: 15, next: '41', reaction: "建成：「太好了！你負責 $\text{Reverse Engineering}$！」" }
        ]
    },
    {
        id: '41',
        steps: [
            { name: "旁白", text: "建成帶著你來到那間位於頂樓的閒置儲藏室，現在它佈置成了你們的秘密基地。" },
            { name: "林建成", text: "「這裡是我們唯一的『**離線數據中心**』，在我們找到『**數據入侵者**』之前，所有分析都必須在這裡進行。」" }
        ],
        options: [
            { text: "「我喜歡這個『秘密基地』。」", score: 15, next: '42', reaction: "建成：「它也是我們關係的 $\text{Private Cloud}$。」" },
            { text: "「我們需要一個 $\text{Password}$ 來保護這個地方。」", score: 10, next: '42', reaction: "建成：「密碼就設為我們第一次見面時，你用的那個 $\text{Function}$ 吧。」" },
            { text: "「這裡有點冷...」", score: 5, next: '42', reaction: "建成立刻脫下外套給你：「現在 $\text{Temperature}$ 應該會 $\text{Improve}$。」" }
        ]
    },
    {
        id: '42',
        steps: [
            { name: "林建成", text: "「我們現在面對的是一個 $\text{Data Leak}$ 級別的危機，如果我們無法用 $\text{Filter}$ 篩選出惡意 $\text{Code}$，公司將面臨巨大損失。」" },
            { name: "林建成", text: "「這件事對我非常重要...你願意冒這個險，和我一起成為這場危機的 $\text{Data Guardian}$ 嗎？」" }
        ],
        options: [
            { text: "握住他的手：「我會是你的 $\text{Immutable Data}$，永遠不會改變。」", score: 25, next: '43', reaction: "建成心跳加速：「我...我會永遠 $\text{Back up}$ 妳。」" },
            { text: "「當然，我對『高難度 $\text{Project}$』最有興趣了。」", score: 15, next: '43', reaction: "建成：「我們的 $\text{Collaboration}$ 將會達到 $\text{Peak}$。」" },
            { text: "「這是我們第一次正式合作嗎？」", score: 10, next: '43', reaction: "建成：「不，從妳用 $\text{XLOOKUP}$ 的那一刻起，我們就開始合作了。」" }
        ]
    },
    {
        id: '43',
        steps: [
            { name: "旁白", text: "經過初步分析，你們的嫌疑人指向了你們部門一位技術高超但性格孤僻的資深員工 $\text{A}$。" },
            { name: "林建成", text: "「我檢查了 $\text{Log}$，只有他有權限在這麼短的時間內，對所有核心 $\text{Table}$ 進行 $\text{Edit}$。」" },
            { name: "林建成", text: "「他的 $\text{Pattern}$ 很明確，但他把所有的 $\text{Evidence}$ 都藏在了一個 $\text{Nested IF}$ 裡面。」" }
        ],
        options: [
            { text: "「我來負責去引導他，讓他自己露出破綻。」", score: 20, next: '44', reaction: "建成：「妳要對他進行 $\text{Social Engineering}$？太危險了！」" },
            { text: "「我們需要一個更強大的 $\text{Formula}$ 來打破他的防線。」", score: 15, next: '44', reaction: "建成：「我們需要的是 $\text{Human Intelligence}$，不是 $\text{AI}$。」" },
            { text: "「他是因為嫉妒你嗎？」", score: 10, next: '44', reaction: "建成：「可能吧，我的 $\text{Code}$ 總是比他簡潔。」" }
        ]
    },
    {
        id: '44',
        steps: [
            { name: "林建成", text: "「妳負責在『閒聊』中，尋找他 $\text{Code}$ 裡的『邏輯謬誤』，這是妳的 $\text{VBA}$ 任務。」" },
            { name: "林建成", text: "「我的 $\text{VBA}$ 任務是：**監控他所有對數據的 $\text{Write Access}$**。我們必須在最短時間內完成 $\text{Patch}$。」" }
        ],
        options: [
            { text: "「好，我會像 $\text{XLOOKUP}$ 一樣，精準地找到他的 $\text{Return Array}$。」", score: 15, next: '45', reaction: "建成：「妳的學習能力比我想像的還要快！」" },
            { text: "「我有點緊張...」", score: 5, next: '45', reaction: "建成：「別怕，我的 $\text{Debug}$ 視窗永遠是開啟的。」" },
            { text: "「別忘了獎勵我一個甜甜圈。」", score: 10, next: '45', reaction: "建成：「如果成功，我給妳畫一個 $\text{3D}$ 的甜甜圈圖。」" }
        ]
    },
    {
        id: '45',
        steps: [
            { name: "旁白", text: "你在走廊上遇到了嫌疑人 $\text{A}$。他帶著一臉意味深長的笑容，主動與你攀談。" },
            { name: "同事 $\text{A}$", text: "「妳跟建成最近走得很近啊？小心點，他的 $\text{Data Model}$ 複雜得很，**別被他的邏輯繞進去了**。」" }
        ],
        options: [
            { text: "「我喜歡複雜的 $\text{Model}$，因為它們更有挑戰性。」", score: 10, next: '46', reaction: "同事 $\text{A}$ 眼神閃過一絲不悅，但很快掩飾過去。" },
            { text: "「我們只是在討論 $\text{Power Query}$ 而已。」", score: 5, next: '46', reaction: "同事 $\text{A}$：「$\text{Power Query}$？那東西太慢了，真正的 $\text{Expert}$ 都是用 $\text{SQL}$ 的。」" },
            { text: "反問：「你是不是對建成的 $\text{Model}$ 有什麼『**不滿意**』的地方？」", score: 15, next: '46', reaction: "同事 $\text{A}$ 笑得很僵硬：「不滿意？怎麼會呢？我是 $\text{Team Player}$。」" }
        ]
    },
    {
        id: '46',
        steps: [
            { name: "旁白", text: "你回到座位上，收到建成傳來的一條訊息，內容是一組 $\text{INDEX/MATCH}$ 函數。" },
            { name: "林建成 (訊息)", text: "「$\text{INDEX}$ ( $\text{真相}$ ) , $\text{MATCH}$ ( $\text{惡意} , \text{日期欄位}, \text{0}$ )。用妳的 $\text{MATCH}$，精準找到 $\text{Index}$。」" }
        ],
        options: [
            { text: "回：「我收到了，這是我們的**作戰暗號**。」", score: 15, next: '47', reaction: "建成回：「我只信任妳的 $\text{Lookup Value}$。」" },
            { text: "回：「你為什麼不用 $\text{XLOOKUP}$？」", score: 10, next: '47', reaction: "建成回：「因為 $\text{INDEX/MATCH}$ 更能體現我們合作的**精準度**。」" },
            { text: "回：「我找到他對 $\text{VLOOKUP}$ 的不滿了。」", score: 5, next: '47', reaction: "建成回：「不夠關鍵，找更深層次的 $\text{Logic}$。」" }
        ]
    },
    {
        id: '47',
        steps: [
            { name: "旁白", text: "你再次去找同事 $\text{A}$，假裝請教一個日期格式的問題，並成功套出了他正在使用的**一個錯誤的日期格式**。" },
            { name: "旁白", text: "這個格式只會在特定的 $\text{Legacy System}$ 中出現，而這系統只有 $\text{A}$ 和建成分管過。" },
            { name: "你", text: "「我拿到他的 $\text{Input}$ 了！」" }
        ],
        options: [
            { text: "將那個錯誤的日期格式立刻發送給建成。", score: 20, next: '48', reaction: "建成回：「$\text{Bingo}$！這個 $\text{Format}$ 只有他會用！我們找到他的 $\text{Footprint}$ 了！」" },
            { text: "感嘆：「原來當個 $\text{Spy}$ 比當 $\text{Analyst}$ 更有趣。」", score: 10, next: '48', reaction: "建成回：「妳是 $\text{Data Spy}$，但只屬於我。」" },
            { text: "「我想吃甜甜圈了。」", score: 5, next: '48', reaction: "建成回：「等我們 $\text{Close}$ 這個 $\text{Case}$。」" }
        ]
    },

    {
        id: '48',
        steps: [
            { name: "旁白", text: "建成將你帶回秘密辦公室，他輸入了你提供的日期格式，成功定位到了一個隱藏 $\text{Sheet}$。" },
            { name: "林建成", text: "「太棒了！妳的 $\text{Input}$ 真是完美！這個 $\text{Sheet}$ 裡面藏著惡意 $\text{Code}$ 的最終 $\text{Destination}$。」" },
            { name: "林建成", text: "「我們需要在午夜前完成 $\text{Patch}$，不然所有報表都會在明天早上 $\text{Crash}$。」" }
        ],
        options: [
            { text: "「我們是最佳拍檔！」", score: 15, next: '49', reaction: "建成：「是的，我們的 $\text{Latency}$ (延遲) 是 $\text{0}$。」" },
            { text: "「我現在需要咖啡，這是我的 $\text{Fuel}$。」", score: 5, next: '49', reaction: "建成：「我馬上幫妳準備，這是 $\text{Priority 1}$。」" },
            { text: "「我們能應付嗎？」", score: 10, next: '49', reaction: "建成：「只要我們保持 $\text{Synchronized}$，就沒問題。」" }
        ]
    },
    {
        id: '49',
        steps: [
            { name: "旁白", text: "時鐘指向午夜。你們的手指在鍵盤上並肩跳躍，室內氣氛緊張又曖昧。" },
            { name: "林建成", text: "「你知道嗎？我在 $\text{Code}$ 裡寫了一個新的 $\text{Function}$，它沒有任何實際功能。」" },
            { name: "林建成", text: "「它的名字叫 $\text{I Love You}$，它只是在不斷運行，而且**無法被 $\text{Delete}$**。」" }
        ],
        options: [
            { text: "「那我要在我的 $\text{Code}$ 裡寫一個 $\text{IF}$ 條件：$\text{IF}$ ( $\text{I Love You}$ ) , $\text{TRUE}, \text{TRUE}$。」", score: 30, next: '50', reaction: "建成結巴：「妳...妳這是不符合 $\text{Logic}$ 的！」（但臉上洋溢著幸福的紅暈）" },
            { text: "「現在不是說這個的時候！」", score: 10, next: '50', reaction: "建成：「不，這是 $\text{Priority 1}$！關係的 $\text{Patch}$ 比 $\text{Data}$ 更重要！」" },
            { text: "「我會讓這個 $\text{Function}$ 永遠 $\text{Auto-Run}$。」", score: 20, next: '50', reaction: "建成：「$\text{Execution Successful}$！」" }
        ]
    },
    {
        id: '50',
        steps: [
            { name: "旁白", text: "建成將你的手從鍵盤上拉開，轉過身正式面對你。" },
            { name: "林建成", text: "「我說過，我只想要 $\text{One-to-One}$ 的 $\text{Relationship}$。現在，我希望將我們的名字寫在我的 $\text{Official Proposal Formula}$ 上。」" },
            { name: "旁白", text: "他拿出手機，給你看他寫的一個 $\text{Excel}$ 公式：$\text{FORECAST.ETS}$ ( $\text{未來日期} , \text{林建成, 玩家名字} , \text{1}$ )" }
        ],
        options: [
            { text: "「我接受這個 $\text{Proposal}$。」", score: 25, next: '51', reaction: "建成歡呼：「 $\text{Validation}$ $\text{Passed}$！」" },
            { text: "「這是我的 $\text{Input}$：$\text{YES}$。」", score: 15, next: '51', reaction: "建成：「太好了，我的 $\text{Data}$ 終於完整了。」" },
            { text: "「這是什麼函數？我沒見過。」", score: 5, next: '51', reaction: "建成：「這是專門用來預測**穩定的、持續的關係**的函數。」" }
        ]
    },
    {
        id: '51',
        steps: [
            { name: "旁白", text: "就在你們準備執行最終的修復指令時，螢幕突然閃爍，進度條開始快速後退！" },
            { name: "林建成", text: "「糟了！$\text{A}$ 察覺了！他正在進行**遠端 $\text{Override}$**！他要用他準備好的『髒數據』覆蓋一切！」" },
            { name: "林建成", text: "「我們的 $\text{Patch}$ 進度已經被 $\text{Lock}$ 住了！」" }
        ],
        options: [
            { text: "「我們有 $\text{Backup}$ 嗎？」", score: 10, next: '52', reaction: "建成：「沒有時間 $\text{Restore}$ 了！」" },
            { text: "「怎麼辦？我好害怕。」", score: 0, next: '52', reaction: "建成緊緊抓住你的手：「相信我！我們還有一個機會！」" },
            { text: "「快告訴我怎麼辦！我是你的 $\text{Weapon}$！」", score: 20, next: '52', reaction: "建成：「好！我們來執行 $\text{Priority 0}$ 的 $\text{Macro}$！」" }
        ]
    },
    {
        id: '52',
        steps: [
            { name: "林建成", text: "「聽著！這是一個我從未用過的**非標準 $\text{Macro}$**，它會強制中斷 $\text{A}$ 的網路連線。」" },
            { name: "林建成", text: "「它的 $\text{Code}$ 是：$\text{Application.Quit}$，但必須在 $\text{3}$ 秒內執行！妳來按 $\text{Run}$！」" }
        ],
        options: [
            { text: "迅速點擊 $\text{Run}$ 按鈕。", score: 25, next: '53', reaction: "旁白：網路連線突然中斷，電腦螢幕陷入短暫黑暗。建成鬆了一口氣。" },
            { text: "問：「$\text{Application.Quit}$ 是退出程式的意思嗎？」", score: 5, next: '53', reaction: "建成：「沒錯！是讓 $\text{A}$ 的程式碼『強制退出』！」" },
            { text: "猶豫了一下，才點擊 $\text{Run}$。", score: 10, next: '53', reaction: "旁白：雖然有點遲疑，但最終連線被成功切斷。" }
        ]
    },
    {
        id: '53',
        steps: [
            { name: "旁白", text: "螢幕上的惡意覆蓋進度停止，你們的 $\text{Patch}$ 成功保留。建成將你緊緊擁入懷中。" },
            { name: "林建成", text: "「我們成功了！我們一起修復了這個 $\text{Bug}$！妳的 $\text{Execution}$ 是完美的！」" },
            { name: "林建成", text: "「我們不只是最好的 $\text{Team}$，我們還是...最強的 $\text{Couple}$！」" }
        ],
        options: [
            { text: "回抱他：「我愛你，我的 $\text{Data Guardian}$。」", score: 30, next: '54', reaction: "建成語塞：「我...我也是。」" },
            { text: "「我累死了，我要去睡覺！」", score: 5, next: '54', reaction: "建成：「好，我 $\text{Log off}$ 這裡，我們走。」" },
            { text: "「這比任何 $\text{Excel}$ 競賽都刺激！」", score: 15, next: '54', reaction: "建成：「沒錯，這是 $\text{Life Level}$ 的 $\text{Challenge}$。」" }
        ]
    },
    {
        id: '54',
        steps: [
            { name: "旁白", text: "隔天早上，整個辦公室都在傳言資深員工 $\text{A}$ 突然被調離或解僱的消息。" },
            { name: "林建成", text: "「妳看，這就是數據的力量。他留下的 $\text{Log}$ 紀錄，已經證明了一切。」" },
            { name: "林建成", text: "「沒有人知道我們做的一切，我們是**數據世界的秘密英雄**。」" }
        ],
        options: [
            { text: "「這就是我的英雄，建成。」", score: 20, next: '55', reaction: "建成臉紅：「妳...妳讓我的 $\text{Reward}$ 達到了 $\text{Max}$。」" },
            { text: "「所以我們週末能約會了嗎？」", score: 15, next: '55', reaction: "建成：「當然！這是 $\text{Project Completion}$ 的獎勵！」" },
            { text: "「他會不會報復？」", score: 5, next: '55', reaction: "建成：「他已經沒有 $\text{Access}$ 了。」" }
        ]
    },
    {
        id: '55',
        steps: [
            { name: "旁白", text: "建成將這次事件的數據報告發給你，但在報告的最後一頁，有一段浪漫的總結。" },
            { name: "報告總結", text: "「$\text{Final Summary}$：**所有數據危機都能解決，只要 $\text{Relationship}$ ( $\text{你和建成}$ ) $\text{Is TRUE}$**。 $\text{Data}$ 結論：$\text{Forever}$。」" }
        ],
        options: [
            { text: "回覆：「我喜歡這份 $\text{Summary}$，不需要任何 $\text{Revision}$。」", score: 25, next: '56', reaction: "建成：「這是我寫過最真實的 $\text{Report}$。」" },
            { text: "回覆：「你這是公器私用！」", score: 10, next: '56', reaction: "建成：「只有在 $\text{Final Conclusion}$ 才能寫真話啊。」" },
            { text: "回覆：「我們贏了。」", score: 15, next: '56', reaction: "建成：「是我們。」" }
        ]
    },
    {
        id: '56',
        steps: [
            { name: "林建成", text: "「為了慶祝我們新的 $\text{Relationship Status}$，我決定帶妳去參觀一個**數據中心**。」" },
            { name: "林建成", text: "「一個擁有最純淨、最宏大 $\text{Data}$ 的地方。在週末，我們出發！」" },
            { name: "旁白", text: "建成拿出一份行程表，像是一個 $\text{Gantt Chart}$（甘特圖）。" }
        ],
        options: [
            { text: "「這次的 $\text{Data}$ 跟 $\text{Excel}$ 無關了吧？」", score: 10, next: '57', reaction: "建成：「這次的 $\text{Data}$ 是關於**宇宙的規律**。」" },
            { text: "「我會準時 $\text{Check-in}$。」", score: 15, next: '57', reaction: "建成：「我會提前 $\text{Pre-load}$ 妳所有的喜好。」" },
            { text: "「這是約會，不是工作。」", score: 5, next: '57', reaction: "建成：「對我來說，愛妳是最重要的工作。」" }
        ]
    },
    {
        id: '57',
        steps: [
            { name: "旁白", text: "週末，建成帶你來到一處山頂觀星台。他指著夜空中的星座。" },
            { name: "林建成", text: "「宇宙就像一個巨大的 $\text{Pivot Table}$，所有的星星都是 $\text{Source Data}$。」" },
            { name: "林建成", text: "「而妳...妳是那個讓我的 $\text{Pivot Table}$ 產生意義的**唯一 $\text{Filter}$**。」" }
        ],
        options: [
            { text: "「那我希望永遠 $\text{Filter}$ 掉你所有的不快樂。」", score: 30, next: '58', reaction: "建成感動地看著妳：「妳已經做到了。」" },
            { text: "「所以我們現在能把這個 $\text{Data}$ 變成一個 $\text{Chart}$ 嗎？」", score: 10, next: '58', reaction: "建成：「我們的 $\text{Chart}$ 永遠是 $\text{3D}$ 的，因為它包含了愛。」" },
            { text: "依偎在他身邊，一起看星星。", score: 20, next: '58', reaction: "建成輕輕吻了妳的額頭：「這是 $\text{Data}$ 的終極浪漫。」" }
        ]
    },
    {
        id: '58',
        steps: [
            { name: "旁白", text: "你收到一封緊急郵件，需要立刻與建成一起去外地，協助一個大型客戶的「**數據遷移與校準**」專案。" },
            { name: "林建成", text: "「這個專案的 $\text{Data Volume}$ 很大，我們必須親自去，以確保 $\text{Data Integrity}$。」" },
            { name: "林建成", text: "「這是我們第一次正式的**『雙人出差任務』**。」" }
        ],
        options: [
            { text: "「這是我們關係的**升級考驗**！」", score: 20, next: '59', reaction: "建成：「沒錯，我們的 $\text{KPI}$ 這次是『$\text{Success}$』和『$\text{Relationship Maintenance}$』。」" },
            { text: "「這是約會還是工作？」", score: 10, next: '59', reaction: "建成：「$\text{Project}$ 期間是工作，晚上 $\text{8}$ 點之後是 $\text{Dating}$。」" },
            { text: "「我會準備好我的 $\text{Power Query}$。」", score: 15, next: '59', reaction: "建成：「我會準備好我的 $\text{Power BI}$。」" }
        ]
    },
    {
        id: '59',
        steps: [
            { name: "旁白", text: "建成發給你一份精心製作的「**出差協作 $\text{Dashboard}$**」，用顏色和進度條標記了從出發到完成的每個步驟。" },
            { name: "林建成 (訊息)", text: "「我用 $\text{Gantt Chart}$ 精確規劃了每一小時的 $\text{Task}$，我們必須保持 $\text{High Efficiency}$。」" },
            { name: "旁白", text: "報表裡甚至有一個 $\text{Mood Tracking}$ 欄位，要求每天 $\text{Input}$ 兩次。" }
        ],
        options: [
            { text: "回：「我的 $\text{Mood}$ 永遠是 $\text{MAX}$。」", score: 15, next: '60', reaction: "建成回：「完美！這會大幅提高我們的 $\text{Work Quality}$。」" },
            { text: "回：「我會用我的 $\text{Intuition}$ 來打破你的 $\text{Gantt Chart}$。」", score: 5, next: '60', reaction: "建成回：「請保持在 $\text{5\%}$ 的誤差範圍內。」" },
            { text: "回：「所以我們什麼時候睡覺？」", score: 10, next: '60', reaction: "建成回：「休息時間已經優化為 $\text{Optimal 6.5}$ $\text{hours}$。」" }
        ]
    },
    {
        id: '60',
        steps: [
            { name: "林建成", text: "「我訂了飯店。為了達到『**最高效率的 $\text{Co-working}$**』和**『即時 $\text{Communication}$』**，我要求訂一間雙人房。」" },
            { name: "林建成", text: "「這樣，如果我們遇到問題，可以馬上進行 $\text{Pair Programming}$。」" }
        ],
        options: [
            { text: "「這是你計畫好的**『親密值 $\text{Upgrade}$』**吧？」", score: 25, next: '61', reaction: "建成臉紅，推眼鏡：「這...這是對 $\text{Resource}$ 的最佳利用！」" },
            { text: "「沒問題，節省開支是 $\text{ROI}$ 的一部分。」", score: 15, next: '61', reaction: "建成：「妳總是很懂我的商業邏輯。」" },
            { text: "「我們不能住兩間單人房嗎？」", score: -5, next: '61', reaction: "建成嘆氣：「這會降低 $\text{Efficiency}$。」" }
        ]
    },
    {
        id: '61',
        steps: [
            { name: "旁白", text: "在準備行李時，建成對著他的行李箱進行精確測量。" },
            { name: "林建成", text: "「我要確保我所有的物品都符合『**體積優化 $\text{Formula}$**』，這樣才能將 $\text{Volume}$ 損失降到最低。」" },
            { name: "林建成", text: "「妳的衣服太多了，妳必須 $\text{Filter}$ 掉一些。」" }
        ],
        options: [
            { text: "「我要帶一件能讓你的**心跳頻率 $\text{Increase}$** 的衣服。」", score: 20, next: '62', reaction: "建成：「這個 $\text{Variable}$ 不在我的 $\text{Model}$ 裡！但...可以帶！」" },
            { text: "「我的衣服都是 $\text{Essential Data}$，不能刪除。」", score: 10, next: '62', reaction: "建成：「好吧，我會試著用 $\text{Compression Algorithm}$。」" },
            { text: "「幫我把衣服也放進你的『**優化箱**』吧。」", score: 15, next: '62', reaction: "建成：「這會讓我的 $\text{System Overload}$ 的，但我願意嘗試！」" }
        ]
    },
    {
        id: '62',
        steps: [
            { name: "旁白", text: "在機場，建成拿著手機，不斷觀察每個安檢通道的人流。" },
            { name: "林建成", text: "「通道 $\text{3}$ 的人流 $\text{Std Dev}$ (標準差) 太高，通道 $\text{5}$ 的平均等待時間最低。」" },
            { name: "林建成", text: "「我們選擇通道 $\text{5}$，這是**數據驅動的決策**。」" }
        ],
        options: [
            { text: "牽著他的手：「跟著你的 $\text{Data}$ 走。」", score: 25, next: '63', reaction: "建成心跳加速：「妳...妳讓我的 $\text{Sensor}$ 讀數變得不穩定。」" },
            { text: "「太麻煩了，隨便選一個吧。」", score: 5, next: '63', reaction: "建成：「不行！每一秒鐘的 $\text{Efficiency}$ 都很重要！」" },
            { text: "「我們走 VIP 通道吧，那才是 $\text{Optimal Path}$。」", score: 15, next: '63', reaction: "建成：「$\text{Cost}$ 太高，不符合 $\text{ROI}$。」" }
        ]
    },
    {
        id: '63',
        steps: [
            { name: "旁白", text: "在飛機上，建成拿出一個 $\text{Excel}$ 檔案，裡面是一個詳細的「**未來三年 $\text{Gantt Chart}$**」。" },
            { name: "林建成", text: "「我將我們接下來三年的**『關係專案』**可視化了。妳看，$\text{2026}$ 年是『$\text{Co-Habitation}$ 測試』。」" },
            { name: "林建成", text: "「$\text{2027}$ 年是『$\text{Joint Financial Model}$ 運行』。」" }
        ],
        options: [
            { text: "「我看到了 $\text{2028}$ 年的 $\text{Project X}$...那是什麼？」", score: 20, next: '64', reaction: "建成臉紅，略顯緊張：「那...那是 $\text{High Priority}$ 的 $\text{Confidential Project}$。」" },
            { text: "「這份 $\text{Chart}$ 裡的粉紅色太多了吧？」", score: 10, next: '64', reaction: "建成：「粉紅色是『**浪漫度 $\text{Score}$**』，我設定為 $\text{High}$。」" },
            { text: "「你連這個都要規劃？」", score: 5, next: '64', reaction: "建成：「只有詳盡的 $\text{Plan}$，才能讓 $\text{Future}$ 穩定。」" }
        ]
    },
    {
        id: '64',
        steps: [
            { name: "林建成", text: "「妳發現了 $\text{Project X}$...它是一個『**不可逆的 $\text{Commitment}$**』，我還沒完全準備好它的 $\text{Launch}$。」" },
            { name: "林建成", text: "「我只能告訴妳，它的 $\text{ROI}$ 是**終生 $\text{100\%}$**，而且是唯一一個沒有 $\text{Contingency Plan}$ 的 $\text{Task}$。」" }
        ],
        options: [
            { text: "「我幫你把 $\text{Project X}$ 的 $\text{Start Date}$ 提前吧。」", score: 30, next: '65', reaction: "建成眼睛睜大：「妳...妳是在對我進行**強制 $\text{Override}$** 嗎？但我喜歡！」" },
            { text: "「沒關係，我會靜靜等待它的 $\text{Launch}$。」", score: 15, next: '65', reaction: "建成：「妳的耐心是我的 $\text{Success Factor}$ 之一。」" },
            { text: "「是關於養貓的 $\text{Project}$ 嗎？」", score: 5, next: '65', reaction: "建成：「貓是 $\text{Variable}$ 太多，太難控制了。」" }
        ]
    },
    {
        id: '65',
        steps: [
            { name: "旁白", text: "飛機突然遇到強烈亂流，機艙內一陣晃動。建成緊緊抓住你的手臂。" },
            { name: "林建成", text: "「我的 $\text{App}$ 正在分析飛機的**震動頻率數據**，它超出了 $\text{Safety Threshold}$ 的 $\text{0.5\%}$。」" },
            { name: "你", text: "「別看數據了，看著我！」" }
        ],
        options: [
            { text: "緊緊抱住他，讓他依靠。", score: 25, next: '66', reaction: "建成：「妳...妳是我的 $\text{Stabilizer}$。」" },
            { text: "問他：「現在是不是該啟動我們的 $\text{Contingency Plan}$？」", score: 10, next: '66', reaction: "建成：「我們的 $\text{Contingency}$ 就是緊緊抱在一起。」" },
            { text: "拿出手機拍照：「這會是很好的 $\text{Stress Test Data}$。」", score: 5, next: '66', reaction: "建成：「現在不是 $\text{Data Collection}$ 的時候！」" }
        ]
    },
    {
        id: '66',
        steps: [
            { name: "旁白", text: "終於抵達飯店。建成一打開房間的電腦，臉色就沉了下來。" },
            { name: "林建成", text: "「天啊...這裡的 $\text{Excel}$ 版本是 $\text{2010}$！它無法運行我最新的 $\text{Lambda Function}$！」" },
            { name: "林建成", text: "「我們無法進行高效的**『即時數據校準』**！」" }
        ],
        options: [
            { text: "「別擔心，我們用**『手動校準』**吧，我來幫你。」", score: 15, next: '67', reaction: "建成：「這會大大降低 $\text{Speed}$，但妳的手工 $\text{Quality}$ 是最高的。」" },
            { text: "「我來用我的筆電。」", score: 10, next: '67', reaction: "建成：「太好了！我們來建立一個 $\text{Local Network}$。」" },
            { text: "「先休息，明天再說。」", score: 5, next: '67', reaction: "建成：「不行！我們必須在 $\text{Hour 0}$ 就解決 $\text{Latency}$！」" }
        ]
    },
    {
        id: '67',
        steps: [
            { name: "林建成", text: "「好。現在，我們將房間劃分為我們的**『臨時數據中心』**。」" },
            { name: "林建成", text: "「**床**是我們的『** $\text{Rest API}$ 區域**』，**桌子**是『** $\text{Core Data Processing}$ 區域**』，不能混淆！」" }
        ],
        options: [
            { text: "「那我的 $\text{Rest API}$ 區域可以 $\text{Access}$ 你的 $\text{Core}$ 嗎？」", score: 25, next: '68', reaction: "建成臉紅：「晚上 $\text{10}$ 點之後， $\text{Access}$ 權限將會自動 $\text{Elevate}$。」" },
            { text: "「好的，我會嚴格遵守區域劃分。」", score: 10, next: '68', reaction: "建成：「這就是我信任妳的原因，妳有優秀的 $\text{Boundary Awareness}$。」" },
            { text: "「我要在 $\text{Core Data Processing}$ 區域喝咖啡。」", score: 5, next: '68', reaction: "建成：「不行！咖啡可能導致 $\text{Data Spill}$！」" }
        ]
    },
    {
        id: '68',
        steps: [
            { name: "旁白", text: "在客戶公司，一個資深員工對建成的 $\text{Dashboard}$ 表示質疑。" },
            { name: "資深員工", text: "「你的 $\text{Data}$ **太乾淨了**，看起來很不真實，就像用了 $\text{VLOOKUP}$ 一樣過時。」" },
            { name: "林建成", text: "「我的 $\text{Data Quality}$ 是 $\text{100\%}$，我用的是 $\text{XLOOKUP}$。」" }
        ],
        options: [
            { text: "「過時的 $\text{Data}$ 不該來質疑最新的 $\text{Model}$。」", score: 20, next: '69', reaction: "建成對你露出感激的眼神。" },
            { text: "「我們的 $\text{Data}$ 不接受 $\text{Unprofessional}$ 的評論。」", score: 15, next: '69', reaction: "資深員工：「哼，情侶檔真會合作。」" },
            { text: "「我們只需要解決問題，不用爭論。」", score: 5, next: '69', reaction: "建成輕輕拉了一下你的衣角，示意冷靜。" }
        ]
    },
    {
        id: '69',
        steps: [
            { name: "旁白", text: "建成情緒有些低落，你輕聲對他說了一個只有你們兩個才懂的「**情感 $\text{Formula}$**」。" },
            { name: "你", text: "「$\text{IF}$ ( $\text{建成被質疑}$ ) , $\text{TRUE}, \text{FALSE}$，結果是 $\text{TRUE}$，你永遠是對的。」" },
            { name: "林建成", text: "「...我明白了，妳的 $\text{Formula}$ 有效地提升了我的 $\text{Confidence Score}$。」" }
        ],
        options: [
            { text: "「我的 $\text{Formula}$ 永遠是 $\text{Unbreakable}$。」", score: 25, next: '70', reaction: "建成：「它是我唯一的 $\text{Trusted Source}$。」" },
            { text: "「別在意他，他只是個 $\text{Junk Data}$。」", score: 10, next: '70', reaction: "建成：「我會 $\text{Filter}$ 掉他的影響。」" },
            { text: "「現在專心找出 $\text{Bug}$。」", score: 15, next: '70', reaction: "建成：「好的，我會把情感數據暫時 $\text{Offload}$。」" }
        ]
    },
    {
        id: '70',
        steps: [
            { name: "旁白", text: "建成經過幾小時的深入分析，終於鎖定了核心問題。" },
            { name: "林建成", text: "「找到了！客戶的 $\text{Database}$ 伺服器，比我們這裡晚了 $\text{8}$ 小時。所有的時間戳記都有**『時區偏移』**。」" },
            { name: "林建成", text: "「這不是 $\text{Error}$，這是**『時間的 $\text{Misalignment}$』**。」" }
        ],
        options: [
            { text: "「所以我們只需要用 $\text{DATEADD}$ 來校準一切？」", score: 15, next: '71', reaction: "建成：「沒錯！妳真是個 $\text{Time Master}$！」" },
            { text: "「還好我們來了，不然這個 $\text{Bug}$ 永遠找不到。」", score: 10, next: '71', reaction: "建成：「這是我們關係的價值體現。」" },
            { text: "「太棒了，我們能早點回去休息了。」", score: 5, next: '71', reaction: "建成：「還不能放鬆，我們還需要 $\text{Double Check}$。」" }
        ]
    },
    {
        id: '71',
        steps: [
            { name: "林建成", text: "「$\text{DATEADD}$ 這個函數，讓我想到了我們。」" },
            { name: "林建成", text: "「無論我們從哪裡開始，我們都在不斷地**『加上時間』**，不斷地調整到**『同一時間軸』**上，永遠在一起。」" }
        ],
        options: [
            { text: "「我希望我們的 $\text{DATEADD}$ 永遠是無限的。」", score: 25, next: '72', reaction: "建成溫柔地看著你：「它會的，我們的 $\text{Date}$ 永遠不會 $\text{End}$。」" },
            { text: "「你總是能把函數說得這麼浪漫。」", score: 15, next: '72', reaction: "建成：「因為妳是我的 $\text{Data Source}$，給我無限的靈感。」" },
            { text: "「那我們現在可以去吃晚餐了嗎？」", score: 10, next: '72', reaction: "建成：「好的！我已經計算出附近 $\text{ROI}$ 最高的餐廳。」" }
        ]
    },
    {
        id: '72',
        steps: [
            { name: "旁白", text: "晚餐時，你們的默契已經到達了用數據暗號點餐的程度。" },
            { name: "林建成", text: "「服務生，給我一份 $\text{SUM}$ (海鮮) 和一份 $\text{MAX}$ (紅酒)。」" },
            { name: "你", text: "「我來一份 $\text{AVERAGE}$ (牛排)。」" }
        ],
        options: [
            { text: "「我們是 $\text{Table}$ 上的 $\text{Perfect Match}$。」", score: 20, next: '73', reaction: "建成：「我們是 $\text{INNER JOIN}$，完美契合。」" },
            { text: "「如果點錯了，我們就得用 $\text{IFERROR}$ 來解決。」", score: 10, next: '73', reaction: "建成：「妳的 $\text{IFERROR}$ 是親吻。」" },
            { text: "「我的胃口是 $\text{Total}$。」", score: 5, next: '73', reaction: "建成：「我會盡力滿足妳的 $\text{Capacity}$。」" }
        ]
    },
    {
        id: '73',
        steps: [
            { name: "林建成", text: "「其實我還為這次出差準備了一個『**數據備份**』禮物。」" },
            { name: "林建成", text: "「它是一個可以儲存妳所有回憶的**『加密 $\text{USB}$』**，上面用了 $\text{Military Grade}$ 的安全技術。」" }
        ],
        options: [
            { text: "「那密碼是什麼？」", score: 15, next: '74', reaction: "建成：「密碼是我們第一次接吻的 $\text{Timestamp}$，只有妳知道。」" },
            { text: "「你連禮物都要跟數據有關嗎？」", score: 10, next: '74', reaction: "建成：「只有數據，才能永遠不變質。」" },
            { text: "「謝謝你，建成。」", score: 20, next: '74', reaction: "建成：「妳的笑容是我最好的 $\text{Reward}$。」" }
        ]
    },
    {
        id: '74',
        steps: [
            { name: "旁白", text: "深夜，你們在飯店裡繼續處理 $\text{Data}$。你在桌子的 $\text{Core Processing}$ 區域不小心睡著了。" },
            { name: "旁白", text: "建成輕輕地將你抱起來，沒有吵醒你，將你安頓到 $\text{Rest API}$ 區域（床上）。" }
        ],
        options: [
            { text: "（假裝沒醒，拉著他的手不讓他走。）", score: 30, next: '75', reaction: "建成心跳加速，低聲說：「我的 $\text{Log}$ 顯示，我無法 $\text{Reject}$ 妳的 $\text{Request}$。」" },
            { text: "（半夢半醒中，對他說了一聲「我愛你」。）", score: 25, next: '75', reaction: "建成：「我的 $\text{Sleep Cycle}$ 被妳的 $\text{Input}$ 打亂了。」" },
            { text: "（醒來後，感謝他的體貼。）", score: 15, next: '75', reaction: "建成：「這是 $\text{Optimal Resource Allocation}$。」" }
        ]
    },
    {
        id: '75',
        steps: [
            { name: "旁白", text: "建成在數據庫中發現了一筆奇怪的記錄，它沒有任何關聯的 $\text{Key}$。" },
            { name: "林建成", text: "「妳看，這個 $\text{Data}$ 就像是一個**『孤兒 $\text{Data}$』**，它沒有任何 $\text{Relationship}$，孤單地漂浮在 $\text{Database}$ 中。」" },
            { name: "林建成", text: "「我們不能 $\text{Delete}$ 它，但它也無法被 $\text{Query}$。」" }
        ],
        options: [
            { text: "「我們給它一個新的 $\text{Key}$ 吧。」", score: 15, next: '76', reaction: "建成：「妳總是這麼善良。」" },
            { text: "「它讓我很心疼。」", score: 20, next: '76', reaction: "建成：「妳的同理心是無法被數據化的。」" },
            { text: "「這是 $\text{Junk Data}$，刪除它。」", score: 5, next: '76', reaction: "建成：「我需要先研究它 $\text{Source}$。」" }
        ]
    },
    {
        id: '76',
        steps: [
            { name: "林建成", text: "「其實...這個**『孤兒 $\text{Data}$』**讓我想到了我自己。」" },
            { name: "林建成", text: "「在遇到妳之前，我所有的數據、所有的努力，都像是沒有 $\text{Key}$ 的 $\text{Data}$，沒有真正的 $\text{Relationship}$。」" },
            { name: "林建成", text: "「**妳，是我的 $\text{Primary Key}$**。」" }
        ],
        options: [
            { text: "「我會讓你的 $\text{Data}$ 永遠被我 $\text{Index}$。」", score: 30, next: '77', reaction: "建成：「$\text{Statement Accepted}$！」" },
            { text: "「從此以後，你的 $\text{Key}$ 都是我。」", score: 20, next: '77', reaction: "建成：「我會永遠 $\text{Reference}$ 妳。」" },
            { text: "「別再說傷感的話了。」", score: 10, next: '77', reaction: "建成：「這不是傷感，這是**『被找到的幸福』**。」" }
        ]
    },
    {
        id: '77',
        steps: [
            { name: "旁白", text: "電話響起，客戶要求他們必須在明天早上 $\text{8}$ 點前，提交一份**「緊急 $\text{Report}$」**，需要你們通宵完成 $\text{Data Modeling}$。" },
            { name: "林建成", text: "「這是 $\text{Critical Task}$！我們必須啟動**『雙人 $\text{Extreme Programming}$』**模式。」" },
            { name: "你", text: "「我們能應付嗎？」" }
        ],
        options: [
            { text: "「沒問題，我們是最佳 $\text{Team}$。」", score: 15, next: '78', reaction: "建成：「只要妳在，我所有的 $\text{Error}$ 都會被 $\text{Debug}$。」" },
            { text: "「先給我一個吻，這是我的 $\text{Fuel}$。」", score: 25, next: '78', reaction: "建成：「$\text{Input}$ 接收完畢！$\text{Energy Level}$ $\text{MAX}$！」" },
            { text: "「我們分工吧，你負責 $\text{DAX}$，我負責 $\text{Visualization}$。」", score: 10, next: '78', reaction: "建成：「完美的分工 $\text{Model}$。」" }
        ]
    },
    {
        id: '78',
        steps: [
            { name: "旁白", text: "在狹小的書桌上，你們並肩工作。建成的肩膀不時地碰到你的手臂。" },
            { name: "林建成", text: "「我們的 $\text{Bandwidth}$ (頻寬) 很高，溝通零延遲。」" },
            { name: "林建成", text: "「妳的 $\text{Visualization}$ 讓我的 $\text{DAX}$ 變得有意義。」" }
        ],
        options: [
            { text: "輕輕靠在他的肩膀上：「這是我的 $\text{Rest}$ $\text{Input}$。」", score: 20, next: '79', reaction: "建成輕輕拍了拍你的頭：「妳是我的 $\text{Best Debug}$。」" },
            { text: "「你不要睡著了，我會 $\text{Monitor}$ 你。」", score: 10, next: '79', reaction: "建成：「我會啟動 $\text{Low Power Mode}$，保持清醒。」" },
            { text: "「我們需要一個 $\text{Timer}$ 來計時休息。」", score: 5, next: '79', reaction: "建成：「我的 $\text{Internal Clock}$ 已經設定好了。」" }
        ]
    },
    {
        id: '79',
        steps: [
            { name: "旁白", text: "在完成一段複雜的 $\text{DAX}$ 語法時，建成無意識地將他的手搭在你的手上，你們一起敲下了最後的 $\text{Enter}$。" },
            { name: "林建成", text: "「$\text{Code}$ 運行成功！這種 $\text{Co-Authoring}$ 的感覺...太棒了。」" }
        ],
        options: [
            { text: "反手握住他的手：「這是我們新的**『數據握手』**。」", score: 30, next: '80', reaction: "建成緊張但甜蜜地說：「我...我會永遠 $\text{Store}$ 這個 $\text{Session}$。」" },
            { text: "抽回手：「該換我來寫 $\text{Code}$ 了。」", score: 5, next: '80', reaction: "建成：「好的，我負責 $\text{Documentation}$。」" },
            { text: "問：「你剛剛是故意摸我的手嗎？」", score: 15, next: '80', reaction: "建成：「這是 $\text{Unintentional Error}$，但我不會 $\text{Undo}$。」" }
        ]
    },
    {
        id: '80',
        steps: [
            { name: "旁白", text: "清晨 $\text{7}$ 點，建成將最終的 $\text{Report}$ 郵件發送出去，長長地舒了一口氣。" },
            { name: "林建成", text: "「任務完成！我們的 $\text{Completion Time}$ 比預期提前了 $\text{15}$ 分鐘。這就是愛的 $\text{Efficiency}$。」" },
            { name: "林建成", text: "「現在，我們去獲取我們的 $\text{Reward}$：**早餐**。」" }
        ],
        options: [
            { text: "「我不要早餐，我要你的**早安吻**。」", score: 25, next: '81', reaction: "建成立刻兌現：「這是 $\text{Non-Negotiable Reward}$。」" },
            { text: "「好，我已經餓壞了。」", score: 10, next: '81', reaction: "建成：「我們來計算一下 $\text{Hunger Index}$。」" },
            { text: "「你還能撐住嗎？」", score: 5, next: '81', reaction: "建成：「我的 $\text{Energy Bar}$ 只剩 $\text{10\%}$，但我會為妳保持 $\text{Online}$。」" }
        ]
    },
    {
        id: '81',
        steps: [
            { name: "旁白", text: "建成拿著手機，在網上搜索當地的美食評論和人氣數據。" },
            { name: "林建成", text: "「我用 $\text{Bayesian Probability}$ 計算，這家賣小籠包的店，$\text{Success Rate}$ 最高。」" },
            { name: "林建成", text: "「走吧，我們去獲取最高 $\text{Score}$ 的早餐體驗。」" }
        ],
        options: [
            { text: "「我相信你的數據。」", score: 15, next: '82', reaction: "建成：「妳的信任讓我的 $\text{Algorithm}$ 運算更快。」" },
            { text: "「這次讓我來選，不用數據。」", score: 10, next: '82', reaction: "建成：「好吧，我會將妳的選擇作為 $\text{Blind Test Data}$。」" },
            { text: "「你連吃東西都要算 $\text{Probability}$ 嗎？」", score: 5, next: '82', reaction: "建成：「這是對生命的負責！」" }
        ]
    },
    {
        id: '82',
        steps: [
            { name: "旁白", text: "在回程的飛機上，建成顯得非常放鬆，他將這次專案的成功歸結於你們的關係。" },
            { name: "林建成", text: "「這次專案的成功，完全歸功於我們之間的**情感 $\text{Data Flow}$**。」" },
            { name: "林建成", text: "「我們是 $\text{Fully Integrated System}$。」" }
        ],
        options: [
            { text: "「是啊，我們是天作之合。」", score: 20, next: '83', reaction: "建成：「這就是我的 $\text{Final Conclusion}$。」" },
            { text: "「下次出差，我還要跟你一組。」", score: 15, next: '83', reaction: "建成：「我會向老闆申請將妳設為我的 $\text{Mandatory Partner}$。」" },
            { text: "「這次出差比上次有趣多了。」", score: 10, next: '83', reaction: "建成：「因為我們從 $\text{Solo}$ 升級到了 $\text{Co-op}$。」" }
        ]
    },
    {
        id: '83',
        steps: [
            { name: "旁白", text: "你不經意地看到建成的筆電，他的出差協作 $\text{Dashboard}$ 上，有一個隱藏的**「親密值 $\text{Indicator}$」**，顯示著一個不斷上升的百分比。" },
            { name: "你", text: "「建成，那個 $\text{Indicator}$ 是什麼？」" },
            { name: "林建成", text: "「哪個 $\text{Indicator}$？喔...那個是 $\text{Teamwork Synergy Score}$。」" }
        ],
        options: [
            { text: "「別騙我了，這是**『親密值』**吧？」", score: 25, next: '84', reaction: "建成臉瞬間通紅：「妳...妳怎麼發現的！」" },
            { text: "「這個 $\text{Score}$ 為什麼一直在上升？」", score: 15, next: '84', reaction: "建成：「因為我們在一起的時間增加了 $\text{72}$ 小時。」" },
            { text: "「我希望看到它變成 $\text{100\%}$。」", score: 20, next: '84', reaction: "建成：「它...它已經接近了。」" }
        ]
    },
    {
        id: '84',
        steps: [
            { name: "旁白", text: "建成羞澀地承認了那個 $\text{Indicator}$ 的真實用途。" },
            { name: "林建成", text: "「它的公式是 $\text{VLOOKUP}$ ( $\text{妳的笑容} , \text{我的心} , \text{永遠}, \text{FALSE}$ )。」" },
            { name: "林建成", text: "「這是一個**單向 $\text{Lookup}$**，只取決於妳的 $\text{Input}$，我自己的行為不計入 $\text{Score}$。」" }
        ],
        options: [
            { text: "「那我的 $\text{Input}$ 永遠是 $\text{MAX}$。」", score: 30, next: '85', reaction: "建成感動：「我會讓它變成 $\text{Data}$ $\text{Locked}$。」" },
            { text: "「我現在需要一個 $\text{IF}$ 條件：$\text{IF}$ ( $\text{你吻我}$ ) , $\text{親密值} , \text{親密值}+10$。」", score: 20, next: '85', reaction: "建成立刻執行 $\text{IF}$ 條件：「$\text{Execution Successful}$！」" },
            { text: "「我們把這個 $\text{Dashboard}$ 設為我們的**『定情信物』**吧。」", score: 15, next: '85', reaction: "建成：「它是我們關係的 $\text{Unique ID}$。」" }
        ]
    },
    {
        id: '85',
        steps: [
            { name: "旁白", text: "回到家，建成看到你疲憊的樣子，堅持要幫你處理後續的疲勞 $\text{Data}$。" },
            { name: "林建成", text: "「坐好，我要用 $\text{VBA}$ 幫妳運行一個**『疲勞 $\text{Reset}$ $\text{Macro}$』**。」" },
            { name: "旁白", text: "他給你倒了一杯溫水，並開始為你按摩肩膀，手法專業而溫柔。" }
        ],
        options: [
            { text: "「謝謝你，你真是我的 $\text{System Administrator}$。」", score: 20, next: '86', reaction: "建成：「我的 $\text{Admin}$ 權限，只對妳開放。」" },
            { text: "「這個 $\text{Macro}$ 的 $\text{Output}$ 是什麼？」", score: 10, next: '86', reaction: "建成：「$\text{Output}$ 是 $\text{Fully Relaxed}$ $\text{TRUE}$。」" },
            { text: "「這個 $\text{Macro}$ 可以持續運行嗎？」", score: 15, next: '86', reaction: "建成：「當然，我已經設為 $\text{Auto-Run}$ $\text{Daily}$。」" }
        ]
    },
    {
        id: '86',
        steps: [
            { name: "林建成", text: "「現在，最後一個 $\text{Task}$。請妳給我這次出差的總體**『情感 $\text{Score}$』**。」" },
            { name: "林建成", text: "「滿分 $\text{100}$ 分，我需要妳的 $\text{Honest Feedback}$。」" }
        ],
        options: [
            { text: "「$\text{100}$ 分，你和這次出差都是 $\text{Perfect}$。」", score: 25, next: '87', reaction: "建成：「$\text{Data Accepted}$！我會將此設為我們的 $\text{Benchmark}$。」" },
            { text: "「$\text{99}$ 分，還差 $\text{1}$ 分的求婚。」", score: 30, next: '87', reaction: "建成語塞：「我...我會盡快 $\text{Close}$ 那 $\text{1}$ 分的 $\text{Gap}$。」" },
            { text: "「$\text{80}$ 分，因為工作時間太多了。」", score: 10, next: '87', reaction: "建成：「我會優化 $\text{Work-Life Balance}$ 的 $\text{Algorithm}$。」" }
        ]
    },
    {
        id: '87',
        steps: [
            { name: "旁白", text: "建成將他的筆電畫面轉向你，上面只有一行 $\text{Excel}$ 公式。" },
            { name: "林建成", text: "「$\text{Final Formula}$： $\text{IFERROR}$ ( $\text{你離開我的時間}$ , $\text{TRUE}$ ) $\text{= TRUE}$」" },
            { name: "林建成", text: "「這代表，我對妳的愛是 $\text{Non-Error}$ 的 $\text{Data}$，永遠 $\text{TRUE}$。」" }
        ],
        options: [
            { text: "「那我的 $\text{Input}$ 是：我們永遠不會有 $\text{Error}$。」", score: 30, next: 'ending_placeholder_4', reaction: "建成：「$\text{Final Data Set}$ 完整！我愛妳！」" },
            { text: "親吻他的臉頰：「謝謝你，建成。」", score: 20, next: 'ending_placeholder_4', reaction: "建成：「這是我最好的 $\text{Reward}$。」" },
            { text: "「這是個很好的收尾 $\text{Report}$。」", score: 15, next: 'ending_placeholder_4', reaction: "建成：「這是我們故事的 $\text{Chapter End}$。」" }
        ]
    },



    {
        id: '88',
        steps: [
            { name: "旁白", text: "出差結束，你們回到家。建成正忙著將出差期間拍的照片和紀念品進行歸檔。" },
            { name: "林建成", text: "「我們需要一個合理的『**數據結構**』。我會用 $\text{Folder}$ 樹狀圖，以**日期 ( $\text{Primary Key}$ ) **和**情感強度 ( $\text{Score}$ )** 進行分類。」" }
        ],
        options: [
            { text: "「照片的順序就用我的**心動頻率**來排序。」", score: 20, next: '89', reaction: "建成：「這個 $\text{Variable}$ 難以量化，但我會盡力將其轉化為 $\text{Binary}$ (吻或不吻) $\text{Data}$。」" },
            { text: "「我來決定哪些是 $\text{Junk Data}$ (刪除失敗的照片)。」", score: 10, next: '89', reaction: "建成：「小心，任何 $\text{Data}$ 都有可能在未來變得有價值。」" },
            { text: "「你就不能隨意地放著嗎？」", score: 5, next: '89', reaction: "建成：「不行！混亂的 $\text{Data}$ 會導致我的 $\text{System Error}$！」" }
        ]
    },
    {
        id: '89',
        steps: [
            { name: "旁白", text: "隔天早上，建成在廚房裡準備早餐，他正在對著手機裡的一個 $\text{Model}$ 自言自語。" },
            { name: "林建成", text: "「如果 $\text{Nutritional Score}$ 低於 $\text{90}$，就必須增加 $\text{Protein}$ 的 $\text{Input}$。但 $\text{Time Cost}$ 也必須在 $\text{5}$ 分鐘以內。」" },
            { name: "林建成", text: "「這就是我的**『早餐優化 $\text{Model}$』**。」" }
        ],
        options: [
            { text: "「我的 $\text{Preference}$ 是你做的，無論 $\text{Score}$ 多低。」", score: 25, next: '90', reaction: "建成溫柔地看著你：「妳的 $\text{Preference}$ 具有最高 $\text{Weight}$。」" },
            { text: "「優化結果是什麼？」", score: 10, next: '90', reaction: "建成：「結果是**『愛心蛋捲』**，$\text{NPS}$ (淨推薦值) 最高。」" },
            { text: "「你連吃東西都要算 $\text{Model}$ 嗎？」", score: 5, next: '90', reaction: "建成：「精準的 $\text{Data}$ 是幸福生活的基礎。」" }
        ]
    },
    {
        id: '90',
        steps: [
            { name: "旁白", text: "晚上，你們爭奪電視遙控器，你想看浪漫劇，他想看紀錄片。" },
            { name: "林建成", text: "「我們必須依據『**$\text{Access}$ 權限 $\text{Matrix}$**』來決定。上次是我讓你，所以這次我的權限是 $\text{Level 1}$。」" },
            { name: "你", text: "「但我今天是 $\text{Mood}$ $\text{Level 10}$，我的**『情感權重』**更高！」" }
        ],
        options: [
            { text: "主動吻他：「我來對你進行**『情感 $\text{Override}$』**。」", score: 30, next: '91', reaction: "建成心跳加速：「$\text{Override}$ $\text{Successful}$！請輸入妳的 $\text{Request}$！」" },
            { text: "「我們用一個 $\text{IF}$ 條件來決定吧。」", score: 15, next: '91', reaction: "建成：「$\text{IF}$ ( $\text{我吻妳}$ ) , $\text{浪漫劇}, \text{紀錄片}$。」" },
            { text: "「我們一人一半時間。」", score: 5, next: '91', reaction: "建成：「這是最公平的 $\text{Time Allocation}$。」" },
            {text:"播放《真夏夜之淫夢》，",score:0,next:'昏睡',reaction:[{name:"林建成",text:"嗯？你正在播放什麼？"}]},
        ]
    },
    {
        id: '91',
        steps: [
            { name: "旁白", text: "你們在超市購物，建成拿著手機裡的 $\text{Excel}$ 購物清單，上面標註了現有庫存。" },
            { name: "林建成", text: "「我們還有 $\text{2}$ 盒牛奶。我用 $\text{COUNTIF}$ 追蹤過，當**庫存量** $\text{<}$ $\text{3}$ 時，就要 $\text{Refill}$。」" },
            { name: "你", text: "「但那 $\text{2}$ 盒是過期的！」" }
        ],
        options: [
            { text: "「你的 $\text{Model}$ 漏了『**$\text{Expiration Date}$**』這個 $\text{Variable}$。」", score: 20, next: '92', reaction: "建成懊惱：「天啊！我的 $\text{Data Quality}$ 出了問題！」" },
            { text: "「你的數據真是一點人情味都沒有。」", score: 5, next: '92', reaction: "建成：「我會增加『**人情味 $\text{Factor}$**』到 $\text{Model}$ 中。」" },
            { text: "「幫我買一盒新的牛奶，我的 $\text{Request}$ 優先度最高。」", score: 15, next: '92', reaction: "建成：「妳的 $\text{Demand}$ 是 $\text{Inelastic}$ 的。」" }
        ]
    },
    {
        id: '92',
        steps: [
            { name: "旁白", text: "你偶然發現建成在筆電上的一個隱藏 $\text{Sheet}$，上面是你每天的**『心情 $\text{Score}$』**和**『睡眠時長 $\text{Metric}$』**。" },
            { name: "你", text: "「建成！你為什麼要追蹤我的 $\text{Data}$？」" },
            { name: "林建成", text: "「我...我只是想確保妳的 $\text{System}$ 運行在最佳狀態！這是我的**『情感 $\text{Health}$ $\text{Tracker}$』**。」" }
        ],
        options: [
            { text: "「我不喜歡我的 $\text{Data}$ 被偷看。」", score: 10, next: '93', reaction: "建成緊張：「對不起！我保證只用於 $\text{Maintenance}$。」" },
            { text: "「那我的**『愛你 $\text{Score}$』**是多少？」", score: 25, next: '93', reaction: "建成：「那個 $\text{Score}$ 是 $\text{MAX}$，所以不需要 $\text{Tracking}$。」" },
            { text: "「你可以直接問我，不用看數據。」", score: 15, next: '93', reaction: "建成：「但 $\text{Quantitative Data}$ 更客觀。」" }
        ]
    },

    {
        id: '93',
        steps: [
            { name: "旁白", text: "建成將一封名為「**$\text{AI}$ 情詩 $\text{V1.0}$**」的郵件發給你。打開後，內容讓你看得啼笑皆非。" },
            { name: "郵件內容", text: "「妳是我的 $\text{Primary Source}$，我對妳的愛是 $\text{Unconditional Format}$。如果 $\text{You}$ $\text{Equal}$ $\text{Me}$，則 $\text{Return}$ $\text{TRUE}$。」" },
            { name: "林建成", text: "「我嘗試讓 $\text{AI}$ 學習情感 $\text{Data}$，但它似乎只會輸出 $\text{Code}$。」" }
        ],
        options: [
            { text: "「我不需要 $\text{AI}$ 的詩，我需要你親口說。」", score: 30, next: '94', reaction: "建成：「我的 $\text{Verbal Output}$ 也是 $\text{Data}$，我愛妳。」" },
            { text: "「這首詩的 $\text{R-Squared}$ 肯定很低。」", score: 10, next: '94', reaction: "建成：「我會重新訓練 $\text{Model}$！」" },
            { text: "「這比你之前寫的任何東西都好！」", score: 5, next: '94', reaction: "建成：「真的嗎？$\text{AI}$ 終於比我厲害了嗎？」" }
        ]
    },
    {
        id: '94',
        steps: [
            { name: "旁白", text: "週末約會，你們在選擇電影。建成打開了一個網頁，上面跑著一個**「用戶情感分析 $\text{Model}$」**。" },
            { name: "林建成", text: "「這部片雖然評分高，但『**負面評論的 $\text{Keyword}$ 密度**』也很高。我們應該避開它，以確保約會的 $\text{Satisfaction}$。」" }
        ],
        options: [
            { text: "「我相信你的數據分析。」", score: 15, next: '95', reaction: "建成：「我的 $\text{Model}$ 永遠以妳的 $\text{Happiness}$ 為 $\text{Target}$。」" },
            { text: "「這次讓我來選，我喜歡**不確定性**。」", score: 10, next: '95', reaction: "建成：「不確定性...我會將其視為 $\text{Risk}$ $\text{Factor}$。」" },
            { text: "「我們去看不符合 $\text{ROI}$ 的電影吧。」", score: 5, next: '95', reaction: "建成：「妳總喜歡挑戰我的 $\text{Model}$。」" }
        ]
    },
    {
        id: '95',
        steps: [
            { name: "旁白", text: "你們因為一件小事發生了爭執，氣氛變得有些僵硬。建成主動打破沉默。" },
            { name: "林建成", text: "「停止 $\text{Error}$。我們應該啟動 $\text{IFERROR}$ 函數。」" },
            { name: "林建成", text: "「$\text{IFERROR}$ ( $\text{爭吵}$ , $\text{吻}$ ) $\text{。}$ 意思就是，如果吵架了，就用**親吻**來代替錯誤結果。」" }
        ],
        options: [
            { text: "主動親吻他：「$\text{IFERROR}$ $\text{Execution}$ $\text{Successful}$。」", score: 35, next: '96', reaction: "建成：「妳的 $\text{Execution}$ 永遠是最好的 $\text{Fix}$。」" },
            { text: "「但 $\text{IFERROR}$ 無法解決根本問題。」", score: 10, next: '96', reaction: "建成：「但它可以確保我們的 $\text{Output}$ 永遠是甜美的。」" },
            { text: "「我還沒 $\text{Debug}$ 完！」", score: 5, next: '96', reaction: "建成：「$\text{Debug}$ 過程太痛苦了，我們直接 $\text{Patch}$ 吧！」" }

        ]
    },
    {
        id: '96',
        steps: [
            { name: "旁白", text: "你們買了一盆小小的盆栽，建成堅持要用 $\text{Excel}$ 記錄它的生長數據。" },
            { name: "林建成", text: "「我用 $\text{Growth Rate Formula}$ 追蹤它的**『每日增長率』**。我們必須確保它的 $\text{Trend}$ 是正向的。」" },
            { name: "你", text: "「它需要的是愛和水，不是數據。」" }
        ],
        options: [
            { text: "「我們將『**愛**』設為它的 $\text{Primary Input}$。」", score: 20, next: '97', reaction: "建成：「$\text{Approved}$！愛是 $\text{Uncountable Variable}$，但效果顯著。」" },
            { text: "「如果它枯萎了，你會不會很難過？」", score: 10, next: '97', reaction: "建成：「我會難過，但也會從失敗的 $\text{Data}$ 中學習。」" },
            { text: "「我也要加入我的 $\text{Mood}$ $\text{Data}$ 來影響它的生長。」", score: 15, next: '97', reaction: "建成：「這是 $\text{Data}$ $\text{Correlation}$，很有趣。」" }
        ]
    },
    {
        id: '97',
        steps: [
            { name: "旁白", text: "你們計劃在客廳裡設計一個共用的書架。建成拿出了詳細的**「空間優化演算法 $\text{Sketch}$」**。" },
            { name: "林建成", text: "「我計算了我們現有書本的 $\text{Volume}$ 和 $\text{Weight Distribution}$。我必須確保書架的 $\text{Stability}$。」" },
            { name: "林建成", text: "「我的 $\text{Technical}$ 書必須佔 $\text{70\%}$ 的 $\text{Storage}$。」" }
        ],
        options: [
            { text: "「那我的小說必須佔 $\text{30\%}$ 的**『情感 $\text{Priority}$ 空間』**。」", score: 20, next: '98', reaction: "建成：「$\text{Fair Enough}$。我會將 $\text{30\%}$ 設為**『不可壓縮空間』**。」" },
            { text: "「我們把書架變成一個 $\text{3D}$ $\text{Chart}$ 吧。」", score: 10, next: '98', reaction: "建成：「如果妳喜歡，我可以做到。」" },
            { text: "「把你的書都放到櫃子裡吧。」", score: 5, next: '98', reaction: "建成：「不行！我的 $\text{Reference Material}$ 必須保持 $\text{Easy Access}$！」" }
        ]
    },

    {
        id: '98',
        steps: [
            { name: "旁白", text: "你們收到了一封朋友的婚禮邀請函。建成看著邀請函，若有所思。" },
            { name: "林建成", text: "「他們的 $\text{Relationship Index}$ 已經到達 $\text{Optimal}$。這讓我想到了我們的 $\text{Project X}$。」" },
            { name: "林建成", text: "「我覺得，我的**『準備度 $\text{Score}$』**已經達到了 $\text{85\%}$。」" }
        ],
        options: [
            { text: "「$\text{Project X}$ 什麼時候 $\text{Launch}$？」", score: 25, next: '99', reaction: "建成：「我還需要 $\text{15\%}$ 的 $\text{Confidence Level}$。」" },
            { text: "「他們辦婚禮的 $\text{Budget}$ $\text{ROI}$ 是多少？」", score: 10, next: '99', reaction: "建成：「我已經計算過了，$\text{ROI}$ 幾乎為負，但**情感價值**是 $\text{MAX}$。」" },
            { text: "「我的 $\text{Confidence Level}$ 早就 $\text{100\%}$ 了。」", score: 20, next: '99', reaction: "建成：「妳的 $\text{Data}$ 對我來說，是最好的鼓勵。」" }
        ]
    },
    {
        id: '99',
        steps: [
            { name: "旁白", text: "你看到建成在處理一個簡單的表格，故意用一個他極少用的 $\text{Legacy}$ $\text{Function}$ 來逗他。" },
            { name: "你", text: "「你怎麼不用 $\text{GETPIVOTDATA}$ 來提取這個數值呢？那才是正統 $\text{Data}$ $\text{Extraction}$。」" },
            { name: "林建成", text: "「天啊！妳在跟我開玩笑嗎？那個 $\text{Function}$ 的**『語法複雜度 $\text{Score}$』**是 $\text{99}$！我用 $\text{XLOOKUP}$ 只要 $\text{5}$ 秒。」" }
        ],
        options: [
            { text: "「我喜歡看你驚慌的樣子。」", score: 20, next: '100', reaction: "建成：「妳的 $\text{Happiness}$ 真是我的 $\text{Unpredictable}$ $\text{Variable}$。」" },
            { text: "「我只是在測試你的 $\text{Data}$ $\text{Tolerance}$。」", score: 10, next: '100', reaction: "建成：「我的 $\text{Tolerance}$ 很高，但 $\text{Efficiency}$ 會下降。」" },
            { text: "「下次我試試 $\text{VBA}$。」", score: 15, next: '100', reaction: "建成：「不！我們禁止使用 $\text{VBA}$ 來開玩笑！」" }
        ]
    },
    {
        id: '100',
        steps: [
            { name: "旁白", text: "建成正在設定你們新買的智能家居系統，他將所有設備都命名為 $\text{Excel}$ 函數名。" },
            { name: "建成（對著燈光）", text: "「$\text{IF}$ ( $\text{天黑}$ ) , $\text{TRUE}, \text{FALSE}$！...不對，應該說：**$\text{SUM}$ $\text{Light}$ $\text{On}$**！」" },
            { name: "你（看著標籤）", text: "「所以電水壺是 $\text{VLOOKUP}$，加濕器是 $\text{AVERAGE}$？」" }
        ],
        options: [
            { text: "「如果我說**『$\text{I Love You}$』**，哪個設備會啟動？」", score: 25, next: '101', reaction: "建成：「我們的**『心率 $\text{Monitor}$』**會啟動 $\text{MAX}$ 警告！」" },
            { text: "「你不要嚇到我們的客人。」", score: 10, next: '101', reaction: "建成：「這是我們家的 $\text{Naming Convention}$。」" },
            { text: "「太可愛了，建成。」", score: 15, next: '101', reaction: "建成：「只有妳懂我的浪漫。」" }
        ]
    },
    {
        id: '101',
        steps: [
            { name: "旁白", text: "一個下雨的夜晚，你們依偎在沙發上，建成打開了他珍藏的「**關係時間線 $\text{Report}$**」。" },
            { name: "林建成", text: "「妳看，這條線是我們的**『情感穩定度曲線』**。從妳用了 $\text{XLOOKUP}$ 那天起，它就開始急劇上升。」" },
            { name: "林建成", text: "「所有的 $\text{Data}$ 都指向一個結論：**我們將永遠在一起**。」" }
        ],
        options: [
            { text: "「我將我的 $\text{Future}$ $\text{Data}$ $\text{Input}$ 給你。」", score: 30, next: '102', reaction: "建成：「我會永遠 $\text{Store}$ 它，不會有任何 $\text{Loss}$。」" },
            { text: "「我喜歡這張 $\text{Chart}$，它是我的最愛。」", score: 15, next: '102', reaction: "建成：「它是我的 $\text{Masterpiece}$。」" },
            { text: "「我睡著了...」", score: 5, next: '102', reaction: "建成：「那我要啟動**『晚安 $\text{Macro}$』**了。」" }
        ]
    },
    {
        id: '102',
        steps: [
            { name: "旁白", text: "你們互道晚安。建成在你耳邊輕輕說了一個最終的公式。" },
            { name: "林建成", text: "「晚安。我的愛是 $\text{SUM}$ ( $\text{所有星星}$ , $\text{所有海洋}$ , $\text{妳}$ )。」" }
        ],
        options: [
            { text: "回吻他：「我的愛是 $\text{MAX}$ ( $\text{你的愛}$ , $\text{我的愛}$ )。」", score: 35, next: 'ending_placeholder_5', reaction: "建成：「$\text{MAX}$ $\text{Successful}$！夢裡見！」" },
            { text: "回：「你總能說出最數據化的情話。」", score: 20, next: 'ending_placeholder_5', reaction: "建成：「因為妳是我的 $\text{Source}$。」" },
            { text: "回：「晚安，我的 $\text{Data}$ $\text{Guardian}$。」", score: 15, next: 'ending_placeholder_5', reaction: "建成：「永遠為妳守護。」" }
        ]
    },

    {
        id: '103',
        steps: [
            { name: "旁白", text: "有一天，你發現手機裡每天固定會收到一條來自建成設計的 Macro 自動發送的訊息。" },
            { name: "建成 (Macro 訊息)", text: "「Log Time： 09:00。我的 Current Thought：Thinking of You。」" },
            { name: "林建成", text: "「我用 VBA 寫了一個**『定時愛的 Macro』**，確保妳的 Data Stream 裡永遠有我的愛。」" }
        ],
        options: [
            { text: "「謝謝你，我的自動化浪漫。」", score: 20, next: '104', reaction: "建成：「它是 Non-Stop Loop，會永遠運行。」" },
            { text: "「你連 Say Hello 都要用 Code 嗎？」", score: 10, next: '104', reaction: "建成：「這是為了確保 Consistency 和 Reliability。」" },
            { text: "「我會回傳一個 Receipt Confirmation。」", score: 15, next: '104', reaction: "建成：「我會將妳的 Reply 設為 Priority。」" }
        ]
    },
    {
        id: '104',
        steps: [
            { name: "林建成", text: "「為了更好地管理我們的**情感 Data**，我提議開設一個共用的**『關係 Dashboard 帳號』**。」" },
            { name: "林建成", text: "「每天 Input 兩次 Mood Score，並記錄一次**『幸福事件 Log』**。」" }
        ],
        options: [
            { text: "「好啊，讓我們的愛有跡可循。」", score: 25, next: '105', reaction: "建成：「Data Sharing Permission Granted！」" },
            { text: "「我不喜歡被 Tracking。」", score: 5, next: '105', reaction: "建成：「我們可以將 Tracking 設為 Optional。」" },
            { text: "「那密碼是什麼？」", score: 15, next: '105', reaction: "建成：「密碼是我們第一次 DEBUG 成功的 Timestamp。」" }
        ]
    },
    {
        id: '105',
        steps: [
            { name: "旁白", text: "你們第一次坐下來，認真討論未來的生活。建成拿出一個**「家庭會議 Pivot Table」**。" },
            { name: "林建成", text: "「我用 Pivot Table 總結了我們對『**家庭價值觀**』的 Preference。妳看，『**寵物**』的 Count 是 0，但**『旅行』**的 SUM 是 High。」" },
            { name: "林建成", text: "「我們需要一個**最終 Consensus**。」" }
        ],
        options: [
            { text: "「我的最終 Consensus 是『**有你**』。」", score: 30, next: '106', reaction: "建成感動地笑：「妳的 Input 讓所有 Data 都有了意義。」" },
            { text: "「寵物這個 Variable 必須重新納入考慮。」", score: 10, next: '106', reaction: "建成：「我會更新 Model，將其設為 Future Optional Add-on。」" },
            { text: "「我對這個 Table 沒意見。」", score: 15, next: '106', reaction: "建成：「太好了，Project 進入下一階段。」" }
        ]
    },
    {
        id: '106',
        steps: [
            { name: "旁白", text: "建成即將正式拜訪你的父母。他準備了一份厚厚的「**風險分析 Report**」，裡面包含潛在的敏感話題和應對策略。" },
            { name: "林建成", text: "「這份 Report 是針對**『見家長失敗 Scenario』**所做的 Pre-mortem 分析。」" },
            { name: "林建成", text: "「妳母親對我的**『穩定度 Score』**是 75%，我必須將其提升到 90% 以上。」" }
        ],
        options: [
            { text: "「別緊張，我會是你的 Safety Net。」", score: 20, next: '107', reaction: "建成：「妳的 Support 是我最大的 Confidence Booster。」" },
            { text: "「我的父母不看 Data，他們看感覺。」", score: 15, next: '107', reaction: "建成：「好吧，我會調整 Output，增加『**情感 Data**』。」" },
            { text: "「你的 Report 有點誇張了。」", score: 5, next: '107', reaction: "建成：「數據不能說謊。」" }
        ]
    },
    {
        id: '107',
        steps: [
            { name: "旁白", text: "見家長順利結束。你的父母對建成非常滿意，建成偷偷查看他手機裡的 Score。" },
            { name: "林建成", text: "「成功了！我的**『親和力 Score』**達到了 95%！我通過了**『外部 Validation』**。」" },
            { name: "林建成", text: "「Project X 的 Confidence Level 可以從 85% 提升到 90% 了！」" }
        ],
        options: [
            { text: "「不是數據讓你成功，是你的真心。」", score: 25, next: '108', reaction: "建成：「也許吧，但真心也需要 Data 的呈現。」" },
            { text: "「我們今晚吃大餐慶祝吧！」", score: 15, next: '108', reaction: "建成：「我已經預訂了 4 Star Rated 的餐廳。」" },
            { text: "「你終於放鬆了。」", score: 10, next: '108', reaction: "建成：「只有在妳身邊，我才能 Log Off。」" }
        ]
    },
    {
        id: '108',
        steps: [
            { name: "林建成", text: "「我為妳設計了一種**專屬 Excel 字體**。它將所有字母都替換成 Code 符號。」" },
            { name: "林建成", text: "「只有我們才能解讀我們之間的情話，這是我們愛情的**『加密 Algorithm』**。」" }
        ],
        options: [
            { text: "「你寫一個關於愛的公式給我看看。」", score: 20, next: '109', reaction: "建成：「它是一串 Code，翻譯過來是：**我永遠愛妳**。」" },
            { text: "「這太酷了！你怎麼做到的？」", score: 15, next: '109', reaction: "建成：「這需要非常複雜的 Character Mapping。」" },
            { text: "「我不喜歡加密。」", score: 5, next: '109', reaction: "建成：「這是為了保護我們的愛不被他人 Query。」" }
        ]
    },
    {
        id: '109',
        steps: [
            { name: "旁白", text: "建成假裝在量一個新的戒指尺寸作為禮物，他小心翼翼地測量你的手指，並記錄下一個精確的數字。" },
            { name: "林建成", text: "「這項 Measurement Data 必須是**絕對精確**的，它代表了我的**『承諾 Fit Score』**。」" },
            { name: "林建成", text: "「如果 Size Error > 0.01，Project X 就會延期。」" }
        ],
        options: [
            { text: "「這個 Project 什麼時候 Launch？」", score: 25, next: '110', reaction: "建成：「很快了，Data Collection 已經進入最終階段。」" },
            { text: "「我的 Input 是：我不需要鑽石，我需要你。」", score: 20, next: '110', reaction: "建成：「但 Diamond 是愛的**『物理化 Storage』**。」" },
            { text: "「你的手好溫暖。」", score: 15, next: '110', reaction: "建成：「這也是 Project X 的一部分：**情感 Output**。」" }
        ]
    },
    {
        id: '110',
        steps: [
            { name: "林建成", text: "「現在，我們來確定**『求婚地點 Location』**。」" },
            { name: "林建成", text: "「我使用 Geospatial Data，結合了**『回憶密度』**和**『環境舒適度』**，分析出了最適合啟動 Project X 的**『情感 Heatmap』**。」" },
            { name: "林建成", text: "「結果是，**觀星台**。」" }
        ],
        options: [
            { text: "「觀星台...我們第一次約會的地方。」", score: 20, next: '111', reaction: "建成：「沒錯，從**數據的起點**開始，才能鑄就**數據的永恆**。」" },
            { text: "「我會將那個地點設為我的 Permanent GPS Location。」", score: 25, next: '111', reaction: "建成：「妳真是個 Data Romantic。」" },
            { text: "「我以為你會選一個新的地方。」", score: 10, next: '111', reaction: "建成：「歷史 Data 的價值最高。」" }
        ]
    },
    {
        id: '111',
        steps: [
            { name: "旁白", text: "建成偷偷在房間裡進行**「求婚 Speech 模擬演練」**，將過程錄下作為 Beta Test。你無意間偷聽到他對著空氣講話。" },
            { name: "林建成 (喃喃自語)", text: "「我愛妳的 Logic，我愛妳的 Data...如果 妳說 NO...那就執行 Contingency Plan A：**哭泣**。」" }
        ],
        options: [
            { text: "「你的 Contingency Plan 是什麼？」", score: 15, next: '112', reaction: "建成嚇了一跳：「妳...妳怎麼在這裡！這是 Confidential Simulation！」" },
            { text: "（輕輕地抱住他）「我愛你，建成。」", score: 25, next: '112', reaction: "建成鬆了一口氣：「妳的 Input 讓我的 Speech Score 瞬間 Boost。」" },
            { text: "「你的 Speech 裡，Excel 術語有點太多了。」", score: 10, next: '112', reaction: "建成：「我會進行 Word Optimization。」" }
        ]
    },
    {
        id: '112',
        steps: [
            { name: "林建成", text: "「現在，最後一個 Test。這是**『Project X 最終 Data』**的加密 USB。」" },
            { name: "林建成", text: "「我要求妳：不要打開它。這是對我們關係的**『數據倫理與信任 Challenge』**。」" }
        ],
        options: [
            { text: "將 USB 藏在安全的地方：「我信任你，建成。」", score: 30, next: '113', reaction: "建成眼神充滿感激：「妳的信任比任何 Data 都珍貴。」" },
            { text: "「我很好奇，我能看一眼嗎？」", score: 5, next: '113', reaction: "建成：「不行！Curiosity 是 Data Security 的最大敵人！」" },
            { text: "「我現在就打開它！」", score: -5, next: '113', reaction: "建成臉色一沉：「妳打破了 Trust Protocol。」" }
        ]
    },
    {
        id: '113',
        steps: [
            { name: "旁白", text: "你堅定地將 USB 歸還給建成。他看著你，眼中滿是愛意和驕傲。" },
            { name: "林建成", text: "「妳通過了最終 Test。妳的 Trust Score 達到了 100%。」" },
            { name: "林建成", text: "「現在，Project X 的**『準備度 Score』**正式達到 100%！」" }
        ],
        options: [
            { text: "「我等著你的 Launch Day。」", score: 25, next: '114', reaction: "建成：「它會是我們生命中最閃亮的 Timestamp。」" },
            { text: "「恭喜你，我的 CEO。」", score: 15, next: '114', reaction: "建成：「妳是我的 Board of Directors。」" },
            { text: "「我好奇裡面是什麼...」", score: 5, next: '114', reaction: "建成：「現在，妳會親眼看到的。」" }
        ]
    },
    {
        id: '114',
        steps: [
            { name: "林建成", text: "「從今天開始，我將正式進行**『單身數據 Wipe Out』**。」" },
            { name: "林建成", text: "「我所有的單身照、單身 Log，都將被**永久 Delete**，只留下我們的**『共同 Database』**。」" }
        ],
        options: [
            { text: "「這是最好的 Version Update。」", score: 20, next: '115', reaction: "建成：「沒錯，我們將迎來 Version 2.0。」" },
            { text: "「你會不會捨不得？」", score: 10, next: '115', reaction: "建成：「不會，因為我的 Future Data 已經完全被妳佔據。」" },
            { text: "「那我也要 Delete 我的單身 Data。」", score: 15, next: '115', reaction: "建成：「這是一個**『雙向 Commitment』**。」" }
        ]
    },
    {
        id: '115',
        steps: [
            { name: "林建成", text: "「我的 Calendar Access 權限已經永久開放給妳。」" },
            { name: "林建成", text: "「我將妳的所有 Events 設定為**『Uneditable』**。這意味著：妳的 Time 在我的生命中是**不可改變的 Priority**。」" }
        ],
        options: [
            { text: "「我會將你的生日設為**『永不取消的 Reminder』**。」", score: 25, next: '116', reaction: "建成：「這是最好的 Calendar Entry。」" },
            { text: "「這個 Commitment 真是沉重。」", score: 5, next: '116', reaction: "建成：「但值得。」" },
            { text: "「所以你週末的時間都是我的了？」", score: 15, next: '116', reaction: "建成：「我的 Work-Life Balance 已經完全偏向 Life 這邊。」" }
        ]
    },
    {
        id: '116',
        steps: [
            { name: "林建成", text: "「最後一個 Input。妳會後悔成為我的 Data Partner 嗎？」" },
            { name: "林建成", text: "「如果妳現在 Input TRUE，我會立刻 Abort Project X。」" }
        ],
        options: [
            { text: "「我的 Input 是 FALSE，永遠不會後悔。」", score: 30, next: '117', reaction: "建成：「Execution Confirmed！我們準備 Launch！」" },
            { text: "「你覺得呢？」", score: 15, next: '117', reaction: "建成：「我的 Prediction Model 顯示 FALSE。」" },
            { text: "「我只後悔沒有早點認識你。」", score: 25, next: '117', reaction: "建成：「Data Accepted！我愛妳。」" }
        ]
    },

    {
        id: '117',
        steps: [
            { name: "旁白", text: "隔天早上，你醒來發現建成已經不見了。桌上留下一份用**加密 Code** 寫成的行程單，命名為**「Project X Launch Day」**。" },
            { name: "林建成 (訊息)", text: "「妳必須 Decrypt 這份 Task List，才能找到妳的 Primary Key。」" }
        ],
        options: [
            { text: "「我來解密這個愛的 Code！」", score: 20, next: '118', reaction: "旁白：你花了一點時間，成功解讀了第一條任務。" },
            { text: "「我直接打電話問他在哪裡。」", score: 5, next: '118', reaction: "旁白：你發現他的電話被轉接到了**「語音提示 Service」**，只會重複：Check Task 1！" },
            { text: "「我喜歡這個尋寶遊戲。」", score: 15, next: '118', reaction: "建成：「這是一個 High Value 的 Quest。」" }
        ]
    },
    {
        id: '118',
        steps: [
            { name: "旁白", text: "你解讀出的第一個任務是：回到你們第一次見面的**咖啡館**。" },
            { name: "林建成 (訊息)", text: "「這是我們的 Initial Data Input Location。」" }
        ],
        options: [
            { text: "立刻前往咖啡館。", score: 20, next: '119', reaction: "旁白：你感覺到一股強烈的浪漫電流。" },
            { text: "拍下 Code，發給建成：「我很喜歡！」", score: 15, next: '119', reaction: "建成回覆：「妳的 Feedback 是我的 Motivation。」" },
            { text: "在出門前先換上最漂亮的衣服。", score: 10, next: '119', reaction: "建成：「妳的 Appearance Score 已經是 Max 了。」" }
        ]
    },
    {
        id: '119',
        steps: [
            { name: "旁白", text: "在咖啡館，一位咖啡師走過來，遞給你一張小紙條。上面寫著一個 Excel 函數。" },
            { name: "小紙條", text: "「妳需要用 VLOOKUP ( 妳的咖啡品項 , 我的心跳 , 下一個地點, FALSE )。」" },
            { name: "你", text: "「我的咖啡品項是...焦糖瑪奇朵。」" }
        ],
        options: [
            { text: "詢問咖啡師：「那我的 Return Array 是什麼？」", score: 20, next: '120', reaction: "咖啡師笑著指了指櫃檯後面的一張照片。" },
            { text: "「這是建成的**『數據接力』**！」", score: 15, next: '120', reaction: "旁白：你感動地笑了。" },
            { text: "「我更喜歡 XLOOKUP。」", score: 5, next: '120', reaction: "咖啡師：「抱歉，我們這裡只提供經典 Formula。」" }
        ]
    },
    {
        id: '120',
        steps: [
            { name: "旁白", text: "你看到照片上是你們的「**秘密辦公室**」（閒置儲藏室）。" },
            { name: "你", text: "「下一個地點是...我們一起解決**『數據危機』**的地方！」" },
            { name: "林建成 (手機訊息)", text: "「我們必須回顧我們的**『共同奮鬥史 Log』**。」" }
        ],
        options: [
            { text: "馬上前往秘密辦公室。", score: 20, next: '121', reaction: "旁白：你懷著興奮的心情趕去。" },
            { text: "買一杯咖啡帶給建成。", score: 10, next: '121', reaction: "建成：「妳的 Caffeine Input 是我的 Energy Boost。」" },
            { text: "「這次的 Task Difficulty 很高！」", score: 15, next: '121', reaction: "建成：「只有高難度，才能匹配妳的 Level。」" }
        ]
    },
    {
        id: '121',
        steps: [
            { name: "旁白", text: "你來到秘密辦公室，裡面擺放著你們當初並肩作戰的那台舊電腦。" },
            { name: "旁白", text: "電腦螢幕亮著，上面顯示的正是你們一起修復的**「核心數據危機 Report」**的最終頁。" }
        ],
        options: [
            { text: "回想起當時的緊張和甜蜜。", score: 25, next: '122', reaction: "旁白：妳意識到，這裡是你們關係開始**不可逆轉**的地方。" },
            { text: "檢查 Report 的數據有沒有被修改。", score: 10, next: '122', reaction: "旁白：數據依然是 100% 準確。" },
            { text: "「建成，你在哪裡？」", score: 5, next: '122', reaction: "旁白：房間裡只有你，但空氣中似乎充滿了期待。" }
        ]
    },
    {
        id: '122',
        steps: [
            { name: "旁白", text: "正當你沉浸在回憶中時，建成推開門走了進來。他穿著你們第一次約會時的衣服，手中拿著一個小盒子。" },
            { name: "林建成", text: "「妳已經回顧了我們的 Source Data。現在，是時候 Commit **『最終 Formula』**了。」" }
        ],
        options: [
            { text: "走向他，緊緊抱住他。", score: 30, next: '123', reaction: "建成輕輕拍著妳的背：「妳的 Hug 是最美的 Data Visualization。」" },
            { text: "「你準備好了嗎？」", score: 15, next: '123', reaction: "建成：「我的 Preparation Score 是 100%。」" },
            { text: "「快給我看看盒子裡是什麼！」", score: 10, next: '123', reaction: "建成：「這是一個**『不可逆的 Primary Key』**。」" }
        ]
    },
    {
        id: '123',
        steps: [
            { name: "林建成", text: "「我們是從這裡開始，用 Excel 函數打破危機的。妳證明了**愛是最好的 Debug Tool**。」" },
            { name: "林建成", text: "「所有的 Data 都顯示：妳是我生命中唯一一個**『不能被 Filter Out 的 Value』**。」" }
        ],
        options: [
            { text: "「我也是，你是我唯一的 Trusted Source。」", score: 25, next: '124', reaction: "建成：「妳的 Reciprocity 讓我們的 Data Flow 趨於完美。」" },
            { text: "「你說的話還是這麼難懂。」", score: 10, next: '124', reaction: "建成：「但妳懂，對吧？」" },
            { text: "「快點，我的心跳 Frequency 已經 MAX 了！」", score: 20, next: '124', reaction: "建成：「我會盡快 Execute Final Code。」" }
        ]
    },
    {
        id: '124',
        steps: [
            { name: "旁白", text: "建成單膝跪地，打開了那個小盒子。裡面是一枚閃閃發光的戒指。" },
            { name: "林建成", text: "「這枚戒指，就是我為妳設計的**『不可逆的 Primary Key』**，它將永遠連結我們的兩條 Table。」" },
            { name: "林建成", text: "「它是一個**永遠不會有 NULL Value** 的承諾。」" }
        ],
        options: [
            { text: "「這是 Project X 的 Launch 嗎？」", score: 30, next: '125', reaction: "建成：「沒錯！Project X Launch Successful！」" },
            { text: "「它的 Score 一定很高。」", score: 15, next: '125', reaction: "建成：「它的 Value 是無限的。」" },
            { text: "感動得說不出話，輕輕點頭。", score: 25, next: '125', reaction: "建成：「妳的無聲 Input 也是 TRUE。」" }
        ]
    },
    {
        id: '125',
        steps: [
            { name: "林建成", text: "「親愛的 Data Partner，妳願意成為我**『終生的 Inner Join』**，讓我們的 Database 永遠合併嗎？」" },
            { name: "林建成", text: "「**妳願意 Join 我的 Database 嗎？**」" }
        ],
        options: [
            { text: "「我願意！我的 Input 是 YES！」", score: 40, next: '126', reaction: "建成興奮地跳起來：「Query Successful！Transaction Committed！」" },
            { text: "「這是個**無法撤銷**的 Commitment，你想清楚了嗎？」", score: 20, next: '126', reaction: "建成：「我的 Model 已經運行了無數次，結果永遠是 TRUE。」" },
            { text: "「我會將我的 Primary Key 交給你。」", score: 30, next: '126', reaction: "建成：「我會永遠 Safeguard 它！」" }
        ]
    },
    {
        id: '126',
        steps: [
            { name: "旁白", text: "建成小心翼翼地為你戴上戒指，並親吻了你。他終於完成了 Project X 的核心任務。" },
            { name: "林建成", text: "「我們現在是 Version 2.0。但 Project 還沒有完全 Close。」" },
            { name: "林建成", text: "「我還有最後一個 Report 要給妳看。」" }
        ],
        options: [
            { text: "「什麼 Report？」", score: 15, next: '127', reaction: "建成：「一個關於**『愛』**的 Visualization。」" },
            { text: "「我現在只想擁抱你。」", score: 20, next: '127', reaction: "建成：「這是 Non-Verbal Affection Output，我接受。」" },
            { text: "「我愛你，建成。」", score: 25, next: '127', reaction: "建成：「妳是我的 Eternal Formula。」" }
        ]
    },
    {
        id: '127',
        steps: [
            { name: "林建成", text: "「我們現在要去我們的**『情感 Heatmap』**最高點，完成最終的 Data Review。」" },
            { name: "林建成", text: "「走吧，我的未婚妻。」" }
        ],
        options: [
            { text: "「好，我們去觀星台！」", score: 20, next: '128', reaction: "建成：「妳的 Prediction Accuracy 總是這麼高！」" },
            { text: "「我已經等不及了。」", score: 15, next: '128', reaction: "建成：「我會盡力將 Travel Time 縮到最短。」" },
            { text: "「你叫我什麼？」", score: 25, next: '128', reaction: "建成：「我的 Future Wife。」" }
        ]
    },

    {
        id: '128',
        steps: [
            { name: "旁白", text: "你們回到你們第一次約會的觀星台。夜空下的星光，見證了你們這段從 Excel 開始的戀情。" },
            { name: "林建成", text: "「看！整個宇宙的 Data 都在這裡。」" },
            { name: "林建成", text: "「但對我來說，最重要的 Data，永遠只在我的 Report 裡。」" }
        ],
        options: [
            { text: "「你的 Report 永遠是我最好的 Visualization。」", score: 20, next: '129', reaction: "建成：「這是我的榮幸。」" },
            { text: "「我們找一顆星星作為我們的**『數據標記』**吧。」", score: 15, next: '129', reaction: "建成：「我已經將我們的名字註冊在 Sirius 星座上。」" },
            { text: "「你總是這麼浪漫。」", score: 10, next: '129', reaction: "建成：「因為妳讓我學會了**『情感的 Formula』**。」" }
        ]
    },
    {
        id: '129',
        steps: [
            { name: "旁白", text: "建成拿出他的筆電，打開了一個新的 Excel 文件。這就是他所說的最後一個 Report。" },
            { name: "林建成", text: "「這是我的**『最終 Summary Report』**。它不需要任何數字，只需要**形狀**。」" },
            { name: "林建成", text: "「我希望用 Excel 最純粹的格式，向妳表達我的愛。」" }
        ],
        options: [
            { text: "「我期待你的 Final Output。」", score: 20, next: '130', reaction: "建成：「它會是 MAX Score 的 Output。」" },
            { text: "「這是你最終的 Data Conclusion 嗎？」", score: 15, next: '130', reaction: "建成：「這是 Conclusion，也是 New Beginning。」" },
            { text: "「無論如何，我永遠愛你。」", score: 25, next: '130', reaction: "建成：「妳的 Final Input 讓我的 Report 完整了。」" }
        ]
    },
    {
        id: '130',
        steps: [
            { name: "旁白", text: "建成將筆電轉向你。螢幕上是一份試算表，上面的儲存格利用精心設計的 Conditional Formatting 拼成了一個巨大的**愛心形狀**。" },
            { name: "旁白", text: "這是 Excel 裡最浪漫的 Visualization。" }
        ],
        options: [
            { text: "「你怎麼做到的？」", score: 15, next: '131', reaction: "建成：「我用 ROW 和 COLUMN 參數的**『幾何 Formula』**，將愛具象化了。」" },
            { text: "「這個愛心比任何 3D Chart 都美。」", score: 20, next: '131', reaction: "建成：「因為它是用我的**心跳頻率**繪製的。」" },
            { text: "「這就是 Project X 的最終 Output 嗎？」", score: 25, next: '131', reaction: "建成：「沒錯，它的 Score 是 MAX。」" }
        ]
    },

    // -------------------- 最終場景 (原 ID: '29' -> 新 ID: '131') --------------------

    {
        id: '131',
        steps: [
            { name: "旁白", text: "（這是最後的關鍵時刻...）" },
            { name: "林建成", text: "林建成拿出一份試算表，上面的儲存格拼成了一個愛心形狀。" }
        ],
        options: [
            { text: "「這是條件式格式設定嗎？好美！」", score: 20, next: 'ending_check', reaction: "建成：「沒錯！是利用 $ROW$ 和 $COLUMN$ 參數算出來的！你竟然懂！」" },
            { text: "「你的欄寬好像沒有調整好。」", score: -30, next: 'ending_check', reaction: "建成：「（臉色蒼白）...對不起，是我太粗心了。」" },
            { text: "默默存檔並備份", score: 10, next: 'ending_check', reaction: "建成：「你真是個優秀的數據人，永遠把資料安全放在第一位。」" }
        ]
    },

    // -------------------- 保留的結局前場景 (ID: '29_A' 到 'ending_check_TOS') --------------------

    {
        id: '131_A', // 非純數字 ID 保留
        steps: [
            { name: "旁白", text: "（這是最後的關鍵時刻...）" },
            { name: "林建成", text: "林建成拿出一份試算表，上面都是滿滿的神魔之塔隊伍，就和彙整串一樣。" },
            { name: "旁白", text: "你看見了sheet欄目有一個特殊的名字，名曰：？？之塔" },
            { name: "旁白", text: "點開一看，那邊只有一行隊伍，但是缺少了隊長戰友，隊員格則是滿滿的建成照片，而優先度那裡也是空白的。" },
            { name: "旁白", text: "經過許久的相處，你早已知道這張試算表對你對他而言到底是什麼。" },
        ],
        options: [
            {
                text: "「？？分別代表的是你和我嗎？」", score: 0, next: 'ending_check_TOS',
                reaction: [{ name: "建成", text: "「沒錯！如果我是惡魔，那你就是我的神，我們相輔相成，我們已鑄偉業。」" },
                { name: "建成", text: "「在神魔之塔中，這將是一個不同以往的浪漫故事。」" }
                ]
            },
            {
                text: "「空白是我的位置嗎？」", score: 0, next: 'ending_check_TOS',
                reaction: [{ name: "建成", text: "「隊員無論如何多強，但只有隊長才能讓他們發揚光大。」" },
                { name: "建成", text: "「而你對我而言，是我的隊長。」" },
                ]
            },
            {
                text: "默默在[優先度]欄填寫優先度0", score: 0, next: 'ending_check_TOS',
                reaction:
                    [{ name: "建成", text: "建成對此感到開心。" },
                    { name: "建成", text: "「我見過許多的優先1,2,3。」" },
                    { name: "建成", text: "「但我知道你一定會寫0，因為優先度0是規矩的例外。」" },
                    { name: "建成", text: "「我和你的優先度一直都是最高的，你說對吧？」" },]
            },
        ]
    },

    // -------------------- 保留的 Silver 線路 (ID: '29_Silver' 到 'ending_check_TOSS') --------------------

    {
        id: '131_Silver',
        steps: [
            { name: "旁白", text: "（這是最後的關鍵時刻...）" },
            { name: "林建成", text: "林建成拿出一份試算表，上面都是滿滿的神魔之塔隊伍，就和彙整串一樣。" },
            { name: "旁白", text: "你看見了sheet欄目有一個特殊的名字，名曰：？？之塔" },
            { name: "旁白", text: "點開一看，那邊只有一行隊伍，但是缺少了隊長戰友，隊員格則是滿滿的建成照片，而優先度那裡也是空白的。" },
            { name: "旁白", text: "經過許久的相處，你早已知道這張試算表對你對他而言到底是什麼。" },
        ],
        options: [
            {
                text: "「？？分別代表的是你和我嗎？」", score: 0, next: 'ending_check_TOSS',
                reaction: [{ name: "建成", text: "「沒錯！如果我是惡魔，那你就是我的神，我們相輔相成，我們已鑄偉業。」" },
                { name: "建成", text: "「在神魔之塔中，這將是一個不同以往的浪漫故事。」" }
                ]
            },
            {
                text: "「空白是我的位置嗎？」", score: 0, next: 'ending_check_TOSS',
                reaction: [{ name: "建成", text: "「隊員無論如何多強，但只有隊長才能讓他們發揚光大。」" },
                { name: "建成", text: "「而你對我而言，是我的隊長。」" },
                ]
            },
            {
                text: "默默在[優先度]欄填寫優先度0", score: 0, next: 'ending_check_TOSS',
                reaction:
                    [{ name: "建成", text: "建成對此感到開心。" },
                    { name: "建成", text: "「我見過許多的優先1,2,3。」" },
                    { name: "建成", text: "「但我知道你一定會寫0，因為優先度0是規矩的例外。」" },
                    { name: "建成", text: "「我和你的優先度一直都是最高的，你說對吧？」" },]
            },
            {
                text: "你給我表是要你坐在我身上喘哦！？", score: 0, next: 'ending_check_TOSS',
                reaction:
                    [{ name: "建成", text: "建成已經沉醉在這份諾言中。" },
                    { name: "旁白", text: "至此這是第一章對第二章的喘承。" },
                    ]
            },
        ]
    },

    // -------------------- 結尾檢查點（留給遊戲邏輯處理，不作為新的場景 ID） --------------------
    // ending_check (原純數字線)
    // ending_check_TOS (神魔之塔線)
    // ending_check_TOSS (神魔之塔 Silver 線)
];