// page/index/pages/writeReport/writeReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    isShow:false,
    imageList: [],
  },
  changeShow:function(){
    this.setData({
      isShow:!this.data.isShow
    });
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        for (var i in res.tempFilePaths) {
          that.data.imageList.push(res.tempFilePaths[i]);
        }
        that.setData({
          imageList: that.data.imageList
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
  delImg: function (e) {
    var imageList = this.data.imageList;
    var id = e.currentTarget.dataset.value;
    var hh = this.removeByValue(imageList, id);
    this.setData({
      imageList: hh
    });
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
  removeByValue: function (brr, val) {
    for (var i = 0; i < brr.length; i++) {
      if (brr[i] == val) {
        brr.splice(i, 1);
        break;
      }
    }
    return brr;
  }
})