// 題庫與計分邏輯 (此處僅示範前2題，可將上面發想的10題填入)
const questions = [
    {
        q: "看到大盤暴跌 500 點，你的第一反應是？",
        imgUrl: "images/question1.png",
        options: [
            { text: "立刻把瓜子（本金）全部吐出來逃跑！", type: "I" }, 
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
            { text: "不聽不聽，我只買大盤 ETF 飼料。", type: "H" } 
        ]
    },
    {
        q: "你的滾輪（看盤軟體）使用頻率？",
        imgUrl: "images/question3.png",
        options: [
            { text: "每 5 分鐘跑一次，大盤沒開我也要畫線。", type: "E" },
            { text: "一年打開兩次，看配息有沒有進來。", type: "F" },
            { text: "只有在群組有人貼對帳單的時候才打開。", type: "C" },
            { text: "隨時打開準備截圖發限動。", type: "D" }
        ]
    },
    {
        q: "被套牢 -20% 時，你在想什麼？",
        imgUrl: "images/question4.png",
        options: [
            { text: "「早知道昨天就賣了...」然後痛苦地按停損。", type: "I" },
            { text: "「這家公司不會倒啦，當定存。」", type: "B" },
            { text: "「可惡，趕快再沖一波把虧的賺回來！」", type: "A" },
            { text: "「沒關係，這叫回踩支撐，準備黃金交叉！」", type: "E" }
        ]
    },
    {
        q: "終於賺了 5%！你會怎麼做？",
        imgUrl: "images/question5.png",
        options: [
            { text: "立刻賣掉！落袋為安，晚上加菜吃起司！", type: "A" },
            { text: "太神啦！這證明了我的反指標連動效應！", type: "G" }, 
            { text: "才 5%，連塞牙縫都不夠，繼續放著。", type: "B" },
            { text: "猶豫不決，結果隔天跌回原點。", type: "C" }
        ]
    },
    {
        q: "夜深人靜時，你在籠子裡最常思考的問題是？",
        imgUrl: "images/question6.png",
        options: [
            { text: "明天開盤要先空哪一檔？", type: "I" },
            { text: "如果十年前我買了台積電...", type: "C" },
            { text: "下一檔可以翻 10 倍的妖股在哪？", type: "D" },
            { text: "這張 K 棒的均線糾結得很漂亮...", type: "E" }
        ]
    },
    {
        q: "如果股市連續三天休市，你的感覺是？",
        imgUrl: "images/question7.png",
        options: [
            { text: "太好了！我不下單大家都不會遇到崩盤。", type: "G" },
            { text: "毫無感覺，日子照過，反正我是定期定額。", type: "H" },
            { text: "沒有地方可以證明我的天賦了，好無聊。", type: "E" },
            { text: "太好了，終於不用看綠色的數字了。", type: "I" }
        ]
    },
    {
        q: "你的飼料盆（投資組合）長怎樣？",
        imgUrl: "images/question8.png",
        options: [
            { text: "清一色都是殖利率 8% 以上的飼料。", type: "F" },
            { text: "裡面只有一種最穩的巨型大盤指數葵瓜子。", type: "H" },
            { text: "空空如也，因為每天都在換新口味。", type: "A" },
            { text: "全都是高風險的辣味選擇權飼料。", type: "G" }
        ]
    },
    {
        q: "你覺得投顧老師（寵物店老闆）的話可以信嗎？",
        imgUrl: "images/question9.png",
        options: [
            { text: "他說會飛就一定會飛！大師帶我飛！", type: "F" },
            { text: "我只要跟他反著做就一定賺大錢。", type: "G" },
            { text: "聽聽就好，重點是產業基本面的 ETF。", type: "H" },
            { text: "老闆是誰？我只相信我自己長存的定力。", type: "B" }
        ]
    },
    {
        q: "投資對你來說，到底是什麼？",
        imgUrl: "images/question10.png",
        options: [
            { text: "為了填補以前期貨斷頭的坑。", type: "I" },
            { text: "對抗通膨的過冬準備，跟著通膨走就對了。", type: "F" },
            { text: "一場永遠學不會教訓的輪迴。", type: "C" },
            { text: "去杜拜買黃金鼠籠的捷徑。", type: "D" }
        ]
    }
];

