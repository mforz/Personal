var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();


let str = null
app.all("*", function(req, res, next) {
  if (req.path !== "/" ) {
    // && !req.path.includes(".")
    if(req.path.includes("/zys")){
        let url=req.path.replace(/\/zys\//,'')
        let origin = url.match(/(^http(s)?:\/\/)[a-zA-Z\.0-9]+(?=.*)/)[0]
        app._router.stack.forEach((res,i)=>{
            if(str==JSON.stringify(res)){
                app._router.stack.splice(i,1)
            }
        })
        app.use('/zys/'+origin,proxy({
            target: origin,
            changeOrigin: true,
            pathRewrite : {'^/zys/':''}
        }))
        // console.log(app._router.stack)
        str= JSON.stringify(app._router.stack[app._router.stack.length-1])

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
            case '/80txt':
                target = `https://www.80txt.com/`;
                pathRewrite = {'^/80txt':''}
            break
            default:
                console.log(arr)
            break
        }
        return proxy({
            target: target,
            changeOrigin: true,
            pathRewrite: pathRewrite
        })
}

let arr =[
    '80txt',
    // 'zys',
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