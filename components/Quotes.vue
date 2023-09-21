<template>
  <div class="bg-[#1CA83B] my-8 p-12">
    <p class="text-4xl font-bold text-center text-white">"{{ quotes }}"</p>
    <p class="text-xl font-bold text-center mt-4 text-gray-100 italic">- {{ by }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['quotes', 'by'])
</script>

<style lang="scss" scoped></style>