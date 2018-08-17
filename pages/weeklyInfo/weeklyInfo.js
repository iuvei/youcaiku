var app = getApp()
// pages/weeklyInfo/weeklyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    content:"",
    start_time:"",
    end_time:"",
    status:0,
    status1:1,
    dab:true,
    weekly_id:"",
    contentLength: "",
    course_id:"",
    contentValueTotal: '',
    showBar:false,
    max: -1
  },
  // 开始日期
  startDateChange: function (e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  // 结束日期
  endDateChange: function (e) {
    this.setData({
      end_time: e.detail.value
    })
  },
  //文本内容
  bindinput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindblur: function (e) {
    this.setData({
      content: e.detail.value,
      contentLength: this.data.content.split('').length
    })
  },
  onloading: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  bindBack: function () {
    wx.setStorage({
      key: "keyNum",
      data: "1"
    });
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onloading();
    var that = this;
    this.setData({
      weekly_id:options.weekly_id,
      course_id:options.course_id
    });
    wx.request({
      url: this.data.urlLink + 'user/weekly_list/' + options.weekly_id,
      header: this.data.headerData,
      data: {},
      success: function (res) {
        wx.hideLoading();
        var weeklyData = res.data.data.weekly;
        var status = weeklyData.status;
        if (status==1){
         that.setData({
           status: 0,
           dab:true,
           status1:1
         })
        }else{
          that.setData({
            status: 1,
            dab: false,
            status1:0
          })
        }
        that.setData({
          content: weeklyData.content,
          start_time: app.dateFormate(parseInt(weeklyData.start_time) * 1000),
          end_time: app.dateFormate(parseInt(weeklyData.end_time) * 1000)
        })
      }
    })
  },
  
  bindsave: function (e) {
    this.onloading();
    var that = this;
    var start_time = new Date(that.data.start_time);
    var end_time = new Date(that.data.end_time);
    start_time = start_time.getTime();
    end_time = end_time.getTime();
    start_time = start_time / 1000;
    end_time = end_time / 1000;
    wx.request({
      url: this.data.urlLink + 'user/weekly_list/' + that.data.weekly_id,
      method: 'PUT',
      header: this.data.headerData,
      data: {
        content: that.data.content,
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
          });
          that.bindBack()
        }
      }
    })
  },
  //提交
  bindSum: function (e) {
    this.onloading();
    var that = this;
    var start_time = new Date(that.data.start_time);
    var end_time = new Date(that.data.end_time);
    start_time = start_time.getTime();
    end_time = end_time.getTime();
    start_time = start_time / 1000;
    end_time = end_time / 1000;
    if (this.data.contentLength < 200) {
      wx.showToast({
        title: '周报内容不能少于200字',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: this.data.urlLink + 'user/weekly_list/' + that.data.weekly_id,
      method: 'PUT',
      header: this.data.headerData,
      data: {
        content: that.data.content,
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
          });
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