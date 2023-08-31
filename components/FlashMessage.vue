<!-- components/FlashMessage.vue -->
<template>
  <transition name="fade" mode="out-in">
    <div v-if="isVisible" :class="messageClasses">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: String, // success, error, etc.
    message: String
  },
  computed: {
    isVisible() {
      return !!this.message;
    },
    messageClasses() {
      return {
        'bg-green-500': this.type === 'success',
        'bg-red-500': this.type === 'error',
        'text-white': true,
        'p-4': true,
        'rounded': true
      };
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
