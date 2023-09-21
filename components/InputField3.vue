<template>
  <div class="mb-4" :style="{ width: inputWide }">
    <label class="block text-sm font-bold mb-2" :style="color ? { color: textColor } : { color: '#334155' }"
      for="{{this.labeling}}">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
      :class="highlight ? 'border-2 border-red-500 shadow-highlight' : ''" :value="modelValue" :disabled="disabled"
      :readonly="disabled" id="{{this.labeling}}" :type="type" :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script>

export default {
  props: [
    'label',
    'wide',
    'disabled',
    'type',
    'value',
    'modelValue',
    'placeholder',
    'color',
    'highlight'
  ],
  emits: ['update:modelValue'],
  computed: {
    inputWide() {
      return `${this.wide}px`
    },
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

<style scoped>
.shadow-highlight {
  filter: drop-shadow(0 0 5px red);
  ;
}
</style>