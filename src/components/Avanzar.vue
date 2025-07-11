<template>
    <button>Fotos</button>
    <button @click="$emit('mostrarse',bandera)">Avanzar</button>
</template>
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['mostrarse'])

function Mostrarse()
{
    emit('mostrarse',bandera)
}

</script>