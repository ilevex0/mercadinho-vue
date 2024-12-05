<template>
  <div class="ProductDetailsPage">
    <div class="product-detail" v-if="hasProduct">
      <div>
        <img
          :src="require(`@/assets/products_images/${seeproduct[0].image}.png`)"
          :alt="seeproduct[0].imageAlt"
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
        <hr />
        <h3>Choose one</h3>
        <p>Color: <b>Primary</b></p>
        <h3>About this product</h3>

        <hr />
        <ul>
          <li>{{ seeproduct[0].description }}</li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
            molestias sed ipsum fugiat consequuntur veniam nam quia rerum porro
            debitis? Dolore quasi veniam doloremque vel provident eveniet harum
            odit dolorum! Id porro nobis asperiores quaerat a commodi ullam
            officiis reprehenderit, voluptatem nemo illo? Explicabo molestias
            sed, magnam vero praesentium quaerat iure iusto voluptas aperiam
            possimus inventore adipisci blanditiis incidunt veniam.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
            expedita, quibusdam ipsa quaerat, distinctio neque odio eligendi
            odit eaque magni nihil itaque ea dolorem? Non dolore vero dolorem
            optio veniam!
          </li>
        </ul>
      </div>
      <div>
        <h2>R$ {{ seeproduct[0].price.toFixed(2) }}</h2>
        <p><b>in Stock.</b></p>
        <div>
          <p>
            Quantity:
            <b-form-select
              v-model="selected"
              :options="options"
              size="sm"
              class="mt-3"
            ></b-form-select>
          </p>
        </div>
        <b-button class="btn-blue" @click="callBuyNow(seeproduct[0])">
          Buy Now!
        </b-button>
        <b-button class="btn-blue" @click="addProductInCart(seeproduct[0])">
          Add to cart!
        </b-button>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetailsPage",
  props: {
    APIRequest: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
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
      hasProduct: false,
      seeproduct: [],
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
    };
  },
  created() {
    let productimage = this.$route.params.productimage;

    axios.get(this.APIRequest).then((response) => {
      const produtos = response.data;
      this.produto = produtos.find((produto) => produto.image === productimage);

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
    });
  },
  methods: {
    callBuyNow(product) {
      this.buyNowClear();
      
      if (this.selected == null) {
        product.quantity = 1;
      }
      else {
        product.quantity = parseInt(this.selected)
      }

      this.buyNow(product);
      this.$router.push("/purchasingpage")
    },
    addProductInCart(product) {
      if (this.selected == null) {
        product.quantity = 1;
      }
      else {
        product.quantity = parseInt(this.selected)
      }
      this.addProduct(product)
    }
  }
};
</script>

<style scoped>
.ProductDetailsPage {
  margin: 30px 300px;
}
.product-detail {
  display: flex;
  justify-items: center;
  text-align: justify;
  gap: 30px;
  background-color: rgb(255, 255, 255);
  padding: 30px;
  border-radius: 30px;
}
.rating {
  display: flex;
  width: 300px;
  align-items: center;
  justify-items: center;
  gap: 5px;
}
.product-description {
  width: 30%;
}
.product-description h1 {
  font-size: 24px;
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
</style>
