<template>
  <v-app id="v-app">
    <v-main>
      <div id="escritorio" class="d-none d-sm-none d-md-flex">
        <div id="fondo-curvas"></div>
        <LibroDiccionario></LibroDiccionario>
      </div>
      <div id="mobile" class="d-sm-flex d-md-none d-lg-none d-xl-none">
        <MobileView></MobileView>
      </div>
      <v-dialog v-model="dialogoError" absolute max-width="600px">
          <v-alert
            :text="mensajeError"
            title="Error"
            type="error"
            closable
            @click:close="dialogoError = false"
          ></v-alert>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LibroDiccionario from './components/LibroDiccionario.vue';
import MobileView from './components/MobileView.vue';

import { useUIStore } from '@/stores/UIStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const UIStore = useUIStore();

const { dialogoError, mensajeError } = storeToRefs(UIStore);

onMounted(() => {
    window.addEventListener('offline', () => {
        dialogoError.value = true;
        mensajeError.value = "No te encuentras conectado a internet. Descríbeme necesita conexión a internet para fucionar."
    })
})
</script>
<style>

html, body, #v-app{
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

#escritorio {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right bottom, #003d79, #c027c8);
}

#fondo-curvas {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-image: url(./assets/Fondo_Web.png);
    opacity: 0.02;
}

#mobile {
  width: 100vw;
  height: 100dvh;
}

.listas {
    margin-left: 2%;
}


@media (min-width: 960px) and (max-width: 1280px) {
  .listas {
    margin-left: 3%;
  }
}


@media (min-width: 600px) and (max-width: 960px) {
  .listas {
    margin-left: 6%;
  }
}

@media (max-width: 600px) {
  .listas {
    margin-left: 8%;
  }
}
</style>