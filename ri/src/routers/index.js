import React from 'react';
import { BrowserRouter,HashRouter,Switch,Route } from 'react-router-dom';
// import { Router,hashHistory } from 'react-router';

import Login from '@/pages/login/'
import Home from '@/pages/home/'
import Todo from '@/pages/todo/'
import Weather from '@/pages/weather/'
import Menu from '@/pages/menu/'


const routers = [
   
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
    <div style={{textAlign:'center',marginTop:'100px'}}>
        <h1>404</h1>
        <h2>页面不存在</h2>
        <p>
            <a href="/">回到首页</a>
        </p>
    </div>
)
const rou=(path)=>{
    console.log(path)
    window.location.href=window.location.origin+'#'+path
}

const route = ()=> (
    <div style={{width:'100%',height:'100%',margin:0,padding:0}}>

        <Menu rou={rou}/>

        <HashRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                {
                    routers.map((route,i)=>(
                        <Route key={i} {...route}/>
                    ))
                }
                <Route component={NotFound} />
            </Switch>
        </HashRouter>
    </div>
)
export default route