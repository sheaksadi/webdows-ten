<script setup>

import Window from "../window";


const getLick = computed(() => {
  return store.isDeviceMobile ? "http://www.youtube.com/embed/o-YBDTqX_ZU" : "http://www.youtube.com/embed/o-YBDTqX_ZU?autoplay=1";
});



</script>
<template>
  <Window icon="mdi:warning" title="LOL">
    <div class="h-full w-full bg-slate-900" >
      <iframe class="h-full w-full"
              src="https://www.youtube.com/embed/o-YBDTqX_ZU">
      </iframe>

    </div>

  </Window>
</template>



<style scoped>

</style>