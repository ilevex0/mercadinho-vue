<template>
  <div class="ProductsComponent">
    <CarouselComponent />
    <p v-if="!failedToFetch">
      Attention! All product images are available in the
      <a href="https://www.amazon.com" target="_blank">Amazon Store</a>
    </p>
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
          <img
            :src="require(`@/assets/products_images/${product.image}.png`)"
            :alt="product.imageAlt"
            class="product-image"
            @click="addToCart(product, product.id)"
          />
          <div>
            <p class="product-title" @click="addToCart(product, product.id)">
              {{ product.name }}
            </p>
            <p
              class="product-description"
              @click="addToCart(product, product.id)"
            >
              {{ product.description }}
            </p>

            <div class="button-and-price">
              <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
              <b-button
                class="btn-blue"
                @click="addToCart(product, product.id)">{{ buttonText(product.id) }}</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="!failedToFetch">
      <h2 class="products-category">Best Sellers in Kitchen</h2>
      <div class="products">
        <div
          class="product"
          v-for="(product, index) in filteredKichenProducts"
          :key="index"
        >
          <img
            :src="require(`@/assets/products_images/${product.image}.png`)"
            :alt="product.imageAlt"
            class="product-image"
            @click="addToCart(product, product.id)"
          />
          <div>
            <div>
              <p class="product-title" @click="addToCart(product, product.id)">
                {{ product.name }}
              </p>
              <p
                class="product-description"
                @click="addToCart(product, product.id)"
              >
                {{ product.description }}
              </p>
            </div>

            <div class="button-and-price">
              <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
              <b-button
                class="btn-blue"
                @click="addToCart(product, product.id)"
                >{{ buttonText(product.id) }}</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </section>
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
        "https://gist.githubusercontent.com/ilevex0/f460b3445549733edabcc90027803ff6/raw/1693709825b35cfce2b45f10dfd9a86ef305c31a/products.json"
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
.product-image {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}
.product-image:hover {
  scale: 1.01;
  transition: 0.5s;
}
.product-title,
.product-description {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: clamp(0.7rem, 0.8vw, 1.5rem);
}
.products-category {
  font-size: clamp(1.2rem, 1.5vw, 6rem);
  font-weight: 600;
}
.product-price {
  font-weight: bold;
  cursor: auto;
  font-size: clamp(1rem, 1.2vw, 2rem);
  white-space: nowrap;
}
.button-and-price {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: flex-end;
  flex-wrap: wrap;
  gap: 0px 1rem;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}

.btn-blue {
  width: 100%;
  background-color: #007bff; /* Cor azul de fundo */
  color: white; /* Cor do texto */
  font-size: clamp(0.5rem, 1vw, 1rem); /* Tamanho da fonte */
  padding: 10px; /* Espaçamento interno (padding) */
  border: none; /* Remove a borda padrão */
  border-radius: 8px; /* Bordas arredondadas */
  cursor: pointer; /* Aparece a mãozinha ao passar o mouse */
  transition: all 0.3s ease; /* Transição suave para os efeitos */
  text-align: center; /* Centraliza o texto */
  text-decoration: none; /* Remove o sublinhado caso seja link */
  white-space: nowrap;
}

.btn-blue:hover {
  background-color: #0056b3; /* Cor de fundo azul mais escura no hover */
  transform: translateY(-2px); /* Pequeno efeito de movimento para cima */
}

.btn-blue:active {
  background-color: #004085; /* Cor ainda mais escura no clique */
  transform: translateY(2px); /* Efeito de pressionar o botão */
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
