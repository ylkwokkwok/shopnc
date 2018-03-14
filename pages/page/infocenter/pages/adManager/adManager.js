// page/infocenter/pages/adManager/adManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    current:1,
    imageList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 4,
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current + 1,
    })
  },
  clearimgs: function () {
    wx.showModal({
      title: '确定删除',
      showCancel: true,
      cancelText: '取消',
      confirmText: '立即删除',
      confirmColor: '#568fdc',
      success: function (res) {
        if (res.confirm) {
          this.setData({
            imageList: []
          });
        }
      },
    })
  },
})