// === 判斷是否在 In-App 瀏覽器 (FB, IG, LINE 等) ===
function isInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || 
           (ua.indexOf("FBAV") > -1) || 
           (ua.indexOf("Instagram") > -1) || 
           (ua.indexOf("Line") > -1);
}

// === 背景滑鼠/手指互動光斑 ===
const updateMousePos = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    document.body.style.setProperty('--mouse-x', `${x}px`);
    document.body.style.setProperty('--mouse-y', `${y}px`);
};
window.addEventListener('mousemove', updateMousePos);
window.addEventListener('touchmove', updateMousePos, {passive: true});

if(typeof window !== 'undefined') {
    document.body.style.setProperty('--mouse-x', `${window.innerWidth/2}px`);
    document.body.style.setProperty('--mouse-y', `${window.innerHeight/2}px`);
}

// === 跳躍倉鼠邏輯與捕捉彩蛋 ===
const jumper = document.getElementById('random-jumper');
let jumperInterval = null;
let hamsterCatchCount = 0;

function moveJumper() {
    if (!jumper) return;
    const area = document.getElementById('capture-area');
    if (!area) return;
    const maxX = area.offsetWidth - 60;
    const maxY = area.offsetHeight - 60;
    if (maxX <= 0 || maxY <= 0) return;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    jumper.style.left = `${randomX}px`;
    jumper.style.top = `${randomY}px`;
}

function openRandomAdEgg() {
    const randomAd = adsList[Math.floor(Math.random() * adsList.length)];
    let adUrl = '#';
    if(randomAd.type === 'text' && randomAd.link) {
        adUrl = randomAd.link;
    } else if(randomAd.type === 'banner' && randomAd.html) {
        const match = randomAd.html.match(/href=['"](.*?)['"]/);
        if(match && match[1]) adUrl = match[1];
    }
    
    if(typeof gtag !== 'undefined') {
        gtag('event', 'catch_hamster_ad', {
            'ad_url': adUrl,
            'event_category': 'Easter_Egg'
        });
    }
    window.open(adUrl, '_blank');
}

if(jumper) {
    jumper.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        hamsterCatchCount++;
        if(hamsterCatchCount >= 3) {
            hamsterCatchCount = 0;
            openRandomAdEgg();
        } else {
            moveJumper();
        }
    });
}

