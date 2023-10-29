<template>
  <div class="h-full bg-white border border-gray-200 shadow-sm p-2 overflow flex flex-col">
    <p class="font-normal text-xs text-zinc-900 dark:text-gray-400 px-2">{{ label }}</p>
    <div class="grid grid-cols-4 flex content-end h-full">
      <div class="h-full col-span-2 flex">
        <p class="text-normal lg:text-[24px] font-bold text-center ml-2">{{ value }} {{ unit }}</p>
      </div>
      <div class="h-full col-span-2 flex content-end">
        <span :class="rate >= 0 ? 'text-green-600' : 'text-red-600'"
          class="text-normal lg:text-[18px] font-bold text-center my-auto">
          <Icon :name="rate >= 0 ? 'fe:arrow-up' : 'fe:arrow-down'" class="mb-1" />{{ rate }}%
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