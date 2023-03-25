<script setup>
import TaskBar from "./components/taskBar";
import Window from "./components/window";
import WinBtn from "./components/winBtn";
// import Cv from "./components/windows/cv"
import {createApp, defineAsyncComponent} from "vue"


import {webStore} from "./stores/webStore.js";
import WindowsAlert from "./components/windowsAlert";
useHead({
  titleTemplate: () => {
    return 'Sheak Sadi';
  }
})
const store = webStore()


//
// let Cv = computed(() => {
//   return import("./components/windows/cv")
// })
let Cv = defineAsyncComponent(() => import("./components/windows/window-cv"))

let mousePos = reactive({
  top: 110,
  left: 110,
  clicked: false,
  draggable: ""
})

let app = createApp(Cv)

const screen = ref(null)
const winMount = ref(null)




onMounted(() => {



  // const wrapper = window.document.createElement("div")
  // app.mount(wrapper)
  // screen.value.appendChild(wrapper)

  store.isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log(store.isDeviceMobile)
  store.Window = window
  store.screen = screen.value
  store.winMount = winMount.value
  setInterval(() => {
    for (let element of window.document.getElementsByClassName("header")) {
      if (!store.moveAbleElements.includes(element)) {
        store.mouseMoveHandler(element)
        store.moveAbleElements.push(element)


      }
    }
  }, 500)
  store.isScreenMounted = true
})




</script>

<template>

  <div id="screen" class="h-screen w-full bg-transparent flex flex-col items-end overflow-hidden "  ref="screen">

    <div ref="winMount" class=" h-full w-full relative ">
      <!--      <component :is="Cv"/>-->
      <WindowsAlert></WindowsAlert>
    </div>

    <TaskBar></TaskBar>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

body {
  overflow: hidden; /* Hide scrollbars */
  background-image: url("/assets/w-10-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  font-family: 'Kanit', sans-serif;

}

</style>