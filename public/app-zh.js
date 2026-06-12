// 回声树洞 - 中文版本
// 全球记忆地图，支持中英文切换

const moods = {
  all: "全部",
  happy: "开心",
  sad: "伤心",
  lost: "失落",
  angry: "愤怒",
  anxious: "焦虑",
  calm: "平静",
  moved: "感动",
  missing: "想念",
  grateful: "感谢",
  confused: "迷茫",
  unspecified: "未标记"
};

const statusLabels = {
  pending: "待审核",
  approved: "已发布",
  rejected: "未通过"
};

const moodColors = {
  happy: "#e49b38",
  sad: "#5a7fb8",
  lost: "#7f8792",
  angry: "#c94a4a",
  anxious: "#d67a3e",
  calm: "#5da5a5",
  moved: "#e8956d",
  missing: "#b87ba3",
  grateful: "#d4a574",
  confused: "#8b7ba8",
  unspecified: "#696969"
};

const legacyMoodMap = {
  hopeful: "happy",
  tender: "moved",
  relieved: "calm",
  tired: "lost",
  secret: "confused",
  lonely: "lost"
};

const chinaProvinces = ["上海市","云南省","内蒙古自治区","北京市","台湾省","吉林省","四川省","天津市","宁夏回族自治区","安徽省","山东省","山西省","广东省","广西壮族自治区","新疆生产建设兵团","新疆维吾尔自治区","江苏省","江西省","河北省","河南省","浙江省","海南省","湖北省","湖南省","澳门特别行政区","甘肃省","福建省","西藏自治区","贵州省","辽宁省","重庆市","陕西省","青海省","香港特别行政区","黑龙江省"];