// === 題庫資料 ===
const questions = [
    {
        q: "看到大盤暴跌 500 點，你的第一反應是？",
        imgUrl: "images/question1.png",
        options: [
            { text: "立刻把瓜子（本金）全部吐出來逃跑！", type: "I" }, 
            { text: "繼續睡，反正我不賣就不算賠🥹", type: "B" }, 
            { text: "心跳飆到 180，馬上開 APP 準備搶反彈！", type: "A" }, 
            { text: "喔是喔，那我要借錢加碼了🥵", type: "D" }
        ]
    },
    {
        q: "聽到隔壁籠子的倉鼠說某檔飼料概念股會噴，你會？",
        imgUrl: "images/question2.png",
        options: [
            { text: "馬上全下！他上次賺了 50 塊耶！", type: "D" },
            { text: "先觀察一下，等大家都買了我再買👀", type: "C" }, 
            { text: "當天買當天賣，賺兩口水錢就跑💨", type: "A" },
            { text: "不聽不聽，我只買大盤 ETF 飼料🙉", type: "H" } 
        ]
    },
    {
        q: "你的滾輪（看盤軟體）使用頻率？",
        imgUrl: "images/question3.png",
        options: [
            { text: "每天都開，沒開盤我也要看一下😛", type: "E" },
            { text: "一年打開幾次，看配息有沒有進來🤔", type: "F" },
            { text: "只有在群組有人貼對帳單的時候才打開😒", type: "C" },
            { text: "隨時打開準備截圖發限動📱", type: "D" }
        ]
    },
    {
        q: "被套牢 -20% 時，你在想什麼？",
        imgUrl: "images/question4.png",
        options: [
            { text: "「早知道昨天就賣了...」然後痛苦地按停損😖", type: "I" },
            { text: "「這家公司不會倒啦，當定存🙄」", type: "B" },
            { text: "「可惡，趕快再沖一波把虧的賺回來🥴」", type: "A" },
            { text: "「沒關係，這叫回踩支撐！準備噴出讓我換黃金鼠籠😵‍💫」", type: "E" }
        ]
    },
    {
        q: "終於賺了 5%！你會怎麼做？",
        imgUrl: "images/question5.png",
        options: [
            { text: "立刻賣掉！落袋為安，晚上加菜吃起司🤤", type: "A" },
            { text: "太神啦！冥燈終於發光了，趕快去 PTT 發對帳單收信徒！", type: "G" }, 
            { text: "才 5%，連塞牙縫都不夠，繼續放著😴", type: "B" },
            { text: "猶豫不決，結果隔天跌回原點😱", type: "C" }
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
            { text: "太好了！我不下單大家都不會遇到崩盤🥲", type: "G" },
            { text: "毫無感覺，日子照過，反正我是定期定額😐", type: "H" },
            { text: "沒有地方可以證明我的天賦了，好無聊🥱", type: "E" },
            { text: "太好了，終於不用看綠色的數字了😂", type: "I" }
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
        q: "你覺得寵物店老闆aka投顧老師的話可以信嗎？",
        imgUrl: "images/question9.png",
        options: [
            { text: "他說會飛就一定會飛！大師帶我飛！🤩", type: "F" },
            { text: "我只要跟他反著做就一定賺大錢😈", type: "G" },
            { text: "聽聽就好，重點是產業基本面的 ETF🧐", type: "H" },
            { text: "老闆是誰？我只相信我自己長存的定力😇", type: "B" }
        ]
    },
    {
        q: "投資對你來說，到底是什麼？",
        imgUrl: "images/question10.png",
        options: [
            { text: "為了填補以前斷頭的坑🙈", type: "I" },
            { text: "對抗通膨的過冬準備，跟著利率走就對了😅", type: "F" },
            { text: "一場永遠學不會教訓的輪迴🛞", type: "C" },
            { text: "去杜拜買黃金鼠籠的捷徑💰", type: "D" }
        ]
    }
];

// === 結果資料庫 ===
const resultsData = {
    "A": { 
        title: "當沖跑輪鼠", 
        imgUrl: "images/result-A.png",
        tags: ["⭐⭐ R", "戰鬥力：⭐⭐⭐", "手續費貢獻度 5 顆星"],
        desc: "每天在滾輪上狂奔，看起來很忙，但其實存款餘額都在原地踏步，甚至還倒扣手續費。你以為自己在做波段，其實只是券商的黃金打工仔，每天都在為營業員的年終獎金奮鬥。",
        stats: [3, 5, 1, 4, 5, 2]
    },
    "B": { 
        title: "囤積症存股鼠", 
        imgUrl: "images/result-B.png",
        tags: ["⭐⭐ N", "戰鬥力：⭐⭐⭐", "一張不賣，奇蹟自來"],
        desc: "只要買了就把 APP 刪掉，把股票當葵瓜子一樣塞在雙頰。遇到大跌也面不改色（其實是忘記看盤密碼）。你深信「一張不賣，奇蹟自來」，你的投資組合通常會安詳地傳給下一代。",
        stats: [1, 1, 5, 1, 1, 3]
    },
    "C": { 
        title: "高點站崗韭菜鼠", 
        imgUrl: "images/result-C.png",
        tags: ["⭐⭐ N", "戰鬥力：⭐", "最高點的守護者"],
        desc: "永遠在別人說「好香」的時候才衝進去，籠子總是被放在最高處吹冷風，大喊「山頂好冷」。你買入就是歷史高點，賣出就是絕地大反彈的起漲點。你是完美的反向指標，外資大戶們最愛的接盤俠。",
        stats: [1, 4, 2, 3, 5, 1]
    },
    "D": { 
        title: "歐印少年鼠", 
        imgUrl: "images/result-D.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐⭐", "要嘛暴富，要嘛睡公園"],
        desc: "什麼基本面都不看，只看迷因跟網路明牌，本金只有 3000 塊但槓桿開到最大。你的字典裡沒有「分批進場」，只有「全軍突擊」，所以你的心電圖跟你的未實現損益一樣刺激。",
        stats: [0, 5, 1, 5, 4, 2]
    },
    "E": { 
        title: "畫線玄學鼠", 
        imgUrl: "images/result-E.png",
        tags: ["⭐⭐⭐⭐ SR", "戰鬥力：⭐⭐", "分析猛如虎，操作二百五"],
        desc: "你的看盤軟體像是夜店的雷射燈光秀。你精通布林通道跟波浪理論，常常畫出完美的 W 底，然後隔天直接跌破支撐。大盤漲了你不上車，因為「還沒回踩支撐」。你每天在群組發分析圖，但實際上本金都在繳軟體訂閱費。",
        stats: [5, 1, 4, 2, 5, 2]
    },
    "F": { 
        title: "殖利率撿骨鼠", 
        imgUrl: "images/result-F.png",
        tags: ["⭐⭐⭐ R", "戰鬥力：⭐⭐⭐", "賺了股息，賠了價差"],
        desc: "你只看殖利率有沒有超過 8%。只要看到 8% 就高潮，左手換右手「貼息」也不在乎，以為號稱存股，其實是在存骨。你的資產總額就像冰塊一樣，在領息的過程中慢慢融化。",
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
        desc: "你早就看透了紅綠數字的虛妄，將靈魂獻給了大盤指數。不看財報、不聽明牌，薪水一發就閉眼扣款。在朋友熱烈討論妖股時，你總在旁邊喝茶微笑。你的人生跟組合一樣無聊，但 20 年後，你應該會是幫大家買單的大哥。",
        stats: [1, 5, 5, 1, 1, 4]
    },
    "I": { 
        title: "畢業打工鼠", 
        imgUrl: "images/result-I.png",
        tags: ["⭐⭐ N", "戰鬥力：0（多一顆都嫌多）", "教練，我想做多！"],
        desc: "選擇權歸零、期貨爆倉、融資斷頭，你經歷過股市裡所有最痛的死法。你發誓要「金盆洗手」，但其實只是本金沒了，正在速食店瘋狂打工兼跑外送。等下個月發薪水，你又會重新登入大喊：「教練，我想做多！」",
        stats: [2, 0, 5, 5, 3, 1]
    },
    "SSR": { 
        title: "華爾街巨型水豚", 
        imgUrl: "images/result-SSR.png",
        tags: ["⭐⭐⭐⭐⭐ SSR", "戰鬥力：MAX（不可測量）", "情緒極度穩定，因為規則是他定的"],
        desc: "情緒極度穩定，不管大盤怎麼跌都在泡溫泉，因為你就是莊家，你的一個噴嚏就能讓散戶倉鼠們的滾輪停轉。你不需要內線，你創造內線。交易對你來說不是賺錢，而是一種打發時間的休閒娛樂，你笑看著市場起起落落，轉眼間又賺了別人三年的年終獎金。",
        stats: [5, 5, 5, 2.5, 2.5, 5]
    }
};

