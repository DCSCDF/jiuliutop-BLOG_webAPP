<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto"></main>
        <Footer></Footer>
    </div>
</template>
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { NForm, } from 'naive-ui';
import themeOverrides from '../themeOverrides'; //引入自定义主题
import { ref, reactive, onMounted, inject } from "vue";
import { AdminStore } from '../stores/AdminStore';



</script>
<style scoped></style>
