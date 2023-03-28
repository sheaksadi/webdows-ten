<script setup>
import Window from "../window";
import moment from "moment/moment";

const props = defineProps({
  uuid: String,
})

let myAge = computed(() => {
    let endDate = moment()
  return moment.duration(endDate.diff(moment("2005-8-6"))).asYears().toString().split(".")[0]
})
// onMounted(() => {
// })
</script>


<template>

  <Window :uuid="uuid" title="About Me" icon="mdi:file-document-outline"  win-cls="h-10">
    <div class="w-full h-full bg-slate-900 p-2 text-white">
<!--      <div class="ring-1 bg-slate-1000 w-fit text-2xl px-2 py-1 rounded">-->
<!--        Introduction-->
<!--      </div>-->

      <h2 class="pt-2 text-xl">Hi there, I'm Sheak Sadi</h2>
      <p class="text-sm text-gray-400 pt-2">I'm an 18-year-old self-taught programmer, and now I'm studying Computer Science and Engineering to become a super-duper wizard.</p>
      <p class="text-sm text-gray-400 pt-2">My passion for programming began with Minecraft modding(Java), when I helped a friend out with plugins and mods for his server. Then I thought to myself, "Why stop at Minecraft? Let's conquer the entire internet!" So, I dove headfirst into the wild and wonderful world of web development.</p>
      <p class="text-sm text-gray-400 pt-2">When I'm not coding, I enjoy swimming, playing badminton (even though I'm not very good), or I'll binge-watch some anime until my eyes turn into pixels.</p>

    </div>
  </Window>


</template>


<style scoped>

</style>