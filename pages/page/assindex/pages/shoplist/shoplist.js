// page/assindex/pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    curTab:0,
    showview:false,
    selname:"综合",
    pros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" }
    ],
    shaiItem:[{text:"综合"},{text:"最新上架"},{text:"价格最低"},{text:"价格最高"}],
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (cur == 0) {
      this.setData({
        showview: true
      });
    }
    if (this.data.currentTab == cur) { 
      return false;
    }else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  selBar:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) {
      return false;
    } else {
      this.setData({
        curTab: cur,
        showview:false,
        selname:e.target.dataset.val
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
    showView: (options.showView == "true" ? true : false)
  } 
})