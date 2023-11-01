<template>
  <div class="container-fluid">
    <section class="row">
      <main class="col-10 p-3">

        <div class="col-12">
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
              <img alt="logo" src="./assets/img/cw-logo.png" height="45" />
          </router-link>
        </div>

        <router-view />

      </main>
      <header class="col p-0 m-0">
        <Navbar />
      </header>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {

    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>


<style lang="scss">
@import "./assets/scss/main.scss";

header{
  background-color: #123456;
  background-image: linear-gradient(#123456, #2a2d3a);
}

main{
  background-color: #2a2d3a;
}

</style>
