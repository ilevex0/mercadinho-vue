<template>
  <div id="app">
    <div class="div-nav">
      <nav class="nav">
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-link to="/my-cart"
        ><img src="./assets/shopping_bag.svg" alt="My Shopping Cart"
        /></router-link>
      </nav>
    </div>
    <router-view
    @addProduct="addProduct"
    :cart="cart"
    @removeFromCart="removeFromCart"
    @clearCart="clearCart"
    :totalPrice="totalPrice"
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
      cart: [],
      totalPrice: 0,
    };
  },
  methods: {
    returnTotalPrice() {
      this.totalPrice = 0;
      if (this.cart != []) {
        this.cart.forEach((product) => {
          this.totalPrice += product.quantity * product.price;
        });
      }
    },
    addProduct(product) {
      this.$swal
        .fire({
          title: "How much products?",
          icon: "question",
          confirmButtonColor: "#0d6efd",
          showCancelButton: true,
          cancelButtonColor: "#dc3545",
          input: "range",
          inputAttributes: {
            min: "0",
            max: "10",
            step: "1",
          },
          inputValue: 1,
          inputLabel: "The Quantity",
        })
        .then((result) => {
          if (result.isConfirmed) {
            product.quantity = result.value;
            const index = this.cart.findIndex((item) => item.id === product.id);

            if (index !== -1) {
              this.cart.splice(index, 1);
            }
            if (result.value != 0) {
              this.AddedToCartAnimation();
              this.cart.push(product);
              this.returnTotalPrice();
            }
          }
        });
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
            if (index !== -1) {
              this.cart.splice(index, 1);
              this.returnTotalPrice();
            }
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your cart has been updated.",
              icon: "success",
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "The product is safe :)",
              icon: "error",
            });
          }
        });
    },
    AddedToCartAnimation() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Your cart has been updated",
      });
    },
    clearCart() {
      this.cart = [];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.div-nav {
  padding: 30px;
  padding-top: 40px;
  background-color: #1a1a1a;
}
.nav {
  gap: 10px;
}
</style>
