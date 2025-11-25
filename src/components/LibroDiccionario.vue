<template>
    <div id="hojas">
        <div id="HojaIzquierda" class="hoja">
            <img src="../assets/DescribeMe_Final.png" width="65%" alt="Logotipo de Desacríbeme"/>
            <ControlesBusqueda />
            <v-img src="../assets/gil.jpg" id="logo_gil" alt="Logotipo del GIL" @click="infoDialog = true" />
            <v-dialog v-model="infoDialog" transition="dialog-bottom-transition" fullscreen>
                <v-card>
                    <v-toolbar color="primary" extended>
                        <v-btn icon="mdi-close" @click="infoDialog = false"></v-btn>

                        <v-toolbar-title text="Información"></v-toolbar-title>

                        <template v-slot:extension>
                            <v-tabs grow v-model="tabs">
                                <v-tab text="¿Qué es un diccionario inverso?" :value="1"></v-tab>
                                <v-tab text="Acerca del GIL" :value="2"></v-tab>
                                <v-tab text="Términos de uso" :value="3"></v-tab>
                                <v-tab text="Cómo citar el diccionario" :value="4"></v-tab>
                                <v-tab text="Agradecimientos" :value="5"></v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-divider></v-divider>

                    <v-tabs-window v-model="tabs" style="overflow-y: auto;">
                        <v-tabs-window-item :value="1">
                            <v-sheet>
                                <DescripcionComponent class="ma-6"></DescripcionComponent>
                            </v-sheet>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="2">
                            <v-sheet>
                                <AcercaDelGIL class="ma-6"></AcercaDelGIL>
                            </v-sheet>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="3">
                            <v-sheet>
                                <TerminosDeUso class="ma-6"></TerminosDeUso>
                            </v-sheet>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="4">
                            <v-sheet>
                                <ComoCitar class="ma-6"></ComoCitar>
                            </v-sheet>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="5">
                            <v-sheet>
                                <AgradecimientosComponent class="ma-6"></AgradecimientosComponent>
                            </v-sheet>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card>
            </v-dialog>
        </div>
        <div id="HojaDerecha" class="hoja">
            <ResultadosBusqueda />
        </div>
        <div id="separador"></div>
        <img src="../assets/Listón.png" alt="liston" id="liston">
    </div>
    <div id="fondo"></div>
</template>
<script setup lang="ts">
import AcercaDelGIL from './AcercaDelGIL.vue';
import ControlesBusqueda from './ControlesBusqueda.vue';
import DescripcionComponent from './DescripcionComponent.vue';
import ResultadosBusqueda from './ResultadosBusqueda.vue';
import { ref } from 'vue';
import TerminosDeUso from './TerminosDeUso.vue';
import ComoCitar from './ComoCitar.vue';
import AgradecimientosComponent from './AgradecimientosComponent.vue';

const infoDialog = ref<boolean>(false);
const tabs = ref<number>(1)

</script>
<style>
#hojas {
    width: 65%;
    height: 85%;
    position: relative;
    display: flex;
    justify-content: center;
}

#fondo {
    background: #FFFFFF66;
    height: 80%;
    width: 68%;
    z-index: 1;
    border-radius: 25px;
    translate: 0 5%;
    position: absolute;
}

.hoja {
    background: white;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#separador {
    width: 1px;
    height: 100%;
    position: absolute;
    background: #00000040;
    z-index: 3;
    box-shadow: 0px 0px 15px 0px;
}

#HojaIzquierda {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    row-gap: 10%;
}

#HojaDerecha {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

#liston {
    position: absolute;
    width: 1.5%;
    height: 8%;
    z-index: 4;
    filter: drop-shadow(2px 4px 1px #0000001A);
    align-self: flex-start;
}

#listaDescripcion {
    width: 95%;
}

/*
#controles {
    width: 65%;
    height: 40%;
    display: flex;
    flex-direction: column;
    row-gap: 10%;
}

#logo_gil {
    width: 10%;
    height: 10%;
}

#logo_describeme {
    width: 65%;
    z-index: 3;
}
*/

/*
#logo_gil {
    position: absolute;
    width: 6%;
    height: 6%;
    top: 85%;
}

#logo_describeme {
    top: 15%;
    position: absolute;
    width: 33%; 
    z-index: 3;
}

#controles {
    position: absolute;
    top: 37%;
    height: 100%;
    width: 33%;
    display: flex;
    flex-direction: column;
    row-gap: 5%;
}
*/

#logo_describeme {
    width: 65%;
}

#logo_gil {
    position: absolute;
    width: 8%;
    height: 8%;
    top: 85%;
    cursor: pointer;
}

/*#opciones {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    justify-content: start;
}*/

</style>