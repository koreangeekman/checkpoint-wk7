<template>
  <div class="col-12 coverImg rounded position-relative">
    <section class="row bgBlur rounded shadow px-3 py-4 align-items-center">
      <div class="col-12 col-md-4">
        <img :src="activeEvent.coverImg" :alt="activeEvent.name" class="rounded shadow eventImg">
      </div>
      <div class="col-12 col-md-8 ps-2 pt-2">
        <section class="text-white">
          <span class="d-flex justify-content-between align-items-end">
            <span class="d-block">
              <p class="mb-0 fs-3 fw-bold">{{ activeEvent.name }}</p>
              <p class="mb-0 fs-5">{{ activeEvent.location }}</p>
            </span>
            <span class="d-block">
              <p class="mb-0 fs-5">{{ activeEvent.startDate.getDate() }}th of Month</p>
              <!-- <p class="mb-0">{{ activeEvent.startDate.getHours() }}</p> -->
            </span>
          </span>
          <p class="mt-3 mb-4">{{ activeEvent.description }}</p>
          <span class="d-flex justify-content-between align-items-center">
            <p class="fs-4 eventTextColoring"><span class="spotsLeft">{{ activeEvent.capacity - activeEvent.ticketCount }}</span> spots left</p>  
            <button class="btn d-flex align-items-center ticket px-2 shadow">Grab a Ticket! <i class="ps-1 fs-1 mdi mdi-ticket-account"></i></button>
          </span>
        </section>
      </div>
    </section>
    <i class="position-absolute rounded-pill bg-primary px-2 fs-2 text-white mdi mdi-dots-horizontal" @click="edit()"></i>
  </div>
</template>


<script>
import { computed } from 'vue';
import { TowerEvent } from "../models/TowerEvent";

export default {
  props: { activeEvent: { type: TowerEvent, required: true } },
  
  setup(props) {
    
    return { 
      coverImg: computed(() => `url(${props.activeEvent.coverImg})`),

    }
  }
};
</script>


<style lang="scss" scoped>

i{
  line-height: 2rem;
}

.coverImg{
  background-image: v-bind(coverImg) ;
  background-position: center;
  background-size: cover;
  border: 2px solid skyblue;
}

.eventImg{
  border: 1px solid whitesmoke;
  height: 100%;
  width: 100%;
}

.mdi-dots-horizontal{
  top:1rem;
  right: 1rem;
  opacity: .75;
}
.bgBlur{
  background-color: #12345678;
  backdrop-filter: blur(10px);
}

.ticket{
  background-color: #ffd464;
}

.spotsLeft{
  color: #56c7fb;
}
.commentBtn{
  background-color: #79e7ab;
}

.commentLabel{
  color:#79e7ab;
}

.commentBody{
  background-color: #e2f9ff;
}

.eventTextColoring{
  color: #ccf3fd;
}

.textColoring{
  color: #7981a6;
}
</style>