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
      <div class="grid grid-cols-5 mb-4">
        <div class="col-span-4">
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

    <div v-if="tab === 'register'" class="rounded-lg shadow-lg bg-[#034EA2] text-white w-1/3 p-4 mx-auto mt-4"
      style="min-height: 280px;">
      <div class="grid grid-cols-2 gap-4">
        <InputField1 label="First Name" type="text" color="white" v-model="register.firstName" class="col-span-1" />
        <InputField1 label="Last Name" type="text" color="white" v-model="register.lastName" class="col-span-1" />
      </div>
      <div class="mb-4">
        <InputField1 label="Company" type="text" color="white" v-model="register.company" />
      </div>
      <div class="mb-4">
        <InputField1 label="Email" type="email" color="white" v-model="register.email" />
      </div>
      <div class="mb-4">
        <InputField1 label="Username" type="text" color="white" v-model="register.username" />
      </div>
      <div class="mb-4">
        <InputField1 label="Password" type="password" color="white" v-model="register.password" />
      </div>
      <div class="flex">
        <button @click="registerAuth"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4">
          Daftar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      register: {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        username: '',
        password: ''
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
    async loginAuth() {
      try {
        const data = await fetch('http://localhost:2020/auth/login', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: JSON.stringify(this.login)
        })
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async registerAuth() {
      try {
        const data = await fetch('http://localhost:2020/auth/register', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: JSON.stringify(this.register)
        })
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped></style>