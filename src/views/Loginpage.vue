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
  margin-top: 1.5vh;
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
        <h1 style="margin-bottom: 2vh">Login</h1>
        <input
          v-model="gmail"
          type="text"
          placeholder="Enter your Gmail"
          style="
            width: 65%;
            height: 15%;
            border-radius: 15px;
            margin: 2vh 0;
            padding-left: 1vw;
            font-size: 1vw;
          "
        />

        <input
          v-model="pass"
          type="password"
          placeholder="Enter your Password"
          style="
            width: 65%;
            height: 15%;
            border-radius: 15px;
            margin: 2vh 0;
            padding-left: 1vw;
            font-size: 1vw;
          "
        />
        <button class="login" @click="login()">L O G I N</button>
        <span
          style="
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
              sans-serif;
            font-size: 1vw;
          "
        >
          Don't have an account?
          <router-link
            to="/register"
            style="color: orange; text-decoration: underline"
            >Register</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import comingSoon from "@/assets/Comingsoon.png";
//import googlePic from "@/assets/Googlepic2.png";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { app } from "@/firebase-config.js";
import svipodaci from "@/podatci.js";

export default {
  name: "LandingPage",
  data() {
    return {
      // comingSoon,
      // googlePic,
      // provider: new GoogleAuthProvider(),
      svipodaci,
      gmail: "",
      pass: "",
    };
  },

  components: {},
  methods: {
    async login() {
      if (this.gmail === "" || this.pass === "") {
        alert("Please fill in both fields.");
      } else {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/korisnik`, {
          method: "GET",
        });

        const lista = await res.json();
        let found = false;

        for (let objekt of lista) {
          if (objekt.gmail === this.gmail && objekt.password === this.pass) {
            this.svipodaci.curuser = this.gmail;
            localStorage.setItem("curuser", this.gmail);
            console.log("Ovo je trenutni korisnik:", this.svipodaci.curuser);
            this.$router.replace("/");
            found = true;
            break;
          }
        }
        if (found == false) {
          alert("Invalid Gmail or Password. Please try again.");
        }
      }
    },
  },
};
</script>
