<template>
  <div class="flex">
    <aside id="default-sidebar" :class="isOpen ? 'w-12' : 'w-40'" class="fixed top-0 left-0 h-screen"
      aria-label="Sidebar">
      <div class="h-full bg-[#034EA2]">
        <div class="flex items-center">
          <img src="~/assets/logo.png" class="w-10 ml-1 pt-1 flex-none" alt="" srcset="">
          <p class="ml-2 text-white font-thin" :class="!isOpen ? 'visible' : 'invisible'">
            Kalkulator Produktivitas P3D</p>
        </div>
        <div class="px-3 py-4 overflow-none">

          <div class="grid justify-items-stretch flex">

            <button @click="isOpen = !isOpen" class="justify-self-end">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-white mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <ul class="mt-6">
            <li v-for="item in items" :key="item.text" class="mb-4">
              <nuxt-link :to="item.to" class="text-xl flex items-left text-white">
                <Icon :name="item.icon" size="6mm" class="my-auto flex-none mr-2" />
                <p :class="!isOpen ? 'visible' : 'invisible'">{{ item.text }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>



<style scoped>
.nav-header {
  background-color: #404258;
}

.show-text {
  visibility: visible;
}

.hide-text {
  visibility: hidden;
}
</style>

<script>

export default {
  components: {
  },
  data() {
    return {
      isOpen: true,
      items: [
        { text: 'Home', to: '/', icon: 'fe:home' },
        { text: 'Report', to: '/', icon: 'fe:document' },
        { text: 'Dashboard', to: '/', icon: 'fe:bar-chart' },
        { text: 'Profile', to: '/', icon: 'fe:user' }
      ]
    }
  }
}

</script>
  