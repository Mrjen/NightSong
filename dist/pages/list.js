"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../comm/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../comm/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _wxRequest = require('./../comm/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

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
      navigationBarTitleText: "收听排行榜",
      navigationBarBackgroundColor: "#21282e",
      navigationBarTextStyle: "#fff",
      disableScroll: true
    }, _this.data = {
      song: [],
      currentSong: {}, //当前播放歌曲
      todayWeek: "", //当前的星期英文单词
      songCycle: true //歌曲true:列表循环  false:单曲循环
    }, _this.methods = {
      // 页面列表播放歌曲
      songPlay: function songPlay(idx) {
        console.log(idx, "idx");
        var that = this;
        var song = that.song;
        var _song = that.song[idx];
        console.log(_song);
        _song.playing = 1;
        that.currentSong = [_song];
        for (var i = 0; i < song.length; i++) {
          song[i].playing = 0;
        }
        song[idx].playing = 1;
        console.log("缓存当前播放的歌曲", [_song]);
        wx.setStorageSync('currentSong', [_song]);
        that.$apply();
        var click = true;
        wx.setStorageSync('oldList', song);
        _music2.default.play(wx.getStorageSync('oldList'), song, true, idx);
      },


      // 页面顶部歌曲播放
      audioPlay: function audioPlay() {
        var that = this;
        wx.getBackgroundAudioPlayerState({
          success: function success(res) {
            if (res.status === 1) {
              //歌曲正在播放，这个时候需要暂停播放
              wx.pauseBackgroundAudio();
            } else if (res.status === 0) {
              //歌曲暂停，这个时候需要播放
              _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx"));
              that.currentSong[0].playing = 1;
              that.$apply();
            }
          },
          fail: function fail() {
            //当前没有歌曲播放  播放缓存的歌曲列表
            _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx"));
            console.log(1111);
            that.currentSong[0].playing = 1;
            that.$apply();
          }
        });
      },


      // 页面顶部暂停
      audioPause: function audioPause() {
        var that = this;
        console.log("排行榜的页面顶部暂停");
        wx.pauseBackgroundAudio();
        console.log(that.currentSong);
        that.currentSong[0].playing = 0;
        that.$apply();
      },


      // 暂停播放
      songPause: function songPause(idx) {
        console.log(idx, "idx");
        idx = idx ? idx : that.songIndex;
        if (idx) {
          this.song[idx].playing = 0;
        }
        wx.pauseBackgroundAudio();
        this.$apply();
      },


      // 取消收藏
      discollectSong: function discollectSong(id) {
        var that = this;
        wx.myRequest({ id: id }, _api2.default.disCollect, function (res) {
          console.log(res, "取消收藏");
          if (res.statusCode == '200') {
            _tip2.default.success("取消收藏成功");
            var currentSong = that.currentSong;
            console.log(currentSong);
            currentSong.collected = 0;
            that.currentSong = currentSong;
            that.$apply();
          }
        });
      },

      // 收藏
      collectSong: function collectSong(id) {
        console.log(id, "idididid");
        var that = this;
        wx.myRequest({ id: id }, _api2.default.Collect, function (res) {
          console.log(res, "收藏");
          if (res.statusCode == "200") {
            _tip2.default.success("收藏成功");
            var currentSong = that.currentSong;
            currentSong.collected = 1;
            that.currentSong = currentSong;
            that.$apply();
          }
        });
      },

      // 下一曲
      nextMusic: function nextMusic() {
        _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx") + 1);
        var oldList = wx.getStorageSync("oldList");
        console.log("oldList", oldList);
      },

      //上一曲
      prevMusic: function prevMusic() {
        _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx") - 1);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var that = this;
      that.todayWeek = wx.getStorageSync('todayWeek');
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      // 获取当前歌曲播放状态
      console.log("that.currentSong", that.currentSong);
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log('当前歌曲播放状态', res);
          if (res.status == '1') {
            that.currentSong[0].playing = 1;
            that.$apply();
          }
        },
        fail: function fail(res) {
          console.log("排行榜获取歌曲播放状态失败", res);
        }
      });

      wx.myRequest({ page: 0 }, _api2.default.Ranking, function (res) {
        that.song = res.data;
        console.log(res);
        that.$apply();
      });
      var song = wx.getStorageSync("currentSong");
      console.log(song);
      if (song) {
        that.currentSong = song;
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsInNvbmdDeWNsZSIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0IiwiX3NvbmciLCJwbGF5aW5nIiwiaSIsImxlbmd0aCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjbGljayIsInBsYXkiLCJnZXRTdG9yYWdlU3luYyIsImF1ZGlvUGxheSIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInBhdXNlQmFja2dyb3VuZEF1ZGlvIiwiZmFpbCIsImF1ZGlvUGF1c2UiLCJzb25nUGF1c2UiLCJzb25nSW5kZXgiLCJkaXNjb2xsZWN0U29uZyIsImlkIiwibXlSZXF1ZXN0IiwiZGlzQ29sbGVjdCIsInN0YXR1c0NvZGUiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0U29uZyIsIkNvbGxlY3QiLCJuZXh0TXVzaWMiLCJvbGRMaXN0IiwicHJldk11c2ljIiwicGFnZSIsIlJhbmtpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE9BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0IsTUFIakI7QUFJUEMscUJBQWU7QUFKUixLLFFBTVRDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsbUJBQVksRUFGUCxFQUVZO0FBQ2pCQyxpQkFBVSxFQUhMLEVBR1M7QUFDZEMs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a0JBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCZSxHQUE1QjtBQUNEO0FBVjBCLE9BQWpDOztBQWFBVCxTQUFHa0IsU0FBSCxDQUFhLEVBQUVTLE1BQU0sQ0FBUixFQUFiLEVBQTBCLGNBQUlDLE9BQTlCLEVBQXVDLFVBQVNuQixHQUFULEVBQWM7QUFDbkRkLGFBQUtULElBQUwsR0FBWXVCLElBQUl4QixJQUFoQjtBQUNBUSxnQkFBUUMsR0FBUixDQUFZZSxHQUFaO0FBQ0FkLGFBQUtPLE1BQUw7QUFDRCxPQUpEO0FBS0EsVUFBSWhCLE9BQU9jLEdBQUdLLGNBQUgsQ0FBa0IsYUFBbEIsQ0FBWDtBQUNBWixjQUFRQyxHQUFSLENBQVlSLElBQVo7QUFDQSxVQUFJQSxJQUFKLEVBQVU7QUFDTlMsYUFBS1IsV0FBTCxHQUFtQkQsSUFBbkI7QUFDSDtBQUVGOzs7O0VBOUpnQyxlQUFLeUMsSTs7a0JBQW5CaEQsSyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uL2NvbW0vYXBpXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCBteVJlcXVlc3QgZnJvbSBcIi4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBwbGF5TXVzaWMgZnJvbSAnLi4vY29tbS9tdXNpYydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5pS25ZCs5o6S6KGM5qacXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiLFxyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIHNvbmc6IFtdLFxyXG4gICAgY3VycmVudFNvbmc6e30sICAvL+W9k+WJjeaSreaUvuatjOabslxyXG4gICAgdG9kYXlXZWVrOlwiXCIsIC8v5b2T5YmN55qE5pif5pyf6Iux5paH5Y2V6K+NXHJcbiAgICBzb25nQ3ljbGU6dHJ1ZSAgIC8v5q2M5puydHJ1ZTrliJfooajlvqrnjq8gIGZhbHNlOuWNleabsuW+queOr1xyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAgIC8vIOmhtemdouWIl+ihqOaSreaUvuatjOabslxyXG4gICAgc29uZ1BsYXkoaWR4KXtcclxuICAgICAgY29uc29sZS5sb2coaWR4LFwiaWR4XCIpXHJcbiAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICBsZXQgc29uZyA9IHRoYXQuc29uZztcclxuICAgICAgIGxldCBfc29uZyA9IHRoYXQuc29uZ1tpZHhdO1xyXG4gICAgICAgY29uc29sZS5sb2coX3NvbmcpXHJcbiAgICAgICAgX3NvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IFtfc29uZ107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb25nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBzb25nW2ldLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzb25nW2lkeF0ucGxheWluZyA9IDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnvJPlrZjlvZPliY3mkq3mlL7nmoTmrYzmm7JcIixbX3NvbmddKVxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50U29uZycsW19zb25nXSlcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIGxldCBjbGljayA9IHRydWU7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ29sZExpc3QnLHNvbmcpXHJcbiAgICAgICAgcGxheU11c2ljLnBsYXkod3guZ2V0U3RvcmFnZVN5bmMoJ29sZExpc3QnKSxzb25nLHRydWUsaWR4KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDpobXpnaLpobbpg6jmrYzmm7Lmkq3mlL5cclxuICAgIGF1ZGlvUGxheSgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvL+atjOabsuato+WcqOaSreaUvu+8jOi/meS4quaXtuWAmemcgOimgeaaguWBnOaSreaUvlxyXG4gICAgICAgICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8v5q2M5puy5pqC5YGc77yM6L+Z5Liq5pe25YCZ6ZyA6KaB5pKt5pS+XHJcbiAgICAgICAgICAgIHBsYXlNdXNpYy5wbGF5KCB3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksW10sZmFsc2UsIHd4LmdldFN0b3JhZ2VTeW5jKFwiaWR4XCIpKTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZ1swXS5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAvL+W9k+WJjeayoeacieatjOabsuaSreaUviAg5pKt5pS+57yT5a2Y55qE5q2M5puy5YiX6KGoXHJcbiAgICAgICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksW10sZmFsc2Usd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIikpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coMTExMSk7XHJcbiAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nWzBdLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgIC8vIOmhtemdoumhtumDqOaaguWBnFxyXG4gICAgYXVkaW9QYXVzZSgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuaOkuihjOamnOeahOmhtemdoumhtumDqOaaguWBnFwiKTtcclxuICAgICAgd3gucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKTtcclxuICAgICAgY29uc29sZS5sb2codGhhdC5jdXJyZW50U29uZylcclxuICAgICAgdGhhdC5jdXJyZW50U29uZ1swXS5wbGF5aW5nID0gMDtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pqC5YGc5pKt5pS+XHJcbiAgICBzb25nUGF1c2UoaWR4KXtcclxuICAgICAgIGNvbnNvbGUubG9nKGlkeCxcImlkeFwiKVxyXG4gICAgICAgIGlkeCA9IGlkeD9pZHg6dGhhdC5zb25nSW5kZXg7XHJcbiAgICAgICAgaWYgKGlkeCkge1xyXG4gICAgICAgICAgIHRoaXMuc29uZ1tpZHhdLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWPlua2iOaUtuiXj1xyXG4gICAgZGlzY29sbGVjdFNvbmcoaWQpe1xyXG4gICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7IGlkOmlkIH0sYXBpLmRpc0NvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyxcIuWPlua2iOaUtuiXj1wiKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGU9PScyMDAnKSB7XHJcbiAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5Y+W5raI5pS26JeP5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvbmcgPSB0aGF0LmN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50U29uZylcclxuICAgICAgICAgICAgY3VycmVudFNvbmcuY29sbGVjdGVkID0gMDtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IGN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyDmlLbol49cclxuICAgIGNvbGxlY3RTb25nKGlkKXtcclxuICAgICAgY29uc29sZS5sb2coaWQsXCJpZGlkaWRpZFwiKVxyXG4gICAgICBsZXQgdGhhdD0gdGhpcztcclxuICAgICAgIHd4Lm15UmVxdWVzdCh7IGlkOmlkIH0sIGFwaS5Db2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCLmlLbol49cIik7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMjAwXCIpIHtcclxuICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5pS26JeP5oiQ5YqfXCIpXHJcbiAgICAgICAgICBsZXQgY3VycmVudFNvbmcgPSB0aGF0LmN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgY3VycmVudFNvbmcuY29sbGVjdGVkID0gMSA7XHJcbiAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmc7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5LiL5LiA5puyXHJcbiAgICBuZXh0TXVzaWMoKXtcclxuICAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSx3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKSsxKTtcclxuICAgICAgIGxldCBvbGRMaXN0ID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpO1xyXG4gICAgICAgY29uc29sZS5sb2coXCJvbGRMaXN0XCIsb2xkTGlzdClcclxuICAgIH0sXHJcbiAgICAvL+S4iuS4gOabslxyXG4gICAgcHJldk11c2ljKCl7XHJcbiAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSx3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKS0xKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQudG9kYXlXZWVrID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3RvZGF5V2VlaycpO1xyXG4gICAgICAgXHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDojrflj5blvZPliY3mrYzmm7Lmkq3mlL7nirbmgIFcclxuICAgIGNvbnNvbGUubG9nKFwidGhhdC5jdXJyZW50U29uZ1wiLHRoYXQuY3VycmVudFNvbmcpXHJcbiAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9k+WJjeatjOabsuaSreaUvueKtuaAgScscmVzKVxyXG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzPT0nMScpIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZ1swXS5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbChyZXMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOkuihjOamnOiOt+WPluatjOabsuaSreaUvueKtuaAgeWksei0pVwiLHJlcylcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgd3gubXlSZXF1ZXN0KHsgcGFnZTogMCB9LCBhcGkuUmFua2luZywgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICAgIGxldCBzb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHNvbmcpO1xyXG4gICAgaWYgKHNvbmcpIHtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gc29uZztcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxufVxyXG4iXX0=