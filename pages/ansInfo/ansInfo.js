var app = getApp()
// pages/ansInfo/ansInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    on: app.globalData.on,
    lineCount: app.globalData.lineCount,
    askcontent:"",
    quest_id:"",
    reply_list:[],                           //回复列表
    author: "",                              //发布者昵称
    avatar: "",                              //头像
    content: "",                             //内容
    time_str:"",                             //发布时间   
    reply_id:"",
    max: -1,
    askcontentTotal:''               
  },
  onloading: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  //回复评论调取
  replyBtn: function (e) {
    var reply_id = e.currentTarget.dataset.id;
    var that = this;
    this.setData({
      on: "on",
      reply_id: reply_id
    });

  },
  //关闭评论
  closeReply: function () {
    this.setData({
      on: "",
      lineCount: 0,
      askcontent:""
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
      askcontent: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      quest_id: options.quest_id
    });
    this.askData()
  },
  askData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/quest_list/' + that.data.quest_id,
      data: {
        page_size: 10
      },
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        if (res.data.data == null) {
          return false
        }
        var quest = res.data.data.quest;
        var reply_list = res.data.data.reply_list;
        that.setData({
          reply_list: reply_list,
          avatar: quest.avatar,
          author: quest.author,
          content: quest.content,
          time_str: quest.time_str,
          total_count: res.data.data.total_count
        });
        wx.setStorage({
          key: "keyNum",
          data: "5"
        });
      }
    })
  },
  //问答-内的提问
  sumaskText: function (e) {
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/quest_list/' + that.data.quest_id + '/reply',
      data: {
        content: that.data.askcontent,
        reply_id: that.data.reply_id
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
        that.askData()
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