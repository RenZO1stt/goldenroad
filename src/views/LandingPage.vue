<style scoped>
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

.a1 {
  margin-left: auto;
}

.main {
  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f8fafc;

  padding: 10px;
}

.background {
  width: 750px;
  max-width: 100%;

  background: white;

  border-radius: 20px;

  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);

  padding: 30px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 25px;
}

.title {
  font-size: 30px;
  font-weight: 600;
  color: #111827;
}

.actions {
  display: flex;
  gap: 12px;
}

.Add,
.Remove {
  border: none;
  border-radius: 10px;

  height: 42px;

  padding: 0 18px;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.Add {
  background: #2563eb;
  color: white;
}

.Add:hover {
  background: #1d4ed8;
}

.Remove {
  background: #ef4444;
  color: white;
}

.Remove:hover {
  background: #dc2626;
}

.logout {
  margin-left: auto;
}

.container {
  width: 100%;
  height: 500px;

  background: #f9fafb;

  border: 1px solid #e5e7eb;

  border-radius: 15px;

  overflow-y: auto;
}

.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.componentbar {
  min-height: 60px;

  display: flex;
  align-items: center;

  padding: 0 25px;

  background: white;

  border-bottom: 1px solid #f1f5f9;

  transition: 0.2s;
}

.componentbar:hover {
  background: #eff6ff;
}
</style>

<template>
  <div class="header">
    <router-link to="/" style="font-weight: bold">Home</router-link>

    <router-link to="/profile" style="font-weight: bold">Profile</router-link>

    <button class="Remove logout" @click="logout()">LOG OUT</button>
  </div>

  <div class="main">
    <div class="background">
      <div class="toolbar">
        <h2 class="title" style="border: none">My Workouts</h2>

        <div class="actions">
          <button class="Remove" @click="ukloniTrening()">Remove</button>

          <button class="Add" @click="dodajTrening()">+ Add Workout</button>
        </div>
      </div>

      <div class="container">
        <ComponentBar
          v-for="trening in currentTable"
          :key="trening._id"
          @click="fillsheet(trening)"
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

export default {
  name: "LandingPage",
  data() {
    return {
      brojtreninga: svipodaci.brojtreninga,
      svipodaci,
    };
  },

  async mounted() {
    const res = await fetch(`${process.env.VUE_APP_API_URL}/vjezbe`);
    this.brojtreninga = await res.json();

    if (!this.svipodaci.curuser) {
      alert("You are not logged in. Redirecting to the login page.");
      this.$router.replace("/login");
    }
  },
  components: {
    ComponentBar,
  },
  computed: {
    currentTable() {
      let temp = [];
      for (let trening of this.brojtreninga) {
        if (trening.user == this.svipodaci.curuser) {
          temp.push(trening);
        }
      }
      return temp;
    },
  },
  methods: {
    async dodajTrening() {
      const newTrening = {
        user: this.svipodaci.curuser,
        indexi: this.brojtreninga.length,
        name: null,
        table: [],
        datum: new Date().toString().slice(4, 15),
      };

      const res = await fetch(`${process.env.VUE_APP_API_URL}/vjezbe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrening),
      });

      const saved = await res.json();
      this.brojtreninga.push(saved);
    },

    async ukloniTrening() {
      if (this.currentTable.length > 0) {
        const last = this.currentTable[this.currentTable.length - 1];
        const url = `${process.env.VUE_APP_API_URL}/vjezbe/${last._id}`;
        console.log("URL:", url);

        const res = await fetch(url, { method: "DELETE" });
        console.log("Response status:", res.status);

        const index = this.brojtreninga.findIndex(
          (item) => item._id === last._id,
        );
        if (index > -1) {
          this.brojtreninga.splice(index, 1);
        }
      }
    },
    fillsheet(trening) {
      svipodaci.currentWorkoutId = trening._id; // Store the unique workout ID
      localStorage.setItem("currentWorkoutId", trening._id);
      this.$router.push("/fill");
    },
    logout() {
      this.svipodaci.curuser = null;
      localStorage.removeItem("curuser");
      localStorage.removeItem("currentWorkoutId");
      this.$router.replace("/login");
    },
  },
};
</script>
