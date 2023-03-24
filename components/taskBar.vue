<script setup>
import moment from 'moment';
import StartMenu from "./taskbar/startMenu";
import WinBtn from "./winBtn";
import {webStore} from "/stores/webStore.js";

const store = webStore()


let time = ref(moment().format("LT"))
let showStartMenu = ref(false)

onMounted(() => {
  window.document.onkeydown = atKeyPress


  setInterval(() => {
    time.value = moment().format("LT")
  }, 1000)
})

function outClicked() {
  if (showStartMenu.value) {
    showStartMenu.value = false
  }
}


function atKeyPress(e) {
  if (e.key === "OS") {
    showStartMenu.value = !showStartMenu.value
  }
}

function atOpenAppClick(app, uuid) {
  if (app.status === "minimized") {
    store.openedApps[uuid].status = "open"
    store.selectedWindow = uuid
  } else if (store.selectedWindow !== uuid){
    store.selectedWindow = uuid
  } else if (app.status === "open") {
    store.openedApps[uuid].status = "minimized"
  }
}

// function appBtnStyle(value, key){
//   let cls = "hover:bg-slate-800 "
//
//
//   return cls
// }

let appBtnStyle = computed(() => {
  let cls = {}
  for (const [uuid, app] of Object.entries(store.openedApps)) {
    if (store.selectedWindow === uuid && app.status !== "minimized"){
      cls[uuid] = "hover:bg-slate-600 bg-slate-700 "
    }else {
      cls[uuid] = "hover:bg-slate-800  "
    }
  }

  return cls
})
let appTickStyle = computed(() => {
  let cls = {}
  for (const [uuid, app] of Object.entries(store.openedApps)) {
    if (store.selectedWindow === uuid && app.status !== "minimized"){
      cls[uuid] = "w-full "
    }else {
      cls[uuid] = "w-7 group-hover:w-[2.3rem]  "
    }
  }

  return cls
})

let openAppStyle = computed(() => {
  let cls = ""
  if (store.selectedWindow === props.uuid) {
    cls = cls + "bg-slate-800"
  } else {
    cls = cls + "bg-slate-700"
  }

  return cls
})

function toDextop(){
  for (const [key, value] of Object.entries(store.openedApps)) {
    value.status = "minimized"
  }
}

</script>

<template>
  <div class="w-full h-10 bg-gray-900 bg-opacity-90 z-50 flex justify-between items-center backdrop-blur-2xl"
       style="vertical-align: bottom">
    <div class="absolute bottom-10 left-0 ">
      <StartMenu v-if="store.isScreenMounted" :open="showStartMenu" @outClick="outClicked"></StartMenu>
    </div>
    <div class="flex justify-start items-center">
      <!--    <button class="w-10 h-10 hover:bg-slate-800 group flex items-center justify-center">-->
      <!--      <Icon name="teenyicons:windows-solid" class="text-white group-hover:text-cyan-300  w-5 h-5 " ></Icon>-->
      <!--    </button>-->


      <WinBtn icon-size="5" size="10" btn-cls="hover:bg-slate-800 group start-menu-not-close px-2"
              icon-cls="group-hover:text-cyan-300 start-menu-not-close"
              icon-name="teenyicons:windows-solid"
              @click="()=>{showStartMenu = !showStartMenu}"
      ></WinBtn>
      <div class="w-10 h-full relative group" @click="()=>{atOpenAppClick(value , key)}"
           v-for="(value, key) in store.openedApps" :key="key">
        <div class="w-full h-[.20rem] absolute bottom-0 flex justify-center">
          <div class="h-[.20rem] bg-cyan-300 transition-all duration-100 ease-linear " :class="appTickStyle[key]"></div>
        </div>
        <WinBtn icon-size="5" size="10" :icon-name="value.app.icon" :class="appBtnStyle[key]"></WinBtn>

      </div>

    </div>
    <div class="flex flex-row">
      <div class="h-10 w-20 hover:bg-slate-800 text-white flex items-center justify-center">{{ time }}</div>
      <WinBtn icon-name="majesticons:comment-2-text-line" icon-size="6" size="10"
              btn-cls="hover:bg-slate-800 p-0"></WinBtn>
      <div class="h-10 w-2 bg-gray-900 border-l-[1px] hover:bg-gray-800 border-white" @click="toDextop"></div>
    </div>

  </div>
</template>


<style scoped>

</style>