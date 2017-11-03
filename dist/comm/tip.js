'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 提示与加载工具类
 */
var Tips = function () {
    function Tips() {
        _classCallCheck(this, Tips);

        this.isLoading = false;
    }
    /**
     * 弹出提示框
     */

    _createClass(Tips, null, [{
        key: 'success',
        value: function success(title) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

            wx.showToast({
                title: title,
                icon: 'success',
                mask: true,
                duration: duration
            });
            if (duration > 0) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, duration);
                });
            }
        }

        /**
         * 弹出确认窗口
         */

    }, {
        key: 'confirm',
        value: function confirm(text) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '提示';

            return new Promise(function (resolve, reject) {
                wx.showModal({
                    title: title,
                    content: text,
                    showCancel: true,
                    success: function success(res) {
                        if (res.confirm) {
                            resolve(payload);
                        } else if (res.cancel) {
                            reject(payload);
                        }
                    },
                    fail: function fail(res) {
                        reject(payload);
                    }
                });
            });
        }
    }, {
        key: 'toast',
        value: function toast(title, onHide) {
            var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';

            wx.showToast({
                title: title,
                icon: icon,
                mask: true,
                duration: 500
            });
            // 隐藏结束回调
            // if (onHide) {
            //     setTimeout(() => {
            //         onHide()
            //     }, 500)
            // }
        }

        /**
         * 警告框
         */

    }, {
        key: 'alert',
        value: function alert(title) {
            wx.showToast({
                title: title,
                image: '../images/alert.png',
                mask: true,
                duration: 1500
            });
        }

        /**
         * 错误框
         */

    }, {
        key: 'error',
        value: function error(title, onHide) {
            wx.showToast({
                title: title,
                image: '../images/error.png',
                mask: true,
                duration: 500
            });
            // 隐藏结束回调
            if (onHide) {
                setTimeout(function () {
                    onHide();
                }, 500);
            }
        }

        /**
         * 弹出加载提示
         */

    }, {
        key: 'loading',
        value: function loading() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '加载中';

            if (Tips.isLoading) {
                return;
            }
            Tips.isLoading = true;
            wx.showLoading({
                title: title,
                mask: true
            });
        }

        /**
         * 加载完毕
         */

    }, {
        key: 'loaded',
        value: function loaded() {
            if (Tips.isLoading) {
                Tips.isLoading = false;
                wx.hideLoading();
            }
        }
    }, {
        key: 'share',
        value: function share(title, url, desc) {
            return {
                title: title,
                path: url,
                desc: desc,
                success: function success(res) {
                    Tips.toast('分享成功');
                }
            };
        }
    }]);

    return Tips;
}();

/**
 * 静态变量，是否加载中
 */

