<template>
    <!-- Header component of the application -->
    <header>
      <!-- Container for navigation buttons -->
      <div class="Button-container">
        <!-- Navigation link to the Posts page -->
        <router-link class="link" to="/">Posts</router-link>
        <!-- Navigation link to the Login page -->
        <router-link class="link" to="/login">Login</router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "AppHeader", // Name of the component
    // This component acts as the header for the app, containing navigation links.
  };
  </script>
  
  <style scoped>
header {
    display: flex;
    justify-content: center; /* Aligns children (Button-container) in the center */
    align-items: center; /* Centers children vertically */
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 5px;
    min-height: 75px;
    font-size: 25px;
    border-radius: 0px;
    box-shadow: inset 0px 0px 10px 0px midnightblue;
}

.Button-container {
    display: flex;
    justify-content: center; /* Center the links inside Button-container */
    align-items: center; /* Align items vertically */
}

.Button-container .link {
    color: rgb(249, 249, 249);
    text-decoration: none;
    padding: 10px 20px;
    font-size: 25px;
    background-color: #00000000;
    border: none;
    margin: 0 10px; /* Adds horizontal spacing between links */
}

.Button-container .link:hover {
    transition-duration: 0.3s;
    background-color: rgba(25, 25, 112, 0.75);
}

.Button-container .router-link-exact-active {
    background-color: rgba(25, 25, 112, 0.75);
}
</style>