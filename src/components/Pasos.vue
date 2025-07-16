<template>
  <div class="pasos-container">
    <button @click="Nav('revision')" class="paso-btn">Revision Externa</button>
    <button @click="Nav('domicilio')" class="paso-btn">Domicilio del cliente</button>
    <button class="paso-btn">Posteo en falso</button>
    <button class="paso-btn">No localizada</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue';

const router = useRouter()
const emit = defineEmits('Nav')

function Nav(ruta){
  emit('Nav',ruta)
}
</script>

<style scoped>
.pasos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.paso-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #b81933;
  background: transparent;
  color: #b81933;
  font-weight: 600;
  min-width: 140px;
  flex: 1;
  max-width: 200px;
}

.paso-btn:hover {
  background: #b81933;
  color: white;
}

@media (max-width: 600px) {
  .pasos-container {
    flex-direction: column;
    align-items: center;
  }
  
  .paso-btn {
    width: 100%;
    max-width: 300px;
    min-width: auto;
  }
}
</style>