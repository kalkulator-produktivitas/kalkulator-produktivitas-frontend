<template>
    <div>
        <Header />
        <Sidebar />
        <div id="layout" class="container m-8 mx-auto">
            <slot />
        </div>
    </div>
</template>



<style scoped>
#layout {
    height: 80vh;
}
</style>
  