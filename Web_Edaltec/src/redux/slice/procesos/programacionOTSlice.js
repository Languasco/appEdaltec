import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { flagEdicion } from "../flagEdicionSlice";
import { modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

import { vehiculoServices } from "../../../services/mantenimiento/vehiculoServices";
import { programacionOTServices } from "../../../services/procesos/programacionOTServices";
import { registroOTServices } from "../../../services/procesos/registroOTServices";
import { listDniConductores } from "../mantenimientos/vehiculoSlice";
import { getDistrito, listClientes, listTipoTrabajos } from "./registroOTSlice";
import { formatoFecha } from "../../../helper/funcionesglobales";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    programacionesOtCab : [],
    programacionesOt_cliente : [],
 }

 
const programacionOTSlice = createSlice({ 
    name : 'proceso_programacionOT',
    initialState,
    reducers : {
        listProgramacionesOTcab(state, action){
            return {
                ...state,
                programacionesOtCab : action.payload
            } 
        },
        listProgramacionesOT_cliente(state, action){
            return {
                ...state,
                programacionesOt_cliente : action.payload
            } 
        },
        refrescandoEstadoProgramacionOT(state, action){
            return {
                ...state,
                programacionesOtCab :  state.programacionesOtCab.map(programacionesOtCab =>{
                    return {...programacionesOtCab, id_Estado : (programacionesOtCab.id_Vehiculo === action.payload )? '002': programacionesOtCab.id_Estado  }             
                })  
            }  
        },
 
    }
})

