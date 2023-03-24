<script setup>
import WinBtn from "./winBtn";
import {webStore} from "/stores/webStore.js";

const store = webStore()


let props = defineProps({
  title: String,
  icon: String,
  uuid: String,
  winCls: {
    type: String,
    default: ""
  },
  // fullScreen:{
  //   type: Boolean,
  //   default: true
  // }
})

onMounted(() => {
  window.value.style.top = (store.Window.innerHeight / 2 - window.value.getBoundingClientRect().height / 2) + "px";
  window.value.style.left = (store.Window.innerWidth / 2 - window.value.getBoundingClientRect().width / 2) + "px";


})

let fullScreen = ref(false)
let window = ref(null)


let winStyle = computed(() => {
  let cls = ""


  if (store.openedApps[props.uuid].status === "minimized") {
    cls = cls + "scale-0 absolute w-[60rem] h-[34rem] "
    window.value.parentNode.classList.add('h-0')

  } else if (store.openedApps[props.uuid].isFullscreen) {
    if (window.value) {
      window.value.parentNode.classList.add('h-full')
      window.value.parentNode.classList.add('w-full')

      console.log("1",store.openedApps[props.uuid].top);
      console.log("1",window.value.style.top);

      if (window.value.style.top !== "0px" && window.value.style.left !== "0px"){
        store.openedApps[props.uuid].top = window.value.style.top
        store.openedApps[props.uuid].left = window.value.style.left

      }

      window.value.style.top = "0px";
      window.value.style.left = "0px";

    }

    cls = cls + "w-full h-full relative transition-all duration-100 ease-linear "


  } else {
    if (window.value) {
      window.value.parentNode.classList.remove('h-full')
      window.value.parentNode.classList.remove('w-full')
      console.log("2",store.openedApps[props.uuid].top);
      console.log("2",window.value.style.top);
      //
      // window.value.style.top = store.openedApps[props.uuid].top
      // window.value.style.left = store.openedApps[props.uuid].left

    }

    cls = cls + " w-[60rem] h-[34rem] absolute transition-all duration-100 ease-linear "
  }
  if (store.selectedWindow === props.uuid) {
    cls = cls + " z-20"
  } else {
    cls = cls + "z-[0]"
  }

  if (store.mouseDragging && !store.openedApps[props.uuid].isFullscreen) {
    cls = cls + " noSelect"
  }

  return cls
})

let winHeaderStyle = computed(() => {
  let cls = ""
  if (store.selectedWindow === props.uuid) {
    cls = cls + "bg-slate-800"
  } else {
    cls = cls + "bg-slate-700"
  }

  return cls
})
let fullScreenIcon = computed(() => {
  return store.openedApps[props.uuid].isFullscreen ? "mingcute:restore-line" : "bi:square"
})
let fullScreenIconSize = computed(() => {
  return store.openedApps[props.uuid].isFullscreen ? "4" : "3"
})

function closeApp() {
  store.openedApps[props.uuid].instance.unmount()
  delete store.openedApps[props.uuid];
}

function atWindowClick() {
  store.selectedWindow = props.uuid
}


function atMinimize() {
  store.openedApps[props.uuid].status = "minimized"
}

function atFullScreen() {
  if (!store.openedApps[props.uuid].isFullscreen){
    store.openedApps[props.uuid].minWidth = window.value.getBoundingClientRect().width
  }
  store.openedApps[props.uuid].isFullscreen = !store.openedApps[props.uuid].isFullscreen

  if (!store.openedApps[props.uuid].isFullscreen){

    console.log(store.openedApps[props.uuid].top)
    window.value.style.top = store.openedApps[props.uuid].top;
    window.value.style.left = store.openedApps[props.uuid].left;
  }


}
</script>

<template>
  <div :data-uuid="uuid" class="ring-1 ring-slate-500 flex flex-col transition-all duration-100 ease-linear " ref="window" :class="winStyle"
       @mousedown="atWindowClick" >
    <suspense>
      <div class="w-full h-8 header flex items-center justify-between " @dblclick="atFullScreen" :class="winHeaderStyle">
        <div class="flex items-center p-2 ">
          <Icon class="text-white w-6 h-6 mr-2" :name="icon"/>
          <h1 class="noSelect text-white">{{ title }}</h1>
        </div>
        <div class="flex flex-row-reverse">

          <WinBtn icon-name="bi:x-lg" icon-size="4" btnCls="hover:bg-red-600 w-12 h-8" @click="closeApp"></WinBtn>
          <WinBtn :icon-name="fullScreenIcon" :icon-size="fullScreenIconSize" btnCls="hover:bg-gray-600 w-12 h-8"
                  @click="atFullScreen"></WinBtn>
          <WinBtn icon-name="bi:dash-lg" icon-size="4" btnCls="hover:bg-gray-600 w-12 h-8" @click="atMinimize"></WinBtn>
          <!--        <button class="winUtilBtn hover:bg-red-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:x-lg"></Icon></button>-->
          <!--        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-3 h-3" name="bi:square"></Icon></button>-->
          <!--        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:dash-lg"></Icon></button>-->

        </div>

      </div>

    </suspense>

    <div class="w-full h-full">
      <slot></slot>
    </div>


  </div>
</template>


<style scoped>
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome and Opera */
}
</style>