let currentQ = 0;
let scores = {};
Object.keys(resultsData).forEach(key => {
    if(key !== "SSR") scores[key] = 0;
});

// === 廣告清單 ===
const adsList = [
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://adcenter.conn.tw/3QTuv?uid1=banner' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:500px;height:500px;' src='https://img.oeya.com/images/202503/1741011389297161392.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=d27a3aba0ef9bebb509838160af0d156" style="height:1px;width:1px;border:0" /><p>想要在股市裡穩定獲利嗎？試試看這款專業的選股工具，幫你找到下一檔潛力股！</p>` },
    { type: 'text', title: "精選推薦智能選股工具", desc: "別人抱著概念股早就在杜拜看豪宅？立即查看這款推薦工具，開始改變！", link: "https://easymall.co/3QTvp?uid1=link", btnText: "立即試試👉" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'>專屬推薦碼👉K3pLsC7FVk<a href='https://product.mchannles.com/3QVIy?uid1=banner' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202506/1750949360723606018.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=e43adc172d09ead3081c809c8d758519" style="height:1px;width:1px;border:0" /><p>覺得倉鼠很可愛? 你家也有毛小孩嗎? 快來試試客製化沖印製作獨家紀念品!</p>` },
    { type: 'text', title: "精選推薦好康", desc: "覺得倉鼠很可愛? 你家也有毛小孩嗎? 快來試試客製化沖印製作獨家紀念品!", link: "https://product.mchannles.com/3QVIy?uid1=banner", btnText: "專屬推薦碼👉K3pLsC7FVk" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://dreamstore.info/3QVJH?uid1=banner' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:500px;height:500px;' src='https://img.oeya.com/images/202409/1725901906373863199.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=fd8886b25d354fee60ee2698b6548cf7" style="height:1px;width:1px;border:0" /><p>股票資本彈藥不足? 也許第二份創業收入是個選擇! 試試看網路開店你也可以!</p>` },
    { type: 'text', title: "靠自己賺第二份收入", desc: "股票資本彈藥不足? 也許第二份創業收入是個選擇! 試試看網路開店你也可以!", link: "https://shopsquare.co/3QVJ9?uid1=link", btnText: "馬上試試👉" },
    { type: 'text', title: "是時候獎勵自己了", desc: "股票賺錢了嗎? 現在就是把錢錢變成喜歡樣子的時候!", link: "https://whitehippo.net/3QVJP?uid1=link", btnText: "上百種好康優惠商品都在Momo👉" },
    { type: 'text', title: "你想要持續精進嗎？", desc: "這次又輸大盤? 又被主力針對? 讓我們先練功再練金吧!", link: "https://adcenter.conn.tw/3QVJV?uid1=link", btnText: "查看精選投資書單👉" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://adcenter.conn.tw/3QVJc?uid1=banner' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202407/1719999024204948830.gif'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=9b34e0c46e1cfab21cb607848ef6ed98" style="height:1px;width:1px;border:0" /><p>Dyson舊換新活動開跑中</p>` },
    { type: 'text', title: "股市大風吹，Dyson送福利", desc: "不管你賺錢還是沒賺，快來搶全館優惠準沒錯，行動吧倉鼠！", link: "https://greenmall.info/3QVJZ?uid1=link", btnText: "馬上逛逛👉" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://whitehippo.net/3QVJn?uid1=banner&uid2=01' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:500px;height:500px;' src='https://img.oeya.com/images/202103/1615043857572623451.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=8d026d9ab902d8e4ee3adb603b29af40" style="height:1px;width:1px;border:0" /><p>今天已實現損益又翻倍了？今晚來點瑪莉屋披薩犒賞自己吧！</p>` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://pinkrose.info/3QVJq?uid1=banner&uid2=02' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:500px;height:500px;' src='https://img.oeya.com/images/202001/1578990373945031374.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=c4b75a4f8510b048971ed1073cc89057" style="height:1px;width:1px;border:0" /><p>今天已實現損益又翻倍了？今晚來點瑪莉屋披薩犒賞自己吧！</p>` },
    { type: 'text', title: "是時候今晚加菜了", desc: "今天已實現損益又翻倍了？今晚來點瑪莉屋披薩犒賞自己吧！", link: "https://igrape.net/3QVJl?uid1=link", btnText: "來去看菜單👉" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://dreamstore.info/3QVJt?uid1=banner&uid2=01' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202401/1706508645933040967.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=c01f8e5f013ca65b55931038093e16d7" style="height:1px;width:1px;border:0" />` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://easyfun.biz/3QVK3?uid1=banner&uid2=01' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202411/1730699332818282328.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=95b78da65caf987876781a5726895031" style="height:1px;width:1px;border:0" /><p>操盤累了別忘了帶家人吃好的！</p>` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://easyfun.biz/3QVK4?uid1=banner&uid2=02' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:600px;height:314px;' src='https://img.oeya.com/images/202010/1601943266600650440.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=4aa94ae63af663458b6980b8a17599c8" style="height:1px;width:1px;border:0" /><p>操盤累了別忘了帶家人吃好的！</p>` },
    { type: 'text', title: "看盤累了嗎？來幫自己補一下", desc: "每天盯盤勞心傷神？對自己好一點補充一下元氣吧！奕心生醫科技保健食品全館滿千折百超划算！", link: "https://igrape.net/3QVKB?uid1=link", btnText: "專屬優惠碼👉ichannel26100" },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'>專屬優惠碼👉ichannel26100<a href='https://igamepark.biz/3QVKH?uid1=banner&uid2=01' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;max-height:90%;width:480px;height:480px;' src='https://img.oeya.com/images/202501/1736846459946722456.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=e827801b921e91eb0ddfc5bdc99d7694" style="height:1px;width:1px;border:0" /><p>每天盯盤勞心傷神？對自己好一點補充一下元氣吧！奕心生醫科技保健食品全館滿千折百超划算！</p>` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'>專屬優惠碼👉ichannel26100<a href='https://shoppingfun.co/3QVKI?uid1=banner&uid2=02' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202410/1727771953467463705.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=1388ed2f26f2dd77fb709b2dc653ed37" style="height:1px;width:1px;border:0" /><p>每天盯盤勞心傷神？對自己好一點補充一下元氣吧！奕心生醫科技保健食品全館滿千折百超划算！</p>` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'>專屬優惠碼👉ichannel26100<a href='https://easymall.co/3QVKJ?uid1=banner&uid2=03' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202410/1727771879728788748.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=2af0b12810d35aef1bc3260d5a8cbade" style="height:1px;width:1px;border:0" /><p>每天盯盤勞心傷神？對自己好一點補充一下元氣吧！奕心生醫科技保健食品全館滿千折百超划算！</p>` },
    { type: 'banner', html: `<p style='padding:0;margin: 5px 0;color:#ff0000;'><a href='https://joymall.co/3QVKR?uid1=banner&uid2=03' target='_blank' style='display:inline-block;float:none;padding:0;margin:5px 0;color:#ff0000;text-decoration: none;'><img style='display:inline;border:0;max-width:100%;width:480px;height:480px;' src='https://img.oeya.com/images/202603/1773369798200233724.jpg'/></a></p><img src="https://adcenter.conn.tw/track/oeya_url_image.php?key=f8c573e978b0204f2e5b0ea6c9e5ff07" style="height:1px;width:1px;border:0" /><p>積少成多是投資美德，省小錢賺大錢!</p>` }
];

// === DOM 元素 ===
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    ad: document.getElementById('ad-screen')
};

// === 綁定事件 ===
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') gtag('event', 'click_restart', { 'event_category': 'Engagement' });
    location.reload();
});
document.getElementById('go-ad-btn').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') gtag('event', 'click_go_ad_page', { 'event_category': 'Engagement' });
    switchScreen('ad');
});

