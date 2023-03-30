<script setup>
import { webStore } from "/stores/webStore.js";

const store = webStore();
import Window from "../window";


const getLink = computed(() => {
  return store.isDeviceMobile ? "http://www.youtube.com/embed/o-YBDTqX_ZU" : "http://www.youtube.com/embed/o-YBDTqX_ZU?autoplay=1";
});



</script>
<template>
  <Window icon="mdi:warning" title="LOL">
    <div class="h-full w-full bg-slate-900" >
      <iframe class="h-full w-full" :src="getLink" ></iframe>
    </div>

  </Window>
</template>



<style scoped>

</style>