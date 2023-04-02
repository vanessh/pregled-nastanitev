<!--Multiple select valut-->
<template>
  <div class="q-pa-md" text-center>
    <p class="text-primary">Izberite valute</p>
    <div class="q-gutter-md row items-start">
      <!-- Q-Select komponenta, ki omogoča izbiro valut -->
      <q-select filled v-model="multiple" multiple :options="currency" label="Valute" style="width: 250px" />
    <!-- Q-Button komponenta, ki ob kliku preusmeri na stran z nastanitvami
                                                                                                                                                              in pošlje izbrane valute kot parametre v URL naslov -->
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

    selectCurrencies() {
      //var selectedCurrenciesRates = {}
      // gremo čez vsako izbrano valuto in shranimo njen tečaj v objekt
      /*for (const currency of selectedCurrencies) {
        selectedCurrenciesRates[currency] = this.rates[currency]
      }
*/
      for (let i = 0; i < this.multiple.length; i++) {
        const currency = this.multiple[i];
        store.state.selectedCurrencies.push(currency);
        store.state.selectedCurrenciesRates[currency] = this.rates[currency];
      }
      //store.state.selectedCurrencies.push(this.multiple)

      // this.$store.state.selectedCurrenciesRates.push(selectedCurrenciesRates)

      //console.log('log selected currencies', this.$store.state.selectedCurrencies)
      // console.log('log selected currencies rates:', this.$store.state.selectedCurrenciesRates)
    },
    /*
    onButtonClick() {
      // shranimo izbrane valute v spremenljivko
      const selectedCurrencies = this.multiple
      // ustvarimo objekt za shranjevanje tečajev izbranih valut
      const selectedCurrenciesRates = {}
      // gremo čez vsako izbrano valuto in shranimo njen tečaj v objekt
      for (const currency of selectedCurrencies) {
        selectedCurrenciesRates[currency] = this.rates[currency]
      }
      /*
            const url = this.$router.resolve({
              name: 'AccommodationDetailsPage',
              query: {
                currencies: JSON.stringify(selectedCurrencies),
                rates: JSON.stringify(selectedCurrenciesRates)
              }
            }).href

            console.log('URL:', url)

      console.log('log selected currencies', selectedCurrencies)
      console.log('log selected currencies rates:', selectedCurrenciesRates) //to je okej

      // preusmerimo na stran z nastanitvami in pošljemo izbrane valute in njihove tečaje kot parametre v URL naslov
      this.$router.push({
        name: 'AccommodationDetailsPage',
        currencies: JSON.stringify(selectedCurrencies),
        rates: JSON.stringify(selectedCurrenciesRates)

      })
    },
    */

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
