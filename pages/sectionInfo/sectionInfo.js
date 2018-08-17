var app = getApp();
var timer_text,close_timeNum;
// pages/courseName/courseName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: app.globalData.headerData,  //获取主域名头部信息
    urlLink: app.globalData.urlLink,        //获取主域名
    author_name:"",                         //作者名称
    chapter_name:"",                        //标题
    content:"",                             //课程内容链接
    created_time:0,                         //发布时间
    studied_time:0,                         //已学习时间
    teacher_avatar:"",                      //老师头像
    teacher_name:"",                        //任课老师姓名
    total_time:0,                           //总学时
    remain_time:0,                          //剩余时间
    video_url:"",                           //视频地址
    sup_id:"",                              //课程
    sub_id:"",                              //章节ID
    open_time:0,                            //打开页面时间戳
    close_time:0,                           //关闭页面时间戳     
    day_text:0,
    hour_text:'0'+0,
    minute_text:'0'+0,
    second_text:'0'+0                    
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
    // 获取页面打开时间戳
    var open_time = Date.parse(new Date())/1000;
    this.setData({
      open_time: open_time
    })
    var that = this;
    that.setData({
      sub_id: options.chapter_id,
      sup_id: options.idData
    })
    wx.request({
      url: this.data.urlLink + '/courses/' + options.idData + '/chapters/' + options.chapter_id,
      data: {},
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        // console.log(res);
        var resData = res.data.data.chapter;
        that.setData({
          author_name: resData.author_name,
          chapter_name: resData.chapter_name,
          content: resData.content.replace(/\<img/gi, '<img style="width:100%;height:auto" '),
          studied_time: parseInt(resData.studied_time),
          created_time: app.dateFormate(parseInt(resData.created_time) * 1000),
          teacher_avatar: resData.teacher_avatar,
          teacher_name: resData.teacher_name,
          total_time: resData.total_time,
          video_url: resData.video_url
        });
        that.data.content.replace('<img', '<img style="max-width:100%;height:auto" ');
        //剩余时间
        that.data.remain_time = that.data.total_time - that.data.studied_time;
        that.countDown(that.data.remain_time);
        that.timer(that.data.remain_time);
        if (that.data.remain_time > 0) {
          wx.setStorage({
            key: "keyNum",
            data: "4"
          });
        }
        // 小时
        var hour = Math.floor(that.data.studied_time / 3600);
        var minute = Math.floor((that.data.studied_time - hour * 3600) / 60);
        var second = Math.floor(that.data.studied_time - hour * 3600 - minute*60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //已学习时间转换
        if (that.data.studied_time >= 3600){
          that.setData({
            studied_time: hour + "时" + minute + "分" + second+"秒"
          })
        }else if (that.data.studied_time >= 60 && that.data.studied_time<3600) {
          hour=0;
          that.setData({
            studied_time: minute + "分" + second + "秒"
          })
        }else{
          hour = 0;
          minute=0;
          that.setData({
            studied_time: second + "秒"
          })
        }
        //总学时转换
        if (that.data.total_time >= 60) {
          that.setData({
            total_time: Math.floor(that.data.total_time / 60)
          })
        }
      }
    });
  },
  
  // 倒计时
  countDown:function(times){
    var timer = null;
    var that=this;
    var day_text = that.data.day_text,
        hour_text = that.data.hour_text,
        minute_text = that.data.minute_text,
        second_text = that.data.second_text;
    if (times > 0) {
      day_text = Math.floor(times / (60 * 60 * 24));
      hour_text = Math.floor(times / (60 * 60)) - (day_text * 24);
      minute_text = Math.floor(times / 60) - (day_text * 24 * 60) - (hour_text * 60);
      second_text = Math.floor(times) - (day_text * 24 * 60 * 60) - (hour_text * 60 * 60) - (minute_text * 60);
      
    }
    if (day_text <= 9 && day_text>=0) day_text = '0' + day_text;
    if (hour_text <= 9 && hour_text>=0) hour_text = '0' + hour_text;
    if (minute_text <= 9 && minute_text>=0) minute_text = '0' + minute_text;
    if (second_text <= 9 && second_text>=0) second_text = '0' + second_text;
    if (times<=0){
      day_text = '0' + 0;
      hour_text = '0' + 0;
      minute_text = '0' + 0;
      second_text = '0' + 0
    }
    that.setData({
      day_text: day_text,
      hour_text: hour_text,
      minute_text: minute_text,
      second_text: second_text
    });
    // if (times <= 0) {
    //   clearInterval(timer_text);
    // }
  },
  timer:function (times){
    var that=this;
    timer_text=setInterval(function () {
      times--;
      that.countDown(times);
      // console.log(times)
      if (times <= 0) {
        clearInterval(timer_text);
      }
    }, 1000) 
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
    close_timeNum = Date.parse(new Date())/1000;
    this.setData({
      close_time: close_timeNum
    });
    this.studied_time();
    clearInterval(timer_text);
  },
  // 更新学习时间
  studied_time: function () {
    var that = this;
    wx.request({
      url: this.data.urlLink + '/courses/' + that.data.sup_id + '/chapters/' + that.data.sub_id + '/update_readed',
      data: {
        open_time:that.data.open_time,
        close_time:that.data.close_time
      },
      method: 'PUT',
      header: this.data.headerData,
      success: function (res) {
        clearInterval(timer_text);
      }
    })
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