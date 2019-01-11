import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import Login from '@/pages/login/'
import NotFound  from '@/pages/not-found/'

const routers = [
    {
        path:'/login',
        component:Login,
    },{

    }
]

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