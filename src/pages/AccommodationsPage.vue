<!--Tabela vseh nastanitev-->
<template>
      <q-toggle
      v-model="showAvaliableAccommodations"
      val="avaliable"
      label="Show only avaliable accommodations"/>
      <q-space />
  <div class="q-pa-md">
    <q-table
      v-if="filteredAccommodations.length"
      title="Accommodations"
      :rows="filteredAccommodations"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
      class="col"
    />
    <!--<pre>{{ accommodations }}</pre>-->
  </div>
</template>

<script>
import { axios } from '../boot/axios'

export default {
  name: 'AccommodationsPage',
  data() {
    return {
      showAvaliableAccommodations: false,

      initialPagination: {
        rowsPerPage: 11
      },
      columns: [
        {
          name: 'id',
          label: 'Id',
          field: 'id',
          align: 'left',
        },
        {
          name: 'createdAt',
          label: 'Date',
          field: 'createdAt',
          align: 'left',
        },
        {
          name: 'priceInEur',
          label: 'Price EUR',
          field: 'priceInEur',
          align: 'left',
        },
        {
          name: 'avaliable',
          label: 'Avaliable',
          field: 'avaliable',
          align: 'left',
        },
        {
          name: 'city',
          label: 'City',
          field: 'city',
          align: 'left',
          sortable: true
        },
        {
          name: 'address',
          label: 'Address',
          field: 'address',
          align: 'left',
          sortable: true
        },
        {
          name: 'country',
          label: 'Country',
          field: 'country',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: true
        },
      ],
      accommodations: []
    }
  },

  mounted() {
    this.getAccommodations();
  },

  computed: {
    //Show only avaliable accommodations
  filteredAccommodations() {
    if (!this.showAvaliableAccommodations) {
      return this.accommodations;
    }
    return this.accommodations.filter(accommodation => accommodation.avaliable);
  }
},

  methods: {
    getAccommodations() {
      axios.get('https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices')
        .then(res => {
          this.accommodations = res.data
          //console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

