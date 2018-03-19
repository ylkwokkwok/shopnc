// page/index/pages/probation_list/probation_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shoplist:[
      { img: "/images/shop3.png", name:"cpu:ingds ",jie:"大师傅似的啊手动阀卡萨丁发射点立刻你发",shopname:"是佳能单反",count:10,people:100},
      { img: "/images/shop3.png", name: "cpu:ingds ",jie:"快捷施法就是丹诺夫卡罚款了你多少三年免费",shopname: "是佳能单反", count: 10, people: 100 },
      { img: "/images/shop3.png", name: "cpu:ingds ",jie:"的开发商地方卢卡斯的法律看到你发的书房里卡迪夫看i",shopname: "是佳能单反", count: 10, people: 100 }
    ],
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