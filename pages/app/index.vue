<template>
  <div class="h-full grid grid-cols-2 gap-12">
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
            <a href="#" @click="tidakSiap"
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
                    <p v-if="!errorPage" class="text-green-600 text-[24px] font-bold text-center">{{ reports.selesai }}
                    </p>
                    <p v-else class="text-green-600 text-[24px] font-bold text-center">0</p>
                  </div>
                  <div class="col m-2 h-full">
                    <p class="text-black">Belum</p>
                    <p v-if="!errorPage" class="text-red-600 text-[24px] font-bold text-center">{{ reports.belum }}</p>
                    <p v-else class="text-green-600 text-[24px] font-bold text-center">0</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-[80%] bg-white border border-gray-200 shadow-sm p-2 overflow flex flex-col">
              <p class="font-normal text-zinc-900 dark:text-gray-400 px-2">Total Penjualan</p>
              <div class="flex justify-end h-full">
                <div class="h-full">
                  <p v-if="!errorPage || rawData.value !== null || rawData.value !== undefined"
                    class="lg:text-[22px] text-green-600 font-bold text-center mr-3">Rp {{
                      hitung_total_pendapatan }}
                  </p>
                  <p v-else class="lg:text-[22px] text-green-600 font-bold text-center mr-3">Rp 0
                  </p>
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
                  <tbody v-if="!errorPage" class="text-sm">
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
              <nuxt-link to="/app/report/new">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 text-center rounded-full w-32 h-9 transition ease-in-out">
                  Tambah
                </button>
              </nuxt-link>
              <nuxt-link to="/app/report">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 text-center rounded-full w-32 h-9 transition ease-in-out">
                  Lihat
                </button>
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
              <CardInfo v-if="!errorPage"
                label="Kemampuan perusahaan dalam menciptakan penjualan melalui pendayagunaan modal"
                :value="performance.produktivitas_tenaga_kerja_latest"
                :rate="performance.produktivitas_tenaga_kerja_rate ? Math.round(100 * performance.produktivitas_tenaga_kerja_rate) / 100 : 0"
                unit="" />
            </div>
            <div class="row-span-1 border">
              <CardInfo v-if="!errorPage"
                label="Kontiribusi/Sumbangan rata-rata setiap jam tenaga kerja dalam bekerja dalam menciptakan nilai tambah"
                :value="performance.produktivitas_modal_latest"
                :rate="performance.produktivitas_modal_rate ? Math.round(100 * performance.produktivitas_modal_rate) / 100 : 0"
                unit="" />
            </div>
          </div>
          <div class="lg:col-span-1 lg:grid lg:grid-rows-2 gap-6">
            <div class="row-span-1 border">
              <CardInfo v-if="!errorPage"
                label="Perbandingan antara nilai bersih yang didapatkan perusahaan dengan sejumlah biaya yang dikeluarkan untuk membayar bahan & jasa"
                :value="performance.profitabilitas_latest"
                :rate="performance.profitabilitas_rate ? Math.round(100 * performance.profitabilitas_rate) / 100 : 0"
                unit="" />
            </div>
            <div class="row-span-1 border">
              <CardInfo v-if="!errorPage"
                label="Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir"
                :value="performance.rasio_pendukung_latest"
                :rate="performance.rasio_pendukung_rate ? Math.round(100 * performance.rasio_pendukung_rate) / 100 : 0"
                unit="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ rawData }} -->
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
  const res = await $fetch(`${global.public.baseURL}/read/halamandepan`,
    {
      method: "GET",
      headers: {
        "x-api-authorization": JSON.stringify(authUser.value)
      },
      query: {
        id: authUser.value.data.id_perusahaan
      },
    })
  if (res.status && res.status >= 400) {
    errorPage.value = true
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
    loading.value = false
    rawData.value = res
  }
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
  if (rawData.value) {
    let laporan = rawData.value.laporan
    const selesai = laporan.filter((laps) => laps.status_laporan === "ACCEPTED").length
    const belum = laporan.filter((laps) => laps.status_laporan === "REJECTED").length
    return { selesai, belum }
  } else {

  }
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

