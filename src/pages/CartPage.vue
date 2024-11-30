<template>
  <div class="CartPage">
    <h1>My Cart ({{ this.cart.length }})</h1>
    <hr />
    <div class="products">
      <b-card
        v-for="(product, index) in this.cart"
        :key="index"
        :title="product.name"
        :img-src="product.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem"
        class="mb-2"
      >
        <p>R$:{{ product.price }}</p>
        <b-card-text> This is a example product</b-card-text>
        <div class="cart_product_button">
            <b-button
              href="#"
              variant="primary"
              @click="changeProduct(product)"
              >Qtd: {{product.quantity}}</b-button
            >
            <b-button
              href="#"
              variant="danger"
              @click="removeFromCart(product)"
              ><img src="../assets/lixeira.svg" alt="Delete"></b-button
            >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFromCart(product) {
        this.$emit('removeFromCart', product);
    },
    changeProduct(product) {
        this.$emit("addProduct", product);
    }
  }
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 100px;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}
.cart_product_button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
</style>
