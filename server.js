const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { randomBytes, randomUUID, scryptSync, timingSafeEqual } = require("crypto");
const url = require("url");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");

const PORT = Number(process.env.PORT || 4172);

// Load GeoJSON files for reverse geocoding
let chinaGeoJSON = null;
let globalGeoJSON = null;

async function loadGeoJSONFiles() {
  try {
    const chinaPath = path.join(ROOT, 'city-zh.geojson');
    const globalPath = path.join(ROOT, 'country-global.geojson');
    
    const chinaRaw = await fs.readFile(chinaPath, 'utf8');
    chinaGeoJSON = JSON.parse(chinaRaw);
    console.log('China GeoJSON loaded for reverse geocoding');
    
    const globalRaw = await fs.readFile(globalPath, 'utf8');
    globalGeoJSON = JSON.parse(globalRaw);
    console.log('Global GeoJSON loaded for reverse geocoding');
  } catch (e) {
    console.warn('Failed to load GeoJSON files:', e.message);
  }
}

// Load Global GeoJSON for country reverse geocoding
async function loadGlobalGeoJSON() {
  try {
    const geoJsonPath = path.join(ROOT, 'country-global.geojson');
    const raw = await fs.readFile(geoJsonPath, 'utf8');
    globalGeoJSON = JSON.parse(raw);
    console.log('Global GeoJSON loaded for country reverse geocoding');
  } catch (e) {
    console.warn('Failed to load Global GeoJSON:', e.message);
  }
}

// Point-in-polygon test using ray casting algorithm
function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  
  return inside;
}

function getFeatureRings(feature) {
  if (!feature.geometry) return [];
  if (feature.geometry.type === "Polygon") return [feature.geometry.coordinates[0]];
  if (feature.geometry.type === "MultiPolygon") return feature.geometry.coordinates.map(polygon => polygon[0]);
  return [];
}

function getLocalizedCountryName(properties = {}, useChinese = false) {
  const chineseName = normalizeText(properties.FCNAME, 80);
  const englishName = normalizeText(properties.NAME, 80);
  return useChinese ? chineseName : (englishName || chineseName);
}

// Reverse geocode a coordinate - returns { country, province, city }
// For China: all three fields filled with province/city info (all Chinese)
// For other countries: country filled with Chinese name, province and city set to country name (all Chinese)
function reverseGeocodeLocation(lat, lng, useChinese = false) {
  const point = [lng, lat]; // GeoJSON uses [lng, lat]

  // First try China - 中国优先判定
  if (chinaGeoJSON && chinaGeoJSON.features) {
    for (const feature of chinaGeoJSON.features) {
      for (const coords of getFeatureRings(feature)) {
        if (pointInPolygon(point, coords)) {
          return {
            country: '中国',
            province: feature.properties.province,
            city: feature.properties.city,
            source: 'china'
          };
        }
      }
    }
  }

  // Not in China, try global - 国外判定
  // 中文版本：总是使用 FCNAME（中文国名）
  // 国外缺少省市数据，用国名填充 province 和 city
  if (globalGeoJSON && globalGeoJSON.features) {
    for (const feature of globalGeoJSON.features) {
      const countryName = getLocalizedCountryName(feature.properties, useChinese);
      if (!countryName) continue;
      for (const coords of getFeatureRings(feature)) {
        if (pointInPolygon(point, coords)) {
          return {
            country: countryName,
            province: countryName,
            city: countryName,
            source: 'global'
          };
        }
      }
    }
  }

  return null;
}

// Reverse geocode a coordinate to find country (global)
function reverseGeocodeCountry(lat, lng) {
  if (!globalGeoJSON || !globalGeoJSON.features) return null;
  
  const point = [lng, lat]; // GeoJSON uses [lng, lat]
  
  for (const feature of globalGeoJSON.features) {
    if (!feature.geometry) continue;
    
    if (feature.geometry.type === 'Polygon') {
      const coords = feature.geometry.coordinates[0];
      if (pointInPolygon(point, coords)) {
        return {
          country: feature.properties.NAME,
          countryZh: feature.properties.FCNAME
        };
      }
    } else if (feature.geometry.type === 'MultiPolygon') {
      for (const polygon of feature.geometry.coordinates) {
        const coords = polygon[0];
        if (pointInPolygon(point, coords)) {
          return {
            country: feature.properties.NAME,
            countryZh: feature.properties.FCNAME
          };
        }
      }
    }
  }
  
  return null;
}
const HOST = process.env.HOST || "0.0.0.0";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "taxtax-admin";
const ADMIN_USERNAME = "admin";
const ADMIN_ACCOUNT_PASSWORD = process.env.ADMIN_ACCOUNT_PASSWORD || "moodylitchee";
const sessions = new Map();

