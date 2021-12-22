let v_consulta = "";
let v_opcion="";
let v_estado="";
let v_responsable="";

fechar = () => {
    let f = new Date()
    let fecha_ac = f.toLocaleDateString()
    return fecha_ac
}

Vue.component('form-pqrs', {
    data() {
        return {
            errors:[],
            id: + new Date(), tipo: "", fecha: fechar(), nombre: "", email: "", detalle: "",
            estado: "Sin Asignar", responsable: "", fecha_respuesta: "", respuesta: ""
        }
    },
    template: //html
        `<div>
            <form class="formulario">
            <h1>Registrar PQRS</h1>
            <label>Tipo:<FONT COLOR="red">*</FONT> </label>
            
            <select v-model="tipo" required>
                <option disabled value="">Elija una opcion</option>
                <option value="Petición">Petición</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Sugerencia">Sugerencia</option> 
            </select>

            <label>Fecha: <FONT COLOR="red">*</FONT>     
            <input class="inDat" type="text" disabled v-model="fecha" readonly>
            </label>
            <label>Nombre:
            <input class="inDat" type="text" v-model="nombre">
            </label>
            <label >Email: <FONT COLOR="red">*</FONT>
            <input class="inDat" id="email" v-model="email" type="email" nombre="email">     
            </label>
            <label>Detalle: <FONT COLOR="red">*</FONT></label> 
            <textarea input type="text" v-model="detalle" rows="5" cols="20" placeholder="Aquí va su descripción"></textarea><br>
            <label>&nbsp</label><br>
            <input class="boton" type="button" value="Guardar PQRS" v-on:click="guardarPqrs">
            </form>
        </div> `
    ,

    methods: {
        guardarPqrs() {
             
            if (this.tipo=="" || this.nombre=="" || this.email=="" || this.detalle==""){
                alert("Por favor, ingrese todos los datos solicitados" )
            }else{
                const endpoint = "http://localhost:8080/pqrs";
                const opciones = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: this.id, tipo: this.tipo, fecha: this.fecha,
                        nombre: this.nombre, email: this.email, detalle: this.detalle,
                        estado: this.estado,
                        responsable: this.responsable, fecha_respuesta: this.fecha_respuesta, respuesta: this.respuesta
                    })
                }
                fetch(endpoint, opciones).then(async response => {
                    alert("Su PQRS ha sido radicado con el No " + this.id)
                    this.id = + new Date();
                    this.tipo = "";
                    this.nombre = "";
                    this.email = "";
                    this.detalle = "";
                    this.responsable = "";
                    this.fecha_respuesta = "";
                    this.respuesta = "";
                });
            }
        },
    }
}),// end form-pqrs

Vue.component('inicio', {
    template: //html
        `<div>
        <p>
        Bienvenidos
        <i><b>Serviclient247</b></i>
    </p>
    </div>`
})

