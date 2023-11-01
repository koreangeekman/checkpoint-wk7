<template>
  <div class="">
    <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="rounded-top">
    <div class="p-2">
      <p class="fw-bold fs-5 mb-1">{{ towerEvent.name }}</p>
      <p class="">{{ towerEvent.location }}</p>
      <p class="">{{ towerEvent.startDate.toLocaleDateString() }}</p>
    </div>
  </div>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent";

export default {
  props: { towerEvent: { type: TowerEvent, required: true } },
  
  setup() {
    
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.red{
  background-color: #ff5977;
}

img{
  width: 100%;
}

p{
  margin-bottom: 0;
}
</style>