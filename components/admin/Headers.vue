<template>
  <div class="fixed top-0 w-screen">
    <header class="nav-header shadow-lg p-2">
      <div class="">
        <button type="button" @click="logout" :class="loggedIn ? 'show' : 'hidden'" class="absolute top-1 right-4">
          Keluar
        </button>
      </div>
      <div class="text-center text-black font-normal text-lg">
        <p>
          Admin Access
        </p>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'


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
  background-color: #ffffff;
}

button {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  border-width: 2px;
  border-color: rgb(0, 0, 0);
  padding-bottom: 5px;
  border-radius: 5px;
  margin-left: 0px;
  font-weight: 600;
  transition: 0.2s;
}

button:hover {
  background-color: #3e3e3e;
  color: rgb(255, 255, 255);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  border-width: 2px;
  border-color: rgb(0, 0, 0);
  padding-bottom: 5px;
  border-radius: 5px;
  margin-left: 0px;
  font-weight: 600;
  transition: 0.2s;
}
</style>