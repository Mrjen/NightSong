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
        that.currentSong = _song;
        for (var i = 0; i < song.length; i++) {
          song[i].playing = 0;
        }
        song[idx].playing = 1;
        console.log("缓存当前播放的歌曲", _song);
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
              that.currentSong.playing = 1;
              that.$apply();
            }
          },
          fail: function fail() {
            //当前没有歌曲播放  播放缓存的歌曲列表
            _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx"));
            console.log(1111);
            that.currentSong.playing = 1;
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
        that.currentSong.playing = 0;
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

      // 切换歌曲循环模式
      cycleSong: function cycleSong() {
        var that = this;
        that.cycleSong = !that.cycleSong;
        _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx") + 1, that.cycleSong);
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
            that.currentSong.playing = 1;
            that.$apply();
            console.log("排行榜页面", that.data);
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
        that.currentSong = song[0];
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsInNvbmdDeWNsZSIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0IiwiX3NvbmciLCJwbGF5aW5nIiwiaSIsImxlbmd0aCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjbGljayIsInBsYXkiLCJnZXRTdG9yYWdlU3luYyIsImF1ZGlvUGxheSIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInBhdXNlQmFja2dyb3VuZEF1ZGlvIiwiZmFpbCIsImF1ZGlvUGF1c2UiLCJzb25nUGF1c2UiLCJzb25nSW5kZXgiLCJkaXNjb2xsZWN0U29uZyIsImlkIiwibXlSZXF1ZXN0IiwiZGlzQ29sbGVjdCIsInN0YXR1c0NvZGUiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0U29uZyIsIkNvbGxlY3QiLCJjeWNsZVNvbmciLCJuZXh0TXVzaWMiLCJvbGRMaXN0IiwicHJldk11c2ljIiwicGFnZSIsIlJhbmtpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE9BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0IsTUFIakI7QUFJUEMscUJBQWU7QUFKUixLLFFBTVRDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsbUJBQVksRUFGUCxFQUVZO0FBQ2pCQyxpQkFBVSxFQUhM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QyxHQUFSLENBQVksVUFBWixFQUF1QmUsR0FBdkI7QUFDQSxjQUFJQSxJQUFJQyxNQUFKLElBQVksR0FBaEIsRUFBcUI7QUFDakJmLGlCQUFLUixXQUFMLENBQWlCVSxPQUFqQixHQUEyQixDQUEzQjtBQUNBRixpQkFBS08sTUFBTDtBQUNBVCxvQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBb0JDLEtBQUtWLElBQXpCO0FBQ0g7QUFDSixTQVIwQjtBQVMzQjJCLFlBVDJCLGdCQVN0QkgsR0FUc0IsRUFTbEI7QUFDUGhCLGtCQUFRQyxHQUFSLENBQVksZUFBWixFQUE0QmUsR0FBNUI7QUFDRDtBQVgwQixPQUFqQzs7QUFjQVQsU0FBR2tCLFNBQUgsQ0FBYSxFQUFFVSxNQUFNLENBQVIsRUFBYixFQUEwQixjQUFJQyxPQUE5QixFQUF1QyxVQUFTcEIsR0FBVCxFQUFjO0FBQ25EZCxhQUFLVCxJQUFMLEdBQVl1QixJQUFJeEIsSUFBaEI7QUFDQVEsZ0JBQVFDLEdBQVIsQ0FBWWUsR0FBWjtBQUNBZCxhQUFLTyxNQUFMO0FBQ0QsT0FKRDtBQUtBLFVBQUloQixPQUFPYyxHQUFHSyxjQUFILENBQWtCLGFBQWxCLENBQVg7QUFDQVosY0FBUUMsR0FBUixDQUFZUixJQUFaO0FBQ0EsVUFBSUEsSUFBSixFQUFVO0FBQ05TLGFBQUtSLFdBQUwsR0FBbUJELEtBQUssQ0FBTCxDQUFuQjtBQUNIO0FBRUY7Ozs7RUF2S2dDLGVBQUswQyxJOztrQkFBbkJqRCxLIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vY29tbS9hcGlcIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vY29tbS90aXBcIjtcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IHBsYXlNdXNpYyBmcm9tICcuLi9jb21tL211c2ljJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLmlLblkKzmjpLooYzmppxcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxMjgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgc29uZzogW10sXHJcbiAgICBjdXJyZW50U29uZzp7fSwgIC8v5b2T5YmN5pKt5pS+5q2M5puyXHJcbiAgICB0b2RheVdlZWs6XCJcIiwgLy/lvZPliY3nmoTmmJ/mnJ/oi7HmlofljZXor41cclxuICAgIHNvbmdDeWNsZTp0cnVlICAgLy/mrYzmm7J0cnVlOuWIl+ihqOW+queOryAgZmFsc2U65Y2V5puy5b6q546vXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgICAgLy8g6aG16Z2i5YiX6KGo5pKt5pS+5q2M5puyXHJcbiAgICBzb25nUGxheShpZHgpe1xyXG4gICAgICBjb25zb2xlLmxvZyhpZHgsXCJpZHhcIilcclxuICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgIGxldCBzb25nID0gdGhhdC5zb25nO1xyXG4gICAgICAgbGV0IF9zb25nID0gdGhhdC5zb25nW2lkeF07XHJcbiAgICAgICBjb25zb2xlLmxvZyhfc29uZylcclxuICAgICAgICBfc29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gX3Nvbmc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb25nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBzb25nW2ldLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzb25nW2lkeF0ucGxheWluZyA9IDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnvJPlrZjlvZPliY3mkq3mlL7nmoTmrYzmm7JcIixfc29uZylcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY3VycmVudFNvbmcnLFtfc29uZ10pXHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICBsZXQgY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyxzb25nKVxyXG4gICAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyksc29uZyx0cnVlLGlkeClcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6aG16Z2i6aG26YOo5q2M5puy5pKt5pS+XHJcbiAgICBhdWRpb1BsYXkoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgd3guZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5q2M5puy5q2j5Zyo5pKt5pS+77yM6L+Z5Liq5pe25YCZ6ZyA6KaB5pqC5YGc5pKt5pS+XHJcbiAgICAgICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgLy/mrYzmm7LmmoLlgZzvvIzov5nkuKrml7blgJnpnIDopoHmkq3mlL5cclxuICAgICAgICAgICAgcGxheU11c2ljLnBsYXkoIHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSwgd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIikpO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbCgpIHtcclxuICAgICAgICAgIC8v5b2T5YmN5rKh5pyJ5q2M5puy5pKt5pS+ICDmkq3mlL7nvJPlrZjnmoTmrYzmm7LliJfooahcclxuICAgICAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSx3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygxMTExKTtcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgLy8g6aG16Z2i6aG26YOo5pqC5YGcXHJcbiAgICBhdWRpb1BhdXNlKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5o6S6KGM5qac55qE6aG16Z2i6aG26YOo5pqC5YGcXCIpO1xyXG4gICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGF0LmN1cnJlbnRTb25nKVxyXG4gICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAwO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmmoLlgZzmkq3mlL5cclxuICAgIHNvbmdQYXVzZShpZHgpe1xyXG4gICAgICAgY29uc29sZS5sb2coaWR4LFwiaWR4XCIpXHJcbiAgICAgICAgaWR4ID0gaWR4P2lkeDp0aGF0LnNvbmdJbmRleDtcclxuICAgICAgICBpZiAoaWR4KSB7XHJcbiAgICAgICAgICAgdGhpcy5zb25nW2lkeF0ucGxheWluZyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICBkaXNjb2xsZWN0U29uZyhpZCl7XHJcbiAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6aWQgfSxhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLFwi5Y+W5raI5pS26JePXCIpO1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZT09JzIwMCcpIHtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLlj5bmtojmlLbol4/miJDlip9cIik7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nKVxyXG4gICAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAwO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIOaUtuiXj1xyXG4gICAgY29sbGVjdFNvbmcoaWQpe1xyXG4gICAgICBjb25zb2xlLmxvZyhpZCxcImlkaWRpZGlkXCIpXHJcbiAgICAgIGxldCB0aGF0PSB0aGlzO1xyXG4gICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6aWQgfSwgYXBpLkNvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyxcIuaUtuiXj1wiKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLmlLbol4/miJDlip9cIilcclxuICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAxIDtcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcgPSBjdXJyZW50U29uZztcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDliIfmjaLmrYzmm7Llvqrnjq/mqKHlvI9cclxuICAgIGN5Y2xlU29uZygpe1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQuY3ljbGVTb25nID0gIXRoYXQuY3ljbGVTb25nO1xyXG4gICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksW10sZmFsc2Usd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIikrMSx0aGF0LmN5Y2xlU29uZyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOS4i+S4gOabslxyXG4gICAgbmV4dE11c2ljKCl7XHJcbiAgICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksW10sZmFsc2Usd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIikrMSk7XHJcbiAgICAgICBsZXQgb2xkTGlzdCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKTtcclxuICAgICAgIGNvbnNvbGUubG9nKFwib2xkTGlzdFwiLG9sZExpc3QpXHJcbiAgICB9LFxyXG4gICAgLy/kuIrkuIDmm7JcclxuICAgIHByZXZNdXNpYygpe1xyXG4gICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksW10sZmFsc2Usd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIiktMSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0LnRvZGF5V2VlayA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2RheVdlZWsnKTtcclxuICAgICAgXHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDojrflj5blvZPliY3mrYzmm7Lmkq3mlL7nirbmgIFcclxuICAgIGNvbnNvbGUubG9nKFwidGhhdC5jdXJyZW50U29uZ1wiLHRoYXQuY3VycmVudFNvbmcpXHJcbiAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9k+WJjeatjOabsuaSreaUvueKtuaAgScscmVzKVxyXG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzPT0nMScpIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjpLooYzmppzpobXpnaJcIix0aGF0LmRhdGEpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjpLooYzmppzojrflj5bmrYzmm7Lmkq3mlL7nirbmgIHlpLHotKVcIixyZXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHd4Lm15UmVxdWVzdCh7IHBhZ2U6IDAgfSwgYXBpLlJhbmtpbmcsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICB0aGF0LnNvbmcgPSByZXMuZGF0YTtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgc29uZyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiY3VycmVudFNvbmdcIik7XHJcbiAgICBjb25zb2xlLmxvZyhzb25nKTtcclxuICAgIGlmIChzb25nKSB7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IHNvbmdbMF07XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbn1cclxuIl19