// 結果資料庫
const resultsData = {
    "A": { 
        title: "當沖跑輪鼠", 
        imgUrl: "images/result-A.png",
        tags: ["⭐⭐ N", "戰鬥力：⭐⭐", "手續費貢獻度 5 顆星"],
        desc: "每天在滾輪上狂奔，看起來很忙，但其實存款餘額都在原地踏步，甚至還倒扣手續費。你以為自己在做波段，其實只是券商的黃金打工仔，每天都在為營業員的年終獎金奮鬥。",
        stats: [3, 5, 1, 4, 5, 2]
    },
    "B": { 
        title: "囤積症存股鼠", 
        imgUrl: "images/result-B.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐⭐", "一張不賣，奇蹟自來"],
        desc: "只要買了就把 APP 刪掉，把股票當葵瓜子一樣塞在雙頰。遇到大跌也面不改色（其實是忘記看盤密碼）。你深信「一張不賣，奇蹟自來」，你的投資組合通常會安詳地傳給下一代。",
        stats: [1, 1, 5, 1, 1, 3]
    },
    "C": { 
        title: "高點站崗韭菜鼠", 
        imgUrl: "images/result-C.png",
        tags: ["⭐⭐ N", "戰鬥力：⭐", "最高點的守護者"],
        desc: "永遠在別人說「好香」的時候才衝進去，籠子總是被放在最高處吹冷風。你買入就是歷史高點，賣出就是絕地大反彈的起漲點。你是完美的反向指標，外資大戶們最愛的接盤俠。",
        stats: [1, 4, 2, 3, 5, 1]
    },
    "D": { 
        title: "歐印少年鼠", 
        imgUrl: "images/result-D.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐⭐⭐", "要嘛暴富，要嘛睡公園"],
        desc: "什麼基本面都不看，只看迷因跟網路明牌，本金只有 3000 塊但槓桿開到最大。你的字典裡沒有「分批進場」，只有「全軍突擊」。你的心電圖跟你的未實現損益一樣刺激。",
        stats: [0, 5, 1, 5, 4, 2]
    },
    "E": { 
        title: "畫線玄學鼠", 
        imgUrl: "images/result-E.png",
        tags: ["⭐⭐⭐⭐ SR", "戰鬥力：⭐⭐", "分析猛如虎，操作二百五"],
        desc: "你的看盤軟體像是夜店的雷射燈光秀。你精通布林通道跟波浪理論。大盤漲了你不上車，因為「還沒回踩支撐」。你每天在群組發分析圖，但實際上本金都在繳軟體訂閱費。",
        stats: [5, 1, 4, 2, 5, 2]
    },
    "F": { 
        title: "殖利率撿骨鼠", 
        imgUrl: "images/result-F.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐", "賺了股息，賠了價差"],
        desc: "你只看殖利率有沒有超過 8%。就算股價跌了 30%，你也會自我催眠「太棒了，趕快攤平！」你是券商眼中的乖寶寶，但你的資產總額就像冰塊一樣，在領息的過程中慢慢融化。",
        stats: [2, 2, 5, 1, 2, 3]
    },
    "G": { 
        title: "反指標冥燈鼠", 
        imgUrl: "images/result-G.png",
        tags: ["⭐⭐⭐⭐⭐ SSR", "戰鬥力：⭐", "股市裡的因果律武器"],
        desc: "傳說中的地獄倒楣鬼。你買進的瞬間，聯準會就會宣布升息；你停損的那一秒，那檔股票就會立刻拉漲停。你不用看盤，你的體質就是大盤的避險指標。現在大家願意每個月付你 500 塊，求你下單前先預告一聲。",
        stats: [1, 5, 1, 3, 4, 0]
    },
    "H": { 
        title: "佛系指數教徒鼠", 
        imgUrl: "images/result-H.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐⭐", "無聊但會贏"],
        desc: "你早就看透了紅綠數字的虛妄，將靈魂獻給了大盤指數。不看財報、不聽明牌，薪水一發就閉眼扣款。在朋友熱烈討論妖股時，你總在旁邊喝茶微笑。你的人生跟組合一樣無聊，但 20 年後，你絕對是幫大家買單的大哥。",
        stats: [1, 5, 5, 1, 1, 4]
    },
    "I": { 
        title: "畢業打工鼠", 
        imgUrl: "images/result-I.png",
        tags: ["⭐⭐ N", "戰鬥力：0", "教練，我想做多！"],
        desc: "選擇權歸零、期貨爆倉、融資斷頭，你經歷過股市裡所有最痛的死法。你發誓要「金盆洗手」，但其實只是本金沒了，正在速食店瘋狂打工。等下個月發薪水，你又會重新登入大喊：「教練，我想做多！」",
        stats: [2, 0, 5, 5, 3, 1]
    },
    "SSR": { 
        title: "華爾街巨型水豚", 
        imgUrl: "images/result-SSR.png",
        tags: ["⭐⭐⭐⭐⭐ SSR", "戰鬥力：MAX", "情緒極度穩定，因為規則是他定的"],
        desc: "情緒極度穩定，不管大盤怎麼跌都在泡溫泉，因為你就是莊家。你的一個噴嚏就能讓散戶倉鼠們的滾輪停轉。交易對你來說不是賺錢，而是一種打發時間的休閒娛樂。",
        stats: [5, 5, 5, 2, 1, 5]
    }
};

