import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    curTab:0,
    showview:false,
    selname:"综合",
    pros: [
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" },
      { img_url: "/images/shop3.png", title: "cpu:ingds", jie: "和覅身份is电话覅改阿斯卡都好损的阿斯蒂可打发士大夫", price: "2000", tuan: "活动标题", oldprice: "3000", pinglun: "3000", link: "../shopdetail/shopdetail" }
    ],
    shaiItem:[{text:"综合"},{text:"最新上架"},{text:"价格最低"},{text:"价格最高"}],
    //
    curpage: 0,
    page: 20,
    hasMore: true,
    goodsList: [],
  },
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (cur == 0) {
      this.setData({
        showview: true
      });
    }
    if (this.data.currentTab == cur) { 
      return false;
    }else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  selBar:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) {
      return false;
    } else {
      this.setData({
        curTab: cur,
        showview:false,
        selname:e.target.dataset.val
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    var gc_id = options.gc_id
    that.setData({gc_id: gc_id})
    that.getGoodsList()
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
    showView: (options.showView == "true" ? true : false)
  },
  getGoodsList: function () {
    let { curpage, page, searchText } = this.data
    const params = { curpage: ++curpage, page: page }
    params.gc_id = this.data.gc_id
    if (searchText) params.keyword = searchText

    var that = this;
    if(that.data.hasMore){
      shop.getGoodsListByGcId(params).then(res => {
        if(res.code == 200){
          const hasMore = res.datas.hasmore;
          const curpage = params.curpage;
          const goodsList = that.data.goodsList.concat(res.datas.goods_list);
        that.setData({ hasMore, goodsList, curpage})
        }
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getGoodsList()
  },
})