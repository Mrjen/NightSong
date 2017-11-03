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
      song: {}
    }, _this.components = {}, _this.methods = {
      audioPlay: function audioPlay() {
        this.audioCtx.play();
        this.musicStatus = !this.musicStatus;
        this.$apply();
      },
      audioPause: function audioPause() {
        this.audioCtx.pause();
        this.musicStatus = !this.musicStatus;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onPageScroll",
    value: function onPageScroll() {
      console.log("页面滚动了");
    }
  }, {
    key: "onShow",
    value: function onShow() {
      console.log("show");
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      console.log("onLoad");
      var that = this;
      //  音乐

      this.audioCtx = wx.createAudioContext("myAudio");
      this.audioCtx.setSrc("https://qncdn.playonwechat.com/Fnl_2wObn9udJxEZN21QpOUyvWxo");
      this.audioCtx.play();

      function getHeight(params, view) {
        var currentLycHeight = 0;
        var _height = 0;
        var data = {};
        var time = setInterval(function () {
          // console.log(_height);
          if (_height < params) {
            _height += 2;
          } else {
            clearInterval(time);
            _height = params;
          }
          view.currentLycHeight = _height;
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

      this.todayWeek = todayWeek;
      this.$apply();

      // 获取首页数据
      wx.myRequest({}, _api2.default.Home, function (res) {
        that.song = res.data;
        that.$apply();

        //  控制歌词
        var lycLength = that.song.word.length; //获取歌词有多少句
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJiZ0xpc3QiLCJpbWFnZSIsImljb24iLCJsaWdodCIsImlkIiwidG9kYXkiLCJ0b2RheVdlZWsiLCJjdXJyZW50THljSGVpZ2h0IiwibXVzaWNTdGF0dXMiLCJzb25nIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJhdWRpb1BsYXkiLCJhdWRpb0N0eCIsInBsYXkiLCIkYXBwbHkiLCJhdWRpb1BhdXNlIiwicGF1c2UiLCJjb25zb2xlIiwibG9nIiwidGhhdCIsInd4IiwiY3JlYXRlQXVkaW9Db250ZXh0Iiwic2V0U3JjIiwiZ2V0SGVpZ2h0IiwicGFyYW1zIiwidmlldyIsIl9oZWlnaHQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibXlkYXRlIiwiRGF0ZSIsImdldERheSIsIm15UmVxdWVzdCIsIkhvbWUiLCJyZXMiLCJseWNMZW5ndGgiLCJ3b3JkIiwibGVuZ3RoIiwibHljSGVpZ2h0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCLE1BSGpCO0FBSVBDLHFCQUFlO0FBSlIsSyxRQU9UQyxJLEdBQU87QUFDTEMsY0FBUSxDQUNOO0FBQ0VDLGVBQU8seURBRFQ7QUFFRUMsY0FBTSxnRUFGUjtBQUdFQyxlQUFPLCtEQUhUO0FBSUVDLFlBQUk7QUFKTixPQURNLEVBT047QUFDRUgsZUFBTyx5REFEVDtBQUVFQyxjQUFNLGdFQUZSO0FBR0VDLGVBQU8sK0RBSFQ7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QSxJQUFJLEtBQUtELEtBQUwsSUFBYyxHQUFsQixFQUF1QjtBQUM1QkMsb0JBQVksVUFBWjtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUtELEtBQUwsSUFBYyxHQUFsQixFQUF1QjtBQUM1QkMsb0JBQVksUUFBWjtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUtELEtBQUwsSUFBYyxHQUFsQixFQUF1QjtBQUM1QkMsb0JBQVksVUFBWjtBQUNEOztBQUVELFdBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsV0FBS1MsTUFBTDs7QUFFQTtBQUNBTSxTQUFHYSxTQUFILENBQWEsRUFBYixFQUFpQixjQUFJQyxJQUFyQixFQUEyQixVQUFTQyxHQUFULEVBQWM7QUFDdkNoQixhQUFLWCxJQUFMLEdBQVkyQixJQUFJckMsSUFBaEI7QUFDQXFCLGFBQUtMLE1BQUw7O0FBRUE7QUFDQSxZQUFJc0IsWUFBWWpCLEtBQUtYLElBQUwsQ0FBVTZCLElBQVYsQ0FBZUMsTUFBL0IsQ0FMdUMsQ0FLQTtBQUN2QyxZQUFJQyxZQUFZSCxZQUFZLEVBQTVCLENBTnVDLENBTVA7QUFDaENiLGtCQUFVZ0IsU0FBVixFQUFvQnBCLElBQXBCO0FBQ0FBLGFBQUtYLElBQUwsR0FBWTJCLElBQUlyQyxJQUFoQjtBQUNBcUIsYUFBS0wsTUFBTDtBQUNELE9BVkQ7QUFXRDs7OztFQXBKZ0MsZUFBSzBCLEk7O2tCQUFuQmhELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vY29tbS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5LiA5aSc5LiA5puyXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiLFxyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBiZ0xpc3Q6IFtcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMS5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMV9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAxX2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDIucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDJfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwMl9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzLnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzAzX2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDNfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNC5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNF9oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA0X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiAzXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWFnZTogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDUucG5nXCIsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDVfaGVhcnRzLnBuZ1wiLFxyXG4gICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNV9saWdodC5wbmdcIixcclxuICAgICAgICBpZDogNFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2LnBuZ1wiLFxyXG4gICAgICAgIGljb246IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA2X2hlYXJ0cy5wbmdcIixcclxuICAgICAgICBsaWdodDogXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vTmlnaHRTb25nL25pZ2h0X2JnMDZfbGlnaHQucG5nXCIsXHJcbiAgICAgICAgaWQ6IDVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltYWdlOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwNy5wbmdcIixcclxuICAgICAgICBpY29uOiBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9OaWdodFNvbmcvbmlnaHRfYmcwN19oZWFydHMucG5nXCIsXHJcbiAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL05pZ2h0U29uZy9uaWdodF9iZzA3X2xpZ2h0LnBuZ1wiLFxyXG4gICAgICAgIGlkOiA2XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0b2RheTogMSwgLy/ku4rlpKnmmK/mmJ/mnJ/lh6BcclxuICAgIHRvZGF5V2VlazogXCJcIiwgLy/mmJ/mnJ/lh6Doi7HmlodcclxuICAgIGN1cnJlbnRMeWNIZWlnaHQ6IDAsIC8v5b2T5YmN5q2M6K+N5rua5Yqo6auY5bqmXHJcbiAgICBtdXNpY1N0YXR1czogdHJ1ZSxcclxuICAgIHNvbmc6IHt9XHJcbiAgfTtcclxuXHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgYXVkaW9QbGF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5hdWRpb0N0eC5wbGF5KCk7XHJcbiAgICAgIHRoaXMubXVzaWNTdGF0dXMgPSAhdGhpcy5tdXNpY1N0YXR1cztcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcbiAgICBhdWRpb1BhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5hdWRpb0N0eC5wYXVzZSgpO1xyXG4gICAgICB0aGlzLm11c2ljU3RhdHVzID0gIXRoaXMubXVzaWNTdGF0dXM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25QYWdlU2Nyb2xsKCkge1xyXG4gICAgY29uc29sZS5sb2coXCLpobXpnaLmu5rliqjkuoZcIik7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInNob3dcIik7XHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uTG9hZFwiKTtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIC8vICDpn7PkuZBcclxuXHJcbiAgICB0aGlzLmF1ZGlvQ3R4ID0gd3guY3JlYXRlQXVkaW9Db250ZXh0KFwibXlBdWRpb1wiKTtcclxuICAgIHRoaXMuYXVkaW9DdHguc2V0U3JjKFxyXG4gICAgICBcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9GbmxfMndPYm45dWRKeEVaTjIxUXBPVXl2V3hvXCJcclxuICAgICk7XHJcbiAgICB0aGlzLmF1ZGlvQ3R4LnBsYXkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRIZWlnaHQocGFyYW1zLCB2aWV3KSB7XHJcbiAgICAgIGxldCBjdXJyZW50THljSGVpZ2h0ID0gMDtcclxuICAgICAgbGV0IF9oZWlnaHQgPSAwO1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBsZXQgdGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfaGVpZ2h0KTtcclxuICAgICAgICBpZiAoX2hlaWdodCA8IHBhcmFtcykge1xyXG4gICAgICAgICAgX2hlaWdodCArPSAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpO1xyXG4gICAgICAgICAgX2hlaWdodCA9IHBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlldy5jdXJyZW50THljSGVpZ2h0ID0gX2hlaWdodDtcclxuICAgICAgICB2aWV3LiRhcHBseSgpO1xyXG4gICAgICB9LCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5LuK5aSp5piv5pif5pyf5YegXHJcbiAgICBsZXQgbXlkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCB0b2RheSA9IG15ZGF0ZS5nZXREYXkoKTtcclxuICAgIGNvbnNvbGUubG9nKHRvZGF5KTtcclxuICAgIHRoaXMudG9kYXkgPSB0b2RheTtcclxuICAgIGxldCB0b2RheVdlZWsgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMudG9kYXkgPT0gXCIwXCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJTdW5kYXlcIlxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiMVwiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiTW9uZGF5XCJcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjJcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlR1ZXNkYXlcIlxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvZGF5ID09IFwiM1wiKSB7XHJcbiAgICAgIHRvZGF5V2VlayA9IFwiV2VkbmVzZGF5XCJcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjRcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIlRodXJzZGF5XCJcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b2RheSA9PSBcIjVcIikge1xyXG4gICAgICB0b2RheVdlZWsgPSBcIkZyaWRheVwiXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9kYXkgPT0gXCI2XCIpIHtcclxuICAgICAgdG9kYXlXZWVrID0gXCJTYXR1cmRheVwiXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b2RheVdlZWsgPSB0b2RheVdlZWs7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG5cclxuICAgIC8vIOiOt+WPlummlumhteaVsOaNrlxyXG4gICAgd3gubXlSZXF1ZXN0KHt9LCBhcGkuSG9tZSwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIHRoYXQuc29uZyA9IHJlcy5kYXRhO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgLy8gIOaOp+WItuatjOivjVxyXG4gICAgICBsZXQgbHljTGVuZ3RoID0gdGhhdC5zb25nLndvcmQubGVuZ3RoOyAvL+iOt+WPluatjOivjeacieWkmuWwkeWPpVxyXG4gICAgICBsZXQgbHljSGVpZ2h0ID0gbHljTGVuZ3RoICogNDA7IC8v6I635Y+W5q2M6K+N5a655Zmo55qE6auY5bqmXHJcbiAgICAgIGdldEhlaWdodChseWNIZWlnaHQsdGhhdClcclxuICAgICAgdGhhdC5zb25nID0gcmVzLmRhdGE7XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19