'use strict';

function getInfo(cb) {
    wx.getUserInfo({
        success: function success(res) {
            console.log('获取用户信息成功');
            typeof cb == 'function' && cb(res);
        },
        fail: function fail() {
            wx.showModal({
                title: '提示',
                content: '系统无法获取您的图像，是否去授权',
                success: function success(res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: function success(res) {}
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    });
}

module.exports = {
    getInfo: getInfo
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldFVzZXJJbmZvLmpzIl0sIm5hbWVzIjpbImdldEluZm8iLCJjYiIsInd4IiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJjYW5jZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVNBLE9BQVQsQ0FBaUJDLEVBQWpCLEVBQXFCO0FBQ2pCQyxPQUFHQyxXQUFILENBQWU7QUFDWEMsZUFEVyxtQkFDSEMsR0FERyxFQUNFO0FBQ1RDLG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBLG1CQUFPTixFQUFQLElBQWEsVUFBYixJQUEyQkEsR0FBR0ksR0FBSCxDQUEzQjtBQUNILFNBSlU7QUFLWEcsWUFMVyxrQkFLSjtBQUNITixlQUFHTyxTQUFILENBQWE7QUFDVEMsdUJBQU8sSUFERTtBQUVUQyx5QkFBUyxrQkFGQTtBQUdUUCx5QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLHdCQUFJQSxJQUFJTyxPQUFSLEVBQWlCO0FBQ2JWLDJCQUFHVyxXQUFILENBQWU7QUFDWFQscUNBQVMsaUJBQUNDLEdBQUQsRUFBUyxDQUNqQjtBQUZVLHlCQUFmO0FBSUgscUJBTEQsTUFLTyxJQUFJQSxJQUFJUyxNQUFSLEVBQWdCO0FBQ25CUixnQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNKO0FBWlEsYUFBYjtBQWNIO0FBcEJVLEtBQWY7QUFzQkg7O0FBRURRLE9BQU9DLE9BQVAsR0FBaUI7QUFDYmhCO0FBRGEsQ0FBakIiLCJmaWxlIjoiZ2V0VXNlckluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRJbmZvKGNiKSB7XHJcbiAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+S/oeaBr+aIkOWKnycpXHJcbiAgICAgICAgICAgIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nICYmIGNiKHJlcylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn57O757uf5peg5rOV6I635Y+W5oKo55qE5Zu+5YOP77yM5piv5ZCm5Y675o6I5p2DJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGdldEluZm9cclxufSJdfQ==