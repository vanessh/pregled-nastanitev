<template>
  <div class="q-pa-md">
    <q-table
      v-if="posts.length"
      title="Accommodations"
      :rows="posts"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
      class="col"
    />
    <!--<pre>{{ posts }}</pre>-->
  </div>
</template>

<script>
import { axios } from '../boot/axios'

export default {
  name: 'CurrencyListPage',
  data() {
    return {
      initialPagination: {
        rowsPerPage: 11
        // rowsNumber: xx if getting data from a server
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
      posts: []
    }
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    getPosts() {
      axios.get('https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices')
        .then((res) => {
          this.posts = res.data
          //console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
