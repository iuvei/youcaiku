//app.js
var md5 = require('/utils/md5.js');
var token,tokenMd5;
App({
  
  onLaunch: function () {
    var key = wx.getStorageSync('loginKey');
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ont: true,
    onf: false,
    lineCount: 0,
    on: "",
    nowDate: Date.parse(new Date()) / 1000,
    authTYPE:"BASIC_AUTH",
    app_secret:'',
    urlLink:"https://1354.com.cn/api/web",
    headerData: {
      'content-type': 'application/json', // 默认值
      'PLATFORM': 1,
      'APP-VERSION': '2.1.0',
      'TRAINING-AUTH-TYPE': 'BASIC_AUTH',
      'TRAINING-TIMESTAMP': (Date.parse(new Date()) / 1000).toString(),
      'TRAINING-TOKEN': md5.md5((Date.parse(new Date()) / 1000).toString() +'app_secret').toLowerCase(),
      'TRAINING-USER-ID':''
    },
    loginKeyNum:0,
    TIMESTAMP:'',
    AUTH_TYPE:'',
    TOKEN:'',
    USER_ID:'',
    index_key:0,
    indexNoLogin_key:0,
    course_key:0,
    message_key:0,
    user_key:0
  },
  // 格式化时间戳 参数：毫秒  2018-07-20 16:12:57 
  timeFormate:function(times) {
    var created_time = new Date(times);
    var month = (created_time.getMonth() + 1) < 10 ? "0" + (created_time.getMonth() + 1) : (created_time.getMonth() + 1);
    var day = created_time.getDate() < 10 ? "0" + created_time.getDate() : created_time.getDate();
    var hour = created_time.getHours() < 10 ? "0" + created_time.getHours() : created_time.getHours();
    var minute = created_time.getMinutes() < 10 ? "0" + created_time.getMinutes() : created_time.getMinutes();
    var seconds = created_time.getSeconds() < 10 ? "0" + created_time.getSeconds() : created_time.getSeconds();
    var _time = created_time.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
    return _time;
  },
  // 格式化时间戳 参数：毫秒  2018-07-20 
  dateFormate: function (times) {
    var created_time = new Date(times);
    var month = (created_time.getMonth() + 1) < 10 ? "0" + (created_time.getMonth() + 1) : (created_time.getMonth() + 1);
    var day = created_time.getDate() < 10 ? "0" + created_time.getDate() : created_time.getDate();
    
    var _time = created_time.getFullYear() + "-" + month + "-" + day ;
    return _time;
  },
  //时间差格式转换 start：开始时间毫秒，end：结束时间毫秒
  dateDiff:function(start,end){
    var longTime = end - start ;
    var dayDiff = Math.floor(longTime / (24 * 3600 * 1000));
    var leave1 = (longTime % (24 * 3600 * 1000));
    var hour = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var rs = hour + "时" + minutes + "分" + seconds + "秒";
    return rs;
  }
})