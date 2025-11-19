<template>
    <v-bottom-navigation mandatory color="primary" v-model="pestañaSeleccionada" grow>
        <v-btn>
            <v-icon>mdi-information</v-icon>
            <span>Información</span>
        </v-btn>
        <v-btn>
            <v-icon>mdi-magnify</v-icon>
            <span>Buscar</span>
        </v-btn>
        <v-btn>
            <v-icon>mdi-book-open-outline</v-icon>
            <span>Resultados</span>
        </v-btn>
    </v-bottom-navigation>

    <v-window v-model="pestañaSeleccionada">
        <v-window-item :value="0">
        <v-card height="100vh" style="overflow-y: auto; padding-bottom: 25%;">
            <div class="content d-flex d-sm-none flex-column align-center ga-16">
                <img class="logo-describeme-mobile" src="../assets/DescribeMe_Final.png" width="85%"/>
                <DescripcionComponent style="width: 85%;"></DescripcionComponent>
            </div>
            <div class="content d-none d-sm-flex flex-column align-center ga-16">
                <img class="logo-describeme-mobile" src="../assets/DescribeMe_Final.png" width="70%"/>
                <DescripcionComponent style="width: 70%;"></DescripcionComponent>
            </div>
        </v-card>
        </v-window-item>
        <v-window-item :value="1">
        <v-card height="100vh" class="d-flex flex-column align-center">
            <div class="content d-flex d-sm-none flex-column ga-14 ga-sm-16 align-center">
                <img class="logo-describeme-mobile" src="../assets/DescribeMe_Final.png" width="85%"/> 
                <ControlesBusqueda style="width: 85%;" class="d-flex d-sm-none"></ControlesBusqueda>         
            </div>
            <div class="content d-none d-sm-flex flex-column ga-14 ga-sm-16 align-center">
                <img class="logo-describeme-mobile" src="../assets/DescribeMe_Final.png" width="70%"/> 
                <ControlesBusqueda style="width: 70%;" class="d-none"></ControlesBusqueda>       
            </div>
             <v-img src="../assets/gil.jpg" class="logo-gil-mobile"/>
        </v-card>
        </v-window-item>
        <v-window-item :value="2">
        <v-card id="resultados-card" width="100vw" height="100vh" >
            <div class="resultados-container d-flex d-sm-none flex-column align-center justify-center">
                <ResultadosBusqueda style="width: 85%;"/>
            </div>
            <div class="resultados-container-sm d-none d-sm-flex flex-column align-center justify-center">
                <ResultadosBusqueda style="width: 70%;"/>
            </div>
        </v-card>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, watchEffect } from 'vue';
import ControlesBusqueda from './ControlesBusqueda.vue';
import ResultadosBusqueda from './ResultadosBusqueda.vue';

import { useUIStore } from '@/stores/UIStore';
import { useAPIStore } from '@/stores/APIStore';
import { storeToRefs } from 'pinia';
import DescripcionComponent from './DescripcionComponent.vue';

const UIStore = useUIStore();
const APIStore = useAPIStore()

const { pestañaSeleccionada } = storeToRefs(UIStore);
const { resultados } = storeToRefs(APIStore);

onMounted(() => {
  watch(resultados, () => {
        const container = <HTMLElement>document.querySelector(".resultados-container");
        const containerSmall = <HTMLElement>document.querySelector(".resultados-container-sm");

        if (resultados.value) {
            container?.classList.remove("justify-center")
            containerSmall?.classList.remove("justify-center")
            container.style.paddingTop = "10%";
            containerSmall.style.paddingTop = "20%";
        } else {
            container?.classList.add("justify-center");
            containerSmall?.classList.add("justify-center");
            container.style.paddingTop = "0%";
            containerSmall.style.paddingTop = "0%";
        }
    })  
})

</script>

<style scoped>

.content {
  margin-top: 10%;
}

.resultados-container {
    width: 100%;
    height: 100%;
}

.resultados-container-sm {
    width: 100%;
    height: 100%;
}

.logo-gil-mobile {
    width: 15%;
    height: 15%;
}

#card-controles {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media (max-width: 600px) {
    .logo-gil-mobile {
        width: 25%;
        height: 25%;
    }
}

</style>