const chinaCities = {"四川省":["阿坝藏族羌族自治州","巴中市","成都市","达州市","德阳市","甘孜藏族自治州","广安市","广元市","乐山市","凉山彝族自治州","泸州市","眉山市","绵阳市","南充市","内江市","攀枝花市","遂宁市","雅安市","宜宾市","资阳市","自贡市"],"新疆维吾尔自治区":["阿克苏地区","阿勒泰地区","巴音郭楞蒙古自治州","博尔塔拉蒙古自治州","昌吉回族自治州","哈密市","和田地区","喀什地区","克拉玛依市","克孜勒苏柯尔克孜自治州","塔城地区","吐鲁番市","乌鲁木齐市","伊犁哈萨克自治州"],"内蒙古自治区":["阿拉善盟","巴彦淖尔市","包头市","赤峰市","鄂尔多斯市","呼和浩特市","呼伦贝尔市","通辽市","乌海市","乌兰察布市","锡林郭勒盟","兴安盟"],"西藏自治区":["阿里地区","昌都市","拉萨市","林芝市","那曲市","日喀则市","山南市"],"陕西省":["安康市","宝鸡市","汉中市","商洛市","铜川市","渭南市","西安市","咸阳市","延安市","榆林市"],"安徽省":["安庆市","蚌埠市","亳州市","池州市","滁州市","阜阳市","合肥市","淮北市","淮南市","黄山市","六安市","马鞍山市","宿州市","铜陵市","芜湖市","宣城市"],"贵州省":["安顺市","毕节市","贵阳市","六盘水市","黔东南苗族侗族自治州","黔南布依族苗族自治州","黔西南布依族苗族自治州","铜仁市","遵义市"],"河南省":["安阳市","鹤壁市","济源市","焦作市","开封市","洛阳市","漯河市","南阳市","平顶山市","濮阳市","三门峡市","商丘市","新乡市","信阳市","许昌市","郑州市","周口市","驻马店市"],"辽宁省":["鞍山市","本溪市","朝阳市","大连市","丹东市","抚顺市","阜新市","葫芦岛市","锦州市","辽阳市","盘锦市","沈阳市","铁岭市","营口市"],"吉林省":["白城市","白山市","吉林市","辽源市","四平市","松原市","通化市","延边朝鲜族自治州","长春市"],"甘肃省":["白银市","定西市","甘南藏族自治州","嘉峪关市","金昌市","酒泉市","兰州市","临夏回族自治州","陇南市","平凉市","庆阳市","天水市","武威市","张掖市"],"广西壮族自治区":["百色市","北海市","崇左市","防城港市","贵港市","桂林市","河池市","贺州市","来宾市","柳州市","南宁市","钦州市","梧州市","玉林市"],"河北省":["保定市","沧州市","承德市","邯郸市","衡水市","廊坊市","秦皇岛市","石家庄市","唐山市","邢台市","张家口市"],"云南省":["保山市","楚雄彝族自治州","大理白族自治州","德宏傣族景颇族自治州","迪庆藏族自治州","红河哈尼族彝族自治州","昆明市","丽江市","临沧市","怒江傈僳族自治州","普洱市","曲靖市","文山壮族苗族自治州","西双版纳傣族自治州","玉溪市","昭通市"],"北京市":["北京市"],"山东省":["滨州市","德州市","东营市","菏泽市","济南市","济宁市","聊城市","临沂市","青岛市","日照市","泰安市","威海市","潍坊市","烟台市","枣庄市","淄博市"],"湖南省":["常德市","郴州市","衡阳市","怀化市","娄底市","邵阳市","湘潭市","湘西土家族苗族自治州","益阳市","永州市","岳阳市","张家界市","长沙市","株洲市"],"江苏省":["常州市","淮安市","连云港市","南京市","南通市","苏州市","宿迁市","泰州市","无锡市","徐州市","盐城市","扬州市","镇江市"],"广东省":["潮州市","东莞市","佛山市","广州市","河源市","惠州市","江门市","揭阳市","茂名市","梅州市","清远市","汕头市","汕尾市","韶关市","深圳市","阳江市","云浮市","湛江市","肇庆市","中山市","珠海市"],"黑龙江省":["大庆市","大兴安岭地区","哈尔滨市","鹤岗市","黑河市","鸡西市","佳木斯市","牡丹江市","七台河市","齐齐哈尔市","双鸭山市","绥化市","伊春市"],"山西省":["大同市","晋城市","晋中市","临汾市","吕梁市","朔州市","太原市","忻州市","阳泉市","运城市","长治市"],"湖北省":["鄂州市","恩施土家族苗族自治州","黄冈市","黄石市","荆门市","荆州市","潜江市","神农架林区","十堰市","随州市","天门市","武汉市","仙桃市","咸宁市","襄阳市","孝感市","宜昌市"],"福建省":["福州市","龙岩市","南平市","宁德市","莆田市","三明市","厦门市","漳州市","泉州市"],"江西省":["抚州市","赣州市","吉安市","景德镇市","九江市","南昌市","萍乡市","上饶市","新余市","宜春市","鹰潭市"],"宁夏回族自治区":["固原市","石嘴山市","吴忠市","银川市","中卫市"],"青海省":["果洛藏族自治州","海北藏族自治州","海东市","海南藏族自治州","海西蒙古族藏族自治州","黄南藏族自治州","西宁市","玉树藏族自治州"],"海南省":["海口市","三沙市","三亚市","儋州市"],"浙江省":["杭州市","湖州市","嘉兴市","金华市","丽水市","宁波市","衢州市","绍兴市","台州市","温州市","舟山市"],"上海市":["上海市"],"天津市":["天津市"],"重庆市":["重庆市"],"澳门特别行政区":["澳门特别行政区"],"香港特别行政区":["香港特别行政区"],"台湾省":["台湾省"],"新疆生产建设兵团":["新疆生产建设兵团"]};

