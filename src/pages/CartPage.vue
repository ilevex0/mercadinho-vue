<template>
  <div class="CartPage">
    <div class="cart-empty" v-if="this.$store.state.cart.length <= 0">
      <p>Your cart is empty right now :c</p>
    </div>
    <div class="cart-components">
      <section class="my-cart" v-if="this.$store.state.cart.length != 0">
        <div
          v-if="this.$store.state.cart.length > 0"
          class="my-cart-count-items"
        >
          <h1 style="text-align: start; margin-bottom: 15px">
            My Cart ({{ this.$store.state.cart.length }})
          </h1>
          <hr />
        </div>
        <div class="products" style="display: flex">
          <div
            class="product"
            v-for="(product, index) in this.$store.state.cart"
            :key="index"
          >
            <img
              :src="require(`@/assets/products_images/${product.image}.png`)"
              :alt="product.imageAlt"
              class="product-image"
              @click="seeProduct(product)"
            />
            <div class="product-info">
              <p class="product-title" @click="seeProduct(product)">
                {{ product.name }}
              </p>
              <p class="product-description" @click="seeProduct(product)">
                {{ product.description }}
              </p>
              <div class="cart_product_button">
                <p class="product-price-mobile">
                  {{
                    (selected[index] * product.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </p>
                <div>
                  <p>
                    Quantity:
                    <b-form-select
                      v-model="selected[index]"
                      :options="options[index]"
                      size="sm"
                      class="mt-3"
                    ></b-form-select>
                  </p>
                </div>
                <div class="buttons">
                  <span class="remove-button" @click="removeFromCart(product)"
                    >Remove</span
                  >
                  |
                  <span class="remove-button" @click="shareButton(product)"
                    >Share</span
                  >
                </div>
              </div>
            </div>

            <div class="p-price">
              <p class="product-price">
                <b>{{
                  (selected[index] * product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}</b>
              </p>
              <p class="product-price-text">
                à vista no cartão de crédito ou em até 10x de
                {{
                  (selected[index] * product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
                sem juros
              </p>
            </div>
          </div>
        </div>
        <p class="product-price-end">
          SubTotal({{ this.$store.state.cart.length }}
          {{ this.$store.state.cart.length > 1 ? "products" : "product" }})
          <b>{{
            totalPriceCalc.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}</b>
        </p>
      </section>
      <section>
        <div class="purchase-info" v-if="this.$store.state.cart.length != 0">
          <p class="product-price">
            SubTotal({{ this.$store.state.cart.length }}
            {{ this.$store.state.cart.length > 1 ? "products" : "product" }})
            <b>{{
              totalPriceCalc.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}</b>
          </p>
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
          <b-button class="btn-green" @click="purchase()"> Purchase </b-button>
        </div>
      </section>
    </div>
    <div class="margin-footer" v-if="this.$store.state.cart.length <= 0"></div>
    <div class="margin-footer-if-cart" v-else></div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      totalPrice: 0,
      selected: [],
      options: [],
      statusIsGift: false,
    };
  },
  created() {
    this.$store.state.cart.forEach((product) => {
      this.selected.push(product.quantity);
    });
    this.$store.state.cart.forEach(() =>
      this.options.push([
        { value: 1, text: "1 Unit" },
        { value: 2, text: "2 Units" },
        { value: 3, text: "3 Units" },
        { value: 4, text: "4 Units" },
        { value: 5, text: "5 Units" },
      ])
    );
  },
  props: {
    buyNowClear: {
      type: Function,
      required: true,
    },
  },
  methods: {
    shareButton(product) {
      const fullUrl =
        window.location.origin + "/productdetailspage/" + product.image;

      this.$swal.fire({
        title: "Thank you for sharing!",
        html: `Just Copy This URL link: <a href="${fullUrl}" autofocus>${fullUrl}</a>`,
        icon: "success",
        confirmButtonText: "Great!",
      });
    },
    removeFromCart(product) {
      this.$emit("removeFromCart", product);
    },
    seeProduct(product) {
      this.$emit("seeProduct", product);
    },
    purchase() {
      this.$swal
        .fire({
          title: "Proceed with payment?",
          text: "The fictitious product will be purchased!",
          showCancelButton: true,
          confirmButtonColor: "#0d6efd",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, please!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.confirmPurchase();
          }
        });
    },
    confirmPurchase() {
      this.buyNowClear();
      this.$router.push("/purchasingpage");
    },
  },
  computed: {
    totalPriceCalc() {
      let total = 0;
      this.$store.state.cart.forEach((product, i) => {
        total += parseInt(this.selected[i]) * parseFloat(product.price);
        product.quantity = parseInt(this.selected[i]);
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
      return total;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0px;
}
.cart-components {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 3em;
  margin: 30px 30px;
}
.my-cart {
  width: 70%;
  min-width: 550px;
  background-color: white;
}
.cart-empty {
  margin: 200px 0;
  align-self: center;
  color: rgb(0, 0, 0);
  white-space: nowrap;
}
.purchase-info {
  padding: 20px;
  background-color: white;
}
.products-category {
  margin: 1.5rem;
  margin-left: 0px;
  text-align: start;
}
.products {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /*overflow-x: auto;*/
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 30px;
  padding-top: 0px;
}
.product {
  width: 100%;
  display: flex;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 1em;
  align-content: center;
  justify-content: space-between;
}
.product-image {
  max-width: 150px;
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
.product-price-end {
  font-weight: bold;
  cursor: auto;
  font-size: clamp(1rem, 1.2vw, 2rem);
  white-space: wrap;
  text-align: end;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-left: 30px;
}
.product-price-text {
  text-align: end;
}
.p-price {
  max-width: 150px;
}
.product-info {
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}
.buttons {
  margin: 10px 0;
  color: rgb(206, 206, 206);
}
.remove-button {
  cursor: pointer;
  color: rgb(62, 111, 202);
}
.remove-button:hover {
  color: rgb(20, 68, 156);
}
.btn {
  margin-top: 5px;
  max-width: 150px;
  min-width: 75px;
  background-color: #919191; /* Cor vermelha de fundo */
  color: white; /* Cor do texto */
  padding: 10px; /* Espaçamento interno (padding) */
  border: none; /* Remove a borda padrão */
  border-radius: 8px; /* Bordas arredondadas */
  cursor: pointer; /* Aparece a mãozinha ao passar o mouse */
  transition: all 0.3s ease; /* Transição suave para os efeitos */
  text-align: center; /* Centraliza o texto */
  text-decoration: none; /* Remove o sublinhado caso seja link */
  white-space: nowrap;
}

.btn:hover {
  background-color: #f31010; /* Cor de fundo vermelha mais escura no hover */
  transform: translateY(-2px); /* Pequeno efeito de movimento para cima */
}

.btn:active {
  background-color: #990000; /* Cor ainda mais escura no clique */
  transform: translateY(2px); /* Efeito de pressionar o botão */
}
.btn-image {
  width: clamp(1.5rem, 2vw, 2rem);
}
.btn-green {
  width: 15vw;
  max-width: 150px;
  min-width: 70px;
  background-color: #28a745; /* Cor verde de fundo */
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

.btn-green:hover {
  background-color: #218838; /* Cor de fundo verde mais escura no hover */
  transform: translateY(-2px); /* Pequeno efeito de movimento para cima */
}

.btn-green:active {
  background-color: #1e7e34; /* Cor ainda mais escura no clique */
  transform: translateY(2px); /* Efeito de pressionar o botão */
}
.margin-footer {
  margin-bottom: 500px;
}
.margin-footer-if-cart {
  margin-bottom: 300px;
}
.my-cart-count-items {
  background-color: white;
  padding: 30px;
}
.product-price-mobile {
  display: none;
  font-weight: bold;
  cursor: auto;
  font-size: clamp(1rem, 1.2vw, 2rem);
  white-space: nowrap;
  margin-top: 10px;
}
@media (max-width: 1080px) {
  .cart-components {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    gap: 3em;
  }
  .my-cart {
    width: 100%;
  }
  .purchase-info {
    max-width: 300px;
    justify-self: center;
  }
}
@media (max-width: 618px) {
  .my-cart {
    width: 100%;
    min-width: 200px;
  }
  .product-image {
    min-width: 25px;
    object-fit: contain;
  }
  .cart-components {
    margin: 30px 10px;
  }
}
@media (max-width: 570px) {
  .p-price {
    display: none;
  }
  .product-price-mobile {
    display: block;
  }
}
@media (max-width: 407px) {
  .product-image {
    max-width: 75px;
  }
  .my-cart-count-items {
    background-color: white;
    padding: 30px 10px;
  }
  .products {
    padding: 8px;
    padding-bottom: 30px;
    padding-top: 0px;
  }
}
</style>
