
<template>
  <!--
  <div>
    <p>{{ accommodation.id }}</p>
    <p>{{ accommodation.date }}</p>
    <p>{{ accommodation.priceInEur }}</p>
    <p>{{ accommodation.avaliable }}</p>
    <p>{{ accommodation.name }}</p>
    <p>{{ accommodation.city }}</p>
    <p>{{ accommodation.address }}</p>
    <p>{{ accommodation.country }}</p>
  </div>-->

  <q-card class="accommodation-card">
  <q-card-section class="accommodation-details">
    <h4 class="accommodation-title">{{ accommodation.name }}</h4>
    <p class="accommodation-info">City: {{ accommodation.city }}</p>
    <p class="accommodation-info">Address: {{ accommodation.address }}</p>
    <p class="accommodation-info">Country: {{ accommodation.country }}</p>
    <p class="accommodation-info">Available: {{ accommodation.avaliable }}</p>
    <p class="accommodation-info">Created: {{ formatDate(accommodation.createdAt) }}</p>
  </q-card-section>

  <q-separator />

  <q-card-section>
    <h5 class="text-primary">Prices</h5>
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
  </q-card-section>
</q-card>
</template>

<script>
export default {
  name: 'AccommodationDetailsPage',
  data() {
    return {
      accommodation: {}
    }
  },
  mounted() {
    this.accommodation = JSON.parse(this.$route.query.accommodation)
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
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px;
}

.accommodation-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.accommodation-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.accommodation-info {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

</style>

