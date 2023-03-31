<script setup>
import moment from 'moment';
import WinBtn from "/components/winBtn";
import {webStore} from "/stores/webStore";


const store = webStore()



let CalContainer = ref(null)


let currentTime = ref(moment().format("LTS").split(" "))
let CurrentDay = ref(moment().format("dddd") + ", " + moment().format("LL"))
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']



let currentMonth = ref(months[moment().month()])
let year = ref(moment().year())

let props = defineProps({
  open: Boolean,
})


onMounted(() => {
  setInterval(() => {
    currentTime.value = moment().format("LTS").split(" ")
    CurrentDay.value = moment().format("dddd") + ", " + moment().format("LL")
  }, 1000)
})

// function fillDates(currentMonth.value, year.value = 2023)

let fillDates = computed(() => {
  const dates = []
  console.log(currentMonth.value)
  console.log(moment().month())
  let startMonth = currentMonth.value === "jan" ? "dec" : months[months.indexOf(currentMonth.value) - 1]
  let endMonth = currentMonth.value === "dec" ? "jan" : months[months.indexOf(currentMonth.value) + 1]
  let startYear = currentMonth.value === "jan" ? year.value - 1 : year.value
  let threeMonths = [currentMonth.value]

  let startingDay = moment().year(year.value).month(currentMonth.value).startOf('month').format('dd')
  let preDates = []

  for (let i = 0; i < daysOfWeek.indexOf(startingDay); i++) {
    let endOfBeforeFirstMonth = moment().year(year.value).month(currentMonth.value).endOf('month').format('D')
    preDates.push({
      day: endOfBeforeFirstMonth - i,
      date: `${months.indexOf(startMonth) === 0 ? 12 : months.indexOf(startMonth) + 1}/${endOfBeforeFirstMonth - i}/${months.indexOf(startMonth) === 0 ? (startYear - 1) : startYear}`,

      additionalDates: true,
      style: "text-gray-600"
    })
  }

  dates.push(...preDates.reverse())

  for (const month of threeMonths) {
    const endOfMonth = moment().year(months.indexOf(month) === 0 ? startYear : year.value).month(month).endOf('month').format('D')
    const monthDates = Array.from({length: endOfMonth}, (_, i) => {
      let isDateToday = moment(`${months.indexOf(month) + 1}/${i + 1}/${year.value}`).format("DDMMYYY") === moment().format("DDMMYYY")
      return ({
      day: i + 1,
      date: `${months.indexOf(month) + 1}/${i + 1}/${year.value}`,
      additionalDates: false,
      style: isDateToday? "bg-cyan-400 text-white" : "text-white"

    })

    })

    dates.push(...monthDates)
  }

  let datesToAdd = 43 - dates.length
  for (let i = 1; i < datesToAdd; i++) {

    dates.push({
      day: i ,
      date: `${months.indexOf(currentMonth.value) === 11 ? 1 : (months.indexOf(currentMonth.value)  + 2)}/${i}/${months.indexOf(currentMonth.value) === 11 ? (parseInt( year.value) + 1) : year.value}`,
      additionalDates: true,
      style: "text-gray-600"
    })

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



const emit = defineEmits(['outClick'])

function onMouseClick(e) {
  if (!Boolean(e.target.closest(".calender-not-close")) && props.open) {
    emit('outClick')
  }
}

let setHeight = computed(() => {
  return props.open ? "h-[44rem] " : "h-0"
})
let setClockHeight = computed(() => {
  return props.open ? "h-28 " : "h-0 scale-0"
})
let setCalendarHeight = computed(() => {
  return props.open ? "  h-[25rem] " : "h-0 scale-0"
})

</script>


<template>
  <div class=" w-[22.5rem] bg-gray-900 bg-opacity-80 backdrop-blur-2xl calender-not-close transition-all duration-200" :class="setHeight">
    <div class="w-full  border-b-[1px] flex justify-start items-center pl-6 delay-75" :class="setClockHeight">
      <div class="">
        <div class="flex items-end pb-2">
          <h1 class="text-white text-5xl font-extralight w-40 mr-2 cursor-default">{{ currentTime[0] }}</h1>
          <h1 class="text-gray-300 text-xl cursor-default">{{ currentTime[1] }}</h1>
        </div>

        <h1 class="text-cyan-300 text-sm font-semibold w-48 cursor-pointer  ">{{ CurrentDay }}</h1>
      </div>

    </div>
    <div class="w-full  border-b-[1px] delay-75" :class="setCalendarHeight">

      <div class="h-full ">
        <div class="w-full h-16 px-6 flex items-center justify-between">
          <div class=" text-white text-xl ">{{moment().format("MMMM YYYY")}}</div>
          <div class="flex gap-2">
            <Icon class="text-gray-400 hover:text-white w-8 h-8" name="material-symbols:keyboard-arrow-up-rounded"></Icon>
            <Icon class="text-gray-400 hover:text-white w-8 h-8" name="material-symbols:keyboard-arrow-down-rounded"></Icon>
          </div>
        </div>
        <div class="flex items-center justify-center ">
          <div class="w-12 h-10 flex items-center justify-center text-white" v-for="day in daysOfWeek">{{day}}</div>
        </div>
        <div class="flex  flex-wrap  h-[17rem] scrollbar-none snap-y transition-all duration-75 items-center justify-center" ref="CalContainer" >
          <div class="w-12 h-12 snap-start flex items-center justify-center" :class="date.style"  :id="date.date" v-for="date in fillDates">{{date.day}}</div>
        </div>



      </div>

    </div>
    <div class="w-full  bg-green-600 "></div>
  </div>
</template>

<style scoped>

</style>