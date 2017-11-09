wx.myRequest = function(data = {},url,cb) {
    const cookie = wx.getStorageSync('cookie');
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    console.log("第三方平台数据默认350",extConfig);
    data.kid = extConfig.kid?extConfig.kid:'451';
    const requestOption = {
        url: url,
        data: data,
        method:data.method?data.method:"get",
        header: {
            Cookie: ''
        },
        success: function(res) {
            if (res.header['Set-Cookie']) {
                var regexp = /(PHPSESSID=.*);/;
                var cookie = res.header['Set-Cookie'].match(regexp)[1];
                wx.setStorageSync('cookie', cookie)
            }
            typeof cb == 'function' && cb(res);
        }
    };
    if (cookie) {
        requestOption.header.Cookie = cookie;
    } else {
        delete requestOption.header.Cookie;
    }
    this.request(requestOption);
};
