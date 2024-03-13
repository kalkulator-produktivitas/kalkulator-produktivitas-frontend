<template>
  <div class="relative">
    <div class="flex p-1 bg-[#034EA2] justify-between">
      <p class="font-bold text-md ml-2 text-white">{{ title }}</p>
      <button class="px-3 mx-2 bg-white border-2 border-white rounded-full text-[#034EA2] text-sm"
        @mouseover="showTooltip = true" @mouseout="showTooltip = false">
        Legend
      </button>
    </div>
    <div class="my-auto p-4">
      <Bar :options="config" :data="dataset" />
    </div>
    <div v-if="showTooltip" class="absolute top-[32px] right-0 bg-gray-700/[.85] border p-2">
      <div class="flex items-start">
        <table class="w-[100%] text-sm">
          <tbody>
            <tr v-for="(dat, index) in legend" :key="index" class="text-left text-white border-b-[1px] border-white">
              <th class="w-[7%] font-normal">{{ dat["label"] }}</th>
              <th class="font-normal">{{ dat["description"] }}</th>
            </tr>
          </tbody>
        </table>
        <!-- <p class="mr-2">{{ dat["label"] }}:</p>
        <p>{{ dat["description"] }}</p> -->
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

defineProps(['dataset', 'config', 'title', 'legend'])
</script>

<style scoped></style>