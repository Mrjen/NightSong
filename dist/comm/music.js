"use strict";

var play = function play(oldList, newList, changelist, idx) {
    //旧的播放列表   新的播放列表  ，是否切换播放列表 ，播放歌曲的index
    console.log(changelist);
    var i = idx ? idx : 0;
    if (changelist) {
        wx.getBackgroundAudioPlayerState({
            success: function success(res) {
                console.log(res);
                var currentPosition = res.currentPosition; //当前音乐播放位置s(秒)
                var duration = res.duration; //当前音乐总长度s（秒）
                var dataUrl = res.dataUrl; //当前音乐链接
                var lcriesH = new Number(); //歌词容器总高度
                console.log(oldList, '原来的播放列表');
                for (var _i = 0; _i < oldList; _i++) {
                    if (dataUrl == oldList[_i].audio) {
                        lcriesH = oldList[_i].word.length * 40;
                    }
                }
                var progress = currentPosition / duration * lcriesH;
                console.log("这里人为点击 切换列表");
                console.log("oldList 旧的播放列表1", oldList, "newList 新的歌曲列表", newList);
                oldList = newList;
                console.log("oldList 旧的播放列表2", oldList, "newList 旧的播放列表", newList);
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
                console.log(progress, "歌词播放进度");
                wx.onBackgroundAudioStop(function () {

                    console.log("oldList 旧的播放列表3", "i 的值", i, oldList);
                    i = i - 1;
                    if (i < 0) {
                        i = 0;
                    }
                    wx.playBackgroundAudio({
                        dataUrl: oldList[i].audio,
                        title: oldList[i].name
                    });

                    console.log("歌曲播放停止了", i);

                    if (i < oldList.length) {
                        wx.playBackgroundAudio({
                            dataUrl: oldList[i].audio,
                            title: oldList[i].name
                        });
                        i++;
                    } else {
                        i = 0;
                    }
                });
            },
            fail: function fail() {
                //默认播放列表第一首
                console.log("当前没有歌曲在播放 默认播放列表的第一首");
                console.log(i, oldList.length);
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
                wx.onBackgroundAudioStop(function () {
                    if (i < oldList.length) {
                        wx.playBackgroundAudio({
                            dataUrl: oldList[i].audio,
                            title: oldList[i].name
                        });
                        i++;
                    } else {
                        i = 0;
                    }
                });
            }
        });
    } else {
        //默认播放列表第一首
        console.log("默认播放列表的第一首", "idx", i);
        if (i - 1 == oldList.length || i == oldList.length || i < 0) {
            i = 0;
        }
        console.log(oldList, "iii的值是多少", i);
        wx.playBackgroundAudio({
            dataUrl: oldList[i].audio,
            title: oldList[i].name
        });
        wx.onBackgroundAudioStop(function () {
            console.log("我执行了几次");
            if (i < oldList.length) {
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
                i++;
            } else {
                i = 0;
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
            }
        });
    }
};

