# Qwitter
Quasar project: twitter app

Based on what you have described, it seems like the issue might be related to how you are sending the data from CurrencyListPage.vue to AccommodationDetailsPage.vue. You are currently using the push method of Vue Router to navigate to the AccommodationDetailsPage.vue component and passing in the currencies and rates data as query parameters. However, query parameters are usually used to pass data that can be represented as simple strings, and complex data types like objects and arrays are usually not passed in this way.

Instead of passing the currencies and rates data as query parameters, you might want to consider storing this data in a shared state management solution like Vuex or passing it through props between the components.

One way to implement this could be to create a shared store in Vuex to store the selected currencies and rates. You can then dispatch an action to update the selected currencies and rates in the store from CurrencyListPage.vue, and retrieve the selected currencies and rates from the store in AccommodationDetailsPage.vue. Here's an example of how this could be implemented:

Create a new Vuex store in a separate file store.js:
```javascript
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

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
```
In CurrencyListPage.vue, dispatch the setSelectedCurrencies and setSelectedCurrenciesRates actions to update the selected currencies and rates in the store:
```javascript
<script>
import { mapActions } from 'vuex'

export default {
  name: 'CurrencyListPage',
  methods: {
    ...mapActions([
      'setSelectedCurrencies',
      'setSelectedCurrenciesRates'
    ]),
    selectCurrencies() {
      // ...
      this.setSelectedCurrencies(selectedCurrencies)
      this.setSelectedCurrenciesRates(selectedCurrenciesRates)
      this.$router.push({
        name: 'AccommodationDetailsPage'
      })
    }
  }
}
</script>
```

In AccommodationDetailsPage.vue, retrieve the selected currencies and rates from the store using getters:
```javascript
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccommodationDetailsPage',
  computed: {
    ...mapGetters([
      'selectedCurrencies',
      'selectedCurrenciesRates'
    ])
  },
  mounted() {
    this.accommodation = JSON.parse(this.$route.query.accommodation);
    console.log('Accommodation on details:', this.accommodation);
    console.log('Selected currencies:', this.selectedCurrencies);
    console.log('Selected currencies rates:', this.selectedCurrenciesRates);
    // ...
  }
}
</script>
```

This way, you can share the selected currencies and rates data between components using the Vuex store.
