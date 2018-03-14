// page/infocenter/pages/shopUpload/shopUpload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shoplist: [
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail",time:""},
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail"},
    ],
    shoplist1: [
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", time: "" },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail" },
    ],
    curTab:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      curTab:options.curTab
    });
  },
  shaiTab: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) { return false; }
    else {
      this.setData({
        curTab: cur
      })
    }
  }
})