// Import necessary functions and components from Vue and Vue Router
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PostsView from "../views/PostsView.vue";
import SignupView from "../views/SignupView.vue";

// Define the routes for your application
const routes = [
    {
        path: "/", // The URL path for the route
        name: "home", // A name for easy reference to the route
        component: PostsView, // The Vue component that this route should render
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupView,
    }
];

// Create a router instance
const router = createRouter({
    history: createWebHashHistory(), // Use the web hash history mode for the router
    routes, // The routes to use in the application
});

export default router; // Export the router for use in the main Vue instance
