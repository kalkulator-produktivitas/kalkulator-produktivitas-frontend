<template>
  <div class="container mx-auto flex flex-col gap-4 h-full w-full">
    <!-- {{ nilaiTambah }} -->
    <div class="grid grid-cols-3 gap-4">
      <LineChart class="col-span-2 shadow-lg border" id="1" :config="lineOptions" :dataset="data.line"
        title="Nilai Tambah" />
      <DoughnutChart class="h-60 shadow-lg border" id="3" :config="pieOptions" :dataset="data.pie"
        title="Perbandingan Nilai Tambah" />
    </div>

    <div class="grid grid-cols-3 gap-2">
      <BarChart class="shadow-lg border" id="10" :config="chartOptions" title="Produktivitas Tenaga Kerja"
        :dataset="data.produktivitas_tenaga_kerja" />
      <BarChart class="shadow-lg border" id="11" :config="chartOptions" title="Produktivitas Modal"
        :dataset="data.produktivitas_modal" />
      <BarChart class="shadow-lg border" id="12" :config="chartOptions" title="Profitabilitas"
        :dataset="data.profitabilitas" />
      <!-- <BarChart class="shadow-lg border" id="13" :config="chartOptions" title="Rasio Pendukung"
        :dataset="data.ratio_pendukung" /> -->
    </div>

    <div class="grid grid-cols-4 gap-4">
      <DashboardInfo label="Nilai Tambah" :value="`Rp ${new Intl.NumberFormat('id').format(nilaiTambah.total)}`"
        rate="2.06" sublabel=""
        details="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir" />
      <DashboardInfo label="Nilai Tambah / Penjualan" value="0.67 %" rate="-0.74" sublabel="Ratio Pendukung"
        details="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir" />
      <DashboardInfo label="Nilai Tambah / Pembelian Bahan" value="1.99 %" rate="-2.21" sublabel="Ratio Pendukung"
        details="Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa" />
      <DashboardInfo label="Laba / Biaya Tenaga Kerja" value="0.1 %" rate="88.45" sublabel="Ratio Pendukung"
        details="Ukuran kemampuan melipatgandakan biaya tenaga kerja yg dibayarkan dalam menghasilkan laba perusahaan" />
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});

const global = useRuntimeConfig();
let rawData = ref()
let loading = ref(false)

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

try {
  rawData.value = await $fetch(`${global.public.baseURL}/read/dashboard`,
    {
      method: "GET",
      query: {
        id: authUser.value.data.id_perusahaan
      },
    })
  loading.value = false
  console.log(rawData.value);
} catch (error) {
  console.log(error);
  loading.value = false
  navigateTo('/error')
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR',
});

const nilaiTambah = computed(() => {
  let data = {
    label: [],
    value: [],
    total: null,
    pie_label: ['Gaji Karyawan', 'Laba', 'Penyusutan', 'Pajak', 'Bunga Bank'],
    pie_value: [0, 0, 0, 0, 0]
  }
  for (let year in rawData.value) {
    data["label"].push(year)
    data["value"].push(rawData.value[year]["nilai_tambah"])
    data["total"] += rawData.value[year]["nilai_tambah"]
    data["pie_value"][0] += rawData.value[year]["total_biaya_tenaga_kerja"]
    data["pie_value"][1] += (rawData.value[year]["nilai_tambah"] - rawData.value[year]["total_biaya_tenaga_kerja"] - rawData.value[year]["total_pajak"] - rawData.value[year]["total_penyusutan"] - rawData.value[year]["total_bunga_pinjaman"])
    data["pie_value"][2] += rawData.value[year]["total_pajak"]
    data["pie_value"][3] += rawData.value[year]["total_penyusutan"]
    data["pie_value"][4] += rawData.value[year]["total_bunga_pinjaman"]
  }
  return data
})

const rasio = computed(() => {
  let data = {
    ptk: [],
    pm: [],
    prof: [],
    lain: []
  }
  for (let year in rawData.value) {
    data["label"].push(year)
    data["value"].push(rawData.value[year]["nilai_tambah"])
  }
  return data
})


const data = ref({
  produktivitas_tenaga_kerja: {
    labels: ['2018', '2019'],
    datasets: [
      {
        label: 'Nilai Tambah / Jml Tenaga Kerja',
        backgroundColor: '#7EC27E',
        data: [2.38, 2.07],
      },
      {
        label: 'Nilai Tambah / Jam Kerja',
        backgroundColor: '#FFEFA1',
        data: [2.38, 2.07],
      },
      {
        label: 'Nilai Tambah / Biaya Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: [-3.53, 13.15],
      },
      {
        label: 'Biaya Tenaga Kerja / Total Jam Kerja',
        backgroundColor: '#DE8CD4',
        data: [6.12, -9.79],
      },
    ],
  },
  produktivitas_modal: {
    labels: ['2018', '2019'],
    datasets: [
      {
        label: 'Penjualan / Total Modal',
        backgroundColor: '#7EC27E',
        data: [17.65, 2.83],
      },
      {
        label: 'Nilai Tambah / Total Modal',
        backgroundColor: '#FFEFA1',
        data: [2.38, 2.07],
      },
      {
        label: 'Total Modal / Jml Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: [0, 0],
      },
    ],
  },
  profitabilitas: {
    labels: ['2018', '2019'],
    datasets: [
      {
        label: 'Laba / Penjualan',
        backgroundColor: '#7EC27E',
        data: [-82.57, 65.32],
      },
      {
        label: 'Laba / Pembelian Bahan',
        backgroundColor: '#FFEFA1',
        data: [-87.86, 62.87],
      },
      {
        label: 'Laba / Total Modal',
        backgroundColor: '#FFBE85',
        data: [-79.49, 70],
      },
    ],
  },
  ratio_pendukung: {
    labels: ['2018', '2019'],
    datasets: [
      {
        label: 'Nilai Tambah / Penjualan',
        backgroundColor: '#7EC27E',
        data: [-12.98, -0.74],
      },
      {
        label: 'Nilai Tambah / Pembelian Bahan',
        backgroundColor: '#FFEFA1',
        data: [-39.38, -2.21],
      },
      {
        label: 'Laba / Biaya Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: [-80.68, 88.45],
      },
    ],
  },
  line: {
    labels: nilaiTambah.value.label,
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: nilaiTambah.value.value,
      },
    ],
  },
  pie: {
    labels: nilaiTambah.value.pie_label,
    datasets: [
      {
        label: 'Data One',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7F00FF'],
        data: nilaiTambah.value.pie_value,
      },
    ],
  },
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false
      }
    }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        boxWidth: 15,
        padding: 12,
        font: {
          size: 10
        }
      }
    }
  },
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    }
  },
}

</script>

<style scoped>
.shadow-new {
  border: solid;
  box-shadow: -5px 5px 5px gray;
}
</style>