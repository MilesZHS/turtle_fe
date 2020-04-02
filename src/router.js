import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import User from '@/views/user/User_info.vue'
import Club_browse from '@/views/user/club_browse.vue'
import Activity_browse from '@/views/user/activity_browse.vue'
import Club_info from '@/views/user/club_info.vue'
import MyClub from '@/views/user/MyClub.vue'
import Test from '@/views/user/test.vue'
import Activity_info from '@/views/user/activity_info.vue'
import Equipment_rent from '@/views/user/equipment_rent.vue'
import UpdateInfo from '@/views/club/info/update_info/UpdateInfo.vue'
import Club from '@/views/club/Club.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/User_info',
      name: 'User',
      component: User
    },
    {
      path: '/club_browse',
      name: 'Club_browse',
      component: Club_browse
    },
    {
      path: '/activity_browse',
      name: 'Activity_browse',
      component: Activity_browse
    },
    {
      path: '/club_info',
      name: 'Club_info',
      component:  Club_info
    },
    {
      path: '/activity_info',
      name: 'Activity_info',
      component:  Activity_info
    },
    {
      path: '/equipment_rent',
      name: 'Equipment_rent',
      component: Equipment_rent
    },
    {
      path: '/updateinfo',
      name: 'UpdateInfo',
      component: UpdateInfo
    },
    {
      path: '/club',
      name: 'Club',
      component: Club
    },
    {
      path: '/myclub',
      name: 'MyClub',
      component: MyClub
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})

