<template>
  <div class="HomePage">
    <CarouselComponent />
    <p v-if="failedToFetch">
      Sorry, we couldn't load the products. Please try again later.
    </p>
    <section v-if="!failedToFetch">
      <h2 class="products-category">Best Sellers in Technology</h2>
      <div class="products">
        <div
          class="product"
          v-for="(product, index) in filteredTechProducts"
          :key="index"
        >
          <ProductCard :product="product" :index="index" :seeProduct="seeProduct"/>
        </div>
      </div>
    </section>
    <section v-if="!failedToFetch">
      <h2 class="products-category">Best Sellers in Kitchen</h2>
      <div class="products">
        <div class="products">
          <div
            class="product"
            v-for="(product, index) in filteredKichenProducts"
            :key="index"
          >
            <ProductCard :product="product" :index="index" :seeProduct="seeProduct"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CarouselComponent from "../components/CarouselComponent.vue";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "HomePage",
  components: {
    CarouselComponent,
    ProductCard,
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
        this.APIRequest
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
    APIRequest: { 
      String,
      required: true,
    }
  },
  methods: {
    seeProduct(product) {
      this.$emit("seeProduct", product);
    },
    addToCart(product) {
      this.$emit("addProduct", product);

    },
    changeQuantity(product) {
      this.$emit("changeQuantity", product)
    },
    buttonText(productid) {
      return this.products[productid].quantity > 0
        ? `Added! (${this.products[productid].quantity})`
        : "Add to cart!";
    },
  },
  computed: {
    filteredTechProducts() {
      return this.products.filter(
        (product) => product.category === "technology"
      );
    },
    filteredKichenProducts() {
      return this.products.filter((product) => product.category === "kitchen");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0px;
}
section {
  margin: 1rem 3rem 1rem 3rem;
}
.products-category {
  margin: 1.5rem;
  margin-left: 0px;
  text-align: start;
}
.products {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  align-content: end;
  justify-content: space-between;
  overflow-x: auto;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
}
.product {
  width: 15%;
  min-width: 100px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 1em;
  align-content: center;
  justify-content: center;
}
.products-category {
  font-size: clamp(1.2rem, 1.5vw, 6rem);
  font-weight: 600;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}
@media (max-width: 843px) {
  section {
    margin: 0px;
    padding: 8px;
  }
}
@media (max-width: 447px) {
  section {
    margin: 0px;
    padding: 0px;
  }
}
</style>
