<style scoped>
body {
  margin: 0;
}
.header {
  background-color: black;
  width: 100vw;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
}

.background {
  width: 35vw;
  height: 70vh;
  align-items: center;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 10vh;
  border-radius: 1.5rem;
  box-shadow: 0 0 10px gray;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  border: none;
  width: 65%;
  height: 15%;
  border-radius: 15px;
  background-color: blue;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1vw;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.login:hover {
  background-color: darkblue;
}

.googleicon {
  display: inline-block;
  width: auto;
  height: 60%;
  margin-right: 1vw;
}

.loginsecret {
  border: none;
  width: 65%;
  height: 15%;
  border-radius: 15px;
  background-color: lightgray;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1vw;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.questionicon {
  display: inline-block;
  width: auto;
  height: 60%;
  margin-right: 1vw;
  margin: auto;
}
</style>

<template>
  <div class="header"></div>
  <div class="main">
    <div class="background">
      <div
        class="background"
        style="
          background-color: whitesmoke;
          width: 80%;
          height: 80%;
          margin: auto;
          display: flex;
          flex-direction: column;
        "
      >
        <button class="login" @click="login()">
          <img :src="googlePic" alt="Google Icon" class="googleicon" />
          Log In With Google
        </button>

        <button class="loginsecret">
          <img :src="comingSoon" title="Coming soon" class="questionicon" />
        </button>

        <button class="loginsecret">
          <img :src="comingSoon" title="Coming soon" class="questionicon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import comingSoon from "@/assets/Comingsoon.png";
import googlePic from "@/assets/Googlepic2.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase-config.js";
import svipodaci from "@/podatci.js";

export default {
  name: "LandingPage",
  data() {
    return {
      comingSoon,
      googlePic,
      provider: new GoogleAuthProvider(),
      svipodaci,
    };
  },
  components: {},
  methods: {
    login() {
      const auth = getAuth(app);
      signInWithPopup(auth, this.provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          if (result.user != null) {
            this.$router.replace("/");
            console.log(this.svipodaci.curuser);
          }
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
};
</script>
