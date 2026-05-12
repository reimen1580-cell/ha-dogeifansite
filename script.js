// 芸人データの定義：ここを編集・追加すると自動でページに反映されます
const performers = [
    {
        name: "レイザーラモンHG",
        duo: "レイザーラモン",
        style: "ピン芸・漫才",
        intro: "「フォーーーー！！」の叫びと共に、圧倒的な肉体美と情熱で日本中を席巻。ハードゲイキャラの先駆者です。",
        image: "img/gei.jpg",
        pos: "center 20%" // 上から20%の位置（顔の位置）を優先 
 },
    {
        name: "狩野英孝",
        duo: "ピン芸人",
        style: "コント・歌ネタ",
        intro: "「ラーメン・つけ麺・僕イケメン！」でおなじみ。唯一無二の天然キャラと、中毒性のある歌ネタが魅力です。",
        image: "img/kano.jpg",
        pos: "center top"
    },
    {
        name: "小島よしお",
        duo: "ピン芸人",
        style: "ピン芸",
        intro: "「そんなの関係ねぇ！」のフレーズはもはや国民的。現在は子供向け教育系動画など、幅広い層に支持されています。",
        image: "img/kojima.jpg"
    },
    {
        name: "サンシャイン池崎",
        duo: "ピン芸人",
        style: "ピン芸",
        intro: "空前絶後の超絶怒涛のピン芸人。自己紹介だけで会場を爆発的な熱気に包み込む、ハイテンションの極致です。",
        image: "img/sann.jpg"
    },
    {
        name: "とにかく明るい安村",
        duo: "ピン芸人",
        style: "ピン芸",
        intro: "「安心してください、穿いてますよ」。イギリスのオーディション番組でも大絶賛された、世界基準の裸ネタ。 ",
        image: "img/yasumura.jpg"
    }
];

// HTML要素を取得
const cardGrid = document.getElementById('cardGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// 【機能】カードを画面に描画する
function displayCards(data) {
    // 一旦グリッドの中身を空にする
    cardGrid.innerHTML = ""; 
    
    // データがない場合の処理
    if (data.length === 0) {
        cardGrid.innerHTML = "<p style='grid-column: 1/-1; text-align:center; padding:50px;'>該当する芸人が見つかりませんでした。</p>";
        return;
    }

    // 1件ずつカードを作成
    data.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${p.image}')"></div>
            <div class="card-content">
                <h3 class="card-name">${p.name}</h3>
                <p class="card-sub">${p.duo} / ${p.style}</p>
                <p style="margin-bottom:15px; font-size:0.9rem; color:#555; height:3.6em; overflow:hidden;">${p.intro}</p>
                <button class="card-btn" onclick="openModal('${p.name}')">詳細プロフィール</button>
            </div>
        `;
        cardGrid.appendChild(card);
    });
}

// 【機能】検索・フィルタリング
function filterData() {
    const text = searchInput.value.toLowerCase();
    const genre = genreFilter.value;

    const filtered = performers.filter(p => {
        const matchName = p.name.toLowerCase().includes(text);
        const matchGenre = genre === "" || p.style.includes(genre);
        return matchName && matchGenre;
    });

    displayCards(filtered);
}

// 【機能】モーダル（詳細画面）を開く
function openModal(name) {
    const p = performers.find(item => item.name === name);
    modalBody.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <img src="${p.image}" style="width:100%; max-width:300px; border-radius:8px;">
        </div>
        <h2 style="color:#003366; margin-bottom:10px; border-bottom:2px solid #003366; display:inline-block;">${p.name}</h2>
        <p style="margin-top:10px;"><strong>所属：</strong>${p.duo}</p>
        <p><strong>芸風：</strong>${p.style}</p>
        <div style="background:#f4f4f4; padding:15px; border-radius:5px; margin-top:20px;">
            <p style="line-height:1.8;">${p.intro}</p>
        </div>
        <p style="font-size:0.8rem; color:#888; margin-top:20px;">※この情報はファンサイトによる紹介です。</p>
    `;
    modal.style.display = "block";
}

// モーダルを閉じる設定
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

// 入力があった時にフィルタリングを実行する設定
searchInput.addEventListener('input', filterData);
genreFilter.addEventListener('change', filterData);

// 最初にページを開いた時に全データを表示する
displayCards(performers);
