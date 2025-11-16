import { defineStore } from "pinia";

type Resultado = {
    palabra: string,
    score: number
}

type Diccionario = {
    nombre: string,
    nodos: number,
    aristas: number
}

type Request = {
    diccionario: string,
    descripcion: string
}

export const useAPIStore = defineStore("APIStore", {
    state: () => ({
        diccionarios: [] as Diccionario[],
        resultados: null as Resultado[] | null,
        fetching: false as boolean,
        errorBusqueda: '' as string
    }),
    getters: {
        palabrasRestantes(state) {
            return state.resultados?.slice(1);
        },
        listaDeDiccionarios(state) {
            return state.diccionarios.map(diccionario => diccionario.nombre);
        }
    },
    actions: {
        async getResults(diccionario: string, descripcion: string) {
            this.resultados = null;

            const request: Request = {
                diccionario,
                descripcion
            }

            this.fetching = true;
            /*const response = await fetch('/api/v1/buscar', {
                method: "POST",
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }

            }) 
            this.resultados = response.resultados
            
            if (response.error) {
                this.errorBusqueda = response.error;
            }*/            

            setTimeout(() => {
                if (descripcion == "error") {
                    this.errorBusqueda = "No hubo coincidencias con el término";
                } else {
                    this.resultados = [
                        {palabra: "Araña", score: 0.85},
                        {palabra: "Pulpo", score: 0.78},
                        {palabra: "Calamar", score: 0.75},
                        {palabra: "Arácnido", score: 0.65},
                        {palabra: "Tarántula", score: 0.58},
                        {palabra: "Micróptero", score: 0.55},
                        {palabra: "Crustáceo", score: 0.49},
                        {palabra: "Insecto", score: 0.40},
                        {palabra: "Nautilo", score: 0.37},
                        {palabra: "Calíptero", score: 0.23}, 
                    ]
                }
                this.fetching = false;
            }, 3000);

        },
        async getDictionaries() {
            /*const response = await fetch('/api/v1/diccionarios');
            this.diccionarios = response.diccionarios;

            if (response.error) {
                console.error(response.error)
            }*/

            this.diccionarios = [
                {
                    nombre: 'Diccionario de sexualidad mexicana',
                    nodos: 5000,
                    aristas: 25000 
                },
                {
                    nombre: 'Diccionario de animales',
                    nodos: 5000,
                    aristas: 25000 
                },
                {
                    nombre: 'Diccionario de leyes mexicanas',
                    nodos: 5000,
                    aristas: 25000 
                },
            ]
        }
    }
});