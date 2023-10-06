<template>
  <div class="modal-overlay z-20">
    <div class="modal p-6 text-center justify-center" :class="data.bgColor">
      <p v-if="status" class="text-8xl font-bold text-center my-6">
        {{ status }}
      </p>
      <p v-else :class="data.textColor">
        <Icon :name="data.icon" size="100px" />
      </p>
      <p class="text-4xl font-bold text-center my-2">{{ data.title }}</p>
      <p class="text-xl font-bold text-center">{{ props.message }}</p>

      <button type="button" class="bg-green-500" @click="$emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(['type', 'message', 'status'])

const data = computed(() => {
  let bgColor
  let title
  let icon
  let textColor
  if (props.type === 'ERROR') {
    bgColor = "bg-red-200"
    title = "ERROR"
    icon = "icomoon-free:cross"
    textColor = "text-red-500"
  } else if (props.type === 'SUCCESS') {
    bgColor = "bg-green-200"
    title = "SUCCESS"
    icon = "ic:round-check"
    textColor = "text-green-500"
  } else {
    bgColor = "bg-yellow-200"
    title = "PERHATIAN"
    icon = "fe:warning"
    textColor = "text-yellow-500"
  }
  return {
    bgColor,
    title,
    icon,
    textColor
  }
})

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  height: fit-content;
  width: 70vh;
  margin-top: 5%;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>