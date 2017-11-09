function getInfo(cb) {
    wx.getUserInfo({
        success(res) {
            console.log('获取用户信息成功')
            typeof cb == 'function' && cb(res)
        },
        fail() {
            wx.showModal({
                title: '提示',
                content: '系统无法获取您的图像，是否去授权',
                success: function (res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (res) => {
                            }
                          })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    })
}

module.exports = {
    getInfo
}