var interval=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0, 
    time: '获取验证码',
    currentTime: 61,
    disabled: false 
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + 'S后重新发送'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取验证码',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  formSubmit: function (e) {
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var yzm = e.detail.value.yzm;
    wx.navigateTo({
      url: "../alreadyBindPhone/alreadyBindPhone?phone=" + phone,
    });
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
  } 
})