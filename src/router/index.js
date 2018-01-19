import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Admin from '@/pages/Admin'
import ComingSoon from '@/pages/ComingSoon'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'login'
      }
    },
    {
      path: '/subscribers',
      name: 'Subscribers',
      component: Admin,
      meta: {
        layout: 'admin'
      }
    },
    {
      path: '/soon',
      name: 'ComingSoon',
      component: ComingSoon
    }
  ]
})
