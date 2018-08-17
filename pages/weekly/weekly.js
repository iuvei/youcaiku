var app = getApp()
// pages/weekly/weekly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    start_date:"",
    end_date:"",
    course_id:"",
    content:"",
    contentLength:"",
    contentValueTotal:'',
    showBar: false,
    dab:true,
    max:-1,
    tis_start:"请选择",
    tis_end:"请选择"
  },
  // 开始日期
  startDateChange: function (e) {
    this.setData({
      start_date: e.detail.value,
      tis_start:""
    });
    
  },
  // 结束日期
  endDateChange: function (e) {
    this.setData({
      end_date: e.detail.value,
      tis_end: ""
    })
  },
  //文本内容
  bindinput:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  bindblur:function(e){
    this.setData({
      content: e.detail.value,
      contentLength: this.data.content.split('').length
    })
    // console.log(this.data.contentLength)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      course_id: options.course_id
    })
    
  },
  onloading: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  bindBack:function(){
    wx.setStorage({
      key: "keyNum",
      data: "1"
    });
    wx.navigateBack({
      delta: 1
    })
  },
  bindsave: function (e) {
    this.onloading();
    var that = this;
    var start_time = new Date(that.data.start_date);
    var end_time = new Date(that.data.end_date);
    start_time = start_time.getTime();
    end_time = end_time.getTime();
    start_time = start_time / 1000;
    end_time = end_time / 1000;
    wx.request({
      url: this.data.urlLink + 'user/weekly_list',
      method: 'POST',
      header: this.data.headerData,
      data: {
        content: that.data.content,
        course_id: that.data.course_id,
        start_time: start_time,
        end_time: end_time,
        status: parseInt(e.target.dataset.status)
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        var tis_text = res.data.detail;
        var res_error = res.data.error;
        var res;
        if (res_error) {
          res = 1
        } else {
          res = 0
        }
        if (res==1) {
          wx.showToast({
            title: tis_text,
            icon: 'none',
            duration: 2000
          })
          return false
        }else if(res==0){
          console.log(that.data.contentValue)
          wx.showToast({
            title: tis_text,
            icon: 'success',
            duration: 2000
          })
          that.bindBack()
        }
        
      }
    })
  },
  bindSum:function(e){
    this.onloading();
    var that = this;
    var start_time = new Date(that.data.start_date);
    var end_time = new Date(that.data.end_date);
    start_time = start_time.getTime();
    end_time = end_time.getTime();
    start_time = start_time/1000;
    end_time = end_time/1000;
    if (this.data.contentLength<200){
      wx.showToast({
        title: '周报内容不能少于200字',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: this.data.urlLink + 'user/weekly_list',
      method:'POST',
      header: this.data.headerData,
      data: {
        content: that.data.content,
        course_id: that.data.course_id,
        start_time: start_time,
        end_time: end_time,
        status: parseInt(e.target.dataset.status)
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        var tis_text = res.data.detail;
        var res_error = res.data.error;
        var res;
        if (res_error) {
          res = 1
        } else {
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
          })
          that.bindBack()
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