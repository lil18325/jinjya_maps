// index.js

// ----------------------------------------------------
// 1. マップスタイル定義
// ----------------------------------------------------
const mapStyles = [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ visibility: "off" }] },
  ];
  
  // ----------------------------------------------------
  // 2. 神社データ
  // ----------------------------------------------------
  const shrines = [
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
  // 3. 選択肢データ構造
  // ----------------------------------------------------
  const SELECTION_DATA = {
      AREA: [
          { name: "北海道", target: { lat: 43.0, lng: 142.0 }, zoom: 5 },
          { name: "東北", target: { lat: 39.5, lng: 141.0 }, zoom: 6 },
          { name: "関東", target: { lat: 36.0, lng: 139.8 }, zoom: 8 },
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
  let map;
  let currentOpenMarker = null;
  const markers = [];
  let currentSelectionLevel = 'AREA';
  let selectedArea = null;
  let selectedPref = null;
  
  const initialCenter = { lat: 36.2, lng: 138.8 };
  const initialZoom = 5; 
  const labelShowZoom = 16;
  
  // ----------------------------------------------------
  // 5. マーカーコンテンツ作成関数
  // ----------------------------------------------------
  const createMarkerContent = (title, isEnlarged, showLabel = false) => {
    const content = document.createElement("div");
    content.className = "shrine-marker";
    if (isEnlarged) content.classList.add('is-enlarged');
    
    let labelClass = showLabel ? '' : 'hide-label';
    const imageSrc = isEnlarged ? './Jinjya_mark2.png' : './Jinjya_mark.png';
    
    content.innerHTML = 
        `<div class="pin-icon"><img src="${imageSrc}" alt="${title}アイコン" class="pin-image"></div>` + 
        `<div class="shrine-name ${labelClass}">${title}</div>`; 
    return content;
  };
  
  // ----------------------------------------------------
  // 6. 選択画面の動的表示とイベント処理 
  // ----------------------------------------------------
  const selectionTitle = document.getElementById("selection-title");
  const selectionButtonsContainer = document.getElementById("selection-buttons-container");
  const overlay = document.getElementById("region-selection-overlay");
  const backButton = document.getElementById("back-button");
  const areaSearchTrigger = document.getElementById("area-search-trigger"); 
  const detailPanel = document.getElementById("shrine-detail-panel");
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");
  
  const renderButtons = (data, level) => {
    selectionButtonsContainer.innerHTML = '';
    data.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item.name;
        button.className = 'selection-button';
        button.addEventListener('click', () => handleSelection(item, level));
        selectionButtonsContainer.appendChild(button);
    });
  };
  
  const handleSelection = (item, level) => {
    if (map && item.target) {
        map.setCenter(item.target);
        map.setZoom(item.zoom);
    }
  
    if (level === 'AREA') {
        selectedArea = item.name;
        const nextData = SELECTION_DATA.PREF[selectedArea];
        if (nextData) {
            selectionTitle.textContent = '都道府県を選択';
            renderButtons(nextData, 'PREF');
            currentSelectionLevel = 'PREF';
        } else {
            overlay.style.display = 'none';
        }
    } else if (level === 'PREF') {
        selectedPref = item.name;
        const nextData = SELECTION_DATA.CITY[selectedPref];
        if (nextData) {
            selectionTitle.textContent = '市町村を選択';
            renderButtons(nextData, 'CITY');
            currentSelectionLevel = 'CITY';
        } else {
             overlay.style.display = 'none';
        }
    } else if (level === 'CITY') {
        if (item.enablePins) {
            markers.forEach(marker => {
                marker.map = map;
                const showLabel = map.getZoom() >= labelShowZoom;
                marker.content = createMarkerContent(marker.title, false, showLabel); 
            });
            if (currentOpenMarker) {
                const showLabel = map.getZoom() >= labelShowZoom;
                currentOpenMarker.content = createMarkerContent(currentOpenMarker.title, false, showLabel);
            }
            detailPanel.style.display = 'none';
            currentOpenMarker = null;
        } else {
            markers.forEach(marker => marker.map = null);
        }
        overlay.style.display = 'none';
    }
    backButton.style.display = (level !== 'AREA' && overlay.style.display !== 'none') ? 'block' : 'none';
  };
  
  const resetPins = () => {
    map.setCenter(initialCenter);
    map.setZoom(initialZoom);
    markers.forEach(marker => {
        marker.map = map;
        marker.content = createMarkerContent(marker.title, false, false);
    });
  }
  
  backButton.addEventListener('click', () => {
    if (currentSelectionLevel === 'CITY') {
        const prevData = SELECTION_DATA.PREF[selectedArea];
        selectionTitle.textContent = '都道府県を選択';
        renderButtons(prevData, 'PREF');
        currentSelectionLevel = 'PREF';
        selectedPref = null;
        map.setCenter(SELECTION_DATA.AREA.find(a => a.name === selectedArea).target);
        map.setZoom(SELECTION_DATA.AREA.find(a => a.name === selectedArea).zoom);
    } else if (currentSelectionLevel === 'PREF') {
        selectionTitle.textContent = 'エリアを選択';
        renderButtons(SELECTION_DATA.AREA, 'AREA');
        currentSelectionLevel = 'AREA';
        resetPins();
        selectedArea = null;
        selectedPref = null;
    }
    backButton.style.display = (currentSelectionLevel !== 'AREA') ? 'block' : 'none';
  });
  
  areaSearchTrigger.addEventListener('click', () => {
    selectionTitle.textContent = 'エリアを選択';
    renderButtons(SELECTION_DATA.AREA, 'AREA');
    currentSelectionLevel = 'AREA';
    selectedArea = null;
    selectedPref = null;
    backButton.style.display = 'none';
    overlay.style.display = 'flex';
    resetPins();
  });
  
  // ----------------------------------------------------
  // 7. 地図初期化関数 (メイン)
  // ----------------------------------------------------
  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    map = new Map(document.getElementById("map"), {
        zoom: initialZoom, 
        center: initialCenter,
        mapId: "7198dffbcc95141941689647",
    });
  
    shrines.forEach(shrine => {
        const shrineMarker = new AdvancedMarkerElement({
            position: { lat: shrine.lat, lng: shrine.lng },
            map: map, // ご要望通り初期から表示にしています
            title: shrine.title,
            content: createMarkerContent(shrine.title, false, false),
        });
        markers.push(shrineMarker);
  
        shrineMarker.addListener("click", () => {
            if (currentOpenMarker && currentOpenMarker !== shrineMarker) {
                const showLabel = map.getZoom() >= labelShowZoom;
                currentOpenMarker.content = createMarkerContent(currentOpenMarker.title, false, showLabel);
            }
            if (currentOpenMarker !== shrineMarker) {
                shrineMarker.content = createMarkerContent(shrine.title, true, true);
                detailPanel.style.display = 'flex'; 
                detailTitle.textContent = shrine.title;
                map.panTo({ lat: shrine.lat + 0.003, lng: shrine.lng });
                const detailURL = `./${shrine.detailFile}`;
                detailDescription.innerHTML = `<p>${shrine.description}</p><p style="margin-top: 10px;"><a href="${detailURL}" class="detail-link">⛩️ 詳細ページへ移動</a></p>`;
                currentOpenMarker = shrineMarker; 
            } else {
                shrineMarker.content = createMarkerContent(shrine.title, false, map.getZoom() >= labelShowZoom);
                detailPanel.style.display = 'none';
                currentOpenMarker = null; 
            }
        });
    });
  
    map.addListener("zoom_changed", () => {
        const currentZoom = map.getZoom();
        const showLabels = currentZoom >= labelShowZoom;
        markers.forEach(marker => {
            if (marker.map) {
                const isEnlarged = currentOpenMarker === marker;
                marker.content = createMarkerContent(marker.title, isEnlarged, showLabels || isEnlarged);
            }
        });
    });
  
    overlay.style.display = 'none';
  }
  
  // グローバルに公開
  window.initMap = initMap;