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
        <button class="inline-block p-4 rounded-t-lg" @click="nextTab"
          :class="tab === 'Data Pengguna' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Data
          Pengguna</button>
      </li>
    </ul>
  </div>
  <div class="flex w-[90%] mx-auto">
    <!-- {{ validasiPage1 }} -->
    <div v-if="tab === 'Data Perusahaan'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
      <InputField3 class="col-span-3" label="Nama Perusahaan" type="text" :color="textColor"
        :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPerusahaan" v-model="register.namaPerusahaan" />
      <div class="grid grid-cols-2 gap-4 mt-4">
        <InputField3 label="Nama Pemilik Perusahaan" type="text" :color="textColor"
          v-model="register.namaPemilikPerusahaan"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPemilikPerusahaan" />
        <InputField3 label="Nama Pimpinan" type="text" :color="textColor" v-model="register.namaPimpinan"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPimpinan" />
      </div>
      <div class="grid grid-cols-5 gap-3">
        <InputField3 label="Alamat Perusahaan" class="col-span-3" type="email" :color="textColor"
          v-model="register.alamatPerusahaan"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.alamatPerusahaan" />
        <div class="col-span-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
            Telp/Fax
          </label>
          <div class="bg-transparent rounded flex">
            <input
              class="shadow appearance-none border border-r-none rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              value="+62" readonly style="width: 50px">
            <input type="number"
              class="shadow appearance-none border rounded-r w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
              v-model="register.telpFax" id="Telp/Fax" :style="{ color: textColor }">
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4" :id="reaction.address">
        <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
            Provinsi
          </label>
          <select @change="reaction.address += 1" id="provinsi" v-model="register.provinsiPerusahaan"
            class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
            :class="validasiPage1.nextClicked && validasiPage1.vals.provinsiPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''"
            placeholder="-- Provinsi --">
            <option selected disabled :value="null">-- Provinsi --</option>
            <option v-for="prov of regions" :value="prov.nama">{{ prov.nama }}</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
            Kota
          </label>
          <select @change="reaction.address += 1" id="kota" v-model="register.kotaPerusahaan"
            class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
            :class="validasiPage1.nextClicked && validasiPage1.vals.kotaPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''">
            <option selected disabled :value="null">-- Kota --</option>
            <option v-for="kota of listKota" :value="kota.nama">{{
            kota.nama }}</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
            Kecamatan
          </label>
          <select @change="reaction.address += 1" id="kelurahan" v-model="register.kecamatanPerusahaan"
            class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
            :class="validasiPage1.nextClicked && validasiPage1.vals.kecamatanPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''">
            <option selected disabled :value="null">-- Kelurahan --</option>
            <option v-for="camat of listKecamatan" :value="camat.nama">{{
            camat.nama }}</option>
          </select>
        </div>
      </div>
      <div class="mb-2 flex w-full">
        <InputField3 class="w-full" label="Alamat Pabrik" type="text" :color="textColor" v-model="register.alamatPabrik"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.alamatPabrik" />
        <button @click="sameAddress"
          class="bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
          Sama
        </button>
      </div>
      <div class="grid grid-cols-5 gap-4">
        <InputField3 class="col-span-2" label="Tanggal Pendirian" type="date" :color="textColor"
          v-model="register.tanggalPendirian"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.tanggalPendirian" />
        <div class="col-span-3 flex">
          <InputField3 class="w-full" label="Klasifikasi Usaha" type="text" :color="textColor"
            v-model="register.klasifikasiUsaha"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.klasifikasiUsaha" />
          <button @click="showModal = true"
            class="bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
            Pilih
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <InputField3 label="Email Perusahaan" type="email" :color="textColor" v-model="register.email"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.email" />
        <InputField3 label="Website" type="text" :color="textColor" v-model="register.website"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.website" />

      </div>

      <div class="flex">
        <button @click="nextTab"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-28 ease-in-out duration-300 mt-4">
          Next
        </button>
      </div>
    </div>
    <div v-if="tab === 'Data Pengguna'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
      <div class="w-full mx-auto">
        <!-- <p class="text-4xl font-bold text-black text-center mb-4">Data User</p> -->
        <div class="mb-4 grid grid-cols-7 gap-2">
          <InputField3 class="col-span-3" label="Nama User" type="text" :color="textColor"
            v-model="register.namaPengguna"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.namaPengguna" />
          <InputField3 class="col-span-3" label="Nama Kontak Person" type="text" :color="textColor"
            v-model="register.kontakPerson"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.kontakPerson" />
          <button @click="register.kontakPerson = register.namaPengguna"
            class="col-span-1 bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-2 border border-black hover:border-black rounded h-10 self-center ml-2">
            Sama
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nomorUser">
              Nomor Handphone User
            </label>
            <div class="bg-transparent rounded flex">
              <input
                class="shadow appearance-none border border-r-none rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" readonly style="width: 50px">
              <input type="number"
                class="shadow appearance-none border rounded-r w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
                v-model="register.nomorPengguna" id="nomorUser" :style="{ color: textColor }"
                :class="(validasiPage2.submitClicked && validasiPage2.vals.nomorPengguna) ? 'border-2 border-red-500 shadow-highlight' : ''">
            </div>
          </div>
          <!-- <InputField3 label="" type="number" :color="textColor" v-model="register.nomorPengguna" /> -->
          <InputField3 label="Email User" type="email" :color="textColor" v-model="register.emailPengguna"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.emailPengguna" />
        </div>
        <div class="mb-4">
          <InputField3 label="Username" type="text" :color="textColor" v-model="register.username"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.username" />
        </div>
        <div class="mb-4">
          <InputField3 label="Password" type="password" :color="textColor" v-model="register.password"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.password" />
        </div>
        <div class="mb-4">
          <InputField3 label="Retype Password" type="password" :color="textColor" v-model="register.retypePassword"
            :highlight="validasiPage2.submitClicked && validasiPage2.vals.retypePassword" />
        </div>
        <!-- :highlight="samePassword" -->
      </div>

      <div class="flex">
        <button @click="registerAuth"
          class="text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4"
          :class="(validasiPage1.output === 0 && validasiPage2.output === 0) ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'"
          :disabled="!(validasiPage1.output === 0 && validasiPage2.output === 0)">
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

