<template>
  <div>
    <header class="nav-header p-2 ">
      <div class="absolute top-1 right-10">
        <button type="button" @click="logout" :class="loggedIn ? 'show' : 'hidden'">
          Keluar
        </button>
      </div>
      <div class="text-center text-white font-bold text-lg">
        <p>
          Admin Access
        </p>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore()

let adminUser = ref()
if (process.client) {
  adminUser.value = JSON.parse(localStorage.getItem("admin"))
}

let loggedIn = computed(() => {
  if (adminUser.value && adminUser.value.user) {
    return true
  } else {
    return false
  }
})

const logout = async () => {
  if (process.client) {
    localStorage.removeItem("admin")
    reloadNuxtApp({
      path: "/admin/login",
      ttl: 5000,
    });
  }
}
</script>

<style scoped>
.nav-header {
  background-color: #034EA2;
}

button {
  background-color: #ee0000;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  padding-bottom: 5px;
  border-radius: 5px;
  margin-left: 0px;
  font-weight: 600;
}
</style>