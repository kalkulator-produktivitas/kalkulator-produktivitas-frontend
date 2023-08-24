<template>
  <div class="container m-12 mx-auto grid grid-cols-10">
    <div class="col-span-1 mr-4">
      <label for="years" class="block mb-2 text-sm font-medium text-gray-900">Pilih Tahun</label>
      <select id="years" size="5"
        class="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option>2016</option>
        <option>2017</option>
        <option>2018</option>
        <option>2019</option>
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
      </select>
    </div>
    <div class="col-span-9">
      <ReportList v-for="rep of reports" :year="rep.year" :title="rep.title" />
    </div>
  </div>
</template>

<script setup>
let reports = ref([
  { year: "2022", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2022" },
  { year: "2021", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2021" },
  { year: "2020", title: "Revisi Laporan Produktivitas PT. Indonesia Makmur Sejahtera 2020" },
  { year: "2020", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2020" },
  { year: "2019", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2019" },
  { year: "2018", title: "Laporan Produktivitas PT.Indonesia Makmur Sejahtera 2018" },
])

</script>

<style scoped></style>