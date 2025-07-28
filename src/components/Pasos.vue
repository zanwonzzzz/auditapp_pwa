<template>
  <div class="pasos-container">
    <button @click="Nav('revision')" class="paso-btn">Revision Externa</button>
    <button @click="Nav('domicilio')" class="paso-btn">Domicilio del cliente</button>
    <button @click="Nav('no/existe')" class="paso-btn">Posteo en falso</button>
    <button @click="Nav('no/domicilio')" class="paso-btn">No localizada</button>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import apiService from '../api/apiService';
import { onMounted,ref } from 'vue';

const fecha_inicio = ref("")
onMounted(() => {
  Fecha_inicio()
})

function Fecha_inicio()
{
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
    fecha_inicio.value = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`

    const fecha_inicio = apiService.Inserts(foliopisa,{"Fecha_Inicio":fecha_Traslado.value,"Fin_Traslado":fecha_Traslado.value})

}

const router = useRouter()
const route = useRoute()
const foliopisa = route.params.foliopisa

function Nav(ruta){
  router.push(`/${ruta}/${foliopisa}`)
}
</script>

<style scoped>
.pasos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.paso-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #b81933;
  background: transparent;
  color: #b81933;
  font-weight: 600;
  min-width: 140px;
  flex: 1;
  max-width: 200px;
}

.paso-btn:hover {
  background: #b81933;
  color: white;
}

@media (max-width: 600px) {
  .pasos-container {
    flex-direction: column;
    align-items: center;
  }
  
  .paso-btn {
    width: 100%;
    max-width: 300px;
    min-width: auto;
  }
}
</style>