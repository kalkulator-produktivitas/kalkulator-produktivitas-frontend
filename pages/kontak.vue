<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div class="grid grid-rows-2 gap-4  px-8">
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
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">
          Write your complaint here
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
          cols="30" rows="6"></textarea>
      </div>
    </div>
    <div class="flex">
      <button
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped></style>