let currentQ = 0;
// 動態產生 scores 物件，排除 SSR
let scores = {};
Object.keys(resultsData).forEach(key => {
    if(key !== "SSR") scores[key] = 0;
});

const adConfigs = {
    "A": { title: "跑輪跑得好累？讓機器人幫你跑！", desc: "盯盤盯到眼睛痛，手續費扣到心痛。試試全台最多人用的量化交易機器人，設定好策略，睡覺也在幫你賺水錢。", link: "#", btnText: "了解自動化交易" },
    "B": { title: "你的瓜子放著生灰塵？", desc: "既然都不賣，不如讓資產自己長大！開立高利活存數位帳戶，或是申購穩定配息 ETF，把時間價值最大化。", link: "#", btnText: "領取高利活存優惠" },
    "C": { title: "別再當山頂上的吹風少年", desc: "總是買在最高點？你需要的是紀律！來看看這堂萬人好評的「K線實戰籌碼課」，學會看懂主力動向，拒當接盤俠。", link: "#", btnText: "查看課程試聽" },
    "D": { title: "這裡的槓桿，絕對合你的胃口", desc: "喜歡一把定輸贏的快感？與其在股市裡被大戶玩，不如來這裡大顯身手。登入就送發財金，今晚的加菜金自己贏！", link: "#", btnText: "領取新手發財金" },
    "E": { title: "突破支撐壓力，然後呢？", desc: "畫線畫得再美，不如紀律執行。推薦這款專業級看盤軟體，自訂警示功能，不漏接任何訊號。", link: "#", btnText: "免費試用專業版" },
    "F": { title: "高股息還是高陷阱？", desc: "別掉進左手換右手的陷阱！我們為您嚴選連續 10 年填息的「尊爵存股組合」，穩穩領息不怕跌。", link: "#", btnText: "查看高填息名單" },
    "G": { title: "反向指標也能賺？", desc: "既然自己買什麼跌什麼，不如看看高手怎麼操作。加入 VIP 籌碼觀察室，跟著主力一起動作。", link: "#", btnText: "解密主力籌碼" },
    "H": { title: "既然無聊，那來點樂子吧？", desc: "投資交給指數，生活交給自己。最新上映的強檔電影票券優惠中，快帶家人一起去看！", link: "#", btnText: "購買優惠電影票" },
    "I": { title: "東山再起，從零開始", desc: "本金歸零沒關係，哪裡跌倒哪裡站起來。小額信貸專案，首期超低利率，助您重返榮耀（警語：謹慎理財）。", link: "#", btnText: "評估貸款額度" },
    "SSR": { title: "大佬，是時候享受人生了", desc: "交易只是日常，生活才是主軸。為自己安排一趟頂級的北海道溫泉之旅，把賺來的數字變成真實的回憶。", link: "#", btnText: "查看頂級行程" }
};

