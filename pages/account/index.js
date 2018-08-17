// pages/account/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        name:"姓名",
        value:""
      },
      {
        name: "学号",
        value: ""
      },
      {
        name: "专业",
        value: ""
      },
      {
        name: "班主任",
        value: ""
      },
      {
        name: "班级",
        value: ""
      },
      {
        name: "身份",
        value: ""
      },
      {
        name: "使用软件",
        value: ""
      }
    ]
  },
  getDetail: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.urlLink +'/user',
      header: app.globalData.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          var data=res.data.data.account;
          var _list = that.data.list;
          _list[0].value=data.name;
            _list[1].value = data.student_num;
            _list[2].value=data.major;
            _list[3].value = data.headtercher_name;
            _list[4].value = data.class_name;
            _list[5].value = data.identity;
            _list[6].value = Math.floor(data.used_time /(60*60*24)) + "天";
          that.setData({
            list: _list
          });
        }
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