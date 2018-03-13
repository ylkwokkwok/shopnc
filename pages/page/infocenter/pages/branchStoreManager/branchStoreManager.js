var interval=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branchList: [{ tx: "/images/tx.jpg", shopname: "的空间里觉得", jie: "的科技经费lads开发但是看了反馈单发的福利卡死你的看法", referee:"李四"}],
    erweima: ["/images/infocenter/erweima.jpg"],
  },
  imgyu:function(e){
    var current = e.target.dataset.src
    wx.previewImage({
      urls: this.data.erweima
    })
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
  },
})