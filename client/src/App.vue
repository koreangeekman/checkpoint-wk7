<template>
  <div class="container-fluid">
    <section class="row">
      <main class="order-2 order-md-1 col-12 col-md-11 p-3">
        <PageTopper :name="appState.account.name" />
        <router-view />
      </main>
      <header class="order-1 order-md-2 col-12 col-md-1 p-0 m-0">
        <nav>
          <Login />
        </nav>
      </header>
    </section>
  </div>

  <!-- SECTION MODALS -->
  <NewEventModal />
</template>


<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import PageTopper from "./components/PageTopper.vue"
import NewEventModal from "./components/NewEventModal.vue"
import Login from "./components/Login.vue"

export default {
  setup() {

    return {
      appState: computed(() => AppState)
    }
  },
  components: { PageTopper, NewEventModal, Login }
}
</script>


<style lang="scss">
@import "./assets/scss/main.scss";

header {
  background-color: #123456;
  background-image: linear-gradient(#123456, #2a2d3a);
}
</style>
