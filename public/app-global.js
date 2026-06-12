// Global Memory Map - International Version
// Supports worldwide memory submissions with multi-language support

const moods = {
  all: "All",
  grateful: "Grateful",
  hopeful: "Hopeful",
  tender: "Tender",
  relieved: "Relieved",
  calm: "Calm",
  missing: "Missing",
  confused: "Confused",
  anxious: "Anxious",
  sad: "Sad",
  tired: "Tired",
  angry: "Angry",
  secret: "Secret",
  lonely: "Lonely",
  unspecified: "Unspecified"
};

const statusLabels = {
  pending: "Pending",
  approved: "Published",
  rejected: "Rejected"
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

// Two-level region data — default North America
const chinaProvinces = [
  "北京市", "天津市", "河北省", "山西省", "内蒙古自治区",
  "辽宁省", "吉林省", "黑龙江省",
  "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省",
  "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省",
  "重庆市", "四川省", "贵州省", "云南省", "西藏自治区",
  "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区",
  "香港特别行政区", "澳门特别行政区", "台湾省"
];

const chinaCities = {
  "北京市": [
    "北京市"
  ],
  "天津市": [
    "天津市"
  ],
  "河北省": [
    "石家庄市",
    "唐山市",
    "秦皇岛市"
  ],
  "山西省": [
    "太原市",
    "大同市"
  ],
  "内蒙古自治区": [
    "呼和浩特市"
  ],
  "辽宁省": [
    "沈阳市",
    "大连市"
  ],
  "吉林省": [
    "长春市",
    "吉林市"
  ],
  "黑龙江省": [
    "哈尔滨市",
    "齐齐哈尔市"
  ],
  "上海市": [
    "上海市"
  ],
  "江苏省": [
    "南京市",
    "苏州市"
  ],
  "浙江省": [
    "杭州市",
    "宁波市"
  ],
  "安徽省": [
    "合肥市",
    "芜湖市"
  ],
  "福建省": [
    "福州市",
    "厦门市"
  ],
  "江西省": [
    "南昌市",
    "赣州市"
  ],
  "山东省": [
    "济南市",
    "青岛市"
  ],
  "河南省": [
    "郑州市",
    "洛阳市"
  ],
  "湖北省": [
    "武汉市",
    "襄阳市"
  ],
  "湖南省": [
    "长沙市",
    "株洲市"
  ],
  "广东省": [
    "广州市",
    "深圳市"
  ],
  "广西壮族自治区": [
    "南宁市"
  ],
  "海南省": [
    "海口市"
  ],
  "重庆市": [
    "重庆市"
  ],
  "四川省": [
    "成都市",
    "绵阳市"
  ],
  "贵州省": [
    "贵阳市"
  ],
  "云南省": [
    "昆明市"
  ],
  "西藏自治区": [
    "拉萨市"
  ],
  "陕西省": [
    "西安市"
  ],
  "甘肃省": [
    "兰州市"
  ],
  "青海省": [
    "西宁市"
  ],
  "宁夏回族自治区": [
    "银川市"
  ],
  "新疆维吾尔自治区": [
    "乌鲁木齐市"
  ],
  "香港特别行政区": [
    "香港"
  ],
  "澳门特别行政区": [
    "澳门"
  ],
  "台湾省": [
    "台北市",
    "高雄市"
  ]
};

const regions = {
  "China": chinaProvinces,
  "Central America": ["Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panama", "Cuba", "Haiti", "Dominican Republic"],
  "South America": ["Brazil", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Ecuador", "Bolivia", "Paraguay", "Uruguay"],
  "Western Europe": ["UK", "France", "Germany", "Netherlands", "Belgium", "Switzerland", "Austria", "Ireland", "Portugal", "Spain"],
  "Eastern Europe": ["Poland", "Czech Republic", "Slovakia", "Hungary", "Romania", "Bulgaria", "Croatia", "Serbia", "Ukraine"],
  "Northern Europe": ["Norway", "Sweden", "Finland", "Denmark", "Iceland"],
  "Southern Europe": ["Italy", "Greece", "Turkey", "Cyprus"],
  "Middle East": ["Israel", "Saudi Arabia", "UAE", "Iran", "Iraq", "Jordan", "Lebanon", "Kuwait", "Qatar"],
  "North Africa": ["Egypt", "Libya", "Tunisia", "Algeria", "Morocco"],
  "West Africa": ["Nigeria", "Ghana", "Senegal", "Ivory Coast", "Guinea"],
  "East Africa": ["Kenya", "Ethiopia", "Tanzania", "Uganda", "Rwanda"],
  "Central Africa": ["Congo", "Cameroon", "Central African Republic", "Chad"],
  "Southern Africa": ["South Africa", "Zimbabwe", "Zambia", "Mozambique", "Botswana"],
  "Russia & Central Asia": ["Russia", "Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan"],
  "East Asia": ["Japan", "South Korea", "China", "North Korea", "Mongolia"],
  "Southeast Asia": ["Thailand", "Vietnam", "Indonesia", "Malaysia", "Philippines", "Singapore", "Myanmar", "Cambodia", "Laos"],
  "South Asia": ["India", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan"],
  "Oceania": ["Australia", "New Zealand", "Papua New Guinea", "Fiji"]
};

const allCountries = ["AFGHANISTAN","ALBANIA","ALGERIA","AMERICAN SAMOA","ANDORRA","ANGOLA","ANGUILLA","ANTARCTICA","ANTIGUA AND BARBUDA","AREA UNDER DISPUTE","ARGENTINA","ARMENIA","ARUBA","AUSTRALIA","AUSTRIA","AZERBAIJAN","BAHAMAS","BAHRAIN","BANGLADESH","BARBADOS","BELARUS","BELGIUM","BELIZE","BENIN","BERMUDA","BHUTAN","BOLIVIA","BOSNIA AND HERZEGOVINA","BOTSWANA","BOUVET ISLAND","BRAZIL","BRITISH INDIAN OCEAN TERRITORY","BRUNEI","BULGARIA","BURKINA FASO","BURUNDI","CAMBODIA","CAMEROON","CANADA","CANARIAS","CAPE VERDE","CASPIAN SEA","CAYMAN ISLANDS","CENTRAL AFRICAN REPUBLIC","CHAD","CHILE","CHINA","CHRISTMAS ISLAND","COCOS(KEELING) ISLANDS","COLOMBIA","COMOROS","CONGO","CONGO,THE DEMOCRATIC REPUBLIC OF THE","COOK ISLANDS","COSTA RICA","COTE D’IVOIRE","CROATIA","CUBA","CYPRUS","CZECH REPUBLIC","DENMARK","DJIBOUTI","DOMINICA","DOMINICAN REPUBLIC","EAST TIMOR","ECUADOR","EGYPT","EL SALVADOR","EQUATORIAL GUINEA","ERITREA","ESTONIA","ETHIOPIA","FALKLAND ISLANDS(MALVINAS)","FAROE ISLANDS","FIJI","FINLAND","FRANCE","FRENCH GUIANA","FRENCH POLYNESIA","FRENCH SOUTHERN TERRITORIES","GABON","GAMBIA","GEORGIA","GERMANY","GHANA","GIBRALTAR","GREECE","GREENLAND","GRENADA","GUADELOUPE","GUATEMALA","GUINEA","GUINEA-BISSAU","GUYANA","HAITI","HEARD ISLAND AND MCDONALD ISLANDS","HONDURAS","HUNGARY","ICELAND","INDIA","INDONESIA","IRAN","IRAQ","IRELAND","ISRAEL","ITALY","JAMAICA","JAPAN","JORDAN","KAZAKHSTAN","KENYA","KIRIBATI","KOREA, REPUBLIC OF","KOREA,DEMOCRATIC PEOPLE'S REPUBLIC OF","KUWAIT","KYRGYZSTAN","LAOS","LATVIA","LEBANON","LESOTHO","LIBERIA","LIBYA","LIECHTENSTEIN","LITHUANIA","LUXEMBOURG","MACEDONIA,THE FORMER YUGOSLAV REPUBLIC OF","MADAGASCAR","MADEIRA","MALAWI","MALAYSIA","MALDIVES","MALI","MALTA","MARSHALL ISLANDS","MARTINIQUE","MAURITANIA","MAURITIUS","MAYOTTE","MEXICO","MICRONESIA,FEDERATED STATES OF","MOLDOVA","MONACO","MONGOLIA","MONTENEGRO","MONTSERRAT","MOROCCO","MOZAMBIQUE","MYANMAR","NAMIBIA","NAURU","NEPAL","NETHERLANDS","NETHERLANDS ANTILLES","NEW CALEDONIA","NEW ZEALAND","NICARAGUA","NIGER","NIGERIA","NIUE","NORFOLK ISLAND","NORTHERN MARIANA ISLANDS","NORWAY","OMAN","PAKISTAN","PALAU","PANAMA","PAPUA NEW GUINEA","PARAGUAY","PERU","PHILIPPINES","PITCAIRN","POLAND","PORTUGAL","PRINCE EDWARD ISLAND","PUERTO RICO","QATAR","REUNION","ROMANIA","RUSSIAN FEDERATION","RWANDA","SAINT HELENA","SAINT KITTS AND NEVIS","SAINT LUCIA","SAINT PIERRE AND MIQUELON","SAINT VINCENT AND THE GRENADINES","SAMOA","SAN MARINO","SAO TOME AND PRINCIPE","SAUDI ARABIA","SENEGAL","SERBIA","SEYCHELLES","SIERRA LEONE","SINGAPORE","SLOVAKIA","SLOVENIA","SOLOMON ISLANDS","SOMALIA","SOUTH AFRICA","SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS","SPAIN","SRILANKA","SUDAN","SURINAME","SVALBARD AND JAN MAYEN","SWAZILAND","SWEDEN","SWITZERLAND","SYRIAN ARAB REPUBLIC","TAJIKISTAN","TANZANIA","THAILAND","TOGO","TOKELAU","TONGA","TRINIDAD AND TOBAGO","TUNISIA","TURKEY","TURKMENISTAN","TURKS AND CAICOS ISLANDS","TUVALU","UGANDA","UKRAINE","UNITED ARAB EMIRATES","UNITED KINGDOM","UNITED STATES","URUGUAY","UZBEKISTAN","VANUATU","VATICAN","VENEZUELA","VIET NAM","VIRGIN ISLANDS,BRITISH","VIRGIN ISLANDS,U.S.","WAKE ISLAND","WALLIS AND FUTUNA","WESTERN SAHARA","YEMEN","ZAMBIA","ZIMBABWE"];



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
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
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
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

async function reverseGeocodeLocation(lat, lng) {
  try {
    const result = await api("/api/reverse-geocode", {
      method: "POST",
      body: JSON.stringify({ lat, lng })
    });

    if (result.success) {
      // Auto-fill country/province/city based on reverse geocoding
      $("#countrySelect").value = result.country;
      renderProvinceOptions(result.country);
      
      if (result.country === "China" && result.province) {
        $("#provinceSelect").value = result.province;
        renderCityOptions(result.province);
        if (result.city) {
          $("#citySelect").value = result.city;
        }
      }
    }
  } catch (error) {
    // Silent fail - reverse geocoding is optional
    console.log("Reverse geocoding not available:", error.message);
  }
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
    $("#map").innerHTML = '<div class="map-fallback">Map resources failed to load. Please check your connection and refresh.</div>';
    return;
  }

  state.map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 0.8,
    zoomControl: false
  });

  // Prevent browser zoom on pinch gesture
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
    div.innerHTML = '<p class="legend-title">Mood</p>';
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
      $("#submitStatus").textContent = "Invalid coordinates.";
      switchTab("submit");
      return;
    }
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

    // Create popup with title, author, and location
    let popupContent = `<strong>${post.title || "Untitled"}</strong>`;
    if (post.author) {
      popupContent += `<br><em>${post.author}</em>`;
    }
    let location = post.country || "Unknown";
    if (post.province && post.province !== post.country) {
      location += ` / ${post.province}`;
    }
    if (post.city && post.city !== post.province && post.city !== post.country) {
      location += ` / ${post.city}`;
    }
    popupContent += `<br>${location} - ${post.placeName}`;

    marker.bindPopup(popupContent);
    // 使用 openPopup() 确保popup正确展开，然后处理侧栏选择
    marker.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      marker.openPopup();
      state.selectedId = post.id;
      render();
      switchTab("read");
    });
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
    list.innerHTML = '<p class="microcopy">No memories found with this mood.</p>';
    return;
  }

  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".story-card");
    const button = node.querySelector(".story-button");
    
    // Build location string: country / province / city or country / city
    let location = post.country || "Unknown";
    if (post.province && post.province !== post.country) {
      location += ` / ${post.province}`;
    }
    if (post.city && post.city !== post.province && post.city !== post.country) {
      location += ` / ${post.city}`;
    }
    
    let topline = `${moods[post.mood] || "Unspecified"} / ${location} / ${formatDate(post.createdAt)}`;
    if (post.author) {
      topline += ` / ${post.author}`;
    }
    node.querySelector(".story-topline").textContent = topline;
    node.querySelector("strong").textContent = post.title || "Untitled";
    node.querySelector("p").textContent = post.body;
    card.classList.toggle("selected", state.selectedId === post.id);
    button.addEventListener("click", () => focusPost(post));
    list.append(node);
  });
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
  
  // Set default to China
  select.value = "CHINA";
  renderProvinceOptions("CHINA");
}

