// index.ts

// ----------------------------------------------------
// 1. マップスタイル定義 (デフォルトピン非表示)
// ----------------------------------------------------
const mapStyles: google.maps.MapTypeStyle[] = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ visibility: "off" }] },
];

// ----------------------------------------------------
// 2. TypeScriptのインターフェースと神社データ (エリア/都道府県情報追加)
// ----------------------------------------------------
interface Shrine {
  title: string;
  lat: number;
  lng: number;
  description: string;
  detailFile: string;
  // 🔽 エリアと都道府県の情報を追加
  area: string;
  pref: string;
}

const shrines: Shrine[] = [
  // 八王子市内の14社のデータ
  // ※ エリア検索は「関東」「東京都」「八王子市」
  { title: "八幡八雲神社", lat: 35.6616, lng: 139.3352, description: "〒192-0063　東京都八王子市元横山町2丁目15-27", detailFile: "jinjya_1.html", area: "関東", pref: "東京都" },
  
  { title: "子安神社", lat: 35.6593, lng: 139.3413, description: "〒192-0046　東京都八王子市明神町4-10-3", detailFile: "koyasu.html", area: "関東", pref: "東京都" },

  { title: "多賀神社", lat: 35.6640, lng: 139.3131, description: "〒192-0051　東京都八王子市元本郷町4-9-21", detailFile: "taga.html", area: "関東", pref: "東京都" },

  { title: "産千代稲荷神社", lat: 35.6589, lng: 139.3246, description: "〒192-0054　東京都八王子市小門町82", detailFile: "sanchiyo.html", area: "関東", pref: "東京都" },

  { title: "日枝神社", lat: 35.6652, lng: 139.3555, description: "〒192-0045　東京都八王子市大和田町4-4-6", detailFile: "hie_oyoko.html", area: "関東", pref: "東京都" },

  { title: "今熊神社", lat: 35.7110, lng: 139.2162, description: "〒192-0151　東京都八王子市上川町19", detailFile: "imakuma.html", area: "関東", pref: "東京都" },

  { title: "天満社", lat: 35.6472, lng: 139.3531, description: "〒192-0906　東京都八王子市北野町550-1", detailFile: "tenmasha.html", area: "関東", pref: "東京都" },

  { title: "日吉八王子神社", lat: 35.6613, lng: 139.3116, description: "〒193-0836　東京都八王子市日吉町8-20", detailFile: "hiyoshi_hachioji.html", area: "関東", pref: "東京都" },

  { title: "八幡神社 (八王子市千人町)", lat: 35.6577, lng: 139.2765, description: "〒193-0826　東京都八王子市元八王子町3-2284", detailFile: "hachiman_sennin.html", area: "関東", pref: "東京都" },

  { title: "日枝神社", lat: 35.6828, lng: 139.2760, description: "〒193-0822　東京都八王子市弐分方町2", detailFile: "hie_ozu.html", area: "関東", pref: "東京都" },

  { title: "諏訪神社 (八王子市諏訪町)", lat: 35.6780, lng: 139.2897, description: "〒193-0812　東京都八王子市諏訪町1", detailFile: "suwa_suwa.html", area: "関東", pref: "東京都" },

  { title: "住吉神社琴平神社合社（宮尾神社）", lat: 35.6720, lng: 139.2152, description: "〒192-0156　東京都八王子市上恩方町2089", detailFile: "miyao.html", area: "関東", pref: "東京都" },

  { title: "諏訪神社 (八王子市大楽寺町)", lat: 35.6191, lng: 139.3520, description: "〒192-0375　東京都八王子市鑓水1070", detailFile: "suwa_dairakuji.html", area: "関東", pref: "東京都" },

  { title: "住吉神社 (八王子市小比企町)", lat: 35.7136, lng: 139.2861, description: "〒192-0001　東京都八王子市戸吹町503", detailFile: "sumiyoshi_obiki.html", area: "関東", pref: "東京都" },
];

// ----------------------------------------------------
// 3. 選択肢データ構造 (ボタン形式用)
// ----------------------------------------------------
type SelectionLevel = 'AREA' | 'PREF' | 'CITY';

interface LocationItem {
    name: string;
    target: { lat: number, lng: number };
    zoom: number;
    enablePins?: boolean;
}

