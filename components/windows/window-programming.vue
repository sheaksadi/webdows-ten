<script setup>

import Window from "../window";
import * as echarts from 'echarts';
import {useFetch} from "nuxt/app";
import {webStore} from "/stores/webStore.js";

const store = webStore();


let chart = ref(null);
let chartWindow = ref(null);


// let chartDom = document.getElementById('main');
let myChart = ref(null);
let option;
// const data  = computed(() => {
//   return store.getWakaTimeData();
// });
const data = ref([]);

option = {
    title: {
        text: 'Weekly Sales',
        left: 'center',
        textStyle: {
            color: '#444',
            fontSize: 24,
            fontWeight: 'bold'
        }
    },


    grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        textStyle: {
            color: '#444',
            fontSize: 14
        }
    },

    xAxis: {
        type: 'category',
        data: data.value.date,
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: data.value.value,
            type: 'bar'
        }
    ]
};
let resize = () => {
    myChart.resize();
}

onMounted(async () => {
    myChart = echarts.init(window.document.getElementById('chart'), {renderer: 'canvas'});
    option && myChart.setOption(option);
    data.value = await store.getWakaTimeData("codingActivity", "month");

    new ResizeObserver(resize).observe(chartWindow.value);
});

onUnmounted(() => {
    myChart.dispose();
});

watch(data, (newData) => {
    console.log(newData)
    option.series[0].data = newData.value;
    option.xAxis.data = newData.date;
    myChart.setOption(option);
});


</script>

<template>
    <Window title="Programing" icon="mdi:code-braces">
        <div class="w-full h-full bg-black" ref="chartWindow">
            <div class="w-full h-full" id="chart">

            </div>
        </div>
    </Window>

</template>

<style scoped>

</style>