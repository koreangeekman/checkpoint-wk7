<template>
  <span class="navbar-text">

    <div v-if="!user.isAuthenticated">
      <button class="btn selectable text-success lighten-30 text-uppercase my-lg-0" @click="login">
        Login
      </button>
      <router-link :to="{ name: 'Home' }" class="btn text-success">
        <p class="btn text-white border lighten-30 selectable text-uppercase">Home</p>
      </router-link>
    </div>

    <div v-else>
      <div class="d-flex flex-column align-items-center">

        <div v-if="account.picture || user.picture" type ="button">
          <img :src="account.picture || user.picture" alt="account photo" height="86" class="rounded border-line mt-2 mb-3" />
        </div>

        <router-link :to="{ name: 'Home' }">
          <button class="btn mb-3 px-4 text-white border lighten-30 selectable">Home</button>
        </router-link>

        <router-link :to="{ name: 'Account' }">
          <button class="btn mb-3 px-3 text-white border lighten-30 selectable">Account</button>
        </router-link>

        <button class="btn btn-success mb-3 px-2 newEvent text-dark">New Event</button>

        <button class="btn border border-danger text-danger lighten-30 selectable text-uppercase px-1" @click="logout">
          logout
          <i class="mdi mdi-logout"></i>
        </button>

      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-line{
  border: 1px solid #56c7fb;
}
.newEvent{
  background-color:#79e7ab;
}
</style>
