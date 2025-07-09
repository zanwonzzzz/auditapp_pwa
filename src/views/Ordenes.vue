<template>
    <label for="">Copes</label>
    <select name="" id="sltCope">
        <option value="">Selecciona el Cope</option>
    </select>
  <div class="main-bg">
    <div class="ordenes-grid">
      <div v-for="(d,index) in data" :key="d[0]" class="orden-card" v-show="(pag - 1) * NUM_RESULTS <= index  && pag * NUM_RESULTS > index">
        <div class="orden-header">
          <span class="orden-label">Folio Pisa {{ d[0] }}</span>
          <span class="orden-label">Distrito  {{ d[3] }}</span>
          <span class="orden-label">Terminal  {{ d[1] }}</span>
          <span class="orden-label">Puerto  {{ d[2] }}</span>
        </div>
        <div class="orden-number"><button @click="Traslado(d)"></button> <button></button> <button></button></div>
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
.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: #202a35;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px;
}

.ordenes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 90vw;
  max-width: 1200px;
}

.orden-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  min-height: 160px;
  border: 1px solid #e5e7eb;
}

.orden-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.orden-label {
  font-size: 0.95rem;
  color: #888;
  font-weight: 500;
}

.orden-status {
  background: #d1f5d3;
  color: #2e7d32;
  border-radius: 12px;
  padding: 2px 14px;
  font-size: 0.95rem;
  font-weight: 600;
}

.orden-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
}

.orden-info {
  font-size: 0.95rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
<script setup>
//cambiar esto al de options
import http from '../api/apiService'
import { useRouter,useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'

const router = useRouter()
const data = ref([])
const NUM_RESULTS = 10
const pag = 1

  onMounted(async () => {
    const router = useRouter()
    let idAuditor = localStorage.getItem('idAuditor')
    http.get(`/pendientes/${idAuditor}`)
      .then((response) => {
       console.log(response)
       data.value = response.data.Ordenes_Pendientes
      })
      .catch(err => console.error(err)) 
    })


    function Traslado(d)
    {
        localStorage.setItem('longitud',d[8])
        localStorage.setItem('latitud',d[9])
        let foliopisa = d[0]
        router.push(`/traslado/${foliopisa}`)
    }


</script>