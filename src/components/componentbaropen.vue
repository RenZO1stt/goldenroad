<style>
body {
  margin: 0;
}

.componentbaropen1 {
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

.addspan1 {
  border: none;
  width: 6vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.85rem;
  background-color: white;
  user-select: none;
  border-radius: 5px;
}
</style>

<template>
  <div class="componentbaropen1">
    <span type="text" id="exercise" class="addspan1">{{
      vjezba.exercise
    }}</span>
    <span type="text" id="sets" class="addspan1">{{ vjezba.sets }}</span>
    <span type="text" id="reps" class="addspan1">{{ vjezba.reps }}</span>
    <span type="text" id="kg" class="addspan1">{{ vjezba.kg }}</span>
  </div>
</template>

<script>
export default {
  name: "ComponentBarOpen",
  props: {
    vjezba: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
