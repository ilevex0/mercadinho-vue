<template>
  <div class="ProductsComponent">
    <CarouselComponent />
    <hr />
    <div class="products">
      <p v-if="failedToFetch">Sorry, we couldn't load the products. Please try again later.</p>
      <b-card
        v-for="(product, index) in products"
        :key="index"
        :title="product.name"
        :img-src="product.image"
        :img-alt="product.imageAlt"
        img-top
        tag="article"
        style="max-width: 15rem"
        class="mb-2"
      >
        <b-card-text> This is a example product</b-card-text>
        <p>${{ product.price.toFixed(2) }}</p>
        <b-button
          href="#"
          variant="primary"
          @click="addToCart(product, index)"
          >{{ buttonText(index) }}</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import CarouselComponent from "./CarouselComponent.vue";
import axios from 'axios';

export default {
  name: "ProductsComponent",
  components: {
    CarouselComponent,
  },
  data() {
    return {
      products: [],
      failedToFetch: false,
    };
  },
  async created() {
    axios
      .get(
        "https://gist.githubusercontent.com/ilevex0/f460b3445549733edabcc90027803ff6/raw/1c8b814f06d039634fb1a9db28b48e4223331622/products.json"
      )
      .then((response) => {
        this.products = response.data;
      })
      .catch(() => {
        this.failedToFetch = true
      });
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(product) {
      this.$emit("addProduct", product);
      //
    },
    buttonText(index) {
      return this.products[index].quantity > 0
        ? `Added! (${this.products[index].quantity})`
        : "Add to cart!";
    },
  },
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
</style>
