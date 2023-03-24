<!--Tabela vseh nastanitev-->
<template>
  <q-toggle
  v-model="showAvaliableAccommodations"
  val="avaliable"
  label="Prikaži samo nastanitve, ki so na voljo" />
  <q-space />
  <div class="q-pa-md">
    <q-tr :props="props">
        <q-td>
          <q-btn icon="expand_more" @click.stop="toggleColumns" />
        </q-td>
      </q-tr>
    <q-table
    v-if="filteredAccommodations.length"
    title="Accommodations" :rows="filteredAccommodations"
    :columns="displayedColumns"
    row-key="id"
    @click="onRowClick"
    :pagination="initialPagination"
    class="col" >

    </q-table>
    <!--<pre>{{ filteredAccommodations }}</pre>-->
  </div>
</template>

<script>
//TODO: header slot
//TODO: expand rows to show city, address, country

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
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: true
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

      ],
      accommodations: [],
      displayExtraColumns: false,
    }
  },

  mounted() {
    this.getAccommodations();
  },

  computed: {
    displayedColumns() {
      return this.columns.filter(
        (col) =>

          !this.displayExtraColumns ||
          col.name === 'id' ||
          col.name === 'createdAt' ||
          col.name === 'priceInEur' ||
          col.name === 'avaliable' ||
          col.name === 'name'
      )
    },

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
    },

    onRowClick(event) {
      const row = event.target.parentElement;
      const index = row.rowIndex - 1; // subtract 1 to account for the header row
      const clickedAccommodation = this.filteredAccommodations[index];
      const accommodationId = clickedAccommodation.id;
      // console.log(accommodationId);/
      axios.get(`https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices/${accommodationId}`)
        .then(res => {
          this.$router.push({ name: 'AccommodationDetailsPage', props: { accommodation: clickedAccommodation } });
          console.log('clicked on', clickedAccommodation)
          console.log('id', accommodationId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //Show city, address, country when clicked on icon
    toggleColumns() {
      this.displayExtraColumns = !this.displayExtraColumns;
    },

    /*toggleRow(index) {
    this.$set(this.filteredAccommodations[index], 'expanded', !this.filteredAccommodations[index].expanded);
  },*/
  }
}

</script>




