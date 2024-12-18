<template>
  <div class="FooterComponent">
    <a href="#" class="button-back-to-top">Back to Top</a>
    <section class="about-us">
      <div class="about-us-div">
        <hr />
        <h3>About us</h3>
        <p class="about-us-div-p"><a href="/about">About me</a></p>
        <p class="about-us-div-p">
          <a href="https://github.com/ilevex0" target="_blank">My GitHub</a>
        </p>
        <p class="about-us-div-p">
          <a href="https://www.linkedin.com/in/ilevex/" target="_blank"
            >My Linkedin</a
          >
        </p>
        <hr />
      </div>
      <div class="payment-methods-div">
        <hr />
        <h3>Payment</h3>
        <p><a href="#">Payment Methods</a></p>
        <p><a href="#">Credit Card</a></p>
        <p><a href="#">Debit Card</a></p>
        <hr />
      </div>
    </section>
    <section class="author-section">
      <div class="author-div">
        <p>&copy; Copyright 2024 - All rights reserved</p>
        <p>|</p>
        <p>
          This website was created by
          <a
            href="https://github.com/ilevex0"
            target="_blank"
            class="author-div-a"
            >https://github.com/ilevex0</a
          >
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.FooterComponent {
  margin: 10px 0px 0px 0px;
  background-color: rgb(26, 41, 56);
  color: white;
}
a {
  text-decoration: none;
  color: rgb(140, 142, 146);
}
a:hover {
  color: rgb(195, 226, 255);
}
.author-div {
  display: flex;
  justify-content: center;
  gap: 25px;
  color: rgb(104, 104, 104);
  padding: 20px 0px 0px 0px;
}
.author-section {
  background-color: rgb(23, 23, 27);
}
.author-div-a {
  color: rgb(104, 104, 104);
}
.author-div-a:hover {
  color: rgb(153, 153, 153);
}
.about-us {
  display: flex;
  justify-content: center;
  margin: 25px;
  gap: 10%;
}
.button-back-to-top {
  display: block;
  padding: 20px;
  background-color: rgb(44, 75, 100);
  color: rgb(221, 221, 221);
}
.button-back-to-top:hover {
  background-color: rgb(44, 98, 129);
  color: rgb(241, 241, 241);
}
@media (max-width: 843px) {
  .author-div p {
    display: none;
  }
}
</style>
