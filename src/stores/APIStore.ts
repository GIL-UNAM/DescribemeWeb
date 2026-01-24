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

            const apiBuscar: string = 'http://www.geco.unam.mx/dicinv/buscar'
            const proxyURL: string = `https://api.allorigins.win/get?url=${encodeURIComponent(apiBuscar)}`

            try {
                const response: Response = await fetch(proxyURL, {
                    method: "POST",
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }

                });

                const data = await response.json()
            
                const finalData: RespuestaBusqueda = JSON.parse(data.contents);

                if (!data.ok) {
                    this.errorBusqueda = finalData.error;
                } else {
                    this.resultados = finalData.resultados;

                    if (this.resultados.length === 0) {
                        this.errorBusqueda = "No hubo coincidencias con la descripcíon.";
                    }
                }

            } catch (error) {
                console.error(error);
            }

            this.fetching = false;
        },
        async obtenerDiccionarios() {
            try {
                const apiDiccionarios: string = 'http://www.geco.unam.mx/dicinv/diccionarios'
                const proxyURL: string = `https://api.allorigins.win/get?url=${encodeURIComponent(apiDiccionarios)}`
                
                const response: Response = await fetch(proxyURL);
            
                const data = await response.json();

                const finalData: RespuestaDiccionarios = JSON.parse(data.contents);

                if (!data.ok) {
                    console.error(finalData.error);  
                } else {
                    this.diccionarios = finalData.diccionarios;
                }
            } catch (error) {
                console.error(error);   
            }
        }
    }
});