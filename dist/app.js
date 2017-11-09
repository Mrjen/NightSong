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
      pages: ["pages/index", 'pages/collect', "pages/list", "pages/adpage"],
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
      var extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
      var kid = extConfig.kid ? extConfig.kid : '451';
      _wepy2.default.login({
        success: function success(res) {
          wx.myRequest({ code: res.code, kid: kid }, _api2.default.auth, function (res) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsInRlc3RBc3luYyIsImV4dENvbmZpZyIsInd4IiwiZ2V0RXh0Q29uZmlnU3luYyIsImtpZCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsIm15UmVxdWVzdCIsImNvZGUiLCJhdXRoIiwiY29uc29sZSIsImxvZyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjYiIsInRoYXQiLCJnZXRVc2VySW5mbyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBbEJkQSxNQWtCYyxHQWxCTDtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGVBRkssRUFHTCxZQUhLLEVBSUosY0FKSSxDQURBO0FBT1BDLGNBQVE7QUFDTkMsZ0NBQXdCLE1BRGxCO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0I7QUFIbEI7QUFQRCxLQWtCSztBQUFBLFVBSmRDLFVBSWMsR0FKRDtBQUNYQyxnQkFBVTtBQURDLEtBSUM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGWTtBQUdiOzs7OytCQUVVO0FBQ1QsV0FBS0MsU0FBTCxDQUFlLFVBQWY7QUFDQSxVQUFJQyxZQUFZQyxHQUFHQyxnQkFBSCxHQUFzQkQsR0FBR0MsZ0JBQUgsRUFBdEIsR0FBOEMsRUFBOUQ7QUFDQSxVQUFJQyxNQUFNSCxVQUFVRyxHQUFWLEdBQWNILFVBQVVHLEdBQXhCLEdBQTRCLEtBQXRDO0FBQ0EscUJBQUtDLEtBQUwsQ0FBVztBQUNUQyxlQURTLG1CQUNEQyxHQURDLEVBQ0k7QUFDWEwsYUFBR00sU0FBSCxDQUFhLEVBQUNDLE1BQUtGLElBQUlFLElBQVYsRUFBZUwsS0FBSUEsR0FBbkIsRUFBYixFQUFzQyxjQUFJTSxJQUExQyxFQUFnRCxVQUFTSCxHQUFULEVBQWM7QUFDNURJLG9CQUFRQyxHQUFSLENBQVksTUFBWjtBQUNELFdBRkQ7QUFHRDtBQUxRLE9BQVg7QUFPRDs7OzBCQUVLQyxDLEVBQUc7QUFDUCxhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7Ozs7Ozt1QkFHb0IsS0FBS0ssS0FBTCxDQUFXLENBQVgsQzs7O0FBQWJDLG9COztBQUNOUix3QkFBUUMsR0FBUixDQUFZTyxJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBR1VDLEUsRUFBSTtBQUNkLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBS3hCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLd0IsV0FBTCxDQUFpQjtBQUNmaEIsZUFEZSxtQkFDUEMsR0FETyxFQUNGO0FBQ1hjLGVBQUt4QixVQUFMLENBQWdCQyxRQUFoQixHQUEyQlMsSUFBSVQsUUFBL0I7QUFDQXNCLGdCQUFNQSxHQUFHYixJQUFJVCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUE3RDBCLGVBQUt5QixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgXCJ3ZXB5LWFzeW5jLWZ1bmN0aW9uXCI7XHJcbmltcG9ydCBteVJlcXVlc3QgZnJvbSBcIi4vY29tbS93eFJlcXVlc3RcIlxyXG5pbXBvcnQgYXBpIGZyb20gJy4vY29tbS9hcGknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbIFxyXG4gICAgICBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcclxuICAgICAgXCJwYWdlcy9saXN0XCIsXHJcbiAgICAgICBcInBhZ2VzL2FkcGFnZVwiXHJcbiAgICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLkuIDlpJzkuIDmm7JcIixcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMjEyODJlXCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy51c2UoXCJyZXF1ZXN0Zml4XCIpO1xyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLnRlc3RBc3luYyhcIm9uTGF1bmNoXCIpO1xyXG4gICAgbGV0IGV4dENvbmZpZyA9IHd4LmdldEV4dENvbmZpZ1N5bmMgPyB3eC5nZXRFeHRDb25maWdTeW5jKCkgOiB7fVxyXG4gICAgbGV0IGtpZCA9IGV4dENvbmZpZy5raWQ/ZXh0Q29uZmlnLmtpZDonNDUxJztcclxuICAgIHdlcHkubG9naW4oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHd4Lm15UmVxdWVzdCh7Y29kZTpyZXMuY29kZSxraWQ6a2lkfSwgYXBpLmF1dGgsIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLmjojmnYPmiJDlip9cIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzbGVlcChzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKFwicHJvbWlzZSByZXNvbHZlZFwiKTtcclxuICAgICAgfSwgcyAqIDEwMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB0ZXN0QXN5bmMoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=