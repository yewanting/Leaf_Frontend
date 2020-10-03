import Vue from 'vue'
import Router from 'vue-router'
import MainHome from '@/home/MainHome.vue'
import WorkHome from '@/home/WorkHome.vue'
import home from '@/home/home.vue'
import '@/assets/iconfont/iconfont.css'
Vue.use(Router);

var router = new Router({
    mode:'history',
    routes:[
        {
            path:'/MainHome',
            name:'MainHome',
            component:MainHome
        },
        {
            path:'/WorkHome',
            name:'WorkHome',
            component:WorkHome
        },
        {
            path:'/home',
            name:'home',
            component:home
        },
        {
            path:'*',
            redirect:'MainHome'
        }
    ]
})

export default router