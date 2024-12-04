<template>
  <div class="ProductDetailsPage">
    <h1>Product Details</h1>
    <div class="product-detail" v-if="hasProduct">
      <p>{{ seeProductDetails[0].name }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductDetailsPage",
  data() {
    return {
      hasProduct: false,
    }
  },
  created() {
    if(this.seeProductDetails.length > 0) {
      this.hasProduct = true;
    }
    else {
      this.$swal.fire({
              title: "Error",
              text: "There is no Product selected to see, please select one.",
              icon: "error",
            });
      this.$router.push('/')
    }
  },
  props: {
    seeProductDetails: { 
      type: Array, 
      required: true,
    },
  },
};
</script>

<style></style>
