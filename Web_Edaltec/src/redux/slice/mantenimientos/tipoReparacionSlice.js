
import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { tipoRepacionServices } from "../../../services/mantenimiento/tipoRepacionServices";


import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tiposReparacion : [],
 }

const tipoReparacionSlice = createSlice({ 
    name : 'mant_tipoReparacion',
    initialState,
    reducers : {
        listMantTiposReparacionCab(state, action){
            return {
                ...state,
                tiposReparacion : action.payload
            } 
        },
 
    }
})

export const mostrarInformacion =( Pub_Esta_Codigo )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await tipoRepacionServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
            if (res.ok) {   
              const listMant = res.data.map((row)=>{
                return { ...row, id : row.id_TipoReparacion  }
              })
              dispatch(listMantTiposReparacionCab( listMant));
              dispatch(refrescarDatoPrincipal(false));
            }else{
              alert(JSON.stringify(res.data));
            } 
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  } 

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVO TIPO REPACION'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ nombre_TipoReparacion }, esEdicion)=>{   
    if (nombre_TipoReparacion === null || nombre_TipoReparacion === '') {
        Swal_alert('error','Por favor ingrese la descripcion del Tipo de Reparacion');
        return false;
    }else{
      if ( esEdicion === false ) {
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Validando, Espere por favor'
        })
        Swal.showLoading();
        const {data : res}  = await tipoRepacionServices().getvalidarTipoReparacion(String(nombre_TipoReparacion).trim());
        Swal.close();
        if (res.ok) {
          if (res.data) {
            Swal_alert('error','El Tipo de Reparacion ya se registro..');
            return false;
          }
        }
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
          const {data : res}  = await tipoRepacionServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se registro correctamente..');
            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },500); 

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
        
        dispatch(modalOpen());
        dispatch(modalTitle('EDITAR TIPO REPARACION'));
        dispatch(flagEdicion(true));
        dispatch(objectoEdicion(objEdicion));  

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
          const {data : res}  = await tipoRepacionServices().update( objMantenimiento.id_TipoReparacion, objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se Actualizo correctamente..');

            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },500); 

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }



export const { listMantTiposReparacionCab } = tipoReparacionSlice.actions;

export default tipoReparacionSlice.reducer;