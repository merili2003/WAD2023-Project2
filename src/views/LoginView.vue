<template>
  <!-- Main container for the login form. -->
  <div>
    <!-- Form element using Vue's submit.prevent directive to manage form submission in a Vue-specific way. -->
    <form @submit.prevent="validateForm">
      <!-- Title of the form for user context. -->
      <h2>Log in</h2>

      <!-- Input field for the user's email, also utilizing Vue's v-model for binding. -->
      <label for="email">Email</label>
      <input type="email" required v-model="email">

      <!-- Input field for password with Vue's v-model for data synchronization. -->
      <label for="password">Password</label>
      <input type="password" required v-model="password">
      <!-- Conditional rendering of password validation errors with list rendering using v-for. -->
      <div v-if="validatePassword.length" class="error">
        <ul>
          <li v-for="(error, index) in validatePassword" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Checkbox for agreeing to terms and conditions, crucial for legal compliance. -->
      <div>
        <input type="checkbox" required v-model="terms">
        <label for="checkbox">Accept terms and conditions</label>
      </div>

      <!-- Button to submit the form, invoking the login method. -->
      <div class="submit">
        <button @click="login">Log In</button>
        <p> OR </p>
        <button @click="this.$router.push('/signup')">Sign Up</button>
      </div>
    </form>
    
  </div>
</template>

<script>

export default {
  name: "LoginView", 
  data() {
    return {
      // Variables for storing user input and validation messages, reactive to user interactions.
      name: '',
      email: '',
      password: '',
      terms: false,
      validatePassword: [],
    };
  },
  methods: {
    // Method to validate form fields with custom rules.
    validateForm() {
      // Name validation logic.
      let errors = [];
      // Password validation rules using regular expressions.
      if (!/^[A-Z]/.test(this.password)) errors.push("Must start with an uppercase alphabet character.");
      if (!/[a-z].*[a-z]/.test(this.password)) errors.push("Must include at least two lowercase alphabet characters.");
      if (!/\d/.test(this.password)) errors.push("Must include at least one numeric value.");
      if (!/_/.test(this.password)) errors.push("Must include the character '_'.");
      if (this.password.length < 8 || this.password.length > 15) errors.push("Must be between 8-15 characters in length.");
      // Assigns the array of password validation error messages to the 'validatePassword' reactive property.
      this.validatePassword = errors;

    },
    // Login method to handle user login.
    login() {
      // Trigger form validation before proceeding.
      this.validateForm();
      // Check if all validations are passed and terms are agreed upon.
      if (!this.validatePassword.length && this.terms) {
        // Dispatch login action and handle promise.
        this.$store.dispatch("loginAction", { email: this.email, password: this.password })
        .then(this.$router.push({name: "home"}));
      } else {
        console.log("Login validation failed");
      }
    },
  }
}
</script>
  
  <style scoped>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: rgba(0, 0, 0, 0.5);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid pink;
    box-shadow: 0 0 10px rgb(255, 17, 192), 0 0 20px rgb(255, 39, 226), 0 0 30px pink, 0 0 40px pink; /* Neon pink glow */
    transition: box-shadow 0.3s ease-in-out;
}

form:hover {
    box-shadow: 0 0 15px pink, 0 0 25px pink, 0 0 35px pink, 0 0 45px pink; /* Intensify glow on hover */
}
  
  label {
      color: rgb(255, 0, 187);
      display: inline-block;
      margin: 25px 0 15px;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: bold;
  }
  
  input{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
  }
  input[type="checkbox"]{
      display: inline-block;
      width: 16px;
      margin:  0 10px 0 0;
      position: relative;
      top: 2px;
  }
  button{
  background:  rgb(144, 25, 255);
  border: 0;
  padding: 10px 20px;
  margin-top:  20px;
  color: white;
  border-radius: 20px;
  }
  h2, .submit{
      text-align: center;
  }
  .submit {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
  }
  .submit > p {
    padding-top: 1rem;
  }
  .error{
      color: rgb(255, 255, 255);
      font-size: 0.8em;
      margin-top:  10px;
      text-align: center;
  }
  </style>