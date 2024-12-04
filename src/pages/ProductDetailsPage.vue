<template>
  <div class="ProductDetailsPage">
    <div class="product-detail" v-if="hasProduct">
      <h1>{{ seeproduct[0].name }}</h1>
      <p>{{ seeproduct[0].description }}</p>
      <img :src="require(`@/assets/products_images/${seeproduct[0].image}.png`)" :alt="seeproduct[0].imageAlt">
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
  },
  data() {
    return {
      hasProduct: false,
      seeproduct: [],
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
      }
      else {
        this.$swal.fire({
              title: "Error",
              text: "Product is not found :(",
              icon: "error",
            });
            this.$router.push('/')
      }
    });
  },
};
</script>

<style></style>
