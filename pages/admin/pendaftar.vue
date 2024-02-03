<template>
  <div v-if="!loading" class="h-full">
    <div class="mt-4 px-2 py-2 border-black border-b-2 text-lg grid grid-cols-12 items-center">
      <div class="col-span-3">Nama Perusahan</div>
      <div class="col-span-1">Daftar</div>
      <div class="col-span-2">Nama User</div>
      <div class="col-span-3">Kontak</div>
      <div class="col-span-2">Action</div>
      <!-- <div class="col-span-4 flex gap-2 justify-center">
      </div> -->
    </div>
    <div class="container my-2 mx-auto">
      <div class="">
        <AdminPendaftarList v-for="rep of dummy" :nama_perusahaan="rep.nama_perusahaan" :tahun_daftar="rep.tahun_daftar"
          :nama_user="rep.nama_user" :email="rep.email_user" :kontak="rep.telpon" @not-ready="tidakSiap" />
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

const dummy = [{
  nama_perusahaan: "PT. Karbitan Lestari",
  tahun_daftar: 2010,
  nama_user: "Ahmad Sahroni",
  email_user: "ahmad.sahroni@gmail.com",
  telpon: "08545651231356"
}]

</script>
  
<style scoped></style>