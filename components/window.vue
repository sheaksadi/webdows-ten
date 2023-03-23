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

let fullScreen = ref(false)
let window = ref(null)


let winStyle = computed(() => {
  let cls = ""

  console.log(window.value)
  if (store.openedApps[props.uuid].status === "minimized") {
    cls = cls + "scale-0 absolute"
    window.value.parentNode.classList.add('h-0')

  } else if (store.openedApps[props.uuid].isFullscreen) {
    if (window.value) {
      window.value.parentNode.classList.add('h-full')
      window.value.parentNode.classList.add('w-full')
      // window.value.parentNode.classList.remove('h-0')
      // window.value.parentNode.remove()
    }

    cls = cls + "w-full h-full "
  } else {
    if (window.value) {
      window.value.parentNode.classList.remove('h-full')
      window.value.parentNode.classList.remove('w-full')
      // window.value.parentNode.classList.remove('h-0')
      //
    }

    cls = cls + "w-[52rem] h-[32rem] absolute "
  }
  if (store.selectedWindow === props.uuid) {
    cls = cls + " z-20"
  } else {
    cls = cls + "z-[0]"
  }
  console.log(cls)
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
</script>

<template>
  <div :data-uuid="uuid"  class="ring-1 ring-slate-500 flex flex-col " ref="window" :class="winStyle" @mousedown="atWindowClick">
    <suspense>
      <div class="w-full h-8 header flex items-center justify-between " :class="winHeaderStyle">
        <div class="flex items-center p-2 ">
          <Icon class="text-amber-500 w-6 h-6 mr-2" :name="icon"/>
          <h1 class="noSelect">{{ title }}</h1>
        </div>
        <div class="flex flex-row-reverse">

          <WinBtn icon-name="bi:x-lg" icon-size="4" btnCls="hover:bg-red-600 w-12 h-8" @click="closeApp"></WinBtn>
          <WinBtn :icon-name="fullScreenIcon" :icon-size="fullScreenIconSize" btnCls="hover:bg-gray-600 w-12 h-8"
                  @click="()=>{store.openedApps[props.uuid].isFullscreen = !store.openedApps[props.uuid].isFullscreen}"></WinBtn>
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