<template>
  <div v-if="available" class="container mx-auto flex flex-col gap-4 h-full w-full">
    <!-- {{ nilaiTambah }} -->
    <div class="grid grid-cols-8 gap-4">
      <LineChart class="col-span-3 shadow-lg border" id="1" :config="lineOptions" :dataset="data.line"
        title="Nilai Tambah (Rp)" />
      <LineChart class="col-span-3 shadow-lg border" id="2" :config="lineOptions" :dataset="data.line2"
        title="Produktivitas (Rp)" />
      <DoughnutChart class="col-span-2 h-60 shadow-lg border" id="3" :config="pieOptions" :dataset="data.pie"
        title="Perbandingan Nilai Tambah" />
    </div>

    <div class="grid grid-cols-3 gap-2">
      <BarChart class="shadow-lg border" id="10" :config="chartOptions" title="Produktivitas Tenaga Kerja (%)"
        :dataset="data.produktivitas_tenaga_kerja" />
      <BarChart class="shadow-lg border" id="11" :config="chartOptions" title="Produktivitas Modal (%)"
        :dataset="data.produktivitas_modal" />
      <BarChart class="shadow-lg border" id="12" :config="chartOptions" title="Profitabilitas (%)"
        :dataset="data.profitabilitas" />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <DashboardInfo label="Nilai Tambah" :value="`Rp ${new Intl.NumberFormat('id').format(nilaiTambah.total)}`"
        rate="2.06" sublabel=""
        details="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir" />
      <DashboardInfo label="Nilai Tambah / Penjualan" :value="rasio.latest1" :rate="rasio.rasio1[1]"
        details="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir" />
      <DashboardInfo label="Nilai Tambah / Pembelian Bahan" :value="rasio.latest2" :rate="rasio.rasio2[1]"
        details="Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa" />
      <DashboardInfo label="Laba / Biaya Tenaga Kerja" :value="rasio.latest3" :rate="rasio.rasio3[1]"
        details="Ukuran kemampuan melipatgandakan biaya tenaga kerja yg dibayarkan dalam menghasilkan laba perusahaan" />
    </div>

  </div>
  <div v-else>
    <p class="text-xl text-center">
      Belum Ada Laporan Dibuat
    </p>
  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});

const global = useRuntimeConfig();
let rawData = ref()
let loading = ref(false)

let available = ref(false)

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

