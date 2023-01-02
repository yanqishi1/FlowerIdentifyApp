Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    show: false,
    line_color:[],
    count:0
  },
  onLoad:function(){
    var lines = []
    for(var i=0;i<200;i++){
      lines.push("rgba(0,0,0,0)")
    }
    this.setData({
      line_color:lines
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
  */
  change_color: function(indexs, values){
    var data = this.data.line_color;

    for(var i=0;i<indexs.length;i++){
      if(indexs[i]>-1 && indexs[i]<data.length){
        data[indexs[i]] = values[i]
      }
    }

    this.setData({
      line_color: data
    })
  },
  onReady: function () {
    var that = this
    setInterval(function() {
      var len = that.data.line_color.length
      var i = that.data.count%len
      var pre_i = i-1
      if(pre_i==-1){
        pre_i = len-1
      }
      if(i>=3){
        that.change_color([i-3,i-2,i-1,i,i+1,i+2],
          ["rgba(0,0,0,0)",
          "linear-gradient(to left, rgba(0,0,0,0) 20%, #069acf 50%, rgba(0,0,0,0) 80%)",
          "linear-gradient(to left, rgba(0,0,0,0) 10%, #069acf 50%, rgba(0,0,0,0) 90%)",
          "linear-gradient(to left,rgba(0,0,0,0), #069acf, rgba(0,0,0,0))",
          "linear-gradient(to left, rgba(0,0,0,0) 10%, #069acf 50%, rgba(0,0,0,0) 90%)",
          "linear-gradient(to left, rgba(0,0,0,0) 20%, #069acf 50%, rgba(0,0,0,0) 80%)",])
      }
      else{
        that.change_color([pre_i-2, pre_i-1, pre_i,i],[
        "rgba(0,0,0,0)",
        "rgba(0,0,0,0)",
        "rgba(0,0,0,0)",
        "linear-gradient(to left,rgba(0,0,0,0), #069acf, rgba(0,0,0,0));"] )
      }

      that.setData({
        count:i+1
      })

      console.log('doSomething')
   }, 50);
  },
  cancelBtn () {
    this.setData({show: false})
  },
  saveImg () {
    var that = this
    wx.showLoading({
      title: "正在识别，请稍候"
    })
    wx.setStorageSync("res_imgurl", that.data.src);
    wx.uploadFile({
      url:'https://www.gyberpunk.top/predict_wechat/',
      filePath: that.data.src, //图片地址
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        var re = JSON.parse(res.data)
        
        wx.setStorageSync("res_data", re);
        wx;wx.navigateTo({
          url: '../info/info',
        })
        // wx.showModal({
        //   title: '识别结果',
        //   content: re['name']+":"+re['desc'],
        //   showCancel: false,
        //   success: function (res) {
        //     that.setData({
        //       show: false
        //     })
        //    }
        // })
      },
      fail: function (res) {
        console.log(res)
        wx.hideToast();
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败:'+res,
          showCancel: false,
          success: function (res) {
            that.setData({
              show: false
            })
            // wx.navigateTo({
            //   url: '/pages/result/index'
            // })
           }
        })
      }
    })
  },
  
  takePhoto() {
    const ctx = wx.createCameraContext()
    const listener = ctx.onCameraFrame((frame) => {
      console.log(frame)
    })
    ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          show: true
        })
        listener.stop({
          success: (res) => {
            console.log(res)
          },
          fail: (err) =>{
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },

  chooseImg(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album',],
      success (res) {
        that.setData({
          src: res.tempFilePaths[0],
          show: true
        })
      }
    })
  },
})
