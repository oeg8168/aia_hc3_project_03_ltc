import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'
import i18n from './i18n'
import router from './plugins/router.js'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import './plugins/axios'
import './plugins/element.js'
import 'animate.css'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
