import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFastBackward, faFastForward, faHome } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faFastBackward,
  faFastForward,
  faCheckCircle,
  faHome
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate)
Vue.config.productionTip = false
import './assets/scss/custom.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
