<template>
  <div class="modal-overlay z-20">
    <div class="modal p-6">

      <p class="text-4xl font-bold text-center mb-6">Klasifikasi Usaha</p>
      <ul class="list-none">
        <li v-for="kelas of Object.keys(klasifikasi)">
          <div class="flex items-center mb-4 ml-4">
            <input :id="kelas" type="checkbox" v-model="klasifikasi[kelas].selected"
              class="w-[20px] h-[20px] shrink-0 bg-gray-100 rounded-2 dark:bg-gray-700">
            <label :for="kelas" class="ml-6 text-sm font-medium text-gray-900">{{ klasifikasi[kelas].name }}</label>
          </div>

        </li>
      </ul>
      <button type="button" class="bg-green-500" @click="close">
        Close Modal
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      klasifikasi: {
        A: { name: 'Industri Makanan, Minuman dan Tembakau', selected: false },
        B: { name: 'Industri Tekstil, Pakaian Jadi dan Kulit', selected: false },
        C: { name: 'Industri Kayu dan Barang dari kayu', selected: false },
        D: { name: 'Industri Elektronika', selected: false },
        E: { name: 'Industri Kertas dan barang dari kertas, percetakan dan penerbitan', selected: false },
        F: { name: 'Industri kimia dan barang-barang dari bahan kimia, minyak bumi, batubara, karet dan plastic', selected: false },
        G: { name: 'Industri barang galian bukan logam, kecuali minyak bumi dan batubara', selected: false },
        H: { name: 'Industri logam dasar', selected: false },
        I: { name: 'Industri dari logam, mesin dan peralatannya', selected: false },
        J: { name: 'Industri pengolahan lainnya (barang pertanian, alat musik, mainan anak, alat tulis dan gambar/kerajinan', selected: false },
        K: { name: 'Usaha Dagang', selected: false }
      }
    }
  },
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },

  },
};
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
  height: 80vh;
  width: 80vh;
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