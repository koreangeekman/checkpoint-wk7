<template>
  <section class="row"><div class="col-12"><p class="fs-3">My Events</p></div></section>

    <section v-if="events" class="row">
      <div v-for="towerEvent in events" :key="towerEvent.id" class="col-3">
        <div class="card m-3 p-0 greyBG">
          <EventCard :towerEvent="towerEvent" />
        </div>
      </div>
    </section>
    <section v-else class="row"><div class="col-12 text-center">Loading... <i class="mdi mdi-tire mdi-spin"></i></div></section>
    
    <section class="row"><div class="col-12"><p class="fs-3">Upcoming Events</p></div></section>
    <section v-if="tickets" class="row">
      <div v-for="towerEvent in events" :key="towerEvent.id" class="col-3">
        <div class="card m-3 p-0 greyBG">
          <EventCard :towerEvent="towerEvent" />
        </div>
      </div>
    </section>
    <section v-else class="row"><div class="col-12 text-center">Loading... <i class="mdi mdi-tire mdi-spin"></i></div></section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import EventCard from "../components/EventCard.vue";
import { accountService } from "../services/AccountService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger";

export default {
  setup() {

    async function _getEventsByAccountId() {
      try {
        await accountService.getEventsByAccountId();
      } catch (error) {
        logger.error(error);
      }
    }

    async function _getTicketsByAccountId() {
      try {
        await accountService.getTicketsByAccountId();
      } catch (error) {
        logger.error(error);
      }
    }

    onMounted(() => {
      towerEventsService.clearData();
      ticketsService.clearData();
      _getEventsByAccountId();
      _getTicketsByAccountId();
    })

      return {
        account: computed(() => AppState.account),
        events: computed(() => AppState.events),
        tickets: computed(() => AppState.tickets),
        
      };
    },
    components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
p{
  color: white;
}
</style>
