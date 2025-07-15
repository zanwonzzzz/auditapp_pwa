<template>
    <navbar></navbar>
    <form v-if="bandera"  @submit.prevent="OnSubmit">
    <label for="">SELECCIONA TECNOLOGIA</label>
    <select name="Tecnologia_Auditor" id="Tecnologia_Auditor" v-model="Tecnologia_Auditor">
        <option value="">Selecciona la Tecnologia</option>
        <option value="FIBRA">FIBRA</option>
        <option value="COBRE">COBRE</option>
    </select>
    <label for="">SELECCIONA TIPO DE INSTALACION</label>
    <select name="Coincide_Instalacion" id="Coincide_Instalacion" v-model="Coincide_Instalacion">
        <option value="">Selecciona la Tecnologia</option>
        <option value="AEREA">AEREA</option>
        <option value="SUBTERRANEA">SUBTERRANEA</option>
    </select>
    <label for="">DISTRITO</label>
    <input  name="P_Distrito" type="text" v-model="P_Distrito">
    <label for="">TERMINAL</label>
    <input name="P_Terminal" type="text" v-model="P_Terminal">
    <label for="">FOTO :TERMINAL</label> <!--PUEDE SER UN SELECT-->
    <input name="F_Terminal_Abierta_Cerrada"  type="text" v-model="F_Terminal_Abierta_Cerrada">
    <label for="">¿Metraje obtenido en revisión?</label>
    <input name="P_Metraje_obtenido"  type="text" v-model="P_Metraje_obtenido">
    <label for="">FOTO ODOMETRO</label>
    <input name="F_Metraje" type="text" v-model="F_Metraje">
    <button type="submit">Avanzar</button>
    </form>
    <Observaciones v-if="!bandera"></Observaciones>
</template>
<script setup>
import apiService from '../api/apiService';
import { useRouter,useRoute } from 'vue-router';
import { ref } from 'vue';
import Observaciones from '../components/Observaciones.vue';
import navbar from '../components/navbar.vue';

const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const Tecnologia_Auditor = ref('')
const Coincide_Instalacion = ref('')
const P_Distrito = ref('')
const P_Terminal = ref('')
const F_Terminal_Abierta_Cerrada = ref('')
const P_Metraje_obtenido = ref('')
const F_Metraje = ref('')
const bandera = ref(true)

function OnSubmit(){
    Revision()
    avanzar(false)
}
function Revision()
{
   apiService.Inserts(foliopisa,{"Tecnologia_Auditor":Tecnologia_Auditor.value,
    "Coincide_Instalacion":Coincide_Instalacion.value,"P_Distrito":P_Distrito.value,
    "P_Terminal":P_Terminal.value,"F_Terminal_Abierta_Cerrada":F_Terminal_Abierta_Cerrada.value,
    "P_Metraje_obtenido":P_Metraje_obtenido.value,"F_Metraje":F_Metraje.value,
   })
}

function avanzar(valor){bandera.value = valor}


</script>