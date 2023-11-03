<template>
  <div class="modal modal-xl fade" id="newEventModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="newEventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="newEventModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent()">
            <span class="d-flex mb-3">
              <div class="mx-3 w-50">
                <label for="name">Event Name</label>
                <input v-model="eventForm.name" type="text" name="name" id="name" class="form-control" required>
              </div>
              <div class="mx-3 w-50">
                <label for="name">Event Location</label>
                <input v-model="eventForm.location" type="text" name="location" id="location" class="form-control"
                  required>
              </div>
              <div class="mx-3 w-50">
                <label for="name">Cover Image</label>
                <input v-model="eventForm.coverImg" type="text" name="coverImg" id="coverImg" class="form-control"
                  required placeholder="(URL)">
              </div>
            </span>
            <span class="d-flex mb-3">
              <div class="mx-3">
                <label for="name">Start Date</label>
                <input v-model="eventForm.startDate" type="date" name="startDate" id="startDate" class="form-control"
                  required>
              </div>
              <div class="mx-3">
                <label for="name">Capacity</label>
                <input v-model="eventForm.capacity" type="number" name="capacity" id="capacity" class="form-control"
                  required max="1000000">
              </div>
              <div class="mx-3">
                <label for="type">Event Type</label>
                <select v-model="eventForm.type" name="type" id="type">
                  <option v-for="eventType in types" :key="eventType" :value="eventType" class="form-control"> {{
                    eventType }}</option>
                </select>
              </div>
            </span>
            <div class="mx-3">
              <label for="name">Event Description</label>
              <textarea v-model="eventForm.description" name="description" id="description" rows="6" class="form-control"
                required></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary me-3">Create New Event</button>
            </div>
          </form>
          <hr>
          <div class="container-fluid rounded">
            <section class="row">
              <div class="col-12 coverImg rounded position-relative">
                <section class="row bgBlur rounded shadow px-3 py-4">
                  <div class="col-12 col-md-4">
                    <img v-if="eventForm.coverImg" :src="eventForm.coverImg" :alt="eventForm.name"
                      class="rounded shadow eventImg">
                  </div>
                  <div class="col-12 col-md-8 ps-2 pt-2">
                    <section class="text-white">
                      <span class="d-flex justify-content-between align-items-end">
                        <span class="d-block">
                          <p class="mb-0 fs-3 fw-bold">{{ eventForm.name }}</p>
                          <p class="mb-0 fs-5">{{ eventForm.location }}</p>
                        </span>
                        <span class="d-block">
                          <p class="mb-0 fs-5">{{ eventForm.startDate }}</p>
                        </span>
                      </span>
                      <p class="mt-3 mb-4">{{ eventForm.description }}</p>
                      <span class="d-flex justify-content-between align-items-center">
                        <p v-if="eventForm.capacity" class="fs-4 eventTextColoring"><span class="spotsLeft">{{
                          eventForm.capacity }}</span> spots left</p>
                        <p v-else></p>
                        <button class="btn d-flex align-items-center ticket px-2 shadow">
                          Grab a Ticket! <i class="ps-1 fs-1 mdi mdi-ticket-account"></i></button>
                      </span>
                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default {
  setup() {
    const router = useRouter();

    const types = ['concert', 'convention', 'sport', 'digital'];

    const eventForm = ref({
      name: 'What',
      location: 'Where',
      description: 'When, Why, and hoW many?',
      startDate: `${new Date().toLocaleDateString('fr-CA')}`
    });

    return {
      eventForm,
      types,

      coverImg: computed(() => `url(${eventForm.value.coverImg})`),

      async createEvent() {
        try {
          const newEvent = await towerEventsService.createEvent(eventForm.value);
          Pop.success('Event created!');
          eventForm.value = {
            startDate: `${new Date().toLocaleDateString('fr-CA')}`
          }
          Modal.getOrCreateInstance('#newEventModal').hide();
          router.push({ name: 'Event', params: { eventId: newEvent.id } })
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    };
  },
};
</script>


<style lang="scss" scoped>
.container-fluid {
  background-color: #123456;
  pointer-events: none;
  user-select: none;
}

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
  object-fit: cover;
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