<template>
  <v-app id="v-app">
    <v-main>
      <div id="container">
        <div id="background"></div>
        <LibroDiccionario></LibroDiccionario>
      </div>
      <v-dialog v-model="errorDialog" absolute max-width="600px">
          <v-alert
            title="Error"
            type="error"
            :text="errorMessage"
            closable
            @click:close="errorDialog = false"
          ></v-alert>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LibroDiccionario from './components/LibroDiccionario.vue';

import { useUIStore } from '@/stores/UIStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const UIStore = useUIStore();

const { errorDialog, errorMessage } = storeToRefs(UIStore);

onMounted(() => {
    window.addEventListener('offline', () => {
        errorDialog.value = true;
        errorMessage.value = "No te encuentras conectado a internet. Descríbeme necesita conexión a internet para fucionar."
    })
})
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