<template>
  <div class="container max-w h-full">
    <!-- <p class="text-xl">Report ID: {{ id }}</p> -->
    <!-- <button @click="formRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Send Request
    </button>
    <button @click="getRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Get Request
    </button> -->
    <div class="grid grid-cols-5 mt-4 h-full mt-8">
      <div class="col-span-1">
        <ul class="flex list-none flex-col flex-wrap border-b-0 border-r-2 pl-0">
          <li v-for="tabName in tabList" class="mr-2">
            <button class="inline-block px-4 py-3" @click="tab = tabName"
              :class="tab === tabName ? 'text-blue-600 border-l-2 border-blue-600 active' : 'border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300'">{{
                tabName }}</button>
          </li>
        </ul>
      </div>
      <div v-if="loading" role="status" class="animate-pulse max-w-lg">
        <div v-for="param in Object.keys(parameters[tab])" class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32">
        </div>
      </div>
      <div v-else class="col-span-3 h-full overflow-y-auto">
        <InputField2 v-for="param in Object.keys(parameters[tab])" :label="param" type="text"
          :value="parameters[tab][param]" :disabled="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});
const { id } = useRoute().params
const global = useRuntimeConfig();

let loading = ref(true)


const { data: rawData, pending, error, refresh } = await useAsyncData(() => $fetch(`${global.public.baseURL}/read/api/getdata/${id}`))
// console.log(rawData.value);



const tab = ref('Biaya Tenaga Kerja')
const tabList = ref(['Penjualan dan Modal', 'Biaya Tenaga Kerja', 'Bahan Yang Digunakan', 'Overhead Produksi', 'Bunga Pinjaman',
  'Biaya Administrasi', 'Penyusutan', 'Pajak', 'Aktiva Perusahaan', 'Laba', 'Jumlah Tenaga Kerja', 'Informasi Tambahan'])
let parameters = ref({
  'Penjualan dan Modal': { 'Penjualan': rawData.value["penjualan"], 'Modal Operasi': rawData.value["modal_operasi"], 'Investasi': rawData.value["total_investasi"], 'Total': rawData.value["total_penjualan_dan_modal"] },
  'Biaya Tenaga Kerja': { 'Upah dan Gaji (Termasuk Direksi)': rawData.value["upah_dan_gaji_biaya_tenaga_kerja"], 'Dana Pensiun': rawData.value["dana_pensiun"], 'Tunjangan-tunjangan Tenaga Kerja': rawData.value["tunjangan_tenaga_kerja"], 'Total': rawData.value["total_biaya_tenaga_kerja"] },
  'Bahan Yang Digunakan': {
    'Barang dan jasa yang dibeli': rawData.value["barang_dan_jasa_yang_dibeli"],
    'Barang yang digunakan': rawData.value["barang_yang_digunakan"],
    'Bahan Baku': rawData.value["bahan_baku"],
    'Bahan pengemas': rawData.value["bahan_pengemas"],
    'Total': rawData.value["total_bahan_yang_digunakan"]
  },
  'Overhead Produksi': {
    'Pekerjaan Subkontrak': rawData.value["pekerjaan_subkontrak"], 'Sewa': rawData.value["sewa_overhead"], 'Air dan Listrik': rawData.value["air_dan_listrik_overhead"], 'Asuransi Perusahaan': rawData.value["asuransi_perusahaan"], 'Biaya Transport': rawData.value["biaya_transport"],
    'Pemeliharaan Mesin': rawData.value["pemeliharaan_mesin"], 'Biaya Supplies dan gudang': rawData.value["biaya_suplies_dan_gudang"], 'Biaya lain-lain': rawData.value["biaya_lain"], 'Total': rawData.value["total_overhead_produksi"]
  },
  'Bunga Pinjaman': {
    'Bunga Pinjaman Jangka Pendek': rawData.value["bunga_pinjaman_jangka_pendek"],
    'Bunga Pinjaman Jangka Panjang': rawData.value["bunga_pinjaman_jangka_panjang"], 'Total': rawData.value["total_bunga_pinjaman"]
  },
  'Biaya Administrasi': {
    'Sewa': rawData.value["sewa_administrasi"], 'Air dan Listrik': rawData.value["air_dan_listrik_administrasi"], 'Telepon': rawData.value["telepon"],
    'Pos dan telegram': rawData.value["pos_dan_telegram"], 'Percetakan, Stationary & Office Supplies': rawData.value["percetakan_stationary_dan_office_suplies"],
    'Biaya Kendaraan': rawData.value["biaya_kendaraan"], 'Advertising': rawData.value["advertising"], 'Hiburan / Entertainment': rawData.value["hiburan_entertaiment"],
    'Majalah dan surat kabar': rawData.value["majalah_dan_surat_kabar:"], 'Jamuan Makan': rawData.value["jamuan_makan"], 'Perbaikan Umum': rawData.value["perbaikan_umum"],
    'Biaya Bank': rawData.value["biaya_bank"], 'Biaya Akuntan dan Audit': rawData.value["biaya_akuntan_dan_audit"], 'Biaya	Bantuan	Hukum dan Jasa Profesional lainnya': rawData.value["biaya_bantuan_hukum_dan_jasa_profesional"], 'Komisi': rawData.value["komisi"], 'Biaya Umum': rawData.value["biaya_umum"], 'Total': rawData.value["total_biaya_administrasi"]
  },
  'Penyusutan': { 'Penyusutan Gedung': rawData.value["penyusutan_gedung"], 'Penyusutan Peralatan dan Mesin': rawData.value["penyusutan_peralatan_dan_mesin"], 'Total': rawData.value["total_penyusutan"] },
  'Pajak': { 'Pajak Penghasilan': rawData.value["pajak_penghasilan"], 'Pajak Kekayaan': rawData.value["pajak_kekayaan"], 'Pajak Upah': rawData.value["pajak_upah"], 'Total': rawData.value["total_pajak"] },
  'Aktiva Perusahaan': {
    'Kas dan Bank': rawData.value["kas_dan_bank"], 'Persediaan': rawData.value["persediaan"], 'Piutang Dagang': rawData.value["piutang_dagang"], 'Piutang Lain - Lain': rawData.value["piutang_lain"],
    'Tanah': rawData.value["tanah"], 'Gedung': rawData.value["gedung"], 'Mesin dan Peralatan': rawData.value["mesin_dan_peralatan"], 'Aktiva Tetap Lainnya': rawData.value["aktiva_tetap_lainnya"], 'Total': rawData.value["total_aktiva_perusahaan"]
  },
  'Laba': { 'Laba Bersih': rawData.value["laba_bersih"], 'Laba Operasi': rawData.value["laba_operasi"], 'Total': rawData.value["total_laba"] },
  'Jumlah Tenaga Kerja': { 'Jumlah Tenaga Kerja': rawData.value["jumlah_tenaga_kerja"], 'Jam Kerja': rawData.value["jumlah_jam_kerja"], 'Jam Kerja Lembur': rawData.value["jumlah_jam_lembur"] },
})

let data;




loading.value = false

// loading.value = false
// console.log(data.value);



// async function formRequest() {
//   try {
//     const { data } = await useFetch('http://localhost:2020/read', {
//     });
//     console.log(data.value);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getRequest() {
//   try {
//     const res = await fetch('http://localhost:2020/write', {
//     });;
//     const data = await res.json()
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
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