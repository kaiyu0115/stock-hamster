// 題庫與計分邏輯 (此處僅示範前2題，可將上面發想的10題填入)
const questions = [
    {
        q: "看到大盤暴跌 500 點，你的第一反應是？",
        imgUrl: "images/question1.png",
        options: [
            { text: "立刻把瓜子（本金）全部吐出來逃跑！", type: "C" },
            { text: "繼續睡，反正我不賣就不算賠。", type: "B" },
            { text: "心跳飆到 180，馬上開 APP 準備搶反彈！", type: "A" },
            { text: "喔是喔，那我要借錢加碼了。", type: "D" }
        ]
    },
    {
        q: "聽到隔壁籠子的老鼠說某檔飼料概念股會噴，你會？",
        imgUrl: "images/question2.png",
        options: [
            { text: "馬上全下！他上次賺了 50 塊耶！", type: "D" },
            { text: "先觀察一下，等大家都買了我再買。", type: "C" },
            { text: "當天買當天賣，賺兩口水錢就跑。", type: "A" },
            { text: "不聽不聽，我只買大盤 ETF 飼料。", type: "B" }
        ]
    },
    {
        q: "你的滾輪（看盤軟體）使用頻率？",
        imgUrl: "images/question3.png",
        options: [
            { text: "每 5 分鐘跑一次，半夜美股也要跑。", type: "A" },
            { text: "一年打開兩次，看配息有沒有進來。", type: "B" },
            { text: "只有在群組有人貼對帳單的時候才打開。", type: "C" },
            { text: "隨時打開準備截圖發限動。", type: "D" }
        ]
    },
    {
        q: "被套牢 -20% 時，你在想什麼？",
        imgUrl: "images/question4.png",
        options: [
            { text: "「早知道昨天就賣了...」然後痛苦地按停損。", type: "C" },
            { text: "「這家公司不會倒啦，當定存。」", type: "B" },
            { text: "「可惡，趕快再沖一波把虧的賺回來！」", type: "A" },
            { text: "「沒差啦我爸會給我零用錢。」", type: "D" }
        ]
    },
    {
        q: "終於賺了 5%！你會怎麼做？",
        imgUrl: "images/question5.png",
        options: [
            { text: "立刻賣掉！落袋為安，晚上加菜吃起司！", type: "A" },
            { text: "太神啦！發 IG 限動讓大家叫我股神！", type: "D" },
            { text: "才 5%，連塞牙縫都不夠，繼續放著。", type: "B" },
            { text: "猶豫不決，結果隔天跌回原點。", type: "C" }
        ]
    },
    {
        q: "夜深人靜時，你在籠子裡最常思考的問題是？",
        imgUrl: "images/question6.png",
        options: [
            { text: "明天開盤要先空哪一檔？", type: "A" },
            { text: "如果十年前我買了台積電...", type: "C" },
            { text: "下一檔可以翻 10 倍的妖股在哪？", type: "D" },
            { text: "(打呼聲)", type: "B" }
        ]
    },
    {
        q: "如果股市連續三天休市，你的感覺是？",
        imgUrl: "images/question7.png",
        options: [
            { text: "手癢到不行，只能去跑真實的滾輪。", type: "A" },
            { text: "毫無感覺，日子照過。", type: "B" },
            { text: "沒有地方可以證明我的天賦了，好無聊。", type: "D" },
            { text: "太好了，終於不用看綠色的數字了。", type: "C" }
        ]
    },
    {
        q: "你的飼料盆（投資組合）長怎樣？",
        imgUrl: "images/question8.png",
        options: [
            { text: "五顏六色什麼都有，但每種只有一點點。", type: "C" },
            { text: "裡面只有一種最穩的巨型葵瓜子。", type: "B" },
            { text: "空空如也，因為每天都在換新口味。", type: "A" },
            { text: "全都是高風險的辣味飼料。", type: "D" }
        ]
    },
    {
        q: "你覺得投顧老師（寵物店老闆）的話可以信嗎？",
        imgUrl: "images/question9.png",
        options: [
            { text: "他說會飛就一定會飛！大師帶我飛！", type: "C" },
            { text: "都是屁，只有我自己的眼光最準。", type: "D" },
            { text: "聽聽就好，我還是看我的 K 線圖。", type: "A" },
            { text: "老闆是誰？我只相信時間的力量。", type: "B" }
        ]
    },
    {
        q: "投資對你來說，到底是什麼？",
        imgUrl: "images/question10.png",
        options: [
            { text: "一種極限運動。", type: "A" },
            { text: "對抗通膨的過冬準備。", type: "B" },
            { text: "一場永遠學不會教訓的輪迴。", type: "C" },
            { text: "去杜拜買黃金鼠籠的捷徑。", type: "D" }
        ]
    }
];

// 結果資料庫
const resultsData = {
    "A": { title: "當沖跑輪鼠", imgUrl: "images/result-A.png", desc: "每天在滾輪上狂奔，看起來很忙，但存款餘額都在原地踏步。" },
    "B": { title: "囤積症存股鼠", imgUrl: "images/result-B.png", desc: "大跌也面不改色（其實是忘記看盤密碼）。" },
    "C": { title: "高點站崗韭菜鼠", imgUrl: "images/result-C.png", desc: "永遠在別人說好香的時候衝進去，吹著山頂的冷風。" },
    "D": { title: "歐印少年鼠", imgUrl: "images/result-D.png", desc: "本金只有3000塊但槓桿開到最大，這就是你的忍道。" },
    "SSR": { title: "華爾街巨型水豚", imgUrl: "images/result-SSR.png", desc: "情緒極度穩定，不管大盤怎麼跌都在泡溫泉，因為你就是莊家。" }
};

