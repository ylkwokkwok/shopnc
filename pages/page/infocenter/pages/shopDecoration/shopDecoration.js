// page/infocenter/pages/shopDecoration/shopDecoration.js
var imgs=[];
var imageList=new Array(4);
var newImagelist = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    imageList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          img: res.tempFilePaths
        })
      }
    })
  },
  chooseImage2: function () {
    var that = this;
    wx.chooseImage({
      count: 4,
      success: function (res) {
        if(res.tempFilePaths.length==4){
          that.setData({
            imageList: res.tempFilePaths
          })
        }else{
          for(var i in res.tempFilePaths){
            that.data.imageList.push(res.tempFilePaths[i]);
          }
          that.setData({
            imageList:that.data.imageList
          });
        }
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.img
    })
  },
  previewImage2: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current + 1,
    })
  },
  clearimgs: function () {
    wx.showModal({
      title: '确定删除',
      showCancel: true,
      cancelText: '取消',
      confirmText: '立即删除',
      confirmColor: '#568fdc',
      success: function (res) {
        if (res.confirm) {
          this.setData({
            img: []
          });
        }
      },
    })
  },
  clearimgs2: function (e) {
    var that=this;
    var imageList = that.data.imageList;
    wx.showModal({
      title: '确定删除',
      showCancel: true,
      cancelText: '取消',
      confirmText: '立即删除',
      confirmColor: '#568fdc',
      success: function (res) {
        if (res.confirm) {
          var index=e.currentTarget.dataset.index;
          var hh=that.removeByValue(imageList,index);
          that.setData({
            imageList:hh
          });
        }
      },
    })
  },
  removeByValue:function(brr, val) {
    for(var i= 0; i<brr.length; i++) {
      if (brr[i] == val) {
        brr.splice(i, 1);
        break;
      }
    }
    return brr;
  }
})