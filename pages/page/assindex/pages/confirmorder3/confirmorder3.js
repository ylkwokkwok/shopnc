Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    shopname: "圣诞节和发动机",
    shops: [
      { img: "/images/shop2.png", jie: "刀口恢复卡戴珊阿斯利康发狂似的能否萨拉丁孔繁森", detail: "产品详情", num: 1, money: 300, freight: 0 }
    ],
    showSel: false,
    addList: [
      "四川省绵阳市涪城区", "北京市朝阳区", "福建省晋江市"
    ],
    currentTab: 0,
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    var add = e.currentTarget.dataset.val;
    this.setData({
      showSel: false,
      address: add
    });
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  selectAdd: function () {
    this.setData({
      showSel: true
    });
  },
  hideSel: function () {
    this.setData({
      showSel: false
    });
  },
  returnFightGroup:function(){
    wx.navigateBack({
      delta:1,
    })
  },
  requestPayment: function () {
    var self = this;
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
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
    this.setData({
      payMoney: (this.data.shops[0].money + this.data.shops[0].freight).toFixed(2),
      integral: (this.data.shops[0].money + this.data.shops[0].freight).toFixed(0),
      address: this.data.addList[0]
    });
  }
})