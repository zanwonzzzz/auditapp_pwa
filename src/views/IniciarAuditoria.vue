<template>
    <navbar></navbar>
  <div class="main-bg">
    <div class="login-box">
      <div v-for="d in data" :key="d[0]">
       Detalle Orden:{{ d[0] }}
        Cope:{{ d[7] }}
        Distrito:{{ d[3] }}
        Terminal:{{ d[1] }}
        Puerto:{{ d[2] }}
        Tecnologia:{{ d[4] }}
        Cliente_Titular{{ d[5] }}
        Apellido Paterno{{ d[12] }}
        Apellido Materno {{ d[13] }}
        Telefono Cliente{{ d[6] }}
        Dirección del Cliente{{ d[11] }}
      </div>
      <!--carrusel-->
        <img :src="`${ruta}/foto_casa_cliente/${foliopisa}.jpg`" alt="">
        <img :src="`${ruta}/foto_puerto/${foliopisa}.jpg`" alt="">
        <img :src="`${ruta}/foto_INE/${foliopisa}.jpg`" alt="">
        <!--CUNADO SE REGRESE DEBE DE REGRESAR AL COMPONENTE D EPASOS Y LUEGO A LOS OTROS DOS BOTONES-->
        <button v-if="bandera">Fotos</button>
        <button v-if="bandera" @click="avanzar(false)">Avanzar</button>
        <Pasos v-if="!bandera" @Nav="Navegacion"></Pasos>
    </div>
  </div>
</template>

<style scoped>
.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  background: #23262a;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
}

.logo-img {
  width: 180px;
  margin-bottom: 24px;
}

.login-input {
  width: 90%;
  padding: 10px 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.login-btn {
  width: 50%;
  padding: 10px 0;
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.login-btn:hover {
  background: #fff;
  color: #23262a;
}
</style>
<script setup>
import navbar from '../components/navbar.vue';
import apiService from '../api/apiService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pasos from '../components/Pasos.vue';
import { useRouter } from 'vue-router';

const data = ref([])
const rutaRE = ref([])
const bandera = ref(true)
const route = useRoute()
const router = useRouter()
const foliopisa = route.params.foliopisa
const ruta = "https://vps.ed-intra.com/API/imagesCordiapp/"


 onMounted(async () => {
    const detalle = await apiService.DetalleOrdenes(foliopisa)
    data.value = detalle.data.Detalle_Orden

 })

 function avanzar(valor)
 {
   bandera.value = valor
 }

 function Navegacion(ruta){
  router.push(`/${ruta}/${foliopisa}`)
}

</script>