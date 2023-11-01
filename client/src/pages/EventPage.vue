<template>
  <section class="row p-3 justify-content-center">
    <div class="col-12 rounded p-3 coverImg">
      <div class="bgBlur">...
        <img :src="activeEvent.coverImg" :alt="activeEvent.name">
        {{activeEvent}}
      </div>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
};
</script>


<style lang="scss" scoped>
.coverImg{
  // background-image: activeEvent.coverImg ;
  background-position: center;
  background-size: cover;
}

.bgBlur{
  background-color: 123456b9;
  backdrop-filter: blur(10px);
}
</style>