<template>
  <div class="container grid grid-cols-2">
    <div class="flex items-center">
      <img src="~/assets/frame_dashboard.png" class="w-[70%] flex-none mx-auto mr-8" alt="" srcset="">
    </div>
    <div class="w-full">
      <p class="text-4xl font-bold mb-6">Hanya Dengan 3 Langkah Mudah
      </p>
      <div class="flex mb-8">
        <div class="circle-icon justify-center place-content-center flex mr-4 shrink-0">
          <Icon name="mdi:register" color="white" size="30px" class="my-auto" />
        </div>
        <div class="flex flex-col">
          <p class="text-2xl">DAFTAR</p>
          <p class="text-normal text-gray-500">Daftarkan langsung perusahaan anda di website ini dan tim kami akan
            melakukan verifikasi.</p>
        </div>
      </div>
      <div class="flex mb-8">
        <div class="circle-icon justify-center place-content-center flex mr-4 shrink-0">
          <Icon name="mdi:text-box" color="white" size="30px" class="my-auto" />
        </div>
        <div class="flex flex-col">
          <p class="text-2xl">LAPOR</p>
          <p class="text-normal text-gray-500">Akses aplikasi kalkulator produktivitas dan langsung masukkan data performa
            perusahaan anda.</p>
        </div>
      </div>
      <div class="flex mb-8">
        <div class="circle-icon justify-center place-content-center flex mr-4 shrink-0">
          <Icon name="mdi:download" color="white" size="30px" class="my-auto" />
        </div>
        <div class="flex flex-col">
          <p class="text-2xl">DOWNLOAD</p>
          <p class="text-normal text-gray-500">Selesai! anda dapat melihat hasil pengukuran produktivitas serta mengunduh
            sertifikat produktivitas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.circle-icon {
  width: 50px;
  height: 50px;
  background-color: #1CA83B;
  border: #1CA83B solid;
  border-radius: 100%;
}
</style>