// pages/pathDetail/pathDetail.js
const db = wx.cloud.database({
    env: 'place-138586',
})
let jsontab = db.collection('important-place');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        pathDetailArr: ['刘家垭村', '白果坪', '官仓村', '金龙村', '汪家堡村', '走马镇'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'add',
            // 传给云函数的参数
            data: {
                a: 1,
                b: 2,
            },
        })
            .then(res => {
                console.log(res.result) // 3
            })
            .catch(err => console.error(err))
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.insert_js();
        // this.getData_js();
        // this.if_js();
        // this.updata_js();
        this.remove_js();
    },

    //插入数据
    insert_js() {
        let location = {
            "lat": "29.81736",
            "lng": "110.42307",
            "type": "1",
            "address": "湖北省恩施土家族苗族自治州鹤峰县桑鹤街",
            "business": "",
            "citycode": 373,
            "ext": {
                "country": "中国",
                "country_code": 0,
                "country_code_iso": "CHN",
                "country_code_iso2": "CN",
                "province": "湖北省",
                "city": "恩施土家族苗族自治州",
                "city_level": 2,
                "district": "鹤峰县",
                "town": "",
                "adcode": "422828",
                "street": "桑鹤街",
                "street_number": "",
                "direction": "",
                "distance": ""
            }
        };
        jsontab.add({
            // data 字段表示需新增的 JSON 数据
            data: {
                description: "learn cloud database",
                due: new Date("2018-09-01"),
                tags: [
                    "cloud",
                    "database"
                ],
                location: new db.Geo.Point(Number(location.lng), Number(location.lat)),
                done: false
            }
        })
            .then(res => {
                console.warn(res)
            })
            .catch(err => {
                console.error(err)
            })
    },

    //读取数据
    getData_js() {
        //'W87d75L-scb2GnON'是插入数据函数成功后返回的
        jsontab.doc('W87d75L-scb2GnON').get().then(res => {
            // res.data 包含该记录的数据
            console.warn(res.data)
        })
    },

    // 条件查询
    if_js() {
        const _ = db.command;
        jsontab.where(_.or([
            {
                description: _.eq('learn cloud database')
            },
            {
                done: _.eq(false)
            }
        ]))
            .get().then(res => {
                // res.data 包含该记录的数据
                console.log('条件查询')
                console.warn(res.data)
            })
    },

    //更新数据
    updata_js() {
        //局部更新
        jsontab.doc('W87d75L-scb2GnON').update({
            // data 传入需要局部更新的数据
            data: {
                // 表示将 done 字段置为 true
                done: true
            },
            success: function (res) {
                console.log(res.data)
            }
        })
        //替换更新
        jsontab.doc('W87d75L-scb2GnON').set({
            data: {
                description: "learn cloud database22",
                due: new Date("2018-09-01"),
                tags: [
                    "cloud",
                    "database"
                ],
                style: {
                    color: "skyblue"
                },
                // 位置（113°E，23°N）
                location: new db.Geo.Point(113, 23),
                done: false
            },
            success: function (res) {
                console.log(res.data)
            }
        })
    },

    // 删除数据
    remove_js() {
        jsontab.doc('W87d75L-scb2GnON').remove({
            success: function (res) {
                console.log('删除数据')
                console.log(res.data)
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    goMapPath_Fn: function () {
        wx.navigateTo({
            url: '../mapPath/mapPath',
        })
    },

    callHe_Fn: function () {
        wx.makePhoneCall({
            phoneNumber: '15927661341'
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