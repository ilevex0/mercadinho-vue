<template>
  <div class="PurchasingPage">
    <div class="items">
      <h1
        v-if="this.$store.state.buyNowCart.length <= 0"
        class="purchasing-items"
      >
        Finish shopping ({{ this.$store.state.cart.length }} items)
      </h1>
      <h1
        v-if="this.$store.state.buyNowCart.length > 0"
        class="purchasing-items"
      >
        Finish shopping ({{ this.$store.state.buyNowCart.length }} items)
      </h1>
      <div class="all-items">
        <ul>
          <div v-if="this.$store.state.buyNowCart.length > 0">
            <div
              v-for="(product, index) in this.$store.state.buyNowCart"
              :key="index"
            >
              <li>
                <p>{{ product.name }}</p>
                <p>
                  Quantity: {{ product.quantity }}, R$
                  {{ (product.price * product.quantity).toFixed(2) }}
                </p>
              </li>
              <hr />
            </div>
          </div>
          <div v-else>
            <div
              v-for="(product, index) in this.$store.state.cart"
              :key="index"
            >
              <li>
                <p>{{ product.name }}</p>
                <p>
                  Quantity: {{ product.quantity }}, R$
                  {{ (product.price * product.quantity).toFixed(2) }}
                </p>
              </li>
              <hr />
            </div>
          </div>
        </ul>
      </div>
    </div>
    <!-- Método de Pagamento -->
    <h2>Total Price: R$ {{ totalPrice.toFixed(2) }}</h2>
    <hr />
    <div class="personal-information">
      <h1>Your Personal Information</h1>
      <div>
        <label for="payment-method">Payment Method:</label>
        <select v-model="form.paymentMethod" id="payment-method">
          <option value="" disabled selected>Select a payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        <p v-if="errors.paymentMethod" class="error">
          {{ errors.paymentMethod }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- Nome -->
        <div>
          <label for="name">Name:</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Your full name"
            :class="{ 'is-invalid': errors.name }"
          />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <!-- E-mail -->
        <div>
          <label for="email">E-mail:</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Your e-mail"
            :class="{ 'is-invalid': errors.email }"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>

        <!-- Telefone -->
        <div>
          <label for="phone">Phone number:</label>
          <input
            v-mask="'(##) #####-####'"
            v-model="form.phone"
            type="text"
            id="phone"
            placeholder="Your Phone number"
            :class="{ 'is-invalid': errors.phone }"
          />
          <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
        </div>

        <!-- Endereço -->
        <div>
          <label for="address">Address:</label>
          <input
            v-model="form.address"
            type="text"
            id="address"
            placeholder="Street, Number, Neighborhood"
            :class="{ 'is-invalid': errors.address }"
          />
          <p v-if="errors.address" class="error">{{ errors.address }}</p>
        </div>

        <!-- Cidade -->
        <div>
          <label for="city">City:</label>
          <input
            v-model="form.city"
            type="text"
            id="city"
            placeholder="City"
            :class="{ 'is-invalid': errors.city }"
          />
          <p v-if="errors.city" class="error">{{ errors.city }}</p>
        </div>

        <!-- CEP -->
        <div>
          <label for="zip">ZIP:</label>
          <input
            v-mask="'#####-###'"
            v-model="form.zip"
            type="text"
            id="zip"
            placeholder="ZIP"
            :class="{ 'is-invalid': errors.zip }"
          />
          <p v-if="errors.zip" class="error">{{ errors.zip }}</p>
        </div>

        <!-- Botão de enviar -->
        <div>
          <button type="submit">Send and Buy</button>
        </div>
      </form>
    </div>
    <div class="footer-margin"></div>
  </div>
</template>

<script>
export default {
  name: "PurchasingPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
      errors: {},
      totalPrice: 0,
    };
  },
  created() {
    if (this.$store.state.buyNowCart.length > 0) {
      this.totalPrice =
        parseInt(this.$store.state.buyNowCart[0].quantity) *
        parseFloat(this.$store.state.buyNowCart[0].price);
    } else if (this.$store.state.cart.length > 0) {
      this.totalPrice = 0;
      this.$store.state.cart.forEach((product) => {
        this.totalPrice +=
          parseInt(product.quantity) * parseFloat(product.price);
      });
    } else {
      this.$router.push("/");
    }
  },
  props: {
    buyNowClear: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      this.errors = {}; // Limpa os erros

      // Validações
      if (!this.form.name) {
        this.errors.name = "Please enter a valid name.";
      }
      if (!this.form.email || !this.validEmail(this.form.email)) {
        this.errors.email = "Please enter a valid email.";
      }
      if (!this.form.address) {
        this.errors.address = "Please enter a valid address.";
      }
      if (!this.form.city) {
        this.errors.city = "Please enter a valid city.";
      }
      if (!this.form.zip || !this.validZip(this.form.zip)) {
        this.errors.zip =
          "Please enter a valid ZIP code. (Only validades brazil zip codes)";
      }
      if (!this.form.phone || !this.validPhone(this.form.phone)) {
        this.errors.phone =
          "Please enter a valid phone number. (Only validades brazil phone numbers)";
      }
      if (!this.form.paymentMethod) {
        this.errors.paymentMethod = "Please select a payment method.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.paymentConfirmed();
        this.$swal.fire({
          title: "Congratulations!",
          text: "Your transaction has been successfully completed! The fictitious product has been paid for. Keep up the great work!",
          icon: "success",
        });
        this.resetForm();
        this.$router.push("/finished");
      }
    },
    paymentConfirmed() {
      this.$emit("clearCart");
      this.buyNowClear();
    },
    validEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
    },
    validZip(zip) {
      const re = /^\d{5}-?\d{3}$/;
      return re.test(zip);
    },
    validPhone(phone) {
      const re = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
      return re.test(phone);
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      };
    },
  },
};
</script>

<style scoped>
/* Estilos já existentes e novos estilos */

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 0.875em;
}

.is-invalid {
  border-color: red;
}
li {
  margin-bottom: 5px;
}
.personal-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
}
div {
  margin-bottom: 10px;
}
.footer-margin {
  margin: 150px;
}
select,
input {
  width: 18.5em;
}
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  text-align: start;
}
.all-items {
  max-width: 300px;
}
@media (max-width: 768px) {
  .items {
    margin-left: 20px;
    margin-right: 35px;
  }
  .personal-information {
    margin: 5px;
  }
}
</style>
