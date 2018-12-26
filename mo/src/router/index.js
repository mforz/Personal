import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Translate from '@/pages/Translate'
import Todo from '@/pages/Todo'
import Onewords from '@/pages/Onewords'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path: '/',
          name: 'Main',
          component: Main,
          children:[
            {
              path: '/translate',
              name: 'Translate',
              component: Translate,
            },
            {
              path: '/todo',
              name: 'Todo',
              component: Todo,
            },
            {
              path: '/onewords',
              name: 'Onewords',
              component: Onewords,
            },
            
          ]
        }
      ]

    },
  ]
})
