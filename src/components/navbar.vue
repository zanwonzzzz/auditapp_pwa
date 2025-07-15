<template>
  <nav class="navbar-custom">
    <div class="navbar-content">
      <img class="navbar-logo" src="../assets/enlace.png" alt="logo">
      <span class="navbar-username">{{ username }}</span>
      <div class="navbar-actions">
        <button class="icon-btn" @click="regresar" title="Regresar">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>
        <button class="icon-btn" @click="logout" title="Cerrar sesión">
          <font-awesome-icon :icon="['fas', 'power-off']" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../api/authService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faPowerOff } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft, faPowerOff);

const router = useRouter();
const username = ref();
function regresar() { router.back(); }
function logout() { router.push('/'); }

onMounted(async () => {
  const nombre_Auditor = await authService.getUserAuditor();
  username.value = nombre_Auditor;
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.navbar-custom {
  width: 100%;
  background: linear-gradient(135deg, #b69298 0%, #b81933 100%);
  padding: 0.5rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
}

.navbar-logo {
  height: 40px;
  width: auto;
  margin-right: 1rem;
}

.navbar-username {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  margin-left: 1rem;
  margin-right: auto;
}

.navbar-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: background 0.2s;
}
.icon-btn:hover {
  background: rgba(255,255,255,0.12);
}

@media (max-width: 600px) {
  .navbar-content {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.5rem;
  }
  .navbar-logo {
    height: 28px; /* Un poco más grande */
    margin-bottom: 0;
  }
  .navbar-username {
    font-size: 1rem; /* Un poco más grande */
    margin-bottom: 0;
    margin-left: 0.5rem;
    margin-right: auto;
  }
  .navbar-actions {
    width: auto;
    justify-content: flex-end;
  }
  .icon-btn {
    font-size: 1.4rem; /* Un poco más grande */
    padding: 0.22rem 0.5rem;
  }
  .navbar-custom {
    padding: 0.32rem 0; /* Un poco menos delgada */
    min-height: unset;
    line-height: 1.2;
    background: linear-gradient(135deg, #b69298 0%, #b81933 100%) !important; /* Solo gradiente, sin fondo negro */
    box-shadow: 0 2px 8px rgba(0,0,0,0.08); /* Sombra suave, no fondo negro */
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
}
</style>