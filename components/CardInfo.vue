<template>
  <div class="h-full bg-white border border-gray-200 shadow-sm p-2 overflow flex flex-col">
    <p class="font-normal text-zinc-900 dark:text-gray-400 px-2">{{ label }}</p>
    <div class="grid grid-cols-3 flex content-end h-full">
      <div class="h-full col-span-2 flex">
        <p class="text-[24px] font-bold text-center ml-2">Rp {{ value }} {{ unit }}</p>
      </div>
      <div class="h-full col-span-1 flex content-end">
        <span class="text-green-600  text-[18px] font-bold text-center my-auto">
          <Icon name="fe:arrow-up" class="mb-1" />{{ rate }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'value',
    'rate',
    'unit'
  ]
}
</script>

<style scoped></style>