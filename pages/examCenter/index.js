// pages/examCenter/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    activeTag:"0",
    list: [],
    pageIndex: 0,
    total: 0,
    pageSize: 3,
    isDone:false
  },
  changeList:function(e){
    this.setData({
      activeTag: e.currentTarget.dataset.index.toString(),
      list: [],
      pageIndex: 0,
      total: 0
    });
    this.getList();
  },
  getList() {
    //请求首页数据
    var that = this;
    this.setData({
      isDone:false
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.urlLink+'/tests',
      data: {
        status: that.data.activeTag,
        page_size: that.data.pageSize,
        page_index: (that.data.pageIndex) * that.data.pageSize
      },
      header: app.globalData.headerData,

      success: function (res) {
        wx.hideLoading();
        var _list = that.data.list;
        if (res && res.data.data) {
          var data = res.data.data.tests;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var _time = app.dateFormate(parseInt(data[i].start_time)*1000);
            
            item.created_time = _time;
            
            item.longTime = app.dateDiff(parseInt(data[i].start_time) * 1000, parseInt(data[i].end_time) * 1000);
            _list.push(item);
          }
          that.setData({
            list: _list,
            total:res.data.data.total_count
          });
        }
        that.setData({
          isDone:true
        });
      }
    });
  },
  loadMore: function () {
    var that = this;
    if (that.data.list.length < that.data.total) {
      var idx = ++that.data.pageIndex;
      this.setData({
        pageIndex: idx
      }, function () {
        that.getList();
      })
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        that.setData({
          scrollHeight: res.windowHeight - 80
        })

      }
    });
    that.setData({
      list: []
    }, function () {
      that.getList(that.data.activeTag);
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