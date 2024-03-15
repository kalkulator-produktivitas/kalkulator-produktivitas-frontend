<template>
  <div v-if="!loading" class="h-full flex flex-row">
    <div class="w-[30%] pt-1">
      <AdminCard1 :value="data.perusahaanTerdaftar" label="Perusahaan Terdaftar" id="card1"
        class="bg-[#66a0d2] text-white" @click="linkPerusahaan" />
      <AdminCard1 :value="data.prosesPendaftaran" label="Dalam Proses Pendaftaran" id="card2"
        class="bg-[#F9C145] text-white" />
      <AdminCard1 :value="data.totalLaporan" label="Total Laporan" id="card3" class="bg-[#95D156] text-white" />
      <AdminCard1 :value="data.isuPending" label="Isu Pending" id="card4" class="bg-[#ec3934] text-white" />
      <div class="mt-8">
        <div class="w-full bg-[#034EA2] p-2">
          <p class="text-md font-bold text-white">Nilai Tambah Tertinggi</p>
        </div>
        <table class="w-[100%]">
          <tbody>
            <tr v-for="(per, i) of data.rankingNilaiTambah" class="text-left text-black border-b-[1px] border-black">
              <th class="text-sm font-normal align-top">{{ i + 1 }}</th>
              <th class="text-sm pl-1 font-normal">{{ per.nama }}</th>
              <th class="text-right text-sm w-[40%] font-normal align-bottom">{{ rupiahFormatter(per.nilai) }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-[70%] flex py-2 px-4">
      <div class="flex flex-col w-[50%]">

        <select id="param1" v-model="parameters.lineChart1"
          class="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg block w-full p-1.5 my-1">
          <option v-for="param of paramList" :value="param">{{ param.replaceAll("_", " ") }}</option>
        </select>
        <LineChart class="shadow-lg border mb-1" id="1" :config="lineOptions" :dataset="chart1"
          title="Kenaikan Nilai Tambah" />

        <select id="param2" v-model="parameters.lineChart2"
          class="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg block w-full p-1.5 my-1">
          <option v-for="param of paramList" :value="param">{{ param.replaceAll("_", " ") }}</option>
        </select>

        <AdminBarChart class="shadow-lg border mb-4" id="2" :config="lineOptions" :dataset="chart2"
          title="Rata-Rata Produktivitas" />
        <DoughnutChart class="shadow-lg border mb-2" id="3" :config="pieOptions" :dataset="data.pie"
          title="Regional Perusahaan" />
      </div>
      <div class="w-[50%]">
        <AdminBarChart class="shadow-lg border ml-4" id="10" :config="chartOptions"
          title="Jumlah Klasifikasi Perusahaan" :dataset="data.bar" :legend="dataIndustri" />
      </div>
    </div>
  </div>
  <Loading v-if="loading" text="Please wait...." />
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});
import getAPI from '@/composables/apiCalls'

const { rupiahFormatter } = useRupiahFormatter();
const { getter } = getAPI()
const global = useRuntimeConfig();
const loading = ref(false)

let adminUser
if (process.client) {
  adminUser = ref(JSON.parse(localStorage.getItem("admin")))
  if (adminUser.value && adminUser.value.user) { } else {
    reloadNuxtApp({
      path: "/admin/login",
      ttl: 500,
    });
  }
}

const errorPage = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})


const linkPerusahaan = async () => {
  await navigateTo(`/admin/perusahaan/`)
}

const dataIndustri = [
  { label: "A", description: "Industri Makanan, Minuman dan Tembakau" },
  { label: "B", description: "Industri Tekstil, Pakaian Jadi dan Kulit" },
  { label: "C", description: "Industri Kayu dan Barang dari kayu" },
  { label: "D", description: "Industri Elektronika" },
  { label: "E", description: "Industri Kertas dan barang dari kertas, percetakan dan penerbitan" },
  { label: "F", description: "Industri kimia dan barang-barang dari bahan kimia, minyak bumi, batubara, karet dan plastik" },
  { label: "G", description: "Industri barang galian bukan logam, kecuali minyak bumi dan batubara" },
  { label: "H", description: "Industri logam dasar" },
  { label: "I", description: "Industri dari logam, mesin dan peralatannya" },
  { label: "J", description: "Industri pengolahan lainnya (barang pertanian, alat musik, mainan anak, alat tulis dan gambar/kerajinan" },
  { label: "K", description: "Usaha Dagang" },
]

