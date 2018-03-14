// page/infocenter/pages/shopManager/shopManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    shoplist: [
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist" },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist" },
    ],
    shoplist1: [
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist1" },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist1" },
    ],
    curTab: 0,
    isAllSelected: false,
    totalsel: 0,
    isAllSelected1: false,
    totalsel1: 0
  },
  /**
   * 选择
   */
  selBtn: function (e) {
    var Allprice = 0;
    var Allprice1 = 0;
    let id = e.currentTarget.dataset.id,

      index = parseInt(e.currentTarget.dataset.index),
      gname = e.currentTarget.dataset.group;
    if (gname == "shoplist") {
      this.data.shoplist[index].isSelected = !this.data.shoplist[index].isSelected;
      if (this.data.shoplist[index].isSelected) {
        this.data.totalsel = this.data.totalsel + this.data.shoplist[index].count;
      }
      else {
        this.data.totalsel = this.data.totalsel - this.data.shoplist[index].count;
      }
      //是否全选判断
      for (var i = 0; i < this.data.shoplist.length; i++) {
        Allprice = Allprice + this.data.shoplist[i].count;
      }
      if (Allprice == this.data.totalsel) {
        this.data.isAllSelected = true;
      }
      else {
        this.data.isAllSelected = false;
      }
      this.setData({
        shoplist: this.data.shoplist,
        totalsel: this.data.totalsel,
        isAllSelected: this.data.isAllSelected,
      })
    }
    if (gname == "shoplist1") {
      this.data.shoplist1[index].isSelected = !this.data.shoplist1[index].isSelected;
      if (this.data.shoplist1[index].isSelected) {
        this.data.totalsel1 = this.data.totalsel1 + this.data.shoplist1[index].count;
      }
      else {
        this.data.totalsel1 = this.data.totalsel1 - this.data.shoplist1[index].count;
      }
      //是否全选判断
      for (var i = 0; i < this.data.shoplist1.length; i++) {
        Allprice1 = Allprice1 + this.data.shoplist1[i].count;
      }
      if (Allprice1 == this.data.totalsel1) {
        this.data.isAllSelected1 = true;
      }
      else {
        this.data.isAllSelected1 = false;
      }
      this.setData({
        shoplist1: this.data.shoplist1,
        totalsel1: this.data.totalsel1,
        isAllSelected1: this.data.isAllSelected1,
      })
    }
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    var gname = e.currentTarget.dataset.group;

    if (gname == "shoplist") {
      if (!this.data.isAllSelected) {
        for (i = 0; i < this.data.shoplist.length; i++) {
          this.data.shoplist[i].isSelected = true;
          this.data.totalsel = this.data.totalsel + this.data.shoplist[i].count;
        }
      }
      else {
        for (i = 0; i < this.data.shoplist.length; i++) {
          this.data.shoplist[i].isSelected = false;
        }
        this.data.totalsel = 0;
      }
      this.setData({
        shoplist: this.data.shoplist,
        totalsel: this.data.totalsel,
        isAllSelected: !this.data.isAllSelected
      })
    }
    if (gname == "shoplist1") {
      if (!this.data.isAllSelected1) {
        for (i = 0; i < this.data.shoplist1.length; i++) {
          this.data.shoplist1[i].isSelected = true;
          this.data.totalsel1 = this.data.totalsel1 + this.data.shoplist1[i].count;
        }
      }
      else {
        for (i = 0; i < this.data.shoplist1.length; i++) {
          this.data.shoplist1[i].isSelected = false;
        }
        this.data.totalsel1 = 0;
      }
      this.setData({
        shoplist1: this.data.shoplist1,
        totalsel1: this.data.totalsel1,
        isAllSelected1: !this.data.isAllSelected1
      })
    }
  },
  //多个删除
  delSelected: function (e) {
    var newShops = [];
    var newShops1=[];
    var gname=e.currentTarget.dataset.group;
    if(gname=="shoplist"){
      for (var i = 0; i < this.data.shoplist.length; i++) {
        if (!this.data.shoplist[i].isSelected) {
          newShops.push(this.data.shoplist[i]);
        }
      }
      this.setData({
        shoplist: newShops
      });
    }
    if (gname == "shoplist1") {
      for (var i = 0; i < this.data.shoplist1.length; i++) {
        if (!this.data.shoplist1[i].isSelected) {
          newShops1.push(this.data.shoplist1[i]);
        }
      }
      this.setData({
        shoplist1: newShops1
      });
    }
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