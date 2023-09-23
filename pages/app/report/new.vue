<template>
  <div class="container max-w h-full grid grid-cols-5">
    <div class="col-span-1">
      <div class="ml-2 flex items-center space-x-4 mb-4 ">
        <label for="select" class="text-gray-600 font-bold">Pilih tahun</label>
        <div class="relative inline-block w-[40%]">
          <select id="year"
            class="block py-1 text-center w-[70px] text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            v-model="selectedYear">
            <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <ul class="flex list-none flex-col flex-wrap border-b-0 border-r-2 pl-0">
        <li v-for="tabName in tabList" class="mr-2">
          <button class="inline-block px-4 py-3" @click="tab = tabName"
            :class="tab === tabName ? 'text-blue-600 border-l-2 border-blue-600 active' : 'border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300'">{{
              tabName }}</button>
        </li>
      </ul>
    </div>
    <form class="col-span-4 overflow-y-auto pt-10 flex w-[90%]" @submit.prevent="submitForm">
      <div class="w-[98%]">
        <!-- <InputField2 v-for="param in parameters[tab]" :label="param" type="number" /> -->
        <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
          class="flex items-center mb-4 ml-4">
          <input @change="zeroParams(tab)" :id="labeling(tab + '_checkbox')" type="checkbox" v-model="total_fill[tab]"
            class="w-4 h-4 bg-gray-100 rounded-2 dark:bg-gray-700">
          <label :for="labeling(tab + '_checkbox')" class="ml-2 text-sm font-medium text-gray-900">Isi Total Saja</label>
        </div>
        <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
          v-for="param in Object.keys(parameters[tab])" class="mb-4 md:flex md:items-center">
          <div class="md:w-1/2">
            <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(param)">
              {{ param }}
            </label>
          </div>
          <div class="md:w-1/2 flex">
            <input
              class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
              :class="total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
            <input
              class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              :class="total_fill[tab] ? 'bg-gray-100' : ''" :id="labeling(param)" type="number"
              :readonly="total_fill[tab]" v-model="parameters[tab][param]">
          </div>
        </div>
        <hr v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
          class="h-px mt-8 border-black border-1 ml-12">
        <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
          class="mb-4 md:flex md:items-center">
          <div class="md:w-1/2">
            <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(tab + '_total')">
              {{ tab + ' Total' }}
            </label>
          </div>
          <div class="md:w-1/2 flex mt-2">
            <input
              class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
              :class="!total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
            <input
              class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              :class="!total_fill[tab] ? 'bg-gray-100' : ''" :disabled="!total_fill[tab]" :id="labeling(tab + '_total')"
              type="number" v-model="totals[tab]">
            <button
              class="bg-transparent hover:text-white hover:bg-gray-400 hover:border-transparent  text-gray-400 font-bold py-1 px-4 border border-blue  rounded ml-1"
              :class="total_fill[tab] ? 'hidden' : ''" @click="sumParams(tab)" :disabled="total_fill[tab]">
              Sum
            </button>
          </div>
        </div>

        <div v-if="tab === 'Jumlah Tenaga Kerja'" v-for="param in Object.keys(parameters[tab])"
          class="mb-4 md:flex md:items-center">
          <div class="md:w-1/2">
            <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(param)">
              {{ param }}
            </label>
          </div>
          <div class="md:w-1/2 flex">
            <input
              class="appearance-none border-b-2 w-full h-100 py-auto px-3 my-1 w-[30%] text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              :class="total_fill[tab] ? 'bg-gray-100' : ''" :id="labeling(param)" type="number"
              :disabled="total_fill[tab]" v-model="parameters[tab][param]">
          </div>
        </div>
        <div v-if="tab === 'Informasi Tambahan'" v-for="param in informasi_tambahan" class="mb-4 ml-8 flex-col">
          <div class="w-3/4 mb-2">
            <label class="block text-sm font-bold mr-8 md:text-left" :for="labeling(param.id)">
              {{ param.question }}
            </label>
          </div>
          <div class="w-3/4">
            <textarea id="message" rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write here..." v-model="param.jawaban" :id="labeling(param.id)"></textarea>
          </div>
        </div>
      </div>
      <div class="absolute bottom-[5%] right-[5%]">
        <button @click="formRequest" type="submit" class="text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9"
          :disabled="!isValid" :class="isValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'">
          Submit
        </button>
      </div>
    </form>

    <Loading v-if="loading" text="Menginput Data" />
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
    <!-- <FlashMessage :type="flashMessageType" :message="flashMessage" /> -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});
const global = useRuntimeConfig();

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

const loading = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

function labeling(label) {
  const noSpaces = label.replace(/ /g, '');
  return noSpaces
}
function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  return years;
}

