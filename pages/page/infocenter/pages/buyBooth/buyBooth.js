// page/infocenter/pages/buyBooth/buyBooth.js
var count=1,totalMoney;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:1,
    total:300,
    nodes:"<p style='padding-top:20rpx'>1.说得很疯狂的事是独立开发思考</p><p style='padding-top:20rpx'>2.说得很疯狂的事是独立开发思考</p>",
  },
  reduce:function(){
    if(this.data.count==1){
      count=1;
      this.setData({
        count: count,
        totalMoney: parseInt(this.data.total)
      });
    }else{
      count = count - 1;
      var total = parseInt(this.data.total) * parseInt(count);
      this.setData({
        count: count,
        totalMoney: total
      });
    }
  },
  add:function(){
    if(this.data.count==10){
      count=10;
      var total = parseInt(this.data.total)*parseInt(count);
      this.setData({
        count: count,
        totalMoney: total
      });
    }else{
      count = count + 1;
      var total = parseInt(this.data.total) * parseInt(count);
      this.setData({
        count: count,
        totalMoney: total
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totalMoney:this.data.total
    });
  },
})