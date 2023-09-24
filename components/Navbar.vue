<template>
  <div>
    <nav class="bg-white bg-opacity-90 shadow-lg border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <img src="~/assets/DKI_LOGO_2.png" class="w-10 flex-none mr-2" alt="" srcset="">
          <img src="~/assets/P3D_logo_2.png" class="h-10 flex-none mr-2" alt="" srcset="">
          <span class="self-center text-xl font-semibold whitespace-nowrap">Kalkulator Produktivitas</span>
        </div>
        <div class="flex items-center lg:order-2">
          <!-- <a href="#"
            class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log
            in</a> -->
          <!-- <a href="#"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get
            started</a> -->
          <button data-collapse-toggle="mobile-menu-2" type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="hidden justify-center items-center lg:flex lg:w-auto grow" id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <nuxt-link to="/#home"
                class="block py-2 pr-4 pl-3 text-green-600 border-b border-gray-100 hover:bg-transparent lg:border-0 lg:hover:text-green-800 lg:p-0">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#mengapa"
                class="block py-2 pr-4 pl-3 text-green-600 border-b border-gray-100 hover:bg-transparent lg:border-0 lg:hover:text-green-800 lg:p-0">Mengapa
                Kami</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#daftar"
                class="block py-2 pr-4 pl-3 text-green-600 border-b border-gray-100 hover:bg-transparent lg:border-0 lg:hover:text-green-800 lg:p-0">Daftar</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#kontak"
                class="block py-2 pr-4 pl-3 text-green-600 border-b border-gray-100 hover:bg-transparent lg:border-0 lg:hover:text-green-800 lg:p-0">Kontak</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="flex sm:hidden md:block my-auto">
          <nuxt-link to="/app">
            <button type="button"
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full w-36 bouncing-element ease-in-out duration-300">
              Aplikasi
              <Icon name="fe:arrow-right" />
            </button>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  transition: 'navigation'
}
</script>

<style scoped>
@keyframes bounceRight {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
    /* Adjust the distance you want to bounce */
  }

  75% {
    transform: translateX(0);
  }
}

.bouncing-element:hover {
  animation: bounceRight 1s ease infinite;
  /* Adjust animation duration as needed */
}

.nav-header {
  background-color: #EAEAEA;
}
</style>