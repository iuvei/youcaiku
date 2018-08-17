var app = getApp()
// pages/zuoyeName/zuoyeName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,  //获取主域名头部信息
    urlLink: app.globalData.urlLink,        //获取主域名
    chapter_name: "",                       //章节名称
    chapter_num: 0,                         //章节编号 
    content: "",                            //作业内容h5地址
    name: "",                               //作业名称
    score: 0,                               //作业成绩
    status:0                                //状态
  },
  onloading: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + 'homework_list/' + options.homeworkData,
      data: {},
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        // console.log(res)
        var homeworkData=res.data.data.homework;
        that.setData({
          chapter_name:homeworkData.chapter_name,
          chapter_num:homeworkData.chapter_num,
          content: homeworkData.content.replace(/\<img/gi, '<img style="width:100%;height:auto" '),
          name:homeworkData.name,
          status:homeworkData.status
        })
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