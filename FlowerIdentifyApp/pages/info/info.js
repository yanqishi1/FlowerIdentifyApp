
Page({
  data: {
    imgurl: "",
    itemData: []
  },
  onLoad: function() {
      var res_imgurl = wx.getStorageSync("res_imgurl");
      var res_data = wx.getStorageSync("res_data");
      var e_img_url = res_data['img_url']
      e_img_url = "https://www.gyberpunk.top/get_img?name="+e_img_url
      this.setData({
        imgurl: res_imgurl,
        desc:res_data['desc'],

        example_img:e_img_url,
        name:res_data['name']
      });      
  }
});