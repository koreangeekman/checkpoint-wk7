<template>
  <div class="container-fluid">
    <section class="row">
      <main class="col-12 col-md-11 p-3">
        <PageTopper :name="appState.account.name" />
        <router-view />
      </main>
      <header class="col p-0 m-0">
        <Navbar />
      </header>
    </section>
  </div>
  <!-- SECTION MODALS -->
  <NewEventModal />
</template>


<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import PageTopper from "./components/PageTopper.vue"
import NewEventModal from "./components/NewEventModal.vue"

export default {
  setup() {

    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, PageTopper, NewEventModal }
}
</script>


<style lang="scss">
@import "./assets/scss/main.scss";

header {
  background-color: #123456;
  background-image: linear-gradient(#123456, #2a2d3a);
}
</style>
