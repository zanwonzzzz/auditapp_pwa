<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <img src="../assets/enlace.png" alt="">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        {{ username }}
                    </li>
                    <li class="nav-item">
                        <button @click="regresar">Regresar</button>
                    </li>
                    <li class="nav-item">
                        <button @click="logout">Log Out</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { RouterLink,useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter()
const username = ref()
function regresar(){router.back()}
function logout(){router.push('/')}

onMounted(() => {
    username.value = localStorage.getItem('username')
})
</script>