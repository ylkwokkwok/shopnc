var cardTeams;
var startX;
var startY;
var endX;
var endY;
var key;
var maxRight = 60;
Page({
  data: {
    address:"四川省绵阳市高新区留学人员创业园",
    cardTeams: [
      {
        shopname:"是的快捷",
        shopsdetail: [
          {
            id: "aaaaa",
            pic: "/images/shop1.png",
            name: "受打击啦空间打发士大夫绿卡的能力发生地方",
            price: 300,
            isSelect: false,
            num:1,
            right: 0,
            startRight: 0,
          }
        ],
      },
      {
        shopname: "是的快捷",
        shopsdetail: [
          {
            id: "bbbb",
            pic: "/images/shop1.png",
            name: "受打击啦空间打发士大夫绿卡的能力发生地方",
            price: 300,
            isSelect: false,
            num: 1,
            right: 0,
            startRight: 0,
          },
          {
            id: "cccc",
            pic: "/images/shop1.png",
            name: "受打击啦空间打发士大夫绿卡的能力发生地方",
            price: 300,
            isSelect: false,
            num: 1,
            right: 0,
            startRight: 0,
          }
        ],
      },
    ],
    isAllSelect: false,
    totalMoney: 0,
    // 商品详情介绍
  },
  drawStart: function (e) {
    // console.log("drawStart");
    var touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    var cardTeams = this.data.cardTeams;
    for (var i in cardTeams) {
      var data = cardTeams[i];
      data.startRight = data.right;
    }
    key = true;
  },
  drawEnd: function (e) {
    var cardTeams = this.data.cardTeams;
    for (var i in cardTeams) {
      var data = cardTeams[i];
      if (data.right <= 100 / 2) {
        data.right = 0;
      } else {
        data.right = maxRight;
      }
    }
    this.setData({
      cardTeams: cardTeams
    });
  },
  drawMove: function (e) {
    //console.log("drawMove");
    var self = this;
    var dataId = e.currentTarget.id;
    var cardTeams = this.data.cardTeams;
    if (key) {
      var touch = e.touches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      console.log("startX=" + startX + " endX=" + endX);
      if (endX - startX == 0)
        return;
      var res = cardTeams;
      //从右往左

      if ((endX - startX) < 0) {
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = startX - endX;
            startRight += change;
            if (startRight > maxRight)
              startRight = maxRight;
            res[k].right = startRight;
          }
        }
      } else {//从左往右
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = endX - startX;
            startRight -= change;
            if (startRight < 0)
              startRight = 0;
              res[k].right = startRight;
          }
        }
      }
      self.setData({
        cardTeams: cardTeams
      });

    }
  },
  //删除item
  delItem: function (e) {
    var dataId = e.target.dataset.id;
    var cardTeams = this.data.cardTeams;
    var newCardTeams = [];
    for (var i in cardTeams) {
      var item = cardTeams[i];
      if (item.id != dataId) {
        newCardTeams.push(item);
      }
    }
    this.setData({
      cardTeams: newCardTeams
    });
  },
  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let id = e.target.dataset.id,

    index = parseInt(e.target.dataset.index);
    this.data.cardTeams[index].isSelect = !this.data.cardTeams[index].isSelect;
    //价钱统计
    if (this.data.cardTeams[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.cardTeams[index].price;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - this.data.cardTeams[index].price;
    }
    //是否全选判断
    for (i = 0; i < this.data.cardTeams.length; i++) {
      Allprice = Allprice + this.data.cardTeams[i].price;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      cardTeams: this.data.cardTeams,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  // //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.cardTeams.length; i++) {
        this.data.cardTeams[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.cardTeams[i].price;
      }
    }
    else {
      for (i = 0; i < this.data.cardTeams.length; i++) {
        this.data.cardTeams[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      cardTeams: this.data.cardTeams,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // //数量变化处理
  // handleQuantityChange(e) {
  //   var componentId = e.componentId;
  //   var quantity = e.quantity;
  //   this.data.cardTeams[componentId].count.quantity = quantity;
  //   this.setData({
  //     cardTeams: this.data.cardTeams,
  //   });
  // },
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
