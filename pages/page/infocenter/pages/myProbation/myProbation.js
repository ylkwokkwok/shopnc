// page/infocenter/pages/myProbation/myProbation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    tablist:["申请中","申请成功","申请失败"],
    currentTab: 0,
    orderlist:[
      {img:"/images/shop3.png",tit:"客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断",oldprice:3000,status:"申请中",count:10,shopname:"说的话"},
      { img: "/images/shop3.png", tit: "客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断", oldprice: 3000, status: "申请中", count: 10,shopname:"店铺名称"},
      { img: "/images/shop3.png", tit: "客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断", oldprice: 3000, status: "申请成功"},
      { img: "/images/shop3.png", tit: "客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断", oldprice: 3000, status: "申请成功"},
      { img: "/images/shop3.png", tit: "客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断", oldprice: 3000, status: "申请失败"},
      { img: "/images/shop3.png", tit: "客户是法师撒客户发送的别发牢骚的发生的法律上的你回复圣诞节开发商垄断", oldprice: 3000, status: "申请失败"}
    ],
  },
  switchNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
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