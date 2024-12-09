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
        localStorage.setItem("Token", token);
        localStorage.setItem("role", role);

        // Redirect to correct page based on role
        if (role === "admin") {
          console.log("Redirecting to Admin dashboard.");
          this.$router.push("/shoe");  // Admin page
        }else if (role === "read") {
          console.log("Redirecting to read dashboard.");
          this.$router.push("/shoeDetails");  // Admin page
        } else {
          console.log("Redirecting to User dashboard.");
          this.$router.push("/");  // Regular user page
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
/* Center the form on the page */
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Styling the login form container */
.login-form {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Form header styling */
.login-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

/* Form label styling */
.login-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

/* Input fields styling */
.login-form input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

/* Input focus effect */
.login-form input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
}

/* Submit button styling */
.login-form button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Button hover effect */
.login-form button:hover {
  background-color: #0056b3;
}

/* Error message styling */
.error {
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
  text-align: center;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }

  .login-form h2 {
    font-size: 1.5rem;
  }
}
</style>
