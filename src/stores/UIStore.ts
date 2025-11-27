import { defineStore } from "pinia";

export const useUIStore = defineStore("UIStore", {
    state: () => ({
        dialogoError: false as boolean,
        mensajeError: "" as string,
        pestañaSeleccionada: 1 as number
    })
})