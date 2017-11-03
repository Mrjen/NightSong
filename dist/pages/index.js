"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxRequest = require('./../comm/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

var _api = require('./../comm/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "一夜一曲",
      navigationBarBackgroundColor: "#21282e",
      navigationBarTextStyle: "#fff",
      disableScroll: true
    }, _this.data = {
      bgList: [{
        image: "https://qncdn.playonwechat.com/NightSong/night_bg01.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg01_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg01_light.png",
        id: 0
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg02.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg02_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg02_light.png",
        id: 1
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg03.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg03_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg03_light.png",
        id: 2
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg04.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg04_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg04_light.png",
        id: 3
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg05.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg05_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg05_light.png",
        id: 4
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg06.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg06_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg06_light.png",
        id: 5
      }, {
        image: "https://qncdn.playonwechat.com/NightSong/night_bg07.png",
        icon: "https://qncdn.playonwechat.com/NightSong/night_bg07_hearts.png",
        light: "https://qncdn.playonwechat.com/NightSong/night_bg07_light.png",
        id: 6
      }],
      today: 1, //今天是星期几
      todayWeek: "", //星期几英文
      currentLycHeight: 0, //当前歌词滚动高度
      musicStatus: true,
      cycleSong: 1, //歌曲循环 1 列表循环  0 单曲循环
      song: {},
      lycriesStatus: 1 //歌词默认显示
    }, _this.components = {}, _this.methods = {
      audioPlay: function audioPlay() {
        this.audioCtx.play();
        this.musicStatus = !this.musicStatus;
        this.$apply();
      },

      audioPause: function audioPause() {
        wx.pauseBackgroundAudio();
        this.musicStatus = !this.musicStatus;
        this.$apply();
      },

      // 收藏歌曲
      collectSong: function collectSong(index) {
        var that = this;
        wx.myRequest({ id: this.song.id }, _api2.default.Collect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song.collected;
            console.log(isCollect, "0000000");
            isCollect = isCollect == 1 ? 0 : 1;
            that.song.collected = isCollect;
            that.$apply();
          }
        });
      },

      // 取消收藏
      discollectSong: function discollectSong() {
        var that = this;
        wx.myRequest({ id: this.song.id }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song.collected;
            console.log(isCollect, "0000000");
            isCollect = isCollect == 1 ? 0 : 1;
            that.song.collected = isCollect;
            that.$apply();
          }
        });
      },

      // 是否单曲循环
      cycleSont: function cycleSont() {
        this.cycleSong = this.cycleSong == 1 ? 0 : 1;
        this.$apply();
        wx.setStorageSync('cycleSong', this.cycleSong);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onShow",
    value: function onShow() {
      console.log("show");
      var cycleSong = wx.getStorageSync('cycleSong');
      if (cycleSong) {
        this.cycleSong = cycleSong;
        this.$apply();
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      console.log("onLoad");
      var that = this;
      //  音乐
      function getHeight(params, view) {
        var currentLycHeight = 0;
        var lycriesStatus = view.lycriesStatus;
        var _height = 0;
        var data = {};
        var time = setInterval(function () {
          // console.log(_height);
          if (_height < params) {
            _height += 2;
            lycriesStatus = 1;
          } else {
            clearInterval(time);
            _height = params;
            lycriesStatus = 0;
          }
          view.currentLycHeight = _height;
          view.lycriesStatus = lycriesStatus;
          view.$apply();
        }, 30);
      }

      // 获取今天是星期几
      var mydate = new Date();
      var today = mydate.getDay();
      console.log(today);
      this.today = today;
      var todayWeek = "";
      if (this.today == "0") {
        todayWeek = "Sunday";
      } else if (this.today == "1") {
        todayWeek = "Monday";
      } else if (this.today == "2") {
        todayWeek = "Tuesday";
      } else if (this.today == "3") {
        todayWeek = "Wednesday";
      } else if (this.today == "4") {
        todayWeek = "Thursday";
      } else if (this.today == "5") {
        todayWeek = "Friday";
      } else if (this.today == "6") {
        todayWeek = "Saturday";
      }
      wx.setStorageSync("todayWeek", todayWeek);
      this.todayWeek = todayWeek;
      this.$apply();

      // 获取首页数据   播放首页音乐
      wx.myRequest({}, _api2.default.Home, function (res) {
        that.song = res.data;
        that.$apply();
        wx.playBackgroundAudio({
          dataUrl: res.data.audio,
          title: res.data.name,
          coverImgUrl: ""
        });

        wx.onBackgroundAudioStop(function () {
          var song = that.song;
          wx.playBackgroundAudio({
            dataUrl: song.audio,
            title: song.name,
            coverImgUrl: ""
          });
        });

        wx.setStorageSync("currentSong", res.data);

        //  控制歌词
        var lycLength = that.song.word.length; //获取歌词有多少句
        var lycHeight = lycLength * 40; //获取歌词容器的高度
        getHeight(lycHeight, that);
        that.song = res.data;
        that.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJiZ0xpc3QiLCJpbWFnZSIsImljb24iLCJsaWdodCIsImlkIiwidG9kYXkiLCJ0b2RheVdlZWsiLCJjdXJyZW50THljSGVpZ2h0IiwibXVzaWNTdGF0dXMiLCJjeWNsZVNvbmciLCJzb25nIiwibHljcmllc1N0YXR1cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYXVkaW9QbGF5IiwiYXVkaW9DdHgiLCJwbGF5IiwiJGFwcGx5IiwiYXVkaW9QYXVzZSIsInd4IiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjb2xsZWN0U29uZyIsImluZGV4IiwidGhhdCIsIm15UmVxdWVzdCIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsImlzQ29sbGVjdCIsImNvbGxlY3RlZCIsImRpc2NvbGxlY3RTb25nIiwiZGlzQ29sbGVjdCIsImN5Y2xlU29udCIsInNldFN0b3JhZ2VTeW5jIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRIZWlnaHQiLCJwYXJhbXMiLCJ2aWV3IiwiX2hlaWdodCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJteWRhdGUiLCJEYXRlIiwiZ2V0RGF5IiwiSG9tZSIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwiYXVkaW8iLCJ0aXRsZSIsIm5hbWUiLCJjb3ZlckltZ1VybCIsIm9uQmFja2dyb3VuZEF1ZGlvU3RvcCIsImx5Y0xlbmd0aCIsIndvcmQiLCJsZW5ndGgiLCJseWNIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7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TCxHQUFZZ0IsSUFBSTNCLElBQWhCO0FBQ0F3QixhQUFLTixNQUFMO0FBQ0FFLFdBQUc2QixtQkFBSCxDQUF1QjtBQUNyQkMsbUJBQVN2QixJQUFJM0IsSUFBSixDQUFTbUQsS0FERztBQUVyQkMsaUJBQU96QixJQUFJM0IsSUFBSixDQUFTcUQsSUFGSztBQUdyQkMsdUJBQWE7QUFIUSxTQUF2Qjs7QUFNQWxDLFdBQUdtQyxxQkFBSCxDQUF5QixZQUFVO0FBQy9CLGNBQUk1QyxPQUFPYSxLQUFLYixJQUFoQjtBQUNBUyxhQUFHNkIsbUJBQUgsQ0FBdUI7QUFDckJDLHFCQUFTdkMsS0FBS3dDLEtBRE87QUFFckJDLG1CQUFPekMsS0FBSzBDLElBRlM7QUFHckJDLHlCQUFhO0FBSFEsV0FBdkI7QUFLSCxTQVBEOztBQVNBbEMsV0FBR2dCLGNBQUgsQ0FBa0IsYUFBbEIsRUFBaUNULElBQUkzQixJQUFyQzs7QUFFQTtBQUNBLFlBQUl3RCxZQUFZaEMsS0FBS2IsSUFBTCxDQUFVOEMsSUFBVixDQUFlQyxNQUEvQixDQXJCdUMsQ0FxQkE7QUFDdkMsWUFBSUMsWUFBWUgsWUFBWSxFQUE1QixDQXRCdUMsQ0FzQlA7QUFDaENsQixrQkFBVXFCLFNBQVYsRUFBcUJuQyxJQUFyQjtBQUNBQSxhQUFLYixJQUFMLEdBQVlnQixJQUFJM0IsSUFBaEI7QUFDQXdCLGFBQUtOLE1BQUw7QUFDRCxPQTFCRDtBQTJCRDs7OztFQXhNZ0MsZUFBSzBDLEk7O2tCQUFuQmxFLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vY29tbS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5LiA5aSc5LiA5puyXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiLFxyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBiZ0xpc3Q6IFtcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMS5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMV9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAxX2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDIucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDJfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMl9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzLnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzX2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDNfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNC5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNF9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA0X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAzXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDUucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDVfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNV9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogNFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2LnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDZfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNy5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwN19oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA3X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiA2XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0b2RheTogMSwgLy/ku4rlpKnmmK/mmJ/mnJ/lh6BcclxuICAgIHRvZGF5V2VlazogXCJcIiwgLy/mmJ/mnJ/lh6Doi7HmlodcclxuICAgIGN1cnJlbnRMeWNIZWlnaHQ6IDAsIC8v5b2T5YmN5q2M6K+N5rua5Yqo6auY5bqmXHJcbiAgICBtdXNpY1N0YXR1czogdHJ1ZSxcclxuICAgIGN5Y2xlU29uZzogMSwgLy/mrYzmm7Llvqrnjq8gMSDliJfooajlvqrnjq8gIDAg5Y2V5puy5b6q546vXHJcbiAgICBzb25nOiB7fSxcclxuICAgIGx5Y3JpZXNTdGF0dXM6MSAvL+atjOivjem7mOiupOaYvuekulxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGF1ZGlvUGxheTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuYXVkaW9DdHgucGxheSgpO1xyXG4gICAgICB0aGlzLm11c2ljU3RhdHVzID0gIXRoaXMubXVzaWNTdGF0dXM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGF1ZGlvUGF1c2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICB0aGlzLm11c2ljU3RhdHVzID0gIXRoaXMubXVzaWNTdGF0dXM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaUtuiXj+atjOabslxyXG4gICAgY29sbGVjdFNvbmcoaW5kZXgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5teVJlcXVlc3QoeyBpZDogdGhpcy5zb25nLmlkIH0sIGFwaS5Db2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjIwMFwiKSB7XHJcbiAgICAgICAgICBsZXQgaXNDb2xsZWN0ID0gdGhhdC5zb25nLmNvbGxlY3RlZDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29sbGVjdCwgXCIwMDAwMDAwXCIpO1xyXG4gICAgICAgICAgaXNDb2xsZWN0ID0gaXNDb2xsZWN0ID09IDEgPyAwIDogMTtcclxuICAgICAgICAgIHRoYXQuc29uZy5jb2xsZWN0ZWQgPSBpc0NvbGxlY3Q7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICBkaXNjb2xsZWN0U29uZygpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5teVJlcXVlc3QoeyBpZDogdGhpcy5zb25nLmlkIH0sIGFwaS5kaXNDb2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjIwMFwiKSB7XHJcbiAgICAgICAgICBsZXQgaXNDb2xsZWN0ID0gdGhhdC5zb25nLmNvbGxlY3RlZDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29sbGVjdCwgXCIwMDAwMDAwXCIpO1xyXG4gICAgICAgICAgaXNDb2xsZWN0ID0gaXNDb2xsZWN0ID09IDEgPyAwIDogMTtcclxuICAgICAgICAgIHRoYXQuc29uZy5jb2xsZWN0ZWQgPSBpc0NvbGxlY3Q7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5piv5ZCm5Y2V5puy5b6q546vXHJcbiAgICBjeWNsZVNvbnQoKSB7XHJcbiAgICAgIHRoaXMuY3ljbGVTb25nID0gdGhpcy5jeWNsZVNvbmc9PTE/MDoxO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnY3ljbGVTb25nJyx0aGlzLmN5Y2xlU29uZylcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInNob3dcIik7XHJcbiAgICBsZXQgY3ljbGVTb25nID0gIHd4LmdldFN0b3JhZ2VTeW5jKCdjeWNsZVNvbmcnKTtcclxuICAgIGlmIChjeWNsZVNvbmcpIHtcclxuICAgICAgdGhpcy5jeWNsZVNvbmcgPSBjeWNsZVNvbmc7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uTG9hZFwiKTtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIC8vICDpn7PkuZBcclxuICAgIGZ1bmN0aW9uIGdldEhlaWdodChwYXJhbXMsIHZpZXcpIHtcclxuICAgICAgbGV0IGN1cnJlbnRMeWNIZWlnaHQgPSAwO1xyXG4gICAgICBsZXQgbHljcmllc1N0YXR1cyA9IHZpZXcubHljcmllc1N0YXR1cztcclxuICAgICAgbGV0IF9oZWlnaHQgPSAwO1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBsZXQgdGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfaGVpZ2h0KTtcclxuICAgICAgICBpZiAoX2hlaWdodCA8IHBhcmFtcykge1xyXG4gICAgICAgICAgX2hlaWdodCArPSAyO1xyXG4gICAgICAgICAgbHljcmllc1N0YXR1cyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZSk7XHJcbiAgICAgICAgICBfaGVpZ2h0ID0gcGFyYW1zO1xyXG4gICAgICAgICAgbHljcmllc1N0YXR1cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZXcuY3VycmVudEx5Y0hlaWdodCA9IF9oZWlnaHQ7XHJcbiAgICAgICAgdmlldy5seWNyaWVzU3RhdHVzID0gbHljcmllc1N0YXR1cztcclxuICAgICAgICB2aWV3LiRhcHBseSgpO1xyXG4gICAgICB9LDMwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bku4rlpKnmmK/mmJ/mnJ/lh6BcclxuICAgIGxldCBteWRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IHRvZGF5ID0gbXlkYXRlLmdldERheSgpO1xyXG4gICAgY29uc29sZS5sb2codG9kYXkpO1xyXG4gICAgdGhpcy50b2RheSA9IHRvZGF5O1xyXG4gICAgbGV0IHRvZGF5V2VlayA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy50b2RheSA9PSBcIjBcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlN1bmRheVwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiMVwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiTW9uZGF5XCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCIyXCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJUdWVzZGF5XCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCIzXCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJXZWRuZXNkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjRcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlRodXJzZGF5XCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCI1XCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJGcmlkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjZcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlNhdHVyZGF5XCI7XHJcbiAgICB9XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYyhcInRvZGF5V2Vla1wiLCB0b2RheVdlZWspO1xyXG4gICAgdGhpcy50b2RheVdlZWsgPSB0b2RheVdlZWs7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG5cclxuICAgIC8vIOiOt+WPlummlumhteaVsOaNriAgIOaSreaUvummlumhtemfs+S5kFxyXG4gICAgd3gubXlSZXF1ZXN0KHt9LCBhcGkuSG9tZSwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICBkYXRhVXJsOiByZXMuZGF0YS5hdWRpbyxcclxuICAgICAgICB0aXRsZTogcmVzLmRhdGEubmFtZSxcclxuICAgICAgICBjb3ZlckltZ1VybDogXCJcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHd4Lm9uQmFja2dyb3VuZEF1ZGlvU3RvcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgbGV0IHNvbmcgPSB0aGF0LnNvbmc7XHJcbiAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgZGF0YVVybDogc29uZy5hdWRpbyxcclxuICAgICAgICAgICAgdGl0bGU6IHNvbmcubmFtZSxcclxuICAgICAgICAgICAgY292ZXJJbWdVcmw6IFwiXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiLCByZXMuZGF0YSk7XHJcblxyXG4gICAgICAvLyAg5o6n5Yi25q2M6K+NXHJcbiAgICAgIGxldCBseWNMZW5ndGggPSB0aGF0LnNvbmcud29yZC5sZW5ndGg7IC8v6I635Y+W5q2M6K+N5pyJ5aSa5bCR5Y+lXHJcbiAgICAgIGxldCBseWNIZWlnaHQgPSBseWNMZW5ndGggKiA0MDsgLy/ojrflj5bmrYzor43lrrnlmajnmoTpq5jluqZcclxuICAgICAgZ2V0SGVpZ2h0KGx5Y0hlaWdodCwgdGhhdCk7XHJcbiAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==