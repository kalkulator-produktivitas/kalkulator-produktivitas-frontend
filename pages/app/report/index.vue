<template>
  <div v-if="!errorPage" class="mr-8">
    <div class="flex lg:justify-between">
      <div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search"
            class="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cari Tahun" required>
        </div>
      </div>
      <nuxt-link to="/app/report/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Buat Laporan
      </nuxt-link>
    </div>
    <div class="mt-4 px-2 py-3 border-black border-b-2 text-lg grid grid-cols-12 items-center">
      <div class="col-span-1">Tahun</div>
      <div class="col-span-5">Judul</div>
      <div class="col-span-2">Tanggal Lapor</div>
      <div class="col-span-4 flex gap-2 justify-center">
      </div>
    </div>
    <div v-if="filteredReports.length > 0" class="container my-2 mx-auto">
      <div class="">
        <ReportList v-for="rep of filteredReports" :year="rep.tahun_laporan" :title="rep.nama_laporan"
          :reportId="rep.id_laporan" :reported_at="rep.created_at" @not-ready="tidakSiap" />
      </div>
    </div>
    <div v-else class="container m-12 mt-6 mx-auto">
      <div class="">
        <p class="text-xl text-center">Belum Ada Laporan Dibuat</p>
      </div>
    </div>
    <Loading v-if="loading" text="Memuat Laporan" />
  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});
const global = useRuntimeConfig();

const errorPage = ref(false)
const loading = ref(true)
let reports = ref()

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

const yearFilter = ref(undefined)

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

try {
  const laporan = await $fetch(`${global.public.baseURL}/read/laporan`,
    {
      method: "GET",
      query: {
        id: authUser.value.data.id_perusahaan
      }
    })
  console.log(laporan);
  reports.value = laporan
  loading.value = false
} catch (error) {
  errorPage.value = true
  loading.value = false
  modal.value.show = true
  modal.value.message = "Gagal Memuat Data"
  modal.value.status = 500
  modal.value.type = 'ERROR'
}

const filterReports = () => {

}

const tidakSiap = () => {
  console.log("Fitur Belum Siap");
  modal.value.show = true
  modal.value.message = "Mohon maaf, fitur belum siap"
  modal.value.type = 'WARNING'
}

const filteredReports = ref(reports.value)



// let reports = ref([
//   { year: "2022", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2022" },
//   { year: "2021", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2021" },
//   { year: "2020", title: "Revisi Laporan Produktivitas PT. Indonesia Makmur Sejahtera 2020" },
//   { year: "2020", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2020" },
//   { year: "2019", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2019" },
//   { year: "2018", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2018" },
// ])

</script>

<style scoped></style>