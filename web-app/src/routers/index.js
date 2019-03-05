import React from 'react';
import { BrowserRouter,HashRouter,Switch,Route } from 'react-router-dom';
// import { Router,hashHistory } from 'react-router';

import Movie from '../pages/movie/'
import Novel from '../pages/novel/'
import Essay from '../pages/essay/'
import Weather from '../pages/weather/'
import Wallpaper from '../pages/wallpaper/'

const routers = [
    {
        path:'/weather',
        component:Weather,
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

const home =()=>(
    <div style={{textAlign:'center'}}>
        <p>
            欢迎
        </p>
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