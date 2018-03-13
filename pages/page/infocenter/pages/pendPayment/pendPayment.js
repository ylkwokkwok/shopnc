// page/infocenter/pages/pendPayment/pendPayment.js
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
      {number:"123456789101112",time:"2018-03-10 16:54:38",img:"/images/shop2.png",title:"凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的",price:"300.00",count:1,color:"blue",size:"L",freight:"0.00",status:"待付款",username:"张三",address:"四川省绵阳市高新区留学人员创业园",id:1}
    ],
    reason:"请选择关闭交易的理由",
    reasons:["未及时付款","买家不想要了","买家信息填错，重新拍","恶意买家，同行捣乱","缺货"],
    isClose:false,
    isChangeFreight:false,
    isChangePrice:false,
  },
  closeOrder:function(e){
    id=e.currentTarget.id;
    this.setData({
      isClose:true
    });
  },
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