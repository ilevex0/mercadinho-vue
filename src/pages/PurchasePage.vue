<template>
  <div>
    <h1>Thank you for buying with us!</h1>
    <p>I hope you like this project.</p>
    <div class="margin-footer"></div>
  </div>
</template>

<script>
export default {
  name: 'PurchasePage',
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, 100);
  },
}
</script>

<style>
.margin-footer {
  margin-bottom: 900px;
}
</style>