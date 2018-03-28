// page/index/pages/rankingFx/rankingFx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shoplist:[
      { tit: "店铺名称", jingle: "店铺简介", color:"#fd4e4e"},
      { tit: "店铺名称", jingle: "店铺简介", color:"#fa744b" },
      { tit: "店铺名称", jingle: "店铺简介", color:"#ff9903" },
      { tit: "店铺名称", jingle: "店铺简介", color:"#6a92ed" },
      { tit: "店铺名称", jingle: "店铺简介", color:"#51c0f8"},
      { tit: "店铺名称", jingle: "店铺简介" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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