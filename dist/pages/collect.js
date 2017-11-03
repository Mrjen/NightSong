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
      todayWeek: "" //当前的星期英文单词
    }, _this.methods = {
      audioPlay: function audioPlay(e) {},

      // 播放歌曲
      songPlay: function songPlay(idx) {
        var that = this;
        console.log(idx);
        var _song = that.song[idx];
        console.log(_song);
        wx.playBackgroundAudio({
          dataUrl: _song.audio,
          title: _song.name,
          coverImgUrl: ''
        });
        that.currentSong = _song;
        that.song[idx].playing = 1;
        that.$apply();
      },

      // 暂停播放
      songPause: function songPause(idx) {
        this.song[idx].playing = 0;
        wx.pauseBackgroundAudio();
        this.$apply();
      },

      // 取消收藏
      discollectSong: function discollectSong(id) {
        wx.myRequest({ id: id }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode) {
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
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log(res);
          if (res.status == '1') {
            that.currentSong.playing = 1;
          }
        }
      });
      that.todayWeek = wx.getStorageSync('todayWeek');
      that.$apply();
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      wx.myRequest({ page: 0 }, _api2.default.myCollect, function (res) {
        that.song = res.data;
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJjdXJyZW50U29uZyIsInRvZGF5V2VlayIsIm1ldGhvZHMiLCJhdWRpb1BsYXkiLCJlIiwic29uZ1BsYXkiLCJpZHgiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsIl9zb25nIiwid3giLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsImF1ZGlvIiwidGl0bGUiLCJuYW1lIiwiY292ZXJJbWdVcmwiLCJwbGF5aW5nIiwiJGFwcGx5Iiwic29uZ1BhdXNlIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJkaXNjb2xsZWN0U29uZyIsImlkIiwibXlSZXF1ZXN0IiwiZGlzQ29sbGVjdCIsInJlcyIsInN0YXR1c0NvZGUiLCJzdWNjZXNzIiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdGF0dXMiLCJnZXRTdG9yYWdlU3luYyIsInBhZ2UiLCJteUNvbGxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixPQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCLE1BSGpCO0FBSVBDLHFCQUFlO0FBSlIsSyxRQU1UQyxJLEdBQU87QUFDTEMsWUFBTSxFQUREO0FBRUxDLG1CQUFZLEVBRlAsRUFFVztBQUNoQkMsaUJBQVUsRUFITCxDQUdTO0FBSFQsSyxRQU1QQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNJLENBRVgsQ0FITzs7QUFJUjtBQUNBQyxjQUxRLG9CQUtDQyxHQUxELEVBS0s7QUFDVCxZQUFJQyxPQUFPLElBQVg7QUFDREMsZ0JBQVFDLEdBQVIsQ0FBWUgsR0FBWjtBQUNBLFlBQUlJLFFBQVFILEtBQUtSLElBQUwsQ0FBVU8sR0FBVixDQUFaO0FBQ0FFLGdCQUFRQyxHQUFSLENBQVlDLEtBQVo7QUFDQ0MsV0FBR0MsbUJBQUgsQ0FBdUI7QUFDbkJDLG1CQUFRSCxNQUFNSSxLQURLO0FBRW5CQyxpQkFBT0wsTUFBTU0sSUFGTTtBQUduQkMsdUJBQWE7QUFITSxTQUF2QjtBQUtBVixhQUFLUCxXQUFMLEdBQW1CVSxLQUFuQjtBQUNBSCxhQUFLUixJQUFMLENBQVVPLEdBQVYsRUFBZVksT0FBZixHQUF5QixDQUF6QjtBQUNBWCxhQUFLWSxNQUFMO0FBQ0gsT0FsQk87O0FBbUJSO0FBQ0FDLGVBcEJRLHFCQW9CRWQsR0FwQkYsRUFvQk07QUFDVixhQUFLUCxJQUFMLENBQVVPLEdBQVYsRUFBZVksT0FBZixHQUF5QixDQUF6QjtBQUNBUCxXQUFHVSxvQkFBSDtBQUNBLGFBQUtGLE1BQUw7QUFDSCxPQXhCTzs7QUF5QlI7QUFDQUcsb0JBMUJRLDBCQTBCT0MsRUExQlAsRUEwQlU7QUFDZFosV0FBR2EsU0FBSCxDQUFhLEVBQUVELElBQUdBLEVBQUwsRUFBYixFQUF1QixjQUFJRSxVQUEzQixFQUF1QyxVQUFTQyxHQUFULEVBQWM7QUFDckRsQixrQkFBUUMsR0FBUixDQUFZaUIsR0FBWjtBQUNBLGNBQUlBLElBQUlDLFVBQVIsRUFBb0I7QUFDaEIsMEJBQUlDLE9BQUosQ0FBWSxRQUFaO0FBQ0g7QUFDRixTQUxDO0FBTUg7QUFqQ08sSzs7Ozs7NkJBb0NEO0FBQ0wsVUFBSXJCLE9BQU8sSUFBWDtBQUNBSSxTQUFHa0IsNkJBQUgsQ0FBaUM7QUFDN0JELGVBRDZCLG1CQUNyQkYsR0FEcUIsRUFDakI7QUFDUmxCLGtCQUFRQyxHQUFSLENBQVlpQixHQUFaO0FBQ0EsY0FBSUEsSUFBSUksTUFBSixJQUFZLEdBQWhCLEVBQXFCO0FBQ2pCdkIsaUJBQUtQLFdBQUwsQ0FBaUJrQixPQUFqQixHQUEyQixDQUEzQjtBQUNIO0FBQ0o7QUFONEIsT0FBakM7QUFRQVgsV0FBS04sU0FBTCxHQUFpQlUsR0FBR29CLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQXhCLFdBQUtZLE1BQUw7QUFDSDs7OzZCQUVRO0FBQ1AsVUFBSVosT0FBTyxJQUFYO0FBQ0FJLFNBQUdhLFNBQUgsQ0FBYSxFQUFFUSxNQUFNLENBQVIsRUFBYixFQUEwQixjQUFJQyxTQUE5QixFQUF5QyxVQUFTUCxHQUFULEVBQWM7QUFDckRuQixhQUFLUixJQUFMLEdBQVkyQixJQUFJNUIsSUFBaEI7QUFDQVMsYUFBS1ksTUFBTDtBQUNELE9BSEQ7QUFJQSxVQUFJcEIsT0FBT1ksR0FBR29CLGNBQUgsQ0FBa0IsYUFBbEIsQ0FBWDtBQUNBdkIsY0FBUUMsR0FBUixDQUFZVixJQUFaO0FBQ0EsVUFBSUEsSUFBSixFQUFVO0FBQ05RLGFBQUtQLFdBQUwsR0FBbUJELElBQW5CO0FBQ0g7QUFDRjs7OztFQTFFZ0MsZUFBS2lDLEk7O2tCQUFuQnhDLEsiLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi9jb21tL2FwaVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi9jb21tL3RpcFwiO1xyXG5pbXBvcnQgbXlSZXF1ZXN0IGZyb20gXCIuLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLmlLblkKzmjpLooYzmppxcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxMjgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgc29uZzogW10sXHJcbiAgICBjdXJyZW50U29uZzp7fSwgLy/lvZPliY3mkq3mlL7mrYzmm7JcclxuICAgIHRvZGF5V2VlazpcIlwiICAvL+W9k+WJjeeahOaYn+acn+iLseaWh+WNleivjVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhdWRpb1BsYXkoZSl7XHJcbiAgICAgICBcclxuICAgIH0sXHJcbiAgICAvLyDmkq3mlL7mrYzmm7JcclxuICAgIHNvbmdQbGF5KGlkeCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgY29uc29sZS5sb2coaWR4KVxyXG4gICAgICAgbGV0IF9zb25nID0gdGhhdC5zb25nW2lkeF07XHJcbiAgICAgICBjb25zb2xlLmxvZyhfc29uZylcclxuICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgZGF0YVVybDpfc29uZy5hdWRpbyxcclxuICAgICAgICAgICAgdGl0bGU6IF9zb25nLm5hbWUsXHJcbiAgICAgICAgICAgIGNvdmVySW1nVXJsOiAnJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IF9zb25nO1xyXG4gICAgICAgIHRoYXQuc29uZ1tpZHhdLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG4gICAgLy8g5pqC5YGc5pKt5pS+XHJcbiAgICBzb25nUGF1c2UoaWR4KXtcclxuICAgICAgICB0aGlzLnNvbmdbaWR4XS5wbGF5aW5nID0gMDtcclxuICAgICAgICB3eC5wYXVzZUJhY2tncm91bmRBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG4gICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICBkaXNjb2xsZWN0U29uZyhpZCl7XHJcbiAgICAgICAgd3gubXlSZXF1ZXN0KHsgaWQ6aWQgfSxhcGkuZGlzQ29sbGVjdCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUpIHtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLlj5bmtojmlLbol4/miJDlip9cIilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXM9PScxJykge1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nLnBsYXlpbmcgPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoYXQudG9kYXlXZWVrID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3RvZGF5V2VlaycpO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gubXlSZXF1ZXN0KHsgcGFnZTogMCB9LCBhcGkubXlDb2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICAgIGxldCBzb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHNvbmcpO1xyXG4gICAgaWYgKHNvbmcpIHtcclxuICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gc29uZztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19