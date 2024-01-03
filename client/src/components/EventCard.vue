<template>
  <router-link :to="{ name: 'Event', params: { eventId: towerEvent.id } }">
    <div class="position-relative coverImg rounded">
      <div class="position-absolute fixed-bottom">
        <div class="p-2 pb-1 bgBlur">
          <p class="fw-bold fs-5 mb-1">{{ towerEvent.name }}</p>
          <p class="eventText">{{ towerEvent.location }}</p>
          <p class="eventText">{{ towerEvent.startDate.toLocaleDateString() }}</p>
        </div>
        <div v-if="towerEvent.isCanceled || towerEvent.capacity - towerEvent.ticketCount == 0"
          class="red p-1 rounded-bottom">
          <p v-if="towerEvent.isCanceled" class="text-center text-dark">EVENT CANCELED</p>
          <p v-if="towerEvent.capacity - towerEvent.ticketCount == 0" class="text-center text-dark">SOLD OUT!</p>
        </div>
        <p v-if="!towerEvent.isCanceled && towerEvent.capacity - towerEvent.ticketCount > 0"
          class="text-end bgBlur p-1 pe-2 rounded-bottom">
          <span class="seatCount">{{ towerEvent.capacity - towerEvent.ticketCount }}</span>
          seat{{ towerEvent.capacity - towerEvent.ticketCount > 1 ? 's' : '' }} left!
        </p>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "vue";
import { TowerEvent } from "../models/TowerEvent";

export default {
  props: { towerEvent: { type: TowerEvent, required: true } },

  setup(props) {

    return {
      coverImg: computed(() => `url(${props.towerEvent.coverImg})`),

    }
  }
};
</script>


<style lang="scss" scoped>
.red {
  background-color: #ff5977;
}

p {
  margin-bottom: 0;
}

.bgBlur {
  background-color: #123456b9;
  color: white;
  backdrop-filter: blur(3px);
}

.coverImg {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  height: 20rem;
}

.seatCount {
  color: rgb(0, 255, 255);
}

.spotsLeft {
  color: #56c7fb;
}

.eventText {
  color: #ccf3fd;
}
</style>