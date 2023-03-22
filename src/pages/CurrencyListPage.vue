<template>
  <div class="q-pa-md">

    <q-table
      v-if="posts.length"
      title="Valute"
      :rows="posts"
      :columns="columns"
      row-key="id"
      class="col"
    />
    <pre>{{ posts }}</pre>
  </div>
</template>


<script>
</script>
