<script setup>

import StartMenu from "./startMenu";
</script>

<template>
<div class="w-full h-10 bg-slate-900 bg-opacity-80 align-bottom " style="vertical-align: bottom">
  <div class="absolute bottom-10 left-0 "><StartMenu></StartMenu></div>
  <button class="w-10 h-10 hover:bg-slate-800 group flex items-center justify-center">
    <Icon name="teenyicons:windows-solid" class="text-white group-hover:text-cyan-300  w-5 h-5 " ></Icon>
  </button>
</div>
</template>


<style scoped>

</style>