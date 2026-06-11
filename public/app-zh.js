// 回声树洞 - 中文版本
// 全球记忆地图，支持中英文切换

const moods = {
  all: "全部",
  grateful: "感谢",
  hopeful: "希望",
  tender: "温柔",
  relieved: "释然",
  calm: "平静",
  missing: "想念",
  confused: "迷茫",
  anxious: "焦虑",
  sad: "难过",
  tired: "疲惫",
  angry: "愤怒",
  secret: "秘密",
  lonely: "孤独",
  unspecified: "未标记"
};

const statusLabels = {
  pending: "待审核",
  approved: "已发布",
  rejected: "未通过"
};

const moodColors = {
  grateful: "#d4a574",
  hopeful: "#f4a460",
  tender: "#e8956d",
  relieved: "#7ba58f",
  calm: "#5da5a5",
  missing: "#b87ba3",
  confused: "#8b7ba8",
  anxious: "#d67a3e",
  sad: "#5a7fb8",
  tired: "#888888",
  angry: "#c94a4a",
  secret: "#5a5a7a",
  lonely: "#a94354",
  unspecified: "#696969"
};

// 两级地区配置 - 中国优先，含港澳台 34 个省级行政区
const regions = {
  "中国": [
    "北京市", "天津市", "河北省", "山西省", "内蒙古自治区",
    "辽宁省", "吉林省", "黑龙江省",
    "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省",
    "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省",
    "重庆市", "四川省", "贵州省", "云南省", "西藏自治区",
    "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区",
    "香港特别行政区", "澳门特别行政区", "台湾省"
  ],
  "北美": ["美国", "加拿大", "墨西哥"],
  "中美": ["危地马拉", "洪都拉斯", "萨尔瓦多", "尼加拉瓜", "哥斯达黎加", "巴拿马", "古巴", "海地", "多米尼加"],
  "南美": ["巴西", "阿根廷", "智利", "哥伦比亚", "秘鲁", "委内瑞拉", "厄瓜多尔", "玻利维亚", "巴拉圭", "乌拉圭"],
  "西欧": ["英国", "法国", "德国", "荷兰", "比利时", "瑞士", "奥地利", "爱尔兰", "葡萄牙", "西班牙"],
  "东欧": ["波兰", "捷克", "斯洛伐克", "匈牙利", "罗马尼亚", "保加利亚", "克罗地亚", "塞尔维亚", "乌克兰"],
  "北欧": ["挪威", "瑞典", "芬兰", "丹麦", "冰岛"],
  "南欧": ["意大利", "希腊", "土耳其", "塞浦路斯"],
  "中东": ["以色列", "沙特阿拉伯", "阿联酋", "伊朗", "伊拉克", "约旦", "黎巴嫩", "科威特", "卡塔尔"],
  "北非": ["埃及", "利比亚", "突尼斯", "阿尔及利亚", "摩洛哥"],
  "西非": ["尼日利亚", "加纳", "塞内加尔", "科特迪瓦", "几内亚"],
  "东非": ["肯尼亚", "埃塞俄比亚", "坦桑尼亚", "乌干达", "卢旺达"],
  "中非": ["刚果", "喀麦隆", "中非共和国", "乍得"],
  "南非洲": ["南非", "津巴布韦", "赞比亚", "莫桑比克", "博茨瓦纳"],
  "俄罗斯中亚": ["俄罗斯", "哈萨克斯坦", "乌兹别克斯坦", "吉尔吉斯斯坦", "塔吉克斯坦"],
  "东亚": ["日本", "韩国", "朝鲜", "蒙古"],
  "东南亚": ["泰国", "越南", "印度尼西亚", "马来西亚", "菲律宾", "新加坡", "缅甸", "柬埔寨", "老挝"],
  "南亚": ["印度", "巴基斯坦", "孟加拉国", "斯里兰卡", "尼泊尔", "不丹"],
  "大洋洲": ["澳大利亚", "新西兰", "巴布亚新几内亚", "斐济"]
};

