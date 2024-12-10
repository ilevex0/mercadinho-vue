import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    cart: [],
    buyNowCart: [],
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
    buyNowClear(state) {
      state.buyNowCart = [];
    },
    buyNow(state, product) {
      state.buyNowCart.push(product);
    },
    clearCart(state) {
      state.cart = [];
    },
  }
});

