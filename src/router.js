import Vue from "vue";
import Router from "vue-router";

// Importar os componentes de páginas
import AboutPage from "./pages/AboutPage.vue";
import CartPage from "./pages/CartPage.vue";
import HomePage from "./pages/HomePage.vue";
import PurchasePage from "./pages/PurchasePage.vue";
import ProductDetailsPage from "./pages/ProductDetailsPage.vue"
import PurchasingPage from "./pages/PurchasingPage.vue";

// Informar ao Vue que vamos usar o Vue Router
Vue.use(Router);

// Definir as rotas
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
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
  {
    path: "/productdetailspage/:productimage",
    name: "productdetailspage",
    component: ProductDetailsPage,
  },
  {
    path: "/purchasingpage",
    name: "purchasingpage",
    component: PurchasingPage,
  }
];

// Criar e exportar o roteador
const router = new Router({
  routes,
  mode: "history", // Usar o modo 'history' para evitar os # nas URLs
});

export default router;