// Rate limiting tracking (IP -> { count, timestamp })
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMITS = {
  "/api/auth/login": 5,
  "/api/auth/register": 3,
  "/api/posts": 20,
  "/api/reverse-geocode": 100,
  "/api/feedback": 10,
  "default": 100
};

// Admin panel IP whitelist (empty = allow all; set in env var ADMIN_IPS)
const ADMIN_WHITELIST = process.env.ADMIN_IPS ? process.env.ADMIN_IPS.split(",").map(ip => ip.trim()) : [];

// Request logging
const LOG_DIR = path.join(DATA_DIR, "logs");
async function ensureLogDir() {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
  } catch (e) {
    console.error("Failed to create log dir:", e.message);
  }
}

async function logEvent(type, details) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, type, ...details };
    const logFile = path.join(LOG_DIR, `${new Date().toISOString().split("T")[0]}.log`);
    await fs.appendFile(logFile, JSON.stringify(logEntry) + "\n");
  } catch (e) {
    console.error("Logging failed:", e.message);
  }
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

const seedPosts = [
  {
    id: "seed-1",
    title: "凌晨的站台",
    body: "那天在北京南站等首班地铁，忽然觉得自己不是在赶路，而是在等一个重新开始的自己。",
    mood: "lonely",
    placeName: "北京南站",
    country: "中国",
    province: "北京市",
    city: "北京市",
    lat: 39.8652,
    lng: 116.3785,
    status: "approved",
    createdAt: "2026-05-19T22:30:00.000Z",
    reviewedAt: "2026-05-20T08:10:00.000Z"
  },
  {
    id: "seed-2",
    title: "把话留给江风",
    body: "我在武汉江边散步到很晚，想说的话没有发出去。后来风吹过来，我突然不急着被谁理解了。",
    mood: "calm",
    placeName: "武汉江滩",
    country: "中国",
    province: "湖北省",
    city: "武汉市",
    lat: 30.5949,
    lng: 114.3055,
    status: "approved",
    createdAt: "2026-05-23T14:12:00.000Z",
    reviewedAt: "2026-05-23T18:03:00.000Z"
  },
  {
    id: "seed-3",
    title: "南方雨天",
    body: "广州的雨很会替人保密。那天我坐在便利店窗边，把难过吃成了一碗热关东煮。",
    mood: "tender",
    placeName: "广州越秀",
    country: "中国",
    province: "广东省",
    city: "广州市",
    lat: 23.1291,
    lng: 113.2644,
    status: "approved",
    createdAt: "2026-05-28T09:45:00.000Z",
    reviewedAt: "2026-05-28T11:11:00.000Z"
  }
];

// 地理限制已移除，支持全球坐标投稿

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await ensureLogDir();
  await loadGeoJSONFiles();
  await loadGlobalGeoJSON();
  try {
    await fs.access(POSTS_FILE);
  } catch {
    await fs.writeFile(POSTS_FILE, JSON.stringify(seedPosts, null, 2));
  }
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
  }
  await ensureAdminAccount();
}

