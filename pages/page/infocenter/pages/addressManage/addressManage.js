// page/infocenter/pages/addressManage/addressManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    addressList:[
     {name:"张三",phone:"13852945510",address:"四层楼回复的时刻四大力开发上看到你发撒了点开饭时可",id:1},
     { name: "李四", phone: "15245817741", address: "但是看了法术抵抗是独立开发的奶粉是对抗激烈反抗的撒",id:2}
    ],
    currentTab:0,
    defaultAdd:"默认地址",
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  //删除地址
  deleteAddress:function(e){
    var adId=e.currentTarget.dataset.id;
    var addressList=this.data.addressList;
    var newAddList=[];
    for(var i in addressList){
      var item=addressList[i];
      if(item.id!=adId){
        newAddList.push(item);
      }
    }
    this.setData({
      addressList:newAddList
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  }
})