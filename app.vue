<script setup>
import TaskBar from "./components/taskBar";
import Window from "./components/window";
import WinBtn from "./components/winBtn";
import {webStore} from "./stores/webStore.js";
const store = webStore()



let Cv = computed(() => {
  return import("./components/windows/cv")
})
let mousePos = reactive({
  top: 110,
  left: 110,
  clicked: false,
  draggable: ""
})



const screen = ref(null)


onMounted(() => {

  store.screen = screen.value
  console.log(screen.value)
  for (let element of window.document.getElementsByClassName("header")){
    mouseMoveHandler(element)
  }
  store.isScreenMounted = true
})

function mouseMoveHandler(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = mouseDown

  function mouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    screen.value.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    screen.value.onmousemove = elementDrag;
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
    screen.value.onmouseup = null;
    screen.value.onmousemove = null;
  }
}



</script>

<template>
  
  <div class="h-screen w-full bg-transparent flex flex-col items-end" ref="screen" >


    <div class=" h-full w-full">
      <component :is="Cv"/>
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