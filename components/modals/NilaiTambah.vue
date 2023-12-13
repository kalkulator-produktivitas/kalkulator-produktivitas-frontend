<template>
  <div class="modal-overlay z-20">
    <div class="modal p-2">
      <p class="text-2xl font-bold text-center mt-2">Histori Nilai Tambah</p>
      <p class="text-lg font-bold text-center mt-2">{{ data.nama }}</p>
      <table class="table-fixed mt-4 w-full">
        <thead>
          <tr class="bg-none text-black text-lg">
            <th class="w-[60px]">No.</th>
            <th class="w-[10%]">Tahun</th>
            <th class="w-[80%]">Nilai Tambah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in data.data" class="my-4 text-lg border-t-2">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ key }}</td>
            <td class="text-center">{{ toRupiah(value) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex flex-row-reverse">
        <button type="button" @click="$emit('tutup')">
          <Icon :name="'icomoon-free:cross'" size="20px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = defineProps(['data', 'nama'])

function toRupiah(price) {
  // From price number 200000 to Rp200.000
  let priceStr = Math.abs(price).toString();
  let rupiah = ""
  for (let i = priceStr.length - 1; i >= 0; i--) {
    rupiah += priceStr[i]
    let j = i - priceStr.length
    if (i !== 0 && j % 3 === 0) {
      rupiah += "."
    }
  }
  // Reverse
  let strArr = rupiah.split("");
  rupiah = "";
  for (let i = strArr.length - 1; i >= 0; i--) {
    rupiah += strArr[i]
  }
  rupiah = "Rp " + rupiah
  if (price < 0) {
    rupiah = "(" + rupiah + ")"
  }

  return rupiah
}
;
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
  background-color: white;
  width: 80vh;
  margin-top: 5%;
  border-radius: 30px;
  padding-bottom: 15px;
  height: fit-content;
}

.close {
  margin: 5% 0 0 2px;
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
  width: 50px;
  height: 50px;
  color: white;
  border-radius: 50%;
  margin-top: 0px;
  margin-left: 0px;
}
</style>