# 📋 两级地区选择 + 反馈功能 - 实现计划

## 功能需求分析

### 1️⃣ 反馈功能 (Feedback)

#### UI 设计
- 在 "说明" 标签页中添加 "提交反馈" 按钮
- 点击后显示模态框，包含：
  - 反馈类型 (bug、建议、其他)
  - 反馈标题 (必填)
  - 反馈内容 (必填)
  - 联系方式 (可选)
  - 提交按钮

#### 后端 API
```
POST /api/feedback
{
  type: "bug" | "suggestion" | "other",
  title: string,
  content: string,
  contact?: string,
  userAgent?: string,
  timestamp: ISO8601
}

Response: { ok: true, id: uuid }
```

#### 数据存储
- 创建 `data/feedback.json` 存储反馈
- 存储所有反馈记录

---

### 2️⃣ 两级地区选择

#### 中文版本 (app-zh.js)

**第一级：大陆/地区选择**
```javascript
const regions = {
  "中国": ["北京市", "天津市", "河北省", ...],
  "北美": ["美国", "加拿大", "墨西哥"],
  "南美": ["巴西", "阿根廷", "智利", ...],
  "西欧": ["英国", "法国", "德国", ...],
  "东欧": ["波兰", "乌克兰", "俄罗斯", ...],
  // ...
}
```

**第二级：具体省份/国家坐标**
```javascript
const regionCoordinates = {
  "中国": {
    "北京市": [39.9042, 116.4074],
    "天津市": [39.3434, 117.3616],
    // ...
  },
  "北美": {
    "美国": [37.0902, -95.7129],
    "加拿大": [56.1304, -106.3468],
    // ...
  }
}
```

**地图初始化**
- 默认地区：中国
- 默认省份：辽宁省 (沈阳)

---

#### 英文版本 (app-global.js)

**第一级：地区选择**
```javascript
const regions = {
  "North America": ["USA", "Canada", "Mexico"],
  "South America": ["Brazil", "Argentina", "Chile", ...],
  "Western Europe": ["UK", "France", "Germany", ...],
  "Eastern Europe": ["Poland", "Ukraine", "Russia", ...],
  // ...
}
```

**地图初始化**
- 默认地区：North America
- 默认国家：USA

---

## 实现步骤

### 步骤 1: 后端修改 (server.js)

#### 1.1 添加反馈文件初始化
```javascript
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");

async function ensureFeedbackStore() {
  try {
    await fs.access(FEEDBACK_FILE);
  } catch {
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify([], null, 2));
  }
}
```

#### 1.2 添加反馈 API 端点
```javascript
// POST /api/feedback
if (req.method === "POST" && url.pathname === "/api/feedback") {
  const input = await parseJson(req);
  
  // 验证必填字段
  if (!input.title || !input.content) {
    send(res, 400, { error: "Title and content are required" });
    return;
  }
  
  // 保存反馈
  const feedback = {
    id: randomUUID(),
    type: input.type || "other",
    title: input.title,
    content: input.content,
    contact: input.contact || null,
    userAgent: req.headers["user-agent"],
    createdAt: new Date().toISOString()
  };
  
  const feedbacks = await readFeedbacks();
  feedbacks.push(feedback);
  await writeFeedbacks(feedbacks);
  
  send(res, 201, { ok: true, id: feedback.id });
  return;
}
```

#### 1.3 添加读写反馈的函数
```javascript
async function readFeedbacks() {
  await ensureFeedbackStore();
  const raw = await fs.readFile(FEEDBACK_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeFeedbacks(feedbacks) {
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
}
```

---

### 步骤 2: 前端 HTML 修改

#### 2.1 中文版本 (index-zh.html)

在 "说明" 部分添加反馈按钮和模态框：

```html
<section class="tab-panel" id="aboutPanel">
  <div class="panel-heading">
    <p class="eyebrow">关于</p>
    <h2>一个不要求答案的公共树洞。</h2>
  </div>
  <div class="about-copy">
    <p>回声树洞面向个人情感，也允许日常片段、秘密、悔意、感谢、梦、告别和那些不好归类的话。</p>
    <p>它不是求助热线，也不是公开审判场。我们保留最低限度的审核：保护隐私、避免人身攻击、拒绝违法或危险引导。</p>
    <p>地点只用于让记忆有一个可以停靠的坐标。地图底图来自 OpenStreetMap，投稿范围全球有效。</p>
    <button class="primary-btn" id="openFeedback" type="button" style="margin-top: 16px;">提交反馈</button>
  </div>
</section>

<!-- 反馈模态框 -->
<div id="feedbackModal" class="modal hidden">
  <div class="modal-content">
    <div class="modal-header">
      <h2>提交反馈</h2>
      <button class="modal-close" id="closeFeedback">×</button>
    </div>
    <form id="feedbackForm" class="stack">
      <label>
        <span>反馈类型</span>
        <select name="type">
          <option value="bug">Bug 报告</option>
          <option value="suggestion">建议</option>
          <option value="other">其他</option>
        </select>
      </label>
      <label>
        <span>标题 *</span>
        <input name="title" maxlength="100" required placeholder="简短描述你的反馈" />
      </label>
      <label>
        <span>内容 *</span>
        <textarea name="content" maxlength="1000" required placeholder="详细说明..."></textarea>
      </label>
      <label>
        <span>联系方式 (可选)</span>
        <input name="contact" maxlength="100" placeholder="邮箱或其他联系方式" />
      </label>
      <button class="primary-btn" type="submit">提交</button>
      <p class="status-line" id="feedbackStatus"></p>
    </form>
  </div>
</div>
```

