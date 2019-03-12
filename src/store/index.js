import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    addressInfo: {
      endLat: '39.94055',
      endLng: '116.43207',
      endName: '来福士购物中心'
    }
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store
