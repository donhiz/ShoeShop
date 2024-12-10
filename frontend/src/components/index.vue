<template>
  <div class="index-page">

    <!-- Video background -->
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <!-- Your video source (update the path to your video file) -->
        <source src="../assets/shoevideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="logo">
        <a href="/"><img src="/image/logo-transparent-frontend.png" width="125px" alt="Logo"></a>
      </div>
      <h1>Welcome to the Shoe Shop!</h1>
      <p class="welcome-message">{{ welcomeMessage }}</p>
      <div class="cta">
        <router-link to="/login" class="login-link">Shop Now</router-link>
      </div>
      <div class="decorative-line"></div>
      <p class="call-to-action-text">Explore our latest collection of shoes and step into comfort.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  props: {
    welcomeMessage: {
      type: String,
      required: false,
      default: "Explore the latest collection of shoes!"
    }
  }
};
</script>

<style scoped>

.logo {
  text-align: center; /* Center the logo */
  margin: 20px 0;     /* Add some margin */
}

.logo img {
  max-width: 100%;
  height: auto;
}
/* Full-page background video */
.index-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  background-color: #f8f9fa;
  padding: 2rem;
  font-family: 'Helvetica', sans-serif;
  overflow: hidden; /* Ensure the content doesn't overflow */
}

/* Video background styling */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure video stays behind the content */
  background-color: #000; /* Fallback background color in case the video isn't loaded */
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video covers the background */
  position: absolute;
  top: 0;
  left: 0;
}

/* Content box with modern design */
.content {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background to allow video to show through */
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  color: #333;
  animation: fadeIn 1s forwards;
  z-index: 1; /* Ensure content is above the video */
}

/* Fade-in animation */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Heading with soft, modern look */
h1 {
  font-size: 36px;
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: capitalize;
  letter-spacing: 1px;
}

/* Soft welcome message */
.welcome-message {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-style: italic;
  line-height: 1.5;
}

/* Call-to-action button with vibrant color */
.cta {
  margin-bottom: 20px;
}

.login-link {
  font-size: 20px;
  color: #fff;
  background-color: #e67e22;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.login-link:hover {
  background-color: #d35400;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
}

/* Decorative line for a stylish touch */
.decorative-line {
  width: 60%;
  height: 2px;
  background-color: #e67e22;
  margin: 30px auto;
  border-radius: 10px;
}

/* Call to action text below the line */
.call-to-action-text {
  font-size: 16px;
  color: #7f8c8d;
  font-style: italic;
}

/* Responsive styles for smaller devices */
@media (max-width: 768px) {
  .content {
    padding: 2rem;
  }

  h1 {
    font-size: 28px;
  }

  .welcome-message {
    font-size: 16px;
  }

  .login-link {
    font-size: 18px;
  }
}
</style>
