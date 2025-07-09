<template>
  <div class="main-bg">
    <div class="login-box">
      <img id="imagen" src="" alt="auditapp" class="logo-img">
      <router-link to="/ordenes">Ordenes</router-link> 
      <button class="apartado">Cerrar</button>
      <button class="apartado">ultimo</button>
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

.apartado {
  background: #2f6ab8;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3px;
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
import { RouterLink } from 'vue-router';
</script>