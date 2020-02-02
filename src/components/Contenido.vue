<template>
    <div id="gestorTareas" class="row px-5">
        <input type="text" id="nombreTarea" 
            placeholder="¿Qué quieres recordar?" v-model="nombre" 
            v-on:keyup.enter="crearTarea()" class="col-12 py-3 rounded-lg">
        <div id="controlTareas" class="col-12 py-3 my-3 border-top border-bottom border-secondary">
            <label class="my-0">{{ tareasPendientes }} tareas pendientes de un total de 
                {{ tareasPrioridadBaja.length + tareasPrioridadMedia.length + tareasPrioridadAlta.length }} | </label>
            <button v-on:click="borrarCompletadas()" class="btn btn-sm text-warning">
                &#10005; Borrar tareas completadas</button>
        </div>
        <div id="listaTareas" class="col-12 list-group">
            <div v-for="(tarea, id) in tareasPrioridadAlta" v-bind:key="'alta' + id" class="list-group-item bg-dark border border-secondary">
                <div id="superior">
                    <input type="checkbox" id="tareaCompletada" v-model="tarea.completada" v-on:click="tareaCompletada(tarea)">
                    <label for="#tareaCompletada" class="h2 mb-0 px-3" v-bind:class="{'text-success': tarea.completada}" v-bind:style="{'text-decoration': textoTachado}">{{ tarea.nombre }}</label>
                    <button v-on:click="borrarTarea(id, 'High')" class="float-right btn btn-danger">&#9940;</button>
                </div>
                <div id="inferior">
                    <label>Prioridad: </label>
                    <button v-on:click="cambiarPrioridad(id, 'High', 'Low')" class="btn btn-sm btn-secondary m-1">Low</button>
                    <button v-on:click="cambiarPrioridad(id, 'High', 'Normal')" class="btn btn-sm btn-secondary m-1">Normal</button>
                    <button class="btn btn-sm btn-danger m-1">High</button>
                </div>
            </div>
            <div v-for="(tarea, id) in tareasPrioridadMedia" v-bind:key="'media' + id" class="list-group-item bg-dark border border-secondary">
                <div id="superior">
                    <input type="checkbox" id="tareaCompletada" v-model="tarea.completada" v-on:click="tareaCompletada(tarea)">
                    <label for="#tareaCompletada" class="h2 mb-0 px-3" v-bind:class="{'text-success': tarea.completada}" v-bind:style="{'text-decoration': textoTachado}">{{ tarea.nombre }}</label>
                    <button v-on:click="borrarTarea(id, 'Normal')" class="float-right btn btn-danger">&#9940;</button>
                </div>
                <div id="inferior">
                    <label>Prioridad: </label>
                    <button v-on:click="cambiarPrioridad(id, 'Normal', 'Low')" class="btn btn-sm btn-secondary m-1">Low</button>
                    <button class="btn btn-sm btn-warning text-white m-1">Normal</button>
                    <button v-on:click="cambiarPrioridad(id, 'Normal', 'High')" class="btn btn-sm btn-secondary m-1">High</button>
                </div>
            </div>
            <div v-for="(tarea, id) in tareasPrioridadBaja" v-bind:key="'baja' + id" class="list-group-item bg-dark border border-secondary">
                <div id="superior">
                    <input type="checkbox" id="tareaCompletada" v-model="tarea.completada" v-on:click="tareaCompletada(tarea)">
                    <label for="#tareaCompletada" class="h2 mb-0 px-3" v-bind:class="{'text-success': tarea.completada}" v-bind:style="{'text-decoration': textoTachado}">{{ tarea.nombre }}</label>
                    <button v-on:click="borrarTarea(id, 'Low')" class="float-right btn btn-danger">&#9940;</button>
                </div>
                <div id="inferior">
                    <label>Prioridad: </label>
                    <button class="btn btn-sm btn-success m-1">Low</button>
                    <button v-on:click="cambiarPrioridad(id, 'Low', 'Normal')" class="btn btn-sm btn-secondary m-1">Normal</button>
                    <button v-on:click="cambiarPrioridad(id, 'Low', 'High')" class="btn btn-sm btn-secondary m-1">High</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            nombre: '',
            prioridad: 'Normal',
            completada: false,
            textoTachado: '',
            listaTareas: [], 
            tareasPrioridadBaja: [],
            tareasPrioridadMedia: [],
            tareasPrioridadAlta: []
        }
    }, 
    methods: {
        crearListaTareas: function() {
            if(localStorage['tareasPrioridadBaja'] == undefined)
                localStorage.setItem('tareasPrioridadBaja', JSON.stringify(new Array));
            if(localStorage['tareasPrioridadMedia'] == undefined)
                localStorage.setItem('tareasPrioridadMedia', JSON.stringify(new Array));
            if(localStorage['tareasPrioridadAlta'] == undefined)
                localStorage.setItem('tareasPrioridadAlta', JSON.stringify(new Array));
            this.tareasPrioridadBaja = JSON.parse(localStorage['tareasPrioridadBaja']);
            this.tareasPrioridadMedia = JSON.parse(localStorage['tareasPrioridadMedia']);
            this.tareasPrioridadAlta = JSON.parse(localStorage['tareasPrioridadAlta']);
        }, 
        crearTarea: function() {
            this.tareasPrioridadMedia.push({nombre: this.nombre, prioridad: this.prioridad, completada: this.completada});
            this.nombre = '';
            this.actualizarListasTareas();
        },
        tareaCompletada: function(tarea) {
            tarea.completada = !tarea.completada;    
            this.actualizarListasTareas();
            this.textoTachado = 'line-through';
        },
        borrarTarea: function(idTarea, prioridad) {
            if(prioridad == 'Low')
                this.tareasPrioridadBaja.splice(idTarea, 1);
            else if(prioridad == 'Normal')
                this.tareasPrioridadMedia.splice(idTarea, 1);
            else if(prioridad == 'High')
                this.tareasPrioridadAlta.splice(idTarea, 1);
            this.actualizarListasTareas();
        }, 
        borrarCompletadas: function() {
            this.tareasPrioridadBaja = this.tareasPrioridadBaja.filter(tarea => !tarea.completada);
            this.tareasPrioridadMedia = this.tareasPrioridadMedia.filter(tarea => !tarea.completada);
            this.tareasPrioridadAlta = this.tareasPrioridadAlta.filter(tarea => !tarea.completada);
            this.actualizarListasTareas();
        }, 
        actualizarListasTareas: function() {
            localStorage.setItem('tareasPrioridadBaja', JSON.stringify(this.tareasPrioridadBaja));
            localStorage.setItem('tareasPrioridadMedia', JSON.stringify(this.tareasPrioridadMedia));
            localStorage.setItem('tareasPrioridadAlta', JSON.stringify(this.tareasPrioridadAlta));
            this.listaTareas = JSON.parse(localStorage['tareasPrioridadBaja']);
            this.listaTareas = JSON.parse(localStorage['tareasPrioridadMedia']);
            this.listaTareas = JSON.parse(localStorage['tareasPrioridadAlta']);
        },
        cambiarPrioridad: function(idTarea, prioridadAnterior, prioridadNueva) {
            if(prioridadAnterior == 'Low') {
                this.tareasPrioridadBaja[idTarea].prioridad = prioridadNueva;
                if(prioridadNueva == 'Normal')
                    this.tareasPrioridadMedia.push(this.tareasPrioridadBaja[idTarea]);
                else if(prioridadNueva == 'High')
                    this.tareasPrioridadAlta.push(this.tareasPrioridadBaja[idTarea]);
                this.tareasPrioridadBaja.splice(idTarea, 1);
            } else if(prioridadAnterior == 'Normal') {
                this.tareasPrioridadMedia[idTarea].prioridad = prioridadNueva;
                if(prioridadNueva == 'Low')
                    this.tareasPrioridadBaja.push(this.tareasPrioridadMedia[idTarea]);
                else if(prioridadNueva == 'High')
                    this.tareasPrioridadAlta.push(this.tareasPrioridadMedia[idTarea]);
                this.tareasPrioridadMedia.splice(idTarea, 1);
            } else if(prioridadAnterior == 'High') {
                this.tareasPrioridadAlta[idTarea].prioridad = prioridadNueva;
                if(prioridadNueva == 'Normal')
                    this.tareasPrioridadMedia.push(this.tareasPrioridadAlta[idTarea]);
                else if(prioridadNueva == 'Low')
                    this.tareasPrioridadBaja.push(this.tareasPrioridadAlta[idTarea]);
                this.tareasPrioridadAlta.splice(idTarea, 1);
            }
            this.actualizarListasTareas();
        }
    }, 
    computed: {
        tareasPendientes: function() {
            let cont = 0;
            for(let tarea in this.tareasPrioridadBaja)
                if(!this.tareasPrioridadBaja[tarea].completada)
                    cont++;
            for(let tarea in this.tareasPrioridadMedia)
                if(!this.tareasPrioridadMedia[tarea].completada)
                    cont++;
            for(let tarea in this.tareasPrioridadAlta)
                if(!this.tareasPrioridadAlta[tarea].completada)
                    cont++;
            return cont;
        },
    },
    mounted: function() {
        this.crearListaTareas();
    }
}
</script>
