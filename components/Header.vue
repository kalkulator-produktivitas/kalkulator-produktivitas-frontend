<template>
  <div>
    <header class="nav-header p-2 ">
      <div class="container">


        <span v-if="authStore.isAuthenticated" class="text-black flex flex justify-end">
          <Icon name="fe:user" size="6mm" class="my-auto flex-none mr-2" />{{ authStore.authUser }}
          <Icon name="fe:arrow-down" size="6mm" class="my-auto flex-none mr-2 ml-8" />
        </span>
        <span v-else class="text-black flex flex justify-end">
          <button @click="signInPage">
            <Icon name="fe:user" size="6mm" class="my-auto flex-none mr-2" />Sign In
          </button>
        </span>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth';
const authStore = useAuthStore()

const signInPage = async () => {
  await navigateTo({
    path: '/login'
  })
}

// const username = ref(authStore.jwtToken.user)
</script>

<style scoped>
.nav-header {
  background-color: #EAEAEA;
}
</style>