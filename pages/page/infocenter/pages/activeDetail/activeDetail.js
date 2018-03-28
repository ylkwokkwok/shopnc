// page/infocenter/pages/activeDetail/activeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    goods_list:[
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100},
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100}
    ],
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
    this.setData({
      curTab:options.curTab
    });
  },
  confirm:function(){
    wx.navigateTo({
      url: '../activeManager/activeManager?curTab='+this.data.curTab,
    })
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