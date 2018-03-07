// page/infocenter/pages/alreadyBindPhone/alreadyBindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
  },
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
    this.setData({
      phone:options.phone
    });
  } 
})