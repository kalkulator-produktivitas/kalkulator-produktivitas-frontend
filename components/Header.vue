<template>
  <div>
    <header class="nav-header p-2 ">
      <div class="container text-center">
        <span v-if="authUser" class="text-black flex flex justify-end">
          <Icon name="fe:user" size="6mm" class="my-auto flex-none mr-2" />{{ authUser.data.nama_perusahaan }}
          <button @click="showLogout = !showLogout">
            <Icon name="fe:arrow-down" size="6mm" class="my-auto flex-none mr-2 ml-8" />
          </button>
        </span>
        <span v-else class="text-black flex flex justify-end">
          <button @click="signInPage">
            <Icon name="fe:user" size="6mm" class="my-auto flex-none mr-2" />Sign In
          </button>

        </span>
      </div>
      <div v-if="showLogout"
        class="z-40 absolute bg-white w-[100px] top-8 border rounded-md right-[9%] p-1 px-2 text-black font-semibold flex flex-col">
        <button @click="logout" class="text-start ">
          Logout</button>
        <button @click="profile" class="text-start ">
          Profil</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore()

let authUser = ref()
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}


const showLogout = ref(false)

const logout = async () => {
  if (process.client) {
    localStorage.removeItem("auth")
    reloadNuxtApp({
      path: "/app/login",
      ttl: 5000,
    });
  }
  // this.authStore.clearToken(res)
}

const profile = async () => {
  await navigateTo({
    path: '/app/profile'
  })
}

const check = () => {
  if (process.client) {
    // console.log(JSON.parse(localStorage.getItem("auth")).data);
    console.log(authUser.value.token);
  }
}

const signInPage = async () => {
  await navigateTo({
    path: '/app/login'
  })
}

// const username = ref(authStore.jwtToken.user)
</script>

<style scoped>
.nav-header {
  background-color: #EAEAEA;
}
</style>