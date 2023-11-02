<template>
  <div class="d-flex align-items-center">
    <img :src="comment.creator.picture" :alt="comment.creator.name" class="rounded-circle shadow">
    <span class="card w-100 m-2 p-2">
      <p class="fw-bold">{{ comment.creator.name }}</p>
      <p class="">{{ comment.body }}</p>
    </span>
  </div>
</template>


<script>
import { Comment } from "../models/Comment";

export default {
  props: { comment: { type: Comment } },
  
  setup(){

    return {
    
    }
  }
};
</script>


<style lang="scss" scoped>
img{
  height: 5rem;
}
</style>