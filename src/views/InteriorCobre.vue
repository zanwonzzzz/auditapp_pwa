<template>
    <navbar></navbar>
    <!--este en realidad queria que fuera componente pero como ya necesito acabar esto asi se ba a ir
    y acabando todo valido y luego ya corrigo si hay malas practicas-->
    <div class="form-bg">
      <form class="audit-form" @submit.prevent="OnSubmit">
        <label>¿COLOCO SUJETADOR?</label>
        <select name="P_Sujetador" id="P_Sujetador" @change="LedsVerdes" v-model="P_Sujetador" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label for="txtFotoSujetador" v-if="bandera">FOTO: SUJETADOR</label>
        <input type="file" accept="image/*" v-if="bandera" @change="onFileChangeModem">
    
        <label>¿SE INSTALO ROSETA GRIS PARA DATOS?</label>
        <select name="P_Roseta" id="P_Roseta" @change="InstalacionRoseta" v-model="valorInstalacionRoseta" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="bandera2">FOTO: ROSETA GRIS</label>
        <input type="file" accept="image/*" v-if="bandera2" @change="onFileChangeRoseta">
    
        <label>¿LA ROSETA SE ENCUENTRA FIJA Y CON EL CONECTOR HACIA ABAJO?</label>
        <select name="P_Roseta_Conector" id="P_Roseta_Conector" @change="InstalacionRoseta" v-model="valorInstalacionRoseta" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="bandera2">FOTO: ROSETA FIJA</label>
        <input type="file" accept="image/*" v-if="bandera2" @change="onFileChangeRoseta">

        <label>¿SE INSTALO Y CONECTO CORRECTAMENTE EL DIT CON SPLITTER?</label>
        <select name="P_DIT" id="P_DIT" @change="InstalacionRoseta" v-model="valorInstalacionRoseta" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="bandera2">FOTO: DIT</label>
        <input type="file" accept="image/*" v-if="bandera2" @change="onFileChangeRoseta">
    
        <label>¿SE INSTALO CORDON INTERIOR GRIS?</label>
        <select name="P_CordonInt_Gris" id="P_CordonInt_Gris" @change="InstalacionRoseta" v-model="valorInstalacionRoseta" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="bandera2">FOTO: CORDON INTERIOR GRIS</label>
        <input type="file" accept="image/*" v-if="bandera2" @change="onFileChangeRoseta">
        
        <button type="submit">Avanzar</button>
      </form>
    </div>
    </template>
    <script setup>
    import navbar from '../components/navbar.vue';
    import { ref } from 'vue';
    import apiService from '../api/apiService';
    import { useRoute,useRouter } from 'vue-router';
    
    const bandera = ref(false)
    const bandera2 = ref(false)
    const valorLedsVerdes = ref('')
    const valorInstalacionRoseta = ref('')
    const fotoModem = ref(null)
    const fotoRoseta = ref(null)
    const foliopisa = useRoute().params.foliopisa
    const router = useRouter()
    const directorioModem = '../modem_funcionando_fotos'
    const directorioRoseta = '../roseta_fotos'
    function OnSubmit()
    {
        apiService.Inserts(foliopisa,{"F_ModemFuncionando":fotoModem.value,"P_ModemFuncionando":valorLedsVerdes.value,"F_Roseta":fotoRoseta.value,"P_Roseta":valorInstalacionRoseta.value})
        router.push(`/observaciones/finales/${foliopisa}`)
    }
    
    function LedsVerdes()
    {
        bandera.value = valorLedsVerdes.value == 'NO'
    }
    function InstalacionRoseta()
    {
        bandera2.value = valorInstalacionRoseta.value == 'NO'
    }
    
    function onFileChangeModem(e) {
      const file = e.target.files[0]
      fotoModem.value = file || null
    }
    function onFileChangeRoseta(e) {
      const file = e.target.files[0]
      fotoRoseta.value = file || null
    }
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
    
    input[type="text"], input[type="file"], select {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #b81933;
      font-size: 1rem;
      outline: none;
      margin-bottom: 8px;
      background: #fff;
      color: #b81933;
      width: 100%;
      box-sizing: border-box;
    }
    
    input[type="text"]:focus, input[type="file"]:focus, select:focus {
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