<template>
  <div
    class="border border-black rounded-lg flex flex-col m-2 p-6 max-w-[600px] flex-initial h-fit bg-white shadow-md transition"
    :class="isOpen ? 'absolute scale-105 z-20 position-up' : 'static'">
    <button @click="toggleAccordion(props.perusahaan.id_perusahaan)" class="flex items-center" :aria-expanded="isOpen"
      :aria-controls="`collapse${props.perusahaan.id_perusahaan}`">
      <div class="text-nowrap text-left">
        <p class="w-[300px] text-lg font-bold">{{ props.perusahaan.nama_perusahaan }}</p>
      </div>
      <svg class="w-3 ml-4 transition-all duration-200 transform" :class="{
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="isOpen" :id="`collapse${props.accordId}`" class="mt-2 flex flex-col transition">
      <div class="w-full relative">
        <table v-if="loaded" class="table-fixed w-full border border-transparent border-t-black border-b-black">
          <tbody>
            <tr v-for="comp of Object.keys(detail_perushaan)" :key="index" :class="index % 2 === 1 ? 'bg-slate-200' : ''">
              <td class="text-left w-[40%]">{{ comp }}</td>
              <td class="text-left truncate">{{ detail_perushaan[comp] }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <div role="status" class="my-auto text-center">
            <svg aria-hidden="true"
              class="inline w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-green-600"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
            <p class="mt-2 text-4xl font-bold text-white">{{ text }}</p>
          </div>
        </div>
      </div>
      <div class="mt-4 mx-auto">
        <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold px-4 text-center rounded-md transition py-1 ease-in-out"
          @click="someFunc">
          Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(["accordId", "perusahaan"])
import getAPI from '@/composables/apiCalls'
const { getter } = getAPI()

const isOpen = ref(false)

const loaded = ref(false)

const detail_perushaan = ref({
  'Jumlah Laporan': 3,
  'Laporan Pending': 0,
  'Tahun Berdiri': undefined,
  'Email User': "",
  'Tanggal Daftar': undefined,
  'Nama Pimpinan': "",
})

const toggleAccordion = async (params) => {
  isOpen.value = !isOpen.value;
  if (loaded.value === false) {
    const res = await getter("/admin/compdata", '', { id: params })
    detail_perushaan.value['Tahun Berdiri'] = res.data.tanggal_pendirian.slice(0, 4)
    detail_perushaan.value['Email User'] = res.data.email_user
    detail_perushaan.value['Tanggal Daftar'] = (new Date(res.data.tanggal_registrasi).toISOString()).slice(0, 10)
    detail_perushaan.value['Nama Pimpinan'] = res.data.nama_pimpinan
    loaded.value = true
  }
}


const someFunc = () => {
  prompt("Not ready yet")
}
</script>

<style scoped>
.position-up {
  position: absolute;
}
</style>