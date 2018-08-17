var app = getApp()
// pages/discussInfo/discussInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    on: app.globalData.on,
    lineCount: app.globalData.lineCount,
    content:"",
    group_id:"",                               //id
    group_name: "",                            //头部组名
    title: "",                                 //头部标题
    student_count: "",                         //头部学生数
    reply_list:[],
    replToNum:0,
    on: app.globalData.on,
    lineCount: app.globalData.lineCount,
    reply_id:"",
    total_count:0,
    max: -1,
    contentValueTotal:""
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
    var that=this;
    this.setData({
      on: "on",
      reply_id: reply_id
    });
    
  },
  //关闭评论
  closeReply: function () {
    this.setData({
      on: "",
      lineCount:0
    })
  },
  //回复评论输入框是否有输入
  changeValue: function (e) {
    this.setData({
      content:e.detail.value,
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
      group_id: options.group_id
    })
    this.taolunListData()
  },
  taolunListData:function(){
    var that = this;
    this.onloading();
    wx.request({
      url: this.data.urlLink + '/discussion_group_list/' + that.data.group_id,
      data: {
        page_size: 10
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        // console.log(res)
        var discussion_group = res.data.data.discussion_group;  //头部信息
        var reply_list = res.data.data.reply_list;              //列表信息
        var total_count = res.data.data.total_count;
        if (reply_list){
          if (reply_list.indexOf('reply_to')) {
            that.setData({
              replToNum: 1
            })
          } else {
            that.setData({
              replToNum: 0
            })
          }
        }
        
        that.setData({
          group_name: discussion_group.group_name,
          student_count: discussion_group.student_count,
          title: discussion_group.title,
          reply_list: reply_list,
          total_count: total_count
        })
      }
    });
  },
  //发送回复内容
  sumText:function(e){
    var that=this;
    wx.request({
      url: this.data.urlLink + '/discussion_group_list/' + that.data.group_id + '/reply',
      data: {
        content: that.data.content,
        reply_id: e.currentTarget.dataset.rid
      },
      method:'POST',
      header: that.data.headerData,
      success: function (res) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        });
        wx.setStorage({
          key: "keyNum",
          data: "3"
        });
        that.setData({
          lineCount:0,
          on:"",
          content:""
        })
        // 
        that.taolunListData()
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