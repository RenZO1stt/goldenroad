<style>
body {
  margin: 0;
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
  font-size: 0.9rem;
  box-shadow: 0 0 2px gray;
}

.componentbar:hover {
  background-color: lightgray;
}

.cantselect {
  user-select: none;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>

<script>
let date = new Date().toLocaleDateString();

export default {
  name: "ComponentBar",
  props: {
    vari: {
      type: Object,
    },
  },
  data() {
    return {
      date,
    };
  },
};
</script>

<template>
  <div class="componentbar">
    <span class="cantselect">{{ vari.datum }}</span>
    <span class="cantselect">{{ vari.name || "  " }}</span>
  </div>
</template>
