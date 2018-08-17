var app = getApp()
// pages/renwuInfo/renwuInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,  //获取主域名头部信息
    urlLink: app.globalData.urlLink,        //获取主域名
    author_name:"",                         //作者姓名
    content:"",                             //任务内容链接
    created_time:0,                         //发布时间
    task_name:"",                           //标题
    teacher_avatar:"",                      //老师头像
    teacher_name:"",                        //任课老师姓名
    total_score:0,                          //总学分
    task_id:"",                             //任务ID
    sup_id:""
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
    var task_id = options.task_id;
    var sup_id = options.idData;
    that.setData({
      task_id: options.task_id,
      sup_id: options.idData
    })
    wx.request({
      url: this.data.urlLink + '/courses/' + options.idData + '/tasks/' + options.task_id,
      data: {},
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        var resData = res.data.data.task;
        that.setData({
          author_name: resData.author_name,
          content: resData.content.replace(/\<img/gi, '<img style="width:100%;height:auto" '),
          created_time: app.dateFormate(parseInt(resData.created_time) * 1000),
          task_name: resData.task_name,
          teacher_avatar: resData.teacher_avatar,
          teacher_name: resData.teacher_name,
          total_score: resData.total_score
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