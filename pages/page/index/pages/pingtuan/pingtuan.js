
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie:"和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫",price:"2000",tuan:"2",oldprice:"3000",pinglun:"3000",link:"../pintuan_detail/pintuan_detail"},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "2", oldprice: "3000", pinglun: "3000", link: "../pintuan_detail/pintuan_detail"}
    ],
    winHeight:0,
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