function renderProvinceOptions(country) {
  const select = $("#provinceSelect");
  select.innerHTML = "";
  
  if (country === "CHINA") {
    // China provinces
    chinaProvinces.forEach(prov => {
      const option = document.createElement("option");
      option.value = prov;
      option.textContent = prov;
      select.append(option);
    });
    select.value = chinaProvinces[0];
    renderCityOptions(chinaProvinces[0]);
  } else {
    // For non-China countries, province = country
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
    select.value = country;
    
    // City = country for non-China
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

function applyRegionCenter(country, options = {}) {
  // Region center no longer used with new country/province/city system
  return;
}

function renderAuth() {
  const loggedIn = Boolean(state.user);
  const isAdminUser = loggedIn && state.user.role === "admin";

  $("#authBox").classList.toggle("hidden", loggedIn);
  $("#mineBox").classList.toggle("hidden", !loggedIn || isAdminUser);
  $("#adminBox").classList.toggle("hidden", !isAdminUser);

  $("#submitIdentity").textContent = loggedIn
    ? `${state.user.username} - Publish Immediately`
    : "Submit as guest / Publish Immediately";

  if (loggedIn) {
    $("#currentUsername").textContent = state.user.username;
    if (isAdminUser) {
      $("#adminUsername").textContent = `${state.user.username} (Admin)`;
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
    list.innerHTML = '<p class="microcopy">No submissions with this status. Guest submissions won\'t appear here.</p>';
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
        console.error("Failed:", error.message);
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
    list.innerHTML = '<p class="microcopy">No submissions with this status.</p>';
    return;
  }

  filtered.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.province} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".post-body").textContent = post.body;

    // Delete button
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.addEventListener("click", async () => {
      try {
        await api(`/api/admin/posts/${post.id}/delete`, { method: "POST" });
        await loadAdminPosts();
      } catch (error) {
        console.error("Failed:", error.message);
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
    console.error("Failed to load admin posts:", error);
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

  // Language switch
  $("#openLang").addEventListener("click", () => {
    window.location.href = "/index-zh.html";
  });

  $("#countrySelect").addEventListener("change", event => {
    const country = event.target.value;
    renderProvinceOptions(country);
    if (country === "CHINA") {
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
    }
  });

  $("#provinceSelect").addEventListener("change", event => {
    const province = event.target.value;
    const country = $("#countrySelect").value;
    if (country === "CHINA") {
      renderCityOptions(province);
    }
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
    status.textContent = "Submitting...";
    try {
      await api("/api/posts", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      form.reset();
      $("#countrySelect").value = "CHINA";
      renderProvinceOptions("CHINA");
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
      status.textContent = state.user
        ? "Submitted. Check 'My Posts' to track status."
        : "Submitted as guest. Published immediately but cannot be recovered.";
      await Promise.all([loadPosts(), loadMyPosts()]);
    } catch (error) {
      status.textContent = error.message;
    }
  });

  $("#loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = "Logging in...";
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
    status.textContent = "Registering...";
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

  // Admin filters
  $$("[data-admin-filter]").forEach(button => {
    button.addEventListener("click", () => {
      state.adminFilter = button.dataset.adminFilter;
      $$("[data-admin-filter]").forEach(item => item.classList.toggle("active", item === button));
      renderAdminPosts();
    });
  });

  // Admin logout
  $("#adminLogoutButton").addEventListener("click", () => {
    clearSession();
    render();
  });

  // Feedback modal
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
    statusEl.textContent = "Submitting...";
    try {
      await api("/api/feedback", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      statusEl.textContent = "Thank you for your feedback!";
      setTimeout(() => {
        $("#feedbackModal").classList.add("hidden");
        statusEl.textContent = "";
      }, 2000);
    } catch (error) {
      statusEl.textContent = "Failed: " + error.message;
    }
  });
}

renderCountryOptions();
initMap();
wireEvents();
restoreSession();
loadPosts();
