import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Restaurant from '@/components/Restaurant/Restaurant'
import Restaurants from '@/components/Restaurant/Restaurants'

import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Profile from '@/components/User/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/restaurants',
      name: 'Restaurants',
      component: Restaurants
    },
    {
      path: '/restaurant/:id',
      name: 'Restaurant',
      component: Restaurant
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
})