try {
  const res = await $fetch(`${global.public.baseURL}/read/dashboard`,
    {
      method: "GET",
      query: {
        id: authUser.value.data.id_perusahaan
      },
      headers: {
        "x-api-authorization": JSON.stringify(authUser.value)
      },
    })
  // console.log(res);
  if (res.status && res.status >= 400) {
    loading.value = false
    modal.value.show = true
    modal.value.message = res.message
    modal.value.status = res.status
    modal.value.type = 'ERROR'
    if (process.client) {
      localStorage.removeItem("auth")
      setTimeout(
        reloadNuxtApp({
          path: "/app/login",
          ttl: 5000,
        }),
        5000
      )
    }
  } else {
    available.value = true
    loading.value = false
    rawData.value = res
  }
} catch (error) {
  loading.value = false
  modal.value.show = true
  modal.value.message = error.message
  modal.value.status = error.status
  modal.value.type = 'ERROR'
  // navigateTo('/error')
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

const produktivitas = computed(() => {
  let data = {
    label: [],
    value: [],
  }
  for (let year in rawData.value) {
    data["label"].push(year)
    data["value"].push(rawData.value[year]["produktivitas_tenaga_kerja_1"])
  }
  return data
})



const ptk_params = computed(() => {

  if (available.value) {
    const year_0 = rawData.value[Object.keys(rawData.value).at(-3)]
    const year_1 = rawData.value[Object.keys(rawData.value).at(-2)]
    const year_2 = rawData.value[Object.keys(rawData.value).at(-1)]

    let data = {
      label: [],
      ptk1: [],
      ptk2: [],
      ptk3: [],
      ptk4: [],
    }

    if (!year_0 && !year_1) {
      data.label = ["Laporan belum cukup"]
      data.ptk1[0] = 0
      data.ptk2[0] = 0
      data.ptk3[0] = 0
      data.ptk4[0] = 0
    } else if (!year_0) {
      data.label = [Object.keys(rawData.value).at(-1)]
      data.ptk1[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_1 - year_1.produktivitas_tenaga_kerja_1) / year_1.produktivitas_tenaga_kerja_1) / 100
      data.ptk2[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_2 - year_1.produktivitas_tenaga_kerja_2) / year_1.produktivitas_tenaga_kerja_2) / 100
      data.ptk3[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_3 - year_1.produktivitas_tenaga_kerja_3) / year_1.produktivitas_tenaga_kerja_3) / 100
      data.ptk4[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_4 - year_1.produktivitas_tenaga_kerja_4) / year_1.produktivitas_tenaga_kerja_4) / 100
    } else {
      data.label = [Object.keys(rawData.value).at(-2), Object.keys(rawData.value).at(-1)]
      data.ptk1[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_1 - year_0.produktivitas_tenaga_kerja_1) / year_0.produktivitas_tenaga_kerja_1) / 100
      data.ptk2[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_2 - year_0.produktivitas_tenaga_kerja_2) / year_0.produktivitas_tenaga_kerja_2) / 100
      data.ptk3[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_3 - year_0.produktivitas_tenaga_kerja_3) / year_0.produktivitas_tenaga_kerja_3) / 100
      data.ptk4[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_4 - year_0.produktivitas_tenaga_kerja_4) / year_0.produktivitas_tenaga_kerja_4) / 100

      data.ptk1[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_1 - year_1.produktivitas_tenaga_kerja_1) / year_1.produktivitas_tenaga_kerja_1) / 100
      data.ptk2[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_2 - year_1.produktivitas_tenaga_kerja_2) / year_1.produktivitas_tenaga_kerja_2) / 100
      data.ptk3[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_3 - year_1.produktivitas_tenaga_kerja_3) / year_1.produktivitas_tenaga_kerja_3) / 100
      data.ptk4[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_4 - year_1.produktivitas_tenaga_kerja_4) / year_1.produktivitas_tenaga_kerja_4) / 100
    }
    return data
  }
}
)

const pm_params = computed(() => {
  const year_0 = rawData.value[Object.keys(rawData.value).at(-3)]
  const year_1 = rawData.value[Object.keys(rawData.value).at(-2)]
  const year_2 = rawData.value[Object.keys(rawData.value).at(-1)]

  let data = {
    label: [],
    pm1: [],
    pm2: [],
    pm3: [],
  }

  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.pm1[0] = 0
    data.pm2[0] = 0
    data.pm3[0] = 0
  }
  else if (!year_0) {
    data.label = [Object.keys(rawData.value).at(-1)]
    data.pm1[0] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100
    data.pm2[0] = Math.round(10000 * (year_2.produktivitas_modal_2 - year_1.produktivitas_modal_2) / year_1.produktivitas_modal_2) / 100
    data.pm3[0] = Math.round(10000 * (year_2.produktivitas_modal_3 - year_1.produktivitas_modal_3) / year_1.produktivitas_modal_3) / 100
  } else {
    data.label = [Object.keys(rawData.value).at(-2), Object.keys(rawData.value).at(-1)]
    data.pm1[0] = Math.round(10000 * (year_1.produktivitas_modal_1 - year_0.produktivitas_modal_1) / year_0.produktivitas_modal_1) / 100
    data.pm2[0] = Math.round(10000 * (year_1.produktivitas_modal_2 - year_0.produktivitas_modal_2) / year_0.produktivitas_modal_2) / 100
    data.pm3[0] = Math.round(10000 * (year_1.produktivitas_modal_3 - year_0.produktivitas_modal_3) / year_0.produktivitas_modal_3) / 100

    data.pm1[1] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100
    data.pm2[1] = Math.round(10000 * (year_2.produktivitas_modal_2 - year_1.produktivitas_modal_2) / year_1.produktivitas_modal_2) / 100
    data.pm3[1] = Math.round(10000 * (year_2.produktivitas_modal_3 - year_1.produktivitas_modal_3) / year_1.produktivitas_modal_3) / 100
  }
  return data
})

