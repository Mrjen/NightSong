// 主域名
const apiUrl = "https://utest.playonwechat.com"

// 授权
const auth = apiUrl +  '/music/App/registry'
// 首页数据
const Home = apiUrl + '/music/App/home'
// 收藏歌曲
const Collect = apiUrl + '/music/App/collection'
// 取消收藏
const disCollect = apiUrl + '/music/App/disCollection'   
// 我的收藏
const myCollect = apiUrl + '/music/App/myCollection'
// 收听排行榜
const Ranking  = apiUrl + '/music/App/ranking'
// 启动页广告
const statAd = apiUrl + '/music/App/startAd'

module.exports  = {
    Home,
    auth,
    Collect,
    disCollect,
    myCollect,
    Ranking,
    statAd
}