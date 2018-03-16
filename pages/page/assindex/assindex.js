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
    color:"#fcb213",
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
        var arr=[];
        for(var i in res.datas.class_list){
          arr.push(res.datas.class_list[i].text.split("/"));
        }
        that.setData({
          goods_list: res.datas.class_list,
          arrText:arr,
        })
      } else {
        console.log('分类获取失败');
      }
    })
  },
 getRandomColor:function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
  }

})