var freight,price,reallyPrice;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    orderlist: [
      { number: "123456789101112", time: "2018-03-10 16:54:38", img: "/images/shop2.png", title: "凯撒几号放假啊是是的饭卡数据库的啊是基范数据库里的", price: "300.00", count: 1, color: "blue", size: "L", freight: "0.00", status: "待付款", username: "张三", address: "四川省绵阳市高新区留学人员创业园", id: 1 }
    ],
    checked:true,
  },
  switchChange:function(e){
    this.setData({
      checked: e.detail.value
    });
    if (e.detail.value) {
      this.setData({
        'orderlist[0].freight': this.data.orderlist[0].freight,
        'orderlist[0].price': this.data.orderlist[0].price,
        reallyPrice: (parseInt(this.data.orderlist[0].freight) + parseInt(this.data.orderlist[0].price)).toFixed(2)
      });
    } else {
      this.setData({
        'orderlist[0].freight': this.data.orderlist[0].freight,
        'orderlist[0].price': this.data.orderlist[0].price,
        reallyPrice: parseInt(this.data.orderlist[0].price).toFixed(2)
      });
    }
  },
  inputVal: function (e) {
    this.data.orderlist[0].price = e.detail.value;
    if(this.data.checked){
      if (e.detail.value.length == 0){
        this.setData({
          reallyPrice: (0 + parseInt(this.data.orderlist[0].freight)).toFixed(2)
        });
      }else{
        if(reallyPrice=="NaN"){
          reallyPrice: (parseInt(e.detail.value) + parseInt(this.data.orderlist[0].freight)).toFixed(2)
        }else{
          this.setData({
            price: e.detail.value,
            reallyPrice: (parseInt(e.detail.value) + parseInt(this.data.orderlist[0].freight)).toFixed(2)
          });
        }
      }
    }else{
      if (e.detail.value.length==0){
       this.setData({
        //  freight: freight,
         price: e.detail.value,
         reallyPrice:0.00
       });
     }else{
       this.setData({
        //  freight: freight,
         price: price,
         reallyPrice: parseInt(e.detail.value).toFixed(2)
       });
     }
    }
  },
  freightVal:function(e){
    this.data.orderlist[0].freight = e.detail.value;
    if (this.data.checked) {
      if (e.detail.value.length==0){
        this.setData({
          'orderlist[0].freight': e.detail.value,
          // price: this.data.orderlist[0].price,
          reallyPrice: (0 + parseInt(this.data.orderlist[0].price)).toFixed(2)
        });
      }else{
        this.setData({
          'orderlist[0].freight': e.detail.value,
          // price: price,
          reallyPrice: (parseInt(e.detail.value) + parseInt(this.data.orderlist[0].price)).toFixed(2)
        });
      }
    } else {
      if (e.detail.value.length==0){
        this.setData({
          'orderlist[0].freight': e.detail.value,
          // price: this.data.orderlist[0].price,
          reallyPrice: 0
        });
      }else{
        this.setData({
          'orderlist[0].freight': this.data.orderlist[0].freight,
          // price: price,
          reallyPrice: parseInt(this.data.orderlist[0].price).toFixed(2)
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      reallyPrice: (parseInt(this.data.orderlist[0].price)+parseInt(this.data.orderlist[0].freight)).toFixed(2),
    });
  }
})