<template>
<navbar></navbar>
<label for="">Orden:{{ foliopisa }}</label>
<form @submit.prevent="OnSubmit">
<label for="">FOTOGRAFIA DOMICILIO</label>
<input type="text" name='Foto_No_Ubicado' v-model="Foto_No_Ubicado">
<label for="">LATITUD</label>
<input type="text" name='lat_auditor' v-model="lat_auditor">
<label for="">LONGITUD</label>
<input type="text" name='lat_auditor' v-model="lat_auditor">
<label for="">COMENTARIOS</label>
<input type="text" name='P_Observaciones_Finales' v-model="P_Observaciones_Finales">
<button type="submit">Avanzar</button>
</form>

</template>
<script setup>
import navbar from '../components/navbar.vue';
import { useRouter,useRoute } from 'vue-router';
import apiService from '../api/apiService';
import { ref,onMounted } from 'vue';


const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const lat_auditor = ref("")
const lon_auditor = ref("")
const P_Observaciones_Finales = ref("")
const Foto_No_Ubicado = ref("")

function useGeolocation() {
  if (!navigator.geolocation) {
    error.value = 'Geolocalización no soportada'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat_auditor.value = position.coords.latitude.toFixed(6)
      lon_auditor.value = position.coords.longitude.toFixed(6)
    },
    (err) => {
      error.value = 'Error obteniendo ubicación: ' + err.message
    }
  )
}

onMounted(() => {
  useGeolocation()
})

function OnSubmit()
{
     const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
    const fecha_auditoria = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`

    const noExiste = apiService.Inserts(foliopisa,{"Foto_No_Ubicado":Foto_No_Ubicado.value,
     "P_Observaciones_Finales":P_Observaciones_Finales.value,"P_Domicilio":"NO",
     "Estatus_Auditoria":"NO LOCALIZADA","lat_auditor":lat_auditor.value,
     "lon_auditor":lon_auditor.value,"Fecha_Fin":fecha_auditoria.value
    })
    router.push('/ordenes')
}
</script>