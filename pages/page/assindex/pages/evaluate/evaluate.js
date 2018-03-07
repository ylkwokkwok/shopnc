Page({

  /**
   * 页面的初始数据
   */
  data: {
    evalutes: [
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: ["/images/shop1.png", "/images/shop2.png", "/images/shop3.png"] },
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: [] }
    ],
    alleva:"1000",
    goodeva:"400",
    mideva:"500",
    badeva:"100",
    imgeva:"300",
    curtab:0
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.curtab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        curtab: e.target.dataset.current
      })
    }
  } 
})