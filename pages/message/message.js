// pages/message/message.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:"",
    list:[],
    activeTag:"1",
    pageIndex:0,
    total:0,
    pageSize:10,
    isDone:false
  },
  getMsg:function(){
    var that = this;
    that.setData({
      activeTag: "1",
      list: [],
      pageIndex:0,
      total: 0,
      isDone: false
    }, function () {
      that.getList();
    });
  },
  sendMsg:function(){
    var that = this;
    that.setData({
      activeTag: "2",
      list: [],
      pageIndex: 0,
      total: 0,
      isDone: false
    }, function () {
      that.getList();
    });
  },
  getList:function(){
    //请求首页数据
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.urlLink+'/user/letters',
        data: {
          folder_type: that.data.activeTag,
          page_size:that.data.pageSize,
          page_index: (that.data.pageIndex) * that.data.pageSize
        },
        header: app.globalData.headerData,
        success: function (res) {
          wx.hideLoading();
          // wx.stopPullDownRefresh();
          var _list = that.data.list;
          if (res &&  res.data.data) {
            var data = res.data.data.letters;
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              var _time =app.timeFormate(parseInt(data[i].created_time) * 1000);
              item.created_time = _time;
              _list.push(item);
            }
            that.setData({
              list:_list,
              total:res.data.data.total_count
            });
            app.globalData.message_key =1
          }
          that.setData({
            isDone:true
          });
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  loadMore:function(){
    var that=this;
    if(that.data.list.length<that.data.total){
      var idx = ++that.data.pageIndex;
      this.setData({
        pageIndex: idx
      }, function () {
        that.getList();
      })
    }else{
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (app.globalData.message_key==0){
      var that = this;
      that.setData({
        list: [],
        pageIndex: 0,
        total: 0,
        isDone: false
      }, function () {
        that.getList();
      });
      wx.getSystemInfo({
        success: function (res) {
          // 可使用窗口宽度、高度
          that.setData({
            scrollHeight: res.windowHeight - 52
          })
        }
      })
    }
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
    var that=this;
    that.setData({
      list: [],
      pageIndex: 0,
      total: 0,
      pageSize: 10,
      isDone: false
    }, function () {
      that.getList();
    });
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