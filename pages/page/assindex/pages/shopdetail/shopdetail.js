import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    currentTab: 0,  
    collect:false,
    collectImg:"/images/collect.png",
    collectText:"收藏",
    isCollect:false,
    //
    goodsInfo: null,
    detailList: [], // 商品详情页
    specImage: [],
    imageList: null,
    goodsCommendList: null,
    storeInfo: null,
    specList: null,
    goodsImage: null,
    goodsHairInfo: null,
    goodsSpecs: null,
    buyNumber: 1,
    cartNumber: 0,
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
  /**
   * 选择商品规格
   * @param e
   */
  selectSpec: function (e) {
    var spec_name_id = e.target.dataset.specNameId
    var spec_value_id = e.target.dataset.specValueId
    var key = 'default_spec.' + spec_name_id
    this.setData({[key]: spec_value_id})
    var spec_list_key = []
    for (var item in this.data.default_spec) {
      spec_list_key.push(this.data.default_spec[item])
    }
    spec_list_key.sort(function (a, b) {
      return a - b
    })
    spec_list_key = spec_list_key.join('|')
    var new_goods_id = this.data.specList[spec_list_key]
    var goods_specs = this.data.goodsSpecs
    for (var spec_name_index in goods_specs) {
      if(spec_name_index == spec_name_id) {
        for (var spec_value_index in goods_specs[spec_name_index].spec_values) {
          goods_specs[spec_name_index].spec_values[spec_value_index].checked = spec_value_index == spec_value_id
        }
      }
    }
    this.setData({goodsSpecs: goods_specs})
    this.getGoods(new_goods_id, 1)
  },
  getGoods: function (goods_id, type) {
    var that = this
    shop.getGoodsDetail({goods_id: goods_id}).then(res => {
      if(res.code == 200){
      var goodsInfo = res.datas.goods_info
      var detailList = this.getLinksByImg(goodsInfo.mobile_body)
      // 第一次加载时转换规格
      if(type == 0) {
        var goods_specs = {}
        var default_spec = {}
        /* goods specs */
        for (var spec_name_index in goodsInfo.spec_name) {
          var spec_values = {}
          var index = 0
          for (var spec_value_index in goodsInfo.spec_value[spec_name_index]) {
            // default spec
            if (index == 0) {
              // 默认选择第一个
              default_spec[spec_name_index] = spec_value_index
              spec_values[spec_value_index] = {
                spec_value_name: goodsInfo.spec_value[spec_name_index][spec_value_index],
                checked: true
              }
            } else {
              spec_values[spec_value_index] = {
                spec_value_name: goodsInfo.spec_value[spec_name_index][spec_value_index],
                checked: false
              }
            }
            index++
          }
          goods_specs[spec_name_index] = {
            spec_name: goodsInfo.spec_name[spec_name_index],
            spec_values: spec_values
          }
        }
        that.setData({
          goodsSpecs: goods_specs,
          default_spec: default_spec,
        })
      }
      // goods_price
      goodsInfo.goods_shop_price = goodsInfo.goods_price
      /* */
      that.setData({
        goodsInfo: goodsInfo,
        specImage: res.datas.spec_image,
        imageList: res.datas.image_list,
        goodsCommendList: res.datas.goods_commend_list,
        storeInfo: res.datas.store_info,
        specList: res.datas.spec_list,
        goodsImage: res.datas.goods_image.split(','),
        goodsHairInfo: res.datas.goods_hair_info,
        detailList: detailList,
        buyNumber: 1, //商品购买数量重置
        })
        if (detailList.length == 0) {
          shop.getGoodsBody({ goods_id: goods_id}).then(res => {
            detailList = that.getLinksByImg(res);
            that.setData({
              detailList: detailList,
            });
          })
        }
      }
    })
  },
  bindBuyNumberReduce: function () {
    var inputValue = this.data.buyNumber - 1
    this.changeNewBuyNumber(inputValue)
  },
  bindBuyNumberEvent: function (e) {
    var inputValue = isNaN(parseInt(e.detail.value)) ? 1 : parseInt(e.detail.value)
    this.changeNewBuyNumber(inputValue)
  },
  bindBuyNumberAdd: function () {
    var inputValue = this.data.buyNumber + 1
    this.changeNewBuyNumber(inputValue)
  },
  changeNewBuyNumber: function (inputValue) {
    inputValue = inputValue < 1 ? 1 : (inputValue > this.data.goodsInfo.goods_storage ? this.data.goodsInfo.goods_storage : inputValue)
    if(this.data.goodsInfo.is_virtual == 1 && inputValue > this.data.goodsInfo.virtual_limit){
      wx.showToast({
        title: "最多限购" + this.data.goodsInfo.virtual_limit + "件",
        icon: '',
        image: '/images/icon/error_prompt.png',
        duration: 2000
      })
      return
    }
    this.setData({ buyNumber: inputValue })
  },
  onLoad:function(options){
    let that = this
    var goods_id = options.goods_id
    that.getGoods(goods_id, 0)
    that.setData({
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
    if (arr.length < 1){
      return []
    }
    for(var src of arr){
      var ret = src.match(srcReg);
      if (ret[1]) {
        links.push(ret[1])
      }
    }
    return links
  },
  addToCart: function () {
    var goods_id = this.data.goodsInfo.goods_id
    var buy_number = this.data.buyNumber
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