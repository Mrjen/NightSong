"use strict";

var play = function play(oldList, newList, changelist, idx, cycleSong, that, next) {
    //旧的播放列表array   新的播放列表 array，是否切换播放列表 true false ，播放歌曲的index, 歌曲是否循环true false ,操作对象,上一曲还是下一曲next 为1就是下一曲为0 是上一曲
    console.log(changelist);
    console.log(idx, "这里是传入的i   测试i有没有改变");
    var i = idx ? idx : 0;
    if (changelist) {
        console.log("切换播放列表");
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
                wx.setStorageSync('currentSong', oldList[i]);
            });
        } else {
            console.log("列表循环 获取钢歌曲播放状态");
            wx.playBackgroundAudio({
                dataUrl: oldList[i].audio,
                title: oldList[i].name
            });
            wx.setStorageSync('currentSong', oldList[i]);
            for (var j = 0; j < oldList.length; j++) {
                oldList[j].playing = 0;
            }
            oldList[i].playing = 1;
            that.currentSong = oldList[i];
            wx.onBackgroundAudioStop(function () {
                console.log("歌曲播放完毕");
                i = i + 1;
                if (i == oldList.length) {
                    i = 0;
                }
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name
                });
                for (var _j = 0; _j < oldList.lenght; _j++) {
                    oldList[_j].playing = 0;
                }
                wx.setStorageSync('currentSong', oldList[i]);
                wx.setStorageSync('idx', i);
                oldList[i].playing = 1;
                that.currentSong = oldList[i];
            });
        }
    } else {
        console.log("下一曲、上一曲、事件处理", "i", i, oldList.length);
        //默认播放列表第一首
        // console.log(next,"next")
        if (next > 0) {
            //next 为1就是下一曲为0 是上一曲
            console.log("切换下一首歌", "i", i);
            if (i + 1 === oldList.length) {
                i = 0;
            } else {
                i = i + 1;
            }
            console.log("i", i);

            // console.log(oldList, "iii的值是多少", i);
            wx.setStorageSync('currentSong', oldList[i]);
            wx.setStorageSync("idx", i);
            wx.playBackgroundAudio({
                dataUrl: oldList[i].audio,
                title: oldList[i].name
            });
            for (var _j2 = 0; _j2 < oldList.length; _j2++) {
                oldList[_j2].playing = 0;
            }
            oldList[i].playing = 1;
            that.currentSong = oldList[i];

            wx.onBackgroundAudioStop(function () {
                console.log("我执行了几次");
                if (i < oldList.length) {
                    wx.playBackgroundAudio({
                        dataUrl: oldList[i].audio,
                        title: oldList[i].name
                    });
                    i++;
                    wx.setStorageSync('currentSong', oldList[i]);
                } else {
                    i = 0;
                    wx.playBackgroundAudio({
                        dataUrl: oldList[i].audio,
                        title: oldList[i].name
                    });
                }
            });
        } else if (next === 0) {
            //切换上一首歌曲
            console.log("切换上一首歌曲  这里看下i是多少：", i);
            i = i - 1;
            if (i < 0) {
                i = oldList.length - 1;
            }
            for (var _j3 = 0; _j3 < oldList.length; _j3++) {
                oldList[_j3].playing = 0;
            }
            oldList[i].playing = 1;
            that.currentSong = oldList[i];
            wx.setStorageSync('idx', i);
            wx.playBackgroundAudio({
                dataUrl: oldList[i].audio,
                title: oldList[i].name
            });
            wx.setStorageSync('currentSong', oldList[i]);
        } else if (next < 0) {
            // 这里没有切换动作播放第一首
            console.log('这里没有切换动作播放第一首', i);
            wx.playBackgroundAudio({
                dataUrl: oldList[i].audio,
                title: oldList[i].name
            });
        }
    }
};

