import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import ShowForm from "../components/shoe.vue"; // Show form for products (shoe)
import IndexPage from "../components/index.vue";
import DetailsPage from "../components/shoeDetails.vue";

const routes = [
    { path: "/login", name: "Login", component: LoginForm,props: (route) => ({fromIndex: route.params.fromIndex||false}) },
    { path: "/shoe", name: "ShoeItem", component: ShowForm,
        beforeEnter: (to, from, next) => {
            const role = localStorage.getItem('role');
            if (role === 'admin') {
                next(); // Allow access to the Shoe page for admin
            } else {
                next('/user-dashboard'); // Redirect non-admin users to the user dashboard
            }
        },
     }, // Shoe form for adding, editing, or deleting products
    { path: "/" + "", name: "IndexPage", component: IndexPage },
    { path: "/shoeDetails", name: "ProductDetails", component: DetailsPage},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
