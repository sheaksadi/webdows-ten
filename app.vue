<script setup>
let mousePos = reactive({
  top: 110,
  left: 110,
  clicked: false,
  draggable: ""
})

const draggable = ref(null)
const screen = ref(null)


onMounted(() => {
  for (let element of window.document.getElementsByClassName("header")){
    mouseMoveHandler(element)
  }
})

function mouseMoveHandler(element) {
  console.log(element)
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
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    screen.value.onmouseup = null;
    screen.value.onmousemove = null;
  }
}


</script>

<template>
  <div class="h-screen bg-slate-800 " ref="screen">
    <div class="w-96 h-48 bg-cyan-500 absolute " >
      <div class="w-full h-12 bg-purple-400 header"></div>
    </div>
  </div>
</template>
<style>
body {
  overflow: hidden; /* Hide scrollbars */
}
</style>