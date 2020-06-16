import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/iconfonts/iconfont.css'
import Card from './components/card.vue'
import ListCard from './components/ListCard.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

Vue.config.productionTip = false

Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')