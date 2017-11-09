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
      todayWeek: "", //当前的星期英文单词
      songCycle: true
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
      },

      // 在列表内删除
      deleteCollect: function deleteCollect(id, index) {
        var that = this;
        wx.myRequest({
          id: id
        }, _api2.default.disCollect, function (res) {
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
      wx.myRequest({
        page: 0
      }, _api2.default.myCollect, function (res) {
        that.song = res.data;
        console.log("我收藏的歌曲", res);
        that.$apply();
      });
      var currentSong = wx.getStorageSync("currentSong");
      console.log(currentSong);
      if (currentSong) {
        that.currentSong = currentSong;
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
        path: '/pages/collect',
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsInNvbmdDeWNsZSIsIm1ldGhvZHMiLCJzb25nUGxheSIsImlkeCIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0IiwiX3NvbmciLCJwbGF5aW5nIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImNsaWNrIiwicGxheSIsImdldFN0b3JhZ2VTeW5jIiwiY3ljbGVTb25nIiwibXlSZXF1ZXN0IiwiaWQiLCJzb25nUGxheUNvdW50IiwicmVzIiwiYXVkaW9QbGF5IiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwic3RhdHVzIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJmYWlsIiwiYXVkaW9QYXVzZSIsInNvbmdQYXVzZSIsInNvbmdJbmRleCIsImRpc2NvbGxlY3RTb25nIiwiZGlzQ29sbGVjdCIsInN0YXR1c0NvZGUiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0U29uZyIsIkNvbGxlY3QiLCJfY3ljbGVTb25nIiwibmV3TGlzdCIsIm5leHRNdXNpYyIsIm9sZExpc3QiLCJwcmV2TXVzaWMiLCJkZWxldGVDb2xsZWN0IiwiaW5kZXgiLCJzcGxpY2UiLCJwYWdlIiwibXlDb2xsZWN0IiwiZnJvbSIsInRhcmdldCIsInRpdGxlIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QixNQUhqQjtBQUlQQyxxQkFBZTtBQUpSLEssUUFNVEMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxtQkFBYSxFQUZSLEVBRVk7QUFDakJDLGlCQUFXLEVBSE4sRUFHVTtBQUNmQyxpQkFBVztBQUpOLEssUUFNUEMsTyxHQUFVO0FBQ1I7QUFDQUMsY0FGUSxvQkFFQ0MsR0FGRCxFQUVNO0FBQ1pDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVosRUFBaUIsS0FBakI7QUFDQSxZQUFJRyxPQUFPLElBQVg7QUFDQSxZQUFJVCxPQUFPUyxLQUFLVCxJQUFoQjtBQUNBLFlBQUlVLFFBQVFELEtBQUtULElBQUwsQ0FBVU0sR0FBVixDQUFaO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlFLEtBQVo7QUFDQUEsY0FBTUMsT0FBTixHQUFnQixDQUFoQjtBQUNBRixhQUFLUixXQUFMLEdBQW1CUyxLQUFuQjtBQUNBVixhQUFLTSxHQUFMLEVBQVVLLE9BQVYsR0FBb0IsQ0FBcEI7QUFDQUosZ0JBQVFDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCRSxLQUF6QjtBQUNBRSxXQUFHQyxjQUFILENBQWtCLGFBQWxCLEVBQWlDSCxLQUFqQztBQUNBRSxXQUFHQyxjQUFILENBQWtCLEtBQWxCLEVBQXlCUCxHQUF6QjtBQUNBRyxhQUFLSyxNQUFMO0FBQ0EsWUFBSUMsUUFBUSxJQUFaO0FBQ0FILFdBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJiLElBQTdCO0FBQ0Esd0JBQVVnQixJQUFWLENBQWVKLEdBQUdLLGNBQUgsQ0FBa0IsU0FBbEIsQ0FBZixFQUE2Q2pCLElBQTdDLEVBQW1ELElBQW5ELEVBQXlETSxHQUF6RCxFQUE4REcsS0FBS1MsU0FBbkUsRUFBOEVULElBQTlFLEVBQW9GLENBQXBGO0FBQ0E7QUFDQUcsV0FBR08sU0FBSCxDQUFhO0FBQ1hDLGNBQUlYLEtBQUtULElBQUwsQ0FBVSxDQUFWLEVBQWFvQjtBQUROLFNBQWIsRUFFRyxjQUFJQyxhQUZQLEVBRXNCLFVBQVNDLEdBQVQsRUFBYztBQUNsQ2Ysa0JBQVFDLEdBQVIsQ0FBWWMsR0FBWixFQUFpQixVQUFqQjtBQUNELFNBSkQ7QUFLRCxPQXhCTzs7QUF5QlI7QUFDQUMsZUExQlEsdUJBMEJJO0FBQ1YsWUFBSWQsT0FBTyxJQUFYO0FBQ0FHLFdBQUdZLDZCQUFILENBQWlDO0FBQy9CQyxtQkFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCLGdCQUFJQSxJQUFJSSxNQUFKLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEI7QUFDQWQsaUJBQUdlLG9CQUFIO0FBQ0QsYUFIRCxNQUdPLElBQUlMLElBQUlJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUMzQjtBQUNBLDhCQUFVVixJQUFWLENBQ0VKLEdBQUdLLGNBQUgsQ0FBa0IsU0FBbEIsQ0FERixFQUNnQyxFQURoQyxFQUVFLEtBRkYsRUFHRUwsR0FBR0ssY0FBSCxDQUFrQixLQUFsQixDQUhGO0FBS0FSLG1CQUFLUixXQUFMLENBQWlCVSxPQUFqQixHQUEyQixDQUEzQjtBQUNBRixtQkFBS0ssTUFBTDtBQUNEO0FBQ0YsV0FmOEI7QUFnQi9CYyxjQWhCK0Isa0JBZ0J4QjtBQUNMO0FBQ0EsNEJBQVVaLElBQVYsQ0FDRUosR0FBR0ssY0FBSCxDQUFrQixTQUFsQixDQURGLEVBQ2dDLEVBRGhDLEVBRUUsS0FGRixFQUdFTCxHQUFHSyxjQUFILENBQWtCLEtBQWxCLENBSEY7QUFLQVYsb0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0FDLGlCQUFLUixXQUFMLENBQWlCVSxPQUFqQixHQUEyQixDQUEzQjtBQUNBRixpQkFBS0ssTUFBTDtBQUNEO0FBMUI4QixTQUFqQztBQTRCRCxPQXhETzs7QUF5RFI7QUFDQWUsZ0JBMURRLHdCQTBESztBQUNYLFlBQUlwQixPQUFPLElBQVg7QUFDQUYsZ0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0FJLFdBQUdlLG9CQUFIO0FBQ0FwQixnQkFBUUMsR0FBUixDQUFZQyxLQUFLUixXQUFqQjtBQUNBUSxhQUFLUixXQUFMLENBQWlCVSxPQUFqQixHQUEyQixDQUEzQjtBQUNBRixhQUFLSyxNQUFMO0FBQ0QsT0FqRU87O0FBa0VSO0FBQ0FnQixlQW5FUSxxQkFtRUV4QixHQW5FRixFQW1FTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZRixHQUFaLEVBQWlCLEtBQWpCO0FBQ0FBLGNBQU1BLE1BQU1BLEdBQU4sR0FBWUcsS0FBS3NCLFNBQXZCO0FBQ0EsWUFBSXpCLEdBQUosRUFBUztBQUNQLGVBQUtOLElBQUwsQ0FBVU0sR0FBVixFQUFlSyxPQUFmLEdBQXlCLENBQXpCO0FBQ0Q7QUFDREMsV0FBR2Usb0JBQUg7QUFDQSxhQUFLYixNQUFMO0FBQ0QsT0EzRU87O0FBNEVSO0FBQ0FrQixvQkE3RVEsMEJBNkVPWixFQTdFUCxFQTZFVztBQUNqQixZQUFJWCxPQUFPLElBQVg7QUFDQUcsV0FBR08sU0FBSCxDQUFhO0FBQ1hDLGNBQUlBO0FBRE8sU0FBYixFQUVHLGNBQUlhLFVBRlAsRUFFbUIsVUFBU1gsR0FBVCxFQUFjO0FBQy9CZixrQkFBUUMsR0FBUixDQUFZYyxHQUFaLEVBQWlCLE1BQWpCO0FBQ0EsY0FBSUEsSUFBSVksVUFBSixJQUFrQixLQUF0QixFQUE2QjtBQUMzQiwwQkFBSVQsT0FBSixDQUFZLFFBQVo7QUFDQSxnQkFBSXhCLGNBQWNRLEtBQUtSLFdBQXZCO0FBQ0FNLG9CQUFRQyxHQUFSLENBQVlQLFdBQVo7QUFDQUEsd0JBQVlrQyxTQUFaLEdBQXdCLENBQXhCO0FBQ0ExQixpQkFBS1IsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQVEsaUJBQUtLLE1BQUw7QUFDRDtBQUNGLFNBWkQ7QUFhRCxPQTVGTzs7QUE2RlI7QUFDQXNCLGlCQTlGUSx1QkE4RkloQixFQTlGSixFQThGUTtBQUNkYixnQkFBUUMsR0FBUixDQUFZWSxFQUFaLEVBQWdCLFVBQWhCO0FBQ0EsWUFBSVgsT0FBTyxJQUFYO0FBQ0FHLFdBQUdPLFNBQUgsQ0FBYTtBQUNYQyxjQUFJQTtBQURPLFNBQWIsRUFFRyxjQUFJaUIsT0FGUCxFQUVnQixVQUFTZixHQUFULEVBQWM7QUFDNUJmLGtCQUFRQyxHQUFSLENBQVljLEdBQVosRUFBaUIsSUFBakI7QUFDQSxjQUFJQSxJQUFJWSxVQUFKLElBQWtCLEtBQXRCLEVBQTZCO0FBQzNCLDBCQUFJVCxPQUFKLENBQVksTUFBWjtBQUNBLGdCQUFJeEIsY0FBY1EsS0FBS1IsV0FBdkI7QUFDQUEsd0JBQVlrQyxTQUFaLEdBQXdCLENBQXhCO0FBQ0ExQixpQkFBS1IsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQVEsaUJBQUtLLE1BQUw7QUFDRDtBQUNGLFNBWEQ7QUFZRCxPQTdHTzs7QUE4R1I7QUFDQUksZUEvR1EsdUJBK0dJO0FBQ1YsWUFBSVQsT0FBTyxJQUFYO0FBQ0EsWUFBSUgsTUFBTU0sR0FBR0ssY0FBSCxDQUFrQixLQUFsQixDQUFWO0FBQ0EsWUFBSXFCLGFBQWE3QixLQUFLTixTQUFMLEtBQW1CLElBQW5CLEdBQTBCLEtBQTFCLEdBQWtDLElBQW5EO0FBQ0FNLGFBQUtOLFNBQUwsR0FBaUJtQyxVQUFqQjtBQUNBN0IsYUFBS0ssTUFBTDtBQUNBUCxnQkFBUUMsR0FBUixDQUFZQyxLQUFLTixTQUFqQixFQUE0QixvQkFBNUI7QUFDQSxZQUFJb0MsVUFBVSxFQUFkO0FBQ0EsWUFBSTlCLEtBQUtOLFNBQVQsRUFBb0I7QUFDbEJvQyxvQkFBVTlCLEtBQUtULElBQWY7QUFDRCxTQUZELE1BRU87QUFDTHVDLG9CQUFVOUIsS0FBS1QsSUFBTCxDQUFVTSxHQUFWLENBQVY7QUFDRDtBQUNELHdCQUFVVSxJQUFWLENBQ0VKLEdBQUdLLGNBQUgsQ0FBa0IsU0FBbEIsQ0FERixFQUVFc0IsT0FGRixFQUdFLElBSEYsRUFJRWpDLEdBSkYsRUFLRUcsS0FBS04sU0FMUCxFQU1FTSxJQU5GLEVBT0UsQ0FQRjtBQVNELE9BcklPOztBQXNJUjtBQUNBK0IsZUF2SVEsdUJBdUlJO0FBQ1ZqQyxnQkFBUUMsR0FBUixDQUFZLEtBQVo7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJZ0MsVUFBVTdCLEdBQUdLLGNBQUgsQ0FBa0IsU0FBbEIsQ0FBZDtBQUNBLFlBQUlYLE1BQU1NLEdBQUdLLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBVjtBQUNBLHdCQUFVRCxJQUFWLENBQ0VKLEdBQUdLLGNBQUgsQ0FBa0IsU0FBbEIsQ0FERixFQUNnQyxFQURoQyxFQUVFLEtBRkYsRUFHRVgsR0FIRixFQUlFRyxLQUFLUyxTQUpQLEVBS0VULElBTEYsRUFNRSxDQU5GO0FBUUFGLGdCQUFRQyxHQUFSLENBQVlJLEdBQUdLLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBWixFQUFzQyxLQUF0QztBQUNBVixnQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJpQyxPQUF2QjtBQUNELE9BdEpPOztBQXVKUjtBQUNBQyxlQXhKUSx1QkF3Skk7QUFDVm5DLGdCQUFRQyxHQUFSLENBQVksS0FBWjtBQUNBLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlnQyxVQUFVN0IsR0FBR0ssY0FBSCxDQUFrQixTQUFsQixDQUFkO0FBQ0EsWUFBSVgsTUFBTU0sR0FBR0ssY0FBSCxDQUFrQixLQUFsQixDQUFWO0FBQ0Esd0JBQVVELElBQVYsQ0FDRUosR0FBR0ssY0FBSCxDQUFrQixTQUFsQixDQURGLEVBQ2dDLEVBRGhDLEVBRUUsS0FGRixFQUdFWCxHQUhGLEVBSUVHLEtBQUtTLFNBSlAsRUFLRVQsSUFMRixFQU1FLENBTkY7QUFRRCxPQXJLTzs7QUFzS1I7QUFDQWtDLG1CQXZLUSx5QkF1S012QixFQXZLTixFQXVLVXdCLEtBdktWLEVBdUtpQjtBQUN2QixZQUFJbkMsT0FBTyxJQUFYO0FBQ0FHLFdBQUdPLFNBQUgsQ0FBYTtBQUNYQyxjQUFJQTtBQURPLFNBQWIsRUFFRyxjQUFJYSxVQUZQLEVBRW1CLFVBQVNYLEdBQVQsRUFBYztBQUMvQmYsa0JBQVFDLEdBQVIsQ0FBWWMsR0FBWjtBQUNBLGNBQUlBLElBQUlZLFVBQVIsRUFBb0I7QUFDbEIsZ0JBQUlsQyxPQUFPUyxLQUFLVCxJQUFoQjtBQUNBQSxpQkFBSzZDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQixDQUFuQjtBQUNBbkMsaUJBQUtULElBQUwsR0FBWUEsSUFBWjtBQUNBUyxpQkFBS0ssTUFBTDtBQUNBLDBCQUFJVyxPQUFKLENBQVksUUFBWjtBQUNEO0FBQ0YsU0FYRDtBQVlEO0FBckxPLEs7Ozs7OzZCQXVMRDtBQUNQLFVBQUloQixPQUFPLElBQVg7QUFDQUEsV0FBS1AsU0FBTCxHQUFpQlUsR0FBR0ssY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBUixXQUFLSyxNQUFMO0FBQ0Q7Ozs2QkFDUTtBQUNQLFVBQUlMLE9BQU8sSUFBWDtBQUNBO0FBQ0FGLGNBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0MsS0FBS1IsV0FBckM7QUFDQVcsU0FBR1ksNkJBQUgsQ0FBaUM7QUFDL0JDLGVBRCtCLG1CQUN2QkgsR0FEdUIsRUFDbEI7QUFDWGYsa0JBQVFDLEdBQVIsQ0FBWWMsR0FBWixFQUFpQixTQUFqQjtBQUNBLGNBQUlBLElBQUlJLE1BQUosSUFBYyxHQUFsQixFQUF1QjtBQUNyQm5CLG9CQUFRQyxHQUFSLENBQVlDLEtBQUtSLFdBQWpCO0FBQ0FRLGlCQUFLUixXQUFMLENBQWlCVSxPQUFqQixHQUEyQixDQUEzQjtBQUNEO0FBQ0YsU0FQOEI7QUFRL0JpQixZQVIrQixnQkFRMUJOLEdBUjBCLEVBUXJCO0FBQ1I7QUFDRDtBQVY4QixPQUFqQztBQVlBVixTQUFHTyxTQUFILENBQWE7QUFDWDJCLGNBQU07QUFESyxPQUFiLEVBRUcsY0FBSUMsU0FGUCxFQUVrQixVQUFTekIsR0FBVCxFQUFjO0FBQzlCYixhQUFLVCxJQUFMLEdBQVlzQixJQUFJdkIsSUFBaEI7QUFDQVEsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCYyxHQUF0QjtBQUNBYixhQUFLSyxNQUFMO0FBQ0QsT0FORDtBQU9BLFVBQUliLGNBQWNXLEdBQUdLLGNBQUgsQ0FBa0IsYUFBbEIsQ0FBbEI7QUFDQVYsY0FBUUMsR0FBUixDQUFZUCxXQUFaO0FBQ0EsVUFBSUEsV0FBSixFQUFpQjtBQUNmUSxhQUFLUixXQUFMLEdBQW1CQSxXQUFuQjtBQUNEO0FBQ0Y7OztzQ0FDaUJxQixHLEVBQUs7QUFDckIsVUFBSUEsSUFBSTBCLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QjtBQUNBekMsZ0JBQVFDLEdBQVIsQ0FBWWMsSUFBSTJCLE1BQWhCO0FBQ0Q7QUFDRCxhQUFPO0FBQ0xDLGVBQU8sTUFERjtBQUVMQyxjQUFNLGdCQUZEO0FBR0wxQixpQkFBUyxpQkFBU0gsR0FBVCxFQUFjO0FBQ3JCO0FBQ0Esd0JBQUlHLE9BQUosQ0FBWSxNQUFaO0FBQ0QsU0FOSTtBQU9MRyxjQUFNLGNBQVNOLEdBQVQsRUFBYztBQUNsQjtBQUNEO0FBVEksT0FBUDtBQVdEOzs7O0VBdFBnQyxlQUFLd0IsSTs7a0JBQW5CckQsSyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuICBpbXBvcnQgYXBpIGZyb20gXCIuLi9jb21tL2FwaVwiO1xyXG4gIGltcG9ydCB0aXAgZnJvbSBcIi4uL2NvbW0vdGlwXCI7XHJcbiAgaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuICBpbXBvcnQgcGxheU11c2ljIGZyb20gXCIuLi9jb21tL211c2ljXCI7XHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaIkeeahOatjOWNlVwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICAgIGRpc2FibGVTY3JvbGw6IHRydWVcclxuICAgIH07XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzb25nOiBbXSxcclxuICAgICAgY3VycmVudFNvbmc6IHt9LCAvL+W9k+WJjeaSreaUvuatjOabslxyXG4gICAgICB0b2RheVdlZWs6IFwiXCIsIC8v5b2T5YmN55qE5pif5pyf6Iux5paH5Y2V6K+NXHJcbiAgICAgIHNvbmdDeWNsZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIC8vIOmhtemdouWIl+ihqOaSreaUvuatjOabslxyXG4gICAgICBzb25nUGxheShpZHgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZHgsIFwiaWR4XCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgc29uZyA9IHRoYXQuc29uZztcclxuICAgICAgICBsZXQgX3NvbmcgPSB0aGF0LnNvbmdbaWR4XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfc29uZyk7XHJcbiAgICAgICAgX3NvbmcucGxheWluZyA9IDE7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IF9zb25nO1xyXG4gICAgICAgIHNvbmdbaWR4XS5wbGF5aW5nID0gMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIue8k+WtmOW9k+WJjeaSreaUvueahOatjOabslwiLCBfc29uZyk7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiLCBfc29uZyk7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkeCcsIGlkeCk7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICBsZXQgY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwib2xkTGlzdFwiLCBzb25nKTtcclxuICAgICAgICBwbGF5TXVzaWMucGxheSh3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksIHNvbmcsIHRydWUsIGlkeCwgdGhhdC5jeWNsZVNvbmcsIHRoYXQsIDApO1xyXG4gICAgICAgIC8vIOe7n+iuoeatjOabsuaSreaUvuasoeaVsFxyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7XHJcbiAgICAgICAgICBpZDogdGhhdC5zb25nWzBdLmlkXHJcbiAgICAgICAgfSwgYXBpLnNvbmdQbGF5Q291bnQsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLCAn57uf6K6h5q2M5puy5pKt5pS+5qyh5pWwJylcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICAvLyDpobXpnaLpobbpg6jmrYzmm7Lmkq3mlL5cclxuICAgICAgYXVkaW9QbGF5KCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAvL+atjOabsuato+WcqOaSreaUvu+8jOi/meS4quaXtuWAmemcgOimgeaaguWBnOaSreaUvlxyXG4gICAgICAgICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIC8v5q2M5puy5pqC5YGc77yM6L+Z5Liq5pe25YCZ6ZyA6KaB5pKt5pS+XHJcbiAgICAgICAgICAgICAgcGxheU11c2ljLnBsYXkoXHJcbiAgICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksIFtdLFxyXG4gICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlU3luYyhcImlkeFwiKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbCgpIHtcclxuICAgICAgICAgICAgLy/lvZPliY3msqHmnInmrYzmm7Lmkq3mlL4gIOaSreaUvue8k+WtmOeahOatjOabsuWIl+ihqFxyXG4gICAgICAgICAgICBwbGF5TXVzaWMucGxheShcclxuICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksIFtdLFxyXG4gICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgIHd4LmdldFN0b3JhZ2VTeW5jKFwiaWR4XCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDExMTEpO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDpobXpnaLpobbpg6jmmoLlgZxcclxuICAgICAgYXVkaW9QYXVzZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmjpLooYzmppznmoTpobXpnaLpobbpg6jmmoLlgZxcIik7XHJcbiAgICAgICAgd3gucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmN1cnJlbnRTb25nKTtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOaaguWBnOaSreaUvlxyXG4gICAgICBzb25nUGF1c2UoaWR4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWR4LCBcImlkeFwiKTtcclxuICAgICAgICBpZHggPSBpZHggPyBpZHggOiB0aGF0LnNvbmdJbmRleDtcclxuICAgICAgICBpZiAoaWR4KSB7XHJcbiAgICAgICAgICB0aGlzLnNvbmdbaWR4XS5wbGF5aW5nID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd3gucGF1c2VCYWNrZ3JvdW5kQXVkaW8oKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDlj5bmtojmlLbol49cclxuICAgICAgZGlzY29sbGVjdFNvbmcoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3gubXlSZXF1ZXN0KHtcclxuICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgIH0sIGFwaS5kaXNDb2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCLlj5bmtojmlLbol49cIik7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuWPlua2iOaUtuiXj+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb25nID0gdGhhdC5jdXJyZW50U29uZztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFNvbmcpO1xyXG4gICAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAwO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOaUtuiXj1xyXG4gICAgICBjb2xsZWN0U29uZyhpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBcImlkaWRpZGlkXCIpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgfSwgYXBpLkNvbGxlY3QsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLCBcIuaUtuiXj1wiKTtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBcIjIwMFwiKSB7XHJcbiAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5pS26JeP5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvbmcgPSB0aGF0LmN1cnJlbnRTb25nO1xyXG4gICAgICAgICAgICBjdXJyZW50U29uZy5jb2xsZWN0ZWQgPSAxO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gY3VycmVudFNvbmc7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOWIh+aNouatjOabsuW+queOr+aooeW8j1xyXG4gICAgICBjeWNsZVNvbmcoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBpZHggPSB3eC5nZXRTdG9yYWdlU3luYygnaWR4Jyk7XHJcbiAgICAgICAgbGV0IF9jeWNsZVNvbmcgPSB0aGF0LnNvbmdDeWNsZSA9PT0gdHJ1ZSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICB0aGF0LnNvbmdDeWNsZSA9IF9jeWNsZVNvbmc7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGF0LnNvbmdDeWNsZSwgJzExMTExMTExMTExMTExMTExMScpXHJcbiAgICAgICAgbGV0IG5ld0xpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGhhdC5zb25nQ3ljbGUpIHtcclxuICAgICAgICAgIG5ld0xpc3QgPSB0aGF0LnNvbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld0xpc3QgPSB0aGF0LnNvbmdbaWR4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGxheU11c2ljLnBsYXkoXHJcbiAgICAgICAgICB3eC5nZXRTdG9yYWdlU3luYyhcIm9sZExpc3RcIiksXHJcbiAgICAgICAgICBuZXdMaXN0LFxyXG4gICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgIGlkeCxcclxuICAgICAgICAgIHRoYXQuc29uZ0N5Y2xlLFxyXG4gICAgICAgICAgdGhhdCxcclxuICAgICAgICAgIDBcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDkuIvkuIDmm7JcclxuICAgICAgbmV4dE11c2ljKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5LiL5LiA5puyXCIpXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvbGRMaXN0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29sZExpc3QnKTtcclxuICAgICAgICBsZXQgaWR4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lkeCcpO1xyXG4gICAgICAgIHBsYXlNdXNpYy5wbGF5KFxyXG4gICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLCBbXSxcclxuICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgdGhhdC5jeWNsZVNvbmcsXHJcbiAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoXCJpZHhcIiksIFwiaWR4XCIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbGRMaXN0XCIsIG9sZExpc3QpO1xyXG4gICAgICB9LFxyXG4gICAgICAvL+S4iuS4gOabslxyXG4gICAgICBwcmV2TXVzaWMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLkuIrkuIDmm7JcIik7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvbGRMaXN0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29sZExpc3QnKTtcclxuICAgICAgICBsZXQgaWR4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lkeCcpO1xyXG4gICAgICAgIHBsYXlNdXNpYy5wbGF5KFxyXG4gICAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIpLCBbXSxcclxuICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgdGhhdC5jeWNsZVNvbmcsXHJcbiAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgMFxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgICAgLy8g5Zyo5YiX6KGo5YaF5Yig6ZmkXHJcbiAgICAgIGRlbGV0ZUNvbGxlY3QoaWQsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7XHJcbiAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9LCBhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCBzb25nID0gdGhhdC5zb25nO1xyXG4gICAgICAgICAgICBzb25nLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgdGhhdC5zb25nID0gc29uZztcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLlj5bmtojmlLbol4/miJDlip9cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC50b2RheVdlZWsgPSB3eC5nZXRTdG9yYWdlU3luYyhcInRvZGF5V2Vla1wiKTtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAvLyDojrflj5bmrYzmm7Lmkq3mlL7nirbmgIFcclxuICAgICAgY29uc29sZS5sb2coXCJ0aGF0LmN1cnJlbnRTb25nXCIsIHRoYXQuY3VycmVudFNvbmcpO1xyXG4gICAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCLov5nph4zmnInmsqHmnInmiafooYxcIik7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmN1cnJlbnRTb25nKTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZy5wbGF5aW5nID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAvL+W9k+WJjeayoeacieatjOabsuWcqOaSreaUvlxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHd4Lm15UmVxdWVzdCh7XHJcbiAgICAgICAgcGFnZTogMFxyXG4gICAgICB9LCBhcGkubXlDb2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICB0aGF0LnNvbmcgPSByZXMuZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaIkeaUtuiXj+eahOatjOabslwiLCByZXMpXHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBjdXJyZW50U29uZyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiY3VycmVudFNvbmdcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nKTtcclxuICAgICAgaWYgKGN1cnJlbnRTb25nKSB7XHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IGN1cnJlbnRTb25nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0aXRsZTogJ+S4gOWknOS4gOabsicsXHJcbiAgICAgICAgcGF0aDogJy9wYWdlcy9jb2xsZWN0JyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLliIbkuqvmiJDlip9cIilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=