async function ensureAdminAccount() {
  const raw = await fs.readFile(USERS_FILE, "utf8");
  const users = JSON.parse(raw);
  const admin = users.find(user => user.username.toLowerCase() === ADMIN_USERNAME);
  let changed = false;

  if (!admin) {
    users.push({
      id: randomUUID(),
      username: ADMIN_USERNAME,
      passwordHash: hashPassword(ADMIN_ACCOUNT_PASSWORD),
      role: "admin",
      createdAt: new Date().toISOString()
    });
    changed = true;
  } else {
    if (admin.role !== "admin") {
      admin.role = "admin";
      changed = true;
    }
    if (!verifyPassword(ADMIN_ACCOUNT_PASSWORD, admin.passwordHash)) {
      admin.passwordHash = hashPassword(ADMIN_ACCOUNT_PASSWORD);
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }
}

async function readPosts() {
  await ensureStore();
  const raw = await fs.readFile(POSTS_FILE, "utf8");
  return JSON.parse(raw);
}

async function writePosts(posts) {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

async function readUsers() {
  await ensureStore();
  const raw = await fs.readFile(USERS_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readFeedbacks() {
  await ensureFeedbackStore();
  const raw = await fs.readFile(FEEDBACK_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeFeedbacks(feedbacks) {
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
}

async function ensureFeedbackStore() {
  try {
    await fs.access(FEEDBACK_FILE);
  } catch {
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify([], null, 2));
  }
}

function getClientIP(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0].trim() || 
         req.headers["x-real-ip"] || 
         req.socket.remoteAddress || 
         "unknown";
}

function checkRateLimit(ip, endpoint) {
  const now = Date.now();
  const key = `${ip}:${endpoint}`;
  const limit = RATE_LIMITS[endpoint] || RATE_LIMITS.default;

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }

  const entry = rateLimitMap.get(key);
  if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

function send(res, status, payload, contentType = "application/json; charset=utf-8") {
  // Security headers
  res.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  });
  res.end(typeof payload === "string" ? payload : JSON.stringify(payload));
}

function parseJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1024 * 128) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function isAdmin(req) {
  return req.headers["x-admin-password"] === ADMIN_PASSWORD;
}

function isAdminIPAllowed(req) {
  if (ADMIN_WHITELIST.length === 0) return true; // No whitelist = allow all
  const clientIP = getClientIP(req);
  return ADMIN_WHITELIST.includes(clientIP);
}

async function isAdminRequest(req) {
  if (isAdmin(req)) return true;
  const user = await currentUser(req);
  if (!user || user.role !== "admin") return false;
  // If whitelist is set, check IP
  if (ADMIN_WHITELIST.length > 0 && !isAdminIPAllowed(req)) {
    return false;
  }
  return true;
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  return original.length === candidate.length && timingSafeEqual(original, candidate);
}

function createToken(userId) {
  const token = randomBytes(32).toString("hex");
  sessions.set(token, userId);
  return token;
}

function bearerToken(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

async function currentUser(req) {
  const token = bearerToken(req);
  if (!token) return null;
  const userId = sessions.get(token);
  if (!userId) return null;
  const users = await readUsers();
  return users.find(user => user.id === userId) || null;
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role || "user",
    createdAt: user.createdAt
  };
}

function normalizeText(value, max) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, max);
}

function normalizeBody(value) {
  return String(value || "").trim().replace(/\r\n/g, "\n").slice(0, 1200);
}

function isValidCoordinate(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  // 全球范围：纬度 -90 到 90，经度 -180 到 180
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}


function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  // Remove null bytes and control characters
  return input.replace(/[ -]/g, "");
}

