import Vue from 'vue'
import Element from 'element-ui'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import CateEdit from '../views/CateEdit.vue'
import CateList from '../views/CateList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        // 分类
        path: '/categories/create',
        component: CateEdit
      },
      {
        path: '/categories/list',
        component: CateList
      },
      {
        path: '/categories/edit:_id',
        component: CateEdit,
        props: true
      },
      // 物品/装备
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/items/edit:_id',
        component: ItemEdit,
        props: true
      },
      // 英雄
      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      {
        path: '/heroes/edit:_id',
        component: HeroEdit,
        props: true
      },
      // 文章
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/articles/edit:_id',
        component: ArticleEdit,
        props: true
      },
      // 广告
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/ads/edit:_id',
        component: AdEdit,
        props: true
      },
      // 管理员
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: '/admin_users/edit:_id',
        component: AdminUserEdit,
        props: true
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  if (!to.meta.isPublic && localStorage.token) {
    return next('/login')
  }
  next()
})
export default router