const regionCoordinates = {
  "中国": {
    "北京市": [39.9042, 116.4074], "天津市": [39.3434, 117.3616], "河北省": [38.0428, 114.5149],
    "山西省": [37.8706, 112.5489], "内蒙古自治区": [40.8426, 111.7492],
    "辽宁省": [41.8057, 123.4315], "吉林省": [43.8378, 125.3235], "黑龙江省": [45.8038, 126.5349],
    "上海市": [31.2304, 121.4737], "江苏省": [32.0603, 118.7969], "浙江省": [30.2741, 120.1551],
    "安徽省": [31.8206, 117.2272], "福建省": [26.0745, 119.2965], "江西省": [28.682, 115.8582],
    "山东省": [36.6512, 117.1201], "河南省": [34.7466, 113.6254], "湖北省": [30.5928, 114.3055],
    "湖南省": [28.2282, 112.9388], "广东省": [23.1291, 113.2644], "广西壮族自治区": [22.817, 108.3669],
    "海南省": [20.044, 110.1999], "重庆市": [29.563, 106.5516], "四川省": [30.5728, 104.0668],
    "贵州省": [26.647, 106.6302], "云南省": [25.0389, 102.7183], "西藏自治区": [29.652, 91.1721],
    "陕西省": [34.3416, 108.9398], "甘肃省": [36.0611, 103.8343], "青海省": [36.6232, 101.7782],
    "宁夏回族自治区": [38.4872, 106.2309], "新疆维吾尔自治区": [43.8256, 87.6168],
    "香港特别行政区": [22.3193, 114.1694], "澳门特别行政区": [22.1987, 113.5439], "台湾省": [23.6978, 120.9605]
  },
  "北美": { "美国": [37.0902, -95.7129], "加拿大": [56.1304, -106.3468], "墨西哥": [23.6345, -102.5528] },
  "中美": { "危地马拉": [15.7835, -90.2308], "洪都拉斯": [15.1999, -86.2419], "萨尔瓦多": [13.7942, -88.8965], "尼加拉瓜": [12.8654, -85.2072], "哥斯达黎加": [9.7489, -83.7534], "巴拿马": [8.538, -80.7821], "古巴": [21.5218, -77.7812], "海地": [18.9712, -72.2852], "多米尼加": [18.7357, -70.1627] },
  "南美": { "巴西": [-14.235, -51.9253], "阿根廷": [-38.4161, -63.6167], "智利": [-35.6751, -71.543], "哥伦比亚": [4.5709, -74.2973], "秘鲁": [-9.19, -75.0152], "委内瑞拉": [6.4238, -66.5897], "厄瓜多尔": [-1.8312, -78.1834], "玻利维亚": [-16.2902, -63.5887], "巴拉圭": [-23.4425, -58.4438], "乌拉圭": [-32.5228, -55.7658] },
  "西欧": { "英国": [55.3781, -3.436], "法国": [46.2276, 2.2137], "德国": [51.1657, 10.4515], "荷兰": [52.1326, 5.2913], "比利时": [50.8503, 4.3517], "瑞士": [46.8182, 8.2275], "奥地利": [47.5162, 14.5501], "爱尔兰": [53.1424, -7.6921], "葡萄牙": [39.3999, -8.2245], "西班牙": [40.4637, -3.7492] },
  "东欧": { "波兰": [51.9194, 19.1451], "捷克": [49.8175, 15.473], "斯洛伐克": [48.669, 19.699], "匈牙利": [47.1625, 19.5033], "罗马尼亚": [45.9432, 24.9668], "保加利亚": [42.7339, 25.4858], "克罗地亚": [45.1, 15.2], "塞尔维亚": [44.0165, 21.0059], "乌克兰": [48.3794, 31.1656] },
  "北欧": { "挪威": [60.472, 8.4689], "瑞典": [60.1282, 18.6435], "芬兰": [61.9241, 25.7482], "丹麦": [56.2639, 9.5018], "冰岛": [64.9631, -19.0208] },
  "南欧": { "意大利": [41.8719, 12.5674], "希腊": [39.0742, 21.8243], "土耳其": [38.9637, 35.2433], "塞浦路斯": [35.1264, 33.4299] },
  "中东": { "以色列": [31.0461, 34.8516], "沙特阿拉伯": [23.8859, 45.0792], "阿联酋": [23.4241, 53.8478], "伊朗": [32.4279, 53.688], "伊拉克": [33.2232, 43.6793], "约旦": [30.5852, 36.2384], "黎巴嫩": [33.8547, 35.8623], "科威特": [29.3759, 47.9774], "卡塔尔": [25.3548, 51.1839] },
  "北非": { "埃及": [26.8206, 30.8025], "利比亚": [26.3351, 17.2283], "突尼斯": [33.8869, 9.5375], "阿尔及利亚": [28.0339, 1.6596], "摩洛哥": [31.7917, -7.0926] },
  "西非": { "尼日利亚": [9.082, 8.6753], "加纳": [7.9465, -1.0232], "塞内加尔": [14.4974, -14.4524], "科特迪瓦": [7.54, -5.5471], "几内亚": [11.0, -10.9408] },
  "东非": { "肯尼亚": [-0.0236, 37.9062], "埃塞俄比亚": [9.145, 40.4897], "坦桑尼亚": [-6.369, 34.8888], "乌干达": [1.3733, 32.2903], "卢旺达": [-1.9403, 29.8739] },
  "中非": { "刚果": [-0.228, 15.827], "喀麦隆": [3.848, 11.502], "中非共和国": [6.6111, 20.9394], "乍得": [15.4542, 18.7322] },
  "南非洲": { "南非": [-30.5595, 22.9375], "津巴布韦": [-19.0154, 29.1549], "赞比亚": [-13.1339, 27.8493], "莫桑比克": [-18.6657, 35.5296], "博茨瓦纳": [-22.3285, 24.6849] },
  "俄罗斯中亚": { "俄罗斯": [61.524, 105.3188], "哈萨克斯坦": [48.0196, 66.9237], "乌兹别克斯坦": [41.3775, 64.5853], "吉尔吉斯斯坦": [41.2044, 74.7661], "塔吉克斯坦": [38.861, 71.2761] },
  "东亚": { "日本": [36.2048, 138.2529], "韩国": [35.9078, 127.7669], "朝鲜": [40.3399, 127.5101], "蒙古": [46.8625, 103.8467] },
  "东南亚": { "泰国": [15.87, 100.9925], "越南": [14.0583, 108.2772], "印度尼西亚": [-0.7893, 113.9213], "马来西亚": [4.2105, 101.9758], "菲律宾": [12.8797, 121.774], "新加坡": [1.3521, 103.8198], "缅甸": [21.9162, 95.956], "柬埔寨": [12.5657, 104.991], "老挝": [19.8563, 102.4955] },
  "南亚": { "印度": [20.5937, 78.9629], "巴基斯坦": [30.3753, 69.3451], "孟加拉国": [23.685, 90.3563], "斯里兰卡": [7.8731, 80.7718], "尼泊尔": [28.3949, 84.124], "不丹": [27.5142, 90.4336] },
  "大洋洲": { "澳大利亚": [-25.2744, 133.7751], "新西兰": [-40.9006, 172.886], "巴布亚新几内亚": [-6.315, 143.9555], "斐济": [-17.7134, 178.065] }
};
// 沈阳坐标
const SHENYANG = [41.8045, 123.4328];

