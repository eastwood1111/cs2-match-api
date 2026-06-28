const api = require('../../utils/api')

Page({
  data: {
    steamId64: '',
    steamName: '',
    matchAuthCode: '',
    knownCode: '',
    saving: false,
    error: ''
  },

  onLoad() {
    this.loadAccount()
  },

  async loadAccount() {
    try {
      const result = await api.request({ path: '/api/steam/account' })
      const account = result.account
      if (account) {
        this.setData({
          steamId64: account.steamId64 || '',
          steamName: account.steamName || '',
          knownCode: account.knownCode || ''
        })
      }
    } catch (error) {
      this.setData({
        error: error.message || '账号读取失败'
      })
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({
      [field]: event.detail.value
    })
  },

  async save() {
    const steamId64 = this.data.steamId64.trim()
    if (!/^\d{17}$/.test(steamId64)) {
      this.setData({ error: 'SteamID64 需要是 17 位数字' })
      return
    }

    this.setData({ saving: true, error: '' })
    try {
      await api.request({
        path: '/api/steam/bind',
        method: 'POST',
        data: {
          steamId64,
          steamName: this.data.steamName.trim(),
          matchAuthCode: this.data.matchAuthCode.trim(),
          knownCode: this.data.knownCode.trim()
        }
      })

      wx.showToast({
        title: '已保存',
        icon: 'success'
      })

      setTimeout(() => {
        wx.navigateBack()
      }, 400)
    } catch (error) {
      this.setData({
        error: error.message || '保存失败'
      })
    } finally {
      this.setData({ saving: false })
    }
  }
})
