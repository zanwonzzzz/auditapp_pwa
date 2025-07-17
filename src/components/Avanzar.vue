<template>
     <div class="buttons-container">
        <button class="action-btn">Fotos</button>
        <button @click="avanzar('pasos')" class="action-btn primary">Avanzar</button>
      </div>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const foliopisa = route.params.foliopisa
function avanzar(ruta)
{
    router.push(`/detalle/${foliopisa}/${ruta}`)
}

</script>