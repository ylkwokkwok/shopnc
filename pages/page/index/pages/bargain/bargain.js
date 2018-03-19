import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRulesStatus: false,
    winHeight:0,
    goods: {
      goods_name: '力拔山兮气盖世, 时不利兮骓不逝。 骓不逝兮可奈何, 虞兮虞兮奈若何!',
      goods_img: '/images/shop3.png',
      goods_price: 2000,
      goods_inventory: 10,
      sale_number: 20,
    },
    bargainList: [
      {
        name: '张三',
        img: '/images/shop3.png',
        price: 25
      },
      {
        name: '李四',
        img: '/images/shop3.png',
        price: 35
      },
      {
        name: '王五',
        img: '/images/shop3.png',
        price: 45
      }
    ],
    time: {
      h: 20,
      i: 50,
      s: 50
    }
  },
  toBuy: function () {
    wx.navigateTo({
      url: '/page/index/pages/buy/buy'
    })
  },
  showRules: function () {
    this.setData({showRulesStatus: true})
  },
  cancelShowRules: function () {
    this.setData({showRulesStatus: false})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
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