<!-- components/Carousel.vue -->
<template>
  <p class="text-4xl font-bold text-center">Contoh Sertifikat Produktivitas
  </p>
  <div class="container flex content-center justify-center h-[480px]">
    <button @click="prev" class="text-4xl" :class="currentIndex === 0 ? 'text-gray-200' : 'text-gray-800'"
      :disabled="currentIndex === 0">
      <Icon name="mdi:chevron-left" />
    </button>
    <div class="bg-white mt-4">
      <!-- Carousel items go here -->
      <img v-if="currentIndex === 0" src="../assets/sertifikat_halaman1.png" style="height: 480px;">
      <img v-if="currentIndex === 1" src="../assets/sertifikat_halaman2.png" style="height: 480px;">
      <!-- <img src="../assets/sertifikat_halaman2.png"> -->
    </div>
    <button @click="next" class="text-4xl" :class="currentIndex === 1 ? 'text-gray-200' : 'text-gray-800'"
      :disabled="currentIndex === 1">
      <Icon name="mdi:chevron-right" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      items: ['../assets/sertifikat_halaman1.png', '../assets/sertifikat_halaman2.png'], // Your carousel items
    };
  },
  methods: {
    next() {
      if (this.currentIndex === 0) {
        this.currentIndex += 1
      }
    },
    prev() {
      if (this.currentIndex === 1) {
        this.currentIndex -= 1
      }
    },
  },
};
</script>

<style scoped></style>
