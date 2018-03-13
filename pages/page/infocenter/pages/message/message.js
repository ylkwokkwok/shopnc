var message;
var startX;
var startY;
var endX;
var endY;
var key;
var maxRight = 60;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    message:[
      { img: "/images/tx.jpg", title: "四大护法", detail: "雕刻技法开始skfkashdflans克里斯多夫那", time: "2018-03-10", "right": 0, "startRight": 0,isSystem:true,id:0},
      { img: "/images/tx.jpg", title: "四大护法", detail: "雕刻技法开始skfkashdflans克里斯多夫那", time: "2018-03-10", "right": 0, "startRight": 0,isSystem:false,id:1},
      { img: "/images/tx.jpg", title: "四大护法", detail: "雕刻技法开始skfkashdflans克里斯多夫那", time: "2018-03-10", "right": 0, "startRight": 0, isSystem: false,id:2 },
      { img: "/images/tx.jpg", title: "四大护法", detail: "雕刻技法开始skfkashdflans克里斯多夫那", time: "2018-03-10", "right": 0, "startRight": 0, isSystem: false,id:3}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  drawStart: function (e) {
    // console.log("drawStart");
    var touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    var message = this.data.message;
    for (var i in message) {
      var data = message[i];
      data.startRight = data.right;
    }
    key = true;
  },
  drawEnd: function (e) {
    console.log("drawEnd");
    var message = this.data.message;
    for (var i in message) {
      var data = message[i];
      if (data.right <= 100 / 2) {
        data.right = 0;
      } else {
        data.right = maxRight;
      }
    }
    this.setData({
      message: message
    });
  },
  drawMove: function (e) {
    //console.log("drawMove");
    var self = this;
    var dataId = e.currentTarget.id;
    console.log();
    var message = this.data.message;
    if (key) {
      var touch = e.touches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      console.log("startX=" + startX + " endX=" + endX);
      if (endX - startX == 0)
        return;
      var res = message;
      //从右往左
      if ((endX - startX) < 0) {
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            console.log(startRight);
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
        message: message
      });

    }
  },
  //删除item
  delItem: function (e) {
    var dataId = e.currentTarget.dataset.id;
    var message = this.data.message;
    var newmessage = [];
    for (var i in message) {
      var item = message[i];
      if (item.id != dataId) {
        newmessage.push(item);
      }
    }
    this.setData({
      message: newmessage
    });
  },
})