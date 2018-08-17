// pages/person/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaList:[
      {
        "iconUrl":"/images/icon-person.png",
        "title":"个人信息",
        "url":"/pages/person/message"
      },
      {
        "iconUrl": "/images/icon-account.png",
        "title": "账户信息",
        "url": "/pages/account/index"
      }
    ]
  },

  getDetail: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    wx.request({
      url: app.globalData.urlLink +'/user',
      header: app.globalData.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          var user=res.data.data.user_info;
          that.setData({
            userInfo:user
          });
          app.globalData.user_key=1
        }
      }
    })
  },
  // 修改个人头像
  uploadAvator:function(){
    var that=this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: app.globalData.urlLink +'/user', //仅为示例，非真实的接口地址
          header: app.globalData.headerData,
          filePath: tempFilePaths[0],
          name: 'avatar',
          success: function (res) {
            if (res && JSON.parse(res.data).code=='200') {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail();
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
    if (app.globalData.user_key==0){
      this.getDetail();
    }
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