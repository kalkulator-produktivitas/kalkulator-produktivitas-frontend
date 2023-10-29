<template>
  <div class="px-2 py-3 border-b-2 text-lg grid grid-cols-12 items-center">
    <div class="ml-2 col-span-1">{{ year }}</div>
    <div class="col-span-5">{{ title }}</div>
    <div class="col-span-3 lg:col-span-2">{{ created_time }}</div>
    <div class="col-span-3 lg:col-span-4 flex flex-col lg:flex-row gap-4 justify-left">
      <div class="w-[30%]">
        <button @click="checkReport"
          class="bg-blue-500 hover:bg-blue-700 text-white mx-auto lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
          <Icon name="fe:eye" class="lg:mr-1 collapse lg:visible" />
          View
        </button>
      </div>
      <div class="w-[30%]">
        <button @click="exrpotCsv"
          class="bg-blue-500 hover:bg-blue-700 text-white mx-auto lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
          <Icon name="fe:download" class="lg:mr-1 collapse lg:visible" />
          Download
        </button>
      </div>
      <PdfGenerator v-if="calculation !== 'first year'" class="w-[30%]"
        :analysis="{ year: props.year, id_laporan: props.reportId, result: calculation }" />
    </div>
  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  <Loading v-if="loading" text="Memuat Data" />
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
  performance: Array
})

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

const loading = ref(false)
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
    const data = await $fetch(`${global.public.baseURL}/read/download-csv`,
      {
        method: "GET",
        headers: {
          "x-api-authorization": JSON.stringify(authUser.value)
        },
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
    startDownload(csv)
  } catch (error) {
    loading.value = false
    modal.value.show = true
    modal.value.message = "Gagal Memuat Data"
    modal.value.status = 500
    modal.value.type = 'ERROR'
  }
}

const calculation = computed(() => {
  const currentReport = props.performance.filter(d => d.tahun_laporan === props.year)[0]

  let allYear = props.performance.map(d => d.tahun_laporan)

  let lastReport
  if (allYear[0] === props.year) {
    const nilaiTambah = currentReport.nilai_tambah
    const kenaikan1 = 0
    const kenaikan2 = 0
    const kenaikan3 = 0
    const kenaikan4 = 0

    const kenaikan_modal = 0
    const kenaikan_profitabilitas = 0
    return {
      fy: true,
      nt: nilaiTambah,
      pr1: currentReport.produktivitas_tenaga_kerja_1,
      kn1: kenaikan1,
      kn2: kenaikan2,
      kn3: kenaikan3,
      kn4: kenaikan4,
      knm: kenaikan_modal,
      knp: kenaikan_profitabilitas
    }
  } else {
    lastReport = props.performance.filter(d => d.tahun_laporan === (props.year - 1))[0]
    const nilaiTambah = currentReport.nilai_tambah
    const kenaikan1 = (currentReport.produktivitas_tenaga_kerja_1 - lastReport.produktivitas_tenaga_kerja_1) / lastReport.produktivitas_tenaga_kerja_1
    const kenaikan2 = (currentReport.produktivitas_tenaga_kerja_2 - lastReport.produktivitas_tenaga_kerja_2) / lastReport.produktivitas_tenaga_kerja_2
    const kenaikan3 = (currentReport.produktivitas_tenaga_kerja_3 - lastReport.produktivitas_tenaga_kerja_3) / lastReport.produktivitas_tenaga_kerja_3
    const kenaikan4 = (currentReport.produktivitas_tenaga_kerja_4 - lastReport.produktivitas_tenaga_kerja_4) / lastReport.produktivitas_tenaga_kerja_4

    const kenaikan_modal = (currentReport.produktivitas_modal_1 - lastReport.produktivitas_modal_1) / lastReport.produktivitas_modal_1
    const kenaikan_profitabilitas = (currentReport.profitabilitas_1 - lastReport.profitabilitas_1) / lastReport.profitabilitas_1

    return {
      fy: false,
      nt: nilaiTambah,
      pr1: currentReport.produktivitas_tenaga_kerja_1,
      kn1: isFinite(kenaikan1) ? kenaikan1 : 100,
      kn2: isFinite(kenaikan2) ? kenaikan2 : 100,
      kn3: isFinite(kenaikan3) ? kenaikan3 : 100,
      kn4: isFinite(kenaikan4) ? kenaikan4 : 100,
      knm: isFinite(kenaikan_modal) ? kenaikan_modal : 100,
      knp: isFinite(kenaikan_profitabilitas) ? kenaikan_profitabilitas : 100
    }
  }
})

const checkReport = () => {
  const link = `/report/${props.reportId}`
  const report_id = props.reportId
  // const apiLink = `${global.public.baseURL}/api/getdata/${props.reportId}`
  return router.push({ path: `/app/report/${report_id}` })
}

</script>

<style scoped></style>