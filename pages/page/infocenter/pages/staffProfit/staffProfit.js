// page/infocenter/pages/staffProfit/staffProfit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    currentTab:0,
    curTab:0,
    list:[
      {img:"/images/tx.jpg",username:"张三",profit:"0.00"},
      { img: "/images/tx.jpg", username: "张三", profit: "0.00" },
      { img: "/images/tx.jpg", username: "张三", profit: "0.00" },
    ],
    list2: [
      { img: "/images/tx.jpg", username: "李四", profit: "0.00" },
      { img: "/images/tx.jpg", username: "李四", profit: "0.00" },
      { img: "/images/tx.jpg", username: "李四", profit: "0.00" },
    ],
    list3: [
      { img: "/images/tx.jpg", username: "王五", profit: "0.00" },
      { img: "/images/tx.jpg", username: "王五", profit: "0.00" },
      { img: "/images/tx.jpg", username: "王五", profit: "0.00" },
    ]
  },
  switchNav:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchNav2: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) { return false; }
    else {
      this.setData({
        curTab: cur
      })
    }
  },
=======
  
  },

>>>>>>> 7b9ca17ebe4413f483da5f727f69dbee69a4f65a
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