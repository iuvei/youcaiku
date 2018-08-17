// pages/course/course.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    nnt: app.globalData.ont,
    nnf: app.globalData.onf,
    urlLink: app.globalData.urlLink,
    status: 1,
    courses:[],
    courses_length: 0
  },
  //事件处理函数
  ont: function (e) {
    this.setData({
      nnt: true,
      nnf: false,
      status: e.currentTarget.dataset.status
    })
    this.indexData()
  },
  onf: function (e) {
    this.setData({
      nnt: false,
      nnf: true,
      status: e.currentTarget.dataset.status
    })
    this.indexData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 
  onLoad: function () {
    //请求首页数据
    var that = this;
    that.indexData()
  },
  indexData: function () {
    //请求首页数据
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    }),
      wx.request({
        url: this.data.urlLink + '/smallhome',
        data: {
          page_size: 10,
          status: that.data.status
        },
        header: app.globalData.headerData,
        success: function (res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          if (res && res.data.data) {
            var coursesData = res.data.data;
            var courses = coursesData.courses;
            var bannerList = coursesData.banner;
            that.setData({
              courses: courses,
              imgUrls: bannerList,
              courses_length: courses.length
            })
            app.globalData.course_key = 1
          }
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
    if (app.globalData.course_key==0){
      this.indexData()
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
    this.indexData()
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