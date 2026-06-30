<style>
.componentbar {
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 14px 20px;
  margin: 10px 12px;

  background: white;

  border: 1px solid #eef2f7;
  border-radius: 12px;

  cursor: pointer;

  transition: all 0.2s ease;

  font-family: monospace;
}

.componentbar:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

/* DATE */
.date {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  min-width: 120px;
}

/* NAME */
.name {
  flex: 1;
  text-align: right;

  font-size: 14px;
  font-weight: 500;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<template>
  <div class="componentbar">
    <span class="cantselect">{{ vari.datum }}</span>
    <span class="cantselect">{{ vari.name || "  " }}</span>
  </div>
</template>

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
