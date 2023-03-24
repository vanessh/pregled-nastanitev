<!--Multiple select valut-->
<template>
  <div class="q-pa-md" text-center>
    <p class="text-primary">Izberite valute</p>
    <div class="q-gutter-md row items-start">
      <q-select
      filled
      v-model="multiple"
      multiple
      :options="currency"
      label="Valute"
      style="width: 250px" />
      <q-btn
      to="/accommodations"
      class="q-pa-md"
      push color="primary"
      round icon="maps_home_work"
      :query="{ currencies: JSON.stringify(multiple) }"
      @click="goToAccommodationsPage" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  name: 'CurrencyListPage',
  data() {
    return {
      multiple: ref(null),
      base: 'EUR',
      rates: {},
      currency: []
    }
  },
  mounted() {
    this.getExchangeRates()
  },
  methods: {
    logSelectedCurrencies() {
    console.log(this.multiple);
  },
  goToAccommodationsPage() {
    this.$router.push({
      name: 'AccommodationsPage',
      query: {
        currencies: JSON.stringify(this.multiple)
      }
    })
  },
    getExchangeRates() {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/EUR`)
        .then(res => {
          this.rates = res.data.rates
          this.currency = Object.keys(this.rates)
          //console.log(res.data.rates)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
