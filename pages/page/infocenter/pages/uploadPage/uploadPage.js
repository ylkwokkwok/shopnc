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
    isShow:false,
    currentTab:-1,
    chosen: '',
    nodes:'<h1 style="text-align:center;font-size:28rpx;">上传规范</h1><p style="text-indent:2em;font-size:20rpx;">是快乐的分厘卡似的收到了开放式可怜的数量可能对方尼可拉斯的舍得离开南非</p>',
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
    imageList:[],
    // goods info image
    imgList:[],
    g_name: '',
    g_price: '',
    g_costprice: '',
    g_vipprice: '',
    g_storage: '',
    g_freight: '',

  },
  bindKeyInput:function(e){
    var key = e.currentTarget.dataset.key
    var type = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : ''
    var value = e.detail.value
    if (type == 'int'){
      value = parseInt(value)
    }
    if (type == 'float'){
      value = parseFloat(value)
    }
    var obj = {}
    obj[key] = value
    this.setData(obj)
  },
  formReset:function(e){
    console.log(e);
    this.setData({
      chosen: ''
    })
  },
  formSubmit:function(e){
    var that=this;
    // validate
    var validates = {
      g_name: "请填写商品名称",
      g_price: "请填写商品售价",
      g_costprice: "请填写商品市场售价",
      g_vipprice: "请填写商品vip售价",
      g_storage: "请填写商品库存",
      g_freight: "请填写商品运费",
    }
    for (var key in validates){
      if (that.data[key] == ''){
        wx.showToast({
          title: validates[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    if (that.data.imageList.length < 1){
      wx.showToast({
        title: "请上传商品主图",
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.imgList.length < 1){
      wx.showToast({
        title: "请上传商品详情图",
        icon: 'none',
        duration: 2000
      })
      return
    }
    var submitData = {
      g_name: that.data.g_name,
      g_price: that.data.g_price,
      g_costprice: that.data.g_costprice,
      g_discount: that.data.g_price / that.data.g_costprice,
      g_vipprice: that.data.g_vipprice,
      g_storage: that.data.g_storage,
      g_freight: that.data.g_freight,
      cate_id: that.data.gc_id3,
      cate_name: that.data.gc_name1 + '>' + that.data.gc_name2 + '>' + that.data.gc_name3,
      g_state: e.currentTarget.dataset.type == 'intodepot' ? 0 : 1, // intodepot release
      // test
      goods_jingle: '',
      g_alarm: '',
      g_serial: '',
      g_barcode: '',
      b_name: '',
      b_id: '',
      search_brand_keyword: '',
      add_album: '',
      plate_top: '请选择',
      plate_bottom: '请选择',
      region: '',
      province_id: '',
      city_id: '',
      freight: 0,
      transport_id: '',
      transport_title: '',
      g_vat: 0,
      sgcate_id: [],
      g_commend: 1,
      sup_id: 0,
    }
    var g_body = ""
    var m_body = "["
    for (var i in that.data.imgList) {
      var src = that.data.imgList[i].thumb_name
      src = src.replace('_240', '_1280')
      g_body += "<img src='" + src + "'>"
      m_body += '{"type": "image", value: "' + src + '"})'
    }
    m_body += "]"
    submitData.g_body = g_body
    submitData.m_body = m_body
    submitData.image_path = that.data.imageList[0].name
    var imageList = []
    for (var i in that.data.imageList){
      imageList.push(that.data.imageList[i].name)
    }
    submitData.imageList = imageList
    shop.storeAddGoods(submitData).then(res => {
      if (res.code == 200){
        // todo
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
      }else{
        wx.showToast({
          title: res.datas.error,
          icon: 'none',
          duration: 2000
        })
      }
    })
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
          wx.uploadFile({
            url: apiBaseUrl + '?act=store_goods_add&op=image_upload&upload_type=uploadfile',
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
                var imageItem = {}
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
        console.log(res)
        for(var i in res.tempFilePaths){
          wx.uploadFile({
            url: apiBaseUrl + '?act=store_goods_add&op=image_upload&upload_type=uploadfile',
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
                var imgItem = {}
                imgItem.name = data.datas.name
                imgItem.thumb_name = data.datas.thumb_name
                that.data.imgList.push(imgItem)
                that.setData({
                  imgList: that.data.imgList
                })
              }
            },
            fail: function (res) {
              console.log('upload fail：',res)
            }
          })
        }
      },
    })
  },
  deleteImg:function(e){
    var index=e.currentTarget.dataset.index;
    var hh = this.removeByValue(this.data.imgList, index);
    this.setData({
      imgList:hh
    });
  },
  moveUp:function(e){
    var index=e.currentTarget.dataset.index;
    if(index==0){
      return;
    }
    var newsimglist=this.swapItems(this.data.imgList, index, index - 1);
    this.setData({
      imgList: newsimgList
    });
  },
  moveDown:function(e){
    var index=e.currentTarget.dataset.index;
    if (index == this.data.imgList.length - 1) {
      return;
    }
    var newsimgList=this.swapItems(this.data.imgList, index, index + 1);
    this.setData({
      imgList:newsimgList
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
  removeByValue: function (brr, val) {
    for (var i = 0; i < brr.length; i) {
        if (brr[i] == val) {
            brr.splice(i, 1);
            break;
          }
      }
    return brr;
  },
  swapItems: function (arr, index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
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