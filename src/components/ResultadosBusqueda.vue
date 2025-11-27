<template>
    <div v-if="fetching && !resultados" class="progress">
        <v-progress-circular 
            color="primary"  
            indeterminate 
            size="50"
            class="d-none d-sm-none d-md-none d-lg-flex"
        ></v-progress-circular>
        <v-progress-circular 
            color="primary" 
            indeterminate 
            size="40"
            class="d-lg-none" 
        ></v-progress-circular>
    </div>
    <div v-else-if="resultados" id="resultados" class="d-flex flex-column ga-10 ga-md-4 ga-lg-8">
        <div class="d-flex flex-column ga-2 ga-md-0 ga-lg-2">
            <h2 class="text-h3 text-md-h4 text-lg-h2 font-weight-regular">{{ palabraCapitalizada }}</h2>
            <h6 class="text-subtitle-1 text-sm-h6 text-md-subtitle-2 text-lg-h6 text-grey-darken-1 font-weight-medium">Concordancia: {{ Number(resultados[0]!.score.toFixed(2)) * 100 }}%</h6>
        </div>
        <div id="opciones" class="d-flex flex-column ga-4 ga-md-1 ga-lg-4">
            <h6 class="text-h6 text-md-subtitle-2 text-lg-h6 text-grey-darken-1 font-weight-medium">Otras opciones: </h6>
            <v-container>
                <v-row>
                    <v-col 
                        v-for="resultado in APIStore.palabrasRestantes"
                        cols="4"
                        sm="3"
                        md="6"
                        lg="4" 
                    >
                        <v-chip 
                            color="primary"  
                            size="small"
                            variant="elevated"
                            class="d-xl-none d-sm-none d-md-inline-flex"
                        >{{ resultado.palabra.charAt(0).toUpperCase() + resultado.palabra.slice(1) }}</v-chip>
                        <v-chip 
                            color="primary" 
                            variant="elevated" 
                            class="d-none d-sm-inline-flex d-md-none d-lg-none d-xl-inline-flex"
                        >{{ resultado.palabra.charAt(0).toUpperCase() + resultado.palabra.slice(1) }}</v-chip>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
    <div v-else-if="errorBusqueda" id="error-div">
        <h5 class="text-h6 text-sm-h6 text-md-subtitle-2 text-lg-h5 text-error">
            Lo sentimos, la búsqueda no arrojó ningún resultado:
            <br>
            <br>
            {{ errorBusqueda }}
        </h5>
    </div>
    <div id="instrucciones" v-else>
        <h5 class="d-none d-sm-none d-md-flex text-md-subtitle-2 text-lg-h5 texto-desktop">
            Selecciona un diccionario y describe con claridad el concepto, como si lo explicaras a alguien que no conoce la palabra. Evita frases sueltas o ejemplos.
        </h5>
        <h3 class="d-md-none d-lg-none d-xl-none text-md-subtitle-2 text-lg-h5 texto-mobile">
            En la pestaña "Buscar", selecciona un diccionario y describe con claridad el concepto, como si lo explicaras a alguien que no conoce la palabra. Evita frases sueltas o ejemplos.
        </h3>
    </div>
</template>

<script setup lang="ts">

import { useAPIStore } from '@/stores/APIStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const APIStore = useAPIStore();

const { fetching, resultados, errorBusqueda } = storeToRefs(APIStore);

const palabraCapitalizada = computed(() => {
    if (resultados.value) {
        const palabra = resultados.value[0]?.palabra;

        if (!palabra) return "";

        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    } else {
        return "";
    }
});

</script>

<style>
.progress {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#resultados {
    width: 65%;
}

#error-div {
    width: 65%;
    text-align: center;
}

#instrucciones {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.texto-desktop {
    width: 65%;
    text-align: center;
}

.texto-mobile {
    width: 85%;
    text-align: center;
}
</style>