module.exports = {
    play: play
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11c2ljLmpzIl0sIm5hbWVzIjpbInBsYXkiLCJvbGRMaXN0IiwibmV3TGlzdCIsImNoYW5nZWxpc3QiLCJpZHgiLCJjeWNsZVNvbmciLCJ0aGF0IiwibmV4dCIsImNvbnNvbGUiLCJsb2ciLCJpIiwid3giLCJwbGF5QmFja2dyb3VuZEF1ZGlvIiwiZGF0YVVybCIsImF1ZGlvIiwidGl0bGUiLCJuYW1lIiwib25CYWNrZ3JvdW5kQXVkaW9TdG9wIiwic2V0U3RvcmFnZVN5bmMiLCJqIiwibGVuZ3RoIiwicGxheWluZyIsImN1cnJlbnRTb25nIiwibGVuZ2h0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxPQUFPLFNBQVNBLElBQVQsQ0FBY0MsT0FBZCxFQUF1QkMsT0FBdkIsRUFBZ0NDLFVBQWhDLEVBQTRDQyxHQUE1QyxFQUFpREMsU0FBakQsRUFBNERDLElBQTVELEVBQWtFQyxJQUFsRSxFQUF3RTtBQUMvRTtBQUNBQyxZQUFRQyxHQUFSLENBQVlOLFVBQVo7QUFDQUssWUFBUUMsR0FBUixDQUFZTCxHQUFaLEVBQWlCLG9CQUFqQjtBQUNBLFFBQUlNLElBQUlOLE1BQU1BLEdBQU4sR0FBWSxDQUFwQjtBQUNBLFFBQUlELFVBQUosRUFBZ0I7QUFDWkssZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsWUFBSUosU0FBSixFQUFlO0FBQ1hHLG9CQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBRSxlQUFHQyxtQkFBSCxDQUF1QjtBQUNuQkMseUJBQVNaLFFBQVFTLENBQVIsRUFBV0ksS0FERDtBQUVuQkMsdUJBQU9kLFFBQVFTLENBQVIsRUFBV007QUFGQyxhQUF2QjtBQUlBTCxlQUFHTSxxQkFBSCxDQUF5QixZQUFZO0FBQ2pDTixtQkFBR0MsbUJBQUgsQ0FBdUI7QUFDbkJDLDZCQUFTWixRQUFRUyxDQUFSLEVBQVdJLEtBREQ7QUFFbkJDLDJCQUFPZCxRQUFRUyxDQUFSLEVBQVdNO0FBRkMsaUJBQXZCO0FBSUFMLG1CQUFH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V007QUFGRyxhQUF2QjtBQUlETCxlQUFHTyxjQUFILENBQWtCLGFBQWxCLEVBQWdDakIsUUFBUVMsQ0FBUixDQUFoQztBQUNELFNBbEJLLE1Ba0JBLElBQUdILE9BQUssQ0FBUixFQUFVO0FBQ1o7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCQyxDQUE1QjtBQUNBQyxlQUFHQyxtQkFBSCxDQUF1QjtBQUNuQkMseUJBQVNaLFFBQVFTLENBQVIsRUFBV0ksS0FERDtBQUVuQkMsdUJBQU9kLFFBQVFTLENBQVIsRUFBV007QUFGQyxhQUF2QjtBQUlIO0FBRUo7QUFFSixDQTFIRDs7QUE0SEFRLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnpCO0FBRGEsQ0FBakIiLCJmaWxlIjoibXVzaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcGxheSA9IGZ1bmN0aW9uIHBsYXkob2xkTGlzdCwgbmV3TGlzdCwgY2hhbmdlbGlzdCwgaWR4LCBjeWNsZVNvbmcsIHRoYXQsIG5leHQpIHtcclxuICAgIC8v5pen55qE5pKt5pS+5YiX6KGoYXJyYXkgICDmlrDnmoTmkq3mlL7liJfooaggYXJyYXnvvIzmmK/lkKbliIfmjaLmkq3mlL7liJfooaggdHJ1ZSBmYWxzZSDvvIzmkq3mlL7mrYzmm7LnmoRpbmRleCwg5q2M5puy5piv5ZCm5b6q546vdHJ1ZSBmYWxzZSAs5pON5L2c5a+56LGhLOS4iuS4gOabsui/mOaYr+S4i+S4gOabsm5leHQg5Li6MeWwseaYr+S4i+S4gOabsuS4ujAg5piv5LiK5LiA5puyXHJcbiAgICBjb25zb2xlLmxvZyhjaGFuZ2VsaXN0KTtcclxuICAgIGNvbnNvbGUubG9nKGlkeCwgXCLov5nph4zmmK/kvKDlhaXnmoRpICAg5rWL6K+VaeacieayoeacieaUueWPmFwiKVxyXG4gICAgbGV0IGkgPSBpZHggPyBpZHggOiAwO1xyXG4gICAgaWYgKGNoYW5nZWxpc3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIh+aNouaSreaUvuWIl+ihqFwiKVxyXG4gICAgICAgIGlmIChjeWNsZVNvbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLljZXmm7Llvqrnjq9cIilcclxuICAgICAgICAgICAgd3gucGxheUJhY2tncm91bmRBdWRpbyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgd3gub25CYWNrZ3JvdW5kQXVkaW9TdG9wKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY3VycmVudFNvbmcnLG9sZExpc3RbaV0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliJfooajlvqrnjq8g6I635Y+W6ZKi5q2M5puy5pKt5pS+54q25oCBXCIpXHJcbiAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50U29uZycsb2xkTGlzdFtpXSlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvbGRMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRMaXN0W2pdLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2xkTGlzdFtpXS5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IG9sZExpc3RbaV07XHJcbiAgICAgICAgICAgIHd4Lm9uQmFja2dyb3VuZEF1ZGlvU3RvcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmrYzmm7Lmkq3mlL7lrozmr5VcIik7XHJcbiAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZihpPT1vbGRMaXN0Lmxlbmd0aCl7aSA9IDB9XHJcbiAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPG9sZExpc3QubGVuZ2h0O2orKyl7XHJcbiAgICAgICAgICAgICAgICAgICBvbGRMaXN0W2pdLnBsYXlpbmcgPSAwO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50U29uZycsb2xkTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkeCcsaSlcclxuICAgICAgICAgICAgICAgb2xkTGlzdFtpXS5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IG9sZExpc3RbaV07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS4i+S4gOabsuOAgeS4iuS4gOabsuOAgeS6i+S7tuWkhOeQhlwiLCBcImlcIiwgaSwgb2xkTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIC8v6buY6K6k5pKt5pS+5YiX6KGo56ys5LiA6aaWXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV4dCxcIm5leHRcIilcclxuICAgICAgICBpZiAobmV4dD4wKSB7XHJcbiAgICAgICAgICAgIC8vbmV4dCDkuLox5bCx5piv5LiL5LiA5puy5Li6MCDmmK/kuIrkuIDmm7JcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIfmjaLkuIvkuIDpppbmrYxcIixcImlcIixpKTtcclxuICAgICAgICAgICAgaWYoKGkrMSk9PT1vbGRMaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGkgPSBpKzE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlcIixpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2xkTGlzdCwgXCJpaWnnmoTlgLzmmK/lpJrlsJFcIiwgaSk7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50U29uZycsb2xkTGlzdFtpXSlcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJpZHhcIixpKVxyXG4gICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9sZExpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG9sZExpc3Rbal0ucGxheWluZyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2xkTGlzdFtpXS5wbGF5aW5nID0gMTtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IG9sZExpc3RbaV07XHJcblxyXG4gICAgICAgICAgICB3eC5vbkJhY2tncm91bmRBdWRpb1N0b3AoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJHmiafooYzkuoblh6DmrKFcIilcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgb2xkTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG9sZExpc3RbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRTb25nJywgb2xkTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBvbGRMaXN0W2ldLmF1ZGlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNlIGlmKG5leHQ9PT0wKXtcclxuICAgICAgICAgICAvL+WIh+aNouS4iuS4gOmmluatjOabslxyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiH5o2i5LiK5LiA6aaW5q2M5puyICDov5nph4znnIvkuItp5piv5aSa5bCR77yaXCIsaSk7XHJcbiAgICAgICAgICAgaSA9IGkgLTEgO1xyXG4gICAgICAgICAgIGlmKGk8MCl7XHJcbiAgICAgICAgICAgICAgIGkgPSAgb2xkTGlzdC5sZW5ndGgtMTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG9sZExpc3QubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgIG9sZExpc3Rbal0ucGxheWluZyA9IDA7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIG9sZExpc3RbaV0ucGxheWluZyA9IDE7XHJcbiAgICAgICAgICAgdGhhdC5jdXJyZW50U29uZyA9IG9sZExpc3RbaV07XHJcbiAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkeCcsaSlcclxuICAgICAgICAgICB3eC5wbGF5QmFja2dyb3VuZEF1ZGlvKHtcclxuICAgICAgICAgICAgIGRhdGFVcmw6IG9sZExpc3RbaV0uYXVkaW8sXHJcbiAgICAgICAgICAgICB0aXRsZTogb2xkTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50U29uZycsb2xkTGlzdFtpXSlcclxuICAgICAgICB9ZWxzZSBpZihuZXh0PDApe1xyXG4gICAgICAgICAgICAvLyDov5nph4zmsqHmnInliIfmjaLliqjkvZzmkq3mlL7nrKzkuIDpppZcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/memHjOayoeacieWIh+aNouWKqOS9nOaSreaUvuesrOS4gOmmlicsaSk7XHJcbiAgICAgICAgICAgIHd4LnBsYXlCYWNrZ3JvdW5kQXVkaW8oe1xyXG4gICAgICAgICAgICAgICAgZGF0YVVybDogb2xkTGlzdFtpXS5hdWRpbyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvbGRMaXN0W2ldLm5hbWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBsYXlcclxufSJdfQ==