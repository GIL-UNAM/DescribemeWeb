<template>
    <v-form ref="controlesBusqueda" id="controles" class="d-flex flex-column ga-sm-2">
        <v-autocomplete 
            variant="solo" 
            label="Selecciona un diccionario" 
            density="comfortable" 
            :items="APIStore.listaDeDiccionarios" 
            :rules="rulesSeleccionarDiccionario" 
            clearable
            v-model="diccionarioSeleccionado"
        ></v-autocomplete>
        <v-textarea 
            variant="solo" 
            label="Ingresa una descripción" 
            density="comfortable"
            :rules="rulesDescripcion" 
            clearable
            v-model="descripcion"
        ></v-textarea>
        <v-btn 
            class="buscar d-xl-flex d-lg-none d-md-none d-sm-none d-none" 
            color="primary" 
            @click="validateForm" 
            rounded
        >Buscar</v-btn>
        <v-btn 
            class="buscar d-none d-sm-none d-md-flex d-xl-none" 
            size="small" 
            color="primary" 
            @click="validateForm" 
            rounded
        >Buscar</v-btn>
        <v-btn 
            class="d-md-none d-lg-none d-xl-none"  
            color="primary" 
            @click="validateForm" 
            style="width: 100%;"
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

onMounted(() => APIStore.getDictionaries());

const diccionarioSeleccionado = ref<null | string>(null);
const descripcion = ref<null | string>(null);

const controlesBusqueda = ref() // typear esto

const rulesSeleccionarDiccionario = ref([
    (value: string) => !!value || "Debes seleccionar un diccionario"
])

const rulesDescripcion = ref([
    (value: string) => (!!value || value == ' ') || "Debes ingresar una descripción"
])

async function validateForm() {
    const { valid } = await controlesBusqueda.value.validate();

    if (valid) {
        pestañaSeleccionada.value = 2
        APIStore.getResults(diccionarioSeleccionado.value as string, descripcion.value as string)
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