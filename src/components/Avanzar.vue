<template>
     <div class="buttons-container">
        <button class="action-btn" @click="showModal = true">Fotos</button>
        <button @click="avanzar('pasos')" class="action-btn primary">Avanzar</button>
      </div>

      <!-- Modal HTML tradicional -->
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">Fotos de la Auditoría</h5>
            <button type="button" class="close-btn" @click="showModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-images">
              <img :src="ruta + 'foto_casa_cliente/' + foliopisa + '.jpg'" alt="foto_casa_cliente" class="modal-image">
              <img :src="ruta + 'foto_puerto/' + foliopisa + '.jpg'" alt="foto_puerto" class="modal-image">
              <img :src="ruta + 'foto_INE/' + foliopisa + '.jpg'" alt="foto_INE" class="modal-image">
            </div>
          </div>
        </div>
      </div>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
import { ref } from 'vue'

const showModal = ref(false)
const ruta = "https://vps.ed-intra.com/API/imagesCordiapp/"

const router = useRouter()
const route = useRoute()
const foliopisa = route.params.foliopisa

function avanzar(ruta)
{
    router.push(`/detalle/${foliopisa}/${ruta}`)
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.action-btn {
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

.action-btn:hover {
  background: #b81933;
  color: white;
}

.action-btn.primary {
  border-color: #b81933;
  color: #b81933;
}

.action-btn.primary:hover {
  background: #b81933;
  color: white;
}

@media (max-width: 600px) {
  .buttons-container {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 300px;
    min-width: auto;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #000;
}

.modal-body {
  padding: 20px;
}

.modal-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>