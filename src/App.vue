<template>
  <div id="app">
    <div class="div-nav">
      <nav class="nav">
        <section class="nav-first-section">
          <div class="nav-first-section-Logo-ZIP">
            <router-link to="/"
              ><img
                :src="require('@/assets/nav_logo.png')"
                alt="mercadinho logo image"
                class="nav-logo-image"
            /></router-link>
            <b-button class="nav-location_on">
              <p class="nav-location-title">
                <img
                  :src="require('@/assets/location_on.png')"
                  alt="location_on"
                  class="nav-location_on-image"
                />Send to
              </p>
              <p>São Paulo 01234-567</p>
            </b-button>
          </div>
          <div class="input-container">
            <form @submit.prevent="searchFunction">
              <input
                class="nav-search"
                type="search"
                placeholder="Search in this Website"
                v-model="searchQuery"
              />
              <button class="nav-search-btn" type="submit">
                <img
                  src="@/assets/magnifyingglass.png"
                  alt="Magnifying Glass icon"
                />
              </button>
            </form>
          </div>
          <div class="user-account">
            <p>Hello User,</p>
            <p class="user-account-button">
              See My Account
              <img
                src="@/assets/arrow_forward.png"
                alt="arrow forward icon"
                style="max-width: 15px"
              />
            </p>
          </div>
          <div>
            <router-link
              v-if="this.$store.state.cart.length <= 0"
              class="nav-cart-button"
              to="/my-cart"
              ><img
                class="nav-button cart-image"
                src="./assets/shopping_bag.svg"
                alt="My Shopping Cart"
              />+0</router-link
            >
            <router-link v-else class="nav-button-hasInCart" to="/my-cart"
              ><img
                class="cart-image"
                src="./assets/shopping_bag.svg"
                alt="My Shopping Cart"
              />+{{ this.$store.state.cart.length }}</router-link
            >
          </div>
        </section>
        <section class="nav-second-section">
          <div class="nav-second-section-categories">
            <router-link to="/"><li class="nav-button">All</li></router-link>
            <button @click="scrollToTechnology" class="hide-in-mobile">
              <li class="nav-button">Technology</li>
            </button>
            <button @click="scrollToKitchen" class="hide-in-mobile">
              <li class="nav-button">Kitchen</li>
            </button>
            <button @click="scrollToTechnology" to="/">
              <li class="nav-button">For you</li>
            </button>
            <button @click="scrollToTechnology" to="/">
              <li class="nav-button">Best Sellers</li>
            </button>
          </div>
          <div class="nav-second-section-info">
            <router-link to="/"><li class="nav-button">Home</li></router-link>
            <router-link to="/about"
              ><li class="nav-button">About</li></router-link
            >
          </div>
        </section>
      </nav>
    </div>
    <router-view
      :addProduct="addProduct"
      @addProduct="addProduct"
      @seeProduct="seeProduct"
      :buyNow="buyNow"
      :buyNowClear="buyNowClear"
      :APIRequest="APIRequest"
      @removeFromCart="removeFromCart"
      @clearCart="clearCart"
      :searchQuery="searchQuery"
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
      searchQuery: "",
      APIRequest:
        "https://gist.githubusercontent.com/ilevex0/f460b3445549733edabcc90027803ff6/raw/7169d7201ef6d1509abc8c6fd318ba60c002c19b/products.json",
    };
  },
  methods: {
    searchFunction() {
      this.searchQuery = this.searchQuery.trim().toLowerCase();

      if (this.searchQuery === "") {
        if (this.$route.path === "/") {
          return;
        }
        this.$router.push("/");
        return;
      }
      if (this.$route.path === `/searchpage/${this.searchQuery}`) {
        window.scrollTo(0, 0);
        return;
      }
      this.$router.push({
        name: "searchpage",
        params: { search: this.searchQuery },
      });
    },
    scrollToTechnology(event) {
      event.preventDefault();

      if (this.$route.path !== "/") {
        this.$router.push("/").then(() => {
          setTimeout(() => {
            const section = document.getElementById("technology");

            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        });
      } else {
        const section = document.getElementById("technology");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    scrollToKitchen(event) {
      event.preventDefault();

      if (this.$route.path !== "/") {
        this.$router.push("/").then(() => {
          setTimeout(() => {
            const section = document.getElementById("kitchen");

            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        });
      } else {
        const section = document.getElementById("kitchen");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    buyNowClear() {
      this.$store.commit("buyNowClear");
    },
    buyNow(product) {
      this.$store.commit("buyNow", product);
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
            const index = this.$store.state.cart.findIndex(
              (item) => item.id === product.id
            );

            if (index !== -1) {
              this.$store.state.cart.splice(index, 1);
            }
            if (product.quantity >= 1) {
              this.$store.state.cart.push(product);
            }
            this.$swal.fire({
              title: "Added in Cart!",
              text: "The product has been added!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#0d6efd",
            });
            localStorage.setItem(
              "cart",
              JSON.stringify(this.$store.state.cart)
            );
            this.$router.push("/my-cart");
          }
        });
    },
    clearCart() {
      this.$store.commit("clearCart");
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
            const index = this.$store.state.cart.findIndex(
              (item) => item.id === product.id
            );

            if (index > -1) {
              this.$store.state.cart.splice(index, 1);
              localStorage.setItem(
                "cart",
                JSON.stringify(this.$store.state.cart)
              );
            }

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
  background-color: rgb(241, 241, 241);
}
.user-account {
  color: rgb(228, 228, 228);
  cursor: pointer;
  white-space: nowrap;
  text-align: justify;
}
.user-account-button {
  color: white;
  font-weight: 600;
}
.user-account,
p {
  margin: 0px;
}
.div-nav {
  background-color: #1a1a1a;
  font-size: 1.5m;
  padding-top: 10px;
  /*
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  */
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nav-first-section {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  padding: 0px 50px;
}
.nav-location-title {
  font-size: 20px;
  color: #c0c0c0;
}
.nav-location_on {
  white-space: nowrap;
}
.nav-location_on-image {
  max-width: 35px;
}
.nav-first-section-Logo-ZIP {
  display: flex;
  gap: 50px;
}
.nav-second-section {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  padding: 5px 50px;
  background-color: rgb(36, 54, 77);
  align-items: center;
  justify-items: center;
  white-space: nowrap;
}
.nav-second-section-categories {
  display: flex;
  justify-content: space-between;
  width: 35%;
  gap: 50px;
}
.nav-second-section-info {
  display: flex;
  justify-content: space-between;
  width: 15%;
  gap: 50px;
}
.nav-logo-image {
  margin-top: 8px;
  max-width: 130px;
  transition: all 0.2s;
}
.nav-logo-image:hover {
  transform: scale(1.05);
}
.cart-image {
  width: 40px;
  max-width: 40px;
}
.nav-cart-button:hover {
  transform: scale(1.03);
}
button,
li,
a {
  all: unset; /* Remove todos os estilos padrões aplicados */
  background: none; /* Remove o fundo */
  border: none; /* Remove a borda */
  padding: 0; /* Remove o preenchimento padrão */
  font: inherit; /* Herda a fonte do elemento pai */
  cursor: pointer; /* Garante que o cursor fique como uma mãozinha */
  color: white;
}
.nav-button {
  color: white;
  transition: all 0.2s;
}
.nav-button:hover {
  color: rgb(212, 234, 255);
}
.nav-cart-button {
  padding: 10px;
  border: solid 1px transparent;
  border-radius: 16px;
  white-space: nowrap;
}
.nav-button-hasInCart {
  padding: 10px;
  border: solid 1px transparent;
  border-radius: 16px;
  transition: all 0.2s;
  display: block;
  background-color: rgb(48, 98, 235);
  transition: all 0.2s ease-in;
  border: solid 1px rgb(199, 225, 255);
}
.input-container {
  position: relative;
}
.nav-search {
  border: 2px solid #242424;
  border-radius: 20px;
  padding: 0.7em 1em;
  width: 40vw;
  text-overflow: ellipsis;
}
.nav-search:focus {
  border: 2px solid #ff7b00;
  border-radius: 20px;
  padding: 0.7em 1em;
}
input[type="search"]::-webkit-search-cancel-button {
  display: none;
}
.nav-search::placeholder {
  font-size: 18px;
}
.nav-search-btn {
  position: absolute;
  cursor: pointer;
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 85%;
}
@media (max-width: 1200px) {
  .nav-search {
    width: 20vw;
  }
  .nav-search-btn {
    position: absolute;
    cursor: pointer;
    top: 0%;
    bottom: 0%;
    right: 0%;
    left: 70%;
  }
}
@media (max-width: 900px) {
  .nav-location_on {
    display: none;
  }
}
@media (max-width: 780px) {
  .nav-second-section-info {
    display: none;
  }
  .nav-second-section-categories {
    width: 100%;
    gap: 50px;
  }
}
@media (max-width: 618px) {
  .nav-logo-image {
    max-width: 100px;
  }
}
@media (max-width: 592px) {
  .nav-second-section-categories {
    gap: 10px;
  }
  .nav-first-section,
  .nav-second-section {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media (max-width: 520px) {
  .nav-logo-image {
    max-width: 0px; /* leave animation */
  }
  .nav-search {
    width: 30vw;
  }
  .nav-search-btn {
    position: absolute;
    cursor: pointer;
    top: 0%;
    bottom: 0%;
    right: 0%;
    left: 70%;
  }
}
@media (max-width: 448px) {
  .nav-search {
    display: none;
  }
  .nav-search-btn {
    display: none;
  }
}
@media (max-width: 394px) {
  .nav-first-section,
  .nav-second-section {
    padding-left: 10px;
    padding-right: 10px;
  }
  .hide-in-mobile {
    display: none;
  }
  .nav-second-section-categories {
    padding: 0px 30px;
    gap: 10px;
  }
}
</style>
