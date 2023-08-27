<template>
  <div class="flex flex-col">
    <div>
      <p class="font-bold text-lg">{{ title }}</p>
    </div>
    <div class="my-auto">
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