const allCountries = ["不丹","东帝汶","中国","中非","丹麦","乌克兰","乌兹别克斯坦","乌干达","乌拉圭","乍得","也门","争议地区","亚美尼亚","以色列","伊拉克","伊朗","伯利兹","佛得角","俄罗斯联邦","保加利亚","克罗地亚","冈比亚","冰岛","几内亚","几内亚比绍","列支敦士登","刚果(金)","刚果（布）","利比亚","利比里亚","前南马其顿","加拿大","加纳","加蓬","加那利群岛","匈牙利","北马里亚纳","南乔治亚岛和南桑德韦奇岛","南极洲","南非","博茨瓦纳","卡塔尔","卢旺达","卢森堡","印度","印度尼西亚","危地马拉","厄瓜多尔","厄立特里亚","叙利亚","古巴","吉尔吉斯斯坦","吉布提","哈萨克斯坦","哥伦比亚","哥斯达黎加","喀麦隆","图瓦卢","土库曼斯坦","土耳其","圣卢西亚","圣基茨和尼维斯","圣多美和普林西比","圣文森特和格林纳丁斯","圣皮埃尔和密克隆","圣诞岛","圣赫勒拿","圣马力诺","圭亚那","坦桑尼亚","埃及","埃塞俄比亚","基里巴斯","塔吉克斯坦","塞内加尔","塞尔维亚","塞拉利昂","塞浦路斯","塞舌尔","墨西哥","多哥","多米尼克","多米尼加","奥地利","委内瑞拉","威克岛(美)","孟加拉国","安哥拉","安圭拉","安提瓜和巴布达","安道尔","密克罗尼西亚联邦","尼加拉瓜","尼日利亚","尼日尔","尼泊尔","巴哈马","巴基斯坦","巴巴多斯","巴布亚新几内亚","巴拉圭","巴拿马","巴林","巴西","布基纳法索","布维岛","布隆迪","希腊","帕劳","库克群岛","开曼群岛","德国","意大利","所罗门群岛","托克劳","拉脱维亚","挪威","捷克","摩尔多瓦","摩洛哥","摩纳哥","文莱","斐济","斯威士兰","斯洛伐克","斯洛文尼亚","斯瓦尔巴岛和扬马延岛","斯里兰卡","新加坡","新喀里多尼亚","新西兰","日本","智利","朝鲜","柬埔寨","格林纳达","格陵兰","格鲁吉亚","梵蒂冈","比利时","毛里塔尼亚","毛里求斯","汤加","沙特阿拉伯","法国","法属南部领地","法属圭亚那","法属玻利尼西亚","法罗群岛","波兰","波多黎各","波黑","泰国","津巴布韦","洪都拉斯","海地","澳大利亚","爱尔兰","爱德华王子岛","爱沙尼亚","牙买加","特克斯和凯科斯群岛","特立尼达和多巴哥","玻利维亚","瑙鲁","瑞典","瑞士","瓜德罗普","瓦利斯和富图纳","瓦努阿图","留尼汪","白俄罗斯","百慕大","皮特凯恩","直布罗陀","福克兰群岛(马尔维纳斯)","科威特","科摩罗","科特迪瓦","科科斯(基林)群岛","秘鲁","突尼斯","立陶宛","索马里","约旦","纳米比亚","纽埃","缅甸","罗马尼亚","美国","美属维尔京群岛","美属萨摩亚","老挝","肯尼亚","芬兰","苏丹","苏里南","英国","英属印度洋领地","英属维尔京群岛","荷兰","荷属安的列斯","莫桑比克","莱索托","菲律宾","萨尔瓦多","萨摩亚","葡萄牙","蒙古","蒙特塞拉特","西撒哈拉","西班牙","诺福克岛","贝宁","赞比亚","赤道几内亚","赫德岛和麦克唐纳岛","越南","里海","阿塞拜疆","阿富汗","阿尔及利亚","阿尔巴尼亚","阿曼","阿根廷","阿联酋","阿鲁巴","韩国","马尔代夫","马德拉岛","马拉维","马提尼克","马来西亚","马约特","马绍尔群岛","马耳他","马达加斯加","马里","鸭绿江","黎巴嫩","黑山共和国"];

const state = {posts: [], selectedMood: "all", selectedId: null, token: localStorage.getItem("memoryMapToken") || "", user: JSON.parse(localStorage.getItem("memoryMapUser") || "null"), myPosts: [], myStatus: "all", adminPosts: [], adminFilter: "all", map: null, markers: new Map(), draftMarker: null, locationSource: "region", geocodeLocked: false, geocodeFailed: false, manualLocation: false};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const locationSelects = ["#countrySelect", "#provinceSelect", "#citySelect"];

function isValidCoordinate(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function switchTab(name) {
  $$(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.tab === name));
  $$(".tab-panel").forEach(panel => panel.classList.remove("active"));
  $(`#${name}Panel`).classList.add("active");
  if (state.map) setTimeout(() => state.map.invalidateSize(), 80);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {month: "short", day: "numeric", year: "numeric"}).format(new Date(value));
}

async function api(path, options = {}) {
  const response = await fetch(path, {headers: {"Content-Type": "application/json", ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}), ...(options.headers || {})}, ...options});
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "请求失败");
  return payload;
}

