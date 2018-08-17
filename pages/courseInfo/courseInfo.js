var app = getApp();
// pages/courseInfo1/courseInfo1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    sw: false,
    st:true,
    opt: "",
    state:"",
    sot:"",
    zuoList:1,
    max: -1,
    askcontentTotal:'',
    headerData: app.globalData.headerData,//获取主域名头部信息
    urlLink:app.globalData.urlLink,  //获取主域名
    on: app.globalData.on,
    lineCount: app.globalData.lineCount,
    course_name:"",                  //课程名称
    pic_url:"",                      //课程图片
    is_contain_video:'',             //是否有视频
    teacher_name:"",                 //老师名称
    total_score:"",                  //总分
    total_time:"",                   //总学时
    total_time_text:0,               //总学时转换值
    status:"",                       //状态
    status_text:"",                  //状态文本
    status_color:"",                 //状态颜色
    student_count:"",                //学生总数
    zjListData:[],                   //章节信息
    zjListNum:"",                    //是否有章节信息
    idData:'',                       //
    renwuListData:[],                //任务信息
    renwuListNum:"",                 //是否有任务信息
    askListData:[],                  //问答信息
    askListNum:"",                   //是否有问答信息
    askData: null,                   //是否有问答信息
    quest_list:"",                   //问答信息
    homework:"",                     //是否有作业
    homeworkData:[],                 //作业信息
    homeworkType:"",                 //作业类型
    weeklyData:null,                 //是否有周报信息
    weekly_list:[],                  //周报明细
    end_time:'',
    start_time:'',
    discussion_group_list:[],         //讨论组信息
    discussData:null,                 //是否有讨论组信息
    gaik_info:"",                     //概述内容
    evaluateData:null,                //是否有评价信息
    evaluate_list:[],                 //评价信息
    created_time:"",
    myevaluate:"",                    //我的评价
    comprehensive: 0,                 //我的评价综合
    course_evaluate: 0,               //我的评价课程评价
    created_time:0,                   //我的评价时间
    evaluate_content:0,               //我的评价学习感受
    integrality:0,                    //我的评价完整性
    practicability:0,                 //我的评价实用性
    sense_participation:0,            //我的评价参与感
    teache_evaluate: 0,               //我的评价教师评价
    userImg:"",                       //自己头像
    userName:"",                      //自己昵称
    askcontent:"",                    //提问的内容
    currentNum:0
  },

  //回复评论调取
  replyBtn: function (e) {
    var reply_id = e.currentTarget.dataset.id;
    var that = this;
    this.setData({
      on: "on",
      reply_id: reply_id
    });

  },
  //关闭评论
  closeReply: function () {
    this.setData({
      on: "",
      lineCount: 0
    })
  },
  //回复评论输入框是否有输入
  changeValue: function (e) {
    this.setData({
      askcontent: e.detail.value,
      lineCount: e.detail.cursor
    })
  },
  bindblur: function (e) {
    this.setData({
      askcontent: e.detail.value
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  
  showT: function () {
    this.setData({
      opt: "opt"
    })
  },
  hideT: function () {
    this.setData({
      opt: ""
    })
  },
  ont: function (e) {
    this.setData({
      nnt: true,
      nnf: false
    })
  },
  onf: function (e) {
    this.setData({
      nnt: false,
      nnf: true
    })
  },
  onloading:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
  },
  weeylyUrl:function(){
    wx.navigateTo({
      url: '../weekly/weekly?course_id=' + this.data.idData
    })
  },
  zj_request:function(e){
    this.swichNav(e)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var idData = option.course_id;
    var that = this;
    that.setData({
      idData: idData
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight -64
        })
        // var clientHeight = res.windowHeight,
        //   clientWidth = res.windowWidth,
        //   rpxR = 750 / clientWidth;
        // var calc = clientHeight * rpxR - 130;
        // that.setData({
        //   winHeight: calc
        // });
      }
    });
    // 加载课程
    that.courseData();
    //加载章节数据
    that.zjData();
    
  },
  //加载课程数据
  courseData:function(){
    var that=this;
    that.onloading();
    wx.request({
      url: this.data.urlLink + '/courses/' + that.data.idData,
      data: {},
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        // console.log(res)
        if (res.data.data == null) {
          return false
        }
        var resData = res.data.data.course;
        that.setData({
          course_name: resData.course_name,
          pic_url: resData.pic,
          teacher_name: resData.teacher_name,
          total_score: resData.total_score,
          total_time: resData.total_time,
          status: resData.status,
          student_count: resData.student_count
        });
        if (that.data.total_time >= 60) {
          that.setData({
            total_time_text: Math.floor(that.data.total_time / 60) + "分" + that.data.total_time % 60 + "秒"
          })
        }
        if (that.data.status == 0) {
          that.setData({
            status_text: "已完成",
            status_color: "c1a"
          })
        } else if (that.data.status == 1) {
          that.setData({
            status_text: "进行中",
            status_color: "cef"
          })
        }
      }
    });
  },

  //加载章节数据
  zj_request:function(e){
    this.swichNav(e);
    this.zjData();
  },
  zjData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/courses/' + that.data.idData + '/chapters',
      data: {},
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        // console.log(res)
        if (res.data.data == null) {
          return false
        }
        var zjListData = res.data.data.chapters;
        var zjListNum = zjListData.length;
        that.setData({
          zjListData: zjListData,
          zjListNum: zjListNum,
          idData: that.data.idData
        })
        if (that.data.zjListNum <= 0) {
          zjListNum = 0
        } else {
          zjListNum = 1
        }
      }
    });
  },
  // 任务
  renwu_request: function (e) {
    this.swichNav(e);
    this.renwuData();
  },
  renwuData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + '/courses/' + that.data.idData + '/tasks',
      data: {},
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.data == null) {
          return false
        }
        var renwuListData = res.data.data.tasks;
        var renwuListNum = renwuListData.length;
        that.setData({
          renwuListData: renwuListData,
          renwuListNum: renwuListNum
        })
        if (that.data.renwuListNum <= 0) {
          renwuListNum = 0
        } else {
          renwuListNum = 1
        }
      }
    })
  },
  //问答
  ask_request: function (e) {
    var that = this;
    this.swichNav(e);
    this.askData();
    //获取个人信息
    wx.request({
      url: that.data.urlLink + '/user',
      data: {},
      header: that.data.headerData,
      success: function (res) {
        var userName = res.data.data.account.name;
        var userImg = res.data.data.user_info.avatar;
        that.setData({
          userImg: userImg,    //自己头像
          userName: userName  //自己名称
        })
      }
    });
  },
  askData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + '/quest_list',
      data: {
        page_size: 10,
        sup_id: that.data.idData,
        sup_type: 1
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var askData = res.data.data;
        if (askData == null) {
          return false
        }
        var askListData = askData.tasks;
        if (askListData == null) {
          askListData = ""
        }
        that.setData({
          askData: askData,
          askListData: askListData,
          quest_list: res.data.data.quest_list
        })
      }
    })
  },
  // 作业
  job_request: function (e) {
    this.swichNav(e);
    this.jobData();
  },
  jobData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + '/homework_list',
      data: {
        course_id: that.data.idData
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        that.setData({
          homework: res.data.data
        })
        if (res.data.data == null) {
          return false
        }
        var homework_list = res.data.data.homework_list;
        var homework = res.data.data;

        that.setData({
          homework: res.data.data,
          homeworkData: homework_list
        })
      }
    })
  },
  // 周报
  weekly_request: function (e) {
    this.swichNav(e);
    this.weeklyData()
  },
  weeklyData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + 'user/weekly_list',
      data: {
        course_id: that.data.idData
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.data == null) {
          return false
        }
        var weeklyData = res.data.data;
        var weeklyList = weeklyData.weekly_list;
        var start_time, end_time;
        for (var i = 0; i < weeklyList.length; i++) {
          weeklyList[i].start_time = app.dateFormate(parseInt(weeklyList[i]["start_time"]) * 1000)
          weeklyList[i].end_time = app.dateFormate(parseInt(weeklyList[i]["end_time"]) * 1000)
        }
        that.setData({
          weeklyData: weeklyData,
          weekly_list: weeklyData.weekly_list
        })
      }
    })
  },
  // 讨论
  discuss_request: function (e) {
    this.swichNav(e);
    this.disData();
  },
  disData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: this.data.urlLink + 'discussion_group_list',
      data: {
        course_id: that.data.idData
      },
      header: this.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.data == null) {
          return false
        }
        var discussData = res.data.data;
        that.setData({
          discussData: discussData,
          discussion_group_list: discussData.discussion_group_list
        })

      }
    })
  },
  //评价
  pingjia_request: function (e) {
    this.swichNav(e);
    this.pingjiaData();
  },
  pingjiaData:function(){
    this.onloading();
    var that = this;
    // 全部评价
    wx.request({
      url: that.data.urlLink + '/evaluate_list',
      data: {
        sup_id: that.data.idData,
        sup_type: 1,
        page_size: 10
      },
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.data == null) {
          return false
        }
        var evaluateData = res.data.data;
        var evaluateList = evaluateData.evaluate_list;
        for (var i = 0; i < evaluateList.length; i++) {
          evaluateList[i].created_time = app.dateFormate(parseInt(evaluateList[i]["created_time"]) * 1000)
        }
        that.setData({
          evaluateData: evaluateData,
          evaluate_list: evaluateData.evaluate_list
        })
      }
    });
    // 我的评价
    wx.request({
      url: that.data.urlLink + '/user/evaluate',
      data: {
        sup_id: that.data.idData,
        sup_type: 1
      },
      header: that.data.headerData,
      success: function (res) {
        if (res.data.data == null) {
          that.setData({
            myevaluate: 0,
          })
          return false
        } else {
          that.setData({
            myevaluate: 1,
          })
        }
        var myevaluateList = res.data.data.evaluate;
        that.setData({
          comprehensive: myevaluateList.comprehensive,
          course_evaluate: myevaluateList.course_evaluate,
          created_time: app.dateFormate(parseInt(myevaluateList.created_time) * 1000),
          evaluate_content: myevaluateList.evaluate_content,
          integrality: myevaluateList.integrality,
          practicability: myevaluateList.practicability,
          sense_participation: myevaluateList.sense_participation,
          teache_evaluate: myevaluateList.teache_evaluate
        })
      }
    });
    //获取个人信息
    wx.request({
      url: that.data.urlLink + '/user',
      data: {},
      header: that.data.headerData,
      success: function (res) {
        var userName = res.data.data.account.name;
        var userImg = res.data.data.user_info.avatar;
        that.setData({
          userImg: userImg,    //自己头像
          userName: userName  //自己名称
        })
      }
    });
  },
  //概况
  gaik_request: function (e) {
    this.swichNav(e);
    this.gaikData();
  },
  gaikData:function(){
    this.onloading();
    var that = this;
    wx.request({
      url: that.data.urlLink + '/courses/' + that.data.idData,
      data: {},
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var gaik_info = res.data.data.course.desc;
        that.setData({
          gaik_info: gaik_info.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        })
      }
    })
  },
  //问答-外面的提问
  sumaskText:function(e){
    this.onloading();
    this.swichNav(e);
    var that = this;
    wx.request({
      url: that.data.urlLink + '/quest_list',
      data: {
        content:that.data.askcontent,
        sup_id:that.data.idData,
        sup_type:1
      },
      method:'POST',
      header: that.data.headerData,
      success: function (res) {
        wx.hideLoading();
        that.setData({
          lineCount: 0,
          on: "",
          askcontent: ""
        })
        that.ask_request(e)
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
  // onShow: function () {
  //   var that=this;

  // },
  onShow: function (){
    var that = this;
    wx.getStorage({
      key: 'keyNum',
      success: function (res) {
        if (res.data == 1) {           //周报
          that.weeklyData();
        } else if (res.data == 2) {    //评价
          that.pingjiaData();
        } else if (res.data == 3){     //讨论
          that.disData()
        } else if (res.data == 4){     //章节
          that.courseData();
          that.zjData();
        } else if (res.data == 5){     //问答
          that.askData();
        }
        setTimeout(function () {
          wx.removeStorage({
            key: 'keyNum'
          })
        }, 500)
      }
    })
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
    var that = this;
    that.courseData();
    if (that.data.currentTab == 0) {             //章节
      that.zjData()
    } else if (that.data.currentTab == 1) {      //任务
      that.renwuData()
    } else if (that.data.currentTab == 2) {      //问答
      that.askData()
    } else if (that.data.currentTab == 3) {      //作业
      that.jobData()
    } else if (that.data.currentTab == 4) {      //周报
      that.weeklyData()
    } else if (that.data.currentTab == 5) {      //讨论组
      that.disData()
    } else if (that.data.currentTab == 6) {      //评价
      that.pingjiaData()
    } else {                                     //概况
      that.gaikData()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("下拉加载")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})