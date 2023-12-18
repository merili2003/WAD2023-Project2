// Import necessary functions and components from Vue and Vue Router
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PostsView from "../views/PostsView.vue";
import SignupView from "../views/SignupView.vue";
import ContactsView from "../views/ContactsView.vue";
import NewPostView from "../views/NewPostView.vue";
import OnePostView from "../views/OnePostView.vue";

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
    },
    {
        path: "/contacts",
        name: "contacs",
        component: ContactsView,
    },
    {
        path: "/newpost",
        name: "newpost",
        component: NewPostView,
    },
    {
        path: "/onepost/:id",
        name: "onepost",
        component: OnePostView
    }
];

// Create a router instance
const router = createRouter({
    history: createWebHashHistory(), // Use the web hash history mode for the router
    routes, // The routes to use in the application
});

const authenticate = async() => {
    return fetch("http://localhost:3000/auth/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, 
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data;
      })
      .catch((e) => {
        console.log(e);
        console.log("error authenticate");
      });
};


router.beforeEach(async (to, from) => {
    const data = await authenticate();
    const isAuthenticated = data?.authenticated ?? false;
    if ( to.name === 'contacts' ) return { name: to.name }
    if ( isAuthenticated ) {
        if ( to.name === 'login' || to.name === 'signup' )
            return { name: from.name }
    } 
    else {
        if ( to.name !== 'login' && to.name !== 'signup' )
            return { name: 'login' }
    }
  })

export default router; // Export the router for use in the main Vue instance
