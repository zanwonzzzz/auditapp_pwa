<template>
<navbar></navbar>
<button name="Cliente_Lo" id="Cliente_Lo" @click="OnSubmit($event)" v-if="bandera">Cliente Localizado</button>
<button name="Cliente_NoLo" id="Cliente_NoLo" v-if="bandera" @click="OnSubmit($event)">Cliente No Localizado</button>

<form id="FormLocalizado" v-if="!bandera" @submit.prevent="Localizado">
    <label for="">¿Le solicitaron algun cobre por la instalacion?</label>
    <select name="P_Cobro_Instalacion" id="P_Cobro_Instalacion">
        <option value="">Selecciona una respuesta</option>
        <option value="SI">SI</option>
        <option value="NO">NO</option>
    </select>
    <label for="">¿Pudo accesar al domicilio?</label>
    <select name="Acceso_Domicilio" id="Acceso_Domicilio">
        <option value="">Selecciona una respuesta</option>
        <option value="SI">SI</option>
        <option value="NO">NO</option>
    </select>
    <button type="submit">Avanzar</button>
</form>

</template>
<script setup>
import navbar from '../components/navbar.vue';
import { useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const bandera = ref(true)
function OnSubmit($event)
{
    var boton = showMessage($event)
    LocalizadoN(boton)

}
//const showMessage = (event) => alert(event.target.name);
function showMessage(event)
{
   const nombre = event.target.name
   return nombre
}

function LocalizadoN(nombre)
{
    if(nombre == "Cliente_Lo"){bandera.value = false}
    else {router.push('/ordenes')}
}

</script>