// === GA4 廣告點擊追蹤 ===
const adWrapper = document.getElementById('ad-content-wrapper');
if (adWrapper) {
    adWrapper.addEventListener('click', (e) => {
        const linkEl = e.target.closest('a');
        if (linkEl) {
            if(typeof gtag !== 'undefined') {
                gtag('event', 'click_ad_content', {
                    'ad_url': linkEl.href,
                    'event_category': 'Monetization'
                });
            }
        }
    });
}

// === Session 次數追蹤與彩蛋彈窗 ===
function checkQuizSessionCount() {
    let quizCount = parseInt(sessionStorage.getItem('quizCompleteCount') || '0');
    quizCount++;
    sessionStorage.setItem('quizCompleteCount', quizCount);

    if (quizCount % 3 === 0) {
        showEasterEggModal();
    }
}

function showEasterEggModal() {
    const modal = document.getElementById('easter-egg-modal');
    const adContainer = document.getElementById('modal-ad-container');
    if(!modal || !adContainer) return;

    const randomAd = adsList[Math.floor(Math.random() * adsList.length)];
    if (randomAd.type === 'banner') {
        adContainer.innerHTML = randomAd.html;
    } else if (randomAd.type === 'text') {
        adContainer.innerHTML = `
            <a href="${randomAd.link}" target="_blank" style="display:block; background:#FFF0D9; border:1px solid #F5D3A9; padding:15px; border-radius:8px; text-decoration:none; color:#4A3F35; box-shadow: 0 4px 10px rgba(209,138,80,0.1);">
                <strong style="display:block; margin-bottom:5px; font-size:16px;">${randomAd.title}</strong>
                <span style="font-size:14px; color:#6E5C4F; font-weight:bold;">${randomAd.btnText}</span>
            </a>
        `;
    }
    
    if(typeof gtag !== 'undefined') gtag('event', 'show_easter_egg_modal', { 'event_category': 'Easter_Egg' });
    modal.classList.add('show');
}

