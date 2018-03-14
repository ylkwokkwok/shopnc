Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    category:[
      {id:"0",name:"热销产品"},
      { id: "1", name: "家用电器" },
      { id: "2", name: "运动户外" },
      { id: "3", name: "电脑办公" },
      { id: "4", name: "生活美食" },
      { id: "5", name: "鞋靴箱包" }
    ],
    imgs:["1","2","3","4","5","6"]
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
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
  } 
})