import regions from '@/assets/region.json'

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

const reaction = ref({ address: 0, clickNext: 0, submit: 0 })

const closeModal = () => {
  modal.value.show = false
}

const klasifikasi = ref([
  { name: 'Pertanian, Kehutanan dan Perikanan', selected: false, class: 'A' },
  { name: 'Pertambangan dan Penggalian', selected: false, class: 'B' },
  { name: 'Industri Pengolahan', selected: false, class: 'C' },
  { name: 'Pengadaan Listrik, Gas, Uap/Air Panas Dan Udara Dingin', selected: false, class: 'D' },
  { name: 'Treatment Air, Treatment Air Limbah, Treatment dan Pemulihan Material Sampah, dan Aktivitas Remediasi', selected: false, class: 'E' },
  { name: 'Konstruksi', selected: false, class: 'F' },
  { name: 'Perdagangan Besar Dan Eceran; Reparasi Dan Perawatan Mobil Dan Sepeda Motor', selected: false, class: 'G' },
  { name: 'Pengangkutan dan Pergudangan', selected: false, class: 'H' },
  { name: 'Penyediaan Akomodasi Dan Penyediaan Makan Minum', selected: false, class: 'I' },
  { name: 'Informasi Dan Komunikasi', selected: false, class: 'J' },
  { name: 'Aktivitas Keuangan dan Asuransi', selected: false, class: 'K' },
  { name: 'Real Estat', selected: false, class: 'L' },
  { name: 'Aktivitas Profesional, Ilmiah Dan Teknis', selected: false, class: 'M' },
  { name: 'Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi, Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya', selected: false, class: 'N' },
  { name: 'Administrasi Pemerintahan, Pertahanan Dan Jaminan Sosial Wajib', selected: false, class: 'O' },
  { name: 'Pendidikan', selected: false, class: 'P' },
  { name: 'Aktivitas Kesehatan Manusia Dan Aktivitas Sosial', selected: false, class: 'Q' },
  { name: 'Kesenian, Hiburan Dan Rekreasi', selected: false, class: 'R' },
  { name: 'Aktivitas Jasa Lainnya', selected: false, class: 'S' },
  { name: 'Aktivitas Rumah Tangga Sebagai Pemberi Kerja; Aktivitas Yang Menghasilkan Barang Dan Jasa Oleh Rumah Tangga yang Digunakan untuk Memenuhi Kebutuhan Sendiri', selected: false, class: 'T' },
  { name: 'Aktivitas Badan Internasional Dan Badan Ekstra Internasional Lainnya', selected: false, class: 'U' }
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
  provinsiPerusahaan: '',
  kotaPerusahaan: '',
  kecamatanPerusahaan: '',
  telpFax: '',
  alamatPabrik: '',
  tanggalPendirian: '',
  klasifikasiUsaha: selectedClass,
  email: '',
  website: '',
  namaPengguna: '',
  kontakPerson: '',
  emailPengguna: '',
  nomorPengguna: '',
  username: '',
  password: '',
  retypePassword: ''
})

