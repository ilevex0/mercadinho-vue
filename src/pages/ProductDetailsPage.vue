<template>
  <div class="ProductDetailsPage">
    <section class="ProductDetails">
      <div class="product-detail" v-if="hasProduct">
        <div class="img-div">
          <img
            :src="
              require(`@/assets/products_images/${seeproduct[0].image}.png`)
            "
            :alt="seeproduct[0].imageAlt"
            class="product-image"
          />
        </div>
        <div class="product-description">
          <h1>{{ seeproduct[0].name }}</h1>
          <div class="rating">
            <b-form-rating
              variant="warning"
              v-model="ratingValue"
              readonly
              precision="2"
            ></b-form-rating>
            <span>(283)</span>
          </div>
          <div v-if="!showButtonsMobile">
            <hr />
            <h2 class="price">R$ {{ totalPriceCalc.toFixed(2) }}</h2>
            <div>
              <label>
                Quantity:
                <b-form-select
                  v-model="selected"
                  :options="options"
                  size="sm"
                  class="mt-3"
                ></b-form-select>
              </label>
            </div>
            <div class="btn-mobile-container">
              <b-button class="btn-blue" @click="callBuyNow(seeproduct[0])">
                Buy Now!
              </b-button>
              <b-button
                class="btn-blue"
                @click="addProductInCart(seeproduct[0])"
              >
                Add to cart!
              </b-button>
            </div>
          </div>
          <hr />
          <h3>Choose one</h3>
          <p class="product-description-text">Color: <b>Primary</b></p>
          <h3>About this product</h3>

          <hr />
          <ul class="product-description-text">
            <li>{{ seeproduct[0].description }}</li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              molestias sed ipsum fugiat consequuntur veniam nam quia rerum
              porro debitis? Dolore quasi veniam doloremque vel provident
              eveniet harum odit dolorum! Id porro nobis asperiores quaerat a
              commodi ullam officiis reprehenderit, voluptatem nemo illo?
              Explicabo molestias sed, magnam vero praesentium quaerat iure
              iusto voluptas aperiam possimus inventore adipisci blanditiis
              incidunt veniam.
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              expedita, quibusdam ipsa quaerat, distinctio neque odio eligendi
              odit eaque magni nihil itaque ea dolorem? Non dolore vero dolorem
              optio veniam!
            </li>
          </ul>
        </div>
        <div v-if="showButtonsMobile">
          <h2 class="price">R$ {{ totalPriceCalc.toFixed(2) }}</h2>
          <p><b>in Stock.</b></p>
          <div>
            <label>
              Quantity:
              <b-form-select
                v-model="selected"
                :options="options"
                size="sm"
                class="mt-3"
              ></b-form-select>
            </label>
          </div>
          <div>
            <b-button class="btn-blue" @click="callBuyNow(seeproduct[0])">
              Buy Now!
            </b-button>
            <b-button class="btn-blue" @click="addProductInCart(seeproduct[0])">
              Add to cart!
            </b-button>
          </div>
          <hr />
          <div>
            <b-form-checkbox
              id="checkbox-1"
              v-model="statusIsGift"
              name="checkbox-1"
              value="true"
              unchecked-value="false"
            >
              This order is for a gift.
            </b-form-checkbox>
          </div>
        </div>
      </div>
    </section>
    <section v-if="!failedToFetch" class="recommended-for-you">
      <h2 class="products-category">Recommended for you</h2>
      <div class="products">
        <div
          class="product"
          v-for="(product, index) in filteredProducts"
          :key="index"
        >
          <ProductCard
            :product="product"
            :index="index"
            :seeProduct="seeProduct"
          />
        </div>
      </div>
    </section>
    <div class="margin-for-footer"></div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductDetailsPage",
  components: {
    ProductCard,
  },
  props: {
    APIRequest: {
      type: String,
      required: true,
    },
    buyNow: {
      type: Function,
      required: true,
    },
    buyNowClear: {
      type: Function,
      required: true,
    },
    addProduct: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showButtonsMobile: window.innerWidth > 759,
      hasProduct: false,
      seeproduct: [],
      filteredProducts: [],
      ratingValue: 4.555,
      selected: null,
      options: [
        { value: null, text: "1 Unit" },
        { value: 2, text: "2 Units" },
        { value: 3, text: "3 Units" },
        { value: 4, text: "4 Units" },
        { value: 5, text: "5 Units" },
      ],
      statusIsGift: false,
      failedToFetch: false,
    };
  },
  mounted() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, 100);
    window.addEventListener("resize", this.updateButtonVisibility);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateButtonVisibility);
  },
  created() {
    let productimage = this.$route.params.productimage;

    axios
      .get(this.APIRequest)
      .then((response) => {
        const produtos = response.data;
        this.produto = produtos.find(
          (produto) => produto.image === productimage
        );

        this.filteredProducts = produtos.filter(
          (product) => product.category === "technology"
        );

        if (this.produto) {
          this.seeproduct = [];
          this.seeproduct.push(this.produto);
          this.hasProduct = true;
        } else {
          this.$swal.fire({
            title: "Error",
            text: "Product is not found :(",
            icon: "error",
          });
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.failedToFetch = true;
      });
  },
  methods: {
    seeProduct(product) {

      if(this.$route.path === `/productdetailspage/${product.image}`) {
        window.scrollTo(0, 0);
        return
      }
      this.$emit("seeProduct", product);
      window.scrollTo(0, 0);

      this.seeproduct = [];
      this.selected = null;
      this.seeproduct.push(product);
    },
    updateButtonVisibility() {
      this.showButtonsMobile = window.innerWidth > 759;
    },
    callBuyNow(product) {
      this.buyNowClear();

      if (this.selected == null) {
        product.quantity = 1;
      } else {
        product.quantity = parseInt(this.selected);
      }

      this.buyNow(product);
      this.$router.push("/purchasingpage");
    },
    addProductInCart(product) {
      if (this.selected == null) {
        product.quantity = 1;
      } else {
        product.quantity = parseInt(this.selected);
      }
      this.addProduct(product);
    },
  },
  computed: {
    totalPriceCalc() {
      let value;
      if (this.selected == null) {
        value = 1;
      } else {
        value = parseInt(this.selected);
      }

      return value * parseFloat(this.seeproduct[0].price);
    },
  },
};
</script>

