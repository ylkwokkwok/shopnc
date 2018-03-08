Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shareData: {
      title: '我的店铺',
      desc: '有很多好货哦',
      path: '/page/infocenter/pages/myMainShop/myMainShop'
    },
    currentTab:0,
    ads:["sdjkhhfajsd","辽阔的身份扣篮大赛","但是是尽快回复的健康","sdjkfnkdlsl看电视"],
    pros: [
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: true },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: true },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false }
    ],
  },
  collectClick: function (e) {
    this.setData({
      flag: !this.data.flag
    });
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
  onShareAppMessage: function () {
    return this.data.shareData
  },
})