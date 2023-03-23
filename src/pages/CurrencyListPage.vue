<!--<template>
<div class="q-pa-md">
    <q-table
      v-if="valute.length"
      title="Valute"
      :rows="valute"
      :columns="columns"
      row-key="rates"
      class="col"
    />
    <pre>{{ valute }}</pre>
  </div>
</template>


<script>
import { axios } from '../boot/axios'
import { ref } from 'vue'

export default{
name: 'CurrencyListPage',
data() {
  return {
    columns: [
    {
          name: 'rates',
          label: 'Rates',
          field: 'rates',
          align: 'left',
        }
    ],
    valute: []
  }
},

mounted() {
  this.getValute();
},

methods: {
    getValute() {
      axios.get('https://api.exchangerate-api.com/v4/latest/EUR')
        .then((res) => {
          this.valute = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
-->
<!--
    <div>
    <div v-for="(rate, currency) in rates" :key="currency">
      <pre>{{ currency }}: {{ rate }}</pre>
      <pre>{{ currency }}</pre>
    </div>
  </div>
-->

<!--
<template>
      <div v-for="(rate, currency) in rates" :key="currency">

  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator >
      <q-item clickable v-ripple >
        <q-item-section>{{currency}}</q-item-section>
      </q-item>
      </q-list>
      </div>
    </div>
</template>-->

<template>
    <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        v-model="multiple"
        multiple
        :options="currency"
        label="Valute"
        style="width: 250px"
      />
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

