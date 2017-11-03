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
      pages: ["pages/index", "pages/list", 'pages/collect'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsInRlc3RBc3luYyIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsInd4IiwibXlSZXF1ZXN0IiwiY29kZSIsImF1dGgiLCJjb25zb2xlIiwibG9nIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFuQmRBLE1BbUJjLEdBbkJMO0FBQ1BDLGFBQU8sQ0FDSixhQURJLEVBRUwsWUFGSyxFQUlMLGVBSkssQ0FEQTtBQVFQQyxjQUFRO0FBQ05DLGdDQUF3QixNQURsQjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCO0FBSGxCO0FBUkQsS0FtQks7QUFBQSxVQUpkQyxVQUljLEdBSkQ7QUFDWEMsZ0JBQVU7QUFEQyxLQUlDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRlk7QUFHYjs7OzsrQkFFVTtBQUNULFdBQUtDLFNBQUwsQ0FBZSxVQUFmO0FBQ0EscUJBQUtDLEtBQUwsQ0FBVztBQUNUQyxlQURTLG1CQUNEQyxHQURDLEVBQ0k7QUFDWEMsYUFBR0MsU0FBSCxDQUFhLEVBQUNDLE1BQUtILElBQUlHLElBQVYsRUFBYixFQUE4QixjQUFJQyxJQUFsQyxFQUF3QyxVQUFTSixHQUFULEVBQWM7QUFDcERLLG9CQUFRQyxHQUFSLENBQVksTUFBWjtBQUNELFdBRkQ7QUFHRDtBQUxRLE9BQVg7QUFPRDs7OzBCQUVLQyxDLEVBQUc7QUFDUCxhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7Ozs7Ozt1QkFHb0IsS0FBS0ssS0FBTCxDQUFXLENBQVgsQzs7O0FBQWJDLG9COztBQUNOUix3QkFBUUMsR0FBUixDQUFZTyxJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBR1VDLEUsRUFBSTtBQUNkLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBS3JCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLcUIsV0FBTCxDQUFpQjtBQUNmakIsZUFEZSxtQkFDUEMsR0FETyxFQUNGO0FBQ1hlLGVBQUtyQixVQUFMLENBQWdCQyxRQUFoQixHQUEyQkssSUFBSUwsUUFBL0I7QUFDQW1CLGdCQUFNQSxHQUFHZCxJQUFJTCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUE1RDBCLGVBQUtzQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgXCJ3ZXB5LWFzeW5jLWZ1bmN0aW9uXCI7XHJcbmltcG9ydCBteVJlcXVlc3QgZnJvbSBcIi4vY29tbS93eFJlcXVlc3RcIlxyXG5pbXBvcnQgYXBpIGZyb20gJy4vY29tbS9hcGknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbIFxyXG4gICAgICAgXCJwYWdlcy9pbmRleFwiLFxyXG4gICAgICBcInBhZ2VzL2xpc3RcIixcclxuICAgICAgXHJcbiAgICAgICdwYWdlcy9jb2xsZWN0J1xyXG4gICAgIFxyXG4gICAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5LiA5aSc5LiA5puyXCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxMjgyZVwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudXNlKFwicmVxdWVzdGZpeFwiKTtcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgdGhpcy50ZXN0QXN5bmMoXCJvbkxhdW5jaFwiKTtcclxuICAgIHdlcHkubG9naW4oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7Y29kZTpyZXMuY29kZX0sIGFwaS5hdXRoLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6I5p2D5oiQ5YqfXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2xlZXAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShcInByb21pc2UgcmVzb2x2ZWRcIik7XHJcbiAgICAgIH0sIHMgKiAxMDAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdGVzdEFzeW5jKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMyk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19