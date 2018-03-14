import shop from '../../../../utils/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    shopinfo:[
      {tx:"/images/tx.jpg",shopname:"的空间里觉得",jie:"的科技经费lads开发但是看了反馈单发的福利卡死你的看法"}
    ],
    isBoss:false,
    mess:["的方式打开","考多少分卡萨丁","打死就放假啊死"],
  },
  getSellerInfo: function () {
    shop.getSellerInfo().then(res => console.log(res))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getSellerInfo()
    console.log(options);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      isBoss:options.isBoss
    });
  },
})