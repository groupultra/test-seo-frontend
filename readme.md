1. 生产环境部署指南
1.1 环境准备
Node.js ≥ 18（用于打包）
npm ≥ 9
nginx ≥ 1.20（已验证 macOS + Homebrew 安装，Linux 同理）
macOS 示例安装命令：
brew install node
brew install nginx
1.2 获取代码并安装依赖
git clone git@github.com:groupultra/test-seo-frontend.git three-kingdoms-reader
cd three-kingdoms-reader
npm ci (使用 ci 保证锁文件一致)
注意：克隆代码需要配置 SSH 密钥，本项目使用 id_ed25519 作为默认私钥。
1.3 构建静态文件
npm run build (产物输出到 build/ 目录)
1.4 配置 nginx
项目根目录已附带 nginx.conf，需将其中的绝对路径 /Users/shangjianliu/Desktop/test_markdown/three-kingdoms-reader/ 替换为服务器真实路径。
关键字段：
listen 8080; 监听端口
root /abs/path/build; React 静态文件
alias /abs/path/public/... Markdown 原文件
若以非 root 用户运行，请确保 pid 路径有写权限，或注释该行。
1.5 启动与重载 nginx
首次启动： nginx -c /abs/path/three-kingdoms-reader/nginx.conf
配置或文件变更： nginx -s reload
停止： nginx -s stop
浏览器访问 http://<server-ip>:8080
Markdown 文件通过 /three_kingdom/ 路径分发，可被前端动态加载。
2. 本地开发与 Markdown 监视
2.1 React 热开发
npm start
默认 http://localhost:3000，支持热替换（HMR），不依赖 nginx。
2.2 Markdown 变化自动重建并刷新 nginx
package.json 中脚本：
watch:md — chokidar "public/markdown/three_kingdom//.md" -c "npm run build && nginx -s reload"
含义：
chokidar-cli 监听所有 markdown 文件。
每当新增/修改/删除时：
执行 npm run build 重新打包前端资源
执行 nginx -s reload 热重载服务
启动监听前请先确保 nginx 已按项目配置运行，然后执行：
npm run watch:md
提示：
第一次打包耗时 10–30 秒（视机器性能）
可使用 nohup npm run watch:md & 或 pm2 等工具后台守护
2.3 常见问题
端口被占用
nginx.conf 修改 listen 端口，或启动 React 前通过 PORT=3001 npm start 更换端口
反向代理 404
确认 root、alias 路径正确，try_files 语句未改动
alias 结尾需加 /，否则 nginx 路径解析错误
nginx 权限不足
macOS/Homebrew 安装的 nginx 默认以当前用户运行
若以 root 运行，请保留 user 指令或提高文件夹权限