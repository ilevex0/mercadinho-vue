<template>
  <div class="SearchPage">
    <div class="results-number">
      <p class="results-number-text">
        Found {{ filteredProducts.length }} results for
        <b>"{{ this.$route.params.search.trim().toLowerCase() }}"</b>
      </p>
    </div>
    <h1>Results</h1>
    <ul class="product-container">
      <li v-for="product in filteredProducts" :key="product.id" class="product">
        <img
          :src="require(`@/assets/products_images/${product.image}.png`)"
          :alt="product.imageAlt"
          class="product-image"
          @click="seeProduct(product)"
        />
        <h2 class="product-title" @click="seeProduct(product)">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">
          {{
            product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}
        </p>
        <b-button variant="outline-primary" @click="addToCart(product)"
          >Add to Cart</b-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchPage",
  data() {
    return {
      products: [],
      failedToFetch: false,
    };
  },
  props: {
    searchQuery: {
      String,
      required: true,
    },
    APIRequest: {
      String,
      required: true,
    },
  },
  async created() {
    axios
      .get(this.APIRequest)
      .then((response) => {
        this.products = response.data;
      })
      .catch(() => {
        this.failedToFetch = true;
      });
  },
  methods: {
    addToCart(product) {
      product.quantity = 1;
      this.$emit("addProduct", product);
    },
    seeProduct(product) {
      this.$emit("seeProduct", product);
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(this.$route.params.search.trim().toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.results-number {
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.results-number-text {
  justify-self: start;
  margin: 0;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;

  list-style-type: none;
  padding-left: 0;
}
.product {
  max-width: 300px;
  padding: 20px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
}
.product-image {
  width: 100%;
  cursor: pointer;
}
.product-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.product-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
}
.product-price {
  font-size: 32px;
}
</style>
