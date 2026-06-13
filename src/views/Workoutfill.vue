<style>
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
  padding: 0.017vh 0.79vw;
  box-sizing: border-box;
  user-select: none;
}

.a1 {
  border-right: 1px white solid;
  user-select: none;
}

.backgroundopen {
  width: 35vw;
  height: 73vh;
  align-items: center;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 9vh;
  border-radius: 1.5rem;
  box-shadow: 0 0 10px gray;
  scrollbar-width: none;
}
.Addopen {
  display: inline-block;
  box-sizing: border-box;
  border: none;
  background-color: blue;
  color: white;
  border-radius: 16px;
  width: 5vw;
  height: 5vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1rem;
  margin-left: 0.3vw;
}

.Addopen1 {
  display: inline-block;
  box-sizing: border-box;
  border: none;
  background-color: red;
  color: white;
  border-radius: 16px;
  width: 2.5vw;
  height: 5vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1rem;
  margin-left: 0.4vw;
  font-weight: bold;
  align-items: center;
}

.Addopen:hover {
  background-color: darkblue;
}

.Addopen1:hover {
  background-color: darkred;
}
.containeropen {
  background-color: whitesmoke;
  width: 31vw;
  height: 51.5vh;
  margin: 0 auto;
  margin-top: 0.5rem;
  align-items: center;
  border-radius: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none;
}

.containeropen2 {
  display: flex;
  background-color: whitesmoke;
  width: 31.25vw;
  height: 6vh;
  margin: 0 auto;
  margin-top: 1.25rem;
  margin-left: 2rem;
  align-items: center;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow-y: hidden;
  scrollbar-width: none;
}

.text {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 2vw;
  font-family: monospace;
  font-size: 1.1rem;
  margin-top: 1.3vh;
}

.componentbaropen {
  height: 5vh;
  width: auto;
  background-color: rgb(228, 227, 227);
  margin: 7.5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  font-size: 1rem;
  box-shadow: 0 0 2px gray;
}

.span1 {
  align-items: center;
  margin: 0 25px;
}

.span2 {
  margin: 0 2.5vw;
  margin-left: 1.8vw;
}

.addinput1 {
  border: none;
  width: 6vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0 0.8vw;
}

.title {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1.5rem;
  margin-left: 1vw;
  border: none;
  background-color: transparent;
  width: 21.5vw;
  height: inherit;
  align-items: center;
}

.addinput1 {
  border: none;
  width: 6vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
<template>
  <div class="header">
    <router-link to="/profile" class="a1">PROFILE</router-link>
    <router-link to="/" class="a2">HOME</router-link>
  </div>
  <div class="main">
    <div class="backgroundopen">
      <div class="containeropen2">
        <input
          type="text"
          class="title"
          placeholder="Workout Title..."
          v-model="ime"
          required
        />
        <button class="Addopen1" @click="remove()">-</button>
        <button class="Addopen" @click="dodajpodtrening()">Add+</button>
      </div>
      <div class="componentbaropen">
        <input
          type="text"
          id="exercise"
          class="addinput1"
          placeholder="Exercise..."
          v-model="vjezba"
          required
        />
        <input
          type="text"
          id="sets"
          class="addinput1"
          placeholder="Sets..."
          v-model="setovi"
          required
        />
        <input
          type="text"
          id="reps"
          class="addinput1"
          placeholder="Reps..."
          v-model="ponavljanja"
          required
        />
        <input
          type="text"
          id="kg"
          class="addinput1"
          placeholder="Kg..."
          v-model="kilaza"
          required
        />
      </div>
      <div class="text">
        <span class="span2">Exercise</span>
        <span class="span2">Sets</span>
        <span class="span2">Reps</span>
        <span class="span2">Kg</span>
      </div>
      <div class="containeropen">
        <ComponentBarOpen
          v-for="(exercise, index) in currentTable"
          :key="index"
          :vjezba="exercise"
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
    const res = await fetch(`${process.env.VUE_APP_API_URL}/people`);
    this.brojtreninga = await res.json();
  },

  components: {
    ComponentBarOpen,
  },

  computed: {
    currentTable() {
      const current = this.brojtreninga.find(
        (trening) => trening.indexi === this.svipodaci.indexofclicked,
      );
      return current ? current.table : [];
    },
    /*  loadime() {
      const current = this.brojtreninga.find(
        (trening) => trening.indexi === this.svipodaci.indexofclicked,
      );
      return current ? current.ime : "";
    }, */
  },
  methods: {
    async dodajpodtrening() {
      for (let trening of this.brojtreninga) {
        if (trening.indexi == this.svipodaci.indexofclicked) {
          console.log(svipodaci.indexofclicked);
          console.log(this.brojtreninga);

          trening.table.push({
            exercise: this.vjezba,
            sets: this.setovi,
            reps: this.ponavljanja,
            kg: this.kilaza,
          });

          trening.name = this.ime;

          const res = await fetch(
            `${process.env.VUE_APP_API_URL}/people/${trening._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                table: trening.table,
                name: trening.name,
              }),
            },
          );

          break;
        }
      }
      // Reseta input fieldove
      this.vjezba = "";
      this.setovi = "";
      this.ponavljanja = "";
      this.kilaza = "";
    },

    async remove() {
      for (let trening of this.brojtreninga) {
        if (
          Object.keys(trening).includes("table") &&
          trening.indexi == this.svipodaci.indexofclicked
        ) {
          trening.table.pop();
          const res = await fetch(
            `${process.env.VUE_APP_API_URL}/people/${trening._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                table: trening.table,
                name: trening.name,
              }),
            },
          );
          break;
        }
      }
    },
  },
};
</script>
