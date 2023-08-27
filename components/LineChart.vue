<template>
    <div>
        <Line :options="config" :data="dataset" />
    </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

defineProps(['dataset', 'config'])
</script>

<style scoped></style>