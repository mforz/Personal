import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import Login from '@/pages/login/'
import Home from '@/pages/home/'
import Todo from '@/pages/todo/'
import Weather from '@/pages/weather/'

const routers = [
    {
        path:'/',
        component:Home,
    },
    {
        path:'/login',
        component:Login,
    },{
        path:'/todo',
        component:Todo,
    },{
        path:'/weather',
        component:Weather,
    }
]



const NotFound = () => (
    <div style={{textAlign:'center'}}>
        <h1>404</h1>
        <h2>页面不存在</h2>
        <p>
            <a href="/">回到首页</a>
        </p>
    </div>
)


const route = ()=> (
    <BrowserRouter>
        <Switch>
            {
                routers.map((res,i)=>(
                    <Route key={i} path={res.path} exact component={res.component} />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)
export default route