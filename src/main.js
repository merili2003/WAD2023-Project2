// Importing necessary modules and components to bootstrap the Vue application
import { createApp } from "vue"; // Importing the createApp function from Vue for creating an app instance
import App from "./App.vue"; // Importing the main App component
import router from "./router"; // Importing Vue Router for handling navigation
import store from "./store"; // Importing Vuex store for state management

// Creating a new Vue application instance with the App component
// and then configuring the application to use Vuex and Vue Router
createApp(App)
  .use(store) // Integrating Vuex store with the application for global state management
  .use(router) // Integrating Vue Router with the application for SPA navigation
  .mount("#app"); // Mounting the Vue application to the DOM element with the ID 'app'
