<template>
  <section v-if="activeEvent.id" class="row p-3 justify-content-center">
    <ActiveEventCard :activeEvent="activeEvent" />
  </section>

  <section v-if="true" class="row p-3 justify-content-center">
    <!-- <ActiveEventCard :activeEvent="activeEvent" /> -->
    <div class="col-12 p-0">
      <p class="textColoring fs-5 fw-bold">See who is attending</p>
    </div>
    <div v-if="tickets.length > 0" class="col-12 lightGreyBG rounded">
      <img v-for="ticket in tickets" :key="ticket.id" :src="ticket.profile.picture" :alt="ticket.profile.name"
        :title="ticket.profile.name" class="rounded-circle attendees m-1">
    </div>
    <div v-else class="col-12 lightGreyBG rounded">
      <p class="my-3 text-white">Nobody yet..</p>
    </div>
  </section>

  <section v-if="true" class="row p-3 justify-content-center">
    <div class="col-12 col-md-8 p-0">
      <p class="textColoring fs-5 fw-bold">What are people saying</p>
    </div>
    <div class="col-12 col-md-8 lightGreyBG">

      <section class="row">
        <div class="col-12 p-3">
          <form @submit.prevent="addComment()" class="d-flex flex-column align-items-end">
            <p class="commentLabel">Join the conversation</p>
            <!-- add comment -->
            <textarea v-model="commentForm" id="comment" cols="30" rows="3" class="form-control" maxlength="1000"
              placeholder="Tell the people..."></textarea>
            <button class="btn commentBtn shadow mt-3 fw-bold" type="submit">post comment</button>
          </form>
        </div>
        <hr>
      </section>

      <section class="row">
        <div v-if="comments.length > 0">
          <div v-for="comment in comments" :key="comment.id" class="col-12 py-2">
            <CommentCard :comment="comment" />

          </div>
        </div>
        <div v-else>
          <p class="text-center text-white">No comments yet..</p>
        </div>
      </section>

    </div>
  </section>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import ActiveEventCard from "../components/ActiveEventCard.vue";
import { commentsService } from "../services/CommentsService";
import CommentCard from "../components/CommentCard.vue";

export default {
  setup() {
    const route = useRoute();
    const commentForm = ref('')

    async function _getEventById() {
      try {
        await towerEventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
      }
    }


    async function _getTicketsByEventId() {
      try {
        await towerEventsService.getTicketsByEventId(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
      }
    }


    async function _getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
      }
    }

    onMounted(() => {
      towerEventsService.clearData();
      _getEventById();
      _getTicketsByEventId();
      _getCommentsByEventId();
    });

    return {
      activeEvent: computed(() => AppState.activeEvent),
      coverImg: computed(() => `url(${AppState.activeEvent.coverImg})`),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      commentForm,

      async addComment() {
        try {
          const commentBody = {
            body: commentForm.value,
            eventId: route.params.eventId
          }
          await commentsService.createComment(commentBody)
          commentForm.value = ''
        }
        catch (error) {
          logger.error(error);
        }
      }
    };
  },
  components: { ActiveEventCard, CommentCard }
};
</script>


<style lang="scss" scoped>
hr {
  color: grey;
}

.mdi-dots-horizontal {
  top: 1rem;
  right: 1rem;
  opacity: .75;
  transition: ease-in-out .25s;
}

.mdi-dots-horizontal:hover {
  opacity: 1;
}

.attendees {
  height: 3rem;
}

.coverImg {
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  border: 2px solid skyblue;
  min-height: 16rem;
}

.eventImg {
  border: 1px solid whitesmoke;
  height: 100%;
  width: 100%;
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

.lightGreyBG {
  border: 3px solid #474c61;
}
</style>