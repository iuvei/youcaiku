var app = getApp()
// pages/pingjia/pingjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    checked:"1",
    cbar:false,
    teacher_index:"",
    course_index:"",
    canyu_index:"",
    shiy_index:"",
    full_index:"",
    content:"",
    sup_id:"",
    is_anonymous:false
  },
  //教师评分
  teacher:function(e){
    this.setData({
      teacher_index:e.target.dataset.index
    })
  },
  //课程评分
  course:function(e){
    this.setData({
      course_index: e.target.dataset.index
    })
  },
  //参与评分
  canyu:function (e) {
    this.setData({
     canyu_index: e.target.dataset.index
    })
  },
  //实用评分
  shiy: function (e) {
    this.setData({
      shiy_index: e.target.dataset.index
    })
  },
  //完整性
  full: function (e) {
    this.setData({
      full_index: e.target.dataset.index
    })
  },
  //是否匿名
  checkboxChange:function(e){
    var is_anonymous = e.detail.value[0];
    if (is_anonymous) {
      is_anonymous = true
    } else {
      is_anonymous = false
    }
    this.setData({
      is_anonymous: is_anonymous
    })
  },
  //输入内容
  bindinput:function(e){
   this.setData({
     content: e.detail.value
   })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sup_id: options.sup_id
    })
  },
  // 返回上一页
  bindBack: function () {
    wx.setStorage({
      key: "keyNum",
      data: "2"
    });
    wx.navigateBack({
      delta: 1
    })
  },
  // 提交评价
  bindSum: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    if (that.data.teacher_index == 0 || that.data.course_index == 0 || that.data.canyu_index == 0 || that.data.shiy_index == 0 || that.data.full_index == 0) {
      wx.showToast({
        title: "至少选择一颗星",
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: that.data.urlLink + '/evaluate_list',
      method: 'POST',
      data: {
        course_evaluate: parseInt(that.data.course_index),
        evaluate_content: that.data.content,
        integrality: parseInt(that.data.full_index),
        is_anonymous: that.data.is_anonymous,
        practicability: parseInt(that.data.shiy_index),
        sense_participation: parseInt(that.data.canyu_index),
        sup_id: that.data.sup_id,
        sup_type: 1,
        teache_evaluate: parseInt(that.data.teacher_index)
      },
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        var tis_text = res.data.detail;
        var res_error = res.data.error;
        var res;
        if(res_error) {
          res = 1
        }else {
          res = 0
        }
        if (res == 1) {
          wx.showToast({
            title: tis_text,
            icon: 'none',
            duration: 2000
          })
          return false
        } else if (res == 0) {
          wx.showToast({
            title: tis_text,
            icon: 'success',
            duration: 2000
          });
          that.bindBack()
          // wx.navigateBack({
          //   delta: 1
          // })
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