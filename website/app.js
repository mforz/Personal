var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Cache-Control", "no-cache");
  }
  next();
});

let pathProxy = (arr)=>{
    // let re = arr.map(res=>{
        let target,pathRewrite;
        switch(arr){
            case '/it120':
                target = 'https://api.it120.cc/mforz/';
                pathRewrite = {'^/it120':'/'}
            break
            case '/bd-weather':
                target = 'https://www.baidu.com/home/other/data/weatherInfo?city=%E4%B8%8A%E6%B5%B7';
                pathRewrite = {'^/bd-weather':'/'}
            break
            case '/qqmusic':
                target = 'https://u.y.qq.com/';
                pathRewrite = {'^/qqmusic':'/'}
            break
            case '/sina-weather': // fetch('http://localhost:2233/sina-weather/&ip=192.168.0.0')
                target = 'https://interface.sina.cn/dfz/outside/ipdx/weather.d.html?length=1&air=1&callback=&';
                pathRewrite = {'^/sina-weather':'/'}
            break
            case '/he-weather':   // fetch('http://localhost:2233/he-weather/&location=上海/shanghai/192.168.0.0')
                target = 'https://free-api.heweather.com/s6/weather/now?key=b1da27652f6a46589f3160080bec11fd&';
                pathRewrite = {'^/he-weather':'/'}
            break
            case '/bd-hotword':
                target = 'http://top.baidu.com/mobile_v2/buzz/hotspot';
                pathRewrite = {'^/bd-hotword':'/'}
            break
            case '/sg-hotword':
                target = 'https://m.sogou.com/web/search/hot_news.jsp';
                pathRewrite = {'^/sg-hotword':'/'}
            break
            case '/sina-hotword':
                target = 'https://www.sina.com.cn/api/hotword.json?';
                pathRewrite = {'^/sina-hotword':'/'}
            break
            case '/iciba-one':
                target = 'http://open.iciba.com/dsapi/';
                pathRewrite = {'^/iciba-one':'/'}
            break
            case '/iciba-trans':      // fetch('http://localhost:2233/iciba-trans/&w=端口')
                target = 'http://dict-co.iciba.com/api/dictionary.php?type=json&key=D9559383FCE4D0AC0AFA9C1C6CBF871D&';
                pathRewrite = {'^/iciba-trans':'/'}
            break
            case '/youdao':          //fetch('http://localhost:2233/youdao/&i=端口')
                target = 'http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&';
                pathRewrite = {'^/youdao':'/'}
            break
            case '/sg-img': //fetch('http://localhost:2233/sg-img/&start=0&len=10')
                target = 'https://pic.sogou.com/pic/action/getWapHomeFeed.jsp?key=homeFeedData&category=feed&';
                pathRewrite = {'^/sg-img':'/'}
            break
                            // https://od.qingting.fm/m4a/587892897cb8913977b1d09d_6654123_64.m4a
            case '/luoji': //fetch('https://i.qingting.fm/wapi/channels/82598/programs/page/1/pagesize/10')(max page 20)
                target = 'https://i.qingting.fm/wapi/channels/82598/programs';
                pathRewrite = {'^/luoji':'/'}
            break
            case '/movie250': //fetch('http://api.douban.com/v2/movie/top250')
                target = 'https://api.douban.com/v2/movie/top250';
                pathRewrite = {'^/movie250':''}
            break
            case '/rd-wallpaper': //fetch('http://localhost:2233/rd-wallpaper/')
                target = `https://infinity-api.infinitynewtab.com/random-wallpaper`;
                pathRewrite = {'^/rd-wallpaper':''}
            break
            case '/guokr-rd': //fetch('http://localhost:2233/rd-wallpaper/')
                target = `https://www.guokr.com/apis/minisite/article.json?retrieve_type=by_subject&limit=20&offset=18`;
                pathRewrite = {'^/guokr-rd':''}
            break
            
            default:
                console.log(res)
        }
        return proxy({
            target: target,
            changeOrigin: true,
            pathRewrite: pathRewrite
        })
    // })
    // return re
}

app.use('/it120',pathProxy('/it120'))
app.use('/qqmusic',pathProxy('/qqmusic'))
app.use('/sina-weather',pathProxy('/sina-weather'))
app.use('/he-weather',pathProxy('/he-weather'))
app.use('/bd-hotword',pathProxy('/bd-hotword'))
app.use('/sg-hotword',pathProxy('/sg-hotword'))
app.use('/sina-hotword',pathProxy('/sina-hotword'))
app.use('/iciba-one',pathProxy('/iciba-one'))
app.use('/iciba-trans',pathProxy('/iciba-trans'))
app.use('/youdao',pathProxy('/youdao'))
app.use('/sg-img',pathProxy('/sg-img'))
app.use('/luoji',pathProxy('/luoji'))
app.use('/movie250',pathProxy('/movie250'))
app.use('/rd-wallpaper',pathProxy('/rd-wallpaper'))
app.use('/guokr-rd',pathProxy('/guokr-rd'))


app.use(express.static("./"));

// const port = process.env.PORT || 3000;


app.listen(2233, () => {

  console.log(`server running @ http://localhost:2233  如果端口占用 lsof -i tcp:8080 && kill pid`);
});

module.exports = app;




//  测速 https://fast.com/
// 果壳
// https://www.guokr.com/apis/minisite/article.json?retrieve_type=by_subject&limit=20&offset=18&_=1545379770842
// https://www.guokr.com/apis/minisite/article.json?retrieve_type=by_channel&channel_key=fact&limit=20&offset=18&_=1545380512831