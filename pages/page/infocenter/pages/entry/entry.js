import shop from '../../../../utils/shop'
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码',
    imageList: [],
    winHeight:0,
    showSel: false,
    xieyi:"的数据库办法的就是看阿斯达克警方把数据库的士大夫饭卡斯达克警方啊十大科技发生大家看法阿三的客服解决啊数据库的沙发上的夫卡是的基本饭卡手动阀安德森会计法科技时代发啊都十分骄傲的设计开发",
    store_logo: '',
    store_name:'',
    contacts_name:'',
    contacts_phone: '',
    contacts_email: '',
    contacts_idcard: '',
    remark: '',
    currentTime: 61,
    disabled:false,
    sc_id: 0,
    sc_name: '',
    classListIndex: 0,
    classList: [],
    applyStatus: 0, // 0 未申请 1 待审核
    //经营类目
    selectStoreClaassStatus: false,
    storeClasses: [], // 经营类目
    storeClassArray: [],
    objectStoreClassArray: [],
    storeClassIndex: [0,0,0],
    storeClassId: [0,0,0],
    storeClassSelects: []
  },
  bindPickerChange: function (e) {
    let selectedClass = this.data.classList[e.detail.value]
    this.setData({
      sc_id: selectedClass.sc_id,
      sc_name: selectedClass.sc_name,
      classListIndex: e.detail.value
    })
  },
  showSelectStoreClass: function () {
    this.setData({
      selectStoreClaassStatus: true
    })
  },
  hiddenSelectStoreClass: function () {
    this.setData({
      selectStoreClaassStatus: false
    })
  },
  // 经营类目
  getStoreClasses: function () {
    let that = this
    shop.getStoreClasses().then(res => {
      if (res.code == 200) {
        var storeClasses = res.datas
        var objectStoreClassArray = []
        var storeClassArray = []
        var csca1 = []
        var sca1 = []
        for (var i in storeClasses){
          csca1.push(storeClasses[i])
          sca1.push(storeClasses[i].gc_name)
        }
        objectStoreClassArray.push(csca1)
        storeClassArray.push(sca1)
        that.setData({
          storeClasses: storeClasses,
          objectStoreClassArray: objectStoreClassArray,
          storeClassArray: storeClassArray
        })
        that.setStoreClassSelected(0, 1)
        that.setStoreClassSelected(0, 2)
        that.setStoreClassSelected(0, 3)
      }else{
        wx.showToast({
          title: "获取信息失败",
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  setStoreClassSelected: function (index, deep) {
    console.log("deep: " + deep, "value: " + index)
    let that = this
    deep = parseInt(deep)
    var storeClassIndex = that.data.storeClassIndex //
    var storeClassId = that.data.storeClassId //
    var objectStoreClassArray = that.data.objectStoreClassArray //
    var storeClassArray = that.data.storeClassArray //
    var storeClasses = that.data.storeClasses
    if (deep == 3){
      storeClassIndex[2] =  index
      storeClassId[2] =  storeClasses[storeClassIndex[0]].children[storeClassIndex[1]].children[index].gc_id
      that.setData({
        storeClassIndex: storeClassIndex,
        storeClassId: storeClassId
      })
      return
    }
    var  sonArray = []
    if (deep == 1){
      sonArray = storeClasses[index].children
      storeClassId[deep - 1] = storeClasses[index].gc_id
    }
    if (deep == 2){
      sonArray = storeClasses[storeClassIndex[0]].children[index].children
      storeClassId[deep - 1] = storeClasses[storeClassIndex[0]].children[index].gc_id
    }
    var sonNameArray = []
    for (var i in sonArray){
      sonNameArray.push(sonArray[i].gc_name)
    }
    storeClassArray[deep] = sonNameArray
    objectStoreClassArray[deep] = sonArray
    storeClassIndex[deep - 1] = index
    that.setData({
      objectStoreClassArray: objectStoreClassArray,
      storeClassArray: storeClassArray,
      storeClassIndex: storeClassIndex,
      storeClassId: storeClassId
    })
  },
  bindStoreClassPickerChange: function (e) {
    let storeClassSelects = this.data.storeClassSelects
    let storeClassIndex = this.data.storeClassIndex
    let storeClassId = this.data.storeClassId
    let storeClassArray = this.data.storeClassArray
    for (var i in storeClassSelects ) {
      if (storeClassSelects[i].gc_id_3 == storeClassId[2]) {
        return
      }
    }
    storeClassSelects.push({
      gc_id_1: storeClassId[0],
      gc_name_1: storeClassArray[0][storeClassIndex[0]],
      gc_id_2: storeClassId[1],
      gc_name_2: storeClassArray[1][storeClassIndex[1]],
      gc_id_3: storeClassId[2],
      gc_name_3: storeClassArray[2][storeClassIndex[2]]
    })
    this.setData({storeClassSelects: storeClassSelects})
    this.setStoreClassSelected(0, 1)
    this.setStoreClassSelected(0, 2)
    this.setStoreClassSelected(0, 3)
  },
  bindStoreClassPickerColumnChange: function (e) {
    this.setStoreClassSelected(e.detail.value, e.detail.column + 1)
    if (e.detail.column == 0){
      this.setStoreClassSelected(0, 2)
      this.setStoreClassSelected(0, 3)
    }
    if (e.detail.column == 1){
      this.setStoreClassSelected(0, 3)
    }
  },
  delStoreClassSelect: function (e) {
    var index = e.currentTarget.dataset.index
    var storeClassSelects = this.data.storeClassSelects
    storeClassSelects = storeClassSelects.splice(index, 1)
    this.setData({storeClassSelects: storeClassSelects})
  },
  // 店铺分类
  getStoreClassList: function () {
    let that = this
    shop.getStoreClassList().then(res => {
      if(res.code == 200){
        that.setData({
          classList: res.datas.store_class,
          sc_id: res.datas.store_class[0].sc_id,
          sc_name: res.datas.store_class[0].sc_name,
          applyStatus: res.datas.apply_status
        })
        if (res.datas.apply_status == 1){
          that.setData({
            store_name:res.datas.store_name,
            contacts_name:res.datas.contacts_name,
            contacts_phone: res.datas.contacts_phone,
            contacts_email: res.datas.contacts_email,
            contacts_idcard: res.datas.store_name,
            remark: res.datas.remark,
          })
          for (var key in that.data.classList){
            if (this.data.sc_id == that.data.classList[key].sc_id){
              that.setData({
                sc_id: that.data.classList[key].sc_id,
                sc_name: that.data.classList[key].sc_name,
                classListIndex: key,
              })
            }
          }
        }
      }else{
        wx.showToast({
          title: "获取信息失败",
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  formSubmit: function () {
    let validates = {
      store_name:'请填写店铺名称',
      contacts_name:'请填写联系人',
      contacts_phone: '请填写电话号码',
      contacts_email: '请填写邮箱',
      contacts_idcard: '请填写身份证号',
      remark: '请填写简单介绍',
    }
    let that = this
    let data = {}
    for (var key in validates){
      if (that.data[key] == ''){
        wx.showToast({
          title: validates[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
      data[key] = that.data[key]
    }
    if (that.data.storeClassSelects.length < 1){
      wx.showToast({
        title: "请选择至少一个经营类目",
        icon: 'none',
        duration: 2000
      })
      return
    }
    var store_class_ids = []
    var store_class_names = []
    for (var i in that.data.storeClassSelects){
      store_class_ids.push(that.data.storeClassSelects[i].gc_id_1 + '|' + that.data.storeClassSelects[i].gc_id_2 + '|' + that.data.storeClassSelects[i].gc_id_3 + '|')
      store_class_names.push(that.data.storeClassSelects[i].gc_name_1 + '|' + that.data.storeClassSelects[i].gc_name_2 + '|' + that.data.storeClassSelects[i].gc_name_3 + '|')
    }
    console.log('validate success')
    data.sc_id = that.data.sc_id
    data.store_class_ids = store_class_ids
    data.store_class_names = store_class_names
    shop.applyStore(data).then(res => {
      console.log(res)
      if(res.code == 200){
        //success
        wx.showToast({
          title: "申请成功",
          icon: 'success',
          duration: 2000
        })
        that.getStoreClassList()
      }else{
        //error
        wx.showToast({
          title: res.datas.error,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  bindKeyInput:function(e){
    var key = e.currentTarget.dataset.key
    var obj = {}
    obj[key] = e.detail.value
    this.setData(obj)
  },
  clearInput:function(e){
    var key = e.currentTarget.dataset.key
    var obj = {}
    obj[key] = ''
    this.setData(obj)
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
    shop.getTelCode().then(res => {
      if (res.code == 200) {
        console.log(res);
        var arr = [];

      } else {
        console.log('验证码获取失败');
      }
    })
  },
  getVerificationCode: function () {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  entryprompt:function(e){
    console.log();
    this.setData({
      showSel: true
    });
  },
  hideSel: function () {
    this.setData({
      showSel: false
    });
  },
  chooseImage:function(e){
    var that = this
    wx.chooseImage({
      // sourceType: sourceType[this.data.sourceTypeIndex],
      // sizeType: sizeType[this.data.sizeTypeIndex],
      // count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    that.getStoreClassList()
    that.getStoreClasses()
  },
  getTelCode:function(){
    wx.request({
      url: 'http://www.shopnc.com/member/index.php?act=connect_sms&op=get_captcha',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: '',
      success: function () {
        console.log(1)
      }

    })
  }

})