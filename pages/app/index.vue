<template>
  <div v-if="!errorPage" class="h-full grid grid-cols-2 gap-12">
    <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border overflow-x-auto">
      <CardLabel label="Profil" />
      <div class="px-6 py-4 mt-6">
        <div class="font-bold text-xl mb-2">Profil Pengguna</div>
        <div class="flex gap-6">
          <InputField1 label="Nama" wide="300" type="text" disabled="true" :modelValue="rawData.nama_user" />
          <InputField1 label="Tanggal Daftar" wide="300" type="number" disabled="true"
            :modelValue="rawData.tanggal_registrasi" />
        </div>
        <!-- <InputField1 label="Alamat" type="text" disabled="true"
          :modelValue="rawData.alamat_perusahaan" /> -->
        <div class="flex gap-6">
          <InputField1 label="Email" type="text" disabled="true" :modelValue="rawData.email_user" />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="handphone">
              Nomor Handphone
            </label>
            <div class="bg-transparent rounded flex">
              <input
                class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" disabled readonly style="width: 50px">
              <input
                class="shadow shrink appearance-none border border-l-0 rounded-r py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                :value="rawData.kontak_user" disabled readonly id="handphone">
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4 mt-4">
        <div class="font-bold text-xl mb-2">Profil Perusahaan</div>
        <div class="flex gap-6">
          <InputField1 label="Nama Perusahaan" wide="300" type="text" disabled="true"
            :modelValue="rawData.nama_perusahaan" />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="telpon">
              Telpon
            </label>
            <div class="bg-transparent rounded flex">
              <input
                class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" disabled readonly style="width: 50px">
              <input
                class="shadow appearance-none border border-l-0 rounded-r py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                :value="rawData.telp_fax" disabled readonly id="telpon">
            </div>
          </div>
        </div>
        <InputField1 label="Alamat Perusahaan" type="text" disabled="true" :modelValue="rawData.alamat_perusahaan" />
        <InputField1 label="Email Perusahaan" wide="300" type="text" disabled="true"
          :modelValue="rawData.email_perusahaan" />
      </div>
    </div>

    <div class="grid grid-rows-2 gap-12 lg:h-full">
      <div class="max-w  rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <div class="relative">
          <CardLabel label="Laporan" />
          <div class="absolute top-0 right-5">
            <a href="#"
              class=" inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-amber-400 rounded-b-md hover:bg-amber-600">
              Lihat Panduan
              <Icon name="fe:arrow-down" size="6mm" class="my-auto flex-none ml-2" />
            </a>
          </div>
        </div>

        <div class="lg:grid lg:grid-cols-3 gap-3 p-4 mt-2 lg:flex lg:flex-col">
          <div class="lg:col-span-1 lg:grid lg:grid-rows-2 gap-3 hidden lg:visible">
            <div class="border">
              <div class="h-full bg-white border border-gray-200 shadow-sm">
                <p class="font-normal text-zinc-900 dark:text-gray-400 py-1 px-2">Jumlah Laporan</p>
                <div class="h-full border-t-2 grid grid-cols-2">
                  <div class="col m-2 h-full">
                    <p class="text-black">Selesai</p>
                    <p class="text-green-600 text-[24px] font-bold text-center">{{ reports.selesai }}</p>
                  </div>
                  <div class="col m-2 h-full">
                    <p class="text-black">Belum</p>
                    <p class="text-red-600 text-[24px] font-bold text-center">{{ reports.belum }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-[80%] bg-white border border-gray-200 shadow-sm p-2 overflow flex flex-col">
              <p class="font-normal text-zinc-900 dark:text-gray-400 px-2">Total Revenue</p>
              <div class="grid grid-cols-3 flex content-end h-full">
                <div class="h-full col-span-2 flex">
                  <p class="text-[18px] font-bold text-center ml-2">Rp 20.4 M</p>
                </div>
                <div class="h-full col-span-1 flex content-end">
                  <span class="text-green-600  text-[18px] font-bold text-center my-auto">
                    <Icon name="fe:arrow-up" class="mb-1" />2%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-2 flex flex-col gap-3">
            <div class="lg:row-span-5 flex flex-col grow">
              <div class="flex flex-col flex-nowrap grow bg-white border border-gray-200 shadow-sm p-2 md:table-fixed">
                <p class="font-normal text-zinc-900 dark:text-gray-400 py-1 px-2">Riwayat Pelaporan</p>
                <table class="table-auto">
                  <thead>
                    <tr class="text-left">
                      <th class="w-[25%]">Tahun</th>
                      <th class="w-[50%]">Tanggal Lapor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr v-for="dat in rawData.laporan">
                      <td>{{ dat.tahun_laporan }}</td>
                      <td>{{ dateLocal(dat.created_at) }}</td>
                      <td>{{ dat.status_laporan }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row-span-2 flex flex-row gap-16 justify-center content-end lg:">
              <nuxt-link to="/app/report/new"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded-full w-32 h-9">
                Tambah
              </nuxt-link>
              <nuxt-link to="/app/report"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 text-center rounded-full w-32 h-9">
                Lihat
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <CardLabel label="Produktivitas" />
        <div class="lg:grid lg:grid-cols-2 lg:flex-none gap-8 p-5 mt-2 lg:h-[85%]">
          <div class="lg:col-span-1 lg:grid lg:grid-rows-2 gap-6">
            <div class="row-span-1 border">
              <CardInfo label="Nilai Tambah Terakhir" value="4.8" rate="2" unit="M" />
            </div>
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas tenaga kerja rata-rata terakhir" value="4.8" rate="2" unit="%" />
            </div>
          </div>
          <div class="lg:col-span-1 lg:grid lg:grid-rows-2 gap-6">
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas modal rata-rata terakhir" value="4.8" rate="1.2" unit="%" />
            </div>
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas modal rata-rata terakhir" value="1.8" rate="-1.2" unit="%" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ reports }} -->
  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});

const global = useRuntimeConfig();
const loading = ref(true)

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

const errorPage = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

let rawData = ref()
try {
  rawData.value = await $fetch(`${global.public.baseURL}/read/halamandepan`,
    {
      method: "GET",
      query: {
        id: authUser.value.data.id_perusahaan
      },
    })
  loading.value = false

} catch (error) {
  errorPage.value = true
  loading.value = false
  modal.value.show = true
  modal.value.message = "Gagat Memuat Data"
  modal.value.status = 500
  modal.value.type = 'ERROR'
}

// console.log(rawData.laporan);

const reports = computed(() => {
  let laporan = rawData.value.laporan
  const selesai = laporan.filter((laps) => laps.status_laporan === "ACCEPTED").length
  const belum = laporan.filter((laps) => laps.status_laporan === "REJECTED").length
  return { selesai, belum }
})

const d = new Date(0)

const dateLocal = (dt) => {
  const date = new Date(dt);
  return date.toLocaleString('id', {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

</script>

<style scoped>
.card-border {
  border: solid 1px #CCC9D4;
}
</style>