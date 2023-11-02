<template>
  <div class="d-flex">
    <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="eventImg rounded-start">
    <div class="p-1 p-md-3">
      <p class="fw-bold fs-4">{{ ticket.event.name }}</p>
      <p class="mb-0 fs-5 eventText">{{ ticket.event.location }}</p>
      <p class="mb-0 fs-5 eventText">{{ new Date(ticket.event.startDate).toLocaleDateString() }}</p>
    </div>
  </div>
</template>


<script>
import { Ticket } from "../models/Ticket";

export default {
  props: { ticket: { type: Ticket } },
  
  setup(props){

    return {

    
    }
  }
};
</script>


<style lang="scss" scoped>
.eventImg{
  height: 16rem;
  width: 24rem;
  object-fit: cover;
  object-position: center;
}

p{
  color: white;
}

.eventText{
  color: #ccf3fd;
}

@media (max-width:768px){
  .eventImg{
    height: 12rem;
    width: 16rem;
  }
  p{
    font-size: .5rem;
  }
}
</style>