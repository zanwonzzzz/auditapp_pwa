<template>
   <navbar></navbar>
  <form @submit.prevent="Domicilio">
    <label>FOTO:DOMICILIO</label>
    <input type="text" name="Foto_Domicilio" v-model="Foto_Domicilio"/>

    <label>LATITUD</label>
    <input type="text" name="lat_auditor" v-model="lat_auditor" readonly />

    <label>LONGITUD</label>
    <input type="text" name="lon_auditor" v-model="lon_auditor" readonly />

    <button type="submit">Avanzar</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiService from '../api/apiService'
import { useRouter,useRoute } from 'vue-router'
import navbar from '../components/navbar.vue'

const lat_auditor = ref('')
const lon_auditor = ref('')
const Foto_Domicilio = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()
const foliopisa = route.params.foliopisa
const P_Domicilio = "SI"

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

function Domicilio() {
  apiService.Inserts(foliopisa,{"Foto_Domicilio":Foto_Domicilio.value,
    "lat_auditor":lat_auditor.value,"lon_auditor":lon_auditor.value,
    "P_Domicilio":P_Domicilio.value
  })
  
  router.push(`/cliente/${foliopisa}`)
}
</script>
