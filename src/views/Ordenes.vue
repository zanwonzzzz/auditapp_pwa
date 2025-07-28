<template>
    <navbar></navbar>
    <div class="selects-container selects-row">
      <div class="select-group-col">
        <label for="sltCope">Copes</label>
        <select name="" id="sltCope"  v-model="copeseleccionado" @change="Distritos">
          <option value="">Selecciona el Cope</option>
            <option v-for="d in data_copes" :value="d[0]" :key="d[0]">
              {{ d[1] }}
            </option>
        </select>
      </div>
      <div class="select-group-col">
        <label for="sltDistrito">Distritos</label>
        <select name="" id="sltDistrito">
            <option value="">Selecciona el Distrito</option>
            <option v-for="d in data_distritos" :value="d[0]">
              {{ d[1] }}
            </option>
        </select>
      </div>
      <div class="select-group-col">
        <label for="searchInput">Buscar</label>
        <div class="search-container">
          <input 
            type="text" 
            id="searchInput"
            placeholder="Buscar por folio, distrito, terminal..."
            @input="Buscar"
            class="search-input"
          >
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
        </div>
      </div>
    </div>
    <div class="main-bg">
      <div class="ordenes-grid">
        <div v-for="(d,index) in ordenes" :key="d[0]" class="orden-card" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index">
          <div class="orden-header">
            <span class="orden-label">Folio Pisa {{ d[0] }}</span>
            <span class="orden-label">Distrito  {{ d[3] }}</span>
            <span class="orden-label">Terminal  {{ d[1] }}</span>
            <span class="orden-label">Puerto  {{ d[2] }}</span>
          </div>
          <div class="orden-buttons">
            <button class="btn-rojo" @click="Traslado(d)"><font-awesome-icon :icon="['fas', 'binoculars']" /></button>
            <button class="btn-verde" @click="IniciarAuditoria(d)"><font-awesome-icon :icon="['fas', 'play']" /></button>
            <button v-if="(d[9] != '' && d[9] != null && d[9] != undefined) && (d[10] != '' && d[10] != null && d[10] != undefined)" @click="Traslado(d)" class="btn-amarillo"><font-awesome-icon :icon="['fas', 'binoculars']" /></button>
          </div>
          <div class="orden-info">
            <div>{{ d[5] }}</div>
            <div>{{ d[11] }}</div>
          </div>
        </div>
        <nav aria-label="Page navigation" class="text-center">
            <ul class="pagination text-center">
                <li>
                    <a href="#" aria-label="Previous" v-show="pag > 1" @click.prevent="pag--">
                        <span aria-hidden="true">Anterior</span>
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Next" v-show="pag * NUM_RESULTS < ordenes.length" @click.prevent="pag++">
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
  margin: 50px auto 32px auto !important;
  justify-content: center !important;
  align-items: flex-start !important;
  background: #fff !important;
  padding: 24px 16px 8px 16px !important;
  border-radius: 12px !important;
  max-width: 1200px !important;
  flex-wrap: wrap !important;
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

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px 40px 8px 12px !important;
  border-radius: 8px !important;
  border: 1px solid #ccc !important;
  font-size: 1rem !important;
  min-width: 180px !important;
  background: #fff !important;
  color: #333 !important;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none !important;
  border-color: #b81933 !important;
  box-shadow: 0 0 0 2px rgba(184, 25, 51, 0.1) !important;
}

.search-input::placeholder {
  color: #999;
  font-style: italic;
}

.search-icon {
  position: absolute;
  right: 12px;
  color: #666;
  font-size: 0.9rem;
  pointer-events: none;
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
    flex-direction: column !important;
    gap: 16px !important;
    padding: 16px 12px !important;
    align-items: stretch !important;
    margin: 45px auto 16px auto !important;
  }
  .select-group-col {
    width: 100% !important;
    min-width: 0 !important;
  }
  .select-group-col select {
    width: 100% !important;
    min-width: 0 !important;
    padding: 10px 12px !important;
    font-size: 16px !important;
  }
  .search-container {
    width: 100% !important;
  }
  .search-input {
    width: 100% !important;
    min-width: 0 !important;
    padding: 10px 40px 10px 12px !important;
    font-size: 16px !important; /* Evita zoom en iOS */
  }
  .search-icon {
    right: 15px;
    font-size: 1rem;
  }
  .ordenes-grid {
    gap: 16px;
    width: 95vw;
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
import authService from '../api/authService'
import { useRequest } from 'vue-request';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBinoculars, faPlay, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBinoculars, faPlay, faSearch)

const router = useRouter()
const ordenes = ref([]) 
const data_copes= ref([])
const data_original = ref([])
const NUM_RESULTS = 5
const pag = ref(1)
let foliopisa = null
const copeseleccionado = ref("")
const data_distritos = ref([])
let tamañoAnterior = 0 
//CONSULTAR LAS ORDENES SOLO UNA BES Y GUARDARLAS EN CACHE Y Q SOLO CON EL POLLINGSE ACTUALISE
  onMounted(async () => {
     const copes = await apiService.Copes()
      const idAuditor = await authService.getIdAuditor()
     
     const { data, loading } = useRequest(
       () => apiService.ordenesPendientes(idAuditor), 
       { 
         pollingInterval: 50000,
         onSuccess: (response) => {
           const tamañoActual = response.data.Ordenes_Pendientes

           if (tamañoActual > tamañoAnterior) {
             console.log("¡Nuevas órdenes detectadas!");
             enviarNotificacionNuevasOrdenes();
           }

           tamañoAnterior = tamañoActual
           
           ordenes.value = response.data.Ordenes_Pendientes
           data_original.value = response.data.Ordenes_Pendientes
           
         }
       }
     )
     
     data_copes.value = copes.data.Copes
    })

    function enviarNotificacionNuevasOrdenes() {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Nuevas Órdenes', {
          body: `Tienes nueva(s) orden(es) pendiente(s)`,
          icon: '/auditap.png',
          badge: '/auditap.png'
        });
      }
    }

    async function Distritos()
    {
      if(!copeseleccionado.value)
    {
      data_distritos.value = []
      return
    }
    console.log(copeseleccionado.value)
    const distritos = await apiService.Distritos(copeseleccionado.value)
    data_distritos.value = distritos.data.Distritos
    }

    function Traslado(d)
    {
        localStorage.setItem('latitud',d[7])
        localStorage.setItem('longitud',d[8])
        foliopisa = d[0]
        router.push(`/traslado/${foliopisa}`)
    }

    function IniciarAuditoria(d){foliopisa=d[0]  
        router.push(`/detalle/${foliopisa}`)}

    const Buscar = (e) => {
      const searchTerm = e.target.value.toLowerCase()
      if(searchTerm === '') {
        ordenes.value = data_original.value
        return
      }
      
      const filtradota = data_original.value.filter(d => {
        const foliopisa = d[0].toLowerCase().includes(searchTerm)
        const distrito = d[3].toLowerCase().includes(searchTerm)
        const terminal = d[1].toLowerCase().includes(searchTerm)
        const puerto = d[2].toLowerCase().includes(searchTerm)
        
        return foliopisa || distrito || terminal || puerto
      })
      ordenes.value = filtradota
    }
    


</script>