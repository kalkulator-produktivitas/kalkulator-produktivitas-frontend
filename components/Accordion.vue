<template>
  <div class="border border-black h-[50px]">
    <button @click="toggleAccordion()" class="flex items-center" :aria-expanded="isOpen"
      :aria-controls="`collapse${props.accordId}`">
      <!-- <slot name="title" /> -->
      <div class="columns-4 flex text-nowrap text-left">
        <p class="w-[300px] ">{{ props.perusahaan.nama_perusahaan }}</p>
        <!-- <p class="w-[200px]">{{ props.perusahaan.jumlah_laporan }}</p>
        <p class="w-[150px]">{{ props.perusahaan.tahun_berdiri }}</p>
        <p class="w-[250px]">{{ props.perusahaan.email_user }}</p> -->
      </div>
      <svg class="w-3 ml-4 transition-all duration-200 transform" :class="{
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-show="isOpen" :id="`collapse${props.accordId}`" class="mt-2 flex">
      <!-- <slot name="content" /> -->
      <div class="w-[50%]">
        <table class="table-auto mx-auto">
          <thead>
            <tr class="bg-slate-500 text-white">
              <!-- <th class="w-[40px]">No.</th> -->
              <th class="w-[200px]">Tahun Laporan</th>
              <!-- <th class="w-[200px]">Nilai Tambah</th>
              <th class="px-8">Status</th>
              <th class="px-8"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comp, index) in props.perusahaan.data" :key="index"
              :class="index % 2 === 1 ? 'bg-slate-200' : ''">
              <!-- <td class="text-center">{{ index + 1 }}</td> -->
              <td class="text-center">{{ comp.tahun_laporan }}</td>
              <!-- <td class="text-center">{{ comp.nilai_tambah }}</td>
              <td class="text-center">{{ comp.status_laporan }}</td> -->
              <td class="text-center text-blue-400"><a href="#">Detail</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-[15%] flex items-center">
        <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold px-4 text-center rounded-md transition py-2 ease-in-out"
          @click="someFunc">
          Lihat Seluruhnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(["accordId", "perusahaan"])

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
}

const someFunc = () => {
  prompt("Not ready yet")
}
</script>