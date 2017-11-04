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
      navigationBarTitleText: "我的歌单",
      navigationBarBackgroundColor: "#21282e",
      navigationBarTextStyle: "#fff",
      disableScroll: true
    }, _this.data = {
      song: [],
      currentSong: {}, //当前播放歌曲
      cycleSong: false,
      todayWeek: "", //当前的星期英文单词
      songIndex: {
        index: "",
        list: "" //当前音乐播放的index,当前播放的属于列表
      } }, _this.methods = {
      // 页面列表播放歌曲
      songPlay: function songPlay(idx) {
        var that = this;
        console.log(idx, "idx");
        wx.setStorageSync("idx", idx);
        var song = that.song;
        var _song = that.song[idx];
        _music2.default.play(wx.getStorageSync("oldList"), song, true, idx);
        for (var i = 0; i < song.length; i++) {
          song[i].playing = 0;
        }
        that.currentSong = [_song];
        that.song[idx].playing = 1;
        that.songIndex = idx;
        wx.setStorageSync('currentSong', [_song]);
        that.$apply();
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
        console.log("收藏的页面顶部暂停");
        wx.pauseBackgroundAudio();
        that.currentSong.playing = 0;
        that.$apply();
      },


      // 暂停播放
      songPause: function songPause(idx) {
        console.log(idx, "idx");
        var that = this;
        idx = idx ? idx : that.songIndex;
        if (idx) {
          this.song[idx].playing = 0;
        }
        this.currentSong.playing = 0;
        wx.pauseBackgroundAudio();
        this.$apply();
      },


      // 取消收藏
      discollectSong: function discollectSong(id) {
        var that = this;
        wx.myRequest({ id: that.currentSong.id }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode) {
            that.currentSong.collected = 0;
            that.$apply();
            _tip2.default.success("取消收藏成功");
          }
        });
      },

      // 收藏
      collectSong: function collectSong(id) {
        var that = this;
        wx.myRequest({ id: id }, _api2.default.Collect, function (res) {
          console.log(res);
          if (res.statusCode) {
            var currentSong = that.currentSong;
            that.currentSong.collected = 1;
            that.$apply();
            _tip2.default.success("收藏成功");
          }
        });
      },

      // 切换歌曲循环模式
      cycleSong: function cycleSong() {
        var that = this;
        that.cycleSong = !that.cycleSong;
        _music2.default.play(wx.getStorageSync("oldList"), [], false, wx.getStorageSync("idx") + 1, that.cycleSong);
      },


      // 在列表内删除
      deleteCollect: function deleteCollect(id, index) {
        var that = this;
        wx.myRequest({ id: id }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode) {
            var song = that.song;
            song.splice(index, 1);
            that.song = song;
            that.$apply();
            _tip2.default.success("取消收藏成功");
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var that = this;
      that.todayWeek = wx.getStorageSync("todayWeek");
      that.$apply();
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      // 获取歌曲播放状态
      console.log("that.currentSong", that.currentSong);
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log(res, "这里有没有执行");
          if (res.status == "1") {
            console.log(that.currentSong);
            that.currentSong.playing = 1;
          }
        },
        fail: function fail(res) {
          //当前没有歌曲在播放
        }
      });

      wx.myRequest({ page: 0 }, _api2.default.myCollect, function (res) {
        that.song = res.data;
        that.$apply();
      });
      var currentSong = wx.getStorageSync("currentSong");
      console.log(currentSong);
      if (currentSong) {
        that.currentSong = currentSong[0];
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsImN5Y2xlU29uZyIsInRvZGF5V2VlayIsInNvbmdJbmRleCIsImluZGV4IiwibGlzdCIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIl9zb25nIiwicGxheSIsImdldFN0b3JhZ2VTeW5jIiwiaSIsImxlbmd0aCIsInBsYXlpbmciLCIkYXBwbHkiLCJhdWRpb1BsYXkiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXMiLCJwYXVzZUJhY2tncm91bmRBdWRpbyIsImZhaWwiLCJhdWRpb1BhdXNlIiwic29uZ1BhdXNlIiwiZGlzY29sbGVjdFNvbmciLCJpZCIsIm15UmVxdWVzdCIsImRpc0NvbGxlY3QiLCJzdGF0dXNDb2RlIiwiY29sbGVjdGVkIiwiY29sbGVjdFNvbmciLCJDb2xsZWN0IiwiZGVsZXRlQ29sbGVjdCIsInNwbGljZSIsInBhZ2UiLCJteUNvbGxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0IsTUFIakI7QUFJUEMscUJBQWU7QUFKUixLLFFBTVRDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsbUJBQWEsRUFGUixFQUVZO0FBQ2pCQyxpQkFBVSxLQUhMO0FBSUxDLGlC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RixTQVA4QjtBQVEvQlEsWUFSK0IsZ0JBUTFCSCxHQVIwQixFQVFyQjtBQUNSO0FBQ0Q7QUFWOEIsT0FBakM7O0FBYUFaLFNBQUdvQixTQUFILENBQWEsRUFBRVEsTUFBTSxDQUFSLEVBQWIsRUFBMEIsY0FBSUMsU0FBOUIsRUFBeUMsVUFBU2pCLEdBQVQsRUFBYztBQUNyRGYsYUFBS1YsSUFBTCxHQUFZeUIsSUFBSTFCLElBQWhCO0FBQ0FXLGFBQUtXLE1BQUw7QUFDRCxPQUhEO0FBSUEsVUFBSXBCLGNBQWNZLEdBQUdJLGNBQUgsQ0FBa0IsYUFBbEIsQ0FBbEI7QUFDQU4sY0FBUUMsR0FBUixDQUFZWCxXQUFaO0FBQ0EsVUFBSUEsV0FBSixFQUFpQjtBQUNmUyxhQUFLVCxXQUFMLEdBQW1CQSxZQUFZLENBQVosQ0FBbkI7QUFDRDtBQUNGOzs7O0VBbktnQyxlQUFLd0MsSTs7a0JBQW5CaEQsSyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uL2NvbW0vYXBpXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCBteVJlcXVlc3QgZnJvbSBcIi4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBwbGF5TXVzaWMgZnJvbSBcIi4uL2NvbW0vbXVzaWNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5oiR55qE5q2M5Y2VXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiLFxyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIHNvbmc6IFtdLFxyXG4gICAgY3VycmVudFNvbmc6IHt9LCAvL+W9k+WJjeaSreaUvuatjOabslxyXG4gICAgY3ljbGVTb25nOmZhbHNlLFxyXG4gICAgdG9kYXlXZWVrOiBcIlwiLCAvL+W9k+WJjeeahOaYn+acn+iLseaWh+WNleivjVxyXG4gICAgc29uZ0luZGV4OiB7XHJcbiAgICAgIGluZGV4OiBcIlwiLFxyXG4gICAgICBsaXN0OiBcIlwiXHJcbiAgICB9IC8v5b2T5YmN6Z+z5LmQ5pKt5pS+55qEaW5kZXgs5b2T5YmN5pKt5pS+55qE5bGe5LqO5YiX6KGoXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmhtemdouWIl+ihqOaSreaUvuatjOabslxyXG4gICAgc29uZ1BsYXkoaWR4KSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29uc29sZS5sb2coaWR4LCBcImlkeFwiKTtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJpZHhcIiwgaWR4KTtcclxuICAgICAgbGV0IHNvbmcgPSB0aGF0LnNvbmc7XHJcbiAgICAgIGxldCBfc29uZyA9IHRoYXQuc29uZ1tpZHhdO1xyXG4gICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksIHNvbmcsIHRydWUsIGlkeCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29uZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNvbmdbaV0ucGxheWluZyA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhhdC5jdXJyZW50U29uZyA9IFtfc29uZ107XHJcbiAgICAgIHRoYXQuc29uZ1tpZHhdLnBsYXlpbmcgPSAxO1xyXG4gICAgICB0aGF0LnNvbmdJbmRleCA9IGlkeDtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRTb25nJyxbX3NvbmddKVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSxcclxuICAgIC8vIOmhtemdoumhtumDqOatjOabsuaSreaUvlxyXG4gICAgYXVkaW9QbGF5KCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAxKSB7XHJcbiAgICAgICAgICAgIC8v5q2M5puy5q2j5Zyo5pKt5pS+77yM6L+Z5Liq5pe25YCZ6ZyA6KaB5pqC5YGc5pKt5pS+XHJcbiAgICAgICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgLy/mrYzmm7LmmoLlgZzvvIzov5nkuKrml7blgJnpnIDopoHmkq3mlL5cclxuICAgICAgICAgICAgcGxheU11c2ljLnBsYXkoIHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSwgd3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIikpO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbCgpIHtcclxuICAgICAgICAgIC8v5b2T5YmN5rKh5pyJ5q2M5puy5pKt5pS+ICDmkq3mlL7nvJPlrZjnmoTmrYzmm7LliJfooahcclxuICAgICAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSx3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygxMTExKTtcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmhtemdoumhtumDqOaaguWBnFxyXG4gICAgYXVkaW9QYXVzZSgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuaUtuiXj+eahOmhtemdoumhtumDqOaaguWBnFwiKTtcclxuICAgICAgd3gucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKTtcclxuICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMDtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pqC5YGc5pKt5pS+XHJcbiAgICBzb25nUGF1c2UoaWR4KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGlkeCwgXCJpZHhcIik7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgaWR4ID0gaWR4ID8gaWR4IDogdGhhdC5zb25nSW5kZXg7XHJcbiAgICAgIGlmIChpZHgpIHtcclxuICAgICAgICB0aGlzLnNvbmdbaWR4XS5wbGF5aW5nID0gMDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlbnRTb25nLnBsYXlpbmcgPSAwO1xyXG4gICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlj5bmtojmlLbol49cclxuICAgIGRpc2NvbGxlY3RTb25nKGlkKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5teVJlcXVlc3QoeyBpZDogdGhhdC5jdXJyZW50U29uZy5pZCB9LCBhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUpIHtcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcuY29sbGVjdGVkID0gMDtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB0aXAuc3VjY2VzcyhcIuWPlua2iOaUtuiXj+aIkOWKn1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOaUtuiXj1xyXG4gICAgY29sbGVjdFNvbmcoaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgIHd4Lm15UmVxdWVzdCh7IGlkOmlkIH0sIGFwaS5Db2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSkge1xyXG4gICAgICAgICAgbGV0IGN1cnJlbnRTb25nID0gdGhhdC5jdXJyZW50U29uZztcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcuY29sbGVjdGVkID0gMTtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaUtuiXj+aIkOWKn1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOWIh+aNouatjOabsuW+queOr+aooeW8j1xyXG4gICAgY3ljbGVTb25nKCl7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC5jeWNsZVNvbmcgPSAhdGhhdC5jeWNsZVNvbmc7XHJcbiAgICAgIHBsYXlNdXNpYy5wbGF5KHd4LmdldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiKSxbXSxmYWxzZSx3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKSsxLHRoYXQuY3ljbGVTb25nKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Zyo5YiX6KGo5YaF5Yig6ZmkXHJcbiAgICBkZWxldGVDb2xsZWN0KGlkLGluZGV4KXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICB3eC5teVJlcXVlc3QoeyBpZDppZCB9LCBhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUpIHtcclxuICAgICAgICAgIGxldCBzb25nID0gdGhhdC5zb25nO1xyXG4gICAgICAgICAgICAgIHNvbmcuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICB0aGF0LnNvbmcgPSBzb25nO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5Y+W5raI5pS26JeP5oiQ5YqfXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC50b2RheVdlZWsgPSB3eC5nZXRTdG9yYWdlU3luYyhcInRvZGF5V2Vla1wiKTtcclxuICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyDojrflj5bmrYzmm7Lmkq3mlL7nirbmgIFcclxuICAgIGNvbnNvbGUubG9nKFwidGhhdC5jdXJyZW50U29uZ1wiLHRoYXQuY3VycmVudFNvbmcpXHJcbiAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCBcIui/memHjOacieayoeacieaJp+ihjFwiKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhhdC5jdXJyZW50U29uZyk7XHJcbiAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAvL+W9k+WJjeayoeacieatjOabsuWcqOaSreaUvlxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB3eC5teVJlcXVlc3QoeyBwYWdlOiAwIH0sIGFwaS5teUNvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICB0aGF0LnNvbmcgPSByZXMuZGF0YTtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGN1cnJlbnRTb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiKTtcclxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nKTtcclxuICAgIGlmIChjdXJyZW50U29uZykge1xyXG4gICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmdbMF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==