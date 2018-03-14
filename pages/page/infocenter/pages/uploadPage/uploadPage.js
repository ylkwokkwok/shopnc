import shop from '../../../../utils/shop'
import { apiBaseUrl } from '../../../../utils/wsAPI'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    imageList:[],
    current:1,
    condition: false,
    condition1:false,
    condition2:false,
    condition3:false,
    condition4:false,
    category:'',
    categorys:["多数开发商看到","sdjfsdfsd","sdfjkshadjf","的是开放的","大师傅立刻就是打开"],
    isShow:false,
    currentTab:-1,
    chosen: '',
    nodes:'<h1 style="text-align:center;font-size:28rpx;">上传规范</h1><p style="text-indent:2em;font-size:20rpx;">是快乐的分厘卡似的收到了开放式可怜的数量可能对方尼可拉斯的舍得离开南非</p>',
    imglist:[],
    // class
    classList1: [],
    classList2: [],
    classList3: [],
    classList1Index: 0,
    classList2Index: 0,
    classList3Index: 0,
    gc_id1: 0,
    gc_name1: '',
    gc_id2: 0,
    gc_name2: '',
    gc_id3: 0,
    gc_name3: '',
    // goods index image
    imageList:[]
  },
  formReset:function(e){
    console.log(e);
    this.setData({
      chosen: ''
    })
  },
  formSubmit:function(e){
    console.log(e);
    var current=e.detail.target.id;
    if(current=="intodepot"){
      var that=this;
      wx.showModal({
        title: '已放入仓库',
        showCancel: true,
        cancelText: '继续添加',
        confirmText: '入库查看',
        confirmColor: '#568fdc',
        success: function(res) {
         if (res.confirm) {
          wx.navigateTo({
            url: '../shopUpload/shopUpload?curTab=1',
          })
         }
        },
      })
    }
    if (current == "release") {
      var that=this;
      wx.showModal({
        title: '发布成功',
        // content: '',
        showCancel: true,
        cancelText: '继续添加',
        // cancelColor: '',
        confirmText: '点击查看',
        confirmColor: '#568fdc',
        success: function (res) {
          if (res.confirm) {
            wx: wx.navigateTo({
              url: '../shopUpload/shopUpload?curTab=0',
            })
          }
        },
      })
    }
  },
  showSelect:function(){
    this.setData({
      isShow:true
    });
  },
  selectShopDetail:function(){
    this.setData({
      condition3:true
    });
  },
  hideSelect:function(e){
    var cur = e.currentTarget.dataset.current;
    this.setData({
      condition2:false,
      category:e.currentTarget.dataset.value
    });
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  hidecategory:function(){
    this.setData({
      condition2:false
    });
  },
  openCategory:function(){
    this.setData({
      condition2:true
    });
  },
  chooseImage: function () {
    var that = this;
    var maxCount = 4 - that.data.imageList.length;
    if (maxCount < 1){
      return
    }
    wx.chooseImage({
      count: maxCount,
      success: function (res) {
        console.log(res)
        for (var i in res.tempFilePaths) {
          var imageItem = {}
          imageItem.temp = res.tempFilePaths[i]
          wx.uploadFile({
            url: apiBaseUrl + '?act=store_goods_add&op=image_upload&upload_type=uploadfile', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[i],
            name: 'goods_image',
            formData:{
              'name': 'goods_image',
              'key': wx.getStorageSync('TOKEN-NAME')
            },
            success: function(res){
              console.log('upload success：',res)
              var data = res.data
              data = JSON.parse(data)
              if (data.code == 200){
                imageItem.name = data.datas.name
                imageItem.thumb_name = data.datas.thumb_name
                that.data.imageList.push(imageItem)
                that.setData({
                  imageList: that.data.imageList
                })
              }
            },
            fail: function (res) {
              console.log('upload fail：',res)
            }
          })
        }
      }
    })
  },
  chooseImg:function(e){
    var that=this;
    wx.chooseImage({
      success: function(res) {
        for(var i in res.tempFilePaths){
          that.data.imglist.push(res.tempFilePaths[i]);
        }
        that.setData({
          imglist:that.data.imglist
        });
      },
    })
  },
  deleteImg:function(e){
    var index=e.currentTarget.dataset.index;
    var hh = this.removeByValue(this.data.imglist, index);
    this.setData({
      imglist:hh
    });
  },
  moveUp:function(e){
    var index=e.currentTarget.dataset.index;
    if(index==0){
      return;
    }
    var newsimglist=this.swapItems(this.data.imglist, index, index - 1);
    this.setData({
      imglist: newsimglist
    });
  },
  moveDown:function(e){
    var index=e.currentTarget.dataset.index;
    if (index == this.data.imglist.length - 1) {
      return;
    }
    var newsimglist=this.swapItems(this.data.imglist, index, index + 1);
    this.setData({
      imglist:newsimglist
    });
  },
  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current + 1,
    })
  },
  clearimgs:function(e){
    var index = e.currentTarget.dataset.index;
    var hh = this.removeByValue(this.data.imageList, index);
    this.setData({
      imageList: hh
    });
  },
  showRegular:function(){
    this.setData({
      condition4:true
    });
  },
  hideRegular:function(){
    this.setData({
      condition4:false
    });
  },
  save:function(){
    this.setData({
      condition3:false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    // 获取店铺顶级商品分类
    that.getStoreGoodsClass(0, 1)
  },
  getStoreGoodsClass: function(gc_id, deep){
    let that = this
    shop.getStoreGoodsClass(gc_id, deep).then(res => {
      var classList = {}
      classList['classList' + deep] = res.datas
      that.setData(classList)
      let selectedData = {}
      selectedData['gc_id' + deep] = res.datas[0].gc_id
      selectedData['gc_name' + deep] = res.datas[0].gc_name
      selectedData['classList' + deep + 'Index'] = 0
      that.setData(selectedData)
      if (deep < 3){
        that.getStoreGoodsClass(res.datas[0].gc_id, parseInt(deep) + 1)
      }
    })
  },
  bindClassChange: function (e) {
    let that = this
    let deep  = e.currentTarget.dataset.deep
    let selectedClass = that.data['classList' + deep][e.detail.value]
    let selectedData = {}
    selectedData['gc_id' + deep] = selectedClass.gc_id
    selectedData['gc_name' + deep] = selectedClass.gc_name
    selectedData['classList' + deep + 'Index'] = e.detail.value
    that.setData(selectedData)
    if (deep < 3){
      that.getStoreGoodsClass(selectedClass.gc_id, parseInt(deep) + 1)
    }
  }
})