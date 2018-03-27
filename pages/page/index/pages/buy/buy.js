import shop from '../../../../utils/shop'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    storeCartList: null,
    addressInfo: null,
    addressFee: null,
    storeFinalTotalList: null,
    selectAll: false,
    apiRootPath: null,
    orderAmount: 0,
    cartId: null,
    isVirtual: false,
    addressChecked: {
      addressId: 3,
      consignee: '张三',
      mobile: '13912312345',
      addressInfo: '四川省成都市武侯区xxxx道xx号',
      checked: true
    },
    addressInfoIsEmpty: true,
    //
    editAddressStatus: false,
    // address
    addressList: []
  },
  // address
  switchAddress: function (e) {
    let addressIndex = e.currentTarget.dataset.index
    let addressList = this.data.addressList
    for (var i in addressList){
      if (i == addressIndex) {
        addressList[i].checked = true
        this.setData({addressChecked: addressList[i]})
      }else {
        addressList[i].checked = false
      }
    }
    this.setData({addressList: addressList})
    this.cancelEditAddress()
  },
  selectAddress: function () {
    this.setData({editAddressStatus: true})
  },
  cancelEditAddress: function () {
    this.setData({editAddressStatus: false})
  },
  toEditAddress: function (e) {
    wx.redirectTo({url: '/page/infocenter/pages/addAddress/addAddress?cartId=' + this.data.cartId + '&address_id=' + e.currentTarget.dataset.addressId})
  },
  toAddressForm: function () {
    wx.redirectTo({url: '/page/infocenter/pages/addAddress/addAddress?cartId=' + this.data.cartId})
  },
  // buy
  checkout: function () {
    if(this.data.isVirtual == 0) {
      if (this.data.addressInfoIsEmpty) {
        wx.showToast({
          title: "请选择收货地址",
          icon: 'none',
          duration: 2000
        })
        return false
      }
      shop.buyStep2({
        ifcart: this.data.ifcart,
        cart_id: this.data.cartId,
        address_id: this.data.addressChecked.address_id,
        pintuan: null,
        log_id: null,
        buyer_id: null,
        vat_hash: this.data.vatHash,
        offpay_hash: this.data.offpayHash,
        offpay_hash_batch: this.data.offpayHashBatch,
        pay_name: 'online',
        invoice_id: 0,
        voucher: null,
        pd_pay: 0,
        password: null,
        fcode: null,
        rcb_pay: 0,
        rpt: null,
        pay_message: "2|,4|",
        buyer_idcard: null,
        input_chain_id: 0,
        isVirtual: false,
        virtualGoodsInfo: null,
        virtualStoreInfo: null,
        virtualMemberMobile: null
      }).then(res => {
        if(res.code == 200){
          this.pay('pay_new', res.datas.pay_sn)
        }else{
          wx.showToast({
            title: "下单失败",
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else {
      shop.buyStep3({
        goods_id: this.data.virtualGoodsInfo.goods_id,
        quantity: this.data.virtualGoodsInfo.quantity,
        buyer_phone: this.data.virtualMemberMobile,
        buyer_msg: ''
      }).then(res => {
        if(res.code == 200){
          var order_sn = res.datas.order_sn
          shop.vrBuy({pay_sn: order_sn}).then(res => {
            if(res.code == 200){
              this.pay('vr_pay_new', order_sn)
            }else{
              wx.showToast({
                title: "下单失败",
                icon: 'none',
                duration: 2000
              })
            }
          })
        }else{
          wx.showToast({
            title: "下单失败",
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  pay: function (op, pay_sn) {
    shop.pay(op, pay_sn).then(res => {
      wx.showToast({
        title: res == 'success' ? '支付成功' : '您取消了支付',
        icon: res == 'success' ? 'success' : 'none',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({url: '/page/infocenter/pages/orderPage/orderPage'})
      }, 2000)
    })
    .catch(error => console.log(error))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({cartId: options.cart_id, ifcart: options.ifcart, isVirtual: options.is_virtual == 1 ? true : false})
    if(options.is_virtual != 1) {
      shop.buyStep1({
        cart_id: options.cart_id,
        ifcart: options.ifcart,
        address_id: typeof(options.address_id) != "undefined" ? options.address_id : null,
        pintuan: null,
        ifchain: 1,
        chain_id: 0
      }).then(res => {
        if (res.code == 200){
          var store_cart_list = res.datas.store_cart_list
          var address_info = res.datas.address_info
          var store_final_total_list = res.datas.store_final_total_list
          var order_amount = res.datas.order_amount
          var vatHash = res.datas.vat_hash
          var offpayHash = res.datas.address_api.offpay_hash
          var offpayHashBatch = res.datas.address_api.offpay_hash_batch
          var address_fee = 0
          for (var index in res.datas.address_api.content){
            address_fee += parseFloat(res.datas.address_api.content[index])
          }
          that.setData({
            storeCartList: store_cart_list,
            addressInfo: address_info,
            addressFee: address_fee,
            storeFinalTotalList: store_final_total_list,
            orderAmount: order_amount,
            vatHash: vatHash,
            offpayHash: offpayHash,
            offpayHashBatch: offpayHashBatch,
            loading: false,
            addressInfoIsEmpty: shop.isEmptyObject(address_info)
          })
        }
      })
    }else {
      shop.buyStep2({
        goods_id: options.goods_id,
        quantity: options.quantity
      }).then(res => {
        if(res.code == 200){
          that.setData({
            virtualGoodsInfo: res.datas.goods_info,
            virtualStoreInfo: res.datas.store_info,
            virtualMemberMobile: res.datas.member_info.member_mobile
          })
        }else{
          wx.showToast({
            title: res.datas.error,
            icon: 'error',
            duration: 2000
          })
        }
      })
    }
    // 获取收货地址
    shop.getAddressList().then(res => {
      if(res.code == 200){
        var addressList = res.datas.address_list
        var addressChecked = {}
        for (var i in addressList){
          if (addressList[i].is_default == 1){
            addressChecked = addressList[i]
            addressList[i].checked = true
          }else {
            addressList[i].checked = false
          }
        }
        that.setData({addressList: addressList, addressChecked: addressChecked})
      }
    })
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
  },
  returnBargain:function(){
    wx.navigateBack({
      delta:1,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})