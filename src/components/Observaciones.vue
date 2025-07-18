<template>
    <navbar></navbar>
    <div class="form-container">
        <form @submit.prevent="Observaciones" class="audit-form">
            <div class="form-header">
                <h2>Observaciones Adicionales</h2>
                <p>Complete las observaciones de la auditoría</p>
            </div>
            
            <div class="form-group">
                <label for="P_Observaciones_Finales">OBSERVACIONES ADICIONALES</label>
                <textarea 
                    v-model="P_Observaciones_Finales" 
                    name="P_Observaciones_Finales" 
                    id="P_Observaciones_Finales"
                    class="form-textarea"
                    placeholder="Ingrese las observaciones adicionales..."
                ></textarea>
            </div>

            <button
              class="btn btn-success btn-block"
              :disabled="!presenciaCliente"
              :title="!presenciaCliente ? 'Debe registrar la presencia del cliente antes de finalizar la auditoría' : ''"
              @click="finalizarAuditoria"
            >
              Finalizar Auditoría
            </button>
            <button
              class="btn btn-success btn-block"
              :disabled="presenciaCliente == 'SI' || presenciaCliente == 'NO'"
              :title="presenciaCliente ? 'Ya se registró presencia del cliente' : ''"
            >
              Auditoría En Domicilio
            </button>
        </form>
    </div>
</template>

<script setup>
import apiService from '../api/apiService';
import { useRoute,useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';
import { defineEmits } from 'vue';
import navbar from './navbar.vue';
import { useRoute,useRouter } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const emit = defineEmits('Nav')
const P_Observaciones_Finales = ref('')
const presenciaCliente = ref('')
const Estatus_Auditoria = ref('')

function Observaciones(){apiService.Inserts(foliopisa,{"P_Observaciones_Finales":P_Observaciones_Finales.value})
router.push(`/domicilio/${foliopisa}`)   }
function Nav(ruta){router.push(`${ruta}/${foliopisa}`)}

onMounted(() => {
    presenciaCliente.value = apiService.Valores(foliopisa,"P_Cliente")
    finalizarAuditoria()
})


function finalizarAuditoria() {
  if (!(presenciaCliente.value !== '' && presenciaCliente.value !== null && presenciaCliente.value !== undefined)){
  if (presenciaCliente.value === 'SI') {
    Estatus_Auditoria.value = 'COMPLETADA'
    apiService.Inserts(foliopisa,{"Estatus_Auditoria":Estatus_Auditoria.value})
    $toast.success('Auditoría finalizada correctamente');
    router.push('/ordenes')
  } else {
    Estatus_Auditoria.value = 'PARCIAL'
    apiService.Inserts(foliopisa,{"Estatus_Auditoria":Estatus_Auditoria.value})
    $toast.success('Auditoría parcial registrada correctamente');
    router.push('/ordenes')
  }
}
}

</script>

<style scoped>
.form-container {
    min-height: 100vh;
    background: #ffffff;
    padding: 20px;
    padding-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
}

.audit-form {
    background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 500px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    margin-top: 20px;
}

.form-header {
    text-align: center;
    margin-bottom: 30px;
}

.form-header h2 {
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.form-header p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin: 0;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.form-textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.95);
    color: #2d3436;
    box-sizing: border-box;
    min-height: 120px;
    resize: vertical;
    font-family: inherit;
}

.form-textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.form-textarea::placeholder {
    color: #636e72;
}



.submit-btn {
    width: 100%;
    padding: 12px 24px;
    background: #b81933;
    color: white;
    border: 2px solid #b81933;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 20px;
}

.submit-btn:hover {
    background: #a0152a;
    border-color: #a0152a;
    transform: translateY(-1px);
}

.submit-btn:active {
    transform: translateY(-1px);
}

.btn[disabled], .btn:disabled {
    background: #ccc !important;
    color: #888 !important;
    cursor: not-allowed !important;
    opacity: 0.7;
    border: 1px solid #bbb;
}


@media (max-width: 1200px) {
    .audit-form {
        max-width: 600px;
        padding: 35px 30px;
    }
}

@media (max-width: 768px) {
    .form-container {
        padding: 15px;
        padding-top: 70px;
        min-height: 100vh;
    }
    
    .audit-form {
        padding: 30px 25px;
        margin: 10px;
        max-width: 100%;
        border-radius: 15px;
    }
    
    .form-header h2 {
        font-size: 24px;
        letter-spacing: 0.5px;
    }
    
    .form-header p {
        font-size: 14px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        font-size: 13px;
        margin-bottom: 6px;
    }
    
    .form-textarea {
        padding: 12px;
        font-size: 15px;
        min-height: 100px;
    }
    
    .submit-btn {
        padding: 14px;
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .form-container {
        padding: 10px;
        padding-top: 70px;
    }
    
    .audit-form {
        padding: 25px 20px;
        margin: 5px;
        border-radius: 12px;
    }
    
    .form-header h2 {
        font-size: 20px;
        margin-bottom: 8px;
    }
    
    .form-header p {
        font-size: 13px;
    }
    
    .form-group {
        margin-bottom: 18px;
    }
    
    .form-group label {
        font-size: 12px;
        margin-bottom: 5px;
    }
    
    .form-textarea {
        padding: 10px;
        font-size: 14px;
        border-radius: 8px;
        min-height: 80px;
    }
    
    .submit-btn {
        padding: 12px;
        font-size: 15px;
        border-radius: 8px;
    }
}

@media (max-width: 360px) {
    .audit-form {
        padding: 20px 15px;
    }
    
    .form-header h2 {
        font-size: 18px;
    }
    
    .form-header p {
        font-size: 12px;
    }
    
    .form-textarea {
        padding: 8px;
        font-size: 13px;
    }
    
    .submit-btn {
        padding: 10px;
        font-size: 14px;
    }
}

@media (max-height: 500px) and (orientation: landscape) {
    .form-container {
        min-height: 100vh;
        padding: 10px;
    }
    
    .audit-form {
        padding: 20px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-textarea {
        padding: 8px 12px;
        min-height: 60px;
    }
    
    .submit-btn {
        padding: 10px;
        margin-top: 10px;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .audit-form {
        border: 0.5px solid rgba(255, 255, 255, 0.1);
    }
    
    .form-textarea {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
}
</style>