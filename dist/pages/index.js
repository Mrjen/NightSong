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
      lycriesStatus: 1 //歌词默认显示
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJiZ0xpc3QiLCJpbWFnZSIsImljb24iLCJsaWdodCIsImlkIiwidG9kYXkiLCJ0b2RheVdlZWsiLCJjdXJyZW50THljSGVpZ2h0IiwibXVzaWNTdGF0dXMiLCJjeWNsZVNvbmciLCJzb25nIiwibHljcmllc1N0YXR1cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYXVkaW9QbGF5IiwidGhhdCIsInd4IiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJhdWRpbyIsInRpdGxlIiwibmFtZSIsImNvdmVySW1nVXJsIiwiJGFwcGx5IiwiYXVkaW9QYXVzZSIsInBhdXNlQmFja2dyb3VuZEF1ZGlvIiwiY29sbGVjdFNvbmciLCJpbmRleCIsIm15UmVxdWVzdCIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsImlzQ29sbGVjdCIsImNvbGxlY3RlZCIsImRpc2NvbGxlY3RTb25nIiwiZGlzQ29sbGVjdCIsImN5Y2xlU29udCIsInNldFN0b3JhZ2VTeW5jIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRIZWlnaHQiLCJwYXJhbXMiLCJ2aWV3IiwiX2hlaWdodCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJteWRhdGUiLCJEYXRlIiwiZ2V0RGF5IiwiSG9tZSIsInBsYXkiLCJseWNMZW5ndGgiLCJ3b3JkIiwibGVuZ3RoIiwibHljSGVpZ2h0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJB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QjtBQUNBLFdBQUtpQixNQUFMOztBQUVBO0FBQ0FQLFNBQUdZLFNBQUgsQ0FBYSxFQUFiLEVBQWlCLGNBQUl1QixJQUFyQixFQUEyQixVQUFTckIsR0FBVCxFQUFjO0FBQ3ZDZixhQUFLTCxJQUFMLEdBQVlvQixJQUFJL0IsSUFBaEI7QUFDQWdCLGFBQUtRLE1BQUw7O0FBRUEsd0JBQVU2QixJQUFWLENBQWVyQyxLQUFLTCxJQUFwQixFQUF5QkssS0FBS0wsSUFBOUIsRUFBbUMsS0FBbkMsRUFBeUMsQ0FBekM7QUFDQU0sV0FBR3VCLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNEJ4QixLQUFLTCxJQUFqQztBQUNBTSxXQUFHdUIsY0FBSCxDQUFrQixhQUFsQixFQUFpQ1QsSUFBSS9CLElBQXJDOztBQUVBO0FBQ0EsWUFBSXNELFlBQVl0QyxLQUFLTCxJQUFMLENBQVUsQ0FBVixFQUFhNEMsSUFBYixDQUFrQkMsTUFBbEMsQ0FUdUMsQ0FTRztBQUMxQyxZQUFJQyxZQUFZSCxZQUFZLEVBQTVCLENBVnVDLENBVVA7QUFDaENaLGtCQUFVZSxTQUFWLEVBQXFCekMsSUFBckI7QUFDQUEsYUFBS0wsSUFBTCxHQUFZb0IsSUFBSS9CLElBQWhCO0FBQ0FnQixhQUFLUSxNQUFMO0FBQ0QsT0FkRDtBQWVEOzs7O0VBbE1nQyxlQUFLa0MsSTs7a0JBQW5CaEUsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgbXlSZXF1ZXN0IGZyb20gXCIuLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi9jb21tL2FwaVwiO1xyXG5pbXBvcnQgcGxheU11c2ljIGZyb20gJy4uL2NvbW0vbXVzaWMnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuS4gOWknOS4gOabslwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMjEyODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIixcclxuICAgIGRpc2FibGVTY3JvbGw6IHRydWVcclxuICB9O1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgYmdMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDEucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDFfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMV9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogMFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAyLnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAyX2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDJfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDFcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMy5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwM19oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzX2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAyXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDQucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDRfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNF9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogM1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA1LnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA1X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDVfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDRcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNi5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNl9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiA1XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDcucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDdfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwN19saWdodC5wbmdcIixcclxuICAgICAgICBpZDogNlxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgdG9kYXk6IDEsIC8v5LuK5aSp5piv5pif5pyf5YegXHJcbiAgICB0b2RheVdlZWs6IFwiXCIsIC8v5pif5pyf5Yeg6Iux5paHXHJcbiAgICBjdXJyZW50THljSGVpZ2h0OiAwLCAvL+W9k+WJjeatjOivjea7muWKqOmrmOW6plxyXG4gICAgbXVzaWNTdGF0dXM6IHRydWUsXHJcbiAgICBjeWNsZVNvbmc6IDEsIC8v5q2M5puy5b6q546vIDEg5YiX6KGo5b6q546vICAwIOWNleabsuW+queOr1xyXG4gICAgc29uZzoge30sXHJcbiAgICBseWNyaWVzU3RhdHVzOjEgLy/mrYzor43pu5jorqTmmL7npLpcclxuICB9O1xyXG5cclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhdWRpb1BsYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGxldCBzb25nID0gdGhhdC5zb25nO1xyXG4gICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICBkYXRhVXJsOiBzb25nLmF1ZGlvLFxyXG4gICAgICAgIHRpdGxlOiBzb25nLm5hbWUsXHJcbiAgICAgICAgY292ZXJJbWdVcmw6ICcnXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMubXVzaWNTdGF0dXMgPSAhdGhpcy5tdXNpY1N0YXR1cztcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXVkaW9QYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgIHRoaXMubXVzaWNTdGF0dXMgPSAhdGhpcy5tdXNpY1N0YXR1cztcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pS26JeP5q2M5puyXHJcbiAgICBjb2xsZWN0U29uZyhpbmRleCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4Lm15UmVxdWVzdCh7IGlkOiB0aGlzLnNvbmcuaWQgfSwgYXBpLkNvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMjAwXCIpIHtcclxuICAgICAgICAgIGxldCBpc0NvbGxlY3QgPSB0aGF0LnNvbmcuY29sbGVjdGVkO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb2xsZWN0LCBcIjAwMDAwMDBcIik7XHJcbiAgICAgICAgICBpc0NvbGxlY3QgPSBpc0NvbGxlY3QgPT0gMSA/IDAgOiAxO1xyXG4gICAgICAgICAgdGhhdC5zb25nLmNvbGxlY3RlZCA9IGlzQ29sbGVjdDtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDlj5bmtojmlLbol49cclxuICAgIGRpc2NvbGxlY3RTb25nKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4Lm15UmVxdWVzdCh7IGlkOiB0aGlzLnNvbmcuaWQgfSwgYXBpLmRpc0NvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMjAwXCIpIHtcclxuICAgICAgICAgIGxldCBpc0NvbGxlY3QgPSB0aGF0LnNvbmcuY29sbGVjdGVkO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb2xsZWN0LCBcIjAwMDAwMDBcIik7XHJcbiAgICAgICAgICBpc0NvbGxlY3QgPSBpc0NvbGxlY3QgPT0gMSA/IDAgOiAxO1xyXG4gICAgICAgICAgdGhhdC5zb25nLmNvbGxlY3RlZCA9IGlzQ29sbGVjdDtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDmmK/lkKbljZXmm7Llvqrnjq9cclxuICAgIGN5Y2xlU29udCgpIHtcclxuICAgICAgdGhpcy5jeWNsZVNvbmcgPSB0aGlzLmN5Y2xlU29uZz09MT8wOjE7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjeWNsZVNvbmcnLHRoaXMuY3ljbGVTb25nKVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwic2hvd1wiKTtcclxuICAgIGxldCBjeWNsZVNvbmcgPSAgd3guZ2V0U3RvcmFnZVN5bmMoJ2N5Y2xlU29uZycpO1xyXG4gICAgaWYgKGN5Y2xlU29uZykge1xyXG4gICAgICB0aGlzLmN5Y2xlU29uZyA9IGN5Y2xlU29uZztcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwib25Mb2FkXCIpO1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gIOmfs+S5kFxyXG4gICAgZnVuY3Rpb24gZ2V0SGVpZ2h0KHBhcmFtcywgdmlldykge1xyXG4gICAgICBsZXQgY3VycmVudEx5Y0hlaWdodCA9IDA7XHJcbiAgICAgIGxldCBseWNyaWVzU3RhdHVzID0gdmlldy5seWNyaWVzU3RhdHVzO1xyXG4gICAgICBsZXQgX2hlaWdodCA9IDA7XHJcbiAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgIGxldCB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9oZWlnaHQpO1xyXG4gICAgICAgIGlmIChfaGVpZ2h0IDwgcGFyYW1zKSB7XHJcbiAgICAgICAgICBfaGVpZ2h0ICs9IDI7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lKTtcclxuICAgICAgICAgIF9oZWlnaHQgPSBwYXJhbXM7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlldy5jdXJyZW50THljSGVpZ2h0ID0gX2hlaWdodDtcclxuICAgICAgICB2aWV3Lmx5Y3JpZXNTdGF0dXMgPSBseWNyaWVzU3RhdHVzO1xyXG4gICAgICAgIHZpZXcuJGFwcGx5KCk7XHJcbiAgICAgIH0sMzApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluS7iuWkqeaYr+aYn+acn+WHoFxyXG4gICAgbGV0IG15ZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdG9kYXkgPSBteWRhdGUuZ2V0RGF5KCk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2RheSk7XHJcbiAgICB0aGlzLnRvZGF5ID0gdG9kYXk7XHJcbiAgICBsZXQgdG9kYXlXZWVrID0gXCJcIjtcclxuICAgIGlmICh0aGlzLnRvZGF5ID09IFwiMFwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiU3VuZGF5XCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCIxXCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJNb25kYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjJcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlR1ZXNkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjNcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIldlZG5lc2RheVwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNFwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiVGh1cnNkYXlcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjVcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIkZyaWRheVwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNlwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiU2F0dXJkYXlcIjtcclxuICAgIH1cclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidG9kYXlXZWVrXCIsIHRvZGF5V2Vlayk7XHJcbiAgICB0aGlzLnRvZGF5V2VlayA9IHRvZGF5V2VlaztcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcblxyXG4gICAgLy8g6I635Y+W6aaW6aG15pWw5o2uICAg5pKt5pS+6aaW6aG16Z+z5LmQXHJcbiAgICB3eC5teVJlcXVlc3Qoe30sIGFwaS5Ib21lLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIFxyXG4gICAgICBwbGF5TXVzaWMucGxheSh0aGF0LnNvbmcsdGhhdC5zb25nLGZhbHNlLDApXHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyx0aGF0LnNvbmcpO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcImN1cnJlbnRTb25nXCIsIHJlcy5kYXRhKTtcclxuXHJcbiAgICAgIC8vICDmjqfliLbmrYzor41cclxuICAgICAgbGV0IGx5Y0xlbmd0aCA9IHRoYXQuc29uZ1swXS53b3JkLmxlbmd0aDsgLy/ojrflj5bmrYzor43mnInlpJrlsJHlj6VcclxuICAgICAgbGV0IGx5Y0hlaWdodCA9IGx5Y0xlbmd0aCAqIDQwOyAvL+iOt+WPluatjOivjeWuueWZqOeahOmrmOW6plxyXG4gICAgICBnZXRIZWlnaHQobHljSGVpZ2h0LCB0aGF0KTtcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19