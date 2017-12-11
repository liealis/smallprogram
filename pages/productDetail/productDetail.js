Page({
  data: {
    imgUrls: [
      'https://img.tjzmall.com/upload/goods/imgs/20170612152436_866-S.jpg',
      'https://img.tjzmall.com/upload/goods/imgs/20170612152512_939-big.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    buyMode: 3,   //购买按钮模式[1:正常购买；2:售罄;3:团购;4:团购次数用光]
    day: '',
    hr: '',
    min: '',
    sec: '',
    clock: '',
    clockStatus: '',  //倒计时状态[open:1;close:0]
    pageAnamition:'',       //上拉加入购物车页面动画参数
    animationDown:'',
    windowWidth:'',
    windowHeight:'',
    amount: 1       //加入购物车的商品数量，初始化默认为1
  },
  onLoad: function () {
    /**
     * 获取全局手机屏幕宽高数据windowHeight&windowWidth
     * 以便加入购物车模块动态定位
    */
    var height = getApp().globalData.windowHeight;
    var width = getApp().globalData.windowWidth;
    this.setData({
      windowHeight: height,
      windowWidth: width
    })
    this.countDownCanva();
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  onReady: function () {
    this.countdown()
    // this.addCarAnimation()
   
  },
  countdown: function () {
    var self = this;
    var total_micro_second = 1512403200000 - Math.round(new Date().getTime())
    //console.log(total_micro_second)
    // 渲染倒计时时钟
    var time = self.dateformat(total_micro_second) //t
    self.setData({
      clock: time,
      clockStatus: 1   //倒计时开启
    });
    if (total_micro_second <= 0) {
      self.setData({
        clock: "活动已结束",
        clockStatus: 0  //倒计时关闭
      });
      // timeout则跳出递归
      return;
    }
    setTimeout(function () {
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
    var hr = Math.floor((second - day * 86400) / 3600);

    // 分钟位
    var min = Math.floor((second - (day * 86400 + hr * 3600)) / 60);
    // 秒位
    var sec = (second - day*86400 - hr * 3600 - min * 60);// equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);
    this.setData({
      day: day,
      hr: hr,
      min: min,
      sec: sec
    })
    //return day+"天: " + hr + "时: " + min + "分: " + sec + "秒";
  },
  // 渐变动画
  countDownCanva: function () {
    const ctx = wx.createCanvasContext('countDowm')
    var windowWidth = getApp().globalData.windowWidth //获取屏幕可使用宽度
    // console.log(windowWidth)

    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, windowWidth, 0)
    grd.addColorStop(0, '#5D6CAA')
    grd.addColorStop(1, '#7B9DCF')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(0, 0, windowWidth, 40)
    ctx.draw()
  },
  //addProduct
  addProduct: function(){
    this.addCarAnimation()
  },
  // 加入购物车上拉动画
  addCarAnimation: function () {
    var height = getApp().globalData.windowHeight;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay:0,
    })
    this.animation = animation
    this.animation.translate(0, -height).step()
    this.setData({
      pageAnamition: this.animation.export()
    })
  },
  //取消加入购物车，页面下滑动画
  cancelAddProduct: function(){
    var height = getApp().globalData.windowHeight;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
    })
    this.animation = animation
    this.animation.translate(0, 504).step()
    this.setData({
      pageAnamition: this.animation.export()
    })
  },
  // 增减商品数量
  changeAmount: function (e) {
    let temporaryNum = this.data.amount;
    let num = parseInt(e.target.dataset.num)
    // console.log('num=' + num)
    if (num === 1) {
      temporaryNum = temporaryNum + 1
      this.setData({
        amount: temporaryNum
      })
      return temporaryNum;
    }
    else if (num === -1) {
      if (temporaryNum <= 1) {
        wx.showToast({
          title: '数量最少为1',
          duration: 2000,
          mask: true
        })
      } else {
        temporaryNum = temporaryNum - 1
        this.setData({
          amount: temporaryNum
        })
        return temporaryNum;
      }
    }
  },
  // 确认按钮
  confirmButton: function(){
    // 提交数据给接口
    // 执行动画效果
    this.cancelAddProduct()
  }
})