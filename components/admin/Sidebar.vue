<template>
  <div class="flex">
    <aside @mouseover="isOpen = false" @mouseleave="isOpen = true" id="default-sidebar"
      :class="isOpen ? 'w-12' : 'w-48'" class="fixed top-0 left-0 h-screen transition-all ease-in-out duration-200 z-50"
      aria-label="Sidebar">
      <div class="h-full bg-[#034EA2] overflow-none">
        <nuxt-link class="flex items-center" to="/">
          <img src="~/assets/P3D_logo_2.png" class="w-10 ml-1 pt-3 flex-none" alt="" srcset="">
          <p class="ml-2 font-bold text-white mt-2 delay-150" :class="!isOpen ? 'visible' : 'invisible'">
            Kalkulator Produktivitas</p>
        </nuxt-link>
        <div class="px-3 py-4">
          <ul class="mt-6">
            <li v-for="item in items" :key="item.text" class="mb-4">
              <nuxt-link :to="item.to" class="text-xl font-normal flex items-left text-white">
                <Icon :name="item.icon" size="6mm" class="my-auto flex-none mr-2" />
                <p :class="!isOpen ? 'visible' : 'invisible'" class="delay-150">{{ item.text }}</p>
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
        { text: 'Beranda', to: '/admin', icon: 'fe:home' },
        { text: 'Terdaftar', to: '/admin/perusahaan', icon: 'fe:document' },
        { text: 'Pendaftar', to: '/admin/pendaftar', icon: 'fe:user' }
      ]
    }
  }
}

</script>