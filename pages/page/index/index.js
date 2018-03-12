//index.js
//获取应用实例
Page({
  data: {
    imgs:[
      { img_url: '/images/banner1.jpg', link:"/page/assindex/assindex"},
      { img_url:'/images/banner1.jpg', link: "../city/city" },
      { img_url:'/images/banner1.jpg', link: "" },
      { img_url:'/images/banner1.jpg', link: "" },
      { img_url:'/images/banner1.jpg', link: "" }
    ],
    entrys:[
      { img_url: '/images/pingtuan.png', text: '拼团', link:"/page/index/pages/pingtuan/pingtuan"},
      { img_url: '/images/shichi.png', text: '试吃', link:"" },
      {img_url: '/images/shiyong.png', text: '试用',link:""},
      {img_url: '/images/kanjia.png', text: '砍价',link:"/page/index/pages/bargain_list/bargain_list"},
    ],
    pros:[
      {img_url:"/images/shop1.png",newprice:"300",oldprice:"500",link:""},
      { img_url: "/images/shop1.png",newprice: "300",oldprice: "500",link:"" },
      { img_url: "/images/shop1.png",newprice: "300",oldprice: "500", link:"" },
      { img_url: "/images/shop1.png",newprice: "300",oldprice: "500", link:"" }
    ],
    currentTab:0,
    ads:[
      { shopname: "手动阀地方", profit:"1000"},
      { shopname: "手动阀地方", profit: "1000" },
      { shopname: "手动阀地方", profit: "1000" },
      { shopname: "手动阀地方", profit: "1000" }
    ]
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
})
