import shop from '../../../../utils/shop';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    shopname:"圣诞节和发动机",
    // shops:[
    //   { img: "/images/shop2.png", jie: "刀口恢复卡戴珊阿斯利康发狂似的能否萨拉丁孔繁森", detail: "产品详情", num: 1, money: 300, freight:0}
    // ],
    showSel:false,
    addList:[
      "四川省绵阳市涪城区","北京市朝阳区","福建省晋江市"
    ],
    currentTab:0,
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    var add=e.currentTarget.dataset.val;
    // console.log(e);
    this.setData({
      showSel: false,
      address: add
    });
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  add:function(e){
    var num = this.data.shops.num;
    num++;
    this.setData({
      'shops.num':num,
      totalMoney:parseInt(this.data.shops.goods_price * num).toFixed(2),
      payMoney: (parseInt(this.data.shops.goods_price * num)+ parseInt(this.data.shops.goods_freight)).toFixed(2),
      integral: (parseInt(this.data.shops.goods_price * num)+ parseInt(this.data.shops.goods_freight)).toFixed(0)
    })
  },
  reduce:function(){
    var num = this.data.shops.num;
    if(num>1){
      num--;
    }else{
      num=1;
    }
    this.setData({
      'shops.num':num,
      totalMoney: parseInt(this.data.shops.goods_price * num).toFixed(2),
      payMoney: (parseInt(this.data.shops.goods_price * num) + parseInt(this.data.shops.goods_freight)).toFixed(2),
      integral: (parseInt(this.data.shops.goods_price * num) + parseInt(this.data.shops.goods_freight)).toFixed(0)
    });
  },
  // inputChange:function(e){
  //   var num=e.detail.value;
  //   this.setData({
  //     totalMoney: (this.data.shops[0].money * num).toFixed(2),
  //     payMoney: (this.data.shops[0].money * num + this.data.shops[0].freight).toFixed(2),
  //     integral: (this.data.shops[0].money * num + this.data.shops[0].freight).toFixed(0)
  //   });
  // },
  selectAdd:function(){
    this.setData({
      showSel:true
    });
  },
  hideSel:function(){
    this.setData({
      showSel: false
    });
  },
  requestPayment:function(){
    var self=this;
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
  },
  onLoad: function (options) {
    var goods_id=options.goods_id;
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
    /**
     * 获取商品信息
     */
    shop.getGoodsDetail({ goods_id: goods_id }).then(res => {
      if (res.code == 200) {
        var image = res.datas.goods_image;
        var imgs = [];
        var bb = image.split(",");
        for (var i in bb) {
          imgs.push(bb[i]);
        }
        var info = res.datas.goods_info;
        info.num=1;
        that.setData({
          shops:info,
          goods_image: imgs,
          store_info: res.datas.store_info
        }); 
        that.setData({
          totalMoney: parseInt(this.data.shops.goods_price).toFixed(2),
          payMoney: (parseInt(this.data.shops.goods_price) + parseInt(this.data.shops.goods_freight)).toFixed(2),
          integral: (parseInt(this.data.shops.goods_price) + parseInt(this.data.shops.goods_freight)).toFixed(0),
          address: this.data.addList[0]
        });  
      }
    })
  } 
})