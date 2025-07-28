<script setup lang="ts">
import IconCalendar from "../icons/IconCalendar.vue";
import { IconUsers, IconSend } from "@iconify-prerendered/vue-mdi";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { ref } from "vue";

const rango = (inicio: number, final: number, pasos: number): Array<number> => {
  let arr: Array<number> = [];
  for (let i = inicio; i <= final; i += pasos) {
    arr.push(i);
  }
  return arr;
};
const adultos = ref(0);
const menores = ref(0);
const check_in = ref("");
let cant_adultos: Array<number> = rango(1, 20, 1);
let cant_menores: Array<number> = rango(1, 5, 1);

const mesesAbreviados: Object = {
  "01": "Ene",
  "02": "Feb",
  "03": "Mar",
  "04": "Abr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dic",
};

const fecha = flatpickr("#check-in", {
  minDate: "today",
  defaultDate: "today",
  mode: "range",
  locale: Spanish,
  altInput: true,
  altFormat: " j M Y",
  dateFormat: "Y-m-d",
});
</script>
<template>
  <article>
    <div class="reservas_box">
      <div class="title-reservas">
        <IconCalendar />
        <div class="text_reservas">
          <h1 class="font-bold">Check In</h1>
          <p>consultar disponibilidad</p>
        </div>
      </div>

      <div class="select-pax">
        <p>Cantidad de huespedes?</p>

        <div id="adultos">
          <label for="adultos">adultos</label>
          <IconUsers />
        </div>

        <select class="input" v-model="adultos">
          <option v-for="cant in cant_adultos" value="cant">
            {{ cant < 10 ? "0" + cant : cant }}
          </option>
        </select>
        <div id="menores">
          <label for="adultos">menores</label>
          <IconUsers />
        </div>

        <select class="input" v-model="menores">
          <option value="00">00</option>
          <option v-for="cant in cant_menores" value="cant">
            {{ cant < 10 ? "0" + cant : cant }}
          </option>
        </select>
      </div>
      <div class="select_days_reservas">
        <div id="SelectDateIn">
          <label for="SelectDateIn">Desde</label>
          <div id="check-in-flatpickr">
            <input type="text" class="check-in" id="check_in" readonly />
          </div>

          <div class="fecha">
            <div class="desde" id="desde"></div>
            <span class="separador" id="separador">hasta</span>
            <div class="hasta" id="hasta"></div>
            <h3 id="datos-check-in">seleccionar fecha</h3>
          </div>
        </div>
        <div class="SelectDateOut"></div>
      </div>

      <button class="submit-reservas">
        <IconSend />
        <p>consultar</p>
      </button>
    </div>
  </article>
</template>
<style>
a {
  text-decoration: none;
  color: var(--var-color-green400);
  padding: 0.25em 0.75em;
  border-radius: 3px;
  transition: 0.5s ease-out;
}

a:hover {
  background-color: var(--var-color-green400);
  color: var(--var-color-white);
}

article {
  width: 100%;
  height: 100vh;
}

.reservas_box {
  display: flex;
  padding: 3em;
  align-items: center;
  position: absolute;
  width: 53%;
  left: 50%;
  transform: translatex(-50%);
  height: 75px;
  background-color: var(--var-color-white);
  box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.5);
  bottom: 75px;
  z-index: 1;
  border-radius: 5px;

  svg {
    margin-right: 1em;
    width: 40px;
    fill: var(--var-color-green100);
  }
}

.separador {
  display: none;
}

.title-reservas {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 3px solid var(--var-color-green100);
  padding-right: 1.5em;
}

#btn_modal {
  display: none;
}

.text_reservas {
  h1 {
    color: var(--var-color-grey300);
    text-align: center;
    font-size: 1.2rem;
    line-height: 0.4em;
    text-transform: uppercase;
  }

  p {
    margin-top: 0.5rem;
    color: var(--var-color-grey300);
    text-align: center;
    font-size: 0.7em;
  }
}

.select-pax {
  display: flex;
  color: var(--var-color-grey300);
  font-size: 1em;
  justify-content: center;
  align-items: center;
  border-right: 3px solid var(--var-color-green600);
  padding: 0 1em;
  font-weight: 600;
  flex-basis: 300px;

  svg {
    width: 40px;
    height: 40px;
    fill: var(--var-color-green400);
  }
}

