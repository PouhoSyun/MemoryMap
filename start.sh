#!/bin/bash

# Memory Map v0.3.0 - 快速启动脚本
# 用法: ./start.sh [端口号]

PORT=${1:-4172}
HOST="127.0.0.1"

echo "🚀 启动 Memory Map v0.3.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 地点: 沈阳"
echo "🌐 语言: 中文 (默认) / 英文 (切换)"
echo "📝 发布: 即时发布 (无需审核)"
echo "🗑️  删除: 用户删自己, 管理员删任何"
echo ""
echo "访问地址:"
echo "  🇨🇳 中文版: http://${HOST}:${PORT}/index-zh.html"
echo "  🇬🇧 英文版: http://${HOST}:${PORT}/index.html"
echo ""
echo "管理员账户:"
echo "  用户名: admin"
echo "  密码: moodylitchee"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 启动服务器
PORT=${PORT} HOST=${HOST} npm start
