import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

import { vehiculoServices } from "../../../services/mantenimiento/vehiculoServices";
import { programacionOTServices } from "../../../services/procesos/programacionOTServices";
import { registroOTServices } from "../../../services/procesos/registroOTServices";
import { listDniConductores } from "../mantenimientos/vehiculoSlice";
import { listClientes } from "./registroOTSlice";
import { formatoFecha } from "../../../helper/funcionesglobales";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    programacionesOtCab : [],
    tipoProceso : 1,
    idProgramacionMasivo : [],
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
        refrescandoEstadoProgramacionOT(state, action){
            return {
                ...state,
                programacionesOtCab :  state.programacionesOtCab.map(programacionesOtCab =>{
                    return {...programacionesOtCab, id_Estado : (programacionesOtCab.id_Vehiculo === action.payload )? '002': programacionesOtCab.id_Estado  }             
                })  
            }  
        },
        tipoProcesoSeleccionado(state, action){
          return {
              ...state,
              tipoProceso : action.payload
          } 
       },
       set_idProgramacionMasivos(state, action){
        return {
            ...state,
            idProgramacionMasivo : action.payload
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
          Promise.all([ registroOTServices().getClientes(), vehiculoServices().dniConductores() ])
            .then(([_clientes, _conductores,_tiposTrabajos, _distritos ])  => {
            Swal.close();    

            if (_clientes.ok) {
              dispatch( listClientes(_clientes.data))
            }else{
              alert(JSON.stringify(_clientes.data));
            } 
            if (_conductores.ok) {
              let coordinadores = [ {Ges_Empl_Identidad:0 , Ges_Empl_Dni : '000000' , Ges_Empl_Apellidos:'[--SELECCIONE--]'} ,  ..._conductores.data];   
              dispatch( listDniConductores(coordinadores))
            }else{
              alert(JSON.stringify(_conductores.data));
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
  export const mostrarInformacion =(  cliente, fechaInicial, fechaFinal,TipoProceso , estaSegundoPlano )=>{
    return  async(dispatch)=>{ 
      try {
 
          dispatch(listProgramacionesOTcab([]));

          if(estaSegundoPlano === false){
              Swal.fire({
                icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
              })
              Swal.showLoading();
          }
          const fechaIni =  formatoFecha(fechaInicial);
          const fechaFin =  formatoFecha(fechaFinal);

          const res = await programacionOTServices().getMostrarInformacion(  cliente,fechaIni, fechaFin,TipoProceso  );
          if(estaSegundoPlano === false) Swal.close(); 

          if (res.ok) {   
            const listProceso = res.data.map((row, index)=>{
              return { ...row, id : index + 1  }
            })
            dispatch(listProgramacionesOTcab(listProceso));
            dispatch(refrescarDatoPrincipal(false));
            dispatch(tipoProcesoSeleccionado( Number(TipoProceso) ));
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

  export const nuevo =(idProgramacionMasivo)=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('PROGRAMACION DE TRABAJOS'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
          dispatch(set_idProgramacionMasivos(idProgramacionMasivo));
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ id_Cliente, fechaProgramacion, ges_Empl_DNI_JefeCuadrilla, id_Vehiculo }, esEdicion)=>{    

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

  export const save =(objMantenimiento, listProgramacionMasivo)=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();

          const fechaPrograma =  formatoFecha(objMantenimiento.fechaProgramacion);
          const res = await programacionOTServices().save_new({...objMantenimiento, fechaProgramacion : fechaPrograma  }, listProgramacionMasivo.join());
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se registro correctamente..');
            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },200);      

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
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
          Promise.all([programacionOTServices().programacionTrabajoEdicion(objEdicion.id_OrdenTrabajo) ])
            .then(([ res ])  => {
            Swal.close();           
            
            if (res.ok) {    
                          
                dispatch(modalTitle('EDITAR PROGRAMACION '));            
                dispatch(objectoEdicion(res.data[0]));
                dispatch(flagEdicion(true));
                dispatch(modalOpen());
                dispatch(set_idProgramacionMasivos([objEdicion.id_OrdenTrabajo]));
              
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

export const { listProgramacionesOTcab,refrescandoEstadoProgramacionOT, tipoProcesoSeleccionado , set_idProgramacionMasivos} = programacionOTSlice.actions;

export default programacionOTSlice.reducer;