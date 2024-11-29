import Vue from "vue";
import Router from "vue-router";

// Importar os componentes de páginas
import HomeComponent from "./components/HomeComponent.vue";
import AboutVue from "./components/AboutVue.vue";

// Informar ao Vue que vamos usar o Vue Router
Vue.use(Router);

// Definir as rotas
const routes = [
  {
    path: "/about",
    name: "about",
    component: AboutVue,
  },
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  }
];

// Criar e exportar o roteador
const router = new Router({
  routes,
  mode: "history", // Usar o modo 'history' para evitar os # nas URLs
});

export default router;
