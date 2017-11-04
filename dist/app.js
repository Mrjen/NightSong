"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wxRequest = require('./comm/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

var _api = require('./comm/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ["pages/adpage", "pages/index", "pages/list", 'pages/collect'],
      window: {
        navigationBarTitleText: "一夜一曲",
        navigationBarBackgroundColor: "#21282e",
        navigationBarTextStyle: "#fff"
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use("requestfix");
    return _this;
  }

  _createClass(_default, [{
    key: "onLaunch",
    value: function onLaunch() {
      this.testAsync("onLaunch");
      _wepy2.default.login({
        success: function success(res) {
          wx.myRequest({ code: res.code }, _api2.default.auth, function (res) {
            console.log("授权成功");
          });
        }
      });
    }
  }, {
    key: "sleep",
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve("promise resolved");
        }, s * 1000);
      });
    }
  }, {
    key: "testAsync",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: "getUserInfo",
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsInRlc3RBc3luYyIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsInd4IiwibXlSZXF1ZXN0IiwiY29kZSIsImF1dGgiLCJjb25zb2xlIiwibG9nIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFwQmRBLE1Bb0JjLEdBcEJMO0FBQ1BDLGFBQU8sQ0FDSixjQURJLEVBRUosYUFGSSxFQUdKLFlBSEksRUFLTCxlQUxLLENBREE7QUFTUEMsY0FBUTtBQUNOQyxnQ0FBd0IsTUFEbEI7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QjtBQUhsQjtBQVRELEtBb0JLO0FBQUEsVUFKZEMsVUFJYyxHQUpEO0FBQ1hDLGdCQUFVO0FBREMsS0FJQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZZO0FBR2I7Ozs7K0JBRVU7QUFDVCxXQUFLQyxTQUFMLENBQWUsVUFBZjtBQUNBLHFCQUFLQyxLQUFMLENBQVc7QUFDVEMsZUFEUyxtQkFDREMsR0FEQyxFQUNJO0FBQ1hDLGFBQUdDLFNBQUgsQ0FBYSxFQUFDQyxNQUFLSCxJQUFJRyxJQUFWLEVBQWIsRUFBOEIsY0FBSUMsSUFBbEMsRUFBd0MsVUFBU0osR0FBVCxFQUFjO0FBQ3BESyxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDRCxXQUZEO0FBR0Q7QUFMUSxPQUFYO0FBT0Q7OzswQkFFS0MsQyxFQUFHO0FBQ1AsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7dUJBR29CLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQjs7QUFDTlIsd0JBQVFDLEdBQVIsQ0FBWU8sSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdVQyxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtyQixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS3FCLFdBQUwsQ0FBaUI7QUFDZmpCLGVBRGUsbUJBQ1BDLEdBRE8sRUFDRjtBQUNYZSxlQUFLckIsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJLLElBQUlMLFFBQS9CO0FBQ0FtQixnQkFBTUEsR0FBR2QsSUFBSUwsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7O0VBN0QwQixlQUFLc0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IFwid2VweS1hc3luYy1mdW5jdGlvblwiO1xyXG5pbXBvcnQgbXlSZXF1ZXN0IGZyb20gXCIuL2NvbW0vd3hSZXF1ZXN0XCJcclxuaW1wb3J0IGFwaSBmcm9tICcuL2NvbW0vYXBpJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogWyBcclxuICAgICAgIFwicGFnZXMvYWRwYWdlXCIsXHJcbiAgICAgICBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgICBcInBhZ2VzL2xpc3RcIixcclxuICAgICAgIFxyXG4gICAgICAncGFnZXMvY29sbGVjdCdcclxuICAgICBcclxuICAgICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuS4gOWknOS4gOabslwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMyMTI4MmVcIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCJcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnVzZShcInJlcXVlc3RmaXhcIik7XHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHRoaXMudGVzdEFzeW5jKFwib25MYXVuY2hcIik7XHJcbiAgICB3ZXB5LmxvZ2luKHtcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICB3eC5teVJlcXVlc3Qoe2NvZGU6cmVzLmNvZGV9LCBhcGkuYXV0aCwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOiOadg+aIkOWKn1wiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNsZWVwKHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoXCJwcm9taXNlIHJlc29sdmVkXCIpO1xyXG4gICAgICB9LCBzICogMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHRlc3RBc3luYygpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpO1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==