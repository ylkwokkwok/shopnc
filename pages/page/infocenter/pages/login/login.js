import shop from '../../../../utils/shop'
// page/infocenter/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    shop.getSellerInfo().then(res => {
      if (res.code == 200) {
        console.log(res)
      } else {
        console.log('获取买家信息失败')
      }
    })
  },
  formSubmit:function(e){
    var username=e.detail.value.username;
    wx: wx.redirectTo({
      url: '../mainStoreManager/mainStoreManager?username='+username+'&isBoss='+false
    })
  }
})