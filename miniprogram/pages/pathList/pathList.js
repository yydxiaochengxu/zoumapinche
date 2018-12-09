// pages/pathList/pathList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperArr:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540277303565&di=08e89211baa2a72d710f8779b909516c&imgtype=0&src=http%3A%2F%2Fimage.bitautoimg.com%2Fwapimg-340-226%2Fappimage%2Fmedia%2F20180923%2Fw703_h468_b4f36a7edb594db096920ed33f132c27.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540827855&di=fb7fb0acc053276e226f8312ff6fda3d&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.bizhidaquan.com%2Fd%2Ffile%2Fqiche%2Fpinpai%2F2015-01-13%2Fb4409bcfd7e419170b680217a24f2211.jpg',    
            'http://01.imgmini.eastday.com/mobile/20180331/20180331230244_c1d3afde6a097acff10656cccc9e40da_1.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540828443&di=146576bf41d52ea3b24f66255bdf82ba&imgtype=jpg&er=1&src=http%3A%2F%2Fp3.pstatp.com%2Flarge%2Fba20000656ffb5ab612',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540232983574&di=784b46db4ee2f156d3f6b5542a7dc4e0&imgtype=0&src=http%3A%2F%2Fpic39.photophoto.cn%2F20160630%2F1155116641499129_b.jpg'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    goPathDetail_Fn: function () {
        wx.navigateTo({
            url: '../pathDetail/pathDetail',
        })
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

    }
})