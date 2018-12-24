import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Translate from '@/pages/Translate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
            }
          ]
        }
      ]

    },
  ]
})
