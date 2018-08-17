//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink: app.globalData.urlLink,  //获取主域名
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 600,
    Height: "",
    nnt: app.globalData.ont,
    nnf: app.globalData.onf,
    cesarr: [],
    endarr: [],
    courses: [],
    urlLink: app.globalData.urlLink,
    status: 1,
    courses_length: 0
  },
  //事件处理函数
  ont: function (e) {
    this.setData({
      nnt: true,
      nnf: false,
      status: e.currentTarget.dataset.status
    })
    this.indexData()
  },
  onf: function (e) {
    this.setData({
      nnt: false,
      nnf: true,
      status: e.currentTarget.dataset.status
    })
    this.indexData()
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },
  // 
  onLoad: function () {
    this.indexData()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  indexData: function () {
    //请求首页数据
    var that = this;
    wx.showLoading({
      title: '加载中',
    }),
      wx.request({
        url: this.data.urlLink + '/nologin_smallhome',
        data: {},
        header: this.data.headerData,
        success: function (res) {
          wx.hideLoading();
          // console.log(res)
          if(res&&res.data.data){
            var coursesData = res.data.data;
            var courses = coursesData.courses;
            var courses_length = courses.length;
            var bannerList = coursesData.banner;
            that.setData({
              courses: courses,
              imgUrls: bannerList,
              courses_length: courses_length
            })
          }
        }
      })
  },
  onShow: function () {
    this.onLoad()
  }
})
