<template>
  <div v-if="!loading || companies.length > 0" class="h-screen">
    <div class="flex flex-col overflow-y-scroll">
      <div class="px-12 pt-4 mx-auto ">
        <table class="table-fixed">
          <thead>
            <tr class="bg-slate-500 text-white">
              <th class="w-[40px]">No.</th>
              <th class="w-[400px]">Perusahaan</th>
              <th class="px-8">Tanggal Berdiri</th>
              <th class="px-8">Tanggal Daftar</th>
              <th class="px-8">Laporan Terakhir</th>
              <th class="px-8">Nilai Tambah Terakhir</th>
              <th class="px-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comp, index) in companies" :key="comp.id_perusahaan"
              :class="index % 2 === 1 ? 'bg-slate-200' : ''">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ comp.nama_perusahaan }}</td>
              <td class="text-center">{{ comp.tanggal_pendirian.slice(8) }} - {{ comp.tanggal_pendirian.slice(5, 7) }} -
                {{
                  comp.tanggal_pendirian.slice(0, 4) }}</td>
              <td class="text-center">{{ formatRegisterDate(comp.tanggal_registrasi) }}</td>
              <td class="text-center">{{ comp.tahun_laporan }}</td>
              <td>{{ rupiahFormatter(comp.nilai_tambah) }}</td>
              <td class="text-blue-400"><button
                  @click="nilaiTambahQuery(comp.id_perusahaan, comp.nama_perusahaan)">Detail</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Loading v-if="loading" text="Please wait...." />
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  <ModalsNilaiTambah v-if="tabelNilaiTambah.show" :data="tabelNilaiTambah.data" :nama="tabelNilaiTambah.nama"
    @tutup="closeTable" />
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});
const { rupiahFormatter } = useRupiahFormatter();
const global = useRuntimeConfig();
const loading = ref(true)

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

const tabelNilaiTambah = ref({
  show: false,
  data: [],
  nama: ''
})

const companies = ref([])

try {
  const res = await $fetch(`${global.public.baseURL}/admin/companies`,
    {
      method: "GET",
    })
  if (res.status && res.status >= 400) {
    errorPage.value = true
    loading.value = false
    modal.value.show = true
    modal.value.message = res.message
    modal.value.status = res.status
    modal.value.type = 'ERROR'
    if (process.client) {
      localStorage.removeItem("admin")
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
    companies.value = res
  }
} catch (error) {
  errorPage.value = true
  loading.value = false
  modal.value.show = true
  modal.value.message = "Gagat Memuat Data"
  modal.value.status = 501
  modal.value.type = 'ERROR'
}

const dataNilaiTambah = ref()

const closeModal = () => {
  modal.value.show = false
}

const closeTable = () => {
  tabelNilaiTambah.value.show = false
  dataNilaiTambah.value = null

}

const formatRegisterDate = (epoch) => {
  let date = new Date(epoch + (7 * 3600 * 1000)).toISOString();
  return date.slice(8, 10) + '-' + date.slice(5, 7) + '-' + date.slice(0, 4)
}

const tidakSiap = () => {
  modal.value.show = true
  modal.value.message = "Mohon maaf sekali, fitur belum siap"
  modal.value.type = 'NONE'
}

const nilaiTambahQuery = async (idCompany, nameCompany) => {
  loading.value = true
  try {
    const res = await $fetch(`${global.public.baseURL}/admin/companies-nt`,
      {
        method: "GET",
        params: {
          id: idCompany
        }
      })
    tabelNilaiTambah.value.nama = nameCompany
    setTimeout(() => {
      tabelNilaiTambah.value.data = res
      tabelNilaiTambah.value.show = true
      loading.value = false
    },
      500
    )
  } catch (error) {
    modal.value.show = true
    modal.value.message = "Mohon maaf sekali, fitur belum siap"
    modal.value.type = 'ERROR'
  }
}

// function toRupiah(price) {
//   // From price number 200000 to Rp200.000
//   let priceStr = Math.abs(price).toString();
//   let rupiah = ""
//   for (let i = priceStr.length - 1; i >= 0; i--) {
//     rupiah += priceStr[i]
//     let j = i - priceStr.length
//     if (i !== 0 && j % 3 === 0) {
//       rupiah += "."
//     }
//   }
//   // Reverse
//   let strArr = rupiah.split("");
//   rupiah = "";
//   for (let i = strArr.length - 1; i >= 0; i--) {
//     rupiah += strArr[i]
//   }
//   rupiah = "Rp " + rupiah
//   if (price < 0) {
//     rupiah = "(" + rupiah + ")"
//   }

//   return rupiah
// }

</script>

<style scoped></style>