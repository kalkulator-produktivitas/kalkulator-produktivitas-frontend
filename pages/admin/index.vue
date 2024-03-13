<template>
  <div v-if="!loading" class="h-full flex flex-row">
    <div class="w-[30%]">
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
              <th class="text-sm">{{ i + 1 }}</th>
              <th class="text-sm pl-1">{{ per.nama }}</th>
              <th class="text-right text-sm w-[40%]">{{ rupiahFormatter(per.nilai) }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="w-[70%] flex py-2 px-4">
      <div class="flex flex-col w-[50%]">
        <LineChart class="shadow-lg border mb-4" id="1" :config="lineOptions" :dataset="data.line1"
          title="Kenaikan Nilai Tambah" />
        <AdminBarChart class="shadow-lg border mb-4" id="1" :config="lineOptions" :dataset="data.line2"
          title="Rata-rata Produktivitas" />
        <DoughnutChart class="shadow-lg border mb-2 transition-none" id="3" :config="pieOptions" :dataset="data.pie"
          title="Regional Perusahaan" />
      </div>
      <div class="w-[50%]">
        <AdminBarChart class="shadow-lg border ml-4" id="10" :config="chartOptions"
          title="Jumlah Klasifikasi Perusahaan" :dataset="data.bar" :legend="dataIndustri" />
      </div>
    </div>
    <!-- {{ data }} -->
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
const selectYear = ref([])
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
  line1: {
    labels: [],
    datasets: [
      {
        label: "Data",
        backgroundColor: '#034EA2',
        data: [],
      },
    ],
  },
  line2: {
    labels: ["asdasd"],
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: [1, 2, 3, 4, 7],
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



// const dataProcess = (dt) => {
//   const parameter = 'produktivitas_modal_1'
//   const parameter2 = 'profitabilitas_1'
//   let labels = dt.map(item => item["tahun"]).reverse()
//   let data1 = dt.map(item => item[parameter]).reverse()
//   let data2 = dt.map(item => item[parameter2]).reverse()

//   data.line1.labels = labels
//   data.line2.labels = labels
//   data.line1.datasets[0].data = data1
//   data.line2.datasets[0].data = data2
// }


const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
  aspectRatio: 0.75,
  plugins: {
    title: {
      display: true,
      text: "Kategori Industri"
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
        drawTicks: false
      },
      ticks: {
        maxRotation: 90,
        fontStyle: 'normal',
        fontSize: 24,
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



// const chart2 = computed(() => {

// })

try {
  let res = await getter('/admin/home')
  data.value.perusahaanTerdaftar = res.data.terdaftar
  data.value.prosesPendaftaran = res.data.pendaftar
  data.value.totalLaporan = res.data.laporan
  let years = res.data.analisis.map(item => item["tahun"]).reverse()
  const parameter = 'produktivitas_modal_1'
  const parameter2 = 'profitabilitas_2'
  data.value.line1.labels = years
  data.value.line2.labels = years


  data.value.line1.datasets[0].data = res.data.analisis.map(item => item[parameter]).reverse()
  data.value.line2.datasets[0].data = res.data.analisis.map(item => item[parameter2]).reverse()

  data.value.rankingNilaiTambah = res.data.ranking.slice(0, 7)
  data.value.pie.labels = res.data.provinsi.map(item => item["provinsi_perusahaan"])
  data.value.pie.datasets[0].data = res.data.provinsi.map(item => item["jumlah"])
  data.value.bar.labels = res.data.klasifikasi.map(item => item["letter"])
  data.value.bar.datasets[0].data = res.data.klasifikasi.map(item => item["count"])

  // console.log(res.data);
} catch (error) {

}

// const chart1 = computed(() => {
//   // rawAnalisis.value.filter(item => item.tahun)

//   return { labels, data }
// })

</script>

<style scoped></style>