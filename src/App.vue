<template>
    <!-- Component layout with AppHeader, router-view, and AppFooter components -->
    <AppHeader /> <!-- Includes the header component at the top -->
    <router-view /> <!-- Vue Router's outlet for displaying the current route's component -->
    <AppFooter /> <!-- Includes the footer component at the bottom -->
  </template>
  
  <script>
  import AppHeader from "@/components/Header.vue"; // Importing the Header component
  import AppFooter from "@/components/Footer.vue"; // Importing the Footer component
  
  export default {
    name: "App", // Name of the Vue component
    components: {
      AppHeader, // Registering the AppHeader component
      AppFooter  // Registering the AppFooter component
    },
    data: function() {
      return {
        vars: [{ showDropdown: false }] // Component's reactive data, including a variable for dropdown state
      };
    },
    methods: {
      logOut() {
        this.$store.dispatch("logoutAction"); // Dispatch logout action to Vuex store
        this.$router.push({ path: "/login" }); // Redirect user to login page
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts'); // Fetch posts from the server when component is mounted
    },
    computed: {
      // Computed properties for accessing Vuex store state and getters
      loggedIn() {
        return this.$store.getters.loggedIn; // Returns the logged-in state
      },
      activePfp() {
        return this.$store.state.activeAccount.pfp ? this.$store.state.activeAccount.pfp : '../pfp.png'; // Returns active profile picture or default
      },
      activeName() {
        return this.$store.state.activeAccount.name; // Returns the name of the active account
      },
      activeMail() {
        return this.$store.state.activeAccount.mail; // Returns the email of the active account
      }
    }
  };
  </script>
  
  <style>
  /* Styling for the #app element */
  #app {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-family: 'Unbounded', monospace;
    text-align: center;
    justify-content: space-between;
    min-height: 100vh; /* Ensures the app fills the viewport height */
    color: rgb(249, 249, 249);
    height: 100%;
  }
  
  /* Styling for the body element, including background image and color */
  body {
    margin: 0;
    background-image: url("@/assets/space.webp"); /* Background image */
    background-repeat: no-repeat; /* No repeat for background image */
    background-attachment: fixed; /* Fixed background image */
    background-size: 100vw 100vh; /* Full viewport width and height */
    background-color: black; /* Background color */
    overflow-y: scroll; /* Enable vertical scrolling */
    min-height:100vh; /* Minimum viewport height */
  }
  
  /* Styling to hide the scrollbar in various browsers */
  body::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, Opera */
  }
  body {
    -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */
  }
  </style>
  