const pf_params = computed(() => {
  const year_0 = rawData.value[Object.keys(rawData.value).at(-3)]
  const year_1 = rawData.value[Object.keys(rawData.value).at(-2)]
  const year_2 = rawData.value[Object.keys(rawData.value).at(-1)]

  let data = {
    label: [],
    pf1: [],
    pf2: [],
    pf3: [],
  }

  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.pf1[0] = 0
    data.pf2[0] = 0
    data.pf3[0] = 0
  } else if (!year_0) {
    data.label = [Object.keys(rawData.value).at(-1)]
    data.pf1[0] = Math.round(10000 * (year_2.profitabilitas_1 - year_1.profitabilitas_1) / year_1.profitabilitas_1) / 100
    data.pf2[0] = Math.round(10000 * (year_2.profitabilitas_2 - year_1.profitabilitas_2) / year_1.profitabilitas_2) / 100
    data.pf3[0] = Math.round(10000 * (year_2.profitabilitas_3 - year_1.profitabilitas_3) / year_1.profitabilitas_3) / 100
  } else {
    data.label = [Object.keys(rawData.value).at(-2), Object.keys(rawData.value).at(-1)]
    data.pf1[0] = Math.round(10000 * (year_1.profitabilitas_1 - year_0.profitabilitas_1) / year_0.profitabilitas_1) / 100
    data.pf2[0] = Math.round(10000 * (year_1.profitabilitas_2 - year_0.profitabilitas_2) / year_0.profitabilitas_2) / 100
    data.pf3[0] = Math.round(10000 * (year_1.profitabilitas_3 - year_0.profitabilitas_3) / year_0.profitabilitas_3) / 100

    data.pf1[1] = Math.round(10000 * (year_2.profitabilitas_1 - year_1.profitabilitas_1) / year_1.profitabilitas_1) / 100
    data.pf2[1] = Math.round(10000 * (year_2.profitabilitas_2 - year_1.profitabilitas_2) / year_1.profitabilitas_2) / 100
    data.pf3[1] = Math.round(10000 * (year_2.profitabilitas_3 - year_1.profitabilitas_3) / year_1.profitabilitas_3) / 100
  }
  return data
})


