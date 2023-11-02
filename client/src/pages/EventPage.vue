<template>

  <section v-if="activeEvent.id" class="row p-3 justify-content-center">
    <ActiveEventCard :activeEvent="activeEvent" />
  </section>

  <section v-if="true" class="row p-3 justify-content-center">
    <!-- <ActiveEventCard :activeEvent="activeEvent" /> -->
    <div class="col-12"><p class="textColoring fs-5 fw-bold">See who is attending</p></div>
    <div class="col-12 lightGreyBG rounded">
      <img v-for="person in peoples" :key="person.id" :src="person.picture" :alt="person.name" class="rounded-circle m-1">
    </div>
  </section>

  <section v-if="true" class="row p-3 justify-content-center">
    <div class="col-12 col-md-8"><p class="textColoring fs-5 fw-bold">What are people saying</p></div>
    <div class="col-12 col-md-8 lightGreyBG">

      <section class="row">
        <div class="col-12 p-3">
          <p class="mb-2 commentLabel">Join the conversation</p>
          <!-- add comment -->
          <textarea name="comment" id="comment" cols="30" rows="3" placeholder="Tell the people..." class="form-control"></textarea>
          <button class="btn commentBtn shadow fs-5 my-2">post comment</button>
        </div>
        <hr>
      </section>

      <section class="row">
        <div v-if="comments.id">
          <div v-for="comment in comments" :key="comment.id" class="col-12">
            <img :src="comment.creator.picture" :alt="comment.creator.name">
            <span class="card">
              <p class="fw-bold">{{ comment.creator.name }}</p>
              <p class="">{{ comment.body }}</p>
            </span>
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
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import ActiveEventCard from "../components/ActiveEventCard.vue";
import { commentsService } from "../services/CommentsService";

export default {
    setup() {
    const route = useRoute();
        
    async function _getEventById() {
        try {
            await towerEventsService.getEventById(route.params.eventId);
        }
        catch (error) {
            logger.error(error);
        }
    }

    async function _getCommentsByEventId(){
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
          _getCommentsByEventId();
        });

        return {
          activeEvent: computed(() => AppState.activeEvent),
          coverImg: computed(() => `url(${AppState.activeEvent.coverImg})`),
          comments: computed(()=> AppState.comments)
        };
    },
    components: { ActiveEventCard }
};
</script>


<style lang="scss" scoped>
hr{
  color: grey;
}
i{
  line-height: 2rem;
}
.mdi-dots-horizontal{
  top:1rem;
  right: 1rem;
  opacity: .75;
  transition: ease-in-out .25s;
}
.mdi-dots-horizontal:hover{
  opacity: 1;
}

.coverImg{
  background-image: v-bind(coverImg) ;
  background-position: center;
  background-size: cover;
  border: 2px solid skyblue;
  min-height: 16rem;
}

.eventImg{
  border: 1px solid whitesmoke;
  height: 100%;
  width: 100%;
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
.lightGreyBG{
  border: 3px solid #474c61;
}
</style>