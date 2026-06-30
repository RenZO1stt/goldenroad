<style scoped>
* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  margin: 0;
  background: #f8fafc;
}

/* HEADER */

.header {
  width: 100%;
  height: 70px;

  background: white;
  border-bottom: 1px solid #e5e7eb;

  display: flex;
  align-items: center;

  padding: 0 40px;

  box-sizing: border-box;
}

.header a {
  color: #374151;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;

  margin-right: 25px;

  transition: 0.2s;
}

.header a:hover {
  color: #2563eb;
}

/* LOGOUT */

.Remove {
  background: #ef4444;
  color: white;
  border: none;
  padding: 13px 17px;
  border-radius: 10px;
}

.Remove:hover {
  background: #dc2626;
}

.logout {
  margin-left: auto;
}

/* PAGE LAYOUT */

.avataricon {
  display: block;

  width: 120px;
  height: 120px;

  margin: 150px auto 20px;

  border-radius: 50%;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  object-fit: cover;
}

/* CARD */

.text {
  width: 380px;
  max-width: 90%;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 25px;

  background: white;

  border-radius: 18px;

  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);

  color: #111827;
}

/* ITEMS */

.singular {
  background: #f3f4f6;

  padding: 12px 15px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: bold;

  color: #374151;

  transition: 0.2s;
}

.singular:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}
</style>

<template>
  <div class="header">
    <router-link to="/" class="a2" style="font-weight: bold">Home</router-link>
    <router-link to="/profile" class="a1" style="font-weight: bold"
      >Profile</router-link
    >
    <button class="Remove logout" @click="logout()">LOG OUT</button>
  </div>

  <img src="@/assets/avataricon.png" alt="Avatar Icon" class="avataricon" />
  <div class="text">
    <span class="singular">Gmail: {{ svipodaci.curuser }}</span>
    <span class="singular">Name: Coming Soon...</span>
    <span class="singular">Number: Coming Soon...</span>
  </div>
</template>

<script>
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
      this.svipodaci.curuser = null;
      localStorage.removeItem("curuser");
      localStorage.removeItem("currentWorkoutId");
      this.$router.replace("/login");
    },
  },
};
</script>
