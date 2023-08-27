<template>
  <div class="container m-12 mx-auto grid grid-cols-2 h-full">
    <div class="h-full w-full">
      <BarChart class="h-60 mb-8" id="1" :config="options" :dataset="data[0]" />
      <PieChart class="h-60 mb-8" id="3" :config="options" :dataset="data[2]" />
    </div>
    <div class="h-full w-full">
      <LineChart class="h-60" id="2" :config="options" :dataset="data[1]" />
      <div style="{ height: 100px;}" class="flex m-6 gap-6">
        <CardInfo label="Produktivitas tenaga kerja rata-rata terakhir" value="4.8" rate="2" unit="%" />
        <CardInfo label="Produktivitas tenaga kerja rata-rata terakhir" value="4.8" rate="2" unit="%" />
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

const data = ref([
  {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 50, 10],
      },
      {
        label: 'Data Twi',
        backgroundColor: '#f8f579',
        data: [22, 20, 44, 33, 16],
      },
    ],
  },
  {
    labels: ['June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [10, 20, 40, 100, 30],
      },
      {
        label: 'Data Two',
        backgroundColor: '#f8f579',
        data: [22, 20, 44, 33, 16],
      },
    ],
  },
  {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],
      },
    ],
  },
]);

const options = ref(
  {
    responsive: true,
    maintainAspectRatio: false,
  }
);
</script>

<style scoped></style>