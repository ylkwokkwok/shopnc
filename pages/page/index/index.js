import shop from '../../utils/shop.js'
//index.js
//获取应用实例
Page({
  data: {
    imgs: [
      { img_url: '/images/banner1.jpg', link: "/page/assindex/assindex" },
      { img_url: '/images/banner1.jpg', link: "../city/city" },
      { img_url: '/images/banner1.jpg', link: "" },
      { img_url: '/images/banner1.jpg', link: "" },
      { img_url: '/images/banner1.jpg', link: "" }
    ],
    entrys: [
      { img_url: '/images/pingtuan.png', text: '拼团', link: "/page/index/pages/pingtuan/pingtuan" },
      { img_url: '/images/shichi.png', text: '试吃', link: "/page/index/pages/probation_list/probation_list" },
      { img_url: '/images/shiyong.png', text: '试用', link: "/page/index/pages/probation_list/probation_list" },
      { img_url: '/images/kanjia.png', text: '砍价', link: "/page/index/pages/bargain_list/bargain_list" },
    ],
    pros: [
      { img_url: "/images/shop1.png", newprice: "300", oldprice: "500", link: "" },
      { img_url: "/images/shop1.png", newprice: "300", oldprice: "500", link: "" },
      { img_url: "/images/shop1.png", newprice: "300", oldprice: "500", link: "" },
      { img_url: "/images/shop1.png", newprice: "300", oldprice: "500", link: "" }
    ],
    currentTab: 0,
    ads: [
      { shopname: "手动阀地方", profit: "1000" },
      { shopname: "手动阀地方", profit: "1000" },
      { shopname: "手动阀地方", profit: "1000" },
      { shopname: "手动阀地方", profit: "1000" }
    ],
    shareData:{
      title: '云派易购',
      desc: '有很多好货哦',
      path: '/page/index/index'
    }
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onLoad: function () {
    var that = this;
    // 获取首页 goods_list
    shop.getIndexGoodsList().then(res => {
      if (res.code == 200) {
        that.setData({
          goods_list: res.datas.goods_list
        })
      }else{
      console.log('首页goods_list获取失败')
      }
    })
    // 获取首页 goods_commend
    shop.getIndexGoodsCommend().then(res => {
      if (res.code == 200) {
        that.setData({
          goods_commend: res.datas.goods_commend_list
        })
      }else{
      console.log('首页goods_commend获取失败')
      }
    })
    // 获取首页广告
    shop.getFastNewsAdvs().then(res => {
      if (res.code == 200) {
        that.setData({
          fast_news: res.datas.fast_news_adv_list
        })
      }else{
      console.log('首页广告获取失败')
      }
    })
    //获取每日上新
    shop.getTodayNewGoods().then(res => {
      if (res.code == 200) {
        //success
        console.log(res.datas);
        var data = res.datas.today_new_goods_list;
        for(var i in data){
          var brr=data[i].goods_name.split(" ");
          data[i].goods_name=brr[0];
        }
        that.setData({
          
          today_new_goods: data
        })
      } else {
        //error
      console.log('今日上新获取失败');
      }
    })
  },
  onShareAppMessage: function () {
    return this.data.shareData
  }
 })


