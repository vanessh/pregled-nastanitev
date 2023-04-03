<!--Tabela vseh nastanitev-->
<template>
  <q-toggle v-model="showAvaliableAccommodations" val="avaliable" label="Prikaži samo nastanitve, ki so na voljo" />
  <q-space />
  <div class="q-pa-md">
    <q-tr :props="props">
      <q-td>
        <q-btn icon="chevron_right" @click.stop="expandColumns" />
      </q-td>
    </q-tr>
    <q-table to="/accommodationDetails" v-if="filteredAccommodations.length" title="Accommodations"
      :rows="filteredAccommodations" :columns="displayedColumns" row-key="id" @click="onRowClick"
      :pagination="initialPagination" class="col">
    </q-table>
  </div>
</template>

<script>
//TODO: header slot
import store from 'src/store';
import { axios } from '../boot/axios'
export default {
  name: 'AccommodationsPage',
  data() {
    return {
      // Boolean spremenljivka, ki kontrolira prikaz vseh nastanitev/nastanitev ki so na voljo
      showAvaliableAccommodations: false,
      // omogočimo prikaz 11 nastanitev naenkrat
      initialPagination: {
        rowsPerPage: 11
      },
      // definicija stolpcev za tabelo
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
          field: row => this.formatDate(row.createdAt),
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
          label: 'Availability',
          field: row => row.avaliable ? 'Available' : 'Unavailable',
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
      // polje vseh nastanitev
      accommodations: [],
      // Boolean spremenljivka ki kontrolira prikaz dodatnih stolpcev
      displayExtraColumns: false,
      // objekt, ki hrani menjalne tečaje valut
      selectedCurrenciesRates: {}
    }
  },
  mounted() {
    // naložimo nastanitve iz API-ja, ko je komponenta nameščena
    this.getAccommodations();
  },

  // computed lastnost, ki vrne samo stolpce, ki naj bodo vedno prikazani
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
    // Prikaz nastanitev, ki so na voljo
    filteredAccommodations() {
      if (!this.showAvaliableAccommodations) {
        return this.accommodations;
      }
      return this.accommodations.filter(accommodation => accommodation.avaliable);
    }
  },

  methods: {
    // Metoda za pridobitev nastanitev iz API-ja
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
    // Metoda, ki ob kliku na vrstico pošlje podatke izbrane nastanitve na stran o podrobnostih nastanitve
    onRowClick(event) {
      const row = event.target.parentElement;
      const index = row.rowIndex - 1; // subtract 1 to account for the header row
      const clickedAccommodation = this.filteredAccommodations[index];
      const accommodationId = clickedAccommodation.id;
      console.log('clicked on', clickedAccommodation)
      console.log('id', accommodationId)

      store.dispatch('setSelectedAccommodation', clickedAccommodation);

      this.$router.push({
        name: 'AccommodationDetailsPage',
      })
    },
    //Prikaz city, address, country ob kliku na ikono
    expandColumns() {
      this.displayExtraColumns = !this.displayExtraColumns;
    },
    //Format date
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    }
  }
}
</script>