function sumParams(tabs) {
  for (let params of Object.keys(this.parameters[tabs])) {
    if (!this.parameters[tabs][params]) {
      this.parameters[tabs][params] = 0
    }
  }
  const sums = Object.values(this.parameters[tabs]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  this.totals[tabs] = sums
}

function zeroParams(tabs) {
  for (let param of Object.keys(this.parameters[tabs])) {
    this.parameters[tabs][param] = null
  }
}

const years = generateYearOptions()

const tab = ref('default')
const tabList = ref(['Penjualan dan Modal', 'Biaya Tenaga Kerja', 'Bahan Yang Digunakan', 'Overhead Produksi', 'Bunga Pinjaman',
  'Biaya Administrasi', 'Penyusutan', 'Pajak', 'Aktiva Perusahaan', 'Laba', 'Jumlah Tenaga Kerja', 'Informasi Tambahan'])
const parameters = ref({
  'Penjualan dan Modal': { 'Penjualan': null, 'Modal Operasi': null, 'Investasi': null },
  'Biaya Tenaga Kerja': { 'Upah dan Gaji (Termasuk Direksi)': null, 'Dana Pensiun': null, 'Tunjangan-tunjangan Tenaga Kerja': null },
  'Bahan Yang Digunakan': { 'Barang dan jasa yang dibeli': null, 'Barang yang digunakan': null, 'Bahan Baku': null, 'Bahan pengemas': null },
  'Overhead Produksi': {
    'Pekerjaan Subkontrak': null, 'Sewa': null, 'Air dan Listrik': null, 'Asuransi Perusahaan': null, 'Biaya Transport': null,
    'Pemeliharaan Mesin': null, 'Biaya Supplies dan gudang': null, 'Biaya lain-lain': null
  },
  'Bunga Pinjaman': {
    'Bunga Pinjaman Jangka Pendek': null,
    'Bunga Pinjaman Jangka Panjang': null
  },
  'Biaya Administrasi': {
    'Sewa': null, 'Air dan Listrik': null, 'Telepon': null,
    'Pos dan telegram': null, 'Percetakan, Stationary & Office Supplies': null,
    'Biaya Kendaraan': null, 'Advertising': null, 'Hiburan / Entertainment': null,
    'Majalah dan surat kabar': null, 'Jamuan Makan': null, 'Perbaikan Umum': null,
    'Biaya Bank': null, 'Biaya Akuntan dan Audit': null, 'Biaya	Bantuan	Hukum dan Jasa Profesional lainnya': null, 'Komisi': null, 'Biaya Umum': null
  },
  'Penyusutan': { 'Penyusutan Gedung': null, 'Penyusutan Peralatan dan Mesin': null },
  'Pajak': { 'Pajak Penghasilan': null, 'Pajak Kekayaan': null, 'Pajak Upah': null },
  'Aktiva Perusahaan': {
    'Kas dan Bank': null, 'Persediaan': null, 'Piutang Dagang': null, 'Piutang Lain - Lain': null,
    'Tanah': null, 'Gedung': null, 'Mesin dan Peralatan': null, 'Aktiva Tetap Lainnya': null
  },
  'Laba': { 'Laba Bersih': null, 'Laba Operasi': null },
  'Jumlah Tenaga Kerja': { 'Jumlah Tenaga Kerja': null, 'Jam Kerja': null, 'Jam Kerja Lembur': null },
})

const informasi_tambahan = ref([
  { id: "pertanyaan_1", jawaban: null, question: 'Teknik, metode apa saja yang sudah diterapkan perusahaan untuk meningkatkan produktivitas' },
  { id: "pertanyaan_2", jawaban: null, question: 'Apa saja Kebijakan pimpinan perusahaan dalam rangka mendorong peningkatan produktivitas perusahaan dan tenaga kerja?' },
  { id: "pertanyaan_3", jawaban: null, question: 'Pada tiga tahun terakhir ini apakah perusahaan anda meningkat atau menurun kemajuan atau produktivitasnya?' },
  { id: "pertanyaan_4", jawaban: null, question: 'Jika terjadi peningkatan kemajuan /produktivitas perusahaan, apa saja penyebabnya?' },
  { id: "pertanyaan_5", jawaban: null, question: 'Dan jika terjadi penurunan kemajuan/produktivitas perusahaan, apa saja penyebabnya?' }
])

const total_fill = ref({
  'Penjualan dan Modal': false,
  'Biaya Tenaga Kerja': false,
  'Bahan Yang Digunakan': false,
  'Overhead Produksi': false,
  'Bunga Pinjaman': false,
  'Biaya Administrasi': false,
  'Penyusutan': false,
  'Pajak': false,
  'Aktiva Perusahaan': false,
  'Laba': false,
})

const totals = ref({
  'Penjualan dan Modal': null,
  'Biaya Tenaga Kerja': null,
  'Bahan Yang Digunakan': null,
  'Overhead Produksi': null,
  'Bunga Pinjaman': null,
  'Biaya Administrasi': null,
  'Penyusutan': null,
  'Pajak': null,
  'Aktiva Perusahaan': null,
  'Laba': null,
})

const selectedYear = ref(new Date().getFullYear())
const yearOptions = ref(generateYearOptions())

const all_params = computed(() => {
  let params = parameters.value
  let answer = {}
  for (let ans of informasi_tambahan.value) {
    answer[ans.id] = ans.jawaban
  }
  params["Informasi Tambahan"] = answer
  return params
})

const isValid = computed(() => {
  let obj = totals.value
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      return false
    }
  }

  let obj2 = parameters.value["Jumlah Tenaga Kerja"]
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && obj2[key] === null) {
      return false
    }
  }

  return true;
})

