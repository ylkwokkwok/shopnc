Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    curTab:0,
    precent:"10%",
    precent2:"10%",
    people:10,
    date:"1天",
    date2:"1天",
    timeSel:["1天","2天","3天","4天","5天","6天","1周","1个月"],
    precentSel:["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],
    condition1:false,
    condition2:false,
    condition3:false,
    condition4:false,
  },
  selectDate:function(){
    this.setData({
      condition1: true
    });
  },
  hideDate:function(){
    this.setData({
      condition1: false
    });
  },
  selTime:function(e){
    var zhi=e.currentTarget.dataset.value;
    this.setData({
      date:zhi,
      condition1:false
    });
  },
  selectDate2: function () {
    this.setData({
      condition4: true
    });
  },
  hideDate2: function () {
    this.setData({
      condition4: false
    });
  },
  selTime2: function (e) {
    var zhi = e.currentTarget.dataset.value;
    this.setData({
      date2: zhi,
      condition4: false
    });
  },
  showcodition2: function () {
    this.setData({
      condition2: true
    });
  },
  hidecondition2: function () {
    this.setData({
      condition2: false
    });
  },
  selcondition2: function (e) {
    var zhi = e.currentTarget.dataset.value;
    this.setData({
      precent: zhi,
      condition2: false
    });
  },
  showcodition3: function () {
    this.setData({
      condition3: true
    });
  },
  hidecondition3: function () {
    this.setData({
      condition3: false
    });
  },
  selcondition3: function (e) {
    var zhi = e.currentTarget.dataset.value;
    this.setData({
      precent2: zhi,
      condition3: false
    });
  },
  switchNav:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.curTab == cur) { return false; }
    else {
      this.setData({
        curTab: cur
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      curTab: options.curTab
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})