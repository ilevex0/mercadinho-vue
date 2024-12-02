<template>
  <div class="ProductsComponent">
    <CarouselComponent />
    <p>Attention! All the images are provided from <a href="https://www.amazon.com" target="_blank">Amazon</a></p>
    <h2 class="products-category">Technology</h2>
    <div class="products">
      <p v-if="failedToFetch">
        Sorry, we couldn't load the products. Please try again later.
      </p>
      <div class="product" v-for="(product, index) in filteredTechProducts" :key="index">
        <img
          :src="require(`@/assets/products_images/${product.image}.png`)"
          :alt="product.imageAlt"
          class="product-image"
          @click="addToCart(product, index)"
        />
        <div>
          <p class="product-title" @click="addToCart(product, index)">
            {{ product.name }}
          </p>
          <p class="product-description" @click="addToCart(product, index)">
            {{ product.description }}
          </p>

          <div class="button-and-price">
            <p class="product-price">${{ product.price.toFixed(2) }}</p>
            <b-button
              href="#"
              variant="primary"
              @click="addToCart(product, index)"
              >{{ buttonText(index) }}</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselComponent from "./CarouselComponent.vue";
import axios from "axios";

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
        "https://gist.githubusercontent.com/ilevex0/f460b3445549733edabcc90027803ff6/raw/4d3d3f22733a11ef99aeccdd5211a4d86bbc842c/products.json"
      )
      .then((response) => {
        this.products = response.data;
      })
      .catch(() => {
        this.failedToFetch = true;
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
  computed: {
    filteredTechProducts() {
        return this.products.filter(product => product.category === 'technology');
      },
  }
};
</script>

<style scoped>
* {
  margin: 0px;
}
.products-category {
  margin: 30px;
  text-align: start;
}
.products {
  display: flex;
  flex-wrap: nowrap;
  gap: 30px;
  align-content: center;
  justify-content: center;
  overflow-x: auto;
}
.product {
  width: 15%;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 10px;
}
.product-image {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}
.product-image:hover {
  scale: 1.01;
  transition: .5s;
}
.product-title,
.product-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.product-price {
  font-weight: bold;
  cursor: auto;
}
.button-and-price {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}
</style>
