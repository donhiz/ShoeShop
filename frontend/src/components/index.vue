<template>
  <div class="index-page">
    <h1>Welcome to the Shoe Shop!</h1>
    <p>{{ welcomeMessage }}</p>
    <p>Click <router-link to="/login">here</router-link> to go to the login page.</p>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  props: {
    welcomeMessage: {
      type: String,
      required: false,
      default: "This is the index page."
    }
  }
};
</script>

<style>
.index-page {
  text-align: center;
  padding: 2rem;
}
</style>
