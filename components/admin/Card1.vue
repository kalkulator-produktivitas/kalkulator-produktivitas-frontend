<template>
  <button class="border border-gray-200 shadow-sm p-4 my-1 rounded-md hover:scale-105 transition w-full">
    <div class="flex flex-row">
      <div class="w-[70%] flex items-center">
        <p class="font-normal text-lg px-2">{{ props.label }}</p>
      </div>
      <div class="w-[30%]">
        <p class="text-4xl font-bold text-right">{{ props.value }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>

const props = defineProps(["label", "value"])

// let background = computed(() => {
//   return `bg-[${props.color}]`
// })

</script>

<style scoped></style>