// 綁定關閉 Modal 按鈕
document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    document.getElementById('easter-egg-modal').classList.remove('show');
});

// === 分享與圖片下載相關功能 ===
function getShareText() {
    return `我測出來是「${document.getElementById('result-title').textContent}」！來測看看你的韭菜基因準不準！ 👉 `;
}
const baseUrl = window.location.href.split('?')[0]; 
const shareUrl = `${baseUrl}?openExternalBrowser=1`;

// === 優化版：顯示滿版遮罩讓使用者長按存圖 ===
function showImageModal(imgDataUrl) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.85); z-index: 99999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: 20px; box-sizing: border-box;
    `;

    const hint = document.createElement('div');
    hint.textContent = "💡 請「長按下方圖片」即可儲存至手機相簿";
    hint.style.cssText = "color: white; font-weight: bold; margin-bottom: 15px; font-size: 18px; text-align: center; animation: pulse 1.5s infinite;";

    const img = document.createElement('img');
    img.src = imgDataUrl;
    img.style.cssText = `
        max-width: 100%; max-height: 70vh; border-radius: 12px; 
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        -webkit-touch-callout: default; 
        user-select: none;
        -webkit-user-select: none;
        pointer-events: auto;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = "✖ 關閉預覽";
    closeBtn.style.cssText = "margin-top: 20px; padding: 10px 20px; background: #D18A50; color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 16px;";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    overlay.appendChild(hint);
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // 動態加入閃爍提示動畫
    if (!document.getElementById('pulse-anim')) {
        const style = document.createElement('style');
        style.id = 'pulse-anim';
        style.innerHTML = `@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }`;
        document.head.appendChild(style);
    }

    if(typeof gtag !== 'undefined') gtag('event', 'show_image_preview', { 'event_category': 'Engagement' });
}

