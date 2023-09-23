<template>
  <div class="">
    <div class="fixed top-0 z-10 w-full">
      <Navbar />
    </div>
    <div>
      <div id="layout" class="flex flex-col justify-between">
        <div class="mx-auto w-full mt-16">
          <slot />
        </div>

      </div>
    </div>
    <div class="bottom-0 w-full mt-12">
      <Footer />
    </div>
  </div>
</template>

<script setup>

</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
  