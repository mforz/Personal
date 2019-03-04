var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();


let str = null
app.all("*", function(req, res, next) {
  if (req.path !== "/" ) {
    // && !req.path.includes(".")

     if (req.path.includes("/zys")) {
        //  console.log('A---',req.path)
         let url = req.path.replace(/\/zys\//, '')
         let origin = url.match(/(^http(s)?:\/\/)[a-zA-Z\.0-9]+(?=.*)/)[0]
         let skip= false
         app._router.stack.forEach((res, i) => {
            //   console.log('B---',res.path)
            //  if (str === res.path) {
             if ('/zys/'+origin === res.path) {
                //  console.log('C---',app._router.stack.length)
                //  app._router.stack.splice(i, 1)
                skip=true
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
        //  console.log('D----',app._router.stack.length)
        //  str = req.path
        //   JSON.stringify(app._router.stack[app._router.stack.length - 1])
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
            case '/movie-vip':
                target = `http://jx.taoju.xin/api.php`;
                pathRewrite = {'^/movie-vip':''}
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
    'movie-vip',
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