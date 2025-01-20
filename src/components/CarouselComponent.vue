<template>
  <div class="carousel-div">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      background="#ababab"
      img-width="1024"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        :img-src="require(`@/assets/products_banners/banner-1.png`)">
    </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide :img-src="require(`@/assets/products_banners/banner-1.png`)">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        :img-src="require(`@/assets/products_banners/banner-1.png`)">
      </b-carousel-slide>
      <b-carousel-slide :img-src="require(`@/assets/products_banners/banner-1.png`)">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "CarouselComponent",
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style>
.carousel-control-prev, .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: none;
    border: 0;
    opacity: 0.5;
    transition: opacity 0.15s ease;
}
</style>
