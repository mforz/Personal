var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

let arr =[
    'bd-weather',
    'douban-movie',
    'article',
    'novel',
    'chapter',
    'wallpaper',
    'wallpaper-search',
]
// http服务
app.all("*", function(req, res, next) {
  if (req.path !== "/" ) {
     if (req.path !== "/zys/" && req.path.includes("/zys/")) {
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
        case '/bd-weather':  //百度天气接口  //fetch('http://localhost:2233/bd-weather/city=上海')
            target = 'https://www.baidu.com/home/other/data/weatherInfo';
            pathRewrite = {'^/bd-weather/':'?'}
        break
        case '/douban-movie'://豆瓣电影接口
            target = `https://api.douban.com/v2/movie/search`;
            pathRewrite = {'^/douban-movie':''}
        break
        case '/article'://每日一文接口
            target = `https://interface.meiriyiwen.com/article`;
            pathRewrite = {'^/article':''}
        break
        case '/wallpaper'://壁纸接口
            target = `http://service.picasso.adesk.com/v1/`;
            pathRewrite = {'^/wallpaper/':''}
        break
        case '/wallpaper-search'://搜索壁纸接口
            target = `http://so.picasso.adesk.com/v1/`;
            pathRewrite = {'^/wallpaper-search/':''}
        break
        case '/novel': //追书神奇接口
            target = `http://api.zhuishushenqi.com`;
            pathRewrite = {'^/novel':''}
        break
        case '/chapter': //追书神奇章节接口
            target = `http://chapter2.zhuishushenqi.com`;
            pathRewrite = {'^/chapter':''}
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
arr.forEach(res=>{
    app.use('/'+res, pathProxy('/'+res))
})
app.use(express.static("./"));
// const port = process.env.PORT || 3000;
app.listen(2233, () => {
  console.log(`server running @http://localhost:2233  如果端口被占用 lsof -i tcp:8080 && kill pid`);
});
// websocket 服务
// let WebSocketServer = require('ws').Server
//用ws模块启动一个websocket服务器,监听了9999端口
// let wsServer = new WebSocketServer({ port: 9999 })
//监听客户端的连接请求  当客户端连接服务器的时候，就会触发connection事件
//socket代表一个客户端,不是所有客户端共享的，而是每个客户端都有一个socket
// wsServer.on('connection', function(socket) {
  //每一个socket都有一个唯一的ID属性
//   console.log(socket)
//   console.log('客户端连接成功')
//   监听对方发过来的消息
//   socket.on('message', function(message) {
    // console.log('接收到客户端的消息', message)
    // socket.send(message+new Date().toLocaleString())
//   })
// })
module.exports = app;




//  测速 https://fast.com/
// 果壳
// https://www.guokr.com/apis/minisite/article.json?retrieve_type=by_subject&limit=20&offset=18&_=1545379770842
// https://www.guokr.com/apis/minisite/article.json?retrieve_type=by_channel&channel_key=fact&limit=20&offset=18&_=1545380512831