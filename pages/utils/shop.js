import wsAPI from 'wsAPI'

const TOKEN_NAME = 'TOKEN-NAME'
const SESSION_KEY = 'SESSION_KEY'
const MOBILE = 'MOBILE'
const AUTHED = 'AUTHED'
const USER_INFO = 'USER_INFO'

/* API相关接口 */
export default {
  login: function(){
    // 执行登录操作
    wsAPI.taskSequence()
      .then(() => wsAPI.login())
      .then((res) => {
        let code = res.code
        return new Promise((resolve) => {
          let authed = wx.getStorageSync(AUTHED)
          if(authed !== false) {
            authed = true
          }
          if(authed) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (res) {
                resolve({ code: code, nickname: res.userInfo.nickName })
              },
              fail: function (res) {
                wx.showModal({
                  title: '警告',
                  content: '若不【授权】微信登录, 则无法使用小程序相关功能 点击重新获取授权, 则可重新使用 后期使用该小程序, 在微信【发现】--【小程序】--左划删除【】, 重新搜索“”授权登录, 方可使用',
                  cancelText: '不授权',
                  confirmText: '授权',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {
                          if (res.authSetting["scope.userInfo"]) {
                            wx.getUserInfo({
                              withCredentials: false,
                              success: function (res) {
                                wx.setStorageSync(AUTHED, true)
                                resolve({ code: code, nickname: res.userInfo.nickName })
                              },
                              fail: function () {
                                wx.setStorageSync(AUTHED, false)
                                wx.navigateBack({
                                  delta: 1
                                })
                              }
                            })
                          }
                        }
                      })
                    } else if (res.cancel) {
                      wx.setStorageSync(AUTHED, false)
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
            })
          } else {
            wx.openSetting({
              success: function (res) {
                if (res.authSetting["scope.userInfo"]) {
                  wx.getUserInfo({
                    withCredentials: false,
                    success: function (res) {
                      wx.setStorageSync(AUTHED, true)
                      resolve({ code: code, nickname: res.userInfo.nickName })
                    },
                    fail: function () {
                      wx.setStorageSync(AUTHED, false)
                    }
                  })
                }
              }
            })
          }
        })
      })
      .then(data => wsAPI.post('?act=login&op=xcx_login', data))
      .then(res => {
        // 保存TOKEN
        wx.setStorageSync(TOKEN_NAME, res.datas.key)
        // 保存SessionKey
        // wx.setStorageSync(SESSION_KEY, res.data.session_key)
      })
    wsAPI.getUserInfo()
      .then(res => {
        wx.setStorageSync(USER_INFO, res.userInfo)
    })
  },
  getToken: function() {
    return wx.getStorageSync(TOKEN_NAME)
  },
  getSessionKey: function() {
    return wx.getStorageSync(SESSION_KEY)
  },
  setMobile: function(mobile) {
    return wx.setStorageSync(MOBILE, mobile)
  },
  getMobile: function() {
    return wx.getStorageSync(MOBILE)
  },
  getUserInfo: function () {
    return wx.getStorageSync(USER_INFO)
  },
  getCartList: function () {
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_cart&op=cart_list', { key: wx.getStorageSync(TOKEN_NAME) }))
  },
  cartEditQuantity: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_cart&op=cart_edit_quantity', data))
  },
  isEmptyObject: function (e) {
    for (var i in e)
      return false
    return true
  },
  applyStore: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_joininc&op=apply', data))
  },
  getStoreClassList: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_joininc&op=get_store_class', data))
  },
  getSellerInfo: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=seller_center&op=index', data))
  },
  /**
   *
   * @param gc_id
   * @param deep
   * @returns {boolean}
   */
  getStoreGoodsClass: function (gc_id, deep) {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    data.gc_id = gc_id
    data.deep = deep
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=store_goods_add&op=ajax_goods_class', data))
  }
}