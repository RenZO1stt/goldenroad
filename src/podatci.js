import { reactive, ref } from "vue";

const brojtreninga = reactive([]);
const indexofclicked = ref(null);
const curuser = ref(null);
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
  indexofclicked,
  curuser,
};
