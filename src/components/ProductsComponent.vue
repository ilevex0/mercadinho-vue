<template>
  <div class="ProductsComponent">
    <div class="carousel-div">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="200"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/200/?image=52"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide img-src="https://picsum.photos/1024/200/?image=54">
          <h1>Hello world!</h1>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide
          img-src="https://picsum.photos/1024/200/?image=58"
        ></b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="200"
              src="https://picsum.photos/1024/200/?image=55"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
            pellentesque ut lacus vel interdum.
          </p>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <hr />
    <div class="products">
      <b-card
        v-for="(product, index) in products"
        :key="index"
        :title="product.name"
        :img-src="product.image"
        :img-alt="product.imageAlt"
        img-top
        tag="article"
        style="max-width: 15rem"
        class="mb-2"
      >
        <b-card-text> This is a example product</b-card-text>
        <p>${{ product.price.toFixed(2) }}</p>
        <b-button
          href="#"
          variant="primary"
          @click="addToCart(product, index)"
          >{{ buttonText(index) }}</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsComponent",
  data() {
    return {
      products: [
        {
          name: "1",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 0,
        },
        {
          name: "2",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 1,
        },
        {
          name: "4",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 2,
        },
        {
          name: "5",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 3,
        },
        {
          name: "6",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 4,
        },
        {
          name: "7",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 5,
        },
        {
          name: "3",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 6,
        },
        {
          name: "8",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 7,
        },
        {
          name: "9",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 8,
        },
        {
          name: "10",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 9,
        },
        {
          name: "11",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 10,
        },
        {
          name: "12",
          price: 30.5,
          description: "This is a example product",
          image: "https://picsum.photos/600/300/?image=25",
          imageAlt: "fictitious product",
          quantity: 0,
          id: 11,
        },
      ],
      slide: 0,
      sliding: null,
    };
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(product) {
      this.$emit("addProduct", product);
      //
    },
    buttonText(index) {
      return this.products[index].quantity > 0
        ? `Added! (${this.products[index].quantity})`
        : "Add to cart!";
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 100px;
}
.mb-2 {
  white-space: nowrap; /* Impede a quebra de linha */
  overflow: hidden; /* Esconde o texto que ultrapassar o limite */
}
.carousel-div {

}
</style>
