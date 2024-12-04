<template>
  <div>
    <img
      :src="require(`@/assets/products_images/${product.image}.png`)"
      :alt="product.imageAlt"
      class="product-image"
      @click="addToCart(product, product.id)"
    />
    <div>
      <div>
        <p class="product-title" @click="addToCart(product, product.id)">
          {{ product.name }}
        </p>
        <p class="product-description" @click="addToCart(product, product.id)">
          {{ product.description }}
        </p>
      </div>

      <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
        },
        product: {
            type: Object,
        },
    }
};
</script>

<style scoped>
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
.product-price {
  font-weight: bold;
  cursor: auto;
  font-size: clamp(1rem, 1.2vw, 2rem);
  white-space: nowrap;
}
</style>
