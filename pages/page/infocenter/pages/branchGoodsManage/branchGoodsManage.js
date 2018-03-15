// page/infocenter/pages/branchGoodsManage/branchGoodsManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    saling:[
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist" },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist" },
    ],
    downed:[
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist1" },
      { img: "/images/shop3.png", tit: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", surplus: 20, totalsales: 5100, link: "../../../assindex/pages/shopdetail/shopdetail", isSelected: false, count: 1, shopgroup: "shoplist1" },
    ],
    isAllSelected: false,
    totalsel: 0,
    isAllSelected1: false,
    totalsel1: 0
  },
  switchNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
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
      this.data.saling[index].isSelected = !this.data.saling[index].isSelected;
      if (this.data.saling[index].isSelected) {
        this.data.totalsel = this.data.totalsel + this.data.saling[index].count;
      }
      else {
        this.data.totalsel = this.data.totalsel - this.data.saling[index].count;
      }
      //是否全选判断
      for (var i = 0; i < this.data.saling.length; i++) {
        Allprice = Allprice + this.data.saling[i].count;
      }
      if (Allprice == this.data.totalsel) {
        this.data.isAllSelected = true;
      }
      else {
        this.data.isAllSelected = false;
      }
      this.setData({
        saling: this.data.saling,
        totalsel: this.data.totalsel,
        isAllSelected: this.data.isAllSelected,
      })
    }
    if (gname == "shoplist1") {
      this.data.downed[index].isSelected = !this.data.downed[index].isSelected;
      if (this.data.downed[index].isSelected) {
        this.data.totalsel1 = this.data.totalsel1 + this.data.downed[index].count;
      }
      else {
        this.data.totalsel1 = this.data.totalsel1 - this.data.downed[index].count;
      }
      //是否全选判断
      for (var i = 0; i < this.data.downed.length; i++) {
        Allprice1 = Allprice1 + this.data.downed[i].count;
      }
      if (Allprice1 == this.data.totalsel1) {
        this.data.isAllSelected1 = true;
      }
      else {
        this.data.isAllSelected1 = false;
      }
      this.setData({
        downed: this.data.downed,
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
        for (i = 0; i < this.data.saling.length; i++) {
          this.data.saling[i].isSelected = true;
          this.data.totalsel = this.data.totalsel + this.data.saling[i].count;
        }
      }
      else {
        for (i = 0; i < this.data.saling.length; i++) {
          this.data.saling[i].isSelected = false;
        }
        this.data.totalsel = 0;
      }
      this.setData({
        saling: this.data.saling,
        totalsel: this.data.totalsel,
        isAllSelected: !this.data.isAllSelected
      })
    }
    if (gname == "shoplist1") {
      if (!this.data.isAllSelected1) {
        for (i = 0; i < this.data.downed.length; i++) {
          this.data.downed[i].isSelected = true;
          this.data.totalsel1 = this.data.totalsel1 + this.data.downed[i].count;
        }
      }
      else {
        for (i = 0; i < this.data.downed.length; i++) {
          this.data.downed[i].isSelected = false;
        }
        this.data.totalsel1 = 0;
      }
      this.setData({
        downed: this.data.downed,
        totalsel1: this.data.totalsel1,
        isAllSelected1: !this.data.isAllSelected1
      })
    }
  },
  //多个删除
  delSelected: function (e) {
    var gname=e.currentTarget.dataset.group;
    var newShops = [];
    var newShops2=[];
    if(gname=="shoplist"){
      for (var i = 0; i < this.data.saling.length; i++) {
        if (!this.data.saling[i].isSelected) {
          newShops.push(this.data.saling[i]);
        }
      }
      this.setData({
        saling: newShops
      });
    }else if(gname=="shoplist1"){
      for (var i = 0; i < this.data.downed.length; i++) {
        if (!this.data.downed[i].isSelected) {
          newShops2.push(this.data.downed[i]);
        }
      }
      this.setData({
        downed: newShops2
      });
    }
  },
  shelves:function(e){
    wx.showModal({
      title: '上架成功',
      cancelText: '继续上架',
      confirmText: '前往查看',
      confirmColor: '#568fdc',
      success: function (res) {
        if (res.confirm) {
         
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})