// pages/examCenter/detail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.test_id
    });
    this.getList();
  },
  getList() {
    //请求首页数据
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.urlLink+'/tests/'+that.data.id,
      header: app.globalData.headerData,

      success: function (res) {
        wx.hideLoading();
        if (res && res.data.data) {
          var data = res.data.data.test;
          var created_time = new Date(parseInt(data.start_time)*1000);
          var _start = (created_time.getHours() < 10 ? ("0" + created_time.getHours()) : created_time.getHours()) + ":" + (created_time.getMinutes() < 10 ? ("0" + created_time.getMinutes()) : created_time.getMinutes());
          var _day = app.dateFormate(parseInt(data.start_time) * 1000);
          var end_time = new Date(parseInt(data.end_time) * 1000);
          var _end = (end_time.getHours() < 10 ? ("0" + end_time.getHours()) : end_time.getHours()) + ":" + (end_time.getMinutes() < 10 ? ("0" + end_time.getMinutes()) : end_time.getMinutes());
          data.created_time = _day+" "+_start+"~"+_end;
          var longTime = (parseInt(data.end_time) - parseInt(data.start_time)); 
          var minutes = Math.floor(longTime/(60));
         
          data.longTime =  minutes;
          data.desc = res.data.data.test.desc.replace(/\<img/gi, '<img class="pic" ');
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