<template>
  <span class="navbar-text">

    <div v-if="!user.isAuthenticated" class="d-flex flex-column justify-content-center py-4">

      <router-link :to="{ name: 'Home' }" class="btn text-success">
        <p class="my-4 btn text-white border lighten-30 selectable text-uppercase">Home</p>
      </router-link>

      <button class="btn selectable text-success lighten-30 text-uppercase my-lg-0" @click="login">
        Login
      </button>

    </div>

    <div v-else>
      <div class="d-flex flex-row flex-md-column align-items-center pt-3">

        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" height="86"
            class="rounded border-line ms-4 ms-md-0 mt-md-3 mb-md-5" />
        </div>

        <router-link :to="{ name: 'Home' }">
          <button class="btn mb-md-3 ms-5 me-3 mx-md-0 px-md-4 text-white border lighten-30 selectable">Home</button>
        </router-link>

        <router-link :to="{ name: 'Account' }">
          <button class="btn mb-md-3 mx-3 mx-md-0 px-md-3 text-white border lighten-30 selectable">Account</button>
        </router-link>

        <button class="btn btn-success mt-md-4 mb-md-3 ms-auto me-3 mx-md-0 px-md-2 newEvent text-dark"
          data-bs-toggle="modal" data-bs-target="#newEventModal">New Event</button>

        <button
          class="btn border border-danger text-danger lighten-30 selectable text-uppercase mt-md-4 ms-auto me-3 mx-md-0 px-md-1"
          @click="logout"> logout
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
.border-line {
  border: 1px solid #56c7fb;
}

.newEvent {
  background-color: #79e7ab;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}
</style>
