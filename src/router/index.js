import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PostsView from "../views/PostsView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: PostsView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
