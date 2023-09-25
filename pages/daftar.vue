<template>
  <div class="h-[10px]">
  </div>
  <div class="flex">
    <ul class="flex list-none flex-row flex-wrap border-b-0 pl-0 mx-auto">
      <li class="mr-2">
        <button class="inline-block p-4 rounded-t-lg" @click="tab = 'Data Perusahaan'"
          :class="tab === 'Data Perusahaan' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Data
          Perusahaan</button>
      </li>
      <li class="mr-2">
        <button class="inline-block p-4 rounded-t-lg" @click="tab = 'Data Pengguna'"
          :class="tab === 'Data Pengguna' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Data
          Pengguna</button>
      </li>
    </ul>
  </div>
  <div class="flex w-[90%] mx-auto">

    <div v-if="tab === 'Data Perusahaan'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
      <!-- <p class="text-4xl font-bold text-black text-center mb-4">Data Perusahaan</p> -->
      <InputField3 class="col-span-3" label="Nama Perusahaan" type="text" :color="textColor"
        v-model="register.namaPerusahaan" />
      <div class="grid grid-cols-2 gap-4 mt-4">

        <InputField3 label="Nama Pemilik Perusahaan" type="text" :color="textColor"
          v-model="register.namaPemilikPerusahaan" />
        <InputField3 label="Nama Pimpinan" type="text" :color="textColor" v-model="register.namaPimpinan" />
      </div>
      <div class="mb-4">
        <InputField3 label="Alamat Perusahaan" type="email" :color="textColor" v-model="register.alamatPerusahaan" />
      </div>
      <div class="mb-2 flex w-full">
        <InputField3 class="w-full" label="Alamat Pabrik" type="text" :color="textColor"
          v-model="register.alamatPabrik" />
        <button @click="sameAddress"
          class="bg-transparent hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
          Sama
        </button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <InputField3 label="Telp/Fax" type="number" placeholder="02122878999" :color="textColor"
          v-model="register.telpFax" />
        <InputField3 label="Kontak Person" type="text" :color="textColor" v-model="register.kontakPerson" />
      </div>
      <div>
        <InputField3 label="Tanggal Pendirian" type="date" :color="textColor" v-model="register.tanggalPendirian" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <InputField3 label="Email Perusahaan" type="email" :color="textColor" v-model="register.email" />
        <InputField3 label="Website" type="text" :color="textColor" v-model="register.website" />

      </div>
      <div class="flex">
        <InputField3 class="w-full" label="Klasifikasi Usaha" type="text" :color="textColor"
          v-model="register.klasifikasiUsaha" />
        <button @click="showModal = true"
          class="bg-transparent hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
          Pilih
        </button>
      </div>
      <div class="flex">
        <button @click="tab = 'Data Pengguna'"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-28 ease-in-out duration-300 mt-4">
          Next
        </button>
      </div>
    </div>
    <div v-if="tab === 'Data Pengguna'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
      <div class="w-full mx-auto">
        <!-- <p class="text-4xl font-bold text-black text-center mb-4">Data User</p> -->
        <div class="mb-4">
          <InputField3 label="Nama User" type="text" :color="textColor" v-model="register.namaPengguna" />
        </div>
        <div class="mb-4">
          <InputField3 label="Email User" type="email" :color="textColor" v-model="register.emailPengguna" />
        </div>
        <div class="mb-4">
          <InputField3 label="Nomor User" type="number" :color="textColor" v-model="register.nomorPengguna" />
        </div>
        <div class="mb-4">
          <InputField3 label="Username" type="text" :color="textColor" v-model="register.username" />
        </div>
        <div class="mb-4">
          <InputField3 label="Password" type="password" :color="textColor" v-model="register.password" />
        </div>
        <div class="mb-4">
          <InputField3 label="Retype Password" type="password" :color="textColor" v-model="register.retypePassword" />
        </div>
        <!-- :highlight="samePassword" -->
      </div>

      <div class="flex">
        <button @click="registerAuth"
          class="text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4"
          :class="noEmpty ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'" :disabled="!noEmpty">
          Daftar
        </button>
      </div>
    </div>
    <div v-show="showModal">
      <div class="modal-overlay z-20">
        <div class="modal p-6 overflow-y-auto">
          <div class="container ">

            <p class="text-4xl font-bold text-center mb-6">Klasifikasi Usaha</p>
            <ul class="list-none">
              <li v-for="kelas of klasifikasi">
                <div class="flex items-center mb-4 ml-4">
                  <input :id="kelas.class" type="checkbox" v-model="kelas.selected"
                    class="w-[20px] h-[20px] shrink-0 bg-gray-100 rounded-2 dark:bg-gray-700">
                  <label :for="kelas.class" class="ml-6 text-sm font-medium text-gray-900">{{ kelas.name }}</label>
                </div>

              </li>
            </ul>
            <div class="flex justify-center">
              <button type="button"
                class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full w-40 ease-in-out duration-300 mt-4"
                @click="showModal = false">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" text="Menginput Data" />
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'landing'
});
const global = useRuntimeConfig();

