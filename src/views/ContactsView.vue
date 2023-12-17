<template>
    <!-- Main container for the login form. -->
    
  </template>
  
  <script>
  
  export default {
    name: "ContactsView", 
    data() {
      return {
        
      };
    },
    methods: {
      
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
    </style>