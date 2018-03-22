import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: "2000",
    money2: "1500",
    current: 1,
    imgs: ["/images/shop3.png", "/images/shop3.png", "/images/shop3.png", "/images/shop3.png"],
    info: { tit: "收到卡里的解放啦可是那是大幅拉升泛滥是对方", price: "2000", oldprice: "2500", salesvolumn: "1500", stock: "1000" },
    collage_list: [
      { tx: "/images/tx.jpg", username: "深刻的" },
      { tx: "/images/tx.jpg", username: "都可能" }
    ],
    countDownHour: "24",
    countDownMinute: "00",
    countDownSecond: "00",
    evalutes: [
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: ["/images/shop1.png", "/images/shop2.png", "/images/shop3.png"] },
      { username: "是的那份", date: "2018-01-22", content: "思考的风流快活是开发商的法律开始独立开发哈斯收到客户flak速度上单你发烧了的那份士大夫哈拉省的", star: [0, 1, 2, 3, 4], starimg: "/images/star.png", shopimgs: [] }
    ],
    currentTab: 0,  
    collect:false,
    collectImg:"/images/collect.png",
    collectText:"收藏",
    isCollect:false,
    //
    goods_commend_list: [],
    goods_evaluate_info: [],
    goods_image: '',
    goods_info: '',
    store_info: '',
    detailList: ''
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current + 1,
    })
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  changeCollect:function(e){
    if(this.data.collect==false){
      this.setData({
        collectImg:"/images/collect_sel.png",
        collectText:"已收藏"
      })
    }else{
      this.setData({
        collectImg: "/images/collect.png",
        collectText: "收藏"
      })
    }
    this.setData({
      collect:!(this.data.collect)
    });
  },
  collectSel:function(){
    this.setData({
      isCollect:!this.data.isCollect
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad:function(options){
    let that = this
    var goods_id = options.goods_id
    shop.getGoodsDetail({goods_id: goods_id}).then(res => {
      if(res.code == 200){
        that.setData({
          goods_commend_list: res.datas.goods_commend_list,
          goods_evaluate_info: res.datas.goods_evaluate_info,
          goods_image: res.datas.goods_image,
          goods_info: res.datas.goods_info,
          store_info: res.datas.store_info
        })
      }
    })
    shop.getGoodsDetailBody({goods_id: goods_id}).then(res => {
      var detailList = that.getLinksByImg(res)
      that.setData({detailList: detailList})
    })
    this.setData({
      isExchange:options.isExchange
    })
  },
  /**
   * html提取img url
   * @param body
   * @returns {Array}
   */
  getLinksByImg: function (body) {
    if (body == ''){
      return []
    }
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = body.match(imgReg);
    var links = []
    for(var src of arr){
      var ret = src.match(srcReg);
      if (ret[1]) {
        links.push(ret[1])
      }
    }
    return links
  },
  addToCart: function () {
    var goods_id = this.data.goods_info.goods_id
    var buy_number = 1
    shop.addToCart({goods_id: goods_id, quantity: buy_number}).then(res => {
      if(res.code == 200){
        wx.showModal({
          title: '提示',
          content: '加入购物车成功',
          cancelText: '好的',
          confirmText: '去购物车',
          success: function(res) {
            if (res.confirm) {
              wx.switchTab({url: '/page/shopcart/shopcart'})
            } else if (res.cancel) {
              //
            }
          }
        })
      }
    })
  }
})