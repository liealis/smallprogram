Page({
  data: {
    animationData: {}
  },
  onShow: function () {
    

  },
   
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(0).step()
    this.animation.scale(1, 1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(0).scale(1, 1).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  }
})