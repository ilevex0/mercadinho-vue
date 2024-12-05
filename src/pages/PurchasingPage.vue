<template>
  <div class="PurchasingPage">
    <h1>Purchasing...</h1>
    <ul>
      <div v-if="this.buyNowCart.length > 0">
        <li v-for="(product, index) in this.buyNowCart" :key="index">
          {{ product.name }}, Quantity: {{ product.quantity }}, R$
          {{ (product.price * product.quantity).toFixed(2) }}
        </li>
      </div>
      <div v-else>
        <li v-for="(product, index) in this.cart" :key="index">
          {{ product.name }}, Quantity: {{ product.quantity }}, R$
          {{ (product.price * product.quantity).toFixed(2) }}
        </li>
      </div>
    </ul>

    <h1>Payment Method</h1>
    <!-- Método de Pagamento -->
    <div>
      <label for="payment-method">Payment Method:</label>
      <select v-model="form.paymentMethod" id="payment-method">
        <option value="" disabled selected>Select a payment method</option>
        <option value="credit-card">Credit Card</option>
        <option value="debit-card">Debit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      <span v-if="errors.paymentMethod" class="error">{{
        errors.paymentMethod
      }}</span>
    </div>

    <h1>Your Personal Information</h1>
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
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
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
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
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
        <span v-if="errors.address" class="error">{{ errors.address }}</span>
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
        <span v-if="errors.city" class="error">{{ errors.city }}</span>
      </div>

      <!-- CEP -->
      <div>
        <label for="zip">ZIP:</label>
        <input
          v-model="form.zip"
          type="text"
          id="zip"
          placeholder="ZIP"
          :class="{ 'is-invalid': errors.zip }"
        />
        <span v-if="errors.zip" class="error">{{ errors.zip }}</span>
      </div>

      <!-- Telefone -->
      <div>
        <label for="phone">Phone number:</label>
        <input
          v-model="form.phone"
          type="text"
          id="phone"
          placeholder="Your Phone number"
          :class="{ 'is-invalid': errors.phone }"
        />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </div>

      <!-- Botão de enviar -->
      <div>
        <button type="submit">Send and Buy</button>
      </div>
    </form>
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
    };
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
    buyNowCart: {
      type: Array,
      required: true,
    },
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
        this.$router.push('/finished')
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
</style>
