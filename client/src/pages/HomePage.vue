<template>
  <div class="col-12 banner rounded border-line my-3 p-5">
    <div class="p-3 shadow bgBlur rounded">
      <p class="fs-2 mb-0">
        Get ahead of the scalpers. <br>
        Reserve your seat now with <br>
        real events for real people.
      </p>
    </div>
  </div>

  <div class="col-12 rounded shadow my-3 p-3 d-flex justify-content-evenly btn-bg">
    <button class="btn text-white border" @click="changeType('')">ALL</button>
    <button v-for="eventType in types" :key="eventType" class="btn text-white" @click="changeType()">
    {{ eventType.toUpperCase() }}
    </button>
  </div>

  <div class="col-3">
    <div class="card">
      .
    </div>
  </div>

</template>

<script>
export default {
  setup() {
    const types = ['concert', 'convention', 'sport', 'digital']

    return {
      types,
      
    }
  }
}
</script>

<style scoped lang="scss">
.btn .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.banner{
  background-image: url(https://images.unsplash.com/photo-1526041092449-209d556f7a32?auto=format&fit=crop&q=80&w=1200&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-position: center;
  background-size: cover;
  color: white;
}

.bgBlur{
  background-color: #123456b9;
  // filter: blur(1px);
  width: fit-content;
}

.btn-bg{
  background-color: #474c61;
}

.border-line{
  border: 1px solid #56c7fb;
}
</style>
