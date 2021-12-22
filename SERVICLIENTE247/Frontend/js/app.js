let v_consulta = "";
let v_opcion="";
let v_filtro="";

fechar = () => {
    let f = new Date()
    let fecha_ac = f.toLocaleDateString()
    return fecha_ac
}

Vue.component('form-pqrs',{    
    data(){
        return{          
            id: + new Date(),tipo:"",fecha:fechar(),nombre:"",email:"",detalle:"",
            estado:"Sin Asignar",responsable:"",fecha_respuesta:"",respuesta:""  
        }
    },
    template: //html
    `<div>
    <br><br>
    <h1>Registrar PQRS</h1>
    <label>Tipo</label>
    <select v-model="tipo">
        <option value="Petición">Petición</option>
        <option value="Queja">Queja</option>
        <option value="Reclamo">Reclamo</option>
        <option value="Sugerencia">Sugerencia</option> 
    </select> <br>
    <label>Fecha</label>    
    <input type="text" v-model="fecha"><br>
    <label>Nombre</label><input type="text" v-model="nombre"><br>
    <label>Email</label><input type="email" v-model="email"><br>       
    <label>Detalle</label><br>      
    <textarea input type="text" v-model="detalle" rows="3" cols="20"></textarea> <br>
    <input type="button" value="Guardar PQRS" v-on:click="guardarPqrs">
    </div> `
    ,

    methods:{
        guardarPqrs(){
            //Api
            const endpoint="http://localhost:8080/pqrs";
            const opciones={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:this.id,tipo:this.tipo,fecha:this.fecha,
                    nombre:this.nombre,email:this.email,detalle:this.detalle,
                    estado:this.estado,
                    responsable:this.responsable,fecha_respuesta:this.fecha_respuesta,respuesta:this.respuesta
                })                
            }
            fetch (endpoint,opciones).then(async response=>{ 
            alert("Su PQRS ha sido radicado con el No "+this.id)
                    this.id=""; 
                    this.tipo="";                   
                    this.fecha=""; 
                    this.nombre=""; 
                    this.email="";  
                    this.detalle=""; 
                    this.estado="";              
                    this.responsable=""; 
                    this.fecha_respuesta=""; 
                    this.respuesta="";           
            });
        }
    }
}),// end form-pqrs

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

    template: //html
    `<div>
    <h1>Consultar, Asignar y Resolver PQRS</h1><br>
    <input type="button" value="Consulta PQRs" v-on:click="consultaGenerica('D')"><br>    
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

        consultaPqrs(){
            const endpoint="http://localhost:8080/pqrs";
            const opciones={method:'GET'};

            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json();
            })
        },
        
        cambiarEstado(){  
            if (this.responsableActualizar!="") {
               this.estado="A"   
            
            } 
        },

        cambiarFecharesp(){
            if (this.respuestaActualizar != ""){
                this.fecha_respuesta = fechar();
                this.estado = "T"
               
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
}) 




Vue.component('pqrxnumero',{
    data(){return{id:"", datos:[]}},

    template://html
        `<div>
            <h1>PQRS Por número</h1>
            <label>Número de PQR a consultar</label><input type="text" v-model="id"></input>   
            <input type="button" value="Número PQR" v-on:click="consultaPqrsId"><br>
            <label>Fecha</label><input type="datetime-local" v-model="datos.fecha"><br>
            <label>Nombre</label><input type="text" v-model="datos.nombre"><br>
            <label>Email</label><input type="email" v-model="datos.email"><br>    
            <label>Detalle</label><input type="text" v-model="datos.detalle"><br>    
            <label>Estado</label><input type="text" v-model="datos.estado"><br>
            <label>Responsable</label><input type="text" v-model="datos.responsable"><br>
            <label>Fecha_respuesta</label><input type="datetime-local" v-model="datos.fecha_respuesta"><br>
            <label>Respuesta</label><input type="text" v-model="datos.respuesta"><br>
        </div>`,

    methods:{
        consultaPqrsId(){
            const endpoint="http://localhost:8080/pqrs/"+this.id;
            const opciones={method:'GET'};

            fetch (endpoint,opciones).then(async response=>{ 
                this.datos= await response.json();
            })
        }
    }
})

new Vue({
    el:'#app',
    data(){return{menu:0}}
})