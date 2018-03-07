var bransh;
var mainStore;
var shops;
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
    currentTab:0,
    tabcount:["1","2","3"],
    bransh:[
      { "id": 1, name: "收费低啊沙发上", img: "/images/shop2.png", detail: "少部分设计大赛", right: 0, startRight: 0, groupname: "bransh" }, { "id": 2, name: "但发生的", img: "/images/shop2.png", detail: "但是空间发生大幅上课的发生地", right: 0, startRight: 0, groupname: "bransh"}
    ],
    mainStore:[
      { "id": 1, name: "收费低啊沙发上", img: "/images/shop2.png", detail: "少部分设计大赛", right: 0, startRight: 0, groupname: "mainStore" }, { "id": 2, name: "但发生的", img: "/images/shop2.png", detail: "但是空间发生大幅上课的发生地", right: 0, startRight: 0, groupname: "mainStore" }
    ],
    shops:[
      { "id": 1, name: "收费低啊沙发上", img: "/images/shop2.png", detail: "少部分设计大赛", right: 0, startRight: 0, groupname: "shops",isSelectd:false,count:1}, { "id": 2, name: "但发生的", img: "/images/shop2.png", detail: "但是空间发生大幅上课的发生地", right: 0, startRight: 0, groupname: "shops",isSelected:false,count:1}
    ],
    isAllSelected:false,
    totalsel:0
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  drawStart: function (e) {
    var touch = e.touches[0];
    var groupname=e.currentTarget.dataset.group;
    startX = touch.clientX;
    startY = touch.clientY;
    var bransh = this.data.bransh;
    var mainStore=this.data.mainStore;
    var shops=this.data.shops;
    if(groupname=="bransh"){
      for (var i in bransh) {
        var data = bransh[i];
        data.startRight = data.right;
      }
      key = true;
    }else if(groupname=="mainStore"){
      for (var i in mainStore) {
        var data = mainStore[i];
        data.startRight = data.right;
      }
      key = true;
    }else if(groupname=="shops"){
      for (var i in bransh) {
        var data = bransh[i];
        data.startRight = data.right;
      }
      key = true;
    }
  },
  drawEnd: function (e) {
    var groupname = e.currentTarget.dataset.group;
    var bransh = this.data.bransh;
    var mainStore = this.data.mainStore;
    var shops = this.data.shops;
    if(groupname=="bransh"){
      for (var i in bransh) {
        var data = bransh[i];
        if (data.right <= 100 / 2) {
          data.right = 0;
        } else {
          data.right = maxRight;
        }
      }
      this.setData({
        bransh: bransh
      });
    }else if(groupname=="mainStore"){
      for (var i in mainStore) {
        var data = mainStore[i];
        if (data.right <= 100 / 2) {
          data.right = 0;
        } else {
          data.right = maxRight;
        }
      }
      this.setData({
        mainStore: mainStore
      });
    }else if(groupname=="shops"){
      for (var i in shops) {
        var data = shops[i];
        if (data.right <= 100 / 2) {
          data.right = 0;
        } else {
          data.right = maxRight;
        }
      }
      this.setData({
        shops: shops
      });
    }  
  },
  drawMove: function (e) {
    var self = this;
    var groupname=e.currentTarget.dataset.group;
    var dataId = e.currentTarget.id;
    var bransh = this.data.bransh;
    var mainStore = this.data.mainStore;
    var shops = this.data.shops;
    if (key) {
      var touch = e.touches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      if (endX - startX == 0)
        return;
      var res = bransh;
      var res2=mainStore;
      var res3=shops;
      //从右往左

      if ((endX - startX) < 0) {
        if(groupname=="bransh"){
          console.log(groupname);
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
        }else if(groupname=="mainStore"){
          console.log(groupname);
          for (var k in res2) {
            var data = res2[k];
            if (res2[k].id == dataId) {
              var startRight = res2[k].startRight;
              var change = startX - endX;
              startRight += change;
              if (startRight > maxRight)
                startRight = maxRight;
              res2[k].right = startRight;
            }
          }
        }else if(groupname=="shops"){
          console.log(groupname);
          for (var k in res3) {
            var data = res3[k];
            if (res3[k].id == dataId) {
              var startRight = res3[k].startRight;
              var change = startX - endX;
              startRight += change;
              if (startRight > maxRight)
                startRight = maxRight;
              res3[k].right = startRight;
            }
          }
        }
      } else {//从左往右
        if(groupname=="bransh"){
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
        if(groupname=="mainStore"){
          for (var k in res2) {
            var data = res2[k];
            if (res2[k].id == dataId) {
              var startRight = res2[k].startRight;
              var change = endX - startX;
              startRight -= change;
              if (startRight < 0)
                startRight = 0;
              res2[k].right = startRight;
            }
          }
        }
        if(groupname=="shops"){
          for (var k in res3) {
            var data = res3[k];
            if (res3[k].id == dataId) {
              var startRight = res3[k].startRight;
              var change = endX - startX;
              startRight -= change;
              if (startRight < 0)
                startRight = 0;
              res3[k].right = startRight;
            }
          }
        }
      }
      self.setData({
        bransh: bransh,
        mainStore:mainStore,
        shops:shops
      });
    }
  },
  //删除item
  delItem: function (e) {
    var dataId = e.target.dataset.id;
    var groupname=e.currentTarget.dataset.group;
    var bransh = this.data.bransh;
    var mainStore = this.data.mainStore;
    var shops = this.data.shops;
    var newCardTeams = [];
    var newMainStore=[];
    var newShops=[];
    if(groupname=="bransh"){
      for (var i in bransh) {
        var item = bransh[i];
        if (item.id != dataId) {
          newCardTeams.push(item);
        }
      }
      this.setData({
        bransh:newCardTeams
      })
    }
    if(groupname=="mainStore"){
      for (var i in mainStore) {
        var item = mainStore[i];
        if (item.id != dataId) {
          newMainStore.push(item);
        }
      }
      this.setData({
        mainStore: newMainStore
      })
    }
    if(groupname=="shops"){
      for (var i in shops) {
        var item = shops[i];
        if (item.id != dataId) {
          newShops.push(item);
        }
      }
      this.setData({
        shops: newShops
      });
    }
  },
  /**
   * 选择
   */
  selBtn:function(e){
    var Allprice = 0, i = 0;
    let id = e.currentTarget.dataset.id,

    index = parseInt(e.currentTarget.dataset.index);
    this.data.shops[index].isSelected = !this.data.shops[index].isSelected;
    if (this.data.shops[index].isSelected) {
      this.data.totalsel = this.data.totalsel + this.data.shops[index].count;
    }
    else {
      this.data.totalsel = this.data.totalsel - this.data.shops[index].count;
    }
    //是否全选判断
    for (i = 0; i < this.data.shops.length; i++) {
      Allprice = Allprice + this.data.shops[i].count;
    }
    if (Allprice == this.data.totalsel) {
      this.data.isAllSelected = true;
    }
    else {
      this.data.isAllSelected = false;
    }
    this.setData({
      shops: this.data.shops,
      totalsel:this.data.totalsel,
      isAllSelected: this.data.isAllSelected,
    })
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelected) {
      for (i = 0; i < this.data.shops.length; i++) {
        this.data.shops[i].isSelected = true;
        this.data.totalsel = this.data.totalsel + this.data.shops[i].count;
      }
    }
    else {
      for (i = 0; i < this.data.shops.length; i++) {
        this.data.shops[i].isSelected = false;
      }
      this.data.totalsel = 0;
    }
    this.setData({
      shops: this.data.shops,
      totalsel:this.data.totalsel,
      isAllSelected: !this.data.isAllSelected
    })
  },
  //多个删除
  delSelected:function(e){
    var newShops=[];
    for(var i=0;i<this.data.shops.length;i++){
      if(!this.data.shops[i].isSelected){
        newShops.push(this.data.shops[i]);
      }
    }
    this.setData({
      shops:newShops
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
})