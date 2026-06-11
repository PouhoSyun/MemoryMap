# 🔒 Memory Map 安全加固部署指南 (v0.5.1 + L1+L2)

## 📋 已实施的安全措施

### L1 - 关键安全（必须）

| 措施 | 说明 | 状态 |
|------|------|:---:|
| 速率限制 | 防暴力破解、DDoS | ✅ |
| 请求验证 | 防注入、缓冲区溢出 | ✅ |
| 安全头 | 防 XSS、点击劫持 | ✅ |
| 输入消毒 | 移除控制字符 | ✅ |
| 密码长度限制 | 防过长密码 | ✅ |

### L2 - 日志审计（建议）

| 措施 | 说明 | 状态 |
|------|------|:---:|
| 事件日志 | 记录登录、删除、反馈 | ✅ |
| IP 地址记录 | 追踪请求来源 | ✅ |
| 日志持久化 | 每日日志文件 | ✅ |
| 管理员 IP 白名单 | 限制管理面板访问 | ✅ |
| 备份脚本 | 定时数据备份 | ✅ |

---

## 🚀 部署步骤

### 第一步：上传文件到 Vultr

```bash
# 从本地上传项目
scp -r /Users/pouhosyun/Documents/Coding/ClaudeCode root@<Vultr_IP>:/opt/memory-map

# SSH 连接到服务器
ssh root@<Vultr_IP>
```

### 第二步：安装依赖

```bash
cd /opt/memory-map
npm install
```

### 第三步：配置环境变量

创建 `.env` 文件（或在系统中设置）：

```bash
cat > /opt/memory-map/.env << 'EOF'
# Server
PORT=4172
HOST=0.0.0.0

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_ACCOUNT_PASSWORD=moodylitchee
ADMIN_PASSWORD=taxtax-admin

# Security: Admin panel IP whitelist (可选)
# 格式：IP1,IP2,IP3 （空 = 允许所有）
# 例：ADMIN_IPS=192.168.1.100,203.0.113.42
ADMIN_IPS=

# Logging
NODE_ENV=production
EOF

chmod 600 /opt/memory-map/.env
```

### 第四步：配置备份脚本

```bash
# 复制备份脚本
cp /opt/memory-map/backup.sh /usr/local/bin/
chmod +x /usr/local/bin/backup.sh

# 创建备份目录
mkdir -p /opt/backups/memory-map

# 添加定时备份（每天凌晨 2 点）
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup.sh >> /opt/memory-map/data/logs/cron.log 2>&1") | crontab -

# 验证 crontab
crontab -l
```

### 第五步：启动应用（PM2）

```bash
# 全局安装 PM2
npm install -g pm2

# 创建 PM2 配置文件
cat > /opt/memory-map/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'memory-map',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4172,
      HOST: '0.0.0.0'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '500M'
  }]
};
EOF

# 启动应用
cd /opt/memory-map
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save

# 查看运行状态
pm2 status
```

### 第六步：配置 Nginx 反向代理 + HTTPS

```bash
# 安装 Nginx 和 Certbot
apt install -y nginx certbot python3-certbot-nginx

# 创建 Nginx 配置
sudo tee /etc/nginx/sites-available/memory-map > /dev/null << 'EOF'
# HTTP redirect to HTTPS
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name <你的域名或IP>;

    # SSL 证书（使用 Certbot 后自动填充）
    ssl_certificate /etc/letsencrypt/live/<域名>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<域名>/privkey.pem;

    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
    gzip_min_length 1000;

    location / {
        proxy_pass http://127.0.0.1:4172;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Deny access to data directory
    location /data/ {
        deny all;
    }

    # Deny access to logs
    location /logs/ {
        deny all;
    }
}
EOF

# 启用配置
sudo ln -s /etc/nginx/sites-available/memory-map /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 测试 Nginx
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 第七步：申请 SSL 证书（有域名时）

```bash
# 如果有自己的域名，运行 Certbot
sudo certbot --nginx -d your-domain.com

# 自动续期验证（Let's Encrypt 提供自动续期）
sudo certbot renew --dry-run
```

### 第八步：配置防火墙

```bash
# 允许 SSH
sudo ufw allow 22/tcp

# 允许 HTTP
sudo ufw allow 80/tcp

# 允许 HTTPS
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看规则
sudo ufw status
```

---

## 🔐 配置管理员 IP 白名单

### 场景 1：仅允许特定 IP 访问管理面板

```bash
# 编辑 .env 文件
nano /opt/memory-map/.env

# 设置白名单（多个 IP 用逗号分隔）
ADMIN_IPS=203.0.113.42,198.51.100.15

# 重启应用
pm2 restart memory-map
```

### 场景 2：允许所有 IP（默认）

```bash
# 保持 ADMIN_IPS 为空
ADMIN_IPS=

