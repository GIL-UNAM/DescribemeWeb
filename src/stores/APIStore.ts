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

type RespuestaBusqueda = {
    ok: boolean,
    diccionario: string,
    definicion: string,
    resultados: Resultado[],
    error: string
}

type RespuestaDiccionarios = {
    ok: boolean,
    diccionarios: Diccionario[],
    error: string
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
        async obtenerResultados(diccionario: string, definicion: string) {
            this.resultados = null;
            this.errorBusqueda = '';

            const request: Request = {
                diccionario,
                definicion
            }

            this.fetching = true;

            try {
                const response: Response = await fetch('https://www.geco.unam.mx/dicinv/buscar', {
                    method: "POST",
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }

                });
            
                const data: RespuestaBusqueda = await response.json();

                if (!data.ok) {
                    this.errorBusqueda = data.error;
                } else {
                    this.resultados = data.resultados

                    if (this.resultados.length === 0) {
                        this.errorBusqueda = "No hubo coincidencias con la descripcíon."
                    }
                }

            } catch (error) {
                console.error(error);
            }

            this.fetching = false;
        },
        async obtenerDiccionarios() {
            try {
                const response: Response = await fetch('https://www.geco.unam.mx/dicinv/diccionarios');
            
                const data: RespuestaDiccionarios = await response.json();

                if (!data.ok) {
                    console.error(data.error);  
                } else {
                    this.diccionarios = data.diccionarios;
                }
            } catch (error) {
                console.error(error);   
            }
        }
    }
});