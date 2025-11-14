<template>
  <v-app id="v-app">
    <v-main>
      <div id="container">
        <div id="background"></div>
        <LibroDiccionario></LibroDiccionario>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LibroDiccionario from './components/LibroDiccionario.vue';
  //
</script>
<style>
html, body, #v-app{
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right bottom, #003d79, #c027c8);
}

#container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-image: url(./assets/Fondo_Web.png);
    opacity: 0.02;
}
</style>