// page/infocenter/pages/evaluating/evaluating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,  
    count:0,
    imageList: [],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/images/star1.png',
    selectedSrc: '/images/star1_sel.png',
    key: 0,//评分
    key1:0,
    key2:0,
    evalute:"",
    evalute1:"",
    evalute2:""
  },
  inputVal:function(e){
    this.setData({
      count:e.detail.value.length
    });
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        for (var i in res.tempFilePaths) {
          that.data.imageList.push(res.tempFilePaths[i]);
        }
        that.setData({
          imageList: that.data.imageList
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  selectStar: function (e) {
    var key = e.currentTarget.dataset.key;
    var id=parseInt(e.currentTarget.dataset.id);
    var arr=["一","二","三","四","五"];
    if(id==0){
      this.setData({
        key: key,
        evalute: arr[key - 1] + "星"
      });
    }else if(id==1){
      this.setData({
        key1: key,
        evalute1: arr[key - 1] + "星"
      });
    }else if(id==2){
      this.setData({
        key2: key,
        evalute2: arr[key - 1] + "星"
      });
    }
    
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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