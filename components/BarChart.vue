<template>
  <div class="flex flex-col relative">
    <div class="flex justify-between p-1 bg-[#034EA2]">
      <p class="font-bold text-md ml-2 text-white">{{ title }}</p>
      <button class="px-3 bg-white  border-2 border-white rounded-full text-[#034EA2] text-sm"
        @mouseover="showTooltip = true" @mouseout="showTooltip = false">
        Legend
      </button>
    </div>
    <div class="my-auto p-4">
      <Bar :options="config" :data="dataset" />
    </div>
    <div v-if="showTooltip" class="absolute bottom-[15%] right-0 bg-gray-700/[.85] border text-white p-2">
      <div v-for="(dat, index) in dataset.datasets" :key="index" class="flex items-center">
        <div :style="{ 'background-color': dat.backgroundColor }" class="w-[20px] h-[15px]"></div>
        <p class="ml-2">{{ dat["label"] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const showTooltip = ref(false)

defineProps(['dataset', 'config', 'title'])
</script>

<style scoped></style>