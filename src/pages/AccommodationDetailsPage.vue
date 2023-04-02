<template>
  <q-card class="accommodation-card">
    <q-card-section class="accommodation-details">
      <h4 class="accommodation-title">{{ accommodation.name }}</h4>
    </q-card-section>
    <q-separator />
    <q-card-section class="accommodation-details">
      <p class="accommodation-info">{{ accommodation.address }} , {{ accommodation.city }} , {{ accommodation.country }}
      </p>
      <!--
      <p class="accommodation-info">City: {{ accommodation.city }}</p>
    <p class="accommodation-info">Address: {{ accommodation.address }}</p>
    <p class="accommodation-info">Country: {{ accommodation.country }}</p>-->
      <p class="accommodation-info">Created on {{ formatDate(accommodation.createdAt) }}</p>
      <p class="accommodation-info" :style="{ color: accommodation.avaliable ? 'green' : 'red' }">This accommodation is
        currently {{ accommodation.avaliable ? 'available' : 'unavailable' }}.</p>

    </q-card-section>

    <q-separator />

    <q-card-section>
      <h5 class="text-primary">Prices</h5>
      <!--
    <q-table
      :rows="accommodation.prices"
      :columns="columns"
      :pagination="false"
      :rows-per-page-options="[]"
    >
      <template v-slot:body="props">
        <q-td v-for="col in props.cols" :key="col.name">
          {{ props.row[col.name] }}
        </q-td>
      </template>
    </q-table>
    -->
    </q-card-section>
  </q-card>
</template>

<script>

import store from '../store'
// import  selectedCurrenciesRates from  './CurrencyListPage.vue';
// console.log("test", selectedCurrenciesRates)
console.log("neke", store.state.selectedCurrencies)
export default {
  name: 'AccommodationDetailsPage',


  computed: {
    currencies() {
      return store.state.selectedCurrencies
    }
  },

  data() {
    return {
      accommodation: {},
      //currencies: JSON.parse(this.$route.currencies || '[]'),
      //rates: JSON.parse(this.$route.rates || '{}'),


      columns: [
        {
          name: ''
          //selectedCurrencies: ref([]),
          //selectedCurrenciesRates: ref({})
        }
      ]
    }
  },
  mounted() {
    this.accommodation = JSON.parse(this.$route.query.accommodation);
    console.log('Accommodation on details:', this.accommodation);
    console.log('Query params:', this.$route.query);

    //const currencies = JSON.parse(this.$route.query.currencies)
    //const rates = JSON.parse(this.$route.query.rates)

    console.log(this.currencies) // array of currencies
    console.log(this.rates) // array of rates

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
  background-color: #e9f6fb;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
  padding: 10px;
  margin: 10px;
  width: 100%;
  max-width: 600px;
  margin-left: 40px;
  margin-top: 40px;
}

.accommodation-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.accommodation-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 450;
}

.accommodation-info {
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 400;
}
</style>

