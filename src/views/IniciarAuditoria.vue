<template>
    <navbar></navbar>
  <div class="main-bg">
    <div class="card-container">
      <div class="info-card" v-for="d in data" :key="d[0]">
        <div class="card-header">
          <h3>Detalle de Orden</h3>
          <span class="order-number">#{{ d[0] }}</span>
        </div>
        
        <div class="card-content">
          <div class="info-row">
            <span class="label">Cope:</span>
            <span class="value">{{ d[7] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Distrito:</span>
            <span class="value">{{ d[3] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Terminal:</span>
            <span class="value">{{ d[1] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Puerto:</span>
            <span class="value">{{ d[2] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Tecnología:</span>
            <span class="value">{{ d[4] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Cliente Titular:</span>
            <span class="value">{{ d[5] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Apellido Paterno:</span>
            <span class="value">{{ d[12] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Apellido Materno:</span>
            <span class="value">{{ d[13] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Teléfono:</span>
            <span class="value">{{ d[6] }}</span>
          </div>
          <div class="info-row">
            <span class="label">Dirección:</span>
            <span class="value">{{ d[11] }}</span>
          </div>
        </div>
      </div>
      
      <div class="buttons-container" v-if="bandera">
        <button class="action-btn">Fotos</button>
        <button @click="avanzar(false)" class="action-btn primary">Avanzar</button>
      </div>
      
      <Pasos v-if="!bandera" @Nav="Navegacion"></Pasos>
    </div>
  </div>
</template>

<style scoped>
.main-bg {
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  padding-top: 100px;
  box-sizing: border-box;
}

.card-container {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-card {
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.card-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  color: white;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.order-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-content {
  padding: 15px 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.9rem;
  min-width: 140px;
  flex-shrink: 0;
}

.value {
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  text-align: right;
  flex: 1;
  margin-left: 15px;
  word-wrap: break-word;
}

.buttons-container {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #b81933;
  background: transparent;
  color: #b81933;
  font-weight: 600;
}

.action-btn:hover {
  background: #b81933;
  color: white;
}

.action-btn.primary {
  background: #b81933;
  color: white;
}

.action-btn.primary:hover {
  background: #a0152a;
  border-color: #a0152a;
}
</style>
<script setup>
import navbar from '../components/navbar.vue';
import apiService from '../api/apiService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pasos from '../components/Pasos.vue';
import { useRouter } from 'vue-router';

const data = ref([])
const rutaRE = ref([])
const bandera = ref(true)
const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const ruta = "https://vps.ed-intra.com/API/imagesCordiapp/"


 onMounted(async () => {
    const detalle = await apiService.DetalleOrdenes(foliopisa)
    data.value = detalle.data.Detalle_Orden

 })

 function avanzar(valor)
 {
   bandera.value = valor
 }

 function Navegacion(ruta){
  router.push(`/${ruta}/${foliopisa}`)
}

</script>