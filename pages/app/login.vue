<template>
  <div class="container max-w h-full flex flex-col">
    <ul class="flex list-none flex-row flex-wrap border-b-0 pl-0 mx-auto">
      <li class="mr-2">
        <button class="inline-block p-4 rounded-t-lg" @click="tab = 'login'"
          :class="tab === 'login' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Login</button>
      </li>
      <li class="mr-2">
        <button class="inline-block p-4 rounded-t-lg" @click="tab = 'register'"
          :class="tab === 'register' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Register</button>
      </li>
    </ul>

    <div v-if="tab === 'login'" class="rounded-lg shadow-lg bg-[#034EA2] text-white w-1/3 p-4 mx-auto mt-4"
      style="min-height: 280px;">
      <div class="text-white">
        <InputField1 label="Username" type="text" color="white" v-model="login.username" />
      </div>
      <div class="grid grid-cols-6 mb-4">
        <div class="col-span-5">
          <label class="block text-sm font-bold mb-2" style="color: white" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
            id="password" :type="type" v-model="login.password">
        </div>
        <button @click="togglePassword" class="grid">
          <Icon :name="icon" size="25" class="self-end mx-auto mb-2" />
        </button>
      </div>
      <div class="flex">
        <button
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4"
          @click="loginAuth">
          Login
        </button>
        <!-- <button
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4"
          @click="checkAuth">
          Check
        </button>
        {{ authStore.isAuthenticated }} -->
      </div>
    </div>

    <div v-if="tab === 'register'"
      class="rounded-lg shadow-lg bg-gradient-to-r from-[#034EA2] to-[#0577f7] text-white w-1/3 p-6 mx-auto mt-4"
      style="min-height: 140px;">
      <div class="">
        <p class="text-2xl font-medium">Belum punya akun?</p>
        <p class="text-base font-normal mt-4">Daftarkan perusahan anda di halaman kalkulator produktivitas untuk
          mendapatkan
          manfaat program produktivitas P3D</p>
      </div>
      <div class="flex my-2">
        <nuxt-link to="/daftar"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4">
          Daftar Sekarang
        </nuxt-link>
      </div>
    </div>
    <Loading v-if="loading" text="Please wait...." />
    <Popup v-if="modal.show" :message="modal.message" :type="modal.type" @close="closeModal" />
  </div>
</template>

<script>
import { reloadNuxtApp } from "nuxt/app";
import { useAuthStore } from '@/store/auth';
definePageMeta({
  layout: 'app'
});

const global = useRuntimeConfig();
export default {
  mounted() {
    // this.storage()
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }


  },
  data() {
    return {
      showPassword: false,
      type: 'password',
      icon: 'bi:eye',
      tab: 'login',
      login: {
        username: '',
        password: '',
      },
      loading: false,
      modal: {
        show: false,
        type: '',
        message: '',
      }
    }
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    togglePassword() {
      if (this.type === 'password') {
        this.type = 'text'
        this.icon = 'bi:eye-slash'
      } else {
        this.type = 'password'
        this.icon = 'bi:eye'
      }
    },
    closeModal() {
      // console.log('closing modal');
      this.modal.show = false
    },
    async loginAuth() {
      this.loading = true
      try {
        const res = await $fetch(`${global.public.baseURL}/auth/login`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(this.login)
        })
        if (res !== 'No User Found' && res !== 'Password Incorrect') {
          this.loading = false
          this.modal.show = true
          this.modal.message = 'Logged In'
          this.modal.type = 'SUCCESS'
          if (process.client) {
            localStorage.setItem("auth", JSON.stringify(res))
            setTimeout(() => {
              reloadNuxtApp({
                path: "/app",
                ttl: 5000,
              });
            }, 1500);

          }
        } else {
          this.loading = false
          this.modal.show = true
          this.modal.message = res
          this.modal.type = 'ERROR'
        }

      } catch (error) {
        this.loading = false
        this.modal.type = 'ERROR'
        this.modal.message = error.message
        this.modal.show = true
        console.log(error);
      }
    },
    checkAuth() {
      console.log(this.authStore.jwtToken.user);
    },
    async trial() {

      try {
        const data = await $fetch('http://localhost:2020/auth/trial', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST'
        })
        console.log(data.value);
        this.loading = false
      } catch (error) {
        console.log(error);
        this.loading = false
      }
    },
  }
}
</script>

<style scoped></style>