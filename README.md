cat > /opt/memory-map/README.md << 'EOF'
# Memory Map 🗺️

一个全球匿名记忆地图应用，用户可以在地图上分享和浏览特定地点的个人回忆。

## 功能特性

- 🌍 全球坐标系统，支持任何地点
- 🇨🇳 中英文双语界面
- 😊 13 种情绪标签分类
- 🔒 安全加固（速率限制、输入验证、日志审计）
- 📱 响应式设计
- 💬 用户反馈系统

## 部署

见 `SECURITY_DEPLOYMENT_GUIDE.md`

## 技术栈

- Node.js (v20)
- Leaflet.js (地图)
- SQLite (数据存储)
- Nginx (反向代理)
- PM2 (进程管理)

## 许可证

MIT License
EOF

# 提交
git add README.md
git commit -m "Add README"
git push
