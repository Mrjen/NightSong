"use strict";

var play = function play(oldList, newList, changelist, idx, cycleSong) {
    //旧的播放列表   新的播放列表  ，是否切换播放列表 ，播放歌曲的index
    console.log(changelist);
    var i = idx ? idx : 0;
    if (changelist) {
        if (cycleSong) {
            console.log("单曲循环");
            wx.playBackgroundAudio({
                dataUrl: oldList[i].audio,
                title: oldList[i].name
            });
            wx.onBackgroundAudioStop(function () {
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
            });
        } else {
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
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11c2ljLmpzIl0sIm5hbWVzIjpbInBsYXkiLCJvbGRMaXN0IiwibmV3TGlzdCIsImNoYW5nZWxpc3QiLCJpZHgiLCJjeWNsZVNvbmciLCJjb25zb2xlIiwibG9nIiwiaSIsInd4IiwicGxheUJhY2tncm91bmRBdWRpbyIsImRhdGFVcmwiLCJhdWRpbyIsInRpdGxlIiwibmFtZSIsIm9uQmFja2dyb3VuZEF1ZGlvU3RvcCIsImdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlIiwic3VjY2VzcyIsInJlcyIsImN1cnJlbnRQb3NpdGlvbiIsImR1cmF0aW9uIiwibGNyaWVzSCIsIk51bWJlciIsIndvcmQiLCJsZW5ndGgiLCJwcm9ncmVzcyIsImZhaWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE9BQU8sU0FBU0EsSUFBVCxDQUFjQyxPQUFkLEVBQXVCQyxPQUF2QixFQUFnQ0MsVUFBaEMsRUFBMkNDLEdBQTNDLEVBQStDQyxTQUEvQyxFQUEwRDtBQUNwRDtBQUNiQyxZQUFRQyxHQUFSLENBQVlKLFVBQVo7QUFDQSxRQUFJSyxJQUFJSixNQUFJQSxHQUFKLEdBQVEsQ0FBaEI7QUFDQSxRQUFJRCxVQUFKLEVBQWdCO0FBQ1osWUFBR0UsU0FBSCxFQUFhO0FBQ1RDLG9CQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBRSxlQUFHQyxtQkFBSCxDQUF1QjtBQUNuQkMseUJBQVNWLFFBQVFPLENBQVIsRUFBV0ksS0FERDtBQUVuQkMsdUJBQU9aLFFBQVFPLENBQVIsRUFBV007QUFGQyxhQUF2QjtBQUlBTCxlQUFHTSxxQkFBSCxDQUF5QixZQUFVO0FBQy9CTixtQkFBR0MsbUJBQUgsQ0FBdUI7QUFDbkJDLDZCQUFTVixRQUFRTyxDQUFSLEVBQVdJLEtBREQ7QUFFbkJDLDJCQUFPWixRQUFRTyxDQUFSLEVBQVdNO0FBRkMsaUJBQXZCO0FBSUgsYUFMRDtBQU1ILFNBWkQsTUFZSztBQUNMTCxlQUFHTyw2QkFBSCxDQUFpQztBQUM3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VkQ7QUFXSDtBQXJFNEIsYUFBakM7QUF1RUY7QUFDRCxLQXRGRCxNQXNGTztBQUNIO0FBQ0FGLGdCQUFRQyxHQUFSLENBQVksWUFBWixFQUF5QixLQUF6QixFQUErQkMsQ0FBL0I7QUFDQSxZQUFJQSxJQUFFLENBQUgsSUFBT1AsUUFBUXVCLE1BQWYsSUFBdUJoQixLQUFHUCxRQUFRdUIsTUFBbEMsSUFBMENoQixJQUFFLENBQS9DLEVBQWlEO0FBQzdDQSxnQkFBSSxDQUFKO0FBQ0g7QUFDREYsZ0JBQVFDLEdBQVIsQ0FBWU4sT0FBWixFQUFvQixVQUFwQixFQUErQk8sQ0FBL0I7QUFDQUMsV0FBR0MsbUJBQUgsQ0FBdUI7QUFDbkJDLHFCQUFTVixRQUFRTyxDQUFSLEVBQVdJLEtBREQ7QUFFbkJDLG1CQUFPWixRQUFRTyxDQUFSLEVBQVdNO0FBRkMsU0FBdkI7QUFJQUwsV0FBR00scUJBQUgsQ0FBeUIsWUFBWTtBQUNqQ1Qsb0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsZ0JBQUlDLElBQUlQLFFBQVF1QixNQUFoQixFQUF3QjtBQUNwQmYsbUJBQUdDLG1CQUFILENBQXVCO0FBQ25CQyw2QkFBU1YsUUFBUU8sQ0FBUixFQUFXSSxLQUREO0FBRW5CQywyQkFBT1osUUFBUU8sQ0FBUixFQUFXTTtBQUZDLGlCQUF2QjtBQUlBTjtBQUNILGFBTkQsTUFNTztBQUNIQSxvQkFBSSxDQUFKO0FBQ0FDLG1CQUFHQyxtQkFBSCxDQUF1QjtBQUNuQkMsNkJBQVNWLFFBQVFPLENBQVIsRUFBV0ksS0FERDtBQUVuQkMsMkJBQU9aLFFBQVFPLENBQVIsRUFBV007QUFGQyxpQkFBdkI7QUFJSDtBQUNKLFNBZkQ7QUFnQkg7QUFFSixDQXZIRDs7QUF5SEFhLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjVCO0FBRGEsQ0FBakIiLCJmaWxlIjoibXVzaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcGxheSA9IGZ1bmN0aW9uIHBsYXkob2xkTGlzdCwgbmV3TGlzdCwgY2hhbmdlbGlzdCxpZHgsY3ljbGVTb25nKSB7XHJcbiAgICAgICAgICAgICAgICAgLy/ml6fnmoTmkq3mlL7liJfooaggICDmlrDnmoTmkq3mlL7liJfooaggIO+8jOaYr+WQpuWIh+aNouaSreaUvuWIl+ihqCDvvIzmkq3mlL7mrYzmm7LnmoRpbmRleFxyXG4gICAgY29uc29sZS5sb2coY2hhbmdlbGlzdCk7XHJcbiAgICBsZXQgaSA9IGlkeD9pZHg6MDtcclxuICAgIGlmIChjaGFuZ2VsaXN0KSB7XHJcbiAgICAgICAgaWYoY3ljbGVTb25nKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLljZXmm7Llvqrnjq9cIilcclxuICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgd3gub25CYWNrZ3JvdW5kQXVkaW9TdG9wKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgIHd4LmdldEJhY2tncm91bmRBdWRpb1BsYXllclN0YXRlKHtcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gcmVzLmN1cnJlbnRQb3NpdGlvbjsgICAvL+W9k+WJjemfs+S5kOaSreaUvuS9jee9rnMo56eSKVxyXG4gICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gcmVzLmR1cmF0aW9uOyAgLy/lvZPliY3pn7PkuZDmgLvplb/luqZz77yI56eS77yJXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVVybCA9IHJlcy5kYXRhVXJsICAgLy/lvZPliY3pn7PkuZDpk77mjqVcclxuICAgICAgICAgICAgICAgIGxldCBsY3JpZXNIID0gbmV3IE51bWJlcigpICAvL+atjOivjeWuueWZqOaAu+mrmOW6plxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2xkTGlzdCwgJ+WOn+adpeeahOaSreaUvuWIl+ihqCcpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVVybCA9PSBvbGRMaXN0W2ldLmF1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxjcmllc0ggPSBvbGRMaXN0W2ldLndvcmQubGVuZ3RoICogNDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gKGN1cnJlbnRQb3NpdGlvbiAvIGR1cmF0aW9uKSAqIGxjcmllc0g7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLov5nph4zkurrkuLrngrnlh7sg5YiH5o2i5YiX6KGoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2xkTGlzdCDml6fnmoTmkq3mlL7liJfooagxXCIsIG9sZExpc3QsIFwibmV3TGlzdCDmlrDnmoTmrYzmm7LliJfooahcIiwgbmV3TGlzdClcclxuICAgICAgICAgICAgICAgICAgICBvbGRMaXN0ID0gbmV3TGlzdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9sZExpc3Qg5pen55qE5pKt5pS+5YiX6KGoMlwiLCBvbGRMaXN0LCBcIm5ld0xpc3Qg5pen55qE5pKt5pS+5YiX6KGoXCIsIG5ld0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9ncmVzcywgXCLmrYzor43mkq3mlL7ov5vluqZcIik7XHJcbiAgICAgICAgICAgICAgICB3eC5vbkJhY2tncm91bmRBdWRpb1N0b3AoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2xkTGlzdCDml6fnmoTmkq3mlL7liJfooagzXCIsXCJpIOeahOWAvFwiLGksIG9sZExpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IGktMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpPDApeyBpID0gMH1cclxuICAgICAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuatjOabsuaSreaUvuWBnOatouS6hlwiLGkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgb2xkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbCgpIHtcclxuICAgICAgICAgICAgICAgIC8v6buY6K6k5pKt5pS+5YiX6KGo56ys5LiA6aaWXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeayoeacieatjOabsuWcqOaSreaUviDpu5jorqTmkq3mlL7liJfooajnmoTnrKzkuIDpppZcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpLCBvbGRMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgd3gub25CYWNrZ3JvdW5kQXVkaW9TdG9wKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IG9sZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL+m7mOiupOaSreaUvuWIl+ihqOesrOS4gOmmllxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6buY6K6k5pKt5pS+5YiX6KGo55qE56ys5LiA6aaWXCIsXCJpZHhcIixpKTtcclxuICAgICAgICBpZigoaS0xKT09b2xkTGlzdC5sZW5ndGh8fGk9PW9sZExpc3QubGVuZ3RofHxpPDApe1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cob2xkTGlzdCxcImlpaeeahOWAvOaYr+WkmuWwkVwiLGkpXHJcbiAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4Lm9uQmFja2dyb3VuZEF1ZGlvU3RvcChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiR5omn6KGM5LqG5Yeg5qyhXCIpXHJcbiAgICAgICAgICAgIGlmIChpIDwgb2xkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBsYXlcclxufSJdfQ==