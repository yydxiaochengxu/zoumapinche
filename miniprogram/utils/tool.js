const host = 'http://apis.juhe.cn/geo/';//开发域名
let urlobj = {
    wxlogin: `${host}/account/login`,//登录微信
    login: `${host}/account/updateUserInfo`,//登录我们
}
// 地图
let request_js = function (latitude,longitude) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: host,
            data:{
                key:'2ae786ce8965b877f817c9820b01a3f5',
                type:1,
                lat:latitude,
                lng:longitude
            },
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log('ajax成功')
                resolve(res.data)
            },
            fail: function (err) {
                console.log('ajax失败')
                reject(err)
            }
        })
    });
    return promise;
};

let MathTool = {
    // 四舍五入
    toFixed: function (num, len) {
        let temp = Math.pow(10, len);
        return Math.round(num * temp) / temp;
    },
    // 加
    add: function (num1, num2) {
        let pow1 = 0, pow2 = 0;
        try { pow1 = num1.toString().split('.')[1].length } catch (e) { pow1 = 0 };
        try { pow2 = num2.toString().split('.')[1].length } catch (e) { pow2 = 0 };
        let maxpow = pow1 > pow2 ? pow1 : pow2;
        let times = Math.pow(10, maxpow);
        return (num1 * times + num2 * times) / times;
    },
    // 减
    reduce: function (num1, num2) {
        let pow1 = 0, pow2 = 0;
        try { pow1 = num1.toString().split('.')[1].length } catch (e) { pow1 = 0 };
        try { pow2 = num2.toString().split('.')[1].length } catch (e) { pow2 = 0 };
        let maxpow = pow1 > pow2 ? pow1 : pow2;
        let times = Math.pow(10, maxpow);
        return (num1 * times - num2 * times) / times;
    },
    // 乘
    multiply: function (num1, num2) {
        let pow1 = 0, pow2 = 0;
        try { pow1 = num1.toString().split('.')[1].length } catch (e) { pow1 = 0 };
        try { pow2 = num2.toString().split('.')[1].length } catch (e) { pow2 = 0 };
        let maxnum1 = num1 * Math.pow(10, pow1);
        let maxnum2 = num2 * Math.pow(10, pow2);
        return maxnum1 * maxnum2 / Math.pow(10, pow1 + pow2);
    },
    // 除
    divide: function (num1, num2) {
        let pow1 = 0, pow2 = 0;
        try { pow1 = num1.toString().split('.')[1].length } catch (e) { pow1 = 0 };
        try { pow2 = num2.toString().split('.')[1].length } catch (e) { pow2 = 0 };
        let maxpow = pow1 > pow2 ? pow1 : pow2;
        let times = Math.pow(10, maxpow);
        return num1 * times / (num2 * times);
    },
}

let ajax = function () {
    let that = this;
    app.getwxloginInfo_js(wxloginInfo => {
        let time = new Date().getTime();
        let key = app.getKey_js({
            userId: wxloginInfo.userId,
            msession: wxloginInfo.msession,
            time,
        });
        let requestobj = {
            url: app.vo.tool.urlobj.urlurl,
            data: {
                userId: wxloginInfo.userId,
                time,
                key,
            }
        }
        app.vo.tool.request_js(requestobj)
            .catch(err => {
                console.error(err)
                app.vo.template.tem_smalert.smalert_js(that, '网络开小差了，请稍后再试');
                return Promise.reject('ajax_error');
            })
            .then(backdata => {
                console.warn(backdata)
                if (backdata.code == 1) {
                } else {
                    app.alert_Fn(that, backdata);
                }
            })
            .catch(err => {
                if (err === 'ajax_error') {
                    return false;
                } else {
                    console.log('then方法错误')
                };
            })
    })
}


let dateobj = {
    //时间戳转时间
    timestamp: function (timestamp) {
        if (timestamp) {
            function add0(m) {
                return m < 10 ? '0' + m : m
            }
            var time = new Date(timestamp);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
        }
    },
    //获取时间戳
    gettimestamp: function () {
        return new Date().getTime();
    },
    //秒转分钟mm:ss
    ss_mm: function (seconds) {
        return [
            parseInt(seconds / 60 / 60),
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
        ]
            .join(":")
            .replace(/\b(\d)\b/g, "0$1");
        // let h = parseInt(seconds / 60 / 60);
        // let m = parseInt(seconds / 60 % 60);
        // let s = parseInt(seconds % 60);
        // if (h > 0) {
        //     return [h, m, s].join(":").replace(/\b(\d)\b/g, "0$1");
        // }
        // if (h == 0 && m > 0) {
        //     return [m, s].join(":").replace(/\b(\d)\b/g, "0$1");
        // }
    },
    //分钟转秒
    mm_ss: function (time) {
        var s = '';
        if (time.indexOf(":") != -1) {
            let arr = time.split(':');
            if (arr.length == 3) {
                var hour = arr[0];
                var min = arr[1];
                var sec = arr[2];
                s = Number(hour * 3600) + Number(min * 60) + Number(sec);
                return s;
            };
            if (arr.length == 2) {
                var min = arr[0];
                var sec = arr[1];
                s = Number(min * 60) + Number(sec);
                return s;
            };
        } else {
            s = Number(time * 60);
            return s;
        }
    }
}


module.exports = {
    urlobj,
    request_js,
    dateobj,
    MathTool,
}