const SELECTION_DATA: { [key in SelectionLevel]: any } = {
    AREA: [
        { name: "北海道", target: { lat: 43.0, lng: 142.0 }, zoom: 5 },
        { name: "東北", target: { lat: 39.5, lng: 141.0 }, zoom: 6 },
        { name: "関東", target: { lat: 36.0, lng: 139.8 }, zoom: 8 }, // 東京周辺
        { name: "中部", target: { lat: 36.0, lng: 137.5 }, zoom: 6 },
        { name: "近畿", target: { lat: 34.8, lng: 135.5 }, zoom: 7 },
        { name: "中国", target: { lat: 34.8, lng: 134.0 }, zoom: 6 },
        { name: "四国", target: { lat: 33.7, lng: 133.5 }, zoom: 7 },
        { name: "九州・沖縄", target: { lat: 32.5, lng: 130.5 }, zoom: 5 },
    ],
    PREF: {
        "関東": [
            { name: "東京都", target: { lat: 35.68, lng: 139.7 }, zoom: 10 },
            { name: "神奈川県", target: { lat: 35.45, lng: 139.6 }, zoom: 10 },
            { name: "埼玉県", target: { lat: 35.9, lng: 139.6 }, zoom: 10 },
            { name: "千葉県", target: { lat: 35.6, lng: 140.1 }, zoom: 10 },
            { name: "茨城県", target: { lat: 36.3, lng: 140.4 }, zoom: 9 }, 
            { name: "栃木県", target: { lat: 36.5, lng: 139.8 }, zoom: 9 },
            { name: "群馬県", target: { lat: 36.4, lng: 139.1 }, zoom: 9 },
        ],
    },
    CITY: {
        "東京都": [
            { name: "八王子市", target: { lat: 35.6582, lng: 139.3387 }, zoom: 14, enablePins: true },
            { name: "その他の市町村...", target: { lat: 35.68, lng: 139.7 }, zoom: 10, enablePins: false },
        ],
    }
};

// ----------------------------------------------------
// 4. グローバル変数と定数
// ----------------------------------------------------
let map: google.maps.Map;
let currentOpenMarker: any | null = null;
const markers: any[] = [];
// 選択状態の追跡
let currentSelectionLevel: SelectionLevel = 'AREA';
let selectedArea: string | null = null;
let selectedPref: string | null = null;

const initialCenter = { lat: 36.2, lng: 138.8 };
const initialZoom = 5; 
const labelShowZoom = 16; // 🔽 ズームレベル16以上でラベルを表示 🔽


// ----------------------------------------------------
// 5. マーカーコンテンツ作成関数
// ----------------------------------------------------
const createMarkerContent = (title: string, isEnlarged: boolean, showLabel: boolean = false): HTMLElement => {
  const content = document.createElement("div");
  content.className = "shrine-marker";
  
  if (isEnlarged) {
      content.classList.add('is-enlarged');
  }
  
  // showLabelがfalseの場合にのみ 'hide-label' クラスを適用
  let labelClass = showLabel ? '' : 'hide-label';

  // isEnlargedに基づいて画像パスを決定
  const imageSrc = isEnlarged ? './Jinjya_mark2.png' : './Jinjya_mark.png';
  
  content.innerHTML = 
      `<div class="pin-icon">
          <img src="${imageSrc}" alt="${title}アイコン" class="pin-image"> 
      </div>` + 
      `<div class="shrine-name ${labelClass}">${title}</div>`; 
  return content;
};


// ----------------------------------------------------
// 6. 選択画面の動的表示とイベント処理 
// ----------------------------------------------------

// 画面要素の取得
const selectionTitle = document.getElementById("selection-title") as HTMLElement;
const selectionButtonsContainer = document.getElementById("selection-buttons-container") as HTMLElement;
const overlay = document.getElementById("region-selection-overlay") as HTMLElement;
const backButton = document.getElementById("back-button") as HTMLButtonElement;
const areaSearchTrigger = document.getElementById("area-search-trigger") as HTMLButtonElement; 
const detailPanel = document.getElementById("shrine-detail-panel") as HTMLElement;
const detailTitle = document.getElementById("detail-title") as HTMLElement;
const detailDescription = document.getElementById("detail-description") as HTMLElement;


// ボタンを生成し、コンテナに追加する
const renderButtons = (data: LocationItem[], level: SelectionLevel) => {
  selectionButtonsContainer.innerHTML = '';
  
  data.forEach(item => {
      const button = document.createElement('button');
      button.textContent = item.name;
      button.className = 'selection-button';
      
      button.addEventListener('click', () => handleSelection(item, level));
      selectionButtonsContainer.appendChild(button);
  });
};

