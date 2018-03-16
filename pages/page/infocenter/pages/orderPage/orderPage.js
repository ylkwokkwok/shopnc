// page/infocenter/pages/orderPage/orderPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab:0,
    waitPayment:[
      { number: "123456789101112", hour: 23, minute: 59, status: "待支付", money: "300.00", freight: "3.00", shopname: "sails的糖果", count: 1, img_url: "/images/shop2.png", title: "就是发十多年开发商哎说多了可能发生的阿斯利康看到你发啊手动阀你卡上", id: 1 }
    ],
    waitSendGoods:[
      { number: "123456789101112", hour: 23, minute: 59, status: "已完成", money: "300.00", freight: "3.00", shopname: "sails的糖果", count: 1, img_url: "/images/shop2.png", title: "就是发十多年开发商哎说多了可能发生的阿斯利康看到你发啊手动阀你卡上",id:2}
    ],
    waitAspectGoods:[
      { number: "123456789101112", hour: 23, minute: 59, status: "待收货", money: "300.00", freight: "3.00", shopname: "sails的糖果", count: 1, img_url: "/images/shop2.png", title: "就是发十多年开发商哎说多了可能发生的阿斯利康看到你发啊手动阀你卡上",id:3}
    ],
    waitEvaluate:[
      { number: "123456789101112", hour: 23, minute: 59, status: "待评价", money: "300.00", freight: "3.00", shopname: "sails的糖果", count: 1, img_url: "/images/shop2.png", title: "就是发十多年开发商哎说多了可能发生的阿斯利康看到你发啊手动阀你卡上",id:4}
    ],
    isAspect:false,
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  confirmAspect:function(e){
    var that=this;
    wx.showModal({
      title: '确认收货',
      showCancel: true,
      cancelText: '取消',
      cancelColor: "black",
      confirmText: "确认",
      confirmColor: "#568fdc",
      success:function(res){
        if(res.confirm){
          that.setData({
            isAspect:true,
          });
        }
      },
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
    this.setData({
      currentTab:options.current
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