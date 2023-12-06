// router.ts
import Vue from 'vue';
import VueRouter, { NavigationGuard } from 'vue-router';
import HelloWorld from './src/components/HelloWorld.vue'
import registro from './src/components/registro.vue'
import Home from './src/Home.vue'
import { auth } from './firebaseConfig';

// se instancia las funciones de VueRouter
Vue.use(VueRouter);

// Guardia de navegación para verificar la autenticación
const requireAuth: NavigationGuard = function (to, from, next) {
  const isAuthenticated = auth.currentUser;

  if (isAuthenticated) {
    // Si el usuario está autenticado, permite el acceso a la ruta
    next();
    } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    next('/');
  }
};

const routes = [
  { path: '/', component: HelloWorld},
  { path: '/registro', component: registro},  
  {
    path: '/home',
    component: Home,
    beforeEnter: requireAuth as NavigationGuard, // Utiliza la guardia de navegación requireAuth para proteger la ruta
    },
    
];
 // se inicializa el enrutador
const router = new VueRouter({
    routes,
    });

// se exporta el enrutador
export default router;
