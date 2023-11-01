<template>
  <div class="container-fluid">
    <section class="row">
      <main class="col-11 p-3">

        <div class="col-12">
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
              <img alt="logo" src="./assets/img/cw-logo.png" height="45" />
          </router-link>
        </div>

        <div class="col-12 banner rounded border border-primary p-5">
          <div class="p-3 shadow bgBlur rounded">
            <p class="fs-2">
              Get ahead of the scalpers. <br>
              Reserve your seat now with <br>
              real events for real people.
            </p>
          </div>
        </div>

        <div class="col-12 rounded shadow p-3 d-flex justify-content-evenly">
          <button v-for="eventType in types" :key="eventType" class="btn btn-secondary" @click="changeType()">
          {{ eventType.toUpperCase() }}
          </button>
        </div>

        <div class="col-12">
          <router-view />
        </div>

      </main>
      <header class="col-1">
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
    const types = ['concert', 'convention', 'sport', 'digital']

    return {
      types,

      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 64px);
}
header{
  background-color: #123456;
}

.banner{
  background-image: url(https://images.unsplash.com/photo-1526041092449-209d556f7a32?auto=format&fit=crop&q=80&w=1200&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-position: center;
  background-size: cover;
  color: white;
}

.bgBlur{
  background-color: #123456b9;
  // filter: blur(1px);
  width: fit-content;
}

</style>
