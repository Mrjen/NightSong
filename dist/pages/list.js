"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      song: [{
        src: "https://qncdn.playonwechat.com/Fnl_2wObn9udJxEZN21QpOUyvWxo",
        name: "测试歌曲测试歌曲测试歌曲测试歌曲",
        listen_num: "356645",
        musicStatus: "0",
        lycries: [{
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }]
      }, {
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46",
        name: "测试歌曲",
        listen_num: "356645",
        musicStatus: "0",
        lycries: [{
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }]
      }, {
        src: "https://qncdn.playonwechat.com/Fnl_2wObn9udJxEZN21QpOUyvWxo",
        name: "测试歌曲",
        listen_num: "356645",
        musicStatus: "0",
        lycries: [{
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }]
      }, {
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46",
        name: "测试歌曲",
        listen_num: "356645",
        musicStatus: "0",
        lycries: [{
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }, {
          lycry: "测试歌词测试歌词"
        }]
      }]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsInNvbmciLCJzcmMiLCJuYW1lIiwibGlzdGVuX251bSIsIm11c2ljU3RhdHVzIiwibHljcmllcyIsImx5Y3J5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixPQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCLE1BSGpCO0FBSVBDLHFCQUFlO0FBSlIsSyxRQU1UQyxJLEdBQU87QUFDTEMsWUFBTSxDQUNKO0FBQ0VDLGFBQ0UsNkRBRko7QUFHRUMsY0FBTSxrQkFIUjtBQUlFQyxvQkFBWSxRQUpkO0FBS0VDLHFCQUFhLEdBTGY7QUFNRUMsaUJBQVMsQ0FDUDtBQUNFQyxpQkFBTztBQURULFNBRE8sRUFJUDtBQUNFQSxpQkFBTztBQURULFNBSk8sRUFPUDtBQUNFQSxpQkFBTztBQURULFNBUE8sRUFVUDtBQUNFQSxpQkFBTztBQURULFNBVk87QUFOWCxPQURJLEVBc0JKO0FBQ0VMLGFBQ0UsNk9BRko7QUFHRUMsY0FBTSxNQUhSO0FBSUVDLG9CQUFZLFFBSmQ7QUFLRUMscUJBQWEsR0FMZjtBQU1FQyxpQkFBUyxDQUNQO0FBQ0VDLGlCQUFPO0FBRFQsU0FETyxFQUlQO0FBQ0VBLGlCQUFPO0FBRFQsU0FKTyxFQU9QO0FBQ0VBLGlCQUFPO0FBRFQsU0FQTyxFQVVQO0FBQ0VBLGlCQUFPO0FBRFQsU0FWTztBQU5YLE9BdEJJLEVBMkNKO0FBQ0VMLGFBQ0UsNkRBRko7QUFHRUMsY0FBTSxNQUhSO0FBSUVDLG9CQUFZLFFBSmQ7QUFLRUMscUJBQWEsR0FMZjtBQU1FQyxpQkFBUyxDQUNQO0FBQ0VDLGlCQUFPO0FBRFQsU0FETyxFQUlQO0FBQ0VBLGlCQUFPO0FBRFQsU0FKTyxFQU9QO0FBQ0VBLGlCQUFPO0FBRFQsU0FQTyxFQVVQO0FBQ0VBLGlCQUFPO0FBRFQsU0FWTztBQU5YLE9BM0NJLEVBZ0VKO0FBQ0VMLGFBQ0UsNk9BRko7QUFHRUMsY0FBTSxNQUhSO0FBSUVDLG9CQUFZLFFBSmQ7QUFLRUMscUJBQWEsR0FMZjtBQU1FQyxpQkFBUyxDQUNQO0FBQ0VDLGlCQUFPO0FBRFQsU0FETyxFQUlQO0FBQ0VBLGlCQUFPO0FBRFQsU0FKTyxFQU9QO0FBQ0VBLGlCQUFPO0FBRFQsU0FQTyxFQVVQO0FBQ0VBLGlCQUFPO0FBRFQsU0FWTztBQU5YLE9BaEVJO0FBREQsSzs7OztFQVAwQixlQUFLQyxJOztrQkFBbkJkLEsiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLmlLblkKzmjpLooYzmppxcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxMjgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCIsXHJcbiAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgc29uZzogW1xyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOlxyXG4gICAgICAgICAgXCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vRm5sXzJ3T2JuOXVkSnhFWk4yMVFwT1V5dld4b1wiLFxyXG4gICAgICAgIG5hbWU6IFwi5rWL6K+V5q2M5puy5rWL6K+V5q2M5puy5rWL6K+V5q2M5puy5rWL6K+V5q2M5puyXCIsXHJcbiAgICAgICAgbGlzdGVuX251bTogXCIzNTY2NDVcIixcclxuICAgICAgICBtdXNpY1N0YXR1czogXCIwXCIsXHJcbiAgICAgICAgbHljcmllczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGx5Y3J5OiBcIua1i+ivleatjOivjea1i+ivleatjOivjVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzpcclxuICAgICAgICAgIFwiaHR0cDovL3dzLnN0cmVhbS5xcW11c2ljLnFxLmNvbS9NNTAwMDAxVmZ2c0oyMXhGcWIubXAzP2d1aWQ9ZmZmZmZmZmY4MmRlZjRhZjRiMTJiM2NkOTMzN2Q1ZTcmdWluPTM0Njg5NzIyMCZ2a2V5PTYyOTJGNTFFMUUzODRFMDZEQ0JEQzlBQjdDNDlGRDcxM0Q2MzJEMzEzQUM0ODU4QkFDQjhEREQyOTA2N0QzQzYwMTQ4MUQzNkU2MjA1M0JGOERGRUFGNzRDMEE1Q0NGQURENjQ3MTE2MENBRjNFNkEmZnJvbXRhZz00NlwiLFxyXG4gICAgICAgIG5hbWU6IFwi5rWL6K+V5q2M5puyXCIsXHJcbiAgICAgICAgbGlzdGVuX251bTogXCIzNTY2NDVcIixcclxuICAgICAgICBtdXNpY1N0YXR1czogXCIwXCIsXHJcbiAgICAgICAgbHljcmllczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGx5Y3J5OiBcIua1i+ivleatjOivjea1i+ivleatjOivjVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzpcclxuICAgICAgICAgIFwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL0ZubF8yd09ibjl1ZEp4RVpOMjFRcE9VeXZXeG9cIixcclxuICAgICAgICBuYW1lOiBcIua1i+ivleatjOabslwiLFxyXG4gICAgICAgIGxpc3Rlbl9udW06IFwiMzU2NjQ1XCIsXHJcbiAgICAgICAgbXVzaWNTdGF0dXM6IFwiMFwiLFxyXG4gICAgICAgIGx5Y3JpZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGx5Y3J5OiBcIua1i+ivleatjOivjea1i+ivleatjOivjVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6XHJcbiAgICAgICAgICBcImh0dHA6Ly93cy5zdHJlYW0ucXFtdXNpYy5xcS5jb20vTTUwMDAwMVZmdnNKMjF4RnFiLm1wMz9ndWlkPWZmZmZmZmZmODJkZWY0YWY0YjEyYjNjZDkzMzdkNWU3JnVpbj0zNDY4OTcyMjAmdmtleT02MjkyRjUxRTFFMzg0RTA2RENCREM5QUI3QzQ5RkQ3MTNENjMyRDMxM0FDNDg1OEJBQ0I4REREMjkwNjdEM0M2MDE0ODFEMzZFNjIwNTNCRjhERkVBRjc0QzBBNUNDRkFERDY0NzExNjBDQUYzRTZBJmZyb210YWc9NDZcIixcclxuICAgICAgICBuYW1lOiBcIua1i+ivleatjOabslwiLFxyXG4gICAgICAgIGxpc3Rlbl9udW06IFwiMzU2NjQ1XCIsXHJcbiAgICAgICAgbXVzaWNTdGF0dXM6IFwiMFwiLFxyXG4gICAgICAgIGx5Y3JpZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGx5Y3J5OiBcIua1i+ivleatjOivjea1i+ivleatjOivjVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBseWNyeTogXCLmtYvor5XmrYzor43mtYvor5XmrYzor41cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbHljcnk6IFwi5rWL6K+V5q2M6K+N5rWL6K+V5q2M6K+NXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG59XHJcbiJdfQ==