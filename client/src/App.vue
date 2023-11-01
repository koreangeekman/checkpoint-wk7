<template>
  <div class="container-fluid">
    <section class="row">
      <main class="col-11 p-3">
        <PageTopper />
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
import PageTopper from "./components/PageTopper.vue"

export default {
  setup() {

    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, PageTopper }
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
