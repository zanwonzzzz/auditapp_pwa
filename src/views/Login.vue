<template>
  <div class="main-bg">
    <div class="login-box">
      <img id="imagen" src="../assets/auditap.png" alt="auditapp" class="logo-img">
    <form @submit.prevent="OnSubmit">
    <input
      type="text"
      id="txtLogin"
      autocomplete="off" 
      placeholder="Usuario"
      class="login-input"
      v-model="usuario"/>
    <button type="submit" class="login-btn">Iniciar</button>
  </form>
    </div>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
.main-bg {
  width: 100vw;
  height: 100vh;
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
  width: 100%;
  max-width: 400px;
  min-width: 0;
  box-sizing: border-box;
}

.logo-img {
  width: 180px;
  max-width: 70vw;
  margin-bottom: 24px;
}

.login-input {
  width: 100%;
  padding: 10px 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
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

@media (max-width: 600px) {
  .login-box {
    padding: 24px 8px;
    max-width: 95vw;
  }
  .logo-img {
    width: 120px;
    margin-bottom: 16px;
  }
  .login-input, .login-btn {
    font-size: 1rem;
    padding: 8px 10px;
  }
}
</style>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const usuario = ref('');
const router = useRouter();

function OnSubmit() {
  axios.post('http://127.0.0.1:8000/login', {
    user: usuario.value,
  })
  .then(function (response) {
    console.log(response);
    localStorage.setItem('token',response.data.token)
    
    router.push('/menu');
  })
  .catch(function (error) {
    console.log(error);
  });
}
//ROUTER PUSH ES PARA NAVEGAR ENTRE RUTAS Y ROUTER GO ES PARA COMO REGRESARSE
</script>
