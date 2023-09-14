<template>
  <div class="h-full overflow flex flex-col shadow-lg p-3">
    <div class="grid grid-cols-3">
      <p class="font-bold text-slate-900 col-span-2 mr-2">{{ label }}</p>
      <p class="font-light text-slate-500 col-span-1">{{ sublabel }}</p>
    </div>
    <div class="h-full">
      <div class="h-full flex">
        <p class="text-[24px] font-bold text-center">{{ value }}</p>
      </div>
    </div>
    <div class="h-full content-end">
      <span v-if="rates" class="text-green-600  text-[18px] font-bold text-center my-auto">
        <Icon name="fe:arrow-up" class="mb-1" /> {{ rate }} %
      </span>
      <span v-else="rates" class="text-red-600  text-[18px] font-bold text-center my-auto">
        <Icon name="fe:arrow-down" class="mb-1" /> {{ rate }} %
      </span>
    </div>
    <div class="h-full content-end">
      <p class="font-light text-sm text-slate-500 col-span-1">{{ details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'sublabel',
    'value',
    'rate',
    'details'
  ],
  computed: {
    rates() {
      let numRate = parseFloat(this.rate)
      if (numRate > 0) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style scoped></style>