Vue.component('listado-pqrs',{
    data(){
        return{
            
            responsable: '',  
            responsableActualizar: '',  
            repuesta: '',
            respuestaActualizar: '',
            formActualizar: false,     
            indice: -1,                   
            datos:[]} 
    },  
    
    mounted: function(){
        this.consultaGenerica('D')
    },

    template: //html
    `<div>
    <h1>Consultar, Asignar y Resolver PQRS</h1><br>
  
    <table class="table">

    
            <thead>
                <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Responsable</th>
                    <th scope="col">Respuesta</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha_respuesta</th>
                    
                </tr>
            </thead>
            <tbody>
        
                <tr v-for="(pqr,index) in datos">
                                
                    <td>{{ pqr.id }}</td>
                    <td>{{ pqr.fecha }}</td>
                    <td>{{ pqr.nombre }}</td>
                    <td>{{ pqr.email }}</td>                    
                    <td>{{ pqr.tipo }}</td> 
                    <td>{{ pqr.detalle }}</td> 
                    
                    <td>
                        <span v-if="formActualizar && indice == index">
                            <select @change="cambiarEstado()" class="form-control" v-model="responsableActualizar">
                                <option value="Mafer" >Mafer</option>
                                <option value="Diego">Diego</option>
                                <option value="Luis">Luis</option> 
                                <option value="Daniel" >Daniel</option>
                                <option value="Giovanny">Giovanny</option>
                            </select>
                        </span>
                        <span v-else>{{ pqr.responsable }}</span>
                   
                        <td>
                            <span v-if="formActualizar && indice == index">
                            <input type="text" @change="cambiarFecharesp()" class="form-control" v-model="respuestaActualizar"  >
                            </span>
                            <span v-else>{{ pqr.respuesta }}</span>
                        </td>
                    </td>

                    <td>{{ pqr.estado }}</td>
                    <td>{{ pqr.fecha_respuesta }}</td>    

                    <td>                        
                        <span v-if="formActualizar && indice == index">
                            <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>
                        </span>
                        <span v-else>
                            <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button> 
                            <button @click="borrarPqr(index)" class="btn btn-danger">Borrar</button>                          
                        </span>
                    </td>
                </tr>
            </tbody>
        </table><br>
        
    </div>`,
    
    methods:{

        verFormActualizar: function (pqr_id) {
            // Antes de mostrar el formulario de actualizar, rellenamos sus campos
            this.indice = pqr_id;
            this.responsableActualizar = this.datos[pqr_id].responsable;
            this.respuesta = this.datos[pqr_id].respuesta;
            this.estado = this.datos[pqr_id].estado;
            // Mostramos el formulario
            this.formActualizar = true;
        },

        guardarActualizacion: function (pqr_id) {
            // Ocultamos nuestro formulario de actualizar
            this.formActualizar = false;
            // Actualizamos los datos
            this.datos[pqr_id].responsable = this.responsableActualizar;
            this.datos[pqr_id].respuesta = this.respuestaActualizar;
            this.datos[pqr_id].estado = this.estado;
            this.datos[pqr_id].fecha_respuesta = this.fecha_respuesta;
            const endpoint="http://localhost:8080/pqrs";
            const opciones={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:this.datos[pqr_id].id,tipo:this.datos[pqr_id].tipo,fecha:this.datos[pqr_id].fecha,
                    nombre:this.datos[pqr_id].nombre,email:this.datos[pqr_id].email,detalle:this.datos[pqr_id].detalle,estado:this.datos[pqr_id].estado,
                    responsable:this.datos[pqr_id].responsable,fecha_respuesta:this.datos[pqr_id].fecha_respuesta,respuesta:this.datos[pqr_id].respuesta
                })                
            }
            fetch (endpoint,opciones).then(async response=>{ 
                alert("El PQRS  "+this.datos[pqr_id].id+"  ha sido actualizado exitosamente")
            })
            this.respuestaActualizar='';    
            this.fecha_respuesta="";
            
        },

        borrarPqr: function (pqr_id){
            const endpoint="http://localhost:8080/pqrs/"+this.datos[pqr_id].id;
            const options={method:'DELETE'}
            fetch(endpoint, options).then(async response=>{
                alert("PQR Eliminado");
                this.datos.splice(pqr_id, 1);
            })
        },

        cambiarEstado(){  
            if (this.responsableActualizar!="") {
               this.estado="Asignado"   
            } 
        },

        cambiarFecharesp(){
            if (this.respuestaActualizar != ""){
                this.fecha_respuesta = fechar();
                this.estado = "Terminado"
            }
        },

        consultaGenerica(v_id){
            if (v_id=="A"){
                v_consulta="bTipo";
                v_opcion=this.tipo ;   
            }
            else if (v_id=="B"){
                v_consulta="bResponsable";
                v_opcion=this.responsable ;   
            }
            else if (v_id=="C"){
                v_consulta="bEstado"
                v_opcion=this.estado ;  
            }
            else if (v_id=="D"){
                v_consulta=""
                v_opcion="";  
            }
            const endpoint="http://localhost:8080/pqrs/"+v_consulta+"/"+v_opcion; 
            const opciones={method:'GET'};
            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json();
            })
        },
    }
}),

Vue.component('tipo', {
    data() {
        return {tipo:"",datos:[]}        
    },
    template: //html
        `<div>
        <select @change="consultaGenerica('A')" class="form-control" v-model="tipo">
            <option disabled value="">Seleccion Tipo PQRS a consultar</option>
            <option value="Petición" >Petición</option>
            <option value="Queja">Queja</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Sugerencia">Sugerencia</option>
        </select><br>
        <label>&nbsp</label><br>
            <table border="1">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Responsable</th>
                        <th>Estado</th>
                        <th>Fecha_respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pqr in datos">
                        <td>{{ pqr.id }}</td>
                        <td>{{ pqr.tipo }}</td>
                        <td>{{ pqr.fecha }}</td>
                        <td>{{ pqr.nombre }}</td>
                        <td>{{ pqr.email }}</td>
                        <td>{{ pqr.responsable }}</td>
                        <td>{{ pqr.estado }}</td>
                        <td>{{ pqr.fecha_respuesta }}</td>
                    </tr>
                </tbody>
            </table> 
        </div>`,

    methods:{
        onchange: function() {
            const endpoint="http://localhost:8080/pqrs/bTipo/"+this.tipo
            const opciones={method:'GET'}
            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json()
            })
        },

        consultaGenerica(v_id){
            if (v_id=="A"){
                v_consulta="bTipo";
                v_opcion=this.tipo ;   
            }
            else if (v_id=="B"){
                v_consulta="bResponsable";
                v_opcion=this.responsable ;   
            }
            
            else if (v_id=="C"){
                v_consulta="bEstado"
                v_opcion=this.estado ;  
            }

            else if (v_id=="D"){
                v_consulta=""
                v_opcion="";  
            }
            
            const endpoint="http://localhost:8080/pqrs/"+v_consulta+"/"+v_opcion; 
            const opciones={method:'GET'};

            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json();
            })
        }
     }
})

