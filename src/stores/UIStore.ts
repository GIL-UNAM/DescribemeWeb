import { defineStore } from "pinia";

export const useUIStore = defineStore("UIStore", {
    state: () => ({
        errorDialog: false as boolean,
        errorMessage: "" as string,
        pestañaSeleccionada: 1 as number
    })
})