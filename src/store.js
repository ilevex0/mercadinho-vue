import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    buyNowCart: JSON.parse(localStorage.getItem('buyNowCart')) || [],
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getBuyNowCart(state) {
      return state.buyNowCart;
    },
  },
  mutations: {
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    buyNowClear(state) {
      state.buyNowCart = [];
      localStorage.removeItem('buyNowCart');
    },
    buyNow(state, product) {
      state.buyNowCart.push(product);
      localStorage.setItem('buyNowCart', JSON.stringify(state.buyNowCart));
    },
  }
});