const textColor = 'black'

const tab = ref('Data Perusahaan')

const showModal = ref(false)

const loading = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

const klasifikasi = ref([
  { name: 'Industri Makanan, Minuman dan Tembakau', selected: false, class: 'A' },
  { name: 'Industri Tekstil, Pakaian Jadi dan Kulit', selected: false, class: 'B' },
  { name: 'Industri Kayu dan Barang dari kayu', selected: false, class: 'C' },
  { name: 'Industri Elektronika', selected: false, class: 'D' },
  { name: 'Industri Kertas dan barang dari kertas, percetakan dan penerbitan', selected: false, class: 'E' },
  { name: 'Industri kimia dan barang-barang dari bahan kimia, minyak bumi, batubara, karet dan plastic', selected: false, class: 'F' },
  { name: 'Industri barang galian bukan logam, kecuali minyak bumi dan batubara', selected: false, class: 'G' },
  { name: 'Industri logam dasar', selected: false, class: 'H' },
  { name: 'Industri dari logam, mesin dan peralatannya', selected: false, class: 'I' },
  { name: 'Industri pengolahan lainnya (barang pertanian, alat musik, mainan anak, alat tulis dan gambar/kerajinan', selected: false, class: 'J' },
  { name: 'Usaha Dagang', selected: false, class: 'K' }
])

const selectedClass = computed(() => {
  let listClass = []
  const selectedValue = klasifikasi.value.filter((klas) => klas.selected === true)
  for (let i of selectedValue) {
    listClass.push(i.class)
  }
  return listClass.join(', ')
})

const register = reactive({
  namaPerusahaan: '',
  namaPemilikPerusahaan: '',
  namaPimpinan: '',
  alamatPerusahaan: '',
  telpFax: '',
  alamatPabrik: '',
  tanggalPendirian: '',
  klasifikasiUsaha: selectedClass,
  kontakPerson: '',
  email: '',
  website: '',
  namaPengguna: '',
  emailPengguna: '',
  nomorPengguna: '',
  username: '',
  password: '',
  retypePassword: ''
})

const samePassword = computed(() => {
  return register.password === register.retypePassword
})

const sameAddress = () => {
  register.alamatPabrik = register.alamatPerusahaan
}

const noEmpty = computed(() => {
  const obj = register
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check if the value has a length property (e.g., it's a string or array)
      if (value.length !== undefined && value.length === 0) {
        return false; // If any value has length 0, return false
      }
    }
  }
  return true; // If all values are not empty, return true
})

const registerAuth = async () => {
  try {
    const data = await fetch(`${global.public.baseURL}/auth/register`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(register)
    })
    loading.value = false
    modal.value.show = true
    modal.value.status = null
    modal.value.message = 'Registrasi Berhasil'
    modal.value.type = 'SUCCESS'
    await navigateTo('/')
  } catch (error) {
    loading.value = false
    modal.value.show = true
    modal.value.message = "Terjadi Kendala Pada Server"
    modal.value.type = 'ERROR'
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  transition: ease-in-out 0.3s;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  transition: ease-in-out 0.3s;
}

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
  border-radius: 5px;
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
</style>