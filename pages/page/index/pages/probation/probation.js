// page/index/pages/probation/probation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    money: "2000",
    money2: "1500",
    current: 1,
    imgs: ["/images/shop3.png", "/images/shop3.png", "/images/shop3.png", "/images/shop3.png"],
    info: { tit: "收到卡里的解放啦可是那是大幅拉升泛滥是对方", price: "2000", oldprice: "2500", salesvolumn: "1500", stock: "1000" },
    collage_list: [
      { tx: "/images/tx.jpg", username: "深刻的" },
      { tx: "/images/tx.jpg", username: "都可能" }
    ],
    countDownHour: "24",
    countDownMinute: "00",
    countDownSecond: "00",
    evalutes: [
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: ["/images/shop1.png", "/images/shop2.png", "/images/shop3.png"] },
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: [] }
    ],
    currentTab: 0,
    collect: false,
    collectImg: "/images/collect.png",
    collectText: "收藏",
    isCollect: false
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