async function reverseGeocodeLocation(lat, lng) {
  state.geocodeFailed = false;
  updateLocationControls();
  setGeocodeStatus("正在识别当前位置...");
  try {
    const result = await api("/api/reverse-geocode", {method: "POST", body: JSON.stringify({ lat, lng, language: "zh" })});
    if (result.success) {
      applyGeocodeResult(result);
      state.geocodeLocked = true;
      state.geocodeFailed = false;
      updateLocationControls();
      setGeocodeStatus(`已识别：${formatLocation(result)}`);
      return result;
    }
    state.geocodeLocked = false;
    state.geocodeFailed = true;
    updateLocationControls();
    setGeocodeStatus("未能识别当前位置，请手动指定国、省、市。");
    return null;
  } catch (error) {
    state.geocodeLocked = false;
    state.geocodeFailed = true;
    updateLocationControls();
    setGeocodeStatus("反向地理编码不可用，请手动指定国、省、市。");
    console.log("反向地理编码不可用:", error.message);
    return null;
  }
}

function setGeocodeStatus(message) {
  const status = $("#geocodeStatus");
  if (status) status.textContent = message;
}

function updateLocationControls() {
  const shouldLock = !state.manualLocation && !state.geocodeFailed;
  locationSelects.forEach(selector => {
    const select = $(selector);
    if (select) select.disabled = shouldLock;
  });
}

function applyGeocodeResult(result) {
  ensureOption($("#countrySelect"), result.country);
  $("#countrySelect").value = result.country;
  renderProvinceOptions(result.country);
  ensureOption($("#provinceSelect"), result.province || result.country);
  $("#provinceSelect").value = result.province || result.country;
  if (result.country === "中国") renderCityOptions(result.province);
  ensureOption($("#citySelect"), result.city || result.province || result.country);
  $("#citySelect").value = result.city || result.province || result.country;
}

