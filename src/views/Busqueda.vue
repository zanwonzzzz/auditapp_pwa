<template>
  <div class="main-bg">
    <div class="busqueda-box">
      <navbar></navbar>
      <h2 class="titulo">Búsqueda de Auditoría</h2>
      <form class="formulario">
        <label for="foliopisa">Teclea el folio para auditoría</label>
        <input type="text" id="foliopisa" name="foliopisa" v-model="folio" @input="ValidarFolio" placeholder="Folio...">

        <label for="sltTecnologia">Selecciona la tecnología</label>
        <select name="sltTecnologia" id="sltTecnologia" v-model="tecnologia">
          <option value="">SELECCIONA LA TECNOLOGIA</option>
          <option value="FIBRA">FIBRA</option>
          <option value="COBRE">COBRE</option>
        </select>

        <div class="botones">
          <button type="button" @click="Avanzar" v-if="bandera" class="btn" :disabled="deshabilitarAvanzar">Avanzar</button>
          <button type="button" @click="pendientes" v-if="bandera" class="btn" :disabled="deshabilitarPendientes">Ordenes Pendientes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import apiService from '../api/apiService';
import { ref } from 'vue';
import navbar from '../components/navbar.vue';
import { useRouter } from 'vue-router';
import authService from '../api/authService';

const router = useRouter()
const folio = ref("")
const data = ref([])
const bandera = ref(true)
const validar = ref({ data: { Validacion_Folio: [0] } });
const deshabilitarAvanzar = ref(true)
const deshabilitarPendientes = ref(true)
const tecnologia = ref("")
const idAuditor = ref(authService.getIdAuditor())

async function ValidarFolio() {
    if(!folio.value){
        data.value = []
        deshabilitarAvanzar.value = true
        deshabilitarPendientes.value = true
        return
    }
    validar.value = await apiService.Validarfolio(folio.value)
    const folioVal = Number(validar.value.data.Validacion_Folio[0])
    if(folioVal > 0) {
        deshabilitarAvanzar.value = true
        deshabilitarPendientes.value = false
        alert("Esta orden se encuentra en coordiapp")
    } else {
        deshabilitarAvanzar.value = false
        deshabilitarPendientes.value = true
        alert("Esta orden no esta en coordiapp")
    }
}

function pendientes(){router.push('/ordenes')}
function Avanzar(){
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
    const fecha_auditoria = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
    console.log(fecha_auditoria,idAuditor.value,tecnologia.value,folio.value)
    const auditoria = apiService.Auditoria(folio.value,{"Auditor":idAuditor.value,"Fecha_Inicio":fecha_auditoria,"Tecnologia_Auditor":tecnologia.value,
                                            "Estatus_Auditoria":"PENDIENTE"})
    router.push(`/detalle/${folio.value}/avanzar`)
    }
</script>

<style scoped>
.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.busqueda-box {
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  padding: 36px 28px;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 95vw;
}

.titulo {
  color: #fff;
  margin-bottom: 18px;
  font-size: 1.5rem;
  font-weight: bold;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
}

label {
  color: #fff;
  font-weight: 500;
}

input[type="text"], select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #b81933;
  font-size: 1rem;
  outline: none;
  margin-bottom: 4px;
  background: #fff;
  color: #b81933;
}

input[type="text"]:focus, select:focus {
  border-color: #b69298;
}

.botones {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 10px;
}

.btn {
  background: #b81933;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: #7a1222;
}

.btn:disabled {
  background: #ccc !important;
  color: #888 !important;
  cursor: not-allowed !important;
  opacity: 0.7;
  border: 1px solid #bbb;
}

@media (max-width: 600px) {
  .busqueda-box {
    min-width: 0;
    width: 98vw;
    padding: 18px 4px;
  }
  .formulario {
    max-width: 98vw;
  }
}
</style>