const state = {
  posts: [],
  selectedMood: "all",
  selectedId: null,
  token: localStorage.getItem("memoryMapToken") || "",
  user: JSON.parse(localStorage.getItem("memoryMapUser") || "null"),
  myPosts: [],
  myStatus: "all",
  adminPosts: [],
  adminFilter: "all",
  map: null,
  markers: new Map(),
  draftMarker: null,
  locationSource: "region"
};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

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
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "请求失败");
  return payload;
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
    button.addEventListener("click", () => {
      state.selectedMood = key;
      render();
    });
    filters.append(button);
  });
}

function filteredPosts() {
  return state.posts.filter(post => state.selectedMood === "all" || post.mood === state.selectedMood);
}

function initMap() {
  if (!window.L) {
    $("#map").innerHTML = '<div class="map-fallback">地图资源加载失败，请检查网络后刷新。</div>';
    return;
  }

  state.map = L.map("map", {
    center: SHENYANG,  // 沈阳为初始中心
    zoom: 8,
    minZoom: 2,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 0.8,
    zoomControl: false
  });

  // 防止双指缩放触发浏览器缩放
  document.querySelector("#map").addEventListener("touchmove", event => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  L.control.zoom({ position: "bottomleft" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(state.map);

  // Add legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = '<p class="legend-title">情绪</p>';
    Object.entries(moods).forEach(([key, label]) => {
      if (key === "all") return;
      const color = moodColors[key] || "#595f59";
      div.innerHTML += `<div class="legend-item"><span class="legend-dot" style="background-color: ${color}"></span>${label}</div>`;
    });
    return div;
  };
  legend.addTo(state.map);

  state.map.on("click", event => {
    const { lat, lng } = event.latlng;
    if (!isValidCoordinate(lat, lng)) {
      $("#submitStatus").textContent = "坐标无效。";
      switchTab("submit");
      return;
    }
    setDraftLocation(lat, lng, "map");
    switchTab("submit");
  });
}

function setDraftLocation(lat, lng, source = "map") {
  state.locationSource = source;
  $("#latInput").value = lat.toFixed(5);
  $("#lngInput").value = lng.toFixed(5);
  if (!state.map) return;
  if (state.draftMarker) state.draftMarker.remove();
  state.draftMarker = L.circleMarker([lat, lng], {
    radius: 9,
    color: "#222321",
    weight: 2,
    fillColor: "#b07c2a",
    fillOpacity: 0.9
  }).addTo(state.map);
}

function renderMapMarkers() {
  if (!state.map) return;
  state.markers.forEach(marker => marker.remove());
  state.markers.clear();

  filteredPosts().forEach(post => {
    const marker = L.circleMarker([post.lat, post.lng], {
      radius: 7,
      color: "#fffdf8",
      weight: 2,
      fillColor: moodColors[post.mood] || moodColors.unspecified,
      fillOpacity: 0.92
    }).addTo(state.map);
    marker.bindPopup(`<strong>${post.title}</strong><br>${post.placeName}`);
    marker.on("click", () => {
      state.selectedId = post.id;
      render();
      switchTab("read");
    });
    state.markers.set(post.id, marker);
  });
}

function focusPost(post) {
  state.selectedId = post.id;
  if (state.map) {
    state.map.setView([post.lat, post.lng], Math.max(state.map.getZoom(), 7), { animate: true });
    const marker = state.markers.get(post.id);
    if (marker) marker.openPopup();
  }
  render();
}

function renderStories() {
  const list = $("#storyList");
  const template = $("#storyTemplate");
  list.innerHTML = "";

  const posts = filteredPosts();
  if (!posts.length) {
    list.innerHTML = '<p class="microcopy">这里暂时没有对应情绪的投稿。</p>';
    return;
  }

  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".story-card");
    const button = node.querySelector(".story-button");
    node.querySelector(".story-topline").textContent = `${moods[post.mood] || "未标记"} / ${post.province} / ${formatDate(post.createdAt)}`;
    node.querySelector("strong").textContent = post.title;
    node.querySelector("p").textContent = post.body;
    card.classList.toggle("selected", state.selectedId === post.id);
    button.addEventListener("click", () => focusPost(post));
    list.append(node);
  });
}

