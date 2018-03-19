// page/infocenter/pages/integralManager/integralManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    imgs:["/images/adbanner.jpg","/images/adbanner.jpg","/images/adbanner.jpg"],
    currentTab:0,
    isShow:false,
    privilege: [
      { img: "/images/infocenter/openvip_jfgl.png", text: "积分管理" },
      { img: "/images/infocenter/kd.png", text: "开店" },
      { img: "/images/infocenter/fxvip.png", text: "分销vip" }
    ],
    shoplist:[
      {img:"/images/shop3.png",tit:"可接待沙发客急啊史蒂夫卢卡斯的课士大夫卢卡斯的但是法律你卡上的打发了你卡上的",jifen:2000,stock:20},
      { img: "/images/shop3.png", tit: "可接待沙发客急啊史蒂夫卢卡斯的课士大夫卢卡斯的但是法律你卡上的打发了你卡上的", jifen: 2000, stock: 20 },
      { img: "/images/shop3.png", tit: "可接待沙发客急啊史蒂夫卢卡斯的课士大夫卢卡斯的但是法律你卡上的打发了你卡上的", jifen: 2000, stock: 20 }
    ],
  },
  switchNav:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  exchange:function(){
    wx.showModal({
      title: '兑换成功',
      showCancel: true,
      cancelText: '返回',
      cancelColor: "black",
      confirmText: "继续兑换",
      confirmColor: "#568fdc",
    })
  },
  show:function(){
    this.setData({
      isShow:true,
    });
  },
  hide:function(){
    this.setData({
      isShow:false,
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