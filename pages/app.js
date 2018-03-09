//app.js
import shop from 'utils/shop'
App({
  onLaunch: function (options) {
    console.log(options)
    shop.login()
  },
  globalData: {
    userInfo: null
  },
})