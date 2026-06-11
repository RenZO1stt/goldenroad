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
  padding: 0.5vh 0.79vw;
  box-sizing: border-box;
  user-select: none;
}

.a1 {
  border-right: 1px white solid;
  margin-left: 45.72vw;
  user-select: none;
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

.avataricon {
  margin: 4vh auto;
  width: 15vw;
  height: auto;
  margin-bottom: 2.5vh;
}

.text {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.5vw;
  width: 40vw;
  height: 45vh;
  margin: 0 auto;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.singular {
  margin-left: 1vw;
  margin: 3vh 0;
  background-color: gray;
  border-radius: 7px;
  padding: 1vh 1vw;
}

.singular:hover {
  background-color: black;
  transform: scale(1.1) rotateZ(5deg);
  transition: transform 0.1s ease-in-out;
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
        margin: 5px 0.78vw;
        align-items: center;
        margin-left: auto;
      "
      @click="logout()"
    >
      LOG OUT
    </button>
  </div>

  <img src="@/assets/avataricon.png" alt="Avatar Icon" class="avataricon" />
  <div class="text">
    <span class="singular">Gmail: {{ svipodaci.curuser }}</span>
    <span class="singular">Name: Coming Soon...</span>
    <span class="singular">Number: Coming Soon...</span>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase-config.js";
import svipodaci from "../podatci.js";
export default {
  name: "ProfilePage",
  data() {
    return {
      svipodaci,
    };
  },
  /* mounted() {
    console.log(this.svipodaci.curuser);
  },*/
  methods: {
    logout() {
      const auth = getAuth(app);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          //console.log({ curuser, brojtreninga });
          this.$router.replace("/login");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
