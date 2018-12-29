import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Translate from '@/pages/Translate'
import Todo from '@/pages/Todo'
import Onewords from '@/pages/Onewords'
import Hotwords from '@/pages/Hotwords'
import Wallpaper from '@/pages/Wallpaper'
import Movie from '@/pages/Movie'

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
            {
              path: '/hot-words',
              name: 'Hotwords',
              component: Hotwords,
            },
            {
              path: '/wallpaper',
              name: 'Wallpaper',
              component: Wallpaper,
            },
            {
              path: '/movie',
              name: 'Movie',
              component: Movie,
            },
            
          ]
        }
      ]

    },
  ]
})
