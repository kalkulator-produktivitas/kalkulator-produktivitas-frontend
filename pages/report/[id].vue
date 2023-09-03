<template>
  <div class="container max-w h-full">
    <p class="text-xl">Report ID: {{ id }} {{ param1 }}</p>
    <button @click="formRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Send Request
    </button>
    <button @click="getRequest"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-1 px-4 rounded-full w-32 h-9">
      Get Request
    </button>
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
const tabList = ref(['Biaya Tenaga Kerja', 'Bahan Yang Digunakan', 'Overhead Produksi', 'Bunga Pinjaman',
  'Biaya Administrasi', 'Penyusutan', 'Pajak', 'Aktiva Perusahaan', 'Laba', 'Modal Operasi', 'Jumlah Tenaga Kerja', 'Jam Kerja']
)
const parameters = ref({
  'Biaya Tenaga Kerja': ['Upah dan Gaji (Termasuk Direksi)', 'Dana Pensiun', 'Tunjangan-tunjangan Tenaga Kerja'],
  'Bahan Yang Digunakan': ['Barang dan jasa yang dibeli', 'Barang yang digunakan', 'Bahan Baku', 'Bahan pengemas'],
  'Overhead Produksi': ['Pekerjaan subkontrak', 'Sewa', 'Air dan Listrik', 'Asuransi Perusahaan', 'Biaya Transport', 'Pemeliharaan Mesin', 'Biaya Supplies dan gudang', 'Biaya lain-lain'],
  'Bunga Pinjaman': [
    'Bunga Pinjaman Jangka Pendek',
    'Bunga Pinjaman Jangka Panjang'],
  'Biaya Administrasi': ['Sewa', 'Air dan Listrik', 'Telepon',
    'Pos dan telegram', 'Percetakan, Stationary & Office Supplies',
    'Biaya Kendaraan', 'Advertising', 'Hiburan / Entertainment',
    'Majalah dan surat kabar', 'Jamuan Makan', 'Perbaikan Umum',
    'Biaya Bank', 'Biaya Akuntan dan Audit', 'Biaya	Bantuan	Hukum & Jasa Profesional lainnya', 'Komisi', 'Biaya Umum'],
  'Penyusutan': ['Penyusutan Gedung', 'Penyusutan Peralatan dan Mesin'],
  'Pajak': ['Pajak Penghasilan', 'Pajak Kekayaan', 'Pajak Upah'],
  'Aktiva Perusahaan': ['Kas dan Bank', 'Persediaan', 'Piutang Dagang', 'Piutang Lain - Lain', 'Tanah', 'Gedung', 'Mesin dan Peralatan', 'Aktiva Tetap Lainnya'],
  'Laba': ['Laba Bersih', 'Laba Operasi'],
  'Modal Operasi': ['Modal Operasi'],
  'Jumlah Tenaga Kerja': ['Jumlah Tenaga Kerja'],
  'Jam Kerja': ['Jam Kerja']
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