module.exports = {
    play: play
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11c2ljLmpzIl0sIm5hbWVzIjpbInBsYXkiLCJvbGRMaXN0IiwibmV3TGlzdCIsImNoYW5nZWxpc3QiLCJpZHgiLCJjb25zb2xlIiwibG9nIiwiaSIsInd4IiwiZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUiLCJzdWNjZXNzIiwicmVzIiwiY3VycmVudFBvc2l0aW9uIiwiZHVyYXRpb24iLCJkYXRhVXJsIiwibGNyaWVzSCIsIk51bWJlciIsImF1ZGlvIiwid29yZCIsImxlbmd0aCIsInByb2dyZXNzIiwicGxheUJhY2tncm91bmRBdWRpbyIsInRpdGxlIiwibmFtZSIsIm9uQmFja2dyb3VuZEF1ZGlvU3RvcCIsImZhaWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE9BQU8sU0FBU0EsSUFBVCxDQUFjQyxPQUFkLEVBQXVCQyxPQUF2QixFQUFnQ0MsVUFBaEMsRUFBMkNDLEdBQTNDLEVBQWdEO0FBQzFDO0FBQ2JDLFlBQVFDLEdBQVIsQ0FBWUgsVUFBWjtBQUNBLFFBQUlJLElBQUlILE1BQUlBLEdBQUosR0FBUSxDQUFoQjtBQUNBLFFBQUlELFVBQUosRUFBZ0I7QUFDWkssV0FBR0MsNkJBQUgsQ0FBaUM7QUFDN0JDLG1CQUQ2QixtQkFDckJDLEdBRHFCLEVBQ2hCO0FBQ1ROLHdCQUFRQyxHQUFSLENBQVlLLEdBQVo7QUFDQSxvQkFBSUMsa0JBQWtCRCxJQUFJQyxlQUExQixDQUZTLENBRW9DO0FBQzdDLG9CQUFJQyxXQUFXRixJQUFJRSxRQUFuQixDQUhTLENBR3FCO0FBQzlCLG9CQUFJQyxVQUFVSCxJQUFJRyxPQUFsQixDQUpTLENBSW1CO0FBQzVCLG9CQUFJQyxVQUFVLElBQUlDLE1BQUosRUFBZCxDQUxTLENBS21CO0FBQzVCWCx3QkFBUUMsR0FBUixDQUFZTCxPQUFaLEVBQXFCLFNBQXJCO0FBQ0EscUJBQUssSUFBSU0sS0FBSSxDQUFiLEVBQWdCQSxLQUFJTixPQUFwQixFQUE2Qk0sSUFBN0IsRUFB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O0FBRW5CSyxtQkFBT3JCLFFBQVFNLENBQVIsRUFBV2dCO0FBRkMsU0FBdkI7QUFJQWYsV0FBR2dCLHFCQUFILENBQXlCLFlBQVk7QUFDakNuQixvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxnQkFBSUMsSUFBSU4sUUFBUWtCLE1BQWhCLEVBQXdCO0FBQ3BCWCxtQkFBR2EsbUJBQUgsQ0FBdUI7QUFDbkJQLDZCQUFTYixRQUFRTSxDQUFSLEVBQVdVLEtBREQ7QUFFbkJLLDJCQUFPckIsUUFBUU0sQ0FBUixFQUFXZ0I7QUFGQyxpQkFBdkI7QUFJQWhCO0FBQ0gsYUFORCxNQU1PO0FBQ0hBLG9CQUFJLENBQUo7QUFDQUMsbUJBQUdhLG1CQUFILENBQXVCO0FBQ25CUCw2QkFBU2IsUUFBUU0sQ0FBUixFQUFXVSxLQUREO0FBRW5CSywyQkFBT3JCLFFBQVFNLENBQVIsRUFBV2dCO0FBRkMsaUJBQXZCO0FBSUg7QUFDSixTQWZEO0FBZ0JIO0FBRUosQ0F6R0Q7O0FBMkdBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2IzQjtBQURhLENBQWpCIiwiZmlsZSI6Im11c2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHBsYXkgPSBmdW5jdGlvbiBwbGF5KG9sZExpc3QsIG5ld0xpc3QsIGNoYW5nZWxpc3QsaWR4KSB7XHJcbiAgICAgICAgICAgICAgICAgLy/ml6fnmoTmkq3mlL7liJfooaggICDmlrDnmoTmkq3mlL7liJfooaggIO+8jOaYr+WQpuWIh+aNouaSreaUvuWIl+ihqCDvvIzmkq3mlL7mrYzmm7LnmoRpbmRleFxyXG4gICAgY29uc29sZS5sb2coY2hhbmdlbGlzdCk7XHJcbiAgICBsZXQgaSA9IGlkeD9pZHg6MDtcclxuICAgIGlmIChjaGFuZ2VsaXN0KSB7XHJcbiAgICAgICAgd3guZ2V0QmFja2dyb3VuZEF1ZGlvUGxheWVyU3RhdGUoe1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSByZXMuY3VycmVudFBvc2l0aW9uOyAgIC8v5b2T5YmN6Z+z5LmQ5pKt5pS+5L2N572ucyjnp5IpXHJcbiAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSByZXMuZHVyYXRpb247ICAvL+W9k+WJjemfs+S5kOaAu+mVv+W6pnPvvIjnp5LvvIlcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhVXJsID0gcmVzLmRhdGFVcmwgICAvL+W9k+WJjemfs+S5kOmTvuaOpVxyXG4gICAgICAgICAgICAgICAgbGV0IGxjcmllc0ggPSBuZXcgTnVtYmVyKCkgIC8v5q2M6K+N5a655Zmo5oC76auY5bqmXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvbGRMaXN0LCAn5Y6f5p2l55qE5pKt5pS+5YiX6KGoJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3Q7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVXJsID09IG9sZExpc3RbaV0uYXVkaW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGNyaWVzSCA9IG9sZExpc3RbaV0ud29yZC5sZW5ndGggKiA0MDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAoY3VycmVudFBvc2l0aW9uIC8gZHVyYXRpb24pICogbGNyaWVzSDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui/memHjOS6uuS4uueCueWHuyDliIfmjaLliJfooahcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbGRMaXN0IOaXp+eahOaSreaUvuWIl+ihqDFcIiwgb2xkTGlzdCwgXCJuZXdMaXN0IOaWsOeahOatjOabsuWIl+ihqFwiLCBuZXdMaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIG9sZExpc3QgPSBuZXdMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2xkTGlzdCDml6fnmoTmkq3mlL7liJfooagyXCIsIG9sZExpc3QsIFwibmV3TGlzdCDml6fnmoTmkq3mlL7liJfooahcIiwgbmV3TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2dyZXNzLCBcIuatjOivjeaSreaUvui/m+W6plwiKTtcclxuICAgICAgICAgICAgICAgIHd4Lm9uQmFja2dyb3VuZEF1ZGlvU3RvcChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbGRMaXN0IOaXp+eahOaSreaUvuWIl+ihqDNcIixcImkg55qE5YC8XCIsaSwgb2xkTGlzdClcclxuICAgICAgICAgICAgICAgICAgICBpID0gaS0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGk8MCl7IGkgPSAwfVxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5q2M5puy5pKt5pS+5YGc5q2i5LqGXCIsaSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBvbGRMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKCkge1xyXG4gICAgICAgICAgICAgICAgLy/pu5jorqTmkq3mlL7liJfooajnrKzkuIDpppZcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN5rKh5pyJ5q2M5puy5Zyo5pKt5pS+IOm7mOiupOaSreaUvuWIl+ihqOeahOesrOS4gOmmllwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGksIG9sZExpc3QubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB3eC5vbkJhY2tncm91bmRBdWRpb1N0b3AoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgb2xkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/pu5jorqTmkq3mlL7liJfooajnrKzkuIDpppZcclxuICAgICAgICBjb25zb2xlLmxvZyhcIum7mOiupOaSreaUvuWIl+ihqOeahOesrOS4gOmmllwiLFwiaWR4XCIsaSk7XHJcbiAgICAgICAgaWYoKGktMSk9PW9sZExpc3QubGVuZ3RofHxpPT1vbGRMaXN0Lmxlbmd0aHx8aTwwKXtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG9sZExpc3QsXCJpaWnnmoTlgLzmmK/lpJrlsJFcIixpKVxyXG4gICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5vbkJhY2tncm91bmRBdWRpb1N0b3AoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkeaJp+ihjOS6huWHoOasoVwiKVxyXG4gICAgICAgICAgICBpZiAoaSA8IG9sZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwbGF5XHJcbn0iXX0=