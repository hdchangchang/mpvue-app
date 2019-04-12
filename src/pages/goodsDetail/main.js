import Vue from 'vue'
import App from './index.vue'

import bus from '@/plugin/bus.js'

Vue.use(bus)

// add this to handle exception
Vue.config.errorHandler = function(err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
