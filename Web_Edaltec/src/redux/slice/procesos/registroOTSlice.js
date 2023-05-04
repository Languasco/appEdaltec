import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { registroOTServices } from "../../../services/procesos/registroOTServices";
import { flagEdicion } from "../flagEdicionSlice";
import { modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";
import { spinnerClose, spinnerOpen } from "../spinnerSlice";

import { jsPDF } from "jspdf";
import  logoEdaltec from '../../../assets/images/logoEdaltec.png';
import  logoCobra from '../../../assets/images/logoCobra.png';
import  logoDominion from '../../../assets/images/logoDominion.png';
import  logoLari from '../../../assets/images/logoLari.png'; 

const { createSlice } = require("@reduxjs/toolkit"); 

const formParamsTab1Initial = {
    id_Empresa : '0',
    Concatenado: '',
    fechaElectrica : new Date(),

    id_OrdenTrabajo : '0',
    id_Servicio : '0',
    fechaCorreo_OrdenTrabajo : null,
    extension : '',
    fechaElectrica_OrdenTrabajo : null,
    fechaAsignada_OrdenTrabajo : null,

    id_TipoTrabajo : '0',
    numero_OrdenTrabajo : '',
    nroCliente_OrdenTrabajo : '',
    id_Distrito : '0',
    direccion_OrdenTrabajo : '',
    nroSED : '',

    cliente_OrdenTrabajo : '0',
    cxr_OrdenTrabajo : '',
    fechaProgramada_OrdenTrabajo : null,
    id_Supervisor : '0',
    id_Supervisor2 : '0',
    fechaAsigndaCampo_OrdenTrabajo : null,

    supervisorContratista : '',
    cantDesm : '',
    fechaElimDes_OrdenTrabajo : null,

    fechaEjecutado_OrdenTrabajo : null,
    
    personal_OrdenTrabajo : '',
    cemento_OrdenTrabajo : '',
    logistica_OrdenTrabajo : '',
    tiempoGrabEfect_OrdenTrabajo : '',
    tiempoGrabDesest_OrdenTrabajo : '',

    unidad_OrdenTrabajo : '',
    gastoGenerales_OrdenTrabajo : '',
    salida_OrdenTrabajo : '',
    llegada_OrdenTrabajo : '',
    km_OrdenTrabajo : '',
    id_Estado : '016',
    usuario_creacion : '00',    
}

const formParamsOcurrenciaInicial = {
    idOcurrencia: '0',
    ocurrencia : '', 
}

const formParamsMetradosInicial = {
    id_OrdenTrabajo_Metrado: '0',
    idTipoReparacion: '0',
    largo : '', 
    ancho : '', 
    espesor : '', 
}

const flagFiles = { tipoCarga : 0, estaCompletadoCarga: false }

const initialState = {
    id_OrdenTrabajo_Global : '0',
    clientes : [],
    tipoTrabajos : [],
    tipoTrabajosModal : [],
    inspeccionados : [],
    areas : [],
    distritos : [],
    supervisores : [],
    tiposReparacion : [],
    estados : [],
    ots_cab : [],
    ocurrencias: [],
    tiposReparacionesMontos: [],
    tiposReparacionesMultiple: [],
    formParamsTab1 : formParamsTab1Initial,
    formParamsOcurrencia : formParamsOcurrenciaInicial,
    flag_terminoCargaArchivos : flagFiles,
    archivosEvidencias: [],
    formParamsMetrados : formParamsMetradosInicial,
    metrados : [],
    fotosTab4: [],
    isProcessFinished : false
 }
 

const registroOTSlice = createSlice({ 
    name : 'proceso_registroOT',
    initialState,
    reducers : {

        refrescandoEstadoFotosTab4(state, action){   
            return {
                ...state,
                fotosTab4 : state.fotosTab4.filter(item => item.id_OrdenTrabajo_Foto !== action.payload)
            } 
        },
        listFotosTab4(state, action){  
            return {
                ...state,
                fotosTab4 :  action.payload  
            }  
        },
        refrescandoEstadoMetrados(state, action){  
            return {
                ...state,
                metrados :  state.metrados.map(metrado =>{
                    return {...metrado, id_Estado : (metrado.id_OrdenTrabajo_Metrado === action.payload )? 0: metrado.id_Estado   }             
                })  
            } 
        },
        listMetrados(state, action){  
            return {
                ...state,
                metrados :  action.payload  
            } 
        },        
        refrescandoEstadoArchivoCargadoEvidencia(state, action){   
            return {
                ...state,
                archivosEvidencias :  state.archivosEvidencias.map(evidencia =>{
                    return {...evidencia, id_estado : (evidencia.id_OrdenTrabajo_Archivos === action.payload )? 0: evidencia.id_estado   }             
                })  
            }
        }, 
        listArchivosCargadosEvidencias(state, action){  
            return {
                ...state,
                archivosEvidencias :  action.payload  
            } 
        },
        flagTerminoCargaArchivo(state, action){   
            return {
                ...state,
                flag_terminoCargaArchivos :  action.payload  
            } 
        },
        set_tiposReparacionesMultiple(state, action){   
            return {
                ...state,
                tiposReparacionesMultiple :   action.payload  
            } 
        },

        listTiposReparacionMultipleOT(state, action){  
            return {
                ...state,
                tiposReparacionesMultiple : action.payload
            }   
        },
        listTiposReparacionMontos(state, action){  
            return {
                ...state,
                tiposReparacionesMontos : action.payload
            }   
        },       
        listOcurrencias(state, action){   
            return {
                ...state,
                ocurrencias : action.payload
            }  
        },       
        getAreas(state, action){ 
            return {
                ...state,
                areas : action.payload
            } 
        },
        getDistrito(state, action){  
            return {
                ...state,
                distritos : action.payload
            }        
       },


       getSupervisores(state, action){  
            return {
                ...state,
                supervisores : action.payload
            }         
        },
        getTiposReparacion(state, action){ 
            return {
                ...state,
                tiposReparacion : action.payload
            }               
        },    
        getEstados(state, action){ 
            return {
                ...state,
                estados : action.payload
            }   
        },

        listClientes(state, action){ 
                return {
                    ...state,
                    clientes : action.payload
                }     
        },         


        listTipoTrabajos(state, action){ 
            return {
                ...state,
                tipoTrabajos : action.payload
            } 
        },
        listTipoTrabajosModal(state, action){ 
          return {
              ...state,
              tipoTrabajosModal : action.payload
          } 
        },

        listInspeccionados(state, action){ 
            return {
                ...state,
                inspeccionados : action.payload
            }        
        },    
        listRegistrosOTS(state, action){ 
         return {
             ...state,
             ots_cab : action.payload
         }        
        },    
        Actualizar_formParamsTab1(state, action){  
         return {
             ...state,
             formParamsTab1 : action.payload
         }      
        },


        inicializarTabs(state, action){  
         return {
             ...state,
             id_OrdenTrabajo_Global : 0,
             ocurrencias: [],
             tiposReparacionesMontos: [],
             tiposReparacionesMultiple: [],
             formParamsTab1 : formParamsTab1Initial,
             formParamsOcurrencia : formParamsOcurrenciaInicial,             
             flag_terminoCargaArchivos : flagFiles,
             archivosEvidencias: [],
             formParamsMetrados : formParamsMetradosInicial,
             metrados: [],
             fotosTab4:[]
         }           
        },
        set_idOrdenTrabajo_Global(state, action){  
         return {
             ...state,
             id_OrdenTrabajo_Global : action.payload,
         }        
        },         
        set_formParamsOcurrenciaInicial(state, action){  
         return {
             ...state,
             formParamsOcurrencia : action.payload
         }          
        },
        set_formParamsMetrados(state, action){  
         return {
             ...state,
             formParamsMetrados : action.payload
         }
        }  
    }
})

export const getCargarCombos = ()=>{
    return  async(dispatch)=>{ 
      try { 
           Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([registroOTServices().getClientes(), registroOTServices().getTiposTrabajo(),registroOTServices().getInspeccionados() , registroOTServices().getAreas(), registroOTServices().getDistrito() , registroOTServices().getSupervisores() , registroOTServices().getTiposReparacion() , registroOTServices().getEstados() 
                    ])
            .then(([ _clientes, _tiposTrabajos ,_inspeccionados, _areas, _distritos, _supervisores, _tipoReparaciones, _estados ])  => {
            Swal.close();    
  
            if (_clientes.ok) {
              dispatch(listClientes(_clientes.data))
            }else{
              alert(JSON.stringify(_clientes.data));
            } 
            if (_tiposTrabajos.ok) {
              let tipostrabajoss = [ {id:0 , descripcion:'[-- TODOS --]'} ,  ..._tiposTrabajos.data];   
              let tipostrabajosss = [ {id:0 , descripcion:'[ SELEC ]'} ,  ..._tiposTrabajos.data];  

              dispatch( listTipoTrabajos (tipostrabajoss))
              dispatch( listTipoTrabajosModal (tipostrabajosss))

            }else{
              alert(JSON.stringify(_tiposTrabajos.data));
            }
            if (_inspeccionados.ok) {
         
              let inspeccionadoss = [ {id: '0' , descripcion:'[-- TODOS --]'} ,  ..._inspeccionados.data];   
              dispatch( listInspeccionados(inspeccionadoss))
            }else{
              alert(JSON.stringify(_inspeccionados.data));
            }
  
            if (_areas.ok) {
              dispatch( getAreas(_areas.data))
            }else{
              alert(JSON.stringify(_areas.data));
            }
  
            if (_distritos.ok) {
              let distritoss = [ {id:0 , descripcion:'[--SELECCIONE--]'} ,  ..._distritos.data];   
              dispatch( getDistrito(distritoss))
            }else{
              alert(JSON.stringify(_distritos.data));
            }
  
            if (_supervisores.ok) {
              let supervidores = [ {id:0 , descripcion:'[--SELECCIONE--]'} ,  ..._supervisores.data];   
              dispatch( getSupervisores(supervidores))
            }else{
              alert(JSON.stringify(_supervisores.data));
            }
  
            if (_tipoReparaciones.ok) {
              let tiposReparaciones = [{id:0 , descripcion:'[--SELECCIONE--]' },  ..._tipoReparaciones.data];     
              dispatch( getTiposReparacion(tiposReparaciones))
            }else{
              alert(JSON.stringify(_tipoReparaciones.data));
            }
  
            if (_estados.ok) {
              dispatch( getEstados(_estados.data))
            }else{
              alert(JSON.stringify(_estados.data));
            }          
   
          }).catch(reason => {
            Swal.close();
            alert(JSON.stringify(reason));
          });  
  
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
   
  export const mostrarInformacion =( idCliente, nroOT, tipoTrabajo, inspeccionado, fechaelectrica, fechaEjecucion )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const res = await registroOTServices().getMostrarInformacion(idCliente, nroOT, tipoTrabajo, inspeccionado, fechaelectrica, fechaEjecucion);
          Swal.close();      
          if (res.ok) { 
  
            const ots = res.data.map((ot)=>{
              return { ...ot, id : ot.id_OT  }
            })
            dispatch( listRegistrosOTS( ots));
            dispatch( refrescarDatoPrincipal(false));
          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const validacionesCargaInicialTab1 = (objMantenimiento, tiposReparacionesMultiple)=>{
  
    const {  id_Servicio,  id_TipoTrabajo,  numero_OrdenTrabajo, nroCliente_OrdenTrabajo, id_Distrito, cliente_OrdenTrabajo, id_Supervisor, id_Supervisor2, id_Estado  } = objMantenimiento;
   
    if (id_Servicio === '0' || id_Servicio === 0   ){
      Swal_alert('error','Por favor seleccione un Servicio.');
      return false;
    }
  
    // if (fechaCorreo_OrdenTrabajo === '' || fechaCorreo_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor seleccione la Fecha de Correo.');
    //   return false;
    // }
    // if (fechaElectrica_OrdenTrabajo === '' || fechaElectrica_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor seleccione la Fecha Electrica.');
    //   return false;
    // }
    // if (fechaAsignada_OrdenTrabajo === '' || fechaAsignada_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor seleccione la Fecha Asignada.');
    //   return false;
    // }
    if (id_TipoTrabajo === '0' || id_TipoTrabajo === 0 ){
      Swal_alert('error','Por favor seleccione el Tipo de Trabajo.');
      return false;
    }
    if (numero_OrdenTrabajo === '' || numero_OrdenTrabajo === null ){
      Swal_alert('error','Por favor ingrese el numero de Orden.');
      return false;
    }
    if (nroCliente_OrdenTrabajo === '' || nroCliente_OrdenTrabajo === null ){
      Swal_alert('error','Por favor ingrese el numero de Cliente.');
      return false;
    }
    if (id_Distrito === '0' || id_Distrito === 0   ){
      Swal_alert('error','Por favor seleccione un Distrito.');
      return false;
    }
    if (cliente_OrdenTrabajo === '0' || cliente_OrdenTrabajo === 0   ){
      Swal_alert('error','Por favor seleccione Cliente.');
      return false;
    }
    // if (fechaProgramada_OrdenTrabajo === '' || fechaProgramada_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor ingrese la fecha Programada.');
    //   return false;
    // }
    if (id_Supervisor === '0' || id_Supervisor === 0   ){
      Swal_alert('error','Por favor seleccione un Supervisor.');
      return false;
    }
    if (id_Supervisor2 === '0' || id_Supervisor2 === 0   ){
      Swal_alert('error','Por favor seleccione un Supervisor.');
      return false;
    }
    // if (fechaAsigndaCampo_OrdenTrabajo === '' || fechaAsigndaCampo_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor ingrese la fecha Programada.');
    //   return false;
    // }
 
    // if (fechaElimDes_OrdenTrabajo === '' || fechaElimDes_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor ingrese la fecha Elimin.');
    //   return false;
    // }
  
    if(tiposReparacionesMultiple.length ===0 ){
      Swal_alert('error','Por favor seleccione al Menos un tipo de Reparacion.');
      return false;
    }  
  
    // if (fechaEjecutado_OrdenTrabajo === '' || fechaEjecutado_OrdenTrabajo === null ){
    //   Swal_alert('error','Por favor ingrese la fecha Ejecutado.');
    //   return false;
    // }
    if (id_Estado === '0' || id_Estado === 0   ){
      Swal_alert('error','Por favor seleccione un Estado.');
      return false;
    }
    return true
  }
  
  export const validacionesMetrados = ({idTipoReparacion, largo,  ancho,espesor })=>{
    if (idTipoReparacion === '0') {
        Swal_alert('error','Por favor seleccione un Tipo de Reparacion');
        return false;
    }
    if (largo === '0' || largo === '') {
        Swal_alert('error','Por favor ingrese el Largo');
        return false;
    }
    if (ancho === '0' || ancho === '') {
        Swal_alert('error','Por favor ingrese el Ancho');
        return false ;
    }
    if (espesor === '0' || espesor === '' || espesor === '.' ) {
        Swal_alert('error','Por favor ingrese el Espesor');
        return false;
    }
  }
  
  export const saveCargaInicial_Tab1 =(objMantenimiento,tiposReparacionesMultiple )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await registroOTServices().save_cargaInicialTab_1(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se Registro la OT correctamente');
            
            dispatch(set_idOrdenTrabajo_Global(res.data));
            dispatch(flagEdicion(true));
            setTimeout(()=>{ //  
              dispatch(save_update_tiposReparacionMultiple(res.data,tiposReparacionesMultiple));
              dispatch(refrescarDatoPrincipal(true));
            },700); 
          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const nuevoRegistroOrdenTrabajo =(idOt)=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('Registro de Orden de Trabajo..'));
          dispatch(inicializarTabs());
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
  
  export const editarRegistroOrdenTrabajo =(idOt)=>{
    return  async(dispatch)=>{ 
      try { 
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([registroOTServices().get_editCargaInicial(idOt), registroOTServices().get_mostrarArchivosCargadosEvidencias(idOt), 
                      registroOTServices().get_mostrarMetrados(idOt) , registroOTServices().get_mostrarTiposReparacionMontos(idOt), 
                      registroOTServices().get_mostrarFotosTab4(idOt) , registroOTServices().get_mostrarOcurrencias(idOt)  ])
            .then(([ _cargaInicial, _archivosEvidencias, _metrados, _tiposReparacionMontos, _fotosTab4, _ocurrencias ])  => {
            Swal.close();    
   
            if (_cargaInicial.ok) {        
  
               dispatch(set_idOrdenTrabajo_Global(_cargaInicial.data[0].id_OrdenTrabajo ));
               dispatch(Actualizar_formParamsTab1(_cargaInicial.data[0]));
               dispatch(mostrarTiposReparacionMultipleOT(_cargaInicial.data[0].id_OrdenTrabajo)); 
   
               dispatch(flagEdicion(true));
               dispatch(modalOpen());
               dispatch(modalTitle('Edicion Registro de Orden de Trabajo.'));
  
            }else{
              alert(JSON.stringify(_cargaInicial.data));
            }           
            if (_archivosEvidencias.ok) {
              dispatch(listArchivosCargadosEvidencias(_archivosEvidencias.data));   
            }else{
              alert(JSON.stringify(_archivosEvidencias.data));
            }
            if (_metrados.ok) {
              dispatch(listMetrados(_metrados.data));   
            }else{
              alert(JSON.stringify(_metrados.data));
            }
            if (_tiposReparacionMontos.ok) {
              dispatch(listTiposReparacionMontos(_tiposReparacionMontos.data));   
            }else{
              alert(JSON.stringify(_tiposReparacionMontos.data));
            }     
            
            if (_fotosTab4.ok) {
              dispatch(listFotosTab4(_fotosTab4.data));   
            }else{
              alert(JSON.stringify(_fotosTab4.data));
            }
            if (_ocurrencias.ok) {
              dispatch(listOcurrencias(_ocurrencias.data));   
            }else{
              alert(JSON.stringify(_ocurrencias.data));
            }      
          }).catch(reason => {
            Swal.close();
            alert(JSON.stringify(reason));
          });  
  
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
  
  export const update_CargaInicial_Tab1 =(idOt, objMantenimiento, tiposReparacionesMultiple)=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const {data : res}  = await registroOTServices().update_cargaInicialTab_1(idOt, objMantenimiento);
          dispatch(spinnerClose());
          if (res.ok) {
            setTimeout(()=>{ //  
              dispatch(save_update_tiposReparacionMultiple(idOt,tiposReparacionesMultiple));
              dispatch(refrescarDatoPrincipal(true));
           },700); 
            Swal_alert('success','Se Actualizo la OT correctamente');
  
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
         dispatch(spinnerClose());
         alert(JSON.stringify(error)); 
      } 
    }
  }
  
  export const save_update_tiposReparacionMultiple =(idOt, tiposReparacion)=>{
    return  async(dispatch)=>{ 
      try {
  
         let tiposReparacionMultiple = [];
         for (const item of tiposReparacion) {
           tiposReparacionMultiple.push(item.id);
         }
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await registroOTServices().save_update_tiposReparacionMultiple(idOt, tiposReparacionMultiple.join());
          Swal.close();
          if (res.ok) {
  
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
         Swal.close();
         alert(JSON.stringify(error)); 
      } 
    }
  }
  
  export const mostrarOcurrencias =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarOcurrencias(idOt);
          dispatch(spinnerClose());    
          if (res.ok) { 
             dispatch(listOcurrencias(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const agregar_ocurrencia =(idOt, idOcurrencia, ocurrencia, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await registroOTServices().set_guardarOcurrencia(idOt, idOcurrencia, ocurrencia, id_usuario);
          Swal.close();
          if (res.ok) { 
            if (idOcurrencia === '0' ) {
              Swal_alert('success','Se agregó correctamente');
            }else {
              Swal_alert('success','Se Actualizo correctamente');
            }
             ///---limpiando -----
            dispatch(set_formParamsOcurrenciaInicial({ idOcurrencia : '0' , ocurrencia : ''}));
  
            setTimeout(()=>{ //  
               dispatch(mostrarOcurrencias(idOt));
            },500); 
  
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
         Swal.close();
         alert(JSON.stringify(error)); 
      } 
    }
  }
  
  export const mostrarTiposReparacionMontos =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarTiposReparacionMontos(idOt);
          dispatch(spinnerClose());    
          if (res.ok) { 
             dispatch(listTiposReparacionMontos(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const mostrarTiposReparacionMultipleOT =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarTiposReparacionMultipleOT(idOt);
          dispatch(spinnerClose());   
          if (res.ok) { 
             dispatch(listTiposReparacionMultipleOT(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const descargarOcurrencias =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_descargarOcurrencias(idOt);
          dispatch(spinnerClose());   
          if (res.ok) { 
            window.open(res.data) 
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
 
  export const subirArchivoEvidencias =( files, idOt, idUsuario, tipoCarga )=>{
    return  async(dispatch)=>{ 
  
      const cantFiles = files.length;
  
      dispatch(spinnerOpen());
      const ejecutarEnvioArchivo= async(index)=>{
  
        if(index === cantFiles ){
          dispatch(spinnerClose());  
          dispatch(flagTerminoCargaArchivo({ tipoCarga : tipoCarga, estaCompletadoCarga: true }));  
          Swal_alert('success','archivos, cargado correctamente');
          dispatch(mostrarArchivosCargadosEvidencias(idOt)) 
          return true ;
        }
        try {
             const res = await registroOTServices().upload_fileEvidencias( files[index].file,  idOt, idUsuario, tipoCarga);
             if (res.ok) { 
               ejecutarEnvioArchivo((index+1)); 
             }else{
               alert('Error en la carga del archivo ' + files[index].name + ' '  + JSON.stringify(res.data)); 
               ejecutarEnvioArchivo((index+1)); 
             } 
       } catch (error) {
         alert('Error en la carga del archivo ' + files[index].name + ' '  + JSON.stringify(error)); 
         ejecutarEnvioArchivo((index+1)); 
       } 
      }
      ejecutarEnvioArchivo(0);
    }
  }
    
  export const mostrarArchivosCargadosEvidencias =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarArchivosCargadosEvidencias(idOt);
          dispatch(spinnerClose());    
          if (res.ok) { 
             dispatch(listArchivosCargadosEvidencias(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const anularArchivosCargadoEvidencia =( id_OrdenTrabajo_Archivos, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().set_anularArchivosCargadoEvidencia(id_OrdenTrabajo_Archivos, id_usuario);
          dispatch(spinnerClose());    
          if (res.ok) { 
            Swal_alert('success','Se anulo correctamente.');
            dispatch(refrescandoEstadoArchivoCargadoEvidencia(id_OrdenTrabajo_Archivos));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const agregarMetrados =(idOt, formParamsMetrados , id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await registroOTServices().set_guardarActualizarMetrados(idOt, formParamsMetrados, id_usuario);
          Swal.close();
          
          if (res.ok) { 
            if (formParamsMetrados.id_OrdenTrabajo_Metrado  === '0' ) {
              Swal_alert('success','Se agregó correctamente');
            }else {
              Swal_alert('success','Se Actualizo correctamente');
            }
            //  ///---limpiando -----
            dispatch(set_formParamsMetrados({
              id_OrdenTrabajo_Metrado : '0' , idTipoReparacion: formParamsMetrados.idTipoReparacion , largo : '', ancho : '', espesor : '', 
            }))
             //// actualizando tipos Reparacion montos
            dispatch(mostrarTiposReparacionMontos(idOt));
  
            setTimeout(()=>{ //  
               dispatch(mostrarMetrados(idOt));
            },500); 
  
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
         Swal.close();
         alert(JSON.stringify(error)); 
      } 
    }
  }
  
  export const mostrarMetrados =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarMetrados(idOt);
          dispatch(spinnerClose());    
          if (res.ok) { 
             dispatch(listMetrados(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const anularMetrados =( id_OrdenTrabajo_Metrado, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().set_anularMetrados(id_OrdenTrabajo_Metrado, id_usuario);
          dispatch(spinnerClose());    
          if (res.ok) { 
            Swal_alert('success','Se anulo correctamente.');
            dispatch(refrescandoEstadoMetrados(id_OrdenTrabajo_Metrado));   
            //  ///---limpiando -----
            dispatch(set_formParamsMetrados({
              id_OrdenTrabajo_Metrado : '0' , idTipoReparacion: '0', largo : '', ancho : '', espesor : '', 
            }))
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const subirFotosTab4 =( files, idOt, idUsuario )=>{
    return  async(dispatch)=>{ 
  
      const cantFiles = files.length;
  
      dispatch(spinnerOpen());
      const ejecutarEnvioArchivoServidor= async(index)=>{
  
        if(index === cantFiles ){
          dispatch(spinnerClose());  
          //dispatch(flagTerminoCargaArchivo({ tipoCarga : tipoCarga, estaCompletadoCarga: true }));  
          Swal_alert('success','archivos, cargado correctamente');
          dispatch(mostrarFotosTab4(idOt)) 
          return true ;
        }
        try {
             const res = await registroOTServices().upload_fileFotosTab4( files[index].file,  idOt, idUsuario);
             if (res.ok) { 
              ejecutarEnvioArchivoServidor((index+1)); 
             }else{
               alert('Error en la carga del archivo ' + files[index].name + ' '  + JSON.stringify(res.data)); 
               ejecutarEnvioArchivoServidor((index+1)); 
             } 
       } catch (error) {
          alert('Error en la carga del archivo ' + files[index].name + ' '  + JSON.stringify(error)); 
          ejecutarEnvioArchivoServidor((index+1)); 
       } 
  
      }
      ejecutarEnvioArchivoServidor(0);
    }
  }
  
  export const mostrarFotosTab4 =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_mostrarFotosTab4(idOt);
          dispatch(spinnerClose());    
          if (res.ok) { 
             dispatch(listFotosTab4(res.data));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const anularFotoTab4 =( id_OrdenTrabajo_Foto, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().set_anularFotoTab4(id_OrdenTrabajo_Foto, id_usuario);
          dispatch(spinnerClose());    
          if (res.ok) { 
            Swal_alert('success','Se anulo correctamente.');
            dispatch(refrescandoEstadoFotosTab4(id_OrdenTrabajo_Foto));   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  export const descargarTodasFotosTab4 =( idOt, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          dispatch(spinnerOpen());
          const res = await registroOTServices().get_descargarTodasFotosTab4(idOt, id_usuario);
          dispatch(spinnerClose());        
          if (res.ok) { 
            window.open(res.data) 
         }else{
           alert(JSON.stringify(res.data)); 
         } 
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  
  
  //----- REPORTE PDF REGISTRO OT  --------
  
  export const mostrarPDF_ot =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const res = await registroOTServices().get_mostrarPdf_Ot(idOt); 
          Swal.close();   
          if (res.ok) { 
            crearPDF(res.data);   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
  
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }  
  
  const crearPDF = ({dt_reportePdf, dt_reportePdf_ocurrencia, dt_reportePdf_metrados})=>{
    if(dt_reportePdf.length > 0 ){
        const doc = new jsPDF();
  
        let codigoAle = Math.floor(Math.random() * 1000000) + '_' + new Date().getTime(); 
  
        let altura = 25;
        let pag = 0;
        let splitTitle ='';
  
        doc.setFontSize(10);
        doc.setFont("italic");
        doc.setTextColor("#17202A");
        // ----- centrando un texto jspdf
        doc.setTextColor("#000000"); //// ---txto normal negrita
        let pageWidth = doc.internal.pageSize.getWidth();

        doc.line(5, 3, 200,  3 ) // horizontal line
        doc.line(5, 3, 5, 95) // vertical line
        doc.line(68, 3, 68, 95) // vertical line
        doc.line(138, 3, 138, 95) // vertical line
        doc.line(200, 3, 200, 95) // vertical line
  
        doc.addImage(logoEdaltec, 'JPEG', 10, 4, 50, 20);
        if (dt_reportePdf[0].logoCliente === 1) {
            doc.addImage(logoCobra, 'JPEG', 145, 4, 50, 20); 
        }        
        if (dt_reportePdf[0].logoCliente === 2 || dt_reportePdf[0].logoCliente === '2') {
            doc.addImage(logoDominion, 'JPEG', 145, 4, 50, 20); 
        }
        if (dt_reportePdf[0].logoCliente === 3) {
            doc.addImage(logoLari, 'JPEG', 145, 4, 50, 20); 
        }
        pag += 1 ;
        doc.text( String('Pag.' + (pag) ) , 197, 10 );  
  
        doc.text(dt_reportePdf[0].fecha , pageWidth / 2, 10, {align:"center"} );
        doc.text(dt_reportePdf[0].titulo , pageWidth / 2, 16, {align:"center"} );
        doc.text(dt_reportePdf[0].nroOT , pageWidth / 2, 21, {align:"center"} );
  
        doc.line(5, altura, 200,  altura ) // horizontal line
        altura = altura + 6;
  
        doc.setFontSize(8);
        doc.text( String('ORDEN TRABAJO') , 7, altura );  
        doc.text( String('DISTRITO') , 70 , altura );  
        doc.text( String('CAN DESM ELIMIN') , 140, altura );  
  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].ordenTrabajo) , 7, altura );  
        doc.text( String(dt_reportePdf[0].distrito) , 70, altura );  
        doc.text( String(dt_reportePdf[0].canDesmelim) , 140, altura );  
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('SED') , 7, altura );  
        doc.text( String('CONC') , 70 , altura );  
        doc.text( String('CANTIDAD A REPARAR') , 140, altura );  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].sed) , 7, altura );  
        doc.text( String(dt_reportePdf[0].conc) , 70, altura );  
        doc.text( String(dt_reportePdf[0].cantReparar) , 140, altura );  
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('SED') , 7, altura );  
        doc.text( String('CONC') , 70 , altura );  
        doc.text( String('CANTIDAD A REPARAR') , 140, altura );  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].sed) , 7, altura );  
        doc.text( String(dt_reportePdf[0].conc) , 70, altura );  
        doc.text( String(dt_reportePdf[0].cantReparar) , 140, altura );  
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('AREA') , 7, altura );  
        doc.text( String('SUPERVISOR') , 70 , altura );  
        doc.text( String('FECHA ASIGNADA') , 140, altura );  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].area) , 7, altura );  
        doc.text( String(dt_reportePdf[0].supervisor) , 70, altura );  
        doc.text( String(dt_reportePdf[0].fechaAsignada) , 140, altura );  
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('ESTADO') , 7, altura );  
        doc.text( String('SUPERVISOR EDALTEC') , 70 , altura );  
        doc.text( String('CONTRATISTA') , 140, altura );  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].estado) , 7, altura );  
        doc.text( String(dt_reportePdf[0].supervisorEdaltec) , 70, altura );  
        doc.text( String(dt_reportePdf[0].contratista) , 140, altura );  
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        doc.setFontSize(10);
        altura = altura + 6;
        doc.text(dt_reportePdf[0].responsableInforme , pageWidth / 2, altura, {align:"center"} );
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.text('DIRECCION DE UBICACION DEL DESMONTE' , pageWidth / 2, altura, {align:"center"} );
        altura = altura + 4;
        doc.setFontSize(8);
        doc.text(dt_reportePdf[0].direccionubicaDesmonte , pageWidth / 2, altura, {align:"center"} );
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
        altura = altura + 6;
  
        doc.text( String('OCURRENCIAS : ') , 6, altura );  
  
        for (const ocurrencia of dt_reportePdf_ocurrencia) {
            altura = altura + 6;
            splitTitle = doc.splitTextToSize( String(ocurrencia.descripcion_Ocurrencia), 190);        
            doc.text(splitTitle,7, altura);   
  
            let _val = 0;       
            if (splitTitle.length === 1) {
                _val = 4;
            } else {
                _val = (3 * splitTitle.length);
            }
       
            altura = (altura + _val);
            doc.line(7, altura, 200,  altura ) // horizontal line
  
            if (altura > 261) {
                doc.addPage();
                altura = 20
                pag += 1 ;
                doc.text( String('Pag.' + (pag) ) , 197, 10 );  
            }  
        }
        altura = altura + 8;
  
        for (const metrado of dt_reportePdf_metrados) {
            altura = altura + 6;
            doc.setFontSize(8);
            doc.text( String('TIPO') , 7, altura );  
            doc.text( String('LARGO') , 40 , altura );  
            doc.text( String('ANCHO') , 60, altura );  
            doc.text( String('ESPESOR') , 80, altura );  
            altura = altura + 4;    
            doc.text( String(metrado.nombre_TipoReparacion) , 7, altura );  
            doc.text( String(metrado.largo_Metrado) , 40, altura );  
            doc.text( String(metrado.ancho_Metrado) , 60, altura );  
            doc.text( String(metrado.espesor_Metrado) , 80, altura );  
            altura = altura + 4;
            doc.line(5, altura, 200,  altura ) // horizontal line
  
            if (altura > 261) {
                doc.addPage();
                altura = 20
                pag += 1 ;
                doc.text( String('Pag.' + (pag) ) , 197, 10 );  
            }  
        }      
        //doc.output('dataurlnewwindow');
        doc.save("ReporteOT_PDF_" + codigoAle + '.pdf');
  
    }else{
      Swal_alert('error','No hay informacion para mostrar en el reporte..');
    }
  }
  
  export const mostrarReporte_ot =( idOt )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const res = await registroOTServices().get_mostrarReporte_ot(idOt);
          Swal.close(); 
          if (res.ok) { 
            crear_pdf_Reporte(res.data);   
          }else{
            alert(JSON.stringify(res.data)); 
          } 
  
      } catch (error) {
        dispatch(spinnerClose());
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }
  
  const crear_pdf_Reporte = ({dt_reportePdf, dt_reportePdf_ocurrencia, dt_reportePdf_metrados})=>{
    if(dt_reportePdf.length > 0 ){
        const doc = new jsPDF();
  
        let codigoAle = Math.floor(Math.random() * 1000000) + '_' + new Date().getTime(); 
        let altura = 25;
        let pag = 0;
        let splitTitle ='';
  
        doc.setFontSize(10);
        doc.setFont("italic");
        doc.setTextColor("#17202A");
        // ----- centrando un texto jspdf
        doc.setTextColor("#000000"); //// ---txto normal negrita
        let pageWidth = doc.internal.pageSize.getWidth();

        doc.line(5, 3, 200,  3 ) // horizontal line
        doc.line(5, 3, 5, 68) // vertical line 
        doc.line(46, 25 , 46, 68) // vertical line

        //----- segunda fila -------
        doc.line(86, 25 , 86, 39) // vertical line
        doc.line(118 , 25 , 118, 39) // vertical line


            //----- tercera fila -------
            doc.line(89, 39 , 89, 54) // vertical line
            doc.line( 109 , 39 , 109, 54) // vertical line

        
        //----- cuarta fila -------
        doc.line(86, 54 , 86, 68) // vertical line
        doc.line(118, 54 , 118, 68) // vertical line


        doc.line(68, 3, 68, 25) // vertical line
        doc.line(138, 3, 138, 25) // vertical line

        doc.line(166, 25 , 166, 68) // vertical line
        doc.line(200, 3, 200, 68) // vertical line

  
        doc.addImage(logoEdaltec, 'JPEG', 10, 4, 50, 20);
        if (dt_reportePdf[0].logoCliente === 1) {
            doc.addImage(logoCobra, 'JPEG', 145, 4, 50, 20); 
        }        
        if (dt_reportePdf[0].logoCliente === 2 || dt_reportePdf[0].logoCliente === '2') {
            doc.addImage(logoDominion, 'JPEG', 145, 4, 50, 20); 
        }
        if (dt_reportePdf[0].logoCliente === 3) {
            doc.addImage(logoLari, 'JPEG', 145, 4, 50, 20); 
        }
        pag += 1 ;
        doc.text( String('Pag.' + (pag) ) , 197, 10 );  
  
        doc.text(dt_reportePdf[0].fecha , pageWidth / 2, 10, {align:"center"} );
        doc.text(dt_reportePdf[0].titulo , pageWidth / 2, 16, {align:"center"} );
        doc.text(dt_reportePdf[0].nroOT , pageWidth / 2, 21, {align:"center"} );
  
        doc.line(5, altura, 200,  altura ) // horizontal line
        
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('ORDEN TRABAJO') , 5.5, altura );  
        doc.text( String('FECHA  ELECTRICA') , 47 , altura );  
        doc.text( String('ASIGNADO EDALTEC') , 87, altura );  
        doc.text( String('EJECUTADO') , 120 , altura );  
        doc.text( String('ESTADO') , 167 , altura );  
  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].ordenTrabajo) , 5.5, altura );  
        doc.text( String(dt_reportePdf[0].fechaElectrica) , 47, altura );  
        doc.text( String(dt_reportePdf[0].asignadoEdaltec) , 87, altura ); 
        doc.text( String(dt_reportePdf[0].ejecutado) , 120, altura ); 
        doc.text( String(dt_reportePdf[0].estado) , 167, altura ); 
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('SUPERVISOR EDTC') , 5.5, altura );  
        doc.text( String('DISTRITO ') , 47 , altura );  
        doc.text( String('SED') , 90, altura );  
        doc.text( String('CLIENTE') , 110 , altura );  
        doc.text( String('ELIMINAR DESMONTE ') , 167 , altura );  
  
        altura = altura + 4;
        // doc.text( String(dt_reportePdf[0].supervisorEdtc) , 5, altura );  
        splitTitle = doc.splitTextToSize( String(dt_reportePdf[0].supervisorEdtc), 40);        
        doc.text(splitTitle,5.5, altura);   
  
        doc.text( String(dt_reportePdf[0].distrito) , 47, altura );  
        doc.text( String(dt_reportePdf[0].sed) , 90, altura ); 
        doc.text( String(dt_reportePdf[0].cliente) , 110, altura ); 
        doc.text( String(dt_reportePdf[0].eliminarDesmonte) , 167, altura ); 
        altura = altura + 5;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 6;
        doc.setFontSize(8);
        doc.text( String('VEREDA_SARDINEL') , 5.5, altura );  
        doc.text( String('GRAS ') , 47 , altura );  
        doc.text( String('PISO ESPECIAL') , 87, altura );  
        doc.text( String('PISO CONCRETO') , 120 , altura );  
        doc.text( String('PISO ASFALTO ') , 167 , altura );  
  
        altura = altura + 4;
        doc.text( String(dt_reportePdf[0].veredaSardinel) , 5.5, altura );  
        doc.text( String(dt_reportePdf[0].grass) , 47, altura );  
        doc.text( String(dt_reportePdf[0].pisoEspecial) , 87, altura ); 
        doc.text( String(dt_reportePdf[0].pisoConcreto) , 120, altura ); 
        doc.text( String(dt_reportePdf[0].pisoAsfaltado) , 167, altura ); 
        altura = altura + 4;
        doc.line(5, altura, 200,  altura ) // horizontal line
  
        altura = altura + 8;
        doc.text( String('OCURRENCIAS : ') , 5, altura );  
  
        for (const ocurrencia of dt_reportePdf_ocurrencia) {
            altura = altura + 6;
            splitTitle = doc.splitTextToSize( String(ocurrencia.descripcion_Ocurrencia), 190);        
            doc.text(splitTitle,5, altura);   
  
            let _val = 0;       
            if (splitTitle.length === 1) {
                _val = 4;
            } else {
                _val = (3 * splitTitle.length);
            }
       
            altura = (altura + _val);
            doc.line(7, altura, 200,  altura ) // horizontal line
  
            if (altura > 261) {
                doc.addPage();
                altura = 20
                pag += 1 ;
                doc.text( String('Pag.' + (pag) ) , 197, 10 );  
            }  
        }
        altura = altura + 8;
  
        for (const metrado of dt_reportePdf_metrados) {
            altura = altura + 6;
            doc.setFontSize(8);
            doc.text( String('TIPO') , 7, altura );  
            doc.text( String('LARGO') , 40 , altura );  
            doc.text( String('ANCHO') , 60, altura );  
            doc.text( String('ESPESOR') , 80, altura );  
            altura = altura + 4;    
            doc.text( String(metrado.nombre_TipoReparacion) , 7, altura );  
            doc.text( String(metrado.largo_Metrado) , 40, altura );  
            doc.text( String(metrado.ancho_Metrado) , 60, altura );  
            doc.text( String(metrado.espesor_Metrado) , 80, altura );  
            altura = altura + 4;
            doc.line(5, altura, 200,  altura ) // horizontal line
  
            if (altura > 261) {
                doc.addPage();
                altura = 20
                pag += 1 ;
                doc.text( String('Pag.' + (pag) ) , 197, 10 );  
            }  
        }
       //doc.output('dataurlnewwindow');
       doc.save("ReporteOT_" + codigoAle + '.pdf');
    }else{
      Swal_alert('error','No hay informacion para mostrar en el reporte..');
    }
  }
    
  
  //----- REPORTE PDF  --------
  
  
  export const descargarRegistrosOT =(  cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc )=>{
    return  async(dispatch)=>{ 
      try {
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
        })
        Swal.showLoading();
          const res = await registroOTServices().get_descargarRegistroOTs( cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc );
          Swal.close();
          if (res.ok) { 
            window.open(res.data) 
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }   


export const { refrescandoEstadoFotosTab4, listFotosTab4, refrescandoEstadoMetrados,  listMetrados, refrescandoEstadoArchivoCargadoEvidencia,listArchivosCargadosEvidencias, flagTerminoCargaArchivo ,
    set_tiposReparacionesMultiple,listTiposReparacionMultipleOT , listTiposReparacionMontos, listOcurrencias, getAreas, getDistrito, getSupervisores,getTiposReparacion, getEstados, listClientes , 
    listTipoTrabajos, listTipoTrabajosModal , listInspeccionados, listRegistrosOTS,Actualizar_formParamsTab1, inicializarTabs , set_idOrdenTrabajo_Global, set_formParamsOcurrenciaInicial, set_formParamsMetrados } = registroOTSlice.actions;


export default registroOTSlice.reducer;