var md5 = require('../../utils/md5.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    hasUserInfo: false,
    productList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        self.setData({
          'latitude': res.latitude,
          'longitude': res.longitude
        })
      }
    })
    wx.showLoading({
      title: '加载中',
      complete: function(res){
        setTimeout(function () {
          wx.hideLoading()
        }, 300)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow: function () {
    this.linearGradient();
   
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
    
  },
  viewTap:function(res){
    this.setData({
      'latitude': res.latitude
    })
  },
  /**
   * 自定义方法
   */
  linearGradient:function(){
    const ctx = wx.createCanvasContext('myCanvas')
    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, 750, 250)
    grd.addColorStop(0, '#FFB11B')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(0, 0, 750, 250)
    ctx.draw()
  },
})
