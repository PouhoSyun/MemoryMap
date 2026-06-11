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
const regions = {
  "North America": ["USA", "Canada", "Mexico"],
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

const regionCoordinates = {
  "North America": { "USA": [37.0902, -95.7129], "Canada": [56.1304, -106.3468], "Mexico": [23.6345, -102.5528] },
  "Central America": { "Guatemala": [15.7835, -90.2308], "Honduras": [15.1999, -86.2419], "El Salvador": [13.7942, -88.8965], "Nicaragua": [12.8654, -85.2072], "Costa Rica": [9.7489, -83.7534], "Panama": [8.538, -80.7821], "Cuba": [21.5218, -77.7812], "Haiti": [18.9712, -72.2852], "Dominican Republic": [18.7357, -70.1627] },
  "South America": { "Brazil": [-14.235, -51.9253], "Argentina": [-38.4161, -63.6167], "Chile": [-35.6751, -71.543], "Colombia": [4.5709, -74.2973], "Peru": [-9.19, -75.0152], "Venezuela": [6.4238, -66.5897], "Ecuador": [-1.8312, -78.1834], "Bolivia": [-16.2902, -63.5887], "Paraguay": [-23.4425, -58.4438], "Uruguay": [-32.5228, -55.7658] },
  "Western Europe": { "UK": [55.3781, -3.436], "France": [46.2276, 2.2137], "Germany": [51.1657, 10.4515], "Netherlands": [52.1326, 5.2913], "Belgium": [50.8503, 4.3517], "Switzerland": [46.8182, 8.2275], "Austria": [47.5162, 14.5501], "Ireland": [53.1424, -7.6921], "Portugal": [39.3999, -8.2245], "Spain": [40.4637, -3.7492] },
  "Eastern Europe": { "Poland": [51.9194, 19.1451], "Czech Republic": [49.8175, 15.473], "Slovakia": [48.669, 19.699], "Hungary": [47.1625, 19.5033], "Romania": [45.9432, 24.9668], "Bulgaria": [42.7339, 25.4858], "Croatia": [45.1, 15.2], "Serbia": [44.0165, 21.0059], "Ukraine": [48.3794, 31.1656] },
  "Northern Europe": { "Norway": [60.472, 8.4689], "Sweden": [60.1282, 18.6435], "Finland": [61.9241, 25.7482], "Denmark": [56.2639, 9.5018], "Iceland": [64.9631, -19.0208] },
  "Southern Europe": { "Italy": [41.8719, 12.5674], "Greece": [39.0742, 21.8243], "Turkey": [38.9637, 35.2433], "Cyprus": [35.1264, 33.4299] },
  "Middle East": { "Israel": [31.0461, 34.8516], "Saudi Arabia": [23.8859, 45.0792], "UAE": [23.4241, 53.8478], "Iran": [32.4279, 53.688], "Iraq": [33.2232, 43.6793], "Jordan": [30.5852, 36.2384], "Lebanon": [33.8547, 35.8623], "Kuwait": [29.3759, 47.9774], "Qatar": [25.3548, 51.1839] },
  "North Africa": { "Egypt": [26.8206, 30.8025], "Libya": [26.3351, 17.2283], "Tunisia": [33.8869, 9.5375], "Algeria": [28.0339, 1.6596], "Morocco": [31.7917, -7.0926] },
  "West Africa": { "Nigeria": [9.082, 8.6753], "Ghana": [7.9465, -1.0232], "Senegal": [14.4974, -14.4524], "Ivory Coast": [7.54, -5.5471], "Guinea": [11.0, -10.9408] },
  "East Africa": { "Kenya": [-0.0236, 37.9062], "Ethiopia": [9.145, 40.4897], "Tanzania": [-6.369, 34.8888], "Uganda": [1.3733, 32.2903], "Rwanda": [-1.9403, 29.8739] },
  "Central Africa": { "Congo": [-0.228, 15.827], "Cameroon": [3.848, 11.502], "Central African Republic": [6.6111, 20.9394], "Chad": [15.4542, 18.7322] },
  "Southern Africa": { "South Africa": [-30.5595, 22.9375], "Zimbabwe": [-19.0154, 29.1549], "Zambia": [-13.1339, 27.8493], "Mozambique": [-18.6657, 35.5296], "Botswana": [-22.3285, 24.6849] },
  "Russia & Central Asia": { "Russia": [61.524, 105.3188], "Kazakhstan": [48.0196, 66.9237], "Uzbekistan": [41.3775, 64.5853], "Kyrgyzstan": [41.2044, 74.7661], "Tajikistan": [38.861, 71.2761] },
  "East Asia": { "Japan": [36.2048, 138.2529], "South Korea": [35.9078, 127.7669], "China": [35.8617, 104.1954], "North Korea": [40.3399, 127.5101], "Mongolia": [46.8625, 103.8467] },
  "Southeast Asia": { "Thailand": [15.87, 100.9925], "Vietnam": [14.0583, 108.2772], "Indonesia": [-0.7893, 113.9213], "Malaysia": [4.2105, 101.9758], "Philippines": [12.8797, 121.774], "Singapore": [1.3521, 103.8198], "Myanmar": [21.9162, 95.956], "Cambodia": [12.5657, 104.991], "Laos": [19.8563, 102.4955] },
  "South Asia": { "India": [20.5937, 78.9629], "Pakistan": [30.3753, 69.3451], "Bangladesh": [23.685, 90.3563], "Sri Lanka": [7.8731, 80.7718], "Nepal": [28.3949, 84.124], "Bhutan": [27.5142, 90.4336] },
  "Oceania": { "Australia": [-25.2744, 133.7751], "New Zealand": [-40.9006, 172.886], "Papua New Guinea": [-6.315, 143.9555], "Fiji": [-17.7134, 178.065] }
};

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
    list.innerHTML = '<p class="microcopy">No memories found with this mood.</p>';
    return;
  }

  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".story-card");
    const button = node.querySelector(".story-button");
    node.querySelector(".story-topline").textContent = `${moods[post.mood] || "Unspecified"} / ${post.province} / ${formatDate(post.createdAt)}`;
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

function applyRegionCenter(country, options = {}) {
  const mainRegion = $("#mainRegionSelect") ? $("#mainRegionSelect").value : null;
  if (state.locationSource === "map" && !options.force) {
    $("#submitStatus").textContent = "Region updated. Map location preserved.";
    return;
  }
  let center = null;
  if (mainRegion && regionCoordinates[mainRegion] && regionCoordinates[mainRegion][country]) {
    center = regionCoordinates[mainRegion][country];
  }
  if (!center) return;
  setDraftLocation(center[0], center[1], "region");
  if (state.map) state.map.setView(center, Math.max(state.map.getZoom(), 4), { animate: true });
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
    status.textContent = "Submitting...";
    try {
      await api("/api/posts", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      form.reset();
      $("#mainRegionSelect").value = "North America";
      renderSubRegionOptions("North America");
      $("#provinceSelect").value = "USA";
      applyRegionCenter("USA", { force: true });
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

renderMainRegionOptions();
renderSubRegionOptions("North America");
initMap();
$("#mainRegionSelect").value = "North America";
$("#provinceSelect").value = "USA";
applyRegionCenter("USA", { force: true });
wireEvents();
restoreSession();
loadPosts();