function renderMainRegionOptions() {
  const select = $("#mainRegionSelect");
  select.innerHTML = "";
  Object.keys(regions).forEach(r => {
    const option = document.createElement("option");
    option.value = r;
    option.textContent = r;
    select.append(option);
  });
}

function renderSubRegionOptions(mainRegion) {
  const select = $("#provinceSelect");
  select.innerHTML = "";
  const subs = regions[mainRegion] || [];
  subs.forEach(sub => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    select.append(option);
  });
}

function applyRegionCenter(province, options = {}) {
  const mainRegion = $("#mainRegionSelect") ? $("#mainRegionSelect").value : null;
  if (state.locationSource === "map" && !options.force) {
    $("#submitStatus").textContent = "地区已更新，地图上选择的位置已保留。";
    return;
  }
  let center = null;
  if (mainRegion && regionCoordinates[mainRegion] && regionCoordinates[mainRegion][province]) {
    center = regionCoordinates[mainRegion][province];
  }
  if (!center) return;
  setDraftLocation(center[0], center[1], "region");
  const zoom = mainRegion === "中国" ? Math.max(state.map ? state.map.getZoom() : 5, 5) : Math.max(state.map ? state.map.getZoom() : 4, 4);
  if (state.map) state.map.setView(center, zoom, { animate: true });
}

