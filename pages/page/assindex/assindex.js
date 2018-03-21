import shop from '../../utils/shop.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    arrText:[],
    brr:[],
    color:"#e8b223",
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
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
    /**
     * 获取分类
     */
    shop.getGoodsClass().then(res => {
      if (res.code == 200) {
        console.log(res);
        that.setData({
          goods_list: res.datas
        });
      } else {
        console.log('分类获取失败');
      }
    })
  },
 getRandomColor:function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
  },
  removeByValue: function (brr, val) {
    for (var i = 0; i < brr.length; i++) {
      if (brr[i] == val) {
        brr.splice(i, 1);
        break;
      }
    }
    return brr;
  }
})