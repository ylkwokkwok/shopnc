import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: null
  },
  /**
   *
   * @param e
   */
  bindRemoveTap: function (e) {
    var id = e.currentTarget.dataset.addressId
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      confirmText: '取消',
      cancelText: '确认删除',
      success: function (res) {
        if(!res.confirm) {
          shop.removeAddress({address_id: id}).then(res => {
            if(res.code == 200){
              wx.showToast({
                title: "删除成功",
                icon: 'none',
                duration: 2000
              })
              that.getAddressList()
            }else{
              wx.showToast({
                title: res.datas.error,
                icon: 'error',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  bindEditTap: function (e) {
    var id = e.target.dataset.addressId
    wx.navigateTo({url: '/page/infocenter/pages/addAddress/addAddress?address_id=' + id})
  },
  getAddressList: function () {
    shop.getAddressList().then(res => {
      this.setData({addressList: res.datas.address_list})
    })
  },
  toAddressForm: function () {
    wx.redirectTo({url: '/page/infocenter/pages/addAddress/addAddress'})
  },
  editAddress: function (e) {
    wx.redirectTo({url: '/page/infocenter/pages/addAddress/addAddress?address_id=' + e.currentTarget.dataset.addressId})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
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