<template>
  <div v-if="!loading" class="h-full flex">
    <!-- <table class="table-fixed mb-4">
      <thead>
        <tr class="text-black text-left">
          <th class="w-[300px]">Nama Perusahaan</th>
          <th class="w-[200px]">Jumlah Laporan</th>
          <th class="w-[150px]">Tahun Berdiri</th>
          <th class="w-[200px]">Email</th>
        </tr>
      </thead>
    </table> -->

    <Accordion v-for="usaha of perusahaan" class="" :accord-id="10" :perusahaan="usaha">
    </Accordion>

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

// const dummy = [
//   {
//     nilai_tambah: 2350226879,
//     status_laporan: "ACCEPTED",
//     tahun_laporan: 2017
//   },
//   {
//     nilai_tambah: 2350226456,
//     status_laporan: "ACCEPTED",
//     tahun_laporan: 2018
//   },
//   {
//     nilai_tambah: 2323543568,
//     status_laporan: "ACCEPTED",
//     tahun_laporan: 2019
//   },
// ]

</script>

<style scoped></style>