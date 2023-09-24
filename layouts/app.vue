<template>
    <div>
        <Header />
        <Sidebar />
        <div id="layout" class="md:mx-auto my-6 mx-auto flex">
            <div class="shrink-0 w-[5%]"></div>
            <div class="container mx-auto">
                <slot />
            </div>
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
  