#### 2.2 地区两级菜单 HTML

```html
<!-- 在投稿表单中 -->
<div class="field-grid">
  <label>
    <span>地区</span>
    <select name="mainRegion" id="mainRegionSelect" required></select>
  </label>
  <label>
    <span>省份/地区</span>
    <select name="province" id="provinceSelect" required></select>
  </label>
</div>
```

---

### 步骤 3: 前端 JavaScript 修改

#### 3.1 反馈功能 (app-zh.js 和 app-global.js)

```javascript
// 反馈数据
const feedbackTypes = {
  bug: "Bug 报告",
  suggestion: "建议",
  other: "其他"
};

// 打开/关闭反馈模态框
$("#openFeedback").addEventListener("click", () => {
  $("#feedbackModal").classList.remove("hidden");
});

$("#closeFeedback").addEventListener("click", () => {
  $("#feedbackModal").classList.add("hidden");
});

// 提交反馈
$("#feedbackForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  
  try {
    const result = await api("/api/feedback", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    
    form.reset();
    $("#feedbackStatus").textContent = "感谢你的反馈！";
    setTimeout(() => {
      $("#feedbackModal").classList.add("hidden");
      $("#feedbackStatus").textContent = "";
    }, 2000);
  } catch (error) {
    $("#feedbackStatus").textContent = "提交失败: " + error.message;
  }
});
```

#### 3.2 两级地区菜单 (app-zh.js)

```javascript
// 更新的地区结构
const regions = {
  "中国": ["北京市", "天津市", "河北省", ..., "新疆维吾尔自治区"],
  "北美": ["美国", "加拿大", "墨西哥"],
  "南美": ["巴西", "阿根廷", "智利", ...],
  "西欧": ["英国", "法国", "德国", ...],
  "东欧": ["波兰", "乌克兰", "俄罗斯", ...],
  // ...
};

const regionCoordinates = {
  "中国": {
    "北京市": [39.9042, 116.4074],
    // ...
  },
  "北美": {
    "美国": [37.0902, -95.7129],
    // ...
  }
};

// 渲染第一级菜单
function renderMainRegionOptions() {
  const select = $("#mainRegionSelect");
  select.innerHTML = "";
  Object.keys(regions).forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    select.append(option);
  });
  select.value = "中国"; // 默认选中中国
}

// 监听第一级菜单变化
$("#mainRegionSelect").addEventListener("change", event => {
  const mainRegion = event.target.value;
  const subRegions = regions[mainRegion] || [];
  
  // 更新第二级菜单
  const select = $("#provinceSelect");
  select.innerHTML = "";
  subRegions.forEach(sub => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    select.append(option);
  });
  
  // 选择第一个选项
  if (subRegions.length > 0) {
    select.value = subRegions[0];
    // 更新地图
    const coords = regionCoordinates[mainRegion][subRegions[0]];
    if (coords) {
      setDraftLocation(coords[0], coords[1], "region");
    }
  }
});

// 监听第二级菜单变化
$("#provinceSelect").addEventListener("change", event => {
  const mainRegion = $("#mainRegionSelect").value;
  const province = event.target.value;
  const coords = regionCoordinates[mainRegion][province];
  if (coords) {
    setDraftLocation(coords[0], coords[1], "region");
  }
});
```

---

### 步骤 4: CSS 样式 (styles.css)

```css
/* 反馈模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal.hidden {
  display: none;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--muted);
}

.modal-close:hover {
  color: var(--ink);
}
```

---

## 实现顺序

1. ✅ 后端：添加反馈 API 和数据存储
2. ✅ 前端 HTML：添加反馈按钮和模态框
3. ✅ 前端 HTML：修改地区为两级选择
4. ✅ 前端 JavaScript：实现反馈功能
5. ✅ 前端 JavaScript：实现两级地区菜单
6. ✅ 前端 CSS：添加模态框样式
7. ✅ 测试所有功能

---

## 预期效果

### 反馈功能
- 用户点击 "提交反馈" → 弹出模态框
- 填写反馈信息并提交
- 反馈被保存到后端数据库
- 用户看到成功提示

### 两级地区选择
- 中文版：选择 "中国" → 显示 31 个省份
- 中文版：选择 "北美" → 显示北美国家
- 地图自动移动到选定位置
- 投稿时使用选定的省份/国家名称

---

**预计工作量**: 2-3 小时
**难度**: ⭐⭐⭐ (中等)
**优先级**: 🔴 高
