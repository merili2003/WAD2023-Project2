<template>
  <div>      
    <form @submit.prevent="validateForm">
      <h2>Create an account</h2>
      <label for="name">Name</label>
      <input type="name" required v-model="name">
      <label for="email">Email</label>
      <input type="email" required v-model="email">
      <label for="password">Password</label>
      <input type="password" required v-model="password">
      <div v-if="validateName" class="error"> {{ validateName }} </div>
      <div v-if="validatePassword.length" class="error">
        <ul>
          <li v-for="(error, index) in validatePassword" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div>
        <input type="checkbox" required v-model="terms">
        <label for="checkbox">Accept terms and conditions</label>
      </div>
      <div class="submit">
        <button @click="login">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "LoginView", 
  data() {
    return {
      name: '',
      email: '',
      password: '',
      terms: false,
      validateName: '',
      validatePassword: [],
    };
  },
  methods: {
    validateForm() {
      this.validateName = (this.name.length <= 0 || this.name.length > 15) ? 'Name must be shorter than 15 chars and at least 1 char' : '';
      let errors = [];
      if (!/^[A-Z]/.test(this.password)) {
        errors.push("Must start with an uppercase alphabet character.");
      }
      if (!/[a-z].*[a-z]/.test(this.password)) {
        errors.push("Must include at least two lowercase alphabet characters.");
      }
      if (!/\d/.test(this.password)) {
        errors.push("Must include at least one numeric value.");
      }
      if (!/_/.test(this.password)) {
        errors.push("Must include the character '_'.");
      }
      if (this.password.length < 8 || this.password.length > 15) {
        errors.push("Must be between 8-15 characters in length.");
      }
      this.validatePassword = errors;
    },
    login() {
    this.validateForm();
    if (this.validateName === '' && !this.validatePassword.length && this.terms) {
      this.$store.dispatch("loginAction", { name: this.name, email: this.email })
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(error => {
          console.error("Error during login:", error);
        });
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
  .error{
      color: rgb(255, 255, 255);
      font-size: 0.8em;
      margin-top:  10px;
      text-align: center;
  }
  </style>