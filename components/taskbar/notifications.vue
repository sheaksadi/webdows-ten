<script setup>
import { webStore } from "/stores/webStore.js";

const store = webStore();

import {useFetch} from "nuxt/app";
let { data: catPic } = await useFetch('https://api.thecatapi.com/v1/images/search')
onMounted(() => {

})

let props = defineProps({
  open: Boolean,

})

let showMenu = ref(false)
let notMenu = ref(null)
let setWidth = computed(() => {
  return props.open ? "notificationSlideIn " : "notificationSlideOut"
})

function openApp(name) {
  store.openApp(name)
  // if (store.isDeviceMobile){
  //   window.open("https://www.youtube.com/watch?v=o-YBDTqX_ZU&ab_channel=MusRest", "_blank")
  // }else {
  //
  // }

}

const emit = defineEmits(['outClick','close'])

function onMouseClick(e) {
  if (!Boolean(e.target.closest(".notification-menu-not-close")) && props.open) {
    emit('outClick')
  }
}



</script>

<template>
  <div
      class="md:h-screen h-[50rem] w-[20rem] md:w-[25rem] md:pt-10 bg-gray-900 bg-opacity-80 backdrop-blur-2xl px-4 notification-menu-not-close absolute bottom-10 z-40 "
      ref="notMenu"
       :class="setWidth"
  >
    <div class="w-full h-10 flex items-center justify-end ">
      <a class="text-cyan-400 cursor-default hover:text-white select-none">manege notifications</a>
    </div>
    <div class="w-full h-10 hover:bg-slate-800 flex justify-start items-center font-bold relative text-white select-none pl-2" @click="()=>{openApp('rickRoll')}">
      <Icon name="material-symbols:settings-outline-rounded" class="w-6 h-6 mr-2 text-white"></Icon>
      System
<!--      <WinBtn-->
<!--          icon-name="bi:x-lg"-->
<!--          icon-size="4"-->
<!--          icon-cls="text-gray-400 hover:text-white"-->
<!--          btnCls=" absolute top-0 bottom-0 right-2 w-4 h-10"-->
<!--      ></WinBtn>-->
    </div>
    <div class="w-full  bg-slate-800 p-2" @click="()=>{openApp('rickRoll')}">
      <h1 class="font-semibold text-white select-none">Too lazy to make fake notifications, so here's a cute cat pic instead!<span class="text-xs">(click at your own risk)</span></h1>
      <img class="w-full mt-2" :src="store.catPic[0].url" alt="ACat">


    </div>


  </div>
</template>

<style scoped>
.notificationSlideIn {
  animation: notificationSlideIn 0.2s ease-in-out forwards;
}

.notificationSlideOut {
  animation: notificationSlideOut 0.2s ease-in-out forwards;
}

@keyframes notificationSlideIn {
  0% {
    right: -25rem;
  }
  100% {
    right: 0;
  }
}

@keyframes notificationSlideOut {
  0% {
    right: 0;
  }
  100% {
    right: -26rem;
  }
}
</style>