const listKota = computed(() => {
  if (register.provinsiPerusahaan.length > 0) {
    let kota = regions.filter(x => x['nama'] === register.provinsiPerusahaan)[0]['kota/kab']
    return kota
  } else return []

})

const listKecamatan = computed(() => {
  if (register.provinsiPerusahaan.length > 0 && register.kotaPerusahaan.length > 0) {
    let kota = regions.filter(x => x['nama'] === register.provinsiPerusahaan)[0]['kota/kab']
    let cmt = kota.filter(x => x['nama'] === register.kotaPerusahaan)[0]['kecamatan']
    return cmt
  } else return []
})

const samePassword = computed(() => {
  return register.password === register.retypePassword
})

const sameAddress = () => {
  register.alamatPabrik = register.alamatPerusahaan
}

const validasiPage1 = computed(() => {
  let nextClicked = reaction.value.clickNext > 0 ? true : false
  let vals = {
    namaPerusahaan: (register.namaPerusahaan.length === 0) ? true : false,
    namaPemilikPerusahaan: (register.namaPemilikPerusahaan.length === 0) ? true : false,
    namaPimpinan: (register.namaPimpinan.length === 0) ? true : false,
    alamatPerusahaan: (register.alamatPerusahaan.length === 0) ? true : false,
    provinsiPerusahaan: (register.provinsiPerusahaan.length === 0) ? true : false,
    kotaPerusahaan: (register.kotaPerusahaan.length === 0) ? true : false,
    kecamatanPerusahaan: (register.kecamatanPerusahaan.length === 0) ? true : false,
    alamatPabrik: (register.alamatPabrik.length === 0) ? true : false,
    tanggalPendirian: (register.tanggalPendirian.length === 0) ? true : false,
    klasifikasiUsaha: (register.klasifikasiUsaha.length === 0) ? true : false,
    email: (register.email.length === 0 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.email))) ? true : false,
    website: (register.website.length === 0) ? true : false,
  }
  let output = Object.values(vals).filter(Boolean).length

  return { vals, output, nextClicked }
})

const validasiPage2 = computed(() => {
  let submitClicked = reaction.value.submit > 0 ? true : false
  let vals = {
    namaPengguna: (register.namaPengguna.length === 0) ? true : false,
    kontakPerson: (register.kontakPerson.length === 0) ? true : false,
    emailPengguna: (register.emailPengguna.length === 0 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.emailPengguna))) ? true : false,
    nomorPengguna: (register.nomorPengguna.toString().length === 0) ? true : false,
    username: (register.username.length === 0) ? true : false,
    password: (register.password.length <= 5) ? true : false,
    retypePassword: (register.retypePassword.length === 0 || register.password !== register.retypePassword) ? true : false,
  }
  let output = Object.values(vals).filter(Boolean).length

  return { vals, output, submitClicked }
})

// const noEmpty = computed(() => {
//   const obj = register
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       const value = obj[key];

//       // Check if the value has a length property (e.g., it's a string or array)
//       if (value.length !== undefined && value.length === 0) {
//         return false; // If any value has length 0, return false
//       }
//     }
//   }
//   return true; // If all values are not empty, return true
// })

const registerAuth = async () => {
  reaction.value.submit += 1
  if (validasiPage2.value.output === 0) {
    try {
      // const data = await $fetch(`${global.public.baseURL}/auth/register`, {
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   method: 'POST',
      //   body: JSON.stringify(register)
      // })
      loading.value = false
      modal.value.show = true
      modal.value.status = null
      modal.value.message = 'Registrasi Berhasil'
      modal.value.type = 'SUCCESS'
      setTimeout(() => {
        reloadNuxtApp({
          path: "/",
          ttl: 5000,
        });
      }, 1500);

    } catch (error) {
      loading.value = false
      modal.value.show = true
      modal.value.message = "Terjadi Kendala Pada Server"
      modal.value.type = 'ERROR'
    }
  }
}

const nextTab = () => {
  reaction.value.clickNext += 1
  if (validasiPage1.value.output === 0) {
    tab.value = "Data Pengguna"
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

.shadow-highlight {
  filter: drop-shadow(0 0 5px red);
  ;
}
</style>