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
    // spec
    have_spec: false,
    spec_list: [],
    addSpecStatus: false,
    add_spec_index: 0,
    add_spec_name: '',
    add_spec_value: '',
    // goods_list
    goods_list: []
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
      if (that.data[key] === ''){
        wx.showToast({
          title: validates[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    if (that.data.g_price <= 0){
      wx.showToast({
        title: "商品价格不能为0",
        icon: 'none',
        duration: 2000
      })
      return
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
    // spec
    if (that.data.have_spec){
      var sp_val = []
      var spec = []
      var spec_list = that.data.spec_list
      for (var i in spec_list){
        var sp_value = []
        for (var ii in spec_list[i].value){
          if (spec_list[i].value[ii].checked){
            sp_value.push({
              sp_value_id: spec_list[i].value[ii].sp_value_id,
              sp_value_name: spec_list[i].value[ii].sp_value_name,
            })
          }
        }
        sp_val.push({
          sp_id: i,
          sp_name: spec_list[i].sp_name,
          sp_value: sp_value
        })
      }
      var goods_list = that.data.goods_list
      for (var i in goods_list){
        spec.push({
          id: goods_list[i].sp_id,
          sp_value: goods_list[i].sp_name,
          price: goods_list[i].price,
          stock: goods_list[i].stock
        })
      }
      submitData.sp_val = JSON.stringify(sp_val);
      submitData.spec = JSON.stringify(spec);
    }

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
                url: '../shopManager1/shopManager1',
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
    var imgList = this.data.imgList
    imgList.splice(index, 1)
    this.setData({
      imgList: imgList
    });
  },
  moveUp:function(e){
    var index=e.currentTarget.dataset.index;
    if(index==0){
      return;
    }
    var newsimgList=this.swapItems(this.data.imgList, index, index - 1);
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
    var imageList = this.data.imageList
    imageList.splice(index, 1)
    this.setData({
      imageList: imageList
    });
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
      console.log(res);
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
      if (deep == 3){
        that.getStoreGoodsSpecByClassId()
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
    if (deep == 3){
      that.getStoreGoodsSpecByClassId()
    }
  },
  getStoreGoodsSpecByClassId: function () {
    let that = this
    shop.getStoreGoodsSpecByClassId({class_id: that.data.gc_id3}).then(res => {
      if(res.code == 200 && res.datas.have_spec == 1){
        var spec_list = res.datas.spec_list
        for (var i in spec_list){
          for (var ii in spec_list[i].value){
            spec_list[i].value[ii].checked = false
          }
        }
        that.setData({spec_list: spec_list, have_spec: false})
        that.eashSpecToGoods()
      }else{
      that.setData({spec_list: [], have_spec: false, goods_list: []})
      }
    })
  },
  // 默认所有规格都不选中 变化时检测所有选择，修改 have_spec
  specValueChange: function (e) {
    var spec_list = this.data.spec_list
    var specIndex = e.currentTarget.dataset.specIndex
    var specValueIndex = e.currentTarget.dataset.specValueIndex
    spec_list[specIndex].value[specValueIndex].checked = !spec_list[specIndex].value[specValueIndex].checked
    var have_spec = false
    for (var i in spec_list){
      for (var ii in spec_list[i].value){
        if (spec_list[i].value[ii].checked) {
          have_spec = true
        }
      }
    }
    this.setData({spec_list: spec_list, have_spec: have_spec})
    this.eashSpecToGoods()
  },
  addSpec: function (e) {
    var specIndex = e.currentTarget.dataset.specIndex
    this.setData({
      addSpecStatus: true,
      add_spec_index: specIndex,
      add_spec_name: this.data.spec_list[specIndex].sp_name,
      add_spec_value: ''
    })
  },
  cancelAddSpec: function () {
    this.setData({
      addSpecStatus: false,
      add_spec_index: 0,
      add_spec_name: '',
      add_spec_value: ''
    })
  },
  addSpecSubmit: function () {
    let that = this
    var data = {}
    data.gc_id = that.data.gc_id3
    data.sp_id = that.data.add_spec_index
    data.name = that.data.add_spec_value
    shop.addSpec(data).then(res => {
      if (res.code == 200){
        that.cancelAddSpec()
        that.getStoreGoodsSpecByClassId()
      }else{
        wx.showToast({
          title: res.erres,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  eashSpecToGoods: function () {
    let that = this
    var spec_list = that.data.spec_list
    var goods_list = []
    var index = 0
    for (var i in spec_list){
      if (index == 0){
        for (var ii in spec_list[i].value){
          if (!spec_list[i].value[ii].checked) {
            continue
          }
          var goodsItem = {}
          goodsItem.sp_id = spec_list[i].value[ii].sp_value_id
          goodsItem.sp_name = []
          goodsItem.sp_name[0] = {
            sp_value_id: spec_list[i].value[ii].sp_value_id,
            sp_value_name: spec_list[i].value[ii].sp_value_name
          }
          goodsItem.price = 0.00
          goodsItem.stock = 0
          goods_list.push(goodsItem)
        }
      }else {
        var specItem = spec_list[i]
        var tempGoods = []
        for (var j in goods_list){
          for (var jj in specItem.value){
            if (!specItem.value[jj].checked) {
              continue
            }
            var goodsItem1 = {}
            goodsItem1.sp_id = goods_list[j].sp_id + specItem.value[jj].sp_value_id
            var sp_name = []
            for (var m in goods_list[j].sp_name){
              sp_name.push(goods_list[j].sp_name[m])
            }
            sp_name.push({
              sp_value_id: specItem.value[jj].sp_value_id,
              sp_value_name: specItem.value[jj].sp_value_name,
            })
            goodsItem1.sp_name = sp_name
            goodsItem1.price = 0.00
            goodsItem1.stock = 0
            tempGoods.push(goodsItem1)
          }
        }
        goods_list = tempGoods
      }
      index++
    }
    that.setData({goods_list: goods_list})
  },
  bindGoodsInput: function (e) {
    var key = e.currentTarget.dataset.key
    var goods_index = e.currentTarget.dataset.goodsIndex
    var value = e.detail.value
    if (key == 'price'){
      value = parseFloat(value)
    }
    if (key == 'stock'){
      value = parseInt(value)
    }
    var goods_list = this.data.goods_list
    goods_list[goods_index][key] = value
    this.setData({goods_list: goods_list})
  }
})