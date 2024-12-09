import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../src/components/LoginForm.vue";
import IndexPage from "../src/components/index.vue";
import DetailsPage from "../src/components/shoeDetails.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/index", name: "IndexPage", component: IndexPage },
        { path: "/login", name: "LoginPage", component: LoginPage },
        { path: "/shoeDetails", name: "ProductDetails", component:DetailsPage },
    ],
});
