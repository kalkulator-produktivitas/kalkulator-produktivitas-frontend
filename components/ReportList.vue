<template>
  <div class="px-2 py-3 border-b-2 text-lg grid grid-cols-12 items-center">
    <div class="ml-2 col-span-1">{{ year }}</div>
    <div class="col-span-5">{{ title }}</div>
    <div class="col-span-3 lg:col-span-2">{{ created_time }}</div>
    <div class="col-span-3 lg:col-span-4 flex flex-col lg:flex-row gap-2 justify-center">
      <button @click="checkReport"
        class="bg-blue-500 hover:bg-blue-700 text-white mx-auto w-[70%] lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
        <Icon name="fe:eye" class="lg:mr-1 collapse lg:visible" />
        View
      </button>
      <button @click="exrpotCsv"
        class="bg-blue-500 hover:bg-blue-700 text-white mx-auto w-[70%] lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
        <Icon name="fe:download" class="lg:mr-1 collapse lg:visible" />
        Download
      </button>
      <button @click="$emit('notReady')"
        class="bg-blue-500 hover:bg-blue-700 text-white mx-auto w-[70%] lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
        <Icon name="fe:link-external" class="lg:mr-1 collapse lg:visible" />
        Certificate
      </button>
    </div>
    <!-- {{ id }} -->
  </div>
</template>

<script setup>
const global = useRuntimeConfig();
const router = useRouter()

const props = defineProps({
  year: Number,
  title: String,
  reportId: String,
  reported_at: Number,
  id: String,
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const created_time = computed(() => {
  const d = new Date(0);
  let rp = props.reported_at / 1000
  d.setUTCSeconds(rp);
  let month = months[d.getUTCMonth()]; //months from 1-12
  let day = d.getUTCDate();
  let year = d.getUTCFullYear();
  return `${day} ${month} ${year}`
})

const startDownload = (input) => {
  const blob = new Blob([input], { type: 'application/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = `Laporan_${props.year}.csv`
  a.href = url;
  a.style.display = 'none'

  document.body.appendChild(a);
  a.click();
  a.remove()
  URL.revokeObjectURL(url)
}

const exrpotCsv = async () => {
  try {
    const data = await $fetch(`http://localhost:2020/read/download-csv`,
      {
        method: "GET",
        query: {
          id: props.id
        }
      })
    let header = `params,${props.year},details`
    let str = Object.keys(data[0]).map(key => {
      switch (key) {
        case 'id_laporan':
          return ''
        case 'pertanyaan_1':
          return `${key},${data[0][key]},Teknik dan metode apa saja yang sudah diterapkan perusahaan untuk meningkatkan produktivitas`
        case 'pertanyaan_2':
          return `${key},${data[0][key]},Apa saja Kebijakan pimpinan perusahaan dalam rangka mendorong peningkatan produktivitas perusahaan dan tenaga kerja?`
        case 'pertanyaan_3':
          return `${key},${data[0][key]},Pada tiga tahun terakhir ini apakah perusahaan anda meningkat atau menurun kemajuan atau produktivitasnya?`
        case 'pertanyaan_4':
          return `${key},${data[0][key]},Jika terjadi peningkatan kemajuan /produktivitas perusahaan apa saja penyebabnya?`
        case 'pertanyaan_5':
          return `${key},${data[0][key]},Dan jika terjadi penurunan kemajuan/produktivitas perusahaan apa saja penyebabnya?`
        case 'produktivitas_tenaga_kerja_1':
          return `${key},${data[0][key]},Kontribusi/Sumbangan rata-rata Tenaga Kerja dalam menciptakan Nilai Tambah`
        case 'produktivitas_tenaga_kerja_2':
          return `${key},${data[0][key]},Kontiribusi/Sumbangan rata-rata setiap jam tenaga kerja dalam bekerja dalam menciptakan nilai tambah`
        case 'produktivitas_tenaga_kerja_3':
          return `${key},${data[0][key]},Hasil kemampuan mendayagunakan tenaga kerja dari setiap satu rupiah yang dibayarkan kepada tenaga kerja dalam melipatgandakan penciptaan nilai tambah`
        case 'produktivitas_tenaga_kerja_4':
          return `${key},${data[0][key]},Nilai rupiah yang dibayarkan kepada tenaga kerja setiap jam`
        case 'produktivitas_modal_1':
          return `${key},${data[0][key]},Kemampuan perusahaan dalam menciptakan penjualan melalui pendayagunaan modal`
        case 'produktivitas_modal_2':
          return `${key},${data[0][key]},Kemampuan perusahaan dalam menciptakan nilai tambah dalam pendayagunaan modal`
        case 'produktivitas_modal_3':
          return `${key},${data[0][key]},Nilai aset yang dihandel/didayagunakan oleh rata-rata setiap orang tenaga kerja dalam perusahaan`
        case 'profitabilitas_1':
          return `${key},${data[0][key]},Tingkat Efisiensi penggunaan bahan-bahan dan jasa dalam menciptakan pendapatan perusahaan`
        case 'profitabilitas_2':
          return `${key},${data[0][key]},Perbandingan antara nilai bersih yang didapatkan perusahaan dengan sejumlah biaya yang dikeluarkan untuk membayar bahan & jasa`
        case 'profitabilitas_3':
          return `${key},${data[0][key]},Kemampuan pendayagunaan modal dalam menciptakan laba perusahaan sekaligus sebagai ukuran kemampuan perusahaan mengembalikan modal yang dioperasikan`
        case 'rasio_pendukung_1':
          return `${key},${data[0][key]},Tingkat efisiensi proses pembuatan produk terhadap bahan dan jasa dalam rangka pembuatan produk akhir`
        case 'rasio_pendukung_2':
          return `${key},${data[0][key]},Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa`
        case 'rasio_pendukung_3':
          return `${key},${data[0][key]},Ukuran kemampuan melipatgandakan biaya tenaga kerja yg dibayarkan dalam menghasilkan laba perusahaan`
        default:
          return `${key},${data[0][key]},`
      }
      // key !== 'id_laporan' ? `${key},${data[0][key]},` : '';
      // key
    }
    ).join("\n");
    const csv = header + str
    // console.log(csv);
    startDownload(csv)
    // reports.value = data
    // loading.value = false
  } catch (error) {
    // console.log(error);
    loading.value = false
    modal.value.show = true
    modal.value.message = "Gagal Memuat Data"
    modal.value.status = 500
    modal.value.type = 'ERROR'
  }
}

const checkReport = () => {
  const link = `/report/${props.reportId}`
  const report_id = props.reportId
  // const apiLink = `${global.public.baseURL}/api/getdata/${props.reportId}`
  return router.push({ path: `/app/report/${report_id}` })
}

</script>

<style scoped></style>