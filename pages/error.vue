<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-6xl">Maaf....</p>
    <input type="number" v-model="temp">
    <input type="number" v-model="rps">
    <button class="border border-black">Calc</button>
    <p>{{ temp }}</p>
    <p>{{ convertedTemp }}</p>
    <p>{{ newRupiah }}</p>

    <button class="border border-green" @click="runApi">API</button>

  </div>
</template>

<script setup>
import useTemperatureConverter from '@/composables/converter';
import getAPI from '@/composables/apiCalls'
import useRupiahFormatter from '@/composables/useRupiahFormatter';
const { getter } = getAPI()
const { celsiusToKelvin } = useTemperatureConverter();
const { rupiahFormatter } = useRupiahFormatter();

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

const temp = ref(0)

const rps = ref(0)

const newRupiah = computed(() => {
  return rupiahFormatter(rps.value)
})

const convertedTemp = computed(() => {
  return celsiusToKelvin(temp.value)
})

const runApi = async () => {
  let asd = await getter("/helloworld", authUser)
  console.log(asd);
  return asd
}

</script>

<style scoped></style>