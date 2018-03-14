// page/infocenter/pages/uploadPage/uploadPage.js
// var imglist =new Array(4);
var imglist=[];
var imageList=[];
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    imageList:[],
    current:1,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    provinces1: [],
    province1: "",
    citys1: [],
    city1: "",
    countys: [],
    county: '',
    countys1: [],
    county1: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    value1: [0, 0, 0],
    values1: [0, 0, 0],
    condition: false,
    condition1:false,
    condition2:false,
    condition3:false,
    condition4:false,
    category:'',
    categorys:["多数开发商看到","sdjfsdfsd","sdfjkshadjf","的是开放的","大师傅立刻就是打开"],
    isShow:false,
    currentTab:-1,
    chosen: '',
    nodes:'<h1 style="text-align:center;font-size:28rpx;">上传规范</h1><p style="text-indent:2em;font-size:20rpx;">是快乐的分厘卡似的收到了开放式可怜的数量可能对方尼可拉斯的舍得离开南非</p>',
    imglist:[],
    imageList:[],
  },
  formReset:function(e){
    console.log(e);
    this.setData({
      chosen: ''
    })
  },
  formSubmit:function(e){
    console.log(e);
    var current=e.detail.target.id;
    if(current=="intodepot"){
      var that=this;
      wx.showModal({
        title: '已放入仓库',
        showCancel: true,
        cancelText: '继续添加',
        confirmText: '入库查看',
        confirmColor: '#568fdc',
        success: function(res) {
         if (res.confirm) {
          wx.navigateTo({
            url: '../shopUpload/shopUpload?curTab=1',
          })
         }
        },
      })
    }
    if (current == "release") {
      var that=this;
      wx.showModal({
        title: '发布成功',
        // content: '',
        showCancel: true,
        cancelText: '继续添加',
        // cancelColor: '',
        confirmText: '点击查看',
        confirmColor: '#568fdc',
        success: function (res) {
          if (res.confirm) {
            wx: wx.navigateTo({
              url: '../shopUpload/shopUpload?curTab=0',
            })
          }
        },
      })
    }
  },
  showSelect:function(){
    this.setData({
      isShow:true
    });
  },
  selectShopDetail:function(){
    this.setData({
      condition3:true
    });
  },
  hideSelect:function(e){
    var cur = e.currentTarget.dataset.current;
    this.setData({
      condition2:false,
      category:e.currentTarget.dataset.value
    });
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  hidecategory:function(){
    this.setData({
      condition2:false
    });
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }

  },
  bindChange1: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys1 = [];
      const countys1 = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys1.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys1.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province1: this.data.provinces[val[0]],
        city1: cityData[val[0]].sub[0].name,
        citys1: citys1,
        county1: cityData[val[0]].sub[0].sub[0].name,
        countys1: countys1,
        values1: val,
        value1: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys1 = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys1.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city1: this.data.citys1[val[1]],
        county1: cityData[val[0]].sub[val[1]].sub[0].name,
        countys1: countys1,
        values1: val,
        value1: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county1: this.data.countys1[val[2]],
        values1: val
      })
      return;
    }

  },
  open: function (e) {
    this.setData({
      condition: !this.data.condition
    })
  },
  open1: function (e) {
    this.setData({
      condition1: !this.data.condition1
    })
  },
  openCategory:function(){
    this.setData({
      condition2:true
    });
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 4,
      success: function (res) {
        for (var i in res.tempFilePaths) {
          that.data.imageList.push(res.tempFilePaths[i]);
        }
        that.setData({
          imageList: that.data.imageList
        });
      }
    })
  },
  chooseImg:function(e){
    var that=this;
    wx.chooseImage({
      success: function(res) {
        for(var i in res.tempFilePaths){
          that.data.imglist.push(res.tempFilePaths[i]);
        }
        that.setData({
          imglist:that.data.imglist
        });
      },
    })
  },
  deleteImg:function(e){
    var index=e.currentTarget.dataset.index;
    var hh = this.removeByValue(this.data.imglist, index);
    this.setData({
      imglist:hh
    });
  },
  moveUp:function(e){
    var index=e.currentTarget.dataset.index;
    if(index==0){
      return;
    }
    var newsimglist=this.swapItems(this.data.imglist, index, index - 1);
    this.setData({
      imglist: newsimglist
    });
  },
  moveDown:function(e){
    var index=e.currentTarget.dataset.index;
    if (index == this.data.imglist.length - 1) {
      return;
    }
    var newsimglist=this.swapItems(this.data.imglist, index, index + 1);
    this.setData({
      imglist:newsimglist
    });
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current + 1,
    })
  },
  clearimgs:function(e){
    var index = e.currentTarget.dataset.index;
    var hh = this.removeByValue(this.data.imageList, index);
    this.setData({
      imageList: hh
    });
  },
  showRegular:function(){
    this.setData({
      condition4:true
    });
  },
  hideRegular:function(){
    this.setData({
      condition4:false
    });
  },
  save:function(){
    this.setData({
      condition3:false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];
    const provinces1 = [];
    const citys1 = [];
    const countys1 = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    for (let i = 0; i < cityData.length; i++) {
      provinces1.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys1.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys1.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name,
      'provinces1': provinces1,
      'citys1': citys1,
      'countys1': countys1,
      'province1': cityData[0].name,
      'city1': cityData[0].sub[0].name,
      'county1': cityData[0].sub[0].sub[0].name
    })
  },
  removeByValue: function (brr, val) {
    for (var i = 0; i < brr.length; i++) {
      if (brr[i] == val) {
        brr.splice(i, 1);
        break;
      }
    }
    return brr;
  },
  swapItems: function (arr, index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  }
})