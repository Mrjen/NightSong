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

var _getUserInfo = require('./../comm/getUserInfo.js');

var _getUserInfo2 = _interopRequireDefault(_getUserInfo);

var _tip = require('./../comm/tip.js');

var _tip2 = _interopRequireDefault(_tip);

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
      cycleSong: true, //歌曲循环 1 列表循环  0 单曲循环
      song: {},
      lycriesStatus: 1, //歌词默认显示,
      ADshow: true, //首页广告默认显示
      image: "",
      currentSong: {},
      time: "" //歌词计时器
    }, _this.components = {}, _this.methods = {
      audioPlay: function audioPlay() {
        var that = this;
        var song = that.song;
        wx.playBackgroundAudio({
          dataUrl: song.audio,
          title: song.name,
          coverImgUrl: ""
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
        wx.myRequest({
          id: that.song[0].id
        }, _api2.default.Collect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song[0].collected;
            isCollect = isCollect == 1 ? 0 : 1;
            that.song[0].collected = isCollect;
            that.$apply();
          }
        });
      },

      // 取消收藏
      discollectSong: function discollectSong() {
        var that = this;
        wx.myRequest({
          id: that.song[0].id
        }, _api2.default.disCollect, function (res) {
          console.log(res);
          if (res.statusCode == "200") {
            var isCollect = that.song[0].collected;
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
        wx.setStorageSync("cycleSong", this.cycleSong);
      },

      // 分享海报
      sharePoster: function sharePoster() {
        var that = this;
        // let teacher = that.teacher;
        _getUserInfo2.default.getInfo(function (res) {
          var userInfo = res.userInfo;
          if (!userInfo) {
            return false;
          }
          var _avatarUrl = userInfo.avatarUrl;
          var word = [that.song[0].word[0], that.song[0].word[1]];
          var musicName = that.song[0].name;
          console.log(word, musicName);
          wx.myRequest({
            word: word,
            musicName: musicName,
            avatarUrl: _avatarUrl
          }, _api2.default.shareCode, function (res) {
            console.log(res.data);
            var src = res.data.src;
            wx.downloadFile({
              url: res.data.src,
              success: function success(res) {
                //console.log(res);
                _tip2.default.loading();
                var _image = res.tempFilePath;
                wx.saveImageToPhotosAlbum({
                  filePath: _image,
                  success: function success(res) {
                    console.log(res);
                    _tip2.default.loaded();
                    wx.showToast({
                      title: '海报下载成功，请去相册查看',
                      icon: 'success',
                      duration: 800
                    });
                    wx.previewImage({
                      current: src,
                      urls: [src]
                    });
                  },
                  fail: function fail() {
                    _tip2.default.loaded();
                    wx.showModal({
                      title: '提示',
                      content: '系统无法保存图片到您的相册，是否去开启权限',
                      success: function success(res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success: function success(res) {
                              wx.getSetting({
                                success: function success(res) {
                                  if (res.authSetting['scope.writePhotosAlbum']) {
                                    wx.saveImageToPhotosAlbum({
                                      filePath: _image,
                                      success: function success(res) {
                                        console.log(res);
                                        wx.showToast({
                                          title: '海报下载成功，请去相册查看',
                                          icon: 'success',
                                          duration: 800
                                        });
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          });
                        } else if (res.cancel) {
                          console.log('用户点击取消');
                        }
                      }
                    });
                  }
                });
              }
            });
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onShow",
    value: function onShow() {
      console.log("show");
      var that = this;
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          console.log(res, "这里是别的页面回来的歌曲播放状态");
          var status = res.status;
          var dataUrl = res.dataUrl;
          var currentPosition = res.currentPosition;
          var duration = res.duration;
          var _scale = currentPosition / duration;
          console.log(_scale, "_scale_scale_scale_scale");
          if (status === 1) {
            that.currentSong = wx.getStorageSync('currentSong');
            that.$apply();
            clearInterval(that.time);
            that.getHeight(wx.getStorageSync('currentSong'), that, _scale);
          }
        }
      });
      var cycleSong = wx.getStorageSync("cycleSong");
      if (cycleSong) {
        this.cycleSong = cycleSong;
        this.$apply();
      }
    }
  }, {
    key: "getHeight",
    value: function getHeight(params, view, scale) {
      // params当前播放歌曲对象, view页面this对象, scale歌曲长度s跟歌词行数总高度h的比例
      var that = this;
      var lycHeight = params.word.length * 40 + 354;
      // let currentLycHeight = 0;
      var lycriesStatus = view.lycriesStatus;
      var _height = lycHeight * scale ? lycHeight * scale : 0;
      var data = {};
      clearInterval(that.time);
      var time = setInterval(function () {
        // console.log(_height);
        if (_height < lycHeight) {
          _height = _height + 1;
          lycriesStatus = 1;
        } else {
          clearInterval(time);
          _height = lycHeight;
          lycriesStatus = 0;
        }
        view.currentLycHeight = _height;
        view.lycriesStatus = lycriesStatus;
        view.$apply();
      }, 50);
      that.time = time;
      that.$apply();
      console.log(time, "time");
    }
  }, {
    key: "onLoad",
    value: function onLoad(options) {
      console.log("onLoad");
      console.log(wx.getStorageSync('idx'), "当前播放的歌曲的位置");
      var that = this;
      // 页面带来参数
      console.log("页面进入参数", options, this.song);
      // 歌词控制函数
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
      // 获取广告
      wx.myRequest({}, _api2.default.statAd, function (res) {
        console.log(res, "广告图片");
        that.image = res.data.image;
        that.$apply();
        setTimeout(function () {
          that.ADshow = false;
          that.$apply();
        }, 3000);
      });
      // 获取首页数据   播放首页音乐
      wx.myRequest({}, _api2.default.Home, function (res) {
        that.song = res.data;
        console.log(res.data, "首页歌曲数据");
        that.$apply();
        _music2.default.play(that.song, that.song, false, 0, that.cycleSong, that, -1);
        wx.setStorageSync("oldList", that.song);

        var currentSong = {};

        //  记录用户上次播放位置如果没有默认从首页第一首播放
        currentSong = that.song[0];
        console.log(currentSong, "currentSong");
        // if (!currentSong) {
        //    wx.setStorageSync("currentSong", res.data[0]);
        //    wx.setStorageSync('idx', 0)
        //    currentSong = res.data[0];
        // }

        that.currentSong = currentSong;
        that.$apply();

        //  控制歌词
        // let lycLength = that.currentSong.word.length; //获取歌词有多少句
        // let lycHeight = lycLength * 40 + 354; //获取歌词容器的高度

        that.getHeight(that.currentSong, that);
        that.song = res.data;
        that.$apply();
        // 统计歌曲播放次数
        wx.myRequest({
          id: that.song[0].id
        }, _api2.default.songPlayCount, function (res) {
          console.log(res, '统计歌曲播放次数');
        });
      });
    }
  }, {
    key: "onHide",
    value: function onHide() {
      console.log('页面退出了');
    }
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJnTGlzdCIsImltYWdlIiwiaWNvbiIsImxpZ2h0IiwiaWQiLCJ0b2RheSIsInRvZGF5V2VlayIsImN1cnJlbnRMeWNIZWlnaHQiLCJtdXNpY1N0YXR1cyIsImN5Y2xlU29uZyIsInNvbmciLCJseWNyaWVzU3RhdHVzIiwiQURzaG93IiwiY3VycmVudFNvbmciLCJ0aW1lIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJhdWRpb1BsYXkiLCJ0aGF0Iiwid3giLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsImF1ZGlvIiwidGl0bGUiLCJuYW1lIiwiY292ZXJJbWdVcmwiLCIkYXBwbHkiLCJhdWRpb1BhdXNlIiwicGF1c2VCYWNrZ3JvdW5kQXVkaW8iLCJjb2xsZWN0U29uZyIsImluZGV4IiwibXlSZXF1ZXN0IiwiQ29sbGVjdCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXNDb2RlIiwiaXNDb2xsZWN0IiwiY29sbGVjdGVkIiwiZGlzY29sbGVjdFNvbmciLCJkaXNDb2xsZWN0IiwiY3ljbGVTb250Iiwic2V0U3RvcmFnZVN5bmMiLCJzaGFyZVBvc3RlciIsImdldEluZm8iLCJ1c2VySW5mbyIsIl9hdmF0YXJVcmwiLCJhdmF0YXJVcmwiLCJ3b3JkIiwibXVzaWNOYW1lIiwic2hhcmVDb2RlIiwic3JjIiwiZG93bmxvYWRGaWxlIiwidXJsIiwic3VjY2VzcyIsImxvYWRpbmciLCJfaW1hZ2UiLCJ0ZW1wRmlsZVBhdGgiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJsb2FkZWQiLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwiZmFpbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJjYW5jZWwiLCJnZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSIsInN0YXR1cyIsImN1cnJlbnRQb3NpdGlvbiIsIl9zY2FsZSIsImdldFN0b3JhZ2VTeW5jIiwiY2xlYXJJbnRlcnZhbCIsImdldEhlaWdodCIsInBhcmFtcyIsInZpZXciLCJzY2FsZSIsImx5Y0hlaWdodCIsImxlbmd0aCIsIl9oZWlnaHQiLCJzZXRJbnRlcnZhbCIsIm9wdGlvbnMiLCJteWRhdGUiLCJEYXRlIiwiZ2V0RGF5Iiwic3RhdEFkIiwic2V0VGltZW91dCIsIkhvbWUiLCJwbGF5Iiwic29uZ1BsYXlDb3VudCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyxvQ0FBOEIsU0FEdkI7QUFFUEMsOEJBQXdCLE1BRmpCO0FBR1BDLHFCQUFlO0FBSFIsSyxRQUtUQyxJLEdBQU87QUFDTEMsY0FBUSxDQUFDO0FBQ0xDLGVBQU8seURBREY7QUFFTEMsY0FBTSxnRUFGRDtBQUdMQyxlQUFPLCtEQUhGO0FBSUxDLFlBQUk7QUFKQyxPQUFELEVBTU47QUFDRUgsZUFBTyx5REFEVDtBQUVFQyxjQUFNLGdFQUZSO0FBR0VDLGVBQU8sK0RBSFQ7QUFJRUMsWUFBSTtBQUpOLE9BTk0sRUFZTjtBQUNFSCxlQUFPLHlEQURUO0FBRUVDLGNBQU0sZ0VBRlI7QUFHRUMsZUFBTywrREFIVDtBQUlFQyxZQUFJO0FBSk4sT0FaTSxFQWtCTjtBQUNFSCxlQUFPLHlEQURUO0FBRUVDLGNBQU0sZ0VBRlI7QUFHRUMsZUFBTywrREFIVDtBQUlFQyxZQUFJO0FBSk4sT0FsQk0sRUF3Qk47QUFDRUgsZUFBTyx5REFEVDtBQUVFQyxjQUFNLGdFQUZSO0FBR0VDLGVB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aW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiXHJcbiAgaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIlxyXG4gIGltcG9ydCBhcGkgZnJvbSBcIi4uL2NvbW0vYXBpXCJcclxuICBpbXBvcnQgcGxheU11c2ljIGZyb20gXCIuLi9jb21tL211c2ljXCJcclxuICBpbXBvcnQgZ2V0SW5mbyBmcm9tICcuLi9jb21tL2dldFVzZXJJbmZvJ1xyXG4gIGltcG9ydCB0aXAgZnJvbSAnLi4vY29tbS90aXAnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICAgIGRpc2FibGVTY3JvbGw6IHRydWVcclxuICAgIH07XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBiZ0xpc3Q6IFt7XHJcbiAgICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDEucG5nXCIsXHJcbiAgICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMV9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDFfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgICBpZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAyLnBuZ1wiLFxyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDJfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAyX2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgICAgaWQ6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMy5wbmdcIixcclxuICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzX2hlYXJ0cy5wbmdcIixcclxuICAgICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwM19saWdodC5wbmdcIixcclxuICAgICAgICAgIGlkOiAyXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDQucG5nXCIsXHJcbiAgICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNF9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDRfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgICBpZDogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA1LnBuZ1wiLFxyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDVfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA1X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgICAgaWQ6IDRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNi5wbmdcIixcclxuICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNl9saWdodC5wbmdcIixcclxuICAgICAgICAgIGlkOiA1XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDcucG5nXCIsXHJcbiAgICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwN19oZWFydHMucG5nXCIsXHJcbiAgICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDdfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgICBpZDogNlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgdG9kYXk6IDEsIC8v5LuK5aSp5piv5pif5pyf5YegXHJcbiAgICAgIHRvZGF5V2VlazogXCJcIiwgLy/mmJ/mnJ/lh6Doi7HmlodcclxuICAgICAgY3VycmVudEx5Y0hlaWdodDogMCwgLy/lvZPliY3mrYzor43mu5rliqjpq5jluqZcclxuICAgICAgbXVzaWNTdGF0dXM6IHRydWUsXHJcbiAgICAgIGN5Y2xlU29uZzogdHJ1ZSwgLy/mrYzmm7Llvqrnjq8gMSDliJfooajlvqrnjq8gIDAg5Y2V5puy5b6q546vXHJcbiAgICAgIHNvbmc6IHt9LFxyXG4gICAgICBseWNyaWVzU3RhdHVzOiAxLCAvL+atjOivjem7mOiupOaYvuekuixcclxuICAgICAgQURzaG93OiB0cnVlLCAvL+mmlumhteW5v+WRium7mOiupOaYvuekulxyXG4gICAgICBpbWFnZTogXCJcIixcclxuICAgICAgY3VycmVudFNvbmc6e30sXHJcbiAgICAgIHRpbWU6XCJcIiAgIC8v5q2M6K+N6K6h5pe25ZmoXHJcbiAgICB9O1xyXG4gICAgY29tcG9uZW50cyA9IHt9O1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgYXVkaW9QbGF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGF0LnNvbmc7XHJcbiAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICBkYXRhVXJsOiBzb25nLmF1ZGlvLFxyXG4gICAgICAgICAgdGl0bGU6IHNvbmcubmFtZSxcclxuICAgICAgICAgIGNvdmVySW1nVXJsOiBcIlwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tdXNpY1N0YXR1cyA9ICF0aGlzLm11c2ljU3RhdHVzO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGF1ZGlvUGF1c2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHd4LnBhdXNlQmFja2dyb3VuZEF1ZGlvKCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY1N0YXR1cyA9ICF0aGlzLm11c2ljU3RhdHVzO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOaUtuiXj+atjOabslxyXG4gICAgICBjb2xsZWN0U29uZyhpbmRleCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgICAgaWQ6IHRoYXQuc29uZ1swXS5pZFxyXG4gICAgICAgIH0sIGFwaS5Db2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgaXNDb2xsZWN0ID0gdGhhdC5zb25nWzBdLmNvbGxlY3RlZDtcclxuICAgICAgICAgICAgaXNDb2xsZWN0ID0gaXNDb2xsZWN0ID09IDEgPyAwIDogMTtcclxuICAgICAgICAgICAgdGhhdC5zb25nWzBdLmNvbGxlY3RlZCA9IGlzQ29sbGVjdDtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgLy8g5Y+W5raI5pS26JePXHJcbiAgICAgIGRpc2NvbGxlY3RTb25nKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgICAgaWQ6IHRoYXQuc29uZ1swXS5pZFxyXG4gICAgICAgIH0sIGFwaS5kaXNDb2xsZWN0LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgICBsZXQgaXNDb2xsZWN0ID0gdGhhdC5zb25nWzBdLmNvbGxlY3RlZDtcclxuICAgICAgICAgICAgaXNDb2xsZWN0ID0gaXNDb2xsZWN0ID09IDEgPyAwIDogMTtcclxuICAgICAgICAgICAgdGhhdC5zb25nWzBdLmNvbGxlY3RlZCA9IGlzQ29sbGVjdDtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgLy8g5piv5ZCm5Y2V5puy5b6q546vXHJcbiAgICAgIGN5Y2xlU29udCgpIHtcclxuICAgICAgICB0aGlzLmN5Y2xlU29uZyA9IHRoaXMuY3ljbGVTb25nID09IDEgPyAwIDogMTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiY3ljbGVTb25nXCIsIHRoaXMuY3ljbGVTb25nKTtcclxuICAgICAgfSxcclxuICAgICAgLy8g5YiG5Lqr5rW35oqlXHJcbiAgICAgIHNoYXJlUG9zdGVyKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyBsZXQgdGVhY2hlciA9IHRoYXQudGVhY2hlcjtcclxuICAgICAgICBnZXRJbmZvLmdldEluZm8oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBsZXQgdXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgICBpZiAoIXVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBfYXZhdGFyVXJsID0gdXNlckluZm8uYXZhdGFyVXJsO1xyXG4gICAgICAgICAgbGV0IHdvcmQgPSBbdGhhdC5zb25nWzBdLndvcmRbMF0sIHRoYXQuc29uZ1swXS53b3JkWzFdXTtcclxuICAgICAgICAgIGxldCBtdXNpY05hbWUgPSB0aGF0LnNvbmdbMF0ubmFtZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmQsIG11c2ljTmFtZSk7XHJcbiAgICAgICAgICB3eC5teVJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHdvcmQ6IHdvcmQsXHJcbiAgICAgICAgICAgICAgbXVzaWNOYW1lOiBtdXNpY05hbWUsXHJcbiAgICAgICAgICAgICAgYXZhdGFyVXJsOl9hdmF0YXJVcmxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXBpLnNoYXJlQ29kZSxcclxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgIGxldCBzcmMgPSByZXMuZGF0YS5zcmM7XHJcbiAgICAgICAgICAgICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIHVybDogcmVzLmRhdGEuc3JjLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgdGlwLmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgbGV0IF9pbWFnZSA9IHJlcy50ZW1wRmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBfaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXAubG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+a1t+aKpeS4i+i9veaIkOWKn++8jOivt+WOu+ebuOWGjOafpeeciycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDgwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IFtzcmNdXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpcC5sb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ezu+e7n+aXoOazleS/neWtmOWbvueJh+WIsOaCqOeahOebuOWGjO+8jOaYr+WQpuWOu+W8gOWQr+adg+mZkCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IF9pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmtbfmiqXkuIvovb3miJDlip/vvIzor7fljrvnm7jlhozmn6XnnIsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogODAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgIH07XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvd1wiKTtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9QbGF5ZXJTdGF0ZSh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCLov5nph4zmmK/liKvnmoTpobXpnaLlm57mnaXnmoTmrYzmm7Lmkq3mlL7nirbmgIFcIilcclxuICAgICAgICAgIGxldCBzdGF0dXMgPSByZXMuc3RhdHVzO1xyXG4gICAgICAgICAgbGV0IGRhdGFVcmwgPSByZXMuZGF0YVVybDtcclxuICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSByZXMuY3VycmVudFBvc2l0aW9uO1xyXG4gICAgICAgICAgbGV0IGR1cmF0aW9uID0gcmVzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgbGV0IF9zY2FsZSA9IGN1cnJlbnRQb3NpdGlvbi9kdXJhdGlvbjtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfc2NhbGUsXCJfc2NhbGVfc2NhbGVfc2NhbGVfc2NhbGVcIilcclxuICAgICAgICAgIGlmIChzdGF0dXM9PT0xKSB7XHJcbiAgICAgICAgICAgICB0aGF0LmN1cnJlbnRTb25nID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRTb25nJyk7XHJcbiAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGF0LnRpbWUpO1xyXG4gICAgICAgICAgICAgdGhhdC5nZXRIZWlnaHQod3guZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRTb25nJyksdGhhdCxfc2NhbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBjeWNsZVNvbmcgPSB3eC5nZXRTdG9yYWdlU3luYyhcImN5Y2xlU29uZ1wiKTtcclxuICAgICAgaWYgKGN5Y2xlU29uZykge1xyXG4gICAgICAgIHRoaXMuY3ljbGVTb25nID0gY3ljbGVTb25nO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEhlaWdodChwYXJhbXMsIHZpZXcsc2NhbGUpIHtcclxuICAgICAgLy8gcGFyYW1z5b2T5YmN5pKt5pS+5q2M5puy5a+56LGhLCB2aWV36aG16Z2idGhpc+WvueixoSwgc2NhbGXmrYzmm7Lplb/luqZz6Lef5q2M6K+N6KGM5pWw5oC76auY5bqmaOeahOavlOS+i1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGxldCBseWNIZWlnaHQgPSBwYXJhbXMud29yZC5sZW5ndGgqNDAgKyAzNTQ7XHJcbiAgICAgIC8vIGxldCBjdXJyZW50THljSGVpZ2h0ID0gMDtcclxuICAgICAgbGV0IGx5Y3JpZXNTdGF0dXMgPSB2aWV3Lmx5Y3JpZXNTdGF0dXM7XHJcbiAgICAgIGxldCBfaGVpZ2h0ID0gbHljSGVpZ2h0KnNjYWxlP2x5Y0hlaWdodCpzY2FsZTowO1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBjbGVhckludGVydmFsKHRoYXQudGltZSk7XHJcbiAgICAgIGxldCB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9oZWlnaHQpO1xyXG4gICAgICAgIGlmIChfaGVpZ2h0IDwgbHljSGVpZ2h0KSB7XHJcbiAgICAgICAgICBfaGVpZ2h0ID0gX2hlaWdodCArIDE7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lKTtcclxuICAgICAgICAgIF9oZWlnaHQgPSBseWNIZWlnaHQ7XHJcbiAgICAgICAgICBseWNyaWVzU3RhdHVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlldy5jdXJyZW50THljSGVpZ2h0ID0gX2hlaWdodDtcclxuICAgICAgICB2aWV3Lmx5Y3JpZXNTdGF0dXMgPSBseWNyaWVzU3RhdHVzO1xyXG4gICAgICAgIHZpZXcuJGFwcGx5KCk7XHJcbiAgICAgIH0sIDUwKTtcclxuICAgICAgdGhhdC50aW1lID0gdGltZTtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgY29uc29sZS5sb2codGltZSxcInRpbWVcIilcclxuICAgIH1cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwib25Mb2FkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyh3eC5nZXRTdG9yYWdlU3luYygnaWR4JyksXCLlvZPliY3mkq3mlL7nmoTmrYzmm7LnmoTkvY3nva5cIilcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAvLyDpobXpnaLluKbmnaXlj4LmlbBcclxuICAgICAgY29uc29sZS5sb2coXCLpobXpnaLov5vlhaXlj4LmlbBcIiwgb3B0aW9ucywgdGhpcy5zb25nKTtcclxuICAgICAgLy8g5q2M6K+N5o6n5Yi25Ye95pWwXHJcbiAgICAgIC8vIOiOt+WPluS7iuWkqeaYr+aYn+acn+WHoFxyXG4gICAgICBsZXQgbXlkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgbGV0IHRvZGF5ID0gbXlkYXRlLmdldERheSgpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0b2RheSk7XHJcbiAgICAgIHRoaXMudG9kYXkgPSB0b2RheTtcclxuICAgICAgbGV0IHRvZGF5V2VlayA9IFwiXCI7XHJcbiAgICAgIGlmICh0aGlzLnRvZGF5ID09IFwiMFwiKSB7XHJcbiAgICAgICAgdG9kYXlXZWVrID0gXCJTdW5kYXlcIjtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiMVwiKSB7XHJcbiAgICAgICAgdG9kYXlXZWVrID0gXCJNb25kYXlcIjtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiMlwiKSB7XHJcbiAgICAgICAgdG9kYXlXZWVrID0gXCJUdWVzZGF5XCI7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjNcIikge1xyXG4gICAgICAgIHRvZGF5V2VlayA9IFwiV2VkbmVzZGF5XCI7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjRcIikge1xyXG4gICAgICAgIHRvZGF5V2VlayA9IFwiVGh1cnNkYXlcIjtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNVwiKSB7XHJcbiAgICAgICAgdG9kYXlXZWVrID0gXCJGcmlkYXlcIjtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiNlwiKSB7XHJcbiAgICAgICAgdG9kYXlXZWVrID0gXCJTYXR1cmRheVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidG9kYXlXZWVrXCIsIHRvZGF5V2Vlayk7XHJcbiAgICAgIHRoaXMudG9kYXlXZWVrID0gdG9kYXlXZWVrO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAvLyDojrflj5blub/lkYpcclxuICAgICAgd3gubXlSZXF1ZXN0KHt9LCBhcGkuc3RhdEFkLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwi5bm/5ZGK5Zu+54mHXCIpO1xyXG4gICAgICAgIHRoYXQuaW1hZ2UgPSByZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGF0LkFEc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIOiOt+WPlummlumhteaVsOaNriAgIOaSreaUvummlumhtemfs+S5kFxyXG4gICAgICB3eC5teVJlcXVlc3Qoe30sIGFwaS5Ib21lLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICB0aGF0LnNvbmcgPSByZXMuZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSxcIummlumhteatjOabsuaVsOaNrlwiKVxyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgcGxheU11c2ljLnBsYXkodGhhdC5zb25nLCB0aGF0LnNvbmcsIGZhbHNlLDAsIHRoYXQuY3ljbGVTb25nLCB0aGF0LCAtMSk7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJvbGRMaXN0XCIsIHRoYXQuc29uZyk7XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50U29uZyA9IHt9O1xyXG5cclxuICAgICAgICAvLyAg6K6w5b2V55So5oi35LiK5qyh5pKt5pS+5L2N572u5aaC5p6c5rKh5pyJ6buY6K6k5LuO6aaW6aG156ys5LiA6aaW5pKt5pS+XHJcbiAgICAgICAgICAgICBjdXJyZW50U29uZyA9IHRoYXQuc29uZ1swXTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRTb25nLFwiY3VycmVudFNvbmdcIilcclxuICAgICAgICAvLyBpZiAoIWN1cnJlbnRTb25nKSB7XHJcbiAgICAgICAgLy8gICAgd3guc2V0U3RvcmFnZVN5bmMoXCJjdXJyZW50U29uZ1wiLCByZXMuZGF0YVswXSk7XHJcbiAgICAgICAgLy8gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkeCcsIDApXHJcbiAgICAgICAgLy8gICAgY3VycmVudFNvbmcgPSByZXMuZGF0YVswXTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IGN1cnJlbnRTb25nO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gIOaOp+WItuatjOivjVxyXG4gICAgICAgIC8vIGxldCBseWNMZW5ndGggPSB0aGF0LmN1cnJlbnRTb25nLndvcmQubGVuZ3RoOyAvL+iOt+WPluatjOivjeacieWkmuWwkeWPpVxyXG4gICAgICAgIC8vIGxldCBseWNIZWlnaHQgPSBseWNMZW5ndGggKiA0MCArIDM1NDsgLy/ojrflj5bmrYzor43lrrnlmajnmoTpq5jluqZcclxuXHJcbiAgICAgICAgdGhhdC5nZXRIZWlnaHQodGhhdC5jdXJyZW50U29uZyx0aGF0KTtcclxuICAgICAgICB0aGF0LnNvbmcgPSByZXMuZGF0YTtcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIC8vIOe7n+iuoeatjOabsuaSreaUvuasoeaVsFxyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7XHJcbiAgICAgICAgICBpZDogdGhhdC5zb25nWzBdLmlkXHJcbiAgICAgICAgfSwgYXBpLnNvbmdQbGF5Q291bnQsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLCAn57uf6K6h5q2M5puy5pKt5pS+5qyh5pWwJylcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uSGlkZSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+mhtemdoumAgOWHuuS6hicpXHJcbiAgICB9XHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=