<template>
    <navbar></navbar>
    <div class="form-container">
        <form @submit.prevent="OnSubmit" class="audit-form">
            <div class="form-header">
                <h2>POSTEO EN FALSO</h2>
                <p>Complete los datos de la auditoría</p>
            </div>
            
            <div class="form-group">
                <label for="folio">Orden</label>
                <input type="text" id="folio" :value="foliopisa" class="form-input" readonly>
            </div>
            
            <div class="form-group">
                <label for="Evidencia_Instalacion">EVIDENCIA NO EXISTE INSTALACIÓN</label>
                <input type="file" id="Evidencia_Instalacion" name='Evidencia_Instalacion' accept="image/*" @change="onFileChange" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="lat_auditor">LATITUD</label>
                <input type="text" id="lat_auditor" name='lat_auditor' v-model="lat_auditor" class="form-input" placeholder="Latitud automática">
            </div>
            
            <div class="form-group">
                <label for="lon_auditor">LONGITUD</label>
                <input type="text" id="lon_auditor" name='lon_auditor' v-model="lon_auditor" class="form-input" placeholder="Longitud automática">
            </div>
            
            <div class="form-group">
                <label for="P_Observaciones_Finales">COMENTARIOS</label>
                <input type="text" id="P_Observaciones_Finales" name='P_Observaciones_Finales' v-model="P_Observaciones_Finales" class="form-input" placeholder="Ingrese los comentarios" required>
            </div>
            
            <button type="submit" class="submit-btn">Avanzar</button>
        </form>
    </div>
</template>
<script setup>
import navbar from '../components/navbar.vue';
import { useRouter,useRoute } from 'vue-router';
import apiService from '../api/apiService';
import { ref,onMounted } from 'vue';


const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const lat_auditor = ref("")
const lon_auditor = ref("")
const P_Observaciones_Finales = ref("")
const Evidencia_Instalacion = ref(null)
const directorioNoInst = '../no_instalacion_fotos'

function useGeolocation() {
  if (!navigator.geolocation) {
    error.value = 'Geolocalización no soportada'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat_auditor.value = position.coords.latitude.toFixed(6)
      lon_auditor.value = position.coords.longitude.toFixed(6)
    },
    (err) => {
      error.value = 'Error obteniendo ubicación: ' + err.message
    }
  )
}

onMounted(() => {
  useGeolocation()
})

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const extension = file.name.split('.').pop()
    const nuevoNombre = `${directorioNoInst}/${foliopisa}.${extension}`
    
    const fileRenombrado = new File([file], nuevoNombre, {
      type: file.type,
      lastModified: file.lastModified
    })
    
    Evidencia_Instalacion.value = fileRenombrado
  } else {
    Evidencia_Instalacion.value = null
  }
}

function OnSubmit()
{
     const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
    const fecha_auditoria = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`

    const noExiste = apiService.Inserts(foliopisa,{"Evidencia_Instalacion":Evidencia_Instalacion.value ? Evidencia_Instalacion.value.name : '',
     "P_Observaciones_Finales":P_Observaciones_Finales.value,"P_Domicilio":"NO",
     "Estatus_Auditoria":"POSTEO EN FALSO","lat_auditor":lat_auditor.value,
     "lon_auditor":lon_auditor.value,"Fecha_Fin":fecha_auditoria.value,"Existe_Instalacion":"NO"
    })
    router.push('/ordenes')
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
        padding: 10px;
        padding-top: 60px;
        min-height: 100vh;
    }
    
    .audit-form {
        padding: 20px 15px;
        margin: 5px;
        max-width: 100%;
        border-radius: 12px;
    }
    
    .form-header h2 {
        font-size: 20px;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
    }
    
    .form-header p {
        font-size: 12px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        font-size: 11px;
        margin-bottom: 4px;
    }
    
    .form-input, .form-select {
        padding: 8px 10px;
        font-size: 14px;
    }
    
    .submit-btn {
        padding: 10px;
        font-size: 14px;
        margin-top: 10px;
    }
}

@media (max-width: 480px) {
    .form-container {
        padding: 5px;
        padding-top: 50px;
    }
    
    .audit-form {
        padding: 15px 12px;
        margin: 2px;
        border-radius: 10px;
    }
    
    .form-header h2 {
        font-size: 18px;
        margin-bottom: 6px;
    }
    
    .form-header p {
        font-size: 11px;
    }
    
    .form-group {
        margin-bottom: 12px;
    }
    
    .form-group label {
        font-size: 10px;
        margin-bottom: 3px;
    }
    
    .form-input, .form-select {
        padding: 6px 8px;
        font-size: 13px;
        border-radius: 6px;
    }
    
    .submit-btn {
        padding: 8px;
        font-size: 13px;
        margin-top: 8px;
        border-radius: 6px;
    }
}

@media (max-width: 360px) {
    .audit-form {
        padding: 12px 10px;
    }
    
    .form-header h2 {
        font-size: 16px;
    }
    
    .form-header p {
        font-size: 10px;
    }
    
    .form-input, .form-select {
        padding: 5px 6px;
        font-size: 12px;
    }
    
    .submit-btn {
        padding: 6px;
        font-size: 12px;
    }
}

/* Landscape orientation for mobile */
@media (max-height: 500px) and (orientation: landscape) {
    .form-container {
        min-height: 100vh;
        padding: 5px;
    }
    
    .audit-form {
        padding: 12px 10px;
        max-height: 85vh;
        overflow-y: auto;
    }
    
    .form-group {
        margin-bottom: 8px;
    }
    
    .form-input, .form-select {
        padding: 5px 8px;
    }
    
    .submit-btn {
        padding: 6px;
        margin-top: 6px;
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