Vue.component('estado', {
    
    data(){
        return{
            id:"",
            estado:"",
            responsable: '',  
            responsableActualizar: '',  
            repuesta: '',
            respuestaActualizar: '',
            formActualizar: false,     
            indice: -1,                   
            datos:[]} 
    },


    template: //html
        `<div>  
            <select @change="onchange()" class="form-control" v-model="estado"><br>
                <option disabled value="">Seleccion Estado PQRS a consultar</option>
                <option value="Sin Asignar">Sin Asignar</option>
                <option value="Asignado" >Asignado</option>
                <option value="Terminado">Terminado</option>       
            </select><br>
            <label>&nbsp</label><br>
            <table border="1">
            <thead>
                <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Responsable</th>
                    <th scope="col">Respuesta</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha_respuesta</th>
                </tr>
            </thead>
            <tbody>
        
                <tr v-for="(pqr,index) in datos">
                                
                    <td>{{ pqr.id }}</td>
                    <td>{{ pqr.fecha }}</td>
                    <td>{{ pqr.nombre }}</td>
                    <td>{{ pqr.email }}</td>                    
                    <td>{{ pqr.tipo }}</td> 
                    <td>{{ pqr.detalle }}</td> 
                    
                    <td>
                        <span v-if="formActualizar && indice == index">
                            <select @change="cambiarEstado()" class="form-control" v-model="responsableActualizar">
                                <option value="Mafer" >Mafer</option>
                                <option value="Diego">Diego</option>
                                <option value="Luis">Luis</option> 
                                <option value="Daniel" >Daniel</option>
                                <option value="Giovanny">Giovanny</option>
                            </select>
                        </span>
                        <span v-else>{{ pqr.responsable }}</span>
                   
                        <td>
                            <span v-if="formActualizar && indice == index">
                            <input type="text" @change="cambiarFecharesp()" class="form-control" v-model="respuestaActualizar"  >
                            </span>
                            <span v-else>{{ pqr.respuesta }}</span>
                        </td>
                    </td>

                    <td>{{ pqr.estado }}</td>
                    <td>{{ pqr.fecha_respuesta }}</td>    

                    <td>                        
                        <span v-if="formActualizar && indice == index">
                            <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>
                        </span>
                        <span v-else>
                            <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button> 
                            <button @click="borrarPqr(index)" class="btn btn-danger">Borrar</button>                          
                        </span>
                    </td>
                </tr>
            </tbody>
        </table><br>
        </div>`,
    methods:{
        onchange: function() {
            const endpoint="http://localhost:8080/pqrs/bEstado/"+this.estado
            const opciones={method:'GET'}
            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json()

            })
        },
        verFormActualizar: function (pqr_id) {
            // Antes de mostrar el formulario de actualizar, rellenamos sus campos
            this.indice = pqr_id;
            this.responsableActualizar = this.datos[pqr_id].responsable;
            this.respuesta = this.datos[pqr_id].respuesta;
            this.estado = this.datos[pqr_id].estado;
            // Mostramos el formulario
            this.formActualizar = true;
        },

        guardarActualizacion: function (pqr_id) {
            // Ocultamos nuestro formulario de actualizar
            this.formActualizar = false;
            // Actualizamos los datos
            this.datos[pqr_id].responsable = this.responsableActualizar;
            this.datos[pqr_id].respuesta = this.respuestaActualizar;
            this.datos[pqr_id].estado = this.estado;
            this.datos[pqr_id].fecha_respuesta = this.fecha_respuesta;
            const endpoint="http://localhost:8080/pqrs";
            const opciones={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:this.datos[pqr_id].id,tipo:this.datos[pqr_id].tipo,fecha:this.datos[pqr_id].fecha,
                    nombre:this.datos[pqr_id].nombre,email:this.datos[pqr_id].email,detalle:this.datos[pqr_id].detalle,estado:this.datos[pqr_id].estado,
                    responsable:this.datos[pqr_id].responsable,fecha_respuesta:this.datos[pqr_id].fecha_respuesta,respuesta:this.datos[pqr_id].respuesta
                })                
            }
            fetch (endpoint,opciones).then(async response=>{ 
                alert("El PQRS  "+this.datos[pqr_id].id+"  ha sido actualizado exitosamente")
            })
            this.respuestaActualizar='';    
            this.fecha_respuesta="";
            
        },

        borrarPqr: function (pqr_id){
            const endpoint="http://localhost:8080/pqrs/"+this.datos[pqr_id].id;
            const options={method:'DELETE'}
            fetch(endpoint, options).then(async response=>{
                alert("PQR Eliminado");
                this.datos.splice(pqr_id, 1);
            })
        },

        cambiarEstado(){  
            if (this.responsableActualizar!="") {
               this.estado="Asignado"   
            } 
        },

        cambiarFecharesp(){
            if (this.respuestaActualizar != ""){
                this.fecha_respuesta = fechar();
                this.estado = "Terminado"
            }
        },

        

     }
})

