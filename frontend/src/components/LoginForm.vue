<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || "Login failed";
          return;
        }

        const { token, role } = await response.json();
        console.log("Login successful. Token:", token, "Role:", role);  // Log the role and token


        // Save token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Redirect to correct page based on role
        if (role === "admin") {
          console.log("Redirecting to Admin dashboard.");
          this.$router.push("/shoe");  // Admin page
        } else {
          console.log("Redirecting to User dashboard.");
          this.$router.push("/index");  // Regular user page
        }
      } catch (error) {
        console.error("Error logging in:", error);
        this.errorMessage = "An error occurred during login.";
      }
    },
  },
};
</script>

<style>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.error {
  color: red;
}
</style>
