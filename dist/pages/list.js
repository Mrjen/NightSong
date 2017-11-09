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
        song[idx].playing = 1;
        console.log("缓存当前播放的歌曲", _song);
        wx.setStorageSync("currentSong", _song);
        wx.setStorageSync('idx', idx);
        that.$apply();
        var click = true;
        wx.setStorageSync("oldList", song);
        _music2.default.play(wx.getStorageSync("oldList"), song, true, idx, that.cycleSong, that, 0);
        // 统计歌曲播放次数
        wx.myRequest({
          id: that.song[0].id
        }, _api2.default.songPlayCount, function (res) {
          console.log(res, '统计歌曲播放次数');
        });
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
        wx.myRequest({
          id: id
        }, _api2.default.disCollect, function (res) {
          console.log(res, "取消收藏");
          if (res.statusCode == "200") {
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
        wx.myRequest({
          id: id
        }, _api2.default.Collect, function (res) {
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
        var idx = wx.getStorageSync('idx');
        var _cycleSong = that.songCycle === true ? false : true;
        that.songCycle = _cycleSong;
        that.$apply();
        console.log(that.songCycle, '111111111111111111');
        var newList = [];
        if (that.songCycle) {
          newList = that.song;
        } else {
          newList = that.song[idx];
        }
        _music2.default.play(wx.getStorageSync("oldList"), newList, true, idx, that.songCycle, that, 0);
      },

      // 下一曲
      nextMusic: function nextMusic() {
        console.log("下一曲");
        var that = this;
        var oldList = wx.getStorageSync('oldList');
        var idx = wx.getStorageSync('idx');
        _music2.default.play(wx.getStorageSync("oldList"), [], false, idx, that.cycleSong, that, 1);
        console.log(wx.getStorageSync("idx"), "idx");
        console.log("oldList", oldList);
      },

      //上一曲
      prevMusic: function prevMusic() {
        console.log("上一曲");
        var that = this;
        var oldList = wx.getStorageSync('oldList');
        var idx = wx.getStorageSync('idx');
        _music2.default.play(wx.getStorageSync("oldList"), [], false, idx, that.cycleSong, that, 0);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var that = this;
      that.todayWeek = wx.getStorageSync("todayWeek");
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      // 获取当前歌曲播放状态
      console.log("that.currentSong", that.currentSong);
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log("当前歌曲播放状态", res);
          if (res.status == "1") {
            that.currentSong.playing = 1;
            that.$apply();
            console.log("排行榜页面数据", that.data);
          }
        },
        fail: function fail(res) {
          console.log("排行榜获取歌曲播放状态失败", res);
        }
      });
      wx.myRequest({
        page: 0
      }, _api2.default.Ranking, function (res) {
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
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '一夜一曲',
        path: '/pages/list',
        success: function success(res) {
          // 转发成功
          _tip2.default.success("分享成功");
        },
        fail: function fail(res) {
          // 转发失败
        }
      };
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsInNvbmdDeWNsZSIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0IiwiX3NvbmciLCJwbGF5aW5nIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImNsaWNrIiwicGxheSIsImdldFN0b3JhZ2VTeW5jIiwiY3ljbGVTb25nIiwibXlSZXF1ZXN0IiwiaWQiLCJzb25nUGxheUNvdW50IiwicmVzIiwiYXVkaW9QbGF5IiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwic3RhdHVzIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJmYWlsIiwiYXVkaW9QYXVzZSIsInNvbmdQYXVzZSIsInNvbmdJbmRleCIsImRpc2NvbGxlY3RTb25nIiwiZGlzQ29sbGVjdCIsInN0YXR1c0NvZGUiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0U29uZyIsIkNvbGxlY3QiLCJfY3ljbGVTb25nIiwibmV3TGlzdCIsIm5leHRNdXNpYyIsIm9sZExpc3QiLCJwcmV2TXVzaWMiLCJwYWdlIiwiUmFua2luZyIsImZyb20iLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE9BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0IsTUFIakI7QUFJUEMscUJBQWU7QUFKUixLLFFBTVRDLEksR0FB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UCxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJDLEtBQUtWLElBQTVCO0FBQ0Q7QUFDRixTQVI4QjtBQVMvQjZCLFlBVCtCLGdCQVMxQk4sR0FUMEIsRUFTckI7QUFDUmYsa0JBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCYyxHQUE3QjtBQUNEO0FBWDhCLE9BQWpDO0FBYUFWLFNBQUdPLFNBQUgsQ0FBYTtBQUNYd0IsY0FBTTtBQURLLE9BQWIsRUFFRyxjQUFJQyxPQUZQLEVBRWdCLFVBQVN0QixHQUFULEVBQWM7QUFDNUJiLGFBQUtULElBQUwsR0FBWXNCLElBQUl2QixJQUFoQjtBQUNBUSxnQkFBUUMsR0FBUixDQUFZYyxHQUFaO0FBQ0FiLGFBQUtLLE1BQUw7QUFDRCxPQU5EO0FBT0EsVUFBSWQsT0FBT1ksR0FBR0ssY0FBSCxDQUFrQixhQUFsQixDQUFYO0FBQ0FWLGNBQVFDLEdBQVIsQ0FBWVIsSUFBWjtBQUNBLFVBQUlBLElBQUosRUFBVTtBQUNSUyxhQUFLUixXQUFMLEdBQW1CRCxLQUFLLENBQUwsQ0FBbkI7QUFDRDtBQUNGOzs7c0NBQ2lCc0IsRyxFQUFLO0FBQ3JCLFVBQUlBLElBQUl1QixJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQXRDLGdCQUFRQyxHQUFSLENBQVljLElBQUl3QixNQUFoQjtBQUNEO0FBQ0QsYUFBTztBQUNMQyxlQUFPLE1BREY7QUFFTEMsY0FBTSxhQUZEO0FBR0x2QixpQkFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCO0FBQ0Esd0JBQUlHLE9BQUosQ0FBWSxNQUFaO0FBQ0QsU0FOSTtBQU9MRyxjQUFNLGNBQVNOLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVEksT0FBUDtBQVdEOzs7O0VBdE9nQyxlQUFLcUIsSTs7a0JBQW5CbEQsSyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuICBpbXBvcnQgYXBpIGZyb20gXCIuLi9jb21tL2FwaVwiO1xyXG4gIGltcG9ydCB0aXAgZnJvbSBcIi4uL2NvbW0vdGlwXCI7XHJcbiAgaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuICBpbXBvcnQgcGxheU11c2ljIGZyb20gXCIuLi9jb21tL211c2ljXCI7XHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaUtuWQrOaOkuihjOamnFwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICAgIGRpc2FibGVTY3JvbGw6IHRydWVcclxuICAgIH07XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzb25nOiBbXSxcclxuICAgICAgY3VycmVudFNvbmc6IHt9LCAvL+W9k+WJjeaSreaUvuatjOabslxyXG4gICAgICB0b2RheVdlZWs6IFwiXCIsIC8v5b2T5YmN55qE5pif5pyf6Iux5paH5Y2V6K+NXHJcbiAgICAgIHNvbmdDeWNsZTogdHJ1ZSAvL+atjOabsnRydWU65YiX6KGo5b6q546vICBmYWxzZTrljZXmm7Llvqrnjq9cclxuICAgIH07XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAvLyDpobXpnaLliJfooajmkq3mlL7mrYzmm7JcclxuICAgICAgc29uZ1BsYXkoaWR4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWR4LCBcImlkeFwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGF0LnNvbmc7XHJcbiAgICAgICAgbGV0IF9zb25nID0gdGhhdC5zb25nW2lkeF07XHJcbiAgICAgICAgY29uc29sZS5sb2coX3NvbmcpO1xyXG4gICAgICAgIF9zb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgIHRoYXQuY3VycmVudFNvbmcgPSBfc29uZztcclxuICAgICAgICBzb25nW2lkeF0ucGxheWluZyA9IDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnvJPlrZjlvZPliY3mkq3mlL7nmoTmrYzmm7JcIiwgX3NvbmcpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiY3VycmVudFNvbmdcIiwgX3NvbmcpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpZHgnLCBpZHgpO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgbGV0IGNsaWNrID0gdHJ1ZTtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiwgc29uZyk7XHJcbiAgICAgICAgcGxheU11c2ljLnBsYXkod3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLCBzb25nLCB0cnVlLCBpZHgsIHRoYXQuY3ljbGVTb25nLCB0aGF0LCAwKTtcclxuICAgICAgICAvLyDnu5/orqHmrYzmm7Lmkq3mlL7mrKHmlbBcclxuICAgICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgICAgaWQ6IHRoYXQuc29uZ1swXS5pZFxyXG4gICAgICAgIH0sIGFwaS5zb25nUGxheUNvdW50LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgJ+e7n+iuoeatjOabsuaSreaUvuasoeaVsCcpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgLy8g6aG16Z2i6aG26YOo5q2M5puy5pKt5pS+XHJcbiAgICAgIGF1ZGlvUGxheSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3guZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgLy/mrYzmm7LmraPlnKjmkq3mlL7vvIzov5nkuKrml7blgJnpnIDopoHmmoLlgZzmkq3mlL5cclxuICAgICAgICAgICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAvL+atjOabsuaaguWBnO+8jOi/meS4quaXtuWAmemcgOimgeaSreaUvlxyXG4gICAgICAgICAgICAgIHBsYXlNdXNpYy5wbGF5KFxyXG4gICAgICAgICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLCBbXSxcclxuICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIilcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAgIC8v5b2T5YmN5rKh5pyJ5q2M5puy5pKt5pS+ICDmkq3mlL7nvJPlrZjnmoTmrYzmm7LliJfooahcclxuICAgICAgICAgICAgcGxheU11c2ljLnBsYXkoXHJcbiAgICAgICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLCBbXSxcclxuICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygxMTExKTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgLy8g6aG16Z2i6aG26YOo5pqC5YGcXHJcbiAgICAgIGF1ZGlvUGF1c2UoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5o6S6KGM5qac55qE6aG16Z2i6aG26YOo5pqC5YGcXCIpO1xyXG4gICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhhdC5jdXJyZW50U29uZyk7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMDtcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDmmoLlgZzmkq3mlL5cclxuICAgICAgc29uZ1BhdXNlKGlkeCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkeCwgXCJpZHhcIik7XHJcbiAgICAgICAgaWR4ID0gaWR4ID8gaWR4IDogdGhhdC5zb25nSW5kZXg7XHJcbiAgICAgICAgaWYgKGlkeCkge1xyXG4gICAgICAgICAgdGhpcy5zb25nW2lkeF0ucGxheWluZyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSxcclxuICAgICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICAgIGRpc2NvbGxlY3RTb25nKGlkKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7XHJcbiAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9LCBhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwi5Y+W5raI5pS26JePXCIpO1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IFwiMjAwXCIpIHtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLlj5bmtojmlLbol4/miJDlip9cIik7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nKTtcclxuICAgICAgICAgICAgY3VycmVudFNvbmcuY29sbGVjdGVkID0gMDtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IGN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDmlLbol49cclxuICAgICAgY29sbGVjdFNvbmcoaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZCwgXCJpZGlkaWRpZFwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3gubXlSZXF1ZXN0KHtcclxuICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgIH0sIGFwaS5Db2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCLmlLbol49cIik7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaUtuiXj+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb25nID0gdGhhdC5jdXJyZW50U29uZztcclxuICAgICAgICAgICAgY3VycmVudFNvbmcuY29sbGVjdGVkID0gMTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IGN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDliIfmjaLmrYzmm7Llvqrnjq/mqKHlvI9cclxuICAgICAgY3ljbGVTb25nKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgaWR4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lkeCcpO1xyXG4gICAgICAgIGxldCBfY3ljbGVTb25nID0gdGhhdC5zb25nQ3ljbGUgPT09IHRydWUgPyBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgdGhhdC5zb25nQ3ljbGUgPSBfY3ljbGVTb25nO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhhdC5zb25nQ3ljbGUsICcxMTExMTExMTExMTExMTExMTEnKVxyXG4gICAgICAgIGxldCBuZXdMaXN0ID0gW107XHJcbiAgICAgICAgaWYgKHRoYXQuc29uZ0N5Y2xlKSB7XHJcbiAgICAgICAgICBuZXdMaXN0ID0gdGhhdC5zb25nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXdMaXN0ID0gdGhhdC5zb25nW2lkeF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXlNdXNpYy5wbGF5KFxyXG4gICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLFxyXG4gICAgICAgICAgbmV3TGlzdCxcclxuICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICBpZHgsXHJcbiAgICAgICAgICB0aGF0LnNvbmdDeWNsZSxcclxuICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAwXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgLy8g5LiL5LiA5puyXHJcbiAgICAgIG5leHRNdXNpYygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS4i+S4gOabslwiKVxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgb2xkTGlzdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyk7XHJcbiAgICAgICAgbGV0IGlkeCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpZHgnKTtcclxuICAgICAgICBwbGF5TXVzaWMucGxheShcclxuICAgICAgICAgIHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSwgW10sXHJcbiAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgIGlkeCxcclxuICAgICAgICAgIHRoYXQuY3ljbGVTb25nLFxyXG4gICAgICAgICAgdGhhdCxcclxuICAgICAgICAgIDFcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKFwiaWR4XCIpLCBcImlkeFwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2xkTGlzdFwiLCBvbGRMaXN0KTtcclxuICAgICAgfSxcclxuICAgICAgLy/kuIrkuIDmm7JcclxuICAgICAgcHJldk11c2ljKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5LiA5puyXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgb2xkTGlzdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvbGRMaXN0Jyk7XHJcbiAgICAgICAgbGV0IGlkeCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpZHgnKTtcclxuICAgICAgICBwbGF5TXVzaWMucGxheShcclxuICAgICAgICAgIHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSwgW10sXHJcbiAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgIGlkeCxcclxuICAgICAgICAgIHRoYXQuY3ljbGVTb25nLFxyXG4gICAgICAgICAgdGhhdCxcclxuICAgICAgICAgIDBcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0LnRvZGF5V2VlayA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidG9kYXlXZWVrXCIpO1xyXG4gICAgfVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIC8vIOiOt+WPluW9k+WJjeatjOabsuaSreaUvueKtuaAgVxyXG4gICAgICBjb25zb2xlLmxvZyhcInRoYXQuY3VycmVudFNvbmdcIiwgdGhhdC5jdXJyZW50U29uZyk7XHJcbiAgICAgIHd4LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3mrYzmm7Lmkq3mlL7nirbmgIFcIiwgcmVzKTtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6S6KGM5qac6aG16Z2i5pWw5o2uXCIsIHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLmjpLooYzmppzojrflj5bmrYzmm7Lmkq3mlL7nirbmgIHlpLHotKVcIiwgcmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgIHBhZ2U6IDBcclxuICAgICAgfSwgYXBpLlJhbmtpbmcsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBzb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiKTtcclxuICAgICAgY29uc29sZS5sb2coc29uZyk7XHJcbiAgICAgIGlmIChzb25nKSB7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IHNvbmdbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG4gICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiAn5LiA5aSc5LiA5puyJyxcclxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2xpc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXHJcbiAgICAgICAgICB0aXAuc3VjY2VzcyhcIuWIhuS6q+aIkOWKn1wiKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==