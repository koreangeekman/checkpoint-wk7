<template>
  <section class="row">
    <div class="col-12 d-flex align-items-center">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
      </router-link>
      <div v-if="name && route.name=='Account'" class="w-100">
        <p class="mb-0 fs-3 text-center">{{name.toUpperCase()}}'s Events and Tickets</p>
      </div>
    </div>
  </section>
</template>


<script>
import { useRoute } from "vue-router";

export default {
  props: { name: { type: String } },

  setup() {
    
    const route = useRoute();

    return {
      route,
    }
  }
};
</script>


<style lang="scss" scoped>
p{
  color: white;
}
</style>