// DOM 元素
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    ad: document.getElementById('ad-screen')
};

// 綁定事件
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', () => location.reload());
document.getElementById('go-ad-btn').addEventListener('click', () => switchScreen('ad'));

function getShareText() {
    return `我測出來是「${document.getElementById('result-title').textContent}」！來測看看你的韭菜基因準不準！ 👉 `;
}
const shareUrl = window.location.href;

// 圖片下載
document.getElementById('download-btn').addEventListener('click', () => {
    const btn = document.getElementById('download-btn');
    btn.textContent = '⏳ 產生中...';
    btn.disabled = true;

    // 確保回到頂部避免 html2canvas 截圖位移
    window.scrollTo(0, 0);
    
    html2canvas(document.getElementById('capture-area'), {
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#FFF6EC'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'hamster_result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.textContent = '📥 儲存專屬結果圖';
        btn.disabled = false;
        if(typeof gtag !== 'undefined') gtag('event', 'download_result');
    }).catch(err => {
        console.error('截圖失敗', err);
        alert('截圖失敗，請重新嘗試。');
        btn.textContent = '📥 儲存專屬結果圖';
        btn.disabled = false;
    });
});

// LINE 分享
document.getElementById('share-line-btn').addEventListener('click', () => {
    const text = encodeURIComponent(getShareText() + '\n' + shareUrl);
    window.open(`https://line.me/R/msg/text/?${text}`, '_blank');
});

// FB 分享 (僅支援帶網址)
document.getElementById('share-fb-btn').addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
});

// 複製連結
document.getElementById('share-copy-btn').addEventListener('click', () => {
    const fullText = getShareText() + shareUrl;
    navigator.clipboard.writeText(fullText).then(() => {
        alert('已複製結果與連結，快去貼給朋友吧！');
    });
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
    
    // 渲染 tags
    const tagsContainer = document.getElementById('result-tags');
    tagsContainer.innerHTML = '';
    if (res.tags && res.tags.length > 0) {
        res.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag-badge';
            span.textContent = t;
            tagsContainer.appendChild(span);
        });
    }

    document.getElementById('result-desc').textContent = res.desc;
    document.getElementById('result-image').src = res.imgUrl;

    if(res.stats) {
        renderRadarChart(res.stats);
    }

    // 將結果與廣告曝光送進 DataLayer，分析哪種老鼠的廣告點擊率最高
    if(typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', { 
            'ad_type': finalType 
        });
    }

    switchScreen('result');
}

let radarChartInstance = null;

function renderRadarChart(statsArray) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    // 銷毀舊圖表以避免重疊
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }
    
    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['技術力', '執行力', '信仰力', '賭徒值', '盯盤率', '強運度'],
            datasets: [{
                label: '能力分佈',
                data: statsArray,
                backgroundColor: 'rgba(209, 138, 80, 0.4)',
                borderColor: '#D18A50',
                pointBackgroundColor: '#D18A50',
                borderWidth: 2,
                pointRadius: 3
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: { display: false, stepSize: 1 },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    angleLines: { color: 'rgba(0,0,0,0.1)' },
                    pointLabels: {
                        font: { size: 12, family: "'Noto Sans TC', sans-serif" },
                        color: '#4A3F35'
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}