function ensureOption(select, value) {
  if (!select || !value || Array.from(select.options).some(option => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.append(option);
}

function formatLocation(post) {
  let location = post.country || "未知";
  if (post.province && post.province !== post.country) location += ` / ${post.province}`;
  if (post.city && post.city !== post.province && post.city !== post.country) location += ` / ${post.city}`;
  return location;
}

function normalizeMoodKey(mood) {
  if (moods[mood] && mood !== "all") return mood;
  return legacyMoodMap[mood] || "unspecified";
}

function moodLabel(mood) {
  return moods[normalizeMoodKey(mood)] || moods.unspecified;
}

function saveSession(payload) {
  state.token = payload.token;
  state.user = payload.user;
  localStorage.setItem("memoryMapToken", payload.token);
  localStorage.setItem("memoryMapUser", JSON.stringify(payload.user));
}

function clearSession() {
  state.token = "";
  state.user = null;
  state.myPosts = [];
  localStorage.removeItem("memoryMapToken");
  localStorage.removeItem("memoryMapUser");
}

function renderFilters() {
  const filters = $("#filters");
  filters.innerHTML = "";
  Object.entries(moods).forEach(([key, label]) => {
    const button = document.createElement("button");
    button.className = `secondary-btn ${state.selectedMood === key ? "active" : ""}`;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => { state.selectedMood = key; render(); });
    filters.append(button);
  });
}

function filteredPosts() {
  return state.posts.filter(post => state.selectedMood === "all" || normalizeMoodKey(post.mood) === state.selectedMood);
}

function initMap() {
  if (!window.L) {
    $("#map").innerHTML = '<div class="map-fallback">地图资源加载失败。请检查连接后重新加载。</div>';
    return;
  }
  state.map = L.map("map", {center: [20, 0], zoom: 2, minZoom: 2, maxBounds: [[-85, -180], [85, 180]], maxBoundsViscosity: 0.8, zoomControl: false});
  document.querySelector("#map").addEventListener("touchmove", event => { if (event.touches.length > 1) event.preventDefault(); }, { passive: false });
  L.control.zoom({ position: "bottomleft" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(state.map);
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = '<p class="legend-title">情绪</p>';
    Object.entries(moods).forEach(([key, label]) => { if (key === "all") return; const color = moodColors[key] || "#595f59"; div.innerHTML += `<div class="legend-item"><span class="legend-dot" style="background-color: ${color}"></span>${label}</div>`; });
    return div;
  };
  legend.addTo(state.map);
  state.map.on("click", event => {
    const { lat, lng } = event.latlng;
    if (!isValidCoordinate(lat, lng)) { $("#submitStatus").textContent = "坐标无效。"; switchTab("submit"); return; }
    setDraftLocation(lat, lng, "map");
    reverseGeocodeLocation(lat, lng);
    switchTab("submit");
  });
}

function setDraftLocation(lat, lng, source = "map") {
  state.locationSource = source;
  $("#latInput").value = lat.toFixed(5);
  $("#lngInput").value = lng.toFixed(5);
  if (!state.map) return;
  if (state.draftMarker) state.draftMarker.remove();
  state.draftMarker = L.circleMarker([lat, lng], {radius: 9, color: "#222321", weight: 2, fillColor: "#b07c2a", fillOpacity: 0.9}).addTo(state.map);
}

function renderMapMarkers() {
  if (!state.map) return;
  state.markers.forEach(marker => marker.remove());
  state.markers.clear();
  filteredPosts().forEach(post => {
    const marker = L.circleMarker([post.lat, post.lng], {radius: 7, color: "#fffdf8", weight: 2, fillColor: moodColors[normalizeMoodKey(post.mood)] || moodColors.unspecified, fillOpacity: 0.92, bubblingMouseEvents: false}).addTo(state.map);
    let popupContent = `<strong>${post.title || "无题"}</strong>`;
    if (post.author) popupContent += `<br><em>${post.author}</em>`;
    popupContent += `<br>${formatLocation(post)} - ${post.placeName}`;
    marker.bindPopup(popupContent);
    marker.on("click", (e) => {
      if (e.originalEvent) L.DomEvent.stop(e.originalEvent);
      selectPost(post, { centerMap: true, openPopup: true, renderAll: false });
    });
    state.markers.set(post.id, marker);
  });
}

function selectPost(post, options = {}) {
  const { centerMap = true, openPopup = true, renderAll = true } = options;
  state.selectedId = post.id;
  switchTab("read");
  if (renderAll) render();
  else renderStories();
  if (state.map) {
    if (centerMap) state.map.setView([post.lat, post.lng], Math.max(state.map.getZoom(), 7), { animate: true });
    const marker = state.markers.get(post.id);
    if (marker && openPopup) marker.openPopup();
  }
  scrollSelectedStoryIntoView();
}

function focusPost(post) {
  selectPost(post, { centerMap: true, openPopup: true, renderAll: true });
}

function scrollSelectedStoryIntoView() {
  setTimeout(() => {
    const selected = document.querySelector(".story-card.selected");
    if (selected) selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, 60);
}

function renderStories() {
  const list = $("#storyList");
  const template = $("#storyTemplate");
  list.innerHTML = "";
  const posts = filteredPosts();
  if (!posts.length) { list.innerHTML = '<p class="microcopy">暂无记录。</p>'; return; }
  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".story-card");
    const button = node.querySelector(".story-button");
    card.dataset.postId = post.id;
    const isSelected = state.selectedId === post.id;
    let topline = `${moodLabel(post.mood)} / ${formatLocation(post)} / ${formatDate(post.createdAt)}`;
    if (post.author) topline += ` / ${post.author}`;
    node.querySelector(".story-topline").textContent = topline;
    node.querySelector("strong").textContent = post.title || "无题";
    node.querySelector("p").textContent = post.body;
    card.classList.toggle("selected", isSelected);
    card.classList.toggle("expanded", isSelected);
    button.addEventListener("click", () => focusPost(post));
    if (isSelected) card.append(createStoryExpansion(post));
    list.append(node);
  });
}

function createStoryExpansion(post) {
  const detail = document.createElement("div");
  detail.className = "story-expanded";
  const meta = [
    moodLabel(post.mood),
    formatLocation(post),
    post.placeName,
    formatDate(post.createdAt)
  ];
  if (post.author) meta.push(post.author);
  detail.innerHTML = `
    <span class="story-topline">${escapeHtml(meta.join(" / "))}</span>
    <p>${escapeHtml(post.body)}</p>
    <dl>
      <div><dt>地点</dt><dd>${escapeHtml(post.placeName || "未知")}</dd></div>
      <div><dt>坐标</dt><dd>${Number(post.lat).toFixed(5)}, ${Number(post.lng).toFixed(5)}</dd></div>
    </dl>
  `;
  return detail;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderCountryOptions() {
  const select = $("#countrySelect");
  select.innerHTML = "";
  allCountries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
  });
  select.value = "中国";
  renderProvinceOptions("中国");
}

