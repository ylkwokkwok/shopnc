// page/infocenter/pages/myCartPrice/myCartPrice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    tablist: ["全部", "进行中", "成功", "失败"],
    currentTab: 0,
    orderlist: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "成功" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "失败" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "失败" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "成功" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "失败" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: 2, oldprice: "3000", pinglun: "3000", sales: 1000, stock: 1000, status: "成功" },
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