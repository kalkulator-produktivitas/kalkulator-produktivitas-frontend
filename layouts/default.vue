<template>
    <div>
        <Header />
        <Sidebar />
        <div id="layout" class="container md:container md:mx-auto my-8 mx-auto">
            <slot />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#layout {
    height: 80vh;
}
</style>
  