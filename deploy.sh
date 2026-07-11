#!/bin/bash

# --- 配置区域 ---
SOURCE_DIR="./public/"
REMOTE_USER="randy"
REMOTE_HOST="72.11.138.201"
REMOTE_PATH="/var/www/html/"

# 确保脚本在出错时立即停止
set -e

echo ">>> 1. 正在清除旧的构建缓存..."
rm -rf public/

echo ">>> 2. 正在运行 Hugo 生成静态文件..."
# 如果 hugo 命令不在路径中，可以在这里写绝对路径
hugo

echo ">>> 3. 正在同步到服务器 ($REMOTE_HOST)..."
# 使用 -avz --delete 进行镜像同步
rsync -avz --delete $SOURCE_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo ">>> 部署成功！网站已更新。"
