<template>
  <div class="d-flex position-relative">
    <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="eventImg rounded-start">
    <div class="p-1 p-md-3">
      <p class="fw-bold fs-4">{{ ticket.event.name }}</p>
      <p class="mb-0 fs-5 eventText">{{ ticket.event.location }}</p>
      <p class="mb-0 fs-5 eventText">{{ new Date(ticket.event.startDate).toLocaleDateString() }}</p>
    </div>
    <div class="d-flex align-items-center text-danger fs-5 position-absolute">
      <i class="mdi mdi-cancel"></i>
      <p class="mb-0 fw-bold text-danger" @click="deleteTicket(ticket)" title="Cancel ticket." type="button">Cancel</p>
    </div>
  </div>
</template>


<script>
import { Ticket } from "../models/Ticket";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: { ticket: { type: Ticket } },
  
  setup(props){

    return {

      async deleteTicket(ticketObj) {
        try {
          const yes = await Pop.confirm('Cancel your ticket?')
          if(!yes){return}
          await ticketsService.deleteTicket(ticketObj);
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
.position-absolute{
  bottom: 5px;
  right: 10px;
  opacity: .8;
  text-shadow: 0 0 8px black;
}
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