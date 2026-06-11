# Global Memory Map - Quick Start Guide

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- 浏览器支持 ES6+

### 启动步骤

```bash
# 进入项目目录
cd /Users/pouhosyun/Documents/Coding/ClaudeCode

# 启动服务器
npm start
# 或
node server.js
```

服务器会在以下地址运行：
```
http://127.0.0.1:4173/
```

### 默认管理员账户
- **用户名**: `admin`
- **密码**: `moodylitchee` (可通过 `ADMIN_ACCOUNT_PASSWORD` 环境变量修改)
- **管理员密码**: `taxtax-admin` (可通过 `ADMIN_PASSWORD` 环境变量修改)

---

## 📍 主要功能

### 1. 全球投稿
- 点击地图选择位置或从下拉菜单选择地区
- 填写标题、内容、情绪、地点名称
- 支持游客投稿（立即发布）和注册用户投稿（需审核）

### 2. 账户系统
- 用户名：3-32 字符（字母、数字、下划线、短横线）
- 密码：至少 6 字符
- 支持中文/英文用户名

### 3. 地图浏览
- 按情绪过滤记忆 (Lonely, Calm, Sad 等)
- 点击地图标记查看记忆详情
- 全球范围支持

### 4. 管理后台
- 管理员可查看所有待审记忆
- 支持批准/拒绝/删除操作

---

## 🌍 全球地区列表

```
北美 (North America)
中美 (Central America)
南美 (South America)
西欧 (Western Europe)
东欧 (Eastern Europe)
北欧 (Northern Europe)
南欧 (Southern Europe)
中东 (Middle East)
北非 (North Africa)
西非 (West Africa)
东非 (East Africa)
中非 (Central Africa)
南非 (Southern Africa)
俄罗斯中亚 (Russia & Central Asia)
东亚 (East Asia)
东南亚 (Southeast Asia)
南亚 (South Asia)
大洋洲 (Oceania)
```

---

## 🔧 环境配置

### 服务器设置
```bash
# 修改端口 (默认 4173)
PORT=3000 npm start

# 修改主机 (默认 127.0.0.1)
HOST=0.0.0.0 npm start

# 修改管理员密码
ADMIN_PASSWORD=your-password npm start
ADMIN_ACCOUNT_PASSWORD=your-account-password npm start
```

### 浏览器本地存储
- 用户 Token: `memoryMapToken`
- 用户信息: `memoryMapUser`

---

## 📝 数据结构

### 投稿数据 (Post)
```javascript
{
  id: "UUID",
  title: "标题",
  body: "内容",
  mood: "lonely|tender|calm|...",
  placeName: "地点名称",
  province: "地区名称",
  lat: 纬度,
  lng: 经度,
  userId: "用户ID 或 null",
  authorMode: "account|guest",
  status: "pending|approved|rejected",
  createdAt: "ISO 8601 时间戳",
  reviewedAt: "审核时间戳"
}
```

### 用户数据 (User)
```javascript
{
  id: "UUID",
  username: "用户名",
  passwordHash: "加盐哈希密码",
  role: "user|admin",
  createdAt: "ISO 8601 时间戳"
}
```

---

## 🔐 安全特性

- ✅ 密码加盐哈希 (scrypt)
- ✅ Bearer Token 会话管理
- ✅ 内容长度限制 (标题 40 字, 正文 1200 字)
- ✅ 坐标有效性验证
- ✅ 用户名/密码格式验证

---

## 📊 API 端点

### 认证
- `POST /api/auth/register` - 注册账户
- `POST /api/auth/login` - 登录
- `GET /api/me` - 获取当前用户

### 投稿
- `GET /api/posts` - 获取所有已发布投稿
- `POST /api/posts` - 提交新投稿
- `GET /api/me/posts` - 获取当前用户投稿

### 管理
- `GET /api/admin/posts` - 获取所有投稿 (需管理员权限)
- `POST /api/admin/posts/{id}/approve` - 批准投稿
- `POST /api/admin/posts/{id}/reject` - 拒绝投稿
- `POST /api/admin/posts/{id}/delete` - 删除投稿

---

## 💾 数据存储

数据存储在本地 JSON 文件：
- `data/posts.json` - 所有投稿
- `data/users.json` - 用户账户

服务器启动时自动创建 `data/` 目录和初始数据。

---

## 🛠️ 常见问题

### Q: 如何重置管理员密码？
A: 修改 `ADMIN_ACCOUNT_PASSWORD` 环境变量后重启服务器。

### Q: 如何备份投稿数据？
A: 复制 `data/posts.json` 和 `data/users.json` 文件。

### Q: 支持多少并发用户？
A: 内存存储，适合小型部署。生产环境建议迁移至数据库。

### Q: 如何部署到生产环境？
A: 建议使用 PM2/Docker，配置环境变量，设置反向代理 (nginx)。

---

## 📚 文件结构

```
ClaudeCode/
├── server.js              # Node.js 后端服务器
├── package.json           # 项目配置
├── public/
│   ├── index.html         # 英文版主页
│   ├── app-global.js      # 国际化 JavaScript
│   ├── app.js             # 原中文版 (已更新)
│   └── styles.css         # 样式表
├── data/
│   ├── posts.json         # 投稿数据
│   └── users.json         # 用户数据
└── DEBUG_REPORT.md        # 改造报告
```

---

## 🌐 国际化

目前支持英文。如需添加中文版本：

1. 创建 `index-zh.html` (中文版本)
2. 创建 `app-zh.js` (中文 JavaScript)
3. 在顶栏添加语言切换按钮

或编辑 `index.html` 中的文本改为中文。

---

## 📞 技术支持

- 查看 `DEBUG_REPORT.md` 了解详细改造信息
- 检查浏览器控制台错误信息
- 查看服务器日志输出

---

**版本**: 0.2.0 | **发布日期**: 2026-06-11 | **状态**: Production Ready 🚀
