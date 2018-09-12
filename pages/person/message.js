var md5 = require('../../utils/md5.js');
// pages/person/message.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexsArray:["","男","女"],
    sexs: [
      { name: '', value: '0' },
      { name: '男', value: '1' },
      { name: '女', value: '2' }
    ],
    selectedSex:"",
    defaultDate:"未填写"
  },
  getDetail: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.urlLink +'/user',
      header: app.globalData.headerData,
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data);
        if (res && res.data.data) {
          var data = res.data.data;
          var birth = app.dateFormate(parseInt(data.user_info.birthday)*1000);
      
          var sex = data.user_info.sex;
          that.setData({
            userInfo: data.user_info,
            defaultDate: birth,
            selectedSex: sex
          });
        }
      }
    })
  },
  /*修改性别*/
  bindSexChange:function(e){
    var val = parseInt(e.detail.value);
    val++;
    this.updateMsg({sex:val});
  },
  bindDateChange:function(e){
    var val = e.detail.value;
    this.updateMsg({ birthday: new Date(val).getTime()/1000 });
  },
  bindRegionChange:function(e){
    var val = e.detail.value;
    var _add="";
    for(var i=0;i<val.length;i++){
      _add+=val[i];
    }
    return false;
    this.updateMsg({ address: val });
  },
  updateMsg:function(postObj){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.urlLink +'/user',
      data: postObj,
      method: "POST",
      header: app.globalData.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          var data = res.data.data;
          var birth =app.dateFormate(parseInt(data.user_info.birthday) * 1000);

          var sex = data.user_info.sex == "1" ? "0" : "1";
          that.setData({
            userInfo: data.user_info,
            defaultDate: birth,
            selectedSex: sex
          });
        }
      }
    })
  },
  // 修改个人头像
  uploadAvator: function () {
    var that = this;

    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: app.globalData.urlLink +'/user', //仅为示例，非真实的接口地址
          header: app.globalData.headerData,
          filePath: tempFilePaths[0],
          name: 'avatar',
          success: function (res) {
            if (res && JSON.parse(res.data).code == '200') {
              var user = JSON.parse(res.data).data.user_info;
              that.setData({
                userInfo: user
              });
            }
          }
        })
      }
    })
  },
  // 点击退出
  btnExit:function(){
    wx.clearStorageSync();
    app.globalData.headerData['TRAINING-TIMESTAMP'] = (Date.parse(new Date()) / 1000).toString();
    app.globalData.headerData['TRAINING-AUTH-TYPE'] = 'BASIC_AUTH';
    app.globalData.headerData['TRAINING-TOKEN'] = md5.md5((Date.parse(new Date()) / 1000).toString() + 'app_secret').toLowerCase();
    app.globalData.headerData['TRAINING-USER-ID'] = '';
    wx.switchTab({
      url: '../index/index'
    });
    app.globalData.loginKeyNum=2;
    app.globalData.index_key=0;
    app.globalData.indexNoLogin_key=0;
    app.globalData.course_key=0;
    app.globalData.message_key=0;
    app.globalData.user_key=0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail();
    var end=new Date().getFullYear()+"-12-31";
    this.setData({
      endTime:end
    });
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
    this.getDetail();
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