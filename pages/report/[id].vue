<template>
    <div class="container max-w h-full flex flex-col">
        <h2>Report {{ id }}</h2>
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
    </div>
</template>

<script setup>
const { id } = useRoute().params
</script>

<style scoped></style>