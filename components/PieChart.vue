<template>
    <div>
        <Pie :options="config" :data="dataset" />
    </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)

defineProps(['dataset', 'config'])
</script>

<style scoped></style>