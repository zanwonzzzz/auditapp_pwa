<template>
<navbar></navbar>
<button name="Cliente_Lo" id="Cliente_Lo" @click="showMessage" v-if="bandera">Cliente Localizado</button>
<button name="Cliente_NoLo" v-if="bandera">Cliente No Localizado</button>

<form @submit.prevent="Localizado">
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

<form @submit.prevent="NoLocalizado">
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

const bandera = ref(true)

const showMessage = (event) => alert(event.target.id);
</script>