// 選択肢がクリックされたときの処理
const handleSelection = (item: LocationItem & { enablePins?: boolean }, level: SelectionLevel) => {
  
  // 1. 地図の移動
  if (map && item.target) {
      map.setCenter(item.target);
      map.setZoom(item.zoom);
  }

  // 2. ステップの更新と次画面の表示
  if (level === 'AREA') {
      selectedArea = item.name;
      const nextData = SELECTION_DATA.PREF[selectedArea];
      if (nextData) {
          selectionTitle.textContent = '都道府県を選択';
          renderButtons(nextData as LocationItem[], 'PREF');
          currentSelectionLevel = 'PREF';
      } else {
          alert(`${item.name} のデータは現在定義されていません。地図を表示します。`);
          overlay.style.display = 'none'; // 選択肢がない場合は閉じる
          // resetPins()は呼ばず、既存のピン表示は維持する
      }
  } else if (level === 'PREF') {
      selectedPref = item.name;
      const nextData = SELECTION_DATA.CITY[selectedPref];
      if (nextData) {
          selectionTitle.textContent = '市町村を選択';
          renderButtons(nextData as LocationItem[], 'CITY');
          currentSelectionLevel = 'CITY';
      } else {
           alert(`${item.name} のデータは現在定義されていません。地図を表示します。`);
           overlay.style.display = 'none'; // 選択肢がない場合は閉じる
           // resetPins()は呼ばず、既存のピン表示は維持する
      }
  } else if (level === 'CITY') {
      // 最終選択 
      if (item.enablePins) {
          
          // 🚨 八王子ビューへの移行 🚨
          markers.forEach(marker => {
              marker.map = map; // ピンを表示
              
              // 🔽 修正点: ズームレベルに応じてラベルの初期表示を制御
              const showLabel = map.getZoom() >= labelShowZoom;
              marker.content = createMarkerContent(marker.title, false, showLabel); 
          });
          
          // パネルリセット
          if (currentOpenMarker) {
               // 🔽 修正点: ズームレベルに応じてラベルの初期表示を制御
              const showLabel = map.getZoom() >= labelShowZoom;
              currentOpenMarker.content = createMarkerContent(currentOpenMarker.title, false, showLabel);
          }
          detailPanel.style.display = 'none';
          detailTitle.textContent = '神社を選択してください';
          detailDescription.innerHTML = '';
          currentOpenMarker = null;

      } else {
          alert(`${item.name} の神社データは現在登録されていません。`);
          markers.forEach(marker => marker.map = null); // ピンを非表示
      }
      
      // 選択画面を閉じる (最終選択が完了したため)
      overlay.style.display = 'none';
  }
  
  // 戻るボタンの表示制御
  backButton.style.display = (level !== 'AREA' && overlay.style.display !== 'none') ? 'block' : 'none';
};

// ピンを非表示にし、地図を日本全体に戻すユーティリティ関数
const resetPins = () => {
  map.setCenter(initialCenter);
  map.setZoom(initialZoom);
  // 全マーカーを表示に戻す (ズームリスナーがラベルを非表示にする)
  markers.forEach(marker => {
      marker.map = map;
      marker.content = createMarkerContent(marker.title, false, false);
  });
}

// 戻るボタンの処理
backButton.addEventListener('click', () => {
  if (currentSelectionLevel === 'CITY') {
      // CITY -> PREF へ戻る
      const prevData = SELECTION_DATA.PREF[selectedArea!];
      selectionTitle.textContent = '都道府県を選択';
      renderButtons(prevData as LocationItem[], 'PREF');
      currentSelectionLevel = 'PREF';
      selectedPref = null;
      
      // 地図を関東レベルのターゲットに戻す
      map.setCenter(SELECTION_DATA.AREA.find(a => a.name === selectedArea)!.target);
      map.setZoom(SELECTION_DATA.AREA.find(a => a.name === selectedArea)!.zoom);
      
  } else if (currentSelectionLevel === 'PREF') {
      // PREF -> AREA へ戻る
      selectionTitle.textContent = 'エリアを選択';
      renderButtons(SELECTION_DATA.AREA as LocationItem[], 'AREA');
      currentSelectionLevel = 'AREA';
      
      // 地図を日本全体に戻す
      resetPins();

      selectedArea = null;
      selectedPref = null;
  }
  
  // 戻るボタンの表示制御
  backButton.style.display = (currentSelectionLevel !== 'AREA') ? 'block' : 'none';
});

