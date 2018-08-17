// pages/person/messageChange.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    tag:"",
    value:"",
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var tag=options.tag;
    var val = options.value;
    if(tag=='autograph'){
      that.setData({
        name :"个性签名",
        tag:tag,
        value:val
      });
    } else if (tag =="id_card"){
      that.setData({
        name: "身份证",
        tag: tag,
        value: val
      });
    } else if (tag == "address") {
      that.setData({
        name: "地址",
        tag: tag,
        value: val
      });
    } else if (tag == "mobile") {
      that.setData({
        name: "手机号",
        tag: tag,
        value: val
      });
    } else if (tag == "qq") {
      that.setData({
        name: "QQ",
        tag: tag,
        value: val
      });
    } else if (tag == "email") {
      that.setData({
        name: "邮箱",
        tag: tag,
        value: val
      });
    } else if (tag == "name") {
      that.setData({
        name: "账户名",
        tag: tag,
        value: val
      });
    } else if (tag == "bank_id") {
      that.setData({
        name: "银行账号",
        tag: tag,
        value: val
      });
    } else if (tag == "open_bank_name") {
      that.setData({
        name: "开户行",
        tag: tag,
        value: val
      });
    } else if (tag == "remark") {
      that.setData({
        name: "备注",
        tag: tag,
        value: val
      });
    } else if (tag == "introduce") {
      that.setData({
        name: "自我介绍",
        tag: tag,
        value: val
      });
    }
  },
  setInput:function(e){
    this.setData({
      value:e.detail.value
    });
  },
  saveMsg:function(){
    if (this.data.tag == 'autograph') {
      var obj = { autograph: this.data.value };
      this.updateMsg(obj);
      return ;
    } 
     if (this.data.tag == "id_card") {
      //验证身份证格式,15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
       var reg =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!reg.test(this.data.value)){
        wx.showToast({
          title: '身份证错误',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      var obj = { id_card: this.data.value };
      this.updateMsg(obj);
    } 
     if (this.data.tag == "address") {
      var obj = { address: this.data.value };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "mobile") {
       var reg = /^1(3|4|5|6|7|8)\d{9}$/;
       if (!reg.test(this.data.value)) {
         wx.showToast({
           title: '手机号错误',
           icon: 'none',
           duration: 2000
         });
         return false;
       }
      var obj = { mobile: this.data.value };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "qq") {
      var obj = { qq: this.data.value };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "email") {
       var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
       if (!reg.test(this.data.value)) {
         wx.showToast({
           title: '邮箱错误',
           icon: 'none',
           duration: 2000
         });
         return false;
       }
      var obj = { email: this.data.value };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "name") {
      var obj = { bank: { name: this.data.value} };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "bank_id") {
      var obj = { bank: { bank_id: this.data.value} };
      var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
      if (!reg.test(this.data.value)) {
        wx.showToast({
          title: '账号必须为15位或者19位的数字',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "open_bank_name") {
      var obj = { bank: { open_bank_name: this.data.value } };
      this.updateMsg(obj);
      return;
    } 
     if (this.data.tag == "remark") {
      var obj = { bank: { remark: this.data.value } };
      this.updateMsg(obj);
      return;
    }
    if (this.data.tag == "introduce") {
      var obj = { introduce: this.data.value };
      this.updateMsg(obj);
      return;
    }
   
  },
  updateMsg: function (postObj) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      disabled:true
    });
    wx.request({
      url: app.globalData.urlLink +'/user',
      data: postObj,
      method: "POST",
      header: app.globalData.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function(){
            wx.navigateBack();
          },3100);
          var data = res.data.data;
          
          that.setData({
            userInfo: data.user_info
          });
        }else{
          wx.showToast({
            title: res.data.detail,
            icon: 'none',
            duration:3000
          });
        }
        setTimeout(function () {
          that.setData({
            disabled: false
          });
        }, 3100);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})