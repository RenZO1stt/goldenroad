<style>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background: #f8fafc;
}

* {
  box-sizing: border-box;
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
}

.header a {
  color: #374151;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;

  margin-right: 25px;
}

.header a:hover {
  color: #2563eb;
}

/* MAIN WRAPPER */
.main {
  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;

  padding: 40px 20px;
}

/* CARD */
.backgroundopen {
  width: 850px;
  max-width: 100%;

  background: white;

  border-radius: 20px;

  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);

  padding: 25px;
}

/* TOP BAR */
.containeropen2 {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 20px;
}

/* TITLE */
.title {
  flex: 1;

  height: 45px;

  border: 1px solid #e5e7eb;
  border-radius: 10px;

  padding: 0 14px;

  font-size: 15px;

  background: #fff;
}

.title:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

/* BUTTONS */
.Addopen,
.Addopen1 {
  border: none;
  border-radius: 10px;

  height: 45px;

  padding: 0 14px;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.Addopen {
  background: #2563eb;
  color: white;
}

.Addopen:hover {
  background: #1d4ed8;
}

.Addopen1 {
  background: #ef4444;
  color: white;
}

.Addopen1:hover {
  background: #dc2626;
}

/* INPUT ROW */
.componentbaropen {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;

  padding: 15px;

  background: #f9fafb;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  margin-bottom: 15px;
}

.addinput1 {
  width: 100%;
  height: 40px;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  padding: 0 10px;

  font-size: 14px;
}

.addinput1:focus {
  outline: none;
  border-color: #2563eb;
}

/* LABELS */
.text {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: 0 10px;
  margin-bottom: 10px;

  font-size: 13px;
  color: #6b7280;
}

/* TABLE */
.containeropen {
  max-height: 400px;
  overflow-y: auto;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #fff;
}

/* ROWS */
.componentbaropen {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  align-items: center;

  padding: 12px 15px;

  border-bottom: 1px solid #f1f5f9;

  font-size: 14px;
  font-family: "Poppins", sans-serif;

  background: white;
}

.componentbaropen:hover {
  background: #eff6ff;
}
</style>
<template>
  <div class="header">
    <router-link to="/" style="font-weight: bold">Home</router-link>
    <router-link to="/profile" style="font-weight: bold">Profile</router-link>
  </div>

  <div class="main">
    <div class="backgroundopen">
      <!-- TOP BAR -->
      <div class="containeropen2">
        <input
          type="text"
          class="title"
          placeholder="Workout Title..."
          v-model="ime"
        />

        <button class="Addopen1" @click="remove()">-</button>

        <button class="Addopen" @click="dodajpodtrening()">Add+</button>
      </div>

      <!-- INPUT ROW -->
      <div class="componentbaropen">
        <input v-model="vjezba" placeholder="Exercise..." class="addinput1" />
        <input v-model="setovi" placeholder="Sets..." class="addinput1" />
        <input v-model="ponavljanja" placeholder="Reps..." class="addinput1" />
        <input v-model="kilaza" placeholder="Kg..." class="addinput1" />
      </div>

      <!-- LABELS -->
      <div class="text">
        <span>Exercise</span>
        <span>Sets</span>
        <span>Reps</span>
        <span>Kg</span>
      </div>

      <!-- TABLE -->
      <div class="containeropen">
        <ComponentBarOpen
          v-for="(exercise, index) in currentTable"
          :key="index"
          :vjezba="exercise"
          @dblclick="deleteExercise(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ComponentBarOpen from "@/components/componentbaropen.vue";
import svipodaci from "@/podatci.js";

export default {
  name: "Workoutfill",
  data() {
    return {
      brojtreninga: svipodaci.brojtreninga,
      svipodaci,
      ime: "",
      vjezba: "",
      setovi: "",
      ponavljanja: "",
      kilaza: "",
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
    ComponentBarOpen,
  },

  computed: {
    currentTable() {
      const current = this.brojtreninga.find(
        (trening) => trening._id == this.svipodaci.currentWorkoutId,
      );
      return current ? current.table : [];
    },
    currentWorkout() {
      return this.brojtreninga?.find(
        (trening) => trening._id == this.svipodaci.currentWorkoutId,
      );
    },
    /*  loadime() {
      const current = this.brojtreninga.find(
        (trening) => trening.indexi == this.svipodaci.indexofclicked,
      );
      return current ? current.ime : "";
    }, */
  },
  methods: {
    async dodajpodtrening() {
      if (!this.currentWorkout) return;

      this.currentWorkout.table.push({
        exercise: this.vjezba,
        sets: this.setovi,
        reps: this.ponavljanja,
        kg: this.kilaza,
      });

      this.currentWorkout.name = this.ime;

      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/vjezbe/${this.currentWorkout._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: this.currentWorkout.table,
            name: this.currentWorkout.name,
          }),
        },
      );

      // Reseta input fieldove
      this.vjezba = "";
      this.setovi = "";
      this.ponavljanja = "";
      this.kilaza = "";
    },

    async remove() {
      if (!this.currentWorkout || !this.currentWorkout.table.length) return;

      this.currentWorkout.table.pop();
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/vjezbe/${this.currentWorkout._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: this.currentWorkout.table,
            name: this.currentWorkout.name,
          }),
        },
      );
    },
    async deleteExercise(index) {
      if (
        !this.currentWorkout ||
        index < 0 ||
        index >= this.currentWorkout.table.length
      )
        return;

      this.currentWorkout.table.splice(index, 1);

      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/vjezbe/${this.currentWorkout._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: this.currentWorkout.table,
            name: this.ime,
          }),
        },
      );
    },
  },
};
</script>
