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
  /**
   * 获取购物车
   * @returns {boolean}
   */
  getCartList: function () {
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_cart&op=cart_list', { key: wx.getStorageSync(TOKEN_NAME) }))
  },
  /**
   * 购物车修改数量
   * @param data
   * @returns {boolean}
   */
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
  /**
   * 申请店铺
   * @param data
   * @returns {boolean}
   */
  applyStore: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_joininc&op=apply', data))
  },
  /**
   * 店铺分类
   * @returns {boolean}
   */
  getStoreClassList: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_joininc&op=get_store_class', data))
  },
  /**
   * 经营类目
   * @returns {boolean}
   */
  getStoreClasses: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_joininc&op=get_class_list', data))
  },
  /**
   * 获取店铺信息
   * @returns {boolean}
   */
  getSellerInfo: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=seller_center&op=index', data))
  },
  /**
   * 按 gc_id 、deep 获取店铺商品分类
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
  },
  /**
   * 店铺上传产品
   * @param data
   * @returns {boolean}
   */
  storeAddGoods: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_goods_add&op=save_goods', data))
  },
  /**
   * 获取店铺出售中商品
   * @param data
   * @returns {boolean}
   */
  getStoreGoodsListOnline: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=store_goods_online&op=goods_list', data))
  },
  /**
   * 获取所有商品分类
   * @returns {boolean}
   */
  getGoodsClass:function(){
    let data = {};
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=goods_class&op=getGoodsClass', data))
  },
  /**
   * 获取今日上新
   * @returns {boolean}
   */
  getTodayNewGoods: function () {
      let data={};
     return wsAPI.taskSequence()
         .then(() => wsAPI.post('?act=goods&op=today_new_goods', data))
  },
  /**
   * 获取首页广告
   * @returns {boolean}
   */
  getFastNewsAdvs: function () {
    let data={};
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=index&op=fast_news_adv', data))
  },
  /**
   * 获取首页goods_list
   * @returns {boolean}
   */
  getIndexGoodsList: function () {
    let data={};
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=goods&op=goods_list', data))
  },
  /**
   * 获取首页goods_commend
   * @returns {boolean}
   */
  getIndexGoodsCommend: function () {
    let data={};
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=goods&op=goods_commend', data))
  },
  /**
   * 获取店铺商品类型的规格
   * @param data
   * @returns {boolean}
   */
  getStoreGoodsSpecByClassId: function(data){
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_goods_add&op=get_spec_list', data))
  },
  /**
   * 添加商品spec
   * @param data
   * @returns {boolean}
   */
  addSpec: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store_goods_add&op=ajax_add_spec', data))
  },
  /**
   * 获取商品详情
   * @param data
   * @returns {boolean}
   */
  getGoodsDetail: function (data) {
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=goods&op=goods_detail', data))
  },
  /**
   * 获取商品详情描述
   * @param data
   * @returns {boolean}
   */
  getGoodsDetailBody: function (data) {
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=goods&op=goods_body', data))
  },
  /**
   * 获取商品列表 by gc_id
   * @param data
   * @returns {boolean}
   */
  getGoodsListByGcId: function (data) {
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=goods&op=goods_list', data))
  },
  /**
   * 加入购物车
   * @param data
   * @returns {boolean}
   */
  addToCart: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_cart&op=cart_add', data))
  },

  /**
   * 获取店铺信息
   * @returns {boolean}
   */
  getShopInfo: function () {
    let data = {};
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=seller_center&op=getShopInfo', data))
  },
  /**
   * 获取商品详情
   * @param data
   * @returns {boolean}
   */
  getGoodsBody: function (data) {
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=goods&op=goods_body', data))
  },
  /**
   * 删除购物车
   * @param data
   * @returns {boolean}
   */
  cartDel: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_cart&op=cart_del', data))
  },
  /**
   * 下单
   * @param data
   * @returns {boolean}
   */
  buyStep1: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_buy&op=buy_step1', data))
  },
  /**
   * 虚拟商品下单
   * @param data
   * @returns {boolean}
   */
  buyStep2: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_vr_buy&op=buy_step2', data))
  },
  /**
   * 获取收货地址列表
   * @returns {boolean}
   */
  getAddressList: function () {
    let data = {}
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_address&op=address_list', data))
  },
  /**
   * 删除收货地址
   * @param data
   * @returns {boolean}
   */
  removeAddress: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_address&op=address_del', data))
  },
  /**
   * 获取收货地址详情
   * @param data
   * @returns {boolean}
   */
  getAddressInfo: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_address&op=address_info', data))
  },
  /**
   * 获取地区列表 by area_id
   * @param data
   * @returns {boolean}
   */
  getAreaById: function (data) {
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=area&op=area_list', data))
  },
  /**
   * 添加收货地址
   * @param data
   * @returns {boolean}
   */
  addAddress: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_address&op=address_add', data))
  },
  buyStep2: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_buy&op=buy_step2', data))
  },
  buyStep3: function (data) {
    data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_vr_buy&op=buy_step3', data))
  },
  pay: function (op, pay_sn) {
    var data = {}
    data.pay_sn = pay_sn
    data.key = wx.getStorageSync(TOKEN_NAME)
    data.payment_code = 'wxpay_xcx'
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=member_payment&op=' + op, data)).then(res => {
      if(res.code == 200){
      wx.requestPayment({
        'timeStamp': res.datas.timeStamp,
        'nonceStr': res.datas.nonceStr,
        'package': res.datas.package,
        'signType': 'MD5',
        'paySign': res.datas.paySign,
        'success':function(res){
          resolve('success')
        },
        'fail':function(res){
          resolve('fail')
        },
        'complete':function(res){
          resolve('complete')
        }
      })
    }
  })
  .catch(error => reject(error))
  },

  /**
   * 获取店铺仓库中商品
   * @param data
   * @returns {boolean}
   */
  getStoreGoodsListOffline: function (data) {
    //data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=store_goods_Offline&op=goods_list', { key: wx.getStorageSync(TOKEN_NAME) }))
  },
  /**
   * 获取单个用户积分
   */
  getPoint:function(){
    //data.key = wx.getStorageSync(TOKEN_NAME)
    return wsAPI.taskSequence()
      .then(() => wsAPI.get('?act=member_points&op=getPoint', { key: wx.getStorageSync(TOKEN_NAME) }))
  },
  /**
   * 加入收藏
   */
  addCollect:function(data){
    data.key = wx.getStorageSync(TOKEN_NAME);
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_favorites&op=favorites_add', data))
  },
  /**
   * 店铺收藏
   */
  addCollectStore:function(data){
    data.key = wx.getStorageSync(TOKEN_NAME);
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_favorites_store&op=favorites_add', data))
  },
  /**
   * 获取收藏夹商品信息
   */
  getCollect:function(){
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=member_favorites&op=favorites_list', { key: wx.getStorageSync(TOKEN_NAME) }))
  },
  //获取店铺信息（商家、store_id）
  getShopDetailByStore_id:function(store_id){
    let data={};
    data.store_id=store_id;
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=store&op=store_intro', data))
  },
  //获取短信验证码
  getAliMsg:function(tel){
    let data = {};
    data.tel = tel;
    return wsAPI.taskSequence()
      .then(() => wsAPI.post('?act=ali_msg&op=send_code', data))
  }
}