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
      image: ""
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var image = "";
      var that = this;
      wx.myRequest({}, _api2.default.statAd, function (res) {
        console.log(res);
        that.image = res.data.image;
        that.$apply();
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../pages/index'
        });
        wx.setStorageSync("navto", 0);
      }, 3000);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/adpage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkcGFnZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRpc2FibGVTY3JvbGwiLCJkYXRhIiwiaW1hZ2UiLCJ0aGF0Iiwid3giLCJteVJlcXVlc3QiLCJzdGF0QWQiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5Iiwic2V0VGltZW91dCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QixNQUhqQjtBQUlQQyxxQkFBZTtBQUpSLEssUUFNVEMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLOzs7Ozs2QkFHRTtBQUNQLFVBQUlBLFFBQVEsRUFBWjtBQUNBLFVBQUlDLE9BQU8sSUFBWDtBQUNBQyxTQUFHQyxTQUFILENBQWEsRUFBYixFQUFpQixjQUFJQyxNQUFyQixFQUE2QixVQUFTQyxHQUFULEVBQWM7QUFDekNDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQUosYUFBS0QsS0FBTCxHQUFhSyxJQUFJTixJQUFKLENBQVNDLEtBQXRCO0FBQ0FDLGFBQUtPLE1BQUw7QUFDRCxPQUpEO0FBS0FDLGlCQUFXLFlBQVc7QUFDcEJQLFdBQUdRLFVBQUgsQ0FBYztBQUNaQyxlQUFLO0FBRE8sU0FBZDtBQUdBVCxXQUFHVSxjQUFILENBQWtCLE9BQWxCLEVBQTJCLENBQTNCO0FBQ0QsT0FMRCxFQUtHLElBTEg7QUFNRDs7OztFQXhCZ0MsZUFBS0MsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJhZHBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tIFwiLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vY29tbS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5LiA5aSc5LiA5puyXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiLFxyXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGltYWdlOiBcIlwiXHJcbiAgfTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgaW1hZ2UgPSBcIlwiO1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gubXlSZXF1ZXN0KHt9LCBhcGkuc3RhdEFkLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgdGhhdC5pbWFnZSA9IHJlcy5kYXRhLmltYWdlO1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbmRleCdcclxuICAgICAgfSk7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwibmF2dG9cIiwgMCk7XHJcbiAgICB9LCAzMDAwKTtcclxuICB9XHJcbn1cclxuIl19