<template>
  <div v-if="!loading" class="h-full flex flex-col">
    <div class="w-[90%] mb-4 flex justify-between">
      <p class="text-4xl font-bold">{{ dataPerusahaan['Nama Perusahaan'] }}</p>
      <button @click="viewReport(route.params.id_perusahaan)"
        class="hover:bg-gray-600 hover:border-gray-600 hover:text-white transition h-8 text-lg font-normal border border-gray-400 rounded-full px-3">
        Lihat Laporan</button>
    </div>
    <div class="flex content-start flex-wrap md:flex-nowrap gap-4">
      <div class="w-full">
        <table style=""
          class="border-separate border-spacing-x-[1px] border-spacing-y-[1px] border border-[0.5px] border-slate-600 bg-white rounded-md bg-slate-600 shadow-md table-fixed">


          <tbody>
            <tr class="bg-white" v-for="par of Object.keys(dataPerusahaan)">
              <td class="" v-if="par !== 'Nama Perusahaan'">{{ par }}</td>
              <td class="text-left" v-if="par === 'Telpon / Fax' || par === 'Kontak User'">+62 {{ dataPerusahaan[par] }}
              </td>
              <td class="text-left" v-else-if="par === 'Tanggal Registrasi'">{{ created_time(dataPerusahaan[par]) }}
              </td>
              <td class="text-left" v-else-if="par === 'Nama Perusahaan'">
              </td>
              <td class="text-left" v-else>{{ dataPerusahaan[par] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="shrink-0 w-[20px]"></div> -->
      <div class="w-full">
        <table style="width: max-content;"
          class="border-separate border-spacing-x-[1px] border-spacing-y-[1px] border border-[0.5px] border-slate-600 bg-white rounded-md bg-slate-600 shadow-md table-fixed">
          <thead class="text-black">
            <tr class="">
              <th class="">Tahun Laporan</th>
              <th class="min-w-[200px]">Tanggal Dibuat</th>
              <th class="">Status Laporan</th>
              <th class="min-w-[30px]"></th>
            </tr>
          </thead>
          <tbody v-for="(lap, index) in dataLaporan" :key="index">
            <tr class="bg-white">
              <td class="text-sm border-t border-b">{{ lap.tahun_laporan }}</td>
              <td class="text-sm border-t border-b text-center">{{ created_time(lap.created_at) }}</td>
              <td class="text-sm border-t border-b">{{ lap.status_laporan }}</td>
              <th class="text-sm border-t border-b min-w-[30px] relative">
                <button @click="dropDownArray[index] = !dropDownArray[index]">
                  <Icon name="fe:elipsis-v" size="6mm" class="my-auto flex-none relative" />
                </button>
                <div v-if="dropDownArray[index]"
                  class="z-40 absolute bg-white w-[150px] top-0 left-6 border rounded-md text-black font-normal flex flex-col">

                  <button @click="" class="text-start p-1 hover:bg-gray-200">
                    Download</button>
                  <button @click="revisiLaporan(lap.id_laporan)" class="text-start p-1 hover:bg-gray-200">
                    Revisi</button>
                  <button @click="" class="text-start p-1 hover:bg-gray-200">
                    Delete</button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
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
import getAPI from '@/composables/getCalls'
import postAPI from '@/composables/postCalls'
const { getter } = getAPI()
const { poster } = postAPI()

const global = useRuntimeConfig();
const loading = ref(false)

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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

const route = useRoute()

const showDropdown = ref(false)


const data = ref([])

try {
  let res = await getter('/admin/dataperusahaandetail', "", { id: route.params.id_perusahaan })
  data.value = res.data
  // console.log(res.data);

} catch (err) {
  console.log(err);
}

let dataPerusahaan = computed(() => {
  if (data.value.length > 0) {
    let raw = data.value[0]
    return {
      "Tanggal Registrasi": raw["tanggal_registrasi"],
      "Nama Perusahaan": raw["nama_perusahaan"],
      "Nama Pemilik Perusahaan": raw["nama_pemilik_perusahaan"],
      "Nama Pimpinan": raw["nama_pimpinan"],
      "Alamat Perusahaan": raw["alamat_perusahaan"],
      "Telpon / Fax": raw["telp_fax"],
      "Alamat Pabrik": raw["alamat_pabrik"],
      "Tanggal Pendirian": raw["tanggal_pendirian"],
      "Klasifikasi Usaha": raw["klasifikasi_usaha"],
      "Kontak Person": raw["kontak_person"],
      "Email Perusahaan": raw["email_perusahaan"],
      "Website Perusahaan": raw["website_perusahaan"],
      "Nama User": raw["nama_user"],
      "Email User": raw["email_user"],
      "Kontak User": raw["kontak_user"]
    }
  }
})

let dataLaporan = computed(() => {
  if (data.value.length > 0) {
    let raw = []
    for (let dat of data.value) {
      raw.push({
        'tahun_laporan': dat["tahun_laporan"],
        'created_at': dat["created_at"],
        "nama_laporan": dat["nama_laporan"],
        "id_laporan": dat["id_laporan"],
        "status_laporan": dat["status_laporan"],
        "show_menu": false
      })
    }
    return raw
  }
})

const created_time = ((dts) => {
  const d = new Date(0);
  let rp = dts / 1000
  d.setUTCSeconds(rp);
  let month = months[d.getUTCMonth()]; //months from 1-12
  let day = d.getUTCDate();
  let year = d.getUTCFullYear();
  return `${day} ${month} ${year}`
})

function createBooleanArray(length) {
  return Array.from({ length }, () => false);
}

const viewReport = (id) => {
  navigateTo(`/admin/laporan/${id}`)
}

const revisiLaporan = async (idLaporan) => {
  const res = await poster('/admin/dataperusahaandetail', "", { id: idLaporan })
  console.log(res);
}

let dropDownArray = ref(createBooleanArray(dataLaporan.length))

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

td::first-letter {
  text-transform: capitalize;
}

/* .popup {
  display: none;
}

.popup:hover {
  display: block;
} */
</style>