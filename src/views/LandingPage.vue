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

a {
  color: white;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 0.3rem 0.95rem;
  box-sizing: border-box;
  user-select: none;
}

.a1 {
  border-right: 1px white solid;
  margin-left: 45.72vw;
  user-select: none;
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
}
.Add {
  box-sizing: border-box;
  margin-top: 1.9vh;
  float: right;
  margin-right: 0.8vw;
  border: none;
  background-color: blue;
  color: white;
  border-radius: 16px;
  width: 5vw;
  height: 5vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1rem;
}

.Add:hover {
  background-color: darkblue;
}

.Remove {
  box-sizing: border-box;
  margin-top: 1.9vh;
  float: right;
  margin-right: 0.26vw;
  border: none;
  background-color: red;
  color: white;
  border-radius: 16px;
  width: 2.5vw;
  height: 5vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 0.8vw;
  font-weight: bold;
}

.Remove:hover {
  background-color: darkred;
}

.container {
  background-color: whitesmoke;
  width: 27vw;
  height: 56vh;
  margin: 0 auto;
  margin-top: 5.25rem;
  align-items: center;
  border-radius: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none;
}

.componentbar {
  height: 5vh;
  width: auto;
  background-color: rgb(228, 227, 227);
  margin: 7.5px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: monospace;
  font-size: 1rem;
  box-shadow: 0 0 2px gray;
}

.componentbar:hover {
  background-color: lightgray;
}
</style>

<template>
  <div class="header">
    <router-link to="/profile" class="a1">PROFILE</router-link>
    <router-link to="/" class="a2">HOME</router-link>
    <button
      disabled
      class="Remove"
      style="
        width: 7%;
        font-weight: normal;
        margin: 5px 15px;
        align-items: center;
        margin-left: auto;
      "
      @click="logout()"
    >
      LOG OUT
    </button>
  </div>
  <div class="main">
    <div class="background">
      <button class="Add" @click="dodajTrening()">Add+</button>
      <button class="Remove" @click="ukloniTrening()">-</button>
      <div class="container">
        <ComponentBar
          v-for="(trening, index) in brojtreninga"
          :key="index"
          @click="fillsheet(index)"
          :vari="trening"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ComponentBar from "@/components/componentbar.vue";
import svipodaci from "@/podatci.js";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase-config.js";

export default {
  name: "LandingPage",
  data() {
    return {
      brojtreninga: svipodaci.brojtreninga,
      svipodaci,
    };
  },

  async mounted() {
    const res = await fetch("http://localhost:3000/people");
    this.brojtreninga = await res.json();
  },
  components: {
    ComponentBar,
  },
  methods: {
    async dodajTrening() {
      const newTrening = {
        indexi: this.brojtreninga.length,
        name: null,
        table: [],
        datum: new Date().toString().slice(4, 15),
      };

      const res = await fetch("http://localhost:3000/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrening),
      });

      const saved = await res.json();
      this.brojtreninga.push(saved);
    },

    async ukloniTrening() {
      if (this.brojtreninga.length > 0) {
        const last = this.brojtreninga[this.brojtreninga.length - 1];
        const url = `http://localhost:3000/people/${last._id}`;
        console.log("URL:", url);

        const res = await fetch(url, { method: "DELETE" });
        console.log("Response status:", res.status);

        this.brojtreninga.pop();
      }
    },
    fillsheet(index) {
      svipodaci.indexofclicked = index; // Update global
      this.$router.push("/fill");
      console.log(svipodaci.indexofclicked);
    },
    logout() {
      console.log(this.svipodaci.curuser);
      const auth = getAuth(app);
      signOut(auth)
        .then(() => {
          //console.log({ curuser, brojtreninga });
          this.svipodaci.curuser = null;
          this.$router.replace("/login");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
