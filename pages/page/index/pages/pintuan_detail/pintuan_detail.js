Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"2000",
    money2:"1500",
    current:1,
    imgs: ["/images/shop3.png", "/images/shop3.png", "/images/shop3.png", "/images/shop3.png"],
    info: {tit: "收到卡里的解放啦可是那是大幅拉升泛滥是对方", price: "2000", oldprice: "2500", salesvolumn: "1500", stock: "1000"},
    collage_list:[
      {tx:"/images/tx.jpg",username:"深刻的"},
      {tx:"/images/tx.jpg",username:"都可能"}
    ],
    countDownHour:"24",
    countDownMinute:"00",
    countDownSecond:"00",
    evalutes:[
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0,1,2,3,4],starimg:"/images/star.png",shopimgs:["/images/shop1.png","/images/shop2.png","/images/shop3.png"]},
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: []}
    ],
    currentTab: 0, 
    collect: false,
    collectImg: "/images/collect.png",
    collectText: "收藏" 
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current+1,
    })
  },
  changeCollect: function (e) {
    if (this.data.collect == false) {
      this.setData({
        collectImg: "/images/collect_sel.png",
        collectText: "已收藏"
      })
    } else {
      this.setData({
        collectImg: "/images/collect.png",
        collectText: "收藏"
      })
    }
    this.setData({
      collect: !(this.data.collect)
    });
  },
  onReady: function () {
    var totalSecond = 86400;

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;

      // 小时位  
      var hr = Math.floor(second / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },  
  /**
   * 滑动切换
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  } 
})