// === 圖片下載主要邏輯 ===
document.getElementById('download-btn').addEventListener('click', () => {
    const btn = document.getElementById('download-btn');
    btn.textContent = '⏳ 產生中...';
    btn.disabled = true;
    
    // 防滾動鎖定，避免產生截圖時排版跑位
    document.body.style.overflow = 'hidden';

    // 保持原有的跳躍倉鼠拍照邏輯
    if (jumperInterval) {
        clearInterval(jumperInterval);
    }
    const jumper = document.getElementById('random-jumper');
    if (jumper) {
        jumper.style.transition = 'all 0.5s ease'; 
        jumper.style.top = 'auto'; 
        jumper.style.bottom = '20px'; 
        jumper.style.left = '20px';   
        const tooltip = jumper.querySelector('.hamster-tooltip');
        if (tooltip) {
            tooltip.textContent = "我乖乖拍照~";
        }
    }

    window.scrollTo(0, 0);
    setTimeout(() => {
        html2canvas(document.getElementById('capture-area'), {
            scale: 2, 
            useCORS: true, 
            backgroundColor: '#FFF6EC'
        }).then(canvas => {
            document.body.style.overflow = ''; // 恢復滾動
            const imgDataUrl = canvas.toDataURL('image/png');

            if (isInAppBrowser()) {
                showImageModal(imgDataUrl);
            } else {
                try {
                    const link = document.createElement('a');
                    link.download = 'hamster_result.png';
                    link.href = imgDataUrl;
                    link.click();
                } catch (e) {
                    console.error("下載失敗，降級為長按模式", e);
                    showImageModal(imgDataUrl); 
                }
            }

            btn.textContent = '📥 儲存專屬結果圖';
            btn.disabled = false;
            if(typeof gtag !== 'undefined') gtag('event', 'download_result');
            
        }).catch(err => {
            document.body.style.overflow = ''; // 恢復滾動
            console.error('截圖失敗', err);
            alert('截圖失敗，這可能是您的設備暫時不支援，請使用內建截圖功能！');
            btn.textContent = '📥 儲存專屬結果圖';
            btn.disabled = false;
        });
    }, 500); 
});

