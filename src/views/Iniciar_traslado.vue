<template>
  <div class="main-bg">
    <div class="login-box">
      <img id="imagen" src="../assets/enlace.png" alt="auditapp" class="logo-img">
      <label for="">Iniciando Traslado</label>
      <label for="">Orden: {{foliopisa }}</label>
      <label for="">Click para ver Ubicación</label>
      <div class="buttons-container">
        <a
          :href="`https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}&zoom=20`"
          target="_blank"
          class="map-btn"
        >
          <i class="fas fa-map-marker-alt"></i>
        </a>
        <button @click="Regresar" class="back-btn">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  background: #23262a;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
} 
.logo-img {
  width: 180px;
  margin-bottom: 24px;
}

.buttons-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.map-btn, .back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
}

.map-btn:hover, .back-btn:hover {
  background: #fff;
  color: #23262a;
}

.login-input {
  width: 90%;
  padding: 10px 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.login-btn {
  width: 50%;
  padding: 10px 0;
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.login-btn:hover {
  background: #fff;
  color: #23262a;
}
</style>
<script setup>
//ref e para crear baraibles reactivas
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiService from '../api/apiService'

const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa

const latitud = ref('')
const longitud = ref('')
const fecha_Traslado = ref('')

onMounted(() => {
  latitud.value = localStorage.getItem('latitud') || ''
  longitud.value = localStorage.getItem('longitud') || ''
  Iniciar_Traslado()
})

function Regresar(){router.back()}

function Iniciar_Traslado()
{
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
    fecha_Traslado.value = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`

    const traslado = apiService.Inserts(foliopisa,{"Inicio_Traslado":fecha_Traslado.value})

}


</script>