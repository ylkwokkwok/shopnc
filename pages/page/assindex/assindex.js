import shop from '../../utils/shop.js';
var arr = [];
var brr=[];
var crr=[];
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
        console.log(res);
        for(var i in res.datas.data){
          if(parseInt(res.datas.data[i].gc_parent_id)==0){
            arr.push(res.datas.data[i].gc_name);
          }
        }
        for(var i=1;i<res.datas.children.length;i++){
          for(var j in res.datas.data){
            if(res.datas.children[i]==res.datas.data[j].gc_parent_id){
              console.log(res.datas.data[j].gc_name);
            }
          }
        }
        that.setData({
          goods_list: arr,
          category:res.datas.data
        });
      } else {
        console.log('分类获取失败');
      }
    })
  },
 getRandomColor:function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
  }

})