<script setup>
import SrartMenuPowerbar from "./srartMenuPowerbar";
import StartMenuAplications from "./startMenuAplications";
import {webStore} from "/stores/webStore.js";

const store = webStore()


let props = defineProps({
  open: Boolean,
})

let setWidth = computed(() => {
  return props.open ? "h-[36rem] " : "h-0"
})

onMounted(() => {

})
const emit = defineEmits(['outClick'])

function onMouseClick(e) {
  if (!Boolean(e.target.closest(".start-menu-not-close")) && props.open) {
    emit('outClick')
  }
}


</script>


<template>
  <div
      class="w-[40rem]  bg-gray-800 flex flex-col transition-all duration-100 ease-linear backdrop-blur-2xl bg-opacity-90 start-menu-not-close"
      :class="setWidth"

  >
    <SrartMenuPowerbar></SrartMenuPowerbar>
    <StartMenuAplications></StartMenuAplications>

  </div>
</template>


<style scoped>

</style>