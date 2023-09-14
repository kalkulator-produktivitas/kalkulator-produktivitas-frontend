<template>
  <div class="flex flex-col">
    <div class="p-1 bg-[#034EA2]">
      <p class="font-bold text-md text-white ml-2">{{ title }}</p>
    </div>
    <div class="my-auto px-4">
      <Line :options="config" :data="dataset" />
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

defineProps(['dataset', 'config', 'title'])
</script>

<style scoped></style>