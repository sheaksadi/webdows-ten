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

let moveAbleElements = []


onMounted(() => {
  console.log(app)



  // const wrapper = window.document.createElement("div")
  // app.mount(wrapper)
  // screen.value.appendChild(wrapper)


  store.Window = window
  store.screen = screen.value
  store.winMount = winMount.value
  setInterval(()=>{
    for (let element of window.document.getElementsByClassName("header")){
      if (!moveAbleElements.includes(element)){
        mouseMoveHandler(element)
        moveAbleElements.push(element)

      }
    }
  },500)
  store.isScreenMounted = true
})

function mouseMoveHandler(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = mouseDown

  function mouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    window.document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    window.document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.parentNode.style.top = (element.parentNode.offsetTop - pos2) + "px";
    element.parentNode.style.left = (element.parentNode.offsetLeft - pos1) + "px";


    console.log(element.parentNode.getBoundingClientRect())
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    window.document.onmouseup = null;
    window.document.onmousemove = null;
  }

}

</script>

<template>
  
  <div id="screen" class="h-screen w-full bg-transparent flex flex-col items-end" ref="screen" >

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
  background-image: url("/assets/w-10-bg.jpg") ;
  background-repeat: no-repeat;
  background-size: cover;

  font-family: 'Kanit', sans-serif;


}

</style>