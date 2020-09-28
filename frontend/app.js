//app.js
var Api = require('/utils/api.js');



App({
  onLaunch: function () {


    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: Api.getOpenid() + res.code,
            success: function (res) {
              if (res.data.openid) {
                var app = getApp();
                app.globalData.openid = res.data.openid;
                wx.hideLoading()

              }
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '加载失败,请检查网络状态,重新启动小程序',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    })

    wx.showLoading({

      title: "加载信息ing",

      mask: true

    })



    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

    userInfo: null,
    openid: null,
    token: null
  }
})