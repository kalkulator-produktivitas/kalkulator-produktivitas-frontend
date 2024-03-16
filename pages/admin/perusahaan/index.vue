<template>
  <div v-if="!loading" class="h-full">

    <div class="grid grid-cols-3 gap-2 justify-center">

      <div v-for="(usaha, index) in perusahaan" class="relative mx-auto w-[100%] px-3">
        <Accordion class="" :id="usaha.id_perusahaan" :comp-id="usaha.id_perusahaan" :perusahaan="usaha">
        </Accordion>
      </div>
    </div>
  </div>
  <Loading v-if="loading" text="Please wait...." />
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});
import getAPI from '@/composables/getCalls'

const { rupiahFormatter } = useRupiahFormatter();
const { getter } = getAPI()
const global = useRuntimeConfig();
const loading = ref(false)

let adminUser
if (process.client) {
  adminUser = ref(JSON.parse(localStorage.getItem("admin")))
  if (adminUser.value && adminUser.value.user) { } else {
    reloadNuxtApp({
      path: "/admin/login",
      ttl: 500,
    });
  }
}

const errorPage = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const perusahaan = ref([])

try {
  let res = await getter('/admin/semuaperusahaan')
  perusahaan.value = res.data
} catch (err) {
}



</script>

<style scoped></style>composables/getCalls