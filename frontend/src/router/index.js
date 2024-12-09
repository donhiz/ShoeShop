import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../views/Dashboard.vue"; // Example dashboard view

const routes = [
    { path: "/login", name: "Login", component: LoginForm },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Add navigation guards to check for authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("jwtToken"); // Check for JWT token
    if (to.name === "Dashboard" && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
