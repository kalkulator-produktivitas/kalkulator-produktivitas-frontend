<template>
  <div class="overflow-none">
    <div class="p-1 bg-[#034EA2] ">
      <p class="font-bold text-md text-white ml-2">{{ title }}</p>
    </div>
    <div class="h-[80%] mt-2 p-2">
      <Doughnut :options="config" :data="dataset" />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)

defineProps(['dataset', 'config', 'title'])
</script>

<style scoped></style>