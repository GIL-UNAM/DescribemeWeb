<template>
    <v-form ref="controlesBusqueda" id="controles">
        <v-autocomplete variant="solo" label="Selecciona un diccionario" density="comfortable" :items="APIStore.listaDeDiccionarios" :rules="rulesSeleccionarDiccionario" clearable></v-autocomplete>
        <v-textarea variant="solo" label="Ingresa una descripción" density="comfortable":rules="rulesDescripcion" clearable></v-textarea>
        <v-btn class="buscar d-xl-flex d-lg-none d-md-none d-sm-none d-none" color="primary" @click="validateForm" rounded>Buscar</v-btn>
        <v-btn class="buscar d-xl-none" size="small" color="primary" @click="validateForm" rounded>Buscar</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAPIStore } from '@/stores/APIStore';
import { storeToRefs } from 'pinia';

const APIStore = useAPIStore();

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