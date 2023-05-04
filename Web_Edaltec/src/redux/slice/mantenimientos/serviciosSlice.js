import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { servicioServices } from "../../../services/mantenimiento/servicioServices";

import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";
 

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    servicios : [],
 }
const serviciosSlice = createSlice({ 
    name : 'mant_servicio',
    initialState,
    reducers : {
        listMantServiciosCab(state, action){
            return {
                ...state,
                servicios : action.payload
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
          const {data : res}  = await servicioServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
            if (res.ok) {   
              const listMant = res.data.map((row)=>{
                return { ...row, id : row.id_Servicio  }
              })
              dispatch(listMantServiciosCab( listMant));
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
          dispatch(modalTitle('NUEVO SERVICIO'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ nombre_Servicio, abreviatura_Servicio }, esEdicion)=>{    

    if (nombre_Servicio === null || nombre_Servicio === '') {
        Swal_alert('error','Por favor ingrese la descripcion del servicio');
        return false;
    }else{

      if ( esEdicion === false ) {
        const {data : res}  = await servicioServices().getvalidarServicio(String(nombre_Servicio).trim());
        if (res.ok) {
          if (res.data) {
            Swal_alert('error','El nombre del servicio ya se registro..');
            return false;
          }
        }
      }
    }

    if (abreviatura_Servicio === null || abreviatura_Servicio === '') {
      Swal_alert('error','Por favor ingrese la abreviatura');
      return false;
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
          const {data : res}  = await servicioServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se registro correctamente..');
            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },300); 

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
        dispatch(modalTitle('EDITAR SERVICIO'));
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
          const {data : res}  = await servicioServices().update( objMantenimiento.id_Servicio, objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se Actualizo correctamente..');

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




export const { listMantServiciosCab } = serviciosSlice.actions;

export default serviciosSlice.reducer;