export const getCargarCombos = ()=>{
    return  async(dispatch)=>{ 
      try { 
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([ registroOTServices().getClientes(), vehiculoServices().dniConductores(), registroOTServices().getTiposTrabajo() ,  registroOTServices().getDistrito() ])
            .then(([_clientes, _conductores,_tiposTrabajos, _distritos ])  => {
            Swal.close();    

            if (_clientes.ok) {
              dispatch( listClientes(_clientes.data))
            }else{
              alert(JSON.stringify(_clientes.data));
            } 
            if (_conductores.ok) {
              dispatch( listDniConductores(_conductores.data))
            }else{
              alert(JSON.stringify(_conductores.data));
            } 
            if (_tiposTrabajos.ok) {
              dispatch( listTipoTrabajos(_tiposTrabajos.data))
            }else{
              alert(JSON.stringify(_tiposTrabajos.data));
            }
            if (_distritos.ok) {
              dispatch( getDistrito(_distritos.data))
            }else{
              alert(JSON.stringify(_distritos.data));
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
  export const mostrarInformacion =(  cliente,fechaInicial, fechaFinal,estado , estaSegundoPlano )=>{
    return  async(dispatch)=>{ 
      try {

          if(estaSegundoPlano === false){
              Swal.fire({
                icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
              })
              Swal.showLoading();
          }
          const fechaIni =  formatoFecha(fechaInicial);
          const fechaFin =  formatoFecha(fechaFinal);

          const res = await programacionOTServices().getMostrarInformacion(  cliente,fechaIni, fechaFin,estado  );
          if(estaSegundoPlano === false) Swal.close(); 

          if (res.ok) {   
            const listProceso = res.data.map((row, index)=>{
              return { ...row, id : index  }
            })
            dispatch(listProgramacionesOTcab(listProceso));
            dispatch(refrescarDatoPrincipal(false));
          }else{
            alert(JSON.stringify(res.data));
          } 
      } catch (error) {
        if(estaSegundoPlano === false) Swal.close(); 
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVO PROGRAMACION DE TRABAJOS'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
          dispatch(listProgramacionesOT_cliente([]));
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ id_Cliente, fechaProgramacion, ges_Empl_DNI_JefeCuadrilla, id_Vehiculo, id_TipoTrabajo, numero_Orden_Programa, id_Distrito_Programa }, esEdicion)=>{    

    if (id_Cliente === 0 || id_Cliente === '0') {
        Swal_alert('error','Por favor seleccione el Cliente');
        return false;
    } 
    if (fechaProgramacion === '' || fechaProgramacion === null) {
      Swal_alert('error','Por favor seleccione la fecha de Programacion');
      return false;
    } 
    if (ges_Empl_DNI_JefeCuadrilla === 0 || ges_Empl_DNI_JefeCuadrilla === '0') {
      Swal_alert('error','Por favor seleccione el Coordinador');
      return false;
    } 
    if (id_Vehiculo === 0 || id_Vehiculo === '0') {
      Swal_alert('error','Por favor ingrese la placa y presione la tecla Enter..');
      return false;
    } 
    if (id_TipoTrabajo === 0 || id_TipoTrabajo === '0') {
      Swal_alert('error','Por favor seleccione el Tipo de Trabajo');
      return false;
    }  
    if (numero_Orden_Programa === '' || numero_Orden_Programa === null) {
      Swal_alert('error','Por favor ingrese el Numero de Orden');
      return false;
    } 
    if (id_Distrito_Programa === 0 || id_Distrito_Programa === '0') {
      Swal_alert('error','Por favor seleccione el Distrito');
      return false;
    }     

    if ( esEdicion === false ) {
      const fecha=  formatoFecha(fechaProgramacion);
      const res  = await programacionOTServices().validarProgramacionOT( id_Cliente, fecha, ges_Empl_DNI_JefeCuadrilla );
      if (res.ok) {
        if (res.data.length > 0) {
          let cant = res.data[0].cantidad;
          if (cant > 0) {
            Swal_alert('error','Ya se agrego una programacion con el Cliente , Fecha Programacion y el Coordinador');
            return false;
          }
        } 
      }else{
        alert(JSON.stringify(res.data)); 
        return false;
      }
    }
    return true;
  }

  export const save =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await programacionOTServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se registro correctamente..');
            dispatch(refrescarDatoPrincipal(true)); 
            dispatch(modalTitle('NUEVO PROGRAMACION DE TRABAJOS'));
            dispatch(flagEdicion(true));                    
            dispatch(objectoEdicion({...objMantenimiento, id_Distrito_Programa : '0', direccion_Programa : ''}));    

            //----refrescando informacion Agrupada-------
            dispatch(programacionOT_cliente(objMantenimiento.id_Cliente))

            setTimeout(() => {
              dispatch(flagEdicion(false));  
            }, 1000);     

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  const programacionOT_cliente =(id_Cliente)=>{
    return  async(dispatch)=>{       
      Promise.all([programacionOTServices().listadoProgramacionOT_Cliente(id_Cliente) ])
      .then(([ res ])  => {           
      if (res.ok) {    
          dispatch(listProgramacionesOT_cliente(res.data));                
        }else{
          alert(JSON.stringify(res.data));
        }          
      }).catch(reason => {
        alert(JSON.stringify(reason));
      });
    }
  }
 
  export const editar =(objEdicion)=>{
    return  async(dispatch)=>{ 
      try {        
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
 
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([programacionOTServices().listadoProgramacionOT_Cliente(objEdicion.id_Cliente) ])
            .then(([ res ])  => {
            Swal.close();             
            if (res.ok) {    
              
                dispatch(modalTitle('EDITAR PROGRAMACION DE TRABAJO'));  
                dispatch(listProgramacionesOT_cliente(res.data));                
                dispatch(modalOpen());
              
            }else{
              alert(JSON.stringify(res.data));
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
  
  export const update =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await programacionOTServices().update( objMantenimiento.id_OrdenProgramacion, objMantenimiento);
          Swal.close();
          if (res.ok) {     

            Swal_alert('success','Se Actualizo correctamente..');
            dispatch(refrescarDatoPrincipal(true)); 
            dispatch(modalTitle('NUEVO PROGRAMACION DE TRABAJOS'));
            dispatch(flagEdicion(true));                    
            dispatch(objectoEdicion({...objMantenimiento, id_Distrito_Programa : '0', direccion_Programa : ''}));    
            
            //----refrescando informacion Agrupada-------
            dispatch(programacionOT_cliente(objMantenimiento.id_Cliente))

            setTimeout(() => {
              dispatch(flagEdicion(false));  
            }, 1000);

          }else{
            alert(JSON.stringify(res.data));
 
          } 
      } catch (error) {
        Swal.close();
        alert(JSON.stringify(error));
      } 
    }
  }

  export const anular =( id_OrdenProgramacion, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, Espere por favor'
          })
          Swal.showLoading();
          const res = await programacionOTServices().anular(id_OrdenProgramacion, id_usuario);
          Swal.close();
          if (res.ok) { 

            Swal_alert('success','Se anulo correctamente.'); 
            dispatch(refrescandoEstadoProgramacionOT(id_OrdenProgramacion));  
 
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const buscarVehiculo_placa = async ( nroPlaca_Vehiculo)=>{     
    const res  = await programacionOTServices().validarVehiculo( nroPlaca_Vehiculo );      
    return res;
  }



export const { listProgramacionesOTcab,listProgramacionesOT_cliente, refrescandoEstadoProgramacionOT } = programacionOTSlice.actions;

export default programacionOTSlice.reducer;