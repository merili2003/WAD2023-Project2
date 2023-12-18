<template>
    <!-- Main container for the login form. -->
    <div>
      <!-- Form element using Vue's submit.prevent directive to manage form submission in a Vue-specific way. -->
      <form @submit.prevent="validateForm">
        <!-- Title of the form for user context. -->
        <h2>Create a post</h2>
  
        <!-- Input field for the user's email, also utilizing Vue's v-model for binding. -->
        <label for="body">Body</label>
        <input type="body" required v-model="body">
  
        <!-- Conditional rendering of post validation errors with list rendering using v-for. -->
        <div v-if="validatePost.length" class="error">
          <ul>
            <li v-for="(error, index) in validatePost" :key="index">{{ error }}</li>
          </ul>
        </div>
  
        <!-- Checkbox for agreeing to terms and conditions, crucial for legal compliance. -->
        <div>
          <input type="checkbox" required v-model="terms">
          <label for="checkbox">Accept terms and conditions</label>
        </div>
  
        <!-- Button to submit the form, invoking the login method. -->
        <div class="submit">
          <button @click="addPost">Add</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "NewPostView", 
    data() {
      return {
        // Variables for storing user input and validation messages, reactive to user interactions.
        validatePost: [],
        terms: false,
        body: ''
      };
    },
    methods: {
      // Method to validate form fields with custom rules.
      validateForm() {
        // Name validation logic.
        let errors = [];
        // Password validation rules using regular expressions.
        if (this.body.length < 10) errors.push("Post body must be at least 10 characters long");
        // Assigns the array of password validation error messages to the 'validatePassword' reactive property.
        this.validatePost = errors;
  
      },
      // Login method to handle user login.
      addPost() {
        // Trigger form validation before proceeding.
        this.validateForm();
        // Check if all validations are passed and terms are agreed upon.
        if (!this.validatePost.length && this.terms) {
          // Dispatch login action and handle promise.
          this.$store.dispatch("createPostAction", { body: this.body })
          .then(this.$store.dispatch("getAllPostsAction"))
          .then(this.$router.push("/"));
        } else {
          console.log("Posting failed");
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