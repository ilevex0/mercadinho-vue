<template>
  <div class="ProductsComponent">
    <h1>Products</h1>
    <hr />
    <div class="products">
      <b-card
        v-for="(product, index) in products"
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
        {
          name: "1",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 0,
        },
        {
          name: "2",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 1,
        },
        {
          name: "4",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 2,
        },
        {
          name: "5",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 3,
        },
        {
          name: "6",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 4,
        },
        {
          name: "7",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 5,
        },
        {
          name: "3",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 6,
        },
        {
          name: "8",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 7,
        },
        {
          name: "9",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 8,
        },
        {
          name: "10",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 9,
        },
        {
          name: "11",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 10,
        },
        {
          name: "12",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          quantity: 0,
          id: 11,
        },
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
