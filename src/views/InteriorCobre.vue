<template>
    <navbar></navbar>
    <!--este en realidad queria que fuera componente pero como ya necesito acabar esto asi se ba a ir
    y acabando todo valido y luego ya corrigo si hay malas practicas-->
    <div class="form-bg">
      <form class="audit-form" @submit.prevent="OnSubmit">
        <label>¿COLOCO SUJETADOR?</label>
        <select name="P_Sujetador" id="P_Sujetador" @change="toggleSujetador" v-model="P_Sujetador" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label for="txtFotoSujetador" v-if="banderaSujetador">FOTO: SUJETADOR</label>
        <input type="file" accept="image/*" v-if="banderaSujetador" @change="onFileChangeSujetador">
    
        <label>¿SE INSTALO ROSETA GRIS PARA DATOS?</label>
        <select name="P_Roseta" id="P_Roseta" @change="toggleRoseta" v-model="P_Roseta" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="banderaRoseta">FOTO: ROSETA GRIS</label>
        <input type="file" accept="image/*" v-if="banderaRoseta" @change="onFileChangeRoseta">
    
        <label>¿LA ROSETA SE ENCUENTRA FIJA Y CON EL CONECTOR HACIA ABAJO?</label>
        <select name="P_Roseta_Conector" id="P_Roseta_Conector" @change="toggleRosetaConector" v-model="P_Roseta_Conector" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="banderaRosetaConector">FOTO: ROSETA FIJA</label>
        <input type="file" accept="image/*" v-if="banderaRosetaConector" @change="onFileChangeRosetaConector">

        <label>¿SE INSTALO Y CONECTO CORRECTAMENTE EL DIT CON SPLITTER?</label>
        <select name="P_DIT" id="P_DIT" @change="toggleDIT" v-model="P_DIT" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="banderaDIT">FOTO: DIT</label>
        <input type="file" accept="image/*" v-if="banderaDIT" @change="onFileChangeDIT">
    
        <label>¿SE INSTALO CORDON INTERIOR GRIS?</label>
        <select name="P_CordonInt_Gris" id="P_CordonInt_Gris" @change="toggleCordonGris" v-model="P_CordonInt_Gris" required>
          <option value="">SELECCIONA LA RESPUESTA</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
    
        <label v-if="banderaCordonGris">FOTO: CORDON INTERIOR GRIS</label>
        <input type="file" accept="image/*" v-if="banderaCordonGris" @change="onFileChangeCordonGris">
        
        <button type="submit">Avanzar</button>
      </form>
    </div>
    </template>
    <script setup>
    import navbar from '../components/navbar.vue';
    import { ref } from 'vue';
    import apiService from '../api/apiService';
    import { useRoute,useRouter } from 'vue-router';
    
    const banderaSujetador = ref(false)
    const banderaRoseta = ref(false)
    const banderaRosetaConector = ref(false)
    const banderaDIT = ref(false)
    const banderaCordonGris = ref(false)
    
    const P_Sujetador = ref('')
    const P_Roseta = ref('')
    const P_Roseta_Conector = ref('')
    const P_DIT = ref('')
    const P_CordonInt_Gris = ref('')
    
    const fotoSujetador = ref(null)
    const fotoRoseta = ref(null)
    const fotoRosetaConector = ref(null)
    const fotoDIT = ref(null)
    const fotoCordonGris = ref(null)
    
    const foliopisa = useRoute().params.foliopisa
    const router = useRouter()
    
    const directorioSujetador = '../sujetador_interior_fotos'
    const directorioRoseta = '../roseta_fotos'
    const directorioRosetaConector = '../roseta_conector_fotos'
    const directorioDIT = '../fdit_fotos'
    const directorioCordonGris = '../cordon_interior_gris_fotos'
    function OnSubmit()
    {
        apiService.Inserts(foliopisa,{
            "F_Sujetador": fotoSujetador.value ? fotoSujetador.value.name : '',
            "P_Sujetador": P_Sujetador.value,
            "F_Roseta": fotoRoseta.value ? fotoRoseta.value.name : '',
            "P_Roseta": P_Roseta.value,
            "F_Roseta_Conector": fotoRosetaConector.value ? fotoRosetaConector.value.name : '',
            "P_Roseta_Conector": P_Roseta_Conector.value,
            "F_DIT": fotoDIT.value ? fotoDIT.value.name : '',
            "P_DIT": P_DIT.value,
            "F_CordonInt_Gris": fotoCordonGris.value ? fotoCordonGris.value.name : '',
            "P_CordonInt_Gris": P_CordonInt_Gris.value
        })
        router.push(`/observaciones/finales/${foliopisa}`)
    }
    
    function toggleSujetador()
    {
        banderaSujetador.value = P_Sujetador.value === 'NO'
    }
    
    function toggleRoseta()
    {
        banderaRoseta.value = P_Roseta.value === 'NO'
    }
    
    function toggleRosetaConector()
    {
        banderaRosetaConector.value = P_Roseta_Conector.value === 'NO'
    }
    
    function toggleDIT()
    {
        banderaDIT.value = P_DIT.value === 'NO'
    }
    
    function toggleCordonGris()
    {
        banderaCordonGris.value = P_CordonInt_Gris.value === 'NO'
    }
    
    function onFileChangeSujetador(e) {
      const file = e.target.files[0]
      if (file) {
        const extension = file.name.split('.').pop()
        const nuevoNombre = `${directorioSujetador}/${foliopisa}.${extension}`
        
        const fileRenombrado = new File([file], nuevoNombre, {
          type: file.type,
          lastModified: file.lastModified
        })
        
        fotoSujetador.value = fileRenombrado
      } else {
        fotoSujetador.value = null
      }
    }

    function onFileChangeRoseta(e) {
      const file = e.target.files[0]
      if (file) {
        const extension = file.name.split('.').pop()
        const nuevoNombre = `${directorioRoseta}/${foliopisa}.${extension}`
        
        const fileRenombrado = new File([file], nuevoNombre, {
          type: file.type,
          lastModified: file.lastModified
        })
        
        fotoRoseta.value = fileRenombrado
      } else {
        fotoRoseta.value = null
      }
    }

    function onFileChangeRosetaConector(e) {
      const file = e.target.files[0]
      if (file) {
        const extension = file.name.split('.').pop()
        const nuevoNombre = `${directorioRosetaConector}/${foliopisa}.${extension}`
        
        const fileRenombrado = new File([file], nuevoNombre, {
          type: file.type,
          lastModified: file.lastModified
        })
        
        fotoRosetaConector.value = fileRenombrado
      } else {
        fotoRosetaConector.value = null
      }
    }

    function onFileChangeDIT(e) {
      const file = e.target.files[0]
      if (file) {
        const extension = file.name.split('.').pop()
        const nuevoNombre = `${directorioDIT}/${foliopisa}.${extension}`
        
        const fileRenombrado = new File([file], nuevoNombre, {
          type: file.type,
          lastModified: file.lastModified
        })
        
        fotoDIT.value = fileRenombrado
      } else {
        fotoDIT.value = null
      }
    }

    function onFileChangeCordonGris(e) {
      const file = e.target.files[0]
      if (file) {
        const extension = file.name.split('.').pop()
        const nuevoNombre = `${directorioCordonGris}/${foliopisa}.${extension}`
        
        const fileRenombrado = new File([file], nuevoNombre, {
          type: file.type,
          lastModified: file.lastModified
        })
        
        fotoCordonGris.value = fileRenombrado
      } else {
        fotoCordonGris.value = null
      }
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