<template>
  <div class="mt-1 w-full">
    <footer class="bg-[#1CA83B]">
      <div class="w-full max-w-screen-xl mx-auto py-8">
        <div class="flex sm:justify-between">
          <div class="flex flex-col">
            <div class="flex items-center my-4 sm:mb-0">
              <img src="~/assets/DKI_LOGO_2.png" class="w-12 flex-none mr-2" alt="" srcset="">
              <span class="self-center text-white text-4xl font-bold whitespace-nowrap">Kalkulator Produktivitas - {{
                currentYear }}</span>
            </div>
            <p class="italic text-white font-semibold my-4">"Hari ini lebih baik dari hari kemarin dan hari esok lebih
              baik
              dari
              hari ini"</p>
          </div>
          <div class="flex flex-col">
            <a href="https://www.instagram.com/pusat_produktivitas_jakarta/?hl=en" class="text-white font-semibold my-2">
              <Icon name="mdi:instagram" color="white" size="30px" />
              @pusat_produktivitas_jakarta
            </a>
            <p class="text-white font-semibold my-2">
              <Icon name="ph:phone-fill" color="white" size="30px" />
              +62 878-4001-2129
            </p>
            <a href="https://p3d-disnakertrans.jakarta.go.id/" class="text-white font-semibold my-2">
              <Icon name="mdi:web" color="white" size="30px" />
              https://p3d-disnakertrans.jakarta.go.id/
            </a>
          </div>
          <ul class="flex flex-col flex-wrap items-center text-md font-medium text-white sm:mb-0 gap-6 mt-2">
            <li>
              <a href="/#home" class="hover:underline">Home</a>
            </li>
          </ul>
        </div>



        <!-- <hr class="mt-2 border-gray-200 sm:mx-auto dark:border-gray-700" /> -->
      </div>
    </footer>
  </div>
</template>

<script setup>
const currentYear = reactive((new Date()).getFullYear())
</script>

<style lang="scss" scoped></style>