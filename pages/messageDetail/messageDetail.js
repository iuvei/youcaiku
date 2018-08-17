// pages/messageDetail/messageDetail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myrich: "",
    title:"",
    letter_id:'',
    name:""
  },
  getMsgDetail:function(){
    var that=this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.urlLink +'/user/letters/' + that.data.letter_id,
      header: app.globalData.headerData,
      success:function(res){
        wx.hideLoading();
        wx.setStorage({
          key: "keyMnum",
          data: "1"
        });
        if(res && res.data.code==200){
          var _time = app.timeFormate(parseInt(res.data.data.letter.created_time) * 1000);
          var _html = res.data.data.letter.content_html.replace(/\<img/gi, '<img class="pic" ');
          _html = _html.replace(/\<a/gi,"<a style='display:none;' ");
          that.setData({
            myrich:_html,
            name:res.data.data.letter.nickname,
            time:_time
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.tag){
      if(options.tag==="1"){
        this.setData({
          title: "发件人",
          tag: options.tag
        });
      }
      if (options.tag === "2") {
        this.setData({
          title: "收件人",
          tag: options.tag
        });
      }
    }
    if (options.letter_id) {
      this.setData({
        letter_id: options.letter_id
      })
    }
    if (options.is_read) {
      this.setData({
        is_read: options.is_read
      })
    }
    this.getMsgDetail();
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
    if (this.data.tag === "1" && !this.data.is_read)
    app.globalData.message_key = 0;
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