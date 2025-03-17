<template>
  <div>
    <input type="text" id="inputRef" v-model="date" placeholder="Seleccionar fecha" readonly>
    <p>Fecha seleccionada: {{ date }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import flatpickr from 'flatpickr';


const date = ref(""); 
const inputRef = ref(null);

onMounted(() => {
  if (inputRef.value) {
    flatpickr("#inputRef", { 
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      onChange: (selectedDates, dateStr) => {
        date.value = dateStr;
      }
    });
  }
});
</script>

<style>
input {
  z-index: 500;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