// LINE 分享
document.getElementById('share-line-btn').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') gtag('event', 'share', { method: 'LINE', content_type: 'quiz_result' });
    const text = encodeURIComponent(getShareText() + '\n' + shareUrl);
    window.open(`https://line.me/R/msg/text/?${text}`, '_blank');
});

// FB 分享
document.getElementById('share-fb-btn').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') gtag('event', 'share', { method: 'Facebook', content_type: 'quiz_result' });
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
});

// 複製連結
document.getElementById('share-copy-btn').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') gtag('event', 'share', { method: 'Copy_Link', content_type: 'quiz_result' });
    const fullText = getShareText() + shareUrl;
    navigator.clipboard.writeText(fullText).then(() => {
        alert('已複製結果與連結，快去貼給朋友吧！');
    });
});

// === 測驗流程邏輯 ===
function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function startQuiz() {
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
    
    const imgEl = document.getElementById('question-image');
    imgEl.style.opacity = '0.3';
    imgEl.src = qData.imgUrl;
    imgEl.onload = () => {
        imgEl.style.opacity = '1';
    };

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
    const maxScore = Math.max(...Object.values(scores));
    const topTypes = Object.keys(scores).filter(key => scores[key] === maxScore);

    let finalType = topTypes[Math.floor(Math.random() * topTypes.length)];
    
    if (Math.random() < 0.01) {
        finalType = "SSR";
    }
    
    const randomAd = adsList[Math.floor(Math.random() * adsList.length)];
    const contentWrapper = document.getElementById('ad-content-wrapper');
    try {
        if(contentWrapper) {
            if (randomAd.type === 'banner') {
                contentWrapper.innerHTML = randomAd.html;
            } else if (randomAd.type === 'text') {
                contentWrapper.innerHTML = `
                    <h3 id="ad-title" style="margin: 0 0 10px 0; color: #4A3F35; font-size: 18px;">${randomAd.title}</h3>
                    <p id="ad-desc" style="margin: 0 0 15px 0; color: #6E5C4F; font-size: 14px; line-height: 1.5;">${randomAd.desc}</p>
                    <a href="${randomAd.link}" id="ad-link" target="_blank" class="ad-btn" style="display: inline-block; background: #D18A50; color: #FFF; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: background 0.3s;">${randomAd.btnText}</a>
                `;
            }
        }
    } catch (e) {
        console.warn("[容錯機制] 廣告腳本或 DOM 寫入失敗。", e);
    }
    
    const res = resultsData[finalType];
    document.getElementById('result-title').textContent = res.title;
    
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

    switchScreen('result');

    setTimeout(() => {
        moveJumper();
        clearInterval(jumperInterval);
        jumperInterval = setInterval(moveJumper, 3000);
    }, 150);

    checkQuizSessionCount();

    if(res.stats) {
        setTimeout(() => {
            renderRadarChart(res.stats);
        }, 50);
    }

    if(typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', { 
            'ad_type': finalType 
        });
    }
}

let radarChartInstance = null;

function renderRadarChart(statsArray) {
    try {
        const canvas = document.getElementById('radarChart');
        if (!canvas) {
            console.warn("[容錯機制] 找不到 Chart Canvas，可能已被第三方擴充功能阻擋。");
            return;
        }
        const ctx = canvas.getContext('2d');
        
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
    } catch (error) {
        console.error("[容錯機制] Chart.js 繪圖過程遭中斷，已優雅降級維持主要介面顯示。", error);
    }
}

// === 圖片預載入 ===
window.addEventListener('load', () => {
    setTimeout(() => {
        questions.forEach(q => {
            const img = new Image();
            img.src = q.imgUrl;
        });
        Object.keys(resultsData).forEach(key => {
            const img = new Image();
            img.src = resultsData[key].imgUrl;
        });
    }, 1000);
});

// === 防拷貝與檢視原始碼邏輯 (放行圖片長按) ===
document.addEventListener('contextmenu', event => {
    // 判斷如果點擊的目標是圖片 (IMG)，則放行讓系統原生選單跳出
    if (event.target && event.target.tagName.toLowerCase() === 'img') {
        return; 
    }
    event.preventDefault();
});

document.addEventListener('keydown', event => {
    if (event.key === 'F12') {
        event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'i') {
        event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'u') {
        event.preventDefault();
    }
});