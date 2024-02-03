<template>
  <div class="h-screen">
    <AdminHeaders />
    <AdminSidebar />
    <div id="layout" class="flex bg-gray-100 h-full">
      <div class="container mx-auto mt-16 ">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
#layout {
  height: 100%;
}
</style>
