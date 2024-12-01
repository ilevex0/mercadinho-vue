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
        <b-card-text> This is a example product</b-card-text>
        <p>R$:{{ product.price }}</p>
        <div class="cart_product_button">
          <b-button href="#" variant="primary" @click="changeProduct(product)">
            Qtd: {{ product.quantity }}
          </b-button>
          <b-button href="#" variant="danger" @click="removeFromCart(product)"
            ><img src="../assets/lixeira.svg" alt="Delete"
          /></b-button>
        </div>
      </b-card>
    </div>
    <div v-if="this.cart.length != 0">
      <h2>Is this okay?</h2>
      <p>Total price is: {{ totalPrice }}</p>
      <b-button href="#" variant="success" @click="confirmPurchase()">
        Purchase
      </b-button>
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
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeFromCart(product) {
      this.$emit("removeFromCart", product);
    },
    changeProduct(product) {
      this.$emit("addProduct", product);
    },
    confirmPurchase() {
      let timerInterval;
      this.$swal
        .fire({
          title: "Buying it!",
          html: "Wait a moment. <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const timer = this.$swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${this.$swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
        .then(() => {
          /* Read more about handling dismissals below */
          this.$emit("clearCart");
          this.$router.push('/purchase');
        });
    },
  },
};
</script>

<style scoped>
.products {
  display: flex;
  align-items: center;
  justify-content: center;
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
.purchase_button {
  color: white;
  text-decoration-line: none;
}
</style>
