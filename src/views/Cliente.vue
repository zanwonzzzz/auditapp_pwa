<template>
<navbar></navbar>
<div class="form-container">
  <div class="audit-form">
    <div v-if="bandera" class="button-section">
      <div class="form-header">
        <h2>Estado del Cliente</h2>
        <p>Seleccione el estado del cliente</p>
      </div>
      <button name="Cliente_Lo" id="Cliente_Lo" @click="OnSubmit($event)" class="action-btn">Cliente Localizado</button>
      <button name="Cliente_NoLo" id="Cliente_NoLo" @click="OnSubmit($event)" class="action-btn">Cliente No Localizado</button>
    </div>

    <form id="FormLocalizado" v-if="!bandera" @submit.prevent="Localizado">
      <div class="form-header">
        <h2>Información del Cliente</h2>
        <p>Complete la información requerida</p>
      </div>
      
      <div class="form-group">
        <label for="P_Cobro_Instalacion">¿Le solicitaron algún cobro por la instalación?</label>
        <select name="P_Cobro_Instalacion" id="P_Cobro_Instalacion" class="form-input">
          <option value="">Selecciona una respuesta</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="Acceso_Domicilio">¿Pudo acceder al domicilio?</label>
        <select name="Acceso_Domicilio" id="Acceso_Domicilio" class="form-input">
          <option value="">Selecciona una respuesta</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
      </div>
      
      <button type="submit" class="submit-btn">Avanzar</button>
    </form>
  </div>
</div>
</template>

<script setup>
import navbar from '../components/navbar.vue';
import { useRoute,useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const bandera = ref(true)
function OnSubmit($event)
{
    var boton = showMessage($event)
    LocalizadoN(boton)

}
//const showMessage = (event) => alert(event.target.name);
function showMessage(event)
{
   const nombre = event.target.name
   return nombre
}

function LocalizadoN(nombre)
{
    if(nombre == "Cliente_Lo"){bandera.value = false}
    else {router.push('/ordenes')}
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

.button-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
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

.action-btn {
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
}

.action-btn:hover {
    background: #a0152a;
    border-color: #a0152a;
    transform: translateY(-1px);
}

.action-btn:active {
    transform: translateY(-1px);
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
        padding: 10px 12px;
        font-size: 0.85rem;
    }
    
    .action-btn, .submit-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
}
</style>