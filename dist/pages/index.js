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

var _music = require('./../comm/music.js');

var _music2 = _interopRequireDefault(_music);

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
      lycriesStatus: 1, //歌词默认显示,
      navto: 1 //是否跳转启动页 1跳转 0 不跳转
    }, _this.components = {}, _this.methods = {
      audioPlay: function audioPlay() {
        var that = this;
        var song = that.song;
        wx.playBackgroundAudio({
          dataUrl: song.audio,
          title: song.name,
          coverImgUrl: ''
        });
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

        wx.myRequest({ id: that.song[0].id }, _api2.default.Collect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song[0].collected;
            console.log(isCollect, "0000000");
            isCollect = isCollect == 1 ? 0 : 1;
            that.song[0].collected = isCollect;
            that.$apply();
          }
        });
      },

      // 取消收藏
      discollectSong: function discollectSong() {
        var that = this;
        wx.myRequest({ id: that.song[0].id }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song[0].collected;
            console.log(isCollect, "0000000");
            isCollect = isCollect == 1 ? 0 : 1;
            that.song[0].collected = isCollect;
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
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          var status = res.status;
          var dataUrl = res.dataUrl;
          var currentPosition = res.currentPosition;
          var duration = res.duration;
          var downloadPercent = res.downloadPercent;
        }
      });
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
      if (wx.getStorageSync("navto")) {
        setTimeout(function () {
          wx.navigateTo({
            url: '../pages/adpage'
          });
        }, 20);
        wx.setStorageSync('navto', 1);
      }

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

        _music2.default.play(that.song, that.song, false, 0);
        wx.setStorageSync('oldList', that.song);
        wx.setStorageSync("currentSong", res.data);

        //  控制歌词
        var lycLength = that.song[0].word.length; //获取歌词有多少句
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJiZ0xpc3QiLCJpbWFnZSIsImljb24iLCJsaWdodCIsImlkIiwidG9kYXkiLCJ0b2RheVdlZWsiLCJjdXJyZW50THljSGVpZ2h0IiwibXVzaWNTdGF0dXMiLCJjeWNsZVNvbmciLCJzb25nIiwibHljcmllc1N0YXR1cyIsIm5hdnRvIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJhdWRpb1BsYXkiLCJ0aGF0Iiwid3giLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsImF1ZGlvIiwidGl0bGUiLCJuYW1lIiwiY292ZXJJbWdVcmwiLCIkYXBwbHkiLCJhdWRpb1BhdXNlIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjb2xsZWN0U29uZyIsImluZGV4IiwibXlSZXF1ZXN0IiwiQ29sbGVjdCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwiaXNDb2xsZWN0IiwiY29sbGVjdGVkIiwiZGlzY29sbGVjdFNvbmciLCJkaXNDb2xsZWN0IiwiY3ljbGVTb250Iiwic2V0U3RvcmFnZVN5bmMiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJzdGF0dXMiLCJjdXJyZW50UG9zaXRpb24iLCJkdXJhdGlvbiIsImRvd25sb2FkUGVyY2VudCIsImdldFN0b3JhZ2VTeW5jIiwic2V0VGltZW91dCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRIZWlnaHQiLCJwYXJhbXMiLCJ2aWV3IiwiX2hlaWdodCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJteWRhdGUiLCJEYXRlIiwiZ2V0RGF5IiwiSG9tZSIsInBsYXkiLCJseWNMZW5ndGgiLCJ3b3Jk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S0FBS04sSUFBakM7QUFDQU8sV0FBR3VCLGNBQUgsQ0FBa0IsYUFBbEIsRUFBaUNULElBQUloQyxJQUFyQzs7QUFFQTtBQUNBLFlBQUlnRSxZQUFZL0MsS0FBS04sSUFBTCxDQUFVLENBQVYsRUFBYXNELElBQWIsQ0FBa0JDLE1BQWxDLENBVHVDLENBU0c7QUFDMUMsWUFBSUMsWUFBWUgsWUFBWSxFQUE1QixDQVZ1QyxDQVVQO0FBQ2hDWixrQkFBVWUsU0FBVixFQUFxQmxELElBQXJCO0FBQ0FBLGFBQUtOLElBQUwsR0FBWXFCLElBQUloQyxJQUFoQjtBQUNBaUIsYUFBS1EsTUFBTDtBQUNELE9BZEQ7QUFlRDs7OztFQXZOZ0MsZUFBSzJDLEk7O2tCQUFuQjFFLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vY29tbS9hcGlcIjtcclxuaW1wb3J0IHBsYXlNdXNpYyBmcm9tICcuLi9jb21tL211c2ljJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLkuIDlpJzkuIDmm7JcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxMjgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGJnTGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAxLnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAxX2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDFfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDBcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMi5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMl9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAyX2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDMucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDNfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwM19saWdodC5wbmdcIixcclxuICAgICAgICBpZDogMlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA0LnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA0X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDRfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDNcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNS5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNV9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA1X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiA0XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDYucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDZfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNl9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogNVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA3LnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA3X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDdfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDZcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHRvZGF5OiAxLCAvL+S7iuWkqeaYr+aYn+acn+WHoFxyXG4gICAgdG9kYXlXZWVrOiBcIlwiLCAvL+aYn+acn+WHoOiLseaWh1xyXG4gICAgY3VycmVudEx5Y0hlaWdodDogMCwgLy/lvZPliY3mrYzor43mu5rliqjpq5jluqZcclxuICAgIG11c2ljU3RhdHVzOiB0cnVlLFxyXG4gICAgY3ljbGVTb25nOiAxLCAvL+atjOabsuW+queOryAxIOWIl+ihqOW+queOryAgMCDljZXmm7Llvqrnjq9cclxuICAgIHNvbmc6IHt9LFxyXG4gICAgbHljcmllc1N0YXR1czoxLCAvL+atjOivjem7mOiupOaYvuekuixcclxuICAgIG5hdnRvOiAxICAvL+aYr+WQpui3s+i9rOWQr+WKqOmhtSAx6Lez6L2sIDAg5LiN6Lez6L2sXHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgYXVkaW9QbGF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgc29uZyA9IHRoYXQuc29uZztcclxuICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgZGF0YVVybDogc29uZy5hdWRpbyxcclxuICAgICAgICB0aXRsZTogc29uZy5uYW1lLFxyXG4gICAgICAgIGNvdmVySW1nVXJsOiAnJ1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLm11c2ljU3RhdHVzID0gIXRoaXMubXVzaWNTdGF0dXM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGF1ZGlvUGF1c2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICB0aGlzLm11c2ljU3RhdHVzID0gIXRoaXMubXVzaWNTdGF0dXM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaUtuiXj+atjOabslxyXG4gICAgY29sbGVjdFNvbmcoaW5kZXgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6IHRoYXQuc29uZ1swXS5pZCB9LCBhcGkuQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgbGV0IGlzQ29sbGVjdCA9IHRoYXQuc29uZ1swXS5jb2xsZWN0ZWQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbGxlY3QsIFwiMDAwMDAwMFwiKTtcclxuICAgICAgICAgIGlzQ29sbGVjdCA9IGlzQ29sbGVjdCA9PSAxID8gMCA6IDE7XHJcbiAgICAgICAgICB0aGF0LnNvbmdbMF0uY29sbGVjdGVkID0gaXNDb2xsZWN0O1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOWPlua2iOaUtuiXj1xyXG4gICAgZGlzY29sbGVjdFNvbmcoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6IHRoYXQuc29uZ1swXS5pZCB9LCBhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgbGV0IGlzQ29sbGVjdCA9IHRoYXQuc29uZ1swXS5jb2xsZWN0ZWQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbGxlY3QsIFwiMDAwMDAwMFwiKTtcclxuICAgICAgICAgIGlzQ29sbGVjdCA9IGlzQ29sbGVjdCA9PSAxID8gMCA6IDE7XHJcbiAgICAgICAgICB0aGF0LnNvbmdbMF0uY29sbGVjdGVkID0gaXNDb2xsZWN0O1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOaYr+WQpuWNleabsuW+queOr1xyXG4gICAgY3ljbGVTb250KCkge1xyXG4gICAgICB0aGlzLmN5Y2xlU29uZyA9IHRoaXMuY3ljbGVTb25nPT0xPzA6MTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2N5Y2xlU29uZycsdGhpcy5jeWNsZVNvbmcpXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25TaG93KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzaG93XCIpO1xyXG4gICAgd3guZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzLnN0YXR1c1xyXG4gICAgICAgICAgICB2YXIgZGF0YVVybCA9IHJlcy5kYXRhVXJsXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSByZXMuY3VycmVudFBvc2l0aW9uXHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHJlcy5kdXJhdGlvblxyXG4gICAgICAgICAgICB2YXIgZG93bmxvYWRQZXJjZW50ID0gcmVzLmRvd25sb2FkUGVyY2VudFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGV0IGN5Y2xlU29uZyA9ICB3eC5nZXRTdG9yYWdlU3luYygnY3ljbGVTb25nJyk7XHJcbiAgICBpZiAoY3ljbGVTb25nKSB7XHJcbiAgICAgIHRoaXMuY3ljbGVTb25nID0gY3ljbGVTb25nO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJvbkxvYWRcIik7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyAg6Z+z5LmQXHJcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoXCJuYXZ0b1wiKSkge1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFnZXMvYWRwYWdlJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LDIwKVxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ25hdnRvJywxKVxyXG4gICAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KHBhcmFtcywgdmlldykge1xyXG4gICAgICBsZXQgY3VycmVudEx5Y0hlaWdodCA9IDA7XHJcbiAgICAgIGxldCBseWNyaWVzU3RhdHVzID0gdmlldy5seWNyaWVzU3RhdHVzO1xyXG4gICAgICBsZXQgX2hlaWdodCA9IDA7XHJcbiAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgIGxldCB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9oZWlnaHQpO1xyXG4gICAgICAgIGlmIChfaGVpZ2h0IDwgcGFyYW1zKSB7XHJcbiAgICAgICAgICBfaGVpZ2h0ICs9IDI7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lKTtcclxuICAgICAgICAgIF9oZWlnaHQgPSBwYXJhbXM7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlldy5jdXJyZW50THljSGVpZ2h0ID0gX2hlaWdodDtcclxuICAgICAgICB2aWV3Lmx5Y3JpZXNTdGF0dXMgPSBseWNyaWVzU3RhdHVzO1xyXG4gICAgICAgIHZpZXcuJGFwcGx5KCk7XHJcbiAgICAgIH0sMzApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluS7iuWkqeaYr+aYn+acn+WHoFxyXG4gICAgbGV0IG15ZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdG9kYXkgPSBteWRhdGUuZ2V0RGF5KCk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XHJcbiAgICB0aGlzLnRvZGF5ID0gdG9kYXk7XHJcbiAgICBsZXQgdG9kYXlXZWVrID0gXCJcIjtcclxuICAgIGlmICh0aGlzLnRvZGF5ID09IFwiMFwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiU3VuZGF5XCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCIxXCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJNb25kYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjJcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlR1ZXNkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjNcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIldlZG5lc2RheVwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNFwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiVGh1cnNkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjVcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIkZyaWRheVwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNlwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiU2F0dXJkYXlcIjtcclxuICAgIH1cclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidG9kYXlXZWVrXCIsIHRvZGF5V2Vlayk7XHJcbiAgICB0aGlzLnRvZGF5V2VlayA9IHRvZGF5V2VlaztcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcblxyXG4gICAgLy8g6I635Y+W6aaW6aG15pWw5o2uICAg5pKt5pS+6aaW6aG16Z+z5LmQXHJcbiAgICB3eC5teVJlcXVlc3Qoe30sIGFwaS5Ib21lLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIFxyXG4gICAgICBwbGF5TXVzaWMucGxheSh0aGF0LnNvbmcsdGhhdC5zb25nLGZhbHNlLDApXHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyx0aGF0LnNvbmcpO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcImN1cnJlbnRTb25nXCIsIHJlcy5kYXRhKTtcclxuXHJcbiAgICAgIC8vICDmjqfliLbmrYzor41cclxuICAgICAgbGV0IGx5Y0xlbmd0aCA9IHRoYXQuc29uZ1swXS53b3JkLmxlbmd0aDsgLy/ojrflj5bmrYzor43mnInlpJrlsJHlj6VcclxuICAgICAgbGV0IGx5Y0hlaWdodCA9IGx5Y0xlbmd0aCAqIDQwOyAvL+iOt+WPluatjOivjeWuueWZqOeahOmrmOW6plxyXG4gICAgICBnZXRIZWlnaHQobHljSGVpZ2h0LCB0aGF0KTtcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19