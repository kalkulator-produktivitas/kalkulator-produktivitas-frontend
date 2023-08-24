<template>
  <div class="px-2 py-3 border-b-2 text-lg grid grid-cols-12 items-center">
    <div class="ml-2 col-span-1">{{ year }}</div>
    <div class="col-span-7">{{ title }}</div>
    <div class="col-span-4 flex gap-2 justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:eye" class="mr-1" />
        View
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:download" class="mr-1" />
        Download
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:link-external" class="mr-1" />
        Certificate
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  year: String,
  title: String
})
</script>

<style scoped></style>