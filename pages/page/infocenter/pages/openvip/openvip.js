Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    info: [
      { username: '圣诞节', jifen: 0, tx: "/images/tx.jpg", erweima: ["/images/infocenter/erweima.jpg"] }
    ],
    paytab:[
      {type:"有推荐人",money:99.99},
      {type:"无推荐人", money: 99.99 }
    ],
    privilege:[
      {img:"/images/infocenter/openvip_jfgl.png",text:"积分管理"},
      { img: "/images/infocenter/kd.png", text: "开店" },
      { img: "/images/infocenter/fxvip.png", text: "分销vip" }
    ],
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
  onLoad: function () {
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