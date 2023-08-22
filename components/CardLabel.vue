<template>
    <div class="relative bg-[#034EA2] top-[10px] w-[200px] left-[-10px] shadow-lg z-5">
        <p class="text-white text-center text-xl font-medium">{{ label }}</p>
    </div>
</template>

<script>
export default {
    props: [
        'label'
    ]
}
</script>

<style scoped></style>