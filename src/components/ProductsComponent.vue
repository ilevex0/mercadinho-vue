<template>
  <div class="ProductsComponent">
    <h1>Products</h1>
    <hr />
    <div class="products">
      <b-card
        v-for="(product, index) in products"
        :key="index"
        :title="product.name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem"
        class="mb-2"
      >
        <p>R$:{{ product.price }}</p>
        <b-card-text> This is a example product</b-card-text>
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
export default {
  name: "ProductsComponent",
  data() {
    return {
      products: [
        { name: "1", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "2", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "4", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "5", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "6", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "7", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "3", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "8", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "9", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "10", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "11", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
        { name: "12", price: 30.5, description: "This is a example product", buttonIsPressed: 0},
      ],
    };
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
      product.buttonIsPressed += 1;
    },
    buttonText(index) {
      return this.products[index].buttonIsPressed > 0 ? `Added! (${this.products[index].buttonIsPressed})` : "Add to cart!"
    }
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
