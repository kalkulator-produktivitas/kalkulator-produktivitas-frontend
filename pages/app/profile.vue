<template>
  <div v-if="!errorPage" class="grid grid-cols-2 gap-12 profile-page">
    <div class="max-w static rounded shadow-lg bg-[#F6F6F6] card-border h-full">
      <div class="relative">
        <CardLabel label="Profil Perusahaan" />
      </div>
      <div class="px-6 py-2 mt-2 overflow-hidden h-full overflow-y-auto">
        <div class="flex">
          <InputField1 label="Nama Perusahaan" wide="480" type="text" disabled="true"
            :modelValue="company.nama_perusahaan" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telpon/Fax">
            Telpon/Fax
          </label>
          <div class="rounded">
            <input
              class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              value="+62" disabled readonly type="text" style="width: 50px">
            <input
              class="shadow appearance-none border border-l-0 rounded-r py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              :value="company.telp_fax" disabled readonly type="text" id="Telpon/Fax">
          </div>
        </div>
        <div class="flex gap-6">
          <InputField1 label="Nama Pemilik" wide="480" type="text" disabled="true"
            :modelValue="company.nama_pemilik_perusahaan" />
          <InputField1 label="Nama Pimpinan" wide="480" type="text" disabled="true" :modelValue="company.nama_pimpinan" />
        </div>

        <InputField1 label="Alamat Perusahaan" type="text" disabled="true" :modelValue="company.alamat_perusahaan" />
        <InputField1 label="Alamat Pabrik" type="text" disabled="true" :modelValue="company.alamat_pabrik" />

        <div class="flex gap-6">
          <InputField1 label="Email Perusahaan" wide="300" type="text" disabled="true"
            :modelValue="company.email_perusahaan" />
          <InputField1 label="Tanggal Pendirian" wide="300" type="text" disabled="true"
            :modelValue="company.tanggal_pendirian" />
        </div>

        <div class="flex gap-6">
          <InputField1 label="Website Perusahaan" wide="400" type="text" disabled="true"
            :modelValue="company.website_perusahaan" />
          <!-- <button
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold text-sm py-1 px-4 rounded-full w-36 h-9 mt-7">
            Bidang Usaha
          </button> -->
        </div>

      </div>
    </div>

    <div class="static grid grid-rows-2 gap-12">
      <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <div class="relative">
          <CardLabel label="Profil User" />
        </div>
        <div class="px-6 py-4 mt-2">
          <InputField1 label="Kontak Person" type="text" disabled="true" :modelValue="company.kontak_person" />
          <InputField1 label="Nama Pengguna" type="text" disabled="true" :modelValue="company.nama_user" />
          <InputField1 label="Email Pengguna" type="text" disabled="true" :modelValue="company.email_user" />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nmr">
              Kontak Pengguna
            </label>
            <div class="rounded">
              <input
                class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" disabled readonly style="width: 50px">
              <input
                class="shadow appearance-none border border-l-0 rounded-r py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                :value="company.kontak_user" disabled readonly id="nmr">
            </div>
          </div>
        </div>

      </div>
      <div class="max-w static overflow">
        <div class="row-span-2 flex flex-row gap-16 justify-center content-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
            Edit
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth']
});
const global = useRuntimeConfig();

const errorPage = ref(false)
const loading = ref(true)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

let rawData = ref()

try {
  const response = await $fetch(`${global.public.baseURL}/read/dataperusahaan?id=${authUser.value.data.id_perusahaan}`, {
    method: 'GET'
  })
  rawData.value = response
} catch (error) {
  console.log(error);
  errorPage.value = true
  loading.value = false
  modal.value.show = true
  modal.value.message = "Gagat Memuat Data"
  modal.value.status = 500
  modal.value.type = 'ERROR'
}

const company = ref({
  "id_perusahaan": rawData.value["id_perusahaan"],
  "tanggal_registrasi": rawData.value["tanggal_registrasi"],
  "nama_perusahaan": rawData.value["nama_perusahaan"],
  "nama_pemilik_perusahaan": rawData.value["nama_pemilik_perusahaan"],
  "nama_pimpinan": rawData.value["nama_pimpinan"],
  "alamat_perusahaan": rawData.value["alamat_perusahaan"],
  "telp_fax": rawData.value["telp_fax"],
  "alamat_pabrik": rawData.value["alamat_pabrik"],
  "tanggal_pendirian": rawData.value["tanggal_pendirian"],
  "klasifikasi_usaha": rawData.value["klasifikasi_usaha"],
  "kontak_person": rawData.value["kontak_person"],
  "email_perusahaan": rawData.value["email_perusahaan"],
  "website_perusahaan": rawData.value["website_perusahaan"],
  "username": rawData.value["username"],
  "nama_user": rawData.value["nama_user"],
  "email_user": rawData.value["email_user"],
  "kontak_user": rawData.value["kontak_user"]
})


// try {
//   const data = await $fetch(`${global.public.baseURL}/read/dataperusahaan`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//     query: { 'id': authUser.id_perusahaan }
//   })
//   company.value = data
//   console.log(data);
// } catch (error) {
//   console.log(error);
//   company.value = false
//   navigateTo('/error')
// }

</script>

<style scoped>
.card-border {
  border: solid 1px #CCC9D4;
}

.card-border {
  max-height: 85vh;
}
</style>