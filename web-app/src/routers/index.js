import React from 'react';
import { BrowserRouter,HashRouter,Switch,Route } from 'react-router-dom';
// import { Router,hashHistory } from 'react-router';

import Movie from '../pages/movie/'
import Novel from '../pages/novel/novel.js'
// import Novel from '../pages/novel/'
import Essay from '../pages/essay/'
import Weather from '../pages/weather/'
import Wallpaper from '../pages/wallpaper/'
import Tools from '../pages/tools/'

const routers = [
    {
        path:'/weather',
        component:Weather,
    },
    {
        path:'/tools',
        component:Tools,
    },
    {
        path:'/movie',
        component:Movie,
    },
    {
        path:'/novel',
        component:Novel,
    },
    {
        path:'/essay',
        component:Essay,
    },
    {
        path:'/wallpaper',
        component:Wallpaper,
    },
]

const a = ['#f5f4f6', '#e0e0e0', '#4285f4', '#5ab1fc', '#ff5e00', '#1685e5', '#d1462f', '#001d38', '#183850', '#199393', '#00FF7F', '#f23e3e', '#7eaaaf']
const home =()=>(
    <div style={{textAlign:'center',}}>
        <p>
            欢迎
        </p>
        <div style={{width:'100%',height:'450px'}}>
            {
                a.map((item,i)=>(
                    <div key={i} style={{width:'200px',height:'30px',margin:'18px 0'}}>
                        <div style={{float:'left',width:'30px',height:'30px',margin:0,backgroundColor:item}}></div>
                        <span style={{overflow:'hidden'}}>{item}</span>
                    </div>
                ))
            }
        </div>
    </div>
)


const NotFound = () => (
    <div style={{textAlign:'center',marginTop:'100px'}}>
        <h1>404</h1>
        <h2>页面不存在</h2>
    </div>
)

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