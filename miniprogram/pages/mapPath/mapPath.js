
// AppKey：2ae786ce8965b877f817c9820b01a3f5
// http://apis.juhe.cn/geo/
// http://apis.juhe.cn/geo/?key=您申请的APPKEY&lat=39.907314&lng=116.391279&type=1

let backjson = {
    "resultcode": "200",
    "reason": "Successed!",
    "result": {
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
    },
    "error_code": 0
}
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        polyline: [],
        markers: [
            {
                iconPath: "../../images/地图.png",
                id: 0,
                latitude: '29.81736',
                longitude: '110.42307',
                width: 30,
                height: 30,
                callout: {
                    content: '走马镇',
                    color: '#ffffff',
                    fontSize: 8,
                    padding: 2,
                    bgColor: '#FF5500',
                    borderRadius: 4,
                    display: 'ALWAYS',
                }
            }
        ],
        hiddencoverview: true,
        hiddenmeLocation: true,//隐藏我的
        circles: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // const db = wx.cloud.database({
        //     env: 'place'
        // })
        // console.log(db)
        // db.collection('important-place').doc('5bc59024f66fd8598c399c42').get().then(res => {
        //     // res.data 包含该记录的数据
        //     console.log(res.data)
        // }).catch(err=>{
        //     console.error(err)
        // })
        // const todos = db.collection('Important_place').where({
        //     publishInfo: {
        //         country: 'United States'
        //     }
        // }).get({
        //     success: function (res) {
        //         // 输出 [{ "title": "The Catcher in the Rye", ... }]
        //         console.log(res)
        //     }
        // })
    },

    // 经纬度 => 地名（ajax请求）
    // getloccationName_js(latitude,longitude){
    //     app.vo.tool.request_js(latitude,longitude)
    //         .then(backdata=>{
    //             console.error(backdata)
    //         })
    //         .catch(err=>{
    //             console.error(err)
    //         })
    // },

    // 地名 => 经纬度 （手动1）
    loccationLatLng_fn() {
        let that = this;
        console.log(111)
        that.MapContext.getCenterLocation({
            success(res) {
                console.error(res)
                let obj = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    color: '#000000',
                    radius: 8
                };
                that.data.circles[0] = obj;
                that.setData({ circles: that.data.circles, hiddencoverview: false })
            }
        })
    },
    vo: {
        polyline: [
            {
                points: [],
                color: '#FF5500', arrowLine: true, width: 2, dottedLine: true
            }
        ]
    },

    // 不记地名2
    takeLoccation2_fn: function () {
        let that = this;
        let points = that.vo.polyline[0].points;
        let [{ latitude, longitude }] = that.data.circles;
        let polylinelist = {};
        polylinelist.latitude = latitude;
        polylinelist.longitude = longitude;
        points.push(polylinelist);
        that.setData({ polyline: that.vo.polyline })
    },
    // 撤销3
    backonce_Fn: function () {
        let that = this;
        let points = that.vo.polyline[0].points;
        points.splice(polyline.length - 1, 1)
        that.setData({ polyline: that.vo.polyline })
    },

    // 记地名
    takeLoccation_Fn: function () { },

    // 完成4
    takeOver_Fn: function () {
        let that = this;
        wx.setStorage({
            key: 'mytake',
            data: that.vo.polyline,
            hiddencoverview: true
        })
    },
    // 划线
    polyline_Fn: function () {
        let that = this;
        let polyline = wx.getStorageSync('mytake')
        that.setData({ polyline })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.MapContext = wx.createMapContext('map');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    maptap_Fn: function (e) {
        console.error(e)
    },

    // 查看我的位置
    meLocation_Fn() {
        let that = this;
        that.controltap(() => {
            that.MapContext.moveToLocation()
            that.setData({ hiddenmeLocation: false })
            setTimeout(() => {
                that.setData({ hiddenmeLocation: true })
            }, 6000)
        })
    },

    controltap: function (cb) {
        let that = this;
        app.getpower_js('scope.userLocation', () => {
            wx.getLocation({
                type: 'gcj02',
                // altitude:true,
                success: function (res) {
                    console.error(res)
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    // that.setData({ latitude, longitude })
                    cb && cb();
                },
                fail: function () {
                    console.log("失败")
                }
            })
        }, true);
    },

    // 查看附近位置
    nearby_Fn: function () {
        let that = this;
        app.getpower_js('scope.userLocation', () => {
            wx.chooseLocation({
                success: function (res) {
                    console.log(res)
                    let markers_obj = {
                        iconPath: "../../images/地图.png",
                        id: 0,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        width: 30,
                        height: 30,
                        callout: {
                            content: res.name,
                            color: '#ffffff',
                            fontSize: 8,
                            padding: 2,
                            bgColor: '#FF5500',
                            borderRadius: 4,
                            display: 'ALWAYS',
                        }
                    }
                    let markers = that.data.markers;
                    markers.push(markers_obj);
                    that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        markers
                    })
                    console.error(markers);
                },
                fail: function () {
                    console.log("获取地址失败")
                }
            })
        }, true)
    },

    // // 划线
    // polyline_Fn() {
    //     let that = this;
    //     let markers = that.data.markers;
    //     let polyline = [
    //         {
    //             points: [],
    //             color: '#FF5500', arrowLine: true, width: 2, dottedLine: true
    //         }
    //     ];
    //     if (markers.length < 2) {
    //         wx.showModal({
    //             title: '温馨提示',
    //             content: '先查看附近位置，并选择'
    //         })
    //         return false;
    //     }
    //     for (let item of markers) {
    //         let obj = {};
    //         obj.latitude = item.latitude;
    //         obj.longitude = item.longitude;
    //         polyline[0].points.push(obj);
    //     }
    //     that.setData({ polyline })
    // },

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