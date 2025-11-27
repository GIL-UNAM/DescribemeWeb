<template>
    <v-form id="controles" ref="controlesBusqueda" class="d-flex flex-column ga-sm-2">
        <v-autocomplete
            clearable
            density="comfortable"
            :items="APIStore.listaDeDiccionarios"
            label="Selecciona un diccionario"    
            :rules="rulesSeleccionarDiccionario"
            variant="solo"
            v-model="diccionarioSeleccionado"
        ></v-autocomplete>
        <v-textarea
            clearable
            density="comfortable" 
            label="Ingresa una descripción" 
            :rules="rulesDescripcion"
            variant="solo"
            v-model="descripcion"
        ></v-textarea>
        <v-btn  
            color="primary"  
            rounded
            @click="validarForma"
            class="buscar d-none d-sm-none d-md-none d-lg-none d-xl-flex"
        >Buscar</v-btn>
        <v-btn 
            size="small" 
            color="primary"
            rounded
            @click="validarForma" 
            class="buscar d-none d-sm-none d-md-flex d-xl-none" 
        >Buscar</v-btn>
        <v-btn 
            color="primary" 
            style="width: 100%;"
            @click="validarForma" 
            class="d-md-none d-lg-none d-xl-none"  
        >Buscar</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAPIStore } from '@/stores/APIStore';
import { useUIStore } from '@/stores/UIStore';
import { storeToRefs } from 'pinia';

const APIStore = useAPIStore();
const UIStore = useUIStore();

const { pestañaSeleccionada } = storeToRefs(UIStore);

onMounted(() => APIStore.obtenerDiccionarios());

const diccionarioSeleccionado = ref<null | string>(null);
const descripcion = ref<null | string>(null);

const controlesBusqueda = ref();

const rulesSeleccionarDiccionario = ref([
    (value: string) => !!value || "Debes seleccionar un diccionario"
])

const rulesDescripcion = ref([
    (value: string) => (!!value || value == ' ') || "Debes ingresar una descripción"
])

async function validarForma() {
    const { valid } = await controlesBusqueda.value.validate();

    if (valid) {
        pestañaSeleccionada.value = 2
        APIStore.obtenerResultados(diccionarioSeleccionado.value as string, descripcion.value as string)
    }
}
</script>

<style>
#controles {
    width: 65%;
    display: flex;
    flex-direction: column;
}

.buscar {
    align-self: flex-end;
    z-index: 3;
}
</style>