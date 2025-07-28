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
    path: "/interior/fibra/:foliopisa",
    component: () => import('../views/InteriorFibra.vue')
  },
  {
    path: "/interior/cobre/:foliopisa",
    component: () => import('../views/InteriorCobre.vue')
  },
  {
    path: "/observaciones/finales/:foliopisa",
    component: () => import('../components/ObservacionesFinales.vue')
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

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/']
  
  const token = localStorage.getItem('token')
  const hasValidToken = token && token !== '' && token !== 'null' && token !== 'undefined'
  
  if (to.path === '/' && hasValidToken) {
    console.log('Usuario ya autenticado, redirigiendo al menú')
    next('/menu')
    return
  }
  
  if (publicRoutes.includes(to.path)) {
    next()
    return
  }
  
  if (!hasValidToken) {
    console.log('No hay token válido, redirigiendo al login')
    next('/')
    return
  }
  next()
})

export default router

</script>