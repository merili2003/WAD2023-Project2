<template>
  <div>
      
    <form @submit.prevent ="validateForm">
    <h2>Create an account</h2>
    <label for="name">Name</label>
    <input type="name" required v-model="name">
    <label for="email">Email</label>
    <input type="email" required v-model="email">
    <label for="password">Password</label>
    <input type="password" required v-model="password">
    <div v-if="validateName" class="error"> {{ validateName }} </div>
    <div v-if="validatePassword" class="error"> {{validatePassword}}</div>
  
  <div>
  
  <input type="checkbox" required v-model="terms">
  <label for="checkbox">Accept terms and conditions</label>
  </div>
  
  <div class="submit">
      <button @click="login">Sign up </button>
  </div>
  </form>
  
  
  </div>
  
  
  </template>
  
  <script>
import router from '@/router';

  export default {
  name: "LoginView", 
  
  data: function() {
      return {
     name: '',
     email: '',
     password: '',
     terms: false,
     validateName: '',
     validatePassword:'',
    }},
    methods: {
     /* Validate password */
     validateForm(){
      console.log('signup is submitted');
      this.validateName = (this.name.length <= 0 || this.name.length > 15) ? 'Name must be shorter than 15 chars and atleast 1 char' : ''
     this.validatePassword = (this.password.length <8 || this.password> 15)? 'password must be between 8-15 chars':''
     console.log(this.validatePassword);
     let regex = /[A-Z]+[a-z]{2}[a-z]*[0-9]+_+[a-zA-z0-9_]*/
     console.log(regex.test(this.password));
     console.log(this.password);
     this.validatePassword = regex.test(this.password)? this.validatePassword:'The password must start with atleast one uppercase alphabet character, atleast two lowercase alphabet characters, atleast one numeric value, atleast one "_" and the password should be of a specific length (at least 8 chars and less than 15 chars).'
    },
     login() {
      this.validateForm();
      if (this.validateName.length == 0 && this.validatePassword.length == 0) {
        this.$store.dispatch("loginAction", {name:this.name, mail:this.email});
        router.push({path: "/"});
      }
     }
    }
  }
  </script>
  
  <style scoped>
  form {
    max-width: 420px;
    margin: 30px auto;
    background:  rgb(167, 154, 154);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  
  label {
      color: rgb(8, 110, 110);
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
  background:  rgb(8, 110, 110);
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
      color: red;
      font-size: 0.8em;
      margin-top:  10px;
      text-align: center;
  }
  </style>