Vue.component('agente', {
    
    data(){
        return{
            
            responsable: '',  
            responsableActualizar: '',  
            repuesta: '',
            respuestaActualizar: '',
            formActualizar: false,     
            indice: -1,                   
            datos:[]} 
    }, 
   
    template: //html
        `<div>   
        
        <select @change="onchange()" class="form-control" v-model="responsable">
            <option disabled value="">Seleccione el Agente a cargo del PQRS</option>
            <option value="Mafer" >Mafer</option>
            <option value="Diego">Diego</option>
            <option value="Luis">Luis</option> 
            <option value="Daniel">Daniel</option>
            <option value="Giovanny">Giovanny</option>    
        </select><br>
        <label>&nbsp</label><br>
        <table border="1">
        <thead>
            <tr>
                <th scope="col">Numero</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Correo</th>
                <th scope="col">Tipo</th>
                <th scope="col">Detalle</th>
                <th scope="col">Responsable</th>
                <th scope="col">Respuesta</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha_respuesta</th>
            </tr>
        </thead>
        <tbody>
    
            <tr v-for="(pqr,index) in datos">
                            
                <td>{{ pqr.id }}</td>
                <td>{{ pqr.fecha }}</td>
                <td>{{ pqr.nombre }}</td>
                <td>{{ pqr.email }}</td>                    
                <td>{{ pqr.tipo }}</td> 
                <td>{{ pqr.detalle }}</td> 
                <td>{{ pqr.responsable }}</td>
                <td>
                    <span v-if="formActualizar && indice == index">
                    <input type="text" @change="cambiarFecharesp()" class="form-control" v-model="respuestaActualizar"  >
                    </span>
                    <span v-else>{{ pqr.respuesta }}</span>
                </td>
                <td>{{ pqr.estado }}</td>
                <td>{{ pqr.fecha_respuesta }}</td>    

                <td>                        
                    <span v-if="formActualizar && indice == index">
                        <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>
                    </span>
                    <span v-else>
                        <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button> 
                    </span>
                </td>
            </tr>
        </tbody>
    </table><br>
        </div>`,
    methods:{
        onchange: function() {
            const endpoint="http://localhost:8080/pqrs/bResponsable/"+this.responsable
            const opciones={method:'GET'}
            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json()
            })
        },
        verFormActualizar: function (pqr_id) {
            // Antes de mostrar el formulario de actualizar, rellenamos sus campos
            this.indice = pqr_id;
            this.responsableActualizar = this.datos[pqr_id].responsable;
            this.respuesta = this.datos[pqr_id].respuesta;
            this.estado = this.datos[pqr_id].estado;
            // Mostramos el formulario
            this.formActualizar = true;
        },

        guardarActualizacion: function (pqr_id) {
            // Ocultamos nuestro formulario de actualizar
            this.formActualizar = false;
            // Actualizamos los datos
            this.datos[pqr_id].responsable = this.responsableActualizar;
            this.datos[pqr_id].respuesta = this.respuestaActualizar;
            this.datos[pqr_id].estado = this.estado;
            this.datos[pqr_id].fecha_respuesta = this.fecha_respuesta;
            const endpoint="http://localhost:8080/pqrs";
            const opciones={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:this.datos[pqr_id].id,tipo:this.datos[pqr_id].tipo,fecha:this.datos[pqr_id].fecha,
                    nombre:this.datos[pqr_id].nombre,email:this.datos[pqr_id].email,detalle:this.datos[pqr_id].detalle,estado:this.datos[pqr_id].estado,
                    responsable:this.datos[pqr_id].responsable,fecha_respuesta:this.datos[pqr_id].fecha_respuesta,respuesta:this.datos[pqr_id].respuesta
                })                
            }
            fetch (endpoint,opciones).then(async response=>{ 
                alert("El PQRS  "+this.datos[pqr_id].id+"  ha sido actualizado exitosamente")
            })
            this.respuestaActualizar='';    
            this.fecha_respuesta="";
            
        },
        cambiarFecharesp(){
            if (this.respuestaActualizar != ""){
                this.fecha_respuesta = fechar();
                this.estado = "Terminado"
            }
        },
     }
})

new Vue({
    el: "#app",
    data() {return {opcion: 0, menu:null}
    } 
})








