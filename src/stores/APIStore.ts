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
    definicion: string
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
        async getResults(diccionario: string, definicion: string) {
            this.resultados = null;

            const request: Request = {
                diccionario,
                definicion
            }

            this.fetching = true;

            try {
                const response: Response = await fetch('https://devsys.iingen.unam.mx/dicinv/api/v1/buscar', {
                    method: "POST",
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }

                });
            
                const data = await response.json();

                if (!data.ok) {
                    this.errorBusqueda = data.error;
                } else {
                    this.resultados = data.resultados
                }

                this.fetching = false;
                
            } catch (error) {
                console.error(error);
            }
        },
        async getDictionaries() {
            try {
                const response: Response = await fetch('https://devsys.iingen.unam.mx/dicinv/api/v1/diccionarios');
            
                const data = await response.json();

                this.diccionarios = data.diccionarios;
                
            } catch (error) {
                console.error(error);   
            }
        }
    }
});