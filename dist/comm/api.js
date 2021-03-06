'use strict';

// 主域名
var apiUrl = "https://utest.playonwechat.com";

// 授权
var auth = apiUrl + '/music/App/registry';
// 首页数据
var Home = apiUrl + '/music/App/home';
// 收藏歌曲
var Collect = apiUrl + '/music/App/collection';
// 取消收藏
var disCollect = apiUrl + '/music/App/disCollection';
// 我的收藏
var myCollect = apiUrl + '/music/App/myCollection';
// 收听排行榜
var Ranking = apiUrl + '/music/App/ranking';
// 启动页广告
var statAd = apiUrl + '/music/App/startAd';
// 分享二维码
var shareCode = apiUrl + '/music/App/shareQrcode';
// 用户类型
var userType = apiUrl + '/music/App/updateUserType';
// 统计歌曲
var songPlayCount = apiUrl + '/music/App/play';

module.exports = {
    Home: Home,
    auth: auth,
    Collect: Collect,
    disCollect: disCollect,
    myCollect: myCollect,
    Ranking: Ranking,
    statAd: statAd,
    shareCode: shareCode,
    userType: userType,
    songPlayCount: songPlayCount
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJhcGlVcmwiLCJhdXRoIiwiSG9tZSIsIkNvbGxlY3QiLCJkaXNDb2xsZWN0IiwibXlDb2xsZWN0IiwiUmFua2luZyIsInN0YXRBZCIsInNoYXJlQ29kZSIsInVzZXJUeXBlIiwic29uZ1BsYXlDb3VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxTQUFTLGdDQUFmOztBQUVBO0FBQ0EsSUFBTUMsT0FBT0QsU0FBVSxxQkFBdkI7QUFDQTtBQUNBLElBQU1FLE9BQU9GLFNBQVMsaUJBQXRCO0FBQ0E7QUFDQSxJQUFNRyxVQUFVSCxTQUFTLHVCQUF6QjtBQUNBO0FBQ0EsSUFBTUksYUFBYUosU0FBUywwQkFBNUI7QUFDQTtBQUNBLElBQU1LLFlBQVlMLFNBQVMseUJBQTNCO0FBQ0E7QUFDQSxJQUFNTSxVQUFXTixTQUFTLG9CQUExQjtBQUNBO0FBQ0EsSUFBTU8sU0FBU1AsU0FBUyxvQkFBeEI7QUFDQTtBQUNBLElBQU1RLFlBQVlSLFNBQVMsd0JBQTNCO0FBQ0E7QUFDQSxJQUFNUyxXQUFXVCxTQUFTLDJCQUExQjtBQUNBO0FBQ0EsSUFBTVUsZ0JBQWdCVixTQUFTLGlCQUEvQjs7QUFFQVcsT0FBT0MsT0FBUCxHQUFpQjtBQUNiVixjQURhO0FBRWJELGNBRmE7QUFHYkUsb0JBSGE7QUFJYkMsMEJBSmE7QUFLYkMsd0JBTGE7QUFNYkMsb0JBTmE7QUFPYkMsa0JBUGE7QUFRYkMsd0JBUmE7QUFTYkMsc0JBVGE7QUFVYkM7QUFWYSxDQUFqQiIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkuLvln5/lkI1cclxuY29uc3QgYXBpVXJsID0gXCJodHRwczovL3V0ZXN0LnBsYXlvbndlY2hhdC5jb21cIlxyXG5cclxuLy8g5o6I5p2DXHJcbmNvbnN0IGF1dGggPSBhcGlVcmwgKyAgJy9tdXNpYy9BcHAvcmVnaXN0cnknXHJcbi8vIOmmlumhteaVsOaNrlxyXG5jb25zdCBIb21lID0gYXBpVXJsICsgJy9tdXNpYy9BcHAvaG9tZSdcclxuLy8g5pS26JeP5q2M5puyXHJcbmNvbnN0IENvbGxlY3QgPSBhcGlVcmwgKyAnL211c2ljL0FwcC9jb2xsZWN0aW9uJ1xyXG4vLyDlj5bmtojmlLbol49cclxuY29uc3QgZGlzQ29sbGVjdCA9IGFwaVVybCArICcvbXVzaWMvQXBwL2Rpc0NvbGxlY3Rpb24nICAgXHJcbi8vIOaIkeeahOaUtuiXj1xyXG5jb25zdCBteUNvbGxlY3QgPSBhcGlVcmwgKyAnL211c2ljL0FwcC9teUNvbGxlY3Rpb24nXHJcbi8vIOaUtuWQrOaOkuihjOamnFxyXG5jb25zdCBSYW5raW5nICA9IGFwaVVybCArICcvbXVzaWMvQXBwL3JhbmtpbmcnXHJcbi8vIOWQr+WKqOmhteW5v+WRilxyXG5jb25zdCBzdGF0QWQgPSBhcGlVcmwgKyAnL211c2ljL0FwcC9zdGFydEFkJ1xyXG4vLyDliIbkuqvkuoznu7TnoIFcclxuY29uc3Qgc2hhcmVDb2RlID0gYXBpVXJsICsgJy9tdXNpYy9BcHAvc2hhcmVRcmNvZGUnXHJcbi8vIOeUqOaIt+exu+Wei1xyXG5jb25zdCB1c2VyVHlwZSA9IGFwaVVybCArICcvbXVzaWMvQXBwL3VwZGF0ZVVzZXJUeXBlJ1xyXG4vLyDnu5/orqHmrYzmm7JcclxuY29uc3Qgc29uZ1BsYXlDb3VudCA9IGFwaVVybCArICcvbXVzaWMvQXBwL3BsYXknXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEhvbWUsXHJcbiAgICBhdXRoLFxyXG4gICAgQ29sbGVjdCxcclxuICAgIGRpc0NvbGxlY3QsXHJcbiAgICBteUNvbGxlY3QsXHJcbiAgICBSYW5raW5nLFxyXG4gICAgc3RhdEFkLFxyXG4gICAgc2hhcmVDb2RlLFxyXG4gICAgdXNlclR5cGUsXHJcbiAgICBzb25nUGxheUNvdW50XHJcbn0iXX0=