<style scoped>
.price {
  white-space: nowrap;
}
.margin-for-footer {
  margin-bottom: 50px;
}
.ProductDetails {
  display: flex;
  justify-content: center;

  margin: 30px 10%;
}
.product-detail {
  display: flex;
  text-align: justify;
  gap: 30px;
  background-color: rgb(255, 255, 255);
  padding: 30px;
  border-radius: 30px;
}
.product-image {
  width: 100%;
  min-width: 150px;
}
.rating {
  display: flex;
  width: 300px;
  align-items: center;
  justify-items: center;
  gap: 5px;
}
.product-description {
  width: 100%;
  max-width: 500px;
}
.product-description-text {
  font-size: clamp(0.7rem, 1.2vw, 1rem);
}
.product-description h1,
h3 {
  font-size: clamp(1rem, 1.8vw, 1.4rem);
  font-weight: 600;
}
.btn-blue {
  margin-bottom: 8px;
  width: 100%;
  background-color: #007bff; /* Cor azul de fundo */
  color: white; /* Cor do texto */
  font-size: clamp(0.7rem, 1.2vw, 1.2rem); /* Tamanho da fonte */
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
label {
  white-space: nowrap;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  margin-bottom: 10px;
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
  min-width: 120px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 1em;
  align-content: center;
  justify-content: center;
}
.recommended-for-you {
  margin: 30px 10%;
  }
@media (max-width: 759px) {
  .ProductDetailsPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px 0%;
  }
  .img-div {
    width: 50%;
  }
  .product-detail {
    display: flex;
    flex-direction: column;
    text-align: justify;
    gap: 0px;
    padding: 10px;
    border-radius: 30px;
    align-content: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }
  .product-description-text {
    padding-right: 2em;
  }
  .btn-mobile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn-blue {
    width: 80%;
  }
  .price {
    margin: 0px;
  }
}
@media (max-width: 884px) {
  .recommended-for-you {
  margin: 30px 5%;
  }
}
@media (max-width: 320px) {
  .recommended-for-you {
  margin: 30px 0%;
  }
}
</style>