const total_pembelian_bahan = computed(() => {
  return totals.value["Bahan Yang Digunakan"] + totals.value["Overhead Produksi"] + totals.value["Biaya Administrasi"]
})

const nilai_tambah = computed(() => {
  return parameters.value['Penjualan dan Modal']['Penjualan'] - total_pembelian_bahan.value
})

const produktivitas_tenaga_kerja = computed(() => {
  const params = {
    ptk_1: nilai_tambah.value / parameters.value['Jumlah Tenaga Kerja']['Jumlah Tenaga Kerja'],
    ptk_2: nilai_tambah.value / (parameters.value['Jumlah Tenaga Kerja']['Jam Kerja'] + parameters.value['Jumlah Tenaga Kerja']['Jam Kerja Lembur']),
    ptk_3: nilai_tambah.value / totals.value['Biaya Tenaga Kerja'],
    ptk_4: totals.value['Biaya Tenaga Kerja'] / (parameters.value['Jumlah Tenaga Kerja']['Jam Kerja'] + parameters.value['Jumlah Tenaga Kerja']['Jam Kerja Lembur']),
  }
  return params
})
const produktivitas_modal = computed(() => {
  const params = {
    pm_1: parameters.value['Penjualan dan Modal']['Penjualan'] / parameters.value['Penjualan dan Modal']['Modal Operasi'],
    pm_2: nilai_tambah.value / parameters.value['Penjualan dan Modal']['Modal Operasi'],
    pm_3: parameters.value['Penjualan dan Modal']['Modal Operasi'] / parameters.value['Jumlah Tenaga Kerja']['Jumlah Tenaga Kerja'],
  }
  return params
})
const profitabilitas = computed(() => {
  const params = {
    profit_1: totals.value['Laba'] / parameters.value['Penjualan dan Modal']['Penjualan'],
    profit_2: totals.value['Laba'] / total_pembelian_bahan.value,
    profit_3: totals.value['Laba'] / parameters.value['Penjualan dan Modal']['Modal Operasi'],
  }
  return params
})
const tambahan = computed(() => {
  const params = {
    profit_1: nilai_tambah.value / parameters.value['Penjualan dan Modal']['Penjualan'],
    profit_2: nilai_tambah.value / total_pembelian_bahan.value,
    profit_3: totals.value['Laba'] / totals.value['Biaya Tenaga Kerja'],
  }
  return params
})

const closeModal = () => {
  modal.value.show = false
}

const formRequest = async () => {
  loading.value = true
  try {
    const data = await $fetch(`${global.public.baseURL}/write/api/postdata`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        year_report: selectedYear.value,
        id_perusahaan: authUser.value.data.id_perusahaan,
        nama_laporan: `Laporan Produktivitas Tahun ${selectedYear.value}`,
        raw_data: (all_params.value),
        totals: (totals.value),
        analysis: ({
          pembelian_bahan: total_pembelian_bahan.value,
          nilai_tambah: nilai_tambah.value,
          produktivitas_tenaga_kerja: produktivitas_tenaga_kerja.value,
          produktivitas_modal: produktivitas_modal.value,
          profitabilitas: profitabilitas.value,
          tambahan: tambahan.value,
        })
      })
    });
    loading.value = false
    modal.value.show = true
    modal.value.status = null
    modal.value.message = 'Data Berhasil Ditambahkan'
    modal.value.type = 'SUCCESS'
    reloadNuxtApp({
      path: "/app/report",
      ttl: 5000,
    });
  } catch (error) {
    loading.value = false
    modal.value.show = true
    modal.value.message = error.message
    modal.value.status = 500
    modal.value.type = 'ERROR'
  }
}

</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 6px;
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
</style>