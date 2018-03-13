var interval=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    time: '获取验证码',
    imageList: [],
    showSel: false,
    xieyi: "的数据库办法的就是看阿斯达克警方把数据库的士大夫饭卡斯达克警方啊十大科技发生大家看法阿三的客服解决啊数据库的沙发上的夫卡是的基本饭卡手动阀安德森会计法科技时代发啊都十分骄傲的设计开发",
    shopnameValue: '',
    contactValue: '',
    introValue: '',
    currentTime: 61,
    disabled: false
  },
  bindKeyInput: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        shopnameValue: e.detail.value//将input至与data中的inputValue绑定
      })
    } else if (id == 2) {
      this.setData({
        contactValue: e.detail.value//将input至与data中的inputValue绑定
      })
    } else {
      this.setData({
        introValue: e.detail.value//将input至与data中的inputValue绑定
      })
    }
  },
  clearInput: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        shopnameValue: ''//将input至与data中的inputValue绑定
      })
    } else if (id == 2) {
      this.setData({
        contactValue: ''//将input至与data中的inputValue绑定
      })
    } else {
      this.setData({
        introValue: ''//将input至与data中的inputValue绑定
      })
    }
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
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
  entryprompt: function (e) {
    console.log();
    this.setData({
      showSel: true
    });
  },
  hideSel: function () {
    this.setData({
      showSel: false
    });
  },
  chooseImage: function (e) {
    var that = this
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
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
})