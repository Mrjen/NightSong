let play = function play(oldList, newList, changelist,idx) {
                 //旧的播放列表   新的播放列表  ，是否切换播放列表 ，播放歌曲的index
    console.log(changelist);
    let i = idx?idx:0;
    if (changelist) {
        wx.getBackgroundAudioPlayerState({
            success(res) {
                console.log(res);
                let currentPosition = res.currentPosition;   //当前音乐播放位置s(秒)
                let duration = res.duration;  //当前音乐总长度s（秒）
                var dataUrl = res.dataUrl   //当前音乐链接
                let lcriesH = new Number()  //歌词容器总高度
                console.log(oldList, '原来的播放列表');
                for (let i = 0; i < oldList; i++) {
                    if (dataUrl == oldList[i].audio) {
                        lcriesH = oldList[i].word.length * 40;
                    }
                }
                let progress = (currentPosition / duration) * lcriesH;
                    console.log("这里人为点击 切换列表");
                    console.log("oldList 旧的播放列表1", oldList, "newList 新的歌曲列表", newList)
                    oldList = newList;
                    console.log("oldList 旧的播放列表2", oldList, "newList 旧的播放列表", newList);
                    wx.playBackgroundAudio({
                        dataUrl: oldList[i].audio,
                        title: oldList[i].name
                    });
                console.log(progress, "歌词播放进度");
                wx.onBackgroundAudioStop(function () {
                    
                    console.log("oldList 旧的播放列表3","i 的值",i, oldList)
                    i = i-1;
                    if(i<0){ i = 0}
                    wx.playBackgroundAudio({
                        dataUrl: oldList[i].audio,
                        title: oldList[i].name
                    });
    
                       
                   console.log("歌曲播放停止了",i)

                    if (i < oldList.length) {
                        wx.playBackgroundAudio({
                            dataUrl: oldList[i].audio,
                            title: oldList[i].name,
                        });
                        i++;
                    } else {
                        i = 0;
                    }

                }

                )
            },
            fail() {
                //默认播放列表第一首
                console.log("当前没有歌曲在播放 默认播放列表的第一首");
                console.log(i, oldList.length)
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name,
                });
                wx.onBackgroundAudioStop(function () {
                    if (i < oldList.length) {
                        wx.playBackgroundAudio({
                            dataUrl: oldList[i].audio,
                            title: oldList[i].name,
                        });
                        i++;
                    } else {
                        i = 0;
                    }
                })
            }
        })
    } else {
        //默认播放列表第一首
        console.log("默认播放列表的第一首","idx",i);
        if((i-1)==oldList.length||i==oldList.length||i<0){
            i = 0;
        }
        console.log(oldList,"iii的值是多少",i)
        wx.playBackgroundAudio({
            dataUrl: oldList[i].audio,
            title: oldList[i].name
        })
        wx.onBackgroundAudioStop(function () {
            console.log("我执行了几次")
            if (i < oldList.length) {
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name,
                });
                i++;
            } else {
                i = 0;
                wx.playBackgroundAudio({
                    dataUrl: oldList[i].audio,
                    title: oldList[i].name,
                });
            }
        })
    }

}

module.exports = {
    play
}