function renderAuth() {
  const loggedIn = Boolean(state.user);
  const isAdminUser = loggedIn && state.user.role === "admin";

  $("#authBox").classList.toggle("hidden", loggedIn);
  $("#mineBox").classList.toggle("hidden", !loggedIn || isAdminUser);
  $("#adminBox").classList.toggle("hidden", !isAdminUser);

  $("#submitIdentity").textContent = loggedIn
    ? `${state.user.username} 投稿 / 即时发布`
    : "游客投稿 / 即时发布";

  if (loggedIn) {
    $("#currentUsername").textContent = state.user.username;
    if (isAdminUser) {
      $("#adminUsername").textContent = `${state.user.username} (管理员)`;
    }
  }
}

function renderMyPosts() {
  const list = $("#mineList");
  const template = $("#mineTemplate");
  list.innerHTML = "";

  if (!state.user) return;
  const posts = state.myPosts.filter(post => state.myStatus === "all" || post.status === state.myStatus);

  if (!posts.length) {
    list.innerHTML = '<p class="microcopy">这里还没有对应状态的投稿。登录后提交的内容会出现在这里。</p>';
    return;
  }

  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.province} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".mine-body").textContent = post.body;
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.addEventListener("click", async () => {
      try {
        await api(`/api/posts/${post.id}/delete`, { method: "POST" });
        await Promise.all([loadPosts(), loadMyPosts()]);
      } catch (error) {
        console.error("删除失败:", error.message);
      }
    });
    list.append(node);
  });
}

