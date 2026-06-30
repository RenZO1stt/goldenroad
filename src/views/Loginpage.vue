<style scoped>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background: #f8fafc;
}
.main * {
  font-family: "Times New Roman", Times, serif !important;
}
* {
  box-sizing: border-box;
}

.header {
  width: 100%;
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.main {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

/* Outer container */
.background:first-of-type {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  margin: 0;
}

/* Login card */
.background:last-of-type {
  width: 430px;
  max-width: 100%;
  padding: 45px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;

  border-radius: 20px;

  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
}

.background h1 {
  margin: 0;
  color: #111827;
  font-size: 34px;
  font-weight: 700;
}

.subtitle {
  margin-top: 10px;
  margin-bottom: 35px;
  color: #6b7280;
  font-size: 15px;
}

/* Inputs */

.background input {
  width: 100%;
  height: 52px;

  margin-bottom: 18px;

  padding: 0 16px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  font-size: 15px;

  transition: 0.2s;
}

.background input::placeholder {
  color: #9ca3af;
}

.background input:focus {
  outline: none;
  border-color: #2563eb;

  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

/* Button */

.login {
  width: 100%;
  height: 52px;

  margin-top: 10px;

  border: none;
  border-radius: 10px;

  background: #2563eb;

  color: white;
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;
}

.login:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.login:active {
  transform: translateY(0);
}

/* Register text */

.register-text {
  margin-top: 22px;
  color: #6b7280;
  font-size: 15px;
}

.register-text a {
  margin-left: 4px;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.register-text a:hover {
  text-decoration: underline;
}

/* Unused classes */

.googleicon,
.questionicon,
.loginsecret {
  display: none;
}

/* Mobile */

@media (max-width: 600px) {
  .background:last-of-type {
    padding: 35px 25px;
  }

  .background h1 {
    font-size: 28px;
  }
}
</style>

<template>
  <div class="header"></div>
  <div class="main">
    <div class="background">
      <div class="background">
        <h1 style="margin-bottom: 15px">Login</h1>
        <input v-model="gmail" type="text" placeholder="Enter your Gmail" />

        <input
          v-model="pass"
          type="password"
          placeholder="Enter your Password"
        />
        <button class="login" @click="login()">L O G I N</button>
        <span class="register-text">
          Don't have an account?
          <router-link to="/register">Register</router-link></span
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
