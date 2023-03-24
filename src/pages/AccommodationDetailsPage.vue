<template>
  <div>
    <h1>{{ accommodation.name }}</h1>
    <p>{{ accommodation.description }}</p>
    <p>{{ accommodation.price }}</p>
    <!-- other details here -->
  </div>
</template>

<script>
export default {
  name: 'AccommodationDetailsPage',
  props: ['accommodation'],
  mounted() {
    console.log("PROP",this.accommodation); // to check if the prop is received correctly
  }
};
</script>
