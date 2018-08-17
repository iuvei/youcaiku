var md5 = require('../../utils/md5.js');
var app = getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    focus1:"",
    focus2:"",
    on:"",
    dab:true,
    name_value:"",               //用户名
    password_value:"",           //密码
    school_id: "",               //学校id
    student_num: "",             //学号
    user_id: ""                  //账号ID
  },
  onloading: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  // 
  bindfocus1:function(){
   this.setData({
     focus1:"on"
   })
  },
  bindblur1:function(){
   this.setData({
     focus1: ""
   })
  },
  bindfocus2: function () {
    this.setData({
      focus2: "on"
    })
  },
  bindblur2: function () {
    this.setData({
      focus2: ""
    })
  },
  tis:function(t){
    wx.showToast({
      title:t,
      icon: 'none',
      mask: true,
      duration:1000
    })
  },
  // 用户名输入时
  name_content:function(e){
    this.setData({
      name_value: e.detail.value
    })
    
  },
  // 密码输入时
  password_content:function(e){
    this.setData({
      password_value: e.detail.value
    })
    
  },

  // 登录
  loginBtn:function(){
    this.onloading();
    var that = this;
    if (that.data.name_value==""){
      this.tis("用户名不能为空")
      return false
    }
    if (that.data.password_value == "") {
      this.tis("密码不能为空")
      return false
    }
    wx.request({
      url: that.data.urlLink + '/user/login',
      data: {
        username: that.data.name_value,
        password: md5.md5(that.data.password_value).toLowerCase()
      },
      header: this.data.headerData,
      method:'POST',
      success: function (res) {
        wx.hideLoading();
        // console.log(res)
        var tis_text = res.data.detail
        var tis_error = res.data.error
        if (tis_error==true){
          that.tis(tis_text);
          return false
        }
        if (tis_error=="false"){
          wx.showToast({
            title: tis_text,
            icon: 'success',
            mask: true
          });
          var userData = res.data.data;
          that.setData({
            school_id: userData.account.school_id,        //学校ID
            user_id: userData.account.user_id,            //
            student_num: userData.account.student_num     //学号ID
          })
          var Num = md5.md5(that.data.school_id + that.data.student_num).toLowerCase();
          app.globalData.TIMESTAMP = (Date.parse(new Date()) / 1000).toString();
          app.globalData.AUTH_TYPE = "USER_AUTH";
          app.globalData.TOKEN = md5.md5((Date.parse(new Date()) / 1000).toString() + '8741030278D18DB3BE8CAAC79935CAC7' + that.data.user_id + Num).toLowerCase();
          app.globalData.USER_ID = that.data.user_id;
          app.globalData.headerData['TRAINING-TIMESTAMP'] = app.globalData.TIMESTAMP;
          app.globalData.headerData['TRAINING-AUTH-TYPE'] = app.globalData.AUTH_TYPE;
          app.globalData.headerData['TRAINING-TOKEN'] = app.globalData.TOKEN;
          app.globalData.headerData['TRAINING-USER-ID'] = app.globalData.USER_ID;
          //存储信息
          wx.setStorageSync('loginKey','1');
          wx.setStorageSync('TIMESTAMP',app.globalData.TIMESTAMP);
          wx.setStorageSync('TRAINING-AUTH-TYPE', app.globalData.AUTH_TYPE);
          wx.setStorageSync('TRAINING-TOKEN', app.globalData.TOKEN);
          wx.setStorageSync('TRAINING-USER-ID', app.globalData.USER_ID);
          wx.setStorage({
            key: "TRAINING-USER-ID",
            data: app.globalData.USER_ID
          });
          wx.hideToast();
          wx.setStorage({
            key: "keyTnum",
            data: "2"
          });
          wx.switchTab({
            url: '../index/index'
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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