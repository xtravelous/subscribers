import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'
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
      path: '/main',
      name: 'Subscribers',
      component: Admin,
      meta: {
        layout: 'admin'
      }
    }
  ]
})
