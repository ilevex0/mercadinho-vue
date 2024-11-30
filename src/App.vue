<template>
  <div id="app">
    <div class="div-nav">
      <nav class="nav">
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-link to="/carrinho"><img src="./assets/shopping_bag.svg" alt="My Shopping Cart"></router-link>
      </nav>
    </div>
    <router-view @addProduct="addProduct" :cart="cart"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    addProduct(product) {
      this.cart.push(product);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.div-nav {
  padding: 30px;
  padding-top: 40px;
  background-color: #1a1a1a;
}
.nav {
  gap: 10px;
}
</style>
