<script setup>
import moment from 'moment';
import WinBtn from "/components/winBtn";
import {webStore} from "/stores/webStore";


const store = webStore()

let currentMonth = ref("feb")
let year = ref("2022")
let CalContainer = ref(null)


let currentTime = ref(moment().format("LTS").split(" "))
let CurrentDay = ref(moment().format("dddd") + ", " + moment().format("LL"))
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

onMounted(() => {

  setInterval(() => {
    currentTime.value = moment().format("LTS").split(" ")
    CurrentDay.value = moment().format("dddd") + ", " + moment().format("LL")
  }, 1000)
})

// function fillDates(currentMonth.value, year.value = 2023)

let fillDates = computed(() => {
  const dates = []

  let startMonth = currentMonth.value === "jan" ? "dec" : months[months.indexOf(currentMonth.value) - 1]
  let endMonth = currentMonth.value === "dec" ? "jan" : months[months.indexOf(currentMonth.value) + 1]
  let startYear = currentMonth.value === "jan" ? year.value - 1 : year.value
  let threeMonths = [startMonth, currentMonth.value, endMonth]

  let startingDay = moment().year(startYear).month(startMonth).startOf('month').format('dd')
  let preDates = []

  for (let i = 0; i < daysOfWeek.indexOf(startingDay); i++) {
    let endOfBeforeFirstMonth = moment().year(months.indexOf(startMonth) === 0 ? (startYear - 1) : startYear).month(months.indexOf(startMonth) === 0 ? "dec" : months[months.indexOf(startMonth) - 1]).endOf('month').format('D')
    preDates.push({
      day: endOfBeforeFirstMonth - i,
      date: `${months.indexOf(startMonth) === 0 ? 12 : months.indexOf(startMonth) + 1}/${endOfBeforeFirstMonth - i}/${months.indexOf(startMonth) === 0 ? (startYear - 1) : startYear}`
    })
  }

  dates.push(...preDates.reverse())

  for (const month of threeMonths) {
    const endOfMonth = moment().year(months.indexOf(month) === 0 ? startYear : year.value).month(month).endOf('month').format('D')
    const monthDates = Array.from({length: endOfMonth}, (_, i) => ({
      day: i + 1,
      date: `${months.indexOf(month) + 1}/${i + 1}/${months.indexOf(month) === 0 ? startYear : year.value}`
    }))
    dates.push(...monthDates)
  }

  return dates
})
function atScroll(e){
  let delta = 0;
  console.log("d",e.wheelDelta)
  console.log("de",e.detail)
  if (e.wheelDelta) {
    delta = e.wheelDelta / 120;
  } else if (e.detail) {
    delta = -e.detail / 3;
  }
  console.log(e)
  scroll(delta);

  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function scroll (delta){
  console.log(fillDates)

  console.log("delta", delta)
  const time = 1000;
  const distance = 40;

  console.log(CalContainer.value)
  console.log(CalContainer.value.scrollTop - distance * delta)
  CalContainer.value.scrollTo({
    top: CalContainer.value.scrollTop - distance * delta,

  });
}

</script>


<template>
  <div class="h-[44rem] w-[22.5rem] bg-cyan-500">
    <div class="w-full h-28 bg-green-600 border-b-[1px] flex justify-start items-center pl-6">
      <div class="">
        <div class="flex items-end pb-2">
          <h1 class="text-white text-5xl font-extralight w-40 mr-2 cursor-default">{{ currentTime[0] }}</h1>
          <h1 class="text-gray-300 text-xl cursor-default">{{ currentTime[1] }}</h1>
        </div>

        <h1 class="text-cyan-300 text-sm font-semibold w-40 cursor-pointer  ">{{ CurrentDay }}</h1>
      </div>

    </div>
    <div class="w-full h-96 bg-red-600 border-b-[1px]">
      <div class="h-full bg-green-600">
        <div class="flex ">
          <div class="w-12 h-10" v-for="day in daysOfWeek">{{day}}</div>
        </div>
        <div class="flex bg-cyan-500 flex-wrap overflow-y-auto h-60 scrollbar-none snap-y transition-all duration-75 " ref="CalContainer" @wheel="atScroll">
          <div class="w-12 h-10  snap-start" :id="date.date" v-for="date in fillDates">{{date.day}}</div>
        </div>



      </div>

    </div>
    <div class="w-full  bg-green-600 "></div>
  </div>
</template>

<style scoped>

</style>