<template>
  <div class="d-flex align-items-center position-relative">
    <img :src="comment.creator.picture" :alt="comment.creator.name" class="rounded-circle shadow">
    <span class="card w-100 m-2 p-2">
      <p class="fw-bold">{{ comment.creator.name }}</p>
      <p class="">{{ comment.body }}</p>
    </span>
    <i class="text-danger fs-3 mdi mdi-trash-can position-absolute" title="Delete Comment" type="button" 
    v-if="comment.creatorId == account.id" @click="deleteComment(comment)"></i>
  </div>
</template>


<script>
import { computed } from "vue";
import { Comment } from "../models/Comment";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";

export default {
  props: { comment: { type: Comment } },
  
  setup(){

    return {
      account: computed(() => AppState.account),

      async deleteComment(commentObj) {
        try {
          commentsService.deleteComment(commentObj);
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
img{
  height: 5rem;
}
.mdi-trash-can{
  top:7px;
  right:11px;
  opacity: .8;
}
</style>