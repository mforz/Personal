import React from 'react';
import { BrowserRouter,HashRouter,Switch,Route } from 'react-router-dom';
// import { Router,hashHistory } from 'react-router';

// import Login from '@/pages/login/'
import Home from '../pages/home/'
// import Todo from '@/pages/todo/'
// import Color from '@/pages/color/'
// import HotWords from '@/pages/hotwords/'
import Menu from '../pages/menu/'
// import Essay from '@/pages/essay/'
// import Picture from '@/pages/picture/'
import Novel from '../pages/novel/'


const routers = [
    // {
    //     path:'/login',
    //     component:Login,
    // },
    // {
    //     path:'/todo',
    //     component:Todo,
    // },
    // {
    //     path:'/color',
    //     component:Color,
    // },
    // {
    //     path:'/hotwords',
    //     component:HotWords,
    // },
    // {
    //     path:'/essay',
    //     component:Essay,
    // },
    // {
    //     path:'/picture',
    //     component:Picture,
    // },
    {
        path:'/novel',
        component:Novel,
    }
]

const home =()=>(
    <div style={{textAlign:'center',marginTop:'100px'}}>
       
        <p>
            欢迎
        </p>
    </div>
)


const NotFound = () => (
    <div style={{textAlign:'center',marginTop:'100px'}}>
        <h1>404</h1>
        <h2>页面不存在</h2>
        <p>
            {/* <a href="/">回到首页</a> */}
        </p>
    </div>
)
const rou=(path)=>{
    console.log(path)
    window.location.href = window.location.origin+'#'+path
}

const route = ()=> (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={home} />
                {
                    routers.map((route,i)=>(
                        <Route key={i} {...route} />
                    ))
                }
                <Route component={NotFound} />
            </Switch>
        </HashRouter>
)
export default route