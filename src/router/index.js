import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home/home.vue'
import '@/assets/iconfont/iconfont.css'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'*',
      redirect:"home"
    }
  ]
})
