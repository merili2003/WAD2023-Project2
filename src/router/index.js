import { createRouter, createWebHashHistory } from "vue-router";
import AddPostView from "../views/AddPostView.vue";
import LoginView from "../views/LoginView.vue";
import PostsView from "../views/PostsView.vue";

const routes = [{
        path: "/",
        name: "posts",
        component: PostsView,
    },
    {
        path: "/addPost",
        name: "addPost",
        component: AddPostView,
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