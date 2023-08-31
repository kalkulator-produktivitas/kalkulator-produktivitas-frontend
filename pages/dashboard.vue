<template>
  <div class="container mx-auto flex flex-col gap-4 h-full w-full">
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-rows-2">
        <BarChart class="shadow-lg p-2" id="1" :config="options.bar" :dataset="data.line" title="Nilai Tambah" />
        <PieChart class="h-60 shadow-lg p-2" id="3" :config="options.bar" :dataset="data.pie" />
      </div>
      <div class="col-span-3">
        <BarChart class="shadow-lg p-2" id="1" :config="options.bar" :dataset="data.bar" />
        <BarChart class="shadow-lg p-2" id="1" :config="options.bar" :dataset="data.bar" />
        <BarChart class="shadow-lg p-2" id="1" :config="options.bar" :dataset="data.bar" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <DashboardInfo label="Nilai Tambah / Penjualan" value="0.67" rate="-0.74" sublabel="Ratio Pendukung"
        details="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir" />
      <DashboardInfo label="Nilai Tambah / Pembelian Bahan" value="1.99" rate="-2.21" sublabel="Ratio Pendukung"
        details="Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa" />
      <DashboardInfo label="Laba / Biaya Tenaga Kerja" value="0.1" rate="88.45" sublabel="Ratio Pendukung"
        details="Ukuran kemampuan melipatgandakan biaya tenaga kerja yg dibayarkan dalam menghasilkan laba perusahaan" />
    </div>
  </div>
</template>

<script setup>
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

const data = ref({
  bar: {
    labels: ['2018', '2019'],
    datasets: [
      {
        label: 'N. Tmbh / Jml Tng Kerja',
        backgroundColor: '#7EC27E',
        data: [2.38, 2.38],
      },
      {
        label: 'N. Tmbh / Jam Kerja',
        backgroundColor: '#FFEFA1',
        data: [2.38, 2.38],
      },
      {
        label: 'N. Tmbh / By. Tng Kerja',
        backgroundColor: '#FFBE85',
        data: [-3.53, -3.53],
      },
      {
        label: 'By. Tng Kerja/Total Jam Kerja',
        backgroundColor: '#DE8CD4',
        data: [6.12, -9.79],
      },
    ],
  },
  line: {
    labels: ['2017', '2018', '2019'],
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: [2350226879, 2406084929, 2455863415],
      },
    ],
  },
  pie: {
    labels: ['Gaji Karyawan', 'Laba', 'Penyusutan', 'Pajak', 'Bunga Bank'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7F00FF'],
        data: [877598183, 1303228333, 256584565, 18452334, 0],
      },
    ],
  },
});

const options = ref({
  bar: {
    responsive: true,
    maintainAspectRatio: false,
  }
});
</script>

<style scoped></style>