pm2 restart memory-map
```

---

## 📊 速率限制配置

当前限制（可在 `server.js` 中修改）：

| 端点 | 限制 | 时间窗口 |
|------|------|:---:|
| `/api/auth/login` | 5 次 | 1 分钟 |
| `/api/auth/register` | 3 次 | 1 分钟 |
| `/api/posts` | 20 次 | 1 分钟 |
| `/api/feedback` | 10 次 | 1 分钟 |
| 其他 | 100 次 | 1 分钟 |

### 调整限制

编辑 `server.js`，找到 `RATE_LIMITS` 并修改：

```javascript
const RATE_LIMITS = {
  "/api/auth/login": 5,      // 改为需要的值
  "/api/auth/register": 3,
  "/api/posts": 20,
  "/api/feedback": 10,
  "default": 100
};
```

---

## 📝 日志管理

### 日志位置

```
/opt/memory-map/data/logs/
├── 2026-01-15.log          # 每日日志
├── backup.log              # 备份日志
└── cron.log                # Cron 任务日志
```

### 查看日志

```bash
# 查看今天的所有事件
tail -f /opt/memory-map/data/logs/$(date +%Y-%m-%d).log

# 查看特定类型的事件
grep "login" /opt/memory-map/data/logs/$(date +%Y-%m-%d).log

# 查看管理员操作
grep "admin" /opt/memory-map/data/logs/$(date +%Y-%m-%d).log

# 查看失败的登录尝试
grep "login_failed" /opt/memory-map/data/logs/$(date +%Y-%m-%d).log
```

### 日志格式

```json
{
  "timestamp": "2026-01-15T10:30:45.123Z",
  "type": "login_success",
  "username": "admin",
  "ip": "203.0.113.42"
}
```

日志类型：
- `user_registered` — 新用户注册
- `login_success` — 登录成功
- `login_failed` — 登录失败
- `post_deleted` — 用户删除投稿
- `admin_delete_post` — 管理员删除投稿
- `admin_review_post` — 管理员审核投稿
- `rate_limit_exceeded` — 超过速率限制
- `unauthorized_admin_access` — 未授权的管理员访问

---

## 🔍 监控和维护

### 检查应用状态

```bash
# PM2 状态
pm2 status

# 查看实时日志
pm2 logs memory-map

# 查看资源使用
pm2 monit
```

### 查看系统资源

```bash
# 内存使用
free -h

# 磁盘使用
df -h

# CPU 使用
top -n 1

# 备份大小
du -sh /opt/backups/memory-map
```

### 定期维护

```bash
# 每周检查备份完整性
cd /opt/backups/memory-map
tar -tzf backup_*.tar.gz | head

# 每月清理日志（保留 90 天）
find /opt/memory-map/data/logs -name "*.log" -mtime +90 -delete

# 每月检查磁盘空间
df -h
```

---

## 🚨 故障排查

### 应用无法启动

```bash
# 检查日志
pm2 logs memory-map --lines 50

# 检查语法
node -c /opt/memory-map/server.js

# 检查端口占用
netstat -tulpn | grep 4172
```

### Nginx 无法连接应用

```bash
# 检查应用运行
pm2 status

# 检查防火墙
sudo ufw status

# 测试 Nginx
sudo nginx -t

# 查看 Nginx 错误
tail -f /var/log/nginx/error.log
```

### 访问时显示 429（速率限制）

```bash
# 等待 1 分钟，或调整限制
# 检查你的 IP 是否被限制
grep "rate_limit" /opt/memory-map/data/logs/$(date +%Y-%m-%d).log
```

### SSL 证书过期

```bash
# 检查证书过期时间
sudo certbot certificates

# 手动续期
sudo certbot renew

# 验证自动续期工作
sudo certbot renew --dry-run
```

---

## 📈 性能优化

### 增加 Node.js 内存限制

编辑 `ecosystem.config.js`：

```javascript
env: {
  NODE_ENV: 'production',
  NODE_OPTIONS: '--max-old-space-size=512'
}
```

### 增加工作进程

```javascript
instances: 4,  // 改为 CPU 核心数
```

---

## 🛡️ 安全检查清单

部署前确保：

- [ ] `.env` 文件已创建并设置强密码
- [ ] 管理员 IP 白名单已配置（如需要）
- [ ] HTTPS/SSL 证书已申请
- [ ] Nginx 配置已测试（`nginx -t`）
- [ ] 防火墙已配置
- [ ] 备份脚本已添加到 crontab
- [ ] PM2 已配置开机自启
- [ ] 日志目录已创建
- [ ] 磁盘空间充足（至少 10GB）
- [ ] 测试登录和投稿功能

---

## 📞 应急联系

遇到问题时的排查顺序：

1. **检查 PM2 状态** — `pm2 status`
2. **查看应用日志** — `pm2 logs memory-map`
3. **查看系统日志** — `/opt/memory-map/data/logs/`
4. **检查 Nginx 错误** — `tail -f /var/log/nginx/error.log`
5. **检查防火墙** — `sudo ufw status`
6. **重启应用** — `pm2 restart memory-map`
7. **重启 Nginx** — `sudo systemctl restart nginx`

---

## 🎉 部署完成！

所有安全措施已实施。你的 Memory Map 现在：

✅ **安全** — HTTPS、速率限制、输入验证、IP 白名单  
✅ **可追踪** — 完整日志记录  
✅ **可恢复** — 自动备份  
✅ **可维护** — PM2 进程管理、Nginx 反向代理  

开始享受你的私人记忆地图吧！🚀
