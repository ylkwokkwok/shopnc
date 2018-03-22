import shop from '../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    selectAll: false,
    cartList: [],
    apiRootPath: null,
    selectedAll: true,
    sumGoodsTotal: 0,
    cartListIsEmpty: false,
    addressChecked: {
      addressId: 3,
      consignee: '张三',
      mobile: '13912312345',
      addressInfo: '四川省成都市武侯区xxxx道xx号',
      checked: true
    },
    editAddressStatus: false,
    addressList: [
      {
        addressId: 1,
        consignee: '张三',
        mobile: '13912312345',
        addressInfo: '重庆市渝北区xxxx道xx号',
        checked: false
      },
      {
        addressId: 2,
        consignee: '李四',
        mobile: '13912312345',
        addressInfo: '四川省成都市武侯区xxxx道xx号',
        checked: false
      },
      {
        addressId: 3,
        consignee: '王五',
        mobile: '13912312345',
        addressInfo: '北京市东城区xxxx道xx号',
        checked: true
      },
    ]
  },
  switchAddress: function (e) {
    let switchId = e.currentTarget.dataset.addressId
    console.log(e)
    let addressList = this.data.addressList
    for (var i in addressList){
      if (addressList[i].addressId == switchId) {
        addressList[i].checked = true
        this.setData({addressChecked: addressList[i]})
      }else {
        addressList[i].checked = false
      }
    }
    this.setData({addressList: addressList})
  },
  selectAddress: function () {
    this.setData({editAddressStatus: true})
  },
  cancelEditAddress: function () {
    this.setData({editAddressStatus: false})
  },
  bindBuyNumberReduce: function (e) {
    console.log(e)
    var store_id = e.currentTarget.dataset.storeId;
    var cart_id = e.currentTarget.dataset.cartId;
    var goods_num = parseInt(this.data.cartList[store_id].storeGoods[cart_id].goods_num)
    if(goods_num == 1) {
      return
    }
    this.changeNewBuyNumber(store_id, cart_id, goods_num - 1)
  },
  bindBuyNumberAdd: function (e) {
    var store_id = e.currentTarget.dataset.storeId;
    var cart_id = e.currentTarget.dataset.cartId;
    var goods_num = parseInt(this.data.cartList[store_id].storeGoods[cart_id].goods_num)
    this.changeNewBuyNumber(store_id, cart_id, goods_num + 1)
  },
  changeNewBuyNumber: function (store_id, cart_id, goods_num) {
    let that = this
    shop.cartEditQuantity({cart_id: cart_id, quantity: goods_num})
      .then(res => {
        if(res.code == 200){
          that.getCartList()
        }else {
          wx.showToast({
            title: res.datas.error,
            icon: 'error',
            duration: 2000
          })
        }
      })
      .catch(error => console.error(error))
  },
  selectStore: function (e) {
    var store_id = e.currentTarget.dataset.storeId
    var cartList = this.data.cartList
    for (var store_index in cartList) {
      if(store_index == store_id) {
        var store_selected = cartList[store_index].selected
        for (var cart_index in cartList[store_index].storeGoods) {
          cartList[store_index].storeGoods[cart_index].selected = !store_selected
        }
        cartList[store_index].selected = !store_selected
      }
    }
    this.setData({cartList: cartList})
    this.updateGoodsPrice()
  },
  selectCart: function (e) {
    var store_id = e.currentTarget.dataset.storeId
    var cart_id = e.currentTarget.dataset.cartId
    var cartList = this.data.cartList
    for (var store_index in cartList) {
      if(store_index == store_id) {
        for (var cart_index in cartList[store_index].storeGoods) {
          if(cart_index == cart_id) {
            cartList[store_index].storeGoods[cart_index].selected = !cartList[store_index].storeGoods[cart_index].selected
          }
        }
      }
    }
    this.setData({cartList: cartList})
    this.updateGoodsPrice()
  },
  selectAll: function (e) {
    var cartList = this.data.cartList
    for (var store_index in cartList) {
      cartList[store_index].selected = !this.data.selectedAll
      for (var cart_index in cartList[store_index].storeGoods) {
        cartList[store_index].storeGoods[cart_index].selected = !this.data.selectedAll
      }
    }
    this.setData({cartList: cartList, selectedAll: !this.data.selectedAll})
    this.updateGoodsPrice()
  },
  updateGoodsPrice: function () {
    var sum_goods_total = 0
    for (var store_index in this.data.cartList) {
      for (var cart_index in this.data.cartList[store_index].storeGoods) {
        if (this.data.cartList[store_index].storeGoods[cart_index].selected) {
          sum_goods_total += parseFloat(this.data.cartList[store_index].storeGoods[cart_index].goods_total)
        }
      }
    }
    sum_goods_total = sum_goods_total.toFixed(2)
    this.setData({sumGoodsTotal: sum_goods_total})
  },
  checkout: function () {
    var cart_id_array = []
    for (var store_index in this.data.cartList) {
      for (var cart_index in this.data.cartList[store_index].storeGoods) {
        if (this.data.cartList[store_index].storeGoods[cart_index].selected) {
          cart_id_array.push(this.data.cartList[store_index].storeGoods[cart_index].cart_id + '|' + this.data.cartList[store_index].storeGoods[cart_index].goods_num)
        }
      }
    }
    if(cart_id_array.length < 1) return false
    // todo 去下单
  },
  bindDelCart: function (e) {
    let that = this
    var cart_id = e.currentTarget.dataset.cartId
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      confirmText: '取消',
      cancelText: '确认删除',
      success: function (res) {
        if(!res.confirm) {
          // app.fetch("?act=member_cart&op=cart_del", {key: app.data.key, cart_id: cart_id}, 'POST')
          //   .then(res => {
          //   if(res.data.code == 200 && res.data.datas == '1'){
          //   that.getCartList()
          // }
          // })
          // .catch(error => console.error(error))
        }
      }
    })

  },
  getCartList: function () {
    shop.getCartList()
      .then(res => {
        if(res.code == 200) {
          var res_cart_list = res.datas.cart_list
          var cart_list = {}
          for (var store_index in res_cart_list) {
            var store_goods = {}
            for (var store_goods_index in res_cart_list[store_index].goods) {
              var cart_goods = res_cart_list[store_index].goods[store_goods_index]
              cart_goods.selected = true
              store_goods[res_cart_list[store_index].goods[store_goods_index].cart_id] = cart_goods
            }
            cart_list[res_cart_list[store_index].store_id] = {
              selected: true,
              storeGoods: store_goods,
              storeName: res_cart_list[store_index].store_name
            }
          }
          this.setData({cartList: cart_list, cartListIsEmpty: shop.isEmptyObject(cart_list)})
          this.updateGoodsPrice()
        }
      })
      .catch(error => console.log(error))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
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
    this.getCartList()
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