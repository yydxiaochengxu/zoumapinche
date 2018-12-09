
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        password:'',
        look_password:false,//查看密码
        showloading: true,
        //提示信息
        alertmessage: {
            alertinfo: "",
            tem_showalert: false,
        },

        imgarr: [],
    },

    vo: {
        whethergetcode: true,
        timer: null,
    },

    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    testphone: function (phone) {
        let that=this;
        if (/^1[34578]\d{9}$/.test(phone)) {
            return true;
        }
        app.vo.template.tem_smalert.smalert_js(that, '请输入正确手机号')
        return false;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.pagejump();
        this.setData({ showloading: false });
    },

    //判断登录
    pagejump:function(){
        let that = this;
        app.getwxloginInfo_js(wxloginInfo => {
            if (wxloginInfo.verifyPhone === 1) {
                wx.switchTab({
                    url: '../order/order'
                })
            }
            that.setData({ showloading: false });
        })
    },

    //用户名
    writeUserName_Fn:function(e){
        let username = e.detail.value;
        this.setData({ username });
    },

    //密码
    writePassword_Fn:function(e){
        let password = e.detail.value;
        this.setData({ password });
    },
    //查看密码
    lookPassword_Fn:function(){
        this.setData({look_password:!this.data.look_password})
    },
    //登录
    login_Fn: function () {
        wx.navigateTo({
            url: '../pathList/pathList',
        })
        return false;
        let that = this;
        let { username, password } = this.data;
        if (username.length==0) {
            app.vo.template.tem_smalert.smalert_js(that, '请输入用户名');
            return false;
        };
        if (password.length == 0) {
            app.vo.template.tem_smalert.smalert_js(that, '请输入密码');
            return false;
        }
        // //校验验证码
        // app.getwxloginInfo_js(wxloginInfo => {
        //     let time = new Date().getTime();
        //     let getkeyobj = {
        //         userId: wxloginInfo.userId,
        //         msession: wxloginInfo.msession,
        //         time
        //     };
        //     let key = app.getKey_js(getkeyobj);
        //     let requestobj = {
        //         url: app.vo.tool.urlobj.checkcode,
        //         data: {
        //             code,
        //             userId: wxloginInfo.userId,
        //             time,
        //             key,
        //         }
        //     };
        //     app.vo.tool.request_js(requestobj)
        //         .then(backdata => {
        //             if (backdata.code == 1) {
        //                 app.globalData.wxloginInfo=backdata.data;
                        wx.switchTab({
                            url: '../index/index'
                        })
        //             } else {
        //                 app.alert_Fn(that, backdata);
        //             }
        //         })
        //         .catch(err => {
        //             console.error(err)
        //         })
        // })
    },


    //填写电话号码
    writePhone_Fn: function (e) {
        let value = e.detail.value;
        let phone = this.trim(value);
        this.setData({ phone });
    },
    // //获取验证码
    // getcode_Fn: function () {
    //     let that = this;
    //     let { phone } = that.data;
    //     let getcode = function (wxloginInfo) {
    //         let time = new Date().getTime();
    //         let getkeyobj = {
    //             userId: wxloginInfo.userId,
    //             msession: wxloginInfo.msession,
    //             time,
    //         };
    //         let key = app.getKey_js(getkeyobj);
    //         let requestobj = {
    //             url: app.vo.tool.urlobj.getcode,
    //             data: {
    //                 phone,
    //                 userId: wxloginInfo.userId,
    //                 time,
    //                 key,
    //             }
    //         };
    //         app.vo.tool.request_js(requestobj)
    //             .then(backdata => {
    //                 if (backdata.code == 1) {
    //                     app.vo.template.tem_smalert.smalert_js(that, '验证码已发送，请注意查收')
    //                 } else {
    //                     that.codestart_status();
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //                 that.codestart_status();
    //             })
    //     };
    //     if (phone.length === 11) {
    //         let t = that.testphone(phone);
    //         if (t) {
    //             if (that.vo.whethergetcode) {
    //                 //获取验证码
    //                 app.getwxloginInfo_js(wxloginInfo => {
    //                     that.subtime_js(60);
    //                     getcode(wxloginInfo);
    //                 })
    //             }
    //         }
    //     };
    // },
    // // 检查倒计时
    // pageloadCheckCode_js: function () {
    //     let time = wx.getStorageSync('bindphone_codetime')
    //     if (time) {
    //         this.subtime_js(time)
    //     }
    // },
    // // 初始状态
    // codestart_status: function () {
    //     let that = this;
    //     clearInterval(that.vo.timer);
    //     that.setData({ getcodetext: '获取验证码' });
    //     that.vo.whethergetcode = true;
    //     wx.removeStorageSync('bindphone_codetime');
    // },
    // // 倒计时
    // subtime_js: function (time) {
    //     let that = this;
    //     that.vo.whethergetcode = false;
    //     that.vo.timer = setInterval(() => {
    //         time--;
    //         if (time < 1) {
    //             that.codestart_status();
    //         } else {
    //             that.setData({ getcodetext: time + '秒' });
    //             wx.setStorage({
    //                 key: "bindphone_codetime",
    //                 data: time
    //             })
    //         }
    //     }, 1000)
    // },
    // //填写验证码
    // writeCode_Fn: function (e) {
    //     let value = e.detail.value;
    //     let code = this.trim(value);
    //     this.setData({ code });
    // },


    // //登录
    // login_Fn: function () {
    //     let that = this;
    //     let { phone, code } = this.data;
    //     let phonetest = this.testphone(phone);
    //     if (!phonetest) {
    //         return false
    //     };
    //     if (code.length == 0) {
    //         app.vo.template.tem_smalert.smalert_js(that, '请输入验证码');
    //         return false
    //     }
    //     // //校验验证码
    //     // app.getwxloginInfo_js(wxloginInfo => {
    //     //     let time = new Date().getTime();
    //     //     let getkeyobj = {
    //     //         userId: wxloginInfo.userId,
    //     //         msession: wxloginInfo.msession,
    //     //         time
    //     //     };
    //     //     let key = app.getKey_js(getkeyobj);
    //     //     let requestobj = {
    //     //         url: app.vo.tool.urlobj.checkcode,
    //     //         data: {
    //     //             code,
    //     //             userId: wxloginInfo.userId,
    //     //             time,
    //     //             key,
    //     //         }
    //     //     };
    //     //     app.vo.tool.request_js(requestobj)
    //     //         .then(backdata => {
    //     //             if (backdata.code == 1) {
    //     //                 app.globalData.wxloginInfo=backdata.data;
    //                     wx.switchTab({
    //                         url: '../order/order'
    //                     })
    //     //             } else {
    //     //                 app.alert_Fn(that, backdata);
    //     //             }
    //     //         })
    //     //         .catch(err => {
    //     //             console.error(err)
    //     //         })
    //     // })
    // },

    goLoginCode_Fn:function(){
        wx.navigateTo({
            url: `../logincode/logincode`
        })
    },
    goFindPassword_Fn:function(){
        wx.navigateTo({
            url: `../findpassword/findpassword`
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    //添加图片
    addImg_Fn() {
        let that = this;
        wx.chooseImage({
            success: function (res) {
                let imgarr = that.data.imgarr;
                let tempFilePaths = res.tempFilePaths;
                for (let i = 0, j = tempFilePaths.length; i < j; i++) {
                    if (imgarr.length < 9) {
                        imgarr.push(tempFilePaths[i]);
                    } else {
                        break;
                    }
                }
                that.setData({ imgarr });
            }
        })
    },
    //删除图片
    deleteImg_Fn(e) {
        let that = this;
        let imgarr = that.data.imgarr;
        let idx = e.currentTarget.dataset.index;
        imgarr.splice(idx, 1);
        that.setData({ imgarr });
    },
    //上传图片
    submitImg_Fn() {
        let that = this;
        let imgarr = that.data.imgarr;
        Promise.all(imgarr.map(item => {
            return that.updataimg_js(item)
        }))
            .then(data => {
                console.warn(data);
                console.error('所有图片上传成功')
            })
            .catch(error => {
                console.error('图片上传失败')
            })
    },
    updataimg_js: function (url) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                filePath: url,
                name: 'file',
                formData: {
                    'user': 'test'
                },
                success: function (res) {
                    var data = res.data;
                    console.log(data)
                    resolve(data);
                },
                fail: function (err) {
                    console.error('xxx')
                    reject(err)
                }
            })
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            // title: '自定义转发标题',
            path: '/pages/login/login',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})