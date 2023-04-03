<template>
  <q-layout view="lHh lpR fFf">

    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          Pregled nastanitev
          <q-avatar icon="maps_home_work">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Left drawer -->
    <q-drawer v-model="leftDrawerOpen" side="left" :width="283" bordered>
      <q-list>
        <!-- Home -->
        <!-- color is set to primary when it is active -->
        <q-item to="/" clickable v-ripple exact> <!-- Exact: so it is only set to primary color when it is clicked on-->
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold">Currencies</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
