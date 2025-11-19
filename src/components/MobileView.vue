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
        <v-card height="100vh">
            <p>Info</p>
        </v-card>
        </v-window-item>
        <v-window-item :value="1">
        <v-card height="100vh">
            <div id="content" class="d-flex flex-column align-center ga-14">
            <img id="logo-describeme-mobile" src="../assets/DescribeMe_Final.png" width="85%"/>
            <ControlesBusqueda style="width: 85%;" id="controles-mobile"></ControlesBusqueda>
            </div>
        </v-card>
        </v-window-item>
        <v-window-item :value="2">
        <v-card height="100vh" class="d-flex flex-column align-center">
            <ResultadosBusqueda style="margin-top: 15%;" />
        </v-card>
        </v-window-item>
    </v-window>
</template>

<script setup lang="ts">
import ControlesBusqueda from './ControlesBusqueda.vue';
import ResultadosBusqueda from './ResultadosBusqueda.vue';

import { useUIStore } from '@/stores/UIStore';
import { storeToRefs } from 'pinia';

const UIStore = useUIStore();

const { pestañaSeleccionada } = storeToRefs(UIStore);


</script>

<style scoped>

#resultados {
    width: 85%;
}

</style>