<template>
  <div class="login-container">
    <!-- Video background -->
    <div class="video-background">
      <video autoplay loop muted>
        <!-- Replace with your video URL -->
        <source src="../assets/shoevideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <!-- Login Form -->
    <div class="login-form">
      <h2>{{ headerMessage }}</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username:</label>
          <input v-model="username" id="username" type="text" placeholder="Enter your username" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input v-model="password" id="password" type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" :class="errorClass">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerMessage: {
      type: String,
      required: false,
      default: "Login",
    },
    errorClass: {
      type: String,
      required: false,
      default: "error",
    },
  },
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
        console.log("Login successful. Token:", token, "Role:", role);

        localStorage.setItem("Token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
          this.$router.push("/shoe");
        } else if (role === "read") {
          this.$router.push("/shoeDetails");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        this.errorMessage = "An error occurred during login.";
      }
    },
  },
};
</script>

<style scoped>
/* General styling to match index page */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
}

/* Video background styling */
.video-background {
  position: fixed; /* Fix the video to the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000; /* Fallback background color in case the video isn't loaded */
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video covers the entire screen */
  object-position: center center; /* Keeps the video centered */
}

/* Login container to match index layout */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  position: relative;
  z-index: 1; /* Ensure the form stays above the video */
}

/* Login form styling */
.login-form {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background to allow video to show through */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.login-form:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Heading styling */
.login-form h2 {
  color: #e67e22; /* Orange color for the heading */
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-transform: capitalize;
  font-weight: bold;
}

/* Input styling */
.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

/* Input fields styling */
.login-form input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e67e22; /* Orange border */
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

/* Input focus effect */
.login-form input:focus {
  border-color: #ff9800; /* Lighter orange for focus */
  outline: none;
  box-shadow: 0 0 4px rgba(255, 152, 0, 0.3); /* Light orange focus glow */
}

/* Submit button styling */
.login-form button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #e67e22; /* Orange background */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.login-form button:hover {
  background-color: #d46e1a; /* Darker orange on hover */
  transform: translateY(-2px);
}

/* Error message styling */
.error {
  margin-top: 1rem;
  color: #e74c3c; /* Red color for error */
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

  .login-form input,
  .login-form button {
    font-size: 0.9rem;
  }
}
</style>
