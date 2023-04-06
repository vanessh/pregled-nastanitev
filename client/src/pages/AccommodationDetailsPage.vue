<template>
  <q-card class="accommodation-card">
    <q-card-section class="accommodation-details">
      <h4 class="accommodation-title">{{ accommodation.name }}</h4>
    </q-card-section>

    <q-card-section class="accommodation-details">
      <p class="accommodation-info">{{ accommodation.address }} , {{ accommodation.city }} , {{ accommodation.country }}
      </p>
      <p class="accommodation-info">Created on {{ formatDate(accommodation.createdAt) }}</p>
      <p class="accommodation-info" :style="{ color: accommodation.avaliable ? 'green' : 'red' }">This accommodation is
        currently {{ accommodation.avaliable ? 'available' : 'unavailable' }}.</p>
    </q-card-section>
    <q-separator />
    <q-card-section class="accommodation-details">
      <h5 class="text-bold ">Prices</h5>
      <li class="accommodation-info">EUR: {{ accommodation.priceInEur }}</li>
      <li class="accommodation-info" v-for="(rate, currency) in computedRates" :key="currency">{{ currency }}: {{ rate }}
      </li>
    </q-card-section>
  </q-card>
</template>

<script>
import store from '../store'
console.log("Store selectedCurrencies", store.state.selectedCurrencies)
console.log("Store selectedCurrenciesRate", store.state.selectedCurrenciesRates)
console.log("Store selectedAccommodation", store.state.selectedAccommodation)
export default {
  name: 'AccommodationDetailsPage',

  computed: {
    currencies() {
      return store.state.selectedCurrencies
    },
    rates() {
      return store.state.selectedCurrenciesRates
    },
    accommodation() {
      return store.state.selectedAccommodation
    },
    computedRates() {
      let computedRates = {};
      for (const [currency, rate] of Object.entries(this.rates)) {
        computedRates[currency] = rate * this.accommodation.priceInEur
      }
      return computedRates;
    }
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style>
.accommodation-card {
  background-color: #fc51714b;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
  padding: 15px;
  margin: 10px;
  width: 100%;
  max-width: 600px;
  margin-left: 40px;
}

.accommodation-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0
}

.accommodation-title {
  font-size: 1.5rem;
  margin-bottom: 1px;
  font-weight: 450;
  margin-top: 0;
}

.accommodation-info {
  font-size: 1.2rem;
  margin-bottom: 1px;
  font-weight: 400;
  margin-top: 0;
}

.text-bold {
  margin-top: 0;
}
</style>

