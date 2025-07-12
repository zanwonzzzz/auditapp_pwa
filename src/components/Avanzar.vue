<template>
    <button>Fotos</button>
    <button @click="Mostrarse">Avanzar</button>
</template>
<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['mostrarse'])
const bandera = ref(true)

function Mostrarse() {
    emit('mostrarse', bandera.value)
}
</script>