import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$appName = "My App"; // Example global config
app.mount("#app");
