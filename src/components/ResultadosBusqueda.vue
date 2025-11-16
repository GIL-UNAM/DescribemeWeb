<template>
    <div v-if="fetching">
        <v-progress-circular 
            color="primary" 
            class="d-lg-flex d-md-none d-sm-none d-none" 
            indeterminate 
            size="50"
        ></v-progress-circular>
        <v-progress-circular 
            class="d-lg-none" 
            color="primary" 
            indeterminate 
            size="40"
        ></v-progress-circular>
    </div>
    <div v-else-if="resultados" id="resultados" class="d-flex flex-column ga-lg-8 ga-md-4">
        <div id="palabraPrincipal" class="d-flex flex-column ga-lg-2 ga-md-0">
            <h2 class="text-lg-h2 text-md-h4 font-weight-regular">{{ resultados[0]?.palabra }}</h2>
            <h6 class="text-lg-h6 text-md-subtitle-2 text-grey-darken-1 font-weight-medium">Similitud: {{ resultados[0]?.score }}</h6>
        </div>
        <div id="opciones" class="d-flex flex-column ga-lg-4 ga-md-1">
            <h6 class="text-lg-h6 text-md-subtitle-2 text-grey-darken-1">Otras opciones: </h6>
            <v-container id="palabrasRestantes">
                <v-row>
                    <v-col 
                        v-for="resultado in APIStore.palabrasRestantes" 
                        lg="4" 
                        md="6"
                    >
                        <v-chip 
                            color="primary" 
                            variant="elevated" 
                            size="small" 
                            class="d-xl-none"
                        >{{ resultado.palabra }}</v-chip>
                        <v-chip 
                            color="primary" 
                            variant="elevated" 
                            class="d-xl-inline-flex d-lg-none d-md-none d-sm-none d-none"
                        >{{ resultado.palabra }}</v-chip>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
    <div v-else-if="errorBusqueda" class="texto">
        <h5 class="text-lg-h5 text-md-subtitle-2 text-error">
            Lo sentimos, la búsqueda no arrojó ningún resultado:
            <br>
            <br>
            {{ errorBusqueda }}
        </h5>
    </div>
    <div id="instrucciones" class="texto" v-else>
        <h5 class="text-lg-h5 text-md-subtitle-2">
            Selecciona un diccionario y describe con claridad el concepto, como si lo explicaras a alguien que no conoce la palabra. Evita frases sueltas o ejemplos.
        </h5>
    </div>
</template>

<script setup lang="ts">

import { useAPIStore } from '@/stores/APIStore';
import { storeToRefs } from 'pinia';

const APIStore = useAPIStore();

const { fetching, resultados, errorBusqueda } = storeToRefs(APIStore);

</script>

<style>
.texto {
    width: 65%;
    text-align: center;
}

#resultados {
    width: 65%;
    /*display: flex;
    flex-direction: column;
    row-gap: 2rem;*/
}
</style>