const performance = computed(() => {
  let laporan = {}
  let data = rawData.value?.hasil
  if (errorPage && data !== null && data !== undefined) {
    if (data[0] && data[1]) {
      // Produktivitas Tenaga Kerja

      laporan.produktivitas_tenaga_kerja_latest = ((data[0].produktivitas_tenaga_kerja_1 - data[1].produktivitas_tenaga_kerja_1) / data[1].produktivitas_tenaga_kerja_1 * 100).toFixed(2)
      let produktivitas_tenaga_kerja_before
      if (!data[2] || !data[2].produktivitas_tenaga_kerja_1) {
        produktivitas_tenaga_kerja_before = 0
      } else {
        produktivitas_tenaga_kerja_before = ((data[1].produktivitas_tenaga_kerja_1 - data[2].produktivitas_tenaga_kerja_1) / data[2].produktivitas_tenaga_kerja_1 * 100).toFixed(2)
      }
      laporan.produktivitas_tenaga_kerja_rate = (laporan.produktivitas_tenaga_kerja_latest - produktivitas_tenaga_kerja_before).toFixed(2)

      // Produktivitas Modal
      laporan.produktivitas_modal_latest = ((data[0].produktivitas_modal_1 - data[1].produktivitas_modal_1) / data[1].produktivitas_modal_1 * 100).toFixed(2)
      let produktivitas_modal_before
      if (!data[2] || !data[2].produktivitas_modal_1) {
        produktivitas_modal_before = 0
      } else {
        produktivitas_modal_before = ((data[1].produktivitas_modal_1 - data[2].produktivitas_modal_1) / data[2].produktivitas_modal_1 * 100).toFixed(2)
      }
      laporan.produktivitas_modal_rate = (laporan.produktivitas_modal_latest - produktivitas_modal_before).toFixed(2)

      // Profitabilitas
      laporan.profitabilitas_latest = ((data[0].profitabilitas_2 - data[1].profitabilitas_2) / data[1].profitabilitas_2 * 100).toFixed(2)
      let profitabilitas_before
      if (!data[2] || !data[2].profitabilitas_2) {
        profitabilitas_before = 0
      } else {
        profitabilitas_before = ((data[1].profitabilitas_2 - data[2].profitabilitas_2) / data[2].profitabilitas_2 * 100).toFixed(2)
      }
      laporan.profitabilitas_rate = (laporan.profitabilitas_latest - profitabilitas_before).toFixed(2)

      // Rasio Pendukung
      laporan.rasio_pendukung_latest = ((data[0].rasio_pendukung_1 - data[1].rasio_pendukung_1) / data[1].rasio_pendukung_1 * 100).toFixed(2)
      let rasio_pendukung_before
      if (!data[2] || !data[2].rasio_pendukung_1) {
        rasio_pendukung_before = 0
      } else {
        rasio_pendukung_before = ((data[1].rasio_pendukung_1 - data[2].rasio_pendukung_1) / data[2].rasio_pendukung_1 * 100).toFixed(2)
      }
      laporan.rasio_pendukung_rate = (laporan.rasio_pendukung_latest - rasio_pendukung_before).toFixed(2)
    }
  }
  return laporan
})

const hitung_total_pendapatan = computed(() => {
  let data_checked = rawData.value?.total_penjualan[0]?.total_penjualan
  let num_string = ''
  if (errorPage && data_checked !== null && data_checked !== undefined) {
    let data = data_checked.toString()
    if (data.length <= 15 && data.length > 12) {
      num_string = Math.round(rawData.value.total_penjualan[0].total_penjualan / (Math.pow(10, 12))).toString() + " T"
    } else if (data.length <= 12 && data.length > 9) {
      num_string = Math.round(rawData.value.total_penjualan[0].total_penjualan / (Math.pow(10, 9))).toString() + " M"
    } else if (data.length <= 9) {
      num_string = Math.round(rawData.value.total_penjualan[0].total_penjualan / (Math.pow(10, 6))).toString() + " Jt"
    }
    return num_string
  } else {
    return num_string
  }
})

const tidakSiap = () => {
  modal.value.show = true
  modal.value.message = "Mohon maaf, fitur belum siap"
  modal.value.type = 'WARNING'
}

</script>

<style scoped>
.card-border {
  border: solid 1px #CCC9D4;
}
</style>