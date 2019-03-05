var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();


app.all("*", function(req, res, next) {
  if (req.path !== "/" ) {
     if (req.path.includes("/zys")) {
         let url = req.path.replace(/\/zys\//, '')
         let origin = url.match(/(^http(s)?:\/\/)[a-zA-Z\.0-9]+(?=.*)/)[0]
         let skip= false
         app._router.stack.forEach((res) => {
             if ('/zys/'+origin === res.path) {
                skip= true
             }
         })
         if (app._router.stack.length>50) {
             skip=true
         }
         if(!skip){
            app.use('/zys/' + origin, proxy({
                target: origin,
                changeOrigin: true,
                pathRewrite: {
                    '^/zys/': ''
                }
            }))
         }
     }
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
        let target,pathRewrite;
        switch(arr){
           case '/bd-weather': // fetch('http://localhost:2233/bd-weather/city=上海')
                target = 'https://www.baidu.com/home/other/data/weatherInfo';
                pathRewrite = {'^/bd-weather/':'?'}
            break
            case '/douban-movie':
                target = `https://api.douban.com/v2/movie/search`;
                pathRewrite = {'^/douban-movie':''}
            break
            case '/article':
                target = `https://interface.meiriyiwen.com/article`;
                pathRewrite = {'^/article':''}
            break
            case '/wallpaper':
                target = `http://service.picasso.adesk.com/v1/`;
                pathRewrite = {'^/wallpaper/':''}
            break
            default:
                console.log(arr)
            break
        }
        return proxy({
            target: target,
            changeOrigin: true,
            pathRewrite: pathRewrite,
        })
}

let arr =[
    'bd-weather',
    'douban-movie',
    'article',
    'wallpaper',
]

arr.forEach(res=>{
    app.use('/'+res, pathProxy('/'+res))
})

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