function renderAdminPosts() {
  if (!state.user || state.user.role !== "admin") return;

  const list = $("#adminPostsList");
  const template = $("#adminPostTemplate");
  list.innerHTML = "";

  const filtered = state.adminFilter === "all"
    ? state.adminPosts
    : state.adminPosts.filter(p => p.status === state.adminFilter);

  if (!filtered.length) {
    list.innerHTML = '<p class="microcopy">没有对应状态的投稿。</p>';
    return;
  }

  filtered.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.province} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".post-body").textContent = post.body;

    // 删除按钮
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.addEventListener("click", async () => {
      try {
        await api(`/api/admin/posts/${post.id}/delete`, { method: "POST" });
        await loadAdminPosts();
      } catch (error) {
        console.error("删除失败:", error.message);
      }
    });



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
  if (!state.token) {
    renderAuth();
    return;
  }
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
  $$(".tab").forEach(tab => tab.addEventListener("click", () => {
    switchTab(tab.dataset.tab);
    if (tab.dataset.tab === "mine") loadMyPosts().catch(error => {
      $("#authStatus").textContent = error.message;
    });
  }));
  $("#openSubmit").addEventListener("click", () => switchTab("submit"));
  $("#openInfo").addEventListener("click", () => switchTab("about"));
  $("#openMine").addEventListener("click", () => switchTab("mine"));

  // 语言切换
  $("#openLang").addEventListener("click", () => {
    window.location.href = "/index.html";
  });

  $("#mainRegionSelect").addEventListener("change", event => {
    const mainRegion = event.target.value;
    renderSubRegionOptions(mainRegion);
    const firstSub = regions[mainRegion] && regions[mainRegion][0];
    if (firstSub) {
      $("#provinceSelect").value = firstSub;
      applyRegionCenter(firstSub, { force: true });
    }
  });

  $("#provinceSelect").addEventListener("change", event => {
    applyRegionCenter(event.target.value);
  });

  // Set default mood to tender
  document.querySelector('select[name="mood"]').value = "tender";

  $("#submitForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.lat = Number(payload.lat);
    payload.lng = Number(payload.lng);
    const status = $("#submitStatus");
    status.textContent = "正在提交...";
    try {
      await api("/api/posts", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      form.reset();
      $("#mainRegionSelect").value = "中国";
      renderSubRegionOptions("中国");
      $("#provinceSelect").value = "辽宁省";
      applyRegionCenter("辽宁省", { force: true });
      status.textContent = state.user
        ? "已发布，可在我的中查看和删除。"
        : "已以游客身份发布。";
      await Promise.all([loadPosts(), loadMyPosts()]);
    } catch (error) {
      status.textContent = error.message;
    }
  });

  $("#loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = "正在登录...";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
      });
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
    status.textContent = "正在注册...";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      saveSession(result);
      form.reset();
      status.textContent = "";
      await Promise.all([loadMyPosts(), loadAdminPosts()]);
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  });

  $("#logoutButton").addEventListener("click", () => {
    clearSession();
    render();
  });

  $$("[data-my-status]").forEach(button => {
    button.addEventListener("click", () => {
      state.myStatus = button.dataset.myStatus;
      $$("[data-my-status]").forEach(item => item.classList.toggle("active", item === button));
      renderMyPosts();
    });
  });

  // 管理员过滤
  $$("[data-admin-filter]").forEach(button => {
    button.addEventListener("click", () => {
      state.adminFilter = button.dataset.adminFilter;
      $$("[data-admin-filter]").forEach(item => item.classList.toggle("active", item === button));
      renderAdminPosts();
    });
  });

  // 管理员退出
  $("#adminLogoutButton").addEventListener("click", () => {
    clearSession();
    render();
  });

  // 反馈模态框
  $("#openFeedback").addEventListener("click", () => {
    $("#feedbackModal").classList.remove("hidden");
  });
  $("#closeFeedback").addEventListener("click", () => {
    $("#feedbackModal").classList.add("hidden");
  });
  $("#feedbackModal").addEventListener("click", event => {
    if (event.target === $("#feedbackModal")) {
      $("#feedbackModal").classList.add("hidden");
    }
  });
  $("#feedbackForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const statusEl = $("#feedbackStatus");
    statusEl.textContent = "提交中...";
    try {
      await api("/api/feedback", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      statusEl.textContent = "感谢你的反馈！";
      setTimeout(() => {
        $("#feedbackModal").classList.add("hidden");
        statusEl.textContent = "";
      }, 2000);
    } catch (error) {
      statusEl.textContent = "提交失败: " + error.message;
    }
  });
}

// 修复函数名错误
function applyProvinceCenter(province, options = {}) {
  return applyRegionCenter(province, options);
}

renderMainRegionOptions();
renderSubRegionOptions("中国");
initMap();
$("#mainRegionSelect").value = "中国";
$("#provinceSelect").value = "辽宁省";
applyRegionCenter("辽宁省", { force: true });
wireEvents();
restoreSession();
loadPosts();
