import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      },
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      },
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      },
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      },
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      },
      {
        goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
        goods_img: '/images/shop3.png',
        goods_price: 2000,
        goods_inventory: 10,
        sale_number: 20,
      }
    ]
  },
  toBargain: function (e) {
    wx.navigateTo({
      url: '/page/index/pages/bargain/bargain'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})