exports.default = Tips;
Tips.isLoading = false;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpcC5qcyJdLCJuYW1lcyI6WyJUaXBzIiwiaXNMb2FkaW5nIiwidGl0bGUiLCJkdXJhdGlvbiIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsIm1hc2siLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJ0ZXh0IiwicGF5bG9hZCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJmYWlsIiwib25IaWRlIiwiaW1hZ2UiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwidXJsIiwiZGVzYyIsInBhdGgiLCJ0b2FzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBLEk7QUFDakIsb0JBQWM7QUFBQTs7QUFDVixhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDRDs7Ozs7O2dDQUllQyxLLEVBQXVCO0FBQUEsZ0JBQWhCQyxRQUFnQix1RUFBTCxHQUFLOztBQUNsQ0MsZUFBR0MsU0FBSCxDQUFhO0FBQ1RILHVCQUFPQSxLQURFO0FBRVRJLHNCQUFNLFNBRkc7QUFHVEMsc0JBQU0sSUFIRztBQUlUSiwwQkFBVUE7QUFKRCxhQUFiO0FBTUEsZ0JBQUlBLFdBQVcsQ0FBZixFQUFrQjtBQUNkLHVCQUFPLElBQUlLLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENDLCtCQUFXLFlBQU07QUFDYkY7QUFDSCxxQkFGRCxFQUVHTixRQUZIO0FBR0gsaUJBSk0sQ0FBUDtBQUtIO0FBQ0o7O0FBRUQ7Ozs7OztnQ0FHZVMsSSxFQUFrQztBQUFBLGdCQUE1QkMsT0FBNEIsdUVBQWxCLEVBQWtCO0FBQUEsZ0JBQWRYLEtBQWMsdUVBQU4sSUFBTTs7QUFDN0MsbUJBQU8sSUFBSU0sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ04sbUJBQUdVLFNBQUgsQ0FBYTtBQUNUWiwyQkFBT0EsS0FERTtBQUVUYSw2QkFBU0gsSUFGQTtBQUdUSSxnQ0FBWSxJQUhIO0FBSVRDLDZCQUFTLHNCQUFPO0FBQ1osNEJBQUlDLElBQUlDLE9BQVIsRUFBaUI7QUFDYlYsb0NBQVFJLE9BQVI7QUFDSCx5QkFGRCxNQUVPLElBQUlLLElBQUlFLE1BQVIsRUFBZ0I7QUFDbkJWLG1DQUFPRyxPQUFQO0FBQ0g7QUFDSixxQkFWUTtBQVdUUSwwQkFBTSxtQkFBTztBQUNUWCwrQkFBT0csT0FBUDtBQUNIO0FBYlEsaUJBQWI7QUFlSCxhQWhCTSxDQUFQO0FBaUJIOzs7OEJBRVlYLEssRUFBT29CLE0sRUFBMEI7QUFBQSxnQkFBbEJoQixJQUFrQix1RUFBWCxTQUFXOztBQUMxQ0YsZUFBR0MsU0FBSCxDQUFhO0FBQ1RILHVCQUFPQSxLQURFO0FBRVRJLHNCQUFNQSxJQUZHO0FBR1RDLHNCQUFNLElBSEc7QUFJVEosMEJBQVU7QUFKRCxhQUFiO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7Ozs7Ozs4QkFHYUQsSyxFQUFPO0FBQ2hCRSxlQUFHQyxTQUFILENBQWE7QUFDVEgsdUJBQU9BLEtBREU7QUFFVHFCLHVCQUFPLHFCQUZFO0FBR1RoQixzQkFBTSxJQUhHO0FBSVRKLDBCQUFVO0FBSkQsYUFBYjtBQU1IOztBQUVEOzs7Ozs7OEJBSWFELEssRUFBT29CLE0sRUFBUTtBQUN4QmxCLGVBQUdDLFNBQUgsQ0FBYTtBQUNUSCx1QkFBT0EsS0FERTtBQUVUcUIsdUJBQU8scUJBRkU7QUFHVGhCLHNCQUFNLElBSEc7QUFJVEosMEJBQVU7QUFKRCxhQUFiO0FBTUE7QUFDQSxnQkFBSW1CLE1BQUosRUFBWTtBQUNSWCwyQkFBVyxZQUFNO0FBQ2JXO0FBQ0gsaUJBRkQsRUFFRyxHQUZIO0FBR0g7QUFDSjs7QUFFRDs7Ozs7O2tDQUc4QjtBQUFBLGdCQUFmcEIsS0FBZSx1RUFBUCxLQUFPOztBQUMxQixnQkFBSUYsS0FBS0MsU0FBVCxFQUFvQjtBQUNoQjtBQUNIO0FBQ0RELGlCQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0FHLGVBQUdvQixXQUFILENBQWU7QUFDWHRCLHVCQUFPQSxLQURJO0FBRVhLLHNCQUFNO0FBRkssYUFBZjtBQUlIOztBQUVEOzs7Ozs7aUNBR2dCO0FBQ1osZ0JBQUlQLEtBQUtDLFNBQVQsRUFBb0I7QUFDaEJELHFCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FHLG1CQUFHcUIsV0FBSDtBQUNIO0FBQ0o7Ozs4QkFJWXZCLEssRUFBT3dCLEcsRUFBS0MsSSxFQUFNO0FBQzNCLG1CQUFPO0FBQ0h6Qix1QkFBT0EsS0FESjtBQUVIMEIsc0JBQU1GLEdBRkg7QUFHSEMsc0JBQU1BLElBSEg7QUFJSFYseUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQmxCLHlCQUFLNkIsS0FBTCxDQUFXLE1BQVg7QUFDSDtBQU5FLGFBQVA7QUFRSDs7Ozs7O0FBR0w7Ozs7a0JBbklxQjdCLEk7QUF1SXJCQSxLQUFLQyxTQUFMLEdBQWlCLEtBQWpCIiwiZmlsZSI6InRpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmj5DnpLrkuI7liqDovb3lt6XlhbfnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnlh7rmj5DnpLrmoYZcclxuICAgICAqL1xyXG5cclxuICAgIHN0YXRpYyBzdWNjZXNzKHRpdGxlLCBkdXJhdGlvbiA9IDUwMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by55Ye656Gu6K6k56qX5Y+jXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb25maXJtKHRleHQsIHBheWxvYWQgPSB7fSwgdGl0bGUgPSAn5o+Q56S6Jykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdG9hc3QodGl0bGUsIG9uSGlkZSwgaWNvbiA9ICdzdWNjZXNzJykge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgaWNvbjogaWNvbixcclxuICAgICAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6ZqQ6JeP57uT5p2f5Zue6LCDXHJcbiAgICAgICAgLy8gaWYgKG9uSGlkZSkge1xyXG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIG9uSGlkZSgpXHJcbiAgICAgICAgLy8gICAgIH0sIDUwMClcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrmoYZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFsZXJ0KHRpdGxlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlcy9hbGVydC5wbmcnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplJnor6/moYZcclxuICAgICAqL1xyXG5cclxuICAgIHN0YXRpYyBlcnJvcih0aXRsZSwgb25IaWRlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlcy9lcnJvci5wbmcnLFxyXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDpmpDol4/nu5PmnZ/lm57osINcclxuICAgICAgICBpZiAob25IaWRlKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb25IaWRlKClcclxuICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8ueWHuuWKoOi9veaPkOekulxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZGluZyh0aXRsZSA9ICfliqDovb3kuK0nKSB7XHJcbiAgICAgICAgaWYgKFRpcHMuaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBUaXBzLmlzTG9hZGluZyA9IHRydWVcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgbWFzazogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3lrozmr5VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRlZCgpIHtcclxuICAgICAgICBpZiAoVGlwcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgVGlwcy5pc0xvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc3RhdGljIHNoYXJlKHRpdGxlLCB1cmwsIGRlc2MpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIHBhdGg6IHVybCxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgVGlwcy50b2FzdCgn5YiG5Lqr5oiQ5YqfJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOmdmeaAgeWPmOmHj++8jOaYr+WQpuWKoOi9veS4rVxyXG4gKi9cclxuXHJcblRpcHMuaXNMb2FkaW5nID0gZmFsc2U7Il19