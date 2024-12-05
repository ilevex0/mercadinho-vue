<template>
  <div id="app">
    <div class="div-nav">
      <nav class="nav">
        <router-link to="/"><li class="nav-button">Home</li></router-link>
        <router-link to="/about"><li class="nav-button">About</li></router-link>
        <router-link v-if="cart <= 0" to="/my-cart"
          ><img
            class="nav-button"
            src="./assets/shopping_bag.svg"
            alt="My Shopping Cart"
        /></router-link>
        <router-link v-else to="/my-cart"
          ><img
            class="nav-button-hasInCart"
            src="./assets/shopping_bag.svg"
            alt="My Shopping Cart"
        /></router-link>
      </nav>
    </div>
    <div class="div-nav-detail"></div>
    <router-view
      :addProduct="addProduct"
      @addProduct="addProduct"
      @seeProduct="seeProduct"
      :cart="cart"
      :buyNow="buyNow"
      :buyNowCart="buyNowCart"
      :buyNowClear="buyNowClear"
      :APIRequest="APIRequest"
      @removeFromCart="removeFromCart"
      @clearCart="clearCart"
    ></router-view>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    FooterComponent,
  },
  data() {
    return {
      APIRequest:
        "https://gist.githubusercontent.com/ilevex0/f460b3445549733edabcc90027803ff6/raw/7169d7201ef6d1509abc8c6fd318ba60c002c19b/products.json",
      cart: [],
      buyNowCart: [],
    };
  },
  methods: {
    buyNowClear() {
      this.buyNowCart = [];
    },
    buyNow(product) {
      this.buyNowCart.push(product);
    },
    seeProduct(product) {
      this.$router.push({
        name: "productdetailspage",
        params: { productimage: product.image },
      });
    },
    addProduct(product) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Add to cart?",
          text: "When confirmed, the page will go to your cart.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, please!",
          cancelButtonText: "Not yet!",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            const index = this.cart.findIndex((item) => item.id === product.id);

            if (index !== -1) {
              this.cart.splice(index, 1);
            }
            if (product.quantity >= 1) {
              this.cart.push(product);
            }
            this.$swal.fire({
              title: "Added in Cart!",
              text: "The product has been added!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#0d6efd",
            });
            this.$router.push("/my-cart");
          }
        });
    },
    changeQuantity(product, qtd) {
      product.quantity = qtd;

      const index = this.cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
      if (qtd != 0) {
        this.AddedToCartAnimation();
        this.cart.push(product);
        this.returnTotalPrice();
      }
    },
    clearCart() {
      this.cart = [];
    },
    removeFromCart(product) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            const index = this.cart.findIndex((item) => item.id === product.id);

            if (index > -1) this.cart.splice(index, 1);

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your cart has been updated.",
              icon: "success",
            });
          }
        });
    },
    AddedToCartAnimation() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: "Sucess!",
        text: "Your Cart has been updated.",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonClass: "btn btn-primary",
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(248, 248, 248);
}
.nav a {
  text-decoration: none;
}
.nav-button,
.nav-button-hasInCart {
  font-size: 20px;
  padding: 16px;
  background-color: rgb(66, 76, 83);
  border: 1px solid rgb(66, 76, 83);

  border-radius: 8px;
  color: white;
  transition: all 0.2s ease;
}
.nav-button:hover,
.nav-button-hasInCart:hover {
  transform: translateY(2px);
}
.nav-button-hasInCart {
  background-color: rgb(26, 130, 228);
  border: 1px solid rgb(255, 255, 255);
}
.div-nav {
  padding: 10px;
  background-color: #1a1a1a;
  font-size: 1.5m;
}
.div-nav-detail {
  width: 100%;
  height: 5px;
  background-color: rgb(59, 74, 82);
}
.nav {
  gap: 10px;
  justify-content: center;
  align-items: center;
}
li {
  list-style: none;
}
</style>