function renderProvinceOptions(country) {
  const select = $("#provinceSelect");
  select.innerHTML = "";
  if (country === "中国") {
    chinaProvinces.forEach(prov => {
      const option = document.createElement("option");
      option.value = prov;
      option.textContent = prov;
      select.append(option);
    });
    select.value = chinaProvinces[0];
    renderCityOptions(chinaProvinces[0]);
  } else {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
    select.value = country;
    const citySelect = $("#citySelect");
    citySelect.innerHTML = "";
    const cityOption = document.createElement("option");
    cityOption.value = country;
    cityOption.textContent = country;
    citySelect.append(cityOption);
  }
}

function renderCityOptions(province) {
  const select = $("#citySelect");
  select.innerHTML = "";
  const cities = chinaCities[province] || [province];
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    select.append(option);
  });
}

function renderAuth() {
  const loggedIn = Boolean(state.user);
  const isAdminUser = loggedIn && state.user.role === "admin";
  $("#authBox").classList.toggle("hidden", loggedIn);
  $("#mineBox").classList.toggle("hidden", !loggedIn || isAdminUser);
  $("#adminBox").classList.toggle("hidden", !isAdminUser);
  $("#submitIdentity").textContent = loggedIn ? `${state.user.username} - 即时发布` : "游客投稿 / 即时发布";
  if (loggedIn) {
    $("#currentUsername").textContent = state.user.username;
    if (isAdminUser) $("#adminUsername").textContent = `${state.user.username} (管理员)`;
  }
}

function renderMyPosts() {
  const list = $("#mineList");
  const template = $("#mineTemplate");
  list.innerHTML = "";
  if (!state.user) return;
  const posts = state.myPosts.filter(post => state.myStatus === "all" || post.status === state.myStatus);
  if (!posts.length) { list.innerHTML = '<p class="microcopy">暂无此状态的投稿。游客投稿不会显示在这里。</p>'; return; }
  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.country} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".mine-body").textContent = post.body;
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.addEventListener("click", async () => { try { await api(`/api/posts/${post.id}/delete`, { method: "POST" }); await Promise.all([loadPosts(), loadMyPosts()]); } catch (error) { console.error("失败:", error.message); } });
    list.append(node);
  });
}

function renderAdminPosts() {
  if (!state.user || state.user.role !== "admin") return;
  const list = $("#adminPostsList");
  const template = $("#adminPostTemplate");
  list.innerHTML = "";
  const filtered = state.adminFilter === "all" ? state.adminPosts : state.adminPosts.filter(p => p.status === state.adminFilter);
  if (!filtered.length) { list.innerHTML = '<p class="microcopy">暂无此状态的投稿。</p>'; return; }
  filtered.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.country} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".post-body").textContent = post.body;
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.addEventListener("click", async () => { try { await api(`/api/admin/posts/${post.id}/delete`, { method: "POST" }); await loadAdminPosts(); } catch (error) { console.error("失败:", error.message); } });
    list.append(node);
  });
}

async function loadAdminPosts() {
  if (!state.user || state.user.role !== "admin") return;
  try {
    state.adminPosts = await api("/api/admin/posts");
    renderAdminPosts();
  } catch (error) {
    console.error("加载管理员投稿失败:", error);
  }
}

function render() {
  renderFilters();
  renderMapMarkers();
  renderStories();
  renderAuth();
  renderMyPosts();
  renderAdminPosts();
}

async function loadPosts() {
  state.posts = await api("/api/posts");
  if (!state.selectedId && state.posts[0]) state.selectedId = state.posts[0].id;
  render();
}

async function loadMyPosts() {
  if (!state.user) return;
  state.myPosts = await api("/api/me/posts");
  renderMyPosts();
}

async function restoreSession() {
  if (!state.token) { renderAuth(); return; }
  try {
    const payload = await api("/api/me");
    state.user = payload.user;
    localStorage.setItem("memoryMapUser", JSON.stringify(payload.user));
    await loadMyPosts();
  } catch {
    clearSession();
  }
  renderAuth();
}

