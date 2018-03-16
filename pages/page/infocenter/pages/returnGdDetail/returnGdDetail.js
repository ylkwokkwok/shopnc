// page/infocenter/pages/returnGdDetail/returnGdDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    isOrder:true,
    isSend:false,
    isAspect:false,
  },
  cancelApplay:function(){
    wx.showModal({
      content: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？',
      showCancel:true,
      cancelText:'取消',
      cancelColor:"black",
      confirmText:"确认",
      confirmColor:"#568fdc",
      // success:(res){
      //   if(res.confirm){
      //     this.setData({
            
      //     });
      //   }
      // },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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