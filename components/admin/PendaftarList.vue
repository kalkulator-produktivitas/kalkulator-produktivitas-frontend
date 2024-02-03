<template>
  <div class="px-2 py-1 border-b-2 text-lg grid grid-cols-12 items-center">
    <div class="col-span-3">{{ nama_perusahaan }}</div>
    <div class="col-span-1">{{ tahun_daftar }}</div>
    <div class="col-span-2">{{ nama_user }}</div>
    <div class="col-span-3">
      <p>{{ email }}</p>
      <p>{{ kontak }}</p>
    </div>
    <div class="">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white mx-auto lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center my-1">
        <Icon name="fe:check" class="lg:mr-1 collapse lg:visible" />
        Approve
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white mx-auto lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center my-1">
        <Icon name="fe:close" class="lg:mr-1 collapse lg:visible" />
        Reject
      </button>
    </div>

  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  <Loading v-if="loading" text="Memuat Data" />
</template>

<script setup>
const global = useRuntimeConfig();
const router = useRouter()

const props = defineProps({
  nama_perusahaan: String,
  tahun_daftar: Number,
  nama_user: String,
  email: String,
  kontak: String,
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



</script>

<style scoped></style>