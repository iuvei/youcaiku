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
    notes: [],                               //任务笔记列表
    askcontent: "",
    notesData: "",
    note_id: "",
    max: -1
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
  bindblur: function (e) {
    this.setData({
      content: e.detail.value
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
  //我的笔记列表 
  askList: function () {
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/user/notes',
      data: {
        page_size: 10,
        sub_id:that.data.sub_id,
        sub_type:2,
        sup_id:that.data.sup_id,
        sup_type:1
      },
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res.data.data == null) {
          that.setData({
            notesData: res.data.data
          })
          return false
        }
        that.setData({
          notes: res.data.data.notes,
          notesData: res.data.data
        })

      }
    })
  },
  sumaskText: function (e) {
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/user/notes',
      data: {
        content: that.data.askcontent,
        sub_id: that.data.sub_id,
        sub_type: 2,
        sup_id: that.data.sup_id,
        sup_type:1
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
  //删除笔记
  deleteNotes: function (e) {
    var that = this;
    that.setData({
      note_id: e.currentTarget.dataset.id
    })
    wx.showModal({
      title: '',
      content: '确定要删除此条笔记吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.urlLink + '/user/notes/' + that.data.note_id,
            data: {},
            method: 'DELETE',
            header: that.data.headerData,
            success: function (res) {
              wx.hideLoading();
              that.askList()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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