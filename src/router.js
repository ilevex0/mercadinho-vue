import Vue from "vue";
import Router from "vue-router";

// Importar os componentes de páginas
import AboutPage from "./pages/AboutPage.vue";
import CartPage from "./pages/CartPage.vue";
import ProductsComponent from "./components/ProductsComponent.vue";
import PurchasePage from "./pages/PurchasePage.vue";

// Informar ao Vue que vamos usar o Vue Router
Vue.use(Router);

// Definir as rotas
const routes = [
  {
    path: "/",
    name: "home",
    component: ProductsComponent,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/my-cart",
    name: "my-cart",
    component: CartPage,
  },
  {
    path: "/purchase",
    name: "purchase",
    component: PurchasePage,
  },
];

// Criar e exportar o roteador
const router = new Router({
  routes,
  mode: "history", // Usar o modo 'history' para evitar os # nas URLs
});

export default router;
