
import React from 'react';
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'



const routers=[
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
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
            <Route exact path="/" component={Home}/>
            {
                routers.map((route,i)=>(
                    <Route key={i} {...route} />
                ))
            }
            <Route exact path="/login" component={Login}/>
            <Route path="/error" component={NotFound}/>
            <Route path="*" render={() => <Redirect to="/error" /> } />
        </Switch>
    </BrowserRouter>
)

export default route