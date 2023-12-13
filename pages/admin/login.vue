<template>
  <div class="max-w h-full flex flex-col mt-20">
    <div class="rounded-lg shadow-lg bg-[#034EA2] text-white w-[420px] p-4 mx-auto mt-4 shrink-0"
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
  layout: 'admin'
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
        const res = await $fetch(`${global.public.baseURL}/admin/login`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(this.login)
        })
        if (res !== 'Wrong Credentials') {
          this.loading = false
          this.modal.show = true
          this.modal.message = 'Logged In'
          this.modal.type = 'SUCCESS'
          if (process.client) {
            localStorage.setItem("admin", JSON.stringify(res))
            setTimeout(() => {
              reloadNuxtApp({
                path: "/admin",
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
        this.modal.message = "Wrong Credentials"
        this.modal.show = true
        console.log(error);
      }
    },
    checkAuth() {
      console.log(this.authStore.jwtToken.user);
    },
  }
}
</script>

<style scoped></style>