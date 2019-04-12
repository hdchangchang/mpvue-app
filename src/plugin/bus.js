import Vue from 'vue'

const bus = new Vue()

export default class Bus {
  static install(Vue) {
    Vue.prototype.$bus = {
      emit(name, params) {
        bus.$emit(name, params)
      },
      on(name, func) {
        bus.$on(name, func)
      }
    }
  }
}
