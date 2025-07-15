<script>
import { createRouter,createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    component: () => import('../views/Login.vue'),
  },
  {
    path: "/menu",
    component: () => import('../views/Menu.vue')
  },
  {
    path: "/ordenes",
    component: () => import('../views/Ordenes.vue')
  },
   {
    path: "/traslado/:foliopisa",
    component: () => import('../views/Iniciar_Traslado.vue')
  },
  ,
   {
    path: "/detalle/:foliopisa",
    component: () => import('../views/IniciarAuditoria.vue')
  },
  ,
   {
    path: "/revision/:foliopisa",
    component: () => import('../views/RevisionExterna.vue')
  },
  ,
   {
    path: "/domicilio/:foliopisa",
    component: () => import('../views/Domicilio.vue')
  },
   {
    path: "/cliente/:foliopisa",
    component: () => import('../views/Cliente.vue')
  },
];
//createWebHistory se utiliza para manejar la navegación en aplicaciones Vue 3 con URLs limpias 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router

</script>