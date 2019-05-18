//app.js
const tool = require('utils/tool.js');
App({
    vo:{
        tool
    },
    onLaunch: function () {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                env: 'place-138586',
                traceUser: true,
            })
        }

        if (wx.getUpdateManager) {
            this.updataFile();//更新小程序
        }
    },
    checkLogin:function(){
        console.log('添加内容')
        console.log('删除内容')
        console.log('修改内容')
        console.log('查看内容')
        console.log('add')
    },
    updataFile: function () {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false
            })
        })
    },

    //微信登录
    loginWX_js: function (cb) {
        let that = this;
        wx.login({
            success: res => {
                if (res.code) {
                    let requestobj = {
                        url: tool.urlobj.wxlogin,
                        data: {
                            code: res.code,
                            businessId: that.globalData.businessId
                        }
                    };
                    tool.request_js(requestobj)
                        .then(backdata => {
                            console.error(backdata);
                            if (backdata.code === 1) {
                                let wxloginInfo = backdata.data;
                                that.globalData.wxloginInfo = wxloginInfo;
                                typeof cb == 'function' && cb(wxloginInfo);
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
    },

    //获取微信登录信息
    getwxloginInfo_js: function (cb) {
        let wxloginInfo = this.globalData.wxloginInfo;
        if (wxloginInfo) {
            cb && cb(wxloginInfo);
        } else {
            this.loginWX_js(wxloginInfo2 => {
                cb && cb(wxloginInfo2);
            })
        }
    },

    //校验用户当前session_key是否有效
    checkSession_js: function (cb) {
        let that = this
        wx.checkSession({
            success: function () {
                //session_key 未过期，并且在本生命周期一直有效
                typeof (cb) == 'function' && cb()
            },
            fail: function () {
                // session_key 已经失效，需要重新执行登录流程
                that.loginWX_js(cb) //重新登录
            }
        })
    },

    /*获取授权
    power:'scope.record'... (参照scope列表)
    fn:授权成功后的回调函数
    rightaway:二次授权成功后是否立即执行回调函数fn,可传,默认不执行
    */
    getpower_js: function (power, fn, rightaway) {
        wx.getSetting({
            success: res => {
                if (res.authSetting[power]) {
                    fn();
                } else {
                    wx.authorize({
                        scope: power,
                        success: function () {
                            rightaway && fn()
                        },
                        fail: function () {
                            showModule_js();
                        }
                    })
                }
            }
        });
        function showModule_js() {
            wx.showModal({
                title: '提示',
                cancelText: '残忍拒绝',
                confirmText: '重新授权',
                content: '您拒绝了授权，如想正常使用功能，请重新授权！',
                success: function (res) {
                    if (res.confirm) {
                        openSetting_js();
                    } else if (res.cancel) {
                        console.log('残忍拒绝')
                    }
                }
            })
        };
        function openSetting_js() {
            wx.openSetting({
                success: (res) => {
                    if (res.authSetting[power]) {
                        rightaway && fn();
                    } else {
                        showModule_js();
                    }
                }
            })
        };
    },


    //获取userInfo
    getUserInfo_js: function (pagethis, cb) {
        let that = this;
        let userInfo = that.globalData.userInfo;
        if (userInfo) {
            typeof (cb) == 'function' && cb(userInfo);
        } else {
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success: function (res) {
                                that.loginMyServer_js(res, cb)
                            }
                        })
                    } else {
                        //打开组件发起授权
                        pagethis.getuserinfo_com = pagethis.selectComponent("#getuserinfo_com");
                        pagethis.getuserinfo_com.show(cb);
                    }
                }
            })
        }
    },

    //登录到我们服务器（用户信息）
    loginMyServer_js: function (userInfo, cb) {
        let that = this;
        // console.warn(userInfo)
        //...
        that.globalData.userInfo = userInfo;
        cb && cb(userInfo)
    },

    //获取key
    getKey_js: function ({ userId, msession, time }) {
        let composekey = this.globalData.composekey;
        return md5.MD5(userId + msession + composekey + time);
    },

    //获取系统信息
    getSystemInfo_js: function (cb) {
        let that = this;
        let systemInfo = that.globalData.systemInfo;
        if (systemInfo) {
            cb && cb(systemInfo);
        } else {
            wx.getSystemInfo({
                success: function (res) {
                    that.globalData.systemInfo = res;
                    cb && cb(res)
                }
            })
        }
    },

    globalData: {
        wxloginInfo: null,
        userInfo: null,
        systemInfo: null,//系统信息
        composekey: 'shangliu',
        businessId: 1,
    }
})
