<template>
  <div class="col-12 coverImg rounded position-relative">

    <section class="row bgBlur rounded shadow px-3 py-4">
      <div class="col-12 col-md-4">
        <img :src="activeEvent.coverImg" :alt="activeEvent.name" class="rounded shadow eventImg">
      </div>
      <div class="col-12 col-md-8 ps-2 pt-2 position-relative">
        <section class="text-white">
          <span class="d-flex justify-content-between align-items-end">
            <span class="d-block">
              <p class="mb-0 fs-3 fw-bold">{{ activeEvent.name }}</p>
              <p class="mb-0 fs-5">{{ activeEvent.location }}</p>
            </span>
            <span class="d-block">
              <p class="mb-0 fs-5">{{ activeEvent.startDate.toLocaleDateString('fr-CA') }}</p>
            </span>
          </span>
          <p class="mt-3 mb-auto">{{ activeEvent.description }}</p>
          <div class="mt-4">
            <span v-if="!activeEvent.isCanceled" class="d-flex justify-content-between align-items-center">
              <p class="fs-4 eventTextColoring">
                <span class="spotsLeft">{{ spotsLeft }}</span> spots left
                {{ spotsLeft <= 0 ? ' - SOLD OUT!' : '' }} </p>
                  <span class="d-flex align-items-center text-warning border rounded py-1 px-2"
                    v-if="tickets.find(ticket => ticket.profileId == account.id)">
                    <p class="mb-0 text-center">Congratulations on <br> getting a ticket!</p>
                    <i class="fs-1 mdi mdi-exclamation-thick mdi-spin"></i>
                  </span>
                  <button :disabled="spotsLeft <= 0 || activeEvent.await"
                    class="btn d-flex align-items-center ticket px-2 shadow" @click="getTicket()">
                    Grab a Ticket! <i class="ps-1 fs-1 mdi mdi-ticket-account"></i></button>
            </span>
            <span v-else class="d-flex justify-content-center">
              <p class="rounded-pill border bg-danger fw-bold py-2 px-3">
                EVENT CANCELLED
              </p>
            </span>
          </div>
        </section>
      </div>
    </section>
    <div v-if="activeEvent.creatorId == account.id" class="position-absolute">
      <i class="rounded-pill bg-primary px-2 fs-2 text-white mdi mdi-dots-horizontal" type="button" @click="edit()"></i>
      <i class="text-danger ps-2 fs-2 mdi mdi-trash-can" type="button" @click="cancelEvent()"></i>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { TowerEvent } from "../models/TowerEvent";
import { ticketsService } from "../services/TicketsService.js";
import { AppState } from "../AppState";
import { towerEventsService } from "../services/TowerEventsService";
import { useRoute, useRouter } from "vue-router";

export default {
  props: { activeEvent: { type: TowerEvent } },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    return {
      coverImg: computed(() => `url(${props.activeEvent.coverImg})`),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      spotsLeft: computed(() => props.activeEvent.capacity - props.activeEvent.ticketCount),

      async getTicket() {
        try {
          if (props.activeEvent.isCanceled) {
            Pop.error('Event was cancelled, cannot get a ticket');
            return
          }
          if (this.spotsLeft <= 0) {
            Pop.error('Sorry, this event is sold out!');
            return
          }
          towerEventsService.toggleAwait();
          await ticketsService.createTicket();
          await towerEventsService.getEventById(route.params.eventId);
          towerEventsService.toggleAwait();
          Pop.success('Congratulations! You got a ticket!')
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },

      async cancelEvent() {
        try {
          const yes = await Pop.confirm('Cancel this event?');
          if (!yes) { return }
          await towerEventsService.cancelEvent();
          // router.push({name:'Home'})

        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }


    }
  }
};
</script>


<style lang="scss" scoped>
i {
  line-height: 2rem;
}

.coverImg {
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  border: 2px solid skyblue;
}

.eventImg {
  border: 1px solid whitesmoke;
  height: 100%;
  width: 100%;
}

.position-absolute {
  top: 1rem;
  right: 1rem;
  opacity: .75;
}

.bgBlur {
  background-color: #12345678;
  backdrop-filter: blur(10px);
}

.ticket {
  background-color: #ffd464;
}

.spotsLeft {
  color: #56c7fb;
}

.commentBtn {
  background-color: #79e7ab;
}

.commentLabel {
  color: #79e7ab;
}

.commentBody {
  background-color: #e2f9ff;
}

.eventTextColoring {
  color: #ccf3fd;
}

.textColoring {
  color: #7981a6;
}
</style>