function wireEvents() {
  $$(".tab").forEach(tab => tab.addEventListener("click", () => { switchTab(tab.dataset.tab); if (tab.dataset.tab === "mine") loadMyPosts().catch(error => { $("#authStatus").textContent = error.message; }); }));
  $("#openSubmit").addEventListener("click", () => switchTab("submit"));
  $("#openInfo").addEventListener("click", () => switchTab("about"));
  $("#openMine").addEventListener("click", () => switchTab("mine"));
  $("#openLang").addEventListener("click", () => { window.location.href = "/index.html"; });
  $("#manualLocationToggle").addEventListener("change", event => {
    state.manualLocation = event.target.checked;
    updateLocationControls();
    if (state.manualLocation) setGeocodeStatus("已启用手动指定国、省、市。");
    else if (state.geocodeLocked) setGeocodeStatus(`已识别：${formatLocation({ country: $("#countrySelect").value, province: $("#provinceSelect").value, city: $("#citySelect").value })}`);
    else if (state.geocodeFailed) setGeocodeStatus("未能识别当前位置，请手动指定国、省、市。");
    else setGeocodeStatus("点击地图后自动识别国、省、市。");
  });
  $("#countrySelect").addEventListener("change", event => {
    if (!state.manualLocation && state.geocodeLocked) return;
    const country = event.target.value;
    renderProvinceOptions(country);
    if (country === "中国") {
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
    }
  });
  $("#provinceSelect").addEventListener("change", event => {
    if (!state.manualLocation && state.geocodeLocked) return;
    const province = event.target.value;
    const country = $("#countrySelect").value;
    if (country === "中国") renderCityOptions(province);
  });
  document.querySelector('select[name="mood"]').value = "happy";
  $("#submitForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.country = $("#countrySelect").value;
    payload.province = $("#provinceSelect").value;
    payload.city = $("#citySelect").value;
    payload.lat = Number(payload.lat);
    payload.lng = Number(payload.lng);
    const status = $("#submitStatus");
    status.textContent = "提交中...";
    try {
      await api("/api/posts", { method: "POST", body: JSON.stringify(payload) });
      form.reset();
      $("#countrySelect").value = "中国";
      renderProvinceOptions("中国");
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
      state.geocodeLocked = false;
      state.geocodeFailed = false;
      state.manualLocation = false;
      $("#manualLocationToggle").checked = false;
      updateLocationControls();
      setGeocodeStatus("点击地图后自动识别国、省、市。");
      status.textContent = state.user ? "已提交。在'我的'中查看状态。" : "已作为游客提交。即时发布但无法恢复。";
      await Promise.all([loadPosts(), loadMyPosts()]);
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = "登录中...";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
      saveSession(result);
      form.reset();
      status.textContent = "";
      await Promise.all([loadMyPosts(), loadAdminPosts()]);
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#registerForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = "注册中...";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
      saveSession(result);
      form.reset();
      status.textContent = "";
      await Promise.all([loadMyPosts(), loadAdminPosts()]);
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#logoutButton").addEventListener("click", () => { clearSession(); render(); });
  $$("[data-my-status]").forEach(button => { button.addEventListener("click", () => { state.myStatus = button.dataset.myStatus; $$("[data-my-status]").forEach(item => item.classList.toggle("active", item === button)); renderMyPosts(); }); });
  $$("[data-admin-filter]").forEach(button => { button.addEventListener("click", () => { state.adminFilter = button.dataset.adminFilter; $$("[data-admin-filter]").forEach(item => item.classList.toggle("active", item === button)); renderAdminPosts(); }); });
  $("#adminLogoutButton").addEventListener("click", () => { clearSession(); render(); });
  $("#openFeedback").addEventListener("click", () => { $("#feedbackModal").classList.remove("hidden"); });
  $("#closeFeedback").addEventListener("click", () => { $("#feedbackModal").classList.add("hidden"); });
  $("#feedbackModal").addEventListener("click", event => { if (event.target === $("#feedbackModal")) $("#feedbackModal").classList.add("hidden"); });
  $("#feedbackForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const statusEl = $("#feedbackStatus");
    statusEl.textContent = "提交中...";
    try {
      await api("/api/feedback", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      statusEl.textContent = "感谢你的反馈!";
      setTimeout(() => { $("#feedbackModal").classList.add("hidden"); statusEl.textContent = ""; }, 2000);
    } catch (error) {
      statusEl.textContent = "失败: " + error.message;
    }
  });
}

renderCountryOptions();
updateLocationControls();
initMap();
wireEvents();
restoreSession();
loadPosts();
