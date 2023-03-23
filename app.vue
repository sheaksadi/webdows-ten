<script setup>
import TaskBar from "./components/taskBar";
import Window from "./components/window";
import WinBtn from "./components/winBtn";
// import Cv from "./components/windows/cv"
import {createApp, defineAsyncComponent} from "vue"


import {webStore} from "./stores/webStore.js";

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
  console.log(app)


  // const wrapper = window.document.createElement("div")
  // app.mount(wrapper)
  // screen.value.appendChild(wrapper)


  store.Window = window
  store.screen = screen.value
  store.winMount = winMount.value
  setInterval(() => {
    for (let element of window.document.getElementsByClassName("header")) {
      if (!store.moveAbleElements.includes(element)) {
        store.mouseMoveHandler(element)
        store.moveAbleElements.push(element)
        // console.log(store.mouseDragging)

      }
    }
  }, 500)
  store.isScreenMounted = true
})




</script>

<template>

  <div id="screen" class="h-screen w-full bg-transparent flex flex-col items-end absolute z-10" ref="screen">

    <div ref="winMount" class=" h-full w-full">
      <!--      <component :is="Cv"/>-->
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