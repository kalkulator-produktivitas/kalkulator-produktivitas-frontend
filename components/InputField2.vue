<template>
  <div class="mb-4 md:flex md:items-center">
    <div class="md:w-1/2">
      <label class="block text-sm font-bold mr-8 md:text-right"
        :style="color ? { color: textColor } : { color: '#334155' }" for="{{this.labeling}}">
        {{ label }}
      </label>
    </div>
    <div class="md:w-1/2 flex">
      <input class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight bg-white w-6"
        disabled readonly type="text" value="Rp">
      <input
        class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
        :value="value" :disabled="disabled" :readonly="disabled" id="{{this.labeling}}" :type="type"
        :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'disabled',
    'type',
    'value',
    'placeholder',
    'color'
  ],
  computed: {
    labeling() {
      const noSpaces = this.label.replace(/ /g, '');
      return noSpaces
    },
    textColor() {
      return this.color
    }
  }
}
</script>

<style scoped></style>