// 🟢 エリア検索トリガーの処理 🟢
areaSearchTrigger.addEventListener('click', () => {
  // 現在の状態に戻す (初期状態に戻す)
  selectionTitle.textContent = 'エリアを選択';
  renderButtons(SELECTION_DATA.AREA as LocationItem[], 'AREA');
  currentSelectionLevel = 'AREA';
  selectedArea = null;
  selectedPref = null;
  backButton.style.display = 'none';
  
  // オーバーレイを表示
  overlay.style.display = 'flex';
  
  // 地図を日本全体に戻す
  resetPins();
});

// ----------------------------------------------------
// 7. 地図初期化関数 (メイン) 【修正あり】
// ----------------------------------------------------

async function initMap() {
  
const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

// Mapの初期化 (初期状態：日本全体)
map = new Map( 
    document.getElementById("map") as HTMLElement,
    {
      zoom: initialZoom, 
      center: initialCenter,
      mapId: "7d4a5985732b944d765aae7a",
      styles: mapStyles,
    }
);

// ----------------------------------------------------
// マーカーの作成とクリックリスナー 
// ----------------------------------------------------
shrines.forEach(shrine => {
    const position = { lat: shrine.lat, lng: shrine.lng };

    const shrineMarker: any = new AdvancedMarkerElement({
        position: position,
        map: map, // 🔽 修正点: 初期から地図に表示 🔽
        title: shrine.title,
        content: createMarkerContent(shrine.title, false, false), // 初期ズームではラベル非表示
    });
    
    markers.push(shrineMarker);

    shrineMarker.addListener("click", () => {
        
        // 1. 排他制御
        if (currentOpenMarker && currentOpenMarker !== shrineMarker) {
            const showLabel = map.getZoom() >= labelShowZoom;
            currentOpenMarker.content = createMarkerContent(currentOpenMarker.title, false, showLabel);
        }

        // 2. クリックされたマーカーの状態をトグル
        if (currentOpenMarker !== shrineMarker) {
            // 開く処理: isEnlarged=true, showLabel=true (強制的に表示)
            shrineMarker.content = createMarkerContent(shrine.title, true, true);

            detailPanel.style.display = 'flex'; 
            detailTitle.textContent = shrine.title;

            // 地図の中心を調整し、ピンがパネルに隠れないようにする
            const centerOffset = 0.003; 
            map.panTo({ lat: shrine.lat + centerOffset, lng: shrine.lng });

            const detailURL = `./${shrine.detailFile}`;

            detailDescription.innerHTML = 
                `<p>${shrine.description}</p>` + 
                `<p style="margin-top: 10px;">
                    <a href="${detailURL}" class="detail-link">
                        ⛩️ 詳細ページへ移動
                    </a>
                </p>`;

            currentOpenMarker = shrineMarker; 
        } else {
            // 閉じる処理
            const showLabel = map.getZoom() >= labelShowZoom;
            shrineMarker.content = createMarkerContent(shrine.title, false, showLabel);

            detailPanel.style.display = 'none';
            detailTitle.textContent = '神社を選択してください';
            detailDescription.innerHTML = '';

            currentOpenMarker = null; 
        }
    });
});

// 🔽 修正点: ズーム変更リスナーを追加 🔽
map.addListener("zoom_changed", () => {
    const currentZoom = map.getZoom() ?? initialZoom;
    const showLabels = currentZoom >= labelShowZoom;
    
    markers.forEach(marker => {
        // 地図に表示されているマーカーのみ処理
        if (marker.map) {
             // 既に開いているピン（currentOpenMarker）は常にラベル表示（true）を維持
            const isEnlarged = currentOpenMarker === marker;
            marker.content = createMarkerContent(marker.title, isEnlarged, showLabels || isEnlarged);
        }
    });
});
// ----------------------------------------------------


// 🔽 初期表示ロジックの修正 🔽
// 初期表示時はエリア検索オーバーレイは非表示
overlay.style.display = 'none';
}

// ----------------------------------------------------
// 8. グローバル変数として initMap を公開 
// ----------------------------------------------------
declare global {
interface Window {
  initMap: () => void;
}
}
window.initMap = initMap;
export {};

