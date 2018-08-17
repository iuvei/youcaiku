// pages/examCenter/examPaper.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getList() {
    //请求首页数据
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.urlLink + '/tests/' + that.data.id,
      header: app.globalData.headerData,

      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          var data = res.data.data.test;
    
          that.setData({
            list: data
          });
        } else {
          //空数据处理
          that.setData({
            list: []
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.test_id
    });
  this.getList();
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