import shop from '../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    info:[
      { username: '圣诞节', jifen: 0, isVip: true, tx: "/images/tx.jpg", erweima: ["/images/infocenter/erweima.jpg"],phone:"4545646455",entry:false},{
        username: '圣诞节',
        jifen: 0,
        isVip: false,
        tx: "/images/tx.jpg",
        erweima: ["/images/infocenter/erweima.jpg"],
        phone:"4545646455"
      }
    ],
    userInfo: {
      username: '未登录',
      jifen: 0,
      isVip: false,
      avatarUrl: "/images/tx.jpg",
      erweima: ["/images/infocenter/erweima.jpg"],
      phone: null
    },
  },
  imgyu:function(e){
    console.log(e);
    var src = e.currentTarget.dataset.src;//获取data-src
    var imgList = e.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, 
      urls: imgList
    })
  },
  onLoad:function(){
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    that.setData({
      userInfo: shop.getUserInfo()
    })
  },
})