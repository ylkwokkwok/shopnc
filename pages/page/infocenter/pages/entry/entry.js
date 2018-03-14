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
  },
  bindPickerChange: function (e) {
    let selectedClass = this.data.classList[e.detail.value]
    this.setData({
      sc_id: selectedClass.sc_id,
      sc_name: selectedClass.sc_name,
      classListIndex: e.detail.value
    })
  },
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
    console.log('validate success')
    data.sc_id = that.data.sc_id
    shop.applyStore(data).then(res => {
      if(res.code == 200){
        //success
        wx.showToast({
          title: "申请成功",
          icon: 'success',
          duration: 2000
        })
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
  },
  getVerificationCode() {
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
  }
})