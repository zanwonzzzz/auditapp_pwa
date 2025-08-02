<template>
  <div class="form-bg">
    <navbar></navbar>
    <form class="audit-form" @submit.prevent="AuditoriaCompletada">
      <label for="txtObservacionesFinales">OBSERVACIONES FINALES</label>
      <textarea name="P_Observaciones_Finales" id="P_Observaciones_Finales" v-model="P_Observaciones_Finales"></textarea>
      <button type="submit">Finalizar Auditoria</button>
      <button type="button"  @click="revision" :disabled="!(FotoTerminal == '' || FotoTerminal == null || FotoTerminal == undefined)">Revision Externa</button>
    </form>
  </div>
</template>
<script setup>
import navbar from './navbar.vue';
import apiService from '../api/apiService';
import { useRoute,useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const foliopisa = useRoute().params.foliopisa
const FotoTerminal = ref('')
const P_Observaciones_Finales = ref('')
const router = useRouter()

onMounted(() => {
    FotoTerminal.value = apiService.Valores(foliopisa,"F_Terminal_Abierta_Cerrada")
})

function AuditoriaCompletada()
{
    
        apiService.Inserts(foliopisa,{"Estatus_Auditoria":"COMPLETADA","P_Observaciones_Finales":P_Observaciones_Finales.value})
        $toast.success('Auditoria Finalizada')
        router.push('/ordenes')
    
}
function revision(){router.push(`/revision/externa/${foliopisa}`)}



</script>
<style scoped>
.form-bg {
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audit-form {
  background: linear-gradient(135deg, #b81933 0%, #ff4e50 100%);
  padding: 36px 28px;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 95vw;
  width: 100%;
}

label {
  color: #fff;
  font-weight: 500;
  margin-bottom: 6px;
  margin-top: 12px;
  display: block;
  text-align: left;
  width: 100%;
}

textarea {
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #b81933;
  font-size: 1rem;
  outline: none;
  margin-bottom: 8px;
  background: #fff;
  color: #b81933;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
}

textarea:focus {
  border-color: #ff4e50;
}

button {
  background: #b81933;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 18px;
  width: 100%;
}

button:hover {
  background: #7a1222;
}

button:disabled {
  background: #ccc !important;
  color: #888 !important;
  cursor: not-allowed !important;
  opacity: 0.7;
  border: 1px solid #bbb;
}

@media (max-width: 600px) {
  .audit-form {
    min-width: 0;
    width: 98vw;
    padding: 18px 4px;
  }
  label {
    font-size: 0.98rem;
  }
  button {
    font-size: 0.98rem;
    padding: 10px 8px;
  }
}
</style>