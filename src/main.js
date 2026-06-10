import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase-config.js";
import svipodaci from "./podatci.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    svipodaci.curuser = user.email;
  } else {
    svipodaci.curuser = null;
  }
});

createApp(App).use(router).mount("#app");
