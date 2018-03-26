import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shareData:{
      title: '我的店铺',
      desc: '有很多好货哦',
      path: '/page/infocenter/pages/myMainShop/myMainShop'
    },
    flag:false,
    currentTab:0,
    pros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail",zhe:true },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail" ,zhe:true},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail" ,zhe:false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail",zhe:false}
    ],
    newpros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false}
    ],
    allpros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false }
    ],
    cuxiaopros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false},
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../../../assindex/pages/shopdetail/shopdetail", zhe: false }
    ],
    ads:["第三方卡萨丁开发","sdfkashdfklasldkfa","的时间考虑发哈的时空裂缝"],
    curTab:0,
  },
  collectClick:function(e){
    this.setData({
      flag:!this.data.flag
    });
  },
  switchNav:function(e){
    var cur = e.currentTarget.dataset.current;
    console.log(cur);
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  shaiSel:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) { return false; }
    else {
      this.setData({
        curTab: cur
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options.store_id)
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
    /**
     * 获取店铺信息
     */
    shop.getShopDetailByStore_id(options.store_id).then(res=>{
      //console.log(options.store_id)
      if(res.code==200){
        console.log(res)
      }else{
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {
    return this.data.shareData
  }
})