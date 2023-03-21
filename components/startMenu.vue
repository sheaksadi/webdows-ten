<script setup>
import SrartMenuPowerbar from "./srartMenuPowerbar";
import {webStore} from "/stores/webStore.js";
const store = webStore()


let props = defineProps({
  open: Boolean,
})
let startMenu = ref(null)

let setWidth = computed(() => {
  return props.open ? "h-[36rem] " : "h-0"
})

onMounted(() => {
  store.screen.onmousedown = onMouseClick
  // store.screen.onmouseup = closeDragElement
})
const emit = defineEmits(['outClick'])

function onMouseClick(e){
  let hasNotCloseClass = false
  for (const cls of e.target.classList) {
    if (cls === "start-menu-not-close"){
      hasNotCloseClass = true
    }
  }
  if (!hasNotCloseClass){
    for (const cls of e.target.parentNode.classList) {
      if (cls === "start-menu-not-close"){
        hasNotCloseClass = true
      }
    }
  }
  if (e.target !== startMenu.value && !hasNotCloseClass  && props.open){
    emit('outClick')
  }
}

function closeDragElement() {
  // stop moving when mouse button is released:
  store.screen.onmousedown = null;
  store.screen.onmouseup = null;

}

</script>


<template>
  <div class="w-[40rem]  bg-gray-800 flex flex-col transition-all duration-100 ease-linear backdrop-blur-2xl bg-opacity-90 "
       :class="setWidth"
        ref="startMenu"
  >
  <SrartMenuPowerbar ></SrartMenuPowerbar>
  </div>
</template>



<style scoped>

</style>