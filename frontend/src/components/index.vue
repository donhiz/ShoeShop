<template>
  <div class="index-page">
    <h1>Welcome to the Shoe Shop!</h1>
    <p>This is the index page.</p>
    <p>Click <router-link to="/login">here</router-link> to go to the login page.</p>
  </div>
</template>

<script>

export default {
  name: "IndexPage",
};
</script>

<style>
.index-page {
  text-align: center;
  padding: 2rem;
}
</style>
