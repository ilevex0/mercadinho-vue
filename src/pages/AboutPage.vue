<template>
  <div class="AboutPage">
    <h1>About</h1>
    <div class="accordion-faq">
      <h2>FAQ</h2>
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary"
              >About this project</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text><p>This is a front-end website built with <b>Vue.js</b>. The website uses <b>SweetAlert2</b>, <b>BootstrapVue</b>, and it <b>makes a request</b> to the <b>GitHub Gist API</b> to fetch data in <b>JSON format</b>.</p></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary"
              >About the images in this Website.</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                ><p>
                  The images in this website is not mine!! I am ONLY the author
                  of this website, not the images!
                </p>
                <p>
                  <b
                    >If you are the author of the images and want me to delete,
                    just contact me and i will do it.</b
                  >
                </p>
                <p>
                  The images are here just for illustration purpose!
                </p></b-card-text
              >
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="primary">
              How do I get in touch? | My Social Media</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                ><p>
                  Just contact me on
                  <a href="https://www.linkedin.com/in/ilevex/" target="_blank"
                    >My Linkedin</a
                  >
                  or send me a email
                  <a href="mailto:contactilevex@gmail.com"
                    >contactilevex@gmail.com</a
                  >
                </p>
                <p>
                  if you want to see my GitHub Repos is
                  <a href="https://github.com/ilevex0">github.com/ilevex0</a>
                </p></b-card-text
              >
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
    <div class="margin-footer"></div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
.margin-footer {
  margin-bottom: 700px;
}
.accordion-faq {
  margin: 0px 300px;
}
@media (max-width: 1024px) {
  .accordion-faq {
    margin: 0px 6em;
  }
}
@media (max-width: 768px) {
  .accordion-faq {
    margin: 10px;
  }
}
</style>
