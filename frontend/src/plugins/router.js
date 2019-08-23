import Vue from 'vue'
import VueRouter from 'vue-router'

import Intro from '@/components/Intro'
import Demo from '@/components/Demo'
import About from '@/components/About'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/intro' },
    { path: '/intro', component: Intro },
    { path: '/demo', component: Demo },
    { path: '/about', component: About }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 200)
    })
  }
})

router.beforeEach((to, from, next) => {
  to.matched.length > 0 ? next() : next(false);
})

export default router
