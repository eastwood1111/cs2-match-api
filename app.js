const config = require('./utils/config')

App({
  onLaunch() {
    if (config.apiMode === 'cloud' && wx.cloud) {
      wx.cloud.init({
        env: config.cloudEnv,
        traceUser: true
      })
    }
  },
  globalData: {
    user: null
  }
})
