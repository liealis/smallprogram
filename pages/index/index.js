//index.js
//获取应用实例
const app = getApp()
var total_micro_second = 1512057600000 - Math.round(new Date().getTime())
Page({
  data: {
    motto: '您好',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    day:'',
    hr:'',
    min:'',
    sec:'',
    clock:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    /** 
     * setTimeout 延时2秒执行跳转函数
     */
    // setTimeout(function(){
    //   wx.navigateTo({
    //     url: '../personalCenter/personalCenter',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // })
  },
  onReady:function(){
    var self = this;
    self.countdown(this);
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  countdown:function() {
    var self = this;
    // 渲染倒计时时钟
    var time = self.dateformat(total_micro_second) //t
    self.setData({
      clock: time
    });

 
    if(total_micro_second <= 0) {
      self.setData({
        clock: "已经截止"
      });
      // timeout则跳出递归
      return;
    }  
   setTimeout(function() {
      // 放在最后--
      total_micro_second -= 10;
      self.countdown();
    }
    , 10)
  },
  dateformat: function (micro_second) {
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 天数位
    var day = Math.floor(second / 86400);
    // 小时位
    var hr = Math.floor((second - day*86400) / 3600);
    
    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);
    // 秒位
    var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    this.setData({
      day:day,
      hr:hr,
      min:min,
      sec:sec
    })
    //return day+"天: " + hr + "时: " + min + "分: " + sec + "秒";
  }
},
  

)
