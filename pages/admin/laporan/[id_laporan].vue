<template>
  <div v-if="!loading" class="h-full flex flex-col content-between overflow-y-auto">
    <div class="mr-4 fixed top-[8%] right-[4%]">
      <div class="pr-4">
        <button @click="back"
          class="hover:bg-gray-600 hover:border-gray-600 hover:text-white transition h-8 w-24 text-lg font-normal border border-gray-400 rounded-full px-3 mb-2">
          Back</button>
        <div v-for="(y, i) of years" class="flex items-center mb-1 ml-4">
          <input :id="i" type="checkbox" :value="true" v-model="viewedYear[i]"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-800">
          <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">{{ y }}</label>
        </div>
      </div>

    </div>
    <div class="mb-2 flex justify-between">
      <table
        class="max-w-[80%] border-separate border-spacing-x-[0px] border-spacing-y-[0px] border border-[0.5px] border-slate-600 bg-white rounded-md bg-slate-600 shadow-md overflow-auto">
        <thead class="text-black">
          <tr class="text-left">
            <th class="w-[240px]"></th>
            <th v-for="(y, i) of years" class="text-center" :class="viewedYear[i] ? 'show' : 'hidden'">{{ y }}</th>
          </tr>
        </thead>

        <tbody v-for="param of  Object.keys(parameters)">
          <tr class="text-black bg-gray-200" v-if="param !== 'Jumlah Tenaga Kerja'">
            <th :colspan="years.length + 1">{{ param }}</th>
          </tr>
          <tr class="bg-white " v-for="par of Object.keys(parameters[param])" v-if="param !== 'Jumlah Tenaga Kerja'">
            <td class="border-t">{{ capitalizeLetter(par) }}</td>
            <td class="text-left border-t" v-for="(values, i) of parameters[param][par]"
              :class="viewedYear[i] ? 'show' : 'hidden'">{{ rupiahFormatter(values) }}</td>
          </tr>
          <tr class="text-black bg-gray-200" v-else-if="param === 'Jumlah Tenaga Kerja'">
            <th :colspan="years.length + 1">{{ param }}</th>
          </tr>
          <tr class="bg-white" v-for="par of Object.keys(parameters[param]) " v-if="param === 'Jumlah Tenaga Kerja'">
            <td class="border-t">{{ capitalizeLetter(par) }}</td>
            <td class="text-left border-t" v-for="(values, i) of parameters[param][par]"
              :class="viewedYear[i] ? 'show' : 'hidden'">
              {{ values }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mb-2">
      <div class="overflow-x-auto w-full mt-8">
        <div class="flex gap-3 ">
          <label for="selectedYear" class="font-medium text-gray-900 my-auto">Select Year</label>
          <select id="selectedYear" v-model="selectedYear"
            class="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400">
            <option v-for=" (year)  of  years ">{{ year }}</option>
          </select>
        </div>
        <div class="text-sm mb-4" v-for="question  in  informasiTambahan ">
          <p class="font-bold">{{ question.question }}</p>
          <p class="">{{ question.jawaban[years.indexOf(Number(selectedYear))] }}</p>
        </div>

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
const { rupiahFormatter } = useRupiahFormatter();
const global = useRuntimeConfig();
const loading = ref(false)
const route = useRoute()
const router = useRouter()
import getAPI from '@/composables/getCalls'
const { getter } = getAPI()

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



let parameters = ref({
  'Penjualan dan Modal': {
    'penjualan': [0],
    'modal_operasi': [0],
    'total_investasi': [0],
    'total_penjualan_dan_modal': [0]
  },
  'Biaya Tenaga Kerja': {
    'upah_dan_gaji_biaya_tenaga_kerja': [0],
    'dana_pensiun': [0],
    'tunjangan_tenaga_kerja': [0],
    'total_biaya_tenaga_kerja': [0]
  },
  'Bahan Yang Digunakan': {
    'barang_dan_jasa_yang_dibeli': [0],
    'barang_yang_digunakan': [0],
    'bahan_baku': [0],
    'bahan_pengemas': [0],
    'total_bahan_yang_digunakan': [0]
  },
  'Overhead Produksi': {
    'pekerjaan_subkontrak': [0],
    'sewa_overhead': [0],
    'air_dan_listrik_overhead': [0],
    'asuransi_perusahaan': [0],
    'biaya_transport': [0],
    'pemeliharaan_mesin': [0],
    'biaya_suplies_dan_gudang': [0],
    'biaya_lain': [0],
    'total_overhead_produksi': [0]
  },
  'Bunga Pinjaman': {
    'bunga_pinjaman_jangka_pendek': [0],
    'bunga_pinjaman_jangka_panjang': [0],
    'total_bunga_pinjaman': [0]
  },
  'Biaya Administrasi': {
    'sewa_administrasi': [0],
    'air_dan_listrik_administrasi': [0],
    'telepon': [0],
    'pos_dan_telegram': [0],
    'percetakan_stationary_dan_office_suplies': [0],
    'biaya_kendaraan': [0],
    'advertising': [0],
    'hiburan_entertaiment': [0],
    'majalah_dan_surat_kabar': [0],
    'jamuan_makan': [0], 'perbaikan_umum': [0],
    'biaya_bank': [0],
    'biaya_akuntan_dan_audit': [0],
    'biaya_bantuan_hukum_dan_jasa_profesional': [0],
    'komisi': [0],
    'biaya_umum': [0],
    'total_biaya_administrasi': [0],
  },
  'Penyusutan': {
    'penyusutan_gedung': [0],
    'penyusutan_peralatan_dan_mesin': [0],
    'total_penyusutan': [0]
  },
  'Pajak': {
    'pajak_penghasilan': [0],
    'pajak_kekayaan': [0],
    'pajak_upah': [0],
    'total_pajak': [0]
  },
  'Aktiva Perusahaan': {
    'kas_dan_bank': [0],
    'persediaan': [0],
    'piutang_dagang': [0],
    'piutang_lain': [0],
    'tanah': [0],
    'gedung': [0],
    'mesin_dan_peralatan': [0],
    'aktiva_tetap_lainnya': [0],
    'total_aktiva_perusahaan': [0]
  },
  'Laba': {
    'laba_bersih': [0],
    'laba_operasi': [0],
    'total_laba': [0]
  },
  'Jumlah Tenaga Kerja': {
    'jumlah_tenaga_kerja': [0],
    'jumlah_jam_kerja': [0],
    'jumlah_jam_lembur': [0]
  },
})

const informasiTambahan = ref([
  { id: "pertanyaan_1", jawaban: [], question: 'Teknik, metode apa saja yang sudah diterapkan perusahaan untuk meningkatkan produktivitas' },
  { id: "pertanyaan_2", jawaban: [], question: 'Apa saja Kebijakan pimpinan perusahaan dalam rangka mendorong peningkatan produktivitas perusahaan dan tenaga kerja?' },
  { id: "pertanyaan_3", jawaban: [], question: 'Pada tiga tahun terakhir ini apakah perusahaan anda meningkat atau menurun kemajuan atau produktivitasnya?' },
  { id: "pertanyaan_4", jawaban: [], question: 'Jika terjadi peningkatan kemajuan /produktivitas perusahaan, apa saja penyebabnya?' },
  { id: "pertanyaan_5", jawaban: [], question: 'Dan jika terjadi penurunan kemajuan/produktivitas perusahaan, apa saja penyebabnya?' }
])

const data = ref([])

const years = ref([])

const viewedYear = ref([])

const selectedYear = ref(0)

const filterData = (dt, param) => {
  return dt.map(item => item[param])
}

const dataProcess = (x) => {
  if (x.length > 0) {
    for (let param1 of Object.keys(parameters.value)) {
      for (let param2 of Object.keys(parameters.value[param1])) {
        parameters.value[param1][param2] = filterData(x, param2)
      }
    }
  }
}

const informasiProcess = (x) => {
  for (let qst of informasiTambahan.value) {
    let qstArr = []
    let pertanyaan = qst.id

    let answer = x.map(y => y[pertanyaan])
    for (let a of answer) {
      if (!a) {
        qstArr.push("Tidak ada jawaban")
      } else {
        qstArr.push(a)
      }
    }
    qst.jawaban = qstArr
  }
}

const capitalizeLetter = (param) => {
  let replaced = param.replaceAll("_", " ")
  return replaced.charAt(0).toUpperCase() + replaced.slice(1)
}

try {
  let res = await getter('/admin/getreports', "", { id: route.params.id_laporan })
  data.value = res.data
  years.value = filterData(data.value, "tahun_laporan")
  for (let x of years.value) {
    viewedYear.value.push(true)
  }
  const lastIndex = data.value.length - 1
  dataProcess(res.data)
  informasiProcess(res.data)
  selectedYear.value = years.value[lastIndex]

} catch (err) {

}

const back = () => {
  return router.go(-1)
}

</script>

<style scoped>
td {
  padding-right: 10px;
  padding-left: 10px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  transition: ease-in-out 0.3s;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  transition: ease-in-out 0.3s;
}
</style>composables/getCalls