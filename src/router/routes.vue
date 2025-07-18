<script>
import { createRouter,createWebHistory } from 'vue-router';
//cuando declaras las rutas si es por orden 
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
    component: () => import('../views/IniciarAuditoria.vue'),
    children: [
    {
      path: '',
      redirect: to => {
        return `/detalle/${to.params.foliopisa}/avanzar`
      }
    },
      {
        path: 'avanzar',
        component: () => import('../components/Avanzar.vue'),
      },
      {
        path: 'pasos',
        component: () => import('../components/Pasos.vue'),
      }
    ]
  },
  ,
   {
    path: "/revision/:foliopisa",
    component: () => import('../views/RevisionExterna.vue')
  },
   {
        path: '/observaciones/:foliopisa',
        component: () => import('../components/Observaciones.vue'),
    }
  ,
   {
    path: "/domicilio/:foliopisa",
    component: () => import('../views/Domicilio.vue')
  },
   {
    path: "/cliente/:foliopisa",
    component: () => import('../views/Cliente.vue')
  },
  {
    path: "/busqueda",
    component: () => import('../views/Busqueda.vue')
  },
  {
    path: "/no/existe/:foliopisa",
    component: () => import('../views/NoExiste.vue')
  },
  {
    path: "/no/domicilio/:foliopisa",
    component: () => import('../views/NoDomicilio.vue')
  },
];
//createWebHistory se utiliza para manejar la navegación en aplicaciones Vue 3 con URLs limpias 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router

</script>