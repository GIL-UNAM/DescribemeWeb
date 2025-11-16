<template>
    <div id="hojas">
        <div id="HojaIzquierda" class="hoja">
            <img src="../assets/DescribeMe_Final.png" width="65%"/>
            <v-form ref="controlesBusqueda" id="controles">
                <v-autocomplete variant="solo" label="Selecciona un diccionario" density="comfortable" :items="APIStore.listaDeDiccionarios" :rules="rulesSeleccionarDiccionario" clearable></v-autocomplete>
                <v-textarea variant="solo" label="Ingresa una descripción" density="comfortable":rules="rulesDescripcion" clearable></v-textarea>
                <v-btn class="buscar d-xl-flex d-lg-none d-md-none d-sm-none d-none" color="primary" @click="validateForm" rounded>Buscar</v-btn>
                <v-btn class="buscar d-xl-none" size="small" color="primary" @click="validateForm" rounded>Buscar</v-btn>
            </v-form>
            <v-img src="../assets/gil.jpg" id="logo_gil" />
        </div>
        <div id="HojaDerecha" class="hoja">
            <div v-if="fetching">
                <v-progress-circular color="primary" class="d-lg-flex d-md-none d-sm-none d-none" indeterminate size="50"></v-progress-circular>
                <v-progress-circular class="d-lg-none" color="primary" indeterminate size="40"></v-progress-circular>
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
                            <v-col v-for="resultado in APIStore.palabrasRestantes" lg="4" md="6">
                                <v-chip color="primary" variant="elevated" size="small" class="d-xl-none">{{ resultado.palabra }}</v-chip>
                                <v-chip color="primary" variant="elevated" class="d-xl-inline-flex d-lg-none d-md-none d-sm-none d-none">{{ resultado.palabra }}</v-chip>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </div>
            <div id="instrucciones" v-else>
                <h5 class="text-lg-h5 text-md-subtitle-2">Selecciona un diccionario y describe con claridad el concepto, como si lo explicaras a alguien que no conoce la palabra. Evita frases sueltas o ejemplos.</h5>
            </div>
        </div>
        <div id="separador"></div>
        <img src="../assets/Listón.png" alt="liston" id="liston">
    </div>
    <div id="fondo"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAPIStore } from '@/stores/APIStore';
import { storeToRefs } from 'pinia';
import { useUIStore } from '@/stores/UIStore';

const APIStore = useAPIStore();
const UIStore = useUIStore();

const { resultados, fetching } = storeToRefs(APIStore);

APIStore.getDictionaries();

const diccionarioSeleccionado = ref<null | string>(null);
const descripcion = ref<null | string>(null);

const controlesBusqueda = ref()

const rulesSeleccionarDiccionario = ref([
    (value: string) => !!value || "Debes seleccionar un diccionario"
])

const rulesDescripcion = ref([
    (value: string) => (!!value || value == ' ') || "Debes ingresar una descripción"
])

async function validateForm() {
    const { valid } = await controlesBusqueda.value.validate();

    if (valid) {
        APIStore.getResults(diccionarioSeleccionado.value as string, descripcion.value as string)
    }
}

</script>
<style>
#hojas {
    width: 65%;
    height: 85%;
    position: relative;
    display: flex;
    justify-content: center;
}

#fondo {
    background: #FFFFFF66;
    height: 80%;
    width: 68%;
    z-index: 1;
    border-radius: 25px;
    translate: 0 5%;
    position: absolute;
}

.hoja {
    background: white;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#separador {
    width: 1px;
    height: 100%;
    position: absolute;
    background: #00000040;
    z-index: 3;
    box-shadow: 0px 0px 15px 0px;
}

#HojaIzquierda {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    row-gap: 10%;
}

#HojaDerecha {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

#liston {
    position: absolute;
    width: 1.5%;
    height: 8%;
    z-index: 4;
    filter: drop-shadow(2px 4px 1px #0000001A);
    align-self: flex-start;
}

/*
#controles {
    width: 65%;
    height: 40%;
    display: flex;
    flex-direction: column;
    row-gap: 10%;
}

#logo_gil {
    width: 10%;
    height: 10%;
}

#logo_describeme {
    width: 65%;
    z-index: 3;
}
*/

/*
#logo_gil {
    position: absolute;
    width: 6%;
    height: 6%;
    top: 85%;
}

#logo_describeme {
    top: 15%;
    position: absolute;
    width: 33%; 
    z-index: 3;
}

#controles {
    position: absolute;
    top: 37%;
    height: 100%;
    width: 33%;
    display: flex;
    flex-direction: column;
    row-gap: 5%;
}
*/

#controles {
    width: 65%;
    display: flex;
    flex-direction: column;
}


#logo_describeme {
    width: 65%;
}

#logo_gil {
    position: absolute;
    width: 8%;
    height: 8%;
    top: 85%;
}

.inputs {
    border-radius: 0px;
}

.buscar {
    align-self: flex-end;
    z-index: 3;
}

#instrucciones {
    width: 65%;
    text-align: center;
}

#resultados {
    width: 65%;
    /*display: flex;
    flex-direction: column;
    row-gap: 2rem;*/
}

/*#opciones {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    justify-content: start;
}*/

</style>