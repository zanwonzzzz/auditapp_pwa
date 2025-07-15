<template>
<button @click="Nav('revision')">Revision Externa</button>
<button>Domicilio del cliente</button>
<button>Posteo en falso</button>
<button>no localizada</button></template>

<script setup>
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue';

const router = useRouter()
const emit = defineEmits('Nav')

function Nav(ruta){
  emit('Nav',ruta)

}


</script>