function validateCredentials(input, isRegister = false) {
  const username = normalizeText(sanitizeInput(input.username), 32);
  const password = String(input.password || "");
  if (!/^[A-Za-z0-9_-]{3,32}$/.test(username)) {
    return { error: "Username must be 3-32 characters: letters, numbers, underscore, hyphen" };
  }
  if (isRegister && password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  if (isRegister && password.length > 128) {
    return { error: "Password too long" };
  }
  if (!isRegister && !password) {
    return { error: "Please enter password" };
  }
  return { value: { username, password } };
}

function validateSubmission(input, user = null) {
  const title = normalizeText(sanitizeInput(input.title), 40);
  const body = normalizeBody(sanitizeInput(input.body));
  const author = normalizeText(sanitizeInput(input.author || ""), 30);
  const mood = normalizeText(sanitizeInput(input.mood), 24);
  const placeName = normalizeText(sanitizeInput(input.placeName), 60);
  const country = normalizeText(sanitizeInput(input.country || ""), 40);
  const province = normalizeText(sanitizeInput(input.province || ""), 40);
  const city = normalizeText(sanitizeInput(input.city || ""), 40);
  const lat = Number(input.lat);
  const lng = Number(input.lng);

  if (body.length < 8) return { error: "内容至少需要 8 个字。" };
  if (!placeName) return { error: "请写下一个地点名称。" };
  if (!country) return { error: "请选择国家。" };
  if (!isValidCoordinate(lat, lng)) return { error: "坐标无效，请检查纬度（-90 到 90）和经度（-180 到 180）。" };
  const createdAt = new Date().toISOString();

  return {
    value: {
      id: randomUUID(),
      title: title || "Untitled",
      body,
      author,
      mood: mood || "unspecified",
      placeName,
      country,
      province,
      city,
      lat,
      lng,
      userId: user ? user.id : null,
      authorMode: user ? "account" : "guest",
      status: "approved",
      createdAt,
      reviewedAt: createdAt
    }
  };
}

function publicPost(post) {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
    author: post.author,
    mood: post.mood,
    placeName: post.placeName,
    country: post.country,
    province: post.province,
    city: post.city,
    lat: post.lat,
    lng: post.lng,
    createdAt: post.createdAt
  };
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index-zh.html" : url.pathname;
  const resolved = path.normalize(path.join(PUBLIC_DIR, requested));

  if (!resolved.startsWith(PUBLIC_DIR)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  try {
    const file = await fs.readFile(resolved);
    const contentType = MIME_TYPES[path.extname(resolved)] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300"
    });
    res.end(file);
  } catch {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
  }
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const clientIP = getClientIP(req);

  // Rate limiting
  if (!checkRateLimit(clientIP, url.pathname)) {
    await logEvent("rate_limit_exceeded", { ip: clientIP, endpoint: url.pathname });
    send(res, 429, { error: "Too many requests. Please try again later." });
    return;
  }
  
  console.log("API request:", req.method, url.pathname);

  if (req.method === "POST" && url.pathname === "/api/reverse-geocode") {
    const input = await parseJson(req);
    const lat = Number(input.lat);
    const lng = Number(input.lng);
    const useChinese = input.language === "zh" || input.locale === "zh-CN";

    if (!isValidCoordinate(lat, lng)) {
      send(res, 400, { error: "Invalid coordinates: out of range" });
      return;
    }

    const result = reverseGeocodeLocation(lat, lng, useChinese);
    if (result) {
      send(res, 200, { success: true, country: result.country, province: result.province, city: result.city, source: result.source });
    } else {
      send(res, 200, { success: false, message: "Location not found" });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    const input = await parseJson(req);
    const validated = validateCredentials(input, true);
    if (validated.error) {
      send(res, 400, { error: validated.error });
      return;
    }
    const users = await readUsers();
    const usernameKey = validated.value.username.toLowerCase();
    if (users.some(user => user.username.toLowerCase() === usernameKey)) {
      send(res, 409, { error: "这个账号已经被注册。" });
      return;
    }
    const user = {
      id: randomUUID(),
      username: validated.value.username,
      passwordHash: hashPassword(validated.value.password),
      role: "user",
      createdAt: new Date().toISOString()
    };
    users.push(user);
    await writeUsers(users);
    const token = createToken(user.id);
    await logEvent("user_registered", { username: user.username, ip: clientIP });
    send(res, 201, { ok: true, token, user: publicUser(user) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const input = await parseJson(req);
    const validated = validateCredentials(input);
    if (validated.error) {
      send(res, 400, { error: validated.error });
      return;
    }
    const users = await readUsers();
    const user = users.find(item => item.username.toLowerCase() === validated.value.username.toLowerCase());
    if (!user || !verifyPassword(validated.value.password, user.passwordHash)) {
      await logEvent("login_failed", { username: validated.value.username, ip: clientIP });
      send(res, 401, { error: "账号或密码不正确。" });
      return;
    }
    const token = createToken(user.id);
    await logEvent("login_success", { username: user.username, ip: clientIP });
    send(res, 200, { ok: true, token, user: publicUser(user) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/me") {
    const user = await currentUser(req);
    if (!user) {
      send(res, 401, { error: "请先登录。" });
      return;
    }
    send(res, 200, { user: publicUser(user) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/me/posts") {
    const user = await currentUser(req);
    if (!user) {
      send(res, 401, { error: "请先登录后查看自己的投稿。" });
      return;
    }
    const posts = await readPosts();
    send(res, 200, posts.filter(post => post.userId === user.id));
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/posts") {
    const posts = await readPosts();
    send(res, 200, posts.filter(post => post.status === "approved").map(publicPost));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/posts") {
    const input = await parseJson(req);
    const user = await currentUser(req);
    const validated = validateSubmission(input, user);
    if (validated.error) {
      send(res, 400, { error: validated.error });
      return;
    }
    const posts = await readPosts();
    posts.unshift(validated.value);
    await writePosts(posts);
    send(res, 201, { ok: true, id: validated.value.id, status: "pending" });
    return;
  }

  if (url.pathname === "/api/admin/posts") {
    if (!(await isAdminRequest(req))) {
      const clientIP = getClientIP(req);
      await logEvent("unauthorized_admin_access", { ip: clientIP, endpoint: url.pathname });
      send(res, 403, { error: "需要管理员账号。" });
      return;
    }
    const posts = await readPosts();
    send(res, 200, posts);
    return;
  }

  const actionMatch = url.pathname.match(/^\/api\/admin\/posts\/([^/]+)\/(approve|reject|delete)$/);
  if (req.method === "POST" && actionMatch) {
    if (!(await isAdminRequest(req))) {
      const clientIP = getClientIP(req);
      await logEvent("unauthorized_admin_action", { ip: clientIP, endpoint: url.pathname });
      send(res, 403, { error: "需要管理员账号。" });
      return;
    }
    const [, id, action] = actionMatch;
    const posts = await readPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      send(res, 404, { error: "Post not found." });
      return;
    }
    if (action === "delete") {
      posts.splice(index, 1);
      await logEvent("admin_delete_post", { postId: id, ip: clientIP });
    } else {
      posts[index].status = action === "approve" ? "approved" : "rejected";
      posts[index].reviewedAt = new Date().toISOString();
      await logEvent("admin_review_post", { postId: id, action, ip: clientIP });
    }
    await writePosts(posts);
    send(res, 200, { ok: true });
    return;
  }

  // 用户删除自己的投稿 (非游客)
  const deleteMatch = url.pathname.match(/^\/api\/posts\/([^/]+)\/delete$/);
  if (req.method === "POST" && deleteMatch) {
    const user = await currentUser(req);
    if (!user) {
      send(res, 401, { error: "Please log in to delete your post." });
      return;
    }
    const [, id] = deleteMatch;
    const posts = await readPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      send(res, 404, { error: "Post not found." });
      return;
    }
    const post = posts[index];
    // 只有投稿人或管理员可以删除
    if (post.userId !== user.id && user.role !== "admin") {
      send(res, 403, { error: "You can only delete your own posts." });
      return;
    }
    posts.splice(index, 1);
    await writePosts(posts);
    await logEvent("post_deleted", { postId: id, userId: user.id, ip: clientIP });
    send(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/feedback") {
    const input = await parseJson(req);

    // 验证必填字段
    if (!input.title || !input.content) {
      send(res, 400, { error: "Title and content are required." });
      return;
    }

    // 保存反馈
    const feedback = {
      id: randomUUID(),
      type: sanitizeInput(input.type) || "other",
      title: normalizeText(sanitizeInput(input.title), 100),
      content: normalizeBody(sanitizeInput(input.content)),
      contact: input.contact ? normalizeText(sanitizeInput(input.contact), 100) : null,
      userAgent: req.headers["user-agent"],
      createdAt: new Date().toISOString()
    };

    const feedbacks = await readFeedbacks();
    feedbacks.unshift(feedback);
    await writeFeedbacks(feedbacks);

    send(res, 201, { ok: true, id: feedback.id });
    return;
  }

  send(res, 404, { error: "API route not found." });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    send(res, 500, { error: error.message || "Server error." });
  }
});

ensureStore().then(() => {
  server.listen(PORT, HOST, () => {
    console.log(`Tree-hole map running at http://${HOST}:${PORT}`);
    console.log(`Admin password: ${ADMIN_PASSWORD}`);
  });
});
