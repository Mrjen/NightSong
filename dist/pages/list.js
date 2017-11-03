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
      // 播放歌曲
      songPlay: function songPlay(idx) {
        var that = this;
        var song = that.song;
        console.log(idx);
        var _song = that.song[idx];
        console.log(_song);
        wx.playBackgroundAudio({
          dataUrl: _song.audio,
          title: _song.name,
          coverImgUrl: ''
        });
        _song.playing = 1;
        that.currentSong = _song;
        for (var i = 0; i < song.length; i++) {
          song[i].playing = 0;
        }
        song[idx].playing = 1;
        wx.setStorageSync('currentSong', _song);
        that.$apply();

        wx.onBackgroundAudioStop(function () {
          var currentSong = that.currentSong;
          var song = that.song;
          console.log(currentSong, "currentSong");
          var id = that.currentSong.id;
          var _index = new Number();
          if (that.songCycle) {
            var _song2 = that.song;
            for (var _i = 0; _i < _song2.length; _i++) {
              if (_song2[_i].id == id) {
                _index = _i + 1;
              } else {
                _index = 0;
              }
            }
            console.log(_index);
            wx.playBackgroundAudio({
              dataUrl: _song2[_index].audio,
              title: _song2[_index].name,
              coverImgUrl: ''
            });
            that.currentSong = _song2[_index];
            that.$apply();
          } else {
            wx.playBackgroundAudio({
              dataUrl: currentSong.audio,
              title: currentSong.name,
              coverImgUrl: ''
            });
          }
        });
      },

      // 暂停播放
      songPause: function songPause(idx) {
        this.song[idx].playing = 0;
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
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var that = this;
      that.todayWeek = wx.getStorageSync('todayWeek');
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log('当前歌曲播放状态', res);
          if (res.status == '1') {
            that.currentSong.playing = 1;
            that.$apply();
          }
        },
        fail: function fail(res) {
          console.log("排行榜获取歌曲播放状态失败", res);
        }
      });
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsInNvbmdDeWNsZSIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwiX3NvbmciLCJ3eCIsInBsYXlCYWNrZ3JvdW5kQXVkaW8iLCJkYXRhVXJsIiwiYXVkaW8iLCJ0aXRsZSIsIm5hbWUiLCJjb3ZlckltZ1VybCIsInBsYXlpbmciLCJpIiwibGVuZ3RoIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJvbkJhY2tncm91bmRBdWRpb1N0b3AiLCJpZCIsIl9pbmRleCIsIk51bWJlciIsInNvbmdQYXVzZSIsInBhdXNlQmFja2dyb3VuZEF1ZGlvIiwiZGlzY29sbGVjdFNvbmciLCJteVJlcXVlc3QiLCJkaXNDb2xsZWN0IiwicmVzIiwic3RhdHVzQ29kZSIsInN1Y2Nlc3MiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0U29uZyIsIkNvbGxlY3QiLCJnZXRTdG9yYWdlU3luYyIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3RhdHVzIiwiZmFpbCIsInBhZ2UiLCJSYW5raW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsT0FEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QixNQUhqQjtBQUlQQyxxQkFBZTtBQUpSLEssUUFNVEMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxtQkFBWSxFQUZQLEVBRVk7QUFDakJDLGlCQUFV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MkIsQ0FBM0I7QUFDQVgsaUJBQUtlLE1BQUw7QUFDSDtBQUNKLFNBUDZCO0FBUTlCbUIsWUFSOEIsZ0JBUXpCVCxHQVJ5QixFQVFyQjtBQUNQeEIsa0JBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCdUIsR0FBNUI7QUFDRDtBQVY2QixPQUFqQztBQVlKOzs7NkJBRVE7QUFDUCxVQUFJekIsT0FBTyxJQUFYO0FBQ0FJLFNBQUdtQixTQUFILENBQWEsRUFBRVksTUFBTSxDQUFSLEVBQWIsRUFBMEIsY0FBSUMsT0FBOUIsRUFBdUMsVUFBU1gsR0FBVCxFQUFjO0FBQ25EekIsYUFBS1AsSUFBTCxHQUFZZ0MsSUFBSWpDLElBQWhCO0FBQ0FTLGdCQUFRQyxHQUFSLENBQVl1QixHQUFaO0FBQ0F6QixhQUFLZSxNQUFMO0FBQ0QsT0FKRDtBQUtBLFVBQUl0QixPQUFPVyxHQUFHMkIsY0FBSCxDQUFrQixhQUFsQixDQUFYO0FBQ0E5QixjQUFRQyxHQUFSLENBQVlULElBQVo7QUFDQSxVQUFJQSxJQUFKLEVBQVU7QUFDTk8sYUFBS04sV0FBTCxHQUFtQkQsSUFBbkI7QUFDSDtBQUNGOzs7O0VBeklnQyxlQUFLMEMsSTs7a0JBQW5CakQsSyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uL2NvbW0vYXBpXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCBteVJlcXVlc3QgZnJvbSBcIi4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaUtuWQrOaOkuihjOamnFwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMjEyODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIixcclxuICAgIGRpc2FibGVTY3JvbGw6IHRydWVcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBzb25nOiBbXSxcclxuICAgIGN1cnJlbnRTb25nOnt9LCAgLy/lvZPliY3mkq3mlL7mrYzmm7JcclxuICAgIHRvZGF5V2VlazpcIlwiLCAvL+W9k+WJjeeahOaYn+acn+iLseaWh+WNleivjVxyXG4gICAgc29uZ0N5Y2xlOnRydWUgICAvL+atjOabsnRydWU65YiX6KGo5b6q546vICBmYWxzZTrljZXmm7Llvqrnjq9cclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgICAvLyDmkq3mlL7mrYzmm7JcclxuICAgIHNvbmdQbGF5KGlkeCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgbGV0IHNvbmcgPSB0aGF0LnNvbmc7XHJcbiAgICAgICBjb25zb2xlLmxvZyhpZHgpXHJcbiAgICAgICBsZXQgX3NvbmcgPSB0aGF0LnNvbmdbaWR4XTtcclxuICAgICAgIGNvbnNvbGUubG9nKF9zb25nKVxyXG4gICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICBkYXRhVXJsOl9zb25nLmF1ZGlvLFxyXG4gICAgICAgICAgICB0aXRsZTogX3NvbmcubmFtZSxcclxuICAgICAgICAgICAgY292ZXJJbWdVcmw6ICcnXHJcbiAgICAgICAgfSlcclxuICAgICAgICBfc29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gX3Nvbmc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb25nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBzb25nW2ldLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzb25nW2lkeF0ucGxheWluZyA9IDE7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRTb25nJyxfc29uZylcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgICB3eC5vbkJhY2tncm91bmRBdWRpb1N0b3AoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICBsZXQgc29uZyA9IHRoYXQuc29uZztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nLFwiY3VycmVudFNvbmdcIilcclxuICAgICAgICAgIGxldCBpZCA9IHRoYXQuY3VycmVudFNvbmcuaWQ7XHJcbiAgICAgICAgICBsZXQgX2luZGV4ID0gbmV3IE51bWJlcigpO1xyXG4gICAgICAgICAgIGlmICh0aGF0LnNvbmdDeWNsZSkge1xyXG4gICAgICAgICAgICAgIGxldCBzb25nID0gdGhhdC5zb25nO1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29uZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc29uZ1tpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBfaW5kZXggPSBpKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF9pbmRleClcclxuICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgZGF0YVVybDogc29uZ1tfaW5kZXhdLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6c29uZ1tfaW5kZXhdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBjb3ZlckltZ1VybDogJydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IHNvbmdbX2luZGV4XTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhVXJsOiBjdXJyZW50U29uZy5hdWRpbyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOmN1cnJlbnRTb25nLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBjb3ZlckltZ1VybDogJydcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g5pqC5YGc5pKt5pS+XHJcbiAgICBzb25nUGF1c2UoaWR4KXtcclxuICAgICAgICB0aGlzLnNvbmdbaWR4XS5wbGF5aW5nID0gMDtcclxuICAgICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG4gICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICBkaXNjb2xsZWN0U29uZyhpZCl7XHJcbiAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6aWQgfSxhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLFwi5Y+W5raI5pS26JePXCIpO1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZT09JzIwMCcpIHtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLlj5bmtojmlLbol4/miJDlip9cIik7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nKVxyXG4gICAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAwO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIOaUtuiXj1xyXG4gICAgY29sbGVjdFNvbmcoaWQpe1xyXG4gICAgICBjb25zb2xlLmxvZyhpZCxcImlkaWRpZGlkXCIpXHJcbiAgICAgIGxldCB0aGF0PSB0aGlzO1xyXG4gICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6aWQgfSwgYXBpLkNvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyxcIuaUtuiXj1wiKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLmlLbol4/miJDlip9cIilcclxuICAgICAgICAgIGxldCBjdXJyZW50U29uZyA9IHRoYXQuY3VycmVudFNvbmc7XHJcbiAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAxIDtcclxuICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcgPSBjdXJyZW50U29uZztcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQudG9kYXlXZWVrID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3RvZGF5V2VlaycpO1xyXG4gICAgICAgd3guZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xyXG4gICAgICAgICAgc3VjY2VzcyhyZXMpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvZPliY3mrYzmm7Lmkq3mlL7nirbmgIEnLHJlcylcclxuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cz09JzEnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudFNvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjpLooYzmppzojrflj5bmrYzmm7Lmkq3mlL7nirbmgIHlpLHotKVcIixyZXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gubXlSZXF1ZXN0KHsgcGFnZTogMCB9LCBhcGkuUmFua2luZywgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICAgIGxldCBzb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHNvbmcpO1xyXG4gICAgaWYgKHNvbmcpIHtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gc29uZztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19