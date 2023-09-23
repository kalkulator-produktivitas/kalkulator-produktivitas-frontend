<template>
  <div class="px-2 py-3 border-b-2 text-lg grid grid-cols-12 items-center">
    <div class="ml-2 col-span-1">{{ year }}</div>
    <div class="col-span-5">{{ title }}</div>
    <div class="col-span-2">{{ created_time }}</div>
    <div class="col-span-4 flex gap-2 justify-center">
      <button @click="checkReport"
        class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:eye" class="mr-1" />
        View
      </button>
      <button @click="$emit('notReady')"
        class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:download" class="mr-1" />
        Download
      </button>
      <button @click="$emit('notReady')"
        class="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded ease-in duration-200 flex items-center">
        <Icon name="fe:link-external" class="mr-1" />
        Certificate
      </button>
    </div>
  </div>
</template>

<script setup>
const global = useRuntimeConfig();
const router = useRouter()

const props = defineProps({
  year: Number,
  title: String,
  reportId: String,
  reported_at: Number
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const created_time = computed(() => {
  const d = new Date(0);
  let rp = props.reported_at / 1000
  d.setUTCSeconds(rp);
  let month = months[d.getUTCMonth()]; //months from 1-12
  let day = d.getUTCDate();
  let year = d.getUTCFullYear();
  return `${day} ${month} ${year}`
})

const checkReport = () => {
  const link = `/report/${props.reportId}`
  const report_id = props.reportId
  // const apiLink = `${global.public.baseURL}/api/getdata/${props.reportId}`
  return router.push({ path: `/app/report/${report_id}` })
}

</script>

<style scoped></style>