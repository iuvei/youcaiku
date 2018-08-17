var app = getApp()
// pages/myask/myask.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    on: app.globalData.on,
    lineCount: app.globalData.lineCount,
    reply_id: "",
    sup_id: "",                              //课程
    sub_id: "",                              //任务ID
    quest_list: [],                          //章节提问列表
    askcontent: "",
    questData: ""
  },
  onloading: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  //回复评论调取
  replyBtn: function () {
    var that = this;
    this.setData({
      on: "on"
    });

  },
  //关闭评论
  closeReply: function () {
    this.setData({
      on: "",
      lineCount: 0
    })
  },
  //回复评论输入框是否有输入
  changeValue: function (e) {
    this.setData({
      askcontent: e.detail.value,
      lineCount: e.detail.cursor
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sub_id: options.sub_id,
      sup_id: options.sup_id
    })
    this.askList()
  },
  //我的提问列表 
  askList: function () {
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/user/quest_list',
      data: {
        page_size: 10,
        sub_id: that.data.sub_id,
        sub_type:2,
        sup_id: that.data.sup_id,
        sup_type: 1
      },
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res.data.data == null) {
          return false
        }
        that.setData({
          quest_list: res.data.data.quest_list,
          questData: res.data.data
        })

      }
    })
  },
  sumaskText: function (e) {
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/quest_list',
      data: {
        content: that.data.askcontent,
        sub_id: that.data.sub_id,
        sub_type:2,
        sup_id: that.data.sup_id,
        sup_type: 1
      },
      method: 'POST',
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        that.setData({
          lineCount: 0,
          on: "",
          askcontent: ""
        });
        that.askList()
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