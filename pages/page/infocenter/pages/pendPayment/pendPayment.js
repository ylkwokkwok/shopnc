<<<<<<< HEAD
var tcity = require("../../../../utils/citys.js");
=======
// page/infocenter/pages/pendPayment/pendPayment.js
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
var id,hh;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    tabItem:["待付款","退货中","待发货","已完成订单","全部订单"],
    curTab:0,
    currentTab:0,
    orderlist:[
<<<<<<< HEAD
      {number:"123456789101112",time:"2018-03-10 16:54:38",img:"/images/shop2.png",title:"凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的",price:"300.00",count:1,color:"blue",size:"L",freight:"0.00",status:'待付款',username:"张三",address:"四川省绵阳市高新区留学人员创业园",id:1},
      { number: "123456789101112", time: "2018-03-10 16:54:38", img: "/images/shop2.png", title: "凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的", price: "300.00", count: 1, color: "blue", size: "L", freight: "0.00", status: '退货中', username: "张三", address: "四川省绵阳市高新区留学人员创业园", id: 2, refund:"山东矿机放声大哭"},
      { number: "123456789101112", time: "2018-03-10 16:54:38", img: "/images/shop2.png", title: "凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的", price: "300.00", count: 1, color: "blue", size: "L", freight: "0.00", status: '待发货', username: "张三", address: "四川省绵阳市高新区留学人员创业园", id: 3 },
      { number: "123456789101112", time: "2018-03-10 16:54:38", img: "/images/shop2.png", title: "凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的", price: "300.00", count: 1, color: "blue", size: "L", freight: "0.00", status: '交易成功', username: "张三", address: "四川省绵阳市高新区留学人员创业园", id: 4 },
=======
      {number:"123456789101112",time:"2018-03-10 16:54:38",img:"/images/shop2.png",title:"凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的",price:"300.00",count:1,color:"blue",size:"L",freight:"0.00",status:"待付款",username:"张三",address:"四川省绵阳市高新区留学人员创业园",id:1}
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
    ],
    reason:"请选择关闭交易的理由",
    reasons:["未及时付款","买家不想要了","买家信息填错，重新拍","恶意买家，同行捣乱","缺货"],
    isClose:false,
    isChangeFreight:false,
    isChangePrice:false,
<<<<<<< HEAD
    isChangeAddress:false,
    isSellerNotes:false,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
=======
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
  },
  closeOrder:function(e){
    id=e.currentTarget.id;
    this.setData({
      isClose:true
    });
  },
<<<<<<< HEAD
  changeAddress:function(){
    this.setData({
      isChangeAddress:true,
    });
  },
  confirmAddress:function(){
    this.setData({
      isChangeAddress:false,
    });
  },
  sellerNotes:function(){
    this.setData({
      isSellerNotes:true,
    });
  },
  confirmNotes:function(){
    this.setData({
      isSellerNotes:false,
    });
  },
=======
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
  changeFreight:function(e){
    this.setData({
      isChangeFreight: true
    });
  },
  switchNav:function(e){
    var cur=e.currentTarget.dataset.current;
    if (this.data.curTab == cur) { return false; }
    else {
      this.setData({
        curTab: cur
      })
    }
  },
  changeReason:function(e){
    var cur = e.currentTarget.dataset.current;
    this.setData({
      reason:e.currentTarget.dataset.value
    });
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  confirm:function(){
    var orderlist=this.data.orderlist;
    for(var i in orderlist){
      hh=this.removeByValue(orderlist[i],id);
    }
    this.setData({
      isClose:false,
      orderlist:hh
    });
  },
  submitFreight:function(e){
    this.setData({
      isChangeFreight:false
    });
  },
  changePrice:function(e){
    var idd=e.currentTarget.id;
    wx.redirectTo({
      url: '../changePrice/changePrice?id='+idd,
    })
  },
<<<<<<< HEAD
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
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
=======
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
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
    this.setData({
      curTab:options.curTab
    });
<<<<<<< HEAD
    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

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

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
=======
>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
  },
  removeByValue: function (brr, val) {
    for (var i = 0; i < brr.length; i++) {
      if (brr[i] == val) {
        brr.splice(i, 1);
        break;
      }
    }
    return brr;
  }
})