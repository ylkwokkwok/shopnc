// page/infocenter/pages/returnGoods/returnGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    isReasons:false,
    reason:"其他",
    imageList: [],
    currentTab:0,
    reasons: ["重复下单/误下单", "其他渠道价格更低", "不想买了", "其他原因"],
  },
  reasonTap:function(){
    this.setData({
      isReasons:true
    });
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        for(var i in res.tempFilePaths){
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
  switchNav:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur,
        reason:e.currentTarget.dataset.value,
      })
    }
  },
  cancel:function(){
    this.setData({
      isReasons:false
    });
  },
  confirm:function(){
    this.setData({
      isReasons:false,
    });
  },
  formSubmit:function(){
    wx.navigateTo({
      url: '../returnGdDetail/returnGdDetail',
    })
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