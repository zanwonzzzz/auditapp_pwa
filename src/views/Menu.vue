<template>
  <div class="main-bg">
    <div class="login-box">
      <img id="imagen" src="../assets/auditap.png" alt="auditapp" class="logo-img">
      <div class="menu-buttons">
        <router-link to="/ordenes" class="apartado">
          <font-awesome-icon :icon="['fas', 'suitcase']" />
        </router-link>
        <button @click="logout" class="apartado">
          <font-awesome-icon :icon="['fas', 'power-off']" />
        </button>
        <button class="apartado">
          <font-awesome-icon :icon="['fas', 'user-gear']" />
        </button>
      </div>
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

.menu-buttons {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.apartado {
  background: #2f6ab8;
  padding: 10px 18px;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  min-width: 80px;
  transition: background 0.2s;
  text-decoration: none;
}

.apartado:hover {
  background: #1d4e89;
}

.logo-img {
  width: 180px;
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .login-box {
    min-width: 0;
    width: 95vw;
    padding: 24px 8px;
  }
  .menu-buttons {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  .apartado {
    width: 100%;
    justify-content: center;
  }
}
</style>
<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSuitcase, faPowerOff, faUserGear } from '@fortawesome/free-solid-svg-icons';

library.add(faSuitcase, faPowerOff, faUserGear);

const router = useRouter()

function logout(){router.back()}
</script>