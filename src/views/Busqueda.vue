<template>
    <navbar></navbar>
<label>Teclea el folio para auditoría</label>
<input type="text" id="foliopisa" name="foliopisa" v-model="folio" @change="ValidarFolio">

<select name="sltTecnologia" id="">
    <option value="">SELECCIONA LA TECNOLOGIA</option>
    <option value="FIBRA">FIBRA</option>
    <option value="COBRE">COBRE</option>
</select>

<button v-if="bandera">Avanzar</button>
<button v-if="bandera">Ordenes Pendientes</button>
</template>
<script setup>
import apiService from '../api/apiService';
import { useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';
import navbar from '../components/navbar.vue';
import { RouterLink } from 'vue-router';

const folio = ref("")
const data = ref([])
const bandera = ref(true)
const router = useRouter()

function ValidarFolio()
{
    if(!ValidarFolio.value){
        data.value = []
        return
    }

    const validar = apiService.Validarfolio(ValidarFolio.value)
    if(validar)
    {
        alert("Esta orden se encuentra en coordiapp")
        bandera.value = false
    }
    else {alert("Esta orden no esta en coordiapp")
        bandera.value = true
    }
}


</script>