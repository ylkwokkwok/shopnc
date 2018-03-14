// page/infocenter/pages/getBackPsw/getBackPsw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled:true
  },
  inputVal:function(e){
    console.log();
    if(e.detail.value!=""){
      this.setData({
        isDisabled:false
      });
    }
  },
  formSubmit:function(e){
    
  }
})