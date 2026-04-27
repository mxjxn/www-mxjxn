#!/bin/bash
set -e

SOURCE_DIR="/opt/www-mxjxn"
DEPLOY_DIR="/var/www/www.mxjxn.com"
PROCESS_NAME="www-mxjxn"

echo "🔨 Building..."
cd "$SOURCE_DIR"
npx astro build

echo "📦 Deploying..."
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='specs' \
  dist/ "$DEPLOY_DIR/"

mkdir -p "$DEPLOY_DIR/specs"

echo "🔄 Restarting $PROCESS_NAME..."
pm2 restart "$PROCESS_NAME" 2>/dev/null || pm2 start "$DEPLOY_DIR/server/entry.mjs" \
  --name "$PROCESS_NAME" \
  --cwd "$DEPLOY_DIR" \
  --env NODE_ENV=production \
  --env HOST=:: \
  --env PORT=4322

echo "✅ Deployed!"