let currentQ = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };

const adConfigs = {
    "A": { // 當沖鼠：需要自動化或降手續費
        title: "跑輪跑得好累？讓機器人幫你跑！",
        desc: "盯盤盯到眼睛痛，手續費扣到心痛。試試全台最多人用的量化交易機器人，設定好策略，睡覺也在幫你賺水錢。",
        link: "https://your-affiliate-link.com/trading-bot?utm_source=quiz_result_A",
        btnText: "了解自動化交易"
    },
    "B": { // 存股鼠：需要高利息或定存工具
        title: "你的瓜子放著生灰塵？",
        desc: "既然都不賣，不如讓資產自己長大！開立高利活存數位帳戶，或是申購穩定配息 ETF，把時間價值最大化。",
        link: "https://your-affiliate-link.com/high-yield-account?utm_source=quiz_result_B",
        btnText: "領取高利活存優惠"
    },
    "C": { // 韭菜鼠：需要課程或指標工具
        title: "別再當山頂上的吹風少年",
        desc: "總是買在最高點？你需要的是紀律！來看看這堂萬人好評的「K線實戰籌碼課」，學會看懂主力動向，拒當接盤俠。",
        link: "https://your-affiliate-link.com/trading-course?utm_source=quiz_result_C",
        btnText: "查看課程試聽"
    },
    "D": { // 歐印鼠：喜歡高槓桿或博弈類娛樂
        title: "這裡的槓桿，絕對合你的胃口",
        desc: "喜歡一把定輸贏的快感？與其在股市裡被大戶玩，不如來這裡大顯身手。登入就送發財金，今晚的加菜金自己贏！",
        link: "https://your-affiliate-link.com/casino-game?utm_source=quiz_result_D", // 連結至滿貫大亨之類的推廣
        btnText: "領取新手發財金"
    },
    "SSR": { // 水豚：享受人生類
        title: "大佬，是時候享受人生了",
        desc: "交易只是日常，生活才是主軸。為自己安排一趟頂級的北海道溫泉之旅，把賺來的數字變成真實的回憶。",
        link: "https://your-affiliate-link.com/luxury-travel?utm_source=quiz_result_SSR",
        btnText: "查看頂級行程"
    }
};

// DOM 元素
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

// 綁定事件
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', () => location.reload());
document.getElementById('share-btn').addEventListener('click', async () => {
    const shareData = {
        title: '【超準測驗】你是哪種操盤倉鼠？',
        text: `我測出來是「${document.getElementById('result-title').textContent}」！來測看看你的韭菜基因準不準！ 👉 `,
        url: window.location.href,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            if(typeof gtag !== 'undefined') gtag('event', 'share', { method: 'Web Share API' });
        } else {
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('已複製結果與連結，快去貼給朋友吧！');
        }
    } catch (err) {
        console.log('分享取消或失敗:', err);
    }
});

function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function startQuiz() {
    // 【追蹤埋點】開始測驗
    if(typeof gtag !== 'undefined') gtag('event', 'quiz_start', { 'quiz_name': 'hamster_trader' });
    switchScreen('quiz');
    renderQuestion();
}

function renderQuestion() {
    if (currentQ >= questions.length) {
        showResult();
        return;
    }
    
    const qData = questions[currentQ];
    document.getElementById('question-text').textContent = qData.q;
    document.getElementById('progress-fill').style.width = `${((currentQ) / questions.length) * 100}%`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    document.getElementById('question-image').src = qData.imgUrl;

    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.text;
        btn.onclick = () => {
            document.querySelectorAll('#options-container button').forEach(b => b.disabled = true);
            btn.classList.add('selected');
            setTimeout(() => answerQuestion(opt.type), 250);
        };
        optionsContainer.appendChild(btn);
    });
}

function answerQuestion(type) {
    scores[type]++;
    currentQ++;
    renderQuestion();
}

function showResult() {
    // 結算邏輯
    const maxScore = Math.max(...Object.values(scores));
    const topTypes = Object.keys(scores).filter(key => scores[key] === maxScore);
    // 平手時隨機選一個
    let finalType = topTypes[Math.floor(Math.random() * topTypes.length)];
    
    // SSR 隱藏彩蛋抽卡機制 (0.2% 機率覆蓋結果)
    if (Math.random() < 0.002) {
        finalType = "SSR";
    }
    const targetAd = adConfigs[finalType];
    document.getElementById('ad-title').textContent = targetAd.title;
    document.getElementById('ad-desc').textContent = targetAd.desc;
    document.getElementById('ad-link').href = targetAd.link;
    document.getElementById('ad-link').textContent = targetAd.btnText;
    
    const res = resultsData[finalType];
    document.getElementById('result-title').textContent = res.title;
    document.getElementById('result-desc').textContent = res.desc;
    
    document.getElementById('result-image').src = res.imgUrl;

    // 將結果與廣告曝光送進 DataLayer，分析哪種老鼠的廣告點擊率最高
    if(typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', { 
            'ad_type': finalType 
        });
    }

    switchScreen('result');
}