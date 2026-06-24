import { reactive, ref } from "vue";

const brojtreninga = reactive([]);
const currentWorkoutId = ref(
  typeof localStorage !== "undefined"
    ? localStorage.getItem("currentWorkoutId")
    : null,
);
const curuser = ref(
  typeof localStorage !== "undefined" ? localStorage.getItem("curuser") : null,
);
//{index: indexofclicked , brojpodtreninga: , name: , tables: [{exercise: , sets: ,...},{...}]}
//const storepodtreninga = []; //prikazuje onaj koji zadovoljava uvijet

/*
const podtrening = {
  index: svipodaci.indexofclicked,
  name: this.ime,
  date: new Date().toLocaleDateString(),
  brojpodtreninga: this.svipodaci.podtreninzi.length,
  tables: []
}; 
*/

//objekt za kreaciju i misto di storan

/*
if (brojtreninga.some((obj) => obj.index == indexofclicked)) {
    --otvori taj podtreningfill--
    --.push {{prikazaniarray}}
}   
*/

//FINAL: {INDEX, NAME, ARRAY OF OBJECTS}

export default {
  brojtreninga,
  currentWorkoutId,
  curuser,
};