const tahun = ref({})

const rawAnalisis = ref({

})

const data = ref({
  perusahaanTerdaftar: 0,
  prosesPendaftaran: 0,
  totalLaporan: 0,
  isuPending: 0,
  rankingNilaiTambah: [
  ],
  pie: {
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7F00FF'],
        data: [],
      },
    ],
  },
  bar: {
    labels: "ABCDEFGHIJK",
    datasets: [
      {
        label: '',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7F00FF'],
        data: [100, 12, 14, 14, 15, 31, 52, 34, 88, 90, 11],
      },

    ],
  },
})

const lineOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 3,
  plugins: {
    legend: {
      display: false,
    }
  },
}

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 0.64,
  plugins: {
    title: {
      display: true,
      text: "Kategori Industri",
      font: {
        size: 18,
        family: "helvetica",
        weight: "normal"
      }
    },
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
      },

    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: false,
        drawOnChartArea: true,
        drawTicks: true
      },
      ticks: {
        maxRotation: 45,
        fontStyle: 'bold',
        fontSize: 24,
        fontFamily: 'Arial', // Change this to the desired font family
      },

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

try {
  let res = await getter('/admin/home')
  data.value.perusahaanTerdaftar = res.data.terdaftar
  data.value.prosesPendaftaran = res.data.pendaftar
  data.value.totalLaporan = res.data.laporan
  let years = res.data.analisis.map(item => item["tahun"]).reverse()
  for (let y of years) {
    tahun.value[y] = true
  }
  rawAnalisis.value = res.data.analisis.reverse()

  data.value.rankingNilaiTambah = res.data.ranking
  data.value.pie.labels = res.data.provinsi.map(item => item["provinsi_perusahaan"])
  data.value.pie.datasets[0].data = res.data.provinsi.map(item => item["jumlah"])
  data.value.bar.labels = res.data.klasifikasi.map(item => item["letter"])
  data.value.bar.datasets[0].data = res.data.klasifikasi.map(item => item["count"])

  // console.log(res.data);
} catch (error) {

}

const paramList = [
  'produktivitas_modal_1',
  'produktivitas_modal_2',
  'produktivitas_modal_3',
  'produktivitas_modal_4',
  "profitabilitas_1",
  "profitabilitas_2",
  "profitabilitas_3"
]

const parameters = ref({
  lineChart1: "produktivitas_modal_1",
  lineChart2: "profitabilitas_1",
  pieChart: ""
})

function filterArrays(array, booleans) {
  return array.filter((_, index) => booleans[index]);
}

const chart1 = computed(() => {
  let booleanList = Object.values(tahun.value)
  let data = filterArrays(rawAnalisis.value, booleanList)
  let labelFilter = data.map(item => item["tahun"])
  let paramFilter = data.map(item => item[parameters.value.lineChart1])
  return {
    labels: labelFilter,
    datasets: [
      {
        label: "Data",
        backgroundColor: '#034EA2',
        data: paramFilter,
      },
    ],
  }
})

const chart2 = computed(() => {
  let booleanList = Object.values(tahun.value)
  let data = filterArrays(rawAnalisis.value, booleanList)
  let labelFilter = data.map(item => item["tahun"])
  let paramFilter = data.map(item => item[parameters.value.lineChart2])
  return {
    labels: labelFilter,
    datasets: [
      {
        label: "Data",
        backgroundColor: '#034EA2',
        data: paramFilter,
      },
    ],
  }
})

const pieChart = computed(() => {
  let booleanList = Object.values(tahun.value)
  let data = filterArrays(rawAnalisis.value, booleanList)
  let labelFilter = data.map(item => item["tahun"])
  let paramFilter = data.map(item => item["profitabilitas_1"])
  return {
    labels: labelFilter,
    datasets: [
      {
        label: "Data",
        backgroundColor: '#034EA2',
        data: paramFilter,
      },
    ],
  }
})

</script>

<style scoped></style>