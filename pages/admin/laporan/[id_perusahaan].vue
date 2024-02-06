<template>
  <div v-if="!loading" class="h-full flex gap-6 content-between">
    <div class="h-[100%] overflow-y-auto w-max-[800px]">
      <!-- <table style="width: fit-content;"
        class="border-separate border-spacing-x-[1px] border-spacing-y-[1px] border border-[0.5px] border-slate-600 table-fixed bg-white rounded-md bg-slate-600 shadow-md overflow-x-auto">
        <thead class="text-black">
          <tr class="">
            <th class="w-[200px]">Parameter</th>
            <th class="w-[150px]">2020</th>
            <th class="w-[150px]">2021</th>
            <th class="w-[150px]">2022</th>
          </tr>
        </thead>

        <tbody v-for="param of Object.keys(parameters)">
          <tr class="text-black bg-gray-200" v-if="param !== 'Jumlah Tenaga Kerja'">
            <th colspan="4">{{ param }}</th>
          </tr>
          <tr class="bg-white" v-for="par of Object.keys(parameters[param])" v-if="param !== 'Jumlah Tenaga Kerja'">
            <td class="">{{ par }}</td>
            <td class="text-right" v-for="values in parameters[param][par]">{{ rupiahFormatter(values) }}</td>
          </tr>
        </tbody>
      </table> -->
      <p class="text-4xl font-bold">PT. BOCIL TANTRUM</p>
    </div>
    <div class="h-[100%] overflow-y-auto w-[45%]">
      <div class="overflow-x-auto w-full">
        <table style="width: fit-content;"
          class="border-separate border-spacing-x-[1px] border-spacing-y-[1px] border border-[0.5px] border-slate-600 bg-white rounded-md bg-slate-600 shadow-md table-fixed">
          <thead class="text-black">
            <tr class="">
              <th class="w-[200px]">Parameter</th>
              <th class="w-[60px]">2020</th>
              <th class="w-[60px]">2021</th>
              <th class="w-[60px]">2022</th>
            </tr>
          </thead>

          <tbody v-for="param of Object.keys(parameters)">
            <tr class="text-black bg-gray-200" v-if="param === 'Jumlah Tenaga Kerja'">
              <th colspan="7">{{ param }}</th>
            </tr>
            <tr class="bg-white" v-for="par of Object.keys(parameters[param])" v-if="param === 'Jumlah Tenaga Kerja'">
              <td class="">{{ par }}</td>
              <td class="text-right" v-for="values in parameters[param][par]">{{ values }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="overflow-x-auto w-full mt-8">
        <table style="width: fit-content;"
          class="border-separate border-spacing-x-[1px] border-spacing-y-[0px] border border-[0.5px] border-slate-600 bg-white rounded-md bg-slate-600 shadow-md table-fixed">
          <thead class="text-black">
            <tr class="">
              <th class="w-[300px]">Pertanyaan</th>
              <th class="w-[220px]">Jawaban</th>
            </tr>
          </thead>

          <tbody v-for="question in informasi_tambahan">
            <tr class="bg-white">
              <td class="text-sm border-t border-b">{{ question.question }}</td>
              <td class="text-sm border-t border-b">{{ question.jawaban }}</td>
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

const perusahaan = [
  {
    nama_perusahaan: "PT. Trisakti Dwiwarna",
    jumlah_laporan: 3,
    tahun_berdiri: 2010,
    email_user: "ahmad.sahroni@gmail.com",
    data: [
      {
        nilai_tambah: 2350226879,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2017
      },
      {
        nilai_tambah: 2350226456,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2018
      },
      {
        nilai_tambah: 2323543568,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2019
      },
    ]
  },
  {
    nama_perusahaan: "PT. Trisakti Triwarna",
    jumlah_laporan: 3,
    tahun_berdiri: 2010,
    email_user: "ahmad.jokowidodo@gmail.com",
    data: [
      {
        nilai_tambah: 2350226879,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2017
      },
      {
        nilai_tambah: 2350226456,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2018
      },
      {
        nilai_tambah: 2323543568,
        status_laporan: "ACCEPTED",
        tahun_laporan: 2019
      },
    ]
  },
]

let parameters = ref({
  'Penjualan dan Modal': { 'Penjualan': [10000, 2033000, 5000000], 'Modal Operasi': [10000, 2033000, 5000000], 'Investasi': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000] },
  'Biaya Tenaga Kerja': { 'Upah dan Gaji (Termasuk Direksi)': [10000, 2033000, 5000000], 'Dana Pensiun': [10000, 2033000, 5000000], 'Tunjangan-tunjangan Tenaga Kerja': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000] },
  'Bahan Yang Digunakan': {
    'Barang dan jasa yang dibeli': [10000, 2033000, 5000000],
    'Barang yang digunakan': [10000, 2033000, 5000000],
    'Bahan Baku': [10000, 2033000, 5000000],
    'Bahan pengemas': [10000, 2033000, 5000000],
    'Total': [10000, 2033000, 5000000]
  },
  'Overhead Produksi': {
    'Pekerjaan Subkontrak': [10000, 2033000, 5000000], 'Sewa': [10000, 2033000, 5000000], 'Air dan Listrik': [10000, 2033000, 5000000], 'Asuransi Perusahaan': [10000, 2033000, 5000000], 'Biaya Transport': [10000, 2033000, 5000000],
    'Pemeliharaan Mesin': [10000, 2033000, 5000000], 'Biaya Supplies dan gudang': [10000, 2033000, 5000000], 'Biaya lain-lain': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000]
  },
  'Bunga Pinjaman': {
    'Bunga Pinjaman Jangka Pendek': [10000, 2033000, 5000000],
    'Bunga Pinjaman Jangka Panjang': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000]
  },
  'Biaya Administrasi': {
    'Sewa': [10000, 2033000, 5000000], 'Air dan Listrik': [10000, 2033000, 5000000], 'Telepon': [10000, 2033000, 5000000],
    'Pos dan telegram': [10000, 2033000, 5000000], 'Percetakan, Stationary & Office Supplies': [10000, 2033000, 5000000],
    'Biaya Kendaraan': [10000, 2033000, 5000000], 'Advertising': [10000, 2033000, 5000000], 'Hiburan / Entertainment': [10000, 2033000, 5000000],
    'Majalah dan surat kabar': [10000, 2033000, 5000000], 'Jamuan Makan': [10000, 2033000, 5000000], 'Perbaikan Umum': [10000, 2033000, 5000000],
    'Biaya Bank': [10000, 2033000, 5000000], 'Biaya Akuntan dan Audit': [10000, 2033000, 5000000], 'Biaya	Bantuan	Hukum dan Jasa Profesional lainnya': [10000, 2033000, 5000000]
  },
  'Penyusutan': { 'Penyusutan Gedung': [10000, 2033000, 5000000], 'Penyusutan Peralatan dan Mesin': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000] },
  'Pajak': { 'Pajak Penghasilan': [10000, 2033000, 5000000], 'Pajak Kekayaan': [10000, 2033000, 5000000], 'Pajak Upah': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000] },
  'Aktiva Perusahaan': {
    'Kas dan Bank': [10000, 2033000, 5000000], 'Persediaan': [10000, 2033000, 5000000], 'Piutang Dagang': [10000, 2033000, 5000000], 'Piutang Lain - Lain': [10000, 2033000, 5000000],
    'Tanah': [10000, 2033000, 5000000], 'Gedung': [10000, 2033000, 5000000], 'Mesin dan Peralatan': [10000, 2033000, 5000000], 'Aktiva Tetap Lainnya': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000]
  },
  'Laba': { 'Laba Bersih': [10000, 2033000, 5000000], 'Laba Operasi': [10000, 2033000, 5000000], 'Total': [10000, 2033000, 5000000] },
  'Jumlah Tenaga Kerja': { 'Jumlah Tenaga Kerja': [1, 2, 3], 'Jam Kerja': [10000, 2000, 3000], 'Jam Kerja Lembur': [10000, 20330, 3000] },
})

const informasi_tambahan = ref([
  { id: "pertanyaan_1", jawaban: "Lorem", question: 'Teknik, metode apa saja yang sudah diterapkan perusahaan untuk meningkatkan produktivitas' },
  { id: "pertanyaan_2", jawaban: "Lorem", question: 'Apa saja Kebijakan pimpinan perusahaan dalam rangka mendorong peningkatan produktivitas perusahaan dan tenaga kerja?' },
  { id: "pertanyaan_3", jawaban: "Lorem", question: 'Pada tiga tahun terakhir ini apakah perusahaan anda meningkat atau menurun kemajuan atau produktivitasnya?' },
  { id: "pertanyaan_4", jawaban: "Lorem", question: 'Jika terjadi peningkatan kemajuan /produktivitas perusahaan, apa saja penyebabnya?' },
  { id: "pertanyaan_5", jawaban: "Lorem", question: 'Dan jika terjadi penurunan kemajuan/produktivitas perusahaan, apa saja penyebabnya?' }
])

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
</style>