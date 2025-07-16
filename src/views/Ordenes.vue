<template>
    <navbar></navbar>
    <div class="selects-container selects-row">
      <div class="select-group-col">
        <label for="sltCope">Copes</label>
        <select name="" id="sltCope">
            <option value="">Selecciona el Cope</option>
        </select>
      </div>
      <div class="select-group-col">
        <label for="sltDistrito">Distritos</label>
        <select name="" id="sltDistrito">
            <option value="">Selecciona el Distrito</option>
        </select>
      </div>
    </div>
    <div class="main-bg">
      <div class="ordenes-grid">
        <div v-for="(d,index) in data" :key="d[0]" class="orden-card" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index">
          <div class="orden-header">
            <span class="orden-label">Folio Pisa {{ d[0] }}</span>
            <span class="orden-label">Distrito  {{ d[3] }}</span>
            <span class="orden-label">Terminal  {{ d[1] }}</span>
            <span class="orden-label">Puerto  {{ d[2] }}</span>
          </div>
          <div class="orden-buttons">
            <button class="btn-rojo" @click="Traslado(d)"><font-awesome-icon :icon="['fas', 'binoculars']" /></button>
            <button class="btn-verde" @click="IniciarAuditoria(d)"><font-awesome-icon :icon="['fas', 'play']" /></button>
            <button class="btn-amarillo"><font-awesome-icon :icon="['fas', 'binoculars']" /></button>
          </div>
          <div class="orden-info">
            <div>{{ d[5] }}</div>
            <div>{{ d[11] }}</div>
          </div>
        </div>
        <nav aria-label="Page navigation" class="text-center">
            <ul class="pagination text-center">
                <li>
                    <a href="#" aria-label="Previous" v-show="pag != 1" @click.prevent="pag -= 1">
                        <span aria-hidden="true">Anterior</span>
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Next" v-show="pag * NUM_RESULTS / data.length < 1" @click.prevent="pag += 1">
                        <span aria-hidden="true">Siguiente</span>
                    </a>
                </li>
            </ul>
        </nav>
      </div>
    </div>
</template>

<style scoped>
body, html {
  background: #fff !important;
}

.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0;
}

.selects-container {
  display: flex !important;
  flex-direction: row !important;
  gap: 32px !important;
  margin: 32px auto 32px auto !important;
  justify-content: center !important;
  align-items: flex-start !important;
  background: #fff !important;
  padding: 24px 16px 8px 16px !important;
  border-radius: 12px !important;
  max-width: 1200px !important;
  /* border: 2px dashed #b81933;  Eliminado el borde */
}
.select-group-col {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 6px !important;
  min-width: 180px !important;
}
.select-group-col label {
  font-weight: 600 !important;
  color: #222 !important;
  margin-bottom: 2px !important;
  margin-top: 0 !important;
}
.select-group-col select {
  padding: 6px 12px !important;
  border-radius: 8px !important;
  border: 1px solid #ccc !important;
  font-size: 1rem !important;
  min-width: 180px !important;
}

.ordenes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 90vw;
  max-width: 1200px;
}

.orden-card {
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  border: 1px solid #e5e7eb;
  color: #fff;
}

.orden-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}

.orden-label {
  font-size: 0.95rem;
  color: #fff;
  font-weight: 500;
}

.orden-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
}

.btn-rojo {
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-rojo:hover {
  background: #b71c1c;
}

.btn-verde {
  background: #388e3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-verde:hover {
  background: #1b5e20;
}

.btn-amarillo {
  background: #fbc02d;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-amarillo:hover {
  background: #f9a825;
}

.orden-info {
  font-size: 0.95rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (max-width: 600px) {
  .main-bg {
    padding-top: 0;
  }
  .selects-container {
    flex-direction: column;
    gap: 12px;
    padding: 12px 4px 4px 4px;
    align-items: stretch;
  }
  .select-group-col {
    width: 100%;
    min-width: 0;
  }
  .select-group-col select {
    width: 100%;
    min-width: 0;
  }
  .ordenes-grid {
    gap: 16px;
  }
  .orden-card {
    padding: 16px 8px;
    min-height: 140px;
  }
}
</style>
<script setup>
//cambiar esto al de options
import apiService from '../api/apiService'
import { useRouter,useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'
import navbar from '../components/navbar.vue'
import { RouterLink } from 'vue-router'
import authService from '../api/authService'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBinoculars, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBinoculars, faPlay)

const router = useRouter()
const data = ref([]) 
const NUM_RESULTS = 10
const pag = 1
let foliopisa = null

//CONSULTAR LAS ORDENES SOLO UNA BES Y GUARDARLAS EN CACHE Y Q SOLO CON EL POLLINGSE ACTUALISE
  onMounted(async () => {
     const router = useRouter()
      const idAuditor = await authService.getIdAuditor()
     const ordenes = await apiService.ordenesPendientes(idAuditor)
     data.value = ordenes.data.Ordenes_Pendientes
    })


    function Traslado(d)
    {
        localStorage.setItem('latitud',d[7])
        localStorage.setItem('longitud',d[8])
        foliopisa = d[0]
        router.push(`/traslado/${foliopisa}`)
    }

    function IniciarAuditoria(d){foliopisa=d[0]  
        router.push(`/detalle/${foliopisa}`)}
    


</script>