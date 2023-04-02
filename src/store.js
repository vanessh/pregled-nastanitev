import Vuex from 'vuex'
import Vue from 'vue'

export default new Vuex.Store({
  state: {
    selectedCurrencies: [],
    selectedCurrenciesRates: {}
  },
  mutations: {
    updateSelectedCurrencies(state, currencies) {
      state.selectedCurrencies = currencies
    },
    updateSelectedCurrenciesRates(state, rates) {
      state.selectedCurrenciesRates = rates
    }
  },
  actions: {
    setSelectedCurrencies({ commit }, currencies) {
      commit('updateSelectedCurrencies', currencies)
    },
    setSelectedCurrenciesRates({ commit }, rates) {
      commit('updateSelectedCurrenciesRates', rates)
    }
  },
  getters: {
    selectedCurrencies(state) {
      return state.selectedCurrencies
    },
    selectedCurrenciesRates(state) {
      return state.selectedCurrenciesRates
    }
  }
})
