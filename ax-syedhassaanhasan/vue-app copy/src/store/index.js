import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    htmlChartData: null,
  },
  mutations: {
    htmlChartData(state, payload) {
      state.htmlChartData = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
