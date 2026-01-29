import { defineStore } from "pinia";

type Resultado = {
    palabra: string,
    score: number
}

type Diccionario = {
    nombre: string,
    archivo_graphml: string,
    archivo_json: string
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
    data: Diccionario[],
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

            const URLGECOBuscar = 'http://www.geco.unam.mx/dicinv/api/v1/buscar'

            try {
                const response: Response = await fetch('https://devsys.iingen.unam.mx/dicinv/api/v1/buscar', {
                    method: "POST",
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }

                });
            
                const data: RespuestaBusqueda = await response.json();
                
                console.log("Reasultados de búsqueda: ", data);

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
                const response: Response = await fetch(`https://devsys.iingen.unam.mx/dicinv/api/v1/diccionarios`);
            
                const data = await response.json();
                const finalData: RespuestaDiccionarios = JSON.parse(data.contents)

                if (!finalData.ok) {
                    console.error("No se pudieron cargar los diccionarios");  
                } else {
                    this.diccionarios = finalData.data;
                }
            } catch (error) {
                console.error(error);   
            }
        }
    }
});