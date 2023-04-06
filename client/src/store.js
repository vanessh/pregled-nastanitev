import Vuex from 'vuex'
import Vue from 'vue'

export default new Vuex.Store({
  state: {
    selectedAccommodation: {},
    selectedCurrencies: [],
    selectedCurrenciesRates: {}
  },
  mutations: {
    updateSelectedAccommodation(state, accommodations) {
      state.selectedAccommodation = accommodations
    },
    updateSelectedCurrencies(state, currencies) {
      state.selectedCurrencies = currencies
    },
    updateSelectedCurrenciesRates(state, rates) {
      state.selectedCurrenciesRates = rates
    }
  },
  actions: {
    setSelectedAccommodation({ commit }, accommodations) {
      commit('updateSelectedAccommodation', accommodations)
    },
    setSelectedCurrencies({ commit }, currencies) {
      commit('updateSelectedCurrencies', currencies)
    },
    setSelectedCurrenciesRates({ commit }, rates) {
      commit('updateSelectedCurrenciesRates', rates)
    }
  },
  getters: {
    selectedAccommodations(state) {
      return state.selectedAccommodation
    },
    selectedCurrencies(state) {
      return state.selectedCurrencies
    },
    selectedCurrenciesRates(state) {
      return state.selectedCurrenciesRates
    }
  }
})
