<template>
    <form @submit.prevent="Observaciones">
        <label for="">Observaciones Adicionales</label>
        <textarea v-model="P_Observaciones_Finales" name="P_Observaciones_Finales" id="P_Observaciones_Finales"></textarea>
        <button>Finalizar Auditoria</button>
        <button @click="Nav('/domicilio')">Auditoria en Domicilio</button>
    </form>
</template>
<script setup>
import apiService from '../api/apiService';
import { useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';
import { defineEmits } from 'vue';

const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const emit = defineEmits('Nav')
const P_Observaciones_Finales = ref('')

function Observaciones(){apiService.Inserts(foliopisa,P_Observaciones_Finales.value)}
function Nav(ruta){router.push(`${ruta}/${foliopisa}`)}





</script>