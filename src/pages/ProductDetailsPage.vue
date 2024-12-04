<template>
  <div class="ProductDetailsPage">
    <h1>Product Details</h1>
    <div class="product-detail" v-if="hasProduct">
      <p>{{ seeproduct[0].name }}</p>
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
    let productId = this.$route.params.productid;
    productId = parseInt(productId);

    axios.get(this.APIRequest).then((response) => {
      const produtos = response.data;
      this.produto = produtos.find((produto) => produto.id === productId);

      if (this.produto) {
        this.seeproduct.push(this.produto);
        this.hasProduct = true;
      }
      else {
        this.$swal.fire({
              title: "Error",
              text: "Product is not found :(",
              icon: "error",
            });
      }
    });
  },
};
</script>

<style></style>
