<template>
  <div class="container max-w h-full">
    <p class="text-xl">Report ID: {{ id }}</p>
    <!-- <button @click="formRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Send Request
    </button>
    <button @click="getRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Get Request
    </button> -->
    <div class="grid grid-cols-5 mt-4 h-full">
      <div class="col-span-1">
        <ul class="flex list-none flex-col flex-wrap border-b-0 border-r-2 pl-0">
          <li v-for="tabName in tabList" class="mr-2">
            <button class="inline-block px-4 py-3" @click="tab = tabName"
              :class="tab === tabName ? 'text-blue-600 border-l-2 border-blue-600 active' : 'border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300'">{{
                tabName }}</button>
          </li>
        </ul>
      </div>
      <div class="col-span-3 h-full overflow-y-auto">
        <InputField2 v-for="param in parameters[tab]" :label="param" type="number" disabled="True" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params
const tab = ref('Biaya Tenaga Kerja')
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



const { data, pending, error, refresh } = await useFetch('http://localhost:2020/read');

const param1 = ref(data)

async function formRequest() {
  try {
    const { data } = await useFetch('http://localhost:2020/read', {
    });
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
}

async function getRequest() {
  try {
    const res = await fetch('http://localhost:2020/write', {
    });;
    const data = await res.json()
    console.log(data);
  } catch (error) {
    console.log(error);
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