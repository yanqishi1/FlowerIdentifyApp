Page({
  data: {},
    PlantDetect: function(n) {
      wx;wx.navigateTo({
        url: '../scan/scan',
      })
    },
  banquan: function () {
    wx.navigateToMiniProgram({
      appId: 'wx9588ff2d3063ee31',
      path: '',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
