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

let myCv = ref([
  {
    year: "2023 - Present",
    event: "University-Bachelors",
    description: "In 2023, To fulfill my quest of becoming a coding-wizard, I started my journey as a student of Computer Science and Engineering. I mean, what could be more thrilling than spending countless hours staring at lines of code and debugging errors that seem to magically appear out of nowhere?",
    title: "Studying Computer Science and Engineering",

  },
  {
    year: "2020 - 2022",
    event: "College-Pre-University",
    description: "In 2020, I started college. Of course, it was the middle of a global pandemic, So, all my classes were held online. Who needs human interaction anyway, right?\n" +
        "But in 2021, after the restrictions were lifted. Finally, I got see all my classmates in the flesh and was reminded that humans are, in fact, not just pixels on a screen.",
    title: "Studying Computer Science and Engineering",

  },
  {
    year: "2020",
    event: "Learning-to-Code",
    description: "In 2020 middle of Covid-19 pandemic, I found myself trapped at home with nothing to do. So, like any rational person, I decided to embark on a journey to learn the mystical art of coding. Maybe one day I'll invent the next Facebook or Google. Or maybe I'll just keep making silly little programs that bring a smile to people's faces. Either way, I'm having a blast!",
    title: "Studying Computer Science and Engineering",

  },
  {
    year: "2009 - 2020",
    event: "High School",
    description: "High school. It was some of the best years of my life. I made some great friends, and I learned a lot about myself. I also learned a lot about the world around me.",
    title: "Studying Computer Science and Engineering",

  },
])
</script>


<template>

  <Window :uuid="uuid" title="About Me" icon="mdi:file-document-outline" win-cls="h-10">
    <div
        class="w-full h-full bg-slate-900 p-2 text-white flex flex-col  ">
      <!--      <div class="ring-1 bg-slate-1000 w-fit text-2xl px-2 py-1 rounded">-->
      <!--        Introduction-->
      <!--      </div>-->

      <h2 class="pt-2 text-xl">Hi there, I'm Sheak Sadi</h2>
      <p class="text-sm text-gray-400 pt-2">I'm an {{myAge}}-year-old self-taught programmer, and now I'm studying Computer
        Science and Engineering to become a super-duper wizard.</p>
      <p class="text-sm text-gray-400 pt-2">My passion for programming began with Minecraft modding(Java), when I helped
        a friend out with plugins and mods for his server. Then I thought to myself, "Why stop at Minecraft? Let's
        conquer the entire internet!" So, I dove headfirst into the wild and wonderful world of web development.</p>
      <p class="text-sm text-gray-400 pt-2">When I'm not coding, I enjoy swimming, playing badminton (even though I'm
        not very good), or I'll binge-watch some anime until my eyes turn into pixels.</p>

      <h2 class="pt-2 text-xl mb-4">Here's my CV</h2>
      <div class="w-full  mb-2 overflow-y-auto scrollbar-thin">
        <div class="p-2 " v-for="term in myCv">
          <h3 class="inline-block font-semibold text-xl">{{term.year}} - <span class=" text-sm">{{term.event}}</span></h3>
          <p class="text-sm mt-2 text-gray-400" style="white-space: pre-wrap;">{{term.description}}</p>
        </div>

      </div>
    </div>
  </Window>


</template>


<style scoped>

</style>