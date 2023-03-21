<template>
  <div class="w-[40rem]  bg-gray-800 flex flex-col transition-all duration-100 ease-linear backdrop-blur-2xl bg-opacity-90" :class="setWidth">
  <SrartMenuPowerbar ></SrartMenuPowerbar>
  </div>
</template>

<script setup>
import SrartMenuPowerbar from "./srartMenuPowerbar";
let props = defineProps({
  open: Boolean,
})
let setWidth = computed(() => {
  return props.open ? "h-[36rem] " : "h-0"
})
</script>

<style scoped>

</style>