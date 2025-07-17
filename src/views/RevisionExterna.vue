<template>
    <navbar></navbar>
    <div class="form-container" v-if="bandera">
        <form @submit.prevent="OnSubmit" class="audit-form">
            <div class="form-header">
                <h2>Revisión Externa</h2>
                <p>Complete los datos de la auditoría</p>
            </div>
            
            <div class="form-group">
                <label for="Tecnologia_Auditor">SELECCIONA TECNOLOGÍA</label>
                <select name="Tecnologia_Auditor" id="Tecnologia_Auditor" v-model="Tecnologia_Auditor" class="form-select">
                    <option value="">Selecciona la Tecnología</option>
                    <option value="FIBRA">FIBRA</option>
                    <option value="COBRE">COBRE</option>
                </select>
            </div>

            <div class="form-group">
                <label for="Coincide_Instalacion">SELECCIONA TIPO DE INSTALACIÓN</label>
                <select name="Coincide_Instalacion" id="Coincide_Instalacion" v-model="Coincide_Instalacion" class="form-select">
                    <option value="">Selecciona el Tipo</option>
                    <option value="AEREA">AÉREA</option>
                    <option value="SUBTERRANEA">SUBTERRÁNEA</option>
                </select>
            </div>

            <div class="form-group">
                <label for="P_Distrito">DISTRITO</label>
                <input name="P_Distrito" type="text" v-model="P_Distrito" class="form-input" placeholder="Ingrese el distrito">
            </div>

            <div class="form-group">
                <label for="P_Terminal">TERMINAL</label>
                <input name="P_Terminal" type="text" v-model="P_Terminal" class="form-input" placeholder="Ingrese la terminal">
            </div>

            <div class="form-group">
                <label for="F_Terminal_Abierta_Cerrada">FOTO: TERMINAL</label>
                <input name="F_Terminal_Abierta_Cerrada" type="text" v-model="F_Terminal_Abierta_Cerrada" class="form-input" placeholder="URL de la foto">
            </div>

            <div class="form-group">
                <label for="P_Metraje_obtenido">¿Metraje obtenido en revisión?</label>
                <input name="P_Metraje_obtenido" type="text" v-model="P_Metraje_obtenido" class="form-input" placeholder="Ingrese el metraje">
            </div>

            <div class="form-group">
                <label for="F_Metraje">FOTO ODOMETRO</label>
                <input name="F_Metraje" type="text" v-model="F_Metraje" class="form-input" placeholder="URL de la foto del odómetro">
            </div>

            <button type="submit" class="submit-btn" >Avanzar</button>
        </form>
    </div>
    <!--<Observaciones v-if="!bandera"></Observaciones>-->
    <router-view></router-view>
</template>

<script setup>
import apiService from '../api/apiService';
import { useRouter,useRoute } from 'vue-router';
import { ref } from 'vue';
import Observaciones from '../components/Observaciones.vue';
import navbar from '../components/navbar.vue';
import { RouterView } from 'vue-router';

const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const Tecnologia_Auditor = ref('')
const Coincide_Instalacion = ref('')
const P_Distrito = ref('')
const P_Terminal = ref('')
const F_Terminal_Abierta_Cerrada = ref('')
const P_Metraje_obtenido = ref('')
const F_Metraje = ref('')
const bandera = ref(true)

function OnSubmit(){
    Revision()
    router.push(`/observaciones/${foliopisa}`)
}
function Revision()
{
   apiService.Inserts(foliopisa,{"Tecnologia_Auditor":Tecnologia_Auditor.value,
    "Coincide_Instalacion":Coincide_Instalacion.value,"P_Distrito":P_Distrito.value,
    "P_Terminal":P_Terminal.value,"F_Terminal_Abierta_Cerrada":F_Terminal_Abierta_Cerrada.value,
    "P_Metraje_obtenido":P_Metraje_obtenido.value,"F_Metraje":F_Metraje.value,
   })
}

function avanzar(valor){bandera.value = valor}

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

.form-input, .form-select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.95);
    color: #2d3436;
    box-sizing: border-box;
}

.form-input:focus, .form-select:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.form-input::placeholder {
    color: #636e72;
}

.form-select {
    cursor: pointer;
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

/* Responsive Design */
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
    
    .form-input, .form-select {
        padding: 12px;
        font-size: 15px;
    }
    
    .submit-btn {
        padding: 14px;
        font-size: 16px;
        margin-top: 15px;
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
    
    .form-input, .form-select {
        padding: 10px;
        font-size: 14px;
        border-radius: 8px;
    }
    
    .submit-btn {
        padding: 12px;
        font-size: 15px;
        margin-top: 12px;
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
    
    .form-input, .form-select {
        padding: 8px;
        font-size: 13px;
    }
    
    .submit-btn {
        padding: 10px;
        font-size: 14px;
    }
}

/* Landscape orientation for mobile */
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
    
    .form-input, .form-select {
        padding: 8px 12px;
    }
    
    .submit-btn {
        padding: 10px;
        margin-top: 10px;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .audit-form {
        border: 0.5px solid rgba(255, 255, 255, 0.2);
    }
    
    .form-input, .form-select {
        border: 1px solid #e0e0e0;
    }
}
</style>