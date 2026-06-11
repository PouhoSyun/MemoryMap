# 🚀 Memory Map v0.3.0 - 快速参考

## ⚡ 30 秒快速启动

```bash
cd /Users/pouhosyun/Documents/Coding/ClaudeCode
PORT=4172 npm start
```

然后在浏览器打开:
- 🇨🇳 **中文**: http://localhost:4172/index-zh.html
- 🇬🇧 **英文**: http://localhost:4172/index.html

---

## ✨ 核心功能速览

### 🗺️ 地图
- **初始位置**: 沈阳 (41.8045, 123.4328)
- **范围**: 全球任意坐标
- **交互**: 点击地图选择投稿位置

### 🌐 语言
- **中文**: `/index-zh.html` (默认推荐)
- **英文**: `/index.html`
- **切换**: 顶栏 🌐 按钮

### 📝 投稿
- **游客**: 可投稿，直接发布
- **用户**: 可投稿，直接发布
- **审核**: 无需审核 ✅

### 🗑️ 删除
- **用户**: 删除自己的投稿
- **管理员**: 删除任何投稿
- **游客**: 无法删除

---

## 👤 测试账户

### 管理员
```
用户名: admin
密码: moodylitchee
```

### 创建测试用户
```
任意用户名 (3-32 字符)
任意密码 (6+ 字符)
点击"注册并登录"
```

---

## 📍 访问地址

| 用途 | 地址 |
|------|------|
| 中文主页 | http://localhost:4172/index-zh.html |
| 英文主页 | http://localhost:4172/index.html |
| 数据存储 | data/posts.json |
| 用户存储 | data/users.json |

---

## 🔑 关键文件

```
ClaudeCode/
├── server.js                  # 后端核心
├── public/
│   ├── index-zh.html         # 中文主页 ⭐
│   ├── index.html            # 英文主页
│   ├── app-zh.js             # 中文逻辑 ⭐
│   ├── app-global.js         # 英文逻辑
│   └── styles.css            # 样式
├── data/
│   ├── posts.json            # 投稿数据
│   └── users.json            # 用户数据
└── start.sh                  # 启动脚本
```

---

## 🧪 快速测试

### 1️⃣ 测试游客投稿
```
不登录 → 投稿 → 填表 → 发布 → 阅读看到
```

### 2️⃣ 测试用户投稿
```
注册 → 登录 → 投稿 → 发布 → 我的 → 看到+删除按钮
```

### 3️⃣ 测试删除
```
点击删除 → 确认 → 成功 → 数据更新
```

### 4️⃣ 测试权限
```
用户A发 → 用户B无法删 → 管理员可删
```

---

## ⚙️ 环境变量

```bash
# 端口 (默认 4173)
PORT=4172

# 主机 (默认 127.0.0.1)
HOST=127.0.0.1

# 管理员密码 (默认 taxtax-admin)
ADMIN_PASSWORD=your-password

# 管理员账户密码 (默认 moodylitchee)
ADMIN_ACCOUNT_PASSWORD=your-account-password
```

---

## 🐛 常见问题

**Q: 看不到中文界面**  
A: 清除浏览器缓存 (Ctrl+Shift+Delete)，然后 Ctrl+F5 硬刷新

**Q: 投稿后看不到**  
A: 切换到"阅读"标签，检查情绪过滤是否正确

**Q: 删除按钮不显示**  
A: 确保已登录，且投稿是自己账户发布的

**Q: 投稿还需要审核吗**  
A: 不需要！所有投稿都立即发布

**Q: 能删除他人投稿吗**  
A: 普通用户不能，管理员可以

---

## 📊 API 快速参考

```javascript
// 获取所有投稿
GET /api/posts

// 投稿
POST /api/posts
{ title, body, mood, placeName, province, lat, lng }

// 获取我的投稿
GET /api/me/posts

// 删除我的投稿 (新功能)
POST /api/posts/{id}/delete

// 注册
POST /api/auth/register
{ username, password }

// 登录
POST /api/auth/login
{ username, password }

// 获取当前用户
GET /api/me

// 管理员：获取所有投稿
GET /api/admin/posts
header: x-admin-password

// 管理员：删除投稿
POST /api/admin/posts/{id}/delete
```

---

## 📱 设备兼容性

| 设备 | 状态 | 备注 |
|------|------|------|
| 桌面 PC | ✅ | 最佳体验 |
| 平板 | ✅ | 竖屏优化 |
| 手机 | ✅ | 响应式设计 |
| 小屏幕 | ✅ | < 375px |

---

## 🚀 部署建议

### 本地开发
```bash
PORT=4172 npm start
```

### 简单部署 (VPS)
```bash
nohup PORT=80 npm start &
```

### 使用 PM2
```bash
npm install -g pm2
pm2 start server.js --name memory-map
pm2 startup
pm2 save
```

### 使用 Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4172
CMD ["npm", "start"]
```

---

## 📝 数据格式

### 投稿对象
```javascript
{
  id: "uuid",
  title: "标题",
  body: "内容",
  mood: "lonely|tender|calm|...",
  placeName: "地点名称",
  province: "地区名称",
  lat: 纬度,
  lng: 经度,
  userId: "用户ID 或 null",
  authorMode: "account|guest",
  status: "approved",  // 总是 approved
  createdAt: "ISO时间",
  reviewedAt: "ISO时间"
}
```

### 用户对象
```javascript
{
  id: "uuid",
  username: "用户名",
  passwordHash: "加盐哈希",
  role: "user|admin",
  createdAt: "ISO时间"
}
```

---

## ✅ 功能检查表

启动后快速验证:

- [ ] 中文界面加载
- [ ] 地图显示沈阳
- [ ] 可点击地图
- [ ] 可投稿
- [ ] 投稿立即发布
- [ ] 可注册账户
- [ ] 可登录账户
- [ ] 已登录显示删除按钮
- [ ] 可删除自己投稿
- [ ] 🌐 按钮可切换英文

---

## 🎯 常用操作

### 投稿流程
```
1. 打开网站
2. 点击地图 或 选择地区
3. 填写标题、内容、情绪
4. 填写地点名称
5. 点击"立即发布"
6. 切换到"阅读"查看
```

### 删除流程
```
1. 登录账户
2. 进入"我的"标签
3. 找到要删除的投稿
4. 点击"删除"按钮
5. 确认删除
6. 数据即时更新
```

### 语言切换
```
1. 点击顶栏 🌐 按钮
2. 页面刷新并切换语言
3. 再点击 🌐 切回原来的语言
```

---

## 🔐 安全提示

- ✅ 不在 URL 中输入密码
- ✅ 不分享管理员账户
- ✅ 定期备份 `data/` 目录
- ✅ 生产环境使用 HTTPS
- ✅ 设置强密码

---

## 📞 获取帮助

| 需求 | 文件 |
|------|------|
| 详细改动 | VERSION_0.3.0_CHANGELOG.md |
| 完整测试 | TESTING_GUIDE.md |
| 快速启动 | QUICK_START.md |
| 项目总结 | PROJECT_COMPLETE.md |
| 代码文档 | server.js (注释) |

---

## 🎉 你已准备就绪!

所有功能已实现。现在就可以:

```bash
PORT=4172 npm start
```

然后访问:
- 🇨🇳 http://localhost:4172/index-zh.html
- 🇬🇧 http://localhost:4172/index.html

**祝你使用愉快！** 🚀
