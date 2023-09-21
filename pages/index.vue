<template>
  <div class="flex flex-col">
    <Welcome id="home" />
    <div class="flex mb-4 mt-8 mx-auto">
      <div v-for="i in 5" :key="i" class="circle mx-2"></div>
    </div>
    <div class="flex flex-col mt-4">
      <div class="flex">
        <div class="w-[20%]"></div>
        <p class="text-4xl font-extrabold w-full text-[#1CA83B] h-10">Apa Itu Pengukuran Produktivitas?</p>
      </div>
      <div class="flex">
        <div class="w-[40%]"></div>
        <p class="font-normal w-[50%] mt-4 text-left text-xl">Pengukuran produktivitas adalah proses untuk mengukur
          efisiensi
          dan
          efektivitas dalam menghasilkan output atau hasil dari suatu aktivitas, proses, atau organisasi dalam periode
          waktu tertentu. Tujuan utamanya adalah untuk menilai sejauh mana sumber daya yang digunakan telah diubah menjadi
          produk, layanan, atau hasil lainnya atau seberapa besar nilai tambah yang dihasilkan oleh perusahaan.
        </p>
      </div>
    </div>
    <Quotes id="mengapa" quotes="If You Can’t Meauser It, You Can’t Manage It" by="Peter Drucker" class="mt-20" />
    <div class="relative">
      <Features />
      <JoinButton class="absolute top-[40%] right-60 my-auto" />
    </div>
    <Steps class="mb-8" />
    <div id="contoh" class="container mx-auto my-10">
      <Carousel />
    </div>
    <div id="daftar" class="flex my-12 mx-auto">
      <div v-for="i in 5" :key="i" class="circle mx-2"></div>
    </div>
    <div class="flex flex-col my-8 py-8 text-white bg-[#1CA83B]">
      <p class="text-center text-4xl font-semibold w-[50%] mx-auto">Mudahkan pengukuran produktivitas
      </p>
      <p class="text-center text-4xl font-semibold w-[50%] mx-auto">Perusahaan Anda
      </p>
      <p class="text-center text-4xl font-semibold w-[50%] mx-auto">
        Dengan Kalkulator Produktivitas
      </p>
      <JoinButton class="mx-auto mt-4" />
      <div id="kontak"></div>
    </div>
    <div class="container flex flex-row gap-4 content-center my-12">
      <div class="container w-[50%] pl-72 mt-24">
        <p class="text-left text-4xl font-semibold mx-auto">Punya pertanyaan?
        </p>
        <p class="text-left text-xl mx-auto mt-4">Silahkan isi form disamping, tim kami akan segera menghubungi kembali
          untuk
          menjawab
          pertanyaan anda.
        </p>
      </div>
      <div class="mb-4 ml-20 w-[40%]">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Nama
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
            id="tes">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
            id="tes">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Subject
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
            id="tes">
        </div>
        <label class="block text-sm font-bold mb-2">
          Pertanyaan
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
          cols="30" rows="6"></textarea>
        <div class="flex mt-6">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div class="flex">

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'landing'
});

</script>

<style scoped>
.welcome {
  background-image: url("../assets/stock_calculator.png");
}

.circle {
  width: 30px;
  height: 30px;
  background-color: white;
  border: 6px solid #1CA83B;
  border-radius: 100%;
}

.card-border {
  border: solid 1px #CCC9D4;
}
</style>