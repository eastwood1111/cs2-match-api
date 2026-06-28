# CS2 官匹数据微信小程序

当前是最小可跑通版本：

- 微信小程序原生 JS 页面。
- Node.js Express 后端。
- 本地默认 JSON 存储，微信云托管部署时切换 MySQL。
- 同步接口当前生成测试比赛，后续替换为 Steam match history + demo parser。

## 目录

```text
.
├── app.js / app.json / app.wxss
├── pages
│   ├── index     首页、统计、最近比赛
│   ├── bind      Steam 绑定
│   └── match     比赛详情
├── utils
│   ├── api.js    小程序 API 封装
│   └── config.js 本地/云托管切换
└── server        微信云托管 Node 服务
```

## 本地运行后端

```bash
cd server
npm install
npm run dev
```

接口地址：

```text
http://127.0.0.1:3000
```

小程序本地调试时，`utils/config.js` 保持：

```js
apiMode: 'local'
```

微信开发者工具里需要打开“不校验合法域名、web-view、TLS 版本以及 HTTPS 证书”。

## 微信云托管部署

云托管服务名建议：

```text
cs2-match-api
```

如果使用一键部署或模板构建，云托管通常会在代码仓库根目录寻找 `Dockerfile`。本项目根目录已经放置了 `Dockerfile`，它会只打包 `server` 后端代码。

如果云托管界面支持设置构建目录，也可以选择 `server` 目录并使用 `server/Dockerfile`。

云托管容器默认监听 `80` 端口，根目录和 `server` 目录的 Dockerfile 已经设置：

```text
PORT=80
```

云托管环境变量：

```text
DB_DIALECT=mysql
MYSQL_HOST=你的数据库地址
MYSQL_PORT=3306
MYSQL_USER=你的数据库用户
MYSQL_PASSWORD=你的数据库密码
MYSQL_DATABASE=cs2_match
SESSION_SECRET=一串长随机字符串
```

部署后把 `utils/config.js` 改成：

```js
apiMode: 'cloud',
cloudEnv: '你的云开发环境 ID',
cloudService: 'cs2-match-api'
```

## 下一步

下一阶段建议接入真实 Steam 同步：

1. 保存用户提供的 `steamidkey` 和最近 `knowncode`。
2. 新增 SteamAdapter，拉取下一场 match sharing code。
3. 新增队列 Worker 下载并解析 demo。
4. 把 kill、damage、round 数据落到独立表。
