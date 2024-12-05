<template>
  <div class="CartPage">
    <h1>My Cart ({{ this.cart.length }})</h1>
    <hr />
    <div class="cart-empty" v-if="this.cart.length <= 0">
      <p>Your cart is empty right now :c</p>
    </div>
    <div class="purchase-info" v-if="this.cart.length != 0">
      <h2>Total price is</h2>
      <p class="product-price">R${{ totalPrice.toFixed(2) }}</p>
      <b-button class="btn-green" @click="purchase()">
        Purchase
      </b-button>
    </div>
    <section>
      <div class="products">
        <div class="product" v-for="(product, index) in this.cart" :key="index">
          <img
            :src="require(`@/assets/products_images/${product.image}.png`)"
            :alt="product.imageAlt"
            class="product-image"
            @click="seeProduct(product)"
          />
          <div>
            <p class="product-title" @click="seeProduct(product)">
              {{ product.name }}
            </p>
            <p class="product-description" @click="seeProduct(product)">
              {{ product.description }}
            </p>

            <div class="button-and-price">
              <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
              <div class="cart_product_button">
                <b-button class="btn-blue" @click="changeQuantity(product)">
                  Qtd: {{ product.quantity }}
                </b-button>
                <b-button class="btn-red" @click="removeFromCart(product)"
                  ><img
                    class="btn-red-image"
                    src="../assets/lixeira.svg"
                    alt="Delete"
                /></b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="margin-footer" v-if="this.cart.length <= 0"></div>
    <div class="margin-footer-if-cart" v-else></div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  props: {
    cart: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeFromCart(product) {
      this.$emit("removeFromCart", product);
    },
    changeQuantity(product) {
      this.$emit("changeQuantity", product);
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
      let timerInterval;
      this.$swal
        .fire({
          title: "Buying it!",
          html: "Wait a moment. <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const timer = this.$swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${this.$swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
        .then(() => {
          /* Read more about handling dismissals below */
          this.$emit("clearCart");
          this.$router.push("/purchase");
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0px;
}
.cart-empty {
  display: flex;
  margin: 200px 40vw;
  color: rgb(0, 0, 0);
  justify-content: center;
  align-content: center;
  border-radius: 8px;
  white-space: nowrap;
}
.purchase-info {
  margin-top: 20px;
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
  flex-wrap: wrap;
  gap: 1rem;
  align-content: flex-start;
  justify-content: center;
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
  flex-direction: column;
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
.btn-red {
  width: 100%;
  background-color: #ff0000; /* Cor vermelha de fundo */
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

.btn-red:hover {
  background-color: #cc0000; /* Cor de fundo vermelha mais escura no hover */
  transform: translateY(-2px); /* Pequeno efeito de movimento para cima */
}

.btn-red:active {
  background-color: #990000; /* Cor ainda mais escura no clique */
  transform: translateY(2px); /* Efeito de pressionar o botão */
}
.btn-red-image {
  width: clamp(1rem, 2vw, 2rem);
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

@media (max-width: 843px) {
  section {
    margin: 1rem 0;
    padding: 8px;
  }
}
@media (max-width: 447px) {
  section {
    margin: 1rem 0;
    padding: 0px;
  }
}
</style>
