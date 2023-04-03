<!--Multiple select valut-->
<template>
  <div class="q-pa-md" text-center>
    <p class="text-primary">Izberite valute</p>
    <div class="q-gutter-md row items-start">
      <!-- Q-Select komponenta, ki omogoča izbiro valut -->
      <q-select filled v-model="multiple" multiple :options="currency" label="Valute" style="width: 250px" />
      <!-- Q-Button komponenta, ki ob kliku preusmeri na stran z nastanitvami in pošlje izbrane valute kot parametre v URL naslov -->
      <q-btn to="/accommodations" class="q-pa-md" push color="primary" round icon="maps_home_work"
        :query="{ currencies: JSON.stringify(multiple) }" @click="selectCurrencies" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vuex from 'vuex'
import store from '../store'
import { ref } from 'vue'
import { mapActions } from 'vuex'


export default {
  name: 'CurrencyListPage',

  methods: {
    ...mapActions([
      'setSelectedCurrencies',
      'setSelectedCurrenciesRates'
    ]),

    // V store.js pošljemo pridobljene valute in tečaje
    selectCurrencies() {
      for (let i = 0; i < this.multiple.length; i++) {
        const currency = this.multiple[i];
        store.state.selectedCurrencies.push(currency);
        store.state.selectedCurrenciesRates[currency] = this.rates[currency];
      }
    },

    // API za pridobivanje tečajev valut
    getExchangeRates() {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/EUR`)
        .then(res => {
          this.rates = res.data.rates // shranimo tečaje valut v objekt rates
          this.currency = Object.keys(this.rates) // shranimo seznam valut v spremenljivko currency
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data() {
    return {
      multiple: ref(null),
      base: 'EUR',
      rates: {}, // objekt za shranjevanje tečajev valut
      currency: [] // seznam valut
    }
  },
  mounted() {
    this.getExchangeRates()
  },
}
</script>
