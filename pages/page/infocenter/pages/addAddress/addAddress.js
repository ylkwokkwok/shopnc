import shop from '../../../../utils/shop'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    true_name: null,
    mob_phone: null,
    province: null,
    city: null,
    county: null,
    address: null,
    is_default: false,
    area_province: null,
    area_city: null,
    area_county: null,
    area_info: null,
    form_type: 'add',
    cartId: null,

    provinces: [],
    provinceIndex: 0,
    provinceId: 0,

    citys: [],
    cityIndex: 0,
    cityId: 0,

    countys: [],
    countyIndex: 0,
    countyId: 0,
  },
  bindProvinceChange: function (e) {
    this.setData({
      provinceIndex: e.detail.value,
      provinceId: this.data.provinces[e.detail.value].area_id,
      area_province: this.data.provinces[e.detail.value].area_name
    })
    shop.getAreaById({area_id: this.data.provinceId})
      .then(res => {
      this.setData({
      citys: res.datas.area_list,
      cityId: res.datas.area_list[0].area_id,
      area_city: res.datas.area_list[0].area_name
    })
    shop.getAreaById({area_id: this.data.cityId})
      .then(res => {
      this.setData({
      countys: res.datas.area_list,
      countyId: res.datas.area_list[0].area_id,
      area_county: res.datas.area_list[0].area_name
    })
  })
  .catch(error => console.log("get countys error: " + error))
  })
  .catch(error => console.log(error))
  },
  bindCityChange: function (e) {
    this.setData({
      cityId: this.data.citys[e.detail.value].area_id,
      cityIndex: e.detail.value,
      area_city: this.data.citys[e.detail.value].area_name
    })
    shop.getAreaById({area_id: this.data.cityId})
      .then(res => this.setData({
      countys: res.datas.area_list,
      countyId: res.datas.area_list[0].area_id,
      area_county: res.datas.area_list[0].area_name
    }))
  .catch(error => console.log(error))
  },
  bindCountyChange: function (e) {
    this.setData({
      countyIndex: e.detail.value,
      countyId: this.data.countys[e.detail.value].area_id,
      area_county: this.data.countys[e.detail.value].area_name
    })
  },
  formSubmit: function () {
    let validates = {
      true_name:'请填写收货人信息',
      mob_phone:'请填写联系电话',
      area_info: '请填写地址详情',
    }
    let that = this
    for (var key in validates){
      if (that.data[key] == ''){
        wx.showToast({
          title: validates[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    var data = {
      true_name: that.data.true_name,
      mob_phone: that.data.mob_phone,
      city_id: that.data.cityId,
      area_id: that.data.countyId,
      address: that.data.address,
      area_info: that.data.area_province + ' ' + that.data.area_city + ' ' + that.data.area_county,
      is_default: that.data.is_default ? 1 : 0
    }
    shop.addAddress(data).then(res => {
      wx.showToast({
        title: "添加成功",
        icon: 'none',
        duration: 2000
      })
      setTimeout(function () {
        if (that.data.cartId != null){
          wx.redirectTo({url: '/page/index/pages/buy/buy?cart_id=' + that.data.cartId + '&address_id=' + res.datas.address_id})
        }else{
          wx.redirectTo({url: '/page/infocenter/pages/addressManage/addressManage'})
        }
      }, 2000)
    })
  },
  bindKeyInput: function (e) {
    var key = e.currentTarget.dataset.key
    var obj = {}
    obj[key] = e.detail.value
    this.setData(obj)
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if(typeof(options.cartId) != 'undefined'){
      that.setData({cartId: options.cartId})
    }
    if(options.address_id) {
      shop.getAddressInfo({address_id: options.address_id}).then(res => {
        if(res.code == 200){
          let _address_info = res.datas.address_info
          that.setData({
            true_name: _address_info.true_name,
            mob_phone: _address_info.mob_phone,
            province: null,
            city: null,
            county: null,
            address: _address_info.address,
            is_default: _address_info.is_default == 1 ? true : false,
            area_info: _address_info.area_info,
            is_default: _address_info.is_default == 1 ? true : false,
            address_id: options.address_id,
            form_type: 'eidt'
          })
        }
      })
    }
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
    // 获取默认 省 市 县
    shop.getAreaById({area_id: 0})
      .then(res => {
        this.setData({
          provinces: res.datas.area_list,
          provinceId: res.datas.area_list[0].area_id,
          area_province: res.datas.area_list[0].area_name
        })
        shop.getAreaById({area_id: res.datas.area_list[0].area_id})
          .then(res => {
            this.setData({
              citys: res.datas.area_list,
              cityId: res.datas.area_list[0].area_id,
              area_city: res.datas.area_list[0].area_name
            })
            shop.getAreaById({area_id: res.datas.area_list[0].area_id})
              .then(res => {
                this.setData({
                  countys: res.datas.area_list,
                  countyId: res.datas.area_list[0].area_id,
                  area_county: res.datas.area_list[0].area_name
                })
              })
              .catch(error => console.log("get countys error: " + error))
          })
          .catch(error => console.log("get citys error: " + error))
      })
      .catch(error => console.log("get provinces error" + error))
  },
  bindIsDefaultChange: function (e) {
    this.setData({is_default: !this.data.is_default})
  },
})