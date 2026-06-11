# Vultr VPS 部署指南 - Memory Map (回声树洞)

## 📋 前置准备

### 1. Vultr 服务器配置
- **操作系统**：Ubuntu 22.04 LTS（推荐）
- **最低配置**：1GB RAM, 1 vCPU, 25GB SSD
- **获取 IP**：部署后 Vultr 会分配公网 IP

### 2. 本地准备
- 已有 Memory Map 项目代码
- SSH 密钥或密码（用于连接 VPS）

---

## 🚀 部署步骤

### 第一步：连接到 Vultr 服务器

```bash
ssh root@<你的_Vultr_IP>
```

输入密码或使用 SSH 密钥连接。

### 第二步：安装依赖

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Node.js 和 npm（使用 NodeSource 仓库）
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# 验证安装
node -v   # 应显示 v20.x.x
npm -v    # 应显示 10.x.x
```

### 第三步：上传项目代码

**方式 A：使用 scp（从本地上传）**

```bash
# 从本地机器执行
scp -r /Users/pouhosyun/Documents/Coding/ClaudeCode root@<Vultr_IP>:/opt/memory-map
```

**方式 B：使用 Git（如果已推送到 GitHub）**

```bash
# 在 Vultr 服务器上执行
cd /opt
git clone https://github.com/你的用户名/memory-map.git
cd memory-map
```

### 第四步：安装项目依赖

```bash
cd /opt/memory-map
npm install
```

### 第五步：启动应用（临时测试）

```bash
PORT=4172 npm start
```

访问 `http://<Vultr_IP>:4172` 验证是否运行正常。

---

## 🔒 生产环境配置

### 使用 PM2 进程管理

```bash
# 全局安装 PM2
npm install -g pm2

# 在项目目录创建 PM2 配置文件
cat > ecosystem.config.js << 'EOF'
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
    merge_logs: true
  }]
};
EOF

# 创建日志目录
mkdir -p logs

# 启动应用
pm2 start ecosystem.config.js

# 设置 PM2 开机自启
pm2 startup
pm2 save
```

### 使用 Nginx 反向代理（推荐）

```bash
# 安装 Nginx
apt install -y nginx

# 创建 Nginx 配置
sudo tee /etc/nginx/sites-available/memory-map > /dev/null << 'EOF'
server {
    listen 80;
    server_name <你的域名或IP>;

    location / {
        proxy_pass http://127.0.0.1:4172;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 启用配置
sudo ln -s /etc/nginx/sites-available/memory-map /etc/nginx/sites-enabled/

# 删除默认配置
sudo rm /etc/nginx/sites-enabled/default

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 配置防火墙

```bash
# 允许 HTTP 流量
ufw allow 80/tcp

# 允许 HTTPS 流量（如果使用 SSL）
ufw allow 443/tcp

# 允许 SSH（防止锁定）
ufw allow 22/tcp

# 启用防火墙
ufw enable
```

---

## 🔐 HTTPS 配置（可选）

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d <你的域名>

# Certbot 会自动配置 Nginx
# 证书会在 90 天前自动续期
```

修改 Nginx 配置后重启：

```bash
sudo systemctl restart nginx
```

---

## 📊 数据持久化

### 数据存储

所有数据存储在 `/opt/memory-map/data/` 目录：

```bash
/opt/memory-map/data/
├── posts.json      # 所有投稿
├── users.json      # 用户账户
└── feedback.json   # 反馈信息
```

### 定期备份

```bash
# 创建备份脚本
cat > /usr/local/bin/backup-memory-map.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/memory-map_$TIMESTAMP.tar.gz /opt/memory-map/data/
echo "Backup completed: $BACKUP_DIR/memory-map_$TIMESTAMP.tar.gz"
EOF

chmod +x /usr/local/bin/backup-memory-map.sh

# 添加定时任务（每天凌晨 2 点备份）
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-memory-map.sh") | crontab -
```

---

## 🔧 常见操作

### 查看运行状态

```bash
# PM2 状态
pm2 status

# 查看日志
pm2 logs memory-map

# 查看实时日志
pm2 logs memory-map --lines 100 --follow
```

### 重启应用

```bash
pm2 restart memory-map
```

### 停止应用

```bash
pm2 stop memory-map
```

### 查看 Nginx 状态

```bash
systemctl status nginx
```

### 查看系统资源

```bash
# 内存使用
free -h

# 磁盘使用
df -h

# CPU 使用
top
```

---

## 🐛 故障排查

### 应用无法启动

```bash
# 检查日志
pm2 logs memory-map --lines 50

# 检查端口是否被占用
netstat -tulpn | grep 4172
```

### Nginx 无法连接到应用

```bash
# 检查应用是否运行
pm2 status

# 检查防火墙
sudo ufw status

# 检查 Nginx 配置
sudo nginx -t
```

### 访问速度慢

```bash
# 检查网络连接
ping 8.8.8.8

# 检查服务器资源
top
free -h
df -h

# 查看应用日志中的错误
pm2 logs memory-map
```

---

## 📈 性能优化

### Node.js 优化

```bash
# 在 ecosystem.config.js 中设置
env: {
  NODE_ENV: 'production',
  NODE_OPTIONS: '--max-old-space-size=512'
}
```

### Nginx 优化

在 `/etc/nginx/nginx.conf` 中调整：

```nginx
worker_processes auto;
keepalive_timeout 65;

# 在 http 块中添加
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

---

## 🌐 域名配置（可选）

### 添加 DNS 记录

如果有自己的域名，在域名注册商添加 A 记录：

```
A 记录：@ → <Vultr_IP>
```

然后更新 Nginx 配置中的 `server_name`：

```bash
server_name yourdomain.com www.yourdomain.com;
```

---

## 📝 管理员账户

默认管理员账户：
- **用户名**：`admin`
- **密码**：`moodylitchee`

登录后可以：
- 查看所有投稿
- 删除违规投稿
- 查看用户反馈

---

## ✅ 部署检查清单

- [ ] SSH 连接成功
- [ ] Node.js 和 npm 安装正确
- [ ] 项目代码上传到 `/opt/memory-map`
- [ ] `npm install` 完成无错误
- [ ] PM2 启动应用成功
- [ ] Nginx 反向代理配置完成
- [ ] 防火墙规则配置正确
- [ ] 可通过公网 IP 访问应用
- [ ] 中文版和英文版都可访问
- [ ] 管理员账户可登录
- [ ] 反馈功能可用
- [ ] 备份脚本已添加到 cron

---

## 🚨 应急联系

如遇问题：
1. 检查 PM2 日志：`pm2 logs memory-map`
2. 检查 Nginx 日志：`tail -f /var/log/nginx/error.log`
3. 查看系统日志：`journalctl -xe`

---

**部署完成！🎉 Memory Map 现已在线运行。**
