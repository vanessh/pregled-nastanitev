<template>
     <div v-if="$q.screen.gt.xs" class="col">
      <q-toggle v-model="visibleOnlyAvailable" val="available" label="Show only available accommodations"/>
      <q-space />
    </div>

<q-select
          v-else
          v-model="visibleOnlyAvailable"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />
  <div class="q-pa-md">
    <q-table
      v-if="accommodations.length"
      title="Accommodations"
      :rows="accommodations"
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
import { ref } from 'vue'

export default {
  name: 'AccommodationsPage',
  data() {
    return {
      visibleOnlyAvailable: ref([ 'avaliable' ]),

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
          label: 'Available',
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
