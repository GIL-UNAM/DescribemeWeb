<template>
  <v-app id="v-app">
    <v-main>
      <div id="desktop" class="d-none d-sm-none d-md-flex">
        <div id="gradient"></div>
        <div id="background"></div>
        <LibroDiccionario></LibroDiccionario>
      </div>
      <div id="mobile" class="d-sm-flex d-md-none d-lg-none d-xl-none">
        <MobileView></MobileView>
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
import MobileView from './components/MobileView.vue';

import { useUIStore } from '@/stores/UIStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const UIStore = useUIStore();

const { errorDialog, errorMessage } = storeToRefs(UIStore);

onMounted(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    updateVh();
    window.addEventListener("resize", updateVh);

    window.addEventListener('offline', () => {
        errorDialog.value = true;
        errorMessage.value = "No te encuentras conectado a internet. Descríbeme necesita conexión a internet para fucionar."
    })
})
</script>
<style>
/*calc(var(--vh) * 100) */

html, body, #v-app{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#desktop {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right bottom, #003d79, #c027c8);
}

#mobile {
  width: 100%;
  height: 100%;
}

#background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-image: url(./assets/Fondo_Web.png);
    opacity: 0.02;
}
</style>