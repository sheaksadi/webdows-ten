<script setup>

import Window from "../window";


const getLick = computed(() => {
    return store.isDeviceMobile ? "http://www.youtube.com/embed/o-YBDTqX_ZU" : "http://www.youtube.com/embed/o-YBDTqX_ZU?autoplay=1";
});
let player = ref(null)
onMounted(() => {
    player.value.play()
})

function toYoutube() {
    window.open("https://www.youtube.com/watch?v=o-YBDTqX_ZU&ab_channel=MusRest", "_blank")
}

</script>
<template>
    <Window icon="mdi:warning" title="Get loled in 4k">
        <div class="h-full w-full bg-black" @click="toYoutube">
            <!--      <h1 class="absolute text-gray-400 hover:text-white cursor-default text-2xl top-2 left-4 ">Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)</h1>-->
            <video ref="player" class="w-full h-full" loop>
                <source src="../../assets/lol.mp4" type="video/mp4">

                Your browser does not support the video tag.
            </video>
        </div>

    </Window>
</template>


<style scoped>

</style>