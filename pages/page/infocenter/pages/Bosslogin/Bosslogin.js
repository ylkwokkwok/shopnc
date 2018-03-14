// page/infocenter/pages/Bosslogin/Bosslogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
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

  formSubmit: function (e) {
    var username = e.detail.value.username;
    wx: wx.redirectTo({
      url: '../mainStoreManager/mainStoreManager?username=' + username+'isBoss'+true
    })
  }
})