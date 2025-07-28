<template>
   <navbar></navbar>
   <div class="form-container">
        <form @submit.prevent="Domicilio" class="audit-form">
            <div class="form-header">
                <h2>Datos de Domicilio</h2>
                <p>Complete la información de ubicación</p>
            </div>
            
            <div class="form-group">
                <label for="Foto_Domicilio">FOTO: DOMICILIO</label>
                <input 
                    type="file" 
                    name="Foto_Domicilio" 
                    accept="image/*"
                    @change="onFileChange"
                    class="form-input"
                    required
                />
            </div>

            <div class="form-group">
                <label for="lat_auditor">LATITUD</label>
                <input 
                    type="text" 
                    name="lat_auditor" 
                    v-model="lat_auditor" 
                    readonly 
                    class="form-input"
                    placeholder="Se obtiene automáticamente"
                />
            </div>

            <div class="form-group">
                <label for="lon_auditor">LONGITUD</label>
                <input 
                    type="text" 
                    name="lon_auditor" 
                    v-model="lon_auditor" 
                    readonly 
                    class="form-input"
                    placeholder="Se obtiene automáticamente"
                />
            </div>

            <button type="submit" class="submit-btn">Avanzar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiService from '../api/apiService'
import { useRouter,useRoute } from 'vue-router'
import navbar from '../components/navbar.vue'

const lat_auditor = ref('')
const lon_auditor = ref('')
const Foto_Domicilio = ref(null) // ahora es archivo
const error = ref('')
const router = useRouter()
const route = useRoute()
const foliopisa = route.params.foliopisa
const P_Domicilio = "SI"
const directorioDomicilio = '../domicilio_fotos'

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
    const nuevoNombre = `${directorioDomicilio}/${foliopisa}.${extension}`
    
    const fileRenombrado = new File([file], nuevoNombre, {
      type: file.type,
      lastModified: file.lastModified
    })
    
    Foto_Domicilio.value = fileRenombrado
  } else {
    Foto_Domicilio.value = null
  }
}

function Domicilio() {
  // Aquí solo se manda el nombre del archivo, puedes adaptar para subirlo si lo necesitas
  apiService.Inserts(foliopisa,{
    "Foto_Domicilio": Foto_Domicilio.value ? Foto_Domicilio.value.name : '',
    "lat_auditor":lat_auditor.value,
    "lon_auditor":lon_auditor.value,
    "P_Domicilio":P_Domicilio.value
  })
  router.push(`/cliente/${foliopisa}`)
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

.form-input {
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

.form-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.form-input::placeholder {
    color: #636e72;
}

.form-input[readonly] {
    background: rgba(255, 255, 255, 0.8);
    color: #636e72;
    cursor: not-allowed;
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
    
    .form-input {
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
    
    .form-input {
        padding: 10px;
        font-size: 14px;
        border-radius: 8px;
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
    
    .form-input {
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
    
    .form-input {
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
        border: 0.5px solid rgba(255, 255, 255, 0.1);
    }
    
    .form-input {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
}
</style>
