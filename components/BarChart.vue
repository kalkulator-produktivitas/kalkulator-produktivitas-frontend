<template>
  <div class="flex flex-col">
    <div>
      <p class="font-bold text-lg">{{ title }}</p>
    </div>
    <div class="my-auto">
      <Bar :options="config" :data="dataset" />
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

defineProps(['dataset', 'config', 'title'])
</script>

<style scoped></style>