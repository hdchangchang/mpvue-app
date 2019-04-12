import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 首页标签颜色
    labelColor: {
      firstMealC: '#ffa39c',
      secondMealC: '#8ad773',
      ratioC: '#ff9900',
      discountC: '#ff4040',
      labelC: '#92d5f5'
    },
    //
    addressInfo: {}
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store
