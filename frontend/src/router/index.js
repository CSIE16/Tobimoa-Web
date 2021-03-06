import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  mode : "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
