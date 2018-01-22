// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'animate.css/animate.css'
import vueTopprogress from 'vue-top-progress'
import { VueExtendLayout, layout } from 'vue-extend-layout'
 
Vue.use(Vuetify)
Vue.use(vueTopprogress)
Vue.use(VueExtendLayout)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...layout
})
