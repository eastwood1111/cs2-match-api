const path = require('node:path')
require('dotenv').config()

const rootDir = path.resolve(__dirname, '..')

function bool(value) {
  return value === '1' || value === 'true'
}

module.exports = {
  port: Number(process.env.PORT || 3000),
  sessionSecret: process.env.SESSION_SECRET || 'dev-session-secret',
  trustProxy: bool(process.env.TRUST_PROXY),
  dataFile: path.resolve(rootDir, process.env.DATA_FILE || './data/dev-db.json'),
  db: {
    dialect: process.env.DB_DIALECT || (process.env.MYSQL_HOST ? 'mysql' : 'json'),
    mysql: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'cs2_match'
    }
  },
  wechat: {
    appId: process.env.WECHAT_APP_ID,
    appSecret: process.env.WECHAT_APP_SECRET
  }
}