const rasio = computed(() => {
  const year_0 = rawData.value[Object.keys(rawData.value).at(-3)]
  const year_1 = rawData.value[Object.keys(rawData.value).at(-2)]
  const year_2 = rawData.value[Object.keys(rawData.value).at(-1)]

  let data = {
    label: [],
    latest1: year_2 ? Math.round(year_2.rasio_pendukung_1 * 100) / 100 : 0,
    latest2: year_2 ? Math.round(year_2.rasio_pendukung_2 * 100) / 100 : 0,
    latest3: year_2 ? Math.round(year_2.rasio_pendukung_3 * 100) / 100 : 12,
    rasio1: [],
    rasio2: [],
    rasio3: [],
  }

  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.rasio1[0] = 0
    data.rasio2[0] = 0
    data.rasio3[0] = 0
  } else if (!year_0) {
    data.label = [Object.keys(rawData.value).at(-1)]
    data.rasio1[1] = Math.round(10000 * (year_2.rasio_pendukung_1 - year_1.rasio_pendukung_1) / year_1.rasio_pendukung_1) / 100
    data.rasio2[1] = Math.round(10000 * (year_2.rasio_pendukung_2 - year_1.rasio_pendukung_2) / year_1.rasio_pendukung_2) / 100
    data.rasio3[1] = Math.round(10000 * (year_2.rasio_pendukung_3 - year_1.rasio_pendukung_3) / year_1.rasio_pendukung_3) / 100
  } else {
    data.label = [Object.keys(rawData.value).at(-2), Object.keys(rawData.value).at(-1)]
    data.rasio1[0] = Math.round(10000 * (year_1.rasio_pendukung_1 - year_0.rasio_pendukung_1) / year_0.rasio_pendukung_1) / 100
    data.rasio2[0] = Math.round(10000 * (year_1.rasio_pendukung_2 - year_0.rasio_pendukung_2) / year_0.rasio_pendukung_2) / 100
    data.rasio3[0] = Math.round(10000 * (year_1.rasio_pendukung_3 - year_0.rasio_pendukung_3) / year_0.rasio_pendukung_3) / 100

    data.rasio1[1] = Math.round(10000 * (year_2.rasio_pendukung_1 - year_1.rasio_pendukung_1) / year_1.rasio_pendukung_1) / 100
    data.rasio2[1] = Math.round(10000 * (year_2.rasio_pendukung_2 - year_1.rasio_pendukung_2) / year_1.rasio_pendukung_2) / 100
    data.rasio3[1] = Math.round(10000 * (year_2.rasio_pendukung_3 - year_1.rasio_pendukung_3) / year_1.rasio_pendukung_3) / 100
  }
  return data
})


const data = ref({

  produktivitas_tenaga_kerja: {
    labels: ptk_params.value.label,
    datasets: [
      {
        label: 'Nilai Tambah / Jml Tenaga Kerja',
        backgroundColor: '#7EC27E',
        data: ptk_params.value.ptk1,
      },
      {
        label: 'Nilai Tambah / Jam Kerja',
        backgroundColor: '#FFEFA1',
        data: ptk_params.value.ptk2,
      },
      {
        label: 'Nilai Tambah / Biaya Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: ptk_params.value.ptk3,
      },
      {
        label: 'Biaya Tenaga Kerja / Total Jam Kerja',
        backgroundColor: '#DE8CD4',
        data: ptk_params.value.ptk4,
      },
    ],
  },
  produktivitas_modal: {
    labels: pm_params.value.label,
    datasets: [
      {
        label: 'Penjualan / Total Modal',
        backgroundColor: '#7EC27E',
        data: pm_params.value.pm1,
      },
      {
        label: 'Nilai Tambah / Total Modal',
        backgroundColor: '#FFEFA1',
        data: pm_params.value.pm2,
      },
      {
        label: 'Total Modal / Jml Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: pm_params.value.pm3,
      },
    ],
  },
  profitabilitas: {
    labels: pf_params.value.label,
    datasets: [
      {
        label: 'Laba / Penjualan',
        backgroundColor: '#7EC27E',
        data: pf_params.value.pf1,
      },
      {
        label: 'Laba / Pembelian Bahan',
        backgroundColor: '#FFEFA1',
        data: pf_params.value.pf2,
      },
      {
        label: 'Laba / Total Modal',
        backgroundColor: '#FFBE85',
        data: pf_params.value.pf3,
      },
    ],
  },
  ratio_pendukung: {
    labels: rasio.value.label,
    datasets: [
      {
        label: 'Nilai Tambah / Penjualan',
        backgroundColor: '#7EC27E',
        data: rasio.value.rasio1,
      },
      {
        label: 'Nilai Tambah / Pembelian Bahan',
        backgroundColor: '#FFEFA1',
        data: rasio.value.rasio2,
      },
      {
        label: 'Laba / Biaya Tenaga Kerja',
        backgroundColor: '#FFBE85',
        data: rasio.value.rasio3,
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
  line2: {
    labels: produktivitas.value.label,
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: produktivitas.value.value,
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