.select_days_reservas {
  display: flex;
  align-items: center;
  color: var(--var-color-grey300);
  font-size: 0.8em;
  font-weight: 600;

  svg {
    width: 40px;
    height: 40px;
    margin-left: 1em;
    fill: var(--var-color-green400);
  }
}

#SelectDateIn,
.SelectDateOut {
  position: relative;
  display: flex;
  font-size: 1.1em;
  font-weight: 700;
  color: var(--var-color-grey300);
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  margin: 1em 0.5em;
  padding: 0.5em;

  :hover {
    cursor: pointer;
  }

  span {
    border-radius: 5px;
    background-color: var(--var-color-grey200);
    padding: 0.5rem 0.5rem;
    height: 40px;
    font-size: 1rem;
    margin: 0 0.2rem;
    text-transform: uppercase;
    color: var(--var-color-white);
  }
}

.fecha {
  display: flex;
  gap: 25px;
  position: relative;
  text-align: center;
  width: 100%;
  height: 50%;
  margin-left: 0.5rem;
}

.fecha .dia_mes {
  font-size: 1rem;
  height: 1rem;
}

.fecha .anio {
  height: 2rem;
  font-size: 2rem;
  line-height: 2rem;
}

.submit-reservas {
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  right: -100px;
  width: 200px;
  height: 40px;
  background-color: var(--var-color-secondary);
  color: var(--var-color-white);
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  transition: 0.5s ease-out;
  padding: 0 1em;

  svg {
    position: absolute;
    top: -50px;
    opacity: 0;
    left: 15px;
    margin-left: 0.5em;
    width: 30px;
    height: 30px;
    transition: 0.5s ease-out;
    fill: var(--var-color-white);
  }

  p {
    position: relative;
    left: 15px;
    border-left: 2px solid var(--var-color-white);
    padding-left: 0.5em;
    font-size: 1em;
    letter-spacing: 3px;
  }

  &:hover {
    background-color: var(--var-color-acent);
    box-shadow: 0px 0px 20px var(--var-color-grey300);
    font-size: 0.7em;
    scale: 1.06;
  }

  &:hover > svg {
    scale: 0.7;
    top: 6px;
    opacity: 1;
  }

  &:active {
    background-color: var(--var-color-grey100);
  }
}

.modal-container {
  backdrop-filter: blur(5px);
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s ease all;
}

.modal-container:target {
  opacity: 1;
  visibility: visible;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 325px;
  height: 175px;
  background-color: var(--var-color-white);
  bottom: 150px;
  left: 800px;
  transition: all 0.5s;
  border-radius: 7px;
  box-shadow: 5px 05px 50px 0px rgba(0, 0, 0, 0.2);

  div {
    width: 80%;
    display: flex;
    padding: 0.5em;
    justify-content: center;
    align-items: center;
  }

  div:nth-child(1) {
    border-bottom: 2px solid var(--var-color-grey000);
  }

  .titulo_label {
    text-transform: uppercase;
    width: 100px;
    background-color: transparent;
    color: var(--var-color-green400);
  }

  .buttons_select_pax {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  svg:hover {
    background-color: red;
  }

  .save_pax {
    font-family: var(--var-font-type);
    font-size: 0.8em;
    letter-spacing: 2px;
    padding: 0.2em;
    text-transform: uppercase;
    border: none;
    width: 125px;
    border-radius: 4px;
    background-color: var(--var-color-green400);
    text-align: center;
    color: var(--var-color-white);
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: var(--var-color-green300);
    }
  }
}

#check-in-flatpickr {
  background-color: red;
  z-index: 5;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 75px;
  top: 0;
  width: 200px;
  height: 35px;
  opacity: 1;

  .input {
    width: 200px;
  }
}

#check-in-flatpickr:hover h3 {
  background-color: var(--var-color-green400);
}

/* Hace el input invisible */
h3 {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: 2px solid var(--var-color-green400);
}

.input {
  outline: none;
  text-align: center;
  border-radius: 5px;
  border: none;
  background-color: var(--var-color-grey100);
  width: 75px;
  height: 50px;
  padding: 0.5em;
  font-size: 1em;
  margin: 0.5em 1em;
}

#adultos,
#menores {
  color: var(--var-color-grey200);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
}

.title-reservas .icon {
  scale: 1.2;
  height: 75px;
  margin-right: 0.5rem;
  color: var(--var-color-green400);
}

.